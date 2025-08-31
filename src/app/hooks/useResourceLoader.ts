import { useEffect, useState, useRef } from 'react';

interface ResourceLoaderOptions {
  onProgress?: (progress: number, message: string) => void;
  onComplete?: () => void;
  /**
   * Optional list of video URLs that must reach `canplaythrough` before loading completes.
   * Used by the home-page hero so we don’t expose video logic on every route.
   */
  videoUrls?: string[];
}

export const useResourceLoader = (options: ResourceLoaderOptions = {}) => {
  const [progress, setProgress] = useState(0);
  const [message, setMessage] = useState('Initializing...');
  const [isComplete, setIsComplete] = useState(false);
  const mountedRef = useRef(true);
  const startTimeRef = useRef(Date.now());

  useEffect(() => {
    mountedRef.current = true;
    startTimeRef.current = Date.now();
    
    // Reset state on new navigation
    setProgress(0);
    setMessage('Initializing...');
    setIsComplete(false);
    
    // Ensure progress starts moving immediately
    const initialProgress = setTimeout(() => {
      if (mountedRef.current && progress === 0) {
        setProgress(5);
        setMessage('Starting...');
        options.onProgress?.(5, 'Starting...');
      }
    }, 100);
    
    const loadResources = async () => {
      try {
        // Add a global timeout to prevent getting stuck
        const globalTimeout = setTimeout(() => {
          console.warn('Resource loading timeout - forcing completion');
          if (mountedRef.current) {
            setProgress(100);
            setMessage('Ready');
            setIsComplete(true);
            options.onComplete?.();
          }
        }, 10000); // 10 second global timeout

        // Phase 1: Wait for images to load (or skip if none)
        if (!mountedRef.current) return;
        setMessage('Loading images...');
        setProgress(10); // Start with some progress
        options.onProgress?.(10, 'Loading images...');
        
        await waitForImages();
        setProgress(40);
        options.onProgress?.(40, 'Loading images...');

        // Phase 2: Wait for GSAP components
        if (!mountedRef.current) return;
        setMessage('Initializing animations...');
        setProgress(50); // Ensure progress moves
        options.onProgress?.(50, 'Initializing animations...');
        
        await waitForGSAPComponents();
        setProgress(70);
        options.onProgress?.(70, 'Initializing animations...');

        // Phase 3: Wait for 3D components
        if (!mountedRef.current) return;
        setMessage('Preparing 3D components...');
        setProgress(80); // Ensure progress moves
        options.onProgress?.(80, 'Preparing 3D components...');
        
        await waitFor3DComponents();
        setProgress(90);
        options.onProgress?.(90, 'Preparing 3D components...');

        // Phase 4 (optional): Wait for specified videos to buffer enough for playback
        if (options.videoUrls && options.videoUrls.length > 0) {
          if (!mountedRef.current) return;
          setMessage('Preparing media...');
          setProgress(92);
          options.onProgress?.(92, 'Preparing media...');

          await waitForVideos(options.videoUrls);

          setProgress(95);
          options.onProgress?.(95, 'Preparing media...');
        }
        // Phase 5: Final preparation
        if (!mountedRef.current) return;
        setMessage('Finalizing...');
        setProgress(95); // Ensure progress moves
        options.onProgress?.(95, 'Finalizing...');
        
        await waitForFinalPreparation();
        setProgress(100);
        options.onProgress?.(100, 'Finalizing...');

        // Ensure minimum loading time (at least 1.5 seconds total)
        const elapsed = Date.now() - startTimeRef.current;
        const minLoadingTime = 1500; // 1.5 seconds minimum
        
        if (elapsed < minLoadingTime) {
          await new Promise(resolve => setTimeout(resolve, minLoadingTime - elapsed));
        }

        // Clear the global timeout since we completed successfully
        clearTimeout(globalTimeout);

        // Complete
        if (mountedRef.current) {
          setIsComplete(true);
          options.onComplete?.();
        }
      } catch (error) {
        console.error('Resource loading error:', error);
        // Even if there's an error, complete the loading
        if (mountedRef.current) {
          setIsComplete(true);
          options.onComplete?.();
        }
      }
    };

    loadResources();

    return () => {
      mountedRef.current = false;
      clearTimeout(initialProgress);
    };
  }, []); // Remove options dependency to prevent re-runs

  return { progress, message, isComplete };
};

// Helper functions to detect when resources are ready
const waitForImages = (): Promise<void> => {
  return new Promise((resolve) => {
    const images = Array.from(document.querySelectorAll('img'));
    
    if (images.length === 0) {
      // No images to wait for, but add a small delay for consistency
      setTimeout(resolve, 200);
      return;
    }

    let loadedCount = 0;
    const totalImages = images.length;

    const checkComplete = () => {
      loadedCount++;
      if (loadedCount >= totalImages) {
        resolve();
      }
    };

    images.forEach((img) => {
      if (img.complete) {
        checkComplete();
      } else {
        img.addEventListener('load', checkComplete);
        img.addEventListener('error', checkComplete); // Don't wait for failed images
      }
    });
    
    // Fallback: if images take too long, resolve anyway
    setTimeout(resolve, 3000); // Max 3 seconds wait for images
  });
};

const waitForGSAPComponents = (): Promise<void> => {
  return new Promise((resolve) => {
    // Wait a bit for GSAP components to initialize
    // Add a fallback timeout to prevent getting stuck
    const timeout = setTimeout(resolve, 500);
    
    // Try to detect if GSAP is actually being used
    if (typeof window !== 'undefined' && (window as any).gsap) {
      // GSAP is available, wait a bit longer for components
      clearTimeout(timeout);
      setTimeout(resolve, 800);
    }
  });
};

const waitFor3DComponents = (): Promise<void> => {
  return new Promise((resolve) => {
    // Wait for 3D components to be ready
    // Add a fallback timeout to prevent getting stuck
    const timeout = setTimeout(resolve, 800);
    
    // Try to detect if Three.js or other 3D libraries are being used
    if (typeof window !== 'undefined' && 
        ((window as any).THREE || (window as any).mapboxgl)) {
      // 3D libraries detected, wait a bit longer
      clearTimeout(timeout);
      setTimeout(resolve, 1200);
    }
  });
};

const waitForFinalPreparation = (): Promise<void> => {
  return new Promise((resolve) => {
    // Final preparation time
    setTimeout(resolve, 300);
  });
};

// Wait until all provided video URLs fire `canplaythrough` or 15 s elapse.
const waitForVideos = (urls: string[]): Promise<void> => {
  if (urls.length === 0) return Promise.resolve();

  const promises = urls.map((url) => {
    return new Promise<void>((resolve) => {
      const video = document.createElement('video');
      video.src = url;
      video.preload = 'auto';
      video.muted = true;
      video.playsInline = true;

      const cleanup = () => {
        video.remove();
      };

      const done = () => {
        cleanup();
        resolve();
      };

      // Resolve when enough media is buffered
      video.addEventListener('canplaythrough', done, { once: true });
      video.addEventListener('error', done, { once: true });

      // Fallback timeout (15 s)
      setTimeout(done, 15000);

      // Start loading
      // Append off-DOM to initiate network request in Safari/iOS
      document.body.appendChild(video);
    });
  });

  return Promise.all(promises).then(() => undefined);
};
