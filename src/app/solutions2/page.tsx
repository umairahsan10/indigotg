'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import Lenis from "lenis";

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
  const [showNav, setShowNav] = useState(false);

  useEffect(() => {
    gsap.registerPlugin(SplitText, ScrollTrigger);

    const lenis = new Lenis();
    lenis.on("scroll", ScrollTrigger.update);
    gsap.ticker.add((time) => lenis.raf(time * 1000));
    gsap.ticker.lagSmoothing(0);

    const cards = gsap.utils.toArray(".card") as HTMLElement[];
    const introCard = cards[0];

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
    gsap.set(cardImgWrapper, { scale: 0.5, borderRadius: "400px" });
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
        }
        if (progress < 1 && (introCard as any).contentRevealed) {
          (introCard as any).contentRevealed = false;
          animateContentOut(titleChars, description);
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
              opacity: 1 - progress,
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
            gsap.set(imgContainer, { borderRadius: 150 - progress * 125 + "px" });
          },
        });
      }
    });

    cards.forEach((card, index) => {
      if (index === 0) return;

      const cardDescription = card.querySelector(".card-description") as HTMLElement;
      const cardTitleChars = card.querySelectorAll(".char span");

      ScrollTrigger.create({
        trigger: card as HTMLElement,
        start: "top top",
        onEnter: () => animateContentIn(cardTitleChars, cardDescription),
        onLeaveBack: () => animateContentOut(cardTitleChars, cardDescription),
      });
    });

    setupMarqueeAnimation();

    return () => {
      lenis.destroy();
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <>
      <style jsx global>{`
        /* Override main layout styles for this page */
        body {
          font-family: "Inter", sans-serif;
          margin: 0;
          padding: 0;
        }

        /* Hide navigation for full-screen experience */
        nav {
          display: ${showNav ? 'block' : 'none'};
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
          font-weight: 500;
          letter-spacing: -0.1rem;
          line-height: 1.25;
        }

        p {
          font-size: 1.125rem;
          font-weight: 400;
          line-height: 1.25;
        }

        section {
          position: relative;
          width: 100vw;
          background-color: #0f0f0f;
          color: #fff;
        }

        .intro,
        .outro {
          height: 100svh;
          padding: 1.5em;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .intro h1,
        .outro h1 {
          width: 60%;
          text-align: center;
          line-height: 1.1;
        }

        .cards {
          position: relative;
          display: flex;
          flex-direction: column;
          gap: 25svh;
        }

        .card-marquee {
          width: 100%;
          position: absolute;
          top: 50%;
          left: 0;
          transform: translateY(-50%);
          overflow: hidden;
        }

        .card-marquee .marquee {
          display: flex;
        }

        .card-marquee .marquee h1 {
          white-space: nowrap;
          font-size: 10vw;
          font-weight: 600;
          margin-right: 30px;
        }

        .card {
          position: relative;
          width: 100vw;
          height: 100svh;
          padding: 1.5em;
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

        .card-img img {
          transform: scale(2);
        }

        .card-content {
          position: absolute;
          width: 100%;
          height: 100%;
          display: flex;
          align-items: flex-end;
          justify-content: center;
          z-index: 1;
        }

        .card-content .card-title {
          width: 100%;
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          text-align: center;
        }

        .card-content .card-description {
          text-align: center;
          width: 40%;
          margin-bottom: 3em;
          position: relative;
          transform: translateX(40px);
          opacity: 0;
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
          }

          .card-content .card-description {
            width: 90%;
          }
        }
      `}</style>

      <main>
        {/* Navigation toggle button */}
        <button 
          onClick={() => setShowNav(!showNav)}
          className="fixed top-4 right-4 z-50 bg-white/10 backdrop-blur-sm text-white px-4 py-2 rounded-lg border border-white/20 hover:bg-white/20 transition-all"
        >
          {showNav ? 'Hide Nav' : 'Show Nav'}
        </button>
        
        <section className="intro">
          <h1>We design spaces that don't just exist.</h1>
        </section>
        
        <section className="cards">
          <div className="card">
            <div className="card-marquee">
              <div className="marquee">
                <h1>Design Beyond Boundaries</h1>
                <h1>Built for Tomorrow</h1>
                <h1>Real Impact</h1>
                <h1>Digital Visions</h1>
              </div>
            </div>
            <div className="card-wrapper">
              <div className="card-content">
                <div className="card-title">
                  <h1>Curved Horizon</h1>
                </div>
                <div className="card-description">
                  <p>
                    A futuristic residence that plays with curvature and flow,
                    blending bold geometry with natural topography.
                  </p>
                </div>
              </div>
              <div className="card-img">
                <Image src="/card-img-1.jpg" alt="Curved Horizon" fill style={{ objectFit: 'cover' }} />
              </div>
            </div>
          </div>

          <div className="card">
            <div className="card-wrapper">
              <div className="card-content">
                <div className="card-title">
                  <h1>Glass Haven</h1>
                </div>
                <div className="card-description">
                  <p>
                    A sleek pavilion of pure transparency, openness and light,
                    designed to dissolve into its environment.
                  </p>
                </div>
              </div>
              <div className="card-img">
                <Image src="/card-img-2.jpg" alt="Glass Haven" fill style={{ objectFit: 'cover' }} />
              </div>
            </div>
          </div>

          <div className="card">
            <div className="card-wrapper">
              <div className="card-content">
                <div className="card-title">
                  <h1>Moss Cube</h1>
                </div>
                <div className="card-description">
                  <p>
                    A minimalist cube home crowned with a living moss dome, merging
                    micro-architecture with ecological design.
                  </p>
                </div>
              </div>
              <div className="card-img">
                <Image src="/card-img-3.jpg" alt="Moss Cube" fill style={{ objectFit: 'cover' }} />
              </div>
            </div>
          </div>

          <div className="card">
            <div className="card-wrapper">
              <div className="card-content">
                <div className="card-title">
                  <h1>Floating Shelter</h1>
                </div>
                <div className="card-description">
                  <p>
                    This design explores an ethereal structure perched on a grassy
                    islet, seemingly hovering above water.
                  </p>
                </div>
              </div>
              <div className="card-img">
                <Image src="/card-img-4.jpg" alt="Floating Shelter" fill style={{ objectFit: 'cover' }} />
              </div>
            </div>
          </div>
        </section>
        
        <section className="outro">
          <h1>Architecture reimagined for the virtual age.</h1>
        </section>
      </main>
    </>
  );
}
