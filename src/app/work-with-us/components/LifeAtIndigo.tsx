'use client';

import { useState, useEffect, useRef } from 'react';

export default function LifeAtIndigo() {
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
    <section ref={sectionRef} className="bg-white py-20 overflow-x-hidden">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className={`text-4xl font-bold text-indigo-800 text-center mb-16 transition-all duration-1000 delay-200 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-8'
        }`}>Life at Indigo</h2>
        
        <div className="grid md:grid-cols-2 gap-16 items-center">
          {/* Left Column - YouTube Video */}
          <div className={`flex items-center justify-center transition-all duration-1000 delay-400 ${
            isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12'
          }`}>
            <div className="w-full aspect-video">
              <iframe
                width="100%"
                height="100%"
                src="https://www.youtube.com/embed/qF-GaYki4lA"
                title="Life at Indigo"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                className="rounded-lg shadow-lg"
              />
            </div>
          </div>

          {/* Right Column - Celebration Text */}
          <div className={`transition-all duration-1000 delay-600 ${
            isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-12'
          }`}>
            <h3 className={`text-4xl font-bold text-indigo-800 mb-6 transition-all duration-1000 delay-800 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-8'
            }`}>Celebrating 25 years</h3>
            <p className={`text-lg text-gray-700 mb-8 leading-relaxed transition-all duration-1000 delay-1000 ${
              isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'
            }`}>
              Indigo has been headquartered in South Wales for 25 years with hubs in Ireland and Denver, USA. Join us as we grow globally.
            </p>
            <button className={`bg-yellow-400 text-gray-800 px-8 py-4 rounded-lg font-semibold hover:bg-indigo-800 hover:text-white transition-colors duration-300 flex items-center gap-2 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}>
              View open roles
              <span>→</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}