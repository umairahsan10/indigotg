'use client';

import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import gsap from "gsap";
import { SplitText } from "gsap/SplitText";

// Shader code
const vertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const fragmentShader = `
  uniform sampler2D uTexture1;
  uniform sampler2D uTexture2;
  uniform float uProgress;
  uniform vec2 uResolution;
  uniform vec2 uTexture1Size;
  uniform vec2 uTexture2Size;
  uniform int uCurrentSlideIndex;
  uniform bool uIsVideo1;
  uniform bool uIsVideo2;
  varying vec2 vUv;
  
  vec2 getCoverUV(vec2 uv, vec2 textureSize) {
    vec2 s = uResolution / textureSize;
    float scale = max(s.x, s.y);
    vec2 scaledSize = textureSize * scale;
    vec2 offset = (uResolution - scaledSize) * 0.5;
    return (uv * uResolution - offset) / scaledSize;
  }
  
  vec2 getDistortedUv(vec2 uv, vec2 direction, float factor) {
    vec2 scaledDirection = direction;
    scaledDirection.y *= 2.0;
    return uv - scaledDirection * factor;
  }
  
  struct LensDistortion {
    vec2 distortedUV;
    float inside;
  };
  
  LensDistortion getLensDistortion(
    vec2 p,
    vec2 uv,
    vec2 sphereCenter,
    float sphereRadius,
    float focusFactor
  ) {
    vec2 distortionDirection = normalize(p - sphereCenter);
    float focusRadius = sphereRadius * focusFactor;
    float focusStrength = sphereRadius / 3000.0;
    float focusSdf = length(sphereCenter - p) - focusRadius;
    float sphereSdf = length(sphereCenter - p) - sphereRadius;
    float inside = smoothstep(0.0, 1.0, -sphereSdf / (sphereRadius * 0.001));
    
    float magnifierFactor = focusSdf / (sphereRadius - focusRadius);
    float mFactor = clamp(magnifierFactor * inside, 0.0, 1.0);
    mFactor = pow(mFactor, 5.0);
    
    float distortionFactor = mFactor * focusStrength;
    
    vec2 distortedUV = getDistortedUv(uv, distortionDirection, distortionFactor);
    
    return LensDistortion(distortedUV, inside);
  }
  
  void main() {
    vec2 center = vec2(0.5, 0.5);
    vec2 p = vUv * uResolution;
    
    vec2 uv1 = getCoverUV(vUv, uTexture1Size);
    vec2 uv2 = getCoverUV(vUv, uTexture2Size);
    
    float maxRadius = length(uResolution) * 1.5;
    float bubbleRadius = uProgress * maxRadius;
    vec2 sphereCenter = center * uResolution;
    float focusFactor = 0.25;
    
    float dist = length(sphereCenter - p);
    float mask = step(bubbleRadius, dist);
    
    vec4 currentImg = texture2D(uTexture1, uv1);
    
    LensDistortion distortion = getLensDistortion(
      p, uv2, sphereCenter, bubbleRadius, focusFactor
    );
    
    vec4 newImg = texture2D(uTexture2, distortion.distortedUV);
    
    // Apply darkening effect to all slides for consistent appearance
    currentImg.rgb *= 0.7; // Darken current image by 30%
    newImg.rgb *= 0.7; // Darken new image by 30%
    
    float finalMask = max(mask, 1.0 - distortion.inside);
    vec4 color = mix(newImg, currentImg, finalMask);
    
    gl_FragColor = color;
  }
`;

// Slides data
const slides = [
  {
    title: "Engineering a Digital Future",
    description:
      "We design, deploy, and support digital infrastructure to maximise value in fixed line, subsea, data centres and wireless networks.",
    image: "/home/video1.mp4",
    type: "video",
    buttonText: "Learn More",
    buttonLink: "/our-services"
  },
  {
    title: "Design, Deploy, Support",
    description:
      "Indigo can solve problems in the most complex environments: greenfield, hyperscale or edge data centres, upgrade or a hybrid mix of multi-generational technologies.",
    image: "/home/globe_video2.mp4",
    type: "video",
    buttonText: "Our Services",
    buttonLink: "/our-services"
  },
  {
    title: "Field Engineering",
    description:
      "Our strategically located field technicians deliver first-line reactive/preventative maintenance, second-line remote technical support, and third line expert support.",
    image: "/home/subsea_video.mp4",
    type: "video",
    buttonText: "Field Services",
    buttonLink: "/our-services"
  },
  {
    title: "Survey & Design",
    description:
      "We identify the right information and convert it into actionable data to build powerful networks.",
    image: "/home/218489.mp4",
    type: "video",
    buttonText: "Survey Services",
    buttonLink: "/our-services"
  },
  {
    title: "Indigo Subsea",
    description:
      "System operator support for modern submarine networks.",
    image: "/home/video5.mp4",
    type: "video",
    buttonText: "Subsea Solutions",
    buttonLink: "/our-services"
  },
  {
    title: "NOC Services",
    description:
      "Ensures seamless connectivity with 24/7/365 expert support, minimizing downtime and keeping the world connected",
    image: "/home/video8.mp4",
    type: "video",
    buttonText: "NOC Services",
    buttonLink: "/our-services"
  },
];

const HeroSlider = () => {
  const canvasRef = useRef(null);
  const sliderRef = useRef(null);
  const rippleRefs = useRef(new Map());
  const videoRefs = useRef(new Map());
  const [isGSAPReady, setIsGSAPReady] = useState(false);

  // Initialize GSAP
  useEffect(() => {
    if (typeof window !== 'undefined' && (window as any).gsap) {
      const gsap = (window as any).gsap;
      
      if (gsap.to && gsap.from && gsap.timeline && gsap.registerPlugin) {
        setTimeout(() => setIsGSAPReady(true), 200);
      } else {
        const checkGSAP = setInterval(() => {
          if (gsap.to && gsap.from && gsap.timeline && gsap.registerPlugin) {
            clearInterval(checkGSAP);
            setIsGSAPReady(true);
          }
        }, 50);
        
        setTimeout(() => {
          clearInterval(checkGSAP);
          setIsGSAPReady(true);
        }, 3000);
      }
    }
  }, []);

  // Keep these as module-level variables like in the original
  let currentSlideIndex = 0;
  let isTransitioning = false;
  let slideTextures: THREE.Texture[] = [];
  let shaderMaterial: THREE.ShaderMaterial | null = null;
  let renderer: THREE.WebGLRenderer | null = null;
  let autoPlayInterval: NodeJS.Timeout | null = null;

  const createCharacterElements = (element: HTMLElement) => {
    if (element.querySelectorAll(".char").length > 0) return;

    const words = element.textContent?.split(" ") || [];
    element.innerHTML = "";

    words.forEach((word: string, index: number) => {
      const wordDiv = document.createElement("div");
      wordDiv.className = "word";

      [...word].forEach((char) => {
        const charDiv = document.createElement("div");
        charDiv.className = "char";
        charDiv.innerHTML = `<span>${char}</span>`;
        wordDiv.appendChild(charDiv);
      });

      element.appendChild(wordDiv);

      if (index < words.length - 1) {
        const spaceChar = document.createElement("div");
        spaceChar.className = "word";
        spaceChar.innerHTML = '<div class="char"><span> </span></div>';
        element.appendChild(spaceChar);
      }
    });
  };

  const createLineElements = (element: HTMLElement) => {
    new SplitText(element, { type: "lines", linesClass: "line" });
    element.querySelectorAll(".line").forEach((line: Element) => {
      (line as HTMLElement).innerHTML = `<span>${line.textContent}</span>`;
    });
  };

  const processTextElements = (container: HTMLElement) => {
    const title = container.querySelector(".slide-title h1");
    if (title) createCharacterElements(title as HTMLElement);

    container
      .querySelectorAll(".slide-description p")
      .forEach((element: Element) => createLineElements(element as HTMLElement));
  };

  const createSlideElement = (slideData: { title: string; description: string; image: string; type: string; buttonText: string; buttonLink: string }) => {
    const content = document.createElement("div");
    content.className = "slider-content";
    content.style.opacity = "0";

    // Create the title with proper character structure
    const titleDiv = document.createElement("div");
    titleDiv.className = "slide-title";
    titleDiv.style.cssText = `
         position: absolute;
         top: 25%;
         left: 50%;
         transform: translate(-50%, -50%);
         width: 100%;
         text-align: center;
       `;
    const titleH1 = document.createElement("h1");
    const fontSize = (slideData.title === "NOC Services" || slideData.title === "Design, Deploy, Support") ? "6.5vw" : "7.5vw";
    titleH1.style.cssText = `
          text-transform: uppercase;
          font-size: ${fontSize};
          font-weight: 700;
          line-height: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          gap: 0.05em;
          -webkit-text-stroke: 2px ${slideData.title === "Engineering a Digital Future" ? "#991b1b" : slideData.title === "Field Engineering" ? "white" : slideData.title === "Survey & Design" ? "#00ffff" : slideData.title === "Indigo Subsea" ? "#d8bfd8" : slideData.title === "NOC Services" ? "#87ceeb" : slideData.title === "Design, Deploy, Support" ? "#87ceeb" : "white"};
          color: ${slideData.title === "Engineering a Digital Future" ? "white" : slideData.title === "Field Engineering" ? "#d4a574" : slideData.title === "Survey & Design" ? "#ff8c00" : "#140079"};
        `;

    // Split title into words and characters
    const words = slideData.title.split(" ");

    // Special handling for the first slide to split "Engineering a Digital Future"
    if (slideData.title === "Engineering a Digital Future") {
      // First line: "Engineering a"
      const firstLineDiv = document.createElement("div");
      firstLineDiv.style.display = "flex";
      firstLineDiv.style.justifyContent = "center";

      ["Engineering", "a"].forEach((word, wordIndex) => {
        const wordDiv = document.createElement("div");
        wordDiv.className = "word";
        wordDiv.style.display = "flex";

        [...word].forEach((char) => {
          const charDiv = document.createElement("div");
          charDiv.className = "char";
          charDiv.style.display = "block";

          const charSpan = document.createElement("span");
          charSpan.style.cssText = `
              display: inline-block;
              will-change: transform;
              position: relative;
            `;
          charSpan.textContent = char;

          charDiv.appendChild(charSpan);
          wordDiv.appendChild(charDiv);
        });

        firstLineDiv.appendChild(wordDiv);

        // Add space between words
        if (wordIndex < 1) {
          const spaceWord = document.createElement("div");
          spaceWord.className = "word";
          spaceWord.style.display = "flex";
          spaceWord.innerHTML = '<div class="char" style="display: block;"><span style="display: inline-block; will-change: transform; position: relative; width: 0.3em;"> </span></div>';
          firstLineDiv.appendChild(spaceWord);
        }
      });

      titleH1.appendChild(firstLineDiv);

      // Second line: "Digital Future"
      const secondLineDiv = document.createElement("div");
      secondLineDiv.style.display = "flex";
      secondLineDiv.style.justifyContent = "center";

      ["Digital", "Future"].forEach((word, wordIndex) => {
        const wordDiv = document.createElement("div");
        wordDiv.className = "word";
        wordDiv.style.display = "flex";

        [...word].forEach((char) => {
          const charDiv = document.createElement("div");
          charDiv.className = "char";
          charDiv.style.display = "block";

          const charSpan = document.createElement("span");
          charSpan.style.cssText = `
               display: inline-block;
               will-change: transform;
               position: relative;
             `;
          charSpan.textContent = char;

          charDiv.appendChild(charSpan);
          wordDiv.appendChild(charDiv);
        });

        secondLineDiv.appendChild(wordDiv);

        // Add space between words
        if (wordIndex < 1) {
          const spaceWord = document.createElement("div");
          spaceWord.className = "word";
          spaceWord.style.display = "flex";
          spaceWord.innerHTML = '<div class="char" style="display: block;"><span style="display: inline-block; will-change: transform; position: relative; width: 0.3em;"> </span></div>';
          secondLineDiv.appendChild(spaceWord);
        }
      });

      titleH1.appendChild(secondLineDiv);
    } else if (slideData.title === "Design, Deploy, Support") {
      // Special handling for the second slide - display "Design, Deploy, Support" in two lines
      // First line: "Design, Deploy,"
      const firstLineDiv = document.createElement("div");
      firstLineDiv.style.display = "flex";
      firstLineDiv.style.justifyContent = "center";

      ["Design,", "Deploy,"].forEach((word, wordIndex) => {
        const wordDiv = document.createElement("div");
        wordDiv.className = "word";
        wordDiv.style.display = "flex";

        [...word].forEach((char) => {
          const charDiv = document.createElement("div");
          charDiv.className = "char";
          charDiv.style.display = "block";

          const charSpan = document.createElement("span");
          charSpan.style.cssText = `
               display: inline-block;
               will-change: transform;
               position: relative;
             `;
          charSpan.textContent = char;

          charDiv.appendChild(charSpan);
          wordDiv.appendChild(charDiv);
        });

        firstLineDiv.appendChild(wordDiv);

        // Add space between words (except after the last word)
        if (wordIndex < 1) {
          const spaceWord = document.createElement("div");
          spaceWord.className = "word";
          spaceWord.style.display = "flex";
          spaceWord.innerHTML = '<div class="char" style="display: block;"><span style="display: inline-block; will-change: transform; position: relative; width: 0.3em;"> </span></div>';
          firstLineDiv.appendChild(spaceWord);
        }
      });

      titleH1.appendChild(firstLineDiv);

      // Second line: "Support"
      const secondLineDiv = document.createElement("div");
      secondLineDiv.style.display = "flex";
      secondLineDiv.style.justifyContent = "center";

      ["Support"].forEach((word) => {
        const wordDiv = document.createElement("div");
        wordDiv.className = "word";
        wordDiv.style.display = "flex";

        [...word].forEach((char) => {
          const charDiv = document.createElement("div");
          charDiv.className = "char";
          charDiv.style.display = "block";

          const charSpan = document.createElement("span");
          charSpan.style.cssText = `
               display: inline-block;
               will-change: transform;
               position: relative;
             `;
          charSpan.textContent = char;

          charDiv.appendChild(charSpan);
          wordDiv.appendChild(charDiv);
        });

        secondLineDiv.appendChild(wordDiv);
      });

      titleH1.appendChild(secondLineDiv);
    } else if (slideData.title === "Field Engineering") {
      // Special handling for the third slide to split "Field Engineering"
      // First line: "Field"
      const firstLineDiv = document.createElement("div");
      firstLineDiv.style.display = "flex";
      firstLineDiv.style.justifyContent = "center";

      ["Field"].forEach((word) => {
        const wordDiv = document.createElement("div");
        wordDiv.className = "word";
        wordDiv.style.display = "flex";

        [...word].forEach((char) => {
          const charDiv = document.createElement("div");
          charDiv.className = "char";
          charDiv.style.display = "block";

          const charSpan = document.createElement("span");
          charSpan.style.cssText = `
                display: inline-block;
                will-change: transform;
                position: relative;
              `;
          charSpan.textContent = char;

          charDiv.appendChild(charSpan);
          wordDiv.appendChild(charDiv);
        });

        firstLineDiv.appendChild(wordDiv);
      });

      titleH1.appendChild(firstLineDiv);

      // Second line: "Engineering"
      const secondLineDiv = document.createElement("div");
      secondLineDiv.style.display = "flex";
      secondLineDiv.style.justifyContent = "center";

      ["Engineering"].forEach((word) => {
        const wordDiv = document.createElement("div");
        wordDiv.className = "word";
        wordDiv.style.display = "flex";

        [...word].forEach((char) => {
          const charDiv = document.createElement("div");
          charDiv.className = "char";
          charDiv.style.display = "block";

          const charSpan = document.createElement("span");
          charSpan.style.cssText = `
                display: inline-block;
                will-change: transform;
                position: relative;
              `;
          charSpan.textContent = char;

          charDiv.appendChild(charSpan);
          wordDiv.appendChild(charDiv);
        });

        secondLineDiv.appendChild(wordDiv);
      });

      titleH1.appendChild(secondLineDiv);
    } else if (slideData.title === "Survey & Design") {
      // Special handling for the fourth slide to split "Survey & Design"
      // First line: "Survey &"
      const firstLineDiv = document.createElement("div");
      firstLineDiv.style.display = "flex";
      firstLineDiv.style.justifyContent = "center";

      ["Survey", "&"].forEach((word, wordIndex) => {
        const wordDiv = document.createElement("div");
        wordDiv.className = "word";
        wordDiv.style.display = "flex";

        [...word].forEach((char) => {
          const charDiv = document.createElement("div");
          charDiv.className = "char";
          charDiv.style.display = "block";

          const charSpan = document.createElement("span");
          charSpan.style.cssText = `
                display: inline-block;
                will-change: transform;
                position: relative;
              `;
          charSpan.textContent = char;

          charDiv.appendChild(charSpan);
          wordDiv.appendChild(charDiv);
        });

        firstLineDiv.appendChild(wordDiv);

        // Add space between words
        if (wordIndex < 1) {
          const spaceWord = document.createElement("div");
          spaceWord.className = "word";
          spaceWord.style.display = "flex";
          spaceWord.innerHTML = '<div class="char" style="display: block;"><span style="display: inline-block; will-change: transform; position: relative; width: 0.3em;"> </span></div>';
          firstLineDiv.appendChild(spaceWord);
        }
      });

      titleH1.appendChild(firstLineDiv);

      // Second line: "Design"
      const secondLineDiv = document.createElement("div");
      secondLineDiv.style.display = "flex";
      secondLineDiv.style.justifyContent = "center";

      ["Design"].forEach((word) => {
        const wordDiv = document.createElement("div");
        wordDiv.className = "word";
        wordDiv.style.display = "flex";

        [...word].forEach((char) => {
          const charDiv = document.createElement("div");
          charDiv.className = "char";
          charDiv.style.display = "block";

          const charSpan = document.createElement("span");
          charSpan.style.cssText = `
                display: inline-block;
                will-change: transform;
                position: relative;
              `;
          charSpan.textContent = char;

          charDiv.appendChild(charSpan);
          wordDiv.appendChild(charDiv);
        });

        secondLineDiv.appendChild(wordDiv);
      });

      titleH1.appendChild(secondLineDiv);
    } else if (slideData.title === "Indigo Subsea") {
      // Special handling for the fifth slide to split "Indigo Subsea"
      // First line: "Indigo"
      const firstLineDiv = document.createElement("div");
      firstLineDiv.style.display = "flex";
      firstLineDiv.style.justifyContent = "center";

      ["Indigo"].forEach((word) => {
        const wordDiv = document.createElement("div");
        wordDiv.className = "word";
        wordDiv.style.display = "flex";

        [...word].forEach((char) => {
          const charDiv = document.createElement("div");
          charDiv.className = "char";
          charDiv.style.display = "block";

          const charSpan = document.createElement("span");
          charSpan.style.cssText = `
                display: inline-block;
                will-change: transform;
                position: relative;
              `;
          charSpan.textContent = char;

          charDiv.appendChild(charSpan);
          wordDiv.appendChild(charDiv);
        });

        firstLineDiv.appendChild(wordDiv);
      });

      titleH1.appendChild(firstLineDiv);

      // Second line: "Subsea"
      const secondLineDiv = document.createElement("div");
      secondLineDiv.style.display = "flex";
      secondLineDiv.style.justifyContent = "center";

      ["Subsea"].forEach((word) => {
        const wordDiv = document.createElement("div");
        wordDiv.className = "word";
        wordDiv.style.display = "flex";

        [...word].forEach((char) => {
          const charDiv = document.createElement("div");
          charDiv.className = "char";
          charDiv.style.display = "block";

          const charSpan = document.createElement("span");
          charSpan.style.cssText = `
                display: inline-block;
                will-change: transform;
                position: relative;
              `;
          charSpan.textContent = char;

          charDiv.appendChild(charSpan);
          wordDiv.appendChild(charDiv);
        });

        secondLineDiv.appendChild(wordDiv);
      });

      titleH1.appendChild(secondLineDiv);
    } else if (slideData.title === "NOC Services") {
      // Special handling for the sixth slide - display "NOC Services" in one line
      const singleLineDiv = document.createElement("div");
      singleLineDiv.style.display = "flex";
      singleLineDiv.style.justifyContent = "center";

      ["NOC", "Services"].forEach((word, wordIndex) => {
        const wordDiv = document.createElement("div");
        wordDiv.className = "word";
        wordDiv.style.display = "flex";

        [...word].forEach((char) => {
          const charDiv = document.createElement("div");
          charDiv.className = "char";
          charDiv.style.display = "block";

          const charSpan = document.createElement("span");
          charSpan.style.cssText = `
                display: inline-block;
                will-change: transform;
                position: relative;
              `;
          charSpan.textContent = char;

          charDiv.appendChild(charSpan);
          wordDiv.appendChild(charDiv);
        });

        singleLineDiv.appendChild(wordDiv);

        // Add space between words (except after the last word)
        if (wordIndex < 1) {
          const spaceWord = document.createElement("div");
          spaceWord.className = "word";
          spaceWord.style.display = "flex";
          spaceWord.innerHTML = '<div class="char" style="display: block;"><span style="display: inline-block; will-change: transform; position: relative; width: 0.3em;"> </span></div>';
          singleLineDiv.appendChild(spaceWord);
        }
      });

      titleH1.appendChild(singleLineDiv);
    } else {
      // Regular handling for other slides
      words.forEach((word: string, wordIndex: number) => {
        const wordDiv = document.createElement("div");
        wordDiv.className = "word";
        wordDiv.style.display = "flex";

        [...word].forEach((char) => {
          const charDiv = document.createElement("div");
          charDiv.className = "char";
          charDiv.style.display = "block";

          const charSpan = document.createElement("span");
          charSpan.style.cssText = `
             display: inline-block;
             will-change: transform;
             position: relative;
           `;
          charSpan.textContent = char;

          charDiv.appendChild(charSpan);
          wordDiv.appendChild(charDiv);
        });

        titleH1.appendChild(wordDiv);

        // Add space between words (except after the last word)
        if (wordIndex < words.length - 1) {
          const spaceWord = document.createElement("div");
          spaceWord.className = "word";
          spaceWord.style.display = "flex";
          spaceWord.innerHTML = '<div class="char" style="display: block;"><span style="display: inline-block; will-change: transform; position: relative;"> </span></div>';
          titleH1.appendChild(spaceWord);
        }
      });
    }

    titleDiv.appendChild(titleH1);

    // Create the description with proper line structure
    const descriptionDiv = document.createElement("div");
    descriptionDiv.className = "slide-description";

    // Adjust positioning based on slide title
    let topPosition = "50%";
    if (slideData.title === "Engineering a Digital Future") {
      topPosition = "60%"; // Lower position for first slide
    } else if (slideData.title === "Design, Deploy, Support") {
      topPosition = "58%"; // Higher position for 3-line title
    } else if (slideData.title === "Field Engineering") {
      topPosition = "60%"; // Lower position for Field Engineering
    } else if (slideData.title === "Survey & Design") {
      topPosition = "60%"; // Lower position for Survey & Design
    } else if (slideData.title === "Indigo Subsea") {
      topPosition = "60%"; // Lower position for Indigo Subsea
    } else if (slideData.title === "NOC Services") {
      topPosition = "55%"; // Closer position for NOC Services
    }

    descriptionDiv.style.cssText = `
         position: absolute;
         top: ${topPosition};
         left: 50%;
         transform: translate(-50%, -50%);
         width: ${slideData.title === "Design, Deploy, Support" ? "60%" : slideData.title === "NOC Services" ? "50%" : "55%"};
         display: flex;
         flex-direction: column;
         gap: 2rem;
         text-align: center;
       `;

    // Main description paragraph
    const descP = document.createElement("p");
    const descFontSize = (slideData.title === "Engineering a Digital Future" || slideData.title === "Design, Deploy, Support" || slideData.title === "NOC Services" || slideData.title === "Field Engineering" || slideData.title === "Survey & Design" || slideData.title === "Indigo Subsea") ? "1.4rem" : "1.1rem";
    descP.style.fontSize = descFontSize;
    descP.style.lineHeight = "1.6";
    descP.style.letterSpacing = "0.02em";
    descP.style.wordSpacing = "0.1em";
    descP.textContent = slideData.description;
    descriptionDiv.appendChild(descP);

    content.appendChild(titleDiv);
    content.appendChild(descriptionDiv);

    // Create the button
    const buttonDiv = document.createElement("div");
    buttonDiv.className = "slide-button";
    buttonDiv.style.cssText = `
        position: absolute;
        bottom: 12%;
        left: 50%;
        transform: translate(-50%, 0);
        z-index: 10;
      `;

    const button = document.createElement("button");
    button.style.cssText = `
      background: ${slideData.title === "Engineering a Digital Future" ? "#991b1b" : slideData.title === "Field Engineering" ? "#d4a574" : slideData.title === "Survey & Design" ? "#ff8c00" : "#140079"};
      border: 2px solid ${slideData.title === "Engineering a Digital Future" ? "#991b1b" : slideData.title === "Field Engineering" ? "#919b1b" : slideData.title === "Survey & Design" ? "#00ffff" : slideData.title === "Indigo Subsea" ? "#d8bfd8" : slideData.title === "NOC Services" ? "#87ceeb" : slideData.title === "Design, Deploy, Support" ? "#87ceeb" : "#140079"};
      color: white;
      padding: 8px 24px;
      font-size: 1rem;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.1em;
      cursor: pointer;
      transition: all 0.3s ease;
      position: relative;
      overflow: hidden;
      border-radius: 9999px;
    `;
    button.textContent = slideData.buttonText;

    // Add hover effects
    button.addEventListener('mouseenter', () => {
      button.style.background = 'white';
      button.style.border = slideData.title === "Design, Deploy, Support" ? '2px solid #87ceeb' : '2px solid white';
      button.style.color = slideData.title === "Engineering a Digital Future" ? "#991b1b" : slideData.title === "Field Engineering" ? "#d4a574" : slideData.title === "Survey & Design" ? "#00ffff" : slideData.title === "Indigo Subsea" ? "#d8bfd8" : slideData.title === "NOC Services" ? "#87ceeb" : slideData.title === "Design, Deploy, Support" ? "#140079" : "#140079";
      button.style.transform = 'scale(1.05)';
    });

    button.addEventListener('mouseleave', () => {
      button.style.background = slideData.title === "Engineering a Digital Future" ? "#991b1b" : slideData.title === "Field Engineering" ? "#d4a574" : slideData.title === "Survey & Design" ? "#ff8c00" : "#140079";
      button.style.border = slideData.title === "Engineering a Digital Future" ? "2px solid #991b1b" : slideData.title === "Field Engineering" ? "2px solid white" : slideData.title === "Survey & Design" ? "2px solid #00ffff" : slideData.title === "Indigo Subsea" ? "2px solid #d8bfd8" : slideData.title === "NOC Services" ? "2px solid #87ceeb" : slideData.title === "Design, Deploy, Support" ? "2px solid #87ceeb" : "2px solid #140079";
      button.style.color = 'white';
      button.style.transform = 'scale(1)';
    });

    // Add click handler for navigation
    button.addEventListener('click', (e) => {
      e.stopPropagation(); // Prevent triggering slide change
      window.location.href = slideData.buttonLink;
    });

    buttonDiv.appendChild(button);
    content.appendChild(buttonDiv);

    return content;
  };

  const animateSlideTransition = (nextIndex: number) => {
    const currentContent = document.querySelector(".slider-content");
    const slider = sliderRef.current;

    if (!currentContent || !slider) return;

    const sliderElement = slider as HTMLElement;

    const timeline = gsap.timeline();

    timeline
      .to([...currentContent.querySelectorAll(".char span")], {
        y: "-100%",
        duration: 0.6,
        stagger: 0.025,
        ease: "power2.inOut",
      })
      .to(
        [...currentContent.querySelectorAll(".line span")],
        {
          y: "-100%",
          duration: 0.6,
          stagger: 0.025,
          ease: "power2.inOut",
        },
        0.1
      )
      .call(
        () => {
          const newContent = createSlideElement(slides[nextIndex]);

          timeline.kill();
          currentContent.remove();
          sliderElement.appendChild(newContent);

          gsap.set(newContent.querySelectorAll("span"), { y: "100%" });

          setTimeout(() => {
            // Process text elements for the new slide
            processTextElements(newContent);

            const newChars = newContent.querySelectorAll(".char span");
            const newLines = newContent.querySelectorAll(".line span");

            // Set initial positions
            gsap.set([newChars, newLines], { y: "100%" });
            gsap.set(newContent, { opacity: 1 });

            // Set initial position for paragraph and button (hidden)
            const newParagraph = newContent.querySelector(".slide-description p");
            const newButton = newContent.querySelector(".slide-button button");
            gsap.set(newParagraph, { opacity: 0, y: 20 });
            gsap.set(newButton, { opacity: 0, y: 20 });

            // Hide the entire button container during transition
            const newButtonContainer = newContent.querySelector(".slide-button");
            gsap.set(newButtonContainer, { opacity: 0 });

            // Animate the new content in
            gsap
              .timeline({
                onComplete: () => {
                  isTransitioning = false;
                  currentSlideIndex = nextIndex;
                },
              })
              .to(newChars, {
                y: "0%",
                duration: 0.5,
                stagger: 0.025,
                ease: "power2.inOut",
              })
              .to(
                newLines,
                { y: "0%", duration: 0.5, stagger: 0.1, ease: "power2.inOut" },
                0.3
              )
              .to(
                newParagraph,
                {
                  opacity: 1,
                  y: 0,
                  duration: 0.8,
                  ease: "power2.out"
                },
                0.6
              )
              .to(
                newButtonContainer,
                {
                  opacity: 1,
                  duration: 0.3,
                  ease: "power2.out"
                },
                0.8
              )
              .to(
                newButton,
                {
                  opacity: 1,
                  y: 0,
                  duration: 0.8,
                  ease: "power2.out"
                },
                0.8
              );
          }, 100);
        },
        [],
        0.5
      );
  };

  const setupInitialSlide = () => {
    const content = document.querySelector(".slider-content");

    if (!content) return;

    // Process text elements for the initial slide
    processTextElements(content as HTMLElement);

    // Get all character and line spans
    const chars = content.querySelectorAll(".char span");
    const lines = content.querySelectorAll(".line span");
    const paragraph = content.querySelector(".slide-description p");
    const button = content.querySelector(".slide-button button");

    // Set initial position
    gsap.set([chars, lines], { y: "100%" });
    gsap.set(paragraph, { opacity: 0, y: 20 });
    gsap.set(button, { opacity: 0, y: 20 });

    // Animate characters in
    gsap.to(chars, {
      y: "0%",
      duration: 0.8,
      stagger: 0.025,
      ease: "power2.out"
    });

    // Animate lines in with delay
    gsap.to(lines, {
      y: "0%",
      duration: 0.8,
      stagger: 0.025,
      ease: "power2.out",
      delay: 0.2
    });

    // Animate paragraph in after heading animation
    gsap.to(paragraph, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: "power2.out",
      delay: 0.8
    });

    // Animate button in after paragraph animation
    gsap.to(button, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: "power2.out",
      delay: 1.0
    });
  };

  const initializeRenderer = async () => {
    if (!canvasRef.current) return;

    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);

    renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      antialias: true,
    });
    renderer.setSize(window.innerWidth, window.innerHeight);

    shaderMaterial = new THREE.ShaderMaterial({
      uniforms: {
        uTexture1: { value: null },
        uTexture2: { value: null },
        uProgress: { value: 0.0 },
        uResolution: {
          value: new THREE.Vector2(window.innerWidth, window.innerHeight),
        },
        uTexture1Size: { value: new THREE.Vector2(1, 1) },
        uTexture2Size: { value: new THREE.Vector2(1, 1) },
        uCurrentSlideIndex: { value: 0 },
        uIsVideo1: { value: false },
        uIsVideo2: { value: false },
      },
      vertexShader,
      fragmentShader,
    });

    scene.add(new THREE.Mesh(new THREE.PlaneGeometry(2, 2), shaderMaterial));

    const loader = new THREE.TextureLoader();
    for (const slide of slides) {
      let texture;
      if (slide.type === "image") {
        texture = await new Promise<THREE.Texture>((resolve) =>
          loader.load(slide.image, resolve)
        );
        texture.minFilter = texture.magFilter = THREE.LinearFilter;
        texture.userData = {
          size: new THREE.Vector2(texture.image.width, texture.image.height),
          type: "image"
        };
      } else if (slide.type === "video") {
        // For videos, we'll create a video texture
        texture = await new Promise<THREE.Texture>((resolve) => {
          const video = document.createElement('video');
          video.src = slide.image;
          video.crossOrigin = 'anonymous';
          video.loop = true;
          video.muted = true;
          video.playsInline = true;
          video.style.display = 'none';
          document.body.appendChild(video);

          video.addEventListener('loadedmetadata', () => {
            // Create a video texture from the video element
            const videoTexture = new THREE.VideoTexture(video);
            videoTexture.minFilter = videoTexture.magFilter = THREE.LinearFilter;
            videoTexture.userData = {
              size: new THREE.Vector2(video.videoWidth, video.videoHeight),
              type: "video",
              videoElement: video
            };
            resolve(videoTexture);
          });
        });
      }
      slideTextures.push(texture as THREE.Texture);
    }

    // Set initial textures (only for image slides)
    const firstImageSlide = slides.findIndex(slide => slide.type === "image");
    const secondImageSlide = slides.findIndex((slide, index) => index > firstImageSlide && slide.type === "image");

    if (firstImageSlide !== -1) {
      shaderMaterial.uniforms.uTexture1.value = slideTextures[firstImageSlide];
      shaderMaterial.uniforms.uTexture1Size.value = slideTextures[firstImageSlide].userData.size;
    }

    if (secondImageSlide !== -1) {
      shaderMaterial.uniforms.uTexture2.value = slideTextures[secondImageSlide];
      shaderMaterial.uniforms.uTexture2Size.value = slideTextures[secondImageSlide].userData.size;
    }

    console.log('Shader material is now ready!');

    const render = () => {
      requestAnimationFrame(render);
      if (renderer) {
        renderer.render(scene, camera);
      }
    };
    render();
  };

  const handleSlideChange = (direction = 'next') => {
    if (isTransitioning) return;

    isTransitioning = true;
    let nextIndex;

    if (direction === 'next') {
      nextIndex = (currentSlideIndex + 1) % slides.length;
    } else {
      nextIndex = currentSlideIndex === 0 ? slides.length - 1 : currentSlideIndex - 1;
    }

    // Update video overlays
    updateVideoOverlays(currentSlideIndex, nextIndex);

    // Only use shader transitions for image-to-image slides
    const currentSlide = slides[currentSlideIndex];
    const nextSlide = slides[nextIndex];

    if (currentSlide.type === "image" && nextSlide.type === "image" && shaderMaterial) {
      // Use shader transition for image-to-image
      shaderMaterial.uniforms.uTexture1.value = slideTextures[currentSlideIndex];
      shaderMaterial.uniforms.uTexture2.value = slideTextures[nextIndex];
      shaderMaterial.uniforms.uTexture1Size.value =
        slideTextures[currentSlideIndex].userData.size;
      shaderMaterial.uniforms.uTexture2Size.value =
        slideTextures[nextIndex].userData.size;

      gsap.fromTo(
        shaderMaterial.uniforms.uProgress,
        { value: 0 },
        {
          value: 1,
          duration: 2.5,
          ease: "power2.inOut",
          onComplete: () => {
            if (shaderMaterial) {
              shaderMaterial.uniforms.uProgress.value = 0;
              shaderMaterial.uniforms.uTexture1.value = slideTextures[nextIndex];
              shaderMaterial.uniforms.uTexture1Size.value =
                slideTextures[nextIndex].userData.size;
              shaderMaterial.uniforms.uCurrentSlideIndex.value = nextIndex;
            }
            isTransitioning = false;
            currentSlideIndex = nextIndex;
          },
        }
      );
    } else {
      // For video slides or mixed transitions, just animate the content
      animateSlideTransition(nextIndex);
      isTransitioning = false;
      currentSlideIndex = nextIndex;
    }
  };

  const startAutoPlay = () => {
    // Clear any existing interval
    if (autoPlayInterval) {
      clearInterval(autoPlayInterval);
    }

    // Start auto-play - change slide every 5 seconds
    autoPlayInterval = setInterval(() => {
      if (!isTransitioning && shaderMaterial && slideTextures.length > 0) {
        // Additional safety check: ensure textures are loaded
        const nextIndex = (currentSlideIndex + 1) % slides.length;
        if (slideTextures[nextIndex] && slideTextures[nextIndex].userData?.size) {
          handleSlideChange('next');
        }
      }
    }, 5000); // 5 seconds
  };

  const stopAutoPlay = () => {
    if (autoPlayInterval) {
      clearInterval(autoPlayInterval);
      autoPlayInterval = null;
    }
  };

  const createRipple = (x: number, y: number) => {
    console.log('Creating ripple at:', x, y);

    const rippleId = Date.now();
    const rippleElement = document.createElement('div');

    // Style the ripple element
    Object.assign(rippleElement.style, {
      position: 'fixed',
      left: x + 'px',
      top: y + 'px',
      width: '0px',
      height: '0px',
      borderRadius: '50%',
      border: '3px solid rgba(255, 255, 255, 0.9)',
      backgroundColor: 'rgba(255, 255, 255, 0.2)',
      pointerEvents: 'none',
      zIndex: '9999',
      transform: 'translate(-50%, -50%)',
      opacity: '1',
      boxShadow: '0 0 20px rgba(255, 255, 255, 0.5)',
      transition: 'all 0.6s ease-out'
    });

    // Add to DOM
    document.body.appendChild(rippleElement);
    rippleRefs.current.set(rippleId, rippleElement);

    // Trigger animation
    requestAnimationFrame(() => {
      rippleElement.style.width = '200px';
      rippleElement.style.height = '200px';
      rippleElement.style.opacity = '0';
    });

    // Clean up after animation
    setTimeout(() => {
      if (rippleElement.parentNode) {
        rippleElement.parentNode.removeChild(rippleElement);
      }
      rippleRefs.current.delete(rippleId);
    }, 600);
  };

  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    console.log('Click detected!', event.clientX, event.clientY);

    // Stop auto-play temporarily when user clicks
    stopAutoPlay();

    // Create ripple effect at click position (always works)
    createRipple(event.clientX, event.clientY);

    // Check if renderer is initialized before proceeding with slide change
    if (!shaderMaterial) {
      console.log('Shader material not ready - ripple created but slide change skipped');
      // Restart auto-play even if we can't change slides
      setTimeout(() => {
        startAutoPlay();
      }, 1000);
      return;
    }

    // Determine which side was clicked
    const rect = event.currentTarget.getBoundingClientRect();
    const clickX = event.clientX - rect.left;
    const isRightSide = clickX > rect.width / 2;

    console.log('Click side:', isRightSide ? 'right' : 'left');

    // Handle the slide change based on click position
    handleSlideChange(isRightSide ? 'next' : 'prev');

    // Restart auto-play after a short delay
    setTimeout(() => {
      startAutoPlay();
    }, 1000); // Wait 1 second before restarting auto-play
  };

  const handleResize = () => {
    if (renderer && shaderMaterial) {
      renderer.setSize(window.innerWidth, window.innerHeight);
      shaderMaterial.uniforms.uResolution.value.set(
        window.innerWidth,
        window.innerHeight
      );
    }
  };

  const createVideoOverlay = (slideData: { title: string; description: string; image: string; type: string; buttonText: string; buttonLink: string }, slideIndex: number) => {
    // Remove any existing video overlay for this slide
    const existingVideo = videoRefs.current.get(slideIndex);
    if (existingVideo) {
      existingVideo.remove();
      videoRefs.current.delete(slideIndex);
    }

    if (slideData.type === "video") {
      const videoOverlay = document.createElement('div');
      videoOverlay.className = 'video-overlay';
      videoOverlay.style.cssText = `
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: 0;
        pointer-events: none;
      `;

      const video = document.createElement('video');
      video.src = slideData.image;
      video.style.cssText = `
        width: 100%;
        height: 100%;
        object-fit: cover;
        pointer-events: none;
      `;
      video.loop = true;
      video.muted = true;
      video.playsInline = true;
      video.autoplay = true;
      video.preload = 'auto'; // Force preloading

      // Wait for video to be ready before showing
      video.addEventListener('loadeddata', () => {
        console.log(`Video ${slideIndex} loaded:`, slideData.image);
      });

      video.addEventListener('canplaythrough', () => {
        console.log(`Video ${slideIndex} can play through:`, slideData.image);
      });

      videoOverlay.appendChild(video);
      if (sliderRef.current) {
        (sliderRef.current as HTMLElement).appendChild(videoOverlay);
      }
      videoRefs.current.set(slideIndex, videoOverlay);

      // Start playing the video
      video.play().catch(e => console.log('Video autoplay failed:', e));
    }
  };

  const removeVideoOverlay = (slideIndex: number) => {
    const videoOverlay = videoRefs.current.get(slideIndex);
    if (videoOverlay) {
      videoOverlay.remove();
      videoRefs.current.delete(slideIndex);
    }
  };

  const updateVideoOverlays = (currentIndex: number, nextIndex: number) => {
    // Remove current video overlay if it exists
    removeVideoOverlay(currentIndex);

    // Add new video overlay if the next slide is a video
    if (slides[nextIndex].type === "video") {
      createVideoOverlay(slides[nextIndex], nextIndex);

      // Hide canvas when video is active to prevent interference
      if (canvasRef.current) {
        (canvasRef.current as HTMLCanvasElement).style.opacity = '0';
      }
    } else {
      // Show canvas when image slide is active
      if (canvasRef.current) {
        (canvasRef.current as HTMLCanvasElement).style.opacity = '1';
      }
    }
  };

  useEffect(() => {
    gsap.registerPlugin(SplitText);
    gsap.config({ nullTargetWarn: false });

    const initSlider = async () => {
      setupInitialSlide();
      await initializeRenderer();

      // Initialize video overlay for first slide if it's a video
      if (slides[0].type === "video") {
        createVideoOverlay(slides[0], 0);
        // Hide canvas for video slides
        if (canvasRef.current) {
          (canvasRef.current as HTMLCanvasElement).style.opacity = '0';
        }
      } else {
        // Show canvas for image slides
        if (canvasRef.current) {
          (canvasRef.current as HTMLCanvasElement).style.opacity = '1';
        }
      }
    };

    initSlider();
    window.addEventListener("resize", handleResize);

    // Start auto-play after initialization
    setTimeout(() => {
      startAutoPlay();
    }, 3000); // Start auto-play after 3 seconds

    return () => {
      window.removeEventListener("resize", handleResize);
      if (renderer) {
        renderer.dispose();
      }
      // Clean up auto-play interval
      stopAutoPlay();

      // Clean up video overlays
      videoRefs.current.forEach((videoOverlay) => {
        if (videoOverlay) {
          videoOverlay.remove();
        }
      });
      videoRefs.current.clear();
    };
  }, []);

  return (
    <div
      className="slider"
      ref={sliderRef}
      onClick={handleClick}
      style={{
        position: 'relative',
        width: '100vw',
        height: '100svh',
        color: '#fff',
        overflow: 'hidden',
        cursor: 'pointer',
        backgroundColor: '#000',
        // Ensure slider is above generic overlays (except explicit UI controls)
        zIndex: 9000,
        pointerEvents: 'auto',
      }}
    >
      <canvas
        ref={canvasRef}
        style={{
          display: 'block',
          width: '100%',
          height: '100%',
          position: 'relative',
          zIndex: 1,
          backgroundColor: 'transparent',
          transition: 'opacity 0.5s ease-in-out'
        }}
      />

      <div
        className="slider-content"
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          userSelect: 'none',
          zIndex: 2
        }}
      >

        <div
          className="slide-title"
          style={{
            position: 'absolute',
            top: '25%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '100%',
            textAlign: 'center'
          }}
        >
          <h1 style={{
            textTransform: 'uppercase',
            fontSize: '6.5vw',
            fontWeight: 700,
            lineHeight: 1,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '0.05em',
            WebkitTextStroke: '2px #991b1b',
            color: 'white'
          }}>
            {/* First line: "Engineering a" */}
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <div className="word" style={{ display: 'flex' }}>
                <div className="char" style={{ display: 'block' }}>
                  <span style={{ display: 'inline-block', willChange: 'transform', position: 'relative' }}>E</span>
                </div>
                <div className="char" style={{ display: 'block' }}>
                  <span style={{ display: 'inline-block', willChange: 'transform', position: 'relative' }}>n</span>
                </div>
                <div className="char" style={{ display: 'block' }}>
                  <span style={{ display: 'inline-block', willChange: 'transform', position: 'relative' }}>g</span>
                </div>
                <div className="char" style={{ display: 'block' }}>
                  <span style={{ display: 'inline-block', willChange: 'transform', position: 'relative' }}>i</span>
                </div>
                <div className="char" style={{ display: 'block' }}>
                  <span style={{ display: 'inline-block', willChange: 'transform', position: 'relative' }}>n</span>
                </div>
                <div className="char" style={{ display: 'block' }}>
                  <span style={{ display: 'inline-block', willChange: 'transform', position: 'relative' }}>e</span>
                </div>
                <div className="char" style={{ display: 'block' }}>
                  <span style={{ display: 'inline-block', willChange: 'transform', position: 'relative' }}>e</span>
                </div>
                <div className="char" style={{ display: 'block' }}>
                  <span style={{ display: 'inline-block', willChange: 'transform', position: 'relative' }}>r</span>
                </div>
                <div className="char" style={{ display: 'block' }}>
                  <span style={{ display: 'inline-block', willChange: 'transform', position: 'relative' }}>i</span>
                </div>
                <div className="char" style={{ display: 'block' }}>
                  <span style={{ display: 'inline-block', willChange: 'transform', position: 'relative' }}>n</span>
                </div>
                <div className="char" style={{ display: 'block' }}>
                  <span style={{ display: 'inline-block', willChange: 'transform', position: 'relative' }}>g</span>
                </div>
              </div>
              <div className="word" style={{ display: 'flex' }}>
                <div className="char" style={{ display: 'block' }}>
                  <span style={{ display: 'inline-block', willChange: 'transform', position: 'relative', width: '0.3em' }}> </span>
                </div>
              </div>
              <div className="word" style={{ display: 'flex' }}>
                <div className="char" style={{ display: 'block' }}>
                  <span style={{ display: 'inline-block', willChange: 'transform', position: 'relative' }}>a</span>
                </div>
              </div>
            </div>
            {/* Second line: "Digital Future" */}
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <div className="word" style={{ display: 'flex' }}>
                <div className="char" style={{ display: 'block' }}>
                  <span style={{ display: 'inline-block', willChange: 'transform', position: 'relative' }}>D</span>
                </div>
                <div className="char" style={{ display: 'block' }}>
                  <span style={{ display: 'inline-block', willChange: 'transform', position: 'relative' }}>i</span>
                </div>
                <div className="char" style={{ display: 'block' }}>
                  <span style={{ display: 'inline-block', willChange: 'transform', position: 'relative' }}>g</span>
                </div>
                <div className="char" style={{ display: 'block' }}>
                  <span style={{ display: 'inline-block', willChange: 'transform', position: 'relative' }}>i</span>
                </div>
                <div className="char" style={{ display: 'block' }}>
                  <span style={{ display: 'inline-block', willChange: 'transform', position: 'relative' }}>t</span>
                </div>
                <div className="char" style={{ display: 'block' }}>
                  <span style={{ display: 'inline-block', willChange: 'transform', position: 'relative' }}>a</span>
                </div>
                <div className="char" style={{ display: 'block' }}>
                  <span style={{ display: 'inline-block', willChange: 'transform', position: 'relative' }}>l</span>
                </div>
              </div>
              <div className="word" style={{ display: 'flex' }}>
                <div className="char" style={{ display: 'block' }}>
                  <span style={{ display: 'inline-block', willChange: 'transform', position: 'relative', width: '0.3em' }}> </span>
                </div>
              </div>
              <div className="word" style={{ display: 'flex' }}>
                <div className="char" style={{ display: 'block' }}>
                  <span style={{ display: 'inline-block', willChange: 'transform', position: 'relative' }}>F</span>
                </div>
                <div className="char" style={{ display: 'block' }}>
                  <span style={{ display: 'inline-block', willChange: 'transform', position: 'relative' }}>u</span>
                </div>
                <div className="char" style={{ display: 'block' }}>
                  <span style={{ display: 'inline-block', willChange: 'transform', position: 'relative' }}>t</span>
                </div>
                <div className="char" style={{ display: 'block' }}>
                  <span style={{ display: 'inline-block', willChange: 'transform', position: 'relative' }}>u</span>
                </div>
                <div className="char" style={{ display: 'block' }}>
                  <span style={{ display: 'inline-block', willChange: 'transform', position: 'relative' }}>r</span>
                </div>
                <div className="char" style={{ display: 'block' }}>
                  <span style={{ display: 'inline-block', willChange: 'transform', position: 'relative' }}>e</span>
                </div>
              </div>
            </div>
          </h1>
        </div>
        <div
          className="slide-description"
          style={{
            position: 'absolute',
            top: '60%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '55%',
            display: 'flex',
            flexDirection: 'column',
            gap: '2rem',
            textAlign: 'center'
          }}
        >
          <p style={{
            fontSize: '1.4rem',
            lineHeight: '1.6',
            letterSpacing: '0.02em',
            wordSpacing: '0.1em'
          }}>
            We design, deploy, and support digital infrastructure to maximise value in fixed line, subsea, data centres and wireless networks.
          </p>
        </div>

        {/* Button for initial slide */}
        <div
          className="slide-button"
          style={{
            position: 'absolute',
            bottom: '12%',
            left: '50%',
            transform: 'translate(-50%, 0)',
            zIndex: 10
          }}
        >
          <button
            style={{
              background: '#991b1b',
              border: '2px solid white',
              color: 'white',
              padding: '8px 24px',
              fontSize: '1rem',
              fontWeight: 600,
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              position: 'relative',
              overflow: 'hidden',
              borderRadius: '9999px'
            }}
            onClick={(e) => {
              e.stopPropagation();
              window.location.href = '/our-services';
            }}
            onMouseEnter={(e) => {
              (e.target as HTMLElement).style.background = 'white';
              (e.target as HTMLElement).style.border = '2px solid white';
              (e.target as HTMLElement).style.color = '#991b1b';
              (e.target as HTMLElement).style.transform = 'scale(1.05)';
            }}
            onMouseLeave={(e) => {
              (e.target as HTMLElement).style.background = '#991b1b';
              (e.target as HTMLElement).style.border = '2px solid white';
              (e.target as HTMLElement).style.color = 'white';
              (e.target as HTMLElement).style.transform = 'scale(1)';
            }}
          >
            Learn More
          </button>
        </div>
      </div>

      <style jsx>{`
        .char,
        .line {
          overflow: hidden;
        }

        .char span,
        .line span {
          display: inline-block;
          will-change: transform;
          position: relative;
        }

        .video-overlay {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          z-index: 0;
          pointer-events: none;
        }

        .video-overlay video {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        /* Ensure text content is always on top */
        .slider-content {
          z-index: 2 !important;
        }

        /* Ensure canvas is above videos but below text */
        canvas {
          z-index: 1 !important;
        }

        @media (max-width: 1000px) {
          .slide-title {
            top: 50% !important;
          }

          .slide-description {
            width: 75% !important;
            text-align: center !important;
            top: unset !important;
            bottom: 15% !important;
            left: 50% !important;
            transform: translate(-50%, -50%) !important;
          }

          .slide-button {
            bottom: 3% !important;
          }

          .slide-button button {
            padding: 12px 30px !important;
            font-size: 1rem !important;
          }
        }
      `}</style>
    </div>
  );
};

export default HeroSlider;
