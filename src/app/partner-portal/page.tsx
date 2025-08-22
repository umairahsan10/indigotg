'use client';

import React, { useEffect, useRef } from 'react';
import Image from 'next/image';
import CTASection from '../solutions2/subfolders/cta';

export default function PartnerPortalPage() {
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

        /* Floating animation for data sheet elements */
        .floating-div {
          animation: floating 3s ease-in-out infinite;
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

        /* Floating Card Effects */
        .floating-card {
          animation: floating 6s ease-in-out infinite;
          box-shadow: 
            0 20px 40px rgba(0, 0, 0, 0.1),
            0 10px 20px rgba(0, 0, 0, 0.05),
            0 0 0 1px rgba(0, 0, 0, 0.02);
        }

        .floating-card:nth-child(2) {
          animation-delay: -3s;
        }

        .floating-card:hover {
          animation-play-state: paused;
        }

        .floating-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0) 100%);
          border-radius: 2rem;
          opacity: 0;
          transition: opacity 0.3s ease;
        }

        .floating-card:hover::before {
          opacity: 1;
        }

        /* Enhanced shadow for floating cards */
        .shadow-3xl {
          box-shadow: 
            0 25px 50px -12px rgba(0, 0, 0, 0.25),
            0 0 0 1px rgba(0, 0, 0, 0.05),
            0 10px 15px -3px rgba(0, 0, 0, 0.1),
            0 4px 6px -2px rgba(0, 0, 0, 0.05);
        }
      `}</style>
      <div className="min-h-screen bg-white">
        {/* Hero Section */}
        <section className="relative h-screen flex items-center overflow-hidden">
          {/* Background Image - Full Width */}
          <div className="absolute inset-0 z-0">
            <Image
              src="/solutions/card-images-3.jpg"
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
                  PARTNER PORTAL
                </p>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-8 leading-tight font-roboto">
                  Partner Portal
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

        

        {/* Password Protection Section */}
        <section className="min-h-[70vh] flex items-center mb-0 bg-white">
          <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <div ref={textRef4} className="space-y-8 text-content">
                <div className="max-w-2xl mx-auto">
                  <p className="text-lg md:text-xl text-[#140079] mb-8 leading-relaxed">
                    This content is password protected. To view it please enter your password below:
                  </p>
                  
                  <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                    <div className="flex items-center gap-3">
                      <label htmlFor="password" className="text-lg font-semibold text-[#140079]">
                        Password:
                      </label>
                      <input
                        type="password"
                        id="password"
                        className="w-128 px-60 py-2 bg-gray-100 border border-[#140079] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#140079] focus:border-transparent"
                        placeholder="Enter password"
                      />
                    </div>
                    <button className="inline-flex items-center space-x-2 bg-yellow-400 text-[#140079] px-8 py-2 rounded-xl font-semibold hover:bg-yellow-500 transition-colors duration-300">
                      <span>Enter</span>
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

                  {/* CTA Section */}
          <CTASection filename="partner-portal" />
      </div>
    </>
  );
}
