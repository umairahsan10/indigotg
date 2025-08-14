import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

// Earth texture URLs - using only essential textures
const TEXTURES = {
  earthLights: '/textures/03_earthlights1k1.jpg',
  earthCloudMap: '/textures/04_earthcloudmap.jpg',
  earthCloudMapTrans: '/textures/05_earthcloudmaptrans.jpg'
};

// High-quality external textures as backup
const EXTERNAL_TEXTURES = {
  earthLights: 'https://raw.githubusercontent.com/mrdoob/three.js/dev/examples/textures/planets/earth_lights_2048.jpg',
  earthCloudMap: 'https://raw.githubusercontent.com/mrdoob/three.js/dev/examples/textures/planets/earth_clouds_2048.png', // Higher resolution
  earthCloudMapTrans: 'https://raw.githubusercontent.com/mrdoob/three.js/dev/examples/textures/planets/earth_clouds_2048.png' // Higher resolution
};

// Network connection data for networking effect
// const NETWORK_DATA = [
//   // Original connections
//   { from: { lat: 40.7128, lon: -74.0060, name: 'New York' }, to: { lat: 51.5074, lon: -0.1278, name: 'London' }, type: 'Fiber' },
//   { from: { lat: 40.7128, lon: -74.0060, name: 'New York' }, to: { lat: 35.6762, lon: 139.6503, name: 'Tokyo' }, type: 'Satellite' },
//   { from: { lat: 51.5074, lon: -0.1278, name: 'London' }, to: { lat: 35.6762, lon: 139.6503, name: 'Tokyo' }, type: 'Fiber' },
//   { from: { lat: 35.6762, lon: 139.6503, name: 'Tokyo' }, to: { lat: 22.3193, lon: 114.1694, name: 'Hong Kong' }, type: 'Fiber' },
//   { from: { lat: 22.3193, lon: 114.1694, name: 'Hong Kong' }, to: { lat: 1.3521, lon: 103.8198, name: 'Singapore' }, type: 'Fiber' },
//   { from: { lat: 1.3521, lon: 103.8198, name: 'Singapore' }, to: { lat: -33.8688, lon: 151.2093, name: 'Sydney' }, type: 'Satellite' },
//   { from: { lat: -33.8688, lon: 151.2093, name: 'Sydney' }, to: { lat: -23.5505, lon: -46.6333, name: 'São Paulo' }, type: 'Satellite' },
//   { from: { lat: -23.5505, lon: -46.6333, name: 'São Paulo' }, to: { lat: 40.7128, lon: -74.0060, name: 'New York' }, type: 'Fiber' },
//   { from: { lat: 51.5074, lon: -0.1278, name: 'London' }, to: { lat: 25.2048, lon: 55.2708, name: 'Dubai' }, type: 'Fiber' },
//   { from: { lat: 25.2048, lon: 55.2708, name: 'Dubai' }, to: { lat: 19.0760, lon: 72.8777, name: 'Mumbai' }, type: 'Fiber' },
//   { from: { lat: 19.0760, lon: 72.8777, name: 'Mumbai' }, to: { lat: 35.6762, lon: 139.6503, name: 'Tokyo' }, type: 'Fiber' },
//   { from: { lat: 40.7128, lon: -74.0060, name: 'New York' }, to: { lat: 37.7749, lon: -122.4194, name: 'San Francisco' }, type: 'Fiber' },
//   { from: { lat: 37.7749, lon: -122.4194, name: 'San Francisco' }, to: { lat: 35.6762, lon: 139.6503, name: 'Tokyo' }, type: 'Satellite' },
//   { from: { lat: 51.5074, lon: -0.1278, name: 'London' }, to: { lat: 48.8566, lon: 2.3522, name: 'Paris' }, type: 'Fiber' },
//   { from: { lat: 48.8566, lon: 2.3522, name: 'Paris' }, to: { lat: 55.7558, lon: 37.6176, name: 'Moscow' }, type: 'Fiber' },
//   { from: { lat: 55.7558, lon: 37.6176, name: 'Moscow' }, to: { lat: 39.9042, lon: 116.4074, name: 'Beijing' }, type: 'Fiber' },
//   { from: { lat: 39.9042, lon: 116.4074, name: 'Beijing' }, to: { lat: 35.6762, lon: 139.6503, name: 'Tokyo' }, type: 'Fiber' },
  
//   // Additional North American connections
//   { from: { lat: 40.7128, lon: -74.0060, name: 'New York' }, to: { lat: 43.6532, lon: -79.3832, name: 'Toronto' }, type: 'Fiber' },
//   { from: { lat: 40.7128, lon: -74.0060, name: 'New York' }, to: { lat: 19.4326, lon: -99.1332, name: 'Mexico City' }, type: 'Fiber' },
//   { from: { lat: 37.7749, lon: -122.4194, name: 'San Francisco' }, to: { lat: 49.2827, lon: -123.1207, name: 'Vancouver' }, type: 'Fiber' },
//   { from: { lat: 37.7749, lon: -122.4194, name: 'San Francisco' }, to: { lat: 32.7157, lon: -117.1611, name: 'San Diego' }, type: 'Fiber' },
//   { from: { lat: 40.7128, lon: -74.0060, name: 'New York' }, to: { lat: 25.7617, lon: -80.1918, name: 'Miami' }, type: 'Fiber' },
//   { from: { lat: 37.7749, lon: -122.4194, name: 'San Francisco' }, to: { lat: 34.0522, lon: -118.2437, name: 'Los Angeles' }, type: 'Fiber' },
  
//   // Additional European connections
//   { from: { lat: 51.5074, lon: -0.1278, name: 'London' }, to: { lat: 52.5200, lon: 13.4050, name: 'Berlin' }, type: 'Fiber' },
//   { from: { lat: 51.5074, lon: -0.1278, name: 'London' }, to: { lat: 41.9028, lon: 12.4964, name: 'Rome' }, type: 'Fiber' },
//   { from: { lat: 48.8566, lon: 2.3522, name: 'Paris' }, to: { lat: 40.4168, lon: -3.7038, name: 'Madrid' }, type: 'Fiber' },
//   { from: { lat: 48.8566, lon: 2.3522, name: 'Paris' }, to: { lat: 52.3676, lon: 4.9041, name: 'Amsterdam' }, type: 'Fiber' },
//   { from: { lat: 55.7558, lon: 37.6176, name: 'Moscow' }, to: { lat: 59.3293, lon: 18.0686, name: 'Stockholm' }, type: 'Fiber' },
//   { from: { lat: 55.7558, lon: 37.6176, name: 'Moscow' }, to: { lat: 50.0755, lon: 14.4378, name: 'Prague' }, type: 'Fiber' },
  
//   // Additional Asian connections
//   { from: { lat: 35.6762, lon: 139.6503, name: 'Tokyo' }, to: { lat: 37.5665, lon: 126.9780, name: 'Seoul' }, type: 'Fiber' },
//   { from: { lat: 35.6762, lon: 139.6503, name: 'Tokyo' }, to: { lat: 31.2304, lon: 121.4737, name: 'Shanghai' }, type: 'Fiber' },
//   { from: { lat: 22.3193, lon: 114.1694, name: 'Hong Kong' }, to: { lat: 23.1291, lon: 113.2644, name: 'Guangzhou' }, type: 'Fiber' },
//   { from: { lat: 22.3193, lon: 114.1694, name: 'Hong Kong' }, to: { lat: 25.0330, lon: 121.5654, name: 'Taipei' }, type: 'Fiber' },
//   { from: { lat: 19.0760, lon: 72.8777, name: 'Mumbai' }, to: { lat: 28.6139, lon: 77.2090, name: 'New Delhi' }, type: 'Fiber' },
//   { from: { lat: 19.0760, lon: 72.8777, name: 'Mumbai' }, to: { lat: 12.9716, lon: 77.5946, name: 'Bangalore' }, type: 'Fiber' },
//   { from: { lat: 39.9042, lon: 116.4074, name: 'Beijing' }, to: { lat: 36.1699, lon: -115.1398, name: 'Las Vegas' }, type: 'Satellite' },
  
//   // Additional Middle East and Africa connections
//   { from: { lat: 25.2048, lon: 55.2708, name: 'Dubai' }, to: { lat: 30.0444, lon: 31.2357, name: 'Cairo' }, type: 'Fiber' },
//   { from: { lat: 25.2048, lon: 55.2708, name: 'Dubai' }, to: { lat: 24.7136, lon: 46.6753, name: 'Riyadh' }, type: 'Fiber' },
//   { from: { lat: 30.0444, lon: 31.2357, name: 'Cairo' }, to: { lat: -1.2921, lon: 36.8219, name: 'Nairobi' }, type: 'Fiber' },
//   { from: { lat: -1.2921, lon: 36.8219, name: 'Nairobi' }, to: { lat: -26.2041, lon: 28.0473, name: 'Johannesburg' }, type: 'Fiber' },
//   { from: { lat: -26.2041, lon: 28.0473, name: 'Johannesburg' }, to: { lat: -33.8688, lon: 151.2093, name: 'Sydney' }, type: 'Satellite' },
  
//   // Additional South American connections
//   { from: { lat: -23.5505, lon: -46.6333, name: 'São Paulo' }, to: { lat: -34.6118, lon: -58.3960, name: 'Buenos Aires' }, type: 'Fiber' },
//   { from: { lat: -23.5505, lon: -46.6333, name: 'São Paulo' }, to: { lat: -12.0464, lon: -77.0428, name: 'Lima' }, type: 'Fiber' },
//   { from: { lat: -34.6118, lon: -58.3960, name: 'Buenos Aires' }, to: { lat: -33.4489, lon: -70.6693, name: 'Santiago' }, type: 'Fiber' },
  
//   // Additional Oceania connections
//   { from: { lat: -33.8688, lon: 151.2093, name: 'Sydney' }, to: { lat: -37.8136, lon: 144.9631, name: 'Melbourne' }, type: 'Fiber' },
//   { from: { lat: -33.8688, lon: 151.2093, name: 'Sydney' }, to: { lat: -31.9505, lon: 115.8605, name: 'Perth' }, type: 'Fiber' },
//   { from: { lat: -37.8136, lon: 144.9631, name: 'Melbourne' }, to: { lat: -41.2866, lon: 174.7756, name: 'Wellington' }, type: 'Satellite' },
  
//   // Cross-continental satellite links
//   { from: { lat: 40.7128, lon: -74.0060, name: 'New York' }, to: { lat: -1.2921, lon: 36.8219, name: 'Nairobi' }, type: 'Satellite' },
//   { from: { lat: 51.5074, lon: -0.1278, name: 'London' }, to: { lat: -33.8688, lon: 151.2093, name: 'Sydney' }, type: 'Satellite' },
//   { from: { lat: 35.6762, lon: 139.6503, name: 'Tokyo' }, to: { lat: -23.5505, lon: -46.6333, name: 'São Paulo' }, type: 'Satellite' },
//   { from: { lat: 25.2048, lon: 55.2708, name: 'Dubai' }, to: { lat: 37.7749, lon: -122.4194, name: 'San Francisco' }, type: 'Satellite' },
  
//   // Regional hub connections
//   { from: { lat: 22.3193, lon: 114.1694, name: 'Hong Kong' }, to: { lat: 13.7563, lon: 100.5018, name: 'Bangkok' }, type: 'Fiber' },
//   { from: { lat: 13.7563, lon: 100.5018, name: 'Bangkok' }, to: { lat: 14.5995, lon: 120.9842, name: 'Manila' }, type: 'Fiber' },
//   { from: { lat: 14.5995, lon: 120.9842, name: 'Manila' }, to: { lat: 1.3521, lon: 103.8198, name: 'Singapore' }, type: 'Fiber' },
//   { from: { lat: 1.3521, lon: 103.8198, name: 'Singapore' }, to: { lat: -6.2088, lon: 106.8456, name: 'Jakarta' }, type: 'Fiber' },
//   { from: { lat: -6.2088, lon: 106.8456, name: 'Jakarta' }, to: { lat: 14.5995, lon: 120.9842, name: 'Manila' }, type: 'Fiber' }
// ];

// Enhanced starfield generator function for cinematic space environment
const getStarfield = ({ numStars = 500 } = {}) => {
  function randomSpherePoint() {
    const radius = Math.random() * 40 + 30; // Increased distance for more depth
    const u = Math.random();
    const v = Math.random();
    const theta = 2 * Math.PI * u;
    const phi = Math.acos(2 * v - 1);
    let x = radius * Math.sin(phi) * Math.cos(theta);
    let y = radius * Math.sin(phi) * Math.sin(theta);
    let z = radius * Math.cos(phi);

    return {
      pos: new THREE.Vector3(x, y, z),
      hue: 0.6 + Math.random() * 0.2 - 0.1, // Slight hue variation
      minDist: radius,
    };
  }
  const verts = [];
  const colors = [];
  const sizes = [];
  const positions = [];
  let col;
  
  for (let i = 0; i < numStars; i += 1) {
    let p = randomSpherePoint();
    const { pos, hue } = p;
    positions.push(p);
    
    // Create more realistic star colors (blue-white, yellow-white, red)
    const starType = Math.random();
    if (starType < 0.1) {
      // Blue giants (rare, bright)
      col = new THREE.Color().setHSL(0.67, 0.8, 0.9);
      sizes.push(Math.random() * 1.5 + 1.0);
    } else if (starType < 0.3) {
      // Red stars (common, dim)
      col = new THREE.Color().setHSL(0.05, 0.6, 0.6);
      sizes.push(Math.random() * 0.5 + 0.3);
    } else if (starType < 0.6) {
      // Yellow stars like our sun
      col = new THREE.Color().setHSL(0.12, 0.4, 0.8);
      sizes.push(Math.random() * 0.8 + 0.4);
    } else {
      // White/blue-white stars (most common)
      col = new THREE.Color().setHSL(0.6, 0.1, Math.random() * 0.4 + 0.7);
      sizes.push(Math.random() * 0.6 + 0.2);
    }
    
    verts.push(pos.x, pos.y, pos.z);
    colors.push(col.r, col.g, col.b);
  }
  
  const geo = new THREE.BufferGeometry();
  geo.setAttribute("position", new THREE.Float32BufferAttribute(verts, 3));
  geo.setAttribute("color", new THREE.Float32BufferAttribute(colors, 3));
  geo.setAttribute("size", new THREE.Float32BufferAttribute(sizes, 1));
  
  // Enhanced material with size variation
  const mat = new THREE.PointsMaterial({
    size: 0.3,
    vertexColors: true,
    sizeAttenuation: true,
    map: new THREE.TextureLoader().load("/textures/stars/circle.png"),
    alphaTest: 0.001,
    transparent: true,
  });
  
  const points = new THREE.Points(geo, mat);
  return points;
};

// Create network lines for networking effect
const createNetworkLines = (scene: THREE.Scene, earthGroup: THREE.Group, renderer: THREE.WebGLRenderer) => {
  const linesGroup = new THREE.Group();
  
  // NETWORK_DATA.forEach((connection, index) => {
  //        // Convert lat/lon to 3D coordinates on sphere - positioned closer to globe
  //    const fromPos = latLonToVector3(connection.from.lat, connection.from.lon, 1.08);
  //    const toPos = latLonToVector3(connection.to.lat, connection.to.lon, 1.08);
     
  //    // Create curved line using quadratic bezier curve - subtle outward curve
  //    const midPoint = new THREE.Vector3();
  //    midPoint.addVectors(fromPos, toPos);
  //    midPoint.multiplyScalar(0.5);
  //    midPoint.normalize().multiplyScalar(1.15); // Much closer to globe surface
    
  //   const curve = new THREE.QuadraticBezierCurve3(fromPos, midPoint, toPos);
  //   const points = curve.getPoints(50);
    
  //   const geometry = new THREE.BufferGeometry().setFromPoints(points);
    
  //   // Create flowing material with animated opacity and varied colors
  //   const getConnectionColor = (connection: any, index: number) => {
  //     if (connection.type === 'Satellite') {
  //       // Varied satellite colors
  //       const satelliteColors = [0xff8800, 0xff6600, 0xff4400, 0xff2200];
  //       return satelliteColors[index % satelliteColors.length];
  //     } else {
  //       // Varied fiber colors
  //       const fiberColors = [0x00ffff, 0x00ddff, 0x00bbff, 0x0099ff, 0x0077ff];
  //       return fiberColors[index % fiberColors.length];
  //     }
  //   };
    
  //        const material = new THREE.LineBasicMaterial({
  //      color: getConnectionColor(connection, index),
  //      transparent: true,
  //      opacity: 0.9 + (index % 3) * 0.1, // Higher opacity for maximum visibility
  //      linewidth: 15 + (index % 5) * 3 // Much thicker lines (15-30 pixels)
  //    });
    
  //        const line = new THREE.Line(geometry, material);
     
  //    // Add a glowing effect with a larger, more transparent line behind
  //    const glowMaterial = new THREE.LineBasicMaterial({
  //      color: getConnectionColor(connection, index),
  //      transparent: true,
  //      opacity: 0.4, // Enhanced glow for thicker lines
  //      linewidth: 25 + (index % 5) * 5 // Much thicker glow line (25-50 pixels)
  //    });
  //    const glowLine = new THREE.Line(geometry, glowMaterial);
     
  //    // Store connection data for popup interaction
  //    line.userData = {
  //      connection,
  //      type: 'networkLine',
  //      index
  //    };
  //    glowLine.userData = {
  //      connection,
  //      type: 'networkLineGlow',
  //      index
  //    };
     
  //    // Add glow line first (behind), then main line (in front)
  //    linesGroup.add(glowLine);
  //    linesGroup.add(line);
  // });
  
  // Position the network lines group to match Earth's position and scale
  linesGroup.position.copy(earthGroup.position);
  linesGroup.scale.copy(earthGroup.scale);
  linesGroup.rotation.copy(earthGroup.rotation);
  
  // Add to scene instead of earthGroup to keep it in front
  scene.add(linesGroup);
  return linesGroup;
};

// Convert latitude/longitude to 3D vector on sphere
const latLonToVector3 = (lat: number, lon: number, radius: number) => {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lon + 180) * (Math.PI / 180);
  
  const x = -(radius * Math.sin(phi) * Math.cos(theta));
  const z = (radius * Math.sin(phi) * Math.sin(theta));
  const y = (radius * Math.cos(phi));
  
  return new THREE.Vector3(x, y, z);
};

const EarthComponent = ({ width = '100%', height = '100vh' }) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const animationIdRef = useRef<number | null>(null);
  const [popupInfo, setPopupInfo] = useState<{ visible: boolean; x: number; y: number; data: any }>({
    visible: false,
    x: 0,
    y: 0,
    data: null
  });

  useEffect(() => {
    if (!mountRef.current) return;

      // Scene setup
      const scene = new THREE.Scene();
      sceneRef.current = scene;

           // Camera setup - adjusted for perfect sphere appearance
     const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
     camera.position.set(0, 0, 12);
     camera.lookAt(0, 0, 0);

      // Enhanced renderer setup for cinematic quality
    const renderer = new THREE.WebGLRenderer({ 
      antialias: true, 
      alpha: true,
      powerPreference: "high-performance"
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 0.8; // Better exposure for beautiful Earth appearance
    renderer.outputColorSpace = THREE.SRGBColorSpace; // Better color space
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 3)); // Higher pixel ratio for sharper rendering
    // Physically correct lights are now enabled by default in newer Three.js versions
    mountRef.current.appendChild(renderer.domElement);
      rendererRef.current = renderer;

    // Earth group
    const earthGroup = new THREE.Group();
    earthGroup.rotation.z = -23.4 * Math.PI / 180;
    earthGroup.rotation.y = 0.3; // Add some Y rotation to show more sphere
    earthGroup.rotation.x = 0.1; // Add slight X rotation for better perspective
    scene.add(earthGroup);

    // Orbit controls
    let controls: any;
    import('three/examples/jsm/controls/OrbitControls.js').then(({ OrbitControls }) => {
      controls = new OrbitControls(camera, renderer.domElement);
      controls.enableDamping = true;
      controls.dampingFactor = 0.05;
      controls.enableZoom = false; // Disable zoom in/out
      controls.enablePan = false; // Disable panning
      controls.enableRotate = false; // Disable cursor rotation
    });

    // Earth geometry and materials
    const detail = 16; // Higher detail for sharper Earth
    const loader = new THREE.TextureLoader();
    const geometry = new THREE.IcosahedronGeometry(1, detail);

        // Load only essential textures
    const loadAllTextures = async () => {
      console.log('🔄 Starting to load essential textures...');
      
      try {
        // Try local textures first
        const earthLightsTexture = await new Promise<THREE.Texture>((resolve, reject) => {
          loader.load(TEXTURES.earthLights, resolve, undefined, reject);
        });
        console.log('✅ Earth lights texture loaded from local');
        
        const earthCloudsTexture = await new Promise<THREE.Texture>((resolve, reject) => {
          loader.load(TEXTURES.earthCloudMap, resolve, undefined, reject);
        });
        console.log('✅ Earth clouds texture loaded from local');
        
        const earthCloudsTransTexture = await new Promise<THREE.Texture>((resolve, reject) => {
          loader.load(TEXTURES.earthCloudMapTrans, resolve, undefined, reject);
        });
        console.log('✅ Earth clouds transparency texture loaded from local');
        
        // Configure all textures for maximum sharpness
        [earthLightsTexture, earthCloudsTexture, earthCloudsTransTexture].forEach(texture => {
          texture.generateMipmaps = true;
          texture.minFilter = THREE.NearestMipmapLinearFilter; // Sharper minification
          texture.magFilter = THREE.NearestFilter; // Sharpest magnification
          texture.wrapS = THREE.ClampToEdgeWrapping;
          texture.wrapT = THREE.ClampToEdgeWrapping;
          texture.flipY = false;
          texture.anisotropy = renderer.capabilities.getMaxAnisotropy();
          texture.premultiplyAlpha = false;
        });
        
        // Now create materials with loaded textures
        createEarthMaterials(earthLightsTexture, earthCloudsTexture, earthCloudsTransTexture);
        
        // Debug: Log texture information
        console.log('🔍 Texture details:', {
          earthLights: earthLightsTexture.image?.width + 'x' + earthLightsTexture.image?.height,
          earthClouds: earthCloudsTexture.image?.width + 'x' + earthCloudsTexture.image?.height,
          earthCloudsTrans: earthCloudsTransTexture.image?.width + 'x' + earthCloudsTransTexture.image?.height
        });
        
      } catch (error) {
        console.error('❌ Local textures failed, trying external:', error);
        try {
          // Try external high-quality textures
          const earthLightsTexture = await new Promise<THREE.Texture>((resolve, reject) => {
            loader.load(EXTERNAL_TEXTURES.earthLights, resolve, undefined, reject);
          });
          console.log('✅ Earth lights texture loaded from external');
          
          const earthCloudsTexture = await new Promise<THREE.Texture>((resolve, reject) => {
            loader.load(EXTERNAL_TEXTURES.earthCloudMap, resolve, undefined, reject);
          });
          console.log('✅ Earth clouds texture loaded from external');
          
          const earthCloudsTransTexture = await new Promise<THREE.Texture>((resolve, reject) => {
            loader.load(EXTERNAL_TEXTURES.earthCloudMapTrans, resolve, undefined, reject);
          });
          console.log('✅ Earth clouds transparency texture loaded from external');
          
          // Configure external textures for maximum sharpness
          [earthLightsTexture, earthCloudsTexture, earthCloudsTransTexture].forEach(texture => {
            texture.generateMipmaps = true;
            texture.minFilter = THREE.NearestMipmapLinearFilter; // Sharper minification
            texture.magFilter = THREE.NearestFilter; // Sharpest magnification
            texture.wrapS = THREE.ClampToEdgeWrapping;
            texture.wrapT = THREE.ClampToEdgeWrapping;
            texture.flipY = false;
            texture.anisotropy = renderer.capabilities.getMaxAnisotropy();
          });
          
          // Create materials with external textures
          createEarthMaterials(earthLightsTexture, earthCloudsTexture, earthCloudsTransTexture);
          
        } catch (externalError) {
          console.error('❌ External textures also failed, using enhanced fallbacks:', externalError);
          createEarthMaterialsWithFallbacks();
        }
      }
    };

    // Create Earth materials with loaded textures
    const createEarthMaterials = (earthLightsTexture: THREE.Texture, earthCloudsTexture: THREE.Texture, earthCloudsTransTexture: THREE.Texture) => {
      console.log('🔄 Creating Earth materials with essential textures...');
      
      // Main earth material - Black sea base
      const material = new THREE.MeshStandardMaterial({
        color: new THREE.Color(0x000000), // Pure black for sea
        roughness: 0.9,
        metalness: 0.0,
        transparent: false,
        side: THREE.FrontSide,
      });

      const earthMesh = new THREE.Mesh(geometry, material);
      earthMesh.castShadow = true;
      earthMesh.receiveShadow = true;
      earthGroup.add(earthMesh);

      // Enhanced city lights with realistic glow - FULLY LIT LANDMASSES
      const lightsMat = new THREE.MeshBasicMaterial({
        map: earthLightsTexture,
        blending: THREE.AdditiveBlending,
        transparent: true,
        opacity: 2.5, // Much brighter for fully lit appearance
        side: THREE.FrontSide,
        color: new THREE.Color(0xffffaa), // Warm white-gold for beautiful city lights
      });
      const lightsMesh = new THREE.Mesh(geometry, lightsMat);
      lightsMesh.scale.setScalar(1.001);
      lightsMesh.castShadow = false;
      lightsMesh.receiveShadow = false;
      earthGroup.add(lightsMesh);

             // SINGLE CLOUD LAYER - flowing faster with better appearance
      const cloudsMat = new THREE.MeshLambertMaterial({
        map: earthCloudsTexture,
        transparent: true,
         opacity: 0.4, // Light cloud opacity for subtle appearance
        blending: THREE.NormalBlending,
        alphaMap: earthCloudsTransTexture,
        side: THREE.FrontSide,
         color: new THREE.Color(0x888888), // Grey clouds for subtle effect
      });
      const cloudsMesh = new THREE.Mesh(geometry, cloudsMat);
      cloudsMesh.scale.setScalar(1.003);
      cloudsMesh.castShadow = true;
      cloudsMesh.receiveShadow = false;
      earthGroup.add(cloudsMesh);

      // Add realistic atmospheric layer - BLACK
      const atmosphereGeometry = new THREE.SphereGeometry(1.02, 64, 64);
      const atmosphereMaterial = new THREE.MeshBasicMaterial({
        color: new THREE.Color(0x000000), // Black atmosphere
        transparent: true,
        opacity: 0.3, // Enhanced black atmospheric glow
        side: THREE.BackSide, // Render on the inside of the sphere
      });
      const atmosphereMesh = new THREE.Mesh(atmosphereGeometry, atmosphereMaterial);
      atmosphereMesh.castShadow = false;
      atmosphereMesh.receiveShadow = false;
      earthGroup.add(atmosphereMesh);

      // Add second atmospheric layer for more depth - BLACK
      const atmosphereGeometry2 = new THREE.SphereGeometry(1.05, 64, 64);
      const atmosphereMaterial2 = new THREE.MeshBasicMaterial({
        color: new THREE.Color(0x000000), // Black outer atmosphere
        transparent: true,
        opacity: 0.2, // Enhanced black outer glow
        side: THREE.BackSide,
      });
      const atmosphereMesh2 = new THREE.Mesh(atmosphereGeometry2, atmosphereMaterial2);
      atmosphereMesh2.castShadow = false;
      atmosphereMesh2.receiveShadow = false;
      earthGroup.add(atmosphereMesh2);

      // Store meshes for animation
      earthGroup.userData.earthMesh = earthMesh;
      earthGroup.userData.lightsMesh = lightsMesh;
      earthGroup.userData.cloudsMesh = cloudsMesh;
      earthGroup.userData.atmosphereMesh = atmosphereMesh;

      // Start animation
      animate();
    };

    // Create Earth materials with fallback textures
    const createEarthMaterialsWithFallbacks = () => {
      console.log('🔄 Creating Earth materials with fallback textures...');
      
      // Main earth material - Black sea base
      const material = new THREE.MeshPhongMaterial({
        color: new THREE.Color(0x000000), // Pure black for sea
        shininess: 25,
        specular: 0x000000,
              transparent: false,
        side: THREE.FrontSide,
      });

      const earthMesh = new THREE.Mesh(geometry, material);
      earthMesh.castShadow = true;
      earthMesh.receiveShadow = true;
      earthGroup.add(earthMesh);

      // City lights material - FULLY LIT LANDMASSES
      const lightsMat = new THREE.MeshBasicMaterial({
        map: createFallbackLightsMap(),
        blending: THREE.AdditiveBlending,
        transparent: true,
        opacity: 2.5, // Much brighter
        side: THREE.FrontSide,
        color: new THREE.Color(0xffffaa), // Warm white-gold for beautiful city lights
      });
      const lightsMesh = new THREE.Mesh(geometry, lightsMat);
      lightsMesh.castShadow = false;
      lightsMesh.receiveShadow = false;
      earthGroup.add(lightsMesh);

             // Clouds material - SINGLE LAYER with better appearance
      const cloudsMat = new THREE.MeshStandardMaterial({
        map: createFallbackCloudsMap(),
        transparent: true,
         opacity: 0.4, // Light cloud opacity for subtle appearance
        blending: THREE.NormalBlending,
        roughness: 0.9,
        metalness: 0.0,
        side: THREE.FrontSide,
         color: new THREE.Color(0x888888), // Grey clouds for subtle effect
      });
      const cloudsMesh = new THREE.Mesh(geometry, cloudsMat);
      cloudsMesh.scale.setScalar(1.002);
      cloudsMesh.castShadow = true;
      cloudsMesh.receiveShadow = false;
      earthGroup.add(cloudsMesh);

      // Add realistic atmospheric layer for fallback - BLACK
      const atmosphereGeometry = new THREE.SphereGeometry(1.02, 64, 64);
      const atmosphereMaterial = new THREE.MeshBasicMaterial({
        color: new THREE.Color(0x000000), // Black atmosphere
        transparent: true,
        opacity: 0.3, // Enhanced black atmospheric glow
        side: THREE.BackSide, // Render on the inside of the sphere
      });
      const atmosphereMesh = new THREE.Mesh(atmosphereGeometry, atmosphereMaterial);
      atmosphereMesh.castShadow = false;
      atmosphereMesh.receiveShadow = false;
      earthGroup.add(atmosphereMesh);

      // Add second atmospheric layer for more depth - BLACK
      const atmosphereGeometry2 = new THREE.SphereGeometry(1.05, 64, 64);
      const atmosphereMaterial2 = new THREE.MeshBasicMaterial({
        color: new THREE.Color(0x000000), // Black outer atmosphere
        transparent: true,
        opacity: 0.2, // Enhanced black outer glow
        side: THREE.BackSide,
      });
      const atmosphereMesh2 = new THREE.Mesh(atmosphereGeometry2, atmosphereMaterial2);
      atmosphereMesh2.castShadow = false;
      atmosphereMesh2.receiveShadow = false;
      earthGroup.add(atmosphereMesh2);

      // Store meshes for animation
      earthGroup.userData.earthMesh = earthMesh;
      earthGroup.userData.lightsMesh = lightsMesh;
      earthGroup.userData.cloudsMesh = cloudsMesh;
      earthGroup.userData.atmosphereMesh = atmosphereMesh;
      earthGroup.userData.atmosphereMesh2 = atmosphereMesh2;

      // Start animation
              animate();
    };

    // Simplified texture creation - only essential textures needed

    // Simplified fallback textures - only essential ones needed

    const createFallbackLightsMap = () => {
      const canvas = document.createElement('canvas');
      canvas.width = 4096; // Higher resolution for sharper textures
      canvas.height = 2048;
      const ctx = canvas.getContext('2d');
      
      if (ctx) {
        // Create city lights map with FULLY LIT LANDMASSES
        ctx.fillStyle = '#000000'; // No lights by default
        ctx.fillRect(0, 0, 2048, 1024);
        
        // Create gradient for city light glow - FULLY LIT
        const createCityCluster = (centerX: number, centerY: number, size: number, density: number, color: string) => {
          const gradient = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, size);
          gradient.addColorStop(0, color);
          gradient.addColorStop(0.3, `${color}88`);
          gradient.addColorStop(0.6, `${color}44`);
          gradient.addColorStop(1, 'transparent');
          
          ctx.fillStyle = gradient;
          ctx.fillRect(centerX - size, centerY - size, size * 2, size * 2);
          
          // Add individual bright spots
        ctx.fillStyle = '#ffffff';
          for (let i = 0; i < density; i++) {
            const angle = Math.random() * Math.PI * 2;
            const radius = Math.random() * size * 0.8;
            const x = centerX + Math.cos(angle) * radius;
            const y = centerY + Math.sin(angle) * radius;
            const brightness = Math.random() * 0.8 + 0.2;
            ctx.globalAlpha = brightness;
          ctx.fillRect(x, y, 2, 2);
        }
          ctx.globalAlpha = 1;
        };

        // Major city clusters with FULLY LIT appearance
        // Eastern US (New York, Boston corridor)
        createCityCluster(300, 200, 80, 120, '#ffffff');
        // Western US (Los Angeles, San Francisco)
        createCityCluster(200, 250, 60, 80, '#ffffff');
        // Europe (London, Paris, Amsterdam)
        createCityCluster(900, 180, 70, 100, '#ffffff');
        // Japan (Tokyo mega-region)
        createCityCluster(1400, 220, 50, 90, '#ffffff');
        // China (Beijing-Shanghai corridor)
        createCityCluster(1300, 200, 90, 150, '#ffffff');
        // India (Mumbai-Delhi)
        createCityCluster(1200, 280, 60, 80, '#ffffff');
        // Brazil (São Paulo-Rio)
        createCityCluster(400, 450, 40, 60, '#ffffff');
        // Middle East (Dubai, Tehran)
        createCityCluster(1000, 250, 50, 70, '#ffffff');
        // Australia (Sydney-Melbourne)
        createCityCluster(1500, 480, 30, 40, '#ffffff');
        // South Korea (Seoul area)
        createCityCluster(1380, 200, 25, 45, '#ffffff');
        
        // Add scattered smaller cities and towns - FULLY LIT
        const regions = [
          {x: 250, y: 180, w: 200, h: 120}, // North America
          {x: 850, y: 160, w: 200, h: 100}, // Europe
          {x: 1200, y: 180, w: 300, h: 150}, // Asia
          {x: 350, y: 400, w: 150, h: 200}, // South America
          {x: 900, y: 300, w: 200, h: 200}, // Africa
          {x: 1450, y: 450, w: 150, h: 100}, // Australia
        ];
        
        regions.forEach(region => {
        for (let i = 0; i < 30; i++) {
            const x = region.x + Math.random() * region.w;
            const y = region.y + Math.random() * region.h;
            const brightness = Math.random() * 0.6 + 0.2;
            const size = Math.random() * 2 + 1;
            ctx.globalAlpha = brightness;
            ctx.fillStyle = '#ffffff';
            ctx.fillRect(x, y, size, size);
          }
        });
        ctx.globalAlpha = 1;
      }
      
      const texture = new THREE.CanvasTexture(canvas);
      texture.generateMipmaps = true;
      texture.minFilter = THREE.LinearMipmapLinearFilter;
      texture.magFilter = THREE.LinearFilter;
      texture.anisotropy = renderer.capabilities.getMaxAnisotropy();
      
      return texture;
    };

    const createFallbackCloudsMap = () => {
      const canvas = document.createElement('canvas');
      canvas.width = 2048; // Higher resolution for sharper clouds
      canvas.height = 1024;
      const ctx = canvas.getContext('2d');
      
      if (ctx) {
        // Create cloud map - GREYSH COLOR
        ctx.fillStyle = '#000000'; // No clouds by default
        ctx.fillRect(0, 0, 1024, 512);
        
        // Add white cloud patterns
        ctx.fillStyle = '#ffffff'; // Pure white color for clouds
        // Pacific clouds
        for (let i = 0; i < 20; i++) {
          const x = 50 + Math.random() * 100;
          const y = 200 + Math.random() * 200;
          ctx.beginPath();
          ctx.arc(x, y, 10 + Math.random() * 20, 0, Math.PI * 2);
          ctx.fill();
        }
        // Atlantic clouds
        for (let i = 0; i < 15; i++) {
          const x = 400 + Math.random() * 50;
          const y = 150 + Math.random() * 300;
          ctx.beginPath();
          ctx.arc(x, y, 8 + Math.random() * 15, 0, Math.PI * 2);
          ctx.fill();
        }
      }
      
      const texture = new THREE.CanvasTexture(canvas);
      texture.generateMipmaps = true;
      texture.minFilter = THREE.LinearMipmapLinearFilter;
      texture.magFilter = THREE.LinearFilter;
      texture.anisotropy = renderer.capabilities.getMaxAnisotropy();
      
      return texture;
    };

    // Simplified bump map - not needed for essential textures

    // Start loading textures
    loadAllTextures();

    // Enhanced starfield with multiple layers for depth
    const stars = getStarfield({ numStars: 3000 });
    scene.add(stars);
    stars.name = 'stars';
    
    // Add distant galaxy/nebula effect
    const nebulaMaterial = new THREE.MeshBasicMaterial({
      color: 0x222244,
      transparent: true,
      opacity: 0.15,
      side: THREE.BackSide,
    });
    const nebulaGeometry = new THREE.SphereGeometry(80, 32, 32);
    const nebula = new THREE.Mesh(nebulaGeometry, nebulaMaterial);
    scene.add(nebula);

         // Enhanced lighting for cinematic look - centered Earth
     const sunLight = new THREE.DirectionalLight(0xffffff, 2.0); // Better intensity for beautiful Earth
     sunLight.position.set(-5, 3, 5);
    sunLight.castShadow = true;
    sunLight.shadow.mapSize.width = 4096;
    sunLight.shadow.mapSize.height = 4096;
    sunLight.shadow.camera.near = 0.5;
    sunLight.shadow.camera.far = 50;
    sunLight.shadow.camera.left = -15;
    sunLight.shadow.camera.right = 15;
    sunLight.shadow.camera.top = 15;
    sunLight.shadow.camera.bottom = -15;
    sunLight.shadow.bias = -0.0001;
    scene.add(sunLight);

     // Enhanced ambient light for better Earth appearance
     const ambientLight = new THREE.AmbientLight(0x112244, 0.15); // Better for beautiful Earth
    scene.add(ambientLight);

     // Subtle fill light from space (cooler tone) - DARKER
     const fillLight = new THREE.DirectionalLight(0x6699ff, 0.2); // Much darker
     fillLight.position.set(5, -2, -3);
    scene.add(fillLight);

     // Add rim light for dramatic edge lighting - DARKER
     const rimLight = new THREE.DirectionalLight(0x88aaff, 0.5); // Much darker
     rimLight.position.set(0, 0, -8);
    scene.add(rimLight);

    // Add ground plane to receive shadows
    const groundGeometry = new THREE.PlaneGeometry(40, 40);
    const groundMaterial = new THREE.MeshPhongMaterial({ 
      color: 0x000000, 
      transparent: true, 
      opacity: 0.0,
      side: THREE.DoubleSide 
    });
    const ground = new THREE.Mesh(groundGeometry, groundMaterial);
    ground.rotation.x = -Math.PI / 2;
    ground.position.y = -6;
     ground.position.x = 0;
    ground.receiveShadow = true;
    scene.add(ground);

         // Position Earth slightly to the right and make it smaller for perfect sphere
     earthGroup.position.x = 6;
     earthGroup.position.y = 0;
     earthGroup.scale.setScalar(5.0);
    
    // Create network lines for networking effect
    const networkLines = createNetworkLines(scene, earthGroup, renderer);

    // Animation loop
      const animate = () => {
        animationIdRef.current = requestAnimationFrame(animate);

      // Rotate Earth - MUCH FASTER
      const earthMesh = earthGroup.userData.earthMesh;
      if (earthMesh) {
        earthMesh.rotation.y += 0.003; // Much faster rotation
      }

      // Rotate City Lights - MUCH FASTER
      const lightsMesh = earthGroup.userData.lightsMesh;
      if (lightsMesh) {
        lightsMesh.rotation.y += 0.003; // Much faster rotation
      }

      // Rotate Clouds - EXTREMELY FAST
      const cloudsMesh = earthGroup.userData.cloudsMesh;
      if (cloudsMesh) {
        cloudsMesh.rotation.y += 0.008; // Extremely fast cloud movement
      }

      // Rotate Atmosphere - FASTER
      const atmosphereMesh = earthGroup.userData.atmosphereMesh;
      if (atmosphereMesh) {
        atmosphereMesh.rotation.y += 0.002; // Faster atmospheric rotation
      }

      // Rotate Second Atmosphere - FASTER
      const atmosphereMesh2 = earthGroup.userData.atmosphereMesh2;
      if (atmosphereMesh2) {
        atmosphereMesh2.rotation.y += 0.0015; // Faster outer atmospheric rotation
      }

             // Rotate Stars - FASTER
      const starsGroup = scene.getObjectByName('stars');
      if (starsGroup) {
         starsGroup.rotation.y += 0.002; // Faster star rotation
       }
       
               // Animate network lines for flowing effect
        if (networkLines) {
          // Keep network lines synchronized with Earth rotation
          networkLines.rotation.y += 0.003; // Same speed as Earth
          
                     networkLines.children.forEach((line: any, index: number) => {
             if (line.userData.type === 'networkLine') {
               const lineMaterial = line.material as THREE.LineBasicMaterial;
               // Create varied flowing effects for different connection types
               const time = Date.now() * 0.001;
               const connection = line.userData.connection;
               
               if (connection.type === 'Satellite') {
                 // Satellite connections pulse faster and more dramatically
                 const flowSpeed = 3.0 + (index % 3) * 0.5;
                 const opacity = 0.4 + 0.5 * Math.sin(time * flowSpeed + index * 0.3);
                 lineMaterial.opacity = Math.max(0.2, opacity);
               } else {
                 // Fiber connections have smoother, slower flow
                 const flowSpeed = 1.5 + (index % 2) * 0.3;
                 const opacity = 0.6 + 0.4 * Math.sin(time * flowSpeed + index * 0.7);
                 lineMaterial.opacity = Math.max(0.4, opacity);
               }
             }
             
             // Animate glow lines with synchronized but different timing
             if (line.userData.type === 'networkLineGlow') {
               const glowMaterial = line.material as THREE.LineBasicMaterial;
               const time = Date.now() * 0.001;
               const connection = line.userData.connection;
               
               if (connection.type === 'Satellite') {
                 const flowSpeed = 2.5 + (index % 3) * 0.4;
                 const opacity = 0.1 + 0.3 * Math.sin(time * flowSpeed + index * 0.2);
                 glowMaterial.opacity = Math.max(0.05, opacity);
               } else {
                 const flowSpeed = 1.2 + (index % 2) * 0.25;
                 const opacity = 0.2 + 0.2 * Math.sin(time * flowSpeed + index * 0.6);
                 glowMaterial.opacity = Math.max(0.15, opacity);
               }
             }
           });
      }

      if (controls) controls.update();
        renderer.render(scene, camera);
      };

    animate();

    // Handle window resize
    const handleWindowResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
          camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    
    // Handle mouse interaction for popups
    const handleMouseMove = (event: MouseEvent) => {
      const mouse = new THREE.Vector2();
      mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
      
      // Raycasting to detect network lines
      const raycaster = new THREE.Raycaster();
      raycaster.setFromCamera(mouse, camera);
      
      const intersects = raycaster.intersectObjects(networkLines.children, true);
      
      if (intersects.length > 0) {
        const intersect = intersects[0];
        if (intersect.object.userData.type === 'networkLine') {
          // Show popup
          setPopupInfo({
            visible: true,
            x: event.clientX,
            y: event.clientY,
            data: intersect.object.userData.connection
          });
          
          // Highlight the line
          const lineMaterial = (intersect.object as THREE.Line).material as THREE.LineBasicMaterial;
          lineMaterial.opacity = 1.0;
          lineMaterial.color.setHex(0xffff00);
        }
      } else {
        // Hide popup and reset line appearance
        setPopupInfo(prev => ({ ...prev, visible: false }));
        
                          // Reset all network lines to original appearance
         networkLines.children.forEach((line: any, index: number) => {
           if (line.userData.type === 'networkLine') {
             const connection = line.userData.connection;
             const lineMaterial = line.material as THREE.LineBasicMaterial;
             
                           // Reset to original varied colors and opacity
              if (connection.type === 'Satellite') {
                const satelliteColors = [0xff8800, 0xff6600, 0xff4400, 0xff2200];
                lineMaterial.color.setHex(satelliteColors[index % satelliteColors.length]);
                lineMaterial.opacity = 0.9 + (index % 3) * 0.1;
              } else {
                const fiberColors = [0x00ffff, 0x00ddff, 0x00bbff, 0x0099ff, 0x0077ff];
                lineMaterial.color.setHex(fiberColors[index % fiberColors.length]);
                lineMaterial.opacity = 0.9 + (index % 3) * 0.1;
              }
           }
           
           // Reset glow lines to original appearance
           if (line.userData.type === 'networkLineGlow') {
             const connection = line.userData.connection;
             const glowMaterial = line.material as THREE.LineBasicMaterial;
             
                           if (connection.type === 'Satellite') {
                const satelliteColors = [0xff8800, 0xff6600, 0xff4400, 0xff2200];
                glowMaterial.color.setHex(satelliteColors[index % satelliteColors.length]);
                glowMaterial.opacity = 0.4;
              } else {
                const fiberColors = [0x00ffff, 0x00ddff, 0x00bbff, 0x0099ff, 0x0077ff];
                glowMaterial.color.setHex(fiberColors[index % fiberColors.length]);
                glowMaterial.opacity = 0.4;
              }
           }
         });
      }
    };
    
    // Add mouse event listeners
    window.addEventListener('mousemove', handleMouseMove);

    window.addEventListener('resize', handleWindowResize);

    // Cleanup function
    return () => {
      window.removeEventListener('resize', handleWindowResize);
      window.removeEventListener('mousemove', handleMouseMove);
        if (animationIdRef.current) {
          cancelAnimationFrame(animationIdRef.current);
        }
      if (mountRef.current && renderer.domElement) {
        mountRef.current.removeChild(renderer.domElement);
        }
        renderer.dispose();
      };
  }, []);

  return (
    <div 
      ref={mountRef} 
      style={{ 
        width, 
        height, 
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      {/* Network Connection Popup */}
      {popupInfo.visible && popupInfo.data && (
        <div
          style={{
            position: 'absolute',
            left: popupInfo.x + 10,
            top: popupInfo.y - 10,
            backgroundColor: 'rgba(0, 0, 0, 0.9)',
            color: 'white',
            padding: '12px 16px',
            borderRadius: '8px',
            fontSize: '14px',
            fontFamily: 'Arial, sans-serif',
            pointerEvents: 'none',
            zIndex: 1000,
            border: '1px solid #00ffff',
            boxShadow: '0 4px 20px rgba(0, 255, 255, 0.3)',
            maxWidth: '250px'
          }}
        >
          <div style={{ fontWeight: 'bold', marginBottom: '8px', color: '#00ffff' }}>
            Network Connection
          </div>
          <div style={{ marginBottom: '4px' }}>
            <strong>From:</strong> {popupInfo.data.from.name}
          </div>
          <div style={{ marginBottom: '4px' }}>
            <strong>To:</strong> {popupInfo.data.to.name}
          </div>
          <div style={{ marginBottom: '4px' }}>
            <strong>Type:</strong> 
            <span style={{ 
              color: popupInfo.data.type === 'Fiber' ? '#00ffff' : '#ff8800',
              marginLeft: '4px'
            }}>
              {popupInfo.data.type}
            </span>
          </div>
          <div style={{ 
            fontSize: '12px', 
            color: '#cccccc',
            fontStyle: 'italic'
          }}>
            {popupInfo.data.type === 'Fiber' ? 'High-speed fiber optic connection' : 'Satellite communication link'}
          </div>
        </div>
      )}
    </div>
  );
};

export default EarthComponent;
