'use client';

import { useEffect, useState } from 'react';

export default function CareersHero() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [counts, setCounts] = useState({ team: 0, countries: 0, roles: 0 });

  const videoId = 'e7X9aZCV_QA';
  const thumbnailUrl = `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
  const embedUrl = `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1`;

  useEffect(() => {
    setIsLoaded(true);

    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    if (isLoaded) {
      const duration = 2000; // 2 seconds
      const steps = 60;
      const stepDuration = duration / steps;

      const finalValues = { team: 500, countries: 50, roles: 15 };

      let currentStep = 0;
      const interval = setInterval(() => {
        currentStep++;
        const progress = currentStep / steps;

        setCounts({
          team: Math.floor(finalValues.team * progress),
          countries: Math.floor(finalValues.countries * progress),
          roles: Math.floor(finalValues.roles * progress)
        });

        if (currentStep >= steps) {
          clearInterval(interval);
        }
      }, stepDuration);

      return () => clearInterval(interval);
    }
  }, [isLoaded]);

  const handleVideoClick = () => {
    setIsVideoPlaying(true);
  };

  return (
    <section className="relative min-h-screen flex flex-col lg:flex-row overflow-hidden bg-black pt-10 sm:pt-16 lg:pt-20">
      {/* Enhanced Animated Background */}
      <div className="absolute inset-0">
        {/* Dynamic Gradient Mesh */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#3B4F8C] via-[#2E3A5F] to-[#1E2A4A] opacity-95"></div>
        <div className="absolute inset-0 bg-gradient-to-tr from-[#4A5B9A]/40 via-transparent to-[#5B6BA8]/30"></div>

        {/* Interactive Floating Elements - Responsive sizes */}
        <div
          className="absolute w-48 h-48 sm:w-64 sm:h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 bg-gradient-to-br from-[#4A5B9A]/30 to-[#3B4F8C]/20 rounded-full blur-2xl lg:blur-3xl animate-pulse"
          style={{
            top: '20%',
            left: '10%',
            transform: `translate(${mousePosition.x * 0.02}px, ${mousePosition.y * 0.02}px)`
          }}
        ></div>
        <div
          className="absolute w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 lg:w-64 lg:h-64 bg-gradient-to-br from-[#5B6BA8]/25 to-[#4A5B9A]/20 rounded-full blur-xl lg:blur-2xl animate-pulse"
          style={{
            bottom: '30%',
            right: '15%',
            transform: `translate(${mousePosition.x * -0.01}px, ${mousePosition.y * -0.01}px)`,
            animationDelay: '2s'
          }}
        ></div>

        {/* Geometric Elements - Responsive positioning and sizes */}
        <div className="absolute top-10 left-10 sm:top-16 sm:left-16 lg:top-20 lg:left-20 w-16 h-16 sm:w-20 sm:h-20 lg:w-32 lg:h-32 border border-white/10 rounded-full animate-spin" style={{ animationDuration: '30s' }}></div>
        <div className="absolute top-20 right-16 sm:top-24 sm:right-20 lg:top-40 lg:right-32 w-8 h-8 sm:w-12 sm:h-12 lg:w-16 lg:h-16 bg-gradient-to-br from-[#4A5B9A]/40 to-[#3B4F8C]/40 rounded-full animate-bounce" style={{ animationDelay: '1s' }}></div>
        <div className="absolute bottom-16 left-1/5 sm:bottom-20 sm:left-1/4 lg:bottom-32 lg:left-1/4 w-12 h-12 sm:w-16 sm:h-16 lg:w-24 lg:h-24 border-2 border-[#4A5B9A]/30 rounded-lg rotate-45 animate-pulse"></div>
        <div className="absolute top-1/2 left-4 sm:left-6 lg:left-10 w-4 h-4 sm:w-6 sm:h-6 lg:w-8 lg:h-8 bg-[#4A5B9A]/30 rounded-full animate-ping"></div>

        {/* Enhanced Grid Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="w-full h-full" style={{
            backgroundImage: `
              linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
            `,
            backgroundSize: '25px 25px sm:50px 50px'
          }}></div>
        </div>

        {/* Particle Effect - Responsive positioning */}
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white/30 rounded-full animate-ping"
            style={{
              top: `${5 + (i * 5)}%`,
              left: `${5 + (i * 5)}%`,
              animationDelay: `${i * 0.15}s`,
              animationDuration: `${2 + (i * 0.1)}s`
            }}
          ></div>
        ))}
      </div>

      {/* Enhanced Left Section - Responsive layout */}
      <div className="w-full lg:w-1/2 relative flex items-center justify-center p-4 sm:p-8 md:p-12 lg:p-16 z-10 -mt-10 sm:-mt-16 lg:-mt-20 order-2 lg:order-1">
      <div className="max-w-md text-center lg:text-left">
          
          {/* Enhanced Animated Title - Responsive typography */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-medium text-white mb-6 sm:mb-8 mt-4 sm:mt-8 font-roboto">
            <div 
              style={{
                color: '#fbbf24',
                fontSize: 'clamp(2.5rem, 5vw, 4.5rem)',
                fontWeight: '500',
                lineHeight: '1',
                display: 'block',
                marginBottom: '16px',
                zIndex: 9999,
                position: 'relative'
              }}
            >
              Careers
            </div>
            <div 
              style={{
                color: 'white',
                fontSize: 'clamp(1.25rem, 3vw, 1.875rem)',
                fontWeight: '500',
                lineHeight: '1',
                display: 'block',
                zIndex: 9999,
                position: 'relative'
              }}
            >
              Shape the Future
            </div>
          </h1>

          {/* Enhanced Description - Responsive text */}
          <p className="text-base sm:text-lg md:text-xl lg:text-xl text-white/90 mb-6 sm:mb-8 lg:mb-10 leading-relaxed mt-4 sm:mt-6 lg:mt-8 font-roboto px-4 sm:px-0">
            Ready to unleash your potential? Join our ambitious team and help deliver the future of digital infrastructure.
          </p>

                     {/* Enhanced CTA Buttons - Responsive layout */}
           <div className={`flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center lg:justify-start items-center lg:items-start transition-all duration-1000 delay-600 ${isLoaded ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-20'
             }`}>
            <a href="https://jobs.indigotg.com/vacancies/vacancy-search-results.aspx" target="_blank" rel="noopener noreferrer" className="w-auto flex justify-center lg:justify-start">
              <button className="group bg-gradient-to-r from-yellow-400 to-orange-500 text-black px-4 sm:px-6 py-2 sm:py-3 rounded-full font-medium transition-all duration-300 hover:from-yellow-300 hover:to-orange-400 hover:scale-105 hover:shadow-2xl flex items-center justify-center gap-2 relative overflow-hidden font-roboto w-auto">
                <span className="relative z-10">Open Positions</span>
                <span className="text-lg sm:text-xl group-hover:translate-x-1 transition-transform duration-300 relative z-10">→</span>
                <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </button>
            </a>
          </div>

          {/* Stats Section - Responsive layout and spacing */}
          <div className={`flex flex-row gap-3 sm:gap-4 md:gap-6 lg:gap-8 mt-8 sm:mt-10 lg:mt-12 mx-auto justify-center lg:justify-start transition-all duration-1000 delay-900 ${isLoaded ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-20'
            }`}>
            <div className="text-center">
              <div className="text-2xl sm:text-3xl font-medium text-yellow-400 font-roboto">{counts.team}+</div>
              <div className="text-white/60 text-xs sm:text-sm font-roboto">Team Members</div>
            </div>
            <div className="text-center">
              <div className="text-2xl sm:text-3xl font-medium text-blue-400 font-roboto">{counts.countries}+</div>
              <div className="text-white/60 text-xs sm:text-sm font-roboto">Countries</div>
            </div>
            <div className="text-center">
              <div className="text-2xl sm:text-3xl font-medium text-purple-400 font-roboto">{counts.roles}+</div>
              <div className="text-white/60 text-xs sm:text-sm font-roboto">Open Roles</div>
            </div>
          </div>
        </div>

        {/* Enhanced Floating Elements - Responsive positioning */}
        <div className="absolute top-1/4 right-4 sm:right-6 lg:right-8 w-2 h-2 sm:w-3 sm:h-3 bg-[#4A5B9A] rounded-full animate-ping"></div>
        <div className="absolute bottom-1/3 left-2 sm:left-3 lg:left-4 w-1 h-1 sm:w-2 sm:h-2 bg-[#4A5B9A] rounded-full animate-pulse"></div>
        <div className="absolute top-1/3 left-4 sm:left-6 lg:left-8 w-1 h-8 sm:h-10 lg:h-12 bg-gradient-to-b from-[#4A5B9A]/60 to-transparent"></div>
      </div>

      
      {/* Enhanced Right Section - Video Player - Responsive layout */}
      <div className="w-full lg:w-1/2 relative flex items-center justify-center z-10 p-4 sm:p-6 lg:p-8 pt-16 sm:pt-20 lg:pt-0 order-1 lg:order-2">
        <div className={`relative w-full max-w-sm sm:max-w-lg md:max-w-xl lg:max-w-2xl transition-all duration-1000 delay-300 ${isLoaded ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-20'
          }`}>
          {/* Enhanced Glassmorphism Container */}
          <div className="relative">
            {/* Glow Effect */}
            <div className="absolute -inset-2 sm:-inset-3 lg:-inset-4 bg-gradient-to-br from-yellow-400/20 via-blue-500/10 to-purple-500/20 rounded-2xl lg:rounded-3xl blur-lg lg:blur-xl opacity-60"></div>

            {/* Main Container */}
            <div className="relative bg-white/5 backdrop-blur-xl rounded-2xl lg:rounded-3xl border border-white/10 shadow-2xl">
              {/* Video Container - Responsive height */}
              <div className="relative w-full h-48 sm:h-56 md:h-64 lg:h-80 bg-black rounded-2xl lg:rounded-3xl overflow-hidden shadow-2xl group">
                {!isVideoPlaying ? (
                  <>
                    {/* Thumbnail Background */}
                    <div
                      className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-500 group-hover:scale-105"
                      style={{ backgroundImage: `url(${thumbnailUrl})` }}
                    >
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-black/30"></div>
                    </div>

                    {/* Play Button with Enhanced Effects - Responsive sizes */}
                    <div
                      className="absolute inset-0 flex items-center justify-center cursor-pointer"
                      onMouseEnter={() => setIsHovered(true)}
                      onMouseLeave={() => setIsHovered(false)}
                      onClick={handleVideoClick}
                    >
                      {/* Outer Glow Ring */}
                      <div className={`absolute w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 lg:w-32 lg:h-32 border-2 border-white/30 rounded-full transition-all duration-500 ${isHovered ? 'scale-110 border-yellow-400/60' : ''
                        }`}></div>

                      {/* Play Button */}
                      <div className={`relative w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 lg:w-20 lg:h-20 bg-white rounded-full flex items-center justify-center shadow-2xl transition-all duration-300 ${isHovered ? 'scale-110 bg-yellow-400' : ''
                        }`}>
                        <div className={`w-0 h-0 border-l-[8px] sm:border-l-[10px] md:border-l-[12px] lg:border-l-[14px] border-t-[5px] sm:border-t-[6px] md:border-t-[7px] lg:border-t-[9px] border-b-[5px] sm:border-b-[6px] md:border-b-[7px] lg:border-b-[9px] border-t-transparent border-b-transparent ml-0.5 sm:ml-1 transition-colors duration-300 ${isHovered ? 'border-l-black' : 'border-l-black'
                          }`}></div>
                      </div>

                      {/* Pulse Effect */}
                      <div className={`absolute w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 lg:w-20 lg:h-20 bg-yellow-400/20 rounded-full transition-all duration-1000 ${isHovered ? 'scale-150 opacity-0' : 'scale-100 opacity-100'
                        }`}></div>
                    </div>

                    {/* Video Info Overlay - Responsive text and spacing */}
                    <div className="absolute bottom-2 sm:bottom-3 lg:bottom-4 left-2 sm:left-3 lg:left-4 right-2 sm:right-3 lg:right-4 flex justify-between items-end">
                      <div className="bg-black/70 backdrop-blur-sm rounded-lg px-2 sm:px-3 lg:px-4 py-1 sm:py-2">
                        <h3 className="text-white font-medium text-xs sm:text-sm font-roboto">Meet the Indigo Team</h3>
                        <p className="text-white/70 text-xs font-roboto hidden sm:block">Discover our culture & values</p>
                      </div>
                      <div className="bg-black/70 backdrop-blur-sm rounded-lg px-2 sm:px-3 py-1">
                        <span className="text-white text-xs font-medium font-roboto">4:04</span>
                      </div>
                    </div>
                  </>
                ) : (
                  /* Embedded YouTube Video */
                  <iframe
                    src={embedUrl}
                    className="w-full h-full rounded-2xl lg:rounded-3xl"
                    frameBorder="0"
                    allowFullScreen
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    title="Meet the Indigo Team"
                  ></iframe>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced Decorative Elements - Responsive positioning */}
        <div className="absolute right-4 sm:right-6 lg:right-8 top-1/4 w-16 sm:w-20 lg:w-32 h-1 bg-gradient-to-r from-transparent via-yellow-400/60 to-transparent"></div>
        <div className="absolute right-6 sm:right-8 lg:right-12 bottom-1/3 w-12 sm:w-16 lg:w-24 h-1 bg-gradient-to-r from-transparent via-blue-400/60 to-transparent"></div>

        {/* Floating Particles - Responsive positioning */}
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-yellow-400/60 rounded-full animate-ping"
            style={{
              top: `${20 + i * 10}%`,
              right: `${5 + (i % 3) * 5}%`,
              animationDelay: `${i * 0.5}s`,
              animationDuration: '2s'
            }}
          ></div>
        ))}
      </div>

      {/* Corner Accent - Responsive sizes */}
      <div className="absolute top-0 right-0 w-16 h-16 sm:w-24 sm:h-24 lg:w-32 lg:h-32 bg-gradient-to-bl from-[#4A5B9A]/10 to-transparent"></div>
      <div className="absolute bottom-0 left-0 w-16 h-16 sm:w-24 sm:h-24 lg:w-32 lg:h-32 bg-gradient-to-tr from-[#4A5B9A]/10 to-transparent"></div>
    </section>
  );
}