'use client';

import React from 'react';
import Image from 'next/image';
import CTASection from '../cta';

export default function DataCentresPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Background Image */}
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
        
        {/* Hero Content */}
        <div className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            Data Centres
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
            From repairs to resilience, keeping operations uninterrupted
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
              Comprehensive Data Centre Solutions
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We provide end-to-end data centre services to ensure your infrastructure 
              operates at peak performance with maximum reliability and security.
            </p>
          </div>

          {/* Services Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {/* Service Card 1 */}
            <div className="bg-white rounded-lg shadow-lg p-8 border border-gray-200 hover:shadow-xl transition-shadow duration-300">
              <div className="w-16 h-16 bg-[#140079] rounded-lg flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-[#140079] mb-4">Infrastructure Management</h3>
              <p className="text-gray-600">
                Comprehensive management of your data centre infrastructure including 
                monitoring, maintenance, and optimization services.
              </p>
            </div>

            {/* Service Card 2 */}
            <div className="bg-white rounded-lg shadow-lg p-8 border border-gray-200 hover:shadow-xl transition-shadow duration-300">
              <div className="w-16 h-16 bg-[#140079] rounded-lg flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-[#140079] mb-4">Security & Compliance</h3>
              <p className="text-gray-600">
                Advanced security measures and compliance management to protect your 
                data and meet industry standards.
              </p>
            </div>

            {/* Service Card 3 */}
            <div className="bg-white rounded-lg shadow-lg p-8 border border-gray-200 hover:shadow-xl transition-shadow duration-300">
              <div className="w-16 h-16 bg-[#140079] rounded-lg flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-[#140079] mb-4">Performance Optimization</h3>
              <p className="text-gray-600">
                Continuous monitoring and optimization to ensure maximum performance 
                and efficiency of your data centre operations.
              </p>
            </div>
          </div>

          {/* Features Section */}
          <div className="bg-gray-50 rounded-2xl p-12 mb-16">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h3 className="text-3xl font-bold text-[#140079] mb-6">
                  Why Choose Our Data Centre Services?
                </h3>
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <svg className="w-6 h-6 text-[#140079] mr-3 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-700">24/7 monitoring and support</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-6 h-6 text-[#140079] mr-3 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-700">Expert technical team</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-6 h-6 text-[#140079] mr-3 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-700">Proactive maintenance</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-6 h-6 text-[#140079] mr-3 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-700">Scalable solutions</span>
                  </li>
                </ul>
              </div>
              <div className="relative h-80 rounded-lg overflow-hidden">
                <Image
                  src="/solutions/card-images-3.jpg"
                  alt="Data Centre Operations"
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
