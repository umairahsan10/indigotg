"use client";

import { useEffect } from "react";
import Hero from "./components/Hero";
import ConnectedSolutions from "./components/ConnectedSolutions";
import dynamic from "next/dynamic";

const InteractiveMap = dynamic(() => import("./components/InteractiveMap"), { ssr: false });
import GetInTouchForm from "./components/GetInTouchForm";
import { orbitron } from "./fonts";
import { BrandsSection } from "./components/brands";
import ScrollAnimation from "./components/ScrollAnimation";

// TypeScript declarations for Vanta.js
declare global {
  interface Window {
    VANTA: {
      RINGS: (config: any) => any;
      destroy?: () => void;
    };
    THREE: any;
  }
}

export default function Home() {
  useEffect(() => {
    let vantaEffect: any = null;

    const initVanta = async () => {
      try {
        // Load Three.js first (Vanta.js dependency)
        const loadThreeJS = () => {
          return new Promise((resolve, reject) => {
            if (window.THREE) {
              resolve(true);
              return;
            }
            
            const threeScript = document.createElement('script');
            threeScript.src = 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r134/three.min.js';
            threeScript.onload = () => resolve(true);
            threeScript.onerror = reject;
            document.head.appendChild(threeScript);
          });
        };

        // Load Vanta.js after Three.js
        const loadVantaJS = () => {
          return new Promise((resolve, reject) => {
            const vantaScript = document.createElement('script');
            vantaScript.src = 'https://unpkg.com/vanta@latest/dist/vanta.rings.min.js';
            vantaScript.onload = () => resolve(true);
            vantaScript.onerror = reject;
            document.head.appendChild(vantaScript);
          });
        };

        // Load libraries in sequence
        await loadThreeJS();
        await new Promise(resolve => setTimeout(resolve, 500));
        
        await loadVantaJS();
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        if (window.VANTA && window.VANTA.RINGS) {
          vantaEffect = window.VANTA.RINGS({
            el: "#vanta-background",
            backgroundColor: 0xf9f4eb,
            color: 0x140079,
            size: 4.00,
            rings: 10
          });
        }
        
      } catch (error) {
        console.error('Vanta.js failed to load:', error);
      }
    };

    // Start after a delay
    const timer = setTimeout(initVanta, 2000);

    return () => {
      clearTimeout(timer);
      if (vantaEffect && vantaEffect.destroy) {
        vantaEffect.destroy();
      }
    };
  }, []);

  return (
    <div className="overflow-x-hidden">
      <div id="vanta-background" className="relative bg-transparent w-full h-screen" style={{ border: 'none' }}>
        <Hero />
      </div>
      
      <ScrollAnimation />

      {/* Connected Solutions */}
      <ConnectedSolutions />

      {/* Brands Marquee */}
      <BrandsSection />

      {/* Interactive Map */}
      <section className="py-16 bg-[#0b0e1a]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className={`${orbitron.className} text-center text-4xl md:text-4xl lg:text-6xl font-extrabold tracking-wide text-white mb-6`}>
            Our Global Offices
          </h2>
          <InteractiveMap />
        </div>
      </section>

      {/* Get In Touch */}
      <section className="py-16 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <GetInTouchForm />
        </div>
      </section>
    </div>
  );
}
