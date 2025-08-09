'use client';

import { useState, useEffect, useRef } from 'react';

export default function InvestorsInPeople() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Pre-defined bubble positions and properties for stability
  const bubbles = [
    { id: 1, size: 25, top: 10, left: 20, delay: 0, duration: 3 },
    { id: 2, size: 35, top: 30, left: 80, delay: 1, duration: 4 },
    { id: 3, size: 20, top: 60, left: 15, delay: 2, duration: 3.5 }
  ];

  const yellowBubbles = [
    { id: 1, size: 20, top: 15, left: 25, delay: 0.3, duration: 2.5 },
    { id: 2, size: 30, top: 45, left: 75, delay: 1.1, duration: 2.8 },
    { id: 3, size: 25, top: 75, left: 20, delay: 0.7, duration: 2.3 }
  ];

  return (
    <section ref={sectionRef} className="bg-purple-100 min-h-screen flex items-center">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          {/* Left Column - Text Content */}
          <div>
            <h2 className={`text-5xl font-bold text-[#2C3E50] mb-8 transition-all duration-1000 delay-200 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-8'
            }`}>
              Investors in People
              <br />
              <span className="text-6xl text-yellow-600">Gold</span>
            </h2>
            <p className={`text-lg text-gray-700 leading-relaxed transition-all duration-1000 delay-400 ${
              isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12'
            }`}>
              We were awarded Investors in People and received a Gold certificate. Gold accreditation means that we have the policies in place but more than that, it means everyone takes ownership for making them come to life.
            </p>
          </div>

          {/* Right Column - Integrated Content */}
          <div className="flex justify-center relative">
            {/* Bubbles Background Effect */}
            <div className={`absolute inset-0 pointer-events-none transition-all duration-1000 delay-600 ${
              isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-16'
            }`}>
              {bubbles.map((bubble) => (
                <div
                  key={bubble.id}
                  className="absolute bg-white/30 rounded-full animate-pulse"
                  style={{
                    width: `${bubble.size}px`,
                    height: `${bubble.size}px`,
                    top: `${bubble.top}%`,
                    left: `${bubble.left}%`,
                    animationDelay: `${bubble.delay}s`,
                    animationDuration: `${bubble.duration}s`
                  }}
                ></div>
              ))}
              {yellowBubbles.map((bubble) => (
                <div
                  key={`yellow-${bubble.id}`}
                  className="absolute bg-yellow-300/40 rounded-full animate-bounce"
                  style={{
                    width: `${bubble.size}px`,
                    height: `${bubble.size}px`,
                    top: `${bubble.top}%`,
                    left: `${bubble.left}%`,
                    animationDelay: `${bubble.delay}s`,
                    animationDuration: `${bubble.duration}s`
                  }}
                ></div>
              ))}
            </div>
            
            <div className="text-center relative z-10">
              <div className={`w-24 h-24 bg-yellow-500 rounded-full mx-auto mb-8 flex items-center justify-center transition-all duration-1000 delay-800 ${
                isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12'
              }`}>
                <svg className="w-12 h-12 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              </div>
              
              <h3 className={`text-4xl font-bold text-gray-800 mb-4 transition-all duration-1000 delay-1000 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}>We are GOLD</h3>
              <p className={`text-lg text-gray-600 transition-all duration-1000 delay-1200 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}>Awarded for excellence in people development and organizational culture</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
