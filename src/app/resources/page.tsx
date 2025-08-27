'use client';

import React, { useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import CTASection from '../solutions2/subfolders/cta';

export default function Resources() {
  const textRef1 = useRef<HTMLDivElement>(null);
  const videoRef1 = useRef<HTMLDivElement>(null);
  const textRef2 = useRef<HTMLDivElement>(null);
  const videoRef2 = useRef<HTMLDivElement>(null);
  const downloadRef = useRef<HTMLDivElement>(null);
  const ebookRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.remove('animate-in');
            (entry.target as HTMLElement).offsetHeight;
            entry.target.classList.add('animate-in');
          } else {
            entry.target.classList.remove('animate-in');
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
      }
    );

    const refs = [textRef1, videoRef1, textRef2, videoRef2, downloadRef, ebookRef];
    refs.forEach(ref => {
      if (ref.current) observer.observe(ref.current);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <>
      <style jsx global>{`
        * {
          font-family: "Roboto", "Segoe UI", "Helvetica Neue", Arial, sans-serif;
        }

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

        /* Add a subtle glow effect on animation */
        .video-content.animate-in .relative {
          animation: imageGlow 1.5s ease-out 0.3s both, floating 3s ease-in-out infinite;
        }

        /* Floating animation for the video */
        .video-content .relative {
          animation: floating 3s ease-in-out infinite;
        }

        /* Enhanced shadow for video container */
        .video-shadow {
          box-shadow: 
            0 20px 40px rgba(0, 0, 0, 0.8),
            0 10px 20px rgba(0, 0, 0, 0.6),
            0 5px 10px rgba(0, 0, 0, 0.5),
            0 0 0 3px rgba(0, 0, 0, 0.3);
          transition: box-shadow 0.3s ease;
          filter: drop-shadow(0 10px 20px rgba(0, 0, 0, 0.7));
        }

        .video-shadow:hover {
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

        /* Directional video animations */
        .video-content.video-left {
          transform: translateX(-100px) scale(0.8) rotateY(15deg);
        }

        .video-content.video-right {
          transform: translateX(100px) scale(0.8) rotateY(-15deg);
        }

        .video-content.video-left.animate-in,
        .video-content.video-right.animate-in {
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

        /* Download and eBook sections */
        .download-section, .ebook-section {
          opacity: 0;
          transform: translateY(30px);
          transition: all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }

        .download-section.animate-in, .ebook-section.animate-in {
          opacity: 1;
          transform: translateY(0);
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

        /* Download and eBook item styles */
        .download-item, .ebook-item {
          display: flex;
          align-items: center;
          padding: 16px;
          border-bottom: 1px solid #e5e7eb;
          transition: background-color 0.3s ease;
        }

        .download-item:hover, .ebook-item:hover {
          background-color: #f9fafb;
        }

        .download-item:last-child, .ebook-item:last-child {
          border-bottom: none;
        }

                 .document-icon {
           width: 24px;
           height: 24px;
           margin-right: 16px;
           filter: brightness(0) saturate(100%) invert(8%) sepia(100%) saturate(7482%) hue-rotate(247deg) brightness(89%) contrast(118%);
         }

         .download-icon {
           width: 24px;
           height: 24px;
           margin-left: auto;
           cursor: pointer;
           transition: all 0.3s ease;
           display: flex;
           flex-direction: column;
           align-items: center;
           gap: 2px;
         }

         .download-icon:hover {
           transform: scale(1.1);
         }

         .download-icon:hover .download-arrow {
           filter: brightness(0) saturate(100%) invert(83%) sepia(31%) saturate(638%) hue-rotate(359deg) brightness(103%) contrast(107%);
         }

         .download-arrow {
           width: 16px;
           height: 16px;
           filter: brightness(0) saturate(100%) invert(8%) sepia(100%) saturate(7482%) hue-rotate(247deg) brightness(89%) contrast(118%);
           transition: filter 0.3s ease;
         }

         .download-line {
           width: 16px;
           height: 2px;
           background-color: #140079;
           border-radius: 1px;
           transition: background-color 0.3s ease;
         }

         .download-icon:hover .download-line {
           background-color: #fbbf24;
         }
      `}</style>
      
      <div className="min-h-screen bg-white overflow-hidden">
        {/* Hero Section - Using fixedline style with its background */}
        <section className="relative h-screen flex items-center overflow-hidden">
          {/* Background Image - Full Width */}
          <div className="absolute inset-0 z-0">
            <Image
              src="/resources/hero.png"
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
                <p className="text-sm md:text-base text-gray-300 mb-4">
                  RESOURCES
                </p>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-8 leading-tight">
                  Resources
                </h1>
                <p className="text-lg md:text-xl leading-relaxed">
                  Find out more about our business through our Videos and Datasheets.
                </p>
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
                <li className="text-[#140079]">
                  Resources
                </li>
              </ol>
            </nav>
          </div>
        </section>

        {/* Videos Section */}
        <section className="min-h-[90vh] flex items-center mb-10 bg-white mt-10">
          <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-[#140079] mb-6">
                Videos
              </h2>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              {/* Left Section - Video Card */}
              <div ref={videoRef1} className="relative video-content video-left">
                <div className="relative rounded-2xl overflow-hidden video-shadow">
                  <div className="video-player h-[400px] w-full">
                    <iframe
                      src="https://www.youtube.com/embed/v0AgTz_DTZ8?rel=0&modestbranding=1"
                      title="Indigo Corporate Video"
                      className="w-full h-full rounded-2xl"
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    ></iframe>
                  </div>
                  <div className="video-title">Indigo Corporate Video</div>
                  <a href="https://www.youtube.com/watch?v=v0AgTz_DTZ8" target="_blank" rel="noopener noreferrer" className="video-link">
                    Watch on YouTube
                  </a>
                </div>
              </div>

              {/* Right Section - Text Content */}
              <div ref={textRef1} className="space-y-6 text-content">
                <h2 className="text-4xl md:text-5xl lg:text-5xl font-bold text-[#140079] leading-tight">
                  Indigo Overview
                </h2>
                <p className="text-lg md:text-xl text-[#140079] leading-relaxed">
                  How is Indigo 'Engineering a Digital Future'? We have the engineering skills to help you design, deploy and support your fixed line, subsea, data centres, and wireless/5G infrastructure.
                </p>
                <Link href="/who-we-are" className="bg-yellow-500 hover:bg-white hover:border-2 hover:border-yellow-500 text-white hover:text-yellow-500 px-9 py-2 rounded-full text-lg font-semibold transition-all duration-300 inline-block">
                  Find out more →
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Meet the Indigo Team Section */}
        <section className="min-h-[90vh] flex items-center mb-10 bg-[#140079]">
          <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              {/* Left Section - Text Content */}
              <div ref={textRef2} className="space-y-6 text-content">
                <h2 className="text-4xl md:text-5xl lg:text-5xl font-bold text-white leading-tight">
                  Meet the Indigo team
                </h2>
                <p className="text-lg md:text-xl text-white leading-relaxed">
                  Find out what it's like to engineer a digital future from the people at Indigo. Join us and discover a dynamic career that values your talents.
                </p>
                <Link href="/work-with-us" className="bg-yellow-500 hover:bg-white hover:border-2 hover:border-yellow-500 text-white hover:text-yellow-500 px-9 py-2 rounded-full text-lg font-semibold transition-all duration-300 inline-block">
                  Work With Us →
                </Link>
              </div>

              {/* Right Section - Video Card */}
              <div ref={videoRef2} className="relative video-content video-right">
                <div className="relative rounded-2xl overflow-hidden video-shadow">
                  <div className="video-player h-[400px] w-full">
                    <iframe
                      src="https://www.youtube.com/embed/e7X9aZCV_QA?rel=0&modestbranding=1"
                      title="Meet the Indigo team"
                      className="w-full h-full rounded-2xl"
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    ></iframe>
                  </div>
                  <div className="video-title">Meet the Indigo team</div>
                  <a href="https://www.youtube.com/watch?v=e7X9aZCV_QA" target="_blank" rel="noopener noreferrer" className="video-link">
                    Watch on YouTube
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Download Section */}
        <section className="min-h-[90vh] flex items-center mb-10 bg-gray-50">
          <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-[#140079] mb-6">
                Download
              </h2>
            </div>
            <div ref={downloadRef} className="download-section max-w-4xl mx-auto">
              <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
                <div className="download-item">
                   <img src="/pdf.svg" alt="PDF Document" className="document-icon" />
                   <span className="text-lg text-[#140079]">Indigo Fibre Due Diligence Services</span>
                                     <a href="/resources/d1.pdf" download className="download-icon">
                     <img src="/download.svg" alt="Download" className="download-arrow" />
                   </a>
                </div>
                <div className="download-item">
                   <img src="/pdf.svg" alt="PDF Document" className="document-icon" />
                   <span className="text-lg text-[#140079]">Network Operations Centre</span>
                                     <a href="/resources/d2.pdf" download className="download-icon">
                     <img src="/download.svg" alt="Download" className="download-arrow" />
                   </a>
                </div>
                <div className="download-item">
                   <img src="/pdf.svg" alt="PDF Document" className="document-icon" />
                   <span className="text-lg text-[#140079]">Data Centre Services</span>
                                     <a href="/resources/d3.pdf" download className="download-icon">
                     <img src="/download.svg" alt="Download" className="download-arrow" />
                   </a>
                </div>
                <div className="download-item">
                   <img src="/pdf.svg" alt="PDF Document" className="document-icon" />
                   <span className="text-lg text-[#140079]">Indigo Small Cells</span>
                                     <a href="/resources/d4.pdf" download className="download-icon">
                     <img src="/download.svg" alt="Download" className="download-arrow" />
                   </a>
                </div>
                <div className="download-item">
                   <img src="/pdf.svg" alt="PDF Document" className="document-icon" />
                   <span className="text-lg text-[#140079]">Indigo Subsea</span>
                                     <a href="/resources/d5.pdf" download className="download-icon">
                     <img src="/download.svg" alt="Download" className="download-arrow" />
                   </a>
                </div>
                <div className="download-item">
                   <img src="/pdf.svg" alt="PDF Document" className="document-icon" />
                   <span className="text-lg text-[#140079]">Field engineering services and Global Service Desk</span>
                                     <a href="/resources/d6.pdf" download className="download-icon">
                     <img src="/download.svg" alt="Download" className="download-arrow" />
                   </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* eBooks Section */}
        <section className="min-h-[90vh] flex items-center mb-10 bg-gray-50">
          <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-[#140079] mb-6">
                eBooks
              </h2>
            </div>
            <div ref={ebookRef} className="ebook-section max-w-4xl mx-auto">
              <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
                <div className="ebook-item">
                   <img src="/book.svg" alt="PDF Document" className="document-icon" />
                   <span className="text-lg text-[#140079]">How to Design and Maintain Fit-for-Purpose Data Centres</span>
                                     <a href="/resources/e1.pdf" download className="download-icon">
                     <img src="/download.svg" alt="Download" className="download-arrow" />
                   </a>
                </div>
                <div className="ebook-item">
                   <img src="/book.svg" alt="PDF Document" className="document-icon" />
                   <span className="text-lg text-[#140079]">Secrets of a successful Fibre rollout</span>
                                     <a href="/resources/e2.pdf" download className="download-icon">
                     <img src="/download.svg" alt="Download" className="download-arrow" />
                   </a>
                </div>
                <div className="ebook-item">
                   <img src="/book.svg" alt="PDF Document" className="document-icon" />
                   <span className="text-lg text-[#140079]">Working at Indigo: Connecting People, Nurturing Talent</span>
                                     <a href="/resources/e3.pdf" download className="download-icon">
                     <img src="/download.svg" alt="Download" className="download-arrow" />
                   </a>
                </div>
                <div className="ebook-item">
                   <img src="/book.svg" alt="PDF Document" className="document-icon" />
                   <span className="text-lg text-[#140079]">Indigo Guide to Successfully Outsourcing Network Infrastructure Support Services</span>
                                     <a href="/resources/e4.pdf" download className="download-icon">
                     <img src="/download.svg" alt="Download" className="download-arrow" />
                   </a>
                </div>
                <div className="ebook-item">
                   <img src="/book.svg" alt="PDF Document" className="document-icon" />
                   <span className="text-lg text-[#140079]">Indigo's ESG report</span>
                                     <a href="/resources/e5.pdf" download className="download-icon">
                     <img src="/download.svg" alt="Download" className="download-arrow" />
                   </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <CTASection filename="resources" />
      </div>
    </>
  );
}
