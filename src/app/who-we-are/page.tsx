'use client';

import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

// Register GSAP plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function WhoWeAre() {
  const [isVisible, setIsVisible] = useState<Record<number, boolean>>({});
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const sectionRefs = useRef<(HTMLElement | null)[]>([]);
  const stackAreaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);

    const observers = sectionRefs.current.map((ref, index) => {
      if (!ref) return null;
      
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setIsVisible(prev => ({ ...prev, [index]: true }));
          }
        },
        { threshold: 0.1 }
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
        className="relative min-h-screen flex items-center justify-center bg-gradient-to-b from-blue-50 via-white to-blue-50"
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
            className="absolute w-[600px] h-[600px] rounded-full opacity-20"
            style={{
              background: 'radial-gradient(circle, rgba(20, 0, 121, 0.3) 0%, transparent 70%)',
              filter: 'blur(40px)',
              transform: `translate(${mousePosition.x * 0.02}px, ${mousePosition.y * 0.02}px)`,
              right: '-200px',
              top: '-200px',
              transition: 'transform 0.3s ease-out'
            }}
          ></div>
          <div 
            className="absolute w-[500px] h-[500px] rounded-full opacity-15"
              style={{
              background: 'radial-gradient(circle, rgba(59, 130, 246, 0.2) 0%, transparent 70%)',
              filter: 'blur(40px)',
              transform: `translate(${-mousePosition.x * 0.02}px, ${-mousePosition.y * 0.02}px)`,
              left: '-200px',
              bottom: '-200px',
              transition: 'transform 0.3s ease-out'
            }}
          ></div>
        </div>

        <div className="container mx-auto px-6 lg:px-12 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className={`space-y-8 ${isVisible[0] ? 'animate-fadeInUp' : 'opacity-0'}`}>
              <div className="flex items-center gap-4 mb-8">
                <div className="w-16 h-[1px] bg-gradient-to-r from-transparent to-[#140079]"></div>
                <span className="text-xs tracking-[0.3em] text-gray-600 uppercase font-light">Digital Infrastructure</span>
              </div>
              
              <h1 className="text-5xl lg:text-7xl font-light leading-tight">
                <span className="font-thin text-gray-600">We are</span>
                <span className="block font-bold bg-gradient-to-r from-[#140079] to-blue-600 bg-clip-text text-transparent">
                  Indigo
                </span>
              </h1>
              
              <p className="text-lg text-gray-600 leading-relaxed max-w-xl font-light">
                We engineer a digital future by designing, deploying, and supporting the world's digital infrastructure, delivering successful outcomes for our customers and great careers for our people.
              </p>
              
              <div className="flex gap-4 pt-6">
                <button className="group relative px-8 py-4 overflow-hidden rounded-none border border-[#140079] transition-all duration-500">
                  <span className="relative z-10 font-medium text-sm tracking-wider uppercase text-[#140079]">Explore Solutions</span>
                  <div className="absolute inset-0 bg-[#140079] transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500"></div>
                </button>
              </div>

              <div className="flex gap-12 pt-8 border-t border-gray-200">
                <div>
                  <div className="text-4xl font-thin text-gray-900 mb-1">
                    <span className="counter" data-target="200">200</span>
                    <span className="text-[#140079]">+</span>
                  </div>
                  <div className="text-xs text-gray-500 uppercase tracking-wider">Global Projects</div>
                </div>
                <div>
                  <div className="text-4xl font-thin text-gray-900 mb-1">
                    <span className="counter" data-target="90">90</span>
                    <span className="text-[#140079]">+</span>
                </div>
                  <div className="text-xs text-gray-500 uppercase tracking-wider">Countries</div>
                </div>
              </div>
            </div>

                         <div className={`relative ${isVisible[0] ? 'animate-fadeIn' : 'opacity-0'}`}>
              <div className="relative w-full h-[600px] flex items-center justify-center">
                 {/* Professional Geometric Shape */}
                 <div className="absolute w-80 h-80 rounded-full bg-gradient-to-br from-[#140079] to-blue-600 opacity-90"></div>
                 
                 {/* Hero Image */}
                 <div className="relative z-10 w-96 h-96 rounded-lg overflow-hidden shadow-2xl">
                   <img 
                     src="/who-we-are/img-1.jpeg" 
                     alt="Indigo Digital Infrastructure" 
                     className="w-full h-full object-cover"
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
        className="py-32 bg-[#411fed]/10 text-gray-900 relative"
      >
        <div className="container mx-auto px-6 lg:px-12">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
                         <div className={`relative ${isVisible[1] ? 'animate-fadeInLeft' : 'opacity-0'}`}>
              <div className="relative">
                 <div className="w-72 h-72 bg-gradient-to-br from-[#140079] to-blue-600 rounded-full absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"></div>
                 
                 {/* About Us Image */}
                 <div className="relative z-10 w-full h-96 rounded-lg overflow-hidden shadow-2xl">
                   <img 
                     src="/who-we-are/img-2.jpg" 
                     alt="About Indigo Telecom Group" 
                     className="w-full h-full object-cover"
                   />
                 </div>
               </div>
               
               {/* Subtle geometric accent */}
               <div className="absolute -right-10 top-0 w-40 h-40 rounded-full bg-gradient-to-br from-[#411fed]/20 to-[#411fed]/30 opacity-30 z-20"></div>
              </div>
              
            <div className={`space-y-8 ${isVisible[1] ? 'animate-fadeInRight' : 'opacity-0'}`}>
              <div>
                <span className="text-xs tracking-[0.3em] text-gray-600 uppercase">Since 1998</span>
                <h2 className="text-4xl lg:text-5xl font-light mt-4 mb-8">
                  <span className="font-bold text-[#140079]">About</span> Us
                </h2>
            </div>

              <div className="space-y-6">
                <p className="text-lg text-gray-700 leading-relaxed font-light">
                Since 1998 we have been vital network and infrastructure partners to fixed, mobile carriers and hyperscalers across the enterprise sector. Rapidly expanding our footprint across North America, Europe and the world, we now operate in over 90 countries.
              </p>
                <p className="text-lg text-gray-700 leading-relaxed font-light">
                By providing our international clients with a local and global presence, we support infrastructure across the globe with a single point of contact to keep societies collaborating, today and tomorrow.
              </p>
              </div>
              
              <div className="pt-8">
                <button className="group relative overflow-hidden bg-[#140079] text-white px-8 py-4 transition-all duration-300">
                  <span className="relative z-10 text-sm tracking-wider uppercase font-medium">Learn More</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-blue-500 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
              </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Pillars - Stacked Cards Animation */}
      <section ref={stackAreaRef} className="stack-area flex flex-col lg:flex-row relative w-full bg-gradient-to-b from-white to-[#411fed]/10 text-gray-900">
        {/* Left copy */}
        <div className="left flex flex-col items-start justify-center lg:sticky top-0 lg:h-screen w-full lg:basis-1/2 p-6 pl-20">
          <h2 className="title text-6xl lg:text-7xl font-bold leading-tight text-left text-[#140079]">
            <span className="block">Our Core</span>
            <span className="block">Pillars</span>
          </h2>
          <div className="sub-title text-lg lg:text-xl mt-8 max-w-lg text-left leading-relaxed">
            <span className="inline text-gray-600">Excellence in everything we do. Built from strategic thinking, safety, vision, and commitment to deliver transformational solutions across the globe.</span>
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
                  <div className="sub text-2xl lg:text-3xl font-semibold mb-4 text-white/80">
                    {item.num}
                  </div>
                  <div className="content text-3xl lg:text-4xl font-bold leading-tight text-white flex-1 flex items-center">
                    {item.title}
                  </div>
                  <div className="desc text-base lg:text-lg text-white/70 mt-4 leading-relaxed">
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
        className="py-32 bg-[#411fed]/10 text-gray-900"
      >
        <div className="container mx-auto px-6 lg:px-12">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <div className={`${isVisible[3] ? 'animate-fadeInLeft' : 'opacity-0'}`}>
              <div>
                <span className="text-xs tracking-[0.3em] text-gray-600 uppercase">Industry Standards</span>
                <h2 className="text-4xl lg:text-5xl font-light mt-4 mb-8">
                  <span className="font-bold text-[#140079]">Certifications</span>
                </h2>
              </div>
              
              <p className="text-lg text-gray-700 leading-relaxed mb-12 font-light">
                Indigo is committed to continuously expanding and improving its Integrated Management Systems and keeping all certifications and accreditation up to date.
              </p>
              
              <div className="grid grid-cols-3 gap-4">
                {['ISO 9001', 'ISO 14001', 'ISO 45001', 'ISO 27001', 'ISO 50001', 'SOC 2'].map((cert, i) => (
                  <div 
                    key={i}
                     className="group border border-gray-200 p-6 text-center transition-all duration-300 hover:border-[#140079] hover:bg-[#411fed]/10 bg-white shadow-sm hover:shadow-md"
                     style={{ animationDelay: `${i * 0.05}s` }}
                  >
                    <div className="text-sm font-medium text-gray-700 group-hover:text-[#140079] transition-colors">{cert}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className={`relative ${isVisible[3] ? 'animate-fadeInRight' : 'opacity-0'}`}>
              <div className="relative h-[500px] flex items-center justify-center">
                {/* Professional device mockup */}
                <div className="w-64 h-[480px] bg-gradient-to-b from-[#140079] to-blue-600 rounded-[30px] p-2 shadow-2xl">
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
                <div className="absolute -z-10 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-br from-[#411fed]/20 to-[#411fed]/10 rounded-full opacity-50"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section 
        ref={(el) => { sectionRefs.current[4] = el; }}
        className="py-32 bg-white"
      >
        <div className="container mx-auto px-6 lg:px-12">
          <div className={`text-center mb-20 ${isVisible[4] ? 'animate-fadeInUp' : 'opacity-0'}`}>
            <span className="text-xs tracking-[0.3em] text-gray-600 uppercase">25 Years of Excellence</span>
            <h2 className="text-4xl lg:text-5xl font-light mt-4">
              Our <span className="font-bold text-[#140079]">History</span>
          </h2>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {historyData.map((item, index) => (
              <div 
                key={index}
                className={`group bg-white border border-gray-200 p-6 transition-all duration-500 hover:border-[#140079]/30 hover:shadow-lg ${
                  isVisible[4] ? 'animate-fadeInUp' : 'opacity-0'
                }`}
                style={{ animationDelay: `${Math.min(index * 0.03, 0.5)}s` }}
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
      </section>

      {/* CTA Section */}
      <section 
        ref={(el) => { sectionRefs.current[5] = el; }}
        className="py-32 bg-gradient-to-b from-[#140079] to-blue-800 relative overflow-hidden"
      >
        {/* Professional gradient background */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-transparent to-blue-900/20"></div>
        </div>

        <div className="container mx-auto px-6 lg:px-12 text-center relative z-10">
          <div className={`max-w-3xl mx-auto ${isVisible[5] ? 'animate-fadeInUp' : 'opacity-0'}`}>
            <span className="text-xs tracking-[0.3em] text-blue-200 uppercase">Get Started</span>
            <h2 className="text-4xl lg:text-5xl font-light mt-4 mb-8 text-white">
              Want to <span className="font-bold">know more?</span>
            </h2>
            <p className="text-xl text-blue-100 mb-12 font-light leading-relaxed">
              Get in touch to discover how we can partner to design, deploy, and support your digital infrastructure.
            </p>
            
            <button className="group relative overflow-hidden bg-white text-[#140079] px-12 py-5 font-medium text-sm tracking-wider uppercase transition-all duration-500 hover:text-white">
              <span className="relative z-10">Contact Us</span>
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-blue-500 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500"></div>
            </button>
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
      `}</style>
    </div>
  );
}