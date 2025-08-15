'use client';

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export default function ScrollToTop() {
  const pathname = usePathname();

  const scrollToTop = () => {
    // Try different methods for better browser compatibility
    if (typeof window !== 'undefined') {
      // Method 1: Standard scrollTo
      window.scrollTo(0, 0);
      
      // Method 2: Scroll the document element
      if (document.documentElement) {
        document.documentElement.scrollTop = 0;
      }
      
      // Method 3: Scroll the body
      if (document.body) {
        document.body.scrollTop = 0;
      }
    }
  };

  useEffect(() => {
    // Scroll to top on page load/reload
    scrollToTop();
  }, []);

  useEffect(() => {
    // Don't scroll immediately on route changes
    // Let the loading system handle the scroll after completion
    // This prevents the footer landing issue
  }, [pathname]);
  
  return null;
}
