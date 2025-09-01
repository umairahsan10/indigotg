"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import TriangleLoader from "./TriangleLoader";
import LoadingBar from "./LoadingBar";
import BlocksTransition from "./BlocksTransition";
import { useLoaderController } from "./LoaderContext";

interface PageLoaderProps {
  children: React.ReactNode;
}

type LoadingPhase = 'triangle' | 'loading' | 'blocks' | 'complete';

const PageLoader = ({ children }: PageLoaderProps) => {
  const pathname = usePathname();
  const { sealRegistrations, waitForRegisteredPromises } = useLoaderController();
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
      
      // Store current scroll position to restore it later
      const currentScrollY = window.scrollY;
      document.body.style.setProperty('--scroll-y', `${currentScrollY}px`);
      
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

    // seal registration window shortly after mount (500ms) so components must register quickly
    const sealTimer = setTimeout(() => {
      sealRegistrations();
    }, 2000);

    return () => {
      clearTimeout(triangleTimer);
      clearTimeout(sealTimer); // Clear the new seal timer on unmount
      // Clean up loading class if component unmounts
      if (typeof document !== 'undefined') {
        document.body.classList.remove('loading');
        document.body.style.removeProperty('--scroll-y');
        
        // Show footer again if component unmounts - more robust approach
        const footer = document.querySelector('footer');
        if (footer) {
          footer.style.display = '';
          footer.style.visibility = 'visible';
          footer.style.opacity = '1';
          footer.style.position = 'relative';
          footer.style.zIndex = '1';
        }
      }
    };
  }, [pathname]); // Re-run on every route change

  const handleLoadingComplete = async () => {
    // Wait for all component promises
    await waitForRegisteredPromises();
    // Move to blocks transition
    setPhase('blocks');
    setIsVisible(true);
  };

  const handleBlocksComplete = () => {
    // Complete the loading sequence
    setPhase('complete');
    
    // Remove loading class from body
    if (typeof document !== 'undefined') {
      document.body.classList.remove('loading');
      document.body.style.removeProperty('--scroll-y');
      
      // Show footer again after loading completes - more robust approach
      const footer = document.querySelector('footer');
      if (footer) {
        footer.style.display = '';
        footer.style.visibility = 'visible';
        footer.style.opacity = '1';
        footer.style.position = 'relative';
        footer.style.zIndex = '1';
      }
    }
    
    // Make page visible immediately to prevent black screen
    setIsVisible(true);
    
    // Check if we're on a services subpage that has complex scroll animations
    const isServicesSubpage = pathname.includes('/our-services/') && 
                             (pathname.includes('/design') || 
                              pathname.includes('/deploy') || 
                              pathname.includes('/support'));
    
    if (isServicesSubpage) {
      // For services subpages, add longer delay to ensure animations are ready
      setTimeout(() => {
        scrollToTop();
      }, 300);
      
      // Double-check scroll position after animations settle
      setTimeout(() => {
        scrollToTop();
      }, 600);
    } else {
      // For other pages, scroll to top immediately
      scrollToTop();
      // Wait a frame then scroll again to ensure stability
    requestAnimationFrame(() => scrollToTop());
    
      // Double-check scroll position after a bit more time
      setTimeout(() => {
        scrollToTop();
      }, 100);
    }
    
    // Fallback: Ensure footer is visible after loading completes
    setTimeout(() => {
      const footer = document.querySelector('footer');
      if (footer) {
        footer.style.display = '';
        footer.style.visibility = 'visible';
        footer.style.opacity = '1';
        footer.style.position = 'relative';
        footer.style.zIndex = '1';
      }
    }, 200);
    
    // Ensure smooth transition back to normal scroll behavior
    setTimeout(() => {
      if (typeof document !== 'undefined') {
        document.body.style.transition = 'all 0.3s ease-out';
        // Force a reflow to ensure smooth transition
        document.body.offsetHeight;
      }
    }, 50);
  };

  // Always render page content with loading overlays as needed
  return (
    <>
      {/* Show loading overlays during loading phases */}
      {phase === 'triangle' && <TriangleLoader />}
      {phase === 'loading' && (
        <LoadingBar onComplete={handleLoadingComplete} />
      )}
      {phase === 'blocks' && <BlocksTransition onComplete={handleBlocksComplete} />}
      
      {/* Always render page content - ensure it's fully visible for animations */}
      <div 
        className={`page-content-wrapper ${isVisible ? 'opacity-100' : 'opacity-0'}`}
        style={{ 
          background: '#140079',
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
          visibility: 'visible',
          // Remove transition temporarily to test if it's interfering
          transition: isVisible ? 'opacity 0.3s ease-in-out' : 'none'
        }}
      >
        {children}
      </div>
    </>
  );
};

export default PageLoader;
