'use client';

import React, { useEffect, useRef } from 'react';
import Image from 'next/image';
import CTASection from '../cta';
import Testimonials from './testimonials';

export default function NOCPage() {
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
  const textRef7 = useRef<HTMLDivElement>(null);
  const imageRef7 = useRef<HTMLDivElement>(null);
  const testimonialRef = useRef<HTMLDivElement>(null);

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

    const refs = [textRef1, imageRef1, textRef2, imageRef2, textRef3, imageRef3, textRef4, imageRef4, textRef5, imageRef5, textRef6, imageRef6, textRef7, imageRef7, testimonialRef];
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

        /* Testimonial styles */
        .testimonial-content {
          opacity: 0;
          transform: translateY(30px);
          transition: all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }

        .testimonial-content.animate-in {
          opacity: 1;
          transform: translateY(0);
          animation: slideInFromTop 0.8s ease-out 0.2s both;
        }
      `}</style>
      <div className="min-h-screen bg-white">
        {/* Hero Section */}
        <section className="relative h-screen flex items-center overflow-hidden">
          {/* Background Image - Full Width */}
          <div className="absolute inset-0 z-0">
            <Image
              src="/solutions/card-images-5.jpg"
              alt="Network Operations Centre Background"
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
                  Network Operations Centre
                </h1>
                <p className="text-lg md:text-xl leading-relaxed font-roboto">
                  Our NOC Services minimize outage times and keeps society collaborating. Fully staffed 24x7x365.

                </p>
                <button className="mt-8 bg-yellow-500 hover:bg-white hover:border-2 hover:border-yellow-500 text-white hover:text-yellow-500 px-9 py-2 rounded-full text-lg font-semibold transition-all duration-300 font-roboto">
                  Get in Touch
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
                  Network Operations Centre
                </li>
              </ol>
            </nav>
          </div>
        </section>

        {/* Around the clock support Section */}
        <section className="min-h-[90vh] flex items-center mb-10 bg-white">
          <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              {/* Left Section - Image */}
              <div ref={imageRef1} className="relative image-content image-left">
                <div className="relative rounded-2xl overflow-hidden image-shadow">
                  <Image
                    src="/solutions/noc/noc1.png"
                    alt="24/7 Clock Display"
                    width={700}
                    height={400}
                    className="w-full h-[400px] object-cover"
                  />
                </div>
              </div>

              {/* Right Section - Text Content */}
              <div ref={textRef1} className="space-y-8 text-content">
                <h2 className="text-4xl md:text-5xl lg:text-5xl font-roboto font-bold text-[#140079] leading-tight">
                  Around the clock support
                </h2>
                <p className="text-lg md:text-xl text-[#140079] leading-relaxed font-roboto">
                  Our purpose-built Network Operations Centre (NOC) is the single point of contact for all reactive and proactive support and maintenance requirements. Fully staffed 24x7x365, Our NOC Engineering Team triage, troubleshoot and resolve faults, including the dispatch of the field service engineers and can jointly control the escalation to customer, supplier and vendor support in conjunction with owning the spares parts management process.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* In 60+ countries Section */}
        <section className="min-h-[90vh] flex items-center mb-10 bg-gradient-to-r from-[#F5ecd5] to-[#fffdf6]">
          <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              {/* Left Section - Text Content */}
              <div ref={textRef2} className="space-y-8 text-content">
                <h2 className="text-4xl md:text-5xl lg:text-5xl font-roboto font-bold text-[#140079] leading-tight">
                  In 90+ countries
                </h2>
                <p className="text-lg md:text-xl text-[#140079] leading-relaxed font-roboto">
                  With a global footprint in over 90 countries and as partner to most of the world’s top 12 biggest companies, we pair dynamism and diligence to empower our customers to adapt and scale at pace. Our clients trust us to deliver with expertise, wherever they are in the world, and whatever technology they need.
                </p>
              </div>

              {/* Right Section - Image */}
              <div ref={imageRef2} className="relative image-content image-right">
                <div className="relative rounded-2xl overflow-hidden image-shadow">
                  <Image
                    src="/solutions/noc/noc2.png"
                    alt="Global Presence Map"
                    width={700}
                    height={400}
                    className="w-full h-[400px] object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Core Services Section */}
        <section className="min-h-[90vh] flex items-center mb-10 bg-white">
          <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              {/* Left Section - Image */}
              <div ref={imageRef3} className="relative image-content image-left">
                <div className="relative rounded-2xl overflow-hidden image-shadow">
                  <Image
                    src="/solutions/noc/noc3.png"
                    alt="Network Operations Center"
                    width={700}
                    height={400}
                    className="w-full h-[400px] object-cover"
                  />
                </div>
              </div>

              {/* Right Section - Text Content */}
              <div ref={textRef3} className="space-y-8 text-content">
                <h2 className="text-4xl md:text-5xl lg:text-5xl font-roboto font-bold text-[#140079] leading-tight">
                  Core Services
                </h2>
                <ul className="space-y-3 text-lg md:text-xl text-[#140079] font-roboto">
                  <li className="flex items-start">
                    <span className="text-[#140079] font-bold mr-3">•</span>
                    <span><strong>Basic 1st Line Support</strong> – Log and pass</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-[#140079] font-bold mr-3">•</span>
                    <span><strong>1st Line Technical Support</strong> – Log, triage, escalate and pass</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-[#140079] font-bold mr-3">•</span>
                    <span><strong>1st and 2nd Line Full NOC Services</strong> – Log, triage, dispatch, resolve, escalate</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-[#140079] font-bold mr-3">•</span>
                    <span>Deliver monthly service reporting</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-[#140079] font-bold mr-3">•</span>
                    <span>Service Commissioning and Provisioning</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-[#140079] font-bold mr-3">•</span>
                    <span>Capacity Management</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-[#140079] font-bold mr-3">•</span>
                    <span>24/7 Support, OOH Support, Ad-Hoc Support</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-[#140079] font-bold mr-3">•</span>
                    <span>Consultative Services</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Optional Services Section */}
        <section className="min-h-[90vh] flex items-center mb-10 bg-gradient-to-r from-[#F5ecd5] to-[#fffdf6]">
          <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              {/* Left Section - Text Content */}
              <div ref={textRef4} className="space-y-3 text-content">
                <h2 className="text-4xl md:text-5xl mb-6 lg:text-5xl font-roboto font-bold text-[#140079] leading-tight">
                  Optional Services
                </h2>
                <p className="text-lg md:text-xl text-[#140079] leading-relaxed font-roboto">
                  Additional services can be tailored to meet your specific customer needs and requirements.
                </p>
                <ul className="space-y-3 text-lg md:text-xl text-[#140079] font-roboto">
                  <li className="flex items-start">
                    <span className="text-[#140079] font-bold mr-3">•</span>
                    <span>First and Second technical support with escalation to vendor third line</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-[#140079] font-bold mr-3">•</span>
                    <span>Monitor and assist with resolution of network elements</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-[#140079] font-bold mr-3">•</span>
                    <span>Coordinate and assist with repairs for network elements (RMA process)</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-[#140079] font-bold mr-3">•</span>
                    <span>Provide escalations to backhaul providers</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-[#140079] font-bold mr-3">•</span>
                    <span>Escalations to suppliers (build contractors)</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-[#140079] font-bold mr-3">•</span>
                    <span>Manage and communicate planned engineering works</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-[#140079] font-bold mr-3">•</span>
                    <span>Bespoke monthly reporting</span>
                  </li>
                </ul>
              </div>

              {/* Right Section - Image */}
              <div ref={imageRef4} className="relative image-content image-right">
                <div className="relative rounded-2xl overflow-hidden image-shadow">
                  <Image
                    src="/solutions/noc/noc4.png"
                    alt="Professional Office Environment"
                    width={700}
                    height={400}
                    className="w-full h-[400px] object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="min-h-[90vh] flex items-center mb-10 bg-white">
          <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              {/* Left Section - Image */}
              <div ref={imageRef5} className="relative image-content image-left">
                <div className="relative rounded-2xl overflow-hidden image-shadow">
                  <Image
                    src="/solutions/noc/noc5.jpg"
                    alt="Indigo Network subsea"
                    width={700}
                    height={400}
                    className="w-full h-[400px] object-cover"
                  />
                </div>
              </div>

              {/* Right Section - Text Content */}
              <div ref={textRef5} className="space-y-8 text-content">
                <h2 className="text-4xl md:text-5xl lg:text-5xl font-roboto font-bold text-[#140079] leading-tight">
                  Indigo Subsea
                </h2>
                <p className="text-lg md:text-xl text-[#140079] leading-relaxed font-roboto">
                  We have a dedicated NOC to provide system operator support for modern submarine networks, transforming the legacy fault reporting process into a modern proactive network analysis model, managing the entire system end to end.
                </p>
                                 <a href="/solutions/subsea">
                   <button className="bg-yellow-500 mt-8 hover:bg-white hover:border-2 hover:border-yellow-500 text-white hover:text-yellow-500 px-9 py-2 rounded-full text-lg font-semibold transition-all duration-300 font-roboto">
                     Systems Operator Support
                   </button>
                 </a>
              </div>
            </div>
          </div>
        </section>

        {/* How we're different Section */}
        <section className="min-h-[90vh] flex items-center mb-0 bg-gradient-to-r from-[#F5ecd5] to-[#fffdf6]">
          <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              {/* Left Section - Text Content */}
              <div ref={textRef6} className="space-y-6 text-content">
                <h2 className="text-4xl md:text-5xl lg:text-5xl font-roboto font-bold text-[#140079] leading-tight">
                  How we're different
                </h2>
                <p className="text-lg md:text-xl text-[#140079] leading-relaxed font-roboto">
                  Our people are our greatest assets. Powered by the brightest minds and leading technical insights, we maximise the value of connectivity for leading global businesses.
                </p>
                <p className="text-lg md:text-xl text-[#140079] leading-relaxed font-roboto">
                  An ambitious and committed team working as one to securely deliver the future of digital infrastructure.
                </p>
                <p className="text-lg md:text-xl text-[#140079] leading-relaxed font-roboto">
                  We're ISO accredited and work to ITILv4 standards. Find out more about <a href="#" className="text-[#140079] hover:text-yellow-500 transition-all duration-300 cursor-pointer underline">our certifications</a>.
                </p>
                {/*vacancies pr jaye ga button and responsiblities certifications*/}
                <button className="mt-6 bg-yellow-500 hover:bg-white hover:border-2 hover:border-yellow-500 text-white hover:text-yellow-500 px-9 py-2 rounded-full text-lg font-semibold transition-all duration-300 font-roboto">
                  Join the team
                </button>
              </div>

              {/* Right Section - Image */}
              <div ref={imageRef6} className="relative image-content image-right">
                <div className="relative rounded-2xl overflow-hidden image-shadow">
                  <Image
                    src="/solutions/noc/noc6.jpg"
                    alt="Indigo Team"
                    width={700}
                    height={400}
                    className="w-full h-[400px] object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonial Section */}
        <div className="text-center mb-8 mt-8">
          <h2 className="text-4xl md:text-5xl lg:text-5xl py-2 mb-2 font-roboto font-bold text-[#140079]">
            A team with professionalism, drive and creativity <br /> in everything they do
          </h2>
        </div>
        <Testimonials />

        {/* CTA Section */}
        <CTASection filename="network-operations-centre" />
      </div>
    </>
  );
}
