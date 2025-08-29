'use client';

import { useEffect } from 'react';

export default function ScrollRestorationFix() {
  useEffect(() => {
    // Add loaded class to body when page is fully loaded
    const handleLoad = () => {
      document.body.classList.add('loaded');
    };

    // If page is already loaded, add class immediately
    if (document.readyState === 'complete') {
      document.body.classList.add('loaded');
    } else {
      // Otherwise wait for load event
      window.addEventListener('load', handleLoad);
    }

    // Cleanup
    return () => {
      window.removeEventListener('load', handleLoad);
    };
  }, []);

  return null; // This component doesn't render anything
}
