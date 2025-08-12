'use client';

import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

interface AssetOrbProps {
  totalImages?: number;
  totalItems?: number;
  sphereRadius?: number;
  backgroundColor?: string;
}

const AssetOrb: React.FC<AssetOrbProps> = ({
  totalImages = 30,
  totalItems = 100,
  sphereRadius = 5,
  backgroundColor = '000000'
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const controlsRef = useRef<OrbitControls | null>(null);
  const animationIdRef = useRef<number | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Small delay to ensure container has dimensions
    const timer = setTimeout(() => {
      if (!containerRef.current) return;

      // Scene setup
      const scene = new THREE.Scene();
      sceneRef.current = scene;

      // Get container dimensions
      const container = containerRef.current;
      const containerWidth = container.clientWidth || 800; // Fallback dimensions
      const containerHeight = container.clientHeight || 600;

      // Camera setup
      const camera = new THREE.PerspectiveCamera(
        75,
        containerWidth / containerHeight,
        0.1,
        1000
      );
      cameraRef.current = camera;
      camera.position.z = 10;

      // Renderer setup
      const renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true,
        preserveDrawingBuffer: true,
        powerPreference: 'high-performance',
      });
      rendererRef.current = renderer;
      renderer.setSize(containerWidth, containerHeight);
      renderer.setClearColor(0x000000, 0); // Transparent background
      renderer.setPixelRatio(window.devicePixelRatio);

      containerRef.current.appendChild(renderer.domElement);

      // Controls setup
      const controls = new OrbitControls(camera, renderer.domElement);
      controlsRef.current = controls;
      controls.enableDamping = true;
      controls.dampingFactor = 0.05;
      controls.rotateSpeed = 1.2;
      controls.minDistance = 6;
      controls.maxDistance = 10;
      controls.enableZoom = true;
      controls.enablePan = false;

      // Constants
      const baseWidth = 1;
      const baseHeight = 0.6;
      let loadedCount = 0;

      // Helper functions
      const getRandomImagePath = () => {
        const imageNumber = Math.floor(Math.random() * totalImages) + 1;
        return `/frames/frame_${imageNumber.toString().padStart(4, '0')}.png`;
      };

      const createImagePlane = (texture: THREE.Texture) => {
        const imageAspect = texture.image.width / texture.image.height;
        let width = baseWidth;
        let height = baseHeight;

        if (imageAspect > 1) {
          height = width / imageAspect;
        } else {
          width = height * imageAspect;
        }

        return new THREE.PlaneGeometry(width, height);
      };

      const loadImageMesh = (phi: number, theta: number) => {
        const textureLoader = new THREE.TextureLoader();
        textureLoader.load(
          getRandomImagePath(),
          (texture) => {
            texture.generateMipmaps = false;
            texture.minFilter = THREE.LinearFilter;
            texture.magFilter = THREE.LinearFilter;

            const geometry = createImagePlane(texture);
            const material = new THREE.MeshBasicMaterial({
              map: texture,
              side: THREE.DoubleSide,
              transparent: false,
              depthWrite: true,
              depthTest: true,
            });

            const mesh = new THREE.Mesh(geometry, material);

            mesh.position.x = sphereRadius * Math.cos(theta) * Math.sin(phi);
            mesh.position.y = sphereRadius * Math.sin(theta) * Math.sin(phi);
            mesh.position.z = sphereRadius * Math.cos(phi);

            mesh.lookAt(0, 0, 0);
            mesh.rotateY(Math.PI);

            scene.add(mesh);

            loadedCount++;
            if (loadedCount === totalItems) {
              animate();
            }
          },
          undefined,
          (error) => console.error("Error loading texture:", error)
        );
      };

      const createSphere = () => {
        for (let i = 0; i < totalItems; i++) {
          const phi = Math.acos(-1 + (2 * i) / totalItems);
          const theta = Math.sqrt(totalItems * Math.PI) * phi;
          loadImageMesh(phi, theta);
        }
      };

      const animate = () => {
        animationIdRef.current = requestAnimationFrame(animate);
        controls.update();
        renderer.render(scene, camera);
      };

      // Handle container resize
      const handleResize = () => {
        const container = containerRef.current;
        if (container) {
          const width = container.clientWidth;
          const height = container.clientHeight;
          renderer.setSize(width, height);
          camera.aspect = width / height;
          camera.updateProjectionMatrix();
        }
      };

      // Use ResizeObserver for container size changes
      const resizeObserver = new ResizeObserver(handleResize);
      if (containerRef.current) {
        resizeObserver.observe(containerRef.current);
      }

      // Create the sphere
      createSphere();

      // Cleanup function for the inner scope
      const cleanup = () => {
        resizeObserver.disconnect();
        if (animationIdRef.current) {
          cancelAnimationFrame(animationIdRef.current);
        }
        if (containerRef.current && renderer.domElement) {
          containerRef.current.removeChild(renderer.domElement);
        }
        renderer.dispose();
      };

      // Store cleanup function for later use
      sceneRef.current = scene;
      rendererRef.current = renderer;
      controlsRef.current = controls;
    }, 100);

    // Cleanup timer and any existing scene
    return () => {
      clearTimeout(timer);
      if (animationIdRef.current) {
        cancelAnimationFrame(animationIdRef.current);
      }
      if (rendererRef.current) {
        rendererRef.current.dispose();
      }
    };
  }, [totalImages, totalItems, sphereRadius, backgroundColor]);

  return (
    <div className="relative w-full h-full overflow-hidden">
      {/* 3D Container */}
      <div ref={containerRef} className="w-full h-full" />
    </div>
  );
};

export default AssetOrb;
