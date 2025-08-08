'use client';

import InteractiveMap from "../components/InteractiveMap";
import Image from "next/image";
import GetInTouchForm from "../components/GetInTouchForm";

export default function GetInTouch() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
              <div className="relative overflow-hidden text-white" style={{backgroundImage: 'url(/get-in-touch/img-6.png)', backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat'}}>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32 min-h-screen flex items-center">
          <div className="text-left">
            <div className="animate-fade-in-up">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                Contact Us
              </h1>
              <p className="text-xl lg:text-2xl text-slate-300 leading-relaxed max-w-4xl">
                Ready to transform your technology infrastructure?<br />
                Get in touch with our expert team for personalized<br />
                solutions and 24/7 support across 90+ countries.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Contact Information Section */}
      <div className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 animate-fade-in-up">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Sales & Support
            </h2>
            <p className="text-xl text-gray-600">
              24hr Customer Support Helpline
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Phone Support */}
            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 animate-fade-in-up" style={{animationDelay: '0.1s'}}>
              <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mb-6 mx-auto">
                <svg className="w-8 h-8 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2 text-center">24hr Support</h3>
              <p className="text-2xl font-bold text-indigo-600 text-center mb-2">+44 (0) 1291 435800</p>
              <p className="text-gray-600 text-center">Round-the-clock assistance</p>
            </div>

            {/* Email Support */}
            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 animate-fade-in-up" style={{animationDelay: '0.2s'}}>
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-6 mx-auto">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4 text-center">Email Support</h3>
              <div className="space-y-2 text-center">
                <p className="text-sm font-medium text-gray-700">Customer Support</p>
                <p className="text-indigo-600 font-semibold">support@indigotg.com</p>
              </div>
            </div>

            {/* Sales Enquiries */}
            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 animate-fade-in-up" style={{animationDelay: '0.3s'}}>
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mb-6 mx-auto">
                <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4 text-center">Sales & Resourcing</h3>
              <div className="space-y-2 text-center text-sm">
                <p><span className="font-medium">Sales:</span> sales@indigotg.com</p>
                <p><span className="font-medium">Sub-contractors:</span> resourcing@indigotg.com</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Section */}
      <div className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16">
            {/* Contact Form */}
            <GetInTouchForm />

            {/* Global Offices */}
            <div className="animate-fade-in-right">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Global Presence</h2>
              <p className="text-xl text-gray-600 mb-8">
                90 countries supported from these strategic locations
              </p>

              <div className="space-y-6">
                {/* Global HQ */}
                <div className="bg-white border-2 border-indigo-100 rounded-2xl p-6 hover:border-indigo-300 transition-colors duration-300">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <svg className="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path>
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-bold text-lg text-gray-900 mb-1">Global HQ - United Kingdom</h3>
                      <p className="text-gray-600 text-sm mb-2">
                        102, Wales One Business Park<br />
                        Magor, Monmouthshire NP26 3DG
                      </p>
                      <p className="text-indigo-600 font-semibold">+44 (0)1291 435500</p>
                    </div>
                  </div>
                </div>

                {/* Asia HQ */}
                <div className="bg-white border-2 border-green-100 rounded-2xl p-6 hover:border-green-300 transition-colors duration-300">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9v-9m0-9v9"></path>
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-bold text-lg text-gray-900 mb-1">Asia HQ - Singapore</h3>
                      <p className="text-gray-600 text-sm mb-2">
                        9 Raffles Place, #26-01<br />
                        Republic Plaza, Singapore 048619
                      </p>
                      <p className="text-green-600 font-semibold">+852 9151 9885</p>
                    </div>
                  </div>
                </div>

                {/* Collapsible Other Offices */}
                <details className="group">
                  <summary className="cursor-pointer bg-gray-50 rounded-2xl p-6 hover:bg-gray-100 transition-colors duration-300 list-none">
                    <div className="flex items-center justify-between">
                      <h3 className="font-bold text-lg text-gray-900">View All Regional Offices</h3>
                      <svg className="w-5 h-5 text-gray-500 group-open:rotate-180 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                      </svg>
                    </div>
                  </summary>
                  
                  <div className="mt-4 space-y-4 pl-6">
                    {[
                      { region: "North America", location: "17th Street, 7th Floor\nIndigo Subsea Suite, Denver, CO 80202", phone: "+1 719-408-8847" },
                      { region: "United States", location: "230 Swartz Road\nLexington, South Carolina 29072", phone: "+1 719-408-8847" },
                      { region: "Ireland", location: "Houston Hall, Ballycummin Avenue\nRaheen Business Park, Limerick V94PKF1", phone: "+353 (0)61 306688" },
                      { region: "France", location: "9 Rue des Colonnes\n75002 Paris, France", phone: "" },
                      { region: "Netherlands", location: "Prof JH Bavincklaan 7\n1183AT Amstelveen, Netherlands", phone: "" },
                      { region: "Germany", location: "c/o Steuerkanzlei Gundisch\nDorn Partnerschaft mbB\nBockenheimer Anlage 2\n60322 Frankfurt am Main", phone: "" }
                    ].map((office, index) => (
                      <div key={index} className="bg-white border border-gray-200 rounded-xl p-4">
                        <h4 className="font-semibold text-gray-900 mb-1">{office.region}</h4>
                        <p className="text-sm text-gray-600 mb-2 whitespace-pre-line">{office.location}</p>
                        {office.phone && <p className="text-sm text-indigo-600 font-medium">{office.phone}</p>}
                      </div>
                    ))}
                  </div>
                </details>
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
            <InteractiveMap />
          </div>
        </div>
      </div>

      {/* Newsletter Section */}
      <div className="relative pt-8 pb-8 overflow-hidden min-h-[400px]">
        {/* Background Image */}
        <div className="absolute inset-0 bg-cover bg-center bg-no-repeat" style={{backgroundImage: 'url(/get-in-touch/img-5.png)'}}></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center animate-fade-in-up">
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-8">
              Stay Connected
            </h2>

            
            <div className="max-w-md mx-auto flex mt-8">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-6 py-4 rounded-l-xl bg-slate-700 border border-slate-600 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              />
              <button className="px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold rounded-r-xl hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl">
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


      `}</style>
    </div>
  );
}
