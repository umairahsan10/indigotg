"use client";

import { useState } from "react";
import { orbitron } from "../fonts";

// Custom CSS for geometric sans-serif font
const geometricSans = {
  fontFamily: 'Geometric Sans-Serif, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif'
};
import { FaLinkedinIn, FaYoutube, FaInstagram, FaXTwitter } from "react-icons/fa6";
import { EbookStackedCards } from "../components/EbookCard";

export default function EbookPage() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    workEmail: "",
    jobTitle: "",
    companyName: "",
    mobilePhone: ""
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Log form data
    console.log("Form submitted:", formData);
    
    // Trigger PDF download
    const link = document.createElement('a');
    link.href = '/ebook/Indigo Guide to Successfully Outsourcing Network Infrastructure Support Services e-book USA.pdf';
    link.download = 'Indigo Network Infrastructure eBook.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="min-h-screen bg-white relative overflow-hidden">
                    {/* Background image */}
        <div className="absolute inset-0 w-full h-full pointer-events-none">
          <img
            src="/ebook/ebookbg.png"
            alt="Background"
            className="w-full h-full object-cover opacity-40"
          />
        </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                 {/* Header with Logo */}
         <div className="text-center mb-16">
           <div className="inline-flex items-center mb-8">
             {/* <img 
               src="/ebook/indigo_logo_blue.svg" 
               alt="INDIGO Logo" 
               className="w-30 h-30 mr-3"
             /> */}
           </div>
          
                     <h1 style={{textAlign: 'center', fontSize: '55px'}}><span style={{color: '#140177'}} className="font-bold">Maximize Network Uptime: Improve Network Infrastructure Efficiency with Our Free eBook!</span></h1>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Left Section - Content Description */}
          <div className="space-y-8">
                         <h2 style={{...geometricSans, color: '#04048b'}} className="text-3xl font-bold">
               What's inside?
             </h2>
            
            <div className="space-y-6 text-xl text-gray-700 leading-relaxed">
              <p>
                Discover the power of strategic outsourcing: Maximize network uptime, enhance security, and optimize network efficiency.
              </p>
              <p>
                Download this ebook for your guide to successfully outsourcing network infrastructure support services.
              </p>
                             <p className="font-semibold text-xl font-bold" style={{color: '#04048b'}}>
                 Fill in the form below to receive your free eBook today.
               </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="firstName" className="block text-base font-medium text-gray-700 mb-2">
                    First name*
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-base"
                    placeholder="Enter your first name"
                    style={{borderColor: '#140477'}}
                  />
                </div>
                <div>
                  <label htmlFor="lastName" className="block text-base font-medium text-gray-700 mb-2">
                    Last name*
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-base"
                    placeholder="Enter your last name"
                    style={{borderColor: '#140477'}}
                  />
                </div>
              </div>

              <div>
                <label htmlFor="workEmail" className="block text-base font-medium text-gray-700 mb-2">
                  Work email*
                </label>
                <input
                  type="email"
                  id="workEmail"
                  name="workEmail"
                  value={formData.workEmail}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-base"
                  placeholder="Enter your work email"
                  style={{borderColor: '#140477'}}
                />
              </div>

              <div>
                <label htmlFor="jobTitle" className="block text-base font-medium text-gray-700 mb-2">
                  Job title
                </label>
                <input
                  type="text"
                  id="jobTitle"
                  name="jobTitle"
                  value={formData.jobTitle}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-base"
                  placeholder="Enter your job title"
                  style={{borderColor: '#140477'}}
                />
              </div>

              <div>
                <label htmlFor="companyName" className="block text-base font-medium text-gray-700 mb-2">
                  Company name*
                </label>
                <input
                  type="text"
                  id="companyName"
                  name="companyName"
                  value={formData.companyName}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-base"
                  placeholder="Enter your company name"
                  style={{borderColor: '#140477'}}
                />
              </div>

              <div>
                <label htmlFor="mobilePhone" className="block text-base font-medium text-gray-700 mb-2">
                  Mobile phone number
                </label>
                <input
                  type="tel"
                  id="mobilePhone"
                  name="mobilePhone"
                  value={formData.mobilePhone}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-base"
                  placeholder="Enter your mobile number"
                  style={{borderColor: '#140477'}}
                />
              </div>

              <button
                type="submit"
                className="w-full bg-blue-900 text-white font-bold py-4 px-8 rounded-lg text-lg hover:bg-blue-800 transition-all duration-200 transform hover:scale-105 focus:ring-4 focus:ring-blue-300 focus:outline-none"
              >
                DOWNLOAD EBOOK NOW
              </button>
            </form>

            {/* Social Media Icons */}
            <div className="flex justify-center space-x-6 pt-6">
              <a 
                href="https://www.linkedin.com/uas/login?session_redirect=%2Fcompany%2F676658%2F" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white hover:bg-blue-700 transition-colors duration-200"
              >
                <FaLinkedinIn size={20} />
              </a>
              <a 
                href="https://www.youtube.com/channel/UCHUmZqxmFQlys5lD3msnriQ" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center text-white hover:bg-red-700 transition-colors duration-200"
              >
                <FaYoutube size={20} />
              </a>
              <a 
                href="https://www.instagram.com/indigo_tg/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white hover:from-purple-600 hover:to-pink-600 transition-all duration-200"
              >
                <FaInstagram size={20} />
              </a>
              <a 
                href="https://x.com/Indigo_TG" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-12 h-12 bg-black rounded-full flex items-center justify-center text-white hover:bg-gray-800 transition-all duration-200"
              >
                <FaXTwitter size={20} />
              </a>
            </div>
          </div>

                                           {/* Right Section - Stacked Cards */}
            <div className="flex justify-center lg:justify-end mt-[-12rem]">
              <div className="relative">
                <EbookStackedCards
                  cards={[
                    {
                      image: "/ebook/card1.jpeg"
                    },
                    {
                      image: "/ebook/card2.jpeg"
                    },
                    {
                      image: "/ebook/card3.jpeg"
                    }
                  ]}
                  spreadDistance={40}
                  rotationAngle={5}
                  animationDelay={0.1}
                />
                
                {/* Book Image Below Cards */}
                <div className="mt-4 flex justify-center">
                  <img 
                    src="/ebook/Support eBook cover page.webp" 
                    alt="Network Infrastructure eBook" 
                    className="max-w-96 max-h-96 object-contain shadow-2xl"
                    style={{
                      boxShadow: '0 20px 40px rgba(0,0,0,0.15)'
                    }}
                  />
                </div>
              </div>
            </div>
        </div>
      </div>


    </div>
  );
}