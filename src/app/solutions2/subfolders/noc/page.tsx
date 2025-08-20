'use client';

import React from 'react';
import Image from 'next/image';
import CTASection from '../cta';

export default function NOCPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/solutions/card-images-5.jpg"
            alt="NOC Support Background"
            fill
            style={{ objectFit: 'cover' }}
            priority
          />
          <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        </div>
        
        {/* Hero Content */}
        <div className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            NOC Support
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
            Minimize outage times and keep society collaborating 24x7x365
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-[#140079] hover:bg-[#0a0033] text-white px-8 py-3 rounded-lg text-lg font-semibold transition-colors duration-300">
              Get Started
            </button>
            <button className="border-2 border-white text-white hover:bg-white hover:text-[#140079] px-8 py-3 rounded-lg text-lg font-semibold transition-colors duration-300">
              Learn More
            </button>
          </div>
        </div>
      </section>

      {/* Main Content Section */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-[#140079] mb-6">
              24/7 Network Operations Center Support
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our Network Operations Center provides round-the-clock monitoring, 
              incident response, and proactive maintenance to ensure uninterrupted connectivity.
            </p>
          </div>

          {/* Services Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {/* Service Card 1 */}
            <div className="bg-white rounded-lg shadow-lg p-8 border border-gray-200 hover:shadow-xl transition-shadow duration-300">
              <div className="w-16 h-16 bg-[#140079] rounded-lg flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-[#140079] mb-4">24/7 Monitoring</h3>
              <p className="text-gray-600">
                Continuous monitoring of network infrastructure with real-time 
                alerts and proactive issue detection to prevent outages.
              </p>
            </div>

            {/* Service Card 2 */}
            <div className="bg-white rounded-lg shadow-lg p-8 border border-gray-200 hover:shadow-xl transition-shadow duration-300">
              <div className="w-16 h-16 bg-[#140079] rounded-lg flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-[#140079] mb-4">Incident Response</h3>
              <p className="text-gray-600">
                Rapid incident response and resolution with dedicated teams 
                available 24/7 to minimize downtime and restore services quickly.
              </p>
            </div>

            {/* Service Card 3 */}
            <div className="bg-white rounded-lg shadow-lg p-8 border border-gray-200 hover:shadow-xl transition-shadow duration-300">
              <div className="w-16 h-16 bg-[#140079] rounded-lg flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-[#140079] mb-4">Proactive Maintenance</h3>
              <p className="text-gray-600">
                Scheduled maintenance and system updates performed during off-peak 
                hours to ensure optimal performance and reliability.
              </p>
            </div>
          </div>

          {/* Features Section */}
          <div className="bg-gray-50 rounded-2xl p-12 mb-16">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h3 className="text-3xl font-bold text-[#140079] mb-6">
                  Why Choose Our NOC Support?
                </h3>
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <svg className="w-6 h-6 text-[#140079] mr-3 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-700">24/7/365 availability</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-6 h-6 text-[#140079] mr-3 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-700">Expert technical teams</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-6 h-6 text-[#140079] mr-3 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-700">Rapid response times</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-6 h-6 text-[#140079] mr-3 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-700">Advanced monitoring tools</span>
                  </li>
                </ul>
              </div>
              <div className="relative h-80 rounded-lg overflow-hidden">
                <Image
                  src="/solutions/card-images-5.jpg"
                  alt="NOC Operations Center"
                  fill
                  style={{ objectFit: 'cover' }}
                />
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* CTA Section */}
      <CTASection />
    </div>
  );
}
