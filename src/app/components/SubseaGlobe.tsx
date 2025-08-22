"use client";
import React, { useEffect, useRef } from "react";
import createGlobe from "cobe";

// Utility function to convert a hex color string to a normalized RGB array
const hexToRgbNormalized = (hex: string): [number, number, number] => {
  let r = 0, g = 0, b = 0;
  const cleanHex = hex.startsWith("#") ? hex.slice(1) : hex;

  if (cleanHex.length === 3) {
    r = parseInt(cleanHex[0] + cleanHex[0], 16);
    g = parseInt(cleanHex[1] + cleanHex[1], 16);
    b = parseInt(cleanHex[2] + cleanHex[2], 16);
  } else if (cleanHex.length === 6) {
    r = parseInt(cleanHex.substring(0, 2), 16);
    g = parseInt(cleanHex.substring(2, 4), 16);
    b = parseInt(cleanHex.substring(4, 6), 16);
  } else {
    console.warn(`Invalid hex color: ${hex}. Falling back to black.`);
    return [0, 0, 0];
  }

  return [r / 255, g / 255, b / 255];
};

interface GlobeProps {
  className?: string;
  theta?: number;
  dark?: number;
  scale?: number;
  diffuse?: number;
  mapSamples?: number;
  mapBrightness?: number;
  baseColor?: [number, number, number] | string;
  markerColor?: [number, number, number] | string;
  glowColor?: [number, number, number] | string;
}

const Globe: React.FC<GlobeProps> = ({
  className,
  theta = 0.25,
  dark = 0,
  scale = 1.1,
  diffuse = 1.2,
  mapSamples = 60000,
  mapBrightness = 10,
  baseColor = "#1A1A66",
  markerColor = "#FFC300",
  glowColor = "#1A1A66",
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const globeRef = useRef<any>(null);

  const phiRef = useRef(0);
  const thetaRef = useRef(theta);
  const isDragging = useRef(false);
  const lastMouseX = useRef(0);
  const lastMouseY = useRef(0);
  const autoRotateSpeed = 0.003;

  // Submarine cable markers data
  const submarineCables: Array<{ location: [number, number]; size: number }> = [
    // North Atlantic routes
    { location: [40.7, -74], size: 0.15 }, // New York
    { location: [51.5, -0.1], size: 0.15 }, // London
    { location: [48.8, 2.3], size: 0.12 }, // Paris
    { location: [52.3, 4.9], size: 0.12 }, // Amsterdam
    { location: [55.7, 12.6], size: 0.12 }, // Copenhagen
    { location: [59.3, 18.1], size: 0.12 }, // Stockholm
    
    // Pacific routes
    { location: [35, 139], size: 0.15 }, // Tokyo
    { location: [34, -118], size: 0.15 }, // Los Angeles
    { location: [37.8, -122.4], size: 0.12 }, // San Francisco
    { location: [1.3, 103.8], size: 0.12 }, // Singapore
    { location: [22.3, 114.2], size: 0.12 }, // Hong Kong
    { location: [37.6, 126.9], size: 0.12 }, // Seoul
    
    // Other major routes
    { location: [28.6, 77.2], size: 0.12 }, // Delhi
    { location: [19.1, 72.9], size: 0.12 }, // Mumbai
    { location: [25.2, 55.3], size: 0.12 }, // Dubai
    { location: [30.0, 31.2], size: 0.12 }, // Cairo
    { location: [-33.9, 151.2], size: 0.12 }, // Sydney
    { location: [-37.8, 145.0], size: 0.12 }, // Melbourne
    { location: [-23.6, -46.6], size: 0.12 }, // São Paulo
    { location: [19.4, -99.1], size: 0.12 }, // Mexico City
  ];

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const resolvedBaseColor: [number, number, number] =
      typeof baseColor === "string"
        ? hexToRgbNormalized(baseColor)
        : baseColor || [0.4, 0.6509, 1];

    const resolvedMarkerColor: [number, number, number] =
      typeof markerColor === "string"
        ? hexToRgbNormalized(markerColor)
        : markerColor || [1, 0, 0];

    const resolvedGlowColor: [number, number, number] =
      typeof glowColor === "string"
        ? hexToRgbNormalized(glowColor)
        : glowColor || [0.2745, 0.5765, 0.898];

    const initGlobe = () => {
      if (globeRef.current) {
        globeRef.current.destroy();
        globeRef.current = null;
      }

      const rect = canvas.getBoundingClientRect();
      const size = Math.min(rect.width, rect.height);
      const devicePixelRatio = window.devicePixelRatio || 1;
      const internalWidth = size * devicePixelRatio;
      const internalHeight = size * devicePixelRatio;

      canvas.width = internalWidth;
      canvas.height = internalHeight;

      globeRef.current = createGlobe(canvas, {
        devicePixelRatio: devicePixelRatio,
        width: internalWidth,
        height: internalHeight,
        phi: phiRef.current,
        theta: thetaRef.current,
        dark: dark,
        scale: scale,
        diffuse: diffuse,
        mapSamples: mapSamples,
        mapBrightness: mapBrightness,
        baseColor: resolvedBaseColor,
        markerColor: resolvedMarkerColor,
        glowColor: resolvedGlowColor,
        opacity: 1,
        offset: [0, 0],
        markers: [],
        onRender: (state: Record<string, any>) => {
          if (!isDragging.current) {
            phiRef.current += autoRotateSpeed;
          }
          state.phi = phiRef.current;
          state.theta = thetaRef.current;
        },
      });
    };

    const onMouseDown = (e: MouseEvent) => {
      isDragging.current = true;
      lastMouseX.current = e.clientX;
      lastMouseY.current = e.clientY;
      canvas.style.cursor = "grabbing";
    };

    const onMouseMove = (e: MouseEvent) => {
      if (isDragging.current) {
        const deltaX = e.clientX - lastMouseX.current;
        const deltaY = e.clientY - lastMouseY.current;
        const rotationSpeed = 0.005;

        phiRef.current += deltaX * rotationSpeed;
        thetaRef.current = Math.max(
          -Math.PI / 2,
          Math.min(Math.PI / 2, thetaRef.current - deltaY * rotationSpeed)
        );

        lastMouseX.current = e.clientX;
        lastMouseY.current = e.clientY;
      }
    };

    const onMouseUp = () => {
      isDragging.current = false;
      canvas.style.cursor = "grab";
    };

    const onMouseLeave = () => {
      if (isDragging.current) {
        isDragging.current = false;
        canvas.style.cursor = "grab";
      }
    };

    initGlobe();

    canvas.addEventListener("mousedown", onMouseDown);
    canvas.addEventListener("mousemove", onMouseMove);
    canvas.addEventListener("mouseup", onMouseUp);
    canvas.addEventListener("mouseleave", onMouseLeave);

    const handleResize = () => {
      initGlobe();
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      if (canvas) {
        canvas.removeEventListener("mousedown", onMouseDown);
        canvas.removeEventListener("mousemove", onMouseMove);
        canvas.removeEventListener("mouseup", onMouseUp);
        canvas.removeEventListener("mouseleave", onMouseLeave);
      }
      if (globeRef.current) {
        globeRef.current.destroy();
        globeRef.current = null;
      }
    };
  }, [
    theta,
    dark,
    scale,
    diffuse,
    mapSamples,
    mapBrightness,
    baseColor,
    markerColor,
    glowColor,
  ]);

  return (
    <div
      className={`flex items-center justify-center z-[10] mx-auto ${className || ''}`}
      style={{
        width: "auto",
        height: "auto",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
      }}
    >
      <canvas
        ref={canvasRef}
        style={{
          width: "25rem",
          height: "25rem",
          maxWidth: "100%",
          maxHeight: "100%",
          aspectRatio: "1",
          display: "block",
          cursor: "grab",
        }}
      />
    </div>
  );
};

export default Globe;
