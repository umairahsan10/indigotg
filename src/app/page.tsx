"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";

type LenisWithDestroy = {
  destroy?: () => void;
};

export default function Home() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const headerRef = useRef<HTMLDivElement | null>(null);
  const heroImgRef = useRef<HTMLDivElement | null>(null);
  const heroSectionRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const lenis = new Lenis();
    lenis.on("scroll", ScrollTrigger.update);
    const tickerFn = (time: number) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(tickerFn);
    gsap.ticker.lagSmoothing(0);

    const canvas = canvasRef.current!;
    const context = canvas.getContext("2d");
    const heroSection = heroSectionRef.current!;
    const header = headerRef.current!;
    const heroImg = heroImgRef.current!;

    if (!context) return;

    const setCanvasSize = () => {
      const pixelRatio = window.devicePixelRatio || 1;
      canvas.width = Math.floor(window.innerWidth * pixelRatio);
      canvas.height = Math.floor(window.innerHeight * pixelRatio);
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      context.setTransform(1, 0, 0, 1, 0, 0);
      context.scale(pixelRatio, pixelRatio);
    };
    setCanvasSize();

    const frameCount = 202; // user confirmed up to 0202
    const currentFrame = (index: number) =>
      `/frames/frame_${(index + 1).toString().padStart(4, "0")}.png`;

    const images: HTMLImageElement[] = [];
    const videoFrames = { frame: 0 } as { frame: number };
    let imagesToLoad = frameCount;

    const onLoad = () => {
      imagesToLoad--;
      if (!imagesToLoad) {
        render();
        setupScrollTrigger();
      }
    };

    for (let i = 0; i < frameCount; i++) {
      const img = new Image();
      img.onload = onLoad;
      img.onerror = onLoad; // proceed even if a frame is missing
      img.src = currentFrame(i);
      images.push(img);
    }

    const render = () => {
      const canvasWidth = window.innerWidth;
      const canvasHeight = window.innerHeight;

      context.clearRect(0, 0, canvasWidth, canvasHeight);

      const img = images[videoFrames.frame];
      if (img && img.complete && img.naturalWidth > 0) {
        const imageAspect = img.naturalWidth / img.naturalHeight;
        const canvasAspect = canvasWidth / canvasHeight;

        let drawWidth: number, drawHeight: number, drawX: number, drawY: number;

        if (imageAspect > canvasAspect) {
          drawHeight = canvasHeight;
          drawWidth = drawHeight * imageAspect;
          drawX = (canvasWidth - drawWidth) / 2;
          drawY = 0;
        } else {
          drawWidth = canvasWidth;
          drawHeight = drawWidth / imageAspect;
          drawX = 0;
          drawY = (canvasHeight - drawHeight) / 2;
        }

        context.drawImage(img, drawX, drawY, drawWidth, drawHeight);
      }
    };

    let st: ScrollTrigger | null = null;
    const setupScrollTrigger = () => {
      st = ScrollTrigger.create({
        trigger: heroSection,
        start: "top top",
        end: `+=${window.innerHeight * 7}px`,
        pin: true,
        pinSpacing: true,
        scrub: 1,
        onUpdate: (self) => {
          const progress = self.progress;

          const animationProgress = Math.min(progress / 0.9, 1);
          const targetFrame = Math.round(animationProgress * (frameCount - 1));
          videoFrames.frame = targetFrame;
          render();

          // Try to fade any global nav if present
          const navEl = document.querySelector("nav");
          if (navEl) {
            if (progress <= 0.1) {
              const navProgress = progress / 0.1;
              const opacity = 1 - navProgress;
              gsap.set(navEl, { opacity });
            } else {
              gsap.set(navEl, { opacity: 0 });
            }
          }

          if (progress <= 0.25) {
            const zProgress = progress / 0.25;
            const translateZ = zProgress * -500;

            let opacity = 1;
            if (progress >= 0.2) {
              const fadeProgress = Math.min((progress - 0.2) / (0.25 - 0.2), 1);
              opacity = 1 - fadeProgress;
            }

            gsap.set(header, {
              transform: `translate(-50%, -50%) translateZ(${translateZ}px)`,
              opacity,
            });
          } else {
            gsap.set(header, { opacity: 0 });
          }

          if (progress < 0.6) {
            gsap.set(heroImg, {
              transform: "translateZ(1000px)",
              opacity: 0,
            });
          } else if (progress >= 0.6 && progress <= 0.9) {
            const imgProgress = (progress - 0.6) / (0.9 - 0.6);
            const translateZ = 1000 - imgProgress * 1000;

            let opacity = 0;
            if (progress <= 0.8) {
              const opacityProgress = (progress - 0.6) / (0.8 - 0.6);
              opacity = opacityProgress;
            } else {
              opacity = 1;
            }

            gsap.set(heroImg, {
              transform: `translateZ(${translateZ}px)`,
              opacity,
            });
          } else {
            gsap.set(heroImg, {
              transform: "translateZ(0px)",
              opacity: 1,
            });
          }
        },
      });
    };

    const handleResize = () => {
      setCanvasSize();
      render();
      ScrollTrigger.refresh();
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      if (st) st.kill();
      gsap.ticker.remove(tickerFn);
      const lenisMaybe = lenis as unknown as LenisWithDestroy;
      if (lenisMaybe && typeof lenisMaybe.destroy === "function") {
        lenisMaybe.destroy();
      }
    };
  }, []);

  return (
    <div className="min-h-screen">
      {/* Animated Hero */}
      <section className="adel-hero hero" ref={heroSectionRef}>
        <canvas ref={canvasRef} />

        <div className="hero-content">
          <div className="header" ref={headerRef}>
            <h1>One unified workspace to build, test, and ship AI faster</h1>
            <p>Trusted by</p>
            <div className="client-logos">
              <div className="client-logo placeholder" />
              <div className="client-logo placeholder" />
              <div className="client-logo placeholder" />
              <div className="client-logo placeholder" />
            </div>
          </div>
        </div>

        <div className="hero-img-container">
          <div className="hero-img" ref={heroImgRef}>
            <img src="/Glass _Knot_.jpeg" alt="Glass Knot" />
          </div>
        </div>
      </section>

      {/* Features Section (kept) */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Choose IndigoTG?</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              We deliver cutting-edge technology solutions that drive business growth and innovation
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Innovation</h3>
              <p className="text-gray-600">Cutting-edge solutions that keep you ahead of the competition</p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Reliability</h3>
              <p className="text-gray-600">Trusted solutions that work when you need them most</p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Expert Team</h3>
              <p className="text-gray-600">Experienced professionals dedicated to your success</p>
            </div>
          </div>
        </div>
      </section>

      <style jsx global>{`
        /* Scoped hero styles */
        .adel-hero {
          position: relative;
          width: 100vw;
          height: 100svh;
          overflow: hidden;
          background: #fefbf4;
          color: #241910;
        }

        .adel-hero canvas {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }

        .adel-hero .hero-content {
          position: absolute;
          top: 25%;
          left: 50%;
          transform: translateX(-50%);
          transform-style: preserve-3d;
          perspective: 1000px;
          padding: 0.5rem 0;
          pointer-events: none;
        }

        .adel-hero .header {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 100vw;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 1.5rem;
          text-align: center;
          transform-origin: center;
          will-change: transform, opacity;
        }

        .adel-hero .header h1 {
          font-family: system-ui, -apple-system, Segoe UI, Roboto, Ubuntu, Cantarell, Noto Sans, Helvetica, Arial, "Apple Color Emoji", "Segoe UI Emoji";
          font-weight: 500;
          line-height: 1.1;
          width: 50%;
          font-size: clamp(2rem, 4vw, 3rem);
        }

        .adel-hero .header p {
          text-transform: uppercase;
          font-size: 0.8rem;
          font-weight: 500;
          opacity: 0.6;
        }

        .adel-hero .client-logos {
          width: 30%;
          display: flex;
          gap: 0.5rem;
        }

        .adel-hero .client-logos .client-logo {
          flex: 1;
          height: 28px;
        }

        .adel-hero .client-logos .placeholder {
          background: rgba(0,0,0,0.08);
          border-radius: 4px;
        }

        .adel-hero .hero-img-container {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 50%;
          transform-style: preserve-3d;
          perspective: 1000px;
        }

        .adel-hero .hero-img {
          position: relative;
          width: 100%;
          height: 100%;
          transform: translateZ(1000px);
          opacity: 0;
          will-change: transform, opacity;
        }

        .adel-hero .hero-img img {
          width: 100%;
          height: auto;
          display: block;
          border-radius: 12px;
        }

        @media (max-width: 1000px) {
          .adel-hero .header h1,
          .adel-hero .client-logos,
          .adel-hero .hero-img-container {
            width: calc(100% - 2rem);
          }
        }
      `}</style>
    </div>
  );
}
