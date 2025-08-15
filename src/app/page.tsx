"use client";

import Hero from "./components/Hero";
import EbookPromo from "./components/EbookPromo";
import ConnectedSolutions from "./components/ConnectedSolutions";
import IndigoOverview from "./components/IndigoOverview";
import IndigoTimeline from "./components/IndigoTimeline";
import dynamic from "next/dynamic";
import { LogosSection } from "./components/logos";

const InteractiveMap = dynamic(() => import("./components/InteractiveMap"), { ssr: false });
import GetInTouchForm from "./components/GetInTouchForm";
import { orbitron } from "./fonts";
import { BrandsSection } from "./components/brands";
import ScrollAnimation from "./components/ScrollAnimation";

export default function Home() {
  return (
    <div className="overflow-x-hidden">
      <Hero /> 
      
      
      <ScrollAnimation />

                     {/* Indigo Overview */}
               <IndigoOverview />
         
               {/* Indigo Timeline */}
               <IndigoTimeline />
         
               {/* Connected Solutions */}
               <ConnectedSolutions />

      {/* Brands Marquee */}
      <BrandsSection />

      {/* Interactive Map */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className={`font-sans text-center text-4xl md:text-4xl lg:text-6xl font-semibold tracking-wide text-[#04048b] mb-8`}>
            Indigo in Numbers
          </h2>
          <InteractiveMap />
        </div>
      </section>

      <LogosSection />

      {/* Get In Touch */}
      <section className="py-16 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <GetInTouchForm />
        </div>
      </section>
    </div>
  );
}
