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

    // Detect if this is the very first visit to the homepage in this browser (no reload yet)
    let isHomeFirstLoad = false;
    try {
      const pathname = window.location.pathname;
      if (pathname === '/' && !localStorage.getItem('homeFirstLoadDone')) {
        isHomeFirstLoad = true;
      }
    } catch {}
    
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

        // Phase 1: Wait for web fonts to load
        if (!mountedRef.current) return;
        setMessage('Loading fonts...');
        setProgress(10);
        options.onProgress?.(10, 'Loading fonts...');

        await waitForFonts();
        setProgress(25);
        options.onProgress?.(25, 'Loading fonts...');

        // Phase 2: Wait for images to load (or skip if none)
        if (!mountedRef.current) return;
        setMessage('Loading images...');
        setProgress(30);
        options.onProgress?.(30, 'Loading images...');
        
        await waitForImages();
        setProgress(50);
        options.onProgress?.(50, 'Loading images...');

        // Phase 3: Wait for videos first frame
        if (!mountedRef.current) return;
        setMessage('Loading videos...');
        setProgress(55);
        options.onProgress?.(55, 'Loading videos...');

        await waitForVideos();
        setProgress(65);
        options.onProgress?.(65, 'Loading videos...');

        // Phase 4: Wait for GSAP components
        if (!mountedRef.current) return;
        setMessage('Initializing animations...');
        setProgress(70);
        options.onProgress?.(70, 'Initializing animations...');
        
        await waitForGSAPComponents();
        setProgress(80);
        options.onProgress?.(80, 'Initializing animations...');

        // Phase 5: Wait for 3D components
        if (!mountedRef.current) return;
        setMessage('Preparing 3D components...');
        setProgress(85);
        options.onProgress?.(85, 'Preparing 3D components...');
        
        await waitFor3DComponents();
        setProgress(92);
        options.onProgress?.(92, 'Preparing 3D components...');

        // Phase 6: Final preparation
        if (!mountedRef.current) return;
        setMessage('Finalizing...');
        setProgress(96);
        options.onProgress?.(96, 'Finalizing...');

        await waitForFinalPreparation();
        setProgress(100);
        options.onProgress?.(100, 'Finalizing...');

        // Ensure minimum loading time
        const elapsed = Date.now() - startTimeRef.current;
        const minLoadingTime = isHomeFirstLoad ? 25000 : 1500; // 15s for first home visit
        
        if (elapsed < minLoadingTime) {
          await new Promise(resolve => setTimeout(resolve, minLoadingTime - elapsed));
        }

        // Mark that the first homepage load has completed
        if (isHomeFirstLoad) {
          try { localStorage.setItem('homeFirstLoadDone', 'true'); } catch {}
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

const waitForFonts = (): Promise<void> => {
  // Use the standard FontFaceSet API when available; falls back instantly otherwise
  const fontSet = (document as any).fonts;
  if (fontSet && typeof fontSet.ready === 'object' && typeof fontSet.ready.then === 'function') {
    return fontSet.ready as Promise<void>;
  }
  return Promise.resolve();
};

const waitForVideos = (): Promise<void> => {
  return new Promise((resolve) => {
    const videos = Array.from(document.querySelectorAll('video'));
    if (videos.length === 0) {
      setTimeout(resolve, 200); // No videos to wait for, but add a small delay
      return;
    }

    let loadedCount = 0;
    const totalVideos = videos.length;

    const checkComplete = () => {
      loadedCount++;
      if (loadedCount >= totalVideos) {
        resolve();
      }
    };

    videos.forEach(video => {
      if (video.readyState >= 1) { // Check for 'HAVE_CURRENT_DATA' or higher
        checkComplete();
      } else {
        video.addEventListener('loadedmetadata', checkComplete);
        video.addEventListener('error', checkComplete);
      }
    });

    // Fallback: if videos take too long, resolve anyway
    setTimeout(resolve, 10000); // Max 10 seconds wait for videos
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
