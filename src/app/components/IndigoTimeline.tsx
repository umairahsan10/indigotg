import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import ConfettiButton from './ConfettiButton';

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
  
  const [gsapLoaded, setGsapLoaded] = useState(false);
  const [confettiTriggered, setConfettiTriggered] = useState(false);

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
          
          // Video movement: from left grid position to center of viewport
          // Starting position is approximately 25% from left (left column of grid)
          // Target position is center (50% from left)
          const startX = 0; // Start at normal grid position
          const targetX = vw * 0.25; // Move more toward center
          const videoX = progress * targetX;
          
          // Move video down more to land lower and keep heading visible
          const videoY = progress * (vh * 0.15); // Land much lower 
          
          // Scale video up as it moves to center
          const videoScale = 1 + (progress * 0.35);
          
          // Curling effect: video deforms during transition
          const curlIntensity = Math.sin(progress * Math.PI) * 15; // Bell curve for curl
          const skewX = curlIntensity;
          const skewY = curlIntensity * 0.3;
          const rotateZ = curlIntensity * 0.5;
          
          // Apply curl effect with CSS transforms
          const borderRadius = 16 - (curlIntensity * 0.8); // Reduce border radius during curl
          
          window.gsap.set(videoRef.current, {
            x: videoX,
            y: videoY,
            scale: videoScale,
            zIndex: progress > 0.3 ? 100 : 10,
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

          // Heading movement: center it perfectly above the video
          const headingX = progress * (vw * 0); // More movement to truly center it
          const headingY = progress * (-vh * 0.08); // Move up a bit more to clear space above video
          const headingScale = 1; // No scale change to prevent blur
          const headingOpacity = 1; // No opacity change - stay fully visible
          
          window.gsap.set(headingRef.current, {
            x: headingX,
            y: headingY,
            scale: headingScale,
            opacity: headingOpacity,
            zIndex: 200,
            transformOrigin: "left center",
            filter: "none", // Prevent any blur
            backfaceVisibility: "hidden" // Fix rendering issues
          });

          // Description fade out quickly
          const descriptionOpacity = Math.max(0, 1 - (progress * 3));
          const descriptionY = progress * 80;
          const descriptionScale = Math.max(0.8, 1 - (progress * 0.4));
          
          window.gsap.set(descriptionRef.current, {
            opacity: descriptionOpacity,
            y: descriptionY,
            scale: descriptionScale
          });

          // Button fade out after description
          const buttonOpacity = Math.max(0, 1 - ((progress - 0.1) * 3));
          const buttonY = progress * 100;
          const buttonScale = Math.max(0.7, 1 - (progress * 0.6));
          
          window.gsap.set(buttonRef.current, {
            opacity: buttonOpacity,
            y: buttonY,
            scale: buttonScale
          });

          // Text container movement: move out of the way
          const containerX = progress * (-vw * 0.15);
          const containerOpacity = Math.max(0.2, 1 - (progress * 0.8));
          
          window.gsap.set(textContainerRef.current, {
            x: containerX,
            opacity: containerOpacity
          });

          // Trigger confetti when transition is complete (progress >= 0.95)
          if (progress >= 0.95 && !confettiTriggered) {
            setConfettiTriggered(true);
            // Load confetti script if not already loaded
            if (!window.confetti) {
              const script = document.createElement("script");
              script.src = "https://cdn.jsdelivr.net/npm/canvas-confetti@1.4.0/dist/confetti.browser.min.js";
              script.async = true;
              script.onload = () => {
                if (window.confetti) {
                  // Trigger confetti from the center of the screen
                  window.confetti({
                    particleCount: 150,
                    spread: 90,
                    origin: { x: 0.5, y: 0.6 },
                    colors: ['#140079', '#9333EA', '#3B82F6', '#10B981', '#F59E0B'],
                    startVelocity: 30,
                    gravity: 0.8,
                    decay: 0.9,
                    ticks: 200
                  });
                  
                  // Add a second burst of confetti for extra celebration
                  setTimeout(() => {
                    if (window.confetti) {
                      window.confetti({
                        particleCount: 100,
                        spread: 70,
                        origin: { x: 0.3, y: 0.7 },
                        colors: ['#EF4444', '#F97316', '#EAB308', '#84CC16', '#06B6D4'],
                        startVelocity: 25,
                        gravity: 0.9,
                        decay: 0.85,
                        ticks: 150
                      });
                    }
                  }, 300);
                  
                  // Add a third burst from the right side
                  setTimeout(() => {
                    if (window.confetti) {
                      window.confetti({
                        particleCount: 80,
                        spread: 60,
                        origin: { x: 0.7, y: 0.7 },
                        colors: ['#8B5CF6', '#EC4899', '#F43F5E', '#F59E0B', '#10B981'],
                        startVelocity: 20,
                        gravity: 0.7,
                        decay: 0.8,
                        ticks: 180
                      });
                    }
                  }, 600);
                }
              };
              document.body.appendChild(script);
            } else {
              // Confetti already loaded, trigger immediately
              window.confetti({
                particleCount: 150,
                spread: 90,
                origin: { x: 0.5, y: 0.6 },
                colors: ['#140079', '#9333EA', '#3B82F6', '#10B981', '#F59E0B'],
                startVelocity: 30,
                gravity: 0.8,
                decay: 0.9,
                ticks: 200
              });
              
              // Add a second burst of confetti for extra celebration
              setTimeout(() => {
                if (window.confetti) {
                  window.confetti({
                    particleCount: 100,
                    spread: 70,
                    origin: { x: 0.3, y: 0.7 },
                    colors: ['#EF4444', '#F97316', '#EAB308', '#84CC16', '#06B6D4'],
                    startVelocity: 25,
                    gravity: 0.9,
                    decay: 0.85,
                    ticks: 150
                  });
                }
              }, 300);
              
              // Add a third burst from the right side
              setTimeout(() => {
                if (window.confetti) {
                  window.confetti({
                    particleCount: 80,
                    spread: 60,
                    origin: { x: 0.7, y: 0.7 },
                    colors: ['#EF4444', '#EC4899', '#F43F5E', '#F59E0B', '#10B981'],
                    startVelocity: 20,
                    gravity: 0.7,
                    decay: 0.8,
                    ticks: 180
                  });
                }
              }, 600);
            }
          }
        }
      });
    };

    loadGSAP();

    // Cleanup function
    return () => {
      if (scrollTriggerInstance) {
        scrollTriggerInstance.kill();
      }
      if (window.ScrollTrigger) {
        window.ScrollTrigger.getAll().forEach((trigger: any) => trigger.kill());
      }
    };
  }, []);

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

      <style jsx>{`
        /* Ensure smooth hardware acceleration */
        .video-container,
        .video-inner,
        .text-content,
        .text-content > * {
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