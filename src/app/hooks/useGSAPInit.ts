import { useEffect, useRef } from 'react';
import gsap from 'gsap';

interface GSAPInitOptions {
  plugins?: string[];
  onReady?: () => void;
  onError?: (error: Error) => void;
}

export const useGSAPInit = (options: GSAPInitOptions = {}) => {
  const isInitialized = useRef(false);
  const { plugins = [], onReady, onError } = options;

  useEffect(() => {
    if (isInitialized.current) return;

    try {
      // Ensure GSAP is available
      if (typeof window === 'undefined' || !(window as any).gsap) {
        throw new Error('GSAP is not available');
      }

      // Register plugins if specified
      if (plugins.length > 0) {
        plugins.forEach(pluginName => {
          try {
            // Dynamic import for plugins
            const pluginModule = require(`gsap/${pluginName}`);
            if (pluginModule && pluginModule.default) {
              gsap.registerPlugin(pluginModule.default);
            }
          } catch (error) {
            console.warn(`Failed to register GSAP plugin: ${pluginName}`, error);
          }
        });
      }

      // Set GSAP configuration
      gsap.config({ nullTargetWarn: false });
      
      // Mark as initialized
      isInitialized.current = true;
      
      // Call onReady callback
      if (onReady) {
        onReady();
      }
    } catch (error) {
      console.error('GSAP initialization failed:', error);
      if (onError && error instanceof Error) {
        onError(error);
      }
    }
  }, [plugins, onReady, onError]);

  return {
    isReady: isInitialized.current,
    gsap
  };
};

// Hook specifically for ScrollTrigger
export const useScrollTrigger = () => {
  const { isReady } = useGSAPInit({
    plugins: ['ScrollTrigger'],
    onReady: () => {
      // Ensure ScrollTrigger is properly initialized
      if (typeof window !== 'undefined') {
        // Refresh ScrollTrigger after initialization
        setTimeout(() => {
          const ScrollTrigger = (gsap as any).ScrollTrigger;
          if (ScrollTrigger && ScrollTrigger.refresh) {
            ScrollTrigger.refresh();
          }
        }, 100);
      }
    }
  });

  return { isReady, ScrollTrigger: (gsap as any).ScrollTrigger };
};

// Hook specifically for SplitText
export const useSplitText = () => {
  const { isReady } = useGSAPInit({
    plugins: ['SplitText']
  });

  return { isReady, SplitText: (gsap as any).SplitText };
};
