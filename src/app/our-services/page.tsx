'use client';

import React, { useEffect, useRef, useState, createElement, useMemo, useCallback, memo } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { orbitron } from '../fonts';
import CircularTestimonials from '../components/CircularTestimonials';
import { motion, Transition } from "framer-motion";
import IndigoAnimation1 from '../components/indigoAnimation1';

// BlurText Component
type BlurTextProps = {
  text?: string;
  delay?: number;
  className?: string;
  animateBy?: "words" | "letters";
  direction?: "top" | "bottom";
  threshold?: number;
  rootMargin?: string;
  animationFrom?: Record<string, string | number>;
  animationTo?: Array<Record<string, string | number>>;
  easing?: (t: number) => number;
  onAnimationComplete?: () => void;
  stepDuration?: number;
  tag?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p" | "span";
};

const buildKeyframes = (
  from: Record<string, string | number>,
  steps: Array<Record<string, string | number>>
): Record<string, Array<string | number>> => {
  const keys = new Set<string>([
    ...Object.keys(from),
    ...steps.flatMap((s) => Object.keys(s)),
  ]);

  const keyframes: Record<string, Array<string | number>> = {};
  keys.forEach((k) => {
    keyframes[k] = [from[k], ...steps.map((s) => s[k])];
  });
  return keyframes;
};

const BlurText: React.FC<BlurTextProps> = ({
  text = "",
  delay = 200,
  className = "",
  animateBy = "words",
  direction = "top",
  threshold = 0.1,
  rootMargin = "0px",
  animationFrom,
  animationTo,
  easing = (t) => t,
  onAnimationComplete,
  stepDuration = 0.35,
  tag = "p",
}) => {
  const elements = animateBy === "words" ? text.split(" ") : text.split("");
  const [inView, setInView] = useState(false);
  const ref = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.unobserve(ref.current as Element);
        }
      },
      { threshold, rootMargin }
    );
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [threshold, rootMargin]);

  const defaultFrom = useMemo(
    () =>
      direction === "top"
        ? { filter: "blur(10px)", opacity: 0, y: -50 }
        : { filter: "blur(10px)", opacity: 0, y: 50 },
    [direction]
  );

  const defaultTo = useMemo(
    () => [
      {
        filter: "blur(5px)",
        opacity: 0.5,
        y: direction === "top" ? 5 : -5,
      },
      { filter: "blur(0px)", opacity: 1, y: 0 },
    ],
    [direction]
  );

  const fromSnapshot = animationFrom ?? defaultFrom;
  const toSnapshots = animationTo ?? defaultTo;

  const stepCount = toSnapshots.length + 1;
  const totalDuration = stepDuration * (stepCount - 1);
  const times = Array.from({ length: stepCount }, (_, i) =>
    stepCount === 1 ? 0 : i / (stepCount - 1)
  );

  return (
    <span ref={ref} className={`blur-text ${className}`}>
      {elements.map((segment, index) => {
        const animateKeyframes = buildKeyframes(fromSnapshot, toSnapshots);

        const spanTransition: Transition = {
          duration: totalDuration,
          times,
          delay: (index * delay) / 1000,
        };
        (spanTransition as any).ease = easing;

        return (
          <motion.span
            key={index}
            initial={fromSnapshot}
            animate={inView ? animateKeyframes : fromSnapshot}
            transition={spanTransition}
            onAnimationComplete={
              index === elements.length - 1 ? onAnimationComplete : undefined
            }
            style={{
              display: "inline-block",
              willChange: "transform, filter, opacity",
            }}
          >
            {segment === " " ? "\u00A0" : segment}
            {animateBy === "words" && index < elements.length - 1 && "\u00A0"}
          </motion.span>
        );
      })}
    </span>
  );
};

// VaporizeTextCycle Component
export enum Tag {
  H1 = "h1",
  H2 = "h2",
  H3 = "h3",
  P = "p",
}

type VaporizeTextCycleProps = {
  texts: string[];
  font?: {
    fontFamily?: string;
    fontSize?: string;
    fontWeight?: number;
  };
  color?: string;
  spread?: number;
  density?: number;
  animation?: {
    vaporizeDuration?: number;
    fadeInDuration?: number;
    waitDuration?: number;
  };
  direction?: "left-to-right" | "right-to-left";
  alignment?: "left" | "center" | "right";
  tag?: Tag;
};

type VaporizeParticle = {
  x: number;
  y: number;
  originalX: number;
  originalY: number;
  color: string;
  opacity: number;
  originalAlpha: number;
  velocityX: number;
  velocityY: number;
  angle: number;
  speed: number;
  shouldFadeQuickly?: boolean;
};

type TextBoundaries = {
  left: number;
  right: number;
  width: number;
};

declare global {
  interface HTMLCanvasElement {
    textBoundaries?: TextBoundaries;
  }
}

function VaporizeTextCycle({
  texts = ["Next.js", "React"],
  font = {
    fontFamily: "sans-serif",
    fontSize: "50px",
    fontWeight: 400,
  },
  color = "rgb(255, 255, 255)",
  spread = 5,
  density = 5,
  animation = {
    vaporizeDuration: 2,
    fadeInDuration: 1,
    waitDuration: 0.5,
  },
  direction = "left-to-right",
  alignment = "center",
  tag = Tag.P,
}: VaporizeTextCycleProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const isInView = useIsInView(wrapperRef as React.RefObject<HTMLElement>);
  const lastFontRef = useRef<string | null>(null);
  const particlesRef = useRef<VaporizeParticle[]>([]);
  const animationFrameRef = useRef<number | null>(null);
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [animationState, setAnimationState] = useState<"static" | "vaporizing" | "fadingIn" | "waiting">("static");
  const vaporizeProgressRef = useRef(0);
  const fadeOpacityRef = useRef(0);
  const [wrapperSize, setWrapperSize] = useState({ width: 0, height: 0 });
  const transformedDensity = transformValue(density, [0, 10], [0.3, 1], true);

  // Calculate device pixel ratio
  const globalDpr = useMemo(() => {
    if (typeof window !== "undefined") {
      return window.devicePixelRatio * 1.5 || 1;
    }
    return 1;
  }, []);

  // Memoize static styles
  const wrapperStyle = useMemo(() => ({
    width: "100%",
    height: "100%",
    pointerEvents: "none" as const,
  }), []);

  const canvasStyle = useMemo(() => ({
    minWidth: "30px",
    minHeight: "20px",
    pointerEvents: "none" as const,
  }), []);

  // Memoize animation durations
  const animationDurations = useMemo(() => ({
    VAPORIZE_DURATION: (animation.vaporizeDuration ?? 2) * 1000,
    FADE_IN_DURATION: (animation.fadeInDuration ?? 1) * 1000,
    WAIT_DURATION: (animation.waitDuration ?? 0.5) * 1000,
  }), [animation.vaporizeDuration, animation.fadeInDuration, animation.waitDuration]);

  // Memoize font and spread calculations
  const fontConfig = useMemo(() => {
    const fontSize = parseInt(font.fontSize?.replace("px", "") || "50");
    const VAPORIZE_SPREAD = calculateVaporizeSpread(fontSize);
    const MULTIPLIED_VAPORIZE_SPREAD = VAPORIZE_SPREAD * spread;
    return {
      fontSize,
      VAPORIZE_SPREAD,
      MULTIPLIED_VAPORIZE_SPREAD,
      font: `${font.fontWeight ?? 400} ${fontSize * globalDpr}px ${font.fontFamily}`,
    };
  }, [font.fontSize, font.fontWeight, font.fontFamily, spread, globalDpr]);

  // Memoize particle update function
  const memoizedUpdateParticles = useCallback((particles: VaporizeParticle[], vaporizeX: number, deltaTime: number) => {
    return updateParticles(
      particles,
      vaporizeX,
      deltaTime,
      fontConfig.MULTIPLIED_VAPORIZE_SPREAD,
      animationDurations.VAPORIZE_DURATION,
      direction,
      transformedDensity
    );
  }, [fontConfig.MULTIPLIED_VAPORIZE_SPREAD, animationDurations.VAPORIZE_DURATION, direction, transformedDensity]);

  // Memoize render function
  const memoizedRenderParticles = useCallback((ctx: CanvasRenderingContext2D, particles: VaporizeParticle[]) => {
    renderParticles(ctx, particles, globalDpr);
  }, [globalDpr]);

  // Start animation cycle when in view
  useEffect(() => {
    if (isInView) {
      const startAnimationTimeout = setTimeout(() => {
        setAnimationState("vaporizing");
      }, 0);
      return () => clearTimeout(startAnimationTimeout);
    } else {
      // When component goes out of view, reset to static state
      setAnimationState("static");
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
        animationFrameRef.current = null;
      }
    }
  }, [isInView]);

  // Animation loop - only run when in view
  useEffect(() => {
    if (!isInView) return;

    let lastTime = performance.now();
    let frameId: number;

    const animate = (currentTime: number) => {
      const deltaTime = (currentTime - lastTime) / 1000;
      lastTime = currentTime;

      const canvas = canvasRef.current;
      const ctx = canvas?.getContext("2d");

      if (!canvas || !ctx || !particlesRef.current.length) {
        frameId = requestAnimationFrame(animate);
        return;
      }

      // Clear canvas only if we're going to draw
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Update based on animation state
      switch (animationState) {
        case "static": {
          memoizedRenderParticles(ctx, particlesRef.current);
          break;
        }
        case "vaporizing": {
          // Calculate progress based on duration
          vaporizeProgressRef.current += deltaTime * 100 / (animationDurations.VAPORIZE_DURATION / 1000);

          // Get text boundaries
          const textBoundaries = canvas.textBoundaries;
          if (!textBoundaries) break;

          // Calculate vaporize position based on text boundaries and direction
          const progress = Math.min(100, vaporizeProgressRef.current);
          const vaporizeX = direction === "left-to-right"
            ? textBoundaries.left + textBoundaries.width * progress / 100
            : textBoundaries.right - textBoundaries.width * progress / 100;

          const allVaporized = memoizedUpdateParticles(particlesRef.current, vaporizeX, deltaTime);
          memoizedRenderParticles(ctx, particlesRef.current);

          // Check if vaporization is complete
          if (vaporizeProgressRef.current >= 100 && allVaporized) {
            setCurrentTextIndex(prevIndex => (prevIndex + 1) % texts.length);
            setAnimationState("fadingIn");
            fadeOpacityRef.current = 0;
          }
          break;
        }
        case "fadingIn": {
          fadeOpacityRef.current += deltaTime * 1000 / animationDurations.FADE_IN_DURATION;

          // Use particles for fade-in
          ctx.save();
          ctx.scale(globalDpr, globalDpr);
          particlesRef.current.forEach(particle => {
            particle.x = particle.originalX;
            particle.y = particle.originalY;
            const opacity = Math.min(fadeOpacityRef.current, 1) * particle.originalAlpha;
            const color = particle.color.replace(/[\d.]+\)$/, `${opacity})`);
            ctx.fillStyle = color;
            ctx.fillRect(particle.x / globalDpr, particle.y / globalDpr, 1, 1);
          });
          ctx.restore();

          if (fadeOpacityRef.current >= 1) {
            setAnimationState("waiting");
            setTimeout(() => {
              setAnimationState("vaporizing");
              vaporizeProgressRef.current = 0;
              resetParticles(particlesRef.current);
            }, animationDurations.WAIT_DURATION);
          }
          break;
        }
        case "waiting": {
          memoizedRenderParticles(ctx, particlesRef.current);
          break;
        }
      }

      frameId = requestAnimationFrame(animate);
    };

    frameId = requestAnimationFrame(animate);

    return () => {
      if (frameId) {
        cancelAnimationFrame(frameId);
      }
    };
  }, [
    animationState, 
    isInView, 
    texts.length, 
    direction, 
    globalDpr, 
    memoizedUpdateParticles, 
    memoizedRenderParticles, 
    animationDurations.FADE_IN_DURATION, 
    animationDurations.WAIT_DURATION, 
    animationDurations.VAPORIZE_DURATION
  ]);

  useEffect(() => {
    renderCanvas({
      framerProps: {
        texts,
        font,
        color,
        alignment,
      },
      canvasRef: canvasRef as React.RefObject<HTMLCanvasElement>,
      wrapperSize,
      particlesRef,
      globalDpr,
      currentTextIndex,
      transformedDensity,
    });

    const currentFont = font.fontFamily || "sans-serif";
    return handleFontChange({
      currentFont,
      lastFontRef,
      canvasRef: canvasRef as React.RefObject<HTMLCanvasElement>,
      wrapperSize,
      particlesRef,
      globalDpr,
      currentTextIndex,
      transformedDensity,
      framerProps: {
        texts,
        font,
        color,
        alignment,
      },
    });
  }, [texts, font, color, alignment, wrapperSize, currentTextIndex, globalDpr, transformedDensity]);

  // Handle resize
  useEffect(() => {
    const container = wrapperRef.current;
    if (!container) return;

    const resizeObserver = new ResizeObserver(entries => {
      for (const entry of entries) {
        const { width, height } = entry.contentRect;
        setWrapperSize({ width, height });
      }
      
      renderCanvas({
        framerProps: {
          texts,
          font,
          color,
          alignment,
        },
        canvasRef: canvasRef as React.RefObject<HTMLCanvasElement>,
        wrapperSize: { width: container.clientWidth, height: container.clientHeight },
        particlesRef,
        globalDpr,
        currentTextIndex,
        transformedDensity,
      });
    });

    resizeObserver.observe(container);
    return () => {
      resizeObserver.disconnect();
    };
  }, [wrapperRef.current]);

  // Initial size detection
  useEffect(() => {
    if (wrapperRef.current) {
      const rect = wrapperRef.current.getBoundingClientRect();
      setWrapperSize({
        width: rect.width,
        height: rect.height,
      });
    }
  }, []);

  return (
    <div ref={wrapperRef} style={wrapperStyle}>
      <canvas ref={canvasRef} style={canvasStyle} />
      <SeoElement tag={tag} texts={texts} />
    </div>
  );
}

// ------------------------------------------------------------ //
// SEO ELEMENT
// ------------------------------------------------------------ //
const SeoElement = memo(({ tag = Tag.P, texts }: { tag: Tag, texts: string[] }) => {
  const style = useMemo(() => ({
    position: "absolute" as const,
    width: "0",
    height: "0",
    overflow: "hidden",
    userSelect: "none" as const,
    pointerEvents: "none" as const,
  }), []);

  // Ensure tag is a valid HTML element string
  const safeTag = Object.values(Tag).includes(tag) ? tag : "p";
  
  return createElement(safeTag, { style }, texts?.join(" ") ?? "");
});

// ------------------------------------------------------------ //
// FONT HANDLING
// ------------------------------------------------------------ //
const handleFontChange = ({
  currentFont,
  lastFontRef,
  canvasRef,
  wrapperSize,
  particlesRef,
  globalDpr,
  currentTextIndex,
  transformedDensity,
  framerProps,
}: {
  currentFont: string;
  lastFontRef: React.MutableRefObject<string | null>;
  canvasRef: React.RefObject<HTMLCanvasElement>;
  wrapperSize: { width: number; height: number };
  particlesRef: React.MutableRefObject<VaporizeParticle[]>;
  globalDpr: number;
  currentTextIndex: number;
  transformedDensity: number;
  framerProps: VaporizeTextCycleProps;
}) => {
  if (currentFont !== lastFontRef.current) {
    lastFontRef.current = currentFont;
    
    // Re-render after 1 second to catch the loaded font
    const timeoutId = setTimeout(() => {
      cleanup({ canvasRef, particlesRef }); // Clean up before re-rendering
      renderCanvas({
        framerProps,
        canvasRef,
        wrapperSize,
        particlesRef,
        globalDpr,
        currentTextIndex,
        transformedDensity,
      });
    }, 1000);
    
    return () => {
      clearTimeout(timeoutId);
      cleanup({ canvasRef, particlesRef });
    };
  }
  
  return undefined;
};

// ------------------------------------------------------------ //
// CLEANUP
// ------------------------------------------------------------ //
const cleanup = ({ canvasRef, particlesRef }: { canvasRef: React.RefObject<HTMLCanvasElement>; particlesRef: React.MutableRefObject<VaporizeParticle[]> }) => {
  // Clear canvas
  const canvas = canvasRef.current;
  const ctx = canvas?.getContext("2d");
  
  if (canvas && ctx) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  }
  
  // Clear particles
  if (particlesRef.current) {
    particlesRef.current = [];
  }
};

// ------------------------------------------------------------ //
// RENDER CANVAS
// ------------------------------------------------------------ //
const renderCanvas = ({
  framerProps,
  canvasRef,
  wrapperSize,
  particlesRef,
  globalDpr,
  currentTextIndex,
  transformedDensity,
}: {
  framerProps: VaporizeTextCycleProps;
  canvasRef: React.RefObject<HTMLCanvasElement>;
  wrapperSize: { width: number; height: number };
  particlesRef: React.MutableRefObject<VaporizeParticle[]>;
  globalDpr: number;
  currentTextIndex: number;
  transformedDensity: number;
}) => {
  const canvas = canvasRef.current;
  if (!canvas || !wrapperSize.width || !wrapperSize.height) return;

  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  const { width, height } = wrapperSize;

  // Scale for retina/high DPI displays
  canvas.style.width = `${width}px`;
  canvas.style.height = `${height}px`;
  canvas.width = Math.floor(width * globalDpr);
  canvas.height = Math.floor(height * globalDpr);

  // Parse font size
  const fontSize = parseInt(framerProps.font?.fontSize?.replace("px", "") || "50");
  const font = `${framerProps.font?.fontWeight ?? 400} ${fontSize * globalDpr}px ${framerProps.font?.fontFamily ?? "sans-serif"}`;
  const color = parseColor(framerProps.color ?? "rgb(153, 153, 153)");

  // Calculate text position
  let textX;
  const textY = canvas.height / 2;
  const currentText = framerProps.texts[currentTextIndex] || "Next.js";

  if (framerProps.alignment === "center") {
    textX = canvas.width / 2;
  } else if (framerProps.alignment === "left") {
    textX = 0;
  } else {
    textX = canvas.width;
  }

  // Create particles from the rendered text and get text boundaries
  const { particles, textBoundaries } = createParticles(ctx, canvas, currentText, textX, textY, font, color, framerProps.alignment || "left");

  // Store particles and text boundaries for animation
  particlesRef.current = particles;
  canvas.textBoundaries = textBoundaries;
};

// ------------------------------------------------------------ //
// PARTICLE SYSTEM
// ------------------------------------------------------------ //
const createParticles = (
  ctx: CanvasRenderingContext2D,
  canvas: HTMLCanvasElement,
  text: string,
  textX: number,
  textY: number,
  font: string,
  color: string,
  alignment: "left" | "center" | "right"
): { particles: VaporizeParticle[]; textBoundaries: TextBoundaries } => {
  const particles: VaporizeParticle[] = [];

  // Clear any previous content
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Set text properties for sampling
  ctx.fillStyle = color;
  ctx.font = font;
  ctx.textAlign = alignment;
  ctx.textBaseline = "middle";
  ctx.imageSmoothingQuality = "high";
  ctx.imageSmoothingEnabled = true;
  
  if ('fontKerning' in ctx) {
    (ctx as any).fontKerning = "normal";
  }
  
  if ('textRendering' in ctx) {
    (ctx as any).textRendering = "geometricPrecision";
  }

  // Calculate text boundaries
  const metrics = ctx.measureText(text);
  let textLeft;
  const textWidth = metrics.width;
  
  if (alignment === "center") {
    textLeft = textX - textWidth / 2;
  } else if (alignment === "left") {
    textLeft = textX;
  } else {
    textLeft = textX - textWidth;
  }
  
  const textBoundaries = {
    left: textLeft,
    right: textLeft + textWidth,
    width: textWidth,
  };

  // Render the text for sampling
  ctx.fillText(text, textX, textY);

  // Sample the rendered text
  const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  const data = imageData.data;

  // Calculate sampling rate based on DPR and density to maintain consistent particle density
  const baseDPR = 3; // Base DPR we're optimizing for
  const currentDPR = canvas.width / parseInt(canvas.style.width);
  const baseSampleRate = Math.max(1, Math.round(currentDPR / baseDPR));
  const sampleRate = Math.max(1, Math.round(baseSampleRate)); // Adjust sample rate by density

  // Sample the text pixels and create particles
  for (let y = 0; y < canvas.height; y += sampleRate) {
    for (let x = 0; x < canvas.width; x += sampleRate) {
      const index = (y * canvas.width + x) * 4;
      const alpha = data[index + 3];
      
      if (alpha > 0) {
        // Remove density from opacity calculation
        const originalAlpha = alpha / 255 * (sampleRate / currentDPR);
        const particle: VaporizeParticle = {
          x,
          y,
          originalX: x,
          originalY: y,
          color: `rgba(${data[index]}, ${data[index + 1]}, ${data[index + 2]}, ${originalAlpha})`,
          opacity: originalAlpha,
          originalAlpha,
          // Animation properties
          velocityX: 0,
          velocityY: 0,
          angle: 0,
          speed: 0,
        };
        
        particles.push(particle);
      }
    }
  }

  // Clear the canvas after sampling
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  return { particles, textBoundaries };
};

// Helper functions for particle animation
const updateParticles = (
  particles: VaporizeParticle[],
  vaporizeX: number,
  deltaTime: number,
  MULTIPLIED_VAPORIZE_SPREAD: number,
  VAPORIZE_DURATION: number,
  direction: string,
  density: number
) => {
  let allParticlesVaporized = true;
  
  particles.forEach(particle => {
    // Only animate particles that have been "vaporized"
    const shouldVaporize = direction === "left-to-right" 
      ? particle.originalX <= vaporizeX 
      : particle.originalX >= vaporizeX;
    
    if (shouldVaporize) {
      // When a particle is first vaporized, determine if it should fade quickly based on density
      if (particle.speed === 0) {
        // Initialize particle motion when first vaporized
        particle.angle = Math.random() * Math.PI * 2;
        particle.speed = (Math.random() * 1 + 0.5) * MULTIPLIED_VAPORIZE_SPREAD;
        particle.velocityX = Math.cos(particle.angle) * particle.speed;
        particle.velocityY = Math.sin(particle.angle) * particle.speed;
        
        // Determine if particle should fade quickly based on density
        // density of 1 means all particles animate normally
        // density of 0.5 means 50% of particles fade quickly
        particle.shouldFadeQuickly = Math.random() > density;
      }
      
      if (particle.shouldFadeQuickly) {
        // Quick fade out for particles marked to fade quickly
        particle.opacity = Math.max(0, particle.opacity - deltaTime);
      } else {
        // Apply normal particle physics and animation
        // Apply damping based on distance from original position
        const dx = particle.originalX - particle.x;
        const dy = particle.originalY - particle.y;
        const distanceFromOrigin = Math.sqrt(dx * dx + dy * dy);
        
        // Damping factor increases with distance, creating a more natural motion
        const dampingFactor = Math.max(0.95, 1 - distanceFromOrigin / (100 * MULTIPLIED_VAPORIZE_SPREAD));
        
        // Add slight random motion to create a more organic feel
        const randomSpread = MULTIPLIED_VAPORIZE_SPREAD * 3;
        const spreadX = (Math.random() - 0.5) * randomSpread;
        const spreadY = (Math.random() - 0.5) * randomSpread;
        
        // Update velocities with damping and random motion
        particle.velocityX = (particle.velocityX + spreadX + dx * 0.002) * dampingFactor;
        particle.velocityY = (particle.velocityY + spreadY + dy * 0.002) * dampingFactor;
        
        // Limit maximum velocity
        const maxVelocity = MULTIPLIED_VAPORIZE_SPREAD * 2;
        const currentVelocity = Math.sqrt(particle.velocityX * particle.velocityX + particle.velocityY * particle.velocityY);
        
        if (currentVelocity > maxVelocity) {
          const scale = maxVelocity / currentVelocity;
          particle.velocityX *= scale;
          particle.velocityY *= scale;
        }
        
        // Update position
        particle.x += particle.velocityX * deltaTime * 20;
        particle.y += particle.velocityY * deltaTime * 10;
        
        // Calculate fade rate based on vaporize duration
        const baseFadeRate = 0.25;
        const durationBasedFadeRate = baseFadeRate * (2000 / VAPORIZE_DURATION);
        
        // Slower fade out for more persistence, scaled by duration
        particle.opacity = Math.max(0, particle.opacity - deltaTime * durationBasedFadeRate);
      }
      
      // Check if this particle is still visible
      if (particle.opacity > 0.01) {
        allParticlesVaporized = false;
      }
    } else {
      // If there are any particles not yet reached by the vaporize wave
      allParticlesVaporized = false;
    }
  });
  
  return allParticlesVaporized;
};

const renderParticles = (ctx: CanvasRenderingContext2D, particles: VaporizeParticle[], globalDpr: number) => {
  ctx.save();
  ctx.scale(globalDpr, globalDpr);
  
  particles.forEach(particle => {
    if (particle.opacity > 0) {
      const color = particle.color.replace(/[\d.]+\)$/, `${particle.opacity})`);
      ctx.fillStyle = color;
      ctx.fillRect(particle.x / globalDpr, particle.y / globalDpr, 1, 1);
    }
  });
  
  ctx.restore();
};

const resetParticles = (particles: VaporizeParticle[]) => {
  particles.forEach(particle => {
    particle.x = particle.originalX;
    particle.y = particle.originalY;
    particle.opacity = particle.originalAlpha;
    particle.speed = 0;
    particle.velocityX = 0;
    particle.velocityY = 0;
  });
};

// ------------------------------------------------------------ //
// CALCULATE VAPORIZE SPREAD
// ------------------------------------------------------------ //
const calculateVaporizeSpread = (fontSize: number) => {
  // Convert font size string to number if needed
  const size = typeof fontSize === "string" ? parseInt(fontSize) : fontSize;
  
  // Define our known points for interpolation
  const points = [
    { size: 20, spread: 0.2 },
    { size: 50, spread: 0.5 },
    { size: 100, spread: 1.5 }
  ];
  
  // Handle edge cases
  if (size <= points[0].size) return points[0].spread;
  if (size >= points[points.length - 1].size) return points[points.length - 1].spread;
  
  // Find the two points to interpolate between
  let i = 0;
  while (i < points.length - 1 && points[i + 1].size < size) i++;
  
  // Linear interpolation between the two closest points
  const p1 = points[i];
  const p2 = points[i + 1];
  
  return p1.spread + (size - p1.size) * (p2.spread - p1.spread) / (p2.size - p1.size);
};

// ------------------------------------------------------------ //
// PARSE COLOR
// ------------------------------------------------------------ //
/**
 * Extracts RGB/RGBA values from a color string format
 * @param color - Color string (e.g. "rgb(12, 250, 163)")
 * @returns Valid RGBA color string
 */
const parseColor = (color: string) => {
  // Try to match rgb/rgba pattern
  const rgbMatch = color.match(/rgb\((\d+),\s*(\d+),\s*(\d+)\)/);
  const rgbaMatch = color.match(/rgba\((\d+),\s*(\d+),\s*(\d+),\s*([\d.]+)\)/);
  
  if (rgbaMatch) {
    // If RGBA format
    const [_, r, g, b, a] = rgbaMatch;
    return `rgba(${r}, ${g}, ${b}, ${a})`;
  } else if (rgbMatch) {
    // If RGB format
    const [_, r, g, b] = rgbMatch;
    return `rgba(${r}, ${g}, ${b}, 1)`;
  }
  
  // Fallback to black if parsing fails
  console.warn("Could not parse color:", color);
  return "rgba(0, 0, 0, 1)";
};

/**
 * Maps a value from one range to another, optionally clamping the result.
 */
function transformValue(input: number, inputRange: number[], outputRange: number[], clamp = false): number {
  const [inputMin, inputMax] = inputRange;
  const [outputMin, outputMax] = outputRange;
  
  const progress = (input - inputMin) / (inputMax - inputMin);
  let result = outputMin + progress * (outputMax - outputMin);
  
  if (clamp) {
    if (outputMax > outputMin) {
      result = Math.min(Math.max(result, outputMin), outputMax);
    } else {
      result = Math.min(Math.max(result, outputMax), outputMin);
    }
  }
  
  return result;
}

/**
 * Custom hook to check if an element is in the viewport
 */
function useIsInView(ref: React.RefObject<HTMLElement>) {
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    if (!ref.current) return;
    
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      { threshold: 0.3, rootMargin: '0px' }
    );
    
    observer.observe(ref.current);
    
    return () => {
      observer.disconnect();
    };
  }, [ref]);

  return isInView;
}

interface Vector2D {
  x: number
  y: number
}

class Particle {
  pos: Vector2D = { x: 0, y: 0 }
  vel: Vector2D = { x: 0, y: 0 }
  acc: Vector2D = { x: 0, y: 0 }
  target: Vector2D = { x: 0, y: 0 }

  closeEnoughTarget = 100
  maxSpeed = 1.0
  maxForce = 0.1
  particleSize = 10
  isKilled = false

  startColor = { r: 0, g: 0, b: 0 }
  targetColor = { r: 0, g: 0, b: 0 }
  colorWeight = 0
  colorBlendRate = 0.01

  move() {
    // Check if particle is close enough to its target to slow down
    let proximityMult = 1
    const distance = Math.sqrt(Math.pow(this.pos.x - this.target.x, 2) + Math.pow(this.pos.y - this.target.y, 2))

    if (distance < this.closeEnoughTarget) {
      proximityMult = distance / this.closeEnoughTarget
    }

    // Add force towards target
    const towardsTarget = {
      x: this.target.x - this.pos.x,
      y: this.target.y - this.pos.y,
    }

    const magnitude = Math.sqrt(towardsTarget.x * towardsTarget.x + towardsTarget.y * towardsTarget.y)
    if (magnitude > 0) {
      towardsTarget.x = (towardsTarget.x / magnitude) * this.maxSpeed * proximityMult
      towardsTarget.y = (towardsTarget.y / magnitude) * this.maxSpeed * proximityMult
    }

    const steer = {
      x: towardsTarget.x - this.vel.x,
      y: towardsTarget.y - this.vel.y,
    }

    const steerMagnitude = Math.sqrt(steer.x * steer.x + steer.y * steer.y)
    if (steerMagnitude > 0) {
      steer.x = (steer.x / steerMagnitude) * this.maxForce
      steer.y = (steer.y / steerMagnitude) * this.maxForce
    }

    this.acc.x += steer.x
    this.acc.y += steer.y

    // Move particle
    this.vel.x += this.acc.x
    this.vel.y += this.acc.y
    this.pos.x += this.vel.x
    this.pos.y += this.vel.y
    this.acc.x = 0
    this.acc.y = 0
  }

  draw(ctx: CanvasRenderingContext2D, drawAsPoints: boolean) {
    // Blend towards target color
    if (this.colorWeight < 1.0) {
      this.colorWeight = Math.min(this.colorWeight + this.colorBlendRate, 1.0)
    }

    // Calculate current color
    const currentColor = {
      r: Math.round(this.startColor.r + (this.targetColor.r - this.startColor.r) * this.colorWeight),
      g: Math.round(this.startColor.g + (this.targetColor.g - this.startColor.g) * this.colorWeight),
      b: Math.round(this.startColor.b + (this.targetColor.b - this.startColor.b) * this.colorWeight),
    }

    if (drawAsPoints) {
      ctx.fillStyle = `rgb(${currentColor.r}, ${currentColor.g}, ${currentColor.b})`
      ctx.fillRect(this.pos.x, this.pos.y, 2, 2)
    } else {
      ctx.fillStyle = `rgb(${currentColor.r}, ${currentColor.g}, ${currentColor.b})`
      ctx.beginPath()
      ctx.arc(this.pos.x, this.pos.y, this.particleSize / 2, 0, Math.PI * 2)
      ctx.fill()
    }
  }

  kill(width: number, height: number) {
    if (!this.isKilled) {
      // Set target outside the scene
      const randomPos = this.generateRandomPos(width / 2, height / 2, (width + height) / 2)
      this.target.x = randomPos.x
      this.target.y = randomPos.y

      // Begin blending color to black
      this.startColor = {
        r: this.startColor.r + (this.targetColor.r - this.startColor.r) * this.colorWeight,
        g: this.startColor.g + (this.targetColor.g - this.startColor.g) * this.colorWeight,
        b: this.startColor.b + (this.targetColor.b - this.startColor.b) * this.colorWeight,
      }
      this.targetColor = { r: 0, g: 0, b: 0 }
      this.colorWeight = 0

      this.isKilled = true
    }
  }

  private generateRandomPos(x: number, y: number, mag: number): Vector2D {
    const randomX = Math.random() * 1000
    const randomY = Math.random() * 500

    const direction = {
      x: randomX - x,
      y: randomY - y,
    }

    const magnitude = Math.sqrt(direction.x * direction.x + direction.y * direction.y)
    if (magnitude > 0) {
      direction.x = (direction.x / magnitude) * mag
      direction.y = (direction.y / magnitude) * mag
    }

    return {
      x: x + direction.x,
      y: y + direction.y,
    }
  }
}

interface TypingTextProps {
  text: string
  color?: 'primary' | 'secondary' | 'accent'
  size?: 'sm' | 'md' | 'lg'
}

function TypingText({ text, color = 'primary', size = 'md' }: TypingTextProps) {
  const [displayText, setDisplayText] = useState('')
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isComplete, setIsComplete] = useState(false)

  useEffect(() => {
    if (currentIndex < text.length) {
      const timer = setTimeout(() => {
        setDisplayText(text.slice(0, currentIndex + 1))
        setCurrentIndex(currentIndex + 1)
      }, 50) // 50ms delay between characters

      return () => clearTimeout(timer)
    } else {
      setIsComplete(true)
    }
  }, [currentIndex, text])

  const colorClasses = {
    primary: 'text-white/90',
    secondary: 'text-orange-400/90',
    accent: 'text-cyan-400/90'
  }

  const sizeClasses = {
    sm: 'text-base',
    md: 'text-lg md:text-xl',
    lg: 'text-xl md:text-2xl'
  }

  return (
    <span className={`${colorClasses[color]} ${sizeClasses[size]} font-['Poppins'] tracking-wide`}>
      {displayText}
      {!isComplete && <span className="animate-pulse text-white/60">|</span>}
    </span>
  )
}

interface ParticleTextEffectProps {
  words?: string[]
}

const DEFAULT_WORDS = ["WE ARE INDIGO", "OUR SERVICES", "WE DESIGN", "WE DEPLOY", "WE SUPPORT"]

export function ParticleTextEffect({ words = DEFAULT_WORDS }: ParticleTextEffectProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationRef = useRef<number | null>(null)
  const particlesRef = useRef<Particle[]>([])
  const frameCountRef = useRef(0)
  const wordIndexRef = useRef(0)
  const mouseRef = useRef({ x: 0, y: 0, isPressed: false, isRightClick: false })

  const pixelSteps = 6
  const drawAsPoints = true

  const generateRandomPos = (x: number, y: number, mag: number): Vector2D => {
    const canvas = canvasRef.current
    if (!canvas) return { x: 0, y: 0 }
    
    const randomX = Math.random() * canvas.width
    const randomY = Math.random() * canvas.height

    const direction = {
      x: randomX - x,
      y: randomY - y,
    }

    const magnitude = Math.sqrt(direction.x * direction.x + direction.y * direction.y)
    if (magnitude > 0) {
      direction.x = (direction.x / magnitude) * mag
      direction.y = (direction.y / magnitude) * mag
    }

    return {
      x: x + direction.x,
      y: y + direction.y,
    }
  }

  const nextWord = (word: string, canvas: HTMLCanvasElement) => {
    // Create off-screen canvas for text rendering
    const offscreenCanvas = document.createElement("canvas")
    offscreenCanvas.width = canvas.width
    offscreenCanvas.height = canvas.height
    const offscreenCtx = offscreenCanvas.getContext("2d")!

    // Draw text
    offscreenCtx.fillStyle = "white"
    offscreenCtx.font = "bold 100px Arial"
    offscreenCtx.textAlign = "center"
    offscreenCtx.textBaseline = "middle"
    offscreenCtx.fillText(word, canvas.width / 2, canvas.height / 2)

    const imageData = offscreenCtx.getImageData(0, 0, canvas.width, canvas.height)
    const pixels = imageData.data

    // Generate new color
    const newColor = {
      r: Math.random() * 255,
      g: Math.random() * 255,
      b: Math.random() * 255,
    }

    const particles = particlesRef.current
    let particleIndex = 0

    // Collect coordinates
    const coordsIndexes: number[] = []
    for (let i = 0; i < pixels.length; i += pixelSteps * 4) {
      coordsIndexes.push(i)
    }

    // Shuffle coordinates for fluid motion
    for (let i = coordsIndexes.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      ;[coordsIndexes[i], coordsIndexes[j]] = [coordsIndexes[j], coordsIndexes[i]]
    }

    for (const coordIndex of coordsIndexes) {
      const pixelIndex = coordIndex
      const alpha = pixels[pixelIndex + 3]

      if (alpha > 0) {
        const x = (pixelIndex / 4) % canvas.width
        const y = Math.floor(pixelIndex / 4 / canvas.width)

        let particle: Particle

        if (particleIndex < particles.length) {
          particle = particles[particleIndex]
          particle.isKilled = false
          particleIndex++
        } else {
          particle = new Particle()

          const randomPos = generateRandomPos(canvas.width / 2, canvas.height / 2, (canvas.width + canvas.height) / 2)
          particle.pos.x = randomPos.x
          particle.pos.y = randomPos.y

          particle.maxSpeed = Math.random() * 6 + 4
          particle.maxForce = particle.maxSpeed * 0.05
          particle.particleSize = Math.random() * 6 + 6
          particle.colorBlendRate = Math.random() * 0.0275 + 0.0025

          particles.push(particle)
        }

        // Set color transition
        particle.startColor = {
          r: particle.startColor.r + (particle.targetColor.r - particle.startColor.r) * particle.colorWeight,
          g: particle.startColor.g + (particle.targetColor.g - particle.startColor.g) * particle.colorWeight,
          b: particle.startColor.b + (particle.targetColor.b - particle.startColor.b) * particle.colorWeight,
        }
        particle.targetColor = newColor
        particle.colorWeight = 0

        particle.target.x = x
        particle.target.y = y
      }
    }

    // Kill remaining particles
    for (let i = particleIndex; i < particles.length; i++) {
      particles[i].kill(canvas.width, canvas.height)
    }
  }

  const animate = () => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")!
    const particles = particlesRef.current

    // Background with motion blur
    ctx.fillStyle = "rgba(0, 0, 0, 0.1)"
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    // Update and draw particles
    for (let i = particles.length - 1; i >= 0; i--) {
      const particle = particles[i]
      particle.move()
      particle.draw(ctx, drawAsPoints)

      // Remove dead particles that are out of bounds
      if (particle.isKilled) {
        if (
          particle.pos.x < 0 ||
          particle.pos.x > canvas.width ||
          particle.pos.y < 0 ||
          particle.pos.y > canvas.height
        ) {
          particles.splice(i, 1)
        }
      }
    }

    // Handle mouse interaction
    if (mouseRef.current.isPressed && mouseRef.current.isRightClick) {
      particles.forEach((particle) => {
        const distance = Math.sqrt(
          Math.pow(particle.pos.x - mouseRef.current.x, 2) + Math.pow(particle.pos.y - mouseRef.current.y, 2),
        )
        if (distance < 50) {
          particle.kill(canvas.width, canvas.height)
        }
      })
    }

    // Auto-advance words
    frameCountRef.current++
    if (frameCountRef.current % 240 === 0) {
      wordIndexRef.current = (wordIndexRef.current + 1) % words.length
      nextWord(words[wordIndexRef.current], canvas)
    }

    animationRef.current = requestAnimationFrame(animate)
  }

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    // Set canvas to full screen size
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    // Initialize with first word
    nextWord(words[0], canvas)

    // Start animation
    animate()

    // Handle window resize
    const handleResize = () => {
      if (canvas) {
        canvas.width = window.innerWidth
        canvas.height = window.innerHeight
        // Reinitialize with current word after resize
        nextWord(words[wordIndexRef.current], canvas)
      }
    }

    window.addEventListener('resize', handleResize)

    // Mouse event handlers
    const handleMouseDown = (e: MouseEvent) => {
      mouseRef.current.isPressed = true
      mouseRef.current.isRightClick = e.button === 2
      const rect = canvas.getBoundingClientRect()
      mouseRef.current.x = e.clientX - rect.left
      mouseRef.current.y = e.clientY - rect.top
    }

    const handleMouseUp = () => {
      mouseRef.current.isPressed = false
      mouseRef.current.isRightClick = false
    }

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect()
      mouseRef.current.x = e.clientX - rect.left
      mouseRef.current.y = e.clientY - rect.top
    }

    const handleContextMenu = (e: MouseEvent) => {
      e.preventDefault()
    }

    canvas.addEventListener("mousedown", handleMouseDown)
    canvas.addEventListener("mouseup", handleMouseUp)
    canvas.addEventListener("mousemove", handleMouseMove)
    canvas.addEventListener("contextmenu", handleContextMenu)

    return () => {
      if (animationRef.current !== null) {
        cancelAnimationFrame(animationRef.current)
      }
      window.removeEventListener('resize', handleResize)
      canvas.removeEventListener("mousedown", handleMouseDown)
      canvas.removeEventListener("mouseup", handleMouseUp)
      canvas.removeEventListener("mousemove", handleMouseMove)
      canvas.removeEventListener("contextmenu", handleContextMenu)
    }
  }, [])

  return (
    <div className="flex flex-col items-center justify-center h-full w-full relative">
      <canvas
        ref={canvasRef}
        className="w-full h-full absolute inset-0"
        style={{ display: 'block' }}
      />
      {/* Instruction text below the particle animation */}
      {/* <div className="relative z-10 text-center mt-48"> */}
      <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 z-10 text-center">
        <div className="text-center">
          <p className="text-center whitespace-nowrap">
            <TypingText
              text="Our engineers solve the biggest problems in digital infrastructure."
              color="primary"
              size="lg"
            />
          </p>
        </div>
      </div>
    </div>
  )
}



export default function OurServices2() {
  // Refs for advanced services animation
  const advancedServicesHeaderRef = useRef<HTMLDivElement>(null);
  const advancedServicesGridRef = useRef<HTMLDivElement>(null);
  
  // State for service filtering
  const [activeFilter, setActiveFilter] = useState<'all' | 'design' | 'deploy' | 'support'>('all');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // Service data for different categories
  const serviceData = {
    all: {
      title: "All Services",
      description: "Comprehensive range of digital infrastructure services across all domains",
      graphic: "all"
    },
    design: {
      title: "Design Services",
      description: "We optimise and future-proof designs from the outset with leading-edge tools, processes, and data, saving our partners time and money.",
      graphic: "design"
    },
    deploy: {
      title: "Deploy Services",
      description: "We partner with owners and network operators to install, test, and optimize fibre optic, wireless, and data centre digital infrastructure.",
      graphic: "deploy"
    },
    support: {
      title: "Support Services",
      description: "We monitor, maintain, and upgrade services around the clock, deploying our operations and multi-vendor engineers within hours or the next day to provide expert on-site support.",
      graphic: "support"
    }
  };

  // Sample testimonials data
  const testimonials = [
    {
      quote: "Our comprehensive network design services ensure your infrastructure is built for scale, performance, and reliability from the ground up.",
      name: "Network Design",
      designation: "Infrastructure Planning & Architecture",
      src: "/services/img-1.jpg"
    },
    {
      quote: "Professional deployment services with certified engineers who implement your solutions with precision and attention to every detail.",
      name: "Professional Deployment",
      designation: "Certified Implementation & Setup",
      src: "/services/img-2.jpg"
    },
    {
      quote: "24/7 support and maintenance services to keep your systems running smoothly with proactive monitoring and rapid response times.",
      name: "24/7 Support",
      designation: "Continuous Monitoring & Maintenance",
      src: "/services/img-3.jpg"
    }
  ];

  // Advanced services grid fade-in animation (only for the grid cards now)
  useEffect(() => {
    if (!advancedServicesGridRef.current) return;

    // Set initial state for grid only
    gsap.set(advancedServicesGridRef.current, {
      opacity: 0,
      y: 30
    });

    // Create timeline for grid animation
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: advancedServicesGridRef.current,
        start: "top 80%",
        end: "bottom 20%",
        toggleActions: "play none none reverse"
      }
    });

    // Animate grid with a slight delay after text animation
    tl.to(advancedServicesGridRef.current, {
      opacity: 1,
      y: 0,
      duration: 0.6,
      ease: "power2.out"
    });

    return () => {
      // Cleanup
      tl.kill();
    };
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (isDropdownOpen && !(event.target as Element).closest('.dropdown-container')) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isDropdownOpen]);

  return (
    <div className="min-h-screen overflow-x-hidden">
      {/* Top scroll progress bar */}
      <div className="fixed top-0 left-0 z-[100] h-1 w-full pointer-events-none">
        <div id="scroll-progress-bar" className="h-full w-full origin-left scale-x-0 bg-gradient-to-r from-yellow-400 to-orange-500" />
      </div>


      {/* Hero Section - Full Screen with Particle Text Effect */}
      <section className="h-screen relative flex items-center justify-center overflow-hidden">
        {/* Black background */}
        <div className="absolute inset-0 bg-black z-0" />
        <div className="relative z-10 flex items-center justify-center px-4 text-center h-full w-full">
          <ParticleTextEffect />
        </div>

        {/* Scroll cue */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2 text-white/80">
          <div className="h-2.5 w-2.5 rounded-full bg-white/90 animate-pulse" />
          <span className="text-sm tracking-wide">Scroll</span>
        </div>
      </section>

             {/* Vaporize Text Section */}
       <section className="py-24 bg-gradient-to-b from-black to-gray-900">
         <div className="container mx-auto px-4">
           <div className="text-center mb-16">
             <div className="h-32 flex items-center justify-center">
               <VaporizeTextCycle
                 texts={["OUR CORE SERVICES", "Discover our comprehensive range of digital infrastructure services"]}
                 font={{
                   fontFamily: "Inter, sans-serif",
                   fontSize: "30px",
                   fontWeight: 600
                 }}
                 color="rgb(251, 191, 36)"
                 spread={5}
                 density={5}
                 animation={{
                   vaporizeDuration: 2,
                   fadeInDuration: 1,
                   waitDuration: 0.5
                 }}
                 direction="left-to-right"
                 alignment="center"
                 tag={Tag.H2}
               />
             </div>
           </div>
           <div className="flex justify-center">
             <CircularTestimonials 
               testimonials={testimonials}
               autoplay={true}
               colors={{
                 name: "#ffffff",
                 designation: "#fbbf24",
                 testimony: "#e5e7eb",
                 arrowBackground: "#1f2937",
                 arrowForeground: "#ffffff",
                 arrowHoverBackground: "#f59e0b"
               }}
               fontSizes={{
                 name: "1.75rem",
                 designation: "1rem",
                 quote: "1.25rem"
               }}
             />
           </div>
         </div>
       </section>

               {/* All Services Section */}
        <section className="py-24 bg-[#04048b]">
          <div className="container mx-auto px-4">
            <div className="max-w-7xl mx-auto">
              <div className="flex flex-col lg:flex-row gap-12">
                {/* Left Panel - Filter Button and Content */}
                <div className="lg:w-1/3">
                  <div className="mb-8 relative dropdown-container">
                    <button 
                      onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                      className="bg-transparent border-2 border-white text-white px-6 py-3 rounded-full font-semibold flex items-center gap-2 hover:bg-white hover:text-blue-900 transition-colors w-full justify-between"
                    >
                      {serviceData[activeFilter].title}
                      <svg className={`w-4 h-4 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} fill="none" stroke="white" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                    
                                          {/* Dropdown Menu */}
                      {isDropdownOpen && (
                        <div className="absolute top-full left-0 right-0 mt-2 bg-[#04048b] border border-white/20 rounded-lg shadow-xl z-50 overflow-hidden">
                          <button
                            onClick={() => {
                              setActiveFilter('all');
                              setIsDropdownOpen(false);
                            }}
                            className={`w-full text-left px-4 py-3 text-white text-lg transition-colors rounded-t-lg ${
                              activeFilter === 'all' ? 'bg-white/10' : 'hover:bg-white/10'
                            }`}
                          >
                            All Services
                          </button>
                          <button
                            onClick={() => {
                              setActiveFilter('design');
                              setIsDropdownOpen(false);
                            }}
                            className={`w-full text-left px-4 py-3 text-white text-lg transition-colors ${
                              activeFilter === 'design' ? 'bg-white/10' : 'hover:bg-white/10'
                            }`}
                          >
                            Design Services
                          </button>
                          <button
                            onClick={() => {
                              setActiveFilter('deploy');
                              setIsDropdownOpen(false);
                            }}
                            className={`w-full text-left px-4 py-3 text-white text-lg transition-colors ${
                              activeFilter === 'deploy' ? 'bg-white/10' : 'hover:bg-white/10'
                            }`}
                          >
                            Deploy Services
                          </button>
                          <button
                            onClick={() => {
                              setActiveFilter('support');
                              setIsDropdownOpen(false);
                            }}
                            className={`w-full text-left px-4 py-3 text-white text-lg transition-colors rounded-b-lg ${
                              activeFilter === 'support' ? 'bg-white/10' : 'hover:bg-white/10'
                            }`}
                          >
                            Support Services
                          </button>
                        </div>
                      )}
                  </div>
                  
                  {/* Abstract Graphic */}
                  <div className="mb-8">
                    {/* Original filter-changing images commented out
                    {activeFilter === 'all' && (
                      <img 
                        src="/services/all_services.PNG" 
                        alt="All Services" 
                        className="w-48 h-48 object-contain"
                      />
                    )}
                    {activeFilter === 'design' && (
                      <img 
                        src="/services/card-1.png" 
                        alt="Design Services" 
                        className="w-48 h-48 object-contain"
                      />
                    )}
                    {activeFilter === 'deploy' && (
                      <img 
                        src="/services/card-2.png" 
                          alt="Deploy Services" 
                          className="w-48 h-48 object-contain"
                      />
                    )}
                    {activeFilter === 'support' && (
                      <img 
                        src="/services/card-3.png" 
                        alt="Support Services" 
                        className="w-48 h-48 object-contain"
                      />
                    )}
                    */}
                    
                    {/* New IndigoAnimation1 component */}
                    <div className="w-48 h-48">
                      <IndigoAnimation1 filter={activeFilter} />
                    </div>
                  </div>
                  
                  <p className="text-white text-lg leading-relaxed mt-64">
                    {serviceData[activeFilter].description}
                  </p>
                </div>

                                 {/* Right Panel - Services Grid */}
                 <div className="lg:w-2/3">
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                           {activeFilter === 'all' && (
                        <>
                          {/* Terrestrial Services */}
                          <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg p-6">
                            <h3 className="text-xl font-bold text-white mb-4">Terrestrial</h3>
                            <ul className="space-y-2 text-white/90">
                              <li className="flex items-center hover:text-yellow-400 hover:translate-x-2 transition-all duration-300 cursor-pointer group">
                                <div className="w-3 h-3 bg-white mr-3 transform rotate-45 hover:scale-125 group-hover:bg-yellow-400 transition-all duration-300 cursor-pointer"></div>
                                Active Build
                              </li>
                              <li className="flex items-center hover:text-yellow-400 hover:translate-x-2 transition-all duration-300 cursor-pointer group">
                                <div className="w-3 h-3 bg-white mr-3 transform rotate-45 hover:scale-125 group-hover:bg-yellow-400 transition-all duration-300 cursor-pointer"></div>
                                Logistics and Warehousing
                              </li>
                              <li className="flex items-center hover:text-yellow-400 hover:translate-x-2 transition-all duration-300 cursor-pointer group">
                                <div className="w-3 h-3 bg-white mr-3 transform rotate-45 hover:scale-125 group-hover:bg-yellow-400 transition-all duration-300 cursor-pointer"></div>
                                Project & Programme Management
                              </li>
                              <li className="flex items-center hover:text-yellow-400 hover:translate-x-2 transition-all duration-300 cursor-pointer group">
                                <div className="w-3 h-3 bg-white mr-3 transform rotate-45 hover:scale-125 group-hover:bg-yellow-400 transition-all duration-300 cursor-pointer"></div>
                                Fibre Survey & Design (POP)
                              </li>
                              <li className="flex items-center hover:text-yellow-400 hover:translate-x-2 transition-all duration-300 cursor-pointer group">
                                <div className="w-3 h-3 bg-white mr-3 transform rotate-45 hover:scale-125 group-hover:bg-yellow-400 transition-all duration-300 cursor-pointer"></div>
                                Fibre Design Desktop HLD
                              </li>
                              <li className="flex items-center hover:text-yellow-400 hover:translate-x-2 transition-all duration-300 cursor-pointer group">
                                <div className="w-3 h-3 bg-white mr-3 transform rotate-45 hover:scale-125 group-hover:bg-yellow-400 transition-all duration-300 cursor-pointer"></div>
                                Fibre Access LLD Services
                              </li>
                              <li className="flex items-center hover:text-yellow-400 hover:translate-x-2 transition-all duration-300 cursor-pointer group">
                                <div className="w-3 h-3 bg-white mr-3 transform rotate-45 hover:scale-125 group-hover:bg-yellow-400 transition-all duration-300 cursor-pointer"></div>
                                Fibre Surveying OLT
                              </li>
                              <li className="flex items-center hover:text-yellow-400 hover:translate-x-2 transition-all duration-300 cursor-pointer group">
                                <div className="w-3 h-3 bg-white mr-3 transform rotate-45 hover:scale-125 group-hover:bg-yellow-400 transition-all duration-300 cursor-pointer"></div>
                                Fibre Planning and Design OLT
                              </li>
                              <li className="flex items-center hover:text-yellow-400 hover:translate-x-2 transition-all duration-300 cursor-pointer group">
                                <div className="w-3 h-3 bg-white mr-3 transform rotate-45 hover:scale-125 group-hover:bg-yellow-400 transition-all duration-300 cursor-pointer"></div>
                                Fibre Access POP Design and Planning
                              </li>
                              <li className="flex items-center hover:text-yellow-400 hover:translate-x-2 transition-all duration-300 cursor-pointer group">
                                <div className="w-3 h-3 bg-white mr-3 transform rotate-45 hover:scale-125 group-hover:bg-yellow-400 transition-all duration-300 cursor-pointer"></div>
                                Wayleaving and Consenting
                              </li>
                              <li className="flex items-center hover:text-yellow-400 hover:translate-x-2 transition-all duration-300 cursor-pointer group">
                                <div className="w-3 h-3 bg-white mr-3 transform rotate-45 hover:scale-125 group-hover:bg-yellow-400 transition-all duration-300 cursor-pointer"></div>
                                Network Monitoring
                              </li>
                              <li className="flex items-center hover:text-yellow-400 hover:translate-x-2 transition-all duration-300 cursor-pointer group">
                                <div className="w-3 h-3 bg-white mr-3 transform rotate-45 hover:scale-125 group-hover:bg-yellow-400 transition-all duration-300 cursor-pointer"></div>
                                Operations and Maintenance
                              </li>
                              <li className="flex items-center hover:text-yellow-400 hover:translate-x-2 transition-all duration-300 cursor-pointer group">
                                <div className="w-3 h-3 bg-white mr-3 transform rotate-45 hover:scale-125 group-hover:bg-yellow-400 transition-all duration-300 cursor-pointer"></div>
                                Global Service Desk and First Line Maintenance
                              </li>
                              <li className="flex items-center hover:text-yellow-400 hover:translate-x-2 transition-all duration-300 cursor-pointer group">
                                <div className="w-3 h-3 bg-white mr-3 transform rotate-45 hover:scale-125 group-hover:bg-yellow-400 transition-all duration-300 cursor-pointer"></div>
                                Survey & Design
                              </li>
                              <li className="flex items-center hover:text-yellow-400 hover:translate-x-2 transition-all duration-300 cursor-pointer group">
                                <div className="w-3 h-3 bg-white mr-3 transform rotate-45 hover:scale-125 group-hover:bg-yellow-400 transition-all duration-300 cursor-pointer"></div>
                                Spare Parts Management Service
                              </li>
                              <li className="flex items-center hover:text-yellow-400 hover:translate-x-2 transition-all duration-300 cursor-pointer group">
                                <div className="w-3 h-3 bg-white mr-3 transform rotate-45 hover:scale-125 group-hover:bg-yellow-400 transition-all duration-300 cursor-pointer"></div>
                                Fibre Due Diligence
                              </li>
                              <li className="flex items-center hover:text-yellow-400 hover:translate-x-2 transition-all duration-300 cursor-pointer group">
                                <div className="w-3 h-3 bg-white mr-3 transform rotate-45 hover:scale-125 group-hover:bg-yellow-400 transition-all duration-300 cursor-pointer"></div>
                                Network Upgrades
                              </li>
                            </ul>
                          </div>

                          {/* Data Centres Services */}
                          <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg p-6">
                            <h3 className="text-xl font-bold text-white mb-4">Data Centres</h3>
                            <ul className="space-y-2 text-white/90">
                              <li className="flex items-center hover:text-yellow-400 hover:translate-x-2 transition-all duration-300 cursor-pointer group">
                                <div className="w-3 h-3 bg-white mr-3 transform rotate-45 hover:scale-125 group-hover:bg-yellow-400 transition-all duration-300 cursor-pointer"></div>
                                Project & Programme Management
                              </li>
                              <li className="flex items-center hover:text-yellow-400 hover:translate-x-2 transition-all duration-300 cursor-pointer group">
                                <div className="w-3 h-3 bg-white mr-3 transform rotate-45 hover:scale-125 group-hover:bg-yellow-400 transition-all duration-300 cursor-pointer"></div>
                                Fibre Characterisation and Link Testing
                              </li>
                              <li className="flex items-center hover:text-yellow-400 hover:translate-x-2 transition-all duration-300 cursor-pointer group">
                                <div className="w-3 h-3 bg-white mr-3 transform rotate-45 hover:scale-125 group-hover:bg-yellow-400 transition-all duration-300 cursor-pointer"></div>
                                Data Centre Survey and Audit Services
                              </li>
                              <li className="flex items-center hover:text-yellow-400 hover:translate-x-2 transition-all duration-300 cursor-pointer group">
                                <div className="w-3 h-3 bg-white mr-3 transform rotate-45 hover:scale-125 group-hover:bg-yellow-400 transition-all duration-300 cursor-pointer"></div>
                                Data Centre Design Service
                              </li>
                              <li className="flex items-center hover:text-yellow-400 hover:translate-x-2 transition-all duration-300 cursor-pointer group">
                                <div className="w-3 h-3 bg-white mr-3 transform rotate-45 hover:scale-125 group-hover:bg-yellow-400 transition-all duration-300 cursor-pointer"></div>
                                Power and Data Cable Containment Systems
                              </li>
                              <li className="flex items-center hover:text-yellow-400 hover:translate-x-2 transition-all duration-300 cursor-pointer group">
                                <div className="w-3 h-3 bg-white mr-3 transform rotate-45 hover:scale-125 group-hover:bg-yellow-400 transition-all duration-300 cursor-pointer"></div>
                                Rack, Cabinet and PDU Installation
                              </li>
                              <li className="flex items-center hover:text-yellow-400 hover:translate-x-2 transition-all duration-300 cursor-pointer group">
                                <div className="w-3 h-3 bg-white mr-3 transform rotate-45 hover:scale-125 group-hover:bg-yellow-400 transition-all duration-300 cursor-pointer"></div>
                                Hot and Cold Aisle Containment Services
                              </li>
                              <li className="flex items-center hover:text-yellow-400 hover:translate-x-2 transition-all duration-300 cursor-pointer group">
                                <div className="w-3 h-3 bg-white mr-3 transform rotate-45 hover:scale-125 group-hover:bg-yellow-400 transition-all duration-300 cursor-pointer"></div>
                                Structured Cabling Installation and Test
                              </li>
                              <li className="flex items-center hover:text-yellow-400 hover:translate-x-2 transition-all duration-300 cursor-pointer group">
                                <div className="w-3 h-3 bg-white mr-3 transform rotate-45 hover:scale-125 group-hover:bg-yellow-400 transition-all duration-300 cursor-pointer"></div>
                                Cross Connects and Meet Me Room (MMR) services
                              </li>
                              <li className="flex items-center hover:text-yellow-400 hover:translate-x-2 transition-all duration-300 cursor-pointer group">
                                <div className="w-3 h-3 bg-white mr-3 transform rotate-45 hover:scale-125 group-hover:bg-yellow-400 transition-all duration-300 cursor-pointer"></div>
                                Equipment Racking and Stacking/Server Builds
                              </li>
                              <li className="flex items-center hover:text-yellow-400 hover:translate-x-2 transition-all duration-300 cursor-pointer group">
                                <div className="w-3 h-3 bg-white mr-3 transform rotate-45 hover:scale-125 group-hover:bg-yellow-400 transition-all duration-300 cursor-pointer"></div>
                                Circuit Patching
                              </li>
                              <li className="flex items-center hover:text-yellow-400 hover:translate-x-2 transition-all duration-300 cursor-pointer group">
                                <div className="w-3 h-3 bg-white mr-3 transform rotate-45 hover:scale-125 group-hover:bg-yellow-400 transition-all duration-300 cursor-pointer"></div>
                                Equipment Migrations and Decommissioning
                              </li>
                              <li className="flex items-center hover:text-yellow-400 hover:translate-x-2 transition-all duration-300 cursor-pointer group">
                                <div className="w-3 h-3 bg-white mr-3 transform rotate-45 hover:scale-125 group-hover:bg-yellow-400 transition-all duration-300 cursor-pointer"></div>
                                Network Monitoring
                              </li>
                              <li className="flex items-center hover:text-yellow-400 hover:translate-x-2 transition-all duration-300 cursor-pointer group">
                                <div className="w-3 h-3 bg-white mr-3 transform rotate-45 hover:scale-125 group-hover:bg-yellow-400 transition-all duration-300 cursor-pointer"></div>
                                Global Service Desk and First Line Maintenance
                              </li>
                              <li className="flex items-center hover:text-yellow-400 hover:translate-x-2 transition-all duration-300 cursor-pointer group">
                                <div className="w-3 h-3 bg-white mr-3 transform rotate-45 hover:scale-125 group-hover:bg-yellow-400 transition-all duration-300 cursor-pointer"></div>
                                Survey & Design
                              </li>
                              <li className="flex items-center hover:text-yellow-400 hover:translate-x-2 transition-all duration-300 cursor-pointer group">
                                <div className="w-3 h-3 bg-white mr-3 transform rotate-45 hover:scale-125 group-hover:bg-yellow-400 transition-all duration-300 cursor-pointer"></div>
                                Smart Hands
                              </li>
                              <li className="flex items-center hover:text-yellow-400 hover:translate-x-2 transition-all duration-300 cursor-pointer group">
                                <div className="w-3 h-3 bg-white mr-3 transform rotate-45 hover:scale-125 group-hover:bg-yellow-400 transition-all duration-300 cursor-pointer"></div>
                                Spare Parts Management Service
                              </li>
                              <li className="flex items-center hover:text-yellow-400 hover:translate-x-2 transition-all duration-300 cursor-pointer group">
                                <div className="w-3 h-3 bg-white mr-3 transform rotate-45 hover:scale-125 group-hover:bg-yellow-400 transition-all duration-300 cursor-pointer"></div>
                                Network Upgrades
                              </li>
                              <li className="flex items-center hover:text-yellow-400 hover:translate-x-2 transition-all duration-300 cursor-pointer group">
                                <div className="w-3 h-3 bg-white mr-3 transform rotate-45 hover:scale-125 group-hover:bg-yellow-400 transition-all duration-300 cursor-pointer"></div>
                                Decommissioning
                              </li>
                              <li className="flex items-center hover:text-yellow-400 hover:translate-x-2 transition-all duration-300 cursor-pointer group">
                                <div className="w-3 h-3 bg-white mr-3 transform rotate-45 hover:scale-125 group-hover:bg-yellow-400 transition-all duration-300 cursor-pointer"></div>
                                Digitisation
                              </li>
                            </ul>
                          </div>

                          {/* Network Services */}
                          <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg p-6">
                            <h3 className="text-xl font-bold text-white mb-4">Network Services</h3>
                            <ul className="space-y-2 text-white/90">
                              <li className="flex items-center hover:text-yellow-400 hover:translate-x-2 transition-all duration-300 cursor-pointer group">
                                <div className="w-3 h-3 bg-white mr-3 transform rotate-45 hover:scale-125 group-hover:bg-yellow-400 transition-all duration-300 cursor-pointer"></div>
                                Site Survey and Audit
                              </li>
                              <li className="flex items-center hover:text-yellow-400 hover:translate-x-2 transition-all duration-300 cursor-pointer group">
                                <div className="w-3 h-3 bg-white mr-3 transform rotate-45 hover:scale-125 group-hover:bg-yellow-400 transition-all duration-300 cursor-pointer"></div>
                                Logistics & Warehousing
                              </li>
                              <li className="flex items-center hover:text-yellow-400 hover:translate-x-2 transition-all duration-300 cursor-pointer group">
                                <div className="w-3 h-3 bg-white mr-3 transform rotate-45 hover:scale-125 group-hover:bg-yellow-400 transition-all duration-300 cursor-pointer"></div>
                                Project & Programme Management
                              </li>
                              <li className="flex items-center hover:text-yellow-400 hover:translate-x-2 transition-all duration-300 cursor-pointer group">
                                <div className="w-3 h-3 bg-white mr-3 transform rotate-45 hover:scale-125 group-hover:bg-yellow-400 transition-all duration-300 cursor-pointer"></div>
                                Site Access
                              </li>
                              <li className="flex items-center hover:text-yellow-400 hover:translate-x-2 transition-all duration-300 cursor-pointer group">
                                <div className="w-3 h-3 bg-white mr-3 transform rotate-45 hover:scale-125 group-hover:bg-yellow-400 transition-all duration-300 cursor-pointer"></div>
                                Active Network Equipment I&C
                              </li>
                              <li className="flex items-center hover:text-yellow-400 hover:translate-x-2 transition-all duration-300 cursor-pointer group">
                                <div className="w-3 h-3 bg-white mr-3 transform rotate-45 hover:scale-125 group-hover:bg-yellow-400 transition-all duration-300 cursor-pointer"></div>
                                Fibre Characterisation and Link Testing
                              </li>
                              <li className="flex items-center hover:text-yellow-400 hover:translate-x-2 transition-all duration-300 cursor-pointer group">
                                <div className="w-3 h-3 bg-white mr-3 transform rotate-45 hover:scale-125 group-hover:bg-yellow-400 transition-all duration-300 cursor-pointer"></div>
                                Power Supply & Installation
                              </li>
                              <li className="flex items-center hover:text-yellow-400 hover:translate-x-2 transition-all duration-300 cursor-pointer group">
                                <div className="w-3 h-3 bg-white mr-3 transform rotate-45 hover:scale-125 group-hover:bg-yellow-400 transition-all duration-300 cursor-pointer"></div>
                                Rack, Cabinet and PDU Installation
                              </li>
                              <li className="flex items-center hover:text-yellow-400 hover:translate-x-2 transition-all duration-300 cursor-pointer group">
                                <div className="w-3 h-3 bg-white mr-3 transform rotate-45 hover:scale-125 group-hover:bg-yellow-400 transition-all duration-300 cursor-pointer"></div>
                                Equipment Migrations and Decommissioning
                              </li>
                              <li className="flex items-center hover:text-yellow-400 hover:translate-x-2 transition-all duration-300 cursor-pointer group">
                                <div className="w-3 h-3 bg-white mr-3 transform rotate-45 hover:scale-125 group-hover:bg-yellow-400 transition-all duration-300 cursor-pointer"></div>
                                Card Infills, Patching and Upgrades Documentation & Testing
                              </li>
                              <li className="flex items-center hover:text-yellow-400 hover:translate-x-2 transition-all duration-300 cursor-pointer group">
                                <div className="w-3 h-3 bg-white mr-3 transform rotate-45 hover:scale-125 group-hover:bg-yellow-400 transition-all duration-300 cursor-pointer"></div>
                                Network Monitoring
                              </li>
                              <li className="flex items-center hover:text-yellow-400 hover:translate-x-2 transition-all duration-300 cursor-pointer group">
                                <div className="w-3 h-3 bg-white mr-3 transform rotate-45 hover:scale-125 group-hover:bg-yellow-400 transition-all duration-300 cursor-pointer"></div>
                                Global Service Desk and First Line Maintenance
                              </li>
                              <li className="flex items-center hover:text-yellow-400 hover:translate-x-2 transition-all duration-300 cursor-pointer group">
                                <div className="w-3 h-3 bg-white mr-3 transform rotate-45 hover:scale-125 group-hover:bg-yellow-400 transition-all duration-300 cursor-pointer"></div>
                                Spare Parts Management Service
                              </li>
                              <li className="flex items-center hover:text-yellow-400 hover:translate-x-2 transition-all duration-300 cursor-pointer group">
                                <div className="w-3 h-3 bg-white mr-3 transform rotate-45 hover:scale-125 group-hover:bg-yellow-400 transition-all duration-300 cursor-pointer"></div>
                                Preventative Maintenance
                              </li>
                            </ul>
                          </div>

                          {/* Wireless Services */}
                          <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg p-6">
                            <h3 className="text-xl font-bold text-white mb-4">Wireless</h3>
                            <ul className="space-y-2 text-white/90">
                              <li className="flex items-center hover:text-yellow-400 hover:translate-x-2 transition-all duration-300 cursor-pointer group">
                                <div className="w-3 h-3 bg-white mr-3 transform rotate-45 hover:scale-125 group-hover:bg-yellow-400 transition-all duration-300 cursor-pointer"></div>
                                Cell Site Surveys
                              </li>
                              <li className="flex items-center hover:text-yellow-400 hover:translate-x-2 transition-all duration-300 cursor-pointer group">
                                <div className="w-3 h-3 bg-white mr-3 transform rotate-45 hover:scale-125 group-hover:bg-yellow-400 transition-all duration-300 cursor-pointer"></div>
                                Cell Site Design
                              </li>
                              <li className="flex items-center hover:text-yellow-400 hover:translate-x-2 transition-all duration-300 cursor-pointer group">
                                <div className="w-3 h-3 bg-white mr-3 transform rotate-45 hover:scale-125 group-hover:bg-yellow-400 transition-all duration-300 cursor-pointer"></div>
                                Town Planning
                              </li>
                              <li className="flex items-center hover:text-yellow-400 hover:translate-x-2 transition-all duration-300 cursor-pointer group">
                                <div className="w-3 h-3 bg-white mr-3 transform rotate-45 hover:scale-125 group-hover:bg-yellow-400 transition-all duration-300 cursor-pointer"></div>
                                Passive Build
                              </li>
                              <li className="flex items-center hover:text-yellow-400 hover:translate-x-2 transition-all duration-300 cursor-pointer group">
                                <div className="w-3 h-3 bg-white mr-3 transform rotate-45 hover:scale-125 group-hover:bg-yellow-400 transition-all duration-300 cursor-pointer"></div>
                                Active Build
                              </li>
                              <li className="flex items-center hover:text-yellow-400 hover:translate-x-2 transition-all duration-300 cursor-pointer group">
                                <div className="w-3 h-3 bg-white mr-3 transform rotate-45 hover:scale-125 group-hover:bg-yellow-400 transition-all duration-300 cursor-pointer"></div>
                                Logistics and Warehousing
                              </li>
                              <li className="flex items-center hover:text-yellow-400 hover:translate-x-2 transition-all duration-300 cursor-pointer group">
                                <div className="w-3 h-3 bg-white mr-3 transform rotate-45 hover:scale-125 group-hover:bg-yellow-400 transition-all duration-300 cursor-pointer"></div>
                                Site Acceptance
                              </li>
                              <li className="flex items-center hover:text-yellow-400 hover:translate-x-2 transition-all duration-300 cursor-pointer group">
                                <div className="w-3 h-3 bg-white mr-3 transform rotate-45 hover:scale-125 group-hover:bg-yellow-400 transition-all duration-300 cursor-pointer"></div>
                                Network Integrations
                              </li>
                              <li className="flex items-center hover:text-yellow-400 hover:translate-x-2 transition-all duration-300 cursor-pointer group">
                                <div className="w-3 h-3 bg-white mr-3 transform rotate-45 hover:scale-125 group-hover:bg-yellow-400 transition-all duration-300 cursor-pointer"></div>
                                Project & Programme Management
                              </li>
                              <li className="flex items-center hover:text-yellow-400 hover:translate-x-2 transition-all duration-300 cursor-pointer group">
                                <div className="w-3 h-3 bg-white mr-3 transform rotate-45 hover:scale-125 group-hover:bg-yellow-400 transition-all duration-300 cursor-pointer"></div>
                                Site Access
                              </li>
                              <li className="flex items-center hover:text-yellow-400 hover:translate-x-2 transition-all duration-300 cursor-pointer group">
                                <div className="w-3 h-3 bg-white mr-3 transform rotate-45 hover:scale-125 group-hover:bg-yellow-400 transition-all duration-300 cursor-pointer"></div>
                                Network Optimisation
                              </li>
                              <li className="flex items-center hover:text-yellow-400 hover:translate-x-2 transition-all duration-300 cursor-pointer group">
                                <div className="w-3 h-3 bg-white mr-3 transform rotate-45 hover:scale-125 group-hover:bg-yellow-400 transition-all duration-300 cursor-pointer"></div>
                                Network Monitoring
                              </li>
                              <li className="flex items-center hover:text-yellow-400 hover:translate-x-2 transition-all duration-300 cursor-pointer group">
                                <div className="w-3 h-3 bg-white mr-3 transform rotate-45 hover:scale-125 group-hover:bg-yellow-400 transition-all duration-300 cursor-pointer"></div>
                                Operations and Maintenance
                              </li>
                              <li className="flex items-center hover:text-yellow-400 hover:translate-x-2 transition-all duration-300 cursor-pointer group">
                                <div className="w-3 h-3 bg-white mr-3 transform rotate-45 hover:scale-125 group-hover:bg-yellow-400 transition-all duration-300 cursor-pointer"></div>
                                Global Service Desk and First Line Maintenance
                              </li>
                              <li className="flex items-center hover:text-yellow-400 hover:translate-x-2 transition-all duration-300 cursor-pointer group">
                                <div className="w-3 h-3 bg-white mr-3 transform rotate-45 hover:scale-125 group-hover:bg-yellow-400 transition-all duration-300 cursor-pointer"></div>
                                Survey & Design
                              </li>
                              <li className="flex items-center hover:text-yellow-400 hover:translate-x-2 transition-all duration-300 cursor-pointer group">
                                <div className="w-3 h-3 bg-white mr-3 transform rotate-45 hover:scale-125 group-hover:bg-yellow-400 transition-all duration-300 cursor-pointer"></div>
                                Spare Parts Management Service
                              </li>
                              <li className="flex items-center hover:text-yellow-400 hover:translate-x-2 transition-all duration-300 cursor-pointer group">
                                <div className="w-3 h-3 bg-white mr-3 transform rotate-45 hover:scale-125 group-hover:bg-yellow-400 transition-all duration-300 cursor-pointer"></div>
                                Network Upgrades
                              </li>
                              <li className="flex items-center hover:text-yellow-400 hover:translate-x-2 transition-all duration-300 cursor-pointer group">
                                <div className="w-3 h-3 bg-white mr-3 transform rotate-45 hover:scale-125 group-hover:bg-yellow-400 transition-all duration-300 cursor-pointer"></div>
                                Private 5G Services
                              </li>
                              <li className="flex items-center hover:text-yellow-400 hover:translate-x-2 transition-all duration-300 cursor-pointer group">
                                <div className="w-3 h-3 bg-white mr-3 transform rotate-45 hover:scale-125 group-hover:bg-yellow-400 transition-all duration-300 cursor-pointer"></div>
                                Digitisation
                              </li>
                            </ul>
                          </div>
                        </>
                      )}

                                           {activeFilter === 'design' && (
                        <>
                          {/* Design Services - Terrestrial */}
                          <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg p-6">
                            <h3 className="text-xl font-bold text-white mb-4">Design Services - Terrestrial</h3>
                            <ul className="space-y-2 text-white/90">
                                                              <li className="flex items-center hover:text-yellow-400 hover:translate-x-2 transition-all duration-300 cursor-pointer group">
                                  <div className="w-3 h-3 bg-white mr-3 transform rotate-45 hover:scale-125 group-hover:bg-yellow-400 transition-all duration-300 cursor-pointer"></div>
                                  Active Build
                                </li>
                                <li className="flex items-center hover:text-yellow-400 hover:translate-x-2 transition-all duration-300 cursor-pointer group">
                                  <div className="w-3 h-3 bg-white mr-3 transform rotate-45 hover:scale-125 group-hover:bg-yellow-400 transition-all duration-300 cursor-pointer"></div>
                                  Fibre Survey & Design (POP)
                                </li>
                                <li className="flex items-center hover:text-yellow-400 hover:translate-x-2 transition-all duration-300 cursor-pointer group">
                                  <div className="w-3 h-3 bg-white mr-3 transform rotate-45 hover:scale-125 group-hover:bg-yellow-400 transition-all duration-300 cursor-pointer"></div>
                                  Fibre Design Desktop HLD
                                </li>
                                <li className="flex items-center hover:text-yellow-400 hover:translate-x-2 transition-all duration-300 cursor-pointer group">
                                  <div className="w-3 h-3 bg-white mr-3 transform rotate-45 hover:scale-125 group-hover:bg-yellow-400 transition-all duration-300 cursor-pointer"></div>
                                  Fibre Access LLD Services
                                </li>
                                <li className="flex items-center hover:text-yellow-400 hover:translate-x-2 transition-all duration-300 cursor-pointer group">
                                  <div className="w-3 h-3 bg-white mr-3 transform rotate-45 hover:scale-125 group-hover:bg-yellow-400 transition-all duration-300 cursor-pointer"></div>
                                  Fibre Surveying OLT
                                </li>
                                <li className="flex items-center hover:text-yellow-400 hover:translate-x-2 transition-all duration-300 cursor-pointer group">
                                  <div className="w-3 h-3 bg-white mr-3 transform rotate-45 hover:scale-125 group-hover:bg-yellow-400 transition-all duration-300 cursor-pointer"></div>
                                  Fibre Planning and Design OLT
                                </li>
                                <li className="flex items-center hover:text-yellow-400 hover:translate-x-2 transition-all duration-300 cursor-pointer group">
                                  <div className="w-3 h-3 bg-white mr-3 transform rotate-45 hover:scale-125 group-hover:bg-yellow-400 transition-all duration-300 cursor-pointer"></div>
                                  Fibre Access POP Design and Planning
                                </li>
                                <li className="flex items-center hover:text-yellow-400 hover:translate-x-2 transition-all duration-300 cursor-pointer group">
                                  <div className="w-3 h-3 bg-white mr-3 transform rotate-45 hover:scale-125 group-hover:bg-yellow-400 transition-all duration-300 cursor-pointer"></div>
                                  Wayleaving and Consenting
                                </li>
                                <li className="flex items-center hover:text-yellow-400 hover:translate-x-2 transition-all duration-300 cursor-pointer group">
                                  <div className="w-3 h-3 bg-white mr-3 transform rotate-45 hover:scale-125 group-hover:bg-yellow-400 transition-all duration-300 cursor-pointer"></div>
                                  Survey & Design
                                </li>
                                <li className="flex items-center hover:text-yellow-400 hover:translate-x-2 transition-all duration-300 cursor-pointer group">
                                  <div className="w-3 h-3 bg-white mr-3 transform rotate-45 hover:scale-125 group-hover:bg-yellow-400 transition-all duration-300 cursor-pointer"></div>
                                  Fibre Due Diligence
                                </li>
                            </ul>
                          </div>

                          {/* Design Services - Data Centres */}
                          <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg p-6">
                            <h3 className="text-xl font-bold text-white mb-4">Design Services - Data Centres</h3>
                            <ul className="space-y-2 text-white/90">
                                                              <li className="flex items-center hover:text-yellow-400 hover:translate-x-2 transition-all duration-300 cursor-pointer group">
                                  <div className="w-3 h-3 bg-white mr-3 transform rotate-45 hover:scale-125 group-hover:bg-yellow-400 transition-all duration-300 cursor-pointer"></div>
                                  Data Centre Survey and Audit Services
                                </li>
                                <li className="flex items-center hover:text-yellow-400 hover:translate-x-2 transition-all duration-300 cursor-pointer group">
                                  <div className="w-3 h-3 bg-white mr-3 transform rotate-45 hover:scale-125 group-hover:bg-yellow-400 transition-all duration-300 cursor-pointer"></div>
                                  Data Centre Design Service
                                </li>
                                <li className="flex items-center hover:text-yellow-400 hover:translate-x-2 transition-all duration-300 cursor-pointer group">
                                  <div className="w-3 h-3 bg-white mr-3 transform rotate-45 hover:scale-125 group-hover:bg-yellow-400 transition-all duration-300 cursor-pointer"></div>
                                  Survey & Design
                                </li>
                                <li className="flex items-center hover:text-yellow-400 hover:translate-x-2 transition-all duration-300 cursor-pointer group">
                                  <div className="w-3 h-3 bg-white mr-3 transform rotate-45 hover:scale-125 group-hover:bg-yellow-400 transition-all duration-300 cursor-pointer"></div>
                                  Digitisation
                                </li>
                            </ul>
                          </div>

                          {/* Design Services - Network */}
                          <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg p-6">
                            <h3 className="text-xl font-bold text-white mb-4">Design Services - Network</h3>
                            <ul className="space-y-2 text-white/90">
                                                              <li className="flex items-center hover:text-yellow-400 hover:translate-x-2 transition-all duration-300 cursor-pointer group">
                                  <div className="w-3 h-3 bg-white mr-3 transform rotate-45 hover:scale-125 group-hover:bg-yellow-400 transition-all duration-300 cursor-pointer"></div>
                                  Site Survey and Audit
                                </li>
                            </ul>
                          </div>

                          {/* Design Services - Wireless */}
                          <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg p-6">
                            <h3 className="text-xl font-bold text-white mb-4">Design Services - Wireless</h3>
                            <ul className="space-y-2 text-white/90">
                                                              <li className="flex items-center hover:text-yellow-400 hover:translate-x-2 transition-all duration-300 cursor-pointer group">
                                  <div className="w-3 h-3 bg-white mr-3 transform rotate-45 hover:scale-125 group-hover:bg-yellow-400 transition-all duration-300 cursor-pointer"></div>
                                  Cell Site Surveys
                                </li>
                                <li className="flex items-center hover:text-yellow-400 hover:translate-x-2 transition-all duration-300 cursor-pointer group">
                                  <div className="w-3 h-3 bg-white mr-3 transform rotate-45 hover:scale-125 group-hover:bg-yellow-400 transition-all duration-300 cursor-pointer"></div>
                                  Cell Site Design
                                </li>
                                <li className="flex items-center hover:text-yellow-400 hover:translate-x-2 transition-all duration-300 cursor-pointer group">
                                  <div className="w-3 h-3 bg-white mr-3 transform rotate-45 hover:scale-125 group-hover:bg-yellow-400 transition-all duration-300 cursor-pointer"></div>
                                  Town Planning
                                </li>
                                <li className="flex items-center hover:text-yellow-400 hover:translate-x-2 transition-all duration-300 cursor-pointer group">
                                  <div className="w-3 h-3 bg-white mr-3 transform rotate-45 hover:scale-125 group-hover:bg-yellow-400 transition-all duration-300 cursor-pointer"></div>
                                  Active Build
                                </li>
                                <li className="flex items-center hover:text-yellow-400 hover:translate-x-2 transition-all duration-300 cursor-pointer group">
                                  <div className="w-3 h-3 bg-white mr-3 transform rotate-45 hover:scale-125 group-hover:bg-yellow-400 transition-all duration-300 cursor-pointer"></div>
                                  Survey & Design
                                </li>
                                <li className="flex items-center hover:text-yellow-400 hover:translate-x-2 transition-all duration-300 cursor-pointer group">
                                  <div className="w-3 h-3 bg-white mr-3 transform rotate-45 hover:scale-125 group-hover:bg-yellow-400 transition-all duration-300 cursor-pointer"></div>
                                  Digitisation
                                </li>
                            </ul>
                          </div>
                        </>
                      )}

                                           {activeFilter === 'deploy' && (
                        <>
                          {/* Deploy Services - Terrestrial */}
                          <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg p-6">
                            <h3 className="text-xl font-bold text-white mb-4">Deploy Services - Terrestrial</h3>
                            <ul className="space-y-2 text-white/90">
                              <li className="flex items-center hover:text-yellow-400 hover:translate-x-2 transition-all duration-300 cursor-pointer group">
                                <div className="w-3 h-3 bg-white mr-3 transform rotate-45 hover:scale-125 group-hover:bg-yellow-400 transition-all duration-300 cursor-pointer"></div>
                                Logistics and Warehousing
                              </li>
                              <li className="flex items-center hover:text-yellow-400 hover:translate-x-2 transition-all duration-300 cursor-pointer group">
                                <div className="w-3 h-3 bg-white mr-3 transform rotate-45 hover:scale-125 group-hover:bg-yellow-400 transition-all duration-300 cursor-pointer"></div>
                                Project & Programme Management
                              </li>
                              <li className="flex items-center hover:text-yellow-400 hover:translate-x-2 transition-all duration-300 cursor-pointer group">
                                <div className="w-3 h-3 bg-white mr-3 transform rotate-45 hover:scale-125 group-hover:bg-yellow-400 transition-all duration-300 cursor-pointer"></div>
                                Wayleaving and Consenting
                              </li>
                            </ul>
                          </div>

                          {/* Deploy Services - Data Centres */}
                          <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg p-6">
                            <h3 className="text-xl font-bold text-white mb-4">Deploy Services - Data Centres</h3>
                            <ul className="space-y-2 text-white/90">
                              <li className="flex items-center hover:text-yellow-400 hover:translate-x-2 transition-all duration-300 cursor-pointer group">
                                <div className="w-3 h-3 bg-white mr-3 transform rotate-45 hover:scale-125 group-hover:bg-yellow-400 transition-all duration-300 cursor-pointer"></div>
                                Project & Programme Management
                              </li>
                              <li className="flex items-center hover:text-yellow-400 hover:translate-x-2 transition-all duration-300 cursor-pointer group">
                                <div className="w-3 h-3 bg-white mr-3 transform rotate-45 hover:scale-125 group-hover:bg-yellow-400 transition-all duration-300 cursor-pointer"></div>
                                Fibre Characterisation and Link Testing
                              </li>
                              <li className="flex items-center hover:text-yellow-400 hover:translate-x-2 transition-all duration-300 cursor-pointer group">
                                <div className="w-3 h-3 bg-white mr-3 transform rotate-45 hover:scale-125 group-hover:bg-yellow-400 transition-all duration-300 cursor-pointer"></div>
                                Power and Data Cable Containment Systems
                              </li>
                              <li className="flex items-center hover:text-yellow-400 hover:translate-x-2 transition-all duration-300 cursor-pointer group">
                                <div className="w-3 h-3 bg-white mr-3 transform rotate-45 hover:scale-125 group-hover:bg-yellow-400 transition-all duration-300 cursor-pointer"></div>
                                Rack, Cabinet and PDU Installation
                              </li>
                              <li className="flex items-center hover:text-yellow-400 hover:translate-x-2 transition-all duration-300 cursor-pointer group">
                                <div className="w-3 h-3 bg-white mr-3 transform rotate-45 hover:scale-125 group-hover:bg-yellow-400 transition-all duration-300 cursor-pointer"></div>
                                Hot and Cold Aisle Containment Services
                              </li>
                              <li className="flex items-center hover:text-yellow-400 hover:translate-x-2 transition-all duration-300 cursor-pointer group">
                                <div className="w-3 h-3 bg-white mr-3 transform rotate-45 hover:scale-125 group-hover:bg-yellow-400 transition-all duration-300 cursor-pointer"></div>
                                Structured Cabling Installation and Test
                              </li>
                              <li className="flex items-center hover:text-yellow-400 hover:translate-x-2 transition-all duration-300 cursor-pointer group">
                                <div className="w-3 h-3 bg-white mr-3 transform rotate-45 hover:scale-125 group-hover:bg-yellow-400 transition-all duration-300 cursor-pointer"></div>
                                Cross Connects and Meet Me Room (MMR) services
                              </li>
                              <li className="flex items-center hover:text-yellow-400 hover:translate-x-2 transition-all duration-300 cursor-pointer group">
                                <div className="w-3 h-3 bg-white mr-3 transform rotate-45 hover:scale-125 group-hover:bg-yellow-400 transition-all duration-300 cursor-pointer"></div>
                                Equipment Racking and Stacking/Server Builds
                              </li>
                              <li className="flex items-center hover:text-yellow-400 hover:translate-x-2 transition-all duration-300 cursor-pointer group">
                                <div className="w-3 h-3 bg-white mr-3 transform rotate-45 hover:scale-125 group-hover:bg-yellow-400 transition-all duration-300 cursor-pointer"></div>
                                Circuit Patching
                              </li>
                              <li className="flex items-center hover:text-yellow-400 hover:translate-x-2 transition-all duration-300 cursor-pointer group">
                                <div className="w-3 h-3 bg-white mr-3 transform rotate-45 hover:scale-125 group-hover:bg-yellow-400 transition-all duration-300 cursor-pointer"></div>
                                Equipment Migrations and Decommissioning
                              </li>
                              <li className="flex items-center hover:text-yellow-400 hover:translate-x-2 transition-all duration-300 cursor-pointer group">
                                <div className="w-3 h-3 bg-white mr-3 transform rotate-45 hover:scale-125 group-hover:bg-yellow-400 transition-all duration-300 cursor-pointer"></div>
                                Decommissioning
                              </li>
                              <li className="flex items-center hover:text-yellow-400 hover:translate-x-2 transition-all duration-300 cursor-pointer group">
                                <div className="w-3 h-3 bg-white mr-3 transform rotate-45 hover:scale-125 group-hover:bg-yellow-400 transition-all duration-300 cursor-pointer"></div>
                                Digitisation
                              </li>
                            </ul>
                          </div>

                          {/* Deploy Services - Network */}
                          <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg p-6">
                            <h3 className="text-xl font-bold text-white mb-4">Deploy Services - Network</h3>
                            <ul className="space-y-2 text-white/90">
                              <li className="flex items-center hover:text-yellow-400 hover:translate-x-2 transition-all duration-300 cursor-pointer group">
                                <div className="w-3 h-3 bg-white mr-3 transform rotate-45 hover:scale-125 group-hover:bg-yellow-400 transition-all duration-300 cursor-pointer"></div>
                                Logistics and Warehousing
                              </li>
                              <li className="flex items-center hover:text-yellow-400 hover:translate-x-2 transition-all duration-300 cursor-pointer group">
                                <div className="w-3 h-3 bg-white mr-3 transform rotate-45 hover:scale-125 group-hover:bg-yellow-400 transition-all duration-300 cursor-pointer"></div>
                                Project & Programme Management
                              </li>
                              <li className="flex items-center hover:text-yellow-400 hover:translate-x-2 transition-all duration-300 cursor-pointer group">
                                <div className="w-3 h-3 bg-white mr-3 transform rotate-45 hover:scale-125 group-hover:bg-yellow-400 transition-all duration-300 cursor-pointer"></div>
                                Site Access
                              </li>
                              <li className="flex items-center hover:text-yellow-400 hover:translate-x-2 transition-all duration-300 cursor-pointer group">
                                <div className="w-3 h-3 bg-white mr-3 transform rotate-45 hover:scale-125 group-hover:bg-yellow-400 transition-all duration-300 cursor-pointer"></div>
                                Active Network Equipment I&C
                              </li>
                              <li className="flex items-center hover:text-yellow-400 hover:translate-x-2 transition-all duration-300 cursor-pointer group">
                                <div className="w-3 h-3 bg-white mr-3 transform rotate-45 hover:scale-125 group-hover:bg-yellow-400 transition-all duration-300 cursor-pointer"></div>
                                Fibre Characterisation and Link Testing
                              </li>
                              <li className="flex items-center hover:text-yellow-400 hover:translate-x-2 transition-all duration-300 cursor-pointer group">
                                <div className="w-3 h-3 bg-white mr-3 transform rotate-45 hover:scale-125 group-hover:bg-yellow-400 transition-all duration-300 cursor-pointer"></div>
                                Power Supply & Installation
                              </li>
                              <li className="flex items-center hover:text-yellow-400 hover:translate-x-2 transition-all duration-300 cursor-pointer group">
                                <div className="w-3 h-3 bg-white mr-3 transform rotate-45 hover:scale-125 group-hover:bg-yellow-400 transition-all duration-300 cursor-pointer"></div>
                                Rack, Cabinet and PDU Installation
                              </li>
                              <li className="flex items-center hover:text-yellow-400 hover:translate-x-2 transition-all duration-300 cursor-pointer group">
                                <div className="w-3 h-3 bg-white mr-3 transform rotate-45 hover:scale-125 group-hover:bg-yellow-400 transition-all duration-300 cursor-pointer"></div>
                                Equipment Migrations and Decommissioning
                              </li>
                              <li className="flex items-center hover:text-yellow-400 hover:translate-x-2 transition-all duration-300 cursor-pointer group">
                                <div className="w-3 h-3 bg-white mr-3 transform rotate-45 hover:scale-125 group-hover:bg-yellow-400 transition-all duration-300 cursor-pointer"></div>
                                Card Infills, Patching and Upgrades Documentation & Testing
                              </li>
                            </ul>
                          </div>

                          {/* Deploy Services - Wireless */}
                          <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg p-6">
                            <h3 className="text-xl font-bold text-white mb-4">Deploy Services - Wireless</h3>
                            <ul className="space-y-2 text-white/90">
                              <li className="flex items-center hover:text-yellow-400 hover:translate-x-2 transition-all duration-300 cursor-pointer group">
                                <div className="w-3 h-3 bg-white mr-3 transform rotate-45 hover:scale-125 group-hover:bg-yellow-400 transition-all duration-300 cursor-pointer"></div>
                                Passive Build
                              </li>
                              <li className="flex items-center hover:text-yellow-400 hover:translate-x-2 transition-all duration-300 cursor-pointer group">
                                <div className="w-3 h-3 bg-white mr-3 transform rotate-45 hover:scale-125 group-hover:bg-yellow-400 transition-all duration-300 cursor-pointer"></div>
                                Logistics and Warehousing
                              </li>
                              <li className="flex items-center hover:text-yellow-400 hover:translate-x-2 transition-all duration-300 cursor-pointer group">
                                <div className="w-3 h-3 bg-white mr-3 transform rotate-45 hover:scale-125 group-hover:bg-yellow-400 transition-all duration-300 cursor-pointer"></div>
                                Site Acceptance
                              </li>
                              <li className="flex items-center hover:text-yellow-400 hover:translate-x-2 transition-all duration-300 cursor-pointer group">
                                <div className="w-3 h-3 bg-white mr-3 transform rotate-45 hover:scale-125 group-hover:bg-yellow-400 transition-all duration-300 cursor-pointer"></div>
                                Project & Programme Management
                              </li>
                              <li className="flex items-center hover:text-yellow-400 hover:translate-x-2 transition-all duration-300 cursor-pointer group">
                                <div className="w-3 h-3 bg-white mr-3 transform rotate-45 hover:scale-125 group-hover:bg-yellow-400 transition-all duration-300 cursor-pointer"></div>
                                Site Access
                              </li>
                              <li className="flex items-center hover:text-yellow-400 hover:translate-x-2 transition-all duration-300 cursor-pointer group">
                                <div className="w-3 h-3 bg-white mr-3 transform rotate-45 hover:scale-125 group-hover:bg-yellow-400 transition-all duration-300 cursor-pointer"></div>
                                Digitisation
                              </li>
                            </ul>
                          </div>
                        </>
                      )}

                                           {activeFilter === 'support' && (
                        <>
                          {/* Support Services - Terrestrial */}
                          <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg p-6">
                            <h3 className="text-xl font-bold text-white mb-4">Support Services - Terrestrial</h3>
                            <ul className="space-y-2 text-white/90">
                              <li className="flex items-center hover:text-yellow-400 hover:translate-x-2 transition-all duration-300 cursor-pointer group">
                                <div className="w-3 h-3 bg-white mr-3 transform rotate-45 hover:scale-125 group-hover:bg-yellow-400 transition-all duration-300 cursor-pointer"></div>
                                Network Monitoring
                              </li>
                              <li className="flex items-center hover:text-yellow-400 hover:translate-x-2 transition-all duration-300 cursor-pointer group">
                                <div className="w-3 h-3 bg-white mr-3 transform rotate-45 hover:scale-125 group-hover:bg-yellow-400 transition-all duration-300 cursor-pointer"></div>
                                Operations and Maintenance
                              </li>
                              <li className="flex items-center hover:text-yellow-400 hover:translate-x-2 transition-all duration-300 cursor-pointer group">
                                <div className="w-3 h-3 bg-white mr-3 transform rotate-45 hover:scale-125 group-hover:bg-yellow-400 transition-all duration-300 cursor-pointer"></div>
                                Global Service Desk and First Line Maintenance
                              </li>
                              <li className="flex items-center hover:text-yellow-400 hover:translate-x-2 transition-all duration-300 cursor-pointer group">
                                <div className="w-3 h-3 bg-white mr-3 transform rotate-45 hover:scale-125 group-hover:bg-yellow-400 transition-all duration-300 cursor-pointer"></div>
                                Spare Parts Management Service
                              </li>
                              <li className="flex items-center hover:text-yellow-400 hover:translate-x-2 transition-all duration-300 cursor-pointer group">
                                <div className="w-3 h-3 bg-white mr-3 transform rotate-45 hover:scale-125 group-hover:bg-yellow-400 transition-all duration-300 cursor-pointer"></div>
                                Fibre Due Diligence
                              </li>
                              <li className="flex items-center hover:text-yellow-400 hover:translate-x-2 transition-all duration-300 cursor-pointer group">
                                <div className="w-3 h-3 bg-white mr-3 transform rotate-45 hover:scale-125 group-hover:bg-yellow-400 transition-all duration-300 cursor-pointer"></div>
                                Network Upgrades
                              </li>
                            </ul>
                          </div>

                          {/* Support Services - Data Centres */}
                          <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg p-6">
                            <h3 className="text-xl font-bold text-white mb-4">Support Services - Data Centres</h3>
                            <ul className="space-y-2 text-white/90">
                              <li className="flex items-center hover:text-yellow-400 hover:translate-x-2 transition-all duration-300 cursor-pointer group">
                                <div className="w-3 h-3 bg-white mr-3 transform rotate-45 hover:scale-125 group-hover:bg-yellow-400 transition-all duration-300 cursor-pointer"></div>
                                Network Monitoring
                              </li>
                              <li className="flex items-center hover:text-yellow-400 hover:translate-x-2 transition-all duration-300 cursor-pointer group">
                                <div className="w-3 h-3 bg-white mr-3 transform rotate-45 hover:scale-125 group-hover:bg-yellow-400 transition-all duration-300 cursor-pointer"></div>
                                Global Service Desk and First Line Maintenance
                              </li>
                              <li className="flex items-center hover:text-yellow-400 hover:translate-x-2 transition-all duration-300 cursor-pointer group">
                                <div className="w-3 h-3 bg-white mr-3 transform rotate-45 hover:scale-125 group-hover:bg-yellow-400 transition-all duration-300 cursor-pointer"></div>
                                Smart Hands
                              </li>
                              <li className="flex items-center hover:text-yellow-400 hover:translate-x-2 transition-all duration-300 cursor-pointer group">
                                <div className="w-3 h-3 bg-white mr-3 transform rotate-45 hover:scale-125 group-hover:bg-yellow-400 transition-all duration-300 cursor-pointer"></div>
                                Spare Parts Management Service
                              </li>
                              <li className="flex items-center hover:text-yellow-400 hover:translate-x-2 transition-all duration-300 cursor-pointer group">
                                <div className="w-3 h-3 bg-white mr-3 transform rotate-45 hover:scale-125 group-hover:bg-yellow-400 transition-all duration-300 cursor-pointer"></div>
                                Network Upgrades
                              </li>
                              <li className="flex items-center hover:text-yellow-400 hover:translate-x-2 transition-all duration-300 cursor-pointer group">
                                <div className="w-3 h-3 bg-white mr-3 transform rotate-45 hover:scale-125 group-hover:bg-yellow-400 transition-all duration-300 cursor-pointer"></div>
                                Decommissioning
                              </li>
                              <li className="flex items-center hover:text-yellow-400 hover:translate-x-2 transition-all duration-300 cursor-pointer group">
                                <div className="w-3 h-3 bg-white mr-3 transform rotate-45 hover:scale-125 group-hover:bg-yellow-400 transition-all duration-300 cursor-pointer"></div>
                                Digitisation
                              </li>
                            </ul>
                          </div>

                          {/* Support Services - Network */}
                          <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg p-6">
                            <h3 className="text-xl font-bold text-white mb-4">Support Services - Network</h3>
                            <ul className="space-y-2 text-white/90">
                              <li className="flex items-center hover:text-yellow-400 hover:translate-x-2 transition-all duration-300 cursor-pointer group">
                                <div className="w-3 h-3 bg-white mr-3 transform rotate-45 hover:scale-125 group-hover:bg-yellow-400 transition-all duration-300 cursor-pointer"></div>
                                Site Access
                              </li>
                              <li className="flex items-center hover:text-yellow-400 hover:translate-x-2 transition-all duration-300 cursor-pointer group">
                                <div className="w-3 h-3 bg-white mr-3 transform rotate-45 hover:scale-125 group-hover:bg-yellow-400 transition-all duration-300 cursor-pointer"></div>
                                Network Monitoring
                              </li>
                              <li className="flex items-center hover:text-yellow-400 hover:translate-x-2 transition-all duration-300 cursor-pointer group">
                                <div className="w-3 h-3 bg-white mr-3 transform rotate-45 hover:scale-125 group-hover:bg-yellow-400 transition-all duration-300 cursor-pointer"></div>
                                Global Service Desk and First Line Maintenance
                              </li>
                              <li className="flex items-center hover:text-yellow-400 hover:translate-x-2 transition-all duration-300 cursor-pointer group">
                                <div className="w-3 h-3 bg-white mr-3 transform rotate-45 hover:scale-125 group-hover:bg-yellow-400 transition-all duration-300 cursor-pointer"></div>
                                Spare Parts Management Service
                              </li>
                              <li className="flex items-center hover:text-yellow-400 hover:translate-x-2 transition-all duration-300 cursor-pointer group">
                                <div className="w-3 h-3 bg-white mr-3 transform rotate-45 hover:scale-125 group-hover:bg-yellow-400 transition-all duration-300 cursor-pointer"></div>
                                Preventative Maintenance
                              </li>
                            </ul>
                          </div>

                          {/* Support Services - Wireless */}
                          <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg p-6">
                            <h3 className="text-xl font-bold text-white mb-4">Support Services - Wireless</h3>
                            <ul className="space-y-2 text-white/90">
                              <li className="flex items-center hover:text-yellow-400 hover:translate-x-2 transition-all duration-300 cursor-pointer group">
                                <div className="w-3 h-3 bg-white mr-3 transform rotate-45 hover:scale-125 group-hover:bg-yellow-400 transition-all duration-300 cursor-pointer"></div>
                                Network Integrations
                              </li>
                              <li className="flex items-center hover:text-yellow-400 hover:translate-x-2 transition-all duration-300 cursor-pointer group">
                                <div className="w-3 h-3 bg-white mr-3 transform rotate-45 hover:scale-125 group-hover:bg-yellow-400 transition-all duration-300 cursor-pointer"></div>
                                Site Access
                              </li>
                              <li className="flex items-center hover:text-yellow-400 hover:translate-x-2 transition-all duration-300 cursor-pointer group">
                                <div className="w-3 h-3 bg-white mr-3 transform rotate-45 hover:scale-125 group-hover:bg-yellow-400 transition-all duration-300 cursor-pointer"></div>
                                Network Optimisation
                              </li>
                              <li className="flex items-center hover:text-yellow-400 hover:translate-x-2 transition-all duration-300 cursor-pointer group">
                                <div className="w-3 h-3 bg-white mr-3 transform rotate-45 hover:scale-125 group-hover:bg-yellow-400 transition-all duration-300 cursor-pointer"></div>
                                Network Monitoring
                              </li>
                              <li className="flex items-center hover:text-yellow-400 hover:translate-x-2 transition-all duration-300 cursor-pointer group">
                                <div className="w-3 h-3 bg-white mr-3 transform rotate-45 hover:scale-125 group-hover:bg-yellow-400 transition-all duration-300 cursor-pointer"></div>
                                Operations and Maintenance
                              </li>
                              <li className="flex items-center hover:text-yellow-400 hover:translate-x-2 transition-all duration-300 cursor-pointer group">
                                <div className="w-3 h-3 bg-white mr-3 transform rotate-45 hover:scale-125 group-hover:bg-yellow-400 transition-all duration-300 cursor-pointer"></div>
                                Global Service Desk and First Line Maintenance
                              </li>
                              <li className="flex items-center hover:text-yellow-400 hover:translate-x-2 transition-all duration-300 cursor-pointer group">
                                <div className="w-3 h-3 bg-white mr-3 transform rotate-45 hover:scale-125 group-hover:bg-yellow-400 transition-all duration-300 cursor-pointer"></div>
                                Spare Parts Management Service
                              </li>
                              <li className="flex items-center hover:text-yellow-400 hover:translate-x-2 transition-all duration-300 cursor-pointer group">
                                <div className="w-3 h-3 bg-white mr-3 transform rotate-45 hover:scale-125 group-hover:bg-yellow-400 transition-all duration-300 cursor-pointer"></div>
                                Network Upgrades
                              </li>
                              <li className="flex items-center hover:text-yellow-400 hover:translate-x-2 transition-all duration-300 cursor-pointer group">
                                <div className="w-3 h-3 bg-white mr-3 transform rotate-45 hover:scale-125 group-hover:bg-yellow-400 transition-all duration-300 cursor-pointer"></div>
                                Digitisation
                              </li>
                            </ul>
                          </div>
                        </>
                      )}
                   </div>
                 </div>
              </div>
            </div>
          </div>
        </section>

            {/* Innovation Solutions Section */}
      <section className="py-24 relative overflow-hidden">
        {/* Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-fixed"
          style={{ backgroundImage: 'url("/ebook/ebookbg.png")' }}
        />
        {/* Dark overlay for better text readability */}
        <div className="absolute inset-0 bg-black/70" />
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16" ref={advancedServicesHeaderRef}>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-orange-400 to-yellow-400 bg-clip-text text-transparent text-center">
              ADVANCED SERVICES
            </h2>
            <BlurText 
              text="Discover our cutting-edge technology solutions that drive digital transformation and infrastructure excellence."
              animateBy="words"
              direction="bottom"
              delay={100}
              className="text-xl text-white/80 max-w-3xl mx-auto text-center"
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-7xl mx-auto" ref={advancedServicesGridRef}>
            {/* Fixed Line Card */}
            <div className="group relative h-[400px] overflow-hidden bg-white rounded-3xl shadow-2xl border-0 hover:shadow-3xl transition-all duration-300 hover:-translate-y-2">
              <div
                style={{
                  backgroundImage: 'url("/services/img-4.jpg")',
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
                className="absolute inset-0 z-0 transition-transform duration-300 group-hover:scale-105"
              ></div>
              
              {/* Gradient Overlay */}
              <div className="absolute inset-0 z-10 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
              
              {/* Content */}
              <div className="absolute inset-0 z-20 flex flex-col justify-end p-8">
                <h3 className="text-3xl font-bold text-white mb-4">
                  Fixed Line
                </h3>
                <p className="text-white/90 text-lg mb-6 max-w-md">
                  Expert end-to-end connections from pre-planning to upgrades
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex flex-col gap-2">
                    <span className="text-sm text-orange-300 uppercase tracking-wide font-semibold">
                      End-to-End
                    </span>
                    <span className="text-sm text-yellow-200">
                      Solutions
                    </span>
                  </div>
                  <button className="px-6 py-3 rounded-full bg-gradient-to-r from-orange-400 to-yellow-400 text-black text-sm font-semibold hover:from-orange-300 hover:to-yellow-300 transition-all duration-200 shadow-lg hover:shadow-xl">
                    Learn More
                  </button>
                </div>
              </div>
            </div>

            {/* Subsea Card */}
            <div className="group relative h-[400px] overflow-hidden bg-white rounded-3xl shadow-2xl border-0 hover:shadow-3xl transition-all duration-300 hover:-translate-y-2">
              <div
                style={{
                  backgroundImage: 'url("/services/img-5.jpg")',
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
                className="absolute inset-0 z-0 transition-transform duration-300 group-hover:scale-105"
              ></div>
              
              {/* Gradient Overlay */}
              <div className="absolute inset-0 z-10 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
              
              {/* Content */}
              <div className="absolute inset-0 z-20 flex flex-col justify-end p-8">
                <h3 className="text-3xl font-bold text-white mb-4">
                  Subsea
                </h3>
                <p className="text-white/90 text-lg mb-6 max-w-md">
                  Systems Operator Support for Submarine Networks
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex flex-col gap-2">
                    <span className="text-sm text-orange-300 uppercase tracking-wide font-semibold">
                      Submarine
                    </span>
                    <span className="text-sm text-yellow-200">
                      Networks
                    </span>
                  </div>
                  <button className="px-6 py-3 rounded-full bg-gradient-to-r from-orange-400 to-yellow-400 text-black text-sm font-semibold hover:from-orange-300 hover:to-yellow-300 transition-all duration-200 shadow-lg hover:shadow-xl">
                    Learn More
                  </button>
                </div>
              </div>
            </div>

            {/* Data Centres Card */}
            <div className="group relative h-[400px] overflow-hidden bg-white rounded-3xl shadow-2xl border-0 hover:shadow-3xl transition-all duration-300 hover:-translate-y-2">
              <div
                style={{
                  backgroundImage: 'url("/services/img-6.jpg")',
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
                className="absolute inset-0 z-0 transition-transform duration-300 group-hover:scale-105"
              ></div>
              
              {/* Gradient Overlay */}
              <div className="absolute inset-0 z-10 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
              
              {/* Content */}
              <div className="absolute inset-0 z-20 flex flex-col justify-end p-8">
                <h3 className="text-3xl font-bold text-white mb-4">
                  Data Centres
                </h3>
                <p className="text-white/90 text-lg mb-6 max-w-md">
                  Comprehensive solutions for leading edge and legacy infrastructure
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex flex-col gap-2">
                    <span className="text-sm text-orange-300 uppercase tracking-wide font-semibold">
                      Leading Edge
                    </span>
                    <span className="text-sm text-yellow-200">
                      Infrastructure
                    </span>
                  </div>
                  <button className="px-6 py-3 rounded-full bg-gradient-to-r from-orange-400 to-yellow-400 text-black text-sm font-semibold hover:from-orange-300 hover:to-yellow-300 transition-all duration-200 shadow-lg hover:shadow-xl">
                    Learn More
                  </button>
                </div>
              </div>
            </div>

            {/* Wireless Card */}
            <div className="group relative h-[400px] overflow-hidden bg-white rounded-3xl shadow-2xl border-0 hover:shadow-3xl transition-all duration-300 hover:-translate-y-2">
              <div
                style={{
                  backgroundImage: 'url("/services/img-7.jpg")',
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
                className="absolute inset-0 z-0 transition-transform duration-300 group-hover:scale-105"
              ></div>
              
              {/* Gradient Overlay */}
              <div className="absolute inset-0 z-10 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
              
              {/* Content */}
              <div className="absolute inset-0 z-20 flex flex-col justify-end p-8">
                <h3 className="text-3xl font-bold text-white mb-4">
                  Wireless
                </h3>
                <p className="text-white/90 text-lg mb-6 max-w-md">
                  Resilient and reliable wireless services for next-generation networks
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex flex-col gap-2">
                    <span className="text-sm text-orange-300 uppercase tracking-wide font-semibold">
                      Next-Gen
                    </span>
                    <span className="text-sm text-yellow-200">
                      Networks
                    </span>
                  </div>
                  <button className="px-6 py-3 rounded-full bg-gradient-to-r from-orange-400 to-yellow-400 text-black text-sm font-semibold hover:from-orange-300 hover:to-yellow-300 transition-all duration-200 shadow-lg hover:shadow-xl">
                    Learn More
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section (standard block, fixed bg image) */}
      <section className="relative py-24 flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-fixed"
          style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1920&q=80")' }}
        />
        <div className="absolute inset-0 bg-black/60" />
        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center text-white">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-orange-400 to-yellow-400 bg-clip-text text-transparent">
            Want to know more?
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Let&apos;s discuss how our services can help transform your business and drive growth.
          </p>
          <div className="flex justify-center">
            <button className="bg-gradient-to-r from-orange-400 to-yellow-400 text-black px-8 py-4 rounded-lg font-semibold text-lg hover:from-orange-300 hover:to-yellow-300 transition-all duration-300 transform hover:scale-105">
              Get in Touch with Indigo
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

// Enable scroll-based pinning for overlap effect
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}
