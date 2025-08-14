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
    <section className="py-16 bg-white">
      <div className="container mx-auto text-[#010a14] flex flex-col items-center text-center">
        <h2 className={`${orbitron.className} text-4xl md:text-4xl lg:text-6xl font-extrabold text-[#140079] tracking-wide`}>We work with</h2>

        {/* Horizontal scrolling logos */}
        <div className="mt-8 lg:mt-12 overflow-hidden w-full [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
          <div className="brands-scroll flex gap-12 pr-12 will-change-transform">
            {[...new Array(2)].fill(0).map((_, idx) => (
              <Fragment key={idx}>
                {brands.map((brand) => (
                  <a
                    key={`${idx}-${brand.src}`}
                    href={brand.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block hover:scale-110 transition-transform duration-300"
                  >
                    <div className="relative h-28 md:h-36 w-[180px] md:w-[240px]">
                      <Image
                        src={brand.src}
                        alt="Client logo"
                        fill
                        className="object-contain"
                        sizes="240px"
                        priority={idx === 0}
                      />
                    </div>
                  </a>
                ))}
              </Fragment>
            ))}
          </div>
        </div>
        <style jsx>{`
          @keyframes scrollLeft {
            from { transform: translateX(0); }
            to { transform: translateX(-50%); }
          }
          .brands-scroll { animation: scrollLeft 15s linear infinite; }
          .brands-scroll:hover { animation-play-state: paused; }
        `}</style>
      </div>
    </section>
  );
};