"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import Logo from "./Logo";

const TriangleLoader = () => {
  const logoRef = useRef<SVGSVGElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!logoRef.current || !containerRef.current) return;

    // Get all line elements
    const lines = logoRef.current.querySelectorAll("line");
    
    // Set initial state for each line
    lines.forEach((line) => {
      const length = (line as SVGLineElement).getTotalLength();
      gsap.set(line, {
        strokeDasharray: length,
        strokeDashoffset: length,
      });
    });

    // Animate the triangle drawing
    const tl = gsap.timeline();
    
    tl.to(lines, {
      strokeDashoffset: 0,
      duration: 0.8,
      ease: "power2.inOut",
      stagger: 0.1,
    });

    return () => {
      tl.kill();
    };
  }, []);

  return (
    <div 
      ref={containerRef}
      className="fixed inset-0 z-[99999] bg-white flex items-center justify-center"
    >
      <div className="logo-container">
        <Logo ref={logoRef} />
      </div>
    </div>
  );
};

export default TriangleLoader;
