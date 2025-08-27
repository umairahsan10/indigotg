'use client';

import React, { useEffect, useRef } from 'react';
import Image from 'next/image';
import CTASection from '../cta';

export default function NetworkPage() {
  const textRef1 = useRef<HTMLDivElement>(null);
  const imageRef1 = useRef<HTMLDivElement>(null);
  const textRef2 = useRef<HTMLDivElement>(null);
  const imageRef2 = useRef<HTMLDivElement>(null);
  const textRef3 = useRef<HTMLDivElement>(null);
  const imageRef3 = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Remove the class first to reset the animation
            entry.target.classList.remove('animate-in');
            // Force a reflow
            (entry.target as HTMLElement).offsetHeight;
            // Add the class to trigger the animation
            entry.target.classList.add('animate-in');
          } else {
            // Remove the class when element is out of view
            entry.target.classList.remove('animate-in');
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
      }
    );

    const refs = [textRef1, imageRef1, textRef2, imageRef2, textRef3, imageRef3];
    refs.forEach(ref => {
      if (ref.current) observer.observe(ref.current);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <>
      <style jsx global>{`
        .font-roboto {
          font-family: "Roboto", "Segoe UI", "Helvetica Neue", Arial, sans-serif;
        }

        /* Animation Classes */
        .text-content {
          opacity: 0;
          transform: translateX(-50px);
          transition: all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }

        .text-content.animate-in {
          opacity: 1;
          transform: translateX(0);
        }

        .image-content {
          opacity: 0;
          transform: translateX(100px) scale(0.8) rotateY(-15deg);
          transition: all 1.2s cubic-bezier(0.34, 1.56, 0.64, 1);
          filter: blur(3px);
        }

        .image-content.animate-in {
          opacity: 1;
          transform: translateX(0) scale(1) rotateY(0deg);
          filter: blur(0px);
        }

        /* Add a subtle glow effect on animation */
        .image-content.animate-in .relative {
          animation: imageGlow 1.5s ease-out 0.3s both, floating 3s ease-in-out infinite;
        }

        /* Floating animation for the image */
        .image-content .relative {
          animation: floating 3s ease-in-out infinite;
        }

        /* Enhanced shadow for image container */
        .image-shadow {
          box-shadow: 
            0 20px 40px rgba(0, 0, 0, 0.8),
            0 10px 20px rgba(0, 0, 0, 0.6),
            0 5px 10px rgba(0, 0, 0, 0.5),
            0 0 0 3px rgba(0, 0, 0, 0.3);
          transition: box-shadow 0.3s ease;
          filter: drop-shadow(0 10px 20px rgba(0, 0, 0, 0.7));
        }

        .image-shadow:hover {
          box-shadow: 
            0 20px 40px rgba(0, 0, 0, 0.7),
            0 10px 20px rgba(0, 0, 0, 0.5),
            0 5px 10px rgba(0, 0, 0, 0.4),
            0 0 0 2px rgba(0, 0, 0, 0.2);
          filter: drop-shadow(0 10px 20px rgba(0, 0, 0, 0.6));
        }

        @keyframes imageGlow {
          0% {
            box-shadow: 0 0 0 rgba(20, 0, 121, 0);
          }
          50% {
            box-shadow: 0 0 30px rgba(20, 0, 121, 0.3);
          }
          100% {
            box-shadow: 0 0 0 rgba(20, 0, 121, 0);
          }
        }

        @keyframes floating {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-10px);
          }
        }

        /* Enhanced text animations */
        .text-content h2 {
          opacity: 0;
          transform: translateY(-50px);
          transition: all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }

        .text-content.animate-in h2 {
          opacity: 1;
          transform: translateY(0);
          animation: slideInFromTop 0.8s ease-out 0.2s both;
        }

        .text-content p {
          opacity: 0;
          transform: translateY(20px);
          transition: all 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }

        .text-content.animate-in p {
          opacity: 1;
          transform: translateY(0);
          animation: fadeInLine 0.6s ease-out 0.6s both;
        }

        .text-content ul {
          opacity: 0;
          transform: translateY(20px);
          transition: all 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }

        .text-content.animate-in ul {
          opacity: 1;
          transform: translateY(0);
          animation: fadeInLine 0.6s ease-out 0.6s both;
        }

        .text-content li {
          opacity: 0;
          transform: translateY(10px);
          transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }

        .text-content.animate-in li {
          opacity: 1;
          transform: translateY(0);
        }

        .text-content.animate-in li:nth-child(1) { animation: fadeInLine 0.4s ease-out 0.8s both; }
        .text-content.animate-in li:nth-child(2) { animation: fadeInLine 0.4s ease-out 0.9s both; }
        .text-content.animate-in li:nth-child(3) { animation: fadeInLine 0.4s ease-out 1.0s both; }
        .text-content.animate-in li:nth-child(4) { animation: fadeInLine 0.4s ease-out 1.1s both; }
        .text-content.animate-in li:nth-child(5) { animation: fadeInLine 0.4s ease-out 1.2s both; }
        .text-content.animate-in li:nth-child(6) { animation: fadeInLine 0.4s ease-out 1.3s both; }
        .text-content.animate-in li:nth-child(7) { animation: fadeInLine 0.4s ease-out 1.4s both; }
        .text-content.animate-in li:nth-child(8) { animation: fadeInLine 0.4s ease-out 1.5s both; }
        .text-content.animate-in li:nth-child(9) { animation: fadeInLine 0.4s ease-out 1.6s both; }
        .text-content.animate-in li:nth-child(10) { animation: fadeInLine 0.4s ease-out 1.7s both; }
        .text-content.animate-in li:nth-child(11) { animation: fadeInLine 0.4s ease-out 1.8s both; }
        .text-content.animate-in li:nth-child(12) { animation: fadeInLine 0.4s ease-out 1.9s both; }
        .text-content.animate-in li:nth-child(13) { animation: fadeInLine 0.4s ease-out 2.0s both; }
        .text-content.animate-in li:nth-child(14) { animation: fadeInLine 0.4s ease-out 2.1s both; }

        /* Directional image animations */
        .image-content.image-left {
          transform: translateX(-100px) scale(0.8) rotateY(15deg);
        }

        .image-content.image-right {
          transform: translateX(100px) scale(0.8) rotateY(-15deg);
        }

        .image-content.image-left.animate-in,
        .image-content.image-right.animate-in {
          transform: translateX(0) scale(1) rotateY(0deg);
        }

        @keyframes slideInFromTop {
          from {
            opacity: 0;
            transform: translateY(-50px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fadeInLine {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        /* Custom yellow hover effect for links */
        .text-content li:hover .text-content a,
        .text-content li:hover span {
          color: #eab308 !important;
        }
        
        .text-content a:hover {
          color: #eab308 !important;
        }
      `}</style>
      <div className="min-h-screen bg-white overflow-hidden">
        {/* Hero Section */}
        <section className="relative h-screen flex items-center overflow-hidden">
          {/* Background Image - Full Width */}
          <div className="absolute inset-0 z-0">
            <Image
              src="/solutions/network.png"
              alt="Network Services Background"
              fill
              style={{ objectFit: 'cover' }}
              priority
            />
            <div className="absolute inset-0 bg-black bg-opacity-50"></div>
          </div>

          <div className="w-full h-full grid grid-cols-1 lg:grid-cols-2 relative z-10">
            {/* Left Div - Content */}
            <div className="flex items-center justify-center px-8 lg:px-16 pt-16 md:pt-0">
              <div className="text-white max-w-2xl text-center lg:text-left">
                <p className="text-sm md:text-base text-gray-300 mb-4 font-roboto">
                  SOLUTIONS
                </p>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-8 leading-tight font-roboto">
                  Network Services
                </h1>
                <p className="text-base md:text-lg lg:text-xl leading-relaxed font-roboto">
                  We work efficiently to minimize outage times to keep society collaborating. We monitor, maintain, and upgrade services around the clock, deploying our operations and multi-vendor engineers within hours or the next day to provide expert on-site support.
                </p>
                <button className="mt-8 bg-yellow-500 hover:bg-white hover:border-2 hover:border-yellow-500 text-white hover:text-yellow-500 px-9 py-2 rounded-full text-lg font-semibold transition-all duration-300 font-roboto">
                  JOIN THE TEAM
                </button>
              </div>
            </div>

            {/* Right Div - Empty but with background visible */}
            <div className="relative">
              {/* Empty div - background image shows through from parent */}
            </div>
          </div>
        </section>

        {/* Breadcrumb Navigation */}
        <section className="bg-white py-4">
          <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <nav className="breadcrumb-nav">
              <ol className="flex items-center space-x-2 text-sm">
                <li>
                  <a href="/" className="text-[#140079] hover:text-yellow-500 transition-colors duration-300 underline">
                    Home
                  </a>
                </li>
                <li className="text-[#140079]">•</li>
                <li>
                  <a href="/solutions" className="text-[#140079] hover:text-yellow-500 transition-colors duration-300 underline">
                    Digital Infrastructure Solutions
                  </a>
                </li>
                <li className="text-[#140079]">•</li>
                <li className="text-[#140079]">
                  Network Services
                </li>
              </ol>
            </nav>
          </div>
        </section>

        {/* First Section - Global Footprint */}
        <section className="min-h-[120vh] md:min-h-[90vh] flex items-center mb-10 bg-white">
          <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
              {/* Left Section - Image */}
              <div ref={imageRef1} className="relative image-content image-left order-1 flex justify-center">
                <div className="relative rounded-2xl overflow-hidden image-shadow w-[90%] lg:w-full">
                  <Image
                    src="/solutions/net/n1.png"
                    alt="Network Operations Center"
                    width={700}
                    height={400}
                    className="w-full h-[200px] md:h-[300px] lg:h-[400px] object-cover"
                  />
                </div>
              </div>

              {/* Right Section - Text Content */}
              <div ref={textRef1} className="space-y-4 lg:space-y-6 text-content order-2 text-center lg:text-left">
                <p className="text-base md:text-lg lg:text-xl text-[#140079] leading-relaxed font-roboto">

                  With a global footprint in over 60 countries and as an experienced fibre services provider, Indigo has developed an integrated services solution to assist telecommunications operators and service providers in meeting the growing demand for high-speed connectivity                </p>
                <p className="text-base md:text-lg lg:text-xl text-[#140079] leading-relaxed font-roboto">
                  We offer tried and tested network de-installation/de-commissioning solutions to safeguard any interruption to existing traffic on the network.

                </p>
                <p className="text-base md:text-lg lg:text-xl text-[#140079] leading-relaxed font-roboto">
                  Our highly skilled and fully accredited multi-vendor field engineers work hand in hand with our Prince 2 project management teams to ensure deployments are delivered right first time, to budget and customer quality requirements.

                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Second Section - Network Operations Centre */}
        <section className="min-h-[120vh] md:min-h-[90vh] flex items-center mb-10 bg-gradient-to-r from-gray-300 to-gray-200">
          <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
              {/* Left Section - Image */}
              <div ref={imageRef2} className="relative image-content image-right order-1 flex justify-center">
                <div className="relative rounded-2xl overflow-hidden image-shadow w-[90%] lg:w-full">
                  <Image
                    src="/solutions/net/n2.png"
                    alt="Network Operations Center Staff"
                    width={700}
                    height={400}
                    className="w-full h-[200px] md:h-[300px] lg:h-[400px] object-cover"
                  />
                </div>
              </div>

              {/* Right Section - Text Content */}
              <div ref={textRef2} className="space-y-4 lg:space-y-6 text-content order-2 text-center lg:text-left">
                <p className="text-base md:text-lg lg:text-xl text-[#140079] leading-relaxed font-roboto">
                  Our purpose-built Network Operations Centre (NOC) is the single point of contact for all reactive and proactive support and maintenance requirements.
                </p>
                <p className="text-base md:text-lg lg:text-xl text-[#140079] leading-relaxed font-roboto">
                  Fully staffed 24x7x365, our NOC support staff manage the dispatch of the field service engineers and can jointly control the escalation to second/third line support in conjunction with owning the spares parts management process.
                </p>
                <p className="text-base md:text-lg lg:text-xl text-[#140079] leading-relaxed font-roboto">
                  Should engineers have to be dispatched to your site, our rapid response and global footprint means that we are always available to provide on-site support to meet 2 hour, 4 hour or pre-arranged time to site service level agreements.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Third Section - Network Services Include */}
        <section className="min-h-[140vh] md:min-h-[120vh] flex items-center mb-0 bg-white">
          <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
              {/* Left Section - Image */}
              <div ref={imageRef3} className="relative image-content image-left order-1 flex justify-center">
                <div className="relative rounded-2xl overflow-hidden image-shadow w-[90%] lg:w-full">
                  <Image
                    src="/solutions/net/n3.png"
                    alt="Indigo Field Engineers"
                    width={700}
                    height={400}
                    className="w-full h-[200px] md:h-[300px] lg:h-[400px] object-cover"
                  />
                </div>
              </div>

              {/* Right Section - Text Content */}
              <div ref={textRef3} className="space-y-4 lg:space-y-6 text-content order-2 text-center lg:text-left">
                <h2 className="text-2xl md:text-3xl lg:text-4xl font-roboto font-bold text-[#140079] leading-tight">
                  Our Network Services Include
                </h2>
                <ul className="space-y-2 lg:space-y-3 text-base md:text-lg lg:text-xl text-[#140079] font-roboto">
                  <li className="flex items-start justify-center lg:justify-start">
                    <span className="text-[#140079] font-bold mr-3">•</span>
                    <a href="#" className="transition-all duration-300 cursor-pointer">Site survey and audit</a>
                  </li>
                  <li className="flex items-start justify-center lg:justify-start">
                    <span className="text-[#140079] font-bold mr-3">•</span>
                    <a href="#" className="transition-all duration-300 cursor-pointer">Logistics and warehousing</a>
                  </li>
                  <li className="flex items-start justify-center lg:justify-start">
                    <span className="text-[#140079] font-bold mr-3">•</span>
                    <a href="#" className="transition-all duration-300 cursor-pointer">Design, commissioning and project coordination (Fibre, FTTX, OSP)</a>
                  </li>
                  <li className="flex items-start justify-center lg:justify-start">
                    <span className="text-[#140079] font-bold mr-3">•</span>
                    <a href="#" className="transition-all duration-300 cursor-pointer">Site access</a>
                  </li>
                  <li className="flex items-start justify-center lg:justify-start">
                    <span className="text-[#140079] font-bold mr-3">•</span>
                    <a href="#" className="transition-all duration-300 cursor-pointer">Power supply and visual install</a>
                  </li>
                  <li className="flex items-start justify-center lg:justify-start">
                    <span className="text-[#140079] font-bold mr-3">•</span>
                    <a href="#" className="transition-all duration-300 cursor-pointer">Site survey, network audits and transmission (radio and fibre)</a>
                  </li>
                  <li className="flex items-start justify-center lg:justify-start">
                    <span className="text-[#140079] font-bold mr-3">•</span>
                    <a href="#" className="transition-all duration-300 cursor-pointer">Fibre characterisation and testing</a>
                  </li>
                  <li className="flex items-start justify-center lg:justify-start">
                    <span className="text-[#140079] font-bold mr-3">•</span>
                    <a href="#" className="transition-all duration-300 cursor-pointer">Active equipment installation & commissioning, decommissioning and migrations</a>
                  </li>
                  <li className="flex items-start justify-center lg:justify-start">
                    <span className="text-[#140079] font-bold mr-3">•</span>
                    <a href="#" className="transition-all duration-300 cursor-pointer">Config, Build, Provision and Operate (Documentation & testing)</a>
                  </li>
                  <li className="flex items-start justify-center lg:justify-start">
                    <span className="text-[#140079] font-bold mr-3">•</span>
                    <a href="#" className="transition-all duration-300 cursor-pointer">NOC Remote network monitoring</a>
                  </li>
                  <li className="flex items-start justify-center lg:justify-start">
                    <span className="text-[#140079] font-bold mr-3">•</span>
                    <a href="#" className="transition-all duration-300 cursor-pointer">NOC Proactive and reactive (on-site support)</a>
                  </li>
                  <li className="flex items-start justify-center lg:justify-start">
                    <span className="text-[#140079] font-bold mr-3">•</span>
                    <a href="#" className="transition-all duration-300 cursor-pointer">End to end network testing</a>
                  </li>
                  <li className="flex items-start justify-center lg:justify-start">
                    <span className="text-[#140079] font-bold mr-3">•</span>
                    <a href="#" className="transition-all duration-300 cursor-pointer">24/7/365 maintenance and monitoring services</a>
                  </li>
                  <li className="flex items-start justify-center lg:justify-start">
                    <span className="text-[#140079] font-bold mr-3">•</span>
                    <a href="#" className="transition-all duration-300 cursor-pointer">Spare parts management service (SPMS)</a>
                  </li>
                </ul>
                <div className="h-8 lg:h-12"></div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <CTASection filename="network" />
      </div>
    </>
  );
}
