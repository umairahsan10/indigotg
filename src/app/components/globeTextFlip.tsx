"use client";

import { useEffect, useMemo, useRef } from "react";

export default function TextFlip() {
  const words = useMemo(() => ["Fixed Line", "Subsea", "Data Centers", "NOC", "Networks", "Wireless"], []);

  const tallestRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (tallestRef.current) {
      let maxHeight = 0;

      words.forEach((word) => {
        const span = document.createElement("span");
        span.className = "absolute opacity-0";
        span.textContent = word;
        tallestRef.current?.appendChild(span);
        const height = span.offsetHeight;
        tallestRef.current?.removeChild(span);

        if (height > maxHeight) {
          maxHeight = height;
        }
      });

      // Add extra padding to account for descenders and animation space
      tallestRef.current.style.height = `${maxHeight + 40}px`;
    }
  }, [words]);

  return (
    <>
      <style jsx>{`
        .text-flip-container {
          display: inline-flex;
          flex-direction: column;
          overflow: hidden;
          color: #FFD700;
          font-weight: 700;
          font-family: 'Roboto', sans-serif;
          text-shadow: 0 0 25px rgba(255, 215, 0, 0.6);
          transition: all 0.3s ease;
          min-width: 280px;
          border: 2px solid transparent;
          padding: 4px 0;
          position: relative;
        }

        .text-flip-container:hover {
          text-shadow: 0 0 35px rgba(255, 215, 0, 0.8);
          transform: translateY(-2px);
          color: #FFA500;
        }

        .text-flip-word {
          animation: flip-words 12s ease-in-out infinite, float 2s ease-in-out infinite;
          line-height: 1.2;
          margin-bottom: 30px;
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          opacity: 0;
        }

        .text-flip-word:nth-child(1) {
          animation-delay: 0s, 0s;
        }

        .text-flip-word:nth-child(2) {
          animation-delay: -10s, -10s;
        }

        .text-flip-word:nth-child(3) {
          animation-delay: -8s, -8s;
        }

        .text-flip-word:nth-child(4) {
          animation-delay: -6s, -6s;
        }

        .text-flip-word:nth-child(5) {
          animation-delay: -4s, -4s;
        }

        .text-flip-word:nth-child(6) {
          animation-delay: -2s, -2s;
        }

        @keyframes flip-words {
          0%, 15% { 
            transform: translateY(0); 
            opacity: 1;
          }
          16%, 100% { 
            transform: translateY(0); 
            opacity: 0;
          }
        }

        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-8px);
          }
        }
      `}</style>

      <div ref={tallestRef} className="text-flip-container">
        {words.map((word, index) => (
          <span key={index} className="text-flip-word">
            {word}
          </span>
        ))}
      </div>
    </>
  );
}