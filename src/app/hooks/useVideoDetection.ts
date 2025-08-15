import { useEffect, useState, useRef } from 'react';

export interface VideoState {
  hasPlayingVideo: boolean;
  hasYouTubeVideo: boolean;
  hasOtherVideo: boolean;
}

export function useVideoDetection(): VideoState {
  const [videoState, setVideoState] = useState<VideoState>({
    hasPlayingVideo: false,
    hasYouTubeVideo: false,
    hasOtherVideo: false
  });

  const lastStateRef = useRef<VideoState>({
    hasPlayingVideo: false,
    hasYouTubeVideo: false,
    hasOtherVideo: false
  });

  useEffect(() => {
    const checkForVideos = () => {
      // Check for HTML5 video elements
      const videoElements = document.querySelectorAll('video');
      const hasPlayingVideo = Array.from(videoElements).some(video => 
        !video.paused && !video.muted && video.volume > 0 && video.readyState >= 2
      );

      // Check for YouTube iframes - be more conservative
      const youtubeIframes = document.querySelectorAll('iframe[src*="youtube.com"], iframe[src*="youtu.be"]');
      const hasYouTubeVideo = Array.from(youtubeIframes).some((iframeElement) => {
        try {
          const iframe = iframeElement as HTMLIFrameElement;
          // Only consider YouTube videos as playing if they have very specific indicators
          return iframe.src.includes('autoplay=1') && 
                 (iframe.src.includes('enablejsapi=1') || iframe.src.includes('controls=1'));
        } catch {
          return false;
        }
      });

      // Check for other audio elements - exclude our background music
      const audioElements = document.querySelectorAll('audio');
      const hasOtherVideo = Array.from(audioElements).some(audio => {
        // Don't count our background music as "other video"
        if (audio.src && audio.src.includes('bg_music.mp3')) {
          return false;
        }
        return !audio.paused && !audio.muted && audio.volume > 0;
      });

      const newState = {
        hasPlayingVideo,
        hasYouTubeVideo,
        hasOtherVideo
      };

      // Only update state if there's a meaningful change
      const hasChanged = JSON.stringify(newState) !== JSON.stringify(lastStateRef.current);
      
      if (hasChanged) {
        // Add a small delay to prevent rapid state changes
        setTimeout(() => {
          setVideoState(newState);
          lastStateRef.current = newState;
        }, 100);
      }
    };

    // Check immediately
    checkForVideos();

    // Check less frequently to reduce false positives
    const interval = setInterval(checkForVideos, 2000);

    // Listen for video events
    const handleVideoEvent = () => {
      // Debounce video events to prevent rapid firing
      clearTimeout((handleVideoEvent as any).timeout);
      (handleVideoEvent as any).timeout = setTimeout(checkForVideos, 300);
    };

    document.addEventListener('play', handleVideoEvent, true);
    document.addEventListener('pause', handleVideoEvent, true);
    document.addEventListener('ended', handleVideoEvent, true);

    // Listen for YouTube messages - be more conservative
    const handleYouTubeMessage = (event: MessageEvent) => {
      if (event.origin.includes('youtube.com') || event.origin.includes('youtu.be')) {
        try {
          const data = event.data;
          if (data && typeof data === 'object' && data.event === 'onStateChange') {
            // Only recheck if there's a significant state change
            if (data.info === 1 || data.info === 2) { // Playing or paused
              setTimeout(checkForVideos, 500);
            }
          }
        } catch {
          // Ignore parsing errors
        }
      }
    };

    window.addEventListener('message', handleYouTubeMessage);

    return () => {
      clearInterval(interval);
      clearTimeout((handleVideoEvent as any).timeout);
      document.removeEventListener('play', handleVideoEvent, true);
      document.removeEventListener('pause', handleVideoEvent, true);
      document.removeEventListener('ended', handleVideoEvent, true);
      window.removeEventListener('message', handleYouTubeMessage);
    };
  }, []);

  return videoState;
}
