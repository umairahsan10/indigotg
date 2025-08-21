'use client';

import React, { useState } from 'react';
import Image from 'next/image';

export default function SubseaPage() {
  const [expandedSections, setExpandedSections] = useState<{[key: string]: boolean}>({});

  const toggleSection = (section: string) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
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
        <div className="relative z-10 container mx-auto px-4 flex items-center">
          {/* Left Content */}
          <div className="w-1/2 text-white pr-8">
            <h1 className="text-5xl font-bold mb-6 leading-tight">
              Protecting and connecting the world's submarine cable systems.
            </h1>
            <p className="text-lg mb-6 text-gray-300">
              Indigo provides system operator support for modern submarine networks, transforming the legacy fault reporting mode into a modern proactive network analysis model, managing the entire system.
            </p>
            <p className="text-lg mb-8 text-gray-300">
              With our Systems Operator Support model, Indigo manages the whole subsea system end to end with our 24x7x365 security-aware NOC.
            </p>
            <div className="flex gap-4">
              <button className="bg-yellow-400 hover:bg-yellow-500 text-black px-8 py-3 rounded-lg font-semibold transition-colors duration-300">
                LEARN MORE
              </button>
              <button className="bg-yellow-400 hover:bg-yellow-500 text-black px-8 py-3 rounded-lg font-semibold transition-colors duration-300">
                WATCH VIDEO
              </button>
            </div>
          </div>
          
          {/* Right Globe */}
          <div className="w-1/2 flex justify-center">
            <div className="relative w-96 h-96">
              {/* Placeholder for submarine cable map globe */}
              <div className="w-full h-full bg-blue-900 rounded-full flex items-center justify-center border-2 border-blue-700">
                <div className="text-center text-blue-300">
                  <div className="text-2xl mb-2">🌍</div>
                </div>
              </div>
              {/* Cable lines overlay */}
              <div className="absolute inset-0 rounded-full">
                <svg viewBox="0 0 400 400" className="w-full h-full">
                  {/* Atlantic cables */}
                  <path d="M 80 200 Q 200 150 320 200" stroke="#FF4444" strokeWidth="2" fill="none" opacity="0.8"/>
                  <path d="M 100 180 Q 200 130 300 180" stroke="#FF8844" strokeWidth="2" fill="none" opacity="0.8"/>
                  <path d="M 90 220 Q 200 170 310 220" stroke="#44FF44" strokeWidth="2" fill="none" opacity="0.8"/>
                  
                  {/* Pacific cables */}
                  <path d="M 320 150 Q 350 200 320 250" stroke="#4444FF" strokeWidth="2" fill="none" opacity="0.8"/>
                  <path d="M 80 150 Q 50 200 80 250" stroke="#FF44FF" strokeWidth="2" fill="none" opacity="0.8"/>
                  
                  {/* Other global connections */}
                  <path d="M 200 100 Q 250 150 200 200" stroke="#FFFF44" strokeWidth="2" fill="none" opacity="0.8"/>
                  <path d="M 200 200 Q 250 250 200 300" stroke="#44FFFF" strokeWidth="2" fill="none" opacity="0.8"/>
                </svg>
              </div>
            </div>
          </div>
        </div>
      </section>

       {/* Services Section - Three Columns */}
       <section className="py-20 px-4 bg-[#140079]">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <div className="text-gray-400 text-lg mb-2">Minimizing submarine cable</div>
            <div className="text-white text-2xl font-bold mb-2">INDIGO SUBSEA</div>
            <div className="text-gray-400 text-lg">downtime</div>
          </div>

          {/* Three Column Grid */}
          <div className="grid md:grid-cols-3 gap-12">
            {/* Column 1 */}
            <div className="space-y-8">
              <div>
                <h3 className="text-white font-bold text-lg mb-4">Comprehensive 24x7x365 Support:</h3>
                <p className="text-gray-300 text-sm leading-relaxed">
                  Our dedicated team provides round-the-clock monitoring and support for submarine cable systems, ensuring maximum uptime and rapid response to any issues that may arise.
                </p>
              </div>
              <div>
                <h3 className="text-white font-bold text-lg mb-4">Expertise and Certifications:</h3>
                <p className="text-gray-300 text-sm leading-relaxed">
                  Our engineers hold industry-recognized certifications and have extensive experience in submarine cable operations, maintenance, and troubleshooting.
                </p>
              </div>
              <div>
                <h3 className="text-white font-bold text-lg mb-4">Industry Accreditations:</h3>
                <p className="text-gray-300 text-sm leading-relaxed">
                  We maintain the highest standards with multiple industry accreditations and certifications, ensuring compliance with international submarine cable standards.
                </p>
              </div>
            </div>

            {/* Column 2 */}
            <div className="space-y-8">
              <div>
                <h3 className="text-white font-bold text-lg mb-4">24x7x365 Security Awareness:</h3>
                <p className="text-gray-300 text-sm leading-relaxed">
                  Our security-aware NOC monitors submarine cable systems with advanced threat detection and response capabilities, protecting critical infrastructure.
                </p>
              </div>
              <div>
                <h3 className="text-white font-bold text-lg mb-4">Controlled and Monitored Environment:</h3>
                <p className="text-gray-300 text-sm leading-relaxed">
                  All operations are conducted in secure, controlled environments with comprehensive monitoring and logging for complete transparency and accountability.
                </p>
              </div>
              <div>
                <h3 className="text-white font-bold text-lg mb-4">Tailored Solutions:</h3>
                <p className="text-gray-300 text-sm leading-relaxed">
                  We develop customized solutions for each client's specific submarine cable infrastructure, ensuring optimal performance and reliability.
                </p>
              </div>
            </div>

            {/* Column 3 */}
            <div className="space-y-8">
              <div className="border-b border-gray-600 pb-4">
                <h3 className="text-white font-bold text-lg mb-4">Agile Escalation Support:</h3>
                <p className="text-gray-300 text-sm leading-relaxed">
                  Our agile escalation procedures ensure rapid response and resolution of issues, minimizing downtime and maintaining service quality.
                </p>
              </div>
              <div className="border-b border-gray-600 pb-4">
                <h3 className="text-white font-bold text-lg mb-4">Comprehensive Network Expertise:</h3>
                <p className="text-gray-300 text-sm leading-relaxed">
                  Deep expertise in submarine cable networks, including design, deployment, maintenance, and optimization for maximum performance.
                </p>
              </div>
              <div className="border-b border-gray-600 pb-4">
                <h3 className="text-white font-bold text-lg mb-4">Predictive Outage Management:</h3>
                <p className="text-gray-300 text-sm leading-relaxed">
                  Advanced analytics and monitoring systems enable predictive maintenance and outage prevention, reducing unplanned downtime.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

             {/* Accordion Section */}
       <section className="py-20 px-4 bg-[#140079]">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="flex justify-between items-center mb-12">
            <h2 className="text-white text-4xl font-bold">Globally available</h2>
            <button className="bg-yellow-400 hover:bg-yellow-500 text-black px-6 py-3 rounded-lg font-semibold transition-colors duration-300">
              DOWNLOAD FACT SHEET
            </button>
          </div>

          {/* Accordion Items */}
          <div className="space-y-0">
            {/* Item 1 */}
            <div className="border-t border-gray-600">
              <button 
                onClick={() => toggleSection('global-logistics')}
                className="w-full flex justify-between items-center py-6 text-white hover:text-yellow-400 transition-colors duration-300"
              >
                <span className="text-lg font-semibold">GLOBAL LOGISTICS</span>
                <span className="text-2xl">{expandedSections['global-logistics'] ? '−' : '+'}</span>
              </button>
              {expandedSections['global-logistics'] && (
                <div className="pb-6 text-gray-300">
                  <p>Our global logistics network ensures rapid deployment and support for submarine cable systems worldwide, with strategically located teams and equipment.</p>
                </div>
              )}
            </div>

            {/* Item 2 */}
            <div className="border-t border-gray-600">
              <button 
                onClick={() => toggleSection('how-we-help')}
                className="w-full flex justify-between items-center py-6 text-white hover:text-yellow-400 transition-colors duration-300"
              >
                <span className="text-lg font-semibold">HOW WE HELP OUR CUSTOMERS</span>
                <span className="text-2xl">{expandedSections['how-we-help'] ? '−' : '+'}</span>
              </button>
              {expandedSections['how-we-help'] && (
                <div className="pb-6 text-gray-300">
                  <p>We provide comprehensive submarine cable support including monitoring, maintenance, repair, and optimization services to ensure maximum reliability and performance for our customers' critical infrastructure.</p>
                </div>
              )}
            </div>

            {/* Item 3 */}
            <div className="border-t border-gray-600">
              <button 
                onClick={() => toggleSection('amitie-cable')}
                className="w-full flex justify-between items-center py-6 text-white hover:text-yellow-400 transition-colors duration-300"
              >
                <span className="text-lg font-semibold">THE AMITIÉ SUBSEA CABLE SYSTEM</span>
                <span className="text-2xl">{expandedSections['amitie-cable'] ? '−' : '+'}</span>
              </button>
              {expandedSections['amitie-cable'] && (
                <div className="pb-6 text-gray-300">
                  <p>The Amitié submarine cable system connects the United States and France, providing high-capacity, low-latency connectivity. Our team provides comprehensive support for this critical infrastructure.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="relative py-20 px-4 bg-white">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/solutions/subsea/cables.jpg"
            alt="Subsea Cables Background"
            fill
            style={{ objectFit: 'cover' }}
          />
          <div className="absolute inset-0 bg-[#140079] bg-opacity-80"></div>
        </div>
        
        <div className="relative z-10 max-w-2xl mx-auto text-center">
          <h2 className="text-white text-4xl font-medium mb-4 font-['Roboto']">Contact Us</h2>
          
          <p className="text-gray-300 mb-8 font-['Roboto']">
            Get in touch with our team to discuss your submarine cable support needs and discover how we can help protect and optimize your critical infrastructure.
          </p>
          
          <div className="space-y-4 mb-8 font-['Roboto']">
            <div className="flex gap-6 justify-center">
              <a href="mailto:hello@indigosubsea.com" className="text-white hover:text-yellow-400 transition-colors duration-300">
                Email: hello@indigosubsea.com
              </a>
              <a href="tel:+447552816432" className="text-white hover:text-yellow-400 transition-colors duration-300">
                Tel: +44 7552 816 432
              </a>
            </div>
            <div className="text-white">Indigo Office, Denver, CO, 80202</div>
          </div>

          <a href="/get-in-touch">
            <button className="bg-white hover:bg-transparent border-2 border-white text-[#140079] hover:text-white px-8 py-3 rounded-lg font-semibold transition-all duration-300 font-['Roboto']">
              CONTACT US
            </button>
          </a>
        </div>
      </section>
    </div>
  );
}
