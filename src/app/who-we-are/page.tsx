'use client';

import React, { useEffect, useRef, useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';


// Register GSAP plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function WhoWeAre() {
  const router = useRouter();
  const [isVisible, setIsVisible] = useState<Record<number, boolean>>({});
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isTrainPaused, setIsTrainPaused] = useState(false);
  const sectionRefs = useRef<(HTMLElement | null)[]>([]);
  const stackAreaRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);

    const observers = sectionRefs.current.map((ref, index) => {
      if (!ref) return null;
      
      const observer = new IntersectionObserver(
        ([entry]) => {
          // Trigger animation every time element enters or leaves viewport
          if (entry.isIntersecting) {
            setIsVisible(prev => ({ ...prev, [index]: true }));
          } else {
            // Reset animation when element leaves viewport
            setIsVisible(prev => ({ ...prev, [index]: false }));
          }
        },
        { 
          threshold: 0.1,
          rootMargin: '0px 0px -50px 0px' // Trigger slightly before element is fully visible
        }
      );
      
      observer.observe(ref);
      return observer;
    });

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      observers.forEach(observer => observer?.disconnect());
    };
  }, []);

  // Stacked cards scroll logic with ScrollTrigger pin
  useEffect(() => {
    const stackArea = stackAreaRef.current;
    if (!stackArea) return;

    const cards = Array.from(
      stackArea.querySelectorAll<HTMLDivElement>(".pillar-card")
    );

    const rotateCards = () => {
      let angle = 0;
      cards.forEach((card, index) => {
        if (card.classList.contains("away")) {
          card.style.transform = `translateY(-150vh) rotate(-48deg)`;
        } else {
          card.style.transform = `rotate(${angle}deg)`;
          angle -= 10;
          card.style.zIndex = `${cards.length - index}`;
        }
      });
    };

    rotateCards();

    // Pin the stack section until all cards are "away"
    const trigger = ScrollTrigger.create({
      trigger: stackArea,
      start: "top top",
      end: () => `+=${cards.length * window.innerHeight}`,
      pin: true,
      scrub: true,
      onUpdate: (self) => {
        const awayCount = Math.floor(self.progress * cards.length);

        cards.forEach((card, i) => {
          if (i < awayCount) {
            card.classList.add("away");
          } else {
            card.classList.remove("away");
          }
        });

        rotateCards();
      },
    });

    return () => {
      trigger.kill();
    };
  }, []);

  const historyData = [
    { year: "November 1998", title: "Company Formed", desc: "At the beginning of our history, we set out to provide mobile, wireless, rigging, and deployment engineering services." },
    { year: "March 2003", title: "UK & Ireland", desc: "Expansion in the UK and Ireland to provide installation and commissioning services for fixed line and optical networks." },
    { year: "August 2003", title: "European Expansion", desc: "Geographic expansion in to Europe offering pan-European First Line Maintenance services to major telcos and network equipment manufacturers." },
    { year: "February 2004", title: "France & Germany", desc: "Growth in operations across Europe, with accelerated growth in France and Germany." },
    { year: "January 2005", title: "24×7×365 Network Operations Centre", desc: "Added 24x7x365 Network Operations Centre and remote network management services to support the growth of the First Line Maintenance services in the UK, Ireland and Europe." },
    { year: "January 2006", title: "Pan-European Deployments", desc: "Major pan-European optical and IP network deployments and upgrades for global telcos." },
    { year: "April 2009", title: "Focus on NOC", desc: "Greater focus on NOC and spare parts management to support the rapid expansion of managed services." },
    { year: "September 2009", title: "Indigo Telecom Group LTD Established", desc: "Formed through a rebrand of Team Telecom, Hutchinson, and Redbridge, our pan-European expansion gathered pace with a greater focus on GSC and managed services." },
    { year: "January 2012", title: "Fixed line & Mobile Network Wins", desc: "Major customer wins in fixed line and mobile network deployments in the UK and Ireland." },
    { year: "January 2015", title: "Asia Pacific & the USA", desc: "First Line Maintenance contract wins, renewals and extensions with major operators and network equipment manufacturers, with growth in to new markets including Asia Pacific and the USA." },
    { year: "January 2016", title: "Fibre Centre of Excellence", desc: "Launched our Fibre Centre of excellence to deliver survey and design services to FTTH Network operators." },
    { year: "January 2017", title: "Asia Pacific Expansion", desc: "Continued geographic expansion in to the Asia Pacific region with investment in Data Centre services and Smart Hands supporting customer wins with the global Data Centre operators." },
    { year: "July 2017", title: "Belcom joins Indigo", desc: "We extended our global reach and managed services portfolio and added data centres to our solutions with the acquisition of Belcom 247." },
    { year: "May 2018", title: "Magor NOC Facility Opens", desc: "Move to purpose built NOC facility in Magor, South Wales with investment in Salesforce Field Service Lightning resource and ticketing system." },
    { year: "November 2018", title: "GCP Invests in Indigo", desc: "We partnered with Growth Capital Partners (GCP) to support our organic and acquisition growth strategies." },
    { year: "March 2019", title: "Increased Service Offering", desc: "Added key service elements to the Design, Deploy and Support portfolio for data centres, fibre, network services and wireless networks." },
    { year: "September 2019", title: "Indigo Acquires 4site", desc: "We made 4site part of the Indigo Group and expanded our specialisms in the design and deployment of fibre and wireless infrastructure." },
    { year: "May 2021", title: "Global Expansion", desc: "Boosted international presence in USA and APAC delivering Design, Deploy and Support Services." },
    { year: "March 2022", title: "USA NOC", desc: "Opened a fully functioning purpose-built Network Operations Center (NOC) in the USA to service our North and South American customers." },
    { year: "November 2023", title: "25 years in business", desc: "Celebrating 25 years in business." }
  ];

  return (
    <div className="min-h-screen bg-white text-gray-900 overflow-x-hidden">
      {/* Hero Section */}
      <section 
        ref={(el) => { sectionRefs.current[0] = el; }}
        className="relative min-h-screen flex items-center justify-center bg-gradient-to-b from-blue-50 via-white to-blue-50 pt-20 md:pt-0 hero-section-small"
      >
        {/* Sophisticated Grid Background */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `linear-gradient(rgba(20, 0, 121, 0.4) 1px, transparent 1px),
                            linear-gradient(90deg, rgba(20, 0, 121, 0.4) 1px, transparent 1px)`,
            backgroundSize: '50px 50px'
          }}></div>
        </div>

        {/* Subtle Gradient Orbs */}
        <div className="absolute inset-0 overflow-hidden">
          <div 
            className="absolute w-[300px] h-[300px] md:w-[600px] md:h-[600px] rounded-full opacity-20"
              style={{
              background: 'radial-gradient(circle, rgba(20, 0, 121, 0.3) 0%, transparent 70%)',
              filter: 'blur(40px)',
              transform: `translate(${mousePosition.x * 0.02}px, ${mousePosition.y * 0.02}px)`,
              right: '-100px',
              top: '-100px',
              transition: 'transform 0.3s ease-out'
            }}
          ></div>
          <div 
            className="absolute w-[250px] h-[250px] md:w-[500px] md:h-[500px] rounded-full opacity-15"
              style={{
              background: 'radial-gradient(circle, rgba(59, 130, 246, 0.2) 0%, transparent 70%)',
              filter: 'blur(40px)',
              transform: `translate(${-mousePosition.x * 0.02}px, ${-mousePosition.y * 0.02}px)`,
              left: '-100px',
              bottom: '-100px',
              transition: 'transform 0.3s ease-out'
            }}
          ></div>
        </div>

        <div className="container mx-auto px-4 md:px-6 lg:px-12 relative z-10 py-8 md:py-12 lg:py-16">
          <div className="grid lg:grid-cols-2 gap-6 md:gap-8 lg:gap-16 items-center" style={{
            minHeight: 'calc(100dvh - 120px)'
          }}>
            <div className={`space-y-4 md:space-y-6 lg:space-y-8 text-center lg:text-left ${isVisible[0] ? 'animate-fadeInUp' : 'opacity-0'}`}>
              <div className="flex items-center justify-center lg:justify-start gap-3 md:gap-4 mb-4 md:mb-6 lg:mb-8">
                <div className="w-10 md:w-12 lg:w-16 h-[1px] bg-gradient-to-r from-transparent to-[#140079]"></div>
                <span className="text-xs tracking-[0.3em] text-gray-600 uppercase font-light">Digital Infrastructure</span>
              </div>
              
              <h1 className="text-2xl sm:text-3xl md:text-5xl lg:text-7xl font-light leading-tight">
                <span className="font-thin text-gray-600">We are </span>
                <span className="font-bold bg-gradient-to-r from-[#140079] to-blue-600 bg-clip-text text-transparent">
                  Indigo
                </span>
              </h1>
              
              <p className="text-sm sm:text-base md:text-lg text-gray-600 leading-relaxed max-w-xl font-light mx-auto lg:mx-0">
                We engineer a digital future by designing, deploying, and supporting the world's digital infrastructure, delivering successful outcomes for our customers and great careers for our people.
              </p>
              
              <div className="flex justify-center lg:justify-start gap-3 md:gap-4 pt-4 md:pt-6">
                <button 
                  onClick={() => router.push('/solutions')}
                  className="group relative overflow-hidden bg-[#140079] text-white px-6 md:px-8 lg:px-12 py-3 md:py-4 lg:py-5 font-medium text-sm tracking-wider uppercase transition-all duration-500 hover:text-white"
                >
                  <span className="relative z-10">Explore Solutions</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-blue-500 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500"></div>
                </button>
              </div>

              <div className="flex flex-row gap-3 md:gap-4 sm:gap-6 md:gap-8 lg:gap-12 pt-4 md:pt-6 lg:pt-8 border-t border-gray-200 justify-center lg:justify-start stats-section">
                <div className="text-center sm:text-left">
                  <div className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-thin text-gray-900 mb-1">
                    <span className="counter" data-target="200">200</span>
                    <span className="text-[#140079]">+</span>
                  </div>
                  <div className="text-xs text-gray-500 uppercase tracking-wider">Global Projects</div>
                </div>
                <div className="text-center sm:text-left">
                  <div className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-thin text-gray-900 mb-1">
                    <span className="counter" data-target="90">90</span>
                    <span className="text-[#140079]">+</span>
                  </div>
                  <div className="text-xs text-gray-500 uppercase tracking-wider">Countries</div>
                </div>
              </div>
            </div>

            <div className={`relative order-first lg:order-last ${isVisible[0] ? 'animate-fadeIn' : 'opacity-0'}`}>
              <div className="relative w-full flex items-center justify-center image-container" style={{
                minHeight: 'min(50vh, 300px)',
                maxHeight: 'min(60vh, 400px)',
                height: 'auto'
              }}>
                {/* Hero Image */}
                <div className="relative z-10 w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-none h-full flex items-center justify-center" style={{ animation: 'gentleFloat 4s ease-in-out infinite' }}>
                  <img 
                    src="/who-we-are/whoweare.png" 
                    alt="Indigo Digital Infrastructure" 
                    className="w-full h-full object-contain max-h-full"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section 
        ref={(el) => { sectionRefs.current[1] = el; }}
        className="min-h-screen md:py-16 lg:py-24 xl:py-32 bg-[#411fed]/10 text-gray-900 relative about-section-small flex items-center"
      >
        <div className="container mx-auto px-4 md:px-6 lg:px-12 w-full">
          <div className="grid lg:grid-cols-2 gap-8 md:gap-16 lg:gap-20 items-center">
            <div className={`relative order-first lg:order-last ${isVisible[1] ? 'animate-fadeInLeft' : 'opacity-0'}`}>
              <div className="relative">
                {/* About Us Image */}
                <div className="relative z-10 w-full h-64 md:h-80 lg:h-96 rounded-lg overflow-hidden shadow-2xl image-container" style={{ animation: 'gentleFloat 5s ease-in-out infinite' }}>
                  <img 
                    src="/who-we-are/img-2.jpg" 
                    alt="About Indigo Telecom Group" 
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              
              {/* Subtle geometric accent */}
              <div className="absolute -right-5 md:-right-10 top-0 w-20 h-20 md:w-32 md:h-32 lg:w-40 lg:h-40 rounded-full bg-gradient-to-br from-[#411fed]/20 to-[#411fed]/30 opacity-30 z-20 geometric-accent" style={{ animation: 'gentleFloat 3s ease-in-out infinite' }}></div>
            </div>

            <div className={`space-y-4 md:space-y-6 lg:space-y-8 text-center lg:text-left ${isVisible[1] ? 'animate-fadeInRight' : 'opacity-0'}`}>
              <div>
                <span className="text-xs tracking-[0.3em] text-gray-600 uppercase">Since 1998</span>
                <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-light mt-2 md:mt-4 mb-4 md:mb-8">
                  <span className="font-bold text-[#140079]">About</span> Us
                </h2>
              </div>

              <div className="space-y-3 md:space-y-4 lg:space-y-6">
                <p className="text-sm sm:text-base md:text-lg text-gray-700 leading-relaxed font-light">
                  Since 1998 we have been vital network and infrastructure partners to fixed, mobile carriers and hyperscalers across the enterprise sector. Rapidly expanding our footprint across North America, Europe and the world, we now operate in over 90 countries.
                </p>
                <p className="text-sm sm:text-base md:text-lg text-gray-700 leading-relaxed font-light">
                  By providing our international clients with a local and global presence, we support infrastructure across the globe with a single point of contact to keep societies collaborating, today and tomorrow.
                </p>
              </div>
              
              <div className="pt-4 md:pt-6 lg:pt-8">
                <button className="group relative overflow-hidden bg-[#140079] text-white px-6 md:px-8 py-3 md:py-4 transition-all duration-300">
                  <span className="relative z-10 text-sm tracking-wider uppercase font-medium">Learn More</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-blue-500 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Pillars - Stacked Cards Animation */}
      <section ref={(el) => { 
        sectionRefs.current[2] = el; 
        stackAreaRef.current = el as HTMLDivElement;
      }} className="stack-area flex flex-col lg:flex-row relative w-full bg-gradient-to-b from-white to-[#411fed]/10 text-gray-900">
        {/* Left copy */}
        <div className={`left flex flex-col items-center lg:items-start justify-center lg:sticky top-0 lg:h-screen w-full lg:basis-1/2 p-6 ${isVisible[2] ? 'animate-fadeInLeft' : 'opacity-0'}`}>
          <h2 className="title lg:w-[420px] text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight text-center lg:text-left text-[#140079]">
            <span className="block">Our Core</span>
            <span className="block">Pillars</span>
          </h2>
          <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-semibold mt-4 md:mt-6 lg:mt-8 mb-4 text-center lg:text-left text-[#140079] relative z-10" style={{color: '#140079', textShadow: '0 0 10px rgba(20, 0, 121, 0.3)'}}>
            Excellence In Everything We Do
          </h3>
          <div className="sub-title lg:w-[200px] text-sm sm:text-base md:text-lg lg:text-xl mt-4 max-w-sm md:max-w-lg text-center lg:text-left leading-relaxed">
            <span className="inline text-gray-600">Built from strategic thinking, safety, vision, and commitment to deliver transformational solutions across the globe.</span>
          </div>
        </div>

        {/* Right stacked cards */}
        <div className="right w-full lg:basis-1/2 lg:h-screen lg:sticky top-0">
          <div className="pillar-cards flex flex-col items-center justify-center">
            <div className="flex flex-col items-center justify-center">
              {[
                { 
                  num: "01", 
                  title: "Leadership Team", 
                  desc: "Built from strategic thinkers and commercial leaders, our team guide transformational solutions for our customers across the globe."
                },
                { 
                  num: "02", 
                  title: "Safety & Quality", 
                  desc: "We have responsibility at the heart of everything we do and protect our staff, our environment, and the quality of our designs."
                },
                { 
                  num: "03", 
                  title: "Vision & Values", 
                  desc: "Our vision and values keep us ahead of the curve and make us the partner of choice for the world's most ambitious companies."
                },
                { 
                  num: "04", 
                  title: "ESG Commitment", 
                  desc: "We are committed to advancing long-term sustainability and social responsibility policies to benefit our stakeholders."
                }
              ].map((item, idx) => (
                <div
                  key={idx}
                  className="pillar-card"
                  style={{
                    background: 'linear-gradient(135deg, #140079 0%, #411fed 50%, #140079 100%)',
                    boxShadow: '0 10px 25px rgba(20, 0, 121, 0.15)',
                  }}
                >
                  <div className="sub text-xl sm:text-2xl md:text-3xl lg:text-3xl font-semibold mb-1 sm:mb-2 md:mb-3 lg:mb-4 text-white/80">
                    {item.num}
                  </div>
                  <div className="content text-2xl sm:text-3xl md:text-4xl lg:text-4xl font-bold leading-tight text-white flex lg:flex-1 items-start lg:items-center">
                    {item.title}
                  </div>
                  <div className="desc text-sm sm:text-base md:text-lg lg:text-lg text-white/70 mt-1 sm:mt-2 md:mt-3 lg:mt-4 leading-relaxed">
                    {item.desc}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Certifications */}
      <section 
        ref={(el) => { sectionRefs.current[3] = el; }}
        className="certifications-section-small py-16 md:py-32 bg-[#411fed]/10 text-gray-900"
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-12">
          <div className="grid lg:grid-cols-2 gap-8 md:gap-20 items-center">
            <div className={`${isVisible[3] ? 'animate-fadeInLeft' : 'opacity-0'}`}>
              <div>
                <span className="text-xs tracking-[0.3em] text-gray-600 uppercase">Industry Standards</span>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light mt-4 mb-6 md:mb-8">
                  <span className="font-bold text-[#140079]">Certifications</span>
                </h2>
              </div>
              
              <p className="text-base sm:text-lg text-gray-700 leading-relaxed mb-8 md:mb-12 font-light">
                Indigo is committed to continuously expanding and improving its Integrated Management Systems and keeping all certifications and accreditation up to date.
              </p>
              
              <div className="grid grid-cols-3 gap-2 sm:gap-4">
                {['ISO 9001', 'ISO 14001', 'ISO 45001', 'ISO 27001', 'ISO 50001', 'SOC 2'].map((cert, i) => (
                  <div 
                    key={i}
                     className="group border border-gray-200 p-3 sm:p-4 md:p-6 text-center transition-all duration-300 hover:border-[#140079] hover:bg-[#411fed]/10 bg-white shadow-sm hover:shadow-md"
                     style={{ animationDelay: `${i * 0.05}s` }}
                  >
                    <div className="text-xs sm:text-sm font-medium text-gray-700 group-hover:text-[#140079] transition-colors">{cert}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className={`relative ${isVisible[3] ? 'animate-fadeInRight' : 'opacity-0'}`}>
              <div className="relative h-[500px] flex items-center justify-center">
                {/* Professional device mockup */}
                <div className="w-64 h-[480px] bg-gradient-to-b from-[#140079] to-blue-600 rounded-[30px] p-2 shadow-2xl" style={{ animation: 'gentleFloat 4.5s ease-in-out infinite' }}>
                  <div className="w-full h-full bg-white rounded-[25px] p-6 overflow-hidden relative">
                    <div className="absolute top-6 left-1/2 transform -translate-x-1/2 w-20 h-1 bg-gray-300 rounded-full"></div>
                    
                    {/* Content inside device */}
                    <div className="mt-12 space-y-4">
                      <div className="w-full h-32 bg-gradient-to-br from-[#140079] to-blue-600 rounded-lg animate-pulse-subtle"></div>
                      <div className="grid grid-cols-2 gap-3">
                        <div className="h-20 bg-gray-100 rounded"></div>
                        <div className="h-20 bg-gray-100 rounded"></div>
                      </div>
                      <div className="space-y-2">
                        <div className="h-2 bg-gray-200 rounded w-3/4"></div>
                        <div className="h-2 bg-gray-200 rounded w-full"></div>
                        <div className="h-2 bg-gray-200 rounded w-2/3"></div>
                    </div>
                  </div>

                    {/* Floating UI elements */}
                    <div className="absolute bottom-6 right-6 w-12 h-12 bg-[#140079] rounded-full flex items-center justify-center">
                      <span className="text-white font-bold text-lg">+</span>
                </div>
                    </div>
                  </div>

                {/* Background accent */}
                <div className="absolute -z-10 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-br from-[#411fed]/20 to-[#411fed]/10 rounded-full opacity-50" style={{ animation: 'gentleFloatSlow 8s ease-in-out infinite' }}></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Timeline - Train Effect */}
      <section 
        ref={(el) => { sectionRefs.current[4] = el; }}
        className="timeline-section min-h-screen py-24 md:py-32 bg-white overflow-hidden"
      >
        <div className="container mx-auto px-6 lg:px-12">
          <div className={`text-center mb-20 ${isVisible[4] ? 'animate-fadeInUp' : 'opacity-0'}`}>
            <span className="text-xs tracking-[0.3em] text-gray-600 uppercase">25 Years of Excellence</span>
            <h2 className="text-4xl lg:text-5xl font-light mt-4">
              Our <span className="font-bold text-[#140079]">History</span>
          </h2>
          </div>
          
                    {/* Train Container */}
          <div className="train-container">
            <div className={`train-track ${isTrainPaused ? 'paused' : ''}`}>
              {/* Duplicate the array to create seamless loop */}
              {[...historyData, ...historyData].map((item, index) => (
                <div 
                  key={index}
                  className="train-card group bg-white border border-gray-200 p-6 transition-all duration-500 hover:border-[#140079]/30 hover:shadow-lg flex-shrink-0"
                  onMouseEnter={() => {
                    if (window.innerWidth >= 1024) setIsTrainPaused(true);
                  }}
                  onMouseLeave={() => {
                    if (window.innerWidth >= 1024) setIsTrainPaused(false);
                  }}
                  onClick={() => {
                    if (window.innerWidth < 1024) setIsTrainPaused(prev => !prev);
                  }}
                >
                  <div className="text-2xl font-bold bg-gradient-to-r from-[#140079] to-blue-600 bg-clip-text text-transparent mb-3">
                    {item.year}
                  </div>
                  <h3 className="text-lg font-medium mb-3 text-gray-900 group-hover:text-[#140079] transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-sm text-gray-600 whitespace-pre-line leading-relaxed font-light">
                    {item.desc}
                  </p>
              </div>
            ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section 
        ref={(el) => { sectionRefs.current[5] = el; }}
        className="py-32 bg-gradient-to-b from-[#140079] to-blue-800 relative overflow-hidden"
      >
        {/* Background Image on Right */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-r from-[#140079] via-[#140079]/90 to-transparent"></div>
          <div 
            className="absolute right-0 top-0 w-1/2 h-full bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: 'url(/who-we-are/img-3.jpg)',
              maskImage: 'linear-gradient(to left, rgba(0,0,0,1) 0%, rgba(0,0,0,0.8) 70%, rgba(0,0,0,0) 100%)',
              WebkitMaskImage: 'linear-gradient(to left, rgba(0,0,0,1) 0%, rgba(0,0,0,0.8) 70%, rgba(0,0,0,0) 100%)'
            }}
          ></div>
        </div>

        <div className="container mx-auto px-6 lg:px-12 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left Content */}
            <div className={`${isVisible[5] ? 'animate-fadeInUp' : 'opacity-0'}`}>
              <span className="text-xs tracking-[0.3em] text-blue-200 uppercase">Get Started</span>
              <h2 className="text-4xl lg:text-5xl font-light mt-4 mb-8 text-white text-left">
                Want to <span className="font-bold">know more?</span>
              </h2>
              <p className="text-xl text-blue-100 mb-12 font-light leading-relaxed text-left">
                Get in touch to discover how we can partner to design, deploy, and support your digital infrastructure.
              </p>
              
              <div className="text-left">
                <button 
                  onClick={() => router.push('/get-in-touch')}
                  className="group relative overflow-hidden bg-white text-[#140079] px-12 py-5 font-medium text-sm tracking-wider uppercase transition-all duration-500 hover:text-white"
                >
                  <span className="relative z-10">Contact Us</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-blue-500 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500"></div>
                </button>
              </div>
            </div>
            
            {/* Right side - Image space (handled by background) */}
            <div className="hidden lg:block"></div>
          </div>
        </div>
      </section>

      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes gentleFloat {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-15px);
          }
        }

        @keyframes gentleFloatSlow {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-20px);
          }
        }

        @keyframes fadeInLeft {
          from {
            opacity: 0;
            transform: translateX(-30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes fadeInRight {
          from {
            opacity: 0;
            transform: translateX(30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes float-particle {
          0%, 100% {
            transform: translateY(0) translateX(0);
            opacity: 0;
          }
          10% {
            opacity: 1;
          }
          90% {
            opacity: 1;
          }
          50% {
            transform: translateY(-100px) translateX(50px);
          }
        }

        @keyframes pulse-subtle {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: 0.8;
          }
        }

        .animate-fadeInUp {
          animation: fadeInUp 0.8s cubic-bezier(0.4, 0, 0.2, 1) forwards;
        }

        .animate-fadeInLeft {
          animation: fadeInLeft 0.8s cubic-bezier(0.4, 0, 0.2, 1) forwards;
        }

        .animate-fadeInRight {
          animation: fadeInRight 0.8s cubic-bezier(0.4, 0, 0.2, 1) forwards;
        }

        .animate-fadeIn {
          animation: fadeIn 1s cubic-bezier(0.4, 0, 0.2, 1) forwards;
        }

        .animate-float-particle {
          animation: float-particle 10s ease-in-out infinite;
        }

        .animate-pulse-subtle {
          animation: pulse-subtle 4s ease-in-out infinite;
        }

        .counter {
          display: inline-block;
        }

        /* Custom scrollbar for light theme */
        ::-webkit-scrollbar {
          width: 10px;
        }

        ::-webkit-scrollbar-track {
          background: #f8fafc;
        }

        ::-webkit-scrollbar-thumb {
          background: #140079;
          border-radius: 5px;
        }

        ::-webkit-scrollbar-thumb:hover {
          background: #1e40af;
        }
        
        /* Stacked Cards Animation Styles */
        .stack-area {
          height: 100vh;
        }
        .stack-area .left .title {
          width: 420px;
        }
        .stack-area .left .sub-title {
          width: 420px;
        }
        .stack-area .pillar-card {
          width: 350px;
          height: 350px;
          border-radius: 25px;
          margin-bottom: 10px;
          position: absolute;
          top: calc(50% - 175px);
          left: calc(50% - 175px);
          transition: 0.5s ease-in-out;
          box-sizing: border-box;
          padding: 35px;
          display: flex;
          flex-direction: column;
          justify-content: flex-start;
        }
        
        /* Responsive card sizing for wider screens when cards are away (at bottom) */
        @media (min-width: 1440px) {
          .stack-area .pillar-card.away {
            width: 300px;
            height: 300px;
            top: calc(50% - 150px);
            left: calc(50% - 150px);
            padding: 30px;
          }
        }
        
        @media (min-width: 1920px) {
          .stack-area .pillar-card.away {
            width: 280px;
            height: 280px;
            top: calc(50% - 140px);
            left: calc(50% - 140px);
            padding: 25px;
          }
        }
        
        @media (min-width: 2560px) {
          .stack-area .pillar-card.away {
            width: 250px;
            height: 250px;
            top: calc(50% - 125px);
            left: calc(50% - 125px);
            padding: 20px;
          }
        }
        .stack-area .pillar-card .content {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: flex-start;
          text-align: left;
        }
        
        /* Responsive text scaling for wider screens when cards are away */
        @media (min-width: 1440px) {
          .stack-area .pillar-card.away .sub {
            font-size: 18px !important;
          }
          .stack-area .pillar-card.away .content {
            font-size: 26px !important;
          }
        }
        
        @media (min-width: 1920px) {
          .stack-area .pillar-card.away .sub {
            font-size: 16px !important;
          }
          .stack-area .pillar-card.away .content {
            font-size: 24px !important;
          }
        }
        
        @media (min-width: 2560px) {
          .stack-area .pillar-card.away .sub {
            font-size: 14px !important;
          }
          .stack-area .pillar-card.away .content {
            font-size: 22px !important;
          }
        }
        .stack-area .away {
          transform-origin: bottom left;
        }
        
        /* Responsive styles for pillar-cards div */
        .pillar-cards {
          width: 100%;
          height: 100%;
        }
        
        @media (max-width: 1023px) {
          .pillar-cards {
            transform: scale(0.6);
            margin-top: 80px;
          }
        }
        
        @media (max-width: 767px) {
          .pillar-cards {
            transform: scale(0.8);
            margin-top: 200px;
          }
        }
        
        @media (max-width: 480px) {
          .pillar-cards {
            transform: scale(0.9);
            margin-top: 130px;
          }
        }
        
        @media (max-width: 375px) {
          .pillar-cards {
            transform: scale(0.6);
            margin-top: 120px;
            padding-bottom: -200px;
            margin-bottom: -300px;
          }
        }
        
        @media (max-width: 320px) {
          .pillar-cards {
            transform: scale(0.5);
          }
        }
        @media (max-width: 1023px) {
          .stack-area .pillar-card {
            width: 350px;
            height: 350px;
            top: calc(60% - 175px);
            left: calc(50% - 175px);
            padding: 35px;
          }
          .stack-area .pillar-card.away {
            width: 300px;
            height: 300px;
            top: calc(60% - 150px);
            left: calc(50% - 150px);
            padding: 30px;
          }
          .stack-area .pillar-card.away .sub {
            font-size: 18px !important;
          }
          .stack-area .pillar-card.away .content {
            font-size: 26px !important;
          }
        }
        @media (max-width: 767px) {
          .stack-area .pillar-card {
            width: 350px;
            height: 350px;
            top: calc(65% - 175px);
            left: calc(50% - 175px);
            padding: 35px;
          }
          .stack-area .pillar-card.away {
            width: 280px;
            height: 280px;
            top: calc(65% - 140px);
            left: calc(50% - 140px);
            padding: 25px;
          }
          .stack-area .pillar-card.away .sub {
            font-size: 16px !important;
          }
          .stack-area .pillar-card.away .content {
            font-size: 24px !important;
          }
        }
        @media (max-width: 480px) {
          .stack-area .pillar-card {
            width: 350px;
            height: 350px;
            top: calc(70% - 175px);
            left: calc(50% - 175px);
            padding: 35px;
          }
          .stack-area .pillar-card.away {
            width: 250px;
            height: 250px;
            top: calc(70% - 125px);
            left: calc(50% - 125px);
            padding: 20px;
          }
          .stack-area .pillar-card.away .sub {
            font-size: 14px !important;
          }
          .stack-area .pillar-card.away .content {
            font-size: 22px !important;
          }
        }
        
        /* Train Effect Styles */
        .train-container {
          width: 100%;
          overflow: hidden;
          position: relative;
        }
        
        .train-track {
          display: flex;
          gap: 1.5rem;
          animation: trainMove 60s linear infinite;
          width: fit-content;
          will-change: transform;
        }
        
        .train-track.paused {
          animation-play-state: paused;
        }
        
        .train-card {
          width: 300px;
          min-height: 200px;
          border-radius: 12px;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
        }
        
        .train-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 8px 24px rgba(20, 0, 121, 0.15);
        }
        
        @keyframes trainMove {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        

        
        /* Responsive train cards */
        @media (max-width: 768px) {
          .train-card {
            width: 250px;
            min-height: 180px;
          }
          
          .train-track {
            gap: 1rem;
            animation-duration: 45s;
          }
        }
        
        @media (max-width: 480px) {
          .train-card {
            width: 220px;
            min-height: 160px;
          }
          
          .train-track {
            gap: 0.75rem;
            animation-duration: 40s;
          }
        }

        /* iPhone SE (375x667) and similar small mobile devices specific fixes */
        @media screen and (max-width: 375px) and (max-height: 667px) {
          /* Hero section adjustments for very small screens */
          .hero-section-small {
            min-height: 100vh !important;
            height: 100vh !important;
            padding-top: 60px !important;
            padding-bottom: 20px !important;
          }
          
          /* Reduce spacing for small screens */
          .hero-section-small .container {
            padding-top: 1rem !important;
            padding-bottom: 1rem !important;
          }
          
          /* Adjust grid gaps for small screens */
          .hero-section-small .grid {
            gap: 1rem !important;
          }
          
          /* Reduce text sizes for small screens */
          .hero-section-small h1 {
            font-size: 1.5rem !important;
            line-height: 1.2 !important;
          }
          
          .hero-section-small p {
            font-size: 0.875rem !important;
            line-height: 1.4 !important;
          }
          
          /* Adjust button size for small screens */
          .hero-section-small button {
            padding: 0.5rem 1rem !important;
            font-size: 0.75rem !important;
          }
          
          /* Reduce stats spacing for small screens */
          .hero-section-small .stats-section {
            gap: 1rem !important;
            padding-top: 1rem !important;
          }
          
          .hero-section-small .stats-section div {
            font-size: 1.25rem !important;
          }
          
          /* Adjust image container for small screens */
          .hero-section-small .image-container {
            min-height: 200px !important;
            max-height: 250px !important;
          }
          
          /* Reduce the stats labels text size specifically for iPhone SE */
          .hero-section-small .stats-section .text-xs {
            font-size: 0.625rem !important; /* 10px instead of 12px */
            line-height: 1.2 !important;
          }

          /* About Us section specific fixes for iPhone SE */
          .about-section-small {
            min-height: 100vh !important;
            height: 100vh !important;
            display: flex !important;
            align-items: center !important;
            justify-content: center !important;
            padding-top: 0 !important;
            padding-bottom: 0 !important;
          }
          
          .about-section-small .container {
            padding-top: 0.5rem !important;
            padding-bottom: 0.5rem !important;
            width: 100% !important;
          }
          
          .about-section-small .grid {
            gap: 1rem !important;
            min-height: calc(100vh - 120px) !important;
          }
          
          .about-section-small h2 {
            font-size: 1.5rem !important;
            line-height: 1.2 !important;
            margin-top: 0.5rem !important;
            margin-bottom: 1rem !important;
          }
          
          .about-section-small p {
            font-size: 0.75rem !important;
            line-height: 1.4 !important;
          }
          
          .about-section-small button {
            padding: 0.5rem 1rem !important;
            font-size: 0.75rem !important;
          }
          
          .about-section-small .image-container {
            height: 180px !important;
          }
          
          .about-section-small .geometric-accent {
            width: 16px !important;
            height: 16px !important;
            right: -8px !important;
          }
           
          /* Core Pillars section responsive styles */
          .stack-area {
            min-height: 100vh !important;
            padding-top: 2rem !important;
            padding-bottom: 2rem !important;
          }
          
          .stack-area .title {
            font-size: 2rem !important;
            line-height: 1.1 !important;
            margin-bottom: 1rem !important;
          }
          
          .stack-area h3 {
            font-size: 1.5rem !important;
            line-height: 1.2 !important;
            margin-bottom: 1rem !important;
          }
          
          .stack-area .sub-title {
            font-size: 0.75rem !important;
            line-height: 1.4 !important;
            margin-bottom: 2rem !important;
          }
          
          .stack-area .pillar-cards {
            gap: 1rem !important;
            width: 100% !important;
          }
          
          .stack-area .pillar-card {
            width: 100% !important;
            max-width: 320px !important;
            padding: 1rem !important;
            margin-bottom: 1rem !important;
          }
          
          .stack-area .pillar-card .sub {
            font-size: 1.25rem !important;
            margin-bottom: 0.75rem !important;
          }
          
          .stack-area .pillar-card .content {
            font-size: 1.25rem !important;
            line-height: 1.2 !important;
          }
          
          .stack-area .pillar-card .desc {
            font-size: 0.75rem !important;
            line-height: 1.4 !important;
            margin-top: 0.75rem !important;
          }

          .certifications-section-small {
            padding-top: 2rem !important;
            padding-bottom: 2rem !important;
          }
          .certifications-section-small .grid {
            gap: 0.5rem !important;
          }
          .certifications-section-small .grid-cols-3 > div {
            padding: 0.5rem !important;
          }
          .certifications-section-small .grid-cols-3 > div > div {
            font-size: 0.625rem !important;
          }

          /* Timeline mobile fit */
          .timeline-section {
            min-height: 100vh !important;
            padding-top: 4rem !important;
            padding-bottom: 4rem !important;
          }
          .timeline-section .train-card {
            padding: 1rem !important;
            width: 240px !important;
          }
          .timeline-section .train-card .text-2xl {
            font-size: 1rem !important;
          }
          .timeline-section .train-card h3 {
            font-size: 0.875rem !important;
            margin-bottom: 0.5rem !important;
          }
          .timeline-section .train-card p {
            font-size: 0.75rem !important;
          }
        }
      `}</style>
    </div>
  );
}