"use client";

import Hero from "./components/Hero";
import HeroSlider from "./components/HeroSlider";
import EbookPromo from "./components/EbookPromo";
import ConnectedSolutions from "./components/ConnectedSolutions";
import IndigoOverview from "./components/IndigoOverview";
import IndigoTimeline from "./components/IndigoTimeline";
import dynamic from "next/dynamic";
import { LogosSection } from "./components/logos";
import BackgroundMusic from "./components/BackgroundMusic";
import Carousel3D from "./components/NewsSection";

const InteractiveMap = dynamic(() => import("./components/InteractiveMap"), { ssr: false });
import GetInTouchForm from "./components/GetInTouchForm";
import { orbitron } from "./fonts";
import { BrandsSection } from "./components/brands";
import ScrollAnimation from "./components/ScrollAnimation";
import HeroGlobe from "./components/HeroGlobe";

export default function Home() {
  return (
    <div className="overflow-x-hidden">
      <BackgroundMusic audioSrc="/music/bg_music.mp3" />

      {/* <Hero />
      <HeroGlobe /> */}

      {/* Hero Slider */}
      <HeroSlider />

      {/* Ebook Promo */}
      <EbookPromo />

      {/* Indigo Overview */}
      <IndigoOverview />

      {/* Indigo Timeline */}
      {/* <IndigoTimeline /> */}

      {/* Scroll Animation */}
      <ScrollAnimation />

      {/* Connected Solutions */}
      <ConnectedSolutions />

      {/* Brands Marquee */}
      <BrandsSection />



      {/* Interactive Map */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className={`font-roboto text-center text-4xl md:text-4xl lg:text-6xl font-semibold tracking-wide text-[#04048b] mb-4`}>
            Indigo in Numbers
          </h2>
          <InteractiveMap />
        </div>
      </section>

      {/* Logos */}
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
