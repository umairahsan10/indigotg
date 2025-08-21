'use client';

import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import IndigoAnimation1 from './indigoAnimation1';

// Enable scroll-based pinning for overlap effect
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface ServicesSectionProps {
  className?: string;
  defaultFilter?: 'all' | 'design' | 'deploy' | 'support';
}

export default function ServicesSection({ className = "", defaultFilter = 'all' }: ServicesSectionProps) {
  const advancedServicesGridRef = useRef<HTMLDivElement>(null);
  const [activeFilter, setActiveFilter] = useState<'all' | 'design' | 'deploy' | 'support'>(defaultFilter);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const serviceData = {
    all: {
      title: "All Services",
      description: "Comprehensive range of digital infrastructure services across all domains",
    },
    design: {
      title: "Design Services",
      description: "We optimise and future-proof designs from the outset with leading-edge tools, processes, and data, saving our partners time and money.",
    },
    deploy: {
      title: "Deploy Services",
      description: "We partner with owners and network operators to install, test, and optimize fibre optic, wireless, and data centre digital infrastructure.",
    },
    support: {
      title: "Support Services",
      description: "We monitor, maintain, and upgrade services around the clock, deploying our operations and multi-vendor engineers within hours or the next day to provide expert on-site support.",
    }
  };

  // Comprehensive services data for each category
  const servicesByCategory = {
    all: {
      terrestrial: [
        "Active Build",
        "Logistics and Warehousing",
        "Project & Programme Management",
        "Fibre Survey & Design (POP)",
        "Fibre Design Desktop HLD",
        "Fibre Access LLD Services",
        "Fibre Surveying OLT",
        "Fibre Planning and Design OLT",
        "Fibre Access POP Design and Planning",
        "Wayleaving and Consenting",
        "Network Monitoring",
        "Operations and Maintenance",
        "Global Service Desk and First Line Maintenance",
        "Survey & Design",
        "Spare Parts Management Service",
        "Fibre Due Diligence",
        "Network Upgrades"
      ],
      dataCentres: [
        "Project & Programme Management",
        "Fibre Characterisation and Link Testing",
        "Data Centre Survey and Audit Services",
        "Data Centre Design Service",
        "Power and Data Cable Containment Systems",
        "Rack, Cabinet and PDU Installation",
        "Hot and Cold Aisle Containment Services",
        "Structured Cabling Installation and Test",
        "Cross Connects and Meet Me Room (MMR) services",
        "Equipment Racking and Stacking/Server Builds",
        "Circuit Patching",
        "Equipment Migrations and Decommissioning",
        "Network Monitoring",
        "Global Service Desk and First Line Maintenance",
        "Survey & Design",
        "Smart Hands",
        "Spare Parts Management Service",
        "Network Upgrades",
        "Decommissioning",
        "Digitisation"
      ],
      networkServices: [
        "Network Services",
        "Site Survey and Audit",
        "Logistics and Warehousing",
        "Project & Programme Management",
        "Site Access",
        "Active Network Equipment I&C",
        "Fibre Characterisation and Link Testing",
        "Power Supply & Installation",
        "Rack, Cabinet and PDU Installation",
        "Equipment Migrations and Decommissioning",
        "Card Infills, Patching and Upgrades Documentation & Testing",
        "Network Monitoring",
        "Global Service Desk and First Line Maintenance",
        "Spare Parts Management Service",
        "Preventative Maintenance"
      ],
      wireless: [
        "Cell Site Surveys",
        "Cell Site Design",
        "Town Planning",
        "Passive Build",
        "Active Build",
        "Logistics and Warehousing",
        "Site Acceptance",
        "Network Integrations",
        "Project & Programme Management",
        "Site Access",
        "Network Optimisation",
        "Network Monitoring",
        "Operations and Maintenance",
        "Global Service Desk and First Line Maintenance",
        "Survey & Design",
        "Spare Parts Management Service",
        "Network Upgrades",
        "Private 5G Services",
        "Digitisation"
      ]
    },
    design: {
      terrestrial: [
        "Active Build",
        "Fibre Survey & Design (POP)",
        "Fibre Design Desktop HLD",
        "Fibre Access LLD Services",
        "Fibre Surveying OLT",
        "Fibre Planning and Design OLT",
        "Fibre Access POP Design and Planning",
        "Wayleaving and Consenting",
        "Survey & Design",
        "Fibre Due Diligence"
      ],
      dataCentres: [
        "Data Centre Survey and Audit Services",
        "Data Centre Design Service",
        "Survey & Design",
        "Digitisation"
      ],
      networkServices: [
        "Site Survey and Audit"
      ],
      wireless: [
        "Cell Site Surveys",
        "Cell Site Design",
        "Town Planning",
        "Active Build",
        "Survey & Design",
        "Digitisation"
      ]
    },
    deploy: {
      terrestrial: [
        "Logistics and Warehousing",
        "Project & Programme Management",
        "Wayleaving and Consenting"
      ],
      dataCentres: [
        "Project & Programme Management",
        "Fibre Characterisation and Link Testing",
        "Power and Data Cable Containment Systems",
        "Rack, Cabinet and PDU Installation",
        "Hot and Cold Aisle Containment Services",
        "Structured Cabling Installation and Test",
        "Cross Connects and Meet Me Room (MMR) services",
        "Equipment Racking and Stacking/Server Builds",
        "Circuit Patching",
        "Equipment Migrations and Decommissioning",
        "Decommissioning",
        "Digitisation"
      ],
      networkServices: [
        "Logistics and Warehousing",
        "Project & Programme Management",
        "Site Access",
        "Active Network Equipment I&C",
        "Fibre Characterisation and Link Testing",
        "Power Supply & Installation",
        "Rack, Cabinet and PDU Installation",
        "Equipment Migrations and Decommissioning",
        "Card Infills, Patching and Upgrades Documentation & Testing"
      ],
      wireless: [
        "Passive Build",
        "Logistics and Warehousing",
        "Site Acceptance",
        "Project & Programme Management",
        "Site Access",
        "Digitisation"
      ]
    },
    support: {
      terrestrial: [
        "Network Monitoring",
        "Operations and Maintenance",
        "Global Service Desk and First Line Maintenance",
        "Spare Parts Management Service",
        "Fibre Due Diligence",
        "Network Upgrades"
      ],
      dataCentres: [
        "Network Monitoring",
        "Global Service Desk and First Line Maintenance",
        "Smart Hands",
        "Spare Parts Management Service",
        "Network Upgrades",
        "Decommissioning",
        "Digitisation"
      ],
      networkServices: [
        "Site Access",
        "Network Monitoring",
        "Global Service Desk and First Line Maintenance",
        "Spare Parts Management Service",
        "Preventative Maintenance"
      ],
      wireless: [
        "Network Integrations",
        "Site Access",
        "Network Optimisation",
        "Network Monitoring",
        "Operations and Maintenance",
        "Global Service Desk and First Line Maintenance",
        "Spare Parts Management Service",
        "Network Upgrades",
        "Digitisation"
      ]
    }
  };

  useEffect(() => {
    if (!advancedServicesGridRef.current) return;

    gsap.set(advancedServicesGridRef.current, {
      opacity: 0,
      y: 30
    });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: advancedServicesGridRef.current,
        start: "top 95%",
        end: "bottom 20%",
        toggleActions: "play none none reverse"
      }
    });

    tl.to(advancedServicesGridRef.current, {
      opacity: 1,
      y: 0,
      duration: 0.6,
      ease: "power2.out"
    });

    return () => {
      tl.kill();
      ScrollTrigger.refresh();
    };
  }, [activeFilter]);

  useEffect(() => {
    if (!advancedServicesGridRef.current) return;
    
    gsap.set(advancedServicesGridRef.current, {
      opacity: 0,
      y: 30
    });
    
    const refreshTimer = setTimeout(() => {
      ScrollTrigger.refresh();
      
      const rect = advancedServicesGridRef.current?.getBoundingClientRect();
      if (rect && rect.top < window.innerHeight && rect.bottom > 0) {
        gsap.to(advancedServicesGridRef.current, {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: "power2.out"
        });
      }
    }, 100);
    
    return () => clearTimeout(refreshTimer);
  }, [activeFilter]);

  useEffect(() => {
    const handleResize = () => {
      ScrollTrigger.refresh();
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (isDropdownOpen && !(event.target as Element).closest('.dropdown-container')) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isDropdownOpen]);

  const currentServices = servicesByCategory[activeFilter];

  return (
    <section className={`py-24 bg-[#04048b] ${className}`}>
      <div className="container mx-auto px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row gap-12">
            {/* Left Panel */}
            <div className="lg:w-1/3">
              <div className="mb-8 relative dropdown-container">
                <button 
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="bg-transparent border-2 border-white text-white px-6 py-3 rounded-full font-semibold flex items-center gap-2 hover:bg-white hover:text-blue-900 transition-colors w-full justify-between"
                >
                  {serviceData[activeFilter].title}
                  <svg className={`w-4 h-4 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} fill="none" stroke="white" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                
                {isDropdownOpen && (
                  <div className="absolute top-full left-0 right-0 mt-2 bg-[#04048b] border border-white/20 rounded-lg shadow-xl z-50 overflow-hidden">
                    {Object.entries(serviceData).map(([key, data]) => (
                      <button
                        key={key}
                        onClick={() => {
                          setActiveFilter(key as keyof typeof serviceData);
                          setIsDropdownOpen(false);
                        }}
                        className={`w-full text-left px-4 py-3 text-white text-lg transition-colors ${
                          activeFilter === key ? 'bg-white/10' : 'hover:bg-white/10'
                        } ${key === 'all' ? 'rounded-t-lg' : ''} ${key === 'support' ? 'rounded-b-lg' : ''}`}
                      >
                        {data.title}
                      </button>
                    ))}
                  </div>
                )}
              </div>
              
              <div className="mb-8">
                <div className="w-48 h-48">
                  <IndigoAnimation1 filter={activeFilter} />
                </div>
              </div>
              
              <p className="text-white text-lg leading-relaxed mt-64">
                {serviceData[activeFilter].description}
              </p>
            </div>

            {/* Right Panel */}
            <div className="lg:w-2/3">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6" ref={advancedServicesGridRef} style={{ gridTemplateAreas: '"terrestrial dataCentres" "networkServices wireless"' }}>
                {/* Terrestrial Services */}
                <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg p-6" style={{ gridArea: 'terrestrial' }}>
                  <h3 className="text-xl font-bold text-white mb-4">
                    {activeFilter === 'all' ? 'Terrestrial' : `${serviceData[activeFilter].title} - Terrestrial`}
                  </h3>
                  <ul className="space-y-2 text-white/90">
                    {currentServices.terrestrial.map((service, index) => (
                      <li key={index} className="flex items-center hover:text-yellow-400 hover:translate-x-2 transition-all duration-300 cursor-pointer group">
                        <div className="w-3 h-3 bg-white mr-3 transform rotate-45 hover:scale-125 group-hover:bg-yellow-400 transition-all duration-300 cursor-pointer"></div>
                        {service}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Data Centres Services */}
                <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg p-6" style={{ gridArea: 'dataCentres' }}>
                  <h3 className="text-xl font-bold text-white mb-4">
                    {activeFilter === 'all' ? 'Data Centres' : `${serviceData[activeFilter].title} - Data Centres`}
                  </h3>
                  <ul className="space-y-2 text-white/90">
                    {currentServices.dataCentres.map((service, index) => (
                      <li key={index} className="flex items-center hover:text-yellow-400 hover:translate-x-2 transition-all duration-300 cursor-pointer group">
                        <div className="w-3 h-3 bg-white mr-3 transform rotate-45 hover:scale-125 group-hover:bg-yellow-400 transition-all duration-300 cursor-pointer"></div>
                        {service}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Network Services */}
                <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg p-6" style={{ gridArea: 'networkServices' }}>
                  <h3 className="text-xl font-bold text-white mb-4">
                    {activeFilter === 'all' ? 'Network Services' : `${serviceData[activeFilter].title} - Network Services`}
                  </h3>
                  <ul className="space-y-2 text-white/90">
                    {currentServices.networkServices.map((service, index) => (
                      <li key={index} className="flex items-center hover:text-yellow-400 hover:translate-x-2 transition-all duration-300 cursor-pointer group">
                        <div className="w-3 h-3 bg-white mr-3 transform rotate-45 hover:scale-125 group-hover:bg-yellow-400 transition-all duration-300 cursor-pointer"></div>
                        {service}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Wireless Services */}
                <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg p-6" style={{ gridArea: 'wireless' }}>
                  <h3 className="text-xl font-bold text-white mb-4">
                    {activeFilter === 'all' ? 'Wireless' : `${serviceData[activeFilter].title} - Wireless`}
                  </h3>
                  <ul className="space-y-2 text-white/90">
                    {currentServices.wireless.map((service, index) => (
                      <li key={index} className="flex items-center hover:text-yellow-400 hover:translate-x-2 transition-all duration-300 cursor-pointer group">
                        <div className="w-3 h-3 bg-white mr-3 transform rotate-45 hover:scale-125 group-hover:bg-yellow-400 transition-all duration-300 cursor-pointer"></div>
                        {service}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
} 