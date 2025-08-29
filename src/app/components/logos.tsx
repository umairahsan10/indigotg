import Image from "next/image";
import { Fragment } from "react";
import { orbitron } from "../fonts";

const brands = [
  { src: "/brands/brand1.png", link: "#" },
  { src: "/brands/brand2.png", link: "#" },
  { src: "/brands/brand3.png", link: "#" },
  { src: "/brands/brand4.png", link: "#" },
  { src: "/brands/brand5.png", link: "#" },
  { src: "/brands/brand6.png", link: "#" },
  { src: "/brands/brand7.png", link: "#" },
  { src: "/brands/brand8.png", link: "#" },
  { src: "/brands/brand9.png", link: "#" },
  { src: "/brands/brand10.png", link: "#" },
];

export const LogosSection = () => {
  return (
    <section className="py-16 bg-[#f2f7ff]">
      <div className="container mx-auto text-[#010a14] flex flex-col items-center text-center">
        <h2 className={`font-roboto text-4xl md:text-4xl lg:text-6xl font-semibold text-[#04048b] tracking-wide`}>We work with</h2>

        {/* Horizontal scrolling logos */}
        <div className="mt-8 lg:mt-12 overflow-hidden w-full [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
          <div className="brands-scroll flex will-change-transform">
            {/* Create multiple copies for seamless infinite scroll */}
            {[...new Array(4)].fill(0).map((_, idx) => (
              <div key={idx} className="flex gap-8 md:gap-12 pr-8 md:pr-12 flex-shrink-0">
                {brands.map((brand, brandIdx) => (
                  <div
                    key={`${idx}-${brandIdx}`}
                    className="inline-block hover:scale-110 transition-transform duration-300 flex-shrink-0"
                  >
                    <div className="relative h-32 w-32 sm:h-36 sm:w-36 md:h-28 md:w-[180px] lg:h-36 lg:w-[240px]">
                      <Image
                        src={brand.src}
                        alt="Client logo"
                        fill
                        className="object-contain"
                        sizes="(max-width: 640px) 128px, (max-width: 768px) 144px, (max-width: 1024px) 180px, 240px"
                        priority={idx === 0}
                      />
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
        <style jsx>{`
          .brands-scroll {
            animation: infiniteScroll 40s linear infinite;
            width: max-content;
          }
          .brands-scroll:hover { 
            animation-play-state: paused; 
          }
          
          @keyframes infiniteScroll {
            0% { transform: translateX(0); }
            100% { transform: translateX(-25%); }
          }
          
          @media (max-width: 768px) {
            .brands-scroll {
              animation: infiniteScroll 25s linear infinite;
            }
          }
        `}</style>
      </div>
    </section>
  );
};