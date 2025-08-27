'use client';

import React, { useEffect, useRef } from 'react';
import { motion, useTransform, useScroll } from "framer-motion";
import ServicesSection from '../../components/ServicesSection';

const IMG_PADDING = 12;

// Reveal Links Component for Support
const RevealLinks = () => {
  return (
    <div className="grid place-content-center gap-2 text-white text-center">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
      >
        <FlipLink href="#">SUPPORT</FlipLink>
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
          className="text-lg text-white/90 max-w-4xl mx-auto mt-8 text-center" 
          style={{ fontFamily: 'var(--font-geist-sans)' }}
        >
          Monitor, Maintain, Upgrade Telecoms and Data Centre Infrastructure
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

const ContentSection = ({ title, description }: {
  title: string;
  description: string;
}) => (
  <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 px-4 pb-24 pt-12 md:grid-cols-12">
    <h2 className="col-span-1 text-3xl font-bold md:col-span-4 text-blue-900">
      {title}
    </h2>
    <div className="col-span-1 md:col-span-8">
      <p className="mb-4 text-xl text-neutral-600 md:text-2xl">
        {description}
      </p>
    </div>
  </div>
);

export default function SupportServicesPage() {
  // No scroll-to-top effect - let the page behave naturally on reload

  return (
    <div className="bg-white">
      <TextParallaxContent
        imgUrl="/services/img-3.jpg"
        subheading="SUPPORT"
        heading="SERVICES"
        isHero={true}
      >
        {/* Content Sections - All in Grid Layout */}
        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 px-4 pb-24 pt-12 md:grid-cols-12">
          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            viewport={{ once: true, margin: "0px 0px -300px 0px" }}
            className="col-span-1 text-3xl font-bold md:col-span-4 text-blue-900 text-center md:text-left"
          >
            Our trusted partnership approach helps diagnose and fix faults faster
          </motion.h2>
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
            viewport={{ once: true, margin: "0px 0px -300px 0px" }}
            className="col-span-1 md:col-span-8 text-center md:text-left"
          >
            <p className="mb-4 text-xl text-neutral-600 md:text-2xl">
              As network experts with turnkey knowledge, we have always been strong in diagnostics and fault-finding. Our 24x7x365 operations and multi-vendor engineers can provide on-site support in hours or the next day, depending on the Service Level Agreement (SLA).
            </p>
          </motion.div>
          
          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            viewport={{ once: true, margin: "0px 0px -300px 0px" }}
            className="col-span-1 text-3xl font-bold md:col-span-4 text-blue-900 text-center md:text-left"
          >
            Tailor services to align to unique client needs
          </motion.h2>
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
            viewport={{ once: true, margin: "0px 0px -300px 0px" }}
            className="col-span-1 md:col-span-8 text-center md:text-left"
          >
            <p className="mb-4 text-xl text-neutral-600 md:text-2xl">
              No network or data centre is identical which is why our maintenance and support services are customised to meet each client's needs. From rapid response field service engineers to escalation plans for second and third-line support, we can cover any requirement.
            </p>
          </motion.div>
          
          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            viewport={{ once: true, margin: "0px 0px -300px 0px" }}
            className="col-span-1 text-3xl font-bold md:col-span-4 text-blue-900 text-center md:text-left"
          >
            Manage assets to best-practice standards
          </motion.h2>
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
            viewport={{ once: true, margin: "0px 0px -300px 0px" }}
            className="col-span-1 md:col-span-8 text-center md:text-left"
          >
            <p className="mb-4 text-xl text-neutral-600 md:text-2xl">
              Certified to the highest standard ISOs we are always compliant with local health and safety standards. We use well-defined processes and quality management systems to stand over our repairs, logistics and spares management processes for network infrastructure and data centres.
            </p>
          </motion.div>
          
          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            viewport={{ once: true, margin: "0px 0px -300px 0px" }}
            className="col-span-1 text-3xl font-bold md:col-span-4 text-blue-900 text-center md:text-left"
          >
            Continuous improvement and visibility
          </motion.h2>
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
            viewport={{ once: true, margin: "0px 0px -300px 0px" }}
            className="col-span-1 md:col-span-8 text-center md:text-left"
          >
            <p className="mb-4 text-xl text-neutral-600 md:text-2xl">
              We continuously expand and improve our Integrated Management Systems to stay agile and relevant to a fast-changing telecommunications landscape. Our goal is for digital infrastructure to achieve optimum performance, and to provide clients with pathways for continual improvement. Increase visibility and drive faster decision making with access to our web portal (through an API or Self-service Ticket portal).
            </p>
          </motion.div>
        </div>
      </TextParallaxContent>

      {/* Services Section */}
      <ServicesSection defaultFilter="support" />
    </div>
  );
} 