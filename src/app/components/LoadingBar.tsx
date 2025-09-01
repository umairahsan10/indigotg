"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import Logo from "./Logo";
import { useResourceLoader } from "../hooks/useResourceLoader";
import { useVideoPreloader } from "../hooks/useVideoPreloader";

interface LoadingBarProps {
  onComplete?: () => void;
  /** URLs of videos that must preload before loader completes (home page only) */
  videoUrls?: string[];
}

const LoadingBar = ({ onComplete, videoUrls }: LoadingBarProps) => {
  const progressBarRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<SVGSVGElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Use real resource detection
  const { progress, message, isComplete } = useResourceLoader({ videoUrls });

  // If we were given videoUrls we also wait for actual <video> elements with the
  // data attribute to be able to play through.
  const isVideoLoading = videoUrls ? useVideoPreloader("video[data-hero-video]") : false;

  // Trigger onComplete when everything is ready
  useEffect(() => {
    if (isComplete && !isVideoLoading) {
      const t = setTimeout(() => onComplete?.(), 300); // small delay for UX
      return () => clearTimeout(t);
    }
  }, [isComplete, isVideoLoading, onComplete]);

  useEffect(() => {
    if (!containerRef.current || !logoRef.current) return;

    // Show the logo (already drawn from triangle phase)
    gsap.set(logoRef.current, { opacity: 1 });
  }, []);

  return (
    <div 
      ref={containerRef}
      className="fixed inset-0 z-[99999] flex flex-col items-center justify-center"
      style={{ backgroundColor: "#140079" }}
    >
      <div className="logo-container mb-8">
        <Logo ref={logoRef} />
      </div>
      
      <div className="progress-container w-80 max-w-md">
        <div className="progress-bar bg-gray-200 rounded-full h-3 mb-4 overflow-hidden">
          <div 
            ref={progressBarRef}
            className="progress-fill h-full rounded-full transition-all duration-300 ease-out"
            style={{ 
              width: `${progress}%`,
              backgroundColor: "#140079"
            }}
          />
        </div>
        
        <div className="progress-text text-center">
          <div className="text-lg font-semibold text-white mb-2">
            {progress}%
          </div>
          <div className="text-sm text-white">
            {message}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoadingBar;
