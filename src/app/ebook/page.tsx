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
      {/* Simple Background Image */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 1,
        pointerEvents: 'none'
      }}>
        <img
          src="/ebook/ebookbg.png"
          alt="Background"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            opacity: 0.3
          }}
        />
      </div>

              <div style={{position: 'relative', zIndex: 2, maxWidth: '1280px', margin: '0 auto', padding: '32px 16px'}} className="pt-8 sm:pt-16 lg:pt-16">
        {/* Header with Logo */}
        <div className="text-center mt-8 sm:mb-12 lg:mb-20">
                      <div className="inline-flex items-center mb-4 sm:mb-6 lg:mb-8">
            {/* <img 
              src="/ebook/indigo_logo_blue.svg" 
              alt="INDIGO Logo" 
              className="w-30 h-30 mr-3"
            /> */}
          </div>
          
          <h1 className="text-center font-bold text-[#140177] text-4xl sm:text-5xl md:text-5xl lg:text-6xl xl:text-6xl leading-tight px-4">
            Maximize Network Uptime: Improve Network Infrastructure Efficiency with Our Free eBook!
          </h1>
        </div>

        {/* Mobile Cards Section - Above content on mobile */}
        <div className="lg:hidden mt-12 mb-8">
          <div className="flex justify-center">
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
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Left Section - Content Description */}
          <div className="lg:col-span-1 space-y-8 relative z-30">
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

            {/* New Form Implementation */}
            <form onSubmit={handleSubmit}>
              {/* First Row - Two fields side by side */}
              <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px'}}>
                <div>
                  <label htmlFor="firstName" style={{
                    display: 'block', 
                    marginBottom: '8px', 
                    fontWeight: 'bold',
                    fontFamily: 'sans-serif',
                    color: '#140177'
                  }}>
                    First Name *
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    required
                    style={{
                      width: '100%', 
                      padding: '12px', 
                      border: '2px solid #140177', 
                      borderRadius: '8px',
                      backgroundColor: 'white',
                      fontFamily: 'sans-serif'
                    }}
                    placeholder="Enter your first name"
                  />
                </div>
                <div>
                  <label htmlFor="lastName" style={{
                    display: 'block', 
                    marginBottom: '8px', 
                    fontWeight: 'bold',
                    fontFamily: 'sans-serif',
                    color: '#140177'
                  }}>
                    Last Name *
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    required
                    style={{
                      width: '100%', 
                      padding: '12px', 
                      border: '2px solid #140177', 
                      borderRadius: '8px',
                      backgroundColor: 'white',
                      fontFamily: 'sans-serif'
                    }}
                    placeholder="Enter your last name"
                  />
                </div>
              </div>

              {/* Work Email */}
              <div style={{marginBottom: '16px'}}>
                <label htmlFor="workEmail" style={{
                  display: 'block', 
                  marginBottom: '8px', 
                  fontWeight: 'bold',
                  fontFamily: 'sans-serif',
                  color: '#140177'
                }}>
                  Work Email *
                </label>
                <input
                  type="email"
                  id="workEmail"
                  name="workEmail"
                  value={formData.workEmail}
                  onChange={handleInputChange}
                  required
                  style={{
                    width: '100%', 
                    padding: '12px', 
                    border: '2px solid #140177', 
                    borderRadius: '8px',
                    backgroundColor: 'white',
                    fontFamily: 'sans-serif'
                  }}
                  placeholder="Enter your work email"
                />
              </div>

              {/* Job Title */}
              <div style={{marginBottom: '16px'}}>
                <label htmlFor="jobTitle" style={{
                  display: 'block', 
                  marginBottom: '8px', 
                  fontWeight: 'bold',
                  fontFamily: 'sans-serif',
                  color: '#140177'
                }}>
                  Job Title
                </label>
                <input
                  type="text"
                  id="jobTitle"
                  name="jobTitle"
                  value={formData.jobTitle}
                  onChange={handleInputChange}
                  style={{
                    width: '100%', 
                    padding: '12px', 
                    border: '2px solid #140177', 
                    borderRadius: '8px',
                    backgroundColor: 'white',
                    fontFamily: 'sans-serif'
                  }}
                  placeholder="Enter your job title"
                />
              </div>

              {/* Company Name */}
              <div style={{marginBottom: '16px'}}>
                <label htmlFor="companyName" style={{
                  display: 'block', 
                  marginBottom: '8px', 
                  fontWeight: 'bold',
                  fontFamily: 'sans-serif',
                  color: '#140177'
                }}>
                  Company Name *
                </label>
                <input
                  type="text"
                  id="companyName"
                  name="companyName"
                  value={formData.companyName}
                  onChange={handleInputChange}
                  required
                  style={{
                    width: '100%', 
                    padding: '12px', 
                    border: '2px solid #140177', 
                    borderRadius: '8px',
                    backgroundColor: 'white',
                    fontFamily: 'sans-serif'
                  }}
                  placeholder="Enter your company name"
                />
              </div>

              {/* Mobile Phone */}
              <div style={{marginBottom: '16px'}}>
                <label htmlFor="mobilePhone" style={{
                  display: 'block', 
                  marginBottom: '8px', 
                  fontWeight: 'bold',
                  fontFamily: 'sans-serif',
                  color: '#140177'
                }}>
                  Mobile Phone Number
                </label>
                <input
                  type="tel"
                  id="mobilePhone"
                  name="mobilePhone"
                  value={formData.mobilePhone}
                  onChange={handleInputChange}
                  style={{
                    width: '100%', 
                    padding: '12px', 
                    border: '2px solid #140177', 
                    borderRadius: '8px',
                    backgroundColor: 'white',
                    fontFamily: 'sans-serif'
                  }}
                  placeholder="Enter your mobile number"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                style={{
                  width: '100%',
                  backgroundColor: '#1e3a8a',
                  color: 'white',
                  fontWeight: 'bold',
                  padding: '16px 32px',
                  borderRadius: '8px',
                  fontSize: '18px',
                  border: 'none',
                  cursor: 'pointer',
                  fontFamily: 'sans-serif'
                }}
              >
                DOWNLOAD EBOOK NOW
              </button>
            </form>

            {/* Social Media Icons */}
            <div className="flex justify-center space-x-6 pt-6 relative z-30">
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

          {/* Desktop Right Section - Stacked Cards (hidden on mobile) */}
          <div className="hidden lg:block lg:col-span-1 lg:-mt-30 relative z-30">
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
              <div className="mt-8 flex justify-center">
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

        {/* Mobile Book Image - Below form content */}
        <div className="lg:hidden mt-12 mb-8">
          <div className="flex justify-center">
            <img 
              src="/ebook/Support eBook cover page.webp" 
              alt="Network Infrastructure eBook" 
              className="max-w-80 max-h-80 object-contain shadow-2xl"
              style={{
                boxShadow: '0 20px 40px rgba(0,0,0,0.15)'
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}