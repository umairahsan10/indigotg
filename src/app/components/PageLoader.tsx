"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import TriangleLoader from "./TriangleLoader";
import LoadingBar from "./LoadingBar";
import BlocksTransition from "./BlocksTransition";

interface PageLoaderProps {
  children: React.ReactNode;
}

type LoadingPhase = 'triangle' | 'loading' | 'blocks' | 'complete';

const PageLoader = ({ children }: PageLoaderProps) => {
  const pathname = usePathname();
  const [phase, setPhase] = useState<LoadingPhase>('triangle');
  const [isVisible, setIsVisible] = useState(false);
  const [triangleComplete, setTriangleComplete] = useState(false);

  // Function to scroll to top
  const scrollToTop = () => {
    if (typeof window !== 'undefined') {
      window.scrollTo(0, 0);
      if (document.documentElement) {
        document.documentElement.scrollTop = 0;
      }
      if (document.body) {
        document.body.scrollTop = 0;
      }
    }
  };

  useEffect(() => {
    // Reset loading state on every route change
    setPhase('triangle');
    setTriangleComplete(false);
    setIsVisible(false); // Ensure page content starts hidden

    // Add loading class to body to prevent scroll jumping
    if (typeof document !== 'undefined') {
      document.body.classList.add('loading');
      
      // Also hide the footer during loading
      const footer = document.querySelector('footer');
      if (footer) {
        footer.style.display = 'none';
      }
    }

    // Start with triangle animation
    const triangleTimer = setTimeout(() => {
      setTriangleComplete(true);
      setPhase('loading');
    }, 800); // Fixed triangle duration - ALWAYS wait this long

    return () => {
      clearTimeout(triangleTimer);
      // Clean up loading class if component unmounts
      if (typeof document !== 'undefined') {
        document.body.classList.remove('loading');
        
        // Show footer again if component unmounts
        const footer = document.querySelector('footer');
        if (footer) {
          footer.style.display = '';
        }
      }
    };
  }, [pathname]); // Re-run on every route change

  const handleLoadingComplete = () => {
    // Move to blocks transition
    setPhase('blocks');
    
    // Make page content visible BEFORE blocks transition starts
    // This eliminates the gap between transition and page display
    setIsVisible(true);
  };

  const handleBlocksComplete = () => {
    // Complete the loading sequence
    setPhase('complete');
    
    // Remove loading class from body
    if (typeof document !== 'undefined') {
      document.body.classList.remove('loading');
      
      // Show footer again after loading completes
      const footer = document.querySelector('footer');
      if (footer) {
        footer.style.display = '';
      }
    }
    
    // Make page visible immediately to prevent black screen
    setIsVisible(true);
    
    // Scroll to top immediately after page is visible
    // No delays to prevent black screen
    scrollToTop();
    
    // Double-check scroll position after a bit more time
    setTimeout(() => {
      scrollToTop();
    }, 100);
  };

  // Always render page content with loading overlays as needed
  return (
    <>
      {/* Show loading overlays during loading phases */}
      {phase === 'triangle' && <TriangleLoader />}
      {phase === 'loading' && <LoadingBar onComplete={handleLoadingComplete} />}
      {phase === 'blocks' && <BlocksTransition onComplete={handleBlocksComplete} />}
      
      {/* Always render page content - it's always visible but with different opacity */}
      <div 
        className={`page-content-wrapper transition-opacity duration-300 bg-white ${isVisible ? 'opacity-100' : 'opacity-0'}`}
        style={{ 
          background: 'white',
          minHeight: '100vh',
          position: 'relative',
          zIndex: 1,
          // Ensure page content is always positioned correctly
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          // Always render, just control opacity
          display: 'block',
          visibility: 'visible'
        }}
      >
        {children}
      </div>
    </>
  );
};

export default PageLoader;
