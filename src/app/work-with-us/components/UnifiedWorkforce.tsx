'use client';

import { useState, useEffect, useRef } from 'react';

export default function UnifiedWorkforce() {
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
    <section ref={sectionRef} className="bg-purple-100 py-20">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          {/* Left Column - Text Content */}
          <div>
            <h2 className={`text-5xl font-bold text-indigo-800 mb-8 transition-all duration-1000 delay-200 ${
              isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12'
            }`}>
              Unified and Diverse
              <br />
              Workforce
            </h2>
            <p className={`text-lg text-gray-700 leading-relaxed transition-all duration-1000 delay-400 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}>
              By bringing together diverse perspectives and ideas in pursuit of shared goals, we deliver richer experiences for businesses and more meaningful connections for their customers. We respect and empower each other to help us develop professionally and personally.
            </p>
          </div>

          {/* Right Column - Unified Image */}
          <div className={`flex justify-center transition-all duration-1000 delay-600 ${
            isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-16'
          }`}>
            <div>
              <img 
                src="/careers/unified.png" 
                alt="Unified and Diverse Workforce" 
                className="w-full h-auto max-w-md"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
