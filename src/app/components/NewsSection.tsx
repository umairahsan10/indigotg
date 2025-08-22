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
import { useRouter } from "next/navigation";

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
  const router = useRouter();
  const [active, setActive] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const carouselRef = useRef<HTMLDivElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);
  const [isInView, setIsInView] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  // Enhanced mobile detection for different screen sizes
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);
  const [isSmallMobile, setIsSmallMobile] = useState(false);
  
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
      link: "/newsPage/news/us-fiber-podcast"
    },
    {
      id: 2,
      title: "Indigo company growth",
      brand: "Indigo",
      description: "Discover Indigo's latest updates: new leadership with Neil Yusuf as CCO and Nigel Sperring as CFO, ISO certification, a Grant Thornton award, and USA expansion.",
      content: "Discover Indigo's latest updates: new leadership with Neil Yusuf as CCO and Nigel Sperring as CFO, ISO certification, a Grant Thornton award, and USA expansion. Learn more about our growth and commitment to excellence.",
      tags: ["Company Growth", "Leadership", "Awards"],
      imageUrl: "/news/news2.png",
      link: "/newsPage/news/indigo-company-growth"
    },
    {
      id: 3,
      title: "Keeping subsea cables connected",
      brand: "Indigo",
      description: "Discover how we keep subsea cables secure and operational amid growing threats.",
      content: "Discover how we keep subsea cables secure and operational amid growing threats. Learn about proactive tracking, timely fault fixing, and the technology behind maintaining the backbone of global data traffic. Read insights from Kathy Kirchner, Network Operations VP for Americas.",
      tags: ["Subsea Cables", "Security", "Network Operations"],
      imageUrl: "/news/news3.jpg",
      link: "/newsPage/news/keeping-subsea-cables-connected"
    },
    {
      id: 4,
      title: "Empowering Your Business with ISO Recertifications",
      brand: "Indigo",
      description: "Our ISO recertifications symbolize our commitment to excellence, sustainability, security, and safety.",
      content: "Our ISO recertifications symbolize our commitment to excellence, sustainability, security, and safety. Discover how Indigo empowers your business with the highest standards including ISO Recertifications (ISO 9001, ISO 14001 and ISO 45001).",
      tags: ["ISO Certification", "Quality", "Standards"],
      imageUrl: "/news/news4.png",
      link: "/newsPage/news/empowering-business-with-iso-recertifications"
    },
    {
      id: 5,
      title: "Press Release: Subsea Security Services",
      brand: "Indigo",
      description: "Press Release: Indigo Welcomes EU Recommendations For More Resilient Marine Infrastructure As It Advances Its Own Subsea Security Services",
      content: "Press Release: Indigo Welcomes EU Recommendations For More Resilient Marine Infrastructure As It Advances Its Own Subsea Security Services. Discover how Indigo is leading the way in marine infrastructure security and resilience.",
      tags: ["Press Release", "Marine Infrastructure", "Security"],
      imageUrl: "/news/news5.png",
      link: "/newsPage/news/press-release-subsea-security-services"
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
    const checkScreenSize = () => {
      const width = window.innerWidth;
      setIsSmallMobile(width < 480); // Small phones
      setIsMobile(width < 768); // Regular phones
      setIsTablet(width >= 768 && width < 1024); // Tablets
    };
    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);
  
  const minSwipeDistance = isMobile ? 30 : 50; // Smaller swipe distance for mobile

  // Use the same outside click logic as NewsSection
  useOutsideClick(modalRef, () => setIsModalOpen(false));

  useEffect(() => {
    if (autoRotate && isInView && !isHovering && !isModalOpen) {
      // Slower rotation on mobile for better user experience
      const mobileInterval = isMobile ? rotateInterval * 1.5 : rotateInterval;
      const interval = setInterval(() => {
        setActive((prev) => (prev + 1) % itemsToUse.length);
      }, mobileInterval);
      return () => clearInterval(interval);
    }
  }, [isInView, isHovering, autoRotate, rotateInterval, itemsToUse.length, isModalOpen, isMobile]);

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

    // Prevent scroll function
    const preventScroll = (e: Event) => {
      e.preventDefault();
      e.stopPropagation();
      return false;
    };

    if (isModalOpen) {
      document.addEventListener('keydown', handleEscape);
      
      // Store current scroll position
      const scrollY = window.scrollY;
      
      // Prevent scrolling by setting overflow hidden
      document.body.style.overflow = 'hidden';
      document.documentElement.style.overflow = 'hidden';
      
      // Store scroll position in data attribute
      document.body.setAttribute('data-scroll-y', scrollY.toString());
      
      // Add event listeners to prevent scroll
      document.addEventListener('scroll', preventScroll, { passive: false });
      document.addEventListener('wheel', preventScroll, { passive: false });
      document.addEventListener('touchmove', preventScroll, { passive: false });
    } else {
      document.removeEventListener('keydown', handleEscape);
      
      // Remove scroll prevention
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
      
      // Remove event listeners
      document.removeEventListener('scroll', preventScroll);
      document.removeEventListener('wheel', preventScroll);
      document.removeEventListener('touchmove', preventScroll);
      
      // Restore scroll position
      const scrollY = parseInt(document.body.getAttribute('data-scroll-y') || '0');
      if (scrollY > 0) {
        window.scrollTo(0, scrollY);
      }
      
      // Clean up data attribute
      document.body.removeAttribute('data-scroll-y');
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.removeEventListener('scroll', preventScroll);
      document.removeEventListener('wheel', preventScroll);
      document.removeEventListener('touchmove', preventScroll);
      
      // Ensure scrolling is restored when component unmounts
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
      document.body.removeAttribute('data-scroll-y');
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
    
    // Mobile-friendly animations with reduced translations
    if (isMobile) {
      if (index === (active + 1) % itemsToUse.length)
        return "translate-x-[20%] scale-95 opacity-60 z-10";
      if (index === (active - 1 + itemsToUse.length) % itemsToUse.length)
        return "translate-x-[-20%] scale-95 opacity-60 z-10";
    } else {
      if (index === (active + 1) % itemsToUse.length)
        return "translate-x-[40%] scale-95 opacity-60 z-10";
      if (index === (active - 1 + itemsToUse.length) % itemsToUse.length)
        return "translate-x-[-40%] scale-95 opacity-60 z-10";
    }
    
    return "scale-90 opacity-0";
  };

  const handleReadMore = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const handleCardClick = (item: Carousel3DItem) => {
    if (item.link && item.link !== "#") {
      router.push(item.link);
    }
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
      <section className="py-6 sm:py-8 md:py-12 bg-white">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
          <div className="text-center mb-4 sm:mb-6 md:mb-8">
            <h2 className="font-roboto text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-semibold tracking-wide text-[#04048b] mb-2 sm:mb-4">
              {title}
            </h2>
          </div>
          
          <section
            id="carousel3d"
            className="bg-transparent min-w-full mx-auto 
          flex items-center justify-center py-4 sm:py-6 md:py-8 relative"
          >
            {/* Left Navigation Button - Outside Carousel */}
            <button
              onClick={handlePrevious}
              className={`absolute top-1/2 transform -translate-y-1/2 z-30 cursor-pointer transition-all duration-200 ${
                isMobile ? '-left-2 sm:-left-4' : '-left-12'
              }`}
            >
              <FaChevronLeft className={`text-[#04048b] hover:text-[#6d7585] transition-all duration-200 ${
                isMobile ? 'w-6 h-6 sm:w-8 sm:h-8' : 'w-8 h-8'
              }`} />
            </button>

            {/* Right Navigation Button - Outside Carousel */}
            <button
              onClick={handleNext}
              className={`absolute top-1/2 transform -translate-y-1/2 z-30 cursor-pointer transition-all duration-200 ${
                isMobile ? '-right-2 sm:-right-4' : '-right-12'
              }`}
            >
              <FaChevronRight className={`text-[#04048b] hover:text-[#6d7585] transition-all duration-200 ${
                isMobile ? 'w-6 h-6 sm:w-8 sm:h-8' : 'w-8 h-8'
              }`} />
            </button>

            <div
              className={`w-full px-2 sm:px-4 lg:px-6 ${
                isMobile 
                  ? 'min-w-[280px] sm:min-w-[350px]' 
                  : 'min-w-[1000px]'
              } max-w-7xl`}
            >
                <div
                                     className={`relative overflow-hidden transition-all duration-300 ${
                     isSmallMobile ? 'h-[340px]' :
                     isMobile ? 'h-[400px]' :
                     isTablet ? 'h-[420px]' : 'h-[450px]'
                   }`}
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
                       className={`absolute top-0 w-full transform transition-all duration-500 cursor-pointer ${
                         isMobile ? 'max-w-[280px] sm:max-w-[350px]' : 'max-w-4xl'
                       } ${getCardAnimationClass(index)}`}
                       onClick={() => {
                         // Navigate to next item when card is clicked
                         if (index === active) {
                           // If clicking on active card, go to next
                           setActive((prev) => (prev + 1) % itemsToUse.length);
                         } else if (index === (active + 1) % itemsToUse.length) {
                           // If clicking on right card, go to next
                           setActive((prev) => (prev + 1) % itemsToUse.length);
                         } else if (index === (active - 1 + itemsToUse.length) % itemsToUse.length) {
                           // If clicking on left card, go to previous
                           setActive((prev) => (prev - 1 + itemsToUse.length) % itemsToUse.length);
                         }
                       }}
                     >
                       <div
                         className={`overflow-hidden bg-white border shadow-sm hover:shadow-md rounded-lg transition-all duration-200 ${
                           isMobile 
                             ? 'flex flex-col' 
                             : 'flex flex-row'
                         }`}
                         style={{ height: isSmallMobile ? '340px' : isMobile ? '400px' : cardHeight + 'px' }}
                       >
                        {/* Image Section */}
                        <div className={`h-full overflow-hidden ${
                          isMobile ? 'w-full h-1/2' : 'w-1/2'
                        }`}>
                          <img
                            src={item.imageUrl}
                            alt={item.title}
                            className="w-full h-full object-cover"
                          />
                        </div>

                        {/* Content Section */}
                        <div className={`flex flex-col justify-between bg-[#ffc404] ${
                          isMobile ? 'w-full h-1/2 p-4 sm:p-6' : 'w-1/2 p-8'
                        }`}>
                          <div className="flex-1 min-h-0">
                            {/* Date */}
                            <div className={`text-orange-500 font-medium ${
                              (isMobile || isTablet || isSmallMobile) ? 'text-xs mb-1' : 'text-sm mb-2 sm:mb-3'
                            }`}>
                              {dates[index]}
                            </div>
                            
                            {/* Title */}
                            <h3 className={`font-bold text-[#04048b] leading-tight ${
                              (isMobile || isTablet || isSmallMobile)
                                ? 'text-sm sm:text-base mb-1 sm:mb-1.5' 
                                : 'text-2xl mb-4'
                            }`}>
                              {item.title}
                            </h3>
                            
                            {/* Description */}
                            <p className={`text-[#04048b] leading-relaxed ${
                              (isMobile || isTablet || isSmallMobile)
                                ? 'text-xs mb-1.5' 
                                : 'text-base mb-2'
                            }`}>
                              {(isMobile || isTablet || isSmallMobile)
                                ? item.description.length > 50 
                                  ? item.description.substring(0, 50) + '...' 
                                  : item.description
                                : item.description
                              }
                            </p>
                          </div>
                        
                          {/* Read More Button */}
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleReadMore();
                            }}
                            className={`w-full bg-[#ffc404] hover:bg-[#04048b] text-gray-900 hover:text-white font-semibold rounded-lg transition-all duration-200 hover:scale-105 transform flex items-center justify-center gap-2 mt-2 ${
                              (isMobile || isTablet || isSmallMobile)
                                ? 'py-1.5 px-3 text-xs' 
                                : 'py-3 px-6'
                            }`}
                          >
                            Read More
                            <FaArrowRight className={`${
                              (isMobile || isTablet || isSmallMobile) ? 'w-2.5 h-2.5' : 'w-4 h-4'
                            }`} />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className={`absolute left-0 right-0 flex justify-center items-center space-x-2 sm:space-x-3 z-30 ${
                  isMobile ? '-bottom-2 sm:-bottom-1' : 'bottom-6'
                }`}>
                  {itemsToUse.map((_, idx) => (
                    <button
                      key={idx}
                      className={`rounded-full transition-all duration-300 ${
                        active === idx
                          ? "bg-[#04048b]"
                          : "bg-gray-300 hover:bg-gray-400"
                                             } ${
                         isMobile 
                           ? 'w-1 h-1 sm:w-1.5 sm:h-1.5' + (active === idx ? ' w-3 sm:w-4' : '')
                           : 'w-2 h-2' + (active === idx ? ' w-5' : '')
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
          <div className="flex justify-center mt-3 sm:mt-4">
            <LiquidButton 
              variant="default" 
              size={isMobile ? "lg" : "xxl"}
              onClick={() => router.push("/newsPage")}
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
                   onTouchMove={(e) => e.preventDefault()}
                   onWheel={(e) => e.preventDefault()}
                 />
                
                                 {/* Modal Content */}
                 <div className="fixed inset-0 grid place-items-center z-[100] p-1 sm:p-2 md:p-4">
                   
                                       <motion.div
                      ref={modalRef}
                      initial={{ opacity: 0, scale: 0.9, y: 20 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.9, y: 20 }}
                      transition={{ duration: 0.3, ease: "easeOut" }}
                      className={`w-full flex flex-col bg-white rounded-2xl overflow-hidden shadow-2xl ${
                        isMobile 
                          ? 'max-w-[95%] h-[50%] sm:max-w-[500px] sm:h-fit sm:max-h-[75%]' 
                          : 'max-w-[600px] h-full md:h-fit md:max-h-[85%]'
                      }`}
                      onTouchMove={(e) => e.stopPropagation()}
                      onWheel={(e) => e.stopPropagation()}
                    >
                                                               {/* Header with Image and Close Button */}
                      <div className="relative">
                        {/* Close Button - Positioned on the image */}
                        <motion.button
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          className={`absolute top-2 right-2 z-50 flex items-center justify-center bg-white/90 backdrop-blur-sm rounded-full shadow-lg hover:shadow-xl transition-all duration-200 ${
                            isMobile ? 'h-6 w-6 sm:h-8 sm:w-8' : 'h-8 w-8'
                          }`}
                          onClick={handleModalClose}
                        >
                          <FaTimes className={`text-gray-600 ${
                            isMobile ? 'w-3 h-3 sm:w-4 sm:h-4' : 'w-4 h-4'
                          }`} />
                        </motion.button>
                        
                        <img
                          src={currentItem.imageUrl}
                          alt={currentItem.title}
                          className={`w-full object-cover ${
                            isMobile ? 'h-32 sm:h-40' : 'h-64'
                          }`}
                        />
                       
                       {/* Navigation Controls - Simple overlay */}
                       <div className={`absolute left-2 right-2 sm:left-4 sm:right-4 flex items-center justify-between ${
                         isMobile ? 'bottom-2 sm:bottom-4' : 'bottom-4'
                       }`}>
                         <div className={`bg-white/20 backdrop-blur-sm text-white rounded-lg font-medium ${
                           isMobile ? 'px-2 py-1 text-xs sm:px-3 sm:py-2 sm:text-sm' : 'px-3 py-2 text-sm'
                         }`}>
                           {active + 1} of {itemsToUse.length}
                         </div>
                       </div>
                       
                       {/* Gradient overlay */}
                       <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                     </div>

                                           {/* Content Section */}
                      <div className={`flex-1 flex flex-col ${
                        isMobile ? 'p-2 sm:p-3' : 'p-8'
                      }`}>
                                               <h2 className={`font-bold text-gray-900 leading-tight ${
                          isMobile 
                            ? 'text-base sm:text-lg mb-1.5 sm:mb-2' 
                            : 'text-3xl mb-4'
                        }`}>
                          {currentItem.title}
                        </h2>
                       
                                               <div className="flex-1 overflow-y-auto">
                          <p className={`text-gray-600 leading-relaxed ${
                            isMobile 
                              ? 'text-xs sm:text-sm mb-3 sm:mb-4' 
                              : 'text-lg mb-8'
                          }`}>
                            {currentItem.content || currentItem.description}
                          </p>
                        </div>
                       
                                               {/* Action Button */}
                        <button
                          className={`w-full bg-[#04048b] text-white rounded-xl font-semibold hover:bg-[#03035a] transition-all duration-200 hover:scale-[1.02] transform shadow-lg hover:shadow-xl mt-auto ${
                            isMobile 
                              ? 'py-2 px-2.5 text-xs sm:py-2.5 sm:px-3 sm:text-sm' 
                              : 'py-4 px-6 text-lg'
                          }`}
                          onClick={() => {
                            handleModalClose();
                            if (currentItem.link && currentItem.link !== "#") {
                              window.open(currentItem.link, '_blank');
                            }
                          }}
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
