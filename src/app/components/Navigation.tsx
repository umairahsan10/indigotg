'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import gsap from 'gsap';
import { CustomEase } from 'gsap/CustomEase';
import { SplitText } from 'gsap/SplitText';
import Lenis from 'lenis';

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isAnimatingRef = useRef(false);
  const scrollYRef = useRef(0);
  
  const menuToggleBtnRef = useRef<HTMLDivElement>(null);
  const menuOverlayRef = useRef<HTMLDivElement>(null);
  const menuOverlayContainerRef = useRef<HTMLDivElement>(null);
  const menuMediaWrapperRef = useRef<HTMLDivElement>(null);
  const copyContainersRef = useRef<HTMLDivElement>(null);
  const menuToggleLabelRef = useRef<HTMLParagraphElement>(null);
  const hamburgerIconRef = useRef<HTMLDivElement>(null);
  const lenisRef = useRef<Lenis | null>(null);
  type SplitResult = { lines: HTMLElement[] };
  const splitTextByContainerRef = useRef<SplitResult[][]>([]);

  const navItems = [
    { href: '/', label: 'Home' },
    { href: '/who-we-are', label: 'Who We Are' },
    { href: '/our-services', label: 'Our Services' },
    { href: '/solutions', label: 'Solutions' },
    { href: '/work-with-us', label: 'Work With Us' },
    { href: '/success-stories', label: 'Success Stories' },
    { href: '/news', label: 'News' },
    { href: '/resources', label: 'Resources' },
    { href: '/get-in-touch', label: 'Get In Touch' },
    { href: '/responsibilities', label: 'Responsibilities' },
  ];

  const menuTags = [
    { text: 'Web Development', href: '/our-services' },
    { text: 'Mobile Solutions', href: '/our-services' },
    { text: 'Cloud Services', href: '/our-services' },
  ];

  useEffect(() => {
    // Register GSAP plugins
    gsap.registerPlugin(CustomEase, SplitText);
    CustomEase.create("hop", ".87,0,.13,1");

    // Initialize Lenis
    lenisRef.current = new Lenis();
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
    };
  }, []);

  const handleMenuToggle = () => {
    if (isAnimatingRef.current) return;

    if (!isMenuOpen) {
      isAnimatingRef.current = true;

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
        // Store current scroll position
        scrollYRef.current = typeof window !== 'undefined' ? window.scrollY : 0;
        
        // Set initial transform to maintain current scroll position
        gsap.set(pageContent, { y: -scrollYRef.current });
        
        // Calculate the target position to slide the content completely off screen
        // We need to slide it down by the current scroll position plus the viewport height
        const targetY = scrollYRef.current + window.innerHeight;
        
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

      if (menuToggleLabelRef.current) {
        tl.to(
          menuToggleLabelRef.current,
          {
            y: "-110%",
            duration: 1,
            ease: "hop",
          },
          "-=1"
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
            duration: 2,
            ease: "hop",
            stagger: -0.075,
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

      if (menuToggleLabelRef.current) {
        tl.to(
          menuToggleLabelRef.current,
          {
            y: "0%",
            duration: 1,
            ease: "hop",
          },
          "<"
        );
      }

      // Then slide the entire page content back up
      const pageContent = document.querySelector('#page-content') as HTMLElement | null;
      if (pageContent) {
        tl.to(pageContent, {
          y: -scrollYRef.current,
          duration: 1,
          ease: 'hop',
        }, '-=0.5');
      }

      tl.call(() => {
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

        // Restore page content and scroll position
        if (pageContent) {
          gsap.set(pageContent, { y: 0 });
        }

        if (typeof window !== 'undefined') {
          window.scrollTo(0, scrollYRef.current || 0);
        }

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
          will-change: transform;
          transform: translateY(0);
        }

        :global(body.menu-open) {
          overflow: hidden;
          touch-action: none;
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
          position: fixed;
          top: 0;
          left: 0;
          width: 100vw;
          padding: 2rem;
          display: flex;
          justify-content: space-between;
          align-items: center;
          pointer-events: all;
          color: var(--menu-fg-secondary);
          z-index: 10002;
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
          gap: 0.3rem;
          border: 1px solid var(--hamburger-icon-border);
          border-radius: 100%;
        }

        .menu-hamburger-icon span {
          position: absolute;
          width: 15px;
          height: 1.25px;
          background-color: var(--fg);
          transition: all 0.75s cubic-bezier(0.87, 0, 0.13, 1);
          transform-origin: center;
          will-change: transform;
        }

        .menu-hamburger-icon span:nth-child(1) {
          transform: translateY(-3px);
        }

        .menu-hamburger-icon span:nth-child(2) {
          transform: translateY(3px);
        }

        .menu-hamburger-icon.active span:nth-child(1) {
          transform: translateY(0) rotate(45deg) scaleX(1.05);
        }

        .menu-hamburger-icon.active span:nth-child(2) {
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
          transition: opacity 0.3s ease;
        }

        .menu-backdrop.active {
          opacity: 1;
          pointer-events: all;
        }

        .menu-overlay-content {
          display: flex;
          will-change: transform;
          pointer-events: all;
          background-color: var(--menu-bg);
          position: relative;
          z-index: 1;
        }

        .menu-media-wrapper {
          flex: 2;
          opacity: 0;
          will-change: opacity;
        }

        .menu-media-wrapper img {
          opacity: 0.25;
        }

        .menu-content-wrapper {
          flex: 3;
          position: relative;
          display: flex;
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
        }

        .menu-col {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
          opacity: 1;
        }

        .menu-col:nth-child(1) {
          flex: 3;
        }

        .menu-col:nth-child(2) {
          flex: 2;
        }

        .menu-link {
          opacity: 1;
        }

        .menu-link a {
          font-size: 3.5rem;
          font-weight: 500;
          line-height: 1.2;
          opacity: 1;
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
          }

          .menu-content-main {
            top: 50%;
            flex-direction: column;
            align-items: flex-start;
            gap: 5rem;
          }

          .menu-link a {
            font-size: 3rem;
          }

          .menu-tag a {
            font-size: 1.25rem;
          }
        }
      `}</style>

      <nav>
        <div className="menu-bar">
          <div className="menu-logo">
            <Link href="/">
              <span className="text-xl font-bold text-white">IndigoTG</span>
            </Link>
          </div>
          <div className="menu-toggle-btn" ref={menuToggleBtnRef} onClick={handleMenuToggle}>
            <div className="menu-toggle-label">
              <p ref={menuToggleLabelRef}>Menu</p>
            </div>
            <div className="menu-hamburger-icon" ref={hamburgerIconRef}>
              <span></span>
              <span></span>
            </div>
          </div>
        </div>
        <div className="menu-overlay" ref={menuOverlayRef}>
          <div className="menu-overlay-content" ref={menuOverlayContainerRef}>
            <div className="menu-media-wrapper" ref={menuMediaWrapperRef}>
              <img src="/menu-media.jpg" alt="" />
            </div>
            <div className="menu-content-wrapper">
              <div className="menu-content-main" ref={copyContainersRef}>
                <div className="menu-col">
                  {navItems.map((item, index) => (
                    <div key={index} className="menu-link">
                      <Link href={item.href}>{item.label}</Link>
                    </div>
                  ))}
                </div>

                <div className="menu-col">
                  {menuTags.map((tag, index) => (
                    <div key={index} className="menu-tag">
                      <Link href={tag.href}>{tag.text}</Link>
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
