"use client";

import { useEffect, useMemo, useRef } from "react";

export default function TextFlip() {
  const words = useMemo(() => ["Enabling", "Maintaining"], []);

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

      // Add extra padding to account for descenders (g, j, p, q, y)
      tallestRef.current.style.height = `${maxHeight + 12}px`;
    }
  }, [words]);

  return (
    <>
      <style jsx>{`
        .text-flip-container {
          display: inline-flex;
          flex-direction: column;
          overflow: hidden;
          color: #00ffff;
          font-weight: 700;
          font-family: 'Arial Black', 'Helvetica Bold', sans-serif;
          text-shadow: 0 0 25px rgba(0, 255, 255, 0.6);
          transition: all 0.3s ease;
          min-width: 200px;
          border: 2px solid transparent;
          padding: 4px 0;
        }

        .text-flip-container:hover {
          text-shadow: 0 0 35px rgba(0, 255, 255, 0.8);
          transform: translateY(-2px);
          color: #00dddd;
        }

        .text-flip-word {
          animation: flip-words 4s ease-in-out infinite;
          line-height: 1.2;
          margin-bottom: 4px;
        }

        @keyframes flip-words {
          0%, 45% { transform: translateY(0); }
          50%, 95% { transform: translateY(-110%); }
          100% { transform: translateY(0); }
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