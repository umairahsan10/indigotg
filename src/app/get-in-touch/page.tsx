'use client';

import dynamic from "next/dynamic";
import { useEffect, useRef } from "react";

const OfficeMap = dynamic(() => import("../components/OfficeMap"), { ssr: false });
import Image from "next/image";
import GetInTouchForm from "../components/GetInTouchForm";
import Link from "next/link";

export default function GetInTouch() {
  const contactSectionRef = useRef<HTMLDivElement>(null);
  const heroSectionRef = useRef<HTMLDivElement>(null);
  const mainContentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const contactObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
          }
        });
      },
      {
        threshold: 0.3,
        rootMargin: '0px 0px -100px 0px'
      }
    );

    const mainContentObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
          }
        });
      },
      {
        threshold: 0.2,
        rootMargin: '0px 0px -50px 0px'
      }
    );

    if (contactSectionRef.current) {
      contactObserver.observe(contactSectionRef.current);
    }

    if (mainContentRef.current) {
      mainContentObserver.observe(mainContentRef.current);
    }

    // Trigger hero animation immediately after a short delay
    const timer = setTimeout(() => {
      if (heroSectionRef.current) {
        heroSectionRef.current.classList.add('hero-animate-in');
      }
    }, 100);

    return () => {
      contactObserver.disconnect();
      mainContentObserver.disconnect();
      clearTimeout(timer);
    };
  }, []);

  return (
    <div className="min-h-screen bg-white ">
      {/* Hero Section */}
      <div className="relative overflow-hidden text-white" style={{ backgroundImage: 'url(/get-in-touch/img-6.png)', backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat' }} ref={heroSectionRef}>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 md:py-20 lg:py-32 min-h-screen flex items-center">
          <div className="text-left">
            <div className="hero-content">
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-4 sm:mb-6 leading-tight">
                Get in Touch
              </h1>
              <p className="text-lg sm:text-xl lg:text-2xl text-slate-300 leading-relaxed max-w-4xl">
                Ready to transform your technology infrastructure?
                <br className="hidden sm:block" />
                <span className="sm:hidden"> </span>
                Get in touch with our expert team for personalized
                <br className="hidden sm:block" />
                <span className="sm:hidden"> </span>
                solutions and 24/7 support across 90+ countries.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Contact Information Section */}
      <div className="py-12 sm:py-16 lg:py-20 bg-gray-50" ref={contactSectionRef}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 sm:mb-12 lg:mb-16 section-header">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-2 sm:mb-4">Sales & Support</h2>
            <p className="text-lg sm:text-xl text-gray-600">
              24hr Customer Support Helpline
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {/* 24hr Customer Support Helpline */}
            <Link href="tel:+44012914358">
              <div className="contact-card bg-blue-50 rounded-2xl p-6 lg:p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 relative overflow-hidden cursor-pointer">
                <div className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 bg-gradient-to-br from-red-500 to-red-600 rounded-full flex items-center justify-center mb-4 sm:mb-6 mx-auto relative z-10">
                  <svg className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
                  </svg>
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-blue-900 mb-2 text-center relative z-10">24hr Customer Support Helpline</h3>
                <p className="text-base sm:text-lg font-bold text-blue-900 text-center mb-2 underline relative z-10">+44 (0) 1291 435800</p>
              </div>
            </Link>

            {/* Customer Support Enquiries */}
            <Link href="mailto:support@indigotg.com">
              <div className="contact-card bg-blue-50 rounded-2xl p-6 lg:p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 relative overflow-hidden cursor-pointer">
                <div className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center mb-4 sm:mb-6 mx-auto relative z-10">
                  <svg className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                  </svg>
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-blue-900 mb-3 sm:mb-4 text-center relative z-10">Customer Support Enquiries</h3>
                <p className="text-sm sm:text-base text-blue-900 font-semibold text-center underline relative z-10">support@indigotg.com</p>
              </div>
            </Link>

            {/* General Sales Enquiries */}
            <Link href="mailto:sales@indigotg.com">
              <div className="contact-card bg-blue-50 rounded-2xl p-6 lg:p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 relative overflow-hidden cursor-pointer">
                <div className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-full flex items-center justify-center mb-4 sm:mb-6 mx-auto relative z-10">
                  <svg className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                  </svg>
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-blue-900 mb-3 sm:mb-4 text-center relative z-10">General Sales Enquiries</h3>
                <p className="text-sm sm:text-base text-blue-900 font-semibold text-center underline relative z-10">sales@indigotg.com</p>
              </div>
            </Link>

            {/* Sub-contractor Enquiries */}
            <Link href="mailto:resourcing@indigotg.com">
              <div className="contact-card bg-blue-50 rounded-2xl p-6 lg:p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 relative overflow-hidden cursor-pointer">
                <div className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 bg-gradient-to-br from-orange-500 to-orange-600 rounded-full flex items-center justify-center mb-4 sm:mb-6 mx-auto relative z-10">
                  <svg className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                  </svg>
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-blue-900 mb-3 sm:mb-4 text-center relative z-10">Sub-contractor Enquiries</h3>
                <p className="text-sm sm:text-base text-blue-900 font-semibold text-center underline relative z-10">resourcing@indigotg.com</p>
              </div>
            </Link>
          </div>
        </div>
      </div>
      
      {/* Main Content Section */}
      <div className="py-20" ref={mainContentRef}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16">
            {/* Contact Form */}
            <div className="main-content-left">
              <GetInTouchForm />
            </div>

            {/* Global Offices */}
            <div className="main-content-right h-full">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Global Presence</h2>
              <p className="text-xl text-gray-600 mb-8">
                90 countries supported from these strategic locations
              </p>

              <div
                className="bg-white border-2 border-gray-200 rounded-2xl p-6 h-[600px] overflow-y-auto custom-scrollbar"
                onWheel={(e) => {
                  e.stopPropagation();
                  const element = e.currentTarget;
                  const scrollTop = element.scrollTop;
                  const scrollHeight = element.scrollHeight;
                  const clientHeight = element.clientHeight;

                  // If we're at the top and trying to scroll up, or at the bottom and trying to scroll down
                  if ((scrollTop === 0 && e.deltaY < 0) ||
                    (scrollTop + clientHeight >= scrollHeight && e.deltaY > 0)) {
                    e.preventDefault();
                  }
                }}
              >
                <div className="space-y-6">
                  {/* Global HQ */}
                  <div className="bg-gray-50 border-2 border-gray-200 rounded-xl p-4 hover:border-indigo-500 hover:border-4 transition-all duration-300">
                    <div className="flex items-start space-x-4">
                      <div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center flex-shrink-0">
                        <svg className="w-5 h-5 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path>
                        </svg>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-bold text-lg text-gray-900">Global HQ - United Kingdom</h3>
                          <div className="w-6 h-4 rounded overflow-hidden shadow-sm">
                            <svg viewBox="0 0 60 30" className="w-full h-full">
                              <rect width="60" height="30" fill="#012169" />
                              <path d="M0,0 L60,30 M60,0 L0,30" stroke="#fff" strokeWidth="6" />
                              <path d="M0,0 L60,30 M60,0 L0,30" stroke="#C8102E" strokeWidth="4" />
                              <path d="M30,0 L30,30 M0,15 L60,15" stroke="#fff" strokeWidth="10" />
                              <path d="M30,0 L30,30 M0,15 L60,15" stroke="#C8102E" strokeWidth="6" />
                            </svg>
                          </div>
                        </div>
                        <p className="text-gray-600 text-sm mb-2">
                          102, Wales One Business Park<br />
                          Magor, Monmouthshire NP26 3DG
                        </p>
                        <p className="text-indigo-600 font-semibold text-sm">+44 (0)1291 435500</p>
                      </div>
                    </div>
                  </div>

                  {/* Asia HQ */}
                  <div className="bg-gray-50 border-2 border-gray-200 rounded-xl p-4 hover:border-green-500 hover:border-4 transition-all duration-300">
                    <div className="flex items-start space-x-4">
                      <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                        <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9v-9m0-9v9"></path>
                        </svg>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-bold text-lg text-gray-900">Asia HQ - Singapore</h3>
                          <div className="w-6 h-4 rounded overflow-hidden shadow-sm">
                            <svg viewBox="0 0 60 30" className="w-full h-full">
                              <rect width="60" height="30" fill="#ED2939" />
                              <rect width="60" height="15" fill="#fff" />
                              <circle cx="30" cy="15" r="8" fill="#ED2939" />
                              <path d="M30,7 L32,13 L38,13 L33,17 L35,23 L30,19 L25,23 L27,17 L22,13 L28,13 Z" fill="#fff" />
                            </svg>
                          </div>
                        </div>
                        <p className="text-gray-600 text-sm mb-2">
                          9 Raffles Place, #26-01<br />
                          Republic Plaza, Singapore 048619
                        </p>
                        <p className="text-green-600 font-semibold text-sm">+852 9151 9885</p>
                      </div>
                    </div>
                  </div>

                  {/* North America */}
                  <div className="bg-gray-50 border-2 border-gray-200 rounded-xl p-4 hover:border-blue-500 hover:border-4 transition-all duration-300">
                    <div className="flex items-start space-x-4">
                      <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                        <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2 2z"></path>
                        </svg>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-bold text-lg text-gray-900">North America</h3>
                          <div className="w-6 h-4 rounded overflow-hidden shadow-sm">
                            <svg viewBox="0 0 55.2 38.4" className="w-full h-full">
                              <path fill="#B22234" d="M3.03,0h49.13c1.67,0,3.03,1.36,3.03,3.03v32.33c0,1.67-1.36,3.03-3.03,3.03H3.03C1.36,38.4,0,37.04,0,35.37 V3.03C0,1.36,1.36,0,3.03,0L3.03,0z" />
                              <path fill="#FFFFFF" d="M0.02,2.73h55.17c0.01,0.1,0.02,0.2,0.02,0.31v2.94H0V3.03C0,2.93,0.01,2.83,0.02,2.73L0.02,2.73z M55.2,8.67 v3.24H0V8.67H55.2L55.2,8.67z M55.2,14.61v3.24H0v-3.24H55.2L55.2,14.61z M55.2,20.55v3.24H0v-3.24H55.2L55.2,20.55z M55.2,26.49 v3.24H0v-3.24H55.2L55.2,26.49z M55.2,32.43v2.93c0,0.1-0.01,0.21-0.02,0.31H0.02C0.01,35.58,0,35.47,0,35.37v-2.93H55.2 L55.2,32.43z" />
                              <path fill="#3C3B6E" d="M20.8,0v20.68H0V3.03C0,1.36,1.36,0,3.03,0H20.8L20.8,0L20.8,0z" />
                              <polygon fill="#FFFFFF" points="1.23,2.86 1.92,5.01 0.1,3.68 2.36,3.68 0.53,5.01 1.23,2.86" />
                              <polygon fill="#FFFFFF" points="1.23,7.02 1.92,9.17 0.1,7.84 2.36,7.84 0.53,9.17 1.23,7.02" />
                              <polygon fill="#FFFFFF" points="1.23,11.18 1.92,13.33 0.1,12 2.36,12 0.53,13.33 1.23,11.18" />
                              <polygon fill="#FFFFFF" points="1.23,15.34 1.92,17.49 0.1,16.16 2.36,16.16 0.53,17.49 1.23,15.34" />
                              <polygon fill="#FFFFFF" points="3.67,0.78 4.37,2.93 2.54,1.6 4.81,1.6 2.97,2.93 3.67,0.78" />
                              <polygon fill="#FFFFFF" points="3.67,4.94 4.37,7.09 2.54,5.76 4.81,5.76 2.97,7.09 3.67,4.94" />
                              <polygon fill="#FFFFFF" points="3.67,9.1 4.37,11.25 2.54,9.92 4.81,9.92 2.97,11.25 3.67,9.1" />
                              <polygon fill="#FFFFFF" points="3.67,13.26 4.37,15.41 2.54,14.08 4.81,14.08 2.97,15.41 3.67,13.26" />
                              <polygon fill="#FFFFFF" points="3.67,17.42 4.37,19.57 2.54,18.24 4.81,18.24 2.97,19.57 3.67,17.42" />
                              <polygon fill="#FFFFFF" points="6.12,2.86 6.82,5.01 4.99,3.68 7.25,3.68 5.42,5.01 6.12,2.86" />
                              <polygon fill="#FFFFFF" points="6.12,7.02 6.82,9.17 4.99,7.84 7.25,7.84 5.42,9.17 6.12,7.02" />
                              <polygon fill="#FFFFFF" points="6.12,11.18 6.82,13.33 4.99,12 7.25,12 5.42,13.33 6.12,11.18" />
                              <polygon fill="#FFFFFF" points="6.12,15.34 6.82,17.49 4.99,16.16 7.25,16.16 5.42,17.49 6.12,15.34" />
                              <polygon fill="#FFFFFF" points="8.57,0.78 9.26,2.93 7.44,1.6 9.7,1.6 7.87,2.93 8.57,0.78" />
                              <polygon fill="#FFFFFF" points="8.57,4.94 9.26,7.09 7.44,5.76 9.7,5.76 7.87,7.09 8.57,4.94" />
                              <polygon fill="#FFFFFF" points="8.57,9.1 9.26,11.25 7.44,9.92 9.7,9.92 7.87,11.25 8.57,9.1" />
                              <polygon fill="#FFFFFF" points="8.57,13.26 9.26,15.41 7.44,14.08 9.7,14.08 7.87,15.41 8.57,13.26" />
                              <polygon fill="#FFFFFF" points="8.57,17.42 9.26,19.57 7.44,18.24 9.7,18.24 7.87,19.57 8.57,17.42" />
                              <polygon fill="#FFFFFF" points="11.01,2.86 11.71,5.01 9.88,3.68 12.14,3.68 10.31,5.01 11.01,2.86" />
                              <polygon fill="#FFFFFF" points="11.01,7.02 11.71,9.17 9.88,7.84 12.14,7.84 10.31,9.17 11.01,7.02" />
                              <polygon fill="#FFFFFF" points="11.01,11.18 11.71,13.33 9.88,12 12.14,12 10.31,13.33 11.01,11.18" />
                              <polygon fill="#FFFFFF" points="11.01,15.34 11.71,17.49 9.88,16.16 12.14,16.16 10.31,17.49 11.01,15.34" />
                              <polygon fill="#FFFFFF" points="13.46,0.78 14.16,2.93 12.33,1.6 14.59,1.6 12.76,2.93 13.46,0.78" />
                              <polygon fill="#FFFFFF" points="13.46,4.94 14.16,7.09 12.33,5.76 14.59,5.76 12.76,7.09 13.46,4.94" />
                              <polygon fill="#FFFFFF" points="13.46,9.1 14.16,11.25 12.33,9.92 14.59,9.92 12.76,11.25 13.46,9.1" />
                              <polygon fill="#FFFFFF" points="13.46,13.26 14.16,15.41 12.33,14.08 14.59,14.08 12.76,15.41 13.46,13.26" />
                              <polygon fill="#FFFFFF" points="13.46,17.42 14.16,19.57 12.33,18.24 14.59,18.24 12.76,19.57 13.46,17.42" />
                              <polygon fill="#FFFFFF" points="15.9,2.86 16.6,5.01 14.77,3.68 17.03,3.68 15.21,5.01 15.9,2.86" />
                              <polygon fill="#FFFFFF" points="15.9,7.02 16.6,9.17 14.77,7.84 17.03,7.84 15.21,9.17 15.9,7.02" />
                              <polygon fill="#FFFFFF" points="15.9,11.18 16.6,13.33 14.77,12 17.03,12 15.21,13.33 15.9,11.18" />
                              <polygon fill="#FFFFFF" points="15.9,15.34 16.6,17.49 14.77,16.16 17.03,16.16 15.21,17.49 15.9,15.34" />
                              <polygon fill="#FFFFFF" points="18.35,0.78 19.05,2.93 17.22,1.6 19.48,1.6 17.65,2.93 18.35,0.78" />
                              <polygon fill="#FFFFFF" points="18.35,4.94 19.05,7.09 17.22,5.76 19.48,5.76 17.65,7.09 18.35,4.94" />
                              <polygon fill="#FFFFFF" points="18.35,9.1 19.05,11.25 17.22,9.92 19.48,9.92 17.65,11.25 18.35,9.1" />
                              <polygon fill="#FFFFFF" points="18.35,13.26 19.05,15.41 17.22,14.08 19.48,14.08 17.65,15.41 18.35,13.26" />
                              <polygon fill="#FFFFFF" points="18.35,17.42 19.05,19.57 17.22,18.24 19.48,18.24 17.65,19.57 18.35,17.42" />
                            </svg>
                          </div>
                        </div>
                        <p className="text-gray-600 text-sm mb-2">
                          17th Street, 7th Floor<br />
                          Indigo Subsea Suite, Denver, CO 80202
                        </p>
                        <p className="text-blue-600 font-semibold text-sm">+1 719-408-8847</p>
                      </div>
                    </div>
                  </div>

                  {/* United States */}
                  <div className="bg-gray-50 border-2 border-gray-200 rounded-xl p-4 hover:border-red-500 hover:border-4 transition-all duration-300">
                    <div className="flex items-start space-x-4">
                      <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0">
                        <svg className="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                        </svg>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-bold text-lg text-gray-900">United States</h3>
                          <div className="w-6 h-4 rounded overflow-hidden shadow-sm">
                            <svg viewBox="0 0 55.2 38.4" className="w-full h-full">
                              <path fill="#B22234" d="M3.03,0h49.13c1.67,0,3.03,1.36,3.03,3.03v32.33c0,1.67-1.36,3.03-3.03,3.03H3.03C1.36,38.4,0,37.04,0,35.37 V3.03C0,1.36,1.36,0,3.03,0L3.03,0z" />
                              <path fill="#FFFFFF" d="M0.02,2.73h55.17c0.01,0.1,0.02,0.2,0.02,0.31v2.94H0V3.03C0,2.93,0.01,2.83,0.02,2.73L0.02,2.73z M55.2,8.67 v3.24H0V8.67H55.2L55.2,8.67z M55.2,14.61v3.24H0v-3.24H55.2L55.2,14.61z M55.2,20.55v3.24H0v-3.24H55.2L55.2,20.55z M55.2,26.49 v3.24H0v-3.24H55.2L55.2,26.49z M55.2,32.43v2.93c0,0.1-0.01,0.21-0.02,0.31H0.02C0.01,35.58,0,35.47,0,35.37v-2.93H55.2 L55.2,32.43z" />
                              <path fill="#3C3B6E" d="M20.8,0v20.68H0V3.03C0,1.36,1.36,0,3.03,0H20.8L20.8,0L20.8,0z" />
                              <polygon fill="#FFFFFF" points="1.23,2.86 1.92,5.01 0.1,3.68 2.36,3.68 0.53,5.01 1.23,2.86" />
                              <polygon fill="#FFFFFF" points="1.23,7.02 1.92,9.17 0.1,7.84 2.36,7.84 0.53,9.17 1.23,7.02" />
                              <polygon fill="#FFFFFF" points="1.23,11.18 1.92,13.33 0.1,12 2.36,12 0.53,13.33 1.23,11.18" />
                              <polygon fill="#FFFFFF" points="1.23,15.34 1.92,17.49 0.1,16.16 2.36,16.16 0.53,17.49 1.23,15.34" />
                              <polygon fill="#FFFFFF" points="3.67,0.78 4.37,2.93 2.54,1.6 4.81,1.6 2.97,2.93 3.67,0.78" />
                              <polygon fill="#FFFFFF" points="3.67,4.94 4.37,7.09 2.54,5.76 4.81,5.76 2.97,7.09 3.67,4.94" />
                              <polygon fill="#FFFFFF" points="3.67,9.1 4.37,11.25 2.54,9.92 4.81,9.92 2.97,11.25 3.67,9.1" />
                              <polygon fill="#FFFFFF" points="3.67,13.26 4.37,15.41 2.54,14.08 4.81,14.08 2.97,15.41 3.67,13.26" />
                              <polygon fill="#FFFFFF" points="3.67,17.42 4.37,19.57 2.54,18.24 4.81,18.24 2.97,19.57 3.67,17.42" />
                              <polygon fill="#FFFFFF" points="6.12,2.86 6.82,5.01 4.99,3.68 7.25,3.68 5.42,5.01 6.12,2.86" />
                              <polygon fill="#FFFFFF" points="6.12,7.02 6.82,9.17 4.99,7.84 7.25,7.84 5.42,9.17 6.12,7.02" />
                              <polygon fill="#FFFFFF" points="6.12,11.18 6.82,13.33 4.99,12 7.25,12 5.42,13.33 6.12,11.18" />
                              <polygon fill="#FFFFFF" points="6.12,15.34 6.82,17.49 4.99,16.16 7.25,16.16 5.42,17.49 6.12,15.34" />
                              <polygon fill="#FFFFFF" points="8.57,0.78 9.26,2.93 7.44,1.6 9.7,1.6 7.87,2.93 8.57,0.78" />
                              <polygon fill="#FFFFFF" points="8.57,4.94 9.26,7.09 7.44,5.76 9.7,5.76 7.87,7.09 8.57,4.94" />
                              <polygon fill="#FFFFFF" points="8.57,9.1 9.26,11.25 7.44,9.92 9.7,9.92 7.87,11.25 8.57,9.1" />
                              <polygon fill="#FFFFFF" points="8.57,13.26 9.26,15.41 7.44,14.08 9.7,14.08 7.87,15.41 8.57,13.26" />
                              <polygon fill="#FFFFFF" points="8.57,17.42 9.26,19.57 7.44,18.24 9.7,18.24 7.87,19.57 8.57,17.42" />
                              <polygon fill="#FFFFFF" points="11.01,2.86 11.71,5.01 9.88,3.68 12.14,3.68 10.31,5.01 11.01,2.86" />
                              <polygon fill="#FFFFFF" points="11.01,7.02 11.71,9.17 9.88,7.84 12.14,7.84 10.31,9.17 11.01,7.02" />
                              <polygon fill="#FFFFFF" points="11.01,11.18 11.71,13.33 9.88,12 12.14,12 10.31,13.33 11.01,11.18" />
                              <polygon fill="#FFFFFF" points="11.01,15.34 11.71,17.49 9.88,16.16 12.14,16.16 10.31,17.49 11.01,15.34" />
                              <polygon fill="#FFFFFF" points="13.46,0.78 14.16,2.93 12.33,1.6 14.59,1.6 12.76,2.93 13.46,0.78" />
                              <polygon fill="#FFFFFF" points="13.46,4.94 14.16,7.09 12.33,5.76 14.59,5.76 12.76,7.09 13.46,4.94" />
                              <polygon fill="#FFFFFF" points="13.46,9.1 14.16,11.25 12.33,9.92 14.59,9.92 12.76,11.25 13.46,9.1" />
                              <polygon fill="#FFFFFF" points="13.46,13.26 14.16,15.41 12.33,14.08 14.59,14.08 12.76,15.41 13.46,13.26" />
                              <polygon fill="#FFFFFF" points="13.46,17.42 14.16,19.57 12.33,18.24 14.59,18.24 12.76,19.57 13.46,17.42" />
                              <polygon fill="#FFFFFF" points="15.9,2.86 16.6,5.01 14.77,3.68 17.03,3.68 15.21,5.01 15.9,2.86" />
                              <polygon fill="#FFFFFF" points="15.9,7.02 16.6,9.17 14.77,7.84 17.03,7.84 15.21,9.17 15.9,7.02" />
                              <polygon fill="#FFFFFF" points="15.9,11.18 16.6,13.33 14.77,12 17.03,12 15.21,13.33 15.9,11.18" />
                              <polygon fill="#FFFFFF" points="15.9,15.34 16.6,17.49 14.77,16.16 17.03,16.16 15.21,17.49 15.9,15.34" />
                              <polygon fill="#FFFFFF" points="18.35,0.78 19.05,2.93 17.22,1.6 19.48,1.6 17.65,2.93 18.35,0.78" />
                              <polygon fill="#FFFFFF" points="18.35,4.94 19.05,7.09 17.22,5.76 19.48,5.76 17.65,7.09 18.35,4.94" />
                              <polygon fill="#FFFFFF" points="18.35,9.1 19.05,11.25 17.22,9.92 19.48,9.92 17.65,11.25 18.35,9.1" />
                              <polygon fill="#FFFFFF" points="18.35,13.26 19.05,15.41 17.22,14.08 19.48,14.08 17.65,15.41 18.35,13.26" />
                              <polygon fill="#FFFFFF" points="18.35,17.42 19.05,19.57 17.22,18.24 19.48,18.24 17.65,19.57 18.35,17.42" />
                            </svg>
                          </div>
                        </div>
                        <p className="text-gray-600 text-sm mb-2">
                          230 Swartz Road<br />
                          Lexington, South Carolina 29072
                        </p>
                        <p className="text-red-600 font-semibold text-sm">+1 719-408-8847</p>
                      </div>
                    </div>
                  </div>

                  {/* Ireland */}
                  <div className="bg-gray-50 border-2 border-gray-200 rounded-xl p-4 hover:border-emerald-500 hover:border-4 transition-all duration-300">
                    <div className="flex items-start space-x-4">
                      <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center flex-shrink-0">
                        <svg className="w-5 h-5 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                        </svg>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-bold text-lg text-gray-900">Ireland</h3>
                          <div className="w-6 h-4 rounded overflow-hidden shadow-sm">
                            <svg viewBox="0 0 60 30" className="w-full h-full">
                              <rect width="20" height="30" fill="#169B62" />
                              <rect width="20" height="30" fill="#fff" x="20" />
                              <rect width="20" height="30" fill="#FF883E" x="40" />
                            </svg>
                          </div>
                        </div>
                        <p className="text-gray-600 text-sm mb-2">
                          Houston Hall, Ballycummin Avenue<br />
                          Raheen Business Park, Limerick V94PKF1
                        </p>
                        <p className="text-emerald-600 font-semibold text-sm">+353 (0)61 306688</p>
                      </div>
                    </div>
                  </div>

                  {/* France */}
                  <div className="bg-gray-50 border-2 border-gray-200 rounded-xl p-4 hover:border-purple-500 hover:border-4 transition-all duration-300">
                    <div className="flex items-start space-x-4">
                      <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
                        <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path>
                        </svg>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-bold text-lg text-gray-900">France</h3>
                          <div className="w-6 h-4 rounded overflow-hidden shadow-sm">
                            <svg viewBox="0 0 60 30" className="w-full h-full">
                              <rect width="20" height="30" fill="#ED2939" />
                              <rect width="20" height="30" fill="#fff" x="20" />
                              <rect width="20" height="30" fill="#002395" x="40" />
                            </svg>
                          </div>
                        </div>
                        <p className="text-gray-600 text-sm mb-2">
                          9 Rue des Colonnes<br />
                          75002 Paris, France
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Netherlands */}
                  <div className="bg-gray-50 border-2 border-gray-200 rounded-xl p-4 hover:border-orange-500 hover:border-4 transition-all duration-300">
                    <div className="flex items-start space-x-4">
                      <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0">
                        <svg className="w-5 h-5 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                        </svg>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-bold text-lg text-gray-900">Netherlands</h3>
                          <div className="w-6 h-4 rounded overflow-hidden shadow-sm">
                            <svg viewBox="0 0 60 30" className="w-full h-full">
                              <rect width="60" height="10" fill="#AE1C28" />
                              <rect width="60" height="10" fill="#fff" y="10" />
                              <rect width="60" height="10" fill="#21468B" y="20" />
                            </svg>
                          </div>
                        </div>
                        <p className="text-gray-600 text-sm mb-2">
                          Prof JH Bavincklaan 7<br />
                          1183AT Amstelveen, Netherlands
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Germany */}
                  <div className="bg-gray-50 border-2 border-gray-200 rounded-xl p-4 hover:border-yellow-500 hover:border-4 transition-all duration-300">
                    <div className="flex items-start space-x-4">
                      <div className="w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center flex-shrink-0">
                        <svg className="w-5 h-5 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path>
                        </svg>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-bold text-lg text-gray-900">Germany</h3>
                          <div className="w-6 h-4 rounded overflow-hidden shadow-sm">
                            <svg viewBox="0 0 60 30" className="w-full h-full">
                              <rect width="60" height="10" fill="#000" />
                              <rect width="60" height="10" fill="#DD0000" y="10" />
                              <rect width="60" height="10" fill="#FFCE00" y="20" />
                            </svg>
                          </div>
                        </div>
                        <p className="text-gray-600 text-sm mb-2">
                          c/o Steuerkanzlei Gundisch<br />
                          Dorn Partnerschaft mbB<br />
                          Bockenheimer Anlage 2<br />
                          60322 Frankfurt am Main
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Interactive Map Section */}
      <div className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 animate-fade-in-up">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Global Technology Solutions
            </h2>
            <p className="text-xl text-gray-600">
              Supporting businesses worldwide with local expertise and global reach
            </p>
          </div>

          <div className="bg-white rounded-3xl p-8 shadow-xl animate-fade-in-up">
            <OfficeMap />
          </div>
        </div>
      </div>

      {/* Newsletter Section */}
      <div className="relative pt-0 sm:pt-4 pb-8 overflow-hidden min-h-[300px] sm:min-h-[350px] md:min-h-[400px]">
        {/* Background Image */}
        <div className="absolute inset-0 bg-cover bg-center bg-no-repeat" style={{ backgroundImage: 'url(/get-in-touch/img-5.png)' }}></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center animate-fade-in-up py-2 sm:py-8 md:py-12">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-4 sm:mb-6 lg:mb-8 px-4">
              Stay Connected
            </h2>

            <div className="max-w-sm sm:max-w-md mx-auto flex flex-col sm:flex-row mt-6 sm:mt-8 px-4">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 sm:px-6 py-3 sm:py-4 rounded-t-xl sm:rounded-l-xl sm:rounded-t-none bg-slate-700 border border-slate-600 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-sm sm:text-base"
              />
              <button className="px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold rounded-b-xl sm:rounded-r-xl sm:rounded-b-none hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl text-sm sm:text-base">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
         @keyframes fadeInUp {
           from {
             opacity: 0;
             transform: translateY(30px);
           }
           to {
             opacity: 1;
             transform: translateY(0);
           }
         }
         
         @keyframes fadeInLeft {
           from {
             opacity: 0;
             transform: translateX(-30px);
           }
           to {
             opacity: 1;
             transform: translateX(0);
           }
         }
         
         @keyframes fadeInRight {
           from {
             opacity: 0;
             transform: translateX(30px);
           }
           to {
             opacity: 1;
             transform: translateX(0);
           }
         }

         .animate-fade-in-up {
           animation: fadeInUp 0.9s cubic-bezier(0.25, 0.8, 0.25, 1) both;
         }
         
         .animate-fade-in-left {
           animation: fadeInLeft 0.9s cubic-bezier(0.25, 0.8, 0.25, 1) both;
         }
         
         .animate-fade-in-right {
           animation: fadeInRight 0.9s cubic-bezier(0.25, 0.8, 0.25, 1) both;
         }
         
                   @media (prefers-reduced-motion: reduce) {
            .animate-fade-in-up,
            .animate-fade-in-left,
            .animate-fade-in-right {
              animation: none !important;
            }
          }

          /* Hero section animations */
          .hero-content {
            opacity: 0;
            transform: translateY(30px);
            transition: all 1.2s cubic-bezier(0.25, 0.8, 0.25, 1);
          }

          .hero-content h1 {
            opacity: 0;
            transform: translateY(40px);
            transition: all 1s cubic-bezier(0.25, 0.8, 0.25, 1);
            transition-delay: 0.2s;
          }

          .hero-content p {
            opacity: 0;
            transform: translateY(40px);
            transition: all 1s cubic-bezier(0.25, 0.8, 0.25, 1);
            transition-delay: 0.4s;
          }

          .hero-animate-in .hero-content {
            opacity: 1;
            transform: translateY(0);
          }

          .hero-animate-in .hero-content h1 {
            opacity: 1;
            transform: translateY(0);
          }

          .hero-animate-in .hero-content p {
            opacity: 1;
            transform: translateY(0);
          }

                                                                               /* Contact card circular fill animation */
            .contact-card {
              position: relative;
              cursor: pointer;
              opacity: 0;
              transform: translateY(50px) scale(0.9);
              transition: all 0.8s cubic-bezier(0.25, 0.8, 0.25, 1);
            }

           .contact-card:nth-child(1) {
             transition-delay: 0.1s;
           }

           .contact-card:nth-child(2) {
             transition-delay: 0.3s;
           }

           .contact-card:nth-child(3) {
             transition-delay: 0.5s;
           }

           .contact-card:nth-child(4) {
             transition-delay: 0.7s;
           }

                       .animate-in .contact-card {
              opacity: 1;
              transform: translateY(0) scale(1);
            }

            /* Section header animation */
            .section-header {
              opacity: 0;
              transform: translateY(30px);
              transition: all 1s cubic-bezier(0.25, 0.8, 0.25, 1);
            }

            .section-header h2 {
              opacity: 0;
              transform: translateY(40px);
              transition: all 0.8s cubic-bezier(0.25, 0.8, 0.25, 1);
              transition-delay: 0.2s;
            }

            .section-header p {
              opacity: 0;
              transform: translateY(40px);
              transition: all 0.8s cubic-bezier(0.25, 0.8, 0.25, 1);
              transition-delay: 0.4s;
            }

            .animate-in .section-header {
              opacity: 1;
              transform: translateY(0);
            }

            .animate-in .section-header h2 {
              opacity: 1;
              transform: translateY(0);
            }

                         .animate-in .section-header p {
               opacity: 1;
               transform: translateY(0);
             }

             /* Animated underline for section header */
             .animated-underline {
               position: relative;
               display: inline-block;
             }

             .animated-underline::after {
               content: '';
               position: absolute;
               width: 0;
               height: 3px;
               bottom: -8px;
               left: 50%;
               background: #140a8e;
               transition: all 0.8s cubic-bezier(0.25, 0.8, 0.25, 1);
               transform: translateX(-50%);
             }

             .animate-in .animated-underline::after {
               width: 100%;
             }

                     

                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               .contact-card::before {
                  content: '';
                  position: absolute;
                  top: -50%;
                  left: -50%;
                  width: 200%;
                  height: 200%;
                  background: radial-gradient(circle at 0% 0%, #140a8e 0%, #0f0a6b 100%);
                  border-radius: 50%;
                  transform: scale(0);
                  transform-origin: 0% 0%;
                  transition: transform 0.7s ease-in-out;
                  z-index: 1;
                  pointer-events: none;
                }

             .contact-card:hover::before {
               transform: scale(1);
             }

          /* Text color transitions for contact cards */
          .contact-card .text-blue-900 {
            transition: color 0.7s ease-in-out;
          }

          .contact-card:hover .text-blue-900 {
            color: white !important;
          }

          .contact-card:hover .w-16 {
            background: white !important;
          }

                     .contact-card:hover svg {
             color: #140a8e !important;
           }

         /* Custom map popup styles */
         .custom-popup .leaflet-popup-content-wrapper {
           background: white;
           border-radius: 12px;
           box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
           border: none;
         }

         .custom-popup .leaflet-popup-content {
           margin: 0;
           padding: 0;
         }

         .custom-popup .leaflet-popup-tip {
           background: white;
           box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
         }

         details[open] > summary {
           margin-bottom: 1rem;
         }

         input:focus, textarea:focus {
           transform: scale(1.02);
         }

         .group:hover .group-hover\:scale-105 {
           transform: scale(1.05);
         }

         @keyframes fadeInSlideUp {
           from {
             opacity: 0;
             transform: translateY(40px);
           }
           to {
             opacity: 1;
             transform: translateY(0);
           }
         }

                   .animate-fade-in-slide-up {
            animation: fadeInSlideUp 1.2s cubic-bezier(0.25, 0.8, 0.25, 1) forwards;
          }

          /* Custom scrollbar styling */
          .custom-scrollbar::-webkit-scrollbar {
            width: 8px;
          }

          .custom-scrollbar::-webkit-scrollbar-track {
            background: #f1f5f9;
            border-radius: 4px;
          }

          .custom-scrollbar::-webkit-scrollbar-thumb {
            background: #cbd5e1;
            border-radius: 4px;
          }

          .custom-scrollbar::-webkit-scrollbar-thumb:hover {
            background: #94a3b8;
          }

          /* Firefox scrollbar */
          .custom-scrollbar {
            scrollbar-width: thin;
            scrollbar-color: #cbd5e1 #f1f5f9;
          }

          /* Main content animations */
          .main-content-left {
            opacity: 0;
            transform: translateX(-50px);
            transition: all 1s cubic-bezier(0.25, 0.8, 0.25, 1);
          }

          .main-content-right {
            opacity: 0;
            transform: translateX(50px);
            transition: all 1s cubic-bezier(0.25, 0.8, 0.25, 1);
            transition-delay: 0.2s;
          }

          .animate-in .main-content-left {
            opacity: 1;
            transform: translateX(0);
          }

          .animate-in .main-content-right {
            opacity: 1;
            transform: translateX(0);
          }


        `}</style>
    </div>
  );
}
