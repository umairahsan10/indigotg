'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const ScrollAnimation = () => {
  const componentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    gsap.registerPlugin(ScrollTrigger);

    // Note: Lenis is handled by the main Navigation component to avoid conflicts

    const smoothStep = (p: number) => p * p * (3 - 2 * p);

    if (window.innerWidth > 1000) {
      ScrollTrigger.create({
        trigger: ".hero",
        start: "top top",
        end: "75% top",
        scrub: 1,
        onUpdate: (self) => {
          const progress = self.progress;

          const heroCardsContainerOpacity = gsap.utils.interpolate(
            1,
            0.5,
            smoothStep(progress)
          );
          gsap.set(".hero-cards", {
            opacity: heroCardsContainerOpacity,
          });

          ["#hero-card-1", "#hero-card-2", "#hero-card-3"].forEach(
            (cardId, index) => {
              const delay = index * 0.9;
              const cardProgress = gsap.utils.clamp(
                0,
                1,
                (progress - delay * 0.1) / (1 - delay * 0.1)
              );

              const y = gsap.utils.interpolate(
                "0%",
                "350%",
                smoothStep(cardProgress)
              );
              const scale = gsap.utils.interpolate(
                1,
                0.75,
                smoothStep(cardProgress)
              );

              let x = "0%";
              let rotation = 0;
              if (index === 0) {
                x = gsap.utils.interpolate("0%", "90%", smoothStep(cardProgress));
                rotation = gsap.utils.interpolate(
                  0,
                  -15,
                  smoothStep(cardProgress)
                );
              } else if (index === 2) {
                x = gsap.utils.interpolate(
                  "0%",
                  "-90%",
                  smoothStep(cardProgress)
                );
                rotation = gsap.utils.interpolate(
                  0,
                  15,
                  smoothStep(cardProgress)
                );
              }

              gsap.set(cardId, {
                y: y,
                x: x,
                rotation: rotation,
                scale: scale,
              });
            }
          );
        },
      });

      ScrollTrigger.create({
        trigger: ".services",
        start: "top top",
        end: `+=${window.innerHeight * 4}px`,
        pin: ".services",
        pinSpacing: true,
      });

      ScrollTrigger.create({
        trigger: ".services",
        start: "top top",
        end: `+=${window.innerHeight * 4}px`,
        onLeave: () => {
          const servicesSection = document.querySelector(".services");
          if (servicesSection) {
            const servicesRect = servicesSection.getBoundingClientRect();
            const servicesTop = window.pageYOffset + servicesRect.top;

            gsap.set(".cards", {
              position: "absolute",
              top: servicesTop,
              left: 0,
              width: "100vw",
              height: "100vh",
            });
          }
        },
        onEnterBack: () => {
          gsap.set(".cards", {
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
          });
        },
      });

      ScrollTrigger.create({
        trigger: ".services",
        start: "top bottom",
        end: `+=${window.innerHeight * 4}`,
        scrub: 1,
        onUpdate: (self) => {
          const progress = self.progress;

          const headerProgress = gsap.utils.clamp(0, 1, progress / 0.9);
          const headerY = gsap.utils.interpolate(
            "400%",
            "-100%",
            smoothStep(headerProgress)
          );
          gsap.set(".services-header", {
            y: headerY,
          });

          ["#card-1", "#card-2", "#card-3"].forEach((cardId, index) => {
            const delay = index * 0.5;
            const cardProgress = gsap.utils.clamp(
              0,
              1,
              (progress - delay * 0.1) / (0.9 - delay * 0.1)
            );

            const innerCard = document.querySelector(
              `${cardId} .flip-card-inner`
            );

            let y;
            if (cardProgress < 0.4) {
              const normalizedProgress = cardProgress / 0.4;
              y = gsap.utils.interpolate(
                "-100%",
                "50%",
                smoothStep(normalizedProgress)
              );
            } else if (cardProgress < 0.6) {
              const normalizedProgress = (cardProgress - 0.4) / 0.2;
              y = gsap.utils.interpolate(
                "50%",
                "0%",
                smoothStep(normalizedProgress)
              );
            } else {
              y = "0%";
            }

            let scale;
            if (cardProgress < 0.4) {
              const normalizedProgress = cardProgress / 0.4;
              scale = gsap.utils.interpolate(
                0.25,
                0.75,
                smoothStep(normalizedProgress)
              );
            } else if (cardProgress < 0.6) {
              const normalizedProgress = (cardProgress - 0.4) / 0.2;
              scale = gsap.utils.interpolate(
                0.75,
                1,
                smoothStep(normalizedProgress)
              );
            } else {
              scale = 1;
            }

            let opacity;
            if (cardProgress < 0.2) {
              const normalizedProgress = cardProgress / 0.2;
              opacity = smoothStep(normalizedProgress);
            } else {
              opacity = 1;
            }

            let x, rotate, rotationY;
            if (cardProgress < 0.6) {
              x = index === 0 ? "100%" : index === 1 ? "0%" : "-100%";
              rotate = index === 0 ? -5 : index === 1 ? 0 : 5;
              rotationY = 0;
            } else if (cardProgress < 1) {
              const normalizedProgress = (cardProgress - 0.6) / 0.4;
              x = gsap.utils.interpolate(
                index === 0 ? "100%" : index === 1 ? "0%" : "-100%",
                "0%",
                smoothStep(normalizedProgress)
              );
              rotate = gsap.utils.interpolate(
                index === 0 ? -5 : index === 1 ? 0 : 5,
                0,
                smoothStep(normalizedProgress)
              );
              rotationY = smoothStep(normalizedProgress) * 180;
            } else {
              x = "0%";
              rotate = 0;
              rotationY = 180;
            }

            gsap.set(cardId, {
              opacity: opacity,
              y: y,
              x: x,
              rotate: rotate,
              scale: scale,
            });

            if (innerCard) {
              gsap.set(innerCard, {
                rotationY: rotationY,
              });
            }
          });
        },
      });
    }

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <div ref={componentRef} className="scroll-animation-container">
      <style jsx global>{`
        @import url("https://fonts.googleapis.com/css2?family=DM+Mono:ital,wght@0,300;0,400;0,500;1,300;1,400;1,500&family=DM+Sans:ital,opsz,wght@0,9..40,100..1000;1,9..40,100..1000&display=swap");

        .scroll-animation-container {
          --scroll-dark: #000;
          --scroll-light: #f9f4eb;
          --scroll-light2: #e8e0d5;
          --scroll-accent-1: #e5d9f6;
          --scroll-accent-2: #ffd2f3;
          --scroll-accent-3: #fcdca6;
          --scroll-accent-1-dark: #d4c1ed;
          --scroll-accent-2-dark: #ffbfeb;
          --scroll-accent-3-dark: #fbce8f;
        }

        .scroll-animation-container * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        .scroll-animation-container {
          font-family: "DM Sans";
        }

        .scroll-animation-container h1 {
          font-size: 1.5rem;
          font-weight: 500;
        }

        .scroll-animation-container p {
          font-size: 1.1rem;
          font-weight: 500;
        }

        .scroll-animation-container span {
          text-transform: uppercase;
          font-family: "DM Mono";
          font-size: 0.75rem;
          font-weight: 500;
        }

        .scroll-animation-container nav {
          position: fixed;
          width: 100vw;
          padding: 2rem;
          display: none; /* Hidden to prevent conflict with main Navigation */
          justify-content: space-between;
          align-items: center;
          z-index: 2;
        }

        .scroll-animation-container .logo span,
        .scroll-animation-container .menu-btn span {
          font-size: 0.8rem;
          padding: 0.75rem;
          border-radius: 0.25rem;
        }

        .scroll-animation-container .logo span {
          background-color: var(--scroll-dark);
          color: var(--scroll-light);
        }

        .scroll-animation-container .menu-btn span {
          background-color: var(--scroll-light2);
          color: var(--scroll-dark);
        }

        .scroll-animation-container section {
          position: relative;
          width: 100vw;
          height: 100svh;
          padding: 2rem;
          overflow: hidden;
        }

        .scroll-animation-container .hero {
          background-color: var(--scroll-light);
          color: var(--scroll-dark);
        }

        .scroll-animation-container .hero-header {
          position: absolute;
          top: 20%;
          left: 50%;
          transform: translateX(-50%);
          width: 100%;
          text-align: center;
          z-index: 1;
        }

        .scroll-animation-container .hero-header h1 {
          font-size: 3.5rem;
          font-weight: 700;
          color: var(--scroll-dark);
          margin: 0;
          line-height: 1.1;
          max-width: 800px;
          margin: 0 auto;
        }

        .scroll-animation-container .about,
        .scroll-animation-container .outro {
          display: flex;
          justify-content: center;
          align-items: center;
          background-color: var(--scroll-dark);
          color: var(--scroll-light);
        }

        .scroll-animation-container .about-content {
          text-align: center;
          max-width: 800px;
          padding: 2rem;
        }

        .scroll-animation-container .about-content h1 {
          font-size: 2.5rem;
          margin-bottom: 1.5rem;
          line-height: 1.2;
          background: linear-gradient(135deg, var(--scroll-light), var(--scroll-accent-1));
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .scroll-animation-container .about-content p {
          font-size: 1.3rem;
          margin-bottom: 2.5rem;
          line-height: 1.6;
          opacity: 0.9;
          font-weight: 400;
        }

        .scroll-animation-container .about-features {
          display: flex;
          justify-content: center;
          gap: 2rem;
          flex-wrap: wrap;
        }

        .scroll-animation-container .feature {
          padding: 0.75rem 1.5rem;
          background: rgba(255, 255, 255, 0.1);
          border: 1px solid rgba(255, 255, 255, 0.2);
          border-radius: 2rem;
          backdrop-filter: blur(10px);
          transition: all 0.3s ease;
        }

        .scroll-animation-container .feature:hover {
          background: rgba(255, 255, 255, 0.15);
          border-color: var(--scroll-accent-1);
          transform: translateY(-2px);
        }

        .scroll-animation-container .feature span {
          font-size: 0.9rem;
          font-weight: 500;
          color: var(--scroll-light);
        }

        .scroll-animation-container .hero-cards {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 35%;
          display: flex;
          justify-content: center;
          gap: 1rem;
        }

        .scroll-animation-container .hero-cards .card {
          flex: 1;
          position: relative;
          aspect-ratio: 5/7;
          padding: 0.75rem;
          border-radius: 0.5rem;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          container-type: inline-size;
        }

        .scroll-animation-container .card-title {
          width: 100%;
          display: flex;
          justify-content: space-between;
        }

        .scroll-animation-container .hero-cards .card span {
          font-size: 0.7rem;
        }

        .scroll-animation-container .card-center {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          z-index: 10;
        }

        .scroll-animation-container .card-center h2 {
          font-size: clamp(1.5rem, 4vw, 3.6rem);
          font-weight: 700;
          color: white;
          margin: 0;
          text-align: center;
          text-transform: uppercase;
          letter-spacing: 1px;
          pointer-events: none;
          white-space: nowrap;
          text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
          transform-origin: center;
          transition: transform 0.1s ease-out;
        }

        .scroll-animation-container .hero-cards .card#hero-card-1 {
          background-color: var(--scroll-accent-1);
          transform-origin: top right;
          z-index: 2;
        }

        .scroll-animation-container .hero-cards .card#hero-card-2 {
          background-color: var(--scroll-accent-2);
          z-index: 1;
        }

        .scroll-animation-container .hero-cards .card#hero-card-3 {
          background-color: var(--scroll-accent-3);
          transform-origin: top left;
          z-index: 0;
        }

        /* Responsive text scaling based on card width */
        @container (max-width: 200px) {
          .scroll-animation-container .card-center h2 {
            font-size: 1.5rem;
          }
        }

        @container (min-width: 300px) {
          .scroll-animation-container .card-center h2 {
            font-size: 3rem;
          }
        }

        @container (min-width: 400px) {
          .scroll-animation-container .card-center h2 {
            font-size: 3.6rem;
          }
        }

        .scroll-animation-container .services {
          padding: 8rem 2rem;
        }

        .scroll-animation-container .services-header {
          position: relative;
          width: 100%;
          text-align: center;
          transform: translateY(400%);
          will-change: transform;
        }

        .scroll-animation-container .services-header h1 {
          font-size: 3rem;
          font-weight: 600;
          color: var(--scroll-dark);
          margin: 0;
          line-height: 1.2;
        }

        .scroll-animation-container .outro-header {
          position: relative;
          width: 100%;
          text-align: center;
          max-width: 800px;
          margin: 0 auto;
        }

        .scroll-animation-container .outro-header h1 {
          font-size: 3rem;
          font-weight: 600;
          color: var(--scroll-light);
          margin: 0;
          line-height: 1.2;
        }

        .scroll-animation-container .cards {
          position: fixed;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100svh;
          display: flex;
          justify-content: center;
          z-index: -1;
          background-color: var(--scroll-light);
        }

        .scroll-animation-container .cards-container {
          position: relative;
          width: 75%;
          height: 100%;
          margin-top: 4rem;
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 4rem;
        }

        .scroll-animation-container .cards-container .card {
          flex: 1;
          position: relative;
          aspect-ratio: 5/7;
          perspective: 1000px;
        }

        .scroll-animation-container .cards-container .card .card-wrapper {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 100%;
          height: 100%;
          animation: scroll-animation-floating 2s infinite ease-in-out;
        }

        @keyframes scroll-animation-floating {
          0% {
            transform: translate(-50%, -50%);
          }
          50% {
            transform: translate(-50%, -55%);
          }
          100% {
            transform: translate(-50%, -50%);
          }
        }

        .scroll-animation-container #card-1 .card-wrapper {
          animation-delay: 0;
        }

        .scroll-animation-container #card-2 .card-wrapper {
          animation-delay: 0.25s;
        }

        .scroll-animation-container #card-3 .card-wrapper {
          animation-delay: 0.5s;
        }

        .scroll-animation-container .flip-card-inner {
          position: relative;
          width: 100%;
          height: 100%;
          transform-style: preserve-3d;
        }

        .scroll-animation-container .flip-card-front,
        .scroll-animation-container .flip-card-back {
          position: absolute;
          width: 100%;
          height: 100%;
          border-radius: 1rem;
          backface-visibility: hidden;
          overflow: hidden;
        }

        .scroll-animation-container .flip-card-front {
          padding: 1rem;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          align-items: center;
        }

        .scroll-animation-container #card-1 .flip-card-front {
          background-color: var(--scroll-accent-1);
        }

        .scroll-animation-container #card-2 .flip-card-front {
          background-color: var(--scroll-accent-2);
        }

        .scroll-animation-container #card-3 .flip-card-front {
          background-color: var(--scroll-accent-3);
        }

        .scroll-animation-container .flip-card-back {
          padding: 1rem;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          gap: 2rem;
          transform: rotateY(180deg);
        }

        .scroll-animation-container #card-1 .flip-card-back {
          background-color: var(--scroll-accent-1);
        }

        .scroll-animation-container #card-2 .flip-card-back {
          background-color: var(--scroll-accent-2);
        }

        .scroll-animation-container #card-3 .flip-card-back {
          background-color: var(--scroll-accent-3);
        }

        .scroll-animation-container #card-1 .flip-card-back .card-heading {
          background-color: var(--scroll-accent-1-dark);
        }

        .scroll-animation-container #card-2 .flip-card-back .card-heading {
          background-color: var(--scroll-accent-2-dark);
        }

        .scroll-animation-container #card-3 .flip-card-back .card-heading {
          background-color: var(--scroll-accent-3-dark);
        }

        .scroll-animation-container .card-copy {
          width: 100%;
          height: 100%;
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .scroll-animation-container .card-copy p {
          flex: 1;
          display: flex;
          justify-content: center;
          align-items: center;
          font-size: 1rem;
          border-radius: 0.25rem;
        }

        .scroll-animation-container #card-1 .flip-card-back .card-copy p {
          background-color: var(--scroll-accent-1-dark);
        }

        .scroll-animation-container #card-2 .flip-card-back .card-copy p {
          background-color: var(--scroll-accent-2-dark);
        }

        .scroll-animation-container #card-3 .flip-card-back .card-copy p {
          background-color: var(--scroll-accent-3-dark);
        }

        .scroll-animation-container .cards #card-1 {
          transform: translateX(100%) translateY(-100%) rotate(-5deg) scale(0.25);
          z-index: 2;
        }

        .scroll-animation-container .cards #card-2 {
          transform: translateX(0%) translateY(-100%) rotate(0deg) scale(0.25);
          z-index: 1;
        }

        .scroll-animation-container .cards #card-3 {
          transform: translateX(-100%) translateY(-100%) rotate(5deg) scale(0.25);
          z-index: 0;
        }

        .scroll-animation-container .cards .cards-container .card {
          opacity: 0;
        }

        .scroll-animation-container .mobile-cards {
          display: none;
        }

        @media (max-width: 1000px) {
          .scroll-animation-container .hero-header h1 {
            font-size: 2.5rem;
            padding: 0 2rem;
          }

          .scroll-animation-container .hero-cards {
            width: calc(100% - 4rem);
          }

          .scroll-animation-container .about-content h1 {
            font-size: 2rem;
          }

          .scroll-animation-container .about-content p {
            font-size: 1.1rem;
          }

          .scroll-animation-container .about-features {
            gap: 1rem;
          }

          .scroll-animation-container .feature {
            padding: 0.5rem 1rem;
          }

          .scroll-animation-container .services {
            min-height: 100svh;
            height: 100%;
          }

          .scroll-animation-container .services-header {
            transform: translateY(0%);
          }

          .scroll-animation-container .mobile-cards {
            display: block;
            height: 100%;
          }

          .scroll-animation-container .mobile-cards .cards-container {
            width: calc(100% - 4rem);
            display: block;
            height: 100%;
            margin: 4rem auto;
          }

          .scroll-animation-container .mobile-cards .cards-container .card {
            margin-bottom: 2rem;
          }

          .scroll-animation-container .mobile-cards .cards-container .card-wrapper {
            animation: none;
          }

          .scroll-animation-container .mobile-cards .card .flip-card-front {
            transform: rotateY(180deg);
          }

          .scroll-animation-container .mobile-cards .flip-card-back {
            transform: rotateY(0deg);
          }
        }
      `}</style>

      <nav>
        <div className="logo"><span>Indigo Network</span></div>
        <div className="menu-btn"><span>Menu</span></div>
      </nav>

      <section className="hero">
        <div className="hero-header">
          <h1>Network Solutions</h1>
        </div>
        <div className="hero-cards">
          <div className="card" id="hero-card-1">
            <div className="card-title">
              <span>Design</span>
              <span>01</span>
            </div>
            <div className="card-center">
              <h2>Design</h2>
            </div>
            <div className="card-title">
              <span>01</span>
              <span>Design</span>
            </div>
          </div>

          <div className="card" id="hero-card-2">
            <div className="card-title">
              <span>Deploy</span>
              <span>02</span>
            </div>
            <div className="card-center">
              <h2>Deploy</h2>
            </div>
            <div className="card-title">
              <span>02</span>
              <span>Deploy</span>
            </div>
          </div>

          <div className="card" id="hero-card-3">
            <div className="card-title">
              <span>Support</span>
              <span>03</span>
            </div>
            <div className="card-center">
              <h2>Support</h2>
            </div>
            <div className="card-title">
              <span>03</span>
              <span>Support</span>
            </div>
          </div>
        </div>
      </section>

      <section className="about">
        <div className="about-content">
          <h1>Indigo Overview</h1>
          <p>Find out how Indigo designs, deploys and supports digital infrastructure enhancing network performance now and into the future.</p>
          <div className="about-features">
            <div className="feature">
              <span>Explore Services</span>
            </div>
          </div>
        </div>
      </section>

      <section className="services">
        <div className="services-header">
          <h1>Expert design, deployment, and support services</h1>
        </div>

        <div className="mobile-cards">
          <div className="cards-container">
            <div className="card" id="mobile-card-1">
              <div className="card-wrapper">
                <div className="flip-card-inner">
                  <div className="flip-card-front">
                    <div className="card-title">
                      <span>Design</span>
                      <span>01</span>
                    </div>
                    <div className="card-title">
                      <span>01</span>
                      <span>Design</span>
                    </div>
                  </div>
                  <div className="flip-card-back">
                    <div className="card-title">
                      <span>Design</span>
                      <span>01</span>
                    </div>
                    <div className="card-copy">
                      <p>Network Design</p>
                      <p>Fibre Survey</p>
                      <p>Data Centre Design</p>
                      <p>Wireless Planning</p>
                      <p>Wayleaving</p>
                      <p>Due Diligence</p>
                    </div>
                    <div className="card-title">
                      <span>01</span>
                      <span>Design</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="card" id="mobile-card-2">
              <div className="card-wrapper">
                <div className="flip-card-inner">
                  <div className="flip-card-front">
                    <div className="card-title">
                      <span>Deploy</span>
                      <span>02</span>
                    </div>
                    <div className="card-title">
                      <span>02</span>
                      <span>Deploy</span>
                    </div>
                  </div>
                  <div className="flip-card-back">
                    <div className="card-title">
                      <span>Deploy 1232323</span>
                      <span>02</span>
                    </div>
                    <div className="card-copy">
                      <p>Infrastructure Build</p>
                      <p>Project Management</p>
                      <p>Equipment Installation</p>
                      <p>Testing & Commissioning</p>
                      <p>Logistics</p>
                      <p>Site Access</p>
                    </div>
                    <div className="card-title">
                      <span>02</span>
                      <span>Deploy</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="card" id="mobile-card-3">
              <div className="card-wrapper">
                <div className="flip-card-inner">
                  <div className="flip-card-front">
                    <div className="card-title">
                      <span>Support</span>
                      <span>03</span>
                    </div>
                    <div className="card-title">
                      <span>03</span>
                      <span>Support</span>
                    </div>
                  </div>
                  <div className="flip-card-back">
                    <div className="card-title">
                      <span>Support</span>
                      <span>03</span>
                    </div>
                    <div className="card-copy">
                      <p>24/7 Monitoring</p>
                      <p>Maintenance</p>
                      <p>Service Desk</p>
                      <p>Network Upgrades</p>
                      <p>Spare Parts</p>
                      <p>Smart Hands</p>
                    </div>
                    <div className="card-title">
                      <span>03</span>
                      <span>Support</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="cards">
        <div className="cards-container">
          <div className="card" id="card-1">
            <div className="card-wrapper">
              <div className="flip-card-inner">
                <div className="flip-card-front">
                  <div className="card-title">
                    <span>Design</span>
                    <span>01</span>
                  </div>
                  <div className="card-center">
                    <h2>Design</h2>
                  </div>
                  <div className="card-title">
                    <span>01</span>
                    <span>Design</span>
                  </div>
                </div>
                <div className="flip-card-back">
                  <div className="card-title">
                    <span>Design</span>
                    <span>01</span>
                  </div>
                  <div className="card-copy">
                    <p>Network Design</p>
                    <p>Fibre Survey</p>
                    <p>Data Centre Design</p>
                    <p>Wireless Planning</p>
                    <p>Wayleaving</p>
                    <p>Due Diligence</p>
                  </div>
                  <div className="card-title">
                    <span>01</span>
                    <span>Design</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="card" id="card-2">
            <div className="card-wrapper">
              <div className="flip-card-inner">
                <div className="flip-card-front">
                  <div className="card-title">
                    <span>Deploy</span>
                    <span>02</span>
                  </div>
                  <div className="card-center">
                    <h2>Deploy</h2>
                  </div>
                  <div className="card-title">
                    <span>02</span>
                    <span>Deploy</span>
                  </div>
                </div>
                <div className="flip-card-back">
                  <div className="card-title">
                    <span>Deploy</span>
                    <span>02</span>
                  </div>
                  <div className="card-copy">
                    <p>Infrastructure Build</p>
                    <p>Project Management</p>
                    <p>Equipment Installation</p>
                    <p>Testing & Commissioning</p>
                    <p>Logistics</p>
                    <p>Site Access</p>
                  </div>
                  <div className="card-title">
                    <span>02</span>
                    <span>Deploy</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="card" id="card-3">
            <div className="card-wrapper">
              <div className="flip-card-inner">
                <div className="flip-card-front">
                  <div className="card-title">
                    <span>Support</span>
                    <span>03</span>
                  </div>
                  <div className="card-center">
                    <h2>Support</h2>
                  </div>
                  <div className="card-title">
                    <span>03</span>
                    <span>Support</span>
                  </div>
                </div>
                <div className="flip-card-back">
                  <div className="card-title">
                    <span>Support</span>
                    <span>03</span>
                  </div>
                  <div className="card-copy">
                    <p>24/7 Monitoring</p>
                    <p>Maintenance</p>
                    <p>Service Desk</p>
                    <p>Network Upgrades</p>
                    <p>Spare Parts</p>
                    <p>Smart Hands</p>
                  </div>
                  <div className="card-title">
                    <span>03</span>
                    <span>Support</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="outro">
        <div className="outro-header">
          <h1>Global team ensuring high-performance connectivity</h1>
        </div>
      </section>
    </div>
  );
};

export default ScrollAnimation;
