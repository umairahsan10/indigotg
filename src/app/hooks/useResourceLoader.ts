import { useEffect, useState, useRef } from 'react';

interface ResourceLoaderOptions {
  onProgress?: (progress: number, message: string) => void;
  onComplete?: () => void;
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
        setProgress(10);
        options.onProgress?.(10, 'Loading images...');
        
        await waitForImages();
        setProgress(25);
        options.onProgress?.(25, 'Images loaded');
        
        // Phase 2: Wait for web-fonts (if any) to be ready
        if (!mountedRef.current) return;
        setMessage('Loading fonts...');
        setProgress(35);
        options.onProgress?.(35, 'Loading fonts...');

        await waitForFonts();
        setProgress(45);
        options.onProgress?.(45, 'Fonts ready');
        
        // Phase 3: Wait for videos to buffer enough to play
        if (!mountedRef.current) return;
        setMessage('Buffering videos...');
        setProgress(55);
        options.onProgress?.(55, 'Buffering videos...');
        
        await waitForVideos();
        setProgress(70);
        options.onProgress?.(70, 'Videos ready');

        // Phase 4: Wait for GSAP components
        if (!mountedRef.current) return;
        setMessage('Initializing animations...');
        setProgress(78);
        options.onProgress?.(78, 'Initializing animations...');
        
        await waitForGSAPComponents();
        setProgress(85);
        options.onProgress?.(85, 'Animations ready');

        // Phase 5: Wait for 3D components
        if (!mountedRef.current) return;
        setMessage('Preparing interactive components...');
        setProgress(90);
        options.onProgress?.(90, 'Preparing interactive components...');
        
        await waitFor3DComponents();
        setProgress(96);
        options.onProgress?.(96, 'Interactive components ready');

        // Final tiny delay to smooth things out
        if (!mountedRef.current) return;
        setMessage('Finishing touches...');
        setProgress(98);
        options.onProgress?.(98, 'Finishing touches...');

        await waitForFinalPreparation();
        setProgress(100);
        options.onProgress?.(100, 'Ready');

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
    const fallback = setTimeout(resolve, 1000);

    if (typeof window !== 'undefined' && (window as any).gsap) {
      const gsap = (window as any).gsap;
      if (gsap.ScrollTrigger) {
        // Refresh scroll calculations then wait a bit
        gsap.ScrollTrigger.refresh(true);
        setTimeout(() => {
          clearTimeout(fallback);
          resolve();
        }, 400);
      } else {
        // Wait until ScrollTrigger gets registered
        const interval = setInterval(() => {
          if (gsap.ScrollTrigger) {
            clearInterval(interval);
            clearTimeout(fallback);
            gsap.ScrollTrigger.refresh(true);
            setTimeout(resolve, 400);
          }
        }, 100);
      }
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

// NEW: Wait for web-fonts to be ready using the Font Loading API
const waitForFonts = (): Promise<void> => {
  return new Promise((resolve) => {
    if (typeof document === 'undefined' || !(document as any).fonts) {
      resolve();
      return;
    }

    // The FontFaceSet.ready promise resolves when all fonts in the document are loaded
    (document as any).fonts.ready.then(() => resolve()).catch(() => resolve());
    // As a fallback safety timeout
    setTimeout(resolve, 2000);
  });
};

// NEW: Wait for all <video> elements to have enough data to play
const waitForVideos = (): Promise<void> => {
  return new Promise((resolve) => {
    const videos = Array.from(document.querySelectorAll('video')) as HTMLVideoElement[];

    if (videos.length === 0) {
      // No videos – resolve quickly
      setTimeout(resolve, 200);
      return;
    }

    let readyCount = 0;
    const total = videos.length;

    const check = () => {
      readyCount++;
      if (readyCount >= total) {
        resolve();
      }
    };

    videos.forEach((video) => {
      const isReady = () => video.readyState >= 4; // HAVE_ENOUGH_DATA

      if (isReady()) {
        check();
      } else {
        const handler = () => {
          if (isReady()) {
            video.removeEventListener('canplaythrough', handler);
            video.removeEventListener('loadeddata', handler);
            video.removeEventListener('error', handler);
            check();
          }
        };
        video.addEventListener('canplaythrough', handler);
        video.addEventListener('loadeddata', handler);
        video.addEventListener('error', handler);
      }
    });

    // Fallback timeout – don’t wait forever on very slow connections
    setTimeout(resolve, 8000);
  });
};
