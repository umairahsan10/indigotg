'use client';

import { useState, useEffect, useRef } from 'react';

export default function ArmedForcesCovenant() {
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
    <section ref={sectionRef} className="bg-white py-20">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          {/* Left Column - Image */}
          <div className={`flex justify-center transition-all duration-1000 delay-600 ${
            isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-16'
          }`}>
            <div>
              <img 
                src="/careers/armed.png" 
                alt="Armed Forces Covenant" 
                className="w-full h-auto max-w-sm max-h-150 object-cover"
              />
            </div>
          </div>

          {/* Right Column - Text Content */}
          <div>
            <h2 className={`text-5xl font-bold text-indigo-800 mb-8 transition-all duration-1000 delay-200 ${
              isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-12'
            }`}>
              Armed Forces
              <br />
              Covenant Supporter
            </h2>
            <p className={`text-xl text-gray-700 mb-8 leading-relaxed transition-all duration-1000 delay-400 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}>
              We are proud to be Armed Forces Friendly, employing a number of ex-service personnel across our business and supporting employees who have volunteered to serve in the Reserve Forces.
            </p>
            <button className={`bg-yellow-400 text-gray-800 px-8 py-4 rounded-lg font-semibold hover:bg-indigo-800 hover:text-white transition-all duration-300 flex items-center gap-2 w-fit ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}>
              Service Leavers Information
              <span>→</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}