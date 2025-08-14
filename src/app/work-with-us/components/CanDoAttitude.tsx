'use client';

import { useState, useEffect, useRef } from 'react';

export default function CanDoAttitude() {
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
    <section ref={sectionRef} className="bg-purple-100 min-h-screen flex items-center">
      <div className="max-w-6xl mx-auto px-4 w-full">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left Column - Text Content */}
          <div>
            <h2 className={`text-5xl font-bold text-indigo-800 mb-8 transition-all duration-1000 delay-200 ${
              isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12'
            }`}>Can-do Attitude</h2>
            <p className={`text-xl text-gray-700 leading-relaxed transition-all duration-1000 delay-400 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}>
              We are adaptable and agile, working relentlessly to get real results. With our expertise, enthusiasm, and mastery of emerging technologies and complex systems, no job is too challenging.
            </p>
          </div>

          {/* Right Column - Can-do Attitude Image */}
          <div className={`flex justify-center transition-all duration-1000 delay-600 ${
            isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-16'
          }`}>
            <div>
              <img 
                src="/careers/canndoo.png" 
                alt="Can-do Attitude" 
                className="w-full h-auto max-w-sm "
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}