'use client';

import { orbitron } from "../fonts";
import AssetOrb from "./AssetOrb";

export default function Hero() {
  return (
    <section className="w-screen h-screen bg-transparent flex items-center justify-center px-16 relative z-10">
      <div className="flex items-center gap-16 bg-transparent max-w-[1400px] w-full">
        
        <div className="flex-1 pl-8">
          <h1 className={`${orbitron.className} font-black text-[clamp(4rem,8vw,7rem)] leading-[0.9] mb-8 text-[#140079] tracking-tight`}>
            IndigoTG
          </h1>
          <p className="font-semibold text-[clamp(1.8rem,3vw,2.5rem)] leading-tight text-gray-700 max-w-[600px] tracking-wide">
            One unified workspace to build, test, and ship AI faster
          </p>
        </div>
        <div className="flex-1 flex justify-center">
          <AssetOrb />
        </div>
      </div>
    </section>
  );
}
