'use client';

import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';

interface ScrollControlOptions {
  duration?: number;
  wheelMultiplier?: number;
  enabled?: boolean;
}

export const useScrollControl = (options: ScrollControlOptions = {}) => {
  const pathname = usePathname();
  const isHomepage = pathname === '/';
  const lenisRef = useRef<any>(null);

  useEffect(() => {
    if (!isHomepage || !options.enabled) return;

    // Find the existing Lenis instance from the Navigation component
    const findLenisInstance = () => {
      // Look for Lenis instance in the global scope or try to access it
      if (typeof window !== 'undefined') {
        // Try to find Lenis instance from GSAP ScrollTrigger
        const triggers = (window as any).ScrollTrigger?.getAll?.() || [];
        for (const trigger of triggers) {
          if (trigger.vars?.onUpdate) {
            // This is a workaround to access the Lenis instance
            // In a real implementation, you might want to expose this differently
            return null;
          }
        }
      }
      return null;
    };

    const lenis = findLenisInstance();
    if (lenis) {
      lenisRef.current = lenis;
      
      // Apply custom scroll settings
      if (options.duration !== undefined) {
        lenis.options.duration = options.duration;
      }
      
      if (options.wheelMultiplier !== undefined) {
        lenis.options.wheelMultiplier = options.wheelMultiplier;
      }
    }
  }, [isHomepage, options.enabled, options.duration, options.wheelMultiplier]);

  const scrollTo = (target: string | number, options?: any) => {
    if (lenisRef.current) {
      lenisRef.current.scrollTo(target, options);
    }
  };

  const scrollToTop = () => {
    if (lenisRef.current) {
      lenisRef.current.scrollTo(0, { duration: 2 });
    }
  };

  return {
    scrollTo,
    scrollToTop,
    isHomepage,
    lenis: lenisRef.current,
  };
};

