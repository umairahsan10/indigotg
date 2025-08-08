'use client';

import React, { useEffect, useRef, useState, useCallback, useMemo } from 'react';
import HaloBackground from '../components/VantaBackground';

interface Slide {
  id: number;
  imageSrc: string;
  title: string;
  url: string;
  description: string;
  buttonText: string;
}

const DigitalCarousel: React.FC = () => {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isInView, setIsInView] = useState(false);

  // Refs
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const animationFrameRef = useRef<number | undefined>(undefined);
  const lastWheelTime = useRef(0);
  const [slideRowHeight, setSlideRowHeight] = useState<number>(144);

  // Slides (use images from public/services)
  const slides: Slide[] = useMemo(() => [
    {
      id: 1,
      imageSrc: '/services/img-1.jpg',
      title: 'Design',
      url: '/services/design',
      description:
        'Transform your vision into stunning digital experiences with our cutting-edge design solutions.',
      buttonText: 'Explore Design',
    },
    {
      id: 2,
      imageSrc: '/services/img-2.jpg',
      title: 'Deploy',
      url: '/services/deploy',
      description:
        'Seamlessly launch and scale your applications with our robust deployment infrastructure.',
      buttonText: 'Start Deployment',
    },
    {
      id: 3,
      imageSrc: '/services/img-3.jpg',
      title: 'Support',
      url: '/services/support',
      description:
        'Get 24/7 expert support and maintenance to keep your systems running smoothly.',
      buttonText: 'Get Support',
    },
  ], []);

  // Animation utilities
  const easeInOutCubic = (t: number): number => {
    return t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;
  };

  const animate = useCallback(
    (
      element: HTMLElement | SVGElement,
      properties: Record<string, { from: number; to: number; unit?: string }>,
      duration: number = 1000,
      onComplete?: () => void,
    ) => {
      const startTime = Date.now();
      const animateStep = () => {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const easedProgress = easeInOutCubic(progress);

        Object.entries(properties).forEach(([prop, { from, to, unit = '' }]) => {
          const value = from + (to - from) * easedProgress;
          if (prop === 'transform' && element instanceof HTMLElement) {
            element.style.transform = `translateY(${value}${unit})`;
          } else if (element instanceof HTMLElement) {
            (element.style as any)[prop] = `${value}${unit}`;
          }
        });

        if (progress < 1) {
          animationFrameRef.current = requestAnimationFrame(animateStep);
        } else {
          onComplete?.();
        }
      };

      animateStep();
    },
    [],
  );

  // Title animation
  const animateTitle = useCallback(() => {
    if (!titleRef.current || typeof window === 'undefined') return;
    const titleElement = titleRef.current;
    const targetY = -currentSlideIndex * slideRowHeight;
    const currentY = parseFloat(titleElement.style.transform.replace(/[^\d.-]/g, '') || '0');
    animate(titleElement, { transform: { from: currentY, to: targetY, unit: 'px' } }, 800);
  }, [currentSlideIndex, animate, slideRowHeight]);

  // Slide transition
  const transitionToSlide = useCallback(
    (newIndex: number) => {
      if (isAnimating || newIndex === currentSlideIndex) return;
      setIsAnimating(true);
      setCurrentSlideIndex(newIndex);
      animateTitle();
      setTimeout(() => setIsAnimating(false), 800);
    },
    [currentSlideIndex, isAnimating, animateTitle],
  );

  // Navigation functions
  const goToNextSlide = useCallback(() => {
    if (currentSlideIndex < slides.length - 1) {
      transitionToSlide(currentSlideIndex + 1);
    }
  }, [currentSlideIndex, slides.length, transitionToSlide]);

  const goToPrevSlide = useCallback(() => {
    if (currentSlideIndex > 0) {
      transitionToSlide(currentSlideIndex - 1);
    }
  }, [currentSlideIndex, transitionToSlide]);

  const goToSlide = useCallback(
    (index: number) => {
      if (index >= 0 && index < slides.length && index !== currentSlideIndex) {
        transitionToSlide(index);
      }
    },
    [currentSlideIndex, slides.length, transitionToSlide],
  );

  // Wheel handler for slide navigation when in view
  const handleWheel = useCallback(
    (e: WheelEvent) => {
      if (!isInView || isAnimating) return;

      const now = Date.now();
      if (now - lastWheelTime.current < 600) return;
      lastWheelTime.current = now;

      e.preventDefault();
      e.stopPropagation();

      if (e.deltaY > 0) {
        goToNextSlide();
      } else {
        goToPrevSlide();
      }
    },
    [isInView, isAnimating, goToNextSlide, goToPrevSlide],
  );

  // Keyboard navigation
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (!isInView || isAnimating) return;
      
      switch (e.key) {
        case 'ArrowUp':
        case 'ArrowLeft':
          e.preventDefault();
          goToPrevSlide();
          break;
        case 'ArrowDown':
        case 'ArrowRight':
          e.preventDefault();
          goToNextSlide();
          break;
        case ' ':
          e.preventDefault();
          goToNextSlide();
          break;
        default:
          if (e.key >= '1' && e.key <= '3') {
            const index = parseInt(e.key) - 1;
            if (index < slides.length) goToSlide(index);
          }
      }
    },
    [isInView, isAnimating, goToNextSlide, goToPrevSlide, goToSlide, slides.length],
  );

  // Auto-play functionality
  const [isAutoPlaying, setIsAutoPlaying] = useState(false);
  useEffect(() => {
    if (!isAutoPlaying || !isInView) return;
    const interval = setInterval(() => {
      if (!isAnimating) {
        if (currentSlideIndex < slides.length - 1) {
          goToNextSlide();
        } else {
          goToSlide(0);
        }
      }
    }, 4000);
    return () => clearInterval(interval);
  }, [isAutoPlaying, isInView, isAnimating, goToNextSlide, goToSlide, currentSlideIndex, slides.length]);

  // Intersection Observer for viewport detection
  useEffect(() => {
    if (!containerRef.current || typeof window === 'undefined') return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setIsInView(entry.isIntersecting);
        });
      },
      {
        threshold: 0.8, // 80% of the carousel must be visible
        rootMargin: '0px'
      }
    );

    observer.observe(containerRef.current);

    return () => {
      observer.disconnect();
    };
  }, []);

  // Event listeners
  useEffect(() => {
    if (typeof window === 'undefined') return;

    window.addEventListener('wheel', handleWheel, { passive: false });
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('keydown', handleKeyDown);
      if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
    };
  }, [handleWheel, handleKeyDown]);

  // Compute slide row height and update on resize
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const compute = () => {
      const w = window.innerWidth;
      setSlideRowHeight(w < 768 ? 96 : w < 1024 ? 128 : 144);
    };
    compute();
    window.addEventListener('resize', compute);
    return () => window.removeEventListener('resize', compute);
  }, []);

  // Preload images
  useEffect(() => {
    const preloadImages = async () => {
      try {
        await Promise.all(
          slides.map(slide => {
            return new Promise((resolve, reject) => {
              const img = new Image();
              img.onload = resolve;
              img.onerror = reject;
              img.src = slide.imageSrc;
            });
          })
        );
        setIsLoading(false);
      } catch (err) {
        setError('Failed to load some images');
        setIsLoading(false);
      }
    };
    preloadImages();
  }, [slides]);

  const currentSlide = slides[currentSlideIndex];

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-900 text-white">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Error Loading Carousel</h2>
          <p>{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className="relative w-full h-screen overflow-hidden bg-black select-none"
      role="region"
      aria-label="Image carousel"
      tabIndex={0}
    >
      {/* Loading overlay */}
      {isLoading && (
        <div className="absolute inset-0 bg-black z-50 flex items-center justify-center">
          <div className="w-16 h-16 border-4 border-orange-400 border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}

      {/* Background slides */}
      <div className="absolute inset-0">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-1000 ${index === currentSlideIndex ? 'opacity-100' : 'opacity-0'}`}
            style={{
              backgroundImage: `url(${slide.imageSrc})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
            }}
          />
        ))}
      </div>

      {/* Overlay gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/30 z-10" />

      {/* Main title and content */}
      <div className="absolute bottom-1/3 left-1/2 transform -translate-x-1/2 z-20 text-center">
        <div className="flex items-center gap-4 text-orange-400 mb-8">
          <h1 className="text-6xl md:text-8xl lg:text-9xl font-bold uppercase tracking-wider">Our</h1>
          <div className="relative h-24 md:h-32 lg:h-36 overflow-hidden">
            <div
              ref={titleRef}
              className="transition-transform duration-1000 ease-out"
              style={{ transform: `translateY(${-currentSlideIndex * slideRowHeight}px)` }}
            >
              {slides.map((slide) => (
                <div
                  key={slide.id}
                  className="text-6xl md:text-8xl lg:text-9xl font-bold uppercase tracking-wider h-24 md:h-32 lg:h-36 flex items-center"
                >
                  {slide.title}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Description */}
        <div className="max-w-2xl mx-auto mb-8">
          <p className="text-white text-lg md:text-xl lg:text-2xl leading-relaxed opacity-90">{currentSlide.description}</p>
        </div>

        {/* Button */}
        <div className="flex justify-center">
          <a
            href={currentSlide.url}
            className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-orange-400 to-orange-500 text-black font-bold text-lg uppercase tracking-wider rounded-lg hover:from-orange-300 hover:to-orange-400 transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:ring-offset-2 focus:ring-offset-black"
          >
            {currentSlide.buttonText}
          </a>
        </div>
      </div>

      {/* Slide indicators */}
      <div className="absolute right-8 top-1/2 transform -translate-y-1/2 flex flex-col gap-4 z-30">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-12 h-0.5 bg-orange-400 transition-all duration-500 origin-right ${index === currentSlideIndex ? 'scale-x-100 opacity-100' : 'scale-x-50 opacity-60'} hover:scale-x-75 focus:outline-none focus:scale-x-75`}
            aria-label={`Go to slide ${index + 1}: ${slides[index].title}`}
          />
        ))}
      </div>



      {/* Navigation hint */}
      <div className="absolute bottom-8 left-8 text-orange-400/60 text-sm z-30">
        <p>Scroll • Arrow keys • Click indicators</p>
        <p className="text-xs mt-1">Press 1-3 for quick navigation</p>
      </div>

      {/* Slide counter */}
      <div className="absolute top-8 left-8 text-orange-400 font-mono text-lg z-30">
        <span className="text-2xl font-bold">{String(currentSlideIndex + 1).padStart(2, '0')}</span>
        <span className="opacity-60"> / {String(slides.length).padStart(2, '0')}</span>
      </div>


    </div>
  );
};

export default function OurServices() {
  return (
    <div className="min-h-screen overflow-x-hidden">
      {/* Hero Section - Full Screen */}
      <section className="h-screen relative flex items-center justify-center overflow-hidden">
        {/* Halo-style Background */}
        <HaloBackground />
        
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/20 z-10"></div>
        
        {/* Content */}
        <div className="relative z-20 text-center text-white px-4">
          <h1 className="text-6xl md:text-8xl font-bold mb-6 bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
            Our Services
          </h1>
          <p className="text-xl md:text-2xl max-w-4xl mx-auto mb-8 text-gray-200">
            Transforming ideas into digital reality with cutting-edge technology solutions
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-gradient-to-r from-yellow-400 to-orange-500 text-black px-8 py-4 rounded-lg font-semibold text-lg hover:from-yellow-300 hover:to-orange-400 transition-all duration-300 transform hover:scale-105">
              Explore Services
            </button>
            <button className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white hover:text-black transition-all duration-300">
              Get Started
            </button>
          </div>
        </div>
      </section>

      {/* Carousel Section */}
      <DigitalCarousel />

      {/* Contact Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: 'url("https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1920&h=1080&fit=crop&crop=center")'
          }}
        />
        
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/60 z-10"></div>
        
        {/* Content */}
        <div className="relative z-20 text-center text-white px-4 max-w-4xl mx-auto">
          <h2 className="text-4xl md:text-6xl font-bold mb-8 bg-gradient-to-r from-orange-400 to-yellow-400 bg-clip-text text-transparent">
            Want to know more?
          </h2>
          
          <p className="text-xl md:text-2xl mb-12 text-gray-200 max-w-3xl mx-auto leading-relaxed">
            Get in touch to discover how we can partner to design, deploy, and support your digital infrastructure.
          </p>
          
          {/* CTA Button */}
          <div className="flex justify-center">
            <button className="bg-gradient-to-r from-orange-400 to-yellow-400 text-black px-8 py-4 rounded-lg font-semibold text-lg hover:from-orange-300 hover:to-yellow-300 transition-all duration-300 transform hover:scale-105">
              Get in Touch with Indigo
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
