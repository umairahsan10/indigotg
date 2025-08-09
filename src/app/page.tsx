"use client";

import Hero from "./components/Hero";
import ConnectedSolutions from "./components/ConnectedSolutions";
import InteractiveMap from "./components/InteractiveMap";
import GetInTouchForm from "./components/GetInTouchForm";
import { orbitron } from "./fonts";
import { BrandsSection } from "./components/brands";
import ScrollAnimation from "./components/ScrollAnimation";

export default function Home() {
  return (
    <div className="overflow-x-hidden">
      {/* ScrollAnimation at the top */}
      <ScrollAnimation />
      
      {/* <Hero /> */}

      {/* Features Section (kept) */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Choose IndigoTG?</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              We deliver cutting-edge technology solutions that drive business growth and innovation
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Innovation</h3>
              <p className="text-gray-600">Cutting-edge solutions that keep you ahead of the competition</p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Reliability</h3>
              <p className="text-gray-600">Trusted solutions that work when you need them most</p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 009.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 114 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Expert Team</h3>
              <p className="text-gray-600">Experienced professionals dedicated to your success</p>
            </div>
          </div>
        </div>
      </section>

      {/* Connected Solutions */}
      <ConnectedSolutions />

      {/* Brands Marquee */}
      <BrandsSection />

      {/* Interactive Map */}
      <section className="py-16 bg-[#0b0e1a]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className={`${orbitron.className} text-center text-4xl md:text-4xl lg:text-6xl font-extrabold tracking-wide text-white mb-6`}>
            Our Global Offices
          </h2>
          <InteractiveMap />
        </div>
      </section>

      {/* Get In Touch */}
      <section className="py-16 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <GetInTouchForm />
        </div>
      </section>
    </div>
  );
}
