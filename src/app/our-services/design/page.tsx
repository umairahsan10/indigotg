'use client';

import React, { useEffect, useRef } from 'react';
import { motion, useTransform, useScroll } from "framer-motion";
import ServicesSection from '../../components/ServicesSection';

const IMG_PADDING = 12;

// Reveal Links Component for Design
const RevealLinks = () => {
  return (
    <div className="grid place-content-center gap-2 text-white text-center">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
      >
        <FlipLink href="#">DESIGN</FlipLink>
        
      </motion.div>
    </div>
  );
};

const FlipLink = ({ children, href }: { children: string; href: string }) => {
  return (
    <div className="text-4xl font-black uppercase sm:text-7xl md:text-8xl lg:text-9xl text-center text-white">
      {children}
    </div>
  );
};

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
          className="text-lg text-white/90 max-w-4xl mx-auto mt-8 text-center sm:text-center md:text-center" 
          style={{ fontFamily: 'var(--font-geist-sans)' }}
        >
          Surveys, Planning, Acquisition & Design
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

const ContentSection = ({ title, description, title2, description2, title3, description3 }: {
  title: string;
  description: string;
  title2: string;
  description2: string;
  title3: string;
  description3: string;
}) => (
  <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 px-4 pb-24 pt-12 md:grid-cols-12">
    <motion.h2 
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      viewport={{ once: true, margin: "0px 0px -300px 0px" }}
      className="col-span-1 text-3xl font-bold md:col-span-4 text-blue-900 text-center md:text-left"
    >
      {title}
    </motion.h2>
    <motion.div 
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
      viewport={{ once: true, margin: "0px 0px -300px 0px" }}
      className="col-span-1 md:col-span-8 text-center md:text-left"
    >
      <p className="mb-4 text-xl text-neutral-600 md:text-2xl">
        {description}
      </p>
    </motion.div>
    <motion.h2 
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      viewport={{ once: true, margin: "0px 0px -300px 0px" }}
      className="col-span-1 text-3xl font-bold md:col-span-4 text-blue-900 text-center md:text-left"
    >
      {title2}
    </motion.h2>
    <motion.div 
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
      viewport={{ once: true, margin: "0px 0px -300px 0px" }}
      className="col-span-1 md:col-span-8 text-center md:text-left"
    >
      <p className="mb-4 text-xl text-neutral-600 md:text-2xl">
        {description2}
      </p>
    </motion.div>
    <motion.h2 
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      viewport={{ once: true, margin: "0px 0px -300px 0px" }}
      className="col-span-1 text-3xl font-bold md:col-span-4 text-blue-900 text-center md:text-left"
    >
      {title3}
    </motion.h2>
    <motion.div 
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
      viewport={{ once: true, margin: "0px 0px -300px 0px" }}
      className="col-span-1 md:col-span-8 text-center md:text-left"
    >
      <p className="mb-4 text-xl text-neutral-600 md:text-2xl">
        {description3}
      </p>
    </motion.div>
  </div>
);

export default function DesignServicesPage() {
  // No scroll-to-top effect - let the page behave naturally on reload

  return (
    <div className="bg-white">
      <TextParallaxContent
        imgUrl="/services/img-1.jpg"
        subheading="DESIGN"
        heading="SERVICES"
        isHero={true}
      >
        <ContentSection 
          title="Identify the right data at the outset of the project"
          description="By combining rich data sets, from archive schematics to 360-degree camera surveys, we achieve optimised designs for feeder and distribution routes as well as overall network architecture. We convert information into actionable data, stored centrally as a single source of truth."
          title2="Employ fast and iterative design processes"
          description2="Our agility enables us to share plans and iterate quickly, saving time and money for clients. We can swap structures out virtually to identify compliance issues earlier, for example, and access centralised data to speed up decision-making."
          title3="Work smarter with leading-edge tools"
          description3="Indigo has invested in and integrated a set of industry-leading software design and planning tools to enhance its end-to-end design process. The combination of our design expertise and centre of excellence, our refined processes and first-rate systems means you can benefit from the optimum network design."
        />
      </TextParallaxContent>

      {/* Services Section */}
      <ServicesSection defaultFilter="design" />
    </div>
  );
} 