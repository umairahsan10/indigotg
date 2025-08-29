'use client';

import React, { useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import CTASection from '../solutions/subfolders/cta';

export default function Responsibilities() {
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

    const refs = [textRef1, imageRef1, textRef2, imageRef2, textRef3, imageRef3];
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

        .image-content {
          opacity: 0;
          transform: translateX(100px) scale(0.8);
          transition: all 1.2s cubic-bezier(0.34, 1.56, 0.64, 1);
        }

        .image-content.animate-in {
          opacity: 1;
          transform: translateX(0) scale(1);
        }

        /* Enhanced shadow for image container */
        .image-shadow {
          box-shadow: 
            0 10px 20px rgba(0, 0, 0, 0.1),
            0 5px 10px rgba(0, 0, 0, 0.05);
          transition: box-shadow 0.3s ease;
        }

        .image-shadow:hover {
          box-shadow: 
            0 15px 30px rgba(0, 0, 0, 0.15),
            0 8px 15px rgba(0, 0, 0, 0.1);
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

        /* Directional image animations */
        .image-content.image-left {
          transform: translateX(-100px) scale(0.8);
        }

        .image-content.image-right {
          transform: translateX(100px) scale(0.8);
        }

        .image-content.image-left.animate-in,
        .image-content.image-right.animate-in {
          transform: translateX(0) scale(1);
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

        /* Explore button styles */
        .explore-button {
          background: #fbbf24;
          color: white;
          padding: 12px 24px;
          border-radius: 25px;
          font-weight: 600;
          text-decoration: none;
          display: inline-flex;
          align-items: center;
          gap: 8px;
          transition: all 0.3s ease;
          border: 2px solid #fbbf24;
        }

        .explore-button:hover {
          background: white;
          color: #fbbf24;
          border-color: #fbbf24;
          transform: translateY(-2px);
          box-shadow: 0 10px 20px rgba(251, 191, 36, 0.3);
        }

        .explore-button svg {
          transition: transform 0.3s ease;
        }

        .explore-button:hover svg {
          transform: translateX(4px);
        }
      `}</style>
      
      <div className="min-h-screen bg-white overflow-hidden">
        {/* Hero Section */}
        <section className="relative h-[50vh] lg:h-screen flex items-center overflow-hidden">
          {/* Background Image - Full Width */}
          <div className="absolute inset-0 z-0">
            <Image
              src="/responsibilities/rs_bg3.png"
              alt="Responsibilities Background"
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
                {/* <p className="text-sm md:text-base text-gray-300 mb-4">
                  RESPONSIBILITIES
                </p> */}
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mt-28 mb-8 leading-tight">
                  Responsibilities
                </h1>
                <p className="text-lg md:text-xl leading-relaxed mt-8">
                  Our commitment to sustainability, safety, and excellence in everything we do.
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
                  Responsibilities
                </li>
              </ol>
            </nav>
          </div>
        </section>

        {/* ESG Section */}
        <section className="min-h-[90vh] flex items-center mb-10 bg-white -mt-4 lg:mt-10">
          <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              {/* Left Section - ESG Image */}
              <div ref={imageRef1} className="relative image-content image-left">
                <div className="relative rounded-2xl overflow-hidden image-shadow">
                  <Image
                    src="/responsibilities/ESG-square.png"
                    alt="Environmental, Social, Governance"
                    width={500}
                    height={500}
                    className="w-full h-auto rounded-2xl"
                  />
                </div>
              </div>

              {/* Right Section - Text Content */}
              <div ref={textRef1} className="space-y-6 text-content">
                <h2 className="text-4xl md:text-5xl lg:text-5xl font-bold text-[#140079] leading-tight">
                  Environmental, Social, Governance
                </h2>
                <p className="text-lg md:text-xl text-[#140079] leading-relaxed">
                  We are committed to advancing long-term sustainability and social responsibility policies and practices to the benefit of our employees, shareholders, and society.
                </p>
                <a href="https://www.indigotg.com/responsibilities/environmental-social-governance/" target="_blank" rel="noopener noreferrer" className="explore-button">
                  Explore
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Safety, Health, Environment & Quality Section */}
        <section className="min-h-[90vh] flex items-center mb-10 bg-[#140079]">
          <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              {/* Left Section - Text Content */}
              <div ref={textRef2} className="space-y-6 text-content">
                <h2 className="text-4xl md:text-5xl lg:text-5xl font-bold text-white leading-tight">
                  Safety, Health, Environment & Quality
                </h2>
                <p className="text-lg md:text-xl text-white leading-relaxed">
                  We have Health and Safety at the heart of everything we do and protect our staff, our environment, and the quality of our designs and deliveries to the highest standard.
                </p>
                <a href="https://www.indigotg.com/responsibilities/safety-health-environment-quality/" target="_blank" rel="noopener noreferrer" className="explore-button">
                  Explore
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </a>
              </div>

              {/* Right Section - Safety Image */}
              <div ref={imageRef2} className="relative image-content image-right">
                <div className="relative rounded-2xl overflow-hidden image-shadow">
                  <Image
                    src="/responsibilities/safety_health.jpg"
                    alt="Fibre surveyors - Safety, Health, Environment & Quality"
                    width={500}
                    height={500}
                    className="w-full h-auto rounded-2xl"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Certifications Section */}
        <section className="min-h-[90vh] flex items-center mb-10 bg-white">
          <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              {/* Left Section - Certifications Image */}
              <div ref={imageRef3} className="relative image-content image-left">
                <div className="relative rounded-2xl overflow-hidden image-shadow">
                  <Image
                    src="/responsibilities/certifications.jpg"
                    alt="Certifications"
                    width={500}
                    height={500}
                    className="w-full h-auto rounded-2xl"
                  />
                </div>
              </div>

              {/* Right Section - Text Content */}
              <div ref={textRef3} className="space-y-6 text-content">
                <h2 className="text-4xl md:text-5xl lg:text-5xl font-bold text-[#140079] leading-tight">
                  Certifications
                </h2>
                <p className="text-lg md:text-xl text-[#140079] leading-relaxed">
                  Indigo is committed to continuously expanding and improving its Integrated Management Systems and keeping all certifications and accreditation up to date.
                </p>
                <a href="https://www.indigotg.com/responsibilities/certifications/" target="_blank" rel="noopener noreferrer" className="explore-button">
                  Explore
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <CTASection filename="responsibilities" />
      </div>
    </>
  );
}
