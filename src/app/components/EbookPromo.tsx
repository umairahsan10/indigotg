"use client";

import React, { useEffect, useRef, useState } from 'react';
import { useRouter } from "next/navigation";

const EbookPromo = () => {
  const textRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
      }
    );

    if (textRef.current) observer.observe(textRef.current);
    if (imageRef.current) observer.observe(imageRef.current);

    return () => observer.disconnect();
  }, []);

  const handleDownloadClick = () => {
    router.push('/ebook');
  };

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Section - eBook Cover Image */}
          <div ref={imageRef} className="relative image-content">
            <div className="relative rounded-2xl overflow-hidden image-shadow">
              <img
                src="/ebook/Support-ebook-social-post-1-1024x1024.png"
                alt="eBook Cover"
                className="w-[617px] h-[370px] object-cover"
              />
            </div>
          </div>

          {/* Right Section - Text Content */}
          <div ref={textRef} className="space-y-8 text-content">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-roboto font-bold text-[#140079] leading-tight">
              Free eBook
            </h2>
            <p className="text-lg md:text-xl text-[#140079] leading-relaxed font-roboto">
              Whether you are a traditional telco, tech company or data centre, this eBook will help you maximise uptime in your network.
            </p>
            
            {/* Animated Button */}
            <button onClick={handleDownloadClick} className="learn-more">
              <span className="circle">
                <span className="icon arrow"></span>
              </span>
              <span className="button-text font-roboto">Download eBook</span>
            </button> 
          </div>
        </div>
      </div>

      <style jsx>{`
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

        /* Staggered animation for text elements */
        .text-content.animate-in h2 {
          animation: slideInUp 0.6s ease-out 0.2s both;
        }

        .text-content.animate-in p {
          animation: slideInUp 0.6s ease-out 0.4s both;
        }

        .text-content.animate-in .learn-more {
          animation: slideInUp 0.6s ease-out 0.6s both;
        }

        @keyframes slideInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        /* From Uiverse.io by cssbuttons-io */ 
        button {
          position: relative;
          display: inline-block;
          cursor: pointer;
          outline: none;
          border: 0;
          vertical-align: middle;
          text-decoration: none;
          background: transparent;
          padding: 0;
          font-size: inherit;
          font-family: inherit;
        }

        button.learn-more {
          width: 14rem;
          height: auto;
        }

        button.learn-more .circle {
          transition: all 0.45s cubic-bezier(0.65, 0, 0.076, 1);
          position: relative;
          display: block;
          margin: 0;
          width: 3rem;
          height: 3rem;
          background: #140079;
          border-radius: 1.625rem;
        }

        button.learn-more .circle .icon {
          transition: all 0.45s cubic-bezier(0.65, 0, 0.076, 1);
          position: absolute;
          top: 0;
          bottom: 0;
          margin: auto;
          background: #fff;
        }

        button.learn-more .circle .icon.arrow {
          transition: all 0.45s cubic-bezier(0.65, 0, 0.076, 1);
          left: 0.625rem;
          width: 1.125rem;
          height: 0.125rem;
          background: none;
        }

        button.learn-more .circle .icon.arrow::before {
          position: absolute;
          content: "";
          top: -0.29rem;
          right: 0.0625rem;
          width: 0.625rem;
          height: 0.625rem;
          border-top: 0.125rem solid #fff;
          border-right: 0.125rem solid #fff;
          transform: rotate(45deg);
        }

        button.learn-more .button-text {
          transition: all 0.45s cubic-bezier(0.65, 0, 0.076, 1);
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          padding: 0.75rem 0;
          margin: 0 0 0 3.4rem;
          color: #140079;
          font-weight: 700;
          line-height: 1.6;
          text-align: left;
          text-transform: uppercase;
          white-space: nowrap;
        }

        button:hover .circle {
          width: 100%;
        }

        button:hover .circle .icon.arrow {
          background: #fff;
          transform: translate(1rem, 0);
        }

        button:hover .button-text {
          color: #fff;
        }
      `}</style>
    </section>
  );
};

export default EbookPromo;
