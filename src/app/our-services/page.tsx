'use client';

import React, { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { orbitron } from '../fonts';
import HaloBackground from '../components/VantaBackground';

const ServiceSection = ({ 
  title, 
  description, 
  buttonText, 
  url, 
  index,
  gradientClass,
  imageSrc,
}: {
  title: string;
  description: string;
  buttonText: string;
  url: string;
  index: number;
  gradientClass: string;
  imageSrc: string;
}) => {
  return (
    <section
      className="service-section relative h-screen overflow-hidden"
      style={{ zIndex: 100 + index }}
    >
      {/* Background Gradient (no images) */}
      <div className={`absolute inset-0 bg-gradient-to-br ${gradientClass}`} />
      {/* Subtle dark overlay for contrast */}
      <div className="absolute inset-0 bg-black/30" />

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/30" />

      {/* Content */}
      <div className="relative z-10 h-full flex items-center">
        <div className="mx-auto w-full px-6 md:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-10">
            {/* Text column */}
            <div className={`${index % 2 === 1 ? 'order-2 md:order-1' : ''}`}>
              <div className="max-w-xl text-white bg-white/10 backdrop-blur-md rounded-2xl border border-white/15 p-8 md:p-10 shadow-[0_8px_40px_rgba(0,0,0,0.35)]">
                <h2 className="text-5xl md:text-6xl font-bold uppercase tracking-wider text-orange-400 mb-6">
                  {title}
                </h2>
                <p className="text-white/90 text-lg md:text-xl leading-relaxed mb-8">
                  {description}
                </p>
                <a
                  href={url}
                  className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-orange-400 to-orange-500 text-black font-bold text-lg uppercase tracking-wider rounded-lg hover:from-orange-300 hover:to-orange-400 transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:ring-offset-2 focus:ring-offset-black"
                >
                  {buttonText}
                </a>
              </div>
            </div>

            {/* Image column */}
            <div className={`${index % 2 === 1 ? 'order-1 md:order-2' : ''}`}>
              <div className="relative w-full h-[320px] md:h-[520px] rounded-2xl overflow-hidden border border-white/10 bg-white/5 backdrop-blur-sm shadow-[0_8px_40px_rgba(0,0,0,0.35)]">
                <div
                  className="absolute inset-0 bg-cover bg-center"
                  style={{ backgroundImage: `url(${imageSrc})` }}
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-black/30 to-transparent" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Section Number */}
      <div className="absolute top-8 left-8 text-orange-400 font-mono text-lg z-20">
        <span className="text-2xl font-bold">{String(index + 1).padStart(2, '0')}</span>
        <span className="opacity-60"> / 03</span>
      </div>
    </section>
  );
};

export default function OurServices() {
  const services = [
    {
      title: 'Design',
      url: '/services/design',
      description: 'Survey, Acquisition, Design and Planning for Fixed Line, Subsea, Data Centres and Wireless',
      buttonText: 'Explore Design',
      gradientClass: 'from-sky-600 via-indigo-700 to-violet-700',
      imageSrc: '/services/img-1.jpg',
    },
    {
      title: 'Deploy',
      url: '/services/deploy',
      description: 'Build, Install, Test and Optimise Telecoms Networks and Data Centres',
      buttonText: 'Start Deployment',
      gradientClass: 'from-cyan-600 via-teal-600 to-emerald-600',
      imageSrc: '/services/img-2.jpg',
    },
    {
      title: 'Support',
      url: '/services/support',
      description: 'Monitor, Maintain, Upgrade, and Decommission Digital Infrastructure',
      buttonText: 'Get Support',
      gradientClass: 'from-blue-700 via-indigo-800 to-slate-900',
      imageSrc: '/services/img-3.jpg',
    },
  ];

  return (
    <div className="min-h-screen overflow-x-hidden">
      {/* Top scroll progress bar */}
      <div className="fixed top-0 left-0 z-[100] h-1 w-full pointer-events-none">
        <div id="scroll-progress-bar" className="h-full w-full origin-left scale-x-0 bg-gradient-to-r from-yellow-400 to-orange-500" />
      </div>

      <ServicesScrollSetup />
      {/* Hero Section - Full Screen (centered heading + image) */}
      <section className="h-screen relative flex items-center justify-center overflow-hidden">
        {/* Procedural animated background */}
        <HaloBackground />
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/30 to-black/60 z-10" />
        <div className="relative z-20 flex items-center justify-center px-4 text-center h-full w-full">
          <div
            className="relative flex items-center justify-center w-[92vw] max-w-6xl h-[66vh] md:h-[72vh] bg-no-repeat bg-center bg-contain pointer-events-none"
            style={{ backgroundImage: 'url(/services/silver.png)' }}
          >
            <h1
              className={`${orbitron.className} px-4 text-6xl md:text-7xl lg:text-8xl font-extrabold tracking-widest text-transparent`}
              style={{
                WebkitTextStroke: '3px #7df9ff',
                filter:
                  'drop-shadow(0 0 12px rgba(125,249,255,0.8)) drop-shadow(0 0 28px rgba(125,249,255,0.45))'
              }}
            >
              OUR SERVICES
            </h1>
          </div>
        </div>

        {/* Scroll cue */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30 flex items-center gap-2 text-white/80">
          <div className="h-2.5 w-2.5 rounded-full bg-white/90 animate-pulse" />
          <span className="text-sm tracking-wide">Scroll</span>
        </div>
      </section>

      {/* Services Sections - Overlapping with pinning */}
      <div className="relative">
        {services.map((service, index) => (
          <ServiceSection
            key={index}
            title={service.title}
            description={service.description}
            buttonText={service.buttonText}
            url={service.url}
            index={index}
            gradientClass={service.gradientClass}
            imageSrc={service.imageSrc}
          />
        ))}
      </div>

      {/* Contact Section (standard block, fixed bg image) */}
      <section className="relative py-24 flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-fixed"
          style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1920&q=80")' }}
        />
        <div className="absolute inset-0 bg-black/60" />
        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center text-white">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-orange-400 to-yellow-400 bg-clip-text text-transparent">
            Want to know more?
          </h2>
          <p className="text-lg md:text-xl mb-10 text-gray-200 leading-relaxed">
            Get in touch to discover how we can partner to design, deploy, and support your digital infrastructure.
          </p>
          <div className="flex justify-center">
            <button className="bg-gradient-to-r from-orange-400 to-yellow-400 text-black px-8 py-4 rounded-lg font-semibold text-lg hover:from-orange-300 hover:to-yellow-300 transition-all duration-300 transform hover:scale-105">
              Get in Touch with Indigo
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

// Enable scroll-based pinning for overlap effect
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export function ServicesScrollSetup() {
  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Top progress bar
    const bar = document.getElementById('scroll-progress-bar');
    if (bar) {
      ScrollTrigger.create({
        start: 0,
        end: () => document.body.scrollHeight - window.innerHeight,
        onUpdate: (self) => {
          const scale = Math.max(0.001, self.progress);
          bar.style.transform = `scaleX(${scale})`;
        },
      });
    }

    const sections = gsap.utils.toArray<HTMLElement>('.service-section');
    sections.forEach((section, i) => {
      const isLast = i === sections.length - 1;
      ScrollTrigger.create({
        trigger: section,
        start: 'top top',
        end: '+=100%',
        pin: true,
        pinSpacing: isLast,
        onEnter: () => section.classList.add('is-active'),
        onLeave: () => section.classList.remove('is-active'),
        onEnterBack: () => section.classList.add('is-active'),
        onLeaveBack: () => section.classList.remove('is-active'),
      });
    });

    return () => {
      ScrollTrigger.getAll().forEach((st) => st.kill());
    };
  }, []);

  return null;
}