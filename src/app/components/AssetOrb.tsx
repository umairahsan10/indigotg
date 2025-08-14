import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

// Earth texture URLs - using local textures from public folder
const TEXTURES = {
  earthMap: '/textures/00_earthmap1k.jpg',
  earthBump: '/textures/01_earthbump1k.jpg',
  earthSpec: '/textures/02_earthspec1k.jpg',
  earthLights: '/textures/03_earthlights1k.jpg',
  earthCloudMap: '/textures/04_earthcloudmap.jpg',
  earthCloudMapTrans: '/textures/05_earthcloudmaptrans.jpg'
};

// High-quality external textures as backup
const EXTERNAL_TEXTURES = {
  earthMap: 'https://raw.githubusercontent.com/mrdoob/three.js/dev/examples/textures/planets/earth_atmos_2048.jpg',
  earthBump: 'https://raw.githubusercontent.com/mrdoob/three.js/dev/examples/textures/planets/earth_normal_2048.jpg',
  earthSpec: 'https://raw.githubusercontent.com/mrdoob/three.js/dev/examples/textures/planets/earth_specular_2048.jpg',
  earthLights: 'https://raw.githubusercontent.com/mrdoob/three.js/dev/examples/textures/planets/earth_lights_2048.jpg',
  earthCloudMap: 'https://raw.githubusercontent.com/mrdoob/three.js/dev/examples/textures/planets/earth_clouds_1024.png',
  earthCloudMapTrans: 'https://raw.githubusercontent.com/mrdoob/three.js/dev/examples/textures/planets/earth_clouds_1024.png'
};

// Fresnel material generator function
const getFresnelMat = ({rimHex = 0x0088ff, facingHex = 0x000000} = {}) => {
  const uniforms = {
    color1: { value: new THREE.Color(rimHex) },
    color2: { value: new THREE.Color(facingHex) },
    fresnelBias: { value: 0.1 },
    fresnelScale: { value: 1.0 },
    fresnelPower: { value: 4.0 },
  };
  const vs = `
  uniform float fresnelBias;
  uniform float fresnelScale;
  uniform float fresnelPower;
  
  varying float vReflectionFactor;
  
  void main() {
    vec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );
    vec4 worldPosition = modelMatrix * vec4( position, 1.0 );
  
    vec3 worldNormal = normalize( mat3( modelMatrix[0].xyz, modelMatrix[1].xyz, modelMatrix[2].xyz ) * normal );
  
    vec3 I = worldPosition.xyz - cameraPosition;
  
    vReflectionFactor = fresnelBias + fresnelScale * pow( 1.0 + dot( normalize( I ), worldNormal ), fresnelPower );
  
    gl_Position = projectionMatrix * mvPosition;
  }
  `;
  const fs = `
  uniform vec3 color1;
  uniform vec3 color2;
  
  varying float vReflectionFactor;
  
  void main() {
    float f = clamp( vReflectionFactor, 0.0, 1.0 );
    gl_FragColor = vec4(mix(color2, color1, vec3(f)), f);
  }
  `;
  const fresnelMat = new THREE.ShaderMaterial({
    uniforms: uniforms,
    vertexShader: vs,
    fragmentShader: fs,
    transparent: true,
    blending: THREE.AdditiveBlending,
  });
  return fresnelMat;
};

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

const EarthComponent = ({ width = '100%', height = '100vh' }) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const animationIdRef = useRef<number | null>(null);

  useEffect(() => {
    if (!mountRef.current) return;

      // Scene setup
      const scene = new THREE.Scene();
      sceneRef.current = scene;

      // Camera setup
    const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(6, 2, 15);
    camera.lookAt(8, 0, 0);

      // Enhanced renderer setup for cinematic quality
    const renderer = new THREE.WebGLRenderer({ 
      antialias: true, 
      alpha: true,
      powerPreference: "high-performance"
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2; // Slightly brighter exposure
    renderer.outputColorSpace = THREE.SRGBColorSpace; // Better color space
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
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
    const detail = 12;
    const loader = new THREE.TextureLoader();
    const geometry = new THREE.IcosahedronGeometry(1, detail);

    // Load all textures first, then create materials
    const loadAllTextures = async () => {
      console.log('🔄 Starting to load all textures...');
      
      try {
        // Try local textures first
        const earthMapTexture = await new Promise<THREE.Texture>((resolve, reject) => {
          loader.load(TEXTURES.earthMap, resolve, undefined, reject);
        });
        console.log('✅ Earth map texture loaded from local');
        
        const earthSpecTexture = await new Promise<THREE.Texture>((resolve, reject) => {
          loader.load(TEXTURES.earthSpec, resolve, undefined, reject);
        });
        console.log('✅ Earth specular texture loaded from local');
        
        const earthBumpTexture = await new Promise<THREE.Texture>((resolve, reject) => {
          loader.load(TEXTURES.earthBump, resolve, undefined, reject);
        });
        console.log('✅ Earth bump texture loaded from local');
        
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
        
        // Configure all textures
        [earthMapTexture, earthSpecTexture, earthBumpTexture, earthLightsTexture, earthCloudsTexture, earthCloudsTransTexture].forEach(texture => {
          texture.generateMipmaps = true;
          texture.minFilter = THREE.LinearMipmapLinearFilter;
          texture.magFilter = THREE.LinearFilter;
          texture.wrapS = THREE.ClampToEdgeWrapping;
          texture.wrapT = THREE.ClampToEdgeWrapping;
          texture.flipY = false;
          texture.anisotropy = renderer.capabilities.getMaxAnisotropy();
          texture.premultiplyAlpha = false;
        });
        
        // Now create materials with loaded textures
        createEarthMaterials(earthMapTexture, earthSpecTexture, earthBumpTexture, earthLightsTexture, earthCloudsTexture, earthCloudsTransTexture);
        
        // Debug: Log texture information
        console.log('🔍 Texture details:', {
          earthMap: earthMapTexture.image?.width + 'x' + earthMapTexture.image?.height,
          earthSpec: earthSpecTexture.image?.width + 'x' + earthSpecTexture.image?.height,
          earthBump: earthBumpTexture.image?.width + 'x' + earthBumpTexture.image?.height,
          earthLights: earthLightsTexture.image?.width + 'x' + earthLightsTexture.image?.height,
          earthClouds: earthCloudsTexture.image?.width + 'x' + earthCloudsTexture.image?.height,
          earthCloudsTrans: earthCloudsTransTexture.image?.width + 'x' + earthCloudsTransTexture.image?.height
        });
        
      } catch (error) {
        console.error('❌ Local textures failed, trying external:', error);
        try {
          // Try external high-quality textures
          const earthMapTexture = await new Promise<THREE.Texture>((resolve, reject) => {
            loader.load(EXTERNAL_TEXTURES.earthMap, resolve, undefined, reject);
          });
          console.log('✅ Earth map texture loaded from external');
          
          const earthSpecTexture = await new Promise<THREE.Texture>((resolve, reject) => {
            loader.load(EXTERNAL_TEXTURES.earthSpec, resolve, undefined, reject);
          });
          console.log('✅ Earth specular texture loaded from external');
          
          const earthBumpTexture = await new Promise<THREE.Texture>((resolve, reject) => {
            loader.load(EXTERNAL_TEXTURES.earthBump, resolve, undefined, reject);
          });
          console.log('✅ Earth bump texture loaded from external');
          
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
          
          // Configure external textures
          [earthMapTexture, earthSpecTexture, earthBumpTexture, earthLightsTexture, earthCloudsTexture, earthCloudsTransTexture].forEach(texture => {
            texture.generateMipmaps = true;
            texture.minFilter = THREE.LinearMipmapLinearFilter;
            texture.magFilter = THREE.LinearFilter;
            texture.wrapS = THREE.ClampToEdgeWrapping;
            texture.wrapT = THREE.ClampToEdgeWrapping;
            texture.flipY = false;
            texture.anisotropy = renderer.capabilities.getMaxAnisotropy();
          });
          
          // Create materials with external textures
          createEarthMaterials(earthMapTexture, earthSpecTexture, earthBumpTexture, earthLightsTexture, earthCloudsTexture, earthCloudsTransTexture);
          
        } catch (externalError) {
          console.error('❌ External textures also failed, using enhanced fallbacks:', externalError);
          createEarthMaterialsWithFallbacks();
        }
      }
    };

    // Create Earth materials with loaded textures
    const createEarthMaterials = (earthMapTexture: THREE.Texture, earthSpecTexture: THREE.Texture, earthBumpTexture: THREE.Texture, earthLightsTexture: THREE.Texture, earthCloudsTexture: THREE.Texture, earthCloudsTransTexture: THREE.Texture) => {
      console.log('🔄 Creating Earth materials with loaded textures...');
      
      // Main earth material with enhanced PBR
      const material = new THREE.MeshStandardMaterial({
        map: earthMapTexture,
        normalMap: earthBumpTexture,
        normalScale: new THREE.Vector2(0.3, 0.3),
        roughnessMap: earthSpecTexture,
        roughness: 0.8,
        metalness: 0.1,
        transparent: false,
        side: THREE.FrontSide,
      });

      const earthMesh = new THREE.Mesh(geometry, material);
      earthMesh.castShadow = true;
      earthMesh.receiveShadow = true;
      earthGroup.add(earthMesh);

      // Enhanced city lights with realistic glow
      const lightsMat = new THREE.MeshBasicMaterial({
        map: earthLightsTexture,
        blending: THREE.AdditiveBlending,
        transparent: true,
        opacity: 1.2,
        side: THREE.FrontSide,
      });
      const lightsMesh = new THREE.Mesh(geometry, lightsMat);
      lightsMesh.scale.setScalar(1.001);
      lightsMesh.castShadow = false;
      lightsMesh.receiveShadow = false;
      earthGroup.add(lightsMesh);

      // Enhanced clouds with better transparency
      const cloudsMat = new THREE.MeshLambertMaterial({
        map: earthCloudsTexture,
        transparent: true,
        opacity: 0.6,
        blending: THREE.NormalBlending,
        alphaMap: earthCloudsTransTexture,
        side: THREE.FrontSide,
      });
      const cloudsMesh = new THREE.Mesh(geometry, cloudsMat);
      cloudsMesh.scale.setScalar(1.003);
      cloudsMesh.castShadow = true;
      cloudsMesh.receiveShadow = false;
      earthGroup.add(cloudsMesh);

      // Multi-layer atmospheric glow like the reference image
      // Inner atmosphere (bright blue)
      const innerAtmosphereGeometry = new THREE.SphereGeometry(1.01, 64, 64);
      const innerAtmosphereMaterial = getFresnelMat({
        rimHex: 0x0099ff,
        facingHex: 0x000000
      });
      const innerAtmosphere = new THREE.Mesh(innerAtmosphereGeometry, innerAtmosphereMaterial);
      earthGroup.add(innerAtmosphere);

      // Middle atmosphere (cyan glow)
      const middleAtmosphereGeometry = new THREE.SphereGeometry(1.025, 64, 64);
      const middleAtmosphereMaterial = getFresnelMat({
        rimHex: 0x00aaff,
        facingHex: 0x000000
      });
      middleAtmosphereMaterial.uniforms.fresnelBias.value = 0.2;
      middleAtmosphereMaterial.uniforms.fresnelScale.value = 1.2;
      middleAtmosphereMaterial.uniforms.fresnelPower.value = 2.0;
      const middleAtmosphere = new THREE.Mesh(middleAtmosphereGeometry, middleAtmosphereMaterial);
      earthGroup.add(middleAtmosphere);

      // Outer atmosphere (subtle blue halo)
      const outerAtmosphereGeometry = new THREE.SphereGeometry(1.05, 64, 64);
      const outerAtmosphereMaterial = getFresnelMat({
        rimHex: 0x88ccff,
        facingHex: 0x000011
      });
      outerAtmosphereMaterial.uniforms.fresnelBias.value = 0.0;
      outerAtmosphereMaterial.uniforms.fresnelScale.value = 0.8;
      outerAtmosphereMaterial.uniforms.fresnelPower.value = 1.5;
      const outerAtmosphere = new THREE.Mesh(outerAtmosphereGeometry, outerAtmosphereMaterial);
      earthGroup.add(outerAtmosphere);

      // Store meshes for animation
      earthGroup.userData.earthMesh = earthMesh;
      earthGroup.userData.lightsMesh = lightsMesh;
      earthGroup.userData.cloudsMesh = cloudsMesh;
      earthGroup.userData.innerAtmosphere = innerAtmosphere;
      earthGroup.userData.middleAtmosphere = middleAtmosphere;
      earthGroup.userData.outerAtmosphere = outerAtmosphere;

      // Start animation
      animate();
    };

    // Create Earth materials with fallback textures
    const createEarthMaterialsWithFallbacks = () => {
      console.log('🔄 Creating Earth materials with fallback textures...');
      
      // Main earth material
      const material = new THREE.MeshPhongMaterial({
        map: createRealisticWorldMap(),
        specularMap: createFallbackSpecularMap(),
        bumpMap: createFallbackBumpMap(),
        bumpScale: 0.05,
        shininess: 25,
        specular: 0x111111,
              transparent: false,
        side: THREE.FrontSide,
      });

      const earthMesh = new THREE.Mesh(geometry, material);
      earthMesh.castShadow = true;
      earthMesh.receiveShadow = true;
      earthGroup.add(earthMesh);

      // City lights material
      const lightsMat = new THREE.MeshBasicMaterial({
        map: createFallbackLightsMap(),
        blending: THREE.AdditiveBlending,
        transparent: true,
        opacity: 0.9,
        side: THREE.FrontSide,
      });
      const lightsMesh = new THREE.Mesh(geometry, lightsMat);
      lightsMesh.castShadow = false;
      lightsMesh.receiveShadow = false;
      earthGroup.add(lightsMesh);

      // Clouds material
      const cloudsMat = new THREE.MeshStandardMaterial({
        map: createFallbackCloudsMap(),
        transparent: true,
        opacity: 0.85,
        blending: THREE.NormalBlending,
        roughness: 0.9,
        metalness: 0.0,
        side: THREE.FrontSide,
      });
      const cloudsMesh = new THREE.Mesh(geometry, cloudsMat);
      cloudsMesh.scale.setScalar(1.002);
      cloudsMesh.castShadow = true;
      cloudsMesh.receiveShadow = false;
      earthGroup.add(cloudsMesh);

      // Store meshes for animation
      earthGroup.userData.earthMesh = earthMesh;
      earthGroup.userData.lightsMesh = lightsMesh;
      earthGroup.userData.cloudsMesh = cloudsMesh;

      // Add subtle atmosphere effect
      const atmosphereGeometry = new THREE.SphereGeometry(1.02, 32, 32);
      const atmosphereMaterial = new THREE.MeshBasicMaterial({
        color: 0x87ceeb,
        transparent: true,
        opacity: 0.1,
        side: THREE.BackSide,
      });
      const atmosphereMesh = new THREE.Mesh(atmosphereGeometry, atmosphereMaterial);
      atmosphereMesh.castShadow = false;
      atmosphereMesh.receiveShadow = false;
      earthGroup.add(atmosphereMesh);
      earthGroup.userData.atmosphereMesh = atmosphereMesh;

      // Start animation
              animate();
    };

    // Create realistic world map texture based on actual geography
    const createRealisticWorldMap = () => {
      console.log('Creating realistic world map texture...');
      const canvas = document.createElement('canvas');
      canvas.width = 4096;
      canvas.height = 2048;
      const ctx = canvas.getContext('2d');
      
      if (ctx) {
        // Natural ocean color - uniform blue like real Earth from space
        ctx.fillStyle = '#1e40af'; // Natural ocean blue
        ctx.fillRect(0, 0, 4096, 2048);

        // Actual continental shapes (simplified but geographically accurate)
        
        // NORTH AMERICA - Natural brown/green landmass
        ctx.fillStyle = '#8B7355'; // Natural brownish-green like real Earth
        ctx.beginPath();
        // Canada outline
        ctx.moveTo(512, 410);
        ctx.quadraticCurveTo(820, 300, 1200, 350);
        ctx.quadraticCurveTo(1400, 380, 1350, 500);
        ctx.quadraticCurveTo(1200, 600, 950, 650);
        ctx.quadraticCurveTo(700, 700, 500, 750);
        ctx.quadraticCurveTo(300, 600, 400, 500);
        ctx.quadraticCurveTo(450, 450, 512, 410);
        ctx.fill();
        
        // USA
        ctx.beginPath();
        ctx.moveTo(400, 750);
        ctx.quadraticCurveTo(600, 720, 900, 750);
        ctx.quadraticCurveTo(1200, 780, 1300, 850);
        ctx.quadraticCurveTo(1100, 950, 800, 900);
        ctx.quadraticCurveTo(500, 880, 300, 850);
        ctx.quadraticCurveTo(350, 800, 400, 750);
        ctx.fill();
        
        // Mexico & Central America
        ctx.beginPath();
        ctx.moveTo(300, 850);
        ctx.quadraticCurveTo(500, 900, 700, 950);
        ctx.quadraticCurveTo(750, 1000, 720, 1050);
        ctx.quadraticCurveTo(650, 1080, 600, 1050);
        ctx.quadraticCurveTo(400, 1000, 250, 950);
        ctx.quadraticCurveTo(280, 900, 300, 850);
        ctx.fill();

        // SOUTH AMERICA - Same natural color
        ctx.beginPath();
        ctx.moveTo(600, 1050);
        ctx.quadraticCurveTo(800, 1100, 900, 1200);
        ctx.quadraticCurveTo(950, 1400, 900, 1600);
        ctx.quadraticCurveTo(850, 1800, 750, 1900);
        ctx.quadraticCurveTo(650, 1950, 550, 1900);
        ctx.quadraticCurveTo(450, 1800, 500, 1600);
        ctx.quadraticCurveTo(520, 1400, 550, 1200);
        ctx.quadraticCurveTo(575, 1100, 600, 1050);
        ctx.fill();

        // EUROPE - Same natural color
        ctx.beginPath();
        ctx.moveTo(1800, 500);
        ctx.quadraticCurveTo(2000, 480, 2200, 520);
        ctx.quadraticCurveTo(2300, 580, 2250, 650);
        ctx.quadraticCurveTo(2200, 720, 2100, 750);
        ctx.quadraticCurveTo(1950, 780, 1800, 750);
        ctx.quadraticCurveTo(1750, 700, 1770, 650);
        ctx.quadraticCurveTo(1780, 600, 1800, 500);
        ctx.fill();

        // AFRICA - Same natural color
        ctx.beginPath();
        ctx.moveTo(1800, 750);
        ctx.quadraticCurveTo(2000, 800, 2200, 900);
        ctx.quadraticCurveTo(2300, 1100, 2250, 1300);
        ctx.quadraticCurveTo(2200, 1500, 2100, 1650);
        ctx.quadraticCurveTo(2000, 1750, 1900, 1700);
        ctx.quadraticCurveTo(1800, 1650, 1750, 1500);
        ctx.quadraticCurveTo(1700, 1300, 1750, 1100);
        ctx.quadraticCurveTo(1770, 900, 1800, 750);
        ctx.fill();

        // ASIA - Same natural color
        ctx.beginPath();
        ctx.moveTo(2200, 400);
        ctx.quadraticCurveTo(2800, 350, 3400, 400);
        ctx.quadraticCurveTo(3800, 450, 3900, 600);
        ctx.quadraticCurveTo(3850, 800, 3700, 1000);
        ctx.quadraticCurveTo(3500, 1200, 3200, 1100);
        ctx.quadraticCurveTo(2800, 1000, 2400, 900);
        ctx.quadraticCurveTo(2200, 800, 2150, 600);
        ctx.quadraticCurveTo(2180, 500, 2200, 400);
        ctx.fill();

        // AUSTRALIA - Same natural color
        ctx.beginPath();
        ctx.moveTo(3200, 1400);
        ctx.quadraticCurveTo(3500, 1380, 3700, 1420);
        ctx.quadraticCurveTo(3800, 1480, 3750, 1580);
        ctx.quadraticCurveTo(3700, 1650, 3500, 1630);
        ctx.quadraticCurveTo(3300, 1620, 3150, 1580);
        ctx.quadraticCurveTo(3120, 1520, 3150, 1460);
        ctx.quadraticCurveTo(3170, 1420, 3200, 1400);
        ctx.fill();

        // Add major islands - same natural color
        
        // Greenland
          ctx.beginPath();
        ctx.arc(1400, 250, 80, 0, Math.PI * 2);
        ctx.fill();
        
        // Madagascar
          ctx.beginPath();
        ctx.ellipse(2400, 1500, 30, 80, 0, 0, Math.PI * 2);
        ctx.fill();
        
        // Japan
          ctx.beginPath();
        ctx.ellipse(3600, 750, 25, 120, Math.PI/6, 0, Math.PI * 2);
          ctx.fill();
        
        // UK & Ireland
          ctx.beginPath();
        ctx.arc(1750, 600, 25, 0, Math.PI * 2);
          ctx.fill();
        ctx.beginPath();
        ctx.arc(1700, 620, 15, 0, Math.PI * 2);
        ctx.fill();
        
        // New Zealand
        ctx.beginPath();
        ctx.ellipse(3800, 1700, 15, 60, 0, 0, Math.PI * 2);
        ctx.fill();

        // Add natural polar ice caps - simple white
        ctx.fillStyle = '#ffffff'; // Pure white ice
        ctx.fillRect(0, 0, 4096, 120);    // Arctic
        ctx.fillRect(0, 1900, 4096, 148); // Antarctica

        // Remove artificial grid lines for clean natural look

        // Remove artificial terrain variations - keep natural uniform landmass color
      }
      
      const texture = new THREE.CanvasTexture(canvas);
      texture.generateMipmaps = true;
      texture.minFilter = THREE.LinearMipmapLinearFilter;
      texture.magFilter = THREE.LinearFilter;
      texture.anisotropy = renderer.capabilities.getMaxAnisotropy();
      
      return texture;
    };

    // Create fallback textures for other maps
    const createFallbackSpecularMap = () => {
      const canvas = document.createElement('canvas');
      canvas.width = 2048;
      canvas.height = 1024;
      const ctx = canvas.getContext('2d');
      
      if (ctx) {
        // Create enhanced specular map for realistic ocean reflections
        ctx.fillStyle = '#333333'; // Land - slightly reflective
        ctx.fillRect(0, 0, 2048, 1024);
        
        // Create realistic ocean areas with high specularity
        ctx.fillStyle = '#ffffff'; // Oceans - highly reflective
        
        // Pacific Ocean
        ctx.fillRect(0, 0, 300, 1024);
        ctx.fillRect(1600, 0, 448, 1024);
        
        // Atlantic Ocean
        ctx.fillRect(350, 0, 200, 1024);
        
        // Indian Ocean
        ctx.fillRect(1100, 300, 300, 724);
        
        // Arctic Ocean
        ctx.fillRect(0, 0, 2048, 150);
        
        // Antarctic Ocean
        ctx.fillRect(0, 850, 2048, 174);
        
        // Mediterranean Sea
        ctx.fillRect(850, 250, 200, 50);
        
        // Add varying ocean specularity based on depth/roughness
        const oceanGradient = ctx.createLinearGradient(0, 0, 0, 1024);
        oceanGradient.addColorStop(0, '#cccccc');   // Polar waters - less reflective
        oceanGradient.addColorStop(0.3, '#ffffff'); // Tropical waters - highly reflective
        oceanGradient.addColorStop(0.7, '#ffffff'); // Tropical waters - highly reflective
        oceanGradient.addColorStop(1, '#cccccc');   // Polar waters - less reflective
        
        ctx.fillStyle = oceanGradient;
        ctx.fillRect(0, 0, 300, 1024); // Pacific
        ctx.fillRect(350, 0, 200, 1024); // Atlantic
        ctx.fillRect(1600, 0, 448, 1024); // Pacific continuation
        
        // Make large lakes slightly reflective
        ctx.fillStyle = '#888888';
        // Great Lakes
        ctx.fillRect(280, 180, 30, 20);
        // Caspian Sea
        ctx.fillRect(1000, 220, 25, 40);
        // Lake Baikal
        ctx.fillRect(1350, 180, 10, 25);
      }
      
      const texture = new THREE.CanvasTexture(canvas);
      texture.generateMipmaps = true;
      texture.minFilter = THREE.LinearMipmapLinearFilter;
      texture.magFilter = THREE.LinearFilter;
      texture.anisotropy = renderer.capabilities.getMaxAnisotropy();
      
      return texture;
    };

    const createFallbackLightsMap = () => {
      const canvas = document.createElement('canvas');
      canvas.width = 2048;
      canvas.height = 1024;
      const ctx = canvas.getContext('2d');
      
      if (ctx) {
        // Create city lights map with realistic distribution
        ctx.fillStyle = '#000000'; // No lights by default
        ctx.fillRect(0, 0, 2048, 1024);
        
        // Create gradient for city light glow
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

        // Major city clusters with realistic colors and sizes
        // Eastern US (New York, Boston corridor)
        createCityCluster(300, 200, 80, 120, '#ffaa00');
        // Western US (Los Angeles, San Francisco)
        createCityCluster(200, 250, 60, 80, '#ffcc44');
        // Europe (London, Paris, Amsterdam)
        createCityCluster(900, 180, 70, 100, '#ffffff');
        // Japan (Tokyo mega-region)
        createCityCluster(1400, 220, 50, 90, '#ffddaa');
        // China (Beijing-Shanghai corridor)
        createCityCluster(1300, 200, 90, 150, '#ffffaa');
        // India (Mumbai-Delhi)
        createCityCluster(1200, 280, 60, 80, '#ffeecc');
        // Brazil (São Paulo-Rio)
        createCityCluster(400, 450, 40, 60, '#ffbb88');
        // Middle East (Dubai, Tehran)
        createCityCluster(1000, 250, 50, 70, '#ffddcc');
        // Australia (Sydney-Melbourne)
        createCityCluster(1500, 480, 30, 40, '#ffccaa');
        // South Korea (Seoul area)
        createCityCluster(1380, 200, 25, 45, '#ffffff');
        
        // Add scattered smaller cities and towns
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
            ctx.fillStyle = '#ffeeaa';
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
      canvas.width = 1024;
      canvas.height = 512;
      const ctx = canvas.getContext('2d');
      
      if (ctx) {
        // Create cloud map
        ctx.fillStyle = '#000000'; // No clouds by default
        ctx.fillRect(0, 0, 1024, 512);
        
        // Add some cloud patterns
        ctx.fillStyle = '#ffffff';
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

    const createFallbackBumpMap = () => {
      const canvas = document.createElement('canvas');
      canvas.width = 1024;
      canvas.height = 512;
      const ctx = canvas.getContext('2d');
      
      if (ctx) {
        // Create bump map (height variation)
        ctx.fillStyle = '#808080'; // Neutral gray
        ctx.fillRect(0, 0, 1024, 512);
        
        // Add some terrain variation
        ctx.fillStyle = '#ffffff'; // Higher areas
        // Mountain ranges
        ctx.fillRect(180, 120, 140, 80); // North America mountains
        ctx.fillRect(250, 300, 80, 120); // South America Andes
        ctx.fillRect(480, 120, 90, 30);  // European Alps
        ctx.fillRect(700, 140, 200, 80); // Asian mountains
        
        ctx.fillStyle = '#404040'; // Lower areas
        // Ocean basins
        ctx.fillRect(50, 200, 100, 200);   // Pacific
        ctx.fillRect(400, 150, 50, 300);   // Atlantic
      }
      
      const texture = new THREE.CanvasTexture(canvas);
      texture.generateMipmaps = true;
      texture.minFilter = THREE.LinearMipmapLinearFilter;
      texture.magFilter = THREE.LinearFilter;
      texture.anisotropy = renderer.capabilities.getMaxAnisotropy();
      
      return texture;
    };

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

    // Enhanced lighting for cinematic look
    const sunLight = new THREE.DirectionalLight(0xffffff, 3.5);
    sunLight.position.set(-3, 1, 2);
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

    // Reduced ambient light for more dramatic contrast
    const ambientLight = new THREE.AmbientLight(0x112244, 0.3);
    scene.add(ambientLight);

    // Subtle fill light from space (cooler tone)
    const fillLight = new THREE.DirectionalLight(0x6699ff, 0.4);
    fillLight.position.set(3, -1, -2);
    scene.add(fillLight);

    // Add rim light for dramatic edge lighting
    const rimLight = new THREE.DirectionalLight(0x88aaff, 1.0);
    rimLight.position.set(0, 0, -5);
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
    ground.position.x = 8;
    ground.receiveShadow = true;
    scene.add(ground);

    // Position Earth to the right side and make it bigger
    earthGroup.position.x = 8;
    earthGroup.position.y = 2;
    earthGroup.scale.setScalar(8.5);

    // Animation loop
      const animate = () => {
        animationIdRef.current = requestAnimationFrame(animate);

      // Rotate Earth
      const earthMesh = earthGroup.userData.earthMesh;
      if (earthMesh) {
        earthMesh.rotation.y += 0.0005; // Rotate slowly
      }

      // Rotate City Lights
      const lightsMesh = earthGroup.userData.lightsMesh;
      if (lightsMesh) {
        lightsMesh.rotation.y += 0.0005;
      }

      // Rotate Clouds
      const cloudsMesh = earthGroup.userData.cloudsMesh;
      if (cloudsMesh) {
        cloudsMesh.rotation.y += 0.0005;
      }

      // Rotate Stars
      const starsGroup = scene.getObjectByName('stars');
      if (starsGroup) {
        starsGroup.rotation.y += 0.0005;
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

    window.addEventListener('resize', handleWindowResize);

    // Cleanup function
    return () => {
      window.removeEventListener('resize', handleWindowResize);
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
    />
  );
};

export default EarthComponent;
