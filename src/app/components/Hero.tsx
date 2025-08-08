'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';

type LenisWithDestroy = {
  destroy?: () => void;
};

export default function Hero() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const headerRef = useRef<HTMLDivElement | null>(null);
  const heroImgRef = useRef<HTMLDivElement | null>(null);
  const heroSectionRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const lenis = new Lenis();
    lenis.on('scroll', ScrollTrigger.update);
    const tickerFn = (time: number) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(tickerFn);
    gsap.ticker.lagSmoothing(0);

    const canvas = canvasRef.current!;
    const context = canvas.getContext('2d');
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

    const frameCount = 202;
    const currentFrame = (index: number) => `/frames/frame_${(index + 1).toString().padStart(4, '0')}.png`;

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
      img.onerror = onLoad;
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
        start: 'top top',
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

          // Header zoom/fade logic
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

          // Image entrance
          if (progress < 0.6) {
            gsap.set(heroImg, {
              transform: 'translateZ(1000px)',
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
              transform: 'translateZ(0px)',
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
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (st) st.kill();
      gsap.ticker.remove(tickerFn);
      const lenisMaybe = lenis as unknown as LenisWithDestroy;
      if (lenisMaybe && typeof lenisMaybe.destroy === 'function') {
        lenisMaybe.destroy();
      }
    };
  }, []);

  return (
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

      <style jsx>{`
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
          font-family: system-ui, -apple-system, Segoe UI, Roboto, Ubuntu, Cantarell, Noto Sans, Helvetica, Arial, 'Apple Color Emoji', 'Segoe UI Emoji';
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
          background: rgba(0, 0, 0, 0.08);
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
    </section>
  );
}


