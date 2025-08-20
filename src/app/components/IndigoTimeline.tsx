import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';

// Type declarations for GSAP and Confetti
type ConfettiOptions = {
  particleCount?: number;
  spread?: number;
  startVelocity?: number;
  decay?: number;
  gravity?: number;
  drift?: number;
  ticks?: number;
  origin?: {
    x?: number;
    y?: number;
  };
  colors?: string[];
  shapes?: string[];
  scalar?: number;
  zIndex?: number;
  disableForReducedMotion?: boolean;
  angle?: number;
};

declare global {
  interface Window {
    gsap: any;
    ScrollTrigger: any;
    confetti?: (options?: ConfettiOptions) => void;
  }
}

const IndigoTimeline = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLDivElement>(null);
  const videoInnerRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const descriptionRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const textContainerRef = useRef<HTMLDivElement>(null);
  const newSectionRef = useRef<HTMLDivElement>(null);
  const typewriterTextRef = useRef<HTMLSpanElement>(null);
  const numberRef = useRef<HTMLSpanElement>(null);
  
  const [gsapLoaded, setGsapLoaded] = useState(false);
  const [confettiTriggered, setConfettiTriggered] = useState(false);
  const [currentNumber, setCurrentNumber] = useState(0);
  const [isMounted, setIsMounted] = useState(false);
  const [videoTransitionComplete, setVideoTransitionComplete] = useState(false);
  const [typewriterComplete, setTypewriterComplete] = useState(false);
  const countAnimationStartedRef = useRef(false);

  // Mount effect to prevent hydration issues
  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    let scrollTriggerInstance: any;

    const loadGSAP = async () => {
      try {
        // Load GSAP from CDN via script tags
        if (!window.gsap) {
          const gsapScript = document.createElement('script');
          gsapScript.src = 'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js';
          gsapScript.onload = () => {
            const scrollTriggerScript = document.createElement('script');
            scrollTriggerScript.src = 'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/ScrollTrigger.min.js';
            scrollTriggerScript.onload = () => {
              window.gsap.registerPlugin(window.ScrollTrigger);
              setGsapLoaded(true);
              initializeAnimations();
            };
            document.head.appendChild(scrollTriggerScript);
          };
          document.head.appendChild(gsapScript);
        } else {
          setGsapLoaded(true);
          initializeAnimations();
        }
      } catch (error) {
        console.error('Failed to load GSAP:', error);
      }
    };

    const initializeAnimations = () => {
      if (!window.gsap || !window.ScrollTrigger) return;

      // Initial entrance animation
      const entranceTl = window.gsap.timeline({ delay: 0.5 });

      // Set initial states for entrance
      window.gsap.set([videoRef.current, headingRef.current, descriptionRef.current, buttonRef.current], {
        opacity: 0,
        y: 50
      });

      // Set initial state for new section
      window.gsap.set(newSectionRef.current, {
        opacity: 0
      });

      // Animate elements in
      entranceTl
        .to(videoRef.current, {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out"
        })
        .to(headingRef.current, {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out"
        }, "-=0.6")
        .to(descriptionRef.current, {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out"
        }, "-=0.6")
        .to(buttonRef.current, {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out"
        }, "-=0.4");

      // Main scroll-triggered transition
      scrollTriggerInstance = window.ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top top",
        end: "+=800vh", // Much longer animation height
        scrub: 0.5, // Reduced scrub value for smoother, less stoppable feel
        pin: true,
        anticipatePin: 1,
        invalidateOnRefresh: true,
        onUpdate: (self: any) => {
          const progress = self.progress;
          
          // Calculate viewport dimensions
          const vw = window.innerWidth;
          const vh = window.innerHeight;
          
          // Video movement: from left to right side (same size)
          const videoX = progress * (vw * 0.5); // Move to right side
          const videoY = progress * (vh * 0.1); // Land a bit below for smooth transition
          const videoScale = 1; // Keep same size
          
          // Curling effect: video deforms during transition
          const curlIntensity = Math.sin(progress * Math.PI) * 12; // Bell curve for curl
          const skewX = curlIntensity;
          const skewY = curlIntensity * 0.3;
          const rotateZ = curlIntensity * 0.4;
          
          // Apply curl effect with CSS transforms
          const borderRadius = 16 - (curlIntensity * 0.6); // Reduce border radius during curl
          
          window.gsap.set(videoRef.current, {
            x: videoX,
            y: videoY,
            scale: videoScale,
            zIndex: 10,
            transformOrigin: "center center"
          });

          // Apply curling effect to inner video container
          window.gsap.set(videoInnerRef.current, {
            skewX: skewX,
            skewY: skewY,
            rotateZ: rotateZ,
            borderRadius: `${borderRadius}px`,
            transformStyle: "preserve-3d"
          });

          // Heading fade out
          const headingOpacity = Math.max(0, 1 - (progress * 2));
          
          window.gsap.set(headingRef.current, {
            opacity: headingOpacity
          });

          // Description fade out quickly
          const descriptionOpacity = Math.max(0, 1 - (progress * 3));
          
          window.gsap.set(descriptionRef.current, {
            opacity: descriptionOpacity
          });

          // Button fade out after description
          const buttonOpacity = Math.max(0, 1 - ((progress - 0.1) * 3));
          
          window.gsap.set(buttonRef.current, {
            opacity: buttonOpacity
          });

          // Text container fade out
          const containerOpacity = Math.max(0, 1 - (progress * 2));
          
          window.gsap.set(textContainerRef.current, {
            opacity: containerOpacity
          });

          // New section appears when video transition is complete (no fade in from left)
          const newSectionOpacity = progress >= 0.9 ? 1 : 0;
          
          window.gsap.set(newSectionRef.current, {
            opacity: newSectionOpacity,
            x: 0 // No horizontal movement
          });

          // Mark video transition as complete when we reach 90%
          if (progress >= 0.9 && !videoTransitionComplete) {
            setVideoTransitionComplete(true);
          }


        }
      });
    };

    if (isMounted) {
      loadGSAP();
    }

    // Cleanup function
    return () => {
      if (scrollTriggerInstance) {
        scrollTriggerInstance.kill();
      }
      if (window.ScrollTrigger) {
        window.ScrollTrigger.getAll().forEach((trigger: any) => trigger.kill());
      }
    };
  }, [isMounted]);

  // Automatic typewriter animation when video transition completes
  useEffect(() => {
    if (videoTransitionComplete && isMounted && typewriterTextRef.current) {
      const text = "Celebrating Indigo";
      typewriterTextRef.current.textContent = "";
      
      let index = 0;
      const typeInterval = setInterval(() => {
        if (index < text.length) {
          index++;
          typewriterTextRef.current!.textContent = text.slice(0, index);
        } else {
          clearInterval(typeInterval);
          setTypewriterComplete(true);
        }
      }, 150); // Adjust speed as needed

      return () => clearInterval(typeInterval);
    }
  }, [videoTransitionComplete, isMounted]);

  // Automatic count animation when typewriter completes
  useEffect(() => {
    if (typewriterComplete && isMounted && !countAnimationStartedRef.current) {
      countAnimationStartedRef.current = true;
      let currentCount = 0;
      const countInterval = setInterval(() => {
        if (currentCount <= 25) {
          setCurrentNumber(currentCount);
          if (currentCount === 25 && !confettiTriggered) {
            setConfettiTriggered(true);
            // Trigger confetti when count reaches 25
            setTimeout(() => {
              // Load confetti script if not already loaded
              if (!window.confetti) {
                const script = document.createElement("script");
                script.src = "https://cdn.jsdelivr.net/npm/canvas-confetti@1.4.0/dist/confetti.browser.min.js";
                script.async = true;
                script.onload = () => {
                  if (window.confetti) {
                    triggerConfetti();
                  }
                };
                document.body.appendChild(script);
              } else {
                triggerConfetti();
              }
            }, 200);
          }
          currentCount++;
        } else {
          clearInterval(countInterval);
        }
      }, 100); // Adjust speed as needed

      return () => clearInterval(countInterval);
    }
  }, [typewriterComplete, isMounted]);

  // Confetti function
  const triggerConfetti = () => {
    if (window.confetti) {
      // First burst - main confetti from left side
      window.confetti({
        particleCount: 300,
        spread: 100,
        origin: { x: 0.2, y: 0.6 },
        colors: ['#140079', '#9333EA', '#3B82F6', '#10B981', '#F59E0B'],
        startVelocity: 35,
        gravity: 0.8,
        decay: 0.9,
        ticks: 250,
        angle: 60
      });
      
      // Second burst - more confetti from different angle
      setTimeout(() => {
        if (window.confetti) {
          window.confetti({
            particleCount: 200,
            spread: 80,
            origin: { x: 0.1, y: 0.7 },
            colors: ['#EF4444', '#F97316', '#EAB308', '#84CC16', '#06B6D4'],
            startVelocity: 30,
            gravity: 0.9,
            decay: 0.85,
            ticks: 200,
            angle: 45
          });
        }
      }, 200);
      
      // Third burst from left-center
      setTimeout(() => {
        if (window.confetti) {
          window.confetti({
            particleCount: 150,
            spread: 70,
            origin: { x: 0.3, y: 0.5 },
            colors: ['#8B5CF6', '#EC4899', '#F43F5E', '#F59E0B', '#10B981'],
            startVelocity: 25,
            gravity: 0.7,
            decay: 0.8,
            ticks: 220,
            angle: 75
          });
        }
      }, 400);

      // Fourth burst - additional explosion
      setTimeout(() => {
        if (window.confetti) {
          window.confetti({
            particleCount: 180,
            spread: 90,
            origin: { x: 0.15, y: 0.4 },
            colors: ['#140079', '#9333EA', '#3B82F6', '#10B981', '#F59E0B', '#EF4444'],
            startVelocity: 28,
            gravity: 0.8,
            decay: 0.88,
            ticks: 180,
            angle: 50
          });
        }
      }, 600);

      // Fifth burst - final celebration
      setTimeout(() => {
        if (window.confetti) {
          window.confetti({
            particleCount: 120,
            spread: 85,
            origin: { x: 0.25, y: 0.3 },
            colors: ['#F97316', '#EAB308', '#84CC16', '#06B6D4', '#8B5CF6'],
            startVelocity: 32,
            gravity: 0.75,
            decay: 0.9,
            ticks: 200,
            angle: 65
          });
        }
      }, 800);
    }
  };

  // Prevent hydration mismatch by showing a consistent state until mounted
  if (!isMounted) {
    return (
      <section className="h-screen bg-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center h-full relative">
            {/* Left Section - YouTube Video */}
            <div className="relative video-container">
              <div className="relative rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 video-inner">
                <iframe
                  src="https://www.youtube.com/embed/qF-GaYki4lA?rel=0&modestbranding=1&showinfo=0&controls=1"
                  title="25 Years Indigo Timeline Video"
                  className="w-full aspect-video"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  loading="lazy"
                />
              </div>
            </div>

            {/* Right Section - Text Content */}
            <div className="space-y-8 text-content relative z-10">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#140079] leading-tight tracking-tight">
                Celebrating 25 years
              </h2>
              
              <p className="text-lg md:text-xl text-[#140079] leading-relaxed font-light max-w-2xl">
                Throughout the last 25 years, we've seen our business grow and expand, all while staying true to our core values. We've been humbled by the trust, support and loyalty of our customers, old and new, and we look forward to many more years of creating beautiful, lasting memories for you.
              </p>
              
              {/* Animated Button */}
              <div className="pt-4">
                <Link href="/news" className="inline-block">
                  <button className="learn-more group">
                    <span className="circle">
                      <span className="icon arrow"></span>
                    </span>
                    <span className="button-text">Watch more videos</span>
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section 
      ref={sectionRef}
      className="h-screen bg-white relative overflow-hidden"
    >
      {/* Background overlay that appears during transition */}
      <div 
        className="absolute inset-0 bg-gradient-to-br from-blue-50/30 via-purple-50/20 to-indigo-50/30 opacity-0 transition-opacity duration-1000 pointer-events-none"
        style={{ 
          background: 'radial-gradient(circle at center, rgba(20, 0, 121, 0.05) 0%, transparent 70%)'
        }}
      />
      

      
      <div ref={containerRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center h-full relative">
          
          {/* Left Section - YouTube Video */}
          <div ref={videoRef} className="relative video-container">
            <div 
              ref={videoInnerRef}
              className="relative rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 video-inner"
            >
              <iframe
                src="https://www.youtube.com/embed/qF-GaYki4lA?rel=0&modestbranding=1&showinfo=0&controls=1"
                title="25 Years Indigo Timeline Video"
                className="w-full aspect-video"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                loading="lazy"
              />
              
              {/* Curling effect overlay */}
              <div className="absolute inset-0 pointer-events-none">
                <div className="curl-shadow absolute inset-0 opacity-0 transition-opacity duration-300"></div>
              </div>
            </div>
          </div>

          {/* Right Section - Text Content */}
          <div ref={textContainerRef} className="space-y-8 text-content relative z-10">
            <h2 
              ref={headingRef}
              className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#140079] leading-tight tracking-tight"
            >
              Celebrating 25 years
            </h2>
            
            <p 
              ref={descriptionRef}
              className="text-lg md:text-xl text-[#140079] leading-relaxed font-light max-w-2xl"
            >
              Throughout the last 25 years, we've seen our business grow and expand, all while staying true to our core values. We've been humbled by the trust, support and loyalty of our customers, old and new, and we look forward to many more years of creating beautiful, lasting memories for you.
            </p>
            
            {/* Animated Button */}
            <div ref={buttonRef} className="pt-4">
              <Link href="/news" className="inline-block">
                <button className="learn-more group">
                  <span className="circle">
                    <span className="icon arrow"></span>
                  </span>
                  <span className="button-text">Watch more videos</span>
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* New Section - Celebrating Indigo with Typewriter Animation */}
              <div 
          ref={newSectionRef}
          className="absolute left-8 top-1/2 transform -translate-y-24 z-20 opacity-0"
        >
        <div className="space-y-12">
          {/* Heading Section */}
          <div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-semibold text-[#140079] leading-normal font-roboto">
              <span 
                ref={typewriterTextRef}
                className="typewriter-text"
                data-text="Celebrating Indigo"
              >
                {isMounted && videoTransitionComplete ? "" : "Celebrating Indigo"}
              </span>
            </h2>
          </div>
          
          {/* Number and Years Section */}
          <div className="text-center">
            <div className="flex flex-col items-center space-y-2">
              <span 
                ref={numberRef}
                className="text-8xl md:text-9xl lg:text-[12rem] font-black text-[#140079] leading-none counter-number display-block font-roboto"
                style={{ lineHeight: '0.8' }}
              >
                {isMounted ? currentNumber : 0}
              </span>
              <span className="text-lg md:text-xl lg:text-2xl font-bold text-[#140079] tracking-widest font-roboto">
                YEARS
              </span>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        /* Import Roboto font */
        @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700;900&display=swap');
        
        /* Font family utility */
        .font-roboto {
          font-family: 'Roboto', sans-serif;
        }

        /* Typewriter Animation */
        .typewriter-text {
          display: inline-block;
          overflow: visible;
          border-right: 3px solid #140079;
          white-space: nowrap;
          margin: 0 auto;
          letter-spacing: 0.05em;
          animation: typing 3s steps(40, end), blink-caret 0.75s step-end infinite;
          animation-delay: 0.5s;
          animation-fill-mode: both;
          line-height: 1.2;
          padding-bottom: 4px;
        }

        @keyframes typing {
          from { 
            width: 0;
          }
          to { 
            width: 100%;
          }
        }

        @keyframes blink-caret {
          from, to { 
            border-color: transparent;
          }
          50% { 
            border-color: #140079;
          }
        }

        /* Counter Number Animation */
        .counter-number {
          transition: all 0.3s ease;
          text-shadow: 2px 2px 4px rgba(20, 0, 121, 0.1);
          line-height: 0.9;
          padding: 8px 0;
        }

        /* Ensure smooth hardware acceleration */
        .video-container,
        .video-inner,
        .text-content,
        .text-content > *,
        .typewriter-text,
        .counter-number {
          will-change: transform, opacity;
          backface-visibility: hidden;
          perspective: 1000px;
        }

        /* Enhanced video container styles */
        .video-container {
          transform-style: preserve-3d;
          position: relative;
        }

        .video-inner {
          transform-style: preserve-3d;
          transition: box-shadow 0.3s ease;
        }

        .video-inner iframe {
          border-radius: inherit;
          box-shadow: 
            0 25px 50px -12px rgba(0, 0, 0, 0.25),
            0 10px 20px -5px rgba(20, 0, 121, 0.1);
          transition: border-radius 0.1s ease;
        }

        /* Curling effect shadows */
        .curl-shadow {
          background: linear-gradient(
            45deg,
            rgba(0, 0, 0, 0.1) 0%,
            transparent 30%,
            transparent 70%,
            rgba(0, 0, 0, 0.05) 100%
          );
          border-radius: inherit;
          filter: blur(2px);
        }

        /* Enhanced 3D curling effects */
        .video-inner::before {
          content: '';
          position: absolute;
          top: -2px;
          left: -2px;
          right: -2px;
          bottom: -2px;
          background: linear-gradient(45deg, 
            rgba(20, 0, 121, 0.1), 
            rgba(147, 51, 234, 0.1), 
            rgba(59, 130, 246, 0.1)
          );
          border-radius: inherit;
          z-index: -1;
          opacity: 0;
          transition: opacity 0.3s ease;
        }

        /* Button Styles with Enhanced Interactions */
        button {
          position: relative;
          display: inline-block;
          cursor: pointer;
          outline: none;
          border: 0;
          vertical-align: middle;
          text-decoration: none;
          background: transparent;
          padding: 0;
          font-size: inherit;
          font-family: inherit;
          transform-style: preserve-3d;
        }

        button.learn-more {
          width: 16rem;
          height: auto;
          transition: transform 0.3s ease;
        }

        button.learn-more:hover {
          transform: translateY(-2px);
        }

        button.learn-more .circle {
          transition: all 0.45s cubic-bezier(0.65, 0, 0.076, 1);
          position: relative;
          display: block;
          margin: 0;
          width: 3rem;
          height: 3rem;
          background: #140079;
          border-radius: 1.625rem;
          box-shadow: 0 4px 15px rgba(20, 0, 121, 0.2);
        }

        button.learn-more .circle .icon {
          transition: all 0.45s cubic-bezier(0.65, 0, 0.076, 1);
          position: absolute;
          top: 0;
          bottom: 0;
          margin: auto;
          background: #fff;
        }

        button.learn-more .circle .icon.arrow {
          transition: all 0.45s cubic-bezier(0.65, 0, 0.076, 1);
          left: 0.625rem;
          width: 1.125rem;
          height: 0.125rem;
          background: none;
        }

        button.learn-more .circle .icon.arrow::before {
          position: absolute;
          content: "";
          top: -0.29rem;
          right: 0.0625rem;
          width: 0.625rem;
          height: 0.625rem;
          border-top: 0.125rem solid #fff;
          border-right: 0.125rem solid #fff;
          transform: rotate(45deg);
          transition: transform 0.3s ease;
        }

        button.learn-more .button-text {
          transition: all 0.45s cubic-bezier(0.65, 0, 0.076, 1);
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          padding: 0.75rem 0;
          margin: 0 0 0 3.4rem;
          color: #140079;
          font-weight: 700;
          line-height: 1.6;
          text-align: left;
          text-transform: uppercase;
          white-space: nowrap;
          letter-spacing: 0.05em;
        }

        /* Hover effects */
        button:hover .circle {
          width: 100%;
          box-shadow: 0 6px 20px rgba(20, 0, 121, 0.3);
        }

        button:hover .circle .icon.arrow {
          background: #fff;
          transform: translate(1rem, 0);
        }

        button:hover .circle .icon.arrow::before {
          transform: rotate(45deg) scale(1.1);
        }

        button:hover .button-text {
          color: #fff;
        }

        /* Enhanced z-index management */
        .video-container {
          position: relative;
          z-index: 10;
        }

        .text-content {
          position: relative;
          z-index: 5;
        }

        .text-content h2 {
          position: relative;
          z-index: 300;
        }

        /* Responsive adjustments */
        @media (max-width: 1024px) {
          .grid {
            grid-template-columns: 1fr;
            gap: 2rem;
          }
          
          /* Adjust movement values for smaller screens */
          .video-container,
          .text-content {
            transform-origin: center center;
          }
        }

        @media (max-width: 768px) {
          .video-container {
            margin-bottom: 2rem;
          }
        }

        /* Smooth scrolling */
        html {
          scroll-behavior: smooth;
        }

        /* Performance optimizations */
        * {
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
        }

        /* Enhanced focus styles for accessibility */
        button:focus-visible {
          outline: 2px solid #140079;
          outline-offset: 4px;
        }

        /* Prevent text selection during animations */
        .video-container,
        .text-content {
          user-select: none;
          -webkit-user-select: none;
          -moz-user-select: none;
        }

        /* Print styles */
        @media print {
          .video-container {
            display: none;
          }
        }
      `}</style>
    </section>
  );
};

export default IndigoTimeline;