"use client";

import { useState } from "react";
import { orbitron } from "../fonts";

// Custom CSS for geometric sans-serif font
const geometricSans = {
  fontFamily: 'Geometric Sans-Serif, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif'
};
import { FaLinkedinIn, FaYoutube, FaInstagram, FaXTwitter } from "react-icons/fa6";
import { EbookStackedCards } from "../components/DataCentreEbookCard";

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
        {/* <img
          src="/ebook/ebookbg.png"
          alt="Background"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            opacity: 0.3
          }}
        /> */}
      </div>

      <div style={{position: 'relative', zIndex: 2, maxWidth: '1280px', margin: '0 auto', padding: '64px 16px'}}>
        {/* Header with Logo */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center mb-8">
            {/* <img 
              src="/ebook/indigo_logo_blue.svg" 
              alt="INDIGO Logo" 
              className="w-30 h-30 mr-3"
            /> */}
          </div>
          
          <h1 style={{textAlign: 'center', fontSize: '55px'}}><span style={{color: '#140177'}} className="font-bold">Download Your Free Data Centre eBook</span></h1>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Left Section - Content Description */}
          <div className="space-y-8 relative z-30">
            <div className="space-y-6 text-xl text-gray-700 leading-relaxed">
              <p>
                This Data Centre eBook explores the current market and current trends, and what is driving the demand for data centres.
              </p>
              <p>
                By identifying the market challenges, the eBook shows how Indigo can help with your bespoke requirements due to our wide range of services and solutions.
              </p>
              <p className="font-semibold text-xl font-bold" style={{color: '#04048b'}}>
                Fill in the form below to receive your free eBook today.
              </p>
              <p>
                Once the form is completed, the eBook will be emailed to your provided e-mail address.
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

              {/* Phone Number */}
              <div style={{marginBottom: '16px'}}>
                <label htmlFor="mobilePhone" style={{
                  display: 'block', 
                  marginBottom: '8px', 
                  fontWeight: 'bold',
                  fontFamily: 'sans-serif',
                  color: '#140177'
                }}>
                  Phone number
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
                  placeholder="Enter your phone number"
                />
              </div>

            {/* Privacy Policy Section */}
            <div className="mt-8 text-sm text-gray-600 leading-relaxed" style={{color: '#04048b'}}>
              <p className="mb-4" style={{color: '#04048b'}}>
                Indigo is committed to protecting and respecting your privacy, and we'll only use your personal information to administer your account and to provide the products and services you requested from us. From time to time, we would like to contact you about our products and services, as well as other content that may be of interest to you. If you consent to us contacting you for this purpose, please tick below to say how you would like us to contact you:
              </p>
              
              <div className="mb-4">
                <label className="flex items-start space-x-3 cursor-pointer">
                  <input 
                    type="checkbox" 
                    className="mt-1 w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
                  />
                  <span>I agree to receive other communications from Indigo.</span>
                </label>
              </div>
              
              <p className="mb-4">
                You can unsubscribe from these communications at any time. For more information on how to unsubscribe, our privacy practices, and how we are committed to protecting and respecting your privacy, please review our Privacy Policy.
              </p>
              
              <p>
                By clicking submit below, you consent to allow Indigo to store and process the personal information submitted above to provide you the content requested.
              </p>
            </div>
                  {/* Submit Button */}
              <button
                type="submit"
                style={{
                  width: '100%',
                  backgroundColor: '#1e3a8a',
                  color: 'white',
                  fontWeight: 'bold',
                  padding: '10px 32px',
                  borderRadius: '8px',
                  fontSize: '18px',
                  border: 'none',
                  cursor: 'pointer',
                  fontFamily: 'sans-serif',
                  marginTop: '30px'
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
              {/* <a 
                href="https://www.youtube.com/channel/UCHUmZqxmFQlys5lD3msnriQ" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center text-white hover:bg-red-700 transition-colors duration-200"
              >
                <FaYoutube size={20} />
              </a> */}
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
          <div className="flex justify-center lg:justify-end mt-[-12rem] relative z-30">
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
              <div className="mt-[-0.5rem] flex justify-center">
                <img 
                  src="/ebook/Data Centre ebook cover.webp" 
                  alt="Data Centre ebook cover" 
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