// src/components/ConnectedSolutions.tsx
import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import useTilt from "../hooks/useTilt";
import { orbitron } from "../fonts";

gsap.registerPlugin(ScrollTrigger);

type Card = {
  key: string;
  title: string;
  description: string;
  imageSrc: string;
};

const cards: Card[] = [
  {
    key: "fixed",
    title: "Fixed Line",
    description: "Expert end-to-end connections from pre-planning to upgrades",
    imageSrc: "/home/sol-1.jpg",
  },
  {
    key: "subsea",
    title: "Subsea",
    description: "System operator support for modern submarine networks",
    imageSrc: "/home/sol-2.png",
  },
  {
    key: "data",
    title: "Data Centres",
    description: "Comprehensive solutions for leading edge and legacy infrastructure",
    imageSrc: "/home/sol-3.jpg",
  },
  {
    key: "wireless",
    title: "Wireless",
    description: "Resilient and reliable wireless services for next-generation networks",
    imageSrc: "/home/sol-4.jpg",
  },
];

// Basic hover scale handled via CSS

export default function ConnectedSolutions() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const bgRef = useRef<SVGSVGElement | null>(null);
  // no external animation refs required

  useEffect(() => {
    if (!bgRef.current) return;
    const dots = bgRef.current.querySelectorAll(".dot");

    // Simple infinite horizontal movement via GSAP timeline
    const tl = gsap.timeline({ repeat: -1 });
    dots.forEach((dot, i) => {
      tl.to(dot, { x: 300 + (i % 3) * 60, duration: 6 + (i % 3) * 1.2, ease: "none" }, i * 0.2);
      tl.set(dot, { x: -300 }, "+=0"); // jump back to start
    });

    // ScrollTrigger: speed up background lines on scroll
    ScrollTrigger.create({
      trigger: sectionRef.current,
      start: "top center",
      onEnter: () => gsap.to(tl, { timeScale: 1.1, duration: 0.6 }),
      onLeaveBack: () => gsap.to(tl, { timeScale: 0.8, duration: 0.6 }),
      onEnterBack: () => gsap.to(tl, { timeScale: 1, duration: 0.6 }),
    });

    return () => {
      tl.kill();
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  // no-op
  const attachLottieRef = () => {};

  return (
    <section ref={sectionRef} className="relative overflow-hidden py-20 px-6 lg:px-24 bg-gradient-to-b from-slate-900 via-slate-950 to-[#050816]">
      {/* Headline */}
      <div className="max-w-6xl mx-auto text-center mb-10">
        <h2 className={`${orbitron.className} text-4xl md:text-5xl font-extrabold leading-tight text-white`}>
          Advanced solutions for a connected future
        </h2>
        <p className="mt-4 max-w-2xl mx-auto text-slate-300">
          Live data-driven solutions — modern UI with subtle motion to show connectivity, throughput and reliability.
        </p>
      </div>

      {/* Animated background SVG with data lines */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <svg ref={bgRef} className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 1600 600" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="lineGrad" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#00f0ff" stopOpacity="0.12" />
              <stop offset="50%" stopColor="#b388ff" stopOpacity="0.08" />
              <stop offset="100%" stopColor="#ff6ec7" stopOpacity="0.06" />
            </linearGradient>
            <filter id="glow">
              <feGaussianBlur stdDeviation="6" result="coloredBlur" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Curved data lines */}
          <g stroke="url(#lineGrad)" strokeWidth="1.5" fill="none" filter="url(#glow)">
            <path d="M-200 120 C 200 80, 600 100, 1000 80 C 1400 60, 1800 120, 2200 80" />
            <path d="M-200 260 C 200 300, 600 240, 1000 260 C 1400 280, 1800 220, 2200 260" />
            <path d="M-200 420 C 200 380, 600 420, 1000 400 C 1400 380, 1800 420, 2200 400" />
          </g>

          {/* Moving dots along lines (we'll animate their x via GSAP) */}
          <g fill="#00f0ff" opacity="0.9">
            <circle className="dot" cx="-300" cy="120" r="3.5" />
            <circle className="dot" cx="-500" cy="260" r="3" />
            <circle className="dot" cx="-400" cy="420" r="3.2" />
            <circle className="dot" cx="-600" cy="120" r="2.6" />
            <circle className="dot" cx="-480" cy="260" r="2.4" />
          </g>
        </svg>
      </div>

      {/* Cards */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {cards.map((c) => (
          <CardItem
            key={c.key}
            card={c}
            onMount={() => attachLottieRef()}
          />
        ))}
      </div>
    </section>
  );
}

/* --- Subcomponent: CardItem --- */

function CardItem({ card, onMount }: { card: Card; onMount?: (inst: any) => void }) {
  const tiltRef = useTilt<HTMLDivElement>();

  useEffect(() => {
    if (onMount) onMount(null);
  }, [onMount]);

  return (
    <div className="relative">
      <div ref={tiltRef} className="group transition-transform duration-300 [perspective:1200px]">
        {/* Flip Container */}
        <div className="relative h-full w-full [transform-style:preserve-3d] transition-transform duration-500 group-hover:[transform:rotateY(180deg)]" style={{ minHeight: 300 }}>
          {/* Front Face */}
          <div className="absolute inset-0 [backface-visibility:hidden]">
            <div className="bg-[rgba(255,255,255,0.03)] backdrop-blur-md border border-[rgba(255,255,255,0.06)] rounded-2xl p-6 h-full flex flex-col items-center text-center hover:shadow-[0_8px_30px_rgba(79,70,229,0.08)]">
              <div className="flex items-center justify-center w-20 h-20 mb-4">
                <Icon type={card.key} />
              </div>
              <h3 className="text-2xl font-semibold text-white/90 mb-2">{card.title}</h3>
              <p className="text-sm text-slate-300/90 mt-2">{card.description}</p>
              <div className="mt-auto pt-6 w-full">
                <div className="h-[1px] bg-gradient-to-r from-transparent via-white/6 to-transparent mb-4" />
                <div className="text-xs text-slate-400">Learn more →</div>
              </div>
            </div>
          </div>

          {/* Back Face */}
          <div className="absolute inset-0 [backface-visibility:hidden] [transform:rotateY(180deg)] rounded-2xl overflow-hidden border-2 border-white/40">
            <img
              src={card.imageSrc}
              alt={card.title}
              className="w-full h-full object-cover"
              onError={(e) => {
                const img = e.currentTarget as HTMLImageElement;
                if (!img.dataset.fallback) {
                  img.dataset.fallback = '1';
                  img.src = img.src.replace('.png', '.jpg');
                }
              }}
            />
            <div className="absolute inset-0 bg-black/20" />
          </div>
        </div>
        {/* Border on hover */}
        <div className="absolute inset-0 rounded-2xl pointer-events-none">
          <div className="w-full h-full rounded-2xl border border-transparent group-hover:border-white/20 transition-all duration-300"></div>
        </div>
      </div>
    </div>
  );
}

/* --- Inline SVG Icons --- */
function Icon({ type }: { type: string }) {
  const common = "w-16 h-16 text-cyan-300";
  switch (type) {
    case "fixed":
      return (
        <svg viewBox="0 0 24 24" className={common} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M3 8h6v8H3z" />
          <path d="M9 12h6" />
          <path d="M15 8h6v8h-6z" />
        </svg>
      );
    case "subsea":
      return (
        <svg viewBox="0 0 24 24" className={common} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M2 15c2 0 2-2 4-2s2 2 4 2 2-2 4-2 2 2 4 2 2-2 4-2" />
          <path d="M2 19c2 0 2-2 4-2s2 2 4 2 2-2 4-2 2 2 4 2 2-2 4-2" />
        </svg>
      );
    case "data":
      return (
        <svg viewBox="0 0 24 24" className={common} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <ellipse cx="12" cy="5" rx="8" ry="3" />
          <path d="M4 5v6c0 1.7 3.6 3 8 3s8-1.3 8-3V5" />
          <path d="M4 11v6c0 1.7 3.6 3 8 3s8-1.3 8-3v-6" />
        </svg>
      );
    case "wireless":
    default:
      return (
        <svg viewBox="0 0 24 24" className={common} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M2 9a15 15 0 0 1 20 0" />
          <path d="M5 12a10 10 0 0 1 14 0" />
          <path d="M8 15a5 5 0 0 1 8 0" />
          <circle cx="12" cy="19" r="1.5" fill="currentColor" stroke="none" />
        </svg>
      );
  }
}
