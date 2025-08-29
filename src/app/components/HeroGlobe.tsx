"use client";
import React, { useEffect, useRef, useState, useCallback } from "react";
import { useLenisScrollLock } from "../hooks/useLenisScrollLock";
// @ts-ignore
import createGlobe from "cobe";
import TextFlip from './globeTextFlip';

// Utility function to convert a hex color string to a normalized RGB array
const hexToRgbNormalized = (hex: string): [number, number, number] => {
  let r = 0, g = 0, b = 0;
  const cleanHex = hex.startsWith("#") ? hex.slice(1) : hex;

  if (cleanHex.length === 3) {
    r = parseInt(cleanHex[0] + cleanHex[0], 16);
    g = parseInt(cleanHex[1] + cleanHex[1], 16);
    b = parseInt(cleanHex[2] + cleanHex[2], 16);
  } else if (cleanHex.length === 6) {
    r = parseInt(cleanHex.substring(0, 2), 16);
    g = parseInt(cleanHex.substring(2, 4), 16);
    b = parseInt(cleanHex.substring(4, 6), 16);
  } else {
    console.warn(`Invalid hex color: ${hex}. Falling back to black.`);
    return [0, 0, 0];
  }

  return [r / 255, g / 255, b / 255];
};

interface HeroGlobeProps {
  className?: string;
  theta?: number;
  dark?: number;
  scale?: number;
  diffuse?: number;
  mapSamples?: number;
  mapBrightness?: number;
  baseColor?: [number, number, number] | string;
  markerColor?: [number, number, number] | string;
  glowColor?: [number, number, number] | string;
  size?: string;
}

const HeroGlobe: React.FC<HeroGlobeProps> = ({
  className,
  theta = 0.25,
  dark = 0,
  scale = 1.1,
  diffuse = 1.2,
  mapSamples = 60000,
  mapBrightness = 10,
  baseColor = "#1E3A8A",
  markerColor = "#FFFFFF",
  glowColor = "#3B82F6",
  size = "25rem",
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const globeRef = useRef<any>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Scroll lock state
  const [expansionProgress, setExpansionProgress] = useState(0);
  const [hasCompleted, setHasCompleted] = useState(false);
  const [isLocked, setIsLocked] = useState(false);
  const accumulatedScroll = useRef(0);
  const maxExpansion = 100; // Total scroll needed for full expansion
  const lockReleaseThreshold = 40; // Release lock at 40% progress
  const isInView = useRef(false);
  const originalScrollY = useRef(0);
  const lastRealScrollY = useRef(0);
  
  // Use the scroll lock hook
  const { lock, unlock, isLocked: scrollLocked } = useLenisScrollLock({
    onLock: () => {
      console.log('🎉 Celebration section locked - scroll blocked');
      setIsLocked(true);
    },
    onUnlock: () => {
      console.log('🎉 Celebration section unlocked - scroll resumed');
      setIsLocked(false);
    }
  });
  
  const phiRef = useRef(0);
  const thetaRef = useRef(theta);
  const isDragging = useRef(false);
  const lastMouseX = useRef(0);
  const lastMouseY = useRef(0);
  const autoRotateSpeed = 0.003;

  // Check if globe section is in view and handle scroll-based expansion
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        isInView.current = entry.isIntersecting;
        if (entry.isIntersecting) {
          if (!hasCompleted) {
            // First time entering - store original position and start locking
            originalScrollY.current = window.scrollY;
            console.log('🎯 HeroGlobe section entered view - locking scroll at position:', originalScrollY.current);
            lock(); // Use the new scroll lock hook
          } else {
            // Coming back after completion - track real scroll position
            lastRealScrollY.current = window.scrollY;
          }
        } else {
          // Section is out of view - no need to lock
        }
      },
      { threshold: 0.01, rootMargin: '-200px 0px' } // Trigger extremely early and add very large margin
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, [hasCompleted, lock]);

  // Handle wheel events for globe expansion (only when locked)
  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      if (!isInView.current || hasCompleted || !scrollLocked) return;
      
      e.preventDefault();
      e.stopPropagation();
      
      // Accumulate scroll for globe expansion
      accumulatedScroll.current = Math.max(0, 
        Math.min(maxExpansion, accumulatedScroll.current + e.deltaY)
      );
      
      const progress = accumulatedScroll.current / maxExpansion;
      setExpansionProgress(progress);
      
      // Release lock early when threshold is reached (40% progress)
      if (progress >= (lockReleaseThreshold / 100) && !hasCompleted) {
        setHasCompleted(true);
        // Small delay before allowing scroll
        setTimeout(() => {
          unlock(); // Use the new scroll lock hook to unlock
        }, 300);
      }
      
      return false;
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isInView.current || hasCompleted || !scrollLocked) return;
      
      if (['ArrowDown', 'ArrowUp', ' ', 'PageDown', 'PageUp'].includes(e.key)) {
        e.preventDefault();
        e.stopPropagation();
        
        const scrollAmount = e.key === ' ' || e.key === 'PageDown' ? 150 : 
                           e.key === 'PageUp' ? -150 : 
                           e.key === 'ArrowDown' ? 75 : -75;
        
        accumulatedScroll.current = Math.max(0, 
          Math.min(maxExpansion, accumulatedScroll.current + scrollAmount)
        );
        
        const progress = accumulatedScroll.current / maxExpansion;
        setExpansionProgress(progress);
        
        // Release lock early when threshold is reached
        if (progress >= (lockReleaseThreshold / 100) && !hasCompleted) {
          setHasCompleted(true);
          setTimeout(() => {
            unlock(); // Use the new scroll lock hook to unlock
          }, 300);
        }
        
        return false;
      }
    };

    // Add event listeners only when scroll is locked
    if (scrollLocked) {
      // Combined wheel handler that allows globe expansion but prevents page scroll
      const combinedWheelHandler = (e: WheelEvent) => {
        if (!isInView.current || hasCompleted || !scrollLocked) return;
        
        e.preventDefault();
        e.stopPropagation();
        
        // Accumulate scroll for globe expansion
        accumulatedScroll.current = Math.max(0, 
          Math.min(maxExpansion, accumulatedScroll.current + e.deltaY)
        );
        
        const progress = accumulatedScroll.current / maxExpansion;
        setExpansionProgress(progress);
        
        // Release lock early when threshold is reached (40% progress)
        if (progress >= (lockReleaseThreshold / 100) && !hasCompleted) {
          setHasCompleted(true);
          // Small delay before allowing scroll
          setTimeout(() => {
            unlock(); // Use the new scroll lock hook to unlock
          }, 300);
        }
        
        return false;
      };
      
      window.addEventListener('wheel', combinedWheelHandler, { capture: true, passive: false });
      window.addEventListener('keydown', handleKeyDown, { capture: true });
      
      // Add continuous scroll position reset during lock
      const resetScrollPosition = () => {
        if (window.scrollY !== originalScrollY.current) {
          console.log('🔄 Resetting scroll position to:', originalScrollY.current);
          window.scrollTo(0, originalScrollY.current);
        }
      };
      
      // Reset position every frame during lock
      const scrollResetInterval = setInterval(resetScrollPosition, 16); // 60fps
      
      // Add aggressive scroll prevention to stop any scroll events from reaching Lenis
      const preventAllScroll = (e: Event) => {
        if (e.type === 'scroll' || e.type === 'touchmove') {
          e.preventDefault();
          e.stopPropagation();
          e.stopImmediatePropagation();
          window.scrollTo(0, originalScrollY.current);
          return false;
        }
      };
      
      // Add multiple event listeners to catch all possible scroll events
      window.addEventListener('scroll', preventAllScroll, { capture: true, passive: false });
      window.addEventListener('touchmove', preventAllScroll, { capture: true, passive: false });
      
      return () => {
        window.removeEventListener('wheel', combinedWheelHandler, { capture: true });
        window.removeEventListener('keydown', handleKeyDown, { capture: true });
        window.removeEventListener('scroll', preventAllScroll, { capture: true });
        window.removeEventListener('touchmove', preventAllScroll, { capture: true });
        clearInterval(scrollResetInterval);
      };
    }
  }, [hasCompleted, maxExpansion, lockReleaseThreshold, scrollLocked, unlock]);

  // Reset when component unmounts
  useEffect(() => {
    return () => {
      // Clean up any remaining scroll locks
      if (scrollLocked) {
        unlock();
      }
    };
  }, [scrollLocked, unlock]);

  // Globe initialization
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const resolvedBaseColor: [number, number, number] =
      typeof baseColor === "string"
        ? hexToRgbNormalized(baseColor)
        : baseColor || [0.4, 0.6509, 1];

    const resolvedMarkerColor: [number, number, number] =
      typeof markerColor === "string"
        ? hexToRgbNormalized(markerColor)
        : markerColor || [1, 0, 0];

    const resolvedGlowColor: [number, number, number] =
      typeof glowColor === "string"
        ? hexToRgbNormalized(glowColor)
        : glowColor || [0.2745, 0.5765, 0.898];

    const initGlobe = () => {
      if (globeRef.current) {
        globeRef.current.destroy();
        globeRef.current = null;
      }

      const rect = canvas.getBoundingClientRect();
      const size = Math.min(rect.width, rect.height);
      const devicePixelRatio = window.devicePixelRatio || 1;
      const internalWidth = size * devicePixelRatio;
      const internalHeight = size * devicePixelRatio;

      canvas.width = internalWidth;
      canvas.height = internalHeight;

      globeRef.current = createGlobe(canvas, {
        devicePixelRatio: devicePixelRatio,
        width: internalWidth,
        height: internalHeight,
        phi: phiRef.current,
        theta: thetaRef.current,
        dark: dark,
        scale: scale,
        diffuse: diffuse,
        mapSamples: mapSamples,
        mapBrightness: mapBrightness,
        baseColor: resolvedBaseColor,
        markerColor: resolvedMarkerColor,
        glowColor: resolvedGlowColor,
        opacity: 1,
        offset: [0, 0],
        markers: [],
        onRender: (state: Record<string, any>) => {
          if (!isDragging.current) {
            phiRef.current += autoRotateSpeed;
          }
          state.phi = phiRef.current;
          state.theta = thetaRef.current;
        },
      });
    };

    const onMouseDown = (e: MouseEvent) => {
      isDragging.current = true;
      lastMouseX.current = e.clientX;
      lastMouseY.current = e.clientY;
      canvas.style.cursor = "grabbing";
    };

    const onMouseMove = (e: MouseEvent) => {
      if (isDragging.current) {
        const deltaX = e.clientX - lastMouseX.current;
        const deltaY = e.clientY - lastMouseY.current;
        const rotationSpeed = 0.005;

        phiRef.current += deltaX * rotationSpeed;
        thetaRef.current = Math.max(
          -Math.PI / 2,
          Math.min(Math.PI / 2, thetaRef.current - deltaY * rotationSpeed)
        );

        lastMouseX.current = e.clientX;
        lastMouseY.current = e.clientY;
      }
    };

    const onMouseUp = () => {
      isDragging.current = false;
      canvas.style.cursor = "grab";
    };

    const onMouseLeave = () => {
      if (isDragging.current) {
        isDragging.current = false;
        canvas.style.cursor = "grab";
      }
    };

    initGlobe();

    canvas.addEventListener("mousedown", onMouseDown);
    canvas.addEventListener("mousemove", onMouseMove);
    canvas.addEventListener("mouseup", onMouseUp);
    canvas.addEventListener("mouseleave", onMouseLeave);

    const handleResize = () => {
      initGlobe();
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      if (canvas) {
        canvas.removeEventListener("mousedown", onMouseDown);
        canvas.removeEventListener("mousemove", onMouseMove);
        canvas.removeEventListener("mouseup", onMouseUp);
        canvas.removeEventListener("mouseleave", onMouseLeave);
      }
      if (globeRef.current) {
        globeRef.current.destroy();
        globeRef.current = null;
      }
    };
  }, [
    theta,
    dark,
    scale,
    diffuse,
    mapSamples,
    mapBrightness,
    baseColor,
    markerColor,
    glowColor,
  ]);

  // Calculate current size and scale based on expansion progress
  // Reduce the scaling factors to make the expansion more subtle
  const currentScale = 1 + (expansionProgress * 0.8); // Scale from 1 to 1.8 (reduced from 2.5)
  const sizeMultiplier = 1 + (expansionProgress * 0.6); // Size multiplier (reduced from 1.2)

  return (
    <>
      <div
        ref={containerRef}
        className={`flex items-center justify-center z-[10] mx-auto ${className || ''}`}
        style={{
          width: "100vw",
          height: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          overflow: "hidden",
          position: "relative",
        }}
      >
        {/* Background Video */}
        <video
          autoPlay
          loop
          muted
          playsInline
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            zIndex: -1,
          }}
        >
          <source src="/globeHero/stars.mp4" type="video/mp4" />
        </video>
        
        {/* Text Animation Overlay */}
        <div style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          zIndex: 10,
          textAlign: "center",
          width: "100%",
        }}>
          {/* Large Heading */}
          <div style={{
            color: "#ffffff",
            fontSize: "4rem",
            fontWeight: "700",
            fontFamily: "'Roboto', sans-serif",
            textShadow: "0 0 25px rgba(20, 0, 121, 0.6)",
            marginBottom: "3rem",
            lineHeight: "1.2",
          }}>
            Digital Infrastructure Solutions
          </div>
          
          {/* Animated Text */}
          <div style={{
            color: "#140079",
            fontSize: "2.5rem",
            fontWeight: "700",
            fontFamily: "'Roboto', sans-serif",
            textShadow: "0 0 25px rgba(20, 0, 121, 0.6)",
          }}>
            <TextFlip />
          </div>
          
          {/* Scroll Lock Indicator */}
          {scrollLocked && (
            <div style={{
              position: "absolute",
              bottom: "-4rem",
              left: "50%",
              transform: "translateX(-50%)",
              color: "#140079",
              fontSize: "1rem",
              fontWeight: "500",
              fontFamily: "'Roboto', sans-serif",
              backgroundColor: "rgba(255, 255, 255, 0.9)",
              padding: "0.5rem 1rem",
              borderRadius: "2rem",
              boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
            }}>
              🔒 Scroll locked - Use wheel to expand globe
            </div>
          )}
        </div>
        
        <canvas
          ref={canvasRef}
          style={{
            width: `calc(${size} * ${sizeMultiplier})`,
            height: `calc(${size} * ${sizeMultiplier})`,
            maxWidth: "200%",
            maxHeight: "200%",
            aspectRatio: "1",
            display: "block",
            cursor: "grab",
            transform: `scale(${currentScale})`,
            transition: "all 0.2s ease-out",
          }}
        />
      </div>
    </>
  );
};

export default HeroGlobe;