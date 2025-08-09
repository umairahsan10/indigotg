'use client';

import { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix for default markers in Leaflet with Next.js
delete (L.Icon.Default.prototype as { _getIconUrl?: unknown })._getIconUrl;
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

  useEffect(() => {
    if (typeof window === 'undefined' || !mapRef.current || mapInstanceRef.current) return;

    // Initialize map
    const map = L.map(mapRef.current, {
      center: [30, 0], // Center between all locations
      zoom: 2,
      zoomControl: true,
      scrollWheelZoom: true,
      doubleClickZoom: true,
      boxZoom: true,
      keyboard: true,
      dragging: true,
      touchZoom: true,
    });

    // Add OpenStreetMap tiles
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors',
      maxZoom: 19,
    }).addTo(map);

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
      });

      marker.on('mouseout', () => {
        marker.setRadius(8);
        marker.setStyle({ fillOpacity: 0.8 });
      });

      marker.addTo(map);
      bounds.extend(office.coordinates);

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

    // Fit map to show all markers with some padding
    map.fitBounds(bounds, { padding: [20, 20] });

    // Store map instance
    mapInstanceRef.current = map;

    // Add fade-in animation
    mapRef.current.style.opacity = '0';
    setTimeout(() => {
      if (mapRef.current) {
        mapRef.current.style.transition = 'opacity 0.8s ease-in-out';
        mapRef.current.style.opacity = '1';
      }
    }, 100);

    // Cleanup function
    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  return (
    <div className="w-full h-full min-h-[400px] rounded-2xl overflow-hidden shadow-xl bg-[#0b0e1a] border border-white/10">
      <div 
        ref={mapRef} 
        className="w-full h-full min-h-[400px]"
        style={{ opacity: 0 }}
      />
    </div>
  );
}
