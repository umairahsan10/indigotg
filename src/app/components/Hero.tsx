'use client';

import { orbitron } from "../fonts";
import EarthComponent from "./AssetOrb";

export default function Hero() {
  return (
    <section className="w-screen h-screen bg-black flex items-center justify-center px-16 relative z-10 overflow-hidden">
      {/* Full background Earth globe */}
      <div className="absolute inset-0 w-full h-full">
        <EarthComponent width="100%" height="100%" />
      </div>
      
      {/* Content overlay */}
      <div className="flex items-center gap-16 bg-transparent max-w-[1400px] w-full relative z-20">
        <div className="flex-1 pl-8">
          <h1 className="font-sans font-black text-[clamp(4rem,8vw,7rem)] leading-[0.9] mb-8 text-transparent tracking-tight drop-shadow-lg" style={{ WebkitTextStroke: '3px white' }}>
            IndigoTG
          </h1>
          <p className="font-sans font-semibold text-[clamp(1.8rem,3vw,2.5rem)] leading-tight text-blue-100 max-w-[600px] tracking-wide drop-shadow-lg">
            One unified workspace to build, test, and ship AI faster
          </p>
        </div>
        <div className="flex-1 flex justify-center">
          {/* Removed AssetOrb since Earth is now background */}
        </div>
      </div>
    </section>
  );
}
