'use client';

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

interface ServicesCubeProps {
  filter: 'all' | 'design' | 'deploy' | 'support';
  servicesByCategory: any;
  serviceData: any;
}

export default function ServicesCube({ filter, servicesByCategory, serviceData }: ServicesCubeProps) {
  const cubeRef = useRef<HTMLDivElement>(null);
  const currentServices = servicesByCategory[filter];

  useEffect(() => {
    if (!cubeRef.current) return;

    // Reset cube position
    gsap.set(cubeRef.current, { rotationY: 0, rotationX: 0 });

    // Animate cube rotation based on filter
    let targetRotation = 0;
    switch (filter) {
      case 'all':
        targetRotation = 0;
        break;
      case 'design':
        targetRotation = 90;
        break;
      case 'deploy':
        targetRotation = 180;
        break;
      case 'support':
        targetRotation = 270;
        break;
    }

    gsap.to(cubeRef.current, {
      rotationY: targetRotation,
      duration: 1,
      ease: "power2.inOut"
    });
  }, [filter]);

  return (
    <div className="relative w-full h-96 perspective-1000">
      <div 
        ref={cubeRef}
        className="relative w-full h-full transform-style-preserve-3d transition-transform duration-1000"
      >
        {/* Front Face - Terrestrial */}
        <div className="absolute inset-0 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg p-6 transform-gpu" style={{ transform: 'rotateY(0deg) translateZ(200px)' }}>
          <h3 className="text-xl font-bold text-white mb-4">
            {filter === 'all' ? 'Terrestrial' : `${serviceData[filter].title} - Terrestrial`}
          </h3>
          <ul className="space-y-2 text-white/90">
            {currentServices.terrestrial.map((service: string, index: number) => (
              <li key={index} className="flex items-center hover:text-yellow-400 hover:translate-x-2 transition-all duration-300 cursor-pointer group">
                <div className="w-3 h-3 bg-white mr-3 transform rotate-45 hover:scale-125 group-hover:bg-yellow-400 transition-all duration-300 cursor-pointer"></div>
                {service}
              </li>
            ))}
          </ul>
        </div>

        {/* Right Face - Data Centres */}
        <div className="absolute inset-0 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg p-6 transform-gpu" style={{ transform: 'rotateY(90deg) translateZ(200px)' }}>
          <h3 className="text-xl font-bold text-white mb-4">
            {filter === 'all' ? 'Data Centres' : `${serviceData[filter].title} - Data Centres`}
          </h3>
          <ul className="space-y-2 text-white/90">
            {currentServices.dataCentres.map((service: string, index: number) => (
              <li key={index} className="flex items-center hover:text-yellow-400 hover:translate-x-2 transition-all duration-300 cursor-pointer group">
                <div className="w-3 h-3 bg-white mr-3 transform rotate-45 hover:scale-125 group-hover:bg-yellow-400 transition-all duration-300 cursor-pointer"></div>
                {service}
              </li>
            ))}
          </ul>
        </div>

        {/* Back Face - Network Services */}
        <div className="absolute inset-0 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg p-6 transform-gpu" style={{ transform: 'rotateY(180deg) translateZ(200px)' }}>
          <h3 className="text-xl font-bold text-white mb-4">
            {filter === 'all' ? 'Network Services' : `${serviceData[filter].title} - Network Services`}
          </h3>
          <ul className="space-y-2 text-white/90">
            {currentServices.networkServices.map((service: string, index: number) => (
              <li key={index} className="flex items-center hover:text-yellow-400 hover:translate-x-2 transition-all duration-300 cursor-pointer group">
                <div className="w-3 h-3 bg-white mr-3 transform rotate-45 hover:scale-125 group-hover:bg-yellow-400 transition-all duration-300 cursor-pointer"></div>
                {service}
              </li>
            ))}
          </ul>
        </div>

        {/* Left Face - Wireless */}
        <div className="absolute inset-0 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg p-6 transform-gpu" style={{ transform: 'rotateY(270deg) translateZ(200px)' }}>
          <h3 className="text-xl font-bold text-white mb-4">
            {filter === 'all' ? 'Wireless' : `${serviceData[filter].title} - Wireless`}
          </h3>
          <ul className="space-y-2 text-white/90">
            {currentServices.wireless.map((service: string, index: number) => (
              <li key={index} className="flex items-center hover:text-yellow-400 hover:translate-x-2 transition-all duration-300 cursor-pointer group">
                <div className="w-3 h-3 bg-white mr-3 transform rotate-45 hover:scale-125 group-hover:bg-yellow-400 transition-all duration-300 cursor-pointer"></div>
                {service}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
