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

export default function InteractiveMap() {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isZooming, setIsZooming] = useState(false); // Track zoom animation state
  const markersRef = useRef<L.CircleMarker[]>([]); // Store references to all markers

  // Load expanded state from localStorage on mount
  useEffect(() => {
    const savedState = localStorage.getItem('mapExpanded');
    if (savedState !== null) {
      setIsExpanded(JSON.parse(savedState));
    }
  }, []);

  // Save state to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('mapExpanded', JSON.stringify(isExpanded));
  }, [isExpanded]);

  // Function to remove all markers during animation
  const removeAllMarkers = () => {
    markersRef.current.forEach(marker => {
      marker.remove();
    });
    markersRef.current = [];
  };

  // Function to recreate all markers after animation
  const recreateAllMarkers = (map: L.Map, shouldFitBounds: boolean = true) => {
    // Create bounds to fit all markers
    const bounds = L.latLngBounds([]);

    // Add markers for each office with drop animation
    officeLocations.forEach((office, index) => {
      // Create custom circle marker
      const marker = L.circleMarker(office.coordinates, {
        radius: 8,
        fillColor: '#4f46e5', // Indigo color
        color: '#ffffff',
        weight: 2,
        opacity: 0, // Start invisible
        fillOpacity: 0, // Start invisible
      });

      // Create popup content
      const popupContent = `
        <div class="p-3">
          <h3 class="font-bold text-lg text-gray-900 mb-2">${office.name}</h3>
          <p class="text-gray-600 text-sm mb-2">${office.address}</p>
          ${office.phone ? `<p class="text-indigo-600 font-semibold text-sm">${office.phone}</p>` : ''}
        </div>
      `;

      marker.bindPopup(popupContent, {
        maxWidth: 300,
        className: 'custom-popup'
      });

      // Add hover effects (use lexical marker instead of `this` to satisfy TS)
      marker.on('mouseover', () => {
        marker.setRadius(12);
        marker.setStyle({ fillOpacity: 1 });
        // Show popup on hover
        marker.openPopup();
      });

      marker.on('mouseout', () => {
        marker.setRadius(8);
        marker.setStyle({ fillOpacity: 0.8 });
        // Hide popup when mouse leaves
        marker.closePopup();
      });

      // Add click event for auto-zoom (without popup)
      marker.on('click', () => {
        // Remove all markers immediately
        removeAllMarkers();
        
        // Close any open popup first
        marker.closePopup();
        
        // Smooth fly-to animation to the clicked location
        map.flyTo(office.coordinates, 12, {
          duration: 2, // 2 seconds smooth animation
          easeLinearity: 0.25
        });
        
        // Recreate all markers after animation completes
        setTimeout(() => {
          recreateAllMarkers(map, false); // Don't fit bounds, keep zoomed in
        }, 2100); // Slightly longer than animation duration
      });

      marker.addTo(map);
      bounds.extend(office.coordinates);
      
      // Store marker reference for later use
      markersRef.current.push(marker);

      // Add drop animation with staggered timing
      setTimeout(() => {
        marker.setStyle({
          opacity: 1,
          fillOpacity: 0.8
        });
        
        // Add bounce effect
        marker.setRadius(12);
        setTimeout(() => {
          marker.setRadius(8);
        }, 150);
      }, 200 + (index * 150)); // Stagger each marker by 150ms
    });

    // Only fit bounds if explicitly requested (for initial load)
    if (shouldFitBounds) {
      map.fitBounds(bounds, { padding: [20, 20] });
    }
  };

  // Function to initialize map with specific expanded state
  const initializeMapWithState = (expandedState: boolean) => {
    if (!mapRef.current) return;

    // Remove existing map if it exists
    if (mapInstanceRef.current) {
      mapInstanceRef.current.remove();
      mapInstanceRef.current = null;
    }
    
    // Clear markers array for new map
    markersRef.current = [];

    // Initialize map with the provided expanded state
    const map = L.map(mapRef.current, {
      center: [30, 0], // Center between all locations
      zoom: 2,
      zoomControl: true,
      scrollWheelZoom: expandedState, // Use the provided state
      doubleClickZoom: true,
      boxZoom: true,
      keyboard: true,
      dragging: true, // Keep dragging enabled in both states
      touchZoom: expandedState, // Use the provided state
    });

    // Add OpenStreetMap tiles
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors',
      maxZoom: 19,
    }).addTo(map);

    // Store map instance
    mapInstanceRef.current = map;
    
    // Create all markers using the recreation function
    recreateAllMarkers(map);
    
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
    initializeMapWithState(isExpanded);

    // Cleanup function
    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
      
      // Clear markers array for new map
      markersRef.current = [];
    };
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
      // Reinitialize map with new size and zoom controls using the new state
      initializeMapWithState(newExpandedState);
    }, 300); // Match CSS transition duration
  };

  return (
    <div className="relative w-full rounded-2xl overflow-hidden shadow-xl bg-[#0b0e1a] border border-white/10">
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
            // Fly back to overview showing all markers
            const bounds = L.latLngBounds(officeLocations.map(office => office.coordinates));
            mapInstanceRef.current.flyToBounds(bounds, { 
              padding: [20, 20],
              duration: 2,
              easeLinearity: 0.25
            });
          }
        }}
        className="absolute top-4 left-4 z-[9999] bg-white/90 hover:bg-white text-gray-800 rounded-full p-3 shadow-2xl border border-gray-200 transition-all duration-200 hover:scale-110"
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

      {/* Map Container */}
      <div 
        ref={mapRef} 
        className={`w-full transition-all duration-300 ease-in-out ${
          isExpanded ? 'min-h-[400px] h-[400px]' : 'min-h-[250px] h-[250px]'
        }`}
        style={{ 
          height: isExpanded ? '400px' : '250px',
          minHeight: isExpanded ? '400px' : '250px'
        }}
      />
    </div>
  );
}
