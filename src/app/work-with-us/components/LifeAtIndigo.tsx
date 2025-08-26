'use client';

import { useState, useEffect, useRef } from 'react';

export default function LifeAtIndigo() {
  const [isVisible, setIsVisible] = useState(false);
  const [showCelebration, setShowCelebration] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          
          // Trigger celebration when entering from top (not when scrolling up from below)
          if (entry.boundingClientRect.top > 0) {
            // Trigger celebration animation after a short delay
            setTimeout(() => {
              setShowCelebration(true);
            }, 500);
          }
        } else {
          // Reset when section is not visible
          setIsVisible(false);
          setShowCelebration(false);
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
    <section ref={sectionRef} className="bg-white py-20 min-h-screen overflow-x-hidden relative">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className={`text-5xl font-medium text-[#140079] text-center mb-16 transition-all duration-1000 delay-200 font-roboto ${
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
            <h3 className={`text-4xl font-medium text-[#140079] mb-6 transition-all duration-1000 delay-800 font-roboto ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-8'
            }`}>Celebrating 25 years</h3>
            <p className={`text-lg text-gray-700 mb-8 leading-relaxed transition-all duration-1000 delay-1000 font-roboto ${
              isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'
            }`}>
              Indigo has been headquartered in South Wales for 25 years with hubs in Ireland and Denver, USA. Join us as we grow globally.
            </p>
            <a href="https://jobs.indigotg.com/vacancies/vacancy-search-results.aspx" target="_blank" rel="noopener noreferrer">
              <button className={`bg-[#140079] text-white px-8 py-4 rounded-lg font-medium hover:bg-[#140079]/90 transition-all duration-300 flex items-center gap-2 font-roboto ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}>
                View open roles
                <span>→</span>
              </button>
            </a>
          </div>
        </div>
      </div>
      
      {/* Celebration Animation */}
      {showCelebration && (
        <div className="fixed inset-0 pointer-events-none z-50">
                     {/* Confetti pieces */}
           {[...Array(50)].map((_, i) => (
             <div
               key={i}
               className={`absolute w-2 h-2 rounded-full animate-celebration-${i % 8}`}
               style={{
                 left: `${50 + (Math.random() - 0.5) * 20}%`,
                 top: `${50 + (Math.random() - 0.5) * 20}%`,
                 backgroundColor: '#140079',
                 animationDelay: `${Math.random() * 0.5}s`,
                 animationDuration: `${2 + Math.random() * 2}s`
               }}
             />
           ))}
           
           {/* Party popper effects */}
           {[...Array(6)].map((_, i) => (
             <div
               key={`popper-${i}`}
               className="absolute w-3 h-3 rounded-full animate-party-popper"
               style={{
                 left: `${40 + i * 4}%`,
                 top: `${40 + i * 2}%`,
                 backgroundColor: '#140079',
                 animationDelay: `${i * 0.1}s`,
                 animationDuration: '1.5s'
               }}
             />
           ))}
        </div>
      )}
      
      {/* Custom CSS for celebration animations */}
      <style jsx>{`
        @keyframes celebration-0 {
          0% {
            transform: translate(0, 0) rotate(0deg);
            opacity: 1;
          }
          100% {
            transform: translate(-100px, -200px) rotate(360deg);
            opacity: 0;
          }
        }
        
        @keyframes celebration-1 {
          0% {
            transform: translate(0, 0) rotate(0deg);
            opacity: 1;
          }
          100% {
            transform: translate(100px, -200px) rotate(-360deg);
            opacity: 0;
          }
        }
        
        @keyframes celebration-2 {
          0% {
            transform: translate(0, 0) rotate(0deg);
            opacity: 1;
          }
          100% {
            transform: translate(-150px, -150px) rotate(180deg);
            opacity: 0;
          }
        }
        
        @keyframes celebration-3 {
          0% {
            transform: translate(0, 0) rotate(0deg);
            opacity: 1;
          }
          100% {
            transform: translate(150px, -150px) rotate(-180deg);
            opacity: 0;
          }
        }
        
        @keyframes celebration-4 {
          0% {
            transform: translate(0, 0) rotate(0deg);
            opacity: 1;
          }
          100% {
            transform: translate(-200px, -100px) rotate(720deg);
            opacity: 0;
          }
        }
        
        @keyframes celebration-5 {
          0% {
            transform: translate(0, 0) rotate(0deg);
            opacity: 1;
          }
          100% {
            transform: translate(200px, -100px) rotate(-720deg);
            opacity: 0;
          }
        }
        
        @keyframes celebration-6 {
          0% {
            transform: translate(0, 0) rotate(0deg);
            opacity: 1;
          }
          100% {
            transform: translate(-100px, -300px) rotate(540deg);
            opacity: 0;
          }
        }
        
        @keyframes celebration-7 {
          0% {
            transform: translate(0, 0) rotate(0deg);
            opacity: 1;
          }
          100% {
            transform: translate(100px, -300px) rotate(-540deg);
            opacity: 0;
          }
        }
        
        @keyframes party-popper {
          0% {
            transform: scale(0) translateY(0);
            opacity: 1;
          }
          50% {
            transform: scale(1.5) translateY(-50px);
            opacity: 1;
          }
          100% {
            transform: scale(0) translateY(-100px);
            opacity: 0;
          }
        }
        
        .animate-celebration-0 { animation: celebration-0 3s ease-out forwards; }
        .animate-celebration-1 { animation: celebration-1 3s ease-out forwards; }
        .animate-celebration-2 { animation: celebration-2 3s ease-out forwards; }
        .animate-celebration-3 { animation: celebration-3 3s ease-out forwards; }
        .animate-celebration-4 { animation: celebration-4 3s ease-out forwards; }
        .animate-celebration-5 { animation: celebration-5 3s ease-out forwards; }
        .animate-celebration-6 { animation: celebration-6 3s ease-out forwards; }
        .animate-celebration-7 { animation: celebration-7 3s ease-out forwards; }
        
        .animate-party-popper { animation: party-popper 1.5s ease-out forwards; }
      `}</style>
    </section>
  );
}