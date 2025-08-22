'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { CustomEase } from 'gsap/CustomEase';
import { SplitText } from 'gsap/SplitText';
import Lenis from 'lenis';

const Navigation = () => {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isNavVisible, setIsNavVisible] = useState(true);
  const [servicesDropdownOpen, setServicesDropdownOpen] = useState(false);
  const [solutionsDropdownOpen, setSolutionsDropdownOpen] = useState(false);
  const dropdownTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const isAnimatingRef = useRef(false);
  const scrollYRef = useRef(0);
  const lastScrollY = useRef(0);
  const scrollThreshold = 10; // Minimum scroll distance before hiding nav
  const navHideTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  
  const menuToggleBtnRef = useRef<HTMLDivElement>(null);
  const menuOverlayRef = useRef<HTMLDivElement>(null);
  const menuOverlayContainerRef = useRef<HTMLDivElement>(null);
  const menuMediaWrapperRef = useRef<HTMLDivElement>(null);
  const copyContainersRef = useRef<HTMLDivElement>(null);
  const hamburgerIconRef = useRef<HTMLDivElement>(null);
  const lenisRef = useRef<Lenis | null>(null);
  const navRef = useRef<HTMLElement>(null);
  type SplitResult = { lines: HTMLElement[] };
  const splitTextByContainerRef = useRef<SplitResult[][]>([]);

  const navItems = [
    { href: '/', label: 'Home' },
    { href: '/who-we-are', label: 'Who We Are' },
    { 
      href: '/our-services', 
      label: 'Our Services',
      hasDropdown: true,
      dropdownItems: [
        { href: '/solutions2/design', label: 'Design' },
        { href: '/solutions2/deploy', label: 'Deploy' },
        { href: '/solutions2/support', label: 'Support' }
      ]
    },
    { 
      href: '/solutions2', 
      label: 'Solutions',
      hasDropdown: true,
      dropdownItems: [
        { href: '/solutions/fixedline', label: 'Fixed\u00A0line' },
        { href: '/solutions/subsea', label: 'Subsea\u00A0Systems\u00A0Operator' },
        { href: '/solutions/data-centres', label: 'Data\u00A0Centres' },
        { href: '/solutions/wireless', label: 'Wireless' },
        { href: '/solutions/network', label: 'Network\u00A0Services' },
        { href: '/solutions/noc', label: 'NOC' }
      ]
    },
    { href: '/work-with-us', label: 'Work With Us' },
    { href: '/success-stories', label: 'Success Stories' },
    { href: '/newsPage', label: 'News' },
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
    

    
         // Check initial scroll position
     if (lenisRef.current) {
       const initialScroll = lenisRef.current.scroll;
       setIsScrolled(initialScroll > 20);
       lastScrollY.current = initialScroll;
     }
    
    // Register GSAP plugins
    gsap.registerPlugin(CustomEase, SplitText, ScrollTrigger);
    CustomEase.create("hop", ".87,0,.13,1");

    // Initialize Lenis
    lenisRef.current = new Lenis();
    if (lenisRef.current) {
      // Sync GSAP ScrollTrigger with Lenis scroll events
      lenisRef.current.on("scroll", (e: any) => {
        ScrollTrigger.update();
        // Use Lenis scroll position for more accurate detection
        const scrollTop = e.scroll;
        const scrollDelta = scrollTop - lastScrollY.current;
        

        
        setIsScrolled(scrollTop > 20);
        
        // Hide nav immediately when scrolling down, show when scrolling up or at top
        if (scrollTop <= 20) {
          // At top - always show nav
          setIsNavVisible(true);
        } else if (scrollDelta < 0) {
          // Scrolling up - show nav
          setIsNavVisible(true);
        } else if (scrollDelta > 0) {
          // Scrolling down (any positive movement) - hide nav immediately
          setIsNavVisible(false);
        } else if (scrollTop > 20) {
          // If we're not at top and not actively scrolling up, hide nav
          // This catches cases where scrollDelta is 0 but we're still not at top
          setIsNavVisible(false);
        }
        

        
        lastScrollY.current = scrollTop;
      });
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
      if (navHideTimeoutRef.current) {
        clearTimeout(navHideTimeoutRef.current);
      }
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  // Determine if current page has a dark hero section
  const isDarkHeroPage = [
    '/',
    '/our-services',
    '/solutions2',
    '/get-in-touch',
    '/newsPage',
    '/success-stories',
    '/work-with-us',
    '/solutions/fixedline',
    '/solutions/subsea',
    '/solutions/data-centres',
    '/solutions/wireless',
    '/solutions/network',
    '/solutions/noc'
  ].includes(pathname);

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
          "-=1.2"
        );
      }



      if (menuMediaWrapperRef.current) {
        tl.to(
          menuMediaWrapperRef.current,
          {
            opacity: 1,
            duration: 0.75,
            ease: "power2.out",
          },
          "-=0.75"
        );
      }

      // Animate the menu text by containers
      splitTextByContainerRef.current.forEach((containerSplits, containerIndex) => {
        const lines = containerSplits.flatMap((split) => split.lines);
        tl.to(
          lines,
          {
            y: "0%",
            duration: 0.8,
            ease: "hop",
          },
          `-=${0.8 - (containerIndex * 0.15)}`
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
          "-=1.2"
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

      // Animate the menu text out by containers
      splitTextByContainerRef.current.forEach((containerSplits, containerIndex) => {
        const lines = containerSplits.flatMap((split) => split.lines);
        tl.to(
          lines,
          {
            y: "-110%",
            duration: 0.8,
            ease: "hop",
          },
          `-=${0.8 - (containerIndex * 0.15)}`
        );
      });

      // Fade out overlay content
      if (menuOverlayContainerRef.current) {
        tl.to(
          menuOverlayContainerRef.current,
          {
            opacity: 0,
            duration: 0.6,
            ease: "power2.inOut",
          },
          "-=0.6"
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
          --dropdown-font-size: 0.3em;
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



        .menu-bar.nav-hidden {
          transform: translateY(-100%);
          pointer-events: none;
          opacity: 0.8;
        }

        .menu-bar {
          position: fixed; /* always visible */
          top: 0;
          left: 0;
          width: 100vw;
          padding: 1rem;
          display: flex;
          justify-content: space-between;
          align-items: center;
          pointer-events: all;
          color: #ffffff;
          z-index: 10002;
          background: transparent;
          transition: background-color 0.3s ease, color 0.3s ease, transform 0.4s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.3s ease;
        }

        .menu-bar.scrolled {
          background-color: #ffffff;
          box-shadow: 0 2px 20px rgba(0, 0, 0, 0.1);
          color: #140079;
        }

        .menu-bar.scrolled .menu-hamburger-icon span {
          background-color: #140079;
        }

        .menu-bar.scrolled .menu-hamburger-icon {
          border-color: rgba(20, 0, 121, 0.2);
        }

        /* Dark hero page overrides - make navbar elements white for visibility when transparent */
        .menu-bar.dark-hero {
          color: #ffffff;
        }

        .menu-bar.dark-hero .menu-hamburger-icon span {
          background-color: #ffffff;
        }

        .menu-bar.dark-hero .menu-logo img {
          filter: brightness(0) invert(1); /* Make logo white */
        }

        /* When scrolled on dark hero pages, make elements dark for visibility against white background */
        .menu-bar.dark-hero.scrolled {
          color: #140079;
        }

        .menu-bar.dark-hero.scrolled .menu-hamburger-icon span {
          background-color: #140079;
        }

        .menu-bar.dark-hero.scrolled .menu-logo img {
          filter: none; /* Remove white filter, show original logo color */
        }

        .menu-logo {
          width: auto;
          height: 2rem;
          display: flex;
          align-items: center;
          margin-left: 1rem;
          margin-top: 1rem;
        }

        .menu-logo img {
          height: 100%;
          width: auto;
          object-fit: contain;
          max-width: 150px;
        }

        .menu-logo img:not([src]), 
        .menu-logo img[src=""],
        .menu-logo img[src*="undefined"],
        .menu-logo img[src*="null"] {
          display: none;
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
          width: 2.5rem;
          height: 2.5rem;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          cursor: pointer;
        }

        .menu-hamburger-icon span {
          position: absolute;
          width: 18px;
          height: 2px;
          background-color: #000000;
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

        .menu-hamburger-icon.active span {
          background-color: #ffffff;
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
          transition: clip-path 0.6s cubic-bezier(0.87, 0, 0.13, 1);
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
          transition: opacity 0.4s cubic-bezier(0.87, 0, 0.13, 1), transform 0.6s cubic-bezier(0.87, 0, 0.13, 1);
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
          color: #ffffff !important;
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
          background-color: #ffffff;
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
          color: #ffffff !important;
        }

        /* Underline animation for SplitText lines */
        .menu-link .line::after {
          content: '';
          position: absolute;
          left: 0;
          bottom: -0.15em;
          width: 0%;
          height: 2px;
          background-color: #ffffff;
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
          color: #ffffff !important;
        }

        /* Override global a styles for menu links */
        nav .menu-overlay .menu-content-main .menu-col .menu-link a {
          font-size: 3rem !important;
          font-weight: 500 !important;
          line-height: 1.2 !important;
          color: #ffffff !important;
        }

        /* Maximum specificity override for menu links */
        nav .menu-overlay .menu-overlay-content .menu-content-wrapper .menu-content-main .menu-col .menu-link a {
          font-size: 3rem !important;
          font-weight: 500 !important;
          line-height: 1.2 !important;
          color: #ffffff !important;
          position: relative !important;
          display: inline-block !important;
        }

        /* Override for SplitText lines with maximum specificity */
        nav .menu-overlay .menu-overlay-content .menu-content-wrapper .menu-content-main .menu-col .menu-link .line {
          position: relative !important;
          font-size: 3rem !important;
          font-weight: 500 !important;
          line-height: 1.2 !important;
          color: #ffffff !important;
        }

        /* Additional override to ensure white text */
        .menu-overlay .menu-content-main .menu-col .menu-link a,
        .menu-overlay .menu-content-main .menu-col .menu-link .line {
          color: #ffffff !important;
        }

        /* Underline animation for maximum specificity SplitText lines */
        nav .menu-overlay .menu-overlay-content .menu-content-wrapper .menu-content-main .menu-col .menu-link .line::after {
          content: '';
          position: absolute;
          left: 0;
          bottom: -0.15em;
          width: 0%;
          height: 2px;
          background-color: #ffffff !important;
          transition: width 0.35s cubic-bezier(0.87, 0, 0.13, 1);
        }

        nav .menu-overlay .menu-overlay-content .menu-content-wrapper .menu-content-main .menu-col .menu-link .line:hover::after {
          width: 100%;
        }

        /* Remove any conflicting color declarations */
        .menu-link a {
          color: #ffffff !important;
        }

        .menu-link .line {
          color: #ffffff !important;
        }

        /* Override any global styles */
        nav a {
          color: #ffffff !important;
        }

        /* Ensure menu content is white */
        .menu-content-main a {
          color: #ffffff !important;
        }

        .menu-content-main .line {
          color: #ffffff !important;
        }

        .menu-tag {
          opacity: 1;
        }

        .menu-tag a {
          color: var(--menu-fg-secondary);
          opacity: 1;
        }

        /* Dropdown styles */
        .menu-link-with-dropdown {
          position: relative;
        }

        .menu-dropdown {
          position: absolute;
          top: 0%;
          left: 65%;
          background-color: var(--menu-bg);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 0.5rem;
          padding: 0.2rem 0;
          min-width: 120px;
          opacity: 0;
          visibility: hidden;
          transform: translateY(-10px);
          transition: all 0.3s cubic-bezier(0.87, 0, 0.13, 1);
          z-index: 10003;
        }



        .menu-dropdown.open {
          opacity: 1;
          visibility: visible;
          transform: translateY(0);
        }

        /* Specific width for Solutions dropdown */
        .solutions-dropdown {
          width: 250px;
          left: 70%;
          // min-width: 200px;
          // max-width: 200px;
        }

        .menu-dropdown-item {
          padding: 0.05rem 0.5rem;
          transition: background-color 0.2s ease;
          background-color: rgba(255, 255, 255, 0.1);
          white-space: nowrap !important;
          overflow: hidden;
          width: 100%;
        }

        .menu-dropdown-item:hover {
          background-color: rgba(255, 255, 255, 0.2);
        }

        .menu-dropdown-item a {
          font-size: 10px !important;
          font-weight: 500 !important;
          line-height: 1.2 !important;
          color: #ffffff !important;
          text-decoration: none;
          position: relative;
          display: inline-block;
          white-space: nowrap !important;
          word-wrap: normal !important;
          overflow-wrap: normal !important;
          overflow: hidden;
          text-overflow: ellipsis;
          width: 100%;
        }

        /* Maximum specificity selectors to override global styles */
        .menu-overlay .menu-dropdown .menu-dropdown-item a {
          font-size: 10px !important;
          font-weight: 500 !important;
          line-height: 1.2 !important;
          color: #ffffff !important;
        }

        /* Override global menu-link styles for dropdown items */
        .menu-link-with-dropdown .menu-dropdown .menu-dropdown-item a {
          font-size: 10px !important;
          font-weight: 500 !important;
          line-height: 1.2 !important;
          color: #ffffff !important;
        }

        /* Maximum specificity override */
        nav .menu-overlay .menu-content-main .menu-col .menu-link-with-dropdown .menu-dropdown .menu-dropdown-item a {
          font-size: 10px !important;
          font-weight: 500 !important;
          line-height: 1.2 !important;
          color: #ffffff !important;
        }



        /* Additional override using CSS custom property */
        .menu-dropdown-item a {
          font-size: 10px !important;
        }

        /* Underline animation for dropdown items */
        .menu-dropdown-item a::after {
          content: '';
          position: absolute;
          left: 0;
          bottom: -0.15em;
          width: 0%;
          height: 2px;
          background-color: #ffffff;
          transition: width 0.35s cubic-bezier(0.87, 0, 0.13, 1);
        }

        .menu-dropdown-item a:hover::after {
          width: 100%;
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
            display: block;
            position: absolute;
            top: 4rem;
            right: 2rem;
            width: 120px;
            height: 110px;
            z-index: 10;
            border-radius: 8px;
            overflow: hidden;
          }

          .menu-media-wrapper video {
            width: 100%;
            height: 100%;
            object-fit: cover;
            border-radius: 8px;
          }

          .menu-content-main {
            width: 100%;
            background-color: var(--menu-bg);
            padding-top: 18rem;
            padding-right: 8rem;
          }

          .menu-content-main {
            top: 40%;
            flex-direction: column;
            align-items: flex-start;
            gap: 2rem;
          }

          .menu-link a {
            font-size: 1.8rem !important;
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
            background-color: #ffffff;
            transition: width 0.35s cubic-bezier(0.87, 0, 0.13, 1);
          }

          .menu-link a:hover::after {
            width: 100%;
          }

          /* Maximum specificity override for mobile menu links */
          nav .menu-overlay .menu-overlay-content .menu-content-wrapper .menu-content-main .menu-col .menu-link a {
            font-size: 1.8rem !important;
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
            background-color: #ffffff !important;
            transition: width 0.35s cubic-bezier(0.87, 0, 0.13, 1);
          }

          nav .menu-overlay .menu-overlay-content .menu-content-wrapper .menu-content-main .menu-col .menu-link a:hover::after {
            width: 100%;
          }

          /* Override for SplitText lines with maximum specificity on mobile */
          nav .menu-overlay .menu-overlay-content .menu-content-wrapper .menu-content-main .menu-col .menu-link .line {
            position: relative;
            font-size: 1.8rem !important;
            color: #ffffff !important;
          }

          /* Mobile SplitText lines underline animation */
          nav .menu-overlay .menu-overlay-content .menu-content-wrapper .menu-content-main .menu-col .menu-link .line::after {
            content: '';
            position: absolute;
            left: 0;
            bottom: -0.15em;
            width: 0%;
            height: 2px;
            background-color: #ffffff !important;
            transition: width 0.35s cubic-bezier(0.87, 0, 0.13, 1);
          }

          nav .menu-overlay .menu-overlay-content .menu-content-wrapper .menu-content-main .menu-col .menu-link .line:hover::after {
            width: 100%;
          }

          /* Additional mobile overrides */
          .menu-link a {
            color: #ffffff !important;
          }

          .menu-link .line {
            color: #ffffff !important;
          }

          .menu-tag a {
            font-size: 1.25rem;
          }

                     /* Mobile dropdown styles */
           .menu-dropdown {
             position: static;
             background-color: #000000;
             border: none;
             padding: 0.3rem 0 0.3rem 1.5rem;
             min-width: auto;
             opacity: 1;
             visibility: visible;
             transform: none;
             transition: none;
           }

           .menu-dropdown-item {
             padding: 0.05rem 0;
             background-color: #000000;
           }

           .menu-dropdown-item a {
             font-size: 8px !important;
           }

          /* Mobile maximum specificity override */
          nav .menu-overlay .menu-content-main .menu-col .menu-link-with-dropdown .menu-dropdown .menu-dropdown-item a {
            font-size: 8px !important;
          }
        }
      `}</style>

      <nav ref={navRef}>
        <div className={`menu-bar ${isScrolled ? 'scrolled' : ''} ${!isNavVisible ? 'nav-hidden' : ''} ${isDarkHeroPage ? 'dark-hero' : ''}`}>
          <div className="menu-logo">
            <Link 
              href="/"
              onClick={() => {
                if (isMenuOpen) {
                  handleMenuToggle();
                }
              }}
            >
              <img src="/logo-blue.svg" alt="IndigoTG Logo" onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.style.display = 'none';
                const fallback = document.createElement('span');
                fallback.textContent = 'IndigoTG';
                fallback.className = 'text-xl font-bold text-white';
                target.parentNode?.appendChild(fallback);
              }} />
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
                    <div key={index} className={`menu-link ${item.hasDropdown ? 'menu-link-with-dropdown' : ''}`}>
                      <Link 
                        href={item.href}
                        onClick={() => {
                          if (isMenuOpen) {
                            handleMenuToggle();
                          }
                        }}
                        onMouseEnter={() => {
                          if (item.hasDropdown && !isMobile) {
                            // Clear any existing timeout
                            if (dropdownTimeoutRef.current) {
                              clearTimeout(dropdownTimeoutRef.current);
                              dropdownTimeoutRef.current = null;
                            }
                            
                            // Close the other dropdown immediately
                            if (item.label === 'Our Services') {
                              setSolutionsDropdownOpen(false);
                              setServicesDropdownOpen(true);
                            } else if (item.label === 'Solutions') {
                              setServicesDropdownOpen(false);
                              setSolutionsDropdownOpen(true);
                            }
                          }
                        }}
                        onMouseLeave={() => {
                          if (item.hasDropdown && !isMobile) {
                            // Add a small delay to prevent immediate closing
                            dropdownTimeoutRef.current = setTimeout(() => {
                              if (item.label === 'Our Services') {
                                setServicesDropdownOpen(false);
                              } else if (item.label === 'Solutions') {
                                setSolutionsDropdownOpen(false);
                              }
                            }, 250);
                          }
                        }}
                        style={{
                          fontSize: isMobile ? '1.8rem' : '3rem',
                          fontWeight: '500',
                          lineHeight: '1.2',
                          color: '#ffffff',
                          textDecoration: 'none'
                        }}
                      >
                        {item.label}

                      </Link>
                      {item.hasDropdown && (
                        <div 
                          className={`menu-dropdown ${item.label === 'Solutions' ? 'solutions-dropdown' : ''} ${(item.label === 'Our Services' && servicesDropdownOpen) || (item.label === 'Solutions' && solutionsDropdownOpen) ? 'open' : ''}`}
                          onMouseEnter={() => {
                            if (!isMobile) {
                              // Clear the timeout to prevent dropdown from closing
                              if (dropdownTimeoutRef.current) {
                                clearTimeout(dropdownTimeoutRef.current);
                                dropdownTimeoutRef.current = null;
                              }
                              if (item.label === 'Our Services') {
                                setServicesDropdownOpen(true);
                              } else if (item.label === 'Solutions') {
                                setSolutionsDropdownOpen(true);
                              }
                            }
                          }}
                          onMouseLeave={() => {
                            if (!isMobile) {
                              if (item.label === 'Our Services') {
                                setServicesDropdownOpen(false);
                              } else if (item.label === 'Solutions') {
                                setSolutionsDropdownOpen(false);
                              }
                            }
                          }}
                        >
                          {item.dropdownItems?.map((dropdownItem, dropdownIndex) => (
                            <div key={dropdownIndex} className="menu-dropdown-item">
                              <Link 
                                href={dropdownItem.href}
                                onClick={() => {
                                  if (isMenuOpen) {
                                    handleMenuToggle();
                                  }
                                  if (item.label === 'Our Services') {
                                    setServicesDropdownOpen(false);
                                  } else if (item.label === 'Solutions') {
                                    setSolutionsDropdownOpen(false);
                                  }
                                }}
                                style={{
                                  fontSize: '16px',
                                  fontWeight: '500',
                                  lineHeight: '1.2',
                                  color: '#ffffff',
                                  textDecoration: 'none',
                                  backgroundColor: 'transparent',
                                  padding: '0px',
                                  border: 'none',
                                  transform: 'scale(0.4)',
                                  transformOrigin: 'left center'
                                }}
                                                              >
                                {dropdownItem.label}
                              </Link>
                            </div>
                          ))}
                        </div>
                      )}
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
