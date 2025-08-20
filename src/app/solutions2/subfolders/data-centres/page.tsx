'use client';

import React, { useEffect, useRef } from 'react';
import Image from 'next/image';
import CTASection from '../cta';

export default function DataCentresPage() {
  const textRef1 = useRef<HTMLDivElement>(null);
  const imageRef1 = useRef<HTMLDivElement>(null);
  const textRef2 = useRef<HTMLDivElement>(null);
  const imageRef2 = useRef<HTMLDivElement>(null);
  const textRef3 = useRef<HTMLDivElement>(null);
  const imageRef3 = useRef<HTMLDivElement>(null);
  const textRef4 = useRef<HTMLDivElement>(null);
  const imageRef4 = useRef<HTMLDivElement>(null);

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

    const refs = [textRef1, imageRef1, textRef2, imageRef2, textRef3, imageRef3, textRef4, imageRef4];
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
      <div className="min-h-screen bg-white">
        {/* Hero Section */}
        <section className="relative h-screen flex items-center overflow-hidden">
          {/* Background Image - Full Width */}
          <div className="absolute inset-0 z-0">
            <Image
              src="/solutions/card-images-1.jpg"
              alt="Data Centres Background"
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
                  Data Centres
                </h1>
                <p className="text-lg md:text-xl leading-relaxed font-roboto">
                  Indigo partners closely with clients to tailor data centre engineering services to their specific infrastructure needs. We offer an extensive range of design, deployment, and support solutions focused on maximising the availability of high-performance data centre equipment, while optimising for cost, energy efficiency, and overall performance.
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

        {/* Experienced Data Centre Engineers Section */}
        <section className="min-h-[80vh] flex items-center mb-10 bg-white mt-10">
          <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              {/* Left Section - Image */}
              <div ref={imageRef1} className="relative image-content image-left">
                <div className="relative rounded-2xl overflow-hidden image-shadow">
                  <Image
                    src="/solutions/dc/dc1.jpg"
                    alt="Data Centre Engineers"
                    width={700}
                    height={400}
                    className="w-full h-[400px] object-cover"
                  />
                </div>
              </div>

              {/* Right Section - Text Content */}
              <div ref={textRef1} className="space-y-6 text-content">
                <h2 className="text-4xl md:text-5xl lg:text-5xl font-roboto font-bold text-[#140079] leading-tight">
                  Experienced Data Centre Engineers
                </h2>
                <p className="text-lg md:text-xl text-[#140079] leading-relaxed font-roboto">
                  Our qualified technicians are constantly adapting the latest tools and technology to make sure critical services and POPs (points-of-presence) are always available and never compromised. Our engineering experts meet the fast-changing challenges of security and safety at all times.
                </p>
                <p className="text-lg md:text-xl text-[#140079] leading-relaxed font-roboto">
                  In addition to providing comprehensive data centre design services, we deliver a complete range of deployment services such as rack, cabinet and power installation, together with commissioning and integration/migration of active equipment and servers.

                </p>
                <p className="text-lg md:text-xl text-[#140079] leading-relaxed font-roboto">
                  To further optimise quality and performance, we offer clients the option of warranted pre-terminated solutions to reduce deployment times. We also offer structured cabling and cross connects/Meet-Me Room connectivity.  In addition, we provide on-site power and energy management and maintenance services.

                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Data Centre Solutions Section */}
        <section className="min-h-[80vh] flex items-center mb-10 bg-white">
          <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              {/* Left Section - Text Content */}
              <div ref={textRef2} className="space-y-8 text-content">
                <h2 className="text-4xl md:text-5xl lg:text-5xl font-roboto font-bold text-[#140079] leading-tight">
                  Data Centre Solutions
                </h2>
                <p className="text-lg md:text-xl text-[#140079] leading-relaxed font-roboto">
                  Our solutions ensure uninterrupted critical services
                </p>
                <ul className="space-y-3 text-lg md:text-xl text-[#140079] font-roboto">
                  <li className="flex items-start">
                    <span className="text-[#140079] font-bold mr-3">•</span>
                    <a href="#" className="transition-all duration-300 cursor-pointer">Remote, reliable and accessible</a>
                  </li>
                  <li className="flex items-start">
                    <span className="text-[#140079] font-bold mr-3">•</span>
                    <a href="#" className="transition-all duration-300 cursor-pointer">Colocation and connectivity</a>
                  </li>
                  <li className="flex items-start">
                    <span className="text-[#140079] font-bold mr-3">•</span>
                    <a href="#" className="transition-all duration-300 cursor-pointer">24/7 and on-site personnel</a>
                  </li>
                  <li className="flex items-start">
                    <span className="text-[#140079] font-bold mr-3">•</span>
                    <a href="#" className="transition-all duration-300 cursor-pointer">Redundant power</a>
                  </li>
                  <li className="flex items-start">
                    <span className="text-[#140079] font-bold mr-3">•</span>
                    <a href="#" className="transition-all duration-300 cursor-pointer">Uninterrupted power supply</a>
                  </li>
                  <li className="flex items-start">
                    <span className="text-[#140079] font-bold mr-3">•</span>
                    <a href="#" className="transition-all duration-300 cursor-pointer">Environmental controls</a>
                  </li>
                  <li className="flex items-start">
                    <span className="text-[#140079] font-bold mr-3">•</span>
                    <a href="#" className="transition-all duration-300 cursor-pointer">Monitoring and reporting</a>
                  </li>
                  <li className="flex items-start">
                    <span className="text-[#140079] font-bold mr-3">•</span>
                    <a href="#" className="transition-all duration-300 cursor-pointer">Maintenance and warranties</a>
                  </li>
                  <li className="flex items-start">
                    <span className="text-[#140079] font-bold mr-3">•</span>
                    <a href="#" className="transition-all duration-300 cursor-pointer">Guaranteed service level certification</a>
                  </li>
                </ul>
              </div>

              {/* Right Section - Image */}
              <div ref={imageRef2} className="relative image-content image-right">
                <div className="relative rounded-2xl overflow-hidden image-shadow">
                  <Image
                    src="/solutions/dc/dc2.jpg"
                    alt="Data Centre Solutions"
                    width={700}
                    height={400}
                    className="w-full h-[400px] object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Data Centre eBook Section */}
        <section className="min-h-[80vh] flex items-center mb-10 bg-white">
          <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              {/* Left Section - Image */}
              <div ref={imageRef3} className="relative image-content image-left">
                <div className="relative rounded-2xl overflow-hidden image-shadow">
                  <Image
                    src="/solutions/dc/dc3.jpg"
                    alt="Data Centre eBook"
                    width={700}
                    height={400}
                    className="w-full h-[400px] object-cover"
                  />
                </div>
              </div>

              {/* Right Section - Text Content */}
              <div ref={textRef3} className="space-y-8 text-content">
                <h2 className="text-4xl md:text-5xl lg:text-5xl font-roboto font-bold text-[#140079] leading-tight">
                  Data Centre eBook
                </h2>
                <p className="text-lg md:text-xl text-[#140079] leading-relaxed font-roboto">
                  Our latest Data Centre eBook <strong>"How to design and maintain fit-for-purpose Data Centres"</strong> explores the demand for data centres, and identifies the challenges within the market currently.
                </p>
                <p className="text-lg md:text-xl text-[#140079] leading-relaxed font-roboto">
                  Alongside this analysis, the eBook outlines how Indigo can help with your bespoke requirements through our wide range of solutions.
                </p>
                <p className="text-lg md:text-xl text-[#140079] leading-relaxed font-roboto">Download our eBook by clicking <a href="#" className="text-[#140079] hover:text-yellow-500 transition-all duration-300 cursor-pointer underline">here</a>.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Data Sheets Section */}
        <section className="min-h-[80vh] flex items-center mb-20 bg-white">
          <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <div ref={textRef4} className="space-y-8 text-content">
                <h2 className="text-4xl md:text-5xl lg:text-5xl font-roboto font-bold text-[#140079] leading-tight">
                  Data Sheets
                </h2>
                <div className="flex flex-col md:flex-row gap-8 justify-center items-center mt-12">
                  <a href="/solutions/dc/indigo-data-sheet-DATA-CENTRE-DESIGN-1.pdf" download className="group flex items-center space-x-4 bg-[#140079] p-6 rounded-lg hover:shadow-lg transition-all duration-300 hover:bg-white hover:border-2 hover:border-[#140079] cursor-pointer">
                    <svg className="w-8 h-8 text-white group-hover:text-[#140079]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    <span className="text-lg font-semibold text-white group-hover:text-[#140079] font-roboto">Data Centre Design</span>
                    <svg className="w-6 h-6 text-white group-hover:text-[#140079]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </a>
                  <a href="/solutions/dc/Indigo-Data-Sheet-Data-Centre-Services.pdf" download className="group flex items-center space-x-4 bg-[#140079] p-6 rounded-lg hover:shadow-lg transition-all duration-300 hover:bg-white hover:border-2 hover:border-[#140079] cursor-pointer">
                    <svg className="w-8 h-8 text-white group-hover:text-[#140079]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    <span className="text-lg font-semibold text-white group-hover:text-[#140079] font-roboto">Data Centre Services</span>
                    <svg className="w-6 h-6 text-white group-hover:text-[#140079]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <CTASection />
      </div>
    </>
  );
}
