'use client';

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';

export default function CGCapsulesAnimatedColumns() {
  const sectionRef = useRef<HTMLElement>(null);
  const lenisRef = useRef<any>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    gsap.registerPlugin(ScrollTrigger, SplitText);

    // Initialize Lenis for smooth scrolling
    const initLenis = async () => {
      try {
        const Lenis = (await import('lenis')).default;
        lenisRef.current = new Lenis();
        lenisRef.current.on("scroll", ScrollTrigger.update);
        gsap.ticker.add((time) => {
          lenisRef.current.raf(time * 1000);
        });
        gsap.ticker.lagSmoothing(0);
      } catch (error) {
        console.log('Lenis not available, using default scrolling');
      }
    };

    initLenis();

    const initTextSplit = () => {
      const textElements = document.querySelectorAll(".col-3 h1, .col-3 p");

      textElements.forEach((element) => {
        const split = new SplitText(element, {
          type: "lines",
          linesClass: "line",
        });
        split.lines.forEach(
          (line) => (line.innerHTML = `<span>${line.textContent}</span>`)
        );
      });
    };

    // Wait for DOM to be ready
    setTimeout(initTextSplit, 100);

    gsap.set(".col-3 .col-content-wrapper .line span", { y: "0%" });
    gsap.set(".col-3 .col-content-wrapper-2 .line span", { y: "-125%" });

    ScrollTrigger.create({
      trigger: ".sticky-cols",
      start: "top top",
      end: `+=${window.innerHeight * 5}px`,
      pin: true,
      pinSpacing: true,
    });

    let currentPhase = 0;

    ScrollTrigger.create({
      trigger: ".sticky-cols",
      start: "top top",
      end: `+=${window.innerHeight * 6}px`,
      onUpdate: (self) => {
        const progress = self.progress;

        if (progress >= 0.33 && currentPhase === 0) {
          currentPhase = 1;

          gsap.to(".col-1", { opacity: 0, scale: 0.75, duration: 0.75 });
          gsap.to(".col-2", { x: "0%", duration: 0.75 });
          gsap.to(".col-3", { y: "0%", duration: 0.75 });

          gsap.to(".col-img-1 img", { scale: 1.25, duration: 0.75 });
          gsap.to(".col-img-2", {
            clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
            duration: 0.75,
          });
          gsap.to(".col-img-2 img", { scale: 1, duration: 0.75 });
        }

        if (progress >= 0.66 && currentPhase === 1) {
          currentPhase = 2;

          gsap.to(".col-2", { opacity: 0, scale: 0.75, duration: 0.75 });
          gsap.to(".col-3", { x: "0%", duration: 0.75 });
          gsap.to(".col-4", { y: "0%", duration: 0.75 });

          gsap.to(".col-3 .col-content-wrapper .line span", {
            y: "-125%",
            duration: 0.75,
          });
          gsap.to(".col-3 .col-content-wrapper-2 .line span", {
            y: "0%",
            duration: 0.75,
            delay: 0.5,
          });
        }

        if (progress < 0.33 && currentPhase >= 1) {
          currentPhase = 0;

          gsap.to(".col-1", { opacity: 1, scale: 1, duration: 0.75 });
          gsap.to(".col-2", { x: "100%", duration: 0.75 });
          gsap.to(".col-3", { y: "100%", duration: 0.75 });

          gsap.to(".col-img-1 img", { scale: 1, duration: 0.75 });
          gsap.to(".col-img-2", {
            clipPath: "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)",
            duration: 0.75,
          });
          gsap.to(".col-img-2 img", { scale: 1.25, duration: 0.75 });
        }

        if (progress < 0.66 && currentPhase === 2) {
          currentPhase = 1;

          gsap.to(".col-2", { opacity: 1, scale: 1, duration: 0.75 });
          gsap.to(".col-3", { x: "100%", duration: 0.75 });
          gsap.to(".col-4", { y: "100%", duration: 0.75 });

          gsap.to(".col-3 .col-content-wrapper .line span", {
            y: "0%",
            duration: 0.75,
            delay: 0.5,
          });
          gsap.to(".col-3 .col-content-wrapper-2 .line span", {
            y: "-125%",
            duration: 0.75,
          });
        }
      },
    });

    return () => {
      ScrollTrigger.getAll().forEach((st) => st.kill());
      if (lenisRef.current) {
        lenisRef.current.destroy();
      }
    };
  }, []);

  return (
    <>
      <style jsx>{`
        @import url("https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,100..1000;1,9..40,100..1000&display=swap");

        :root {
          --bg: #141414;
          --bg-200: #282828;
          --fg: #fff;
          --fg-100: #f1f1f1;
          --fg-200: #a1a1a1;
        }

        .cg-capsules-section {
          position: relative;
          width: 100vw;
          height: 100svh;
          background-color: var(--bg);
          color: var(--fg-100);
          overflow: hidden;
        }

        .cg-capsules-section h1 {
          font-size: 2.5rem;
          font-weight: 500;
          line-height: 1.1;
        }

        .cg-capsules-section p {
          font-size: 1rem;
          font-weight: 500;
        }

        .cg-capsules-section img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .sticky-cols {
          padding: 0.5rem;
        }

        .sticky-cols-wrapper {
          position: relative;
          width: 100%;
          height: 100%;
        }

        .col {
          position: absolute;
          width: 50%;
          height: 100%;
          will-change: transform;
        }

        .col h1 {
          color: var(--fg-200);
          width: 60%;
        }

        .col p {
          color: var(--fg-100);
          width: 60%;
        }

        .col-2 {
          transform: translateX(100%);
        }

        .col-3 {
          transform: translateX(100%) translateY(100%);
          padding: 0.5rem;
        }

        .col-4 {
          transform: translateX(100%) translateY(100%);
        }

        .col-content,
        .col-img {
          position: relative;
          width: 100%;
          height: 100%;
          padding: 0.5rem;
        }

        .col-content-wrapper,
        .col-img-wrapper {
          position: relative;
          width: 100%;
          height: 100%;
          background-color: var(--bg-200);
          border-radius: 3rem;
          overflow: hidden;
        }

        .col-content-wrapper {
          padding: 2.5rem;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }

        .col-content-wrapper-2 {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          padding: 2.5rem;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }

        .col-img-1,
        .col-img-2 {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
        }

        .col-img-2 {
          clip-path: polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%);
        }

        .col-img-2 img {
          scale: 1.25;
        }

        .line {
          overflow: hidden;
        }

        .line span {
          display: block;
          will-change: transform;
        }

        @media (max-width: 1000px) {
          .cg-capsules-section h1 {
            font-size: 1.25rem;
          }

          .cg-capsules-section p {
            font-size: 0.85rem;
          }

          .col h1,
          .col p {
            width: 100%;
          }

          .col-content-wrapper,
          .col-content-wrapper-2 {
            padding: 2rem;
          }
        }
      `}</style>

      <section className="cg-capsules-section sticky-cols" ref={sectionRef}>
        <div className="sticky-cols-wrapper">
          <div className="col col-1">
            <div className="col-content">
              <div className="col-content-wrapper">
                <h1>
                  We design digital infrastructure that powers the future.
                </h1>
                <p>
                  Survey, acquisition, design and planning for fixed line, subsea,
                  data centres and wireless networks with precision engineering.
                </p>
              </div>
            </div>
          </div>
          <div className="col col-2">
            <div className="col-img col-img-1">
              <div className="col-img-wrapper">
                <img src="/services/img-1.jpg" alt="Design Services" />
              </div>
            </div>
            <div className="col-img col-img-2">
              <div className="col-img-wrapper">
                <img src="/services/img-2.jpg" alt="Deploy Services" />
              </div>
            </div>
          </div>
          <div className="col col-3">
            <div className="col-content-wrapper">
              <h1>
                We deploy networks that connect the world seamlessly.
              </h1>
              <p>
                Build, install, test and optimize telecoms networks and data centres
                with cutting-edge technology and expert craftsmanship.
              </p>
            </div>
          </div>
          <div className="col col-4">
            <div className="col-img">
              <div className="col-img-wrapper">
                <div className="col-content-wrapper">
                  <h1>
                    We support and maintain the digital backbone of tomorrow.
                  </h1>
                  <p>
                    Monitor, maintain, upgrade and decommission digital infrastructure
                    with 24/7 support and proactive maintenance strategies.
                  </p>
                </div>
                <img src="/services/img-3.jpg" alt="Support Services" />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
