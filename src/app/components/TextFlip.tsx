"use client";

import { useEffect, useMemo, useRef } from "react";

export default function TextFlip() {
  const words = useMemo(() => ["Enabling", "Maintaining"], []);

  return (
    <>
      <style jsx>{`
        .text-flip-container {
          display: inline-block;
          overflow: hidden;
          color: #00ffff;
          font-weight: 700;
          font-family: 'Arial Black', 'Helvetica Bold', sans-serif;
          text-shadow: 0 0 25px rgba(0, 255, 255, 0.6);
          transition: all 0.3s ease;
          vertical-align: baseline;
          line-height: 1.2;
          position: relative;
          white-space: nowrap;
          width: 450px;
          height: 80px;
          padding: 12px 16px;
          text-align: left;
        }

        .text-flip-container:hover {
          text-shadow: 0 0 35px rgba(0, 255, 255, 0.8);
          transform: translateY(-2px);
          color: #00dddd;
        }

        .text-flip-word {
          display: block;
          position: absolute;
          width: 100%;
          white-space: nowrap;
          top: 0;
          text-align: left;
        }

        .text-flip-word:nth-child(1) {
          animation: flip-words-1 4s ease-in-out infinite;
        }

        .text-flip-word:nth-child(2) {
          animation: flip-words-2 4s ease-in-out infinite;
        }

        @keyframes flip-words-1 {
          0%, 45% { 
            transform: translateY(0); 
            opacity: 1;
          }
          50%, 95% { 
            transform: translateY(-100%); 
            opacity: 0;
          }
          100% { 
            transform: translateY(0); 
            opacity: 1;
          }
        }

        @keyframes flip-words-2 {
          0%, 45% { 
            transform: translateY(100%); 
            opacity: 0;
          }
          50%, 95% { 
            transform: translateY(0); 
            opacity: 1;
          }
          100% { 
            transform: translateY(100%); 
            opacity: 0;
          }
        }

        @media (max-width: 900px) {
          .text-flip-container {
            width: 320px;
            height: 70px;
            padding: 10px 15px 0 15px;
            font-size: 2.2rem;
            text-align: left;
            margin: 1rem 0 0 0;
            display: block;
            position: relative;
            left: -10px;
            transform: none;
          }

          .text-flip-container .flip-word {
            text-align: left;
            justify-content: flex-start;
          }
        }

        @media (max-width: 640px) {
          .text-flip-container {
            width: 280px;
            height: 60px;
            padding: 8px 12px 0 12px;
            font-size: 1.8rem;
            display: block;
            position: relative;
            left: -8px;
            transform: none;
            margin: 0.75rem 0 0 0;
          }

          .text-flip-container .flip-word {
            text-align: left;
            justify-content: flex-start;
          }
        }

        @media (max-width: 480px) {
          .text-flip-container {
            width: 240px;
            height: 55px;
            padding: 7px 10px 0 10px;
            font-size: 1.6rem;
            display: block;
            position: relative;
            left: -6px;
            transform: none;
            margin: 0.5rem 0 0 0;
          }

          .text-flip-container .flip-word {
            text-align: left;
            justify-content: flex-start;
          }
        }
      `}</style>

      <div className="text-flip-container">
        {words.map((word, index) => (
          <span key={index} className="text-flip-word">
            {word}
          </span>
        ))}
      </div>
    </>
  );
}