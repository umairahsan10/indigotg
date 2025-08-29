import { useEffect, useRef, useState, useCallback } from 'react';

interface UseSectionLockOptions {
  threshold?: number; // Intersection threshold (0-1)
  lockDuration?: number; // How long to keep the lock active (ms)
  autoUnlock?: boolean; // Whether to automatically unlock after duration
  onLock?: () => void; // Callback when lock activates
  onUnlock?: () => void; // Callback when lock deactivates
  enableTouchLock?: boolean; // Whether to lock on touch devices
}

interface UseSectionLockReturn {
  isLocked: boolean;
  sectionRef: React.RefObject<HTMLDivElement>;
  lockSection: () => void;
  unlockSection: () => void;
  forceUnlock: () => void;
}

// Hook adapted from shared logic
export const useSectionLock = ({
  threshold = 0.8,
  lockDuration = 3000,
  autoUnlock = true,
  onLock,
  onUnlock,
  enableTouchLock = true
}: UseSectionLockOptions = {}): UseSectionLockReturn => {
  const [isLocked, setIsLocked] = useState(false);
  const [hasTriggered, setHasTriggered] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const lockTimerRef = useRef<NodeJS.Timeout | null>(null);
  const unlockTimerRef = useRef<NodeJS.Timeout | null>(null);
  const lenisRef = useRef<any>(null);

  // Get Lenis instance (if used in project)
  const getLenis = useCallback(() => {
    if (typeof window !== 'undefined') {
      return (window as any).lenis;
    }
    return null;
  }, []);

  // Lock the section
  const lockSection = useCallback(() => {
    if (isLocked) return;

    setIsLocked(true);
    setHasTriggered(true);

    // Stop Lenis smooth scrolling
    const lenis = getLenis();
    if (lenis) {
      lenis.stop();
      lenisRef.current = lenis;
    }

    // Call onLock callback
    onLock?.();

    // Auto unlock after duration if enabled
    if (autoUnlock) {
      lockTimerRef.current = setTimeout(() => {
        unlockSection();
      }, lockDuration);
    }
  }, [isLocked, autoUnlock, lockDuration, onLock, getLenis, unlockSection]);

  // Unlock the section
  const unlockSection = useCallback(() => {
    if (!isLocked) return;

    setIsLocked(false);

    // Resume Lenis smooth scrolling
    if (lenisRef.current) {
      lenisRef.current.start();
      lenisRef.current.raf(performance.now());
      lenisRef.current = null;
    }

    // Call onUnlock callback
    onUnlock?.();
  }, [isLocked, onUnlock]);

  // Force unlock (ignores timers)
  const forceUnlock = useCallback(() => {
    if (lockTimerRef.current) {
      clearTimeout(lockTimerRef.current);
      lockTimerRef.current = null;
    }
    if (unlockTimerRef.current) {
      clearTimeout(unlockTimerRef.current);
      unlockTimerRef.current = null;
    }
    unlockSection();
  }, [unlockSection]);

  // Setup intersection observer
  useEffect(() => {
    if (hasTriggered || !sectionRef.current) return;

    const setupObserver = () => {
      if (!sectionRef.current) return;

      // Check if element has dimensions
      const rect = sectionRef.current.getBoundingClientRect();
      if (rect.width === 0 || rect.height === 0) {
        // Retry after a short delay
        setTimeout(setupObserver, 100);
        return;
      }

      observerRef.current = new IntersectionObserver(
        (entries) => {
          const entry = entries[0];

          // Trigger when section reaches the threshold
          if (entry.intersectionRatio >= threshold && !isLocked && !hasTriggered) {
            lockSection();

            // Disconnect observer after triggering
            if (observerRef.current) {
              observerRef.current.disconnect();
              observerRef.current = null;
            }
          }
        },
        {
          threshold: [threshold - 0.05, threshold, threshold + 0.05],
          rootMargin: '0px'
        }
      );

      observerRef.current.observe(sectionRef.current);
    };

    // Start setup with multiple timing approaches
    setupObserver();

    // Fallback for first load
    const fallbackTimer = setTimeout(() => {
      if (!hasTriggered && !observerRef.current) {
        setupObserver();
      }
    }, 200);

    return () => {
      if (fallbackTimer) clearTimeout(fallbackTimer);
    };
  }, [threshold, isLocked, hasTriggered, lockSection]);

  // Prevent scrolling when locked
  useEffect(() => {
    if (!isLocked) return;

    const preventScroll = (e: Event) => {
      e.preventDefault();
      e.stopPropagation();
    };

    // Prevent wheel scrolling
    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      e.stopPropagation();
    };

    // Prevent touch scrolling on mobile
    const handleTouchMove = (e: TouchEvent) => {
      if (enableTouchLock) {
        e.preventDefault();
        e.stopPropagation();
      }
    };

    // Prevent keyboard scrolling
    const handleKeyDown = (e: KeyboardEvent) => {
      if (['ArrowUp', 'ArrowDown', 'PageUp', 'PageDown', 'Home', 'End', ' '].includes(e.key)) {
        e.preventDefault();
        e.stopPropagation();
      }
    };

    // Add event listeners
    document.addEventListener('wheel', handleWheel, { passive: false });
    document.addEventListener('touchmove', handleTouchMove, { passive: false });
    document.addEventListener('keydown', handleKeyDown, { passive: false });

    // Prevent body scroll
    document.body.style.overflow = 'hidden';
    document.body.style.position = 'fixed';
    document.body.style.width = '100%';
    document.body.style.top = `-${window.scrollY}px`;

    return () => {
      // Remove event listeners
      document.removeEventListener('wheel', handleWheel);
      document.removeEventListener('touchmove', handleTouchMove);
      document.removeEventListener('keydown', handleKeyDown);

      // Restore body scroll
      const scrollY = document.body.style.top;
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.width = '';
      document.body.style.top = '';

      if (scrollY) {
        window.scrollTo(0, parseInt(scrollY || '0') * -1);
      }
    };
  }, [isLocked, enableTouchLock]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (lockTimerRef.current) {
        clearTimeout(lockTimerRef.current);
      }
      if (unlockTimerRef.current) {
        clearTimeout(unlockTimerRef.current);
      }
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
      if (lenisRef.current) {
        lenisRef.current.start();
      }
    };
  }, []);

  return {
    isLocked,
    sectionRef,
    lockSection,
    unlockSection,
    forceUnlock
  };
}
