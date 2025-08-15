"use client";

import { useEffect, useRef, useCallback } from "react";
import { useRouter, usePathname } from "next/navigation";
import { gsap } from "gsap";
import Logo from "./Logo";

const PageTransition = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const pathname = usePathname();
  const overlayRef = useRef<HTMLDivElement>(null);
  const logoOverlayRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<SVGSVGElement>(null);
  const blocksRef = useRef<HTMLDivElement[]>([]);
  const isTransitioning = useRef(false);
  const pathLengthRef = useRef(0);
  const revealTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Configuration for excluding specific links from page transitions
  const excludedSelectors = [
    '[data-no-transition]',
    '[data-decorative]',
    '[data-animation]',
    '.flip-link',
    '.animation-link',
    '.decorative-link',
    'a[href*="#"]', // Hash links
    'a[role="button"]', // Button-like links
    'a[data-framer-motion]', // Framer Motion links
    'a[href="#"]', // Empty href links
    'a[href=""]', // Empty href links
  ];

  const excludedTextPatterns = [
    'success',
    'stories',
    'careers',
    'flip',
    'animation',
    'decorative',
    'hover',
    'text',
    'motion'
  ];

  // Utility function to check if a link should be excluded
  const shouldExcludeLink = (link: HTMLAnchorElement): boolean => {
    // Check excluded selectors
    for (const selector of excludedSelectors) {
      if (link.matches(selector)) {
        return true;
      }
    }

    // Check excluded classes
    for (const className of ['flip-link', 'animation-link', 'decorative-link']) {
      if (link.classList.contains(className)) {
        return true;
      }
    }

    // Check excluded text patterns
    const linkText = link.textContent?.toLowerCase().trim();
    if (linkText) {
      for (const pattern of excludedTextPatterns) {
        if (linkText.includes(pattern)) {
          return true;
        }
      }
    }

    // Check if it's a hash link
    if (link.hash && link.pathname === pathname) {
      return true;
    }

    // Check if it's a button-like element
    if (link.role === 'button' || link.tagName === 'BUTTON') {
      return true;
    }

    return false;
  };

  const handleRouteChange = useCallback((url: string) => {
    if (isTransitioning.current) return;
    isTransitioning.current = true;
    coverPage(url);
  }, []);

  const onAnchorClick = useCallback(
    (e: Event) => {
      if (isTransitioning.current) {
        e.preventDefault();
        return;
      }

      const target = e.currentTarget as HTMLAnchorElement;
      const mouseEvent = e as MouseEvent;
      
      // Skip if it's not a left click or has modifiers
      if (
        mouseEvent.metaKey ||
        mouseEvent.ctrlKey ||
        mouseEvent.shiftKey ||
        mouseEvent.altKey ||
        mouseEvent.button !== 0 ||
        target.target === "_blank"
      ) {
        return;
      }

      // Skip if it's a hash link (same page navigation)
      if (target.hash && target.pathname === pathname) {
        return;
      }

      // Check excluded selectors
      for (const selector of excludedSelectors) {
        if (target.matches(selector)) {
          return;
        }
      }

      // Check excluded classes
      for (const className of ['flip-link', 'animation-link', 'decorative-link']) {
        if (target.classList.contains(className)) {
          return;
        }
      }

      // Only intercept actual page navigation, not same-page links
      const href = target.href;
      const url = new URL(href).pathname;
      if (url !== pathname) {
        // Additional check: only intercept if it's a real navigation link
        // Skip if the link text suggests it's decorative
        const linkText = target.textContent?.toLowerCase().trim();
        if (linkText) {
          for (const pattern of excludedTextPatterns) {
            if (linkText.includes(pattern)) {
              return; // Skip decorative links
            }
          }
        }
        
        e.preventDefault();
        handleRouteChange(url);
      }
    },
    [pathname, handleRouteChange]
  );

  const revealPage = useCallback(() => {
    if (revealTimeoutRef.current) {
      clearTimeout(revealTimeoutRef.current);
    }

    gsap.set(blocksRef.current, { scaleX: 1, transformOrigin: "right" });

    gsap.to(blocksRef.current, {
      scaleX: 0,
      duration: 0.4,
      stagger: 0.02,
      ease: "power2.out",
      transformOrigin: "right",
      onComplete: () => {
        isTransitioning.current = false;
        if (overlayRef.current) {
          overlayRef.current.style.pointerEvents = "none";
        }
        if (logoOverlayRef.current) {
          logoOverlayRef.current.style.pointerEvents = "none";
        }
      },
    });

    revealTimeoutRef.current = setTimeout(() => {
      if (blocksRef.current.length > 0) {
        const firstBlock = blocksRef.current[0];
        if (firstBlock && (gsap.getProperty(firstBlock, "scaleX") as number) > 0) {
          gsap.to(blocksRef.current, {
            scaleX: 0,
            duration: 0.2,
            ease: "power2.out",
            transformOrigin: "right",
            onComplete: () => {
              isTransitioning.current = false;
              if (overlayRef.current) {
                overlayRef.current.style.pointerEvents = "none";
              }
              if (logoOverlayRef.current) {
                logoOverlayRef.current.style.pointerEvents = "none";
              }
            },
          });
        }
      }
    }, 1000);
  }, []);

  useEffect(() => {
    const createBlocks = () => {
      if (!overlayRef.current) return;
      overlayRef.current.innerHTML = "";
      blocksRef.current = [];

      for (let i = 0; i < 20; i++) {
        const block = document.createElement("div");
        block.className = "block";
        overlayRef.current.appendChild(block);
        blocksRef.current.push(block);
      }
    };

    createBlocks();

    gsap.set(blocksRef.current, { scaleX: 0, transformOrigin: "left" });

    if (logoRef.current) {
      // Get all line elements instead of a single path
      const lines = logoRef.current.querySelectorAll("line");
      if (lines.length > 0) {
        // Store the total length of all lines for animation
        let totalLength = 0;
        lines.forEach((line) => {
          const length = (line as SVGLineElement).getTotalLength();
          totalLength += length;
          // Set initial state for each line
          gsap.set(line, {
            strokeDasharray: length,
            strokeDashoffset: length,
          });
        });
        pathLengthRef.current = totalLength;
      }
    }

    // Start triangle generation with a small delay
    // setTimeout(() => {
    //   startTriangleGeneration();
    // }, 200);

    // Check loading status periodically
    // const loadingCheckInterval = setInterval(() => {
    //   checkBackgroundComponentsLoaded();
    // }, 500);

    // Also check on window load event
    const handleWindowLoad = () => {
      setTimeout(() => {
        // checkBackgroundComponentsLoaded(); // Removed triangle generation check
      }, 1000);
    };

    if (document.readyState === 'complete') {
      handleWindowLoad();
    } else {
      window.addEventListener('load', handleWindowLoad);
    }

    revealPage();

    // More selective link detection - only target actual navigation links
    const isNavigationLink = (link: Element) => {
      if (link.tagName !== 'A') return false;
      
      const anchorLink = link as HTMLAnchorElement;
      
      // Use the utility function to check if link should be excluded
      return !shouldExcludeLink(anchorLink);
    };

    // Only select actual navigation links
    const links = document.querySelectorAll('a[href^="/"]');
    const navigationLinks = Array.from(links).filter(isNavigationLink);
    
    // Debug: Log which links are being intercepted
    if (process.env.NODE_ENV === 'development') {
      console.log('PageTransition: Intercepting navigation links:', navigationLinks.length);
      navigationLinks.forEach(link => {
        console.log('  -', (link as HTMLAnchorElement).href, (link as HTMLAnchorElement).textContent?.trim());
      });
    }
    
    navigationLinks.forEach((link) => {
      link.addEventListener("click", onAnchorClick);
    });

    return () => {
      navigationLinks.forEach((link) => {
        link.removeEventListener("click", onAnchorClick);
      });
      if (revealTimeoutRef.current) {
        clearTimeout(revealTimeoutRef.current);
      }
      // if (triangleIntervalRef.current) { // Removed triangle generation cleanup
      //   clearInterval(triangleIntervalRef.current);
      // }
      // if (loadingCheckInterval) { // Removed triangle generation cleanup
      //   clearInterval(loadingCheckInterval);
      // }
      window.removeEventListener('load', handleWindowLoad);
    };
  }, [router, pathname, onAnchorClick, revealPage]); // Removed checkBackgroundComponentsLoaded from dependencies

  const coverPage = (url: string) => {
    if (overlayRef.current) {
      overlayRef.current.style.pointerEvents = "auto";
    }
    if (logoOverlayRef.current) {
      logoOverlayRef.current.style.pointerEvents = "auto";
    }

    const tl = gsap.timeline({
      onComplete: () => router.push(url),
    });

    tl.to(blocksRef.current, {
      scaleX: 1,
      duration: 0.4,
      stagger: 0.02,
      ease: "power2.out",
      transformOrigin: "left",
    })

      .set(logoOverlayRef.current, { opacity: 1 }, "-=0.2")

      .set(
        logoRef.current?.querySelectorAll("line") as NodeListOf<SVGLineElement>,
        {
          strokeDashoffset: (i, target) => (target as SVGLineElement).getTotalLength(),
        },
        "-=0.25"
      )

      .to(
        logoRef.current?.querySelectorAll("line") as NodeListOf<SVGLineElement>,
        {
          strokeDashoffset: 0,
          duration: 2,
          ease: "power2.inOut",
          stagger: 0.1, // Slight stagger between lines
        },
        "-=0.5"
      )

      // Remove the fill animation - keep only the stroke
      // .to(
      //   logoRef.current?.querySelector("path") as SVGPathElement,
      //   {
      //     fill: "#140A8E",
      //     duration: 1,
      //     ease: "power2.out",
      //   },
      //   "-=0.5"
      // )

      .to(logoOverlayRef.current, {
        opacity: 0,
        duration: 0.25,
        ease: "power2.out",
      });
  };

  return (
    <>
      <div ref={overlayRef} className="transition-overlay" />
      
      <div ref={logoOverlayRef} className="logo-overlay">
        <div className="logo-container">
          <Logo ref={logoRef} />
        </div>
      </div>
      {children}
    </>
  );
};

export default PageTransition;

