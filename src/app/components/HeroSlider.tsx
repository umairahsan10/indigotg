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
    image: "/home/digital-future.png",
    buttonText: "Learn More",
    buttonLink: "/our-services"
  },
     {
     title: "Design, Deploy, Support",
     description:
       "Indigo can solve problems in the most complex environments: greenfield, hyperscale or edge data centres, upgrade or a hybrid mix of multi-generational technologies.",
     image: "/home/design-deploy-support.png",
     buttonText: "Our Services",
     buttonLink: "/our-services"
   },
     {
     title: "Field Engineering",
     description:
       "Our strategically located field technicians deliver first-line reactive/preventative maintenance, second-line remote technical support, and third line expert support.",
     image: "/home/field-engineering.png",
     buttonText: "Field Services",
     buttonLink: "/our-services"
   },
     {
     title: "Survey & Design",
     description:
       "We identify the right information and convert it into actionable data to build powerful networks.",
     image: "/home/survey-design.png",
     buttonText: "Survey Services",
     buttonLink: "/our-services"
   },
     {
     title: "Indigo Subsea",
     description:
       "System operator support for modern submarine networks.",
     image: "/home/indigo-subsea.png",
     buttonText: "Subsea Solutions",
     buttonLink: "/our-services"
   },
     {
     title: "NOC Services",
     description:
       "Minimizes outage times and keeps society collaborating. Fully staffed 24x7x365",
     image: "/solutions/card-images-5.jpg",
     buttonText: "NOC Services",
     buttonLink: "/our-services"
   },
];

const HeroSlider = () => {
  const canvasRef = useRef(null);
  const sliderRef = useRef(null);
  const rippleRefs = useRef(new Map());

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
         const fontSize = (slideData.title === "NOC Services" || slideData.title === "Design, Deploy, Support") ? "7.5vw" : "8.5vw";
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
        -webkit-text-stroke: 2px white;
        color: transparent;
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
          topPosition = "70%"; // Lower position for first slide
        } else if (slideData.title === "Design, Deploy, Support") {
          topPosition = "68%"; // Higher position for 3-line title
        } else if (slideData.title === "Field Engineering") {
          topPosition = "70%"; // Lower position for Field Engineering
        } else if (slideData.title === "Survey & Design") {
          topPosition = "70%"; // Lower position for Survey & Design
        } else if (slideData.title === "Indigo Subsea") {
          topPosition = "70%"; // Lower position for Indigo Subsea
        }
      
      descriptionDiv.style.cssText = `
        position: absolute;
        top: ${topPosition};
        left: 50%;
        transform: translate(-50%, -50%);
        width: ${slideData.title === "Design, Deploy, Support" ? "60%" : "55%"};
        display: flex;
        flex-direction: column;
        gap: 2rem;
        text-align: center;
      `;
    
               // Main description paragraph
      const descP = document.createElement("p");
      const descFontSize = (slideData.title === "Engineering a Digital Future" || slideData.title === "Design, Deploy, Support" || slideData.title === "NOC Services" || slideData.title === "Field Engineering" || slideData.title === "Survey & Design" || slideData.title === "Indigo Subsea") ? "1.6rem" : "1.2rem";
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
      bottom: 5%;
      left: 50%;
      transform: translate(-50%, 0);
      z-index: 10;
    `;

    const button = document.createElement("button");
    button.style.cssText = `
      background: transparent;
      border: 2px solid white;
      color: white;
      padding: 15px 40px;
      font-size: 1.1rem;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.1em;
      cursor: pointer;
      transition: all 0.3s ease;
      position: relative;
      overflow: hidden;
      backdrop-filter: blur(10px);
      background: rgba(255, 255, 255, 0.1);
    `;
    button.textContent = slideData.buttonText;

    // Add hover effects
    button.addEventListener('mouseenter', () => {
      button.style.background = 'rgba(255, 255, 255, 0.2)';
      button.style.transform = 'scale(1.05)';
    });

    button.addEventListener('mouseleave', () => {
      button.style.background = 'rgba(255, 255, 255, 0.1)';
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

    console.log('Shader material is now ready!');

    const render = () => {
      requestAnimationFrame(render);
      renderer.render(scene, camera);
    };
    render();
  };

  const handleSlideChange = (direction = 'next') => {
    if (isTransitioning || !shaderMaterial) return;

    isTransitioning = true;
    let nextIndex;
    
    if (direction === 'next') {
      nextIndex = (currentSlideIndex + 1) % slides.length;
    } else {
      nextIndex = currentSlideIndex === 0 ? slides.length - 1 : currentSlideIndex - 1;
    }

    // Safety check: ensure both textures exist before proceeding
    if (!slideTextures[currentSlideIndex] || !slideTextures[nextIndex]) {
      console.warn('Textures not ready yet, skipping slide change');
      isTransitioning = false;
      return;
    }

    // Safety check: ensure userData.size exists
    if (!slideTextures[currentSlideIndex].userData?.size || !slideTextures[nextIndex].userData?.size) {
      console.warn('Texture size data not ready yet, skipping slide change');
      isTransitioning = false;
      return;
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
          // Update the current slide index uniform
          shaderMaterial.uniforms.uCurrentSlideIndex.value = nextIndex;
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

  const createRipple = (x, y) => {
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

  const handleClick = (event) => {
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
              fontSize: '7.5vw',
              fontWeight: 700,
              lineHeight: 1,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              gap: '0.05em',
              WebkitTextStroke: '2px white',
              color: 'transparent'
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
              top: '70%',
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
              fontSize: '1.6rem',
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
            bottom: '5%',
            left: '50%',
            transform: 'translate(-50%, 0)',
            zIndex: 10
          }}
        >
          <button
            style={{
              background: 'transparent',
              border: '2px solid white',
              color: 'white',
              padding: '15px 40px',
              fontSize: '1.1rem',
              fontWeight: 600,
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              position: 'relative',
              overflow: 'hidden',
              backdropFilter: 'blur(10px)',
              background: 'rgba(255, 255, 255, 0.1)'
            }}
            onClick={(e) => {
              e.stopPropagation();
              window.location.href = '/our-services';
            }}
            onMouseEnter={(e) => {
              e.target.style.background = 'rgba(255, 255, 255, 0.2)';
              e.target.style.transform = 'scale(1.05)';
            }}
            onMouseLeave={(e) => {
              e.target.style.background = 'rgba(255, 255, 255, 0.1)';
              e.target.style.transform = 'scale(1)';
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
