'use client';

import { useState, useEffect } from 'react';

export default function EmployeeBenefits() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
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
                src="/careers/benefits.png" 
                alt="Employee Benefits" 
                className="w-full h-auto"
              />
            </div>
          </div>

          {/* Right Column - Why Work For Us */}
          <div className="flex flex-col justify-center">
            <h2 className={`text-4xl font-bold text-[#1e3a8a] mb-8 transition-all duration-1000 delay-600 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-8'
            }`}>Why Work For Us?</h2>
            
            <div className="space-y-4 mb-8 pl-8">
              {/* Row 1 */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className={`flex items-center transition-all duration-1000 delay-800 ${
                  isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-16'
                }`}>
                  <span className="text-yellow-400 text-xl mr-3">•</span>
                  <span className="text-lg text-[#1e3a8a] font-medium">Your Career</span>
                </div>
                <div className={`flex items-center transition-all duration-1000 delay-900 ${
                  isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-16'
                }`}>
                  <span className="text-yellow-400 text-xl mr-3">•</span>
                  <span className="text-lg text-[#1e3a8a] font-medium">Your Way of Working</span>
                </div>
              </div>
              
              {/* Row 2 */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className={`flex items-center transition-all duration-1000 delay-1000 ${
                  isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-16'
                }`}>
                  <span className="text-yellow-400 text-xl mr-3">•</span>
                  <span className="text-lg text-[#1e3a8a] font-medium">Your Leave</span>
                </div>
                <div className={`flex items-center transition-all duration-1000 delay-1100 ${
                  isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-16'
                }`}>
                  <span className="text-yellow-400 text-xl mr-3">•</span>
                  <span className="text-lg text-[#1e3a8a] font-medium">Your Voice Heard</span>
                </div>
              </div>
              
              {/* Row 3 */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className={`flex items-center transition-all duration-1000 delay-1200 ${
                  isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-16'
                }`}>
                  <span className="text-yellow-400 text-xl mr-3">•</span>
                  <span className="text-lg text-[#1e3a8a] font-medium">Your Happiness</span>
                </div>
                <div className={`flex items-center transition-all duration-1000 delay-1300 ${
                  isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-16'
                }`}>
                  <span className="text-yellow-400 text-xl mr-3">•</span>
                  <span className="text-lg text-[#1e3a8a] font-medium">Your Recognition</span>
                </div>
              </div>
            </div>

            <div className="pl-8">
              <button className={`bg-yellow-400 text-gray-800 px-8 py-4 rounded-lg font-semibold hover:bg-indigo-800 hover:text-white transition-all duration-200 flex items-center gap-2 w-fit ${
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