'use client';

import { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix for default markers in Leaflet with Next.js
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// Custom hook for counting animation
const useCountAnimation = (endValue: number, duration: number = 2000, delay: number = 0) => {
  const [count, setCount] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);

  const startAnimation = () => {
    if (hasStarted) return; // Prevent multiple starts
    
    setHasStarted(true);
    setIsAnimating(true);
    const startTime = Date.now();
    
    const animate = () => {
      const currentTime = Date.now();
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Easing function for smooth animation
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      const currentCount = Math.floor(endValue * easeOutQuart);
      
      setCount(currentCount);
      
      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setCount(endValue);
        setIsAnimating(false);
      }
    };
    
    setTimeout(() => {
      requestAnimationFrame(animate);
    }, delay);
  };

  return { count, isAnimating, startAnimation };
};

// Custom hook for support animation (24×7×365)
const useSupportAnimation = (duration: number = 2000, delay: number = 0) => {
  const [supportText, setSupportText] = useState("0×0×0");
  const [isAnimating, setIsAnimating] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);

  const startAnimation = () => {
    if (hasStarted) return; // Prevent multiple starts
    
    setHasStarted(true);
    setIsAnimating(true);
    const startTime = Date.now();
    
    const animate = () => {
      const currentTime = Date.now();
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Easing function for smooth animation
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      
      // Animate each number separately
      const hours = Math.floor(24 * easeOutQuart);
      const days = Math.floor(7 * easeOutQuart);
      const year = Math.floor(365 * easeOutQuart);
      
      setSupportText(`${hours}×${days}×${year}`);
      
      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setSupportText("24×7×365");
        setIsAnimating(false);
      }
    };
    
    setTimeout(() => {
      requestAnimationFrame(animate);
    }, delay);
  };

  return { supportText, isAnimating, startAnimation };
};

interface OfficeLocation {
  name: string;
  address: string;
  phone?: string;
  coordinates: [number, number];
}

const officeLocations: OfficeLocation[] = [
  {
    name: "Global HQ - United Kingdom",
    address: "102, Wales One Business Park, Magor, Monmouthshire NP26 3DG",
    phone: "+44 (0)1291 435500",
    coordinates: [51.5795, -2.8316] // Magor, Monmouthshire
  },
  {
    name: "North America",
    address: "17th Street, 7th Floor, Indigo Subsea Suite, Denver, CO 80202",
    phone: "+1 719-408-8847",
    coordinates: [39.7392, -104.9903] // Denver, CO
  },
  {
    name: "United States",
    address: "230 Swartz Road, Lexington, South Carolina 29072",
    phone: "+1 719-408-8847",
    coordinates: [33.9815, -81.2362] // Lexington, SC
  },
  {
    name: "Ireland",
    address: "Houston Hall, Ballycummin Avenue, Raheen Business Park, Limerick V94PKF1",
    phone: "+353 (0)61 306688",
    coordinates: [52.6639, -8.6237] // Limerick
  },
  {
    name: "France",
    address: "9 Rue des Colonnes, 75002 Paris, France",
    coordinates: [48.8566, 2.3522] // Paris
  },
  {
    name: "Netherlands",
    address: "Prof JH Bavincklaan 7, 1183AT Amstelveen, Netherlands",
    coordinates: [52.3105, 4.7683] // Amstelveen
  },
  {
    name: "Germany",
    address: "c/o Steuerkanzlei Gundisch, Dorn Partnerschaft mbB, Bockenheimer Anlage 2, 60322 Frankfurt am Main",
    coordinates: [50.1109, 8.6821] // Frankfurt
  },
  {
    name: "Asia HQ - Singapore",
    address: "9 Raffles Place, #26-01 Republic Plaza, Singapore 048619",
    phone: "+852 9151 9885",
    coordinates: [1.2841, 103.8516] // Singapore
  }
];

  // Helpers: choose zoom levels depending on viewport and map state
  const getDefaultZoom = () => {
    if (typeof window === 'undefined') return 2;
    return 2; // Use zoom level 2 universally
  };

  const getExpandedZoom = () => {
    if (typeof window === 'undefined') return 3;
    return window.innerWidth < 768 ? 3 : 2; // expanded view
  };

export default function InteractiveMap() {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isZooming, setIsZooming] = useState(false); // Track zoom animation state
  const markersRef = useRef<L.CircleMarker[]>([]); // Store references to all markers
  // State for map type (street or satellite)
  const [mapType, setMapType] = useState<'street' | 'satellite'>('satellite');
  const tileLayersRef = useRef<{ street: L.TileLayer | null; satellite: L.TileLayer | null }>({ street: null, satellite: null });

  // Counting animations for KPI numbers
  const supportAnimation = useSupportAnimation(2000, 0);
  const kpiCount = useCountAnimation(100, 2000, 0);
  const sitesCount = useCountAnimation(20000, 2000, 0);
  const countriesCount = useCountAnimation(90, 2000, 0);

  // Intersection observer to trigger animations when component comes into view
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Start all animations together when component comes into view
            supportAnimation.startAnimation();
            kpiCount.startAnimation();
            sitesCount.startAnimation();
            countriesCount.startAnimation();
            observer.disconnect(); // Only trigger once
          }
        });
      },
      {
        threshold: 0.3, // Trigger when 30% of the component is visible
        rootMargin: '0px 0px -100px 0px' // Trigger slightly before fully in view
      }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, [supportAnimation, kpiCount, sitesCount, countriesCount]);

  // Load expanded state from localStorage on mount
  useEffect(() => {
    const savedState = localStorage.getItem('mapExpanded');
    if (savedState !== null) {
      setIsExpanded(JSON.parse(savedState));
    }
    
    // Load map type preference
    const savedMapType = localStorage.getItem('mapType');
    if (savedMapType === 'satellite') {
      setMapType('satellite');
    }
  }, []);

  // Save state to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('mapExpanded', JSON.stringify(isExpanded));
  }, [isExpanded]);

  // Save map type to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('mapType', mapType);
  }, [mapType]);

  // Function to remove all markers during animation
  const removeAllMarkers = () => {
    markersRef.current.forEach(marker => {
      marker.remove();
    });
    markersRef.current = [];
  };

  // Function to recreate all markers after animation
  const recreateAllMarkers = (map: L.Map, shouldFitBounds: boolean = true, forceZoom?: number) => {
    // Create bounds to fit all markers
    const bounds = L.latLngBounds([]);

    // Create marker for each office location
    officeLocations.forEach((office) => {
      const marker = L.circleMarker(office.coordinates, {
        radius: 8,
        fillColor: '#4f46e5',
        color: '#ffffff',
        weight: 2,
        opacity: 1,
        fillOpacity: 0.8,
      });

      // Create popup content
      const popupContent = document.createElement('div');
      popupContent.className = 'p-1';
      popupContent.innerHTML = `
        <h3 class="text-base font-semibold text-gray-800 mb-1">${office.name}</h3>
        <p class="text-xs text-gray-600 mb-1">${office.address}</p>
        ${office.phone ? `<p class="text-xs text-gray-600 mb-1">${office.phone}</p>` : ''}
      `;

      // Add hover events to popup content to keep it open
      popupContent.addEventListener('mouseenter', () => {
        marker.openPopup();
      });

      popupContent.addEventListener('mouseleave', () => {
        // Only close if cursor is not over the marker
        setTimeout(() => {
          if (!marker.getElement()?.matches(':hover')) {
            marker.closePopup();
          }
        }, 100);
      });

      // Bind popup to marker
      marker.bindPopup(popupContent, {
        maxWidth: 200,
        closeButton: false,
        autoClose: false,
        closeOnClick: false,
      });

      // Store marker reference
      markersRef.current.push(marker);

      // Add hover events to marker
      marker.on('mouseover', () => {
        marker.openPopup();
      });

      marker.on('mouseout', () => {
        // Only close if cursor is not over the popup
        setTimeout(() => {
          const popupElement = marker.getPopup()?.getElement();
          if (!popupElement?.matches(':hover')) {
            marker.closePopup();
          }
        }, 100);
      });

      // Add click event to zoom to location
      marker.on('click', () => {
        // Remove all markers during zoom animation
        removeAllMarkers();
        
        // Fly to the clicked location
        map.flyTo(office.coordinates, 12, { 
          duration: 2, 
          easeLinearity: 0.25 
        });
        
        // After animation, recreate markers without zooming out
        setTimeout(() => {
          recreateAllMarkers(map, false);
        }, 2000);
      });

      // Add marker to map
      map.addLayer(marker);
      
      // Extend bounds with this marker's coordinates
      bounds.extend(office.coordinates);
    });

    // Only fit bounds if explicitly requested (for initial load) and no force zoom
    if (shouldFitBounds && bounds.isValid() && !forceZoom) {
      map.fitBounds(bounds, { padding: [50, 50] });
      // Ensure the zoom level isn’t lower than our desired default (helps narrow screens)
      const minZoom = getDefaultZoom();
      if (map.getZoom() < minZoom) {
        map.setZoom(minZoom);
      }
    }
    
    // If force zoom is specified, set the zoom level
    if (forceZoom !== undefined) {
      map.setView([25, 0], forceZoom);
    }
  };

  // Function to initialize map with specific expanded state
  const initializeMapWithState = (expandedState: boolean, customZoom?: number) => {
    if (!mapRef.current) return;

    // Remove existing map if it exists
    if (mapInstanceRef.current) {
      mapInstanceRef.current.remove();
      mapInstanceRef.current = null;
    }
    
    // Clear markers array for new map
    markersRef.current = [];

    // Calculate default zoom based on viewport
    const defaultZoom = getDefaultZoom();

    // Initialize map with the provided expanded state
    const map = L.map(mapRef.current, {
      center: [25, 0], // Center between all locations, slightly lower
      zoom: customZoom ?? defaultZoom,
      minZoom: defaultZoom,
      zoomControl: true,
      attributionControl: false, // Disable attribution control completely
      scrollWheelZoom: expandedState, // Use the provided state
      doubleClickZoom: true,
      boxZoom: true,
      keyboard: true,
      dragging: true, // Keep dragging enabled in both states
      touchZoom: expandedState, // Use the provided state
    });

    // Create both tile layers
    const streetLayer = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '',
      maxZoom: 19,
    });
    
    const satelliteLayer = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
      attribution: '',
      maxZoom: 19,
    });
    
    // Store tile layer references
    tileLayersRef.current.street = streetLayer;
    tileLayersRef.current.satellite = satelliteLayer;
    
    // Show the appropriate layer based on current preference
    if (mapType === 'satellite') {
      satelliteLayer.addTo(map);
    } else {
      streetLayer.addTo(map);
    }

    // Store map instance
    mapInstanceRef.current = map;

    // Create all markers using the recreation function
    recreateAllMarkers(map, true, customZoom);
    
    // Immediately set zoom controls based on the provided state
    if (expandedState) {
      map.scrollWheelZoom.enable();
      map.touchZoom.enable();
      console.log('Map initialized with ENABLED zoom controls (expanded)');
    } else {
      map.scrollWheelZoom.disable();
      map.touchZoom.disable();
      console.log('Map initialized with DISABLED zoom controls (minimized)');
    }
  };

  // Initialize map on mount
  useEffect(() => {
    // Small delay to ensure container is properly sized
    const timer = setTimeout(() => {
      initializeMapWithState(isExpanded);
    }, 50);

    // Cleanup function
    return () => {
      clearTimeout(timer);
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
      
      // Clear markers array for new map
      markersRef.current = [];
    };
  }, []);

  // Trigger map resize when component mounts to ensure proper rendering
  useEffect(() => {
    if (mapInstanceRef.current) {
      // Small delay to ensure DOM is ready
      setTimeout(() => {
        mapInstanceRef.current?.invalidateSize();
      }, 100);
    }
  }, []);

  // Handle window resize to ensure map stays responsive
  useEffect(() => {
    const handleResize = () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.invalidateSize();
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Update map zoom controls when expanded state changes
  useEffect(() => {
    // Add a small delay to ensure map is ready
    const timer = setTimeout(() => {
      if (mapInstanceRef.current) {
        // Update scroll wheel zoom
        if (isExpanded) {
          mapInstanceRef.current.scrollWheelZoom.enable();
          mapInstanceRef.current.touchZoom.enable();
          console.log('Map zoom controls ENABLED - expanded state');
        } else {
          mapInstanceRef.current.scrollWheelZoom.disable();
          mapInstanceRef.current.touchZoom.disable();
          console.log('Map zoom controls DISABLED - minimized state');
        }
      } else {
        console.log('Map instance not ready yet');
      }
    }, 100);
    
    return () => clearTimeout(timer);
  }, [isExpanded]);

  const toggleMapSize = () => {
    if (isAnimating) return; // Prevent rapid clicking during animation
    
    setIsAnimating(true);
    const newExpandedState = !isExpanded;
    setIsExpanded(newExpandedState);
    
    // Wait for CSS transition to complete, then reinitialize map
    setTimeout(() => {
      setIsAnimating(false);
      // Reinitialize map with appropriate zoom
      initializeMapWithState(
        newExpandedState,
        newExpandedState ? getExpandedZoom() : getDefaultZoom()
      );
    }, 300); // Match CSS transition duration
  };

  // Function to toggle between street and satellite view
  const toggleMapType = () => {
    if (!mapInstanceRef.current) return;
    
    const newMapType = mapType === 'street' ? 'satellite' : 'street';
    setMapType(newMapType);
    
    // Switch tile layers
    if (newMapType === 'satellite') {
      // Show satellite, hide street
      if (tileLayersRef.current.street) {
        tileLayersRef.current.street.remove();
      }
      if (tileLayersRef.current.satellite) {
        tileLayersRef.current.satellite.addTo(mapInstanceRef.current);
      }
    } else {
      // Show street, hide satellite
      if (tileLayersRef.current.satellite) {
        tileLayersRef.current.satellite.remove();
      }
      if (tileLayersRef.current.street) {
        tileLayersRef.current.street.addTo(mapInstanceRef.current);
      }
    }
  };

  return (
    <div ref={containerRef} className="w-full bg-white rounded-2xl overflow-hidden shadow-xl">
      <div className="flex flex-col lg:flex-row min-h-[500px] items-center">
                 {/* Left Column - Text Content */}
         <div className="lg:w-1/2 p-8 lg:p-12 flex flex-col justify-center">
           {/* Main paragraph */}
           <p className="text-lg lg:text-xl mb-12 leading-relaxed" style={{ color: '#140A8E', fontFamily: 'fk grotesk, sans-serif' }}>
             With a global footprint in over 90 countries and as partner to most of the world's biggest companies, we empower our customers to adapt and scale at pace. Our clients trust us to deliver with expertise, wherever they are in the world, and whatever technology they need.
           </p>
           
           {/* KPI Grid */}
           <div className="grid grid-cols-2 gap-8">
             <div className="text-center">
               <div className="mb-2" style={{ color: '#140A8E', fontFamily: 'fk grotesk, sans-serif', fontSize: '1.88rem', lineHeight: '2.13rem' }}>
                 {supportAnimation.supportText}
               </div>
               <div className="text-sm lg:text-base uppercase tracking-wide font-medium" style={{ color: '#140A8E', fontFamily: 'fk grotesk, sans-serif' }}>Support</div>
             </div>
             <div className="text-center">
               <div className="mb-2" style={{ color: '#140A8E', fontFamily: 'fk grotesk, sans-serif', fontSize: '1.88rem', lineHeight: '2.13rem' }}>
                 {kpiCount.count}%
               </div>
               <div className="text-sm lg:text-base uppercase tracking-wide font-medium" style={{ color: '#140A8E', fontFamily: 'fk grotesk, sans-serif' }}>KPI Performance</div>
             </div>
             <div className="text-center">
               <div className="mb-2" style={{ color: '#140A8E', fontFamily: 'fk grotesk, sans-serif', fontSize: '1.88rem', lineHeight: '2.13rem' }}>
                 {sitesCount.count.toLocaleString()}+
               </div>
               <div className="text-sm lg:text-base uppercase tracking-wide font-medium" style={{ color: '#140A8E', fontFamily: 'fk grotesk, sans-serif' }}>Customer Sites</div>
             </div>
             <div className="text-center">
               <div className="mb-2" style={{ color: '#140A8E', fontFamily: 'fk grotesk, sans-serif', fontSize: '1.88rem', lineHeight: '2.13rem' }}>
                 {countriesCount.count}+
               </div>
               <div className="text-sm lg:text-base uppercase tracking-wide font-medium" style={{ color: '#140A8E', fontFamily: 'fk grotesk, sans-serif' }}>Countries</div>
             </div>
           </div>
        </div>

        {/* Right Column - Map */}
        {/* On mobile (below lg) we use a shorter fixed height that scales with the screen, */}
        {/* while keeping the original behaviour for larger view-ports. */}
        {/* Map column – give it a responsive height on small screens and full height on desktop */}
        <div
          className={`w-full lg:w-1/2 relative flex items-center transition-all duration-300 ease-in-out ${
            isExpanded ? 'h-[400px]' : 'h-[250px]'
          } lg:h-full`}
        >
          <div className="relative w-full h-full rounded-2xl overflow-hidden bg-[#0b0e1a] border border-white/10">
            {/* Expand/Collapse Button */}
            <button
              onClick={toggleMapSize}
              disabled={isAnimating}
              className="absolute top-4 right-4 z-[9999] bg-indigo-600 hover:bg-indigo-700 text-white rounded-full p-3 shadow-2xl border-2 border-white/20 transition-all duration-200 hover:scale-110 disabled:opacity-50 disabled:cursor-not-allowed"
              title={isExpanded ? "Minimize Map" : "Expand Map"}
              style={{ 
                zIndex: 9999,
                position: 'absolute',
                pointerEvents: 'auto'
              }}
            >
              {isExpanded ? (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                </svg>
              )}
            </button>

            {/* Back to Overview Button */}
            <button
              onClick={() => {
                if (mapInstanceRef.current) {
                  // Fly back to overview with zoom level 3
                  mapInstanceRef.current.setView([25, 0], getDefaultZoom(), { 
                    duration: 2,
                    easeLinearity: 0.25
                  });
                }
              }}
              className="absolute bottom-4 left-4 z-[9999] bg-white/90 hover:bg-white text-gray-800 rounded-full p-3 shadow-2xl border border-gray-200 transition-all duration-200 hover:scale-110"
              title="Back to Overview"
              style={{ 
                zIndex: 9999,
                position: 'absolute',
                pointerEvents: 'auto'
              }}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
              </svg>
            </button>

            {/* Map Type Toggle Button */}
            <button
              onClick={toggleMapType}
              className="absolute bottom-4 right-4 z-[9999] bg-white/90 hover:bg-white text-gray-800 rounded-full p-3 shadow-2xl border border-gray-200 transition-all duration-200 hover:scale-110"
              title={mapType === 'street' ? 'Switch to Satellite View' : 'Switch to Street View'}
              style={{ 
                zIndex: 9999,
                position: 'absolute',
                pointerEvents: 'auto'
              }}
            >
              {mapType === 'street' ? (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                </svg>
              ) : (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4-2m-4 2V5m-4 2l4-2m-4 2v12" />
                </svg>
              )}
            </button>

            {/* Map Container */}
            <div
              ref={mapRef}
              /* Adjust height on mobile when expanded similar to OfficeMap */
              className={`w-full h-full transition-all duration-300 ease-in-out lg:aspect-auto ${
                isExpanded ? 'lg:min-h-[500px]' : 'lg:min-h-[400px]'
              }`}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
