'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, useTransform, useScroll } from "framer-motion";
import Lenis from 'lenis';
import { FiSend, FiArrowUpRight } from "react-icons/fi";

interface CompanyStory {
  id: number;
  name: string;
  logo: string;
  image: string;
  description: string;
  category: string;
  industry: string;
  size: string;
  region: string;
}

const companyStories: CompanyStory[] = [
  {
    id: 1,
    name: "LightSpeed Networks",
    logo: "/images/success_stories/LightNetwork.PNG",
    image: "/images/success_stories/lightspeed-image.jpg",
    description: "Supporting customer-focused growth for LightSpeed Networks",
    category: "Success Stories",
    industry: "Telecommunications",
    size: "Enterprise",
    region: "Europe"
  },
  {
    id: 2,
    name: "Ogi",
    logo: "/images/success_stories/Ogi-logo.png",
    image: "/images/success_stories/ogi.jpg",
    description: "Ogi forges connected partnership with Indigo, from network design to NOC support",
    category: "Success Stories",
    industry: "Technology",
    size: "Mid-market",
    region: "Europe"
  },
  {
    id: 3,
    name: "Cellnex",
    logo: "/images/success_stories/Cellnex.png",
    image: "/images/success_stories/cellnex-card.png",
    description: "Indigo offers Cellnex a turnkey solution to turn new tower infrastructure sites into revenue generators in rapid time",
    category: "Success Stories",
    industry: "Telecommunications",
    size: "Enterprise",
    region: "Europe"
  },
  {
    id: 4,
    name: "Netomnia",
    logo: "/images/success_stories/Netomnia.png",
    image: "/images/success_stories/netomnia-card.jpg",
    description: "Netomnia partners with Indigo for leading-edge fibre rollout programme to connect more premises more quickly to ultrafast fibre broadband",
    category: "Success Stories",
    industry: "Technology",
    size: "Mid-market",
    region: "Europe"
  },
  {
    id: 5,
    name: "R&M",
    logo: "/images/success_stories/RM-logo.png",
    image: "/images/success_stories/RM-Card.jpg",
    description: "R&M delivered bespoke cabling solution to NTT, enhanced by the engagement and involvement of Indigo from conception to project completion",
    category: "Success Stories",
    industry: "Technology",
    size: "Enterprise",
    region: "Europe"
  },
  {
    id: 6,
    name: "NBI",
    logo: "/images/success_stories/indigo_nbi-colour.png",
    image: "/images/success_stories/NBI.jpeg",
    description: "We have been working closely with NBI to design and plan a new high-speed fibre broadband network for rural Ireland",
    category: "Success Stories",
    industry: "Telecommunications",
    size: "Enterprise",
    region: "Europe"
  },
  {
    id: 7,
    name: "Orange",
    logo: "/images/success_stories/Orange-logo.svg",
    image: "/images/success_stories/Orange-Card.jpg",
    description: "Expert installation and maintenance at Orange Cloud for Business",
    category: "Success Stories",
    industry: "Telecommunications",
    size: "Enterprise",
    region: "Europe"
  },
  {
    id: 8,
    name: "SIRO",
    logo: "/images/success_stories/siro-logo.png",
    image: "/images/success_stories/SIRO-Card.jpg",
    description: "SIRO project showcases Indigo's (previously operating as 4site) excellence in fibre-to-the-building (FTTB) survey and design",
    category: "Success Stories",
    industry: "Telecommunications",
    size: "Mid-market",
    region: "Europe"
  },
  {
    id: 9,
    name: "2rn",
    logo: "/images/success_stories/2rn-rte-network-logo.svg",
    image: "/images/success_stories/2rn-Card.jpg",
    description: "Design, Detail And Fabricate A New Heavy-Duty, Freestanding Lattice Tower Without Service Disruption",
    category: "Success Stories",
    industry: "Media",
    size: "Enterprise",
    region: "Europe"
  },
  {
    id: 10,
    name: "CityFibre",
    logo: "/images/success_stories/cityfibre-logo_teal.png",
    image: "/images/success_stories/Cityfibre-Card.jpg",
    description: "Nation-wide survey and design, and support systems for a global leader in full-fibre network infrastructure",
    category: "Success Stories",
    industry: "Telecommunications",
    size: "Enterprise",
    region: "Europe"
  },
  {
    id: 11,
    name: "Transport Turnkey Project",
    logo: "/images/success_stories/TransportTrunkey.PNG",
    image: "/images/success_stories/TransportTrunkey-Card.png",
    description: "Voice Network Upgrade – National Leading Public Transport Provider",
    category: "Success Stories",
    industry: "Transportation",
    size: "Enterprise",
    region: "Europe"
  },
  {
    id: 12,
    name: "Mobile Turnkey Project",
    logo: "/images/success_stories/MobileTrunkey.PNG",
    image: "/images/success_stories/mobile-turnkey-Card.jpg",
    description: "Turnkey project mobile network upgrade – Global telecommunications group",
    category: "Success Stories",
    industry: "Telecommunications",
    size: "Enterprise",
    region: "Global"
  }
];

// Reveal Links Component
const RevealLinks = () => {
  return (
    <div className="grid place-content-center gap-2 text-white text-center">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
      >
        <FlipLink href="#">SUCCESS</FlipLink>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
      >
        <FlipLink href="#">STORIES</FlipLink>
      </motion.div>
    </div>
  );
};

const DURATION = 0.25;
const STAGGER = 0.025;

const FlipLink = ({ children, href }: { children: string; href: string }) => {
  return (
    <div className="text-4xl font-black uppercase sm:text-7xl md:text-8xl lg:text-9xl text-center text-white">
      {children}
    </div>
  );
};

// Text Parallax Components
const TextParallaxContentExample = () => {
  return (
    <div className="bg-white">
      <TextParallaxContent
        imgUrl="/images/success_stories/success_storybg.png"
        subheading="SUCCESS"
        heading="STORIES"
        isHero={true}
      >
        <ExampleContent 
          title="Real Results, Real Impact"
          description="Discover how we've helped leading telecommunications and technology companies transform their network infrastructure and achieve remarkable growth."
          buttonText="View Success Stories"
        />
      </TextParallaxContent>
      <TextParallaxContent
        imgUrl="/images/success_stories/success_storybg1234.png"
        subheading="Network Excellence"
        heading="From Design to Deployment"
      >
        <ExampleContent 
          title="End-to-End Network Solutions"
          description="From LightSpeed Networks to Cellnex, we've delivered comprehensive network infrastructure projects that drive operational efficiency and customer satisfaction."
          buttonText="Explore Case Studies"
        />
      </TextParallaxContent>
      <TextParallaxContent
        imgUrl="/images/success_stories/net2.png"
        subheading="Global Reach"
        heading="Connecting Communities"
      >
        <ExampleContent 
          title="Infrastructure That Matters"
          description="Our work with NBI, CityFibre, and SIRO demonstrates our commitment to building networks that connect rural communities and enable digital transformation."
          buttonText="Read Our Stories"
        />
      </TextParallaxContent>
      <TextParallaxContent
        imgUrl="/images/success_stories/image4.png"
        subheading="Innovation"
        heading="Future-Ready Networks"
      >
        <ExampleContent 
          title="Cutting-Edge Technology"
          description="Partnering with companies like Netomnia and Orange, we're building the next generation of network infrastructure that powers tomorrow's digital economy."
          buttonText="Partner With Us"
        />
      </TextParallaxContent>
        </div>
  );
};

const IMG_PADDING = 12;

const TextParallaxContent = ({ imgUrl, subheading, heading, children, isHero = false }: {
  imgUrl: string;
  subheading: string;
  heading: string;
  children: React.ReactNode;
  isHero?: boolean;
}) => {
  return (
    <div
      style={{
        paddingLeft: IMG_PADDING,
        paddingRight: IMG_PADDING,
      }}
    >
      <div className="relative h-[150vh]">
        <StickyImage imgUrl={imgUrl} />
        <OverlayCopy heading={heading} subheading={subheading} isHero={isHero} />
      </div>
      {children}
    </div>
  );
};

const StickyImage = ({ imgUrl }: { imgUrl: string }) => {
  const { scrollYProgress } = useScroll();
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0.8]);

  return (
    <motion.div
      style={{
        backgroundImage: `url(${imgUrl})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        height: `calc(100vh - ${IMG_PADDING * 2}px)`,
        top: IMG_PADDING,
        scale,
        opacity
      }}
      className="sticky z-0 overflow-hidden rounded-3xl"
    >
      <div className="absolute inset-0 bg-neutral-950/70" />
    </motion.div>
  );
};

const OverlayCopy = ({ subheading, heading, isHero = false }: { 
  subheading: string; 
  heading: string; 
  isHero?: boolean;
}) => {
  const { scrollYProgress } = useScroll();
  
  if (isHero) {
    const y = useTransform(scrollYProgress, [0, 1], [0, -50]);
    const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
    
    return (
      <motion.div
        style={{ y, opacity }}
        className="absolute left-0 top-0 flex h-screen w-full flex-col items-center justify-center text-white"
      >
        <RevealLinks />
        <motion.p 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
          className="text-lg text-white/90 max-w-2xl mx-auto mt-8 text-center" 
          style={{ fontFamily: 'var(--font-geist-sans)' }}
        >
          Our engineers work with some of the world&apos;s leading brands to create new and better experiences for their customers.
        </motion.p>
      </motion.div>
    );
  }

  const y = useTransform(scrollYProgress, [0, 1], [0, -50]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <motion.div
      style={{ y, opacity }}
      className="absolute left-0 top-0 flex h-screen w-full flex-col items-center justify-center text-white"
    >
      <p className="mb-2 text-center text-xl md:mb-4 md:text-3xl">
        {subheading}
      </p>
      <p className="text-center text-4xl font-bold md:text-7xl">{heading}</p>
    </motion.div>
  );
};

const ExampleContent = ({ title, description, buttonText }: {
  title: string;
  description: string;
  buttonText: string;
}) => (
  <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 px-4 pb-24 pt-12 md:grid-cols-12">
    <h2 className="col-span-1 text-3xl font-bold md:col-span-4 text-blue-900">
      {title}
    </h2>
    <div className="col-span-1 md:col-span-8">
      <p className="mb-4 text-xl text-neutral-600 md:text-2xl">
        {description}
      </p>
      <p className="mb-8 text-xl text-neutral-600 md:text-2xl">
        From telecommunications infrastructure to enterprise networks, we deliver solutions that drive digital transformation and enable sustainable growth for our partners.
      </p>
      <button className="w-full rounded bg-blue-900 px-9 py-4 text-xl text-white transition-colors hover:bg-blue-700 md:w-fit">
        {buttonText} <FiArrowUpRight className="inline" />
      </button>
            </div>
          </div>
);

// Drag Cards Component (Commented Out)
/*
const DragCards = () => {
  return (
    <section className="relative grid min-h-screen w-full place-content-center overflow-hidden bg-white">
      <h2 className="relative z-0 text-[20vw] font-black text-gray-200 md:text-[200px]">
        SUCCESS<span className="text-blue-900">.</span>
      </h2>
      <Cards />
    </section>
  );
};

const Cards = () => {
  const containerRef = useRef(null);

  return (
    <div className="absolute inset-0 z-10" ref={containerRef}>
      <Card
        containerRef={containerRef}
        src="/images/success_stories/LightNetwork.PNG"
        alt="LightSpeed Networks"
        rotate="6deg"
        top="15%"
        left="20%"
        className="w-36 md:w-56"
      />
      <Card
        containerRef={containerRef}
        src="/images/success_stories/Ogi-logo.png"
        alt="Ogi"
        rotate="12deg"
        top="40%"
        left="65%"
        className="w-24 md:w-48"
      />
      <Card
        containerRef={containerRef}
        src="/images/success_stories/Cellnex.png"
        alt="Cellnex"
        rotate="-6deg"
        top="25%"
        left="35%"
        className="w-52 md:w-80"
      />
      <Card
        containerRef={containerRef}
        src="/images/success_stories/Netomnia.png"
        alt="Netomnia"
        rotate="8deg"
        top="55%"
        left="45%"
        className="w-48 md:w-72"
      />
      <Card
        containerRef={containerRef}
        src="/images/success_stories/RM-logo.png"
        alt="R&M"
        rotate="18deg"
        top="15%"
        left="70%"
        className="w-40 md:w-64"
      />
      <Card
        containerRef={containerRef}
        src="/images/success_stories/indigo_nbi-colour.png"
        alt="NBI"
        rotate="-3deg"
        top="30%"
        left="50%"
        className="w-24 md:w-48"
      />
      <Card
        containerRef={containerRef}
        src="/images/success_stories/Orange-logo.svg"
        alt="Orange"
        rotate="10deg"
        top="70%"
        left="25%"
        className="w-32 md:w-52"
      />
      <Card
        containerRef={containerRef}
        src="/images/success_stories/siro-logo.png"
        alt="SIRO"
        rotate="-8deg"
        top="60%"
        left="60%"
        className="w-28 md:w-44"
      />
      <Card
        containerRef={containerRef}
        src="/images/success_stories/2rn-rte-network-logo.svg"
        alt="2rn"
        rotate="15deg"
        top="80%"
        left="40%"
        className="w-36 md:w-56"
      />
      <Card
        containerRef={containerRef}
        src="/images/success_stories/cityfibre-logo_teal.png"
        alt="CityFibre"
        rotate="-5deg"
        top="75%"
        left="70%"
        className="w-44 md:w-68"
      />
      <Card
        containerRef={containerRef}
        src="/images/success_stories/TransportTrunkey.PNG"
        alt="Transport Turnkey Project"
        rotate="7deg"
        top="85%"
        left="15%"
        className="w-40 md:w-60"
      />
      <Card
        containerRef={containerRef}
        src="/images/success_stories/MobileTrunkey.PNG"
        alt="Mobile Turnkey Project"
        rotate="-12deg"
        top="90%"
        left="55%"
        className="w-32 md:w-48"
      />
          </div>
  );
};

const Card = ({ containerRef, src, alt, top, left, rotate, className }: {
  containerRef: any;
  src: string;
  alt: string;
  top: string;
  left: string;
  rotate: string;
  className: string;
}) => {
  const [zIndex, setZIndex] = useState(0);

  const updateZIndex = () => {
    const els = document.querySelectorAll(".drag-elements");

    let maxZIndex = -Infinity;

    els.forEach((el) => {
      let zIndex = parseInt(
        window.getComputedStyle(el).getPropertyValue("z-index")
      );

      if (!isNaN(zIndex) && zIndex > maxZIndex) {
        maxZIndex = zIndex;
      }
    });

    setZIndex(maxZIndex + 1);
  };

  return (
    <motion.img
      onMouseDown={updateZIndex}
      style={{
        top,
        left,
        rotate,
        zIndex,
      }}
      className={`drag-elements absolute w-48 bg-neutral-200 p-1 pb-4 ${className}`}
      src={src}
      alt={alt}
      drag
      dragConstraints={containerRef}
      dragElastic={0.65}
    />
  );
};
*/

// Automatic Carousel Component
const HorizontalScrollCarousel = () => {
  const [isVisible, setIsVisible] = useState(false);
  
  // Split stories into groups of 4
  const firstGroup = companyStories.slice(0, 4);   // 1-4
  const secondGroup = companyStories.slice(4, 8);  // 5-8
  const thirdGroup = companyStories.slice(8, 12);  // 9-12

  useEffect(() => {
    // Small delay to prevent initial glitch
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 100);
    
    return () => clearTimeout(timer);
  }, []);

  if (!isVisible) {
    return (
      <section className="relative min-h-screen bg-[#141414] py-20 overflow-x-hidden">
        <div className="flex flex-col items-center justify-center gap-8 h-full">
          <div className="text-white text-lg">Loading...</div>
            </div>
      </section>
    );
  }

  return (
    <section className="relative min-h-screen bg-[#141414] py-20 overflow-x-hidden">
      <div className="flex flex-col items-center justify-center gap-8 h-full">
        {/* First row - Left to Right */}
        <motion.div 
          className="flex gap-4"
          initial={{ x: 0 }}
          animate={{ x: -2400 }}
          transition={{
            duration: 40,
            repeat: Infinity,
            ease: "linear",
            repeatType: "loop"
          }}
        >
          {[...firstGroup, ...firstGroup, ...firstGroup, ...firstGroup, ...firstGroup].map((story, index) => (
            <StoryCard story={story} key={`row1-${story.id}-${index}`} />
          ))}
        </motion.div>
        
        {/* Second row - Right to Left */}
        <motion.div 
          className="flex gap-4"
          initial={{ x: -2400 }}
          animate={{ x: 0 }}
          transition={{
            duration: 50,
            repeat: Infinity,
            ease: "linear",
            repeatType: "loop"
          }}
        >
          {[...secondGroup, ...secondGroup, ...secondGroup, ...secondGroup, ...secondGroup].map((story, index) => (
            <StoryCard story={story} key={`row2-${story.id}-${index}`} />
          ))}
        </motion.div>
        
        {/* Third row - Left to Right */}
        <motion.div 
          className="flex gap-4"
          initial={{ x: 0 }}
          animate={{ x: -2400 }}
          transition={{
            duration: 60,
            repeat: Infinity,
            ease: "linear",
            repeatType: "loop"
          }}
        >
          {[...thirdGroup, ...thirdGroup, ...thirdGroup, ...thirdGroup, ...thirdGroup].map((story, index) => (
            <StoryCard story={story} key={`row3-${story.id}-${index}`} />
          ))}
        </motion.div>
          </div>
    </section>
  );
};

// Story Card Component
const StoryCard = ({ story }: { story: CompanyStory }) => {
  return (
    <div
      className="group relative h-[450px] w-[450px] overflow-hidden bg-neutral-200 rounded-3xl shadow-2xl"
    >
      <div
        style={{
          backgroundImage: `url(${story.image})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
        className="absolute inset-0 z-0 transition-transform duration-300 group-hover:scale-110"
      ></div>
      
      {/* Gradient Overlay */}
      <div className="absolute inset-0 z-10 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
      
            {/* Content */}
      <div className="absolute inset-0 z-20 flex flex-col justify-end p-8">
        {/* Company Name */}
        <h3 className="text-3xl font-bold text-white mb-3" style={{ fontFamily: 'var(--font-geist-sans)' }}>
          {story.name}
        </h3>
        
        {/* Description */}
        <p className="text-white/80 text-sm mb-4" style={{ fontFamily: 'var(--font-geist-sans)' }}>
          {story.description}
        </p>
        
        {/* Company Info and Read More Button */}
        <div className="flex items-center justify-between">
          <div className="flex flex-col gap-1">
            <span className="text-xs text-white/60 uppercase tracking-wide" style={{ fontFamily: 'var(--font-geist-sans)' }}>
              {story.industry}
            </span>
            <span className="text-xs text-white/60" style={{ fontFamily: 'var(--font-geist-sans)' }}>
              {story.region} • {story.size}
            </span>
          </div>

          <button
            className={`
              px-4 py-2 rounded-full 
              flex items-center gap-2 
              text-white
              shadow-[-5px_-5px_10px_rgba(255,_255,_255,_0.8),_5px_5px_10px_rgba(0,_0,_0,_0.25)]
              transition-all
              hover:shadow-[-1px_-1px_5px_rgba(255,_255,_255,_0.6),_1px_1px_5px_rgba(0,_0,_0,_0.3),inset_-2px_-2px_5px_rgba(255,_255,_255,_1),inset_2px_2px_4px_rgba(0,_0,_0,_0.3)]
              hover:text-blue-200
              text-sm font-medium
            `}
            style={{ fontFamily: 'var(--font-geist-sans)' }}
          >
            <FiSend />
            <span>Read Story</span>
          </button>
            </div>
          </div>
        </div>
  );
};

// Main Success Stories Page Component
export default function SuccessStories() {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    
    // Initialize Lenis for smooth scrolling
    const initLenis = () => {
      lenisRef.current = new Lenis({
        duration: 1.2,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
        wheelMultiplier: 1,
        touchMultiplier: 2,
      });

      const raf = (time: number) => {
        lenisRef.current?.raf(time);
        requestAnimationFrame(raf);
      };
      requestAnimationFrame(raf);
    };

    // Small delay to ensure proper initialization
    const timer = setTimeout(() => {
      initLenis();
    }, 100);

    return () => {
      clearTimeout(timer);
      lenisRef.current?.destroy();
    };
  }, []);

  return (
    <div className="min-h-screen bg-white">
      {/* Text Parallax Section - Now starts the page */}
      <TextParallaxContentExample />

      {/* Drag Cards Section (Commented Out) */}
      {/* <DragCards /> */}

      

      {/* Horizontal Scroll Carousel */}
      <HorizontalScrollCarousel />

      {/* CTA Section */}
      <section className="relative bg-blue-900 text-white py-16 overflow-hidden">
        {/* Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-80"
          style={{
            backgroundImage: 'url(/images/success_stories/Digital-Future%20CTA%20bg.png)'
          }}
        ></div>
        {/* Blue overlay to blend with background */}
        <div className="absolute inset-0 bg-blue-900/20"></div>

                <div className="max-w-4xl mx-auto px-4 relative z-10">
          <div className="bg-white rounded-3xl p-12 text-center shadow-2xl border border-gray-200">
            <h2 className="text-4xl md:text-5xl font-bold text-blue-900 mb-6" style={{ fontFamily: 'var(--font-geist-sans)' }}>
              Want to know more?
            </h2>
            <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed" style={{ fontFamily: 'var(--font-geist-sans)' }}>
              If you want to know more about how we can design, build and support your network and infrastructure, get in touch.
            </p>
            <button className="bg-blue-900 hover:bg-blue-800 text-white px-8 py-4 rounded-2xl text-lg font-semibold transition-all duration-200 hover:scale-105 flex items-center gap-2 mx-auto shadow-lg" style={{ fontFamily: 'var(--font-geist-sans)' }}>
              Contact us
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
          </button>
      </div>
          </div>
      </section>

      <style>{`
        /* Line clamp utility */
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </div>
  );
}
