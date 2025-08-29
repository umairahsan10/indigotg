'use client';

import { useEffect, useRef, useCallback } from 'react';

interface ScrollLockOptions {
  onLock?: () => void;
  onUnlock?: () => void;
}

export function useLenisScrollLock(options: ScrollLockOptions = {}) {
  const originalScrollY = useRef(0);
  const isLocked = useRef(false);
  const lenisRef = useRef<any>(null);

  useEffect(() => {
    // Store reference to Lenis instance
    lenisRef.current = (window as any).lenis;
  }, []);

  const lock = useCallback(() => {
    console.log('🔒 Locking scroll...');
    
    // 1. Store current position
    originalScrollY.current = window.scrollY;
    isLocked.current = true;
    
    // 2. Immediately clear any pending scroll animations
    if (lenisRef.current) {
      // Force Lenis to stop any current animations
      if (typeof lenisRef.current.stop === 'function') {
        lenisRef.current.stop();
      }
      
      // Clear any queued scroll targets
      if (lenisRef.current.targetScroll !== undefined) {
        lenisRef.current.targetScroll = originalScrollY.current;
      }
    }
    
    // 3. COMPLETELY DISABLE Lenis during lock
    const lenis = lenisRef.current;
    if (lenis) {
      // Stop Lenis animation
      if (typeof lenis.stop === 'function') {
        lenis.stop();
      }
      
      // Clear any accumulated velocity/momentum
      if (lenis.velocity !== undefined) {
        lenis.velocity = 0;
      }
      if (lenis.direction !== undefined) {
        lenis.direction = 0;
      }
      if (lenis.targetScroll !== undefined) {
        lenis.targetScroll = originalScrollY.current;
      }
      if (lenis.animatedScroll !== undefined) {
        lenis.animatedScroll = originalScrollY.current;
      }
      
      // Force Lenis to update immediately
      if (typeof lenis.update === 'function') {
        lenis.update();
      }
      
      // Reset internal state if accessible
      if (typeof lenis.reset === 'function') {
        lenis.reset();
      }
      
      // Completely disable Lenis by setting smooth to false
      if (lenis.smooth !== undefined) {
        lenis.smooth = false;
      }
      
      // Disable wheel multiplier
      if (lenis.wheelMultiplier !== undefined) {
        lenis.wheelMultiplier = 0;
      }
    }
    
    // 4. Temporarily remove Lenis from window to prevent any scroll processing
    if ((window as any).lenis) {
      (window as any)._lenisBackup = (window as any).lenis;
      delete (window as any).lenis;
    }
    
    // 5. Force scroll position to stay put
    window.scrollTo(0, originalScrollY.current);
    
    // 6. Add CSS-based scroll lock as backup
    document.body.style.overflow = 'hidden';
    document.body.style.position = 'fixed';
    document.body.style.top = `-${originalScrollY.current}px`;
    document.body.style.width = '100%';
    
    // 7. Call onLock callback if provided
    options.onLock?.();
  }, [options]);

  const unlock = useCallback(() => {
    console.log('🔓 Unlocking scroll with RESET...');
    
    // 1. Remove CSS locks first
    document.body.style.overflow = '';
    document.body.style.position = '';
    document.body.style.top = '';
    document.body.style.width = '';
    
    // 2. Mark as unlocked
    isLocked.current = false;
    
    // 3. Restore scroll position
    window.scrollTo(0, originalScrollY.current);
    
    // 4. COMPLETELY RESET Lenis like a fresh page load
    const lenis = lenisRef.current;
    if (lenis) {
      // Stop any current animation
      if (typeof lenis.stop === 'function') {
        lenis.stop();
      }
      
      // Reset ALL internal state to zero
      if (lenis.velocity !== undefined) {
        lenis.velocity = 0;
      }
      if (lenis.direction !== undefined) {
        lenis.direction = 0;
      }
      if (lenis.targetScroll !== undefined) {
        lenis.targetScroll = originalScrollY.current;
      }
      if (lenis.animatedScroll !== undefined) {
        lenis.animatedScroll = originalScrollY.current;
      }
      
      // Reset internal state if accessible
      if (typeof lenis.reset === 'function') {
        lenis.reset();
      }
      
      // Force update
      if (typeof lenis.update === 'function') {
        lenis.update();
      }
      
      // Restore Lenis settings
      if (lenis.smooth !== undefined) {
        lenis.smooth = true;
      }
             if (lenis.wheelMultiplier !== undefined) {
         lenis.wheelMultiplier = 1.0; // Restore homepage wheel multiplier
       }
      
      // Start Lenis fresh
      if (typeof lenis.start === 'function') {
        lenis.start();
      }
    }
    
    // 5. Restore Lenis to window object
    if ((window as any)._lenisBackup) {
      (window as any).lenis = (window as any)._lenisBackup;
      delete (window as any)._lenisBackup;
    }
    
    // 6. Call onUnlock callback if provided
    options.onUnlock?.();
  }, [options]);

  return { lock, unlock, isLocked: isLocked.current };
}
