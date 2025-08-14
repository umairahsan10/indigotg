'use client';

import { useState, useEffect, useRef } from 'react';

export default function VisionValues() {
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

  return (
    <section ref={sectionRef} className="bg-white min-h-screen flex items-center">
      <div className="max-w-7xl mx-auto px-4 w-full">
        <div className="grid md:grid-cols-5 gap-16 items-center">
          {/* Left Column - Vision Image (larger) */}
          <div className={`md:col-span-3 relative transition-all duration-1000 delay-200 ${
            isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-20'
          }`}>
            <div>
              <img 
                src="/careers/v_v.png" 
                alt="Vision & Values" 
                className="w-full h-auto max-w-2xl animate-breathe"
                style={{ animationDuration: '4s' }}
              />
            </div>
          </div>

          {/* Right Column - Text Content */}
          <div className="md:col-span-2">
            <h2 className={`text-5xl font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent  mb-8 transition-all duration-1000 delay-400 ${
              isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-12'
            }`}>Vision & Values</h2>
            <p className={`text-lg text-gray-700 mb-8 leading-relaxed transition-all duration-1000 delay-600 ${
              isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-12'
            }`}>
              Our vision and values keep us ahead of the curve and make us the partner of choice for the world's most ambitious companies and projects.
            </p>
            <button className={`bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-600 text-white px-8 py-4 rounded-lg font-semibold hover:from-indigo-700 hover:via-purple-700 hover:to-indigo-700 transition-all duration-300 flex items-center gap-2 w-fit ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}>
              Explore
              <span>→</span>
            </button>
          </div>
        </div>
      </div>
      
      <style jsx global>{`
        @keyframes breathe {
          0%, 100% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.05);
          }
        }
        
        .animate-breathe {
          animation: breathe 4s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
}