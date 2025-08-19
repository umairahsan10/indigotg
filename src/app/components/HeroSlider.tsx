'use client';

import { useEffect, useRef } from "react";
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
    image: "/home/digital-future.png",
  },
     {
     title: "Design, Deploy, Support",
     description:
       "Indigo can solve problems in the most complex environments: greenfield, hyperscale or edge data centres, upgrade or a hybrid mix of multi-generational technologies.",
     image: "/home/design-deploy-support.png",
   },
     {
     title: "Field Engineering",
     description:
       "Our strategically located field technicians deliver first-line reactive/preventative maintenance, second-line remote technical support, and third line expert support.",
     image: "/home/field-engineering.png",
   },
     {
     title: "Survey & Design",
     description:
       "We identify the right information and convert it into actionable data to build powerful networks.",
     image: "/home/survey-design.png",
   },
     {
     title: "Indigo Subsea",
     description:
       "System operator support for modern submarine networks.",
     image: "/home/indigo-subsea.png",
   },
     {
     title: "NOC Services",
     description:
       "Minimizes outage times and keeps society collaborating. Fully staffed 24x7x365",
     image: "/solutions/card-images-5.jpg",
   },
];

const HeroSlider = () => {
  const canvasRef = useRef(null);
  const sliderRef = useRef(null);

  // Keep these as module-level variables like in the original
  let currentSlideIndex = 0;
  let isTransitioning = false;
  let slideTextures = [];
  let shaderMaterial, renderer;
  let autoPlayInterval;

  const createCharacterElements = (element) => {
    if (element.querySelectorAll(".char").length > 0) return;

    const words = element.textContent.split(" ");
    element.innerHTML = "";

    words.forEach((word, index) => {
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

  const createLineElements = (element) => {
    new SplitText(element, { type: "lines", linesClass: "line" });
    element.querySelectorAll(".line").forEach((line) => {
      line.innerHTML = `<span>${line.textContent}</span>`;
    });
  };

  const processTextElements = (container) => {
    const title = container.querySelector(".slide-title h1");
    if (title) createCharacterElements(title);

    container
      .querySelectorAll(".slide-description p")
      .forEach(createLineElements);
  };

  const createSlideElement = (slideData) => {
    const content = document.createElement("div");
    content.className = "slider-content";
    content.style.opacity = "0";

         // Create the title with proper character structure
     const titleDiv = document.createElement("div");
     titleDiv.className = "slide-title";
     titleDiv.style.cssText = `
       position: absolute;
       top: 35%;
       left: 50%;
       transform: translate(-50%, -50%);
       width: 100%;
       text-align: center;
     `;
         const titleH1 = document.createElement("h1");
           titleH1.style.cssText = `
        text-transform: uppercase;
        font-size: 8.5vw;
        font-weight: 700;
        line-height: 1;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        gap: 0.05em;
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
         // Special handling for the second slide to split "Design, Deploy, Support"
         // First line: "Design,"
         const firstLineDiv = document.createElement("div");
         firstLineDiv.style.display = "flex";
         firstLineDiv.style.justifyContent = "center";
         
         ["Design,"].forEach((word) => {
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
         
         // Second line: "Deploy,"
         const secondLineDiv = document.createElement("div");
         secondLineDiv.style.display = "flex";
         secondLineDiv.style.justifyContent = "center";
         
         ["Deploy,"].forEach((word) => {
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
         
         // Third line: "Support"
         const thirdLineDiv = document.createElement("div");
         thirdLineDiv.style.display = "flex";
         thirdLineDiv.style.justifyContent = "center";
         
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
           
           thirdLineDiv.appendChild(wordDiv);
         });
         
         titleH1.appendChild(thirdLineDiv);
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
          // Special handling for the sixth slide to split "NOC Services"
          // First line: "NOC"
          const firstLineDiv = document.createElement("div");
          firstLineDiv.style.display = "flex";
          firstLineDiv.style.justifyContent = "center";
          
          ["NOC"].forEach((word) => {
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
          
          // Second line: "Services"
          const secondLineDiv = document.createElement("div");
          secondLineDiv.style.display = "flex";
          secondLineDiv.style.justifyContent = "center";
          
          ["Services"].forEach((word) => {
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
     } else {
       // Regular handling for other slides
       words.forEach((word, wordIndex) => {
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
        let topPosition = "60%";
        if (slideData.title === "Engineering a Digital Future") {
          topPosition = "65%"; // Lower position for first slide
        } else if (slideData.title === "Design, Deploy, Support") {
          topPosition = "75%"; // Lower position for 3-line title
        } else if (slideData.title === "Field Engineering") {
          topPosition = "65%"; // Lower position for Field Engineering
        }
      
      descriptionDiv.style.cssText = `
        position: absolute;
        top: ${topPosition};
        left: 50%;
        transform: translate(-50%, -50%);
        width: 40%;
        display: flex;
        flex-direction: column;
        gap: 2rem;
        text-align: center;
      `;
    
               // Main description paragraph
      const descP = document.createElement("p");
      descP.style.fontSize = "1.2rem";
      descP.textContent = slideData.description;
     descriptionDiv.appendChild(descP);

    content.appendChild(titleDiv);
    content.appendChild(descriptionDiv);

    return content;
  };

  const animateSlideTransition = (nextIndex) => {
    const currentContent = document.querySelector(".slider-content");
    const slider = sliderRef.current;

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
          slider.appendChild(newContent);

          gsap.set(newContent.querySelectorAll("span"), { y: "100%" });

          setTimeout(() => {
            // Process text elements for the new slide
            processTextElements(newContent);

            const newChars = newContent.querySelectorAll(".char span");
            const newLines = newContent.querySelectorAll(".line span");

            // Set initial positions
            gsap.set([newChars, newLines], { y: "100%" });
            gsap.set(newContent, { opacity: 1 });

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
              );
          }, 100);
        },
        null,
        0.5
      );
  };

  const setupInitialSlide = () => {
    const content = document.querySelector(".slider-content");

    // Process text elements for the initial slide
    processTextElements(content);

    // Get all character and line spans
    const chars = content.querySelectorAll(".char span");
    const lines = content.querySelectorAll(".line span");

    // Set initial position
    gsap.set([chars, lines], { y: "100%" });

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
  };

  const initializeRenderer = async () => {
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
      },
      vertexShader,
      fragmentShader,
    });

    scene.add(new THREE.Mesh(new THREE.PlaneGeometry(2, 2), shaderMaterial));

    const loader = new THREE.TextureLoader();
    for (const slide of slides) {
      const texture = await new Promise((resolve) =>
        loader.load(slide.image, resolve)
      );
      texture.minFilter = texture.magFilter = THREE.LinearFilter;
      texture.userData = {
        size: new THREE.Vector2(texture.image.width, texture.image.height),
      };
      slideTextures.push(texture);
    }

    shaderMaterial.uniforms.uTexture1.value = slideTextures[0];
    shaderMaterial.uniforms.uTexture2.value = slideTextures[1];
    shaderMaterial.uniforms.uTexture1Size.value =
      slideTextures[0].userData.size;
    shaderMaterial.uniforms.uTexture2Size.value =
      slideTextures[1].userData.size;

    const render = () => {
      requestAnimationFrame(render);
      renderer.render(scene, camera);
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

    shaderMaterial.uniforms.uTexture1.value = slideTextures[currentSlideIndex];
    shaderMaterial.uniforms.uTexture2.value = slideTextures[nextIndex];
    shaderMaterial.uniforms.uTexture1Size.value =
      slideTextures[currentSlideIndex].userData.size;
    shaderMaterial.uniforms.uTexture2Size.value =
      slideTextures[nextIndex].userData.size;

    animateSlideTransition(nextIndex);

    gsap.fromTo(
      shaderMaterial.uniforms.uProgress,
      { value: 0 },
      {
        value: 1,
        duration: 2.5,
        ease: "power2.inOut",
        onComplete: () => {
          shaderMaterial.uniforms.uProgress.value = 0;
          shaderMaterial.uniforms.uTexture1.value = slideTextures[nextIndex];
          shaderMaterial.uniforms.uTexture1Size.value =
            slideTextures[nextIndex].userData.size;
        },
      }
    );
  };

  const startAutoPlay = () => {
    // Clear any existing interval
    if (autoPlayInterval) {
      clearInterval(autoPlayInterval);
    }
    
    // Start auto-play - change slide every 5 seconds
    autoPlayInterval = setInterval(() => {
      if (!isTransitioning) {
        handleSlideChange('next');
      }
    }, 5000); // 5 seconds
  };

  const stopAutoPlay = () => {
    if (autoPlayInterval) {
      clearInterval(autoPlayInterval);
      autoPlayInterval = null;
    }
  };

  const handleClick = (event) => {
    // Stop auto-play temporarily when user clicks
    stopAutoPlay();
    
    // Determine which side was clicked
    const rect = event.currentTarget.getBoundingClientRect();
    const clickX = event.clientX - rect.left;
    const isRightSide = clickX > rect.width / 2;
    
    // Handle the slide change based on click position
    handleSlideChange(isRightSide ? 'next' : 'prev');
    
    // Restart auto-play after a short delay
    setTimeout(() => {
      startAutoPlay();
    }, 1000); // Wait 1 second before restarting auto-play
  };

  const handleResize = () => {
    renderer.setSize(window.innerWidth, window.innerHeight);
    shaderMaterial.uniforms.uResolution.value.set(
      window.innerWidth,
      window.innerHeight
    );
  };

  useEffect(() => {
    gsap.registerPlugin(SplitText);
    gsap.config({ nullTargetWarn: false });

         const initSlider = async () => {
       setupInitialSlide();
       await initializeRenderer();
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
         cursor: 'pointer'
       }}
     >
      <canvas 
        ref={canvasRef}
        style={{
          display: 'block',
          width: '100%',
          height: '100%'
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
             top: '35%',
             left: '50%',
             transform: 'translate(-50%, -50%)',
             width: '100%',
             textAlign: 'center'
           }}
         >
                                 <h1 style={{
              textTransform: 'uppercase',
              fontSize: '8.5vw',
              fontWeight: 700,
              lineHeight: 1,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              gap: '0.05em'
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
                   <span style={{ display: 'inline-block', willChange: 'transform', position: 'relative' }}> </span>
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
                   <span style={{ display: 'inline-block', willChange: 'transform', position: 'relative' }}> </span>
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
              width: '40%',
              display: 'flex',
              flexDirection: 'column',
              gap: '2rem',
              textAlign: 'center'
            }}
         >
                                 <p style={{ fontSize: '1.2rem' }}>
              We design, deploy, and support digital infrastructure to maximise value in fixed line, subsea, data centres and wireless networks.
            </p>
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

        @media (max-width: 1000px) {
          .slide-title {
            top: 50% !important;
          }

          .slide-description {
            width: 75% !important;
            text-align: center !important;
            top: unset !important;
            bottom: 5% !important;
            left: 50% !important;
            transform: translate(-50%, -50%) !important;
          }
        }
      `}</style>
    </div>
  );
};

export default HeroSlider;
