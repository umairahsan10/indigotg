'use client';

import { useState, useEffect, useRef } from 'react';

export default function ArmedForcesCovenant() {
  const [isVisible, setIsVisible] = useState(false);
  const [imagePhase, setImagePhase] = useState('hidden'); // hidden -> emerging -> growing -> normal -> pulsing
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          // Start the image animation sequence
          setTimeout(() => setImagePhase('emerging'), 800);
          setTimeout(() => setImagePhase('growing'), 1200);
          setTimeout(() => setImagePhase('normal'), 1800);
          setTimeout(() => setImagePhase('pulsing'), 2200);
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const getImageClasses = () => {
    switch (imagePhase) {
      case 'hidden':
        return 'scale-0 opacity-0';
      case 'emerging':
        return 'scale-50 opacity-70';
      case 'growing':
        return 'scale-125 opacity-100';
      case 'normal':
        return 'scale-100 opacity-100';
      case 'pulsing':
        return 'scale-100 opacity-100 animate-breathe';
      default:
        return 'scale-0 opacity-0';
    }
  };

  return (
    <section ref={sectionRef} className="bg-white py-20">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          {/* Left Column - Image */}
          <div className={`flex justify-center transition-all duration-1000 delay-600 ${
            isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-16'
          }`}>
            <div className="relative w-96 h-96">
              {/* Thick spinning border behind image */}
              <div className="absolute inset-0 rounded-full -z-10">
                <div className="absolute inset-0 rounded-full border-16 border-transparent bg-gradient-to-r from-indigo-600 to-indigo-600 animate-spin" 
                     style={{ 
                       animationDuration: '3s',
                       mask: 'conic-gradient(transparent 270deg, black 270deg)',
                       WebkitMask: 'conic-gradient(transparent 270deg, black 270deg)'
                     }}>
                </div>
              </div>
              
              {/* Small circle aperture */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-32 h-32 bg-white rounded-full border-4 border-gray-200 -z-5"></div>
              </div>
              
              {/* Image container */}
              <div className="relative bg-transparent rounded-full w-full h-full flex items-center justify-center z-10">
                <img 
                  src="/careers/armed.png" 
                  alt="Armed Forces Covenant" 
                  className={`w-80 h-80 object-cover rounded-full transition-all duration-500 ease-out ${getImageClasses()}`}
                />
              </div>
            </div>
          </div>

          {/* Right Column - Text Content */}
          <div>
            <h2 className={`text-5xl font-medium text-[#140079] mb-8 transition-all duration-1000 delay-200 font-roboto ${
              isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-12'
            }`}>
              Armed Forces
              <br />
              Covenant Supporter
            </h2>
            <p className={`text-xl text-gray-700 mb-8 leading-relaxed transition-all duration-1000 delay-400 font-roboto ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}>
              We are proud to be Armed Forces Friendly, employing a number of ex-service personnel across our business and supporting employees who have volunteered to serve in the Reserve Forces.
            </p>
            <button className={`bg-[#140079] text-white px-8 py-4 rounded-lg font-medium hover:bg-[#140079]/90 transition-all duration-300 flex items-center gap-2 w-fit font-roboto transition-all duration-1000 delay-800 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}>
              Service Leavers Information
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