'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { CustomEase } from 'gsap/CustomEase';
import { SplitText } from 'gsap/SplitText';
import Lenis from 'lenis';

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const isAnimatingRef = useRef(false);
  const scrollYRef = useRef(0);
  
  const menuToggleBtnRef = useRef<HTMLDivElement>(null);
  const menuOverlayRef = useRef<HTMLDivElement>(null);
  const menuOverlayContainerRef = useRef<HTMLDivElement>(null);
  const menuMediaWrapperRef = useRef<HTMLDivElement>(null);
  const copyContainersRef = useRef<HTMLDivElement>(null);
  const hamburgerIconRef = useRef<HTMLDivElement>(null);
  const lenisRef = useRef<Lenis | null>(null);
  type SplitResult = { lines: HTMLElement[] };
  const splitTextByContainerRef = useRef<SplitResult[][]>([]);

  const navItems = [
    { href: '/who-we-are', label: 'Who We Are' },
    { href: '/our-services', label: 'Our Services' },
    { href: '/solutions2', label: 'Solutions' },
    { href: '/work-with-us', label: 'Work With Us' },
    { href: '/success-stories', label: 'Success Stories' },
    { href: '/get-in-touch', label: 'Get In Touch' },
  ];

  const menuTags: { text: string; href: string }[] = [];

  useEffect(() => {
    // Check if mobile
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 1000);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    // Register GSAP plugins
    gsap.registerPlugin(CustomEase, SplitText, ScrollTrigger);
    CustomEase.create("hop", ".87,0,.13,1");

    // Initialize Lenis
    lenisRef.current = new Lenis();
    if (lenisRef.current) {
      // Sync GSAP ScrollTrigger with Lenis scroll events
      lenisRef.current.on("scroll", () => ScrollTrigger.update());
    }
    function raf(time: number) {
      if (lenisRef.current) {
        lenisRef.current.raf(time);
      }
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    // Set initial state for menu content
    if (copyContainersRef.current) {
      gsap.set(copyContainersRef.current, { opacity: 1 });
    }
    
    // Set initial state for menu overlay content
    if (menuOverlayContainerRef.current) {
      gsap.set(menuOverlayContainerRef.current, { yPercent: -100 });
    }

    // Initialize split text after a short delay to ensure DOM is ready
    setTimeout(() => {
      const textContainers = copyContainersRef.current;
      if (textContainers) {
        const splitTextByContainer: SplitResult[][] = [];

        const containers = [textContainers];
        containers.forEach((container) => {
          const textElements = container.querySelectorAll("a, p");
          const containerSplits: SplitResult[] = [];

          textElements.forEach((element) => {
            try {
              const split = SplitText.create(element, {
                type: "lines",
                mask: "lines",
                linesClass: "line",
              }) as unknown as SplitResult;
              containerSplits.push(split);

              gsap.set(split.lines, { y: "-110%" });
            } catch (error) {
              console.log("SplitText error:", error);
            }
          });

          splitTextByContainer.push(containerSplits);
        });

        splitTextByContainerRef.current = splitTextByContainer;
      }
    }, 100);

    return () => {
      if (lenisRef.current) {
        lenisRef.current.destroy();
      }
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  const handleMenuToggle = () => {
    if (isAnimatingRef.current) return;

    if (!isMenuOpen) {
      isAnimatingRef.current = true;

      // Store current scroll position first
      scrollYRef.current = typeof window !== 'undefined' ? window.scrollY : 0;
      
      if (lenisRef.current) {
        lenisRef.current.stop();
      }
      // Lock body scroll
      if (typeof document !== 'undefined') {
        document.body.classList.add('menu-open');
      }

      const tl = gsap.timeline();

      // First, slide the entire page content down (regardless of current scroll)
      const pageContent = document.querySelector('#page-content') as HTMLElement | null;
      if (pageContent) {
        // Freeze the current viewport by fixing the page content in place
        gsap.set(pageContent, {
          position: "fixed",
          top: -scrollYRef.current,
          left: 0,
          width: "100%",
          y: 0,
        });

        // Slide the (now fixed) page content downward until it is completely out of view
        const targetY = scrollYRef.current + window.innerHeight + 100;
        
        tl.to(pageContent, {
          y: targetY,
          duration: 1,
          ease: 'hop',
        });
      }

      // Then reveal the menu overlay
      if (menuOverlayRef.current) {
        tl.to(
          menuOverlayRef.current,
          {
            clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
            duration: 1,
            ease: "hop",
          },
          "<" // Start at the same time as page animation
        );
      }

      if (menuOverlayContainerRef.current) {
        tl.to(
          menuOverlayContainerRef.current,
          {
            yPercent: 0,
            duration: 1,
            ease: "hop",
          },
          "-=1"
        );
      }

      // Fade in overlay content
      if (menuOverlayContainerRef.current) {
        tl.to(
          menuOverlayContainerRef.current,
          {
            opacity: 1,
            duration: 0.5,
            ease: "power2.out",
          },
          "-=0.75"
        );
      }



      if (menuMediaWrapperRef.current) {
        tl.to(
          menuMediaWrapperRef.current,
          {
            opacity: 1,
            duration: 0.75,
            ease: "power2.out",
            delay: 0.5,
          },
          "-=0.5"
        );
      }

      // Animate the menu text
      splitTextByContainerRef.current.forEach((containerSplits) => {
        const copyLines = containerSplits.flatMap((split) => split.lines);
        tl.to(
          copyLines,
          {
            y: "0%",
            duration: 1.2,
            ease: "hop",
            stagger: -0.05,
          },
          "-=0.5"
        );
      });

      // Ensure menu content is visible
      if (copyContainersRef.current) {
        tl.to(
          copyContainersRef.current,
          {
            opacity: 1,
            duration: 0.5,
            ease: "power2.out",
          },
          "-=1"
        );
      }

      if (hamburgerIconRef.current) {
        hamburgerIconRef.current.classList.add("active");
      }

      tl.call(() => {
        isAnimatingRef.current = false;
      });

      setIsMenuOpen(true);
    } else {
      isAnimatingRef.current = true;

      if (hamburgerIconRef.current) {
        hamburgerIconRef.current.classList.remove("active");
      }
      
      const tl = gsap.timeline();

      // First hide the menu overlay
      if (menuOverlayRef.current) {
        tl.to(
          menuOverlayRef.current,
          {
            clipPath: "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)",
            duration: 1,
            ease: "hop",
          }
        );
      }

      if (menuOverlayContainerRef.current) {
        tl.to(
          menuOverlayContainerRef.current,
          {
            yPercent: -100,
            duration: 1,
            ease: "hop",
          },
          "<"
        );
      }

      // Fade out overlay content (faster)
      if (menuOverlayContainerRef.current) {
        tl.to(
          menuOverlayContainerRef.current,
          {
            opacity: 0,
            duration: 0.1,
            ease: "power2.inOut",
          },
          "-=0.9"
        );
      }



      // Then slide the entire page content back up
      const pageContent = document.querySelector('#page-content') as HTMLElement | null;
      if (pageContent) {
        tl.to(pageContent, {
          y: 0,
          duration: 1,
          ease: 'hop',
        }, '-=0.5');
      }

      tl.call(() => {
        // Reset menu text animations
        splitTextByContainerRef.current.forEach((containerSplits) => {
          const copyLines = containerSplits.flatMap((split) => split.lines);
          gsap.set(copyLines, { y: "-110%" });
        });

        if (copyContainersRef.current) {
          gsap.set(copyContainersRef.current, { opacity: 1 });
        }
        if (menuMediaWrapperRef.current) {
          gsap.set(menuMediaWrapperRef.current, { opacity: 0 });
        }



        // Reset the inline styles we added when opening the menu
        const pageContentEl = document.querySelector('#page-content') as HTMLElement | null;
        if (pageContentEl) {
          gsap.set(pageContentEl, { clearProps: 'all' });
        }

        // Restore original scroll position after resetting styles
        if (typeof window !== 'undefined') {
          window.scrollTo(0, scrollYRef.current || 0);
        }

        // Complete the animation sequence
        isAnimatingRef.current = false;
        if (lenisRef.current) {
          lenisRef.current.start();
        }
        // Unlock body scroll
        if (typeof document !== 'undefined') {
          document.body.classList.remove('menu-open');
        }
      });

      setIsMenuOpen(false);
    }
  };

  return (
    <>
      <style jsx>{`
        @import url("https://fonts.cdnfonts.com/css/pp-neue-montreal");
        @import url("https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap");

        :root {
          --bg: #171717;
          --fg: #fff;
          --menu-bg: #000000;
          --menu-fg-secondary: #5f5f5f;
          --hamburger-icon-border: rgba(255, 255, 255, 0.1);
        }

        :global(#page-content) {
          position: relative;
          z-index: 1;
          /* Will be transformed only when menu opens */
        }

        :global(body.menu-open) {
          overflow: hidden;
          touch-action: none;
          background-color: #000 !important;
        }

        :global(body.menu-open) footer {
          opacity: 0 !important;
          visibility: hidden !important;
          pointer-events: none;
          display: none !important; /* Ensure footer cannot be seen under any circumstance */
        }

        /* Hide underlying page content completely while menu is open */
        :global(body.menu-open) #page-content {
          opacity: 0 !important;
          visibility: hidden !important;
        }

        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        body {
          font-family: "PP Neue Montreal", "Inter", sans-serif;
        }

        img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        h1 {
          font-size: 7.5rem;
          font-weight: 500;
          letter-spacing: -0.2rem;
          line-height: 1;
        }

        p {
          font-size: 0.95rem;
          font-weight: 500;
        }

        a {
          text-decoration: none;
          color: var(--fg);
          font-size: 1.5rem;
          font-weight: 500;
        }

        .container {
          position: relative;
          background-color: var(--bg);
          color: var(--fg);
          z-index: 1;
        }

        section {
          position: relative;
          width: 100vw;
          height: 100vh;
          padding: 2rem;
          display: flex;
          justify-content: center;
          align-items: center;
          overflow: hidden;
        }

        section h1 {
          width: 75%;
        }

        section img {
          opacity: 0.5;
        }

        nav {
          position: fixed;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100svh;
          pointer-events: none;
          overflow: hidden;
          z-index: 9999;
        }

        .menu-bar {
          position: fixed; /* always visible */
          top: 0;
          left: 0;
          width: 100vw;
          padding: 2rem;
          display: flex;
          justify-content: space-between;
          align-items: center;
          pointer-events: all;
          color: #ffffff;
          z-index: 10002;
          background: transparent;
        }

        .menu-logo {
          width: 2rem;
          height: 2rem;
        }

        .menu-toggle-btn {
          display: flex;
          align-items: center;
          gap: 1rem;
          cursor: pointer;
        }

        .menu-toggle-label {
          overflow: hidden;
        }

        .menu-toggle-label p {
          position: relative;
          transform: translateY(0%);
          will-change: transform;
        }

        .menu-hamburger-icon {
          position: relative;
          width: 3rem;
          height: 3rem;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          border: 1px solid rgba(255, 255, 255, 0.3);
          border-radius: 100%;
          cursor: pointer;
          background-color: rgba(255, 255, 255, 0.05);
        }

        .menu-hamburger-icon span {
          position: absolute;
          width: 18px;
          height: 2px;
          background-color: #ffffff;
          transition: all 0.75s cubic-bezier(0.87, 0, 0.13, 1);
          transform-origin: center;
          will-change: transform;
          left: 50%;
          top: 50%;
          margin-left: -9px;
          margin-top: -1px;
        }

        .menu-hamburger-icon span:nth-child(1) {
          transform: translateY(-8px);
        }

        .menu-hamburger-icon span:nth-child(2) {
          transform: translateY(0);
        }

        .menu-hamburger-icon span:nth-child(3) {
          transform: translateY(8px);
        }

        .menu-hamburger-icon.active span:nth-child(1) {
          transform: translateY(0) rotate(45deg) scaleX(1.05);
        }

        .menu-hamburger-icon.active span:nth-child(2) {
          transform: translateY(0) scaleX(0);
          opacity: 0;
        }

        .menu-hamburger-icon.active span:nth-child(3) {
          transform: translateY(0) rotate(-45deg) scaleX(1.05);
        }

        .menu-overlay,
        .menu-overlay-content {
          position: fixed;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100svh;
          color: var(--fg);
          overflow: hidden;
          z-index: 10001;
        }

        .menu-overlay {
          background-color: var(--menu-bg);
          clip-path: polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%);
          will-change: clip-path;
        }

        .menu-overlay::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-color: var(--menu-bg);
          z-index: -1;
        }

        .menu-backdrop {
          position: fixed;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100svh;
          background-color: var(--menu-bg);
          z-index: 9998;
          opacity: 0;
          pointer-events: none;
          transition: opacity 0.1s ease-out;
        }

        .menu-backdrop.active {
          opacity: 1;
          pointer-events: all;
        }

        /* Global black mask that activates with body.menu-open to prevent any background bleed */
        .menu-global-mask {
          position: fixed;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100svh;
          background-color: #000;
          z-index: 10000; /* Below overlay (10001) but above page/footer */
          opacity: 0;
          pointer-events: none;
          transition: opacity 0.1s ease-out;
        }

        :global(body.menu-open) .menu-global-mask {
          opacity: 1;
        }

        .menu-overlay-content {
          display: flex;
          will-change: transform;
          pointer-events: all;
          background-color: var(--menu-bg);
          position: relative;
          z-index: 1;
          opacity: 0; /* start hidden for fade-in */
        }

        .menu-media-wrapper {
          flex: 2;
          opacity: 0;
          will-change: opacity;
        }

        .menu-media-wrapper video {
          opacity: 1;
        }

        .menu-content-wrapper {
          flex: 3;
          position: relative;
          display: flex;
          background-color: var(--menu-bg);
        }

        .menu-content-main {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          opacity: 1;
        }

        .menu-content-main {
          width: 75%;
          padding: 2rem;
          display: flex;
          align-items: flex-end;
          gap: 2rem;
          background-color: var(--menu-bg);
        }

        .menu-col {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
          opacity: 1;
        }

        .menu-col {
          flex: 1;
        }

        .menu-link {
          opacity: 1;
        }

        .menu-link a {
          font-size: 3rem !important;
          font-weight: 500 !important;
          line-height: 1.2 !important;
          opacity: 1;
          color: var(--fg) !important;
          position: relative;
          display: inline-block;
        }

        /* Underline animation */
        .menu-link a::after {
          content: '';
          position: absolute;
          left: 0;
          bottom: -0.15em;
          width: 0%;
          height: 2px;
          background-color: var(--fg);
          transition: width 0.35s cubic-bezier(0.87, 0, 0.13, 1);
        }

        .menu-link a:hover::after {
          width: 100%;
        }

        /* Ensure SplitText-generated lines inherit the same styling */
        .menu-link .line {
          position: relative;
          font-size: 3rem !important;
          font-weight: 500 !important;
          line-height: 1.2 !important;
          color: var(--fg) !important;
        }

        /* Underline animation for SplitText lines */
        .menu-link .line::after {
          content: '';
          position: absolute;
          left: 0;
          bottom: -0.15em;
          width: 0%;
          height: 2px;
          background-color: var(--fg);
          transition: width 0.35s cubic-bezier(0.87, 0, 0.13, 1);
        }

        .menu-link .line:hover::after {
          width: 100%;
        }

        /* Additional specificity for menu links */
        .menu-content-main .menu-col .menu-link a {
          font-size: 3rem !important;
          font-weight: 500 !important;
          line-height: 1.2 !important;
          color: var(--fg) !important;
        }

        /* Override global a styles for menu links */
        nav .menu-overlay .menu-content-main .menu-col .menu-link a {
          font-size: 3rem !important;
          font-weight: 500 !important;
          line-height: 1.2 !important;
          color: var(--fg) !important;
        }

        /* Maximum specificity override for menu links */
        nav .menu-overlay .menu-overlay-content .menu-content-wrapper .menu-content-main .menu-col .menu-link a {
          font-size: 3rem !important;
          font-weight: 500 !important;
          line-height: 1.2 !important;
          color: var(--fg) !important;
        }

        /* Override for SplitText lines with maximum specificity */
        nav .menu-overlay .menu-overlay-content .menu-content-wrapper .menu-content-main .menu-col .menu-link .line {
          position: relative;
          font-size: 3rem !important;
          font-weight: 500 !important;
          line-height: 1.2 !important;
          color: var(--fg) !important;
        }

        /* Underline animation for maximum specificity SplitText lines */
        nav .menu-overlay .menu-overlay-content .menu-content-wrapper .menu-content-main .menu-col .menu-link .line::after {
          content: '';
          position: absolute;
          left: 0;
          bottom: -0.15em;
          width: 0%;
          height: 2px;
          background-color: var(--fg);
          transition: width 0.35s cubic-bezier(0.87, 0, 0.13, 1);
        }

        nav .menu-overlay .menu-overlay-content .menu-content-wrapper .menu-content-main .menu-col .menu-link .line:hover::after {
          width: 100%;
        }

        .menu-tag {
          opacity: 1;
        }

        .menu-tag a {
          color: var(--menu-fg-secondary);
          opacity: 1;
        }

        .line {
          position: relative;
          will-change: transform;
        }

        #page-content {
          position: relative;
          z-index: 1;
          will-change: transform;
        }

        @media (max-width: 1000px) {
          h1 {
            font-size: 3rem;
            letter-spacing: -0.05rem;
          }

          section h1 {
            width: 100%;
          }

          .menu-media-wrapper {
            display: none;
          }

          .menu-content-main {
            width: 100%;
            background-color: var(--menu-bg);
          }

          .menu-content-main {
            top: 50%;
            flex-direction: column;
            align-items: flex-start;
            gap: 5rem;
          }

          .menu-link a {
            font-size: 2rem !important;
            position: relative;
            display: inline-block;
          }

          /* Mobile underline animation */
          .menu-link a::after {
            content: '';
            position: absolute;
            left: 0;
            bottom: -0.15em;
            width: 0%;
            height: 2px;
            background-color: var(--fg);
            transition: width 0.35s cubic-bezier(0.87, 0, 0.13, 1);
          }

          .menu-link a:hover::after {
            width: 100%;
          }

          /* Maximum specificity override for mobile menu links */
          nav .menu-overlay .menu-overlay-content .menu-content-wrapper .menu-content-main .menu-col .menu-link a {
            font-size: 2rem !important;
            position: relative;
            display: inline-block;
          }

          /* Mobile maximum specificity underline animation */
          nav .menu-overlay .menu-overlay-content .menu-content-wrapper .menu-content-main .menu-col .menu-link a::after {
            content: '';
            position: absolute;
            left: 0;
            bottom: -0.15em;
            width: 0%;
            height: 2px;
            background-color: var(--fg);
            transition: width 0.35s cubic-bezier(0.87, 0, 0.13, 1);
          }

          nav .menu-overlay .menu-overlay-content .menu-content-wrapper .menu-content-main .menu-col .menu-link a:hover::after {
            width: 100%;
          }

          /* Override for SplitText lines with maximum specificity on mobile */
          nav .menu-overlay .menu-overlay-content .menu-content-wrapper .menu-content-main .menu-col .menu-link .line {
            position: relative;
            font-size: 2rem !important;
          }

          /* Mobile SplitText lines underline animation */
          nav .menu-overlay .menu-overlay-content .menu-content-wrapper .menu-content-main .menu-col .menu-link .line::after {
            content: '';
            position: absolute;
            left: 0;
            bottom: -0.15em;
            width: 0%;
            height: 2px;
            background-color: var(--fg);
            transition: width 0.35s cubic-bezier(0.87, 0, 0.13, 1);
          }

          nav .menu-overlay .menu-overlay-content .menu-content-wrapper .menu-content-main .menu-col .menu-link .line:hover::after {
            width: 100%;
          }

          .menu-tag a {
            font-size: 1.25rem;
          }
        }
      `}</style>

      <nav>
        <div className="menu-bar">
          <div className="menu-logo">
            <Link 
              href="/"
              onClick={() => {
                if (isMenuOpen) {
                  handleMenuToggle();
                }
              }}
            >
              <span className="text-xl font-bold text-white">IndigoTG</span>
            </Link>
          </div>
          <div className="menu-toggle-btn" ref={menuToggleBtnRef} onClick={handleMenuToggle}>
            <div className="menu-hamburger-icon" ref={hamburgerIconRef}>
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>
        </div>
        {/* Black mask that turns on instantly via body.menu-open to fully cover page/footer */}
        <div className="menu-global-mask" />
        <div className="menu-overlay" ref={menuOverlayRef}>
          <div className="menu-overlay-content" ref={menuOverlayContainerRef}>
            <div className="menu-media-wrapper" ref={menuMediaWrapperRef}>
              <video 
                src="/Glass &quotKnot_ _ Motion graphics design Graphic design background texture Learning graphic design.mp4" 
                autoPlay 
                muted 
                loop 
                playsInline
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  opacity: 1
                }}
              />
            </div>
            <div className="menu-content-wrapper">
              <div className="menu-content-main" ref={copyContainersRef}>
                <div className="menu-col">
                  {navItems.map((item, index) => (
                    <div key={index} className="menu-link">
                      <Link 
                        href={item.href}
                        onClick={() => {
                          if (isMenuOpen) {
                            handleMenuToggle();
                          }
                        }}
                        style={{
                          fontSize: isMobile ? '2rem' : '3rem',
                          fontWeight: '500',
                          lineHeight: '1.2',
                          color: 'var(--fg)',
                          textDecoration: 'none'
                        }}
                      >
                        {item.label}
                      </Link>
                    </div>
                  ))}
                  {menuTags.map((tag, index) => (
                    <div key={index} className="menu-tag">
                      <Link 
                        href={tag.href}
                        onClick={() => {
                          if (isMenuOpen) {
                            handleMenuToggle();
                          }
                        }}
                      >
                        {tag.text}
                      </Link>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className={`menu-backdrop ${isMenuOpen ? 'active' : ''}`}></div>
      </nav>
    </>
  );
};

export default Navigation;
