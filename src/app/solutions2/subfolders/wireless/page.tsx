'use client';

import React, { useEffect, useRef } from 'react';
import Image from 'next/image';
import CTASection from '../cta';

export default function WirelessPage() {
  const textRef1 = useRef<HTMLDivElement>(null);
  const videoRef1 = useRef<HTMLDivElement>(null);
  const textRef2 = useRef<HTMLDivElement>(null);
  const imageRef2 = useRef<HTMLDivElement>(null);
  const videoRef3 = useRef<HTMLDivElement>(null);
  const textRef3 = useRef<HTMLDivElement>(null);

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

    const refs = [textRef1, videoRef1, textRef2, imageRef2, videoRef3, textRef3];
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

        .video-content {
          opacity: 0;
          transform: translateX(100px) scale(0.8) rotateY(-15deg);
          transition: all 1.2s cubic-bezier(0.34, 1.56, 0.64, 1);
          filter: blur(3px);
        }

        .video-content.animate-in {
          opacity: 1;
          transform: translateX(0) scale(1) rotateY(0deg);
          filter: blur(0px);
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
        .video-content.animate-in .relative,
        .image-content.animate-in .relative {
          animation: imageGlow 1.5s ease-out 0.3s both, floating 3s ease-in-out infinite;
        }

        /* Floating animation for the video/image */
        .video-content .relative,
        .image-content .relative {
          animation: floating 3s ease-in-out infinite;
        }

        /* Enhanced shadow for video/image container */
        .video-shadow,
        .image-shadow {
          box-shadow: 
            0 20px 40px rgba(0, 0, 0, 0.8),
            0 10px 20px rgba(0, 0, 0, 0.6),
            0 5px 10px rgba(0, 0, 0, 0.5),
            0 0 0 3px rgba(0, 0, 0, 0.3);
          transition: box-shadow 0.3s ease;
          filter: drop-shadow(0 10px 20px rgba(0, 0, 0, 0.7));
        }

        .video-shadow:hover,
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

        /* Directional video/image animations */
        .video-content.video-left,
        .image-content.image-left {
          transform: translateX(-100px) scale(0.8) rotateY(15deg);
        }

        .video-content.video-right,
        .image-content.image-right {
          transform: translateX(100px) scale(0.8) rotateY(-15deg);
        }

        .video-content.video-left.animate-in,
        .video-content.video-right.animate-in,
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

        /* Video player styles */
        .video-player {
          position: relative;
          background: #000;
          border-radius: 16px;
          overflow: hidden;
          cursor: pointer;
          transition: transform 0.3s ease;
        }

        .video-player:hover {
          transform: scale(1.02);
        }

        .play-button {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 80px;
          height: 80px;
          background: rgba(255, 0, 0, 0.9);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 10;
        }

        .play-button svg {
          width: 30px;
          height: 30px;
          fill: white;
          margin-left: 4px;
        }

        .video-title {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          background: rgba(0, 0, 0, 0.7);
          color: white;
          padding: 12px 16px;
          font-size: 14px;
          font-weight: 500;
        }

        .video-link {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          background: rgba(0, 0, 0, 0.7);
          color: white;
          padding: 8px 16px;
          font-size: 12px;
          text-decoration: none;
          transition: background 0.3s ease;
        }

        .video-link:hover {
          background: rgba(0, 0, 0, 0.9);
        }
      `}</style>
      <div className="min-h-screen bg-white overflow-hidden">
        {/* Hero Section */}
        <section className="relative h-screen flex items-center overflow-hidden">
          {/* Background Image - Full Width */}
          <div className="absolute inset-0 z-0">
            <Image
              src="/solutions/card-images-4.jpg"
              alt="Wireless Background"
              fill
              style={{ objectFit: 'cover' }}
              priority
            />
            <div className="absolute inset-0 bg-black bg-opacity-50"></div>
          </div>

          <div className="w-full h-full grid grid-cols-1 lg:grid-cols-2 relative z-10">
            {/* Left Div - Content */}
            <div className="flex items-center justify-center px-8 lg:px-16">
              <div className="text-white max-w-2xl">
                <p className="text-sm md:text-base text-gray-300 mb-4 font-roboto">
                  SOLUTIONS
                </p>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-8 leading-tight font-roboto">
                  Wireless
                </h1>
                <p className="text-lg md:text-xl leading-relaxed font-roboto">
                  Indigo has been providing wireless solutions to network operators for 25 years, from the first generation of mobile to emerging 5G technologies. In a fast-changing market with spiraling demand for high-speed data, we deliver a range of design, deploy and support services to assure the resiliency and reliability of your networks.                </p>
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
                  Wireless
                </li>
              </ol>
            </nav>
          </div>
        </section>

        {/* First Section - Design and Deployment Services */}
        <section className="min-h-[90vh] flex items-center mb-10 mt-10 bg-white">
          <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              {/* Left Section - Video */}
              <div ref={videoRef1} className="relative video-content video-left">
                <div className="relative rounded-2xl overflow-hidden video-shadow">
                  <div className="video-player h-[400px] w-full">
                    <iframe
                      src="https://www.youtube.com/embed/JDZRSnYTon0?rel=0&modestbranding=1"
                      title="Indigo Global Network Solutions"
                      className="w-full h-full rounded-2xl"
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    ></iframe>
                  </div>
                </div>
              </div>

              {/* Right Section - Text Content */}
              <div ref={textRef1} className="space-y-6 text-content">
                <p className="text-lg md:text-xl text-[#140079] leading-relaxed font-roboto">
                  As well as designing and planning new network infrastructure, we offer upgrade, refresh, equipment swap, decommissioning /NTQ and network sharing solutions. We design and deploy greenfield, rooftop and street works sites. Our diversity has enabled us to support the development of emerging technologies such as Private 5G networks and small cell deployment, to ensure high-speed coverage in urban areas.

                </p>
                <p className="text-lg md:text-xl text-[#140079] leading-relaxed font-roboto">
                  We can carry out detailed site surveys and complete complex design and deployment projects across multiple radio technologies and both microwave and fixed line backhaul solutions. We offer either full turnkey or tailored services to include site access, traffic/pedestrian management, MEWP/rope access, equipment installation, commissioning and upgrades.
                </p>
                <p className="text-lg md:text-xl text-[#140079] leading-relaxed font-roboto">
                  At ground level, we also provide power connection and upgrade services.

                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Second Section - Partners in Business Strategy */}
        <section className="min-h-[90vh] flex items-center mb-10 bg-gradient-to-r from-purple-200 to-orange-100">
          <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              {/* Left Section - Text Content */}
              <div ref={textRef2} className="space-y-6 text-content">
                <p className="text-lg md:text-xl text-[#140079] leading-relaxed font-roboto">
                  We make it our business to stay ahead of the curve of next-generation wireless networks and services which are delivered by a highly qualified team of mobile engineers, working to best-in-class industry standards.

                </p>
                <p className="text-lg md:text-xl text-[#140079] leading-relaxed font-roboto">
                  Our purpose-built centralised Network Operations Centre (NOC) is the single point of contact for all reactive and proactive wireless support and maintenance requirements. Our NOC support staff manage the dispatch of the field service engineers 24x7x365, whether related to a rigging fault, test error or fault diagnosis. Our field service engineers also provide first line maintenance on ground level equipment to ensure end-to-end service delivery.

                </p>
                <p className="text-lg md:text-xl text-[#140079] leading-relaxed font-roboto">
                  Our rapid response and global footprint means that we are always available to provide on-site support to meet the 2 hour, 4 hour or pre-arranged time to site service level agreement.

                </p>
              </div>

              {/* Right Section - Image */}
              <div ref={imageRef2} className="relative image-content image-right">
                <div className="relative rounded-2xl overflow-hidden image-shadow">
                  <Image
                    src="/solutions/card-images-4.jpg"
                    alt="Telecommunications Tower"
                    width={700}
                    height={400}
                    className="w-full h-[400px] object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Third Section - Wireless Services Include */}
        <section className="min-h-[90vh] flex items-center mb-0 bg-white">
          <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              {/* Left Section - Video */}
              <div ref={videoRef3} className="relative video-content video-left">
                <div className="relative rounded-2xl overflow-hidden video-shadow">
                  <div className="video-player h-[400px] w-full">
                    <iframe
                      src="https://www.youtube.com/embed/W-ARen5UcG0?rel=0&modestbranding=1"
                      title="Indigo Global Network Solutions"
                      className="w-full h-full rounded-2xl"
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    ></iframe>
                  </div>
                </div>
              </div>

              {/* Right Section - Text Content */}
              <div ref={textRef3} className="space-y-6 text-content">
                <h2 className="text-4xl md:text-5xl lg:text-5xl font-roboto font-bold text-[#140079] leading-tight">
                  Our wireless services include:
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <ul className="space-y-3 text-lg md:text-xl text-[#140079] font-roboto">
                    <li className="flex items-start hover:text-yellow-500 transition-all duration-300     ">
                      <span className="text-[#140079] font-bold mr-3">•</span>
                      <span>Survey and Design</span>
                    </li>
                    <li className="flex items-start hover:text-yellow-500 transition-all duration-300 ">
                      <span className="text-[#140079] font-bold mr-3">•</span>
                      <span>Town Planning</span>
                    </li>
                    <li className="flex items-start hover:text-yellow-500 transition-all duration-300 ">
                      <span className="text-[#140079] font-bold mr-3">•</span>
                      <span>Passive Build</span>
                    </li>
                    <li className="flex items-start hover:text-yellow-500 transition-all duration-300 ">
                      <span className="text-[#140079] font-bold mr-3">•</span>
                      <span>Logistics and Warehousing</span>
                    </li>
                    <li className="flex items-start hover:text-yellow-500 transition-all duration-300 ">
                      <span className="text-[#140079] font-bold mr-3">•</span>
                      <span>Active Build</span>
                    </li>
                    <li className="flex items-start hover:text-yellow-500 transition-all duration-300 ">
                      <span className="text-[#140079] font-bold mr-3">•</span>
                      <span>Site Acceptance</span>
                    </li>
                    <li className="flex items-start hover:text-yellow-500 transition-all duration-300 ">
                      <span className="text-[#140079] font-bold mr-3">•</span>
                      <span>Network Integration</span>
                    </li>
                  </ul>
                  <ul className="space-y-3 text-lg md:text-xl text-[#140079] font-roboto">
                    <li className="flex items-start hover:text-yellow-500 transition-all duration-300 ">
                      <span className="text-[#140079] font-bold mr-3">•</span>
                      <span>Project Management</span>
                    </li>
                    <li className="flex items-start hover:text-yellow-500 transition-all duration-300 ">
                      <span className="text-[#140079] font-bold mr-3">•</span>
                      <span>Site Access</span>
                    </li>
                    <li className="flex items-start hover:text-yellow-500 transition-all duration-300 ">
                      <span className="text-[#140079] font-bold mr-3">•</span>
                      <span>Network Optimisation</span>
                    </li>
                    <li className="flex items-start hover:text-yellow-500 transition-all duration-300 ">
                      <span className="text-[#140079] font-bold mr-3">•</span>
                      <span>Operations & Maintenance</span>
                    </li>
                    <li className="flex items-start hover:text-yellow-500 transition-all duration-300 ">
                      <span className="text-[#140079] font-bold mr-3">•</span>
                      <span>Network Monitoring</span>
                    </li>
                    <li className="flex items-start hover:text-yellow-500 transition-all duration-300 ">
                      <span className="text-[#140079] font-bold mr-3">•</span>
                      <span>Network Upgrades</span>
                    </li>
                    <li className="flex items-start hover:text-yellow-500 transition-all duration-300 ">
                      <span className="text-[#140079] font-bold mr-3">•</span>
                      <span>Global Spare Parts Management</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <CTASection filename="wireless" />
      </div>
    </>
  );
}
