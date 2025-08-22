import React, { useEffect, useRef } from 'react';
import './trying.css';

const Trying: React.FC = () => {
  const parallaxRefs = useRef<(HTMLElement | null)[]>([]);
  const mainRef = useRef<HTMLElement>(null);
  const timelineRef = useRef<any>(null);

  useEffect(() => {
    // Initialize GSAP timeline - check if GSAP is available
    const gsap = (window as any).gsap;
    if (gsap) {
      timelineRef.current = gsap.timeline();
      
      // Animation for parallax elements
      parallaxRefs.current
        .filter((el) => el && !el.classList.contains("text"))
        .forEach((el) => {
          if (el && timelineRef.current) {
            const distance = el.dataset.distance || "0";
            timelineRef.current.from(
              el,
              {
                top: `${el.offsetHeight / 2 + parseInt(distance)}px`,
                duration: 3.5,
                ease: "power3.out",
              },
              "1"
            );
          }
        });

      // Text animations
      const textH1 = document.querySelector(".text h1");
      if (textH1 && timelineRef.current) {
        timelineRef.current.from(
          ".text h1",
          {
            y: window.innerHeight - textH1.getBoundingClientRect().top + 200,
            duration: 2,
          },
          "2.5"
        );
      }

      timelineRef.current
        .from(
          ".text h2",
          {
            y: -150,
            opacity: 0,
            duration: 1.5,
          },
          "3"
        )
        .from(
          ".hide",
          {
            opacity: 0,
            duration: 1.5,
          },
          "3"
        );
    }

    // Mouse move event listener
    const handleMouseMove = (e: MouseEvent) => {
      if (timelineRef.current?.isActive()) return;

      const xValue = e.clientX - window.innerWidth / 2;
      const yValue = e.clientY - window.innerHeight / 2;
      const rotateDegree = (xValue / (window.innerWidth / 2)) * 20;

      updateParallax(e.clientX, xValue, yValue, rotateDegree);
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  const updateParallax = (cursorPosition: number, xValue: number, yValue: number, rotateDegree: number) => {
    parallaxRefs.current.forEach((el) => {
      if (!el) return;

      const speedX = parseFloat(el.dataset.speedx || "0");
      const speedY = parseFloat(el.dataset.speedy || "0");
      const speedZ = parseFloat(el.dataset.speedz || "0");
      const rotationSpeed = parseFloat(el.dataset.rotation || "0");

      const isInLeft = parseFloat(getComputedStyle(el).left) < window.innerWidth / 2 ? 1 : -1;
      const zValue = (cursorPosition - parseFloat(getComputedStyle(el).left)) * isInLeft * 0.1;

      el.style.transform = `perspective(2300px) translateZ(${
        zValue * speedZ
      }px) rotateY(${rotateDegree * rotationSpeed}deg) translateX(calc(-50% + ${
        -xValue * speedX
      }px)) translateY(calc(-50% + ${yValue * speedY}px))`;
    });
  };

  const setParallaxRef = (el: HTMLElement | null, index: number) => {
    parallaxRefs.current[index] = el;
  };

  return (
    <div className="trying-container">
      {/* <header className="hide">
        <nav>
          <img src="/img/logo.png" alt="Travelo" className="logo" />
          <ul>
            <li><a href="#" title="Login">Login</a></li>
            <li><a href="#" title="Sign up">Sign Up</a></li>
            <li className="search">
              <a href="#" title="Search">
                <i className="fa-solid fa-magnifying-glass"></i>
              </a>
            </li>
            <li className="hamburger">
              <a href="#" title="hamburger">
                <div className="bar"></div>
              </a>
            </li>
          </ul>
        </nav>
      </header> */}
      
      <main ref={mainRef}>
        <div className="data">
          <div className="vignette hide"></div>
          
          <img
            src="/img/background.png"
            data-speedx="0.3"
            data-speedy="0.38"
            data-speedz="0"
            data-rotation="0"
            data-distance="-200"
            alt="background"
            className="parallax bg-img"
            ref={(el) => setParallaxRef(el, 0)}
          />
          
          <img
            src="/img/fog_7.png"
            data-speedx="0.27"
            data-speedy="0.32"
            data-speedz="0"
            data-rotation="0"
            data-distance="850"
            alt="fog layer 7"
            className="parallax fog-7"
            ref={(el) => setParallaxRef(el, 1)}
          />
          
          <img
            src="/img/mountain_10.png"
            data-speedx="0.195"
            data-speedy="0.305"
            data-speedz="0"
            data-rotation="0"
            data-distance="1100"
            alt="mountain 10"
            className="parallax mountain-10"
            ref={(el) => setParallaxRef(el, 2)}
          />
          
          <img
            src="/img/fog_6.png"
            data-speedx="0.25"
            data-speedy="0.28"
            data-speedz="0"
            data-rotation="0"
            data-distance="1400"
            alt="fog layer 6"
            className="parallax fog-6"
            ref={(el) => setParallaxRef(el, 3)}
          />
          
          <img
            src="/img/mountain_9.png"
            data-speedx="0.125"
            data-speedy="0.155"
            data-speedz="0.15"
            data-rotation="0.02"
            data-distance="1700"
            alt="mountain 9"
            className="parallax mountain-9"
            ref={(el) => setParallaxRef(el, 4)}
          />
          
          <img
            src="/img/mountain_8.png"
            data-speedx="0.1"
            data-speedy="0.11"
            data-speedz="0"
            data-rotation="0.02"
            data-distance="1800"
            alt="mountain 8"
            className="parallax mountain-8"
            ref={(el) => setParallaxRef(el, 5)}
          />
          
          <img
            src="/img/fog_5.png"
            data-speedx="0.16"
            data-speedy="0.105"
            data-speedz="0"
            data-rotation="0"
            data-distance="1900"
            alt="fog layer 5"
            className="parallax fog-5"
            ref={(el) => setParallaxRef(el, 6)}
          />
          
          <img
            src="/img/mountain_7.png"
            data-speedx="0.1"
            data-speedy="0.1"
            data-speedz="0"
            data-rotation="0.09"
            data-distance="2000"
            alt="mountain 7"
            className="parallax mountain-7"
            ref={(el) => setParallaxRef(el, 7)}
          />
          
          <div
            className="text parallax"
            data-speedx="0.07"
            data-speedy="0.07"
            data-speedz="0"
            data-rotation="0.11"
            data-distance="0"
            ref={(el) => setParallaxRef(el, 8)}
          >
            <h2>China</h2>
            <h1>Zhangjiakou</h1>
          </div>
          
          <img
            src="/img/mountain_6.png"
            data-speedx="0.065"
            data-speedy="0.05"
            data-speedz="0.05"
            data-rotation="0.12"
            data-distance="2300"
            alt="mountain 6"
            className="parallax mountain-6"
            ref={(el) => setParallaxRef(el, 9)}
          />
          
          <img
            src="/img/fog_4.png"
            data-speedx="0.135"
            data-speedy="0.1"
            data-speedz="0"
            data-rotation="0"
            data-distance="2400"
            alt="fog layer 4"
            className="parallax fog-4"
            ref={(el) => setParallaxRef(el, 10)}
          />
          
          <img
            src="/img/mountain_5.png"
            data-speedx="0.08"
            data-speedy="0.05"
            data-speedz="0.13"
            data-rotation="0.1"
            data-distance="2550"
            alt="mountain 5"
            className="parallax mountain-5"
            ref={(el) => setParallaxRef(el, 11)}
          />
          
          <img
            src="/img/fog_3.png"
            data-speedx="0.11"
            data-speedy="0.018"
            data-speedz="0"
            data-rotation="0"
            data-distance="2800"
            alt="fog layer 3"
            className="parallax fog-3"
            ref={(el) => setParallaxRef(el, 12)}
          />
          
          <img
            src="/img/mountain_4.png"
            data-speedx="0.059"
            data-speedy="0.024"
            data-speedz="0.35"
            data-rotation="0.14"
            data-distance="3200"
            alt="mountain 4"
            className="parallax mountain-4"
            ref={(el) => setParallaxRef(el, 13)}
          />
          
          <img
            src="/img/mountain_3.png"
            data-speedx="0.04"
            data-speedy="0.018"
            data-speedz="0.32"
            data-rotation="0.05"
            data-distance="3400"
            alt="mountain 3"
            className="parallax mountain-3"
            ref={(el) => setParallaxRef(el, 14)}
          />
          
          <img
            src="/img/fog_2.png"
            data-speedx="0.15"
            data-speedy="0.0115"
            data-speedz="0"
            data-rotation="0"
            data-distance="3600"
            alt="fog layer 2"
            className="parallax fog-2"
            ref={(el) => setParallaxRef(el, 15)}
          />
          
          <img
            src="/img/mountain_2.png"
            data-speedx="0.0235"
            data-speedy="0.013"
            data-speedz="0.42"
            data-rotation="0.15"
            data-distance="3800"
            alt="mountain 2"
            className="parallax mountain-2"
            ref={(el) => setParallaxRef(el, 16)}
          />
          
          <img
            src="/img/mountain_1.png"
            data-speedx="0.027"
            data-speedy="0.018"
            data-speedz="0.53"
            data-rotation="0.2"
            data-distance="4000"
            alt="mountain 1"
            className="parallax mountain-1"
            ref={(el) => setParallaxRef(el, 17)}
          />
          
          <img src="/img/sun_rays.png" alt="sun rays" className="sun-rays hide" />
          <img src="/img/black_shadow.png" alt="black shadow" className="black-shadow hide" />
          
          <img
            src="/img/fog_1.png"
            data-speedx="0.12"
            data-speedy="0.01"
            data-speedz="0"
            data-rotation="0"
            data-distance="4200"
            alt="fog layer 1"
            className="parallax fog-1"
            ref={(el) => setParallaxRef(el, 18)}
          />
        </div>
      </main>
    </div>
  );
};

export default Trying;

