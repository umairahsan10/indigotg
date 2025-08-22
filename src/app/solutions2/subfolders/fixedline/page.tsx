'use client';

import React, { useEffect, useRef } from 'react';
import Image from 'next/image';
import CTASection from '../cta';

export default function FixedLinePage() {
  const textRef1 = useRef<HTMLDivElement>(null);
  const imageRef1 = useRef<HTMLDivElement>(null);
  const textRef2 = useRef<HTMLDivElement>(null);
  const imageRef2 = useRef<HTMLDivElement>(null);
  const textRef3 = useRef<HTMLDivElement>(null);
  const imageRef3 = useRef<HTMLDivElement>(null);
  const textRef4 = useRef<HTMLDivElement>(null);
  const imageRef4 = useRef<HTMLDivElement>(null);
  const textRef5 = useRef<HTMLDivElement>(null);
  const imageRef5 = useRef<HTMLDivElement>(null);
  const textRef6 = useRef<HTMLDivElement>(null);
  const imageRef6 = useRef<HTMLDivElement>(null);

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

    const refs = [textRef1, imageRef1, textRef2, imageRef2, textRef3, imageRef3, textRef4, imageRef4, textRef5, imageRef5, textRef6, imageRef6];
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
              src="/solutions/card-images-1.png"
              alt="Fixed Line Background"
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
                  Fixed Line
                </h1>
                <p className="text-lg md:text-xl leading-relaxed font-roboto">
                  Indigo offers a full range of design, deployment, and support engineering services for modern digital infrastructure providers. Their expertise spans from planning fibre-to-the-home/premise solutions to delivering and sustaining high-availability, mission-critical fixed-line networks.
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
                  Fixed Line
                </li>
              </ol>
            </nav>
          </div>
        </section>

        {/* Survey, Design and Planning Section */}
        <section className="min-h-[90vh] flex items-center mb-10 bg-white">
          <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              {/* Left Section - Image */}
              <div ref={imageRef1} className="relative image-content image-left">
                <div className="relative rounded-2xl overflow-hidden image-shadow"  >
                  <Image
                    src="/solutions/line/l1.png"
                    alt="Survey, Design and Planning"
                    width={700}
                    height={400}
                    className="w-full h-[400px] object-cover"
                  />
                </div>
              </div>

              {/* Right Section - Text Content */}
              <div ref={textRef1} className="space-y-6 text-content">
                <h2 className="text-4xl md:text-5xl lg:text-5xl font-roboto font-bold text-[#140079] leading-tight">
                  Survey, Design and Planning
                </h2>
                <p className="text-lg md:text-xl text-[#140079] leading-relaxed font-roboto">
                  Through a powerful combination of survey, design and planning expertise, we have developed a unique solution encompassing high level designs, surveying, low level designs, bill of quantities, civils/cabling maps and hazard identification to meet the growing demand for fixed line connectivity, driven by governments that want to support evolving digital economies.            </p>
              </div>
            </div>
          </div>
        </section>

        {/* Experienced Fibre Services Section */}
        <section className="min-h-[90vh] flex items-center mb-10 bg-gradient-to-r from-blue-200 to-red-200">
          <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              {/* Left Section - Text Content */}
              <div ref={textRef2} className="space-y-6 text-content">
                <h2 className="text-4xl md:text-5xl lg:text-5xl font-roboto font-bold text-[#140079] leading-tight">
                  Experienced Fibre Services
                </h2>
                <p className="text-lg md:text-xl text-[#140079] leading-relaxed font-roboto">
                  Download our Fibre Services Infographic which shows where we worked, how many homes we have designed for, and much more.                </p>
                <button className="bg-yellow-500 hover:bg-white hover:border-2 hover:border-yellow-500 text-white hover:text-yellow-500 px-9 py-2 rounded-full text-lg font-semibold transition-all duration-300 font-roboto">
                  Download Now
                </button>
              </div>

              {/* Right Section - Infographic */}
              <div ref={imageRef2} className="relative image-content image-right">
                <div className="relative rounded-2xl overflow-hidden image-shadow">
                  <Image
                    src="/solutions/line/l2.png"
                    alt="Experienced Fibre Services"
                    width={700}
                    height={400}
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* End to End Planning Section */}
        <section className="min-h-[90vh] flex items-center mb-10 bg-white">
          <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              {/* Left Section - Image */}
              <div ref={imageRef3} className="relative image-content image-left">
                <div className="relative rounded-2xl overflow-hidden image-shadow">
                  <Image
                    src="/solutions/line/l3.png"
                    alt="End to End Planning"
                    width={700}
                    height={400}
                    className="w-full h-[400px] object-cover"
                  />
                </div>
              </div>

              {/* Right Section - Text Content */}
              <div ref={textRef3} className="space-y-6 text-content">
                <h2 className="text-4xl md:text-5xl lg:text-5xl font-roboto font-bold text-[#140079] leading-tight">
                  End to End Planning
                </h2>
                <p className="text-lg md:text-xl text-[#140079] leading-relaxed font-roboto">
                  Whether offering a “decoupled” design service or providing integrated design and deploy services, we work closely with digital infrastructure companies to roll out fixed lines in both urban and rural communities. We manage the deployment of the passive and active equipment, in addition to providing wayleave and consenting services to not only accelerate the customer connection time, but also to increase the amount of connections.                </p>
              </div>
            </div>  
          </div>
        </section>

        {/* Equipment Install and Decommissioning Section */}
        <section className="min-h-[90vh] space-y-4 flex items-center mb-10 bg-gradient-to-r from-blue-200 to-red-200">
          <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              {/* Left Section - Text Content */}
              <div ref={textRef4} className="space-y-3 text-content">
                <h2 className="text-4xl md:text-5xl lg:text-5xl font-roboto font-bold text-[#140079] leading-tight">
                  Equipment Install and Decommissioning
                </h2>
                <p className="text-lg md:text-xl text-[#140079] leading-relaxed font-roboto">
                  With a global footprint in over 90 countries and as
                  partner to most of the world’s top brands, we have developed an integrated services solution to assist telecommunications operators and service providers in meeting the growing demand for high speed connectivity.                </p>
                <p className="text-lg md:text-xl text-[#140079] leading-relaxed font-roboto">
                  We offer tried and tested network de-installation/de-commissioning solutions to safeguard any interruption to existing traffic on the network.
                </p>
                <p className="text-lg md:text-xl text-[#140079] leading-relaxed font-roboto">
                  Our highly skilled and fully accredited multi-vendor field engineers work hand in hand with our Prince 2 project management teams to ensure deployments are delivered right first time, to budget and customer quality requirements.
                </p>
              </div>

              {/* Right Section - Image */}
              <div ref={imageRef4} className="relative image-content image-right">
                <div className="relative rounded-2xl overflow-hidden image-shadow">
                  <Image
                    src="/solutions/line/l4.png"
                    alt="Equipment Install and Decommissioning"
                    width={700}
                    height={400}
                    className="w-full h-[400px] object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Maintenance and Support Section */}
        <section className="min-h-[90vh] flex items-center mb-10 bg-white">
          <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              {/* Left Section - Image */}
              <div ref={imageRef5} className="relative image-content image-left">
                <div className="relative rounded-2xl overflow-hidden image-shadow">
                  <Image
                    src="/solutions/line/l5.png"
                    alt="Maintenance and Support"
                    width={700}
                    height={400}
                    className="w-full h-[400px] object-cover"
                  />
                </div>
              </div>

              {/* Right Section - Text Content */}
              <div ref={textRef5} className="space-y-6 text-content">
                <h2 className="text-4xl md:text-5xl lg:text-5xl font-roboto font-bold text-[#140079] leading-tight">
                  Maintenance and Support of Fixed Line Networks
                </h2>
                <p className="text-lg md:text-xl text-[#140079] leading-relaxed font-roboto">
                  Our purpose-built Network Operations Centre (NOC) is the single point of contact for all reactive and proactive support and maintenance requirements. Fully staffed 24x7x365, our NOC support staff manage the dispatch of the field service engineers and can jointly control the escalation to second/third line support or fibre providers in conjunction with owning the spares parts management process.                </p>
                <p className="text-lg md:text-xl text-[#140079] leading-relaxed font-roboto">
                  Should engineers have to be dispatched to site, our rapid response and global footprint means that we are always available to provide on-site support to meet 2 hour, 4 hour or pre-arranged time to site service level agreements.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Our Fixed Line Services Include Section */}
        <section className="min-h-[90vh] flex items-center mb-0 bg-gradient-to-r from-blue-200 to-red-200">
          <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              {/* Left Section - Text Content */}
              <div ref={textRef6} className="text-content">
                <h2 className="text-4xl mb-4 md:text-5xl lg:text-5xl font-roboto font-bold text-[#140079] leading-tight">
                  Our fixed line services include:
                </h2>
                <ul className="space-y-3 text-lg md:text-xl text-[#140079] font-roboto">
                  <li className="flex items-start">
                    <span className="text-[#140079] font-bold mr-3">•</span>
                    <a href="#" className="transition-all duration-300 cursor-pointer">Pre-planning</a>
                  </li>
                  <li className="flex items-start">
                    <span className="text-[#140079] font-bold mr-3">•</span>
                    <a href="#" className="transition-all duration-300 cursor-pointer">Surveying</a>
                  </li>
                  <li className="flex items-start">
                    <span className="text-[#140079] font-bold mr-3">•</span>
                    <a href="#" className="transition-all duration-300 cursor-pointer">Planning and Design (HLD/LLD)</a>
                  </li>
                  <li className="flex items-start">
                    <span className="text-[#140079] font-bold mr-3">•</span>
                    <a href="#" className="transition-all duration-300 cursor-pointer">Route Proving</a>
                  </li>
                  <li className="flex items-start">
                    <span className="text-[#140079] font-bold mr-3">•</span>
                    <a href="#" className="transition-all duration-300 cursor-pointer">Passive and Active equipment build</a>
                  </li>
                  <li className="flex items-start">
                    <span className="text-[#140079] font-bold mr-3">•</span>
                    <a href="#" className="transition-all duration-300 cursor-pointer">Operations and maintenance</a>
                  </li>
                  <li className="flex items-start">
                    <span className="text-[#140079] font-bold mr-3">•</span>
                    <a href="#" className="transition-all duration-300 cursor-pointer">Spare parts management</a>
                  </li>
                  <li className="flex items-start">
                    <span className="text-[#140079] font-bold mr-3">•</span>
                    <a href="#" className="transition-all duration-300 cursor-pointer">Remote network monitoring</a>
                  </li>
                  <li className="flex items-start">
                    <span className="text-[#140079] font-bold mr-3">•</span>
                    <a href="#" className="transition-all duration-300 cursor-pointer">Network upgrades</a>
                  </li>
                </ul>
              </div>

              {/* Right Section - Image */}
              <div ref={imageRef6} className="relative image-content image-right">
                <div className="relative rounded-2xl overflow-hidden image-shadow">
                  <Image
                    src="/solutions/line/l6.png"
                    alt="Fixed Line Services"
                    width={700}
                    height={400}
                    className="w-full h-[400px] object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <CTASection filename="fixed-line" />
      </div>
    </>
  );
}
