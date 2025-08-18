// components/Carousel3D.tsx
"use client";

import React, {
  useRef,
  useEffect,
  useState,
  TouchEvent,
  ReactNode,
} from "react";
import { FaChevronLeft, FaChevronRight, FaArrowRight, FaTimes } from "react-icons/fa";
import { useOutsideClick } from "../hooks/use-outside-click";
import { motion, AnimatePresence } from "framer-motion";
import { LiquidButton } from "./LiquidButton";

export interface Carousel3DItem {
  id: number;
  title: string;
  brand: string;
  description: string;
  tags: string[];
  imageUrl: string;
  link: string;
  content?: string;
}

interface Carousel3DProps {
  items?: Carousel3DItem[];
  autoRotate?: boolean;
  rotateInterval?: number;
  cardHeight?: number;
  title?: string;
  isMobileSwipe?: boolean;
}

const Carousel3D = ({
  items,
  autoRotate = true,
  rotateInterval = 4000,
  cardHeight = 400,
  title = "Indigo News",
  isMobileSwipe = true,
}: Carousel3DProps) => {
  const [active, setActive] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const carouselRef = useRef<HTMLDivElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);
  const [isInView, setIsInView] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  // Inline hook to avoid import issues
  const [isMobile, setIsMobile] = useState(false);
  
  // News items data moved from homepage
  const newsItems = [
    {
      id: 1,
      title: "US Fiber podcast",
      brand: "Indigo",
      description: "Brad Hine chats with Ray O'Connor, Sr VP of Sales at Indigo, to discuss the evolving landscape of broadband connectivity in the US.",
      content: "Brad Hine chats with Ray O'Connor, Sr VP of Sales at Indigo, to discuss the evolving landscape of broadband connectivity in the US. Ray highlights the critical role of private equity in the fiber-to-the-home market and the transformative impact on both the U.K. and U.S.",
      tags: ["Podcast", "Broadband", "Fiber-to-Home"],
      imageUrl: "/news/news1.png",
      link: "#"
    },
    {
      id: 2,
      title: "Indigo company growth",
      brand: "Indigo",
      description: "Discover Indigo's latest updates: new leadership with Neil Yusuf as CCO and Nigel Sperring as CFO, ISO certification, a Grant Thornton award, and USA expansion.",
      content: "Discover Indigo's latest updates: new leadership with Neil Yusuf as CCO and Nigel Sperring as CFO, ISO certification, a Grant Thornton award, and USA expansion. Learn more about our growth and commitment to excellence.",
      tags: ["Company Growth", "Leadership", "Awards"],
      imageUrl: "/news/news2.png",
      link: "#"
    },
    {
      id: 3,
      title: "Keeping subsea cables connected",
      brand: "Indigo",
      description: "Discover how we keep subsea cables secure and operational amid growing threats.",
      content: "Discover how we keep subsea cables secure and operational amid growing threats. Learn about proactive tracking, timely fault fixing, and the technology behind maintaining the backbone of global data traffic. Read insights from Kathy Kirchner, Network Operations VP for Americas.",
      tags: ["Subsea Cables", "Security", "Network Operations"],
      imageUrl: "/news/news3.jpg",
      link: "#"
    },
    {
      id: 4,
      title: "Empowering Your Business with ISO Recertifications",
      brand: "Indigo",
      description: "Our ISO recertifications symbolize our commitment to excellence, sustainability, security, and safety.",
      content: "Our ISO recertifications symbolize our commitment to excellence, sustainability, security, and safety. Discover how Indigo empowers your business with the highest standards including ISO Recertifications (ISO 9001, ISO 14001 and ISO 45001).",
      tags: ["ISO Certification", "Quality", "Standards"],
      imageUrl: "/news/news4.png",
      link: "#"
    },
    {
      id: 5,
      title: "Press Release: Subsea Security Services",
      brand: "Indigo",
      description: "Press Release: Indigo Welcomes EU Recommendations For More Resilient Marine Infrastructure As It Advances Its Own Subsea Security Services",
      content: "Press Release: Indigo Welcomes EU Recommendations For More Resilient Marine Infrastructure As It Advances Its Own Subsea Security Services. Discover how Indigo is leading the way in marine infrastructure security and resilience.",
      tags: ["Press Release", "Marine Infrastructure", "Security"],
      imageUrl: "/news/news5.png",
      link: "#"
    }
  ];

  // Static dates array for each news item
  const dates = [
    "03 July 2024",
    "07 June 2024", 
    "27 May 2024",
    "24 May 2024",
    "14 May 2024"
  ];

  // Use newsItems instead of props.items
  const itemsToUse = items && items.length > 0 ? items : newsItems;
  
  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkIsMobile();
    window.addEventListener('resize', checkIsMobile);
    return () => window.removeEventListener('resize', checkIsMobile);
  }, []);
  
  const minSwipeDistance = 50;

  // Use the same outside click logic as NewsSection
  useOutsideClick(modalRef, () => setIsModalOpen(false));

  useEffect(() => {
    if (autoRotate && isInView && !isHovering && !isModalOpen) {
      const interval = setInterval(() => {
        setActive((prev) => (prev + 1) % itemsToUse.length);
      }, rotateInterval);
      return () => clearInterval(interval);
    }
  }, [isInView, isHovering, autoRotate, rotateInterval, itemsToUse.length, isModalOpen]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIsInView(entry.isIntersecting),
      { threshold: 0.2 }
    );
    return () => observer.disconnect();
  }, []);

  // Close modal on escape key and manage body scroll
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsModalOpen(false);
      }
    };

    if (isModalOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'auto';
    };
  }, [isModalOpen]);

  const onTouchStart = (e: TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
    setTouchEnd(null);
  };

  const onTouchMove = (e: TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    if (distance > minSwipeDistance) {
      setActive((prev) => (prev + 1) % itemsToUse.length);
    } else if (distance < -minSwipeDistance) {
      setActive((prev) => (prev - 1 + itemsToUse.length) % itemsToUse.length);
    }
  };

  const getCardAnimationClass = (index: number) => {
    if (index === active) return "scale-100 opacity-100 z-20";
    if (index === (active + 1) % itemsToUse.length)
      return "translate-x-[40%] scale-95 opacity-60 z-10";
    if (index === (active - 1 + itemsToUse.length) % itemsToUse.length)
      return "translate-x-[-40%] scale-95 opacity-60 z-10";
    return "scale-90 opacity-0";
  };

  const handleReadMore = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const handlePrevious = () => {
    setActive((prev) => (prev - 1 + itemsToUse.length) % itemsToUse.length);
  };

  const handleNext = () => {
    setActive((prev) => (prev + 1) % itemsToUse.length);
  };

  const currentItem = itemsToUse[active];

  return (
    <>
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="font-roboto text-4xl md:text-4xl lg:text-6xl font-semibold tracking-wide text-[#04048b] mb-4">
              {title}
            </h2>
          </div>
          
          <section
            id="carousel3d"
            className="bg-transparent min-w-full mx-auto 
          flex items-center justify-center py-8 relative"
          >
            {/* Left Navigation Button - Outside Carousel */}
            <button
              onClick={handlePrevious}
              className="absolute -left-12 top-1/2 transform -translate-y-1/2 z-30 cursor-pointer"
            >
              <FaChevronLeft className="w-8 h-8 text-[#04048b] hover:text-[#6d7585] transition-all duration-200" />
            </button>

            {/* Right Navigation Button - Outside Carousel */}
            <button
              onClick={handleNext}
              className="absolute -right-12 top-1/2 transform -translate-y-1/2 z-30 cursor-pointer"
            >
              <FaChevronRight className="w-8 h-8 text-[#04048b] hover:text-[#6d7585] transition-all duration-200" />
            </button>

            <div
              className="w-full px-2 sm:px-4 lg:px-6 
            min-w-[350px] md:min-w-[1000px] max-w-7xl  "
            >
                <div
                  className="relative overflow-hidden h-[450px] "
                  onMouseEnter={() => setIsHovering(true)}
                  onMouseLeave={() => setIsHovering(false)}
                  onTouchStart={onTouchStart}
                  onTouchMove={onTouchMove}
                  onTouchEnd={onTouchEnd}
                  ref={carouselRef}
                >
                  {/* Carousel Items */}
                  <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center ">
                    {itemsToUse.map((item, index) => (
                    <div
                      key={item.id}
                      className={`absolute top-0 w-full max-w-4xl transform transition-all duration-500 ${getCardAnimationClass(
                        index
                      )}`}
                    >
                      <div
                        className={`overflow-hidden bg-white h-[${cardHeight}px] border shadow-sm 
                    hover:shadow-md flex flex-row rounded-lg`}
                      >
                        {/* Left Half - Image */}
                        <div className="w-1/2 h-full overflow-hidden">
                          <img
                            src={item.imageUrl}
                            alt={item.title}
                            className="w-full h-full object-cover"
                          />
                        </div>

                        {/* Right Half - Content */}
                        <div className="w-1/2 p-8 flex flex-col justify-between bg-[#ffc404]">
                          <div>
                            {/* Date */}
                            <div className="text-orange-500 text-sm font-medium mb-3">
                              {dates[index]}
                            </div>
                            
                            {/* Title */}
                            <h3 className="text-2xl font-bold text-[#04048b] mb-4 leading-tight">
                              {item.title}
                            </h3>
                            
                            {/* Description */}
                            <p className="text-[#04048b] text-base leading-relaxed">
                              {item.description}
                            </p>
                          </div>
                          
                          {/* Read More Button */}
                          <button
                            onClick={handleReadMore}
                            className="w-full bg-[#ffc404] hover:bg-[#04048b] text-gray-900 hover:text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200 hover:scale-105 transform flex items-center justify-center gap-2"
                          >
                            Read More
                            <FaArrowRight className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="absolute bottom-6 left-0 right-0 flex justify-center items-center space-x-3 z-30">
                  {itemsToUse.map((_, idx) => (
                    <button
                      key={idx}
                      className={`w-2 h-2 rounded-full transition-all duration-300 ${
                        active === idx
                          ? "bg-[#04048b] w-5"
                          : "bg-gray-300 hover:bg-gray-400"
                      }`}
                      onClick={() => setActive(idx)}
                      aria-label={`Go to item ${idx + 1}`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </section>
          
          {/* Explore News Button - After Carousel */}
          <div className="flex justify-center mt-4">
            <LiquidButton 
              variant="default" 
              size="xxl"
            >
              Explore More News
            </LiquidButton>
          </div>

          {/* Modal - Using the original compact NewsSection design */}
          <AnimatePresence>
            {isModalOpen && (
              <>
                {/* Backdrop */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="fixed inset-0 bg-black/20 h-full w-full z-10"
                />
                
                {/* Modal Content */}
                <div className="fixed inset-0 grid place-items-center z-[100] p-4">
                  <motion.button
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex absolute top-4 right-4 items-center justify-center bg-white rounded-full h-8 w-8 z-50 shadow-lg hover:shadow-xl transition-all duration-200"
                    onClick={handleModalClose}
                  >
                    <FaTimes className="w-4 h-4 text-gray-600" />
                  </motion.button>
                  
                  <motion.div
                    ref={modalRef}
                    initial={{ opacity: 0, scale: 0.9, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9, y: 20 }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                    className="w-full max-w-[600px] h-full md:h-fit md:max-h-[85%] flex flex-col bg-white dark:bg-neutral-900 rounded-2xl overflow-hidden shadow-2xl"
                  >
                    {/* Header with Image and Close Button */}
                    <div className="relative">
                      <img
                        src={currentItem.imageUrl}
                        alt={currentItem.title}
                        className="w-full h-64 object-cover"
                      />
                      
                      {/* Navigation Controls - Simple overlay */}
                      <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                        <div className="bg-white/20 backdrop-blur-sm text-white px-3 py-2 rounded-lg text-sm font-medium">
                          {active + 1} of {itemsToUse.length}
                        </div>
                      </div>
                      
                      {/* Gradient overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                    </div>

                    {/* Content Section */}
                    <div className="p-8 flex-1 flex flex-col">
                      <h2 className="text-3xl font-bold text-gray-900 mb-4 leading-tight">
                        {currentItem.title}
                      </h2>
                      
                      <div className="flex-1 overflow-y-auto">
                        <p className="text-gray-600 text-lg leading-relaxed mb-8">
                          {currentItem.content || currentItem.description}
                        </p>
                      </div>
                      
                      {/* Action Button */}
                      <button
                        className="w-full bg-[#04048b] text-white py-4 px-6 rounded-xl font-semibold text-lg hover:bg-[#03035a] transition-all duration-200 hover:scale-[1.02] transform shadow-lg hover:shadow-xl mt-auto"
                        onClick={handleModalClose}
                      >
                        Read Story
                      </button>
                    </div>
                  </motion.div>
                </div>
              </>
            )}
          </AnimatePresence>
        </div>
      </section>
    </>
  );
};

export default Carousel3D;
