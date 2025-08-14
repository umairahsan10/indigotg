'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { orbitron } from '../fonts';

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
              width: "100%",
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
    <div ref={componentRef} className={`scroll-animation-container ${orbitron.className}`}>
      <style jsx global>{`
        @import url("https://fonts.googleapis.com/css2?family=DM+Mono:ital,wght@0,300;0,400;0,500;1,300;1,400;1,500&family=DM+Sans:ital,opsz,wght@0,9..40,100..1000;1,9..40,100..1000&family=Inter:ital,opsz,wght@0,100..900;1,100..900&display=swap");

        .scroll-animation-container {
          --scroll-dark: #0f172a;
          --scroll-light: #f9f4eb;
          --scroll-light2: #e8e0d5;
          --scroll-accent-1: #e5d9f6;
          --scroll-accent-2: #ffd2f3;
          --scroll-accent-3: #fcdca6;
          --scroll-accent-1-dark: #d4c1ed;
          --scroll-accent-2-dark: #ffbfeb;
          --scroll-accent-3-dark: #fbce8f;
          --font-orbitron: ${orbitron.style.fontFamily};
        }

        .scroll-animation-container * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        .scroll-animation-container {
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
        }

        .scroll-animation-container h1 {
          font-size: 2.25rem;
          font-weight: 900;
          font-family: var(--font-orbitron), "Orbitron", monospace;
        }

        .scroll-animation-container p {
          font-size: 1rem;
          font-weight: 400;
          line-height: 1.6;
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
        }

        @media (min-width: 768px) {
          .scroll-animation-container h1 {
            font-size: 3rem;
          }
        }

        .scroll-animation-container span {
          text-transform: uppercase;
          font-family: "Inter", "DM Mono", monospace;
          font-size: 0.75rem;
          font-weight: 500;
          letter-spacing: 0.05em;
        }

        .scroll-animation-container nav {
          position: fixed;
          width: 100%;
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
          width: 100%;
          height: 100svh;
          padding: 5rem 1.5rem;
          overflow: hidden;
        }

        @media (min-width: 1024px) {
          .scroll-animation-container section {
            padding: 5rem 6rem;
          }
        }

        .scroll-animation-container .hero {
          background-color: var(--scroll-light);
          color: var(--scroll-dark);
          position: relative;
          overflow: hidden;
        }

        .scroll-animation-container .hero-background {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          z-index: 0;
        }

        .scroll-animation-container .hero-background::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(249, 244, 235, 0);
          z-index: 1;
        }

        .scroll-animation-container .hero-bg-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center;
          opacity: 1;
          filter: brightness(1.1) contrast(1.1);
        }

        .scroll-animation-container .hero-header {
          position: absolute;
          top: 15%;
          left: 50%;
          transform: translateX(-50%);
          width: 100%;
          text-align: center;
          z-index: 2;
          margin-bottom: 2.5rem;
        }

        .scroll-animation-container .hero-header h1 {
          font-size: 3rem;
          font-weight: 900;
          color: #140079;
          margin: 0;
          line-height: 1.1;
          max-width: 72rem;
          margin: 0 auto;
          font-family: var(--font-orbitron), "Orbitron", monospace;
          text-shadow: 2px 2px 4px rgba(255, 255, 255, 0.8);
        }

        @media (min-width: 768px) {
          .scroll-animation-container .hero-header h1 {
            font-size: 4rem;
          }
        }

        .scroll-animation-container .about,
        .scroll-animation-container .outro {
          display: flex;
          justify-content: center;
          align-items: center;
          background-color: #000000;
          color: var(--scroll-light);
        }

        .scroll-animation-container .about-content {
          display: flex;
          align-items: center;
          justify-content: space-between;
          max-width: 1400px;
          padding: 2rem;
          gap: 2rem;
          width: 100%;
        }

        .scroll-animation-container .about-text {
          flex: 1;
          text-align: left;
          min-width: 500px;
        }

        .scroll-animation-container .about-video {
          flex: 1;
          position: relative;
          min-width: 500px;
        }

        .scroll-animation-container .about-content h1 {
          font-size: 2.25rem;
          margin-bottom: 2.5rem;
          line-height: 1.2;
          background: linear-gradient(135deg, var(--scroll-light), var(--scroll-accent-1));
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          font-family: var(--font-orbitron), "Orbitron", monospace;
          font-weight: 800;
        }

        @media (min-width: 768px) {
          .scroll-animation-container .about-content h1 {
            font-size: 3rem;
          }
        }

        .scroll-animation-container .about-content p {
          font-size: 1rem;
          margin-bottom: 3rem;
          line-height: 1.6;
          opacity: 0.9;
          font-weight: 400;
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
          max-width: 42rem;
        }

        .scroll-animation-container .about-features {
          display: flex;
          justify-content: flex-start;
          gap: 2rem;
          flex-wrap: wrap;
        }

        .scroll-animation-container .feature {
          padding: 1rem 2rem;
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

        /* Circle Video Styles */
        .scroll-animation-container .circle-video-container {
          position: relative;
          width: 100%;
          aspect-ratio: 16/9;
          border-radius: 16px;
          overflow: hidden;
          box-shadow: 0 30px 60px rgba(0, 0, 0, 0.4);
          min-height: 500px;
        }

        .scroll-animation-container .circle-video-container::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.3);
          border-radius: 16px;
          z-index: 1;
        }

        .scroll-animation-container .circle-video-container::after {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.1);
          border-radius: 16px;
          z-index: 3;
          pointer-events: none;
        }

        .scroll-animation-container .circle-video {
          width: 100%;
          height: 100%;
          object-fit: cover;
          border-radius: 16px;
          position: relative;
          z-index: 4;
        }

        .scroll-animation-container .circle-video-container video {
          width: 100%;
          height: 100%;
          object-fit: cover;
          border-radius: 16px;
          position: relative;
          z-index: 4;
        }

        .scroll-animation-container .circle-video-container img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          border-radius: 16px;
        }

        .scroll-animation-container .youtube-overlay {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          pointer-events: none;
          opacity: 0;
          transition: opacity 0.3s ease;
        }

        .scroll-animation-container .youtube-container:hover .youtube-overlay {
          opacity: 1;
        }

        .scroll-animation-container .channel-info {
          position: absolute;
          top: 12px;
          left: 12px;
          display: flex;
          align-items: center;
          gap: 12px;
          background: rgba(0, 0, 0, 0.8);
          padding: 8px 12px;
          border-radius: 8px;
          backdrop-filter: blur(10px);
          pointer-events: auto;
        }

        .scroll-animation-container .channel-avatar {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          background: #065fd4;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .scroll-animation-container .avatar-icon {
          width: 16px;
          height: 16px;
          background: white;
          clip-path: polygon(50% 0%, 0% 100%, 100% 100%);
        }

        .scroll-animation-container .channel-details {
          display: flex;
          flex-direction: column;
          gap: 2px;
        }

        .scroll-animation-container .channel-name {
          color: white;
          font-size: 14px;
          font-weight: 500;
        }

        .scroll-animation-container .subscriber-count {
          color: #aaa;
          font-size: 12px;
        }

        .scroll-animation-container .subscribe-btn {
          background: white;
          color: black;
          border: none;
          padding: 8px 16px;
          border-radius: 18px;
          font-size: 14px;
          font-weight: 500;
          cursor: pointer;
          transition: background-color 0.2s ease;
        }

        .scroll-animation-container .subscribe-btn:hover {
          background: #f0f0f0;
        }

        .scroll-animation-container .copy-link {
          position: absolute;
          top: 12px;
          right: 12px;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 4px;
          background: rgba(0, 0, 0, 0.8);
          padding: 8px;
          border-radius: 8px;
          backdrop-filter: blur(10px);
          pointer-events: auto;
        }

        .scroll-animation-container .copy-icon {
          width: 20px;
          height: 20px;
          background: white;
          mask: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath d='M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z'/%3E3C/svg%3E") no-repeat center;
          mask-size: contain;
        }

        .scroll-animation-container .copy-link span {
          color: white;
          font-size: 12px;
          font-weight: 500;
        }

        .scroll-animation-container .watch-youtube {
          position: absolute;
          bottom: 31px;
          display: flex;
          align-items: center;
          gap: 8px;
          background: rgba(0, 0, 0, 0.8);
          padding: 8px 12px;
          backdrop-filter: blur(10px);
          pointer-events: auto;
        }

        .scroll-animation-container .watch-youtube span {
          color: white;
          font-size: 14px;
          font-weight: 500;
        }

        .scroll-animation-container .youtube-logo {
          width: 20px;
          height: 14px;
          background: #ff0000;
          border-radius: 2px;
          position: relative;
        }

        .scroll-animation-container .youtube-logo::after {
          content: '';
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 0;
          height: 0;
          border-left: 6px solid white;
          border-top: 4px solid transparent;
          border-bottom: 4px solid transparent;
        }

        .scroll-animation-container .hero-cards {
          position: absolute;
          top: 60%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 55%;
          display: flex;
          justify-content: center;
          gap: 1rem;
          z-index: 2;
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

        .scroll-animation-container .hero-cards .card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.3);
          border-radius: 0.5rem;
          z-index: 1;
        }

        .scroll-animation-container .card-title {
          width: 100%;
          display: flex;
          justify-content: space-between;
          position: relative;
          z-index: 2;
        }

        .scroll-animation-container .flip-card-back .card-title {
          z-index: 3;
        }

        .scroll-animation-container .hero-cards .card span {
          font-size: 0.7rem;
          position: relative;
          z-index: 2;
        }

        .scroll-animation-container .card-center {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          z-index: 10;
        }

        .scroll-animation-container .card-center h2 {
          font-size: clamp(1.25rem, 3vw, 2.5rem);
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
          font-family: var(--font-orbitron), "Orbitron", monospace;
        }

        .scroll-animation-container .hero-cards .card#hero-card-1 {
          background-image: url('/card/card1.png');
          background-size: cover;
          background-position: center;
          background-repeat: no-repeat;
          transform-origin: top right;
          z-index: 2;
        }

        .scroll-animation-container .hero-cards .card#hero-card-2 {
          background-image: url('/card/card2.png');
          background-size: cover;
          background-position: center;
          background-repeat: no-repeat;
          z-index: 1;
        }

        .scroll-animation-container .hero-cards .card#hero-card-3 {
          background-image: url('/card/card3.png');
          background-size: cover;
          background-position: center;
          background-repeat: no-repeat;
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
          position: relative;
          overflow: hidden;
        }

        .scroll-animation-container .services-background {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          z-index: 0;
        }

        .scroll-animation-container .services-bg-image {
          display: none;
        }

        .scroll-animation-container .services-header {
          position: relative;
          width: 100%;
          text-align: center;
          transform: translateY(400%);
          will-change: transform;
          z-index: 2;
        }

        .scroll-animation-container .services-header h1 {
          font-size: 3rem;
          font-weight: 900;
          color: #140079;
          margin: 0;
          margin-top: 2rem;
          line-height: 1.2;
          font-family: var(--font-orbitron), "Orbitron", monospace;
          text-shadow: 2px 2px 4px rgba(255, 255, 255, 0.8);
        }

        @media (min-width: 768px) {
          .scroll-animation-container .services-header h1 {
            font-size: 4rem;
          }
        }

        .scroll-animation-container .outro-header {
          position: relative;
          width: 100%;
          text-align: center;
          max-width: 800px;
          margin: 0 auto;
        }

        .scroll-animation-container .outro-header h1 {
          font-size: 2.25rem;
          font-weight: 800;
          color: var(--scroll-light);
          margin: 0;
          line-height: 1.2;
          font-family: var(--font-orbitron), "Orbitron", monospace;
        }

        @media (min-width: 768px) {
          .scroll-animation-container .outro-header h1 {
            font-size: 3rem;
          }
        }

        .scroll-animation-container .cards {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100svh;
          display: flex;
          justify-content: center;
          z-index: -1;
          background-color: var(--scroll-light);
          background-image: url('/card/page2.png');
          background-size: cover;
          background-position: center;
          background-repeat: no-repeat;
        }

        .scroll-animation-container .cards::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(249, 244, 235, 0);
          z-index: 0;
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
          z-index: 1001;
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
          z-index: 1002;
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
          background-image: url('/card/card1.png');
          background-size: cover;
          background-position: center;
          background-repeat: no-repeat;
        }

        .scroll-animation-container #card-2 .flip-card-front {
          background-image: url('/card/card2.png');
          background-size: cover;
          background-position: center;
          background-repeat: no-repeat;
        }

        .scroll-animation-container #card-3 .flip-card-front {
          background-image: url('/card/card3.png');
          background-size: cover;
          background-position: center;
          background-repeat: no-repeat;
        }

        .scroll-animation-container .flip-card-back {
          padding: 1rem;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          gap: 2rem;
          transform: rotateY(180deg);
          position: relative;
        }

        .scroll-animation-container .flip-card-back::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.6);
          z-index: 1;
        }

        .scroll-animation-container #card-1 .flip-card-back {
          background-image: url('/card/card1.png');
          background-size: cover;
          background-position: center;
          background-repeat: no-repeat;
        }

        .scroll-animation-container #card-2 .flip-card-back {
          background-image: url('/card/card2.png');
          background-size: cover;
          background-position: center;
          background-repeat: no-repeat;
        }

        .scroll-animation-container #card-3 .flip-card-back {
          background-image: url('/card/card3.png');
          background-size: cover;
          background-position: center;
          background-repeat: no-repeat;
        }

        .scroll-animation-container #card-1 .flip-card-back .card-heading {
          background-color: transparent;
          position: relative;
          z-index: 2;
        }

        .scroll-animation-container #card-2 .flip-card-back .card-heading {
          background-color: transparent;
          position: relative;
          z-index: 2;
        }

        .scroll-animation-container #card-3 .flip-card-back .card-heading {
          background-color: transparent;
          position: relative;
          z-index: 2;
        }

        .scroll-animation-container .card-copy {
          width: 100%;
          height: 100%;
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
          position: relative;
          z-index: 2;
        }

        .scroll-animation-container .card-copy p {
          flex: 1;
          display: flex;
          justify-content: center;
          align-items: center;
          font-size: 1.25rem;
          border-radius: 0.25rem;
          color: white;
          font-weight: 500;
        }

        .scroll-animation-container #card-1 .flip-card-back .card-copy p {
          background-color: transparent;
        }

        .scroll-animation-container #card-2 .flip-card-back .card-copy p {
          background-color: transparent;
        }

        .scroll-animation-container #card-3 .flip-card-back .card-copy p {
          background-color: transparent;
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
          z-index: 1000;
        }

        .scroll-animation-container .mobile-cards {
          display: none;
          position: relative;
          z-index: 2;
        }

        @media (max-width: 1000px) {
          .scroll-animation-container .hero-header h1 {
            font-size: 2.5rem;
            padding: 0 2rem;
          }

          .scroll-animation-container .hero-cards {
            width: calc(100% - 1rem);
          }

          .scroll-animation-container .about-content h1 {
            font-size: 2rem;
          }

          .scroll-animation-container .about-content {
            flex-direction: column;
            gap: 3rem;
            text-align: center;
            padding: 2rem;
          }

          .scroll-animation-container .about-text {
            text-align: center;
            min-width: auto;
          }

          .scroll-animation-container .about-content h1 {
            font-size: 2.5rem;
          }

          .scroll-animation-container .about-content p {
            font-size: 1.3rem;
          }

          .scroll-animation-container .about-video {
            min-width: auto;
          }

                                                                                                                                                                                                                                                                                                                                                               .scroll-animation-container .circle-video-container {
               max-width: 600px;
               margin: 0 auto;
               min-height: 500px;
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

          .scroll-animation-container .mobile-cards .card {
            margin-bottom: 2rem;
            background-color: white;
            border-radius: 1rem;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
          }

          .scroll-animation-container .mobile-cards .cards-container .card-wrapper {
            animation: none;
          }

                  .scroll-animation-container .mobile-cards .card .flip-card-front {
          transform: rotateY(180deg);
          background-color: white;
        }

        .scroll-animation-container #mobile-card-1 .flip-card-front {
          background-image: url('/card/card1.png');
          background-size: cover;
          background-position: center;
          background-repeat: no-repeat;
        }

        .scroll-animation-container #mobile-card-2 .flip-card-front {
          background-image: url('/card/card2.png');
          background-size: cover;
          background-position: center;
          background-repeat: no-repeat;
        }

        .scroll-animation-container #mobile-card-3 .flip-card-front {
          background-image: url('/card/card3.png');
          background-size: cover;
          background-position: center;
          background-repeat: no-repeat;
        }

                  .scroll-animation-container .mobile-cards .flip-card-back {
          transform: rotateY(0deg);
          background-color: white;
        }

        .scroll-animation-container #mobile-card-1 .flip-card-back {
          background-image: url('/card/card1.png');
          background-size: cover;
          background-position: center;
          background-repeat: no-repeat;
        }

        .scroll-animation-container #mobile-card-2 .flip-card-back {
          background-image: url('/card/card2.png');
          background-size: cover;
          background-position: center;
          background-repeat: no-repeat;
        }

        .scroll-animation-container #mobile-card-3 .flip-card-back {
          background-image: url('/card/card3.png');
          background-size: cover;
          background-position: center;
          background-repeat: no-repeat;
        }
        }
      `}</style>

      <nav>
        <div className="logo"><span>Indigo Network</span></div>
        <div className="menu-btn"><span>Menu</span></div>
      </nav>

      <section className="hero">
        <div className="hero-background">
          <img 
            src="/card/page1.png" 
            alt="Network Solutions Background" 
            className="hero-bg-image"
          />
        </div>
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
          <div className="about-text">
            <h1>Indigo Overview</h1>
            <p className="mt-4 max-w-2xl text-gray-200">
              Find out how Indigo designs, deploys and supports digital infrastructure enhancing network performance now and into the future.
            </p>
            <div className="about-features">
              <div className="feature">
                <span>Explore Services</span>
              </div>
            </div>
          </div>
                                           <div className="about-video">
              <div className="circle-video-container">
                <video
                  src="/card/circle-video.mp4"
                  autoPlay
                  loop
                  muted
                  playsInline
                  preload="auto"
                  className="circle-video"
                >
                  <source src="/card/circle-video.mp4" type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </div>
            </div>
        </div>
      </section>

      <section className="services">
        <div className="services-background">
          <img 
            src="/card/page2.png" 
            alt="Services Background" 
            className="services-bg-image"
          />
        </div>
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
                      <p>Testing</p>
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
                    <p>Testing</p>
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

      {/* <section className="outro">
        <div className="outro-header">
          <h1>Global team ensuring high-performance connectivity</h1>
        </div>
      </section> */}
    </div>
  );
};

export default ScrollAnimation;
