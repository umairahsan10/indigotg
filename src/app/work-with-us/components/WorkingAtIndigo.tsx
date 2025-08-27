'use client';

import { useState, useEffect, useRef } from 'react';

export default function WorkingAtIndigo() {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [stats, setStats] = useState({ satisfaction: 0, recommend: 0, growth: 0 });
  const [statsVisible, setStatsVisible] = useState(false);
  const [slideDirection, setSlideDirection] = useState<'left' | 'right' | null>(null);
  const statsRef = useRef<HTMLDivElement>(null);

  const imageCards = [
    {
      leftImage: "/careers/1.1.jpg",
      rightImage: "/careers/img_6.png",
      title: "Digital Infrastructure Excellence",
      description: "Building the backbone of tomorrow's connected world",
      readMoreLink: "https://www.indigotg.com/testimonial/discovering-a-career-in-system-development/"
    },
    {
      leftImage: "/careers/2.1.jpg",
      rightImage: "/careers/img_4.png",
      title: "Innovation at Every Level",
      description: "Pushing boundaries with cutting-edge technology",
      readMoreLink: "https://www.indigotg.com/testimonial/rich-hollins-global-operations-director/"
    },
    {
      leftImage: "/careers/3.1.jpg",
      rightImage: "/careers/img_5.png",
      title: "Team Collaboration & Growth",
      description: "Fostering a culture of excellence and continuous learning",
      readMoreLink: "https://www.indigotg.com/testimonial/usa-field-engineer/"
    }
  ];

  useEffect(() => {
    setIsVisible(true);
    
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        prevCard();
      } else if (e.key === 'ArrowRight') {
        nextCard();
      }
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('keydown', handleKeyDown);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStatsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (statsRef.current) {
      observer.observe(statsRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (statsVisible) {
      const duration = 2000; // 2 seconds
      const steps = 60;
      const stepDuration = duration / steps;

      const finalValues = { satisfaction: 4.8, recommend: 95, growth: 2.5 };

      let currentStep = 0;
      const interval = setInterval(() => {
        currentStep++;
        const progress = currentStep / steps;

        setStats({
          satisfaction: Number((finalValues.satisfaction * progress).toFixed(1)),
          recommend: Math.floor(finalValues.recommend * progress),
          growth: Number((finalValues.growth * progress).toFixed(1))
        });

        if (currentStep >= steps) {
          clearInterval(interval);
        }
      }, stepDuration);

      return () => clearInterval(interval);
    }
  }, [statsVisible]);

  const nextCard = () => {
    if (slideDirection) return;
    setSlideDirection('right');
    setCurrentTestimonial((prev) => (prev + 1) % imageCards.length);
    setTimeout(() => setSlideDirection(null), 300);
  };

  const prevCard = () => {
    if (slideDirection) return;
    setSlideDirection('left');
    setCurrentTestimonial((prev) => (prev - 1 + imageCards.length) % imageCards.length);
    setTimeout(() => setSlideDirection(null), 300);
  };

  const current = imageCards[currentTestimonial];

  return (
    <section className="bg-white py-8 relative overflow-hidden min-h-screen flex items-center overflow-x-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <div
          className="w-full h-full bg-cover bg-center bg-no-repeat opacity-10"
          style={{ backgroundImage: 'url(/careers/img_1.png)' }}
        ></div>
      </div>

      {/* Enhanced Background Elements */}
      <div className="absolute inset-0">
        {/* Floating Light Elements */}
        <div 
          className="absolute w-96 h-96 bg-gradient-to-br from-[#140079]/20 to-[#140079]/10 rounded-full blur-3xl opacity-70"
          style={{
            top: '10%',
            right: '10%',
            transform: `translate(${mousePosition.x * -0.02}px, ${mousePosition.y * -0.02}px)`
          }}
        ></div>
        <div 
          className="absolute w-64 h-64 bg-gradient-to-br from-[#140079]/15 to-[#140079]/25 rounded-full blur-2xl opacity-60"
          style={{
            bottom: '20%',
            left: '15%',
            transform: `translate(${mousePosition.x * 0.01}px, ${mousePosition.y * 0.01}px)`
          }}
        ></div>
        
        {/* Professional Pattern Overlay */}
        <div className="absolute inset-0 opacity-5">
          <div className="w-full h-full" style={{
            backgroundImage: `
              linear-gradient(45deg, #140079 1px, transparent 1px),
              linear-gradient(-45deg, #140079 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px'
          }}></div>
        </div>
        
        {/* Geometric Accent Lines */}
        <div className="absolute bottom-0 left-0 w-full h-full opacity-10">
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className="absolute bg-gradient-to-r from-[#140079] via-[#140079]/80 to-transparent"
              style={{
                bottom: `${i * 12}%`,
                left: `${i * 4}%`,
                width: `${200 + i * 50}px`,
                height: '2px',
                transform: `rotate(${i * 3}deg)`,
                opacity: 0.6 - i * 0.05
              }}
            ></div>
          ))}
          {[...Array(6)].map((_, i) => (
            <div
              key={`accent-${i}`}
              className="absolute bg-gradient-to-r from-[#140079]/60 via-[#140079]/40 to-transparent"
              style={{
                bottom: `${i * 15}%`,
                right: `${i * 6}%`,
                width: `${150 + i * 40}px`,
                height: '1px',
                transform: `rotate(${-i * 4}deg)`,
                opacity: 0.5 - i * 0.06
              }}
            ></div>
          ))}
        </div>

        {/* Subtle Particles */}

      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        {/* Enhanced Header */}
        <div className="text-center mb-8">
          <h2 className={`text-5xl font-black text-[#140079] mb-4 transition-all duration-1000 delay-200 font-roboto ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}>
            Working at Indigo
          </h2>
          
          <p className={`text-base sm:text-sm lg:text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed transition-all duration-1000 delay-400 font-roboto ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}>
            Discover what makes our team passionate about building the future of digital infrastructure
          </p>
        </div>

        {/* Enhanced Image Card */}
        <div className={`flex flex-col items-center mb-6 transition-all duration-1000 delay-600 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}>
          <div className={`flex flex-col sm:flex-row w-full max-w-4xl bg-white rounded-3xl overflow-hidden shadow-2xl border border-gray-100 hover:shadow-3xl transition-all duration-300 group h-104 sm:h-80 ${
             slideDirection === 'left' ? 'transform -translate-x-4' : 
             slideDirection === 'right' ? 'transform translate-x-4' : 
             'transform translate-x-0'
           }`}>
             {/* Left Image Section */}
             <div className="w-full sm:w-1/2 relative overflow-hidden flex flex-col items-center justify-between p-2" style={{ backgroundColor: '#ffc404' }}>
               {/* Image with increased size */}
               <div className="w-full flex-1 flex items-center justify-center">
                 <img
                   src={current.leftImage}
                   alt={current.title}
                   className="max-w-full max-h-full object-contain group-hover:scale-105 transition-transform duration-300"
                 />
               </div>
               
               {/* Read More Button positioned at center */}
               <div className="w-full flex justify-center">
                 <a href={current.readMoreLink} target="_blank" rel="noopener noreferrer">
                   <button className="border-2 border-blue-800 text-blue-800 px-4 py-2 rounded-lg font-semibold transition-all duration-300 flex items-center gap-2 group shadow-md text-sm hover:text-white" style={{ backgroundColor: '#ffc404' }} onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#29186e'} onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#ffc404'}>
                     <span>Read more</span>
                     <span className="text-sm group-hover:translate-x-1 transition-transform duration-300">{'>'}</span>
                   </button>
                 </a>
               </div>
              </div>
              
             {/* Right Image Section */}
             <div className="w-full sm:w-1/2 relative overflow-hidden" style={{ backgroundColor: '#f3f8ff' }}>
               <img
                 src={current.rightImage}
                 alt={current.title}
                 className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
               />
                </div>
              </div>
        </div>

        {/* Enhanced Navigation */}
        <div className={`flex flex-col items-center gap-6 transition-all duration-1000 delay-800 mb-8 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>
          
          {/* Navigation Controls */}
          <div className="flex justify-center items-center gap-4 sm:gap-8">
            {/* Previous Button */}
            <button 
              onClick={prevCard}
              className="group w-10 h-10 sm:w-12 sm:h-12 bg-white rounded-full shadow-lg border border-gray-200 flex items-center justify-center text-gray-600 hover:text-white hover:bg-blue-500 transition-all duration-300 hover:scale-110 hover:shadow-xl"
            >
              <span className="text-lg sm:text-xl group-hover:-translate-x-0.5 transition-transform duration-300">←</span>
            </button>
            
            {/* Enhanced Pagination Dots */}
            <div className="flex gap-2 sm:gap-3">
               {imageCards.map((_, i: number) => (
                <button
                  key={i}
                  onClick={() => {
                      if (slideDirection) return;
                      setSlideDirection('right');
                      setCurrentTestimonial(i);
                      setTimeout(() => setSlideDirection(null), 300);
                    }}
                   className={`transition-all duration-300 rounded-full ${i === currentTestimonial
                      ? 'w-6 sm:w-8 h-2 sm:h-3 bg-gradient-to-r from-blue-500 to-purple-500 shadow-lg' 
                      : 'w-2 sm:w-3 h-2 sm:h-3 bg-gray-300 hover:bg-gray-400 hover:scale-125'
                  }`}
                ></button>
              ))}
            </div>
            
            {/* Next Button */}
            <button 
              onClick={nextCard}
              className="group w-10 h-10 sm:w-12 sm:h-12 bg-white rounded-full shadow-lg border border-gray-200 flex items-center justify-center text-gray-600 hover:text-white hover:bg-blue-500 transition-all duration-300 hover:scale-110 hover:shadow-xl"
            >
              <span className="text-lg sm:text-xl group-hover:translate-x-0.5 transition-transform duration-300">→</span>
            </button>
          </div>

          {/* View All Stories Button - Centered Below Navigation */}
          <div className={`transition-all duration-1000 delay-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <a href="https://www.indigotg.com/working-at-indigo/" target="_blank" rel="noopener noreferrer">
              <button className="bg-[#140079] text-white px-6 py-3 rounded-lg font-medium hover:bg-[#140079]/90 transition-all duration-300 flex items-center gap-2 group shadow-md hover:shadow-lg">
                <span>View all Stories</span>
                <span className="text-sm group-hover:translate-x-1 transition-transform duration-300">→</span>
              </button>
            </a>
          </div>
        </div>

        {/* Professional Metrics Section */}
        <div
          ref={statsRef}
          className={`grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 max-w-4xl mx-auto transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
        >
          {/* Employee Satisfaction */}
          <div className="text-center bg-white/90 backdrop-blur-sm rounded-2xl p-4 border border-gray-200/40 shadow-lg hover:shadow-xl transition-all duration-300 group">
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-amber-500 to-orange-600 rounded-xl mx-auto mb-3 sm:mb-4 flex items-center justify-center shadow-md">
              <svg className="w-5 h-5 sm:w-7 sm:h-7 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            </div>
            <div className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2 font-mono tracking-tight">
              {stats.satisfaction}/5
            </div>
            <div className="text-gray-800 font-semibold text-sm sm:text-base mb-1">Employee Satisfaction</div>
            <div className="text-gray-600 text-xs">Annual engagement survey results</div>
          </div>

          {/* Would Recommend */}
          <div className="text-center bg-white/90 backdrop-blur-sm rounded-2xl p-4 border border-gray-200/40 shadow-lg hover:shadow-xl transition-all duration-300 group">
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-xl mx-auto mb-3 sm:mb-4 flex items-center justify-center shadow-md">
              <svg className="w-5 h-5 sm:w-7 sm:h-7 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2 font-mono tracking-tight">
              {stats.recommend}%
            </div>
            <div className="text-gray-800 font-semibold text-sm sm:text-base mb-1">Would Recommend</div>
            <div className="text-gray-600 text-xs">Team member referral rate</div>
          </div>

          {/* Career Growth */}
          <div className="text-center bg-white/90 backdrop-blur-sm rounded-2xl p-4 border border-gray-200/40 shadow-lg hover:shadow-xl transition-all duration-300 group">
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-emerald-600 to-green-700 rounded-xl mx-auto mb-3 sm:mb-4 flex items-center justify-center shadow-md">
              <svg className="w-5 h-5 sm:w-7 sm:h-7 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L11 10.586 14.586 7H12z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2 font-mono tracking-tight">
              {stats.growth}x
            </div>
            <div className="text-gray-800 font-semibold text-sm sm:text-base mb-1">Career Growth Rate</div>
            <div className="text-gray-600 text-xs">Average promotion frequency</div>
          </div>
        </div>
      {/* Corner Accents */}
      {/* <div className="absolute top-0 left-0 w-32 h-32 sm:w-40 sm:h-40 bg-gradient-to-br from-[#140079]/10 to-transparent"></div>
      <div className="absolute bottom-0 right-0 w-32 h-32 sm:w-40 sm:h-40 bg-gradient-to-tl from-[#140079]/5 to-transparent"></div> */}
      </div>
    </section>
  );
}