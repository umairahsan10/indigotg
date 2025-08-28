"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import Logo from "./Logo";
import { useResourceLoader } from "../hooks/useResourceLoader";

interface LoadingBarProps {
  onComplete?: () => void;
}

const LoadingBar = ({ onComplete }: LoadingBarProps) => {
  const progressBarRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<SVGSVGElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Use real resource detection
  const { progress, message, isComplete } = useResourceLoader({
    onComplete: () => {
      // Small delay for smooth transition and to ensure loading bar is visible
      setTimeout(() => {
        onComplete?.();
      }, 500); // Increased delay for better UX
    }
  });

  useEffect(() => {
    if (!containerRef.current || !logoRef.current) return;

    // Show the logo (already drawn from triangle phase)
    gsap.set(logoRef.current, { opacity: 1 });
  }, []);

  return (
    <div 
      ref={containerRef}
      className="fixed inset-0 z-[99999] bg-white flex flex-col items-center justify-center"
    >
      <div className="logo-container mb-8">
        <Logo ref={logoRef} />
      </div>
      
      <div className="progress-container w-80 max-w-md">
        <div className="progress-bar bg-gray-200 rounded-full h-2 mb-4 overflow-hidden">
          <div 
            ref={progressBarRef}
            className="progress-fill bg-blue-600 h-full rounded-full transition-all duration-300 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
        
        <div className="progress-text text-center">
          <div className="text-lg font-semibold text-gray-800 mb-2">
            {progress}%
          </div>
          <div className="text-sm text-gray-600">
            {/* Show message only when larger screens or progress slow */}
            <span className="hidden sm:inline">{message}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoadingBar;
