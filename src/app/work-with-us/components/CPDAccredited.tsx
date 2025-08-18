'use client';

import { useState, useEffect, useRef } from 'react';

export default function CPDAccredited() {
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
    <section ref={sectionRef} className="bg-[#E8EAF6] py-20">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          {/* Left Column - Text Content */}
          <div className={`transition-all duration-1000 delay-200 ${
            isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12'
          }`}>
            <h2 className="text-5xl font-medium text-[#140079] mb-8 font-roboto">CPD accredited</h2>
            <p className="text-lg text-gray-700 leading-relaxed font-roboto">
              Indigo has been accredited by <span className='text-[#140079] font-bold'> Engineers Ireland </span> in recognition of the quality of, and commitment to, its Continuing Professional Development (CPD) systems and practices for engineering and technical staff.
            </p>
          </div>

          {/* Right Column - CPD Image */}
          <div className={`flex justify-center transition-all duration-1000 delay-600 ${
            isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-16'
          }`}>
              <img 
                src="/careers/cpd.png" 
                alt="CPD Accreditation" 
                className="w-full h-auto max-w-md rounded-lg animate-pulse-scale"
              />
          </div>
        </div>
      </div>
      
      {/* Custom CSS for continuous scaling animation */}
      <style jsx>{`
        @keyframes pulse-scale {
          0%, 100% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.05);
          }
        }
        
        .animate-pulse-scale {
          animation: pulse-scale 3s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
}
