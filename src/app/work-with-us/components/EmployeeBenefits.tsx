'use client';

import { useState, useEffect } from 'react';

export default function EmployeeBenefits() {
  const [isVisible, setIsVisible] = useState(false);
  const [bulletStates, setBulletStates] = useState([false, false, false, false, false, false]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          // Stagger bullet animations
          setTimeout(() => setBulletStates(prev => [true, ...prev.slice(1)]), 800);
          setTimeout(() => setBulletStates(prev => [prev[0], true, ...prev.slice(2)]), 1000);
          setTimeout(() => setBulletStates(prev => [prev[0], prev[1], true, ...prev.slice(3)]), 1200);
          setTimeout(() => setBulletStates(prev => [prev[0], prev[1], prev[2], true, ...prev.slice(4)]), 1400);
          setTimeout(() => setBulletStates(prev => [prev[0], prev[1], prev[2], prev[3], true, ...prev.slice(5)]), 1600);
          setTimeout(() => setBulletStates(prev => [prev[0], prev[1], prev[2], prev[3], prev[4], true]), 1800);
        }
      },
      { threshold: 0.3 }
    );

    const sectionRef = document.querySelector('.employee-benefits-section');
    if (sectionRef) {
      observer.observe(sectionRef);
    }

    return () => {
      if (sectionRef) {
        observer.unobserve(sectionRef);
      }
    };
  }, []);

  return (
    <section className="bg-white py-20 employee-benefits-section min-h-screen flex items-center">
      <div className="w-full px-4">
        <div className="grid lg:grid-cols-2 gap-16">
          {/* Left Column - Benefits Image */}
          <div className={`transition-all duration-1000 delay-400 ${
            isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-20'
          }`}>
            <div>
              <img 
                src="/careers/benefits.jpg" 
                alt="Employee Benefits" 
                className="w-full h-auto"
              />
            </div>
          </div>

          {/* Right Column - Why Work For Us */}
          <div className="flex flex-col justify-center">
            <h2 className={`text-4xl font-medium text-[#140079] mb-8 transition-all duration-1000 delay-600 ml-32 font-roboto ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-8'
            }`}>Why Work For Us?</h2>
            
            <div className="space-y-4 mb-8 pl-8">
              {/* Row 1 */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className={`flex items-center transition-all duration-700 ${
                  bulletStates[0] ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-16'
                }`}>
                  <span className="text-xl mr-3 text-[#140079]">•</span>
                  <span className="text-lg text-[#140079] font-medium font-roboto">Your Career</span>
                </div>
                <div className={`flex items-center transition-all duration-700 ${
                  bulletStates[1] ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-16'
                }`}>
                  <span className="text-xl mr-3 text-[#140079]">•</span>
                  <span className="text-lg text-[#140079] font-medium font-roboto">Your Way of Working</span>
                </div>
              </div>
              
              {/* Row 2 */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className={`flex items-center transition-all duration-700 ${
                  bulletStates[2] ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-16'
                }`}>
                  <span className="text-xl mr-3 text-[#140079]">•</span>
                  <span className="text-lg text-[#140079] font-medium font-roboto">Your Leave</span>
                </div>
                <div className={`flex items-center transition-all duration-700 ${
                  bulletStates[3] ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-16'
                }`}>
                  <span className="text-xl mr-3 text-[#140079]">•</span>
                  <span className="text-lg text-[#140079] font-medium font-roboto">Your Voice Heard</span>
                </div>
              </div>
              
              {/* Row 3 */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className={`flex items-center transition-all duration-700 ${
                  bulletStates[4] ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-16'
                }`}>
                  <span className="text-xl mr-3 text-[#140079]">•</span>
                  <span className="text-lg text-[#140079] font-medium font-roboto">Your Happiness</span>
                </div>
                <div className={`flex items-center transition-all duration-700 ${
                  bulletStates[5] ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-16'
                }`}>
                  <span className="text-xl mr-3 text-[#140079]">•</span>
                  <span className="text-lg text-[#140079] font-medium font-roboto">Your Recognition</span>
                </div>
              </div>
            </div>

            <div className="pl-12 ml-32">
              <button className={`bg-[#140079] text-white text-center px-8 py-4 rounded-lg font-medium hover:bg-[#140079]/90 transition-all duration-200 flex items-center gap-2 w-fit font-roboto ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}>
                See open roles
                <span>→</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}