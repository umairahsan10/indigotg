'use client';

import React from 'react';

export default function CTASection() {
  return (
    <>
      <style jsx global>{`
        .outro {
          height: 70vh;
          padding: 0;
          display: flex;
          justify-content: center;
          align-items: center;
          position: relative;
          overflow: hidden;
          background: linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url('/solutions/handshake.jpg');
          background-size: cover;
          background-position: center;
          background-attachment: fixed;
          width: 100vw;
          margin-left: calc(-50vw + 50%);
          margin-right: calc(-50vw + 50%);
        }

        .outro-container {
          position: relative;
          z-index: 2;
          width: 100%;
          max-width: 100%;
          padding: 0 2rem;
        }

        .outro-content {
          background: transparent;
          border: none;
          border-radius: 150px;
          padding: 3rem 2rem;
          text-align: center;
        }

        .outro h1 {
          color:#ffffff;
          font-size: 2.5rem;
          font-weight: 600;
          margin-bottom: 1.5rem;
          line-height: 1.2;
          text-align: center !important;
          width: 100%;
          margin-left: auto !important;
          margin-right: auto !important;
        }

        .outro p {
          color:#ffffff;
          font-size: 1.1rem;
          line-height: 1.6;
          margin-bottom: 2rem;
          max-width: 500px;
          margin-left: auto;
          margin-right: auto;
        }

        .contact-button {
          background: #140079;
          border: 1px solid #140079;
          color: #ffffff;
          padding: 12px 32px;
          font-size: 1rem;
          font-weight: 600;
          border-radius: 8px;
          cursor: pointer;
          transition: all 0.3s ease;
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          font-family: "Roboto", "Segoe UI", "Helvetica Neue", Arial, sans-serif;
        }

        .contact-button:hover {
          background: #0f0066;
          border-color: #0f0066;
          transform: translateY(-2px);
        }

        .contact-button svg {
          transition: transform 0.3s ease;
        }

        .contact-button:hover svg {
          transform: translateX(4px);
        }

        @media (max-width: 900px) {
          .outro h1 {
            font-size: 2rem;
            margin-bottom: 1rem;
          }

          .outro p {
            font-size: 1rem;
            margin-bottom: 1.5rem;
          }

          .outro-content {
            padding: 2rem 1.5rem;
            margin: 0 1rem;
            text-align: center;
          }

          .contact-button {
            padding: 0.875rem 1.5rem;
            font-size: 1rem;
          }
        }
      `}</style>
      
      <section className="outro">
        <div className="outro-container">
          <div className="outro-content">
            <h1>Want to know more?</h1>
            <p>
              If you want to know more about how we can design, deploy and support your network and infrastructure, get in touch.
            </p>
            <button className="contact-button">
              Contact us
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M8 1L15 8L8 15M15 8H1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>
        </div>
      </section>
    </>
  );
}
