'use client';

import { useState, useEffect, useRef, useMemo } from 'react';

export default function UnifiedWorkforce() {
  const [isVisible, setIsVisible] = useState(false);
  const [textAnimationStage, setTextAnimationStage] = useState(0);
  const [counts, setCounts] = useState({ nationalities: 0, continents: 0, inclusive: 0 });
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          // Stagger text animations
          setTimeout(() => setTextAnimationStage(1), 400);
          setTimeout(() => setTextAnimationStage(2), 800);
          
          // Start counting animations only when section is visible
          setTimeout(() => {
            animateCount('nationalities', 50, 2000);
            animateCount('continents', 3, 1500);
            animateCount('inclusive', 100, 2500);
          }, 1200);
        } else {
          // Reset counts when section is not visible
          setCounts({ nationalities: 0, continents: 0, inclusive: 0 });
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const animateCount = (key: string, target: number, duration: number) => {
    const startTime = Date.now();
    const startValue = 0;
    
    const updateCount = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Easing function for smooth animation
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      const currentValue = Math.floor(startValue + (target - startValue) * easeOutQuart);
      
      setCounts(prev => ({ ...prev, [key]: currentValue }));
      
      if (progress < 1) {
        requestAnimationFrame(updateCount);
      }
    };
    
    requestAnimationFrame(updateCount);
  };

  // Generate floating elements
  const floatingElements = useMemo(() => Array.from({ length: 6 }, (_, i) => ({
    id: i,
    size: 20 + (i * 7), // Deterministic sizes instead of random
    x: 5 + (i * 15), // Deterministic positions instead of random
    y: 5 + (i * 12), // Deterministic positions instead of random
    delay: i * 0.5, // Deterministic delays instead of random
    duration: 12 + (i * 2) // Deterministic durations instead of random
  })), []);

  return (
    <section ref={sectionRef} className="relative bg-gradient-to-br from-purple-100 via-indigo-50 to-purple-200 py-16 overflow-hidden">
      {/* Floating Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {floatingElements.map((element) => (
          <div
            key={element.id}
            className="absolute opacity-10 pointer-events-none"
            style={{
              left: `${element.x}%`,
              top: `${element.y}%`,
              animationDelay: `${element.delay}s`,
            }}
          >
            <div
              className={`bg-gradient-to-br ${
                element.id % 3 === 0 ? 'from-indigo-400 to-purple-500' :
                element.id % 3 === 1 ? 'from-purple-400 to-pink-500' :
                'from-blue-400 to-indigo-500'
              } animate-spin rounded-lg`}
              style={{
                width: `${element.size}px`,
                height: `${element.size}px`,
                animationDuration: `${element.duration}s`,
                transform: element.id % 2 ? 'rotate(45deg)' : 'rotate(0deg)'
              }}
            />
          </div>
        ))}
      </div>

      {/* Light Orbs */}
      <div className="absolute inset-0">
        <div className="absolute w-96 h-96 bg-gradient-to-br from-purple-200/30 to-indigo-200/20 rounded-full blur-3xl opacity-40 animate-pulse" style={{ top: '10%', left: '10%', animationDuration: '6s' }} />
        <div className="absolute w-80 h-80 bg-gradient-to-br from-blue-200/20 to-purple-200/30 rounded-full blur-3xl opacity-30 animate-pulse" style={{ bottom: '20%', right: '15%', animationDuration: '8s', animationDelay: '2s' }} />
      </div>

      <div className="max-w-6xl mx-auto px-4 relative z-10">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          {/* Left Column - Enhanced Text Content */}
          <div>
            {/* Enhanced Heading */}
            <h2 className={`text-5xl font-bold mb-8 transition-all duration-1000 delay-400 ${
              textAnimationStage >= 1 ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12'
            }`}>
              <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent hover:from-purple-500 hover:to-indigo-500 transition-all duration-300 animate-text-glow" style={{ animationDuration: '4s' }}>
                Unified and Diverse
              </span>
              <br />
              <span className="bg-gradient-to-r from-purple-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent hover:from-purple-500 hover:to-indigo-500 transition-all duration-300 animate-text-glow" style={{ animationDuration: '4s', animationDelay: '0.5s' }}>
                Workforce
              </span>
            </h2>
            
            {/* Animated Underline */}
            <div className={`h-1 bg-gradient-to-r from-purple-400 via-indigo-400 to-purple-400 rounded-full mb-8 transition-all duration-1000 delay-600 ${
              textAnimationStage >= 1 ? 'w-32 opacity-100' : 'w-0 opacity-0'
            }`} 
            style={{
              animation: textAnimationStage >= 1 ? 'breathe 3s ease-in-out infinite' : 'none'
            }}
            />

            {/* Enhanced Description */}
            <p className={`text-lg text-gray-700 leading-relaxed mb-4 transition-all duration-1000 delay-800 ${
              textAnimationStage >= 2 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}>
              By bringing together diverse perspectives and ideas in pursuit of shared goals, we deliver richer experiences for businesses and more meaningful connections for their customers. We respect and empower each other to help us develop professionally and personally.
            </p>

            {/* Key Statistics */}
            <div className={`grid grid-cols-3 gap-6 py-6 transition-all duration-1000 delay-1000 ${
              textAnimationStage >= 2 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}>
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-700">{counts.nationalities}+</div>
                <div className="text-sm text-gray-600">Nationalities</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-700">{counts.continents}+</div>
                <div className="text-sm text-gray-600">Continents</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-700">{counts.inclusive}%</div>
                <div className="text-sm text-gray-600">Inclusive</div>
              </div>
            </div>

            {/* CTA Button */}
            <button className={`group bg-gradient-to-r from-purple-500 to-indigo-600 text-white px-8 py-4 rounded-lg font-semibold hover:from-purple-600 hover:to-indigo-700 transform hover:scale-105 hover:-translate-y-1 transition-all duration-300 shadow-lg hover:shadow-xl ${
              textAnimationStage >= 2 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}>
              <span className="flex items-center gap-2">
                Join Our Team
                <span className="group-hover:translate-x-1 transition-transform duration-300">→</span>
              </span>
            </button>
          </div>

          {/* Right Column - Enhanced Image */}
          <div className={`flex justify-center transition-all duration-1000 delay-600 ${
            isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-16'
          }`}>
            <img 
              src="/careers/unified-2.png" 
              alt="Unified and Diverse Workforce" 
              className="w-full h-auto max-w-md transition-all duration-500 hover:scale-105 animate-bounce"
              style={{ animationDuration: '3s' }}
            />
          </div>
        </div>
      </div>
      
      {/* Decorative Corner Accents */}
      <div className="absolute top-0 left-0 w-32 h-32 bg-gradient-to-br from-purple-200/20 to-transparent" />
      <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-bl from-indigo-200/20 to-transparent" />
      <div className="absolute bottom-0 left-0 w-36 h-36 bg-gradient-to-tr from-blue-200/20 to-transparent" />
      <div className="absolute bottom-0 right-0 w-28 h-28 bg-gradient-to-tl from-purple-200/20 to-transparent" />
      
      <style jsx global>{`
        @keyframes customBounce {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-20px);
          }
        }
        
        @keyframes breathe {
          0%, 100% {
            width: 8rem;
            opacity: 1;
          }
          50% {
            width: 12rem;
            opacity: 0.8;
          }
        }
        
        @keyframes textGlow {
          0%, 100% {
            filter: drop-shadow(0 0 8px rgba(196, 181, 253, 0.4)) drop-shadow(0 0 15px rgba(199, 210, 254, 0.3));
          }
          50% {
            filter: drop-shadow(0 0 15px rgba(196, 181, 253, 0.6)) drop-shadow(0 0 25px rgba(199, 210, 254, 0.5));
          }
        }
        
        .animate-bounce {
          animation: customBounce 3s ease-in-out infinite !important;
        }
        
        .animate-text-glow {
          animation: textGlow 4s ease-in-out infinite !important;
        }
      `}</style>
    </section>
  );
}
