"use client";

import { useEffect, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';
import { useVideoDetection } from '../hooks/useVideoDetection';

interface BackgroundMusicProps {
  audioSrc: string;
}

export default function BackgroundMusic({ audioSrc }: BackgroundMusicProps) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  const pathname = usePathname();
  const isHomePage = pathname === '/';
  const { hasPlayingVideo, hasYouTubeVideo, hasOtherVideo } = useVideoDetection();
  
  // Store music state in localStorage for persistence
  const MUSIC_STATE_KEY = 'indigo_bg_music_state';

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    // Set static volume and playback rate
    audio.volume = 0.2; // Static volume at 20%
    audio.playbackRate = 0.8; // Slow down to 80% speed

    // Load saved music state
    const savedState = localStorage.getItem(MUSIC_STATE_KEY);
    if (savedState) {
      const { savedTime, wasPlaying, wasMuted } = JSON.parse(savedState);
      audio.currentTime = savedTime || 0;
      setIsMuted(wasMuted || false);
      
      // Try to resume if it was playing before
      if (wasPlaying && !wasMuted) {
        audio.play().then(() => {
          setIsPlaying(true);
        }).catch(() => {
          // Auto-play blocked
          setIsPlaying(false);
        });
      }
    }

    // Set up audio event listeners
    const handleEnded = () => {
      audio.currentTime = 0;
      setIsPlaying(false);
    };

    audio.addEventListener('ended', handleEnded);

    return () => {
      audio.removeEventListener('ended', handleEnded);
    };
  }, [isHomePage]);

  // Save music state when navigating away
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const saveMusicState = () => {
      const musicState = {
        savedTime: audio.currentTime,
        wasPlaying: isPlaying,
        wasMuted: isMuted
      };
      localStorage.setItem(MUSIC_STATE_KEY, JSON.stringify(musicState));
    };

    // Save state when component unmounts or pathname changes
    return () => {
      saveMusicState();
    };
  }, [isHomePage, isPlaying, isMuted]);

  // Handle music pause/resume based on video state
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const shouldPauseMusic = hasPlayingVideo || hasYouTubeVideo || hasOtherVideo;

    if (shouldPauseMusic && isPlaying && !isMuted) {
      // Only pause if we're actually playing and videos are detected
      audio.pause();
      setIsPlaying(false);
    } else if (!shouldPauseMusic && !isPlaying && isHomePage && !isMuted) {
      // Resume music if no videos are playing and music is not muted
      const savedState = localStorage.getItem(MUSIC_STATE_KEY);
      if (savedState) {
        const { wasPlaying } = JSON.parse(savedState);
        if (wasPlaying) {
          audio.play().catch(() => {
            // Handle play error
          });
          setIsPlaying(true);
        }
      }
    }
  }, [hasPlayingVideo, hasYouTubeVideo, hasOtherVideo, isPlaying, isHomePage, isMuted]);

  const toggleMusic = () => {
    const audio = audioRef.current;
    if (!audio) return;

    setHasInteracted(true); // Mark that user has interacted

    if (isMuted) {
      // Unmute and start playing
      setIsMuted(false);
      audio.play().then(() => {
        setIsPlaying(true);
      }).catch(() => {
        console.log('Failed to start music');
      });
    } else if (!isPlaying) {
      // Start playing if not already playing
      audio.play().then(() => {
        setIsPlaying(true);
      }).catch(() => {
        console.log('Failed to start music');
      });
    } else {
      // Mute and pause if currently playing
      setIsMuted(true);
      audio.pause();
      setIsPlaying(false);
    }
  };

  // Only render on home page
  if (!isHomePage) {
    return null;
  }

  return (
    <div className="fixed bottom-4 right-4 z-50 text-white">
      <audio
        ref={audioRef}
        src={audioSrc}
        loop
        preload="metadata"
      />
      
      <div className="flex items-center space-x-2">
        {/* Speaker Button */}
        <button
          onClick={toggleMusic}
          className="w-10 h-10 flex items-center justify-center hover:bg-white/10 rounded-full transition-colors"
          aria-label={isMuted ? 'Unmute music' : 'Mute music'}
        >
          {isMuted ? (
            // Muted speaker (simple)
            <svg className="w-7 h-7 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.383 3.076A1 1 0 0110 4v12a1 1 0 01-1.707.707L4.586 13H2a1 1 0 01-1-1V8a1 1 0 011-1h2.586l3.707-3.707a1 1 0 011.09-.217z" />
            </svg>
          ) : (
            // Active speaker with sound waves
            <svg className="w-7 h-7 text-purple-400" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.383 3.076A1 1 0 0110 4v12a1 1 0 01-1.707.707L4.586 13H2a1 1 0 01-1-1V8a1 1 0 011-1h2.586l3.707-3.707a1 1 0 011.09-.217z" />
              <path d="M16.5 7.5a.5.5 0 01.5.5v4a.5.5 0 01-1 0V8a.5.5 0 01.5-.5z" />
              <path d="M18.5 6a.5.5 0 01.5.5v7a.5.5 0 01-1 0v-7a.5.5 0 01.5-.5z" />
              <path d="M20.5 4.5a.5.5 0 01.5.5v9a.5.5 0 01-1 0v-9a.5.5 0 01.5-.5z" />
            </svg>
          )}
        </button>
        
        {/* Status Indicator */}
        <div className="text-sm">
          {!hasInteracted ? (
            <span className="text-purple-400">Click to play</span>
          ) : null}
        </div>
      </div>
    </div>
  );
}
