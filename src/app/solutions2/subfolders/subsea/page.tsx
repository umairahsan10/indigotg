'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import SubseaGlobe from '../../../components/SubseaGlobe';

export default function SubseaPage() {
  const [expandedSections, setExpandedSections] = useState<{ [key: string]: boolean }>({});
  const [currentSlide, setCurrentSlide] = useState(0);
  const timelineRef = useRef<HTMLDivElement>(null);
  const servicesRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Add a small delay to ensure the element is fully visible
            setTimeout(() => {
              entry.target.classList.add('animate-triggered');
            }, 200);
          }
        });
      },
      {
        threshold: 0.5, // Element must be 50% visible
        rootMargin: '0px 0px -100px 0px' // Trigger when element is 100px from bottom of viewport
      }
    );

    const timelineItems = document.querySelectorAll('.timeline-item');
    timelineItems.forEach((item) => observer.observe(item));

    return () => observer.disconnect();
  }, []);

  const toggleSection = (section: string) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const scrollToServices = () => {
    servicesRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToVideo = () => {
    videoRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const carouselData = [
    {
      id: 1,
      title: "Monitor",
      image: "/solutions/subsea/img01.png",
      description: "The Indigo security-aware NOC uses industry-leading tools and experts to maintain 24x7x365 visibility of customer networks and infrastructure, ensuring performance and security issues are identified quickly and accurately."
    },
    {
      id: 2,
      title: "Investigate",
      image: "/solutions/subsea/img02.png",
      description: "We use fully managed equipment, bespoke software, troubleshooting techniques, and management systems to detect, diagnose, and resolve potential and active incidents. Our systems and engineers detect anomalies proactively to solve an issue before it becomes service-affecting. Protecting your cable and securing the data on it."
    },
    {
      id: 3,
      title: "Manage",
      image: "/solutions/subsea/img03.png",
      description: "ISO standards and ITIL processes help ensure all activities are managed, communicated and resolved in alignment with agreed SLAs. Full end-to-end visibility ensures the fastest possible response times to issues and incidents. We have stringent controls across the system operations lifecycle – from onboarding and managing incidents, to change management and service reviews."
    },
    {
      id: 4,
      title: "Report",
      image: "/solutions/subsea/img04.png",
      description: "We capture every event and variable related to network operations. End-to-end activities surrounding incidents are available and transparent to customers in dashboards and formal reports. We use this data to identify trends and ensure continuous improvement."
    }
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % carouselData.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + carouselData.length) % carouselData.length);
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  return (
    <div className="min-h-screen bg-[#1A1A66]">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center">
        {/* Background Video */}
        <div className="absolute inset-0 z-0">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover"
          >
            <source src="/solutions/subsea/subsea.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-[#1A1A66] bg-opacity-70"></div>
        </div>

        {/* Content Container */}
        <div className="relative z-10 container mx-auto px-4 flex flex-col lg:flex-row items-center pt-12 lg:pt-0">
          {/* Left Content */}
          <div className="w-full lg:w-1/2 text-white lg:pr-8 text-center lg:text-left pt-12 lg:pt-0">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 lg:mb-6 leading-tight opacity-0 animate-[fadeInLeft_0.7s_ease-out_0.1s_forwards]">
              Protecting and connecting the world's submarine cable systems.
            </h1>
            <p className="text-base sm:text-lg mb-4 lg:mb-6 text-gray-300 opacity-0 animate-[fadeInUp_0.7s_ease-out_0.2s_forwards]">
              Indigo provides system operator support for modern submarine networks, transforming the legacy fault reporting mode into a modern proactive network analysis model, managing the entire system.
            </p>
            <p className="text-base sm:text-lg mb-6 lg:mb-8 text-gray-300 opacity-0 animate-[fadeInUp_0.7s_ease-out_0.3s_forwards]">
              With our Systems Operator Support model, Indigo manages the whole subsea system end to end with our 24x7x365 security-aware NOC.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center lg:justify-start opacity-0 animate-[fadeInRight_0.7s_ease-out_0.4s_forwards]">
              <button
                onClick={scrollToServices}
                className="bg-[#ffc300] hover:bg-white text-black px-6 sm:px-8 py-2 sm:py-3 rounded-lg font-medium transition-colors duration-300 text-sm sm:text-base"
              >
                LEARN MORE
              </button>
              <button
                onClick={scrollToVideo}
                className="bg-[#ffc300] hover:bg-white text-black px-6 sm:px-8 py-2 sm:py-3 rounded-lg font-medium transition-colors duration-300 text-sm sm:text-base"
              >
                WATCH VIDEO
              </button>
            </div>
          </div>

          <style jsx>{`
      @keyframes fadeInLeft {
        0% {
          opacity: 0;
          transform: translateX(-50px);
        }
        100% {
          opacity: 1;
          transform: translateX(0);
        }
      }

      @keyframes fadeInUp {
        0% {
          opacity: 0;
          transform: translateY(30px);
        }
        100% {
          opacity: 1;
          transform: translateY(0);
        }
      }

      @keyframes fadeInRight {
        0% {
          opacity: 0;
          transform: translateX(50px);
        }
        100% {
          opacity: 1;
          transform: translateX(0);
        }
      }

      @keyframes fadeInScale {
        0% {
          opacity: 0;
          transform: scale(0.8);
        }
        100% {
          opacity: 1;
          transform: scale(1);
        }
      }
    `}</style>

          {/* Right Globe */}
          <div className="w-full lg:w-1/2 flex justify-center mt-1 lg:mt-0 opacity-0 animate-[fadeInScale_0.8s_ease-out_0.5s_forwards]">
            <SubseaGlobe />
          </div>
        </div>
      </section>

      {/* Services Section - Three Columns */}
      <section ref={servicesRef} className="py-32 px-8 bg-[#140079] font-['Roboto']">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <div className="text-white text-2xl font-semibold mb-2 font-['Roboto']">INDIGO SUBSEA</div>
            <div className="text-gray-300 text-3xl font-['Roboto']">Minimizing submarine cable downtime</div>
          </div>

          {/* Three Column Grid */}
          <div className="grid md:grid-cols-3 gap-12">
            {/* Column 1 */}
            <div className="space-y-8 text-center lg:text-left">
              <div>
                <h3 className="text-white font-medium text-xl mb-2 font-['Roboto']">Comprehensive 24x7x365 Support:</h3>
                <p className="text-gray-300 font-light text-xl leading-relaxed font-['Roboto']">
                  Operating as a fully managed, security-aware NOC (Network Operations Centre), we offer round-the-clock support, serving as the sole point of contact for all client inquiries.
                </p>
              </div>
              <div>
                <h3 className="text-white font-medium text-xl mb-2 font-['Roboto']">Expertise and Certifications:</h3>
                <p className="text-gray-300 font-light text-xl leading-relaxed font-['Roboto']">
                  Our team has cultivated competencies and earned certifications to meet the evolving demands of a diverse and complex market.
                </p>
              </div>
              <div>
                <h3 className="text-white font-medium text-xl mb-2 font-['Roboto']">Industry Accreditations:</h3>
                <p className="text-gray-300 font-light text-xl leading-relaxed font-['Roboto']">
                  As one of a select few service companies, we proudly hold accreditation to ISO 27001 Information Security Management (including subsea), and adhere to NSA and NIST compliance standards.
                </p>
              </div>
            </div>

            {/* Column 2 */}
            <div className="space-y-8 text-center lg:text-left">
              <div>
                <h3 className="text-white font-medium text-xl mb-2 font-['Roboto']">24x7x365 Security Awareness:</h3>
                <p className="text-gray-300 font-light text-xl leading-relaxed font-['Roboto']">
                  Our Security Operations Center (SOC) ensures round-the-clock security.
                </p>
              </div>
              <div>
                <h3 className="text-white font-medium text-xl mb-2 font-['Roboto']">Controlled and Monitored Environment:</h3>
                <p className="text-gray-300 font-light text-xl leading-relaxed font-['Roboto']">
                  Our fully independent equipment is managed with precision, offering a 6-month forensic audit trail through a virtual environment.
                </p>
              </div>
              <div>
                <h3 className="text-white font-medium text-xl mb-2 font-['Roboto']">Tailored Solutions:</h3>
                <p className="text-gray-300 font-light text-xl leading-relaxed font-['Roboto']">
                  We provide bespoke software and tools on a per-user basis for comprehensive control over all activities, enhancing security measures.
                </p>
              </div>
              <div>
                <h3 className="text-white font-medium text-xl mb-2 font-['Roboto']">Strategic Risk Mitigation:</h3>
                <p className="text-gray-300 font-light text-xl leading-relaxed font-['Roboto']">
                  Our team employs cyber threat intelligence specific to equipment, region, and environment, actively working to maximize cable uptime and secure data on the network.
                </p>
              </div>
            </div>

            {/* Column 3 */}
            <div className="space-y-8 text-center lg:text-left">
              <div>
                <h3 className="text-white font-medium text-xl mb-2 font-['Roboto']">Agile Escalation Support:</h3>
                <p className="text-gray-300 font-light text-xl leading-relaxed font-['Roboto']">
                  Our NOC team provides agile support, and seamlessly navigates every point of escalation.
                </p>
              </div>
              <div>
                <h3 className="text-white font-medium text-xl mb-2 font-['Roboto']">Comprehensive Network Expertise:</h3>
                <p className="text-gray-300 font-light text-xl leading-relaxed font-['Roboto']">
                  From securing networks to building IP sec tunnels, installing and commissioning hardware, and proactively monitoring for cable breaks, managing repair ships, our versatile team handles a spectrum of tasks.
                </p>
              </div>
              <div>
                <h3 className="text-white font-medium text-xl mb-2 font-['Roboto']">Predictive Outage Management:</h3>
                <p className="text-gray-300 font-light text-xl leading-relaxed font-['Roboto']">
                  Our overarching goal is to predict and remedy unplanned outages. We achieve this by integrating top-tier engineering talent with cutting-edge technologies, systems, and process automation within our NOC.
                </p>
              </div>
              <div className="mt-8">
                <button className="bg-[#ffc300] hover:bg-white text-black px-6 py-3 rounded-lg font-medium transition-colors duration-300 font-['Roboto']">
                  DOWNLOAD DATA SHEET
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Background Image Section */}
      <section className='py-20 bg-[#140079]'>
        <div className="relative py-40 px-4 bg-cover bg-center bg-no-repeat bg-fixed"
          style={{
            backgroundImage: 'url(/solutions/subsea/water-cable.jpg)',
          }}
        >
        </div>
      </section>

      {/* Video Section */}
      <section ref={videoRef} className="py-32 px-8 bg-[#140079] font-['Roboto'] min-h-[120vh] md:min-h-auto">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-24 items-center">
            {/* Video Player */}
            <div className="relative group">
              {/* 3D Floating Video Container */}
              <div className="relative transform transition-all duration-700 ease-out hover:scale-105 hover:-translate-y-4 hover:rotate-y-12 perspective-1000 animate-float">
                {/* Video with 3D effects */}
                <video
                  className="w-full rounded-lg shadow-2xl transform transition-all duration-500 ease-out group-hover:shadow-[0_35px_60px_-12px_rgba(255,195,0,0.4)]"
                  controls
                  poster="/solutions/subsea/video-front.png"
                  style={{
                    transform: 'rotateY(0deg) rotateX(8deg)',
                    transformStyle: 'preserve-3d',
                    boxShadow: '0 25px 50px rgba(0,0,0,0.4), 0 0 0 2px rgba(255,195,0,0.2)',
                  }}
                >
                  <source src="/solutions/subsea/subsea-video.mp4" type="video/mp4" />
                  Your browser does not support the video tag.
                </video>

                {/* Floating glow effect */}
                <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-[#ffc300]/30 via-[#ffc300]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 ease-out"></div>

                {/* 3D border effect */}
                <div className="absolute inset-0 rounded-lg border-2 border-[#ffc300]/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-out transform translate-z-4"></div>

                {/* Reflection effect */}
                <div className="absolute inset-0 rounded-lg bg-gradient-to-t from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-out"></div>
              </div>
            </div>

            {/* Content */}
            <div className="text-white text-center md:text-left">
              <h2 className="text-4xl font-medium mb-6 font-['Roboto']">Engineering a Digital Future</h2>
              <p className="text-xl font-light leading-relaxed mb-8 text-gray-300 font-['Roboto']">
                Find out more about how Indigo can support more than Subsea. We design, deploy, and support subsea, fixed line, data centers, and wireless networks, realizing and maximizing a future of meaningful connections.
              </p>
              <a href="/our-services">
                <button className="bg-[#ffc300] hover:bg-white text-black px-8 py-3 rounded-lg font-medium transition-all duration-300 font-['Roboto'] transform hover:scale-105 hover:shadow-xl hover:shadow-[#ffc300]/25">
                  OTHER INDIGO SERVICES
                </button>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Carousel Section */}
      <section className="py-20 px-8 bg-[#140079] font-['Roboto']">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-white text-3xl sm:text-4xl md:text-5xl font-medium mb-4 font-['Roboto']">How It Works</h2>
          </div>

          <div className="relative">
            {/* Carousel Container */}
            <div className="flex items-center">
              {/* Left Arrow */}
              <button
                onClick={prevSlide}
                className="absolute -left-2 sm:-left-4 z-10 text-white text-4xl sm:text-5xl md:text-7xl font-medium hover:text-[#ffc300] transition-colors duration-300"
              >
                ‹
              </button>

              {/* Main Content */}
              <div className="flex w-full px-4 sm:px-8">
                {/* Image Section */}
                <div className="w-1/2">
                  <div className="relative">
                    <Image
                      src={carouselData[currentSlide].image}
                      alt={carouselData[currentSlide].title}
                      width={600}
                      height={400}
                      className="w-full h-64 sm:h-64 md:h-96 object-cover rounded-l-lg"
                    />
                  </div>
                </div>

                {/* Content Section */}
                <div className="w-1/2">
                  <div className="bg-[#ffc300] p-4 sm:p-6 md:p-8 rounded-r-lg h-64 sm:h-64 md:h-96 flex flex-col justify-center">
                    <h3 className="text-white text-sm sm:text-2xl md:text-4xl font-medium font-['Roboto'] mb-2 sm:mb-3 md:mb-4">{carouselData[currentSlide].title}</h3>
                    <p className="text-white text-[8px] sm:text-base md:text-xl font-normal font-['Roboto'] leading-tight sm:leading-relaxed">
                      {carouselData[currentSlide].description}
                    </p>
                  </div>
                </div>
              </div>

              {/* Right Arrow */}
              <button
                onClick={nextSlide}
                className="absolute -right-2 sm:-right-4 z-10 text-white text-4xl sm:text-5xl md:text-7xl font-medium hover:text-[#ffc300] transition-colors duration-300"
              >
                ›
              </button>
            </div>

            {/* Dots Indicator */}
            <div className="flex justify-center mt-6 sm:mt-8 space-x-2 sm:space-x-4">
              {carouselData.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full transition-colors duration-300 ${index === currentSlide ? 'bg-[#ffc300]' : 'bg-white opacity-50'
                    }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Accordion Section */}
      <section className="py-20 px-4 bg-[#140079] font-['Roboto']">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="flex flex-col sm:flex-row justify-between items-center mb-12 gap-4 sm:gap-0">
            <h2 className="text-white text-3xl sm:text-4xl md:text-5xl font-normal font-['Roboto'] text-center sm:text-left">Globally Available</h2>
            <button className="bg-[#ffc300] hover:bg-white text-black px-4 sm:px-6 py-2 sm:py-3 rounded-lg font-medium transition-colors duration-300 font-['Roboto'] text-sm sm:text-base">
              DOWNLOAD FACT SHEET
            </button>
          </div>

          {/* Accordion Items */}
          <div className="space-y-0">
            {/* Item 1 */}
            <div className="border-t border-gray-600">
              <button
                onClick={() => toggleSection('global-logistics')}
                className="w-full flex justify-between items-center py-4 sm:py-6 text-white hover:text-[#ffc300] transition-colors duration-300"
              >
                <span className="text-base sm:text-lg md:text-xl font-light font-['Roboto']">GLOBAL LOGISTICS</span>
                <span className={`text-3xl sm:text-4xl md:text-5xl font-light transition-transform duration-400 ${expandedSections['global-logistics'] ? 'rotate-90' : ''}`}>
                  {expandedSections['global-logistics'] ? '×' : '+'}
                </span>
              </button>
              {expandedSections['global-logistics'] && (
                <div className="pb-4 sm:pb-6 text-gray-300">
                  <div className="grid md:grid-cols-2 gap-4 sm:gap-8">
                    <div className="space-y-3 sm:space-y-4">
                      <div className="flex items-start">
                        <span className="text-white text-lg sm:text-xl md:text-2xl mr-2 sm:mr-3 mt-1">+</span>
                        <p className="text-sm sm:text-base">A network of global engineering talent, ready to be deployed by our NOC.</p>
                      </div>
                      <div className="flex items-start">
                        <span className="text-white text-lg sm:text-xl md:text-2xl mr-2 sm:mr-3 mt-1">+</span>
                        <p className="text-sm sm:text-base">A fine-tuned logistics service that guarantee spares and replacements are quickly shipped.</p>
                      </div>
                    </div>
                    <div className="space-y-3 sm:space-y-4">
                      <div className="flex items-start">
                        <span className="text-white text-lg sm:text-xl md:text-2xl mr-2 sm:mr-3 mt-1">+</span>
                        <p className="text-sm sm:text-base">Minimise downtime and fix problems in any corner of the world.</p>
                      </div>
                      <div className="flex items-start">
                        <span className="text-white text-lg sm:text-xl md:text-2xl mr-2 sm:mr-3 mt-1">+</span>
                        <p className="text-sm sm:text-base">We can provide the necessary in-country presence with our importer/exporter of record (IOR/EOR) service to ensure efficient customs clearance of assets.</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Item 2 */}
            <div className="border-t border-gray-600">
              <button
                onClick={() => toggleSection('how-we-help')}
                className="w-full flex justify-between items-center py-4 sm:py-6 text-white hover:text-[#ffc300] transition-colors duration-300"
              >
                <span className="text-base sm:text-lg md:text-xl font-light font-['Roboto']">HOW WE HELP OUR CUSTOMERS</span>
                <span className={`text-3xl sm:text-4xl md:text-5xl font-light transition-transform duration-400 ${expandedSections['how-we-help'] ? 'rotate-90' : ''}`}>
                  {expandedSections['how-we-help'] ? '×' : '+'}
                </span>
              </button>
              {expandedSections['how-we-help'] && (
                <div className="pb-4 sm:pb-6 text-gray-300">
                  <div className="grid md:grid-cols-2 gap-4 sm:gap-8">
                    <div className="space-y-3 sm:space-y-4">
                      <div className="flex items-start">
                        <span className="text-white text-lg sm:text-xl md:text-2xl mr-2 sm:mr-3 mt-1">+</span>
                        <p className="text-sm sm:text-base">Our NOC engineers were monitoring a customer network when they identified a security problem.</p>
                      </div>
                      <div className="flex items-start">
                        <span className="text-white text-lg sm:text-xl md:text-2xl mr-2 sm:mr-3 mt-1">+</span>
                        <p className="text-sm sm:text-base">Rather than just a quick fix or living with the status quo, they investigated all legacy issues to determine a perfect solution.</p>
                      </div>
                    </div>
                    <div className="space-y-3 sm:space-y-4">
                      <div className="flex items-start">
                        <span className="text-white text-lg sm:text-xl md:text-2xl mr-2 sm:mr-3 mt-1">+</span>
                        <p className="text-sm sm:text-base">Our experts were able to spot anomalies because of their extensive experience in the industry.</p>
                      </div>
                      <div className="flex items-start">
                        <span className="text-white text-lg sm:text-xl md:text-2xl mr-2 sm:mr-3 mt-1">+</span>
                        <p className="text-sm sm:text-base">In just a few hours that expertise, along with our analytics and automation tools, identified a long-term solution to increase the efficiency of the cable and maximize uptime.</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Item 3 */}
            <div className="border-t border-gray-600">
              <button
                onClick={() => toggleSection('amitie-cable')}
                className="w-full flex justify-between items-center py-4 sm:py-6 text-white hover:text-[#ffc300] transition-colors duration-300"
              >
                <span className="text-base sm:text-lg md:text-xl font-light font-['Roboto']">THE AMITIÉ SUBSEA CABLE SYSTEM</span>
                <span className={`text-3xl sm:text-4xl md:text-5xl font-light transition-transform duration-400 ${expandedSections['amitie-cable'] ? 'rotate-90' : ''}`}>
                  {expandedSections['amitie-cable'] ? '×' : '+'}
                </span>
              </button>
              {expandedSections['amitie-cable'] && (
                <div className="pb-4 sm:pb-6 text-gray-300">
                  <div className="grid md:grid-cols-2 gap-4 sm:gap-8">
                    <div className="space-y-3 sm:space-y-4">
                      <div className="flex items-start">
                        <span className="text-white text-lg sm:text-xl md:text-2xl mr-2 sm:mr-3 mt-1">+</span>
                        <p className="text-sm sm:text-base">We've made it our mission to match its state-of-the-art technology with the highest level of monitoring and security compliance, all run from our subsea NOCs (Network Operations Centres) and supported by our SOC (Security Operations Centre).</p>
                      </div>
                    </div>
                    <div className="space-y-3 sm:space-y-4">
                      <div className="flex items-start">
                        <span className="text-white text-lg sm:text-xl md:text-2xl mr-2 sm:mr-3 mt-1">+</span>
                        <p className="text-sm sm:text-base">Core to our service is the open data communications network (DCN) we use to manage the cable system. It enables our NOC team to track performance and events on a 24x7x365 basis, with every event on the network meticulously analysed and documented in the Indigo trouble ticketing system.</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Key Services Section */}
      <section className="py-20 px-8 justify-center bg-[#140079] font-['Roboto']">
        <div className="max-w-7xl mx-auto">
          <div className="bg-[#e6f0ff] rounded-2xl p-12 shadow-xl">
            <h2 className="text-5xl font-light text-[#080260] mb-12 font-['Roboto'] text-center md:text-left">Key Services</h2>

            <div className="grid md:grid-cols-3 gap-12">
              {/* Column 1 */}
              <div className="text-center md:text-left">
                <h3 className="text-xl font-bold text-[#080260] font-['Roboto'] mb-4">End-to-end Systems Operator model</h3>
                <p className="text-[#080260] text-lg leading-relaxed font-['Roboto']">
                  We are changing how subsea cables are managed by providing agile support at every escalation point. Our team will leverage the data we collect and build Machine Learning (ML) tools to alert us to preventative actions and predict fault causes.
                </p>
              </div>

              {/* Column 2 */}
              <div className="text-center md:text-left">
                <h3 className="text-xl font-bold text-[#080260] font-['Roboto'] mb-4">Infrastructure audits</h3>
                <p className="text-[#080260] text-lg leading-relaxed font-['Roboto']">
                  We offer network and alarm monitoring, allowing detection, remote diagnosis and problem fixes, even before it becomes service affecting.
                </p>
              </div>

              {/* Column 3 */}
              <div className="text-center md:text-left">
                <h3 className="text-xl font-bold text-[#080260] font-['Roboto'] mb-4">Commissioning, decommissioning and migrations</h3>
                <p className="text-[#080260] text-lg leading-relaxed font-['Roboto']">
                  Whether you are migrating legacy network equipment/infrastructure to newer technology or simply moving/resizing your existing equipment, our multi-vendor skilled engineers use their years of experience in migrating terrestrial telecoms networks to all types of equipment and technologies.
                </p>
              </div>
            </div>
            <div className="grid md:grid-cols-3 gap-16 mt-8">
              {/* Column 1 */}
              <div className="text-center md:text-left">
                <h3 className="text-xl font-bold text-[#080260] font-['Roboto'] mb-4">Remote network monitoring</h3>
                <p className="text-[#080260] text-lg leading-relaxed font-['Roboto']">
                  Our team manages both the dispatch of engineers to site and the required spare parts to ensure SLA adherence. Should the need arise, SLA jeopardy management is owned via the shift team leaders with defined escalation paths. We install a Data Communications Network (DCN) for an added layer of security.
                </p>
              </div>

              {/* Column 2 */}
              <div className="text-center md:text-left">
                <h3 className="text-xl font-bold text-[#080260] font-['Roboto'] mb-4">Field engineering services</h3>
                <p className="text-[#080260] text-lg leading-relaxed font-['Roboto']">
                  Our field services operate on an emergency and planned/pre-arranged basis, allowing customers the flexibility to decide and schedule the dispatch of our engineers based on the criticality of the fault/issue. Our experts in PFE (Power Feeding Equipment), and SLTE (Submarine Line Terminal Equipment) ensure the end to end system is always optimised and ready to connect with backhaul networks or directly into local data centres.
                </p>
              </div>

              {/* Column 3 */}
              <div className="text-center md:text-left">
                <h3 className="text-xl font-bold text-[#080260] font-['Roboto'] mb-4">Security Operations Center</h3>
                <p className="text-[#080260] text-lg leading-relaxed font-['Roboto']">
                  We have developed an embedded security culture through awareness, education, and empowerment to ensure we deliver a great customer experience. Appropriate security controls are in place and operating effectively to deliver assurance and are at the heart of everything we do. Our DCN and remote access solution provides full end to end visibility ensuring the fastest possible response times to issues and incidents.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Meet the Team Timeline Section */}
      <section className="py-20 px-8 bg-[#140079] font-['Roboto'] overflow-hidden">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-20">
            <h2 className="text-white text-5xl font-light mb-6 font-['Roboto']">Meet the Team</h2>
            <p className="text-gray-300 text-xl font-light max-w-3xl mx-auto font-['Roboto']">
              By bringing together diverse perspectives and ideas in pursuit of shared goals, we deliver richer experiences for businesses and more meaningful connections for their customers.
            </p>
          </div>

          {/* Timeline Container */}
          <div className="relative">
            {/* Center Line - Left on mobile, center on desktop */}
            <div className="absolute left-2 md:left-1/2 md:transform md:-translate-x-1/2 w-1 h-full bg-[#ffc300]"></div>

            {/* Timeline Item 1 - All content on right for mobile */}
            <div className="timeline-item flex items-center mb-16 transform transition-all duration-1000 ease-out hover:scale-105 animate-slide-in-left">
              <div className="hidden md:block w-1/2 pr-12 text-right transform transition-all duration-700 ease-out hover:-translate-x-2">
                <div className="bg-white/5 backdrop-blur-md rounded-lg p-8 border border-white/30 shadow-lg transform transition-all duration-500 ease-out hover:shadow-xl">
                  <h3 className="text-[#ffc300] text-2xl font-bold mb-2">Kevin Foley</h3>
                  <p className="text-white text-lg font-medium mb-4">LEAD ARCHITECT</p>
                  <p className="text-gray-300 text-base leading-relaxed">
                    Kevin is a key player in developing Indigo Subsea innovative solutions. He is in charge of the technical role out as well as R&D. Kevin always keeps the long-term aspirational goals in check whilst rolling out technical solutions.
                  </p>
                </div>
              </div>
              <div className="w-8 h-8 bg-[#ffc300] rounded-full border-4 border-[#140079] relative z-10 transform transition-all duration-300 ease-out hover:scale-125"></div>
              <div className="w-full md:w-1/2 pl-12 transform transition-all duration-700 ease-out hover:translate-x-2">
                <div className="w-full md:w-48 h-40 md:h-48 rounded-lg overflow-hidden transform transition-all duration-500 ease-out hover:scale-105">
                  <Image
                    src="/solutions/subsea/KF.jpg"
                    alt="Kevin Foley"
                    width={192}
                    height={192}
                    className="w-full h-full object-cover"
                  />
                </div>
                {/* Mobile content - appears below image */}
                <div className="md:hidden mt-4 bg-white/5 backdrop-blur-md rounded-lg p-4 border border-white/30 shadow-lg">
                  <h3 className="text-[#ffc300] text-lg font-bold mb-2">Kevin Foley</h3>
                  <p className="text-white text-sm font-medium mb-2">LEAD ARCHITECT</p>
                  <p className="text-gray-300 text-xs leading-relaxed">
                    Kevin is a key player in developing Indigo Subsea innovative solutions. He is in charge of the technical role out as well as R&D. Kevin always keeps the long-term aspirational goals in check whilst rolling out technical solutions.
                  </p>
                </div>
              </div>
            </div>

            {/* Timeline Item 2 - Right */}
            <div className="timeline-item flex items-center mb-16 transform transition-all duration-1000 ease-out hover:scale-105 animate-slide-in-right">
              <div className="sm:hidden md:block w-1/2 pr-12 flex justify-end transform transition-all duration-700 ease-out hover:-translate-x-2">
                <div className="w-48 h-48 rounded-lg overflow-hidden flex justify-end transform transition-all duration-500 ease-out hover:scale-105">
                  <Image
                    src="/solutions/subsea/JF.jpg"
                    alt="Jeff Farra"
                    width={192}
                    height={192}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              <div className="w-8 h-8 bg-[#ffc300] rounded-full border-4 border-[#140079] relative z-10 transform transition-all duration-300 ease-out hover:scale-125"></div>
              <div className="w-full md:w-1/2 pl-12 transform transition-all duration-700 ease-out hover:translate-x-2">
                <div className="hidden md:block bg-white/5 backdrop-blur-md rounded-lg p-8 border border-white/30 shadow-lg transform transition-all duration-500 ease-out hover:shadow-xl">
                  <h3 className="text-[#ffc300] text-2xl font-bold mb-2">Jeff Farra</h3>
                  <p className="text-white text-lg font-medium mb-4">PRINCIPAL SUBSEA ENGINEER</p>
                  <p className="text-gray-300 text-base leading-relaxed">
                    Jeff leads the Indigo Subsea NOC in Denver, USA. He has deep understanding and expertise in supporting and developing optical transport and subsea networks. He is known for technical troubleshooting and problem resolution skills.
                  </p>
                </div>
                {/* Mobile content - appears below image */}
                <div className="md:hidden w-full md:w-48 h-40 md:h-48 rounded-lg overflow-hidden flex justify-end transform transition-all duration-500 ease-out hover:scale-105">
                  <Image
                    src="/solutions/subsea/JF.jpg"
                    alt="Jeff Farra"
                    width={192}
                    height={192}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="md:hidden mt-4 bg-white/5 backdrop-blur-md rounded-lg p-4 border border-white/30 shadow-lg">
                  <h3 className="text-[#ffc300] text-lg font-bold mb-2">Jeff Farra</h3>
                  <p className="text-white text-sm font-medium mb-2">PRINCIPAL SUBSEA ENGINEER</p>
                  <p className="text-gray-300 text-xs leading-relaxed">
                    Jeff leads the Indigo Subsea NOC in Denver, USA. He has deep understanding and expertise in supporting and developing optical transport and subsea networks. He is known for technical troubleshooting and problem resolution skills.
                  </p>
                </div>
              </div>
            </div>

            {/* Timeline Item 3 - All content on right for mobile */}
            <div className="timeline-item flex items-center transform transition-all duration-1000 ease-out hover:scale-105 animate-slide-in-left">
              <div className="hidden md:block w-1/2 pr-12 text-right transform transition-all duration-700 ease-out hover:-translate-x-2">
                <div className="bg-white/5 backdrop-blur-md rounded-lg p-8 border border-white/30 shadow-lg transform transition-all duration-500 ease-out hover:shadow-xl">
                  <h3 className="text-[#ffc300] text-2xl font-bold mb-2">Will Rendle</h3>
                  <p className="text-white text-lg font-medium mb-4">HEAD OF INFORMATION SECURITY</p>
                  <p className="text-gray-300 text-base leading-relaxed">
                    Will is our Head of Information Security and has set up a purpose built Security Operation Centre (SOC) to mitigate risks from cyber threats. The NOC is now security aware, with 24x7x365 SOC facilities.
                  </p>
                </div>
              </div>
              <div className="w-8 h-8 bg-[#ffc300] rounded-full border-4 border-[#140079] relative z-10 transform transition-all duration-300 ease-out hover:scale-125"></div>
              <div className="w-full md:w-1/2 pl-12 transform transition-all duration-700 ease-out hover:translate-x-2">
                <div className="w-full md:w-48 h-40 md:h-48 rounded-lg overflow-hidden transform transition-all duration-500 ease-out hover:scale-105">
                  <Image
                    src="/solutions/subsea/WR.jpeg"
                    alt="Will Rendle"
                    width={192}
                    height={192}
                    className="w-full h-full object-cover"
                  />
                </div>
                {/* Mobile content - appears below image */}
                <div className="md:hidden mt-4 bg-white/5 backdrop-blur-md rounded-lg p-4 border border-white/30 shadow-lg">
                  <h3 className="text-[#ffc300] text-lg font-bold mb-2">Will Rendle</h3>
                  <p className="text-white text-sm font-medium mb-2">HEAD OF INFORMATION SECURITY</p>
                  <p className="text-gray-300 text-xs leading-relaxed">
                    Will is our Head of Information Security and has set up a purpose built Security Operation Centre (SOC) to mitigate risks from cyber threats. The NOC is now security aware, with 24x7x365 SOC facilities.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* CTA Button */}
          <div className="text-center mt-16">
            <a href="/work-with-us">
              <button className="bg-[#ffc300] hover:bg-white text-black px-8 py-3 rounded-lg font-medium transition-colors duration-300">
                OPEN POSITIONS
              </button>
            </a>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section
        className="relative py-12 sm:py-16 md:py-20 px-4 bg-cover bg-center bg-no-repeat bg-fixed"
        style={{
          backgroundImage: 'url(/solutions/subsea/cables.jpg)',
        }}
      >
        <div className="absolute inset-0 bg-[#140079] bg-opacity-80"></div>

        <div className="relative z-10 max-w-2xl mx-auto text-center">
          <h2 className="text-white text-2xl sm:text-3xl md:text-4xl font-medium mb-4 font-['Roboto']">Contact Us</h2>

          <p className="text-gray-300 mb-6 sm:mb-8 font-['Roboto'] text-sm sm:text-base">
            Get in touch with our team to discuss your submarine cable support needs and discover how we can help protect and optimize your critical infrastructure.
          </p>

          <div className="space-y-3 sm:space-y-4 mb-6 sm:mb-8 font-['Roboto']">
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-6 justify-center">
              <a href="mailto:hello@indigosubsea.com" className="text-white hover:text-[#ffc300] transition-colors duration-300 text-sm sm:text-base">
                Email: hello@indigosubsea.com
              </a>
              <a href="tel:+447552816432" className="text-white hover:text-[#ffc300] transition-colors duration-300 text-sm sm:text-base">
                Tel: +44 7552 816 432
              </a>
            </div>
            <div className="text-white text-sm sm:text-base">Indigo Office, Denver, CO, 80202</div>
          </div>

          <a href="/get-in-touch">
            <button className="bg-white hover:bg-transparent border-2 border-white text-[#140079] hover:text-white px-6 sm:px-8 py-2 sm:py-3 rounded-lg font-medium transition-all duration-300 font-['Roboto'] text-sm sm:text-base">
              CONTACT US
            </button>
          </a>
        </div>
      </section>
    </div>
  );
}
