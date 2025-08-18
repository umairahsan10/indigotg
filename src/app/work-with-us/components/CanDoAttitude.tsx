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
    <section ref={sectionRef} className="bg-[#E8EAF6] min-h-screen flex items-center">
      <div className="max-w-6xl mx-auto px-4 w-full">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left Column - Text Content */}
          <div>
            <h2 className={`text-5xl font-medium text-[#140079] mb-8 transition-all duration-1000 delay-200 font-roboto ${
              isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12'
            }`}>Can-do Attitude</h2>
            <p className={`text-xl text-gray-700 leading-relaxed transition-all duration-1000 delay-400 font-roboto ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}>
              We are adaptable and agile, working relentlessly to get real results. With our <span className='text-[#140079] font-bold'> expertise, enthusiasm, </span> and <span className='text-[#140079] font-bold'> mastery of emerging technologies </span> and complex systems, no job is too challenging.
            </p>
          </div>

          {/* Right Column - Can-do Attitude Image with Floating Elements */}
          <div className={`flex justify-center transition-all duration-1000 delay-600 ${
            isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-16'
          }`}>
            <div className="relative">
              {/* Floating Image */}
              <img 
                src="/careers/attitude.png" 
                alt="Can-do Attitude" 
                className="w-full h-auto max-w-sm animate-float"
              />
              
              {/* Floating Black Boxes */}
              <div className="absolute -top-2 -left-2 w-3 h-3 bg-black rounded-sm animate-float-delayed-1"></div>
              <div className="absolute -top-4 -right-3 w-4 h-4 bg-black rounded-sm animate-float-delayed-2"></div>
              <div className="absolute -bottom-3 -left-4 w-2.5 h-2.5 bg-black rounded-sm animate-float-delayed-3"></div>
              <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-black rounded-sm animate-float-delayed-4"></div>
              
              {/* Floating Dots */}
              <div className="absolute top-4 -right-6 w-2.5 h-2.5 bg-black rounded-full animate-float-delayed-5"></div>
              <div className="absolute top-8 -left-8 w-2 h-2 bg-black rounded-full animate-float-delayed-6"></div>
              <div className="absolute bottom-6 -left-10 w-1.5 h-1.5 bg-black rounded-full animate-float-delayed-7"></div>
              <div className="absolute bottom-10 -right-8 w-2 h-2 bg-black rounded-full animate-float-delayed-8"></div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Custom CSS for floating animations */}
      <style jsx>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-20px);
          }
        }
        
        @keyframes float-delayed-1 {
          0%, 100% {
            transform: translateY(0px) translateX(0px);
          }
          50% {
            transform: translateY(-15px) translateX(10px);
          }
        }
        
        @keyframes float-delayed-2 {
          0%, 100% {
            transform: translateY(0px) translateX(0px);
          }
          50% {
            transform: translateY(-12px) translateX(-8px);
          }
        }
        
        @keyframes float-delayed-3 {
          0%, 100% {
            transform: translateY(0px) translateX(0px);
          }
          50% {
            transform: translateY(-18px) translateX(12px);
          }
        }
        
        @keyframes float-delayed-4 {
          0%, 100% {
            transform: translateY(0px) translateX(0px);
          }
          50% {
            transform: translateY(-10px) translateX(-5px);
          }
        }
        
        @keyframes float-delayed-5 {
          0%, 100% {
            transform: translateY(0px) translateX(0px);
          }
          50% {
            transform: translateY(-25px) translateX(15px);
          }
        }
        
        @keyframes float-delayed-6 {
          0%, 100% {
            transform: translateY(0px) translateX(0px);
          }
          50% {
            transform: translateY(-20px) translateX(-10px);
          }
        }
        
        @keyframes float-delayed-7 {
          0%, 100% {
            transform: translateY(0px) translateX(0px);
          }
          50% {
            transform: translateY(-30px) translateX(8px);
          }
        }
        
        @keyframes float-delayed-8 {
          0%, 100% {
            transform: translateY(0px) translateX(0px);
          }
          50% {
            transform: translateY(-22px) translateX(-12px);
          }
        }
        

        
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        
        .animate-float-delayed-1 {
          animation: float-delayed-1 4s ease-in-out infinite;
        }
        
        .animate-float-delayed-2 {
          animation: float-delayed-2 5s ease-in-out infinite;
        }
        
        .animate-float-delayed-3 {
          animation: float-delayed-3 4.5s ease-in-out infinite;
        }
        
        .animate-float-delayed-4 {
          animation: float-delayed-4 3.5s ease-in-out infinite;
        }
        
        .animate-float-delayed-5 {
          animation: float-delayed-5 5.5s ease-in-out infinite;
        }
        
        .animate-float-delayed-6 {
          animation: float-delayed-6 4.2s ease-in-out infinite;
        }
        
        .animate-float-delayed-7 {
          animation: float-delayed-7 6.2s ease-in-out infinite;
        }
        
        .animate-float-delayed-8 {
          animation: float-delayed-8 4.8s ease-in-out infinite;
        }
        

      `}</style>
    </section>
  );
}