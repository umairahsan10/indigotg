"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { useState } from "react";

const EbookCard = ({
  className,
  image,
  children,
  onClick,
  style,
}: {
  className?: string;
  image?: string;
  children?: React.ReactNode;
  onClick?: () => void;
  style?: React.CSSProperties;
}) => {
  return (
    <div
      className={cn(
        "w-[240px] sm:w-[320px] md:w-[350px] cursor-pointer h-[280px] sm:h-[360px] md:h-[400px] overflow-hidden bg-white rounded-2xl shadow-[0_0_10px_rgba(0,0,0,0.02)] border border-gray-200/80",
        className
      )}
      onClick={onClick}
      style={style}
    >
      {image && (
        <div className="relative h-full w-full rounded-2xl shadow-lg overflow-hidden">
          <img
            src={image}
            alt="eBook cover"
            className="object-cover w-full h-full"
          />
          
                                {/* Text overlay */}
           <div className="absolute inset-0 rounded-2xl" style={{backgroundColor: 'rgba(0, 0, 0, 0.4)'}}>
             <div className="absolute inset-0 p-6 flex flex-col justify-between text-white">
                {/* Logo at top */}
                <div className="text-left">
                  <div className="inline-flex items-center mb-0 sm:mb-2 md:mb-4">
                    <img 
                      src="/ebook/indigo_logo_white.svg" 
                      alt="INDIGO Logo" 
                      className="w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20"
                    />
                  </div>
                </div>
                
                {/* Main content in center */}
                <div className="text-left mb-auto -mt-2 sm:-mt-1 md:mt-0">
                  <h3 className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold mb-2 sm:mb-3 leading-tight" style={{color: '#eab04b'}}>
                    Connecting People, Nurturing Talent
                  </h3>
                </div>

                {/* Tagline at bottom */}
                <div className="text-left mt-auto">
                  <p className="text-xs text-white/90 font-medium">
                  ENGINEERING A DIGITAL FUTURE
                  </p>
                </div>
              </div>
          </div>
        </div>
      )}
    </div>
  );
};

interface EbookCardData {
  image: string;
}

const EbookStackedCards = ({
  cards,
  spreadDistance = 40,
  rotationAngle = 5,
  animationDelay = 0.1,
}: {
  cards: EbookCardData[];
  spreadDistance?: number;
  rotationAngle?: number;
  animationDelay?: number;
}) => {
  const [isHovering, setIsHovering] = useState(false);
  const [frontCardIndex, setFrontCardIndex] = useState(0);

  // Limit to maximum of 3 cards
  const limitedCards = cards.slice(0, 3);

  const handleCardClick = (clickedIndex: number) => {
    console.log('Card clicked:', clickedIndex);
    setFrontCardIndex(clickedIndex);
  };

  return (
    <div 
      className="relative w-full h-full flex items-center justify-center"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <div className="relative w-[240px] sm:w-[320px] md:w-[350px] h-[280px] sm:h-[360px] md:h-[400px]">
        {limitedCards.map((card, index) => {
          const isFrontCard = index === frontCardIndex;

          let xOffset = 0;
          let rotation = 0;

          if (limitedCards.length > 1) {
            // Front card stays in place
            // Other cards spread out
            if (index !== frontCardIndex) {
              if (index === (frontCardIndex + 1) % limitedCards.length) {
                xOffset = -spreadDistance;
                rotation = -rotationAngle;
              } else {
                xOffset = spreadDistance;
                rotation = rotationAngle;
              }
            }
          }

          return (
            <motion.div
              key={index}
              className={cn("absolute", isFrontCard ? "z-10" : "z-0")}
              initial={{ x: 0, rotate: 0 }}
              animate={{
                x: isHovering ? xOffset : 0,
                rotate: isHovering ? rotation : 0,
                zIndex: isFrontCard ? 10 : 0,
              }}
              transition={{
                duration: 0.3,
                ease: "easeInOut",
                delay: index * animationDelay,
                type: "spring",
              }}
              style={{ zIndex: isFrontCard ? 10 : index }}
            >
              <EbookCard
                className={isFrontCard ? "z-10 cursor-pointer" : "z-0"}
                image={card.image}
                onClick={() => handleCardClick(index)}
                style={{ pointerEvents: 'auto' }}
              />
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export { EbookStackedCards, EbookCard };
