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
        }, 15000); // Increased to 15 seconds for complex pages

        // Phase 1: Wait for images to load (or skip if none)
        if (!mountedRef.current) return;
        setMessage('Loading images...');
        setProgress(10);
        options.onProgress?.(10, 'Loading images...');
        
        await waitForImages();
        setProgress(30);
        options.onProgress?.(30, 'Images loaded');

        // Phase 1.5: Preload critical videos
        if (!mountedRef.current) return;
        setMessage('Preloading videos...');
        setProgress(35);
        options.onProgress?.(35, 'Preloading videos...');
        
        await preloadVideos();
        setProgress(40);
        options.onProgress?.(40, 'Videos ready');

        // Phase 2: Wait for GSAP to be fully ready
        if (!mountedRef.current) return;
        setMessage('Initializing GSAP...');
        setProgress(45);
        options.onProgress?.(45, 'Initializing GSAP...');
        
        await waitForGSAPReady();
        setProgress(60);
        options.onProgress?.(60, 'GSAP ready');

        // Phase 3: Wait for GSAP components to be fully initialized
        if (!mountedRef.current) return;
        setMessage('Initializing animations...');
        setProgress(70);
        options.onProgress?.(70, 'Initializing animations...');
        
        await waitForGSAPComponents();
        setProgress(80);
        options.onProgress?.(80, 'Animations ready');

        // Phase 4: Wait for 3D components
        if (!mountedRef.current) return;
        setMessage('Preparing 3D components...');
        setProgress(85);
        options.onProgress?.(85, 'Preparing 3D components...');
        
        await waitFor3DComponents();
        setProgress(90);
        options.onProgress?.(90, '3D components ready');

        // Phase 5: Final preparation and ensure smooth transitions
        if (!mountedRef.current) return;
        setMessage('Finalizing...');
        setProgress(95);
        options.onProgress?.(95, 'Finalizing...');
        
        await waitForFinalPreparation();
        setProgress(100);
        options.onProgress?.(100, 'Ready');

        // Ensure minimum loading time (at least 2 seconds total for smooth UX)
        const elapsed = Date.now() - startTimeRef.current;
        const minLoadingTime = 2000; // 2 seconds minimum
        
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
      setTimeout(resolve, 300);
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
    setTimeout(resolve, 5000); // Max 5 seconds wait for images
  });
};

const waitForGSAPReady = (): Promise<void> => {
  return new Promise((resolve) => {
    // Wait for GSAP to be fully loaded and available
    const checkGSAP = () => {
      if (typeof window !== 'undefined' && (window as any).gsap) {
        const gsap = (window as any).gsap;
        
        // Check if GSAP is fully loaded with core functionality
        if (gsap.to && gsap.from && gsap.timeline && gsap.registerPlugin) {
          // Wait a bit more for GSAP to be fully ready
          setTimeout(resolve, 200);
          return;
        }
      }
      
      // If GSAP isn't ready yet, check again
      setTimeout(checkGSAP, 50);
    };
    
    checkGSAP();
    
    // Fallback timeout
    setTimeout(resolve, 3000);
  });
};

const waitForGSAPComponents = (): Promise<void> => {
  return new Promise((resolve) => {
    // Wait for GSAP components to be fully initialized
    // This is critical for proper animation loading
    
    const checkComponents = () => {
      // Check if key GSAP components are present in the DOM
      const hasHeroSlider = document.querySelector('[data-gsap-component="hero-slider"]') !== null;
      const hasScrollAnimation = document.querySelector('[data-gsap-component="scroll-animation"]') !== null;
      
      // Wait for at least one major GSAP component to be ready
      if (hasHeroSlider || hasScrollAnimation) {
        // Give extra time for GSAP animations to initialize
        setTimeout(() => {
          // Additional check: ensure GSAP animations are actually working
          if (typeof window !== 'undefined' && (window as any).gsap) {
            const gsap = (window as any).gsap;
            // Force a small animation to test if GSAP is working
            gsap.to('body', { duration: 0.1, opacity: 1, onComplete: () => {
              console.log('GSAP components ready');
              resolve();
            }});
          } else {
            resolve();
          }
        }, 1000);
        return;
      }
      
      // If components aren't ready yet, check again
      setTimeout(checkComponents, 100);
    };
    
    checkComponents();
    
    // Fallback timeout to prevent getting stuck
    setTimeout(resolve, 6000);
  });
};

const waitFor3DComponents = (): Promise<void> => {
  return new Promise((resolve) => {
    // Wait for 3D components to be ready
    const check3D = () => {
      // Try to detect if Three.js or other 3D libraries are being used
      if (typeof window !== 'undefined' && 
          ((window as any).THREE || (window as any).mapboxgl)) {
        // 3D libraries detected, wait a bit longer for initialization
        setTimeout(resolve, 600);
        return;
      }
      
      // Check for Three.js canvas elements
      const threeCanvas = document.querySelector('canvas[data-three]') || 
                         document.querySelector('canvas[data-3d]');
      
      if (threeCanvas) {
        setTimeout(resolve, 800);
        return;
      }
      
      // If no 3D components found, resolve quickly
      setTimeout(resolve, 200);
    };
    
    check3D();
    
    // Fallback timeout
    setTimeout(resolve, 3000);
  });
};

const waitForFinalPreparation = (): Promise<void> => {
  return new Promise((resolve) => {
    // Final preparation time - ensure smooth transitions
    setTimeout(resolve, 400);
  });
};

// Preload critical videos
const preloadVideos = (): Promise<void> => {
  return new Promise((resolve) => {
    const videoUrls = [
      '/home/video1.mp4',
      '/home/globe_video2.mp4', 
      '/home/subsea_video.mp4',
      '/home/218489.mp4',
      '/home/video5.mp4',
      '/home/video8.mp4'
    ];

    if (videoUrls.length === 0) {
      setTimeout(resolve, 100);
      return;
    }

    let loadedCount = 0;
    const totalVideos = videoUrls.length;

    const checkComplete = () => {
      loadedCount++;
      if (loadedCount >= totalVideos) {
        resolve();
      }
    };

    videoUrls.forEach((url) => {
      const video = document.createElement('video');
      video.src = url;
      video.preload = 'auto';
      video.muted = true;
      video.style.display = 'none';
      
      video.addEventListener('loadeddata', () => {
        console.log(`Preloaded video: ${url}`);
        checkComplete();
      });
      
      video.addEventListener('error', () => {
        console.warn(`Failed to preload video: ${url}`);
        checkComplete(); // Continue even if some videos fail
      });

      // Add to DOM temporarily for preloading
      document.body.appendChild(video);
      
      // Remove after a delay to clean up
      setTimeout(() => {
        if (video.parentNode) {
          video.parentNode.removeChild(video);
        }
      }, 10000);
    });

    // Fallback timeout
    setTimeout(resolve, 12000);
  });
};
