'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";


// Marquee animation function
function setupMarqueeAnimation(): void {
  const marqueeItems = gsap.utils.toArray(".marquee h1") as HTMLElement[];
  if (marqueeItems.length > 0) {
    const tl = horizontalLoop(marqueeItems, {
      repeat: -1,
      paddingRight: 30,
    });
  }
}

interface HorizontalLoopConfig {
  repeat?: number;
  speed?: number;
  paddingRight?: number;
}

function horizontalLoop(items: HTMLElement[], config?: HorizontalLoopConfig): gsap.core.Timeline {
  items = gsap.utils.toArray(items) as HTMLElement[];
  config = config || {};
  let tl = gsap.timeline({
    repeat: config.repeat,
    defaults: { ease: "none" },
  });
  let length = items.length;
  let startX = items[0].offsetLeft;
  let widths: number[] = [];
  let xPercents: number[] = [];
  let pixelsPerSecond = (config.speed || 1) * 100;
  let totalWidth: number, curX: number, distanceToStart: number, distanceToLoop: number, item: HTMLElement, i: number;

  gsap.set(items, {
    xPercent: (i: number, el: Element) => {
      let w = (widths[i] = parseFloat(gsap.getProperty(el, "width", "px") as string));
      xPercents[i] =
        (parseFloat(gsap.getProperty(el, "x", "px") as string) / w) * 100 +
        (gsap.getProperty(el, "xPercent") as number);
      return xPercents[i];
    },
  });

  gsap.set(items, { x: 0 });
  totalWidth =
    items[length - 1].offsetLeft +
    (xPercents[length - 1] / 100) * widths[length - 1] -
    startX +
    items[length - 1].offsetWidth *
      (gsap.getProperty(items[length - 1], "scaleX") as number) +
    (parseFloat(config.paddingRight?.toString() || "0"));

  for (i = 0; i < length; i++) {
    item = items[i] as HTMLElement;
    curX = (xPercents[i] / 100) * widths[i];
    distanceToStart = item.offsetLeft + curX - startX;
    distanceToLoop =
      distanceToStart + widths[i] * (gsap.getProperty(item, "scaleX") as number);
    tl.to(
      item,
      {
        xPercent: ((curX - distanceToLoop) / widths[i]) * 100,
        duration: distanceToLoop / pixelsPerSecond,
      },
      0
    ).fromTo(
      item,
      { xPercent: ((curX - distanceToLoop + totalWidth) / widths[i]) * 100 },
      {
        xPercent: xPercents[i],
        duration: (curX - distanceToLoop + totalWidth - curX) / pixelsPerSecond,
        immediateRender: false,
      },
      distanceToLoop / pixelsPerSecond
    );
  }

  tl.progress(1, true).progress(0, true);
  return tl;
}

// Main component
export default function Solutions2() {

  useEffect(() => {
    gsap.registerPlugin(SplitText, ScrollTrigger);

    // Lenis instance is managed globally in Navigation component

    const cards = gsap.utils.toArray(".card") as HTMLElement[];
    const introCard = cards[0];

    // Set initial opacity for all cards
    cards.forEach((card, index) => {
      if (index > 0) {
        const cardImg = card.querySelector(".card-img") as HTMLElement;
        gsap.set(cardImg, { opacity: 0 });
      }
    });

    const titles = gsap.utils.toArray(".card-title h1");
    titles.forEach((title) => {
      const split = new SplitText(title as HTMLElement, {
        type: "chars",
        charsClass: "char",
        tag: "div",
      });
      split.chars.forEach((char) => {
        char.innerHTML = `<span>${char.textContent}</span>`;
      });
    });

    const cardImgWrapper = introCard.querySelector(".card-img") as HTMLElement;
    const cardImg = introCard.querySelector(".card-img img") as HTMLImageElement;
    gsap.set(cardImgWrapper, { scale: 0.5, borderRadius: "400px", opacity: 0 });
    gsap.set(cardImg, { scale: 1.5 });

    function animateContentIn(titleChars: NodeListOf<Element>, description: Element) {
      gsap.to(titleChars, { x: "0%", duration: 0.75, ease: "power4.out" });
      gsap.to(description, {
        x: 0,
        opacity: 1,
        duration: 0.75,
        delay: 0.1,
        ease: "power4.out",
      });
    }

    function animateContentOut(titleChars: NodeListOf<Element>, description: Element) {
      gsap.to(titleChars, { x: "100%", duration: 0.5, ease: "power4.out" });
      gsap.to(description, {
        x: "40px",
        opacity: 0,
        duration: 0.5,
        ease: "power4.out",
      });
    }

    const marquee = introCard.querySelector(".card-marquee .marquee") as HTMLElement;
    const titleChars = introCard.querySelectorAll(".char span");
    const description = introCard.querySelector(".card-description") as HTMLElement;
    const button = introCard.querySelector(".card-button") as HTMLElement;

    ScrollTrigger.create({
      trigger: introCard,
      start: "top top",
      end: "+=300vh",
      onUpdate: (self) => {
        const progress = self.progress;
        const imgScale = 0.5 + progress * 0.5;
        const borderRadius = 400 - progress * 375;
        const innerImgScale = 1.5 - progress * 0.5;

        gsap.set(cardImgWrapper, {
          scale: imgScale,
          borderRadius: borderRadius + "px",
          opacity: progress,
        });
        gsap.set(cardImg, { scale: innerImgScale });

        if (imgScale >= 0.5 && imgScale <= 0.75) {
          const fadeProgress = (imgScale - 0.5) / (0.75 - 0.5);
          gsap.set(marquee, { opacity: 1 - fadeProgress });
        } else if (imgScale < 0.5) {
          gsap.set(marquee, { opacity: 1 });
        } else if (imgScale > 0.75) {
          gsap.set(marquee, { opacity: 0 });
        }

        if (progress >= 1 && !(introCard as any).contentRevealed) {
          (introCard as any).contentRevealed = true;
          animateContentIn(titleChars, description);
          // Animate button for intro card when fully revealed
          if (button && button instanceof HTMLElement) {
            gsap.to(button, {
              x: 0,
              opacity: 1,
              duration: 0.75,
              delay: 0.3,
              ease: "power4.out",
            });
          }
        }
        if (progress < 1 && (introCard as any).contentRevealed) {
          (introCard as any).contentRevealed = false;
          animateContentOut(titleChars, description);
          // Hide button for intro card
          if (button && button instanceof HTMLElement) {
            gsap.to(button, {
              x: "40px",
              opacity: 0,
              duration: 0.5,
              ease: "power4.out",
            });
          }
        }
      },
    });

    cards.forEach((card, index) => {
      const isLastCard = index === cards.length - 1;
      ScrollTrigger.create({
        trigger: card as HTMLElement,
        start: "top top",
        end: isLastCard ? "+=100vh" : "top top",
        endTrigger: isLastCard ? null : cards[cards.length - 1] as HTMLElement,
        pin: true,
        pinSpacing: isLastCard,
      });
    });

    cards.forEach((card, index) => {
      if (index < cards.length - 1) {
        const cardWrapper = card.querySelector(".card-wrapper") as HTMLElement;
        ScrollTrigger.create({
          trigger: cards[index + 1] as HTMLElement,
          start: "top bottom",
          end: "top top",
          onUpdate: (self) => {
            const progress = self.progress;
            gsap.set(cardWrapper, {
              scale: 1 - progress * 0.25,
              opacity: 1 - progress * 0.5,
            });
          },
        });
      }
    });

    cards.forEach((card, index) => {
      if (index > 0) {
        const cardImg = card.querySelector(".card-img img") as HTMLImageElement;
        const imgContainer = card.querySelector(".card-img") as HTMLElement;
        ScrollTrigger.create({
          trigger: card as HTMLElement,
          start: "top bottom",
          end: "top top",
          onUpdate: (self) => {
            const progress = self.progress;
            gsap.set(cardImg, { scale: 2 - progress });
            gsap.set(imgContainer, { 
              borderRadius: 150 - progress * 125 + "px",
              opacity: progress 
            });
          },
        });
      }
    });

    cards.forEach((card, index) => {
      if (index === 0) return;

      const cardDescription = card.querySelector(".card-description") as HTMLElement;
      const cardTitleChars = card.querySelectorAll(".char span");
      const cardButton = card.querySelector(".card-button") as HTMLElement;

      // Animate content with proper sequencing
      ScrollTrigger.create({
        trigger: card as HTMLElement,
        start: "top top",
        onEnter: () => {
          // Create a timeline for proper sequencing
          const tl = gsap.timeline();
          
          // First animate title and description
          tl.add(() => animateContentIn(cardTitleChars, cardDescription));
          
          // Then animate button after a delay
          tl.to(cardButton, {
            x: 0,
            opacity: 1,
            duration: 0.75,
            ease: "power4.out",
          }, "+=0.8"); // 0.8 second delay after content animation
        },
        onLeaveBack: () => {
          animateContentOut(cardTitleChars, cardDescription);
          if (cardButton && cardButton instanceof HTMLElement) {
            gsap.to(cardButton, {
              x: "40px",
              opacity: 0,
              duration: 0.5,
              ease: "power4.out",
            });
          }
        },
      });
    });

    setupMarqueeAnimation();

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <>
      <style jsx global>{`
        /* Override main layout styles for this page */
        html, body {
          overflow-x: hidden;
        }
        body {
          font-family: "Roboto", "Segoe UI", "Helvetica Neue", Arial, sans-serif;
          margin: 0;
          padding: 0;
        }

        /* Navigation is now visible */
        nav {
          display: block;
        }

        img {
          position: relative;
          width: 100%;
          height: 100%;
          object-fit: cover;
          will-change: transform;
        }

        h1 {
          font-size: 5rem;
          font-weight: 600;
          letter-spacing: -0.02rem;
          line-height: 1.2;
          font-family: "Roboto", "Segoe UI", "Helvetica Neue", Arial, sans-serif;
        }

        p {
          font-size: 1.125rem;
          font-weight: 400;
          line-height: 1.6;
          font-family: "Roboto", "Segoe UI", "Helvetica Neue", Arial, sans-serif;
        }

        section {
          position: relative;
          width: 100%;
          max-width: 100%;
          background-color: #ffffff;
          color: #1e3a8a;
        }

        .intro,
        .outro {
          height: 100svh;
          padding: 1.5em;
          display: flex;
          justify-content: center;
          align-items: center;
          position: relative;
          overflow: hidden;
        }

        .outro {
          background: linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url('/back.jpg');
          background-size: cover;
          background-position: center;
          background-attachment: fixed;
        }

        .outro-container {
          position: relative;
          z-index: 2;
          width: 100%;
          max-width: 900px;
        }

        .outro-content {
          background:rgba(63, 75, 88, 0.62);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(1, 43, 88, 0.62);;
          border-radius: 150px;
          padding: 3rem 2rem;
          text-align: center;
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);  
        }

        .outro h1 {
          color:#ffffff;
          font-size: 2.5rem;
          font-weight: 600;
          margin-bottom: 1.5rem;
          line-height: 1.2;
        }

        .outro p {
          color:#ffffff;
          font-size: 1.1rem;
          line-height: 1.6;
          margin-bottom: 2rem;
          max-width: 500px;
          margin-left: auto;
          margin-right: auto;
        }

        .contact-button {
          background: rgba(30, 58, 138, 0.9);
          border: 1px solid rgba(30, 58, 138, 0.3);
          color: #ffffff;
          padding: 12px 32px;
          font-size: 1rem;
          font-weight: 600;
          border-radius: 8px;
          cursor: pointer;
          transition: all 0.3s ease;
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          backdrop-filter: blur(10px);
          font-family: "Roboto", "Segoe UI", "Helvetica Neue", Arial, sans-serif;
        }

        .contact-button:hover {
          background: rgba(30, 58, 138, 1);
          border-color: rgba(30, 58, 138, 0.5);
          transform: translateY(-2px);
        }

        .contact-button svg {
          transition: transform 0.3s ease;
        }

        .contact-button:hover svg {
          transform: translateX(4px);
        }

        .intro {
          background: linear-gradient(rgba(15, 15, 15, 0.7), rgba(15, 15, 15, 0.7)), url('/indigotg.jpg');
          background-size: cover;
          background-position: center;
          background-attachment: fixed;
        }

        .container-md {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 2rem;
          z-index: 2;
        }

        .hero-content {
          text-align: center;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          min-height: 100vh;
        }

        .section-title {
          font-size: 1.1rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.15em;
          color: #a0a0a0;
          margin-bottom: 1rem;
          opacity: 0;
          font-family: "Roboto", "Segoe UI", "Helvetica Neue", Arial, sans-serif;
          animation: sectionTitleAppear 1s ease-out 0.2s forwards;
          text-shadow: 0 0 10px rgba(160, 160, 160, 0.3);
          transition: all 0.3s ease;
        }

        .section-title:hover {
          text-shadow: 0 0 20px rgba(160, 160, 160, 0.5);
          transform: translateY(-1px);
        }

        @keyframes sectionTitleAppear {
          0% {
            opacity: 0;
            transform: translateY(15px);
          }
          100% {
            opacity: 0.8;
            transform: translateY(0);
          }
        }

        .intro h1,
        .outro h1 {
          width: 100%;
          text-align: center;
          line-height: 1.2;
          margin-bottom: 2.5rem;
          font-size: 4.5rem;
        }

        .intro h1 {
          opacity: 0;
          transform: translateY(30px);
          animation: introTextAppear 1.2s ease-out 0.5s forwards;
          text-shadow: 0 0 20px rgba(255, 255, 255, 0.3);
          transition: all 0.3s ease;
        }

        .intro h1:hover {
          text-shadow: 0 0 30px rgba(255, 255, 255, 0.5);
          transform: translateY(-2px);
        }

        @keyframes introTextAppear {
          0% {
            opacity: 0;
            transform: translateY(30px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .description-block {
          max-width: 900px;
          margin: 0 auto;
        }

        .intro p {
          font-size: 1.4rem;
          line-height: 1.7;
          color: #e0e0e0;
          margin: 0;
          opacity: 0;
          text-align: center;
          animation: introParagraphAppear 1.2s ease-out 1s forwards;
          text-shadow: 0 0 15px rgba(224, 224, 224, 0.2);
          transition: all 0.3s ease;
        }

        .intro p:hover {
          text-shadow: 0 0 25px rgba(224, 224, 224, 0.4);
          transform: translateY(-1px);
        }

        @keyframes introParagraphAppear {
          0% {
            opacity: 0;
            transform: translateY(20px);
          }
          100% {
            opacity: 0.9;
            transform: translateY(0);
          }
        }

        .cards {
          position: relative;
          display: flex;
          flex-direction: column;
          gap: 25svh;
          background-color: #f8fafc;
          overflow-x: hidden;
        }

        .card-marquee {
          width: 100%;
          height: 100vh;
          position: absolute;
          top: 0;
          left: 0;
          overflow: hidden;
          background: url('/back.jpg');
          background-size: cover;
          background-position: center;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .card-marquee::before {
          content: '';
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 120%;
          height: 180px;
          background: rgba(255, 255, 255, 0.1);
          border: 2px solid rgba(255, 255, 255, 0.3);
          border-radius: 20px;
          backdrop-filter: blur(20px);
          z-index: -1;
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
        }

        .card-marquee .marquee {
          display: flex;
        }

        .card-marquee .marquee h1 {
          white-space: nowrap;
          font-size: 8vw;
          font-weight: 700;
          margin-right: 30px;
          font-family: "Roboto", "Segoe UI", "Helvetica Neue", Arial, sans-serif;
          text-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
          position: relative;
          z-index: 1;
          line-height: 1.1;
        }

        .card {
          position: relative;
          width: 100%;
          max-width: 100%;
          height: 100svh;
          padding: 1.5em;
          background-color: #ffffff;
          overflow: hidden;
        }

        .card-wrapper {
          position: relative;
          width: 100%;
          height: 100%;
          will-change: transform;
        }

        .card-img {
          position: absolute;
          width: 100%;
          height: 100%;
          border-radius: 150px;
          overflow: hidden;
        }

        .card-img::after {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(255, 255, 255, 0.1);
          z-index: 1;
        }

        .card-img img {
          transform: scale(2);
        }

        .card-content {
          position: absolute;
          width: 100%;
          height: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          z-index: 2;
        }

        .card-content .card-title {
          width: 100%;
          text-align: center;
          margin-bottom: 2rem;
        }

        .card-content .card-title h1 {
          color: #ffffff;
          font-weight: 700;
          text-shadow: 0 2px 15px rgba(0, 0, 0, 0.5);
          letter-spacing: -0.02em;
        }

        .card-content .card-description {
          text-align: center;
          width: 40%;
          margin-bottom: 2rem;
          transform: translateX(40px);
          opacity: 0;
        }

        .card-content .card-description p {
          color: #ffffff;
          font-weight: 500;
          text-shadow: 0 1px 8px rgba(0, 0, 0, 0.4);
          line-height: 1.7;
        }

        .card-button {
          text-align: center;
          transform: translateX(40px);
          opacity: 0;
          z-index: 10;
          position: relative;
          pointer-events: auto;
        }

        /* Fallback to ensure button is visible */
        .card-content:hover .card-button {
          opacity: 1;
          transform: translateX(0);
        }

        .card-button button {
          background: rgba(30, 58, 138, 0.9);
          border: 2px solid rgba(30, 58, 138, 0.3);
          color: #ffffff;
          padding: 14px 36px;
          font-size: 1.1rem;
          font-weight: 600;
          border-radius: 12px;
          cursor: pointer;
          transition: all 0.3s ease;
          backdrop-filter: blur(15px);
          text-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
          font-family: "Roboto", "Segoe UI", "Helvetica Neue", Arial, sans-serif;
        }

        .card-button button:hover {
          background: rgba(30, 58, 138, 1);
          border-color: rgba(30, 58, 138, 0.5);
          transform: translateY(-3px);
          box-shadow: 0 8px 25px rgba(0, 0, 0, 0.3);
        }

        .card:nth-child(2) {
          margin-top: 50vh;
        }

        .char {
          position: relative;
          overflow: hidden;
          display: inline-block;
        }

        .char span {
          transform: translateX(100%);
          display: inline-block;
          will-change: transform;
        }

        @media (max-width: 900px) {
          h1 {
            font-size: 2rem;
            letter-spacing: 0;
          }

          .intro h1,
          .outro h1 {
            width: 100%;
            font-size: 2.5rem;
            margin-bottom: 2rem;
          }

          .container-md {
            padding: 0 1rem;
          }

          .section-title {
            font-size: 1rem;
            margin-bottom: 0.8rem;
          }

          .intro p {
            font-size: 1.1rem;
            padding: 0;
            text-align: center;
            max-width: 100%;
          }

          .card-content .card-description {
            width: 90%;
          }

          .card-content .card-title {
            margin-bottom: 1.5rem;
          }

          .outro h1 {
            font-size: 2rem;
            margin-bottom: 1rem;
          }

          .outro p {
            font-size: 1rem;
            margin-bottom: 1.5rem;
          }

          .outro-content {
            padding: 2rem 1.5rem;
            margin: 0 1rem;
          }

          .contact-button {
            padding: 0.875rem 1.5rem;
            font-size: 1rem;
          }
        }
      `}</style>

      <main>
        
                <section className="intro">
          <div className="container-md">
            <div className="hero-content text-white">
              <span className="section-title">Digital Infrastructure Solutions</span>
              <h1>Enabling and maintaining connectivity</h1>
              <div className="description-block">
                <p>
                  With 25 years of expertise in fixed line, subsea, data centre, and wireless networks, our versatile team adds value to projects at any stage. Proficient in both cutting-edge technologies like 5G and legacy infrastructure, we solve complex issues across various environments—greenfield, hyperscale, Edge data centres, upgrades, or hybrid setups. Our 24x7x365 NOC Services ensure minimal downtime.
                </p>
              </div>
            </div>
          </div>
        </section>
        
        <section className="cards">
          <div className="card">
            <div className="card-marquee">
              <div className="marquee text-white">
                <h1>Design Beyond Boundaries</h1>
                <h1>Built for Tomorrow</h1>
                <h1>Real Impact</h1>
                <h1>Digital Visions</h1>
              </div>
            </div>
            <div className="card-wrapper">
              <div className="card-content">
                <div className="card-title">
                  <h1>Fixed Line</h1>
                </div>
                <div className="card-description">
                  <p>
                    Enabling and maintaining the digital backbone of the country.
                  </p>
                </div>
                <div className="card-button">
                  <button>Explore</button>
                </div>
              </div>
              <div className="card-img">
                <Image src="/card-images-1.jpg" alt="Curved Horizon" fill style={{ objectFit: 'cover' }} />
              </div>
            </div>
          </div>

          <div className="card">
            <div className="card-wrapper">
              <div className="card-content">
                <div className="card-title">
                  <h1>Subsea</h1>
                </div>
                <div className="card-description">
                  <p>
                    Systems Operator support for submarine cables
                  </p>
                </div>
                <div className="card-button">
                  <button>Explore</button>
                </div>
              </div>
              <div className="card-img">
                <Image src="/card-images-2.jpg" alt="Glass Haven" fill style={{ objectFit: 'cover' }} />
              </div>
            </div>
          </div>

          <div className="card">
            <div className="card-wrapper">
              <div className="card-content">
                <div className="card-title">
                  <h1>Data Centres</h1>
                </div>
                <div className="card-description">
                  <p>
                    From repairs to resilience, keeping operations uninterrupted
                  </p>
                </div>
                <div className="card-button">
                  <button>Explore</button>
                </div>
              </div>
              <div className="card-img">
                <Image src="/card-images-3.jpg" alt="Moss Cube" fill style={{ objectFit: 'cover' }} />
              </div>
            </div>
          </div>

          <div className="card">
            <div className="card-wrapper">
              <div className="card-content">
                <div className="card-title">
                  <h1>Wireless</h1>
                </div>
                <div className="card-description">
                  <p>
                    New networks, upgrades, and network sharing solutions
                  </p>
                </div>
                <div className="card-button">
                  <button>Explore</button>
                </div>
              </div>
              <div className="card-img">
                <Image src="/card-images-4.jpg" alt="Floating Shelter" fill style={{ objectFit: 'cover' }} />
              </div>
            </div>
          </div>

          <div className="card">
            <div className="card-wrapper">
              <div className="card-content">
                <div className="card-title">
                  <h1>NOC Support</h1>
                </div>
                <div className="card-description">
                  <p>
                    Minimize outage times and keep society collaborating 24x7x365
                  </p>
                </div>
                <div className="card-button">
                  <button>Explore</button>
                </div>
              </div>
              <div className="card-img">
                <Image src="/card-images-5.jpg" alt="Floating Shelter" fill style={{ objectFit: 'cover' }} />
              </div>
            </div>
          </div>
        </section>
        
        <section className="outro">
          <div className="outro-container">
            <div className="outro-content">
              <h1>Want to know more?</h1>
              <p>
                If you want to know more about how we can design, deploy and support your network and infrastructure, get in touch.
              </p>
              <button className="contact-button">
                Contact us
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M8 1L15 8L8 15M15 8H1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
