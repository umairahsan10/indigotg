"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";

interface BlocksTransitionProps {
  onComplete?: () => void;
}

const BlocksTransition = ({ onComplete }: BlocksTransitionProps) => {
  const overlayRef = useRef<HTMLDivElement>(null);
  const blocksRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    if (!overlayRef.current) return;

    // Create blocks
    const createBlocks = () => {
      overlayRef.current!.innerHTML = "";
      blocksRef.current = [];

      for (let i = 0; i < 20; i++) {
        const block = document.createElement("div");
        block.className = "block";
        overlayRef.current!.appendChild(block);
        blocksRef.current.push(block);
      }
    };

    createBlocks();

    // Set initial state - blocks covering the screen
    gsap.set(blocksRef.current, { 
      scaleX: 1, 
      transformOrigin: "left" 
    });

    // Animate blocks sliding out to reveal the page
    const tl = gsap.timeline({
      onComplete: () => {
        // Ensure minimum transition time for smooth UX
        setTimeout(() => {
          onComplete?.();
        }, 100); // Reduced delay for smoother transition
      }
    });

    tl.to(blocksRef.current, {
      scaleX: 0,
      duration: 1.0, // Increased duration for smoother animation
      stagger: 0.02, // Faster stagger for smoother reveal
      ease: "power2.out",
      transformOrigin: "right",
    });

    return () => {
      tl.kill();
    };
  }, [onComplete]);

  return (
    <div 
      ref={overlayRef} 
      className="fixed inset-0 z-[99999] pointer-events-none"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 99999
      }}
    />
  );
};

export default BlocksTransition;
