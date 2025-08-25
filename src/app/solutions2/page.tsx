'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import TextFlip from '../components/TextFlip';




interface HorizontalLoopConfig {
  repeat?: number;
  speed?: number;
  paddingRight?: number;
}

function horizontalLoop(items: HTMLElement[], config?: HorizontalLoopConfig): gsap.core.Timeline {
  items = gsap.utils.toArray(items) as HTMLElement[];
  config = config || {};
  let tl = gsap.timeline({
    repeat: config.repeat,
    defaults: { ease: "none" },
  });
  let length = items.length;
  let startX = items[0].offsetLeft;
  let widths: number[] = [];
  let xPercents: number[] = [];
  let pixelsPerSecond = (config.speed || 1) * 100;
  let totalWidth: number, curX: number, distanceToStart: number, distanceToLoop: number, item: HTMLElement, i: number;

  gsap.set(items, {
    xPercent: (i: number, el: Element) => {
      let w = (widths[i] = parseFloat(gsap.getProperty(el, "width", "px") as string));
      xPercents[i] =
        (parseFloat(gsap.getProperty(el, "x", "px") as string) / w) * 100 +
        (gsap.getProperty(el, "xPercent") as number);
      return xPercents[i];
    },
  });

  gsap.set(items, { x: 0 });
  totalWidth =
    items[length - 1].offsetLeft +
    (xPercents[length - 1] / 100) * widths[length - 1] -
    startX +
    items[length - 1].offsetWidth *
    (gsap.getProperty(items[length - 1], "scaleX") as number) +
    (parseFloat(config.paddingRight?.toString() || "0"));

  for (i = 0; i < length; i++) {
    item = items[i] as HTMLElement;
    curX = (xPercents[i] / 100) * widths[i];
    distanceToStart = item.offsetLeft + curX - startX;
    distanceToLoop =
      distanceToStart + widths[i] * (gsap.getProperty(item, "scaleX") as number);
    tl.to(
      item,
      {
        xPercent: ((curX - distanceToLoop) / widths[i]) * 100,
        duration: distanceToLoop / pixelsPerSecond,
      },
      0
    ).fromTo(
      item,
      { xPercent: ((curX - distanceToLoop + totalWidth) / widths[i]) * 100 },
      {
        xPercent: xPercents[i],
        duration: (curX - distanceToLoop + totalWidth - curX) / pixelsPerSecond,
        immediateRender: false,
      },
      distanceToLoop / pixelsPerSecond
    );
  }

  tl.progress(1, true).progress(0, true);
  return tl;
}

// Main component
export default function Solutions2() {

  useEffect(() => {
    gsap.registerPlugin(SplitText, ScrollTrigger);

    // Lenis instance is managed globally in Navigation component

    const cards = gsap.utils.toArray(".card") as HTMLElement[];
    const introCard = cards[0];

    // Set initial opacity for all cards
    cards.forEach((card, index) => {
      const cardImg = card.querySelector(".card-img") as HTMLElement;
      gsap.set(cardImg, { opacity: 0 });
    });

    const titles = gsap.utils.toArray(".card-title h1");
    titles.forEach((title) => {
      const split = new SplitText(title as HTMLElement, {
        type: "chars",
        charsClass: "char",
        tag: "div",
      });
      split.chars.forEach((char) => {
        char.innerHTML = `<span>${char.textContent}</span>`;
      });
    });



    function animateContentIn(titleChars: NodeListOf<Element>, description: Element) {
      gsap.to(titleChars, { x: "0%", duration: 0.75, ease: "power4.out" });
      gsap.to(description, {
        x: 0,
        opacity: 1,
        duration: 0.75,
        delay: 0.1,
        ease: "power4.out",
      });
    }

    function animateContentOut(titleChars: NodeListOf<Element>, description: Element) {
      gsap.to(titleChars, { x: "100%", duration: 0.5, ease: "power4.out" });
      gsap.to(description, {
        x: "40px",
        opacity: 0,
        duration: 0.5,
        ease: "power4.out",
      });
    }





    cards.forEach((card, index) => {
      const isLastCard = index === cards.length - 1;
      ScrollTrigger.create({
        trigger: card as HTMLElement,
        start: "top top",
        end: isLastCard ? "+=100vh" : "top top",
        endTrigger: isLastCard ? null : cards[cards.length - 1] as HTMLElement,
        pin: true,
        pinSpacing: isLastCard,
      });
    });

    cards.forEach((card, index) => {
      if (index < cards.length - 1) {
        const cardWrapper = card.querySelector(".card-wrapper") as HTMLElement;
        ScrollTrigger.create({
          trigger: cards[index + 1] as HTMLElement,
          start: "top bottom",
          end: "top top",
          onUpdate: (self) => {
            const progress = self.progress;
            gsap.set(cardWrapper, {
              scale: 1 - progress * 0.25,
              opacity: 1 - progress * 0.5,
            });
          },
        });
      }
    });

    cards.forEach((card, index) => {
      const cardImg = card.querySelector(".card-img img") as HTMLImageElement;
      const imgContainer = card.querySelector(".card-img") as HTMLElement;
      ScrollTrigger.create({
        trigger: card as HTMLElement,
        start: "top bottom",
        end: "top top",
        onUpdate: (self) => {
          const progress = self.progress;
          gsap.set(cardImg, { scale: 2 - progress });
          gsap.set(imgContainer, {
            borderRadius: 150 - progress * 125 + "px",
            opacity: progress
          });
        },
      });
    });

    cards.forEach((card, index) => {
      const cardDescription = card.querySelector(".card-description") as HTMLElement;
      const cardTitleChars = card.querySelectorAll(".char span");
      const cardButton = card.querySelector(".card-button") as HTMLElement;

      // Animate content with proper sequencing
      ScrollTrigger.create({
        trigger: card as HTMLElement,
        start: "top top",
        onEnter: () => {
          // Create a timeline for proper sequencing
          const tl = gsap.timeline();

          // First animate title and description
          tl.add(() => animateContentIn(cardTitleChars, cardDescription));

          // Then animate button after a delay
          tl.to(cardButton, {
            x: 0,
            opacity: 1,
            duration: 0.75,
            ease: "power4.out",
          }, "+=0.8"); // 0.8 second delay after content animation
        },
        onLeaveBack: () => {
          animateContentOut(cardTitleChars, cardDescription);
          if (cardButton && cardButton instanceof HTMLElement) {
            gsap.to(cardButton, {
              x: "40px",
              opacity: 0,
              duration: 0.5,
              ease: "power4.out",
            });
          }
        },
      });
    });



    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <>
      <style jsx global>{`
        /* Override main layout styles for this page */
        html, body {
          overflow-x: hidden;
        }
        body {
          font-family: "Roboto", "Segoe UI", "Helvetica Neue", Arial, sans-serif;
          margin: 0;
          padding: 0;
        }

        /* Navigation is now visible */
        nav {
          display: block;
        }

        img {
          position: relative;
          width: 100%;
          height: 100%;
          object-fit: cover;
          will-change: transform;
        }

        h1 {
          font-size: 5rem;
          font-weight: 600;
          letter-spacing: -0.02rem;
          line-height: 1.2;
          font-family: "Roboto", "Segoe UI", "Helvetica Neue", Arial, sans-serif;
        }

        p {
          font-size: 1.125rem;
          font-weight: 400;
          line-height: 1.6;
          font-family: "Roboto", "Segoe UI", "Helvetica Neue", Arial, sans-serif;
        }

        section {
          position: relative;
          width: 100%;
          max-width: 100%;
          background-color: #ffffff;
          color: #1e3a8a;
        }

        .intro {
          min-height: 100vh;
          padding: 1.5em;
          display: flex;
          justify-content: center;
          align-items: center;
          position: relative;
          overflow: hidden;
        }

        .outro {
          height: 70vh;
          padding: 1.5em;
          display: flex;
          justify-content: center;
          align-items: center;
          position: relative;
          overflow: hidden;
          background: linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url('/solutions/handshake.png');
          background-size: cover;
          background-position: center;
          background-attachment: fixed;
        }

        .outro-container {
          position: relative;
          z-index: 2;
          width: 100%;
          max-width: 900px;
        }

        .outro-content {
          background: transparent;
          border: none;
          border-radius: 150px;
          padding: 3rem 2rem;
          text-align: center;
        }

        .outro h1 {
          color:#ffffff;
          font-size: 2.5rem;
          font-weight: 600;
          margin-bottom: 1.5rem;
          line-height: 1.2;
          text-align: center !important;
          width: 100%;
          margin-left: auto !important;
          margin-right: auto !important;
        }

        .outro p {
          color:#ffffff;
          font-size: 1.1rem;
          line-height: 1.6;
          margin-bottom: 2rem;
          max-width: 500px;
          margin-left: auto;
          margin-right: auto;
        }

        .contact-button {
          background: #140079;
          border: 1px solid #140079;
          color: #ffffff;
          padding: 12px 32px;
          font-size: 1rem;
          font-weight: 600;
          border-radius: 8px;
          cursor: pointer;
          transition: all 0.3s ease;
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          font-family: "Roboto", "Segoe UI", "Helvetica Neue", Arial, sans-serif;
        }

        .contact-button:hover {
          background: #0f0066;
          border-color: #0f0066;
          transform: translateY(-2px);
        }

        .contact-button svg {
          transition: transform 0.3s ease;
        }

        .contact-button:hover svg {
          transform: translateX(4px);
        }

        .intro {
          background: linear-gradient(rgba(15, 15, 15, 0.7), rgba(15, 15, 15, 0.7)), url('/solutions/hero.jpg');
          background-size: cover;
          background-position: center;
          background-repeat: no-repeat;
          min-height: 100vh;
          position: relative;
          overflow: hidden;
        }

        .intro::before {
          content: '';
          position: absolute;
          top: -20px;
          left: -20px;
          right: -20px;
          bottom: -20px;
          background: url('/solutions/hero.jpg');
          background-size: cover;
          background-position: center;
          background-repeat: no-repeat;
          z-index: -1;
          animation: serverLightsBlink 3s ease-in-out infinite;
        }

        .intro::after {
          content: '';
          position: absolute;
          top: -20px;
          left: -20px;
          right: -20px;
          bottom: -20px;
          background: url('/solutions/hero.jpg');
          background-size: cover;
          background-position: center;
          background-repeat: no-repeat;
          z-index: -2;
          opacity: 0.3;
          animation: serverLightsSecondary 2.5s ease-in-out infinite;
        }

        /* Custom blinking server lights */
        .server-light {
          position: absolute;
          width: 4px;
          height: 4px;
          border-radius: 50%;
          z-index: 1;
          box-shadow: 0 0 20px currentColor, 0 0 40px currentColor, 0 0 60px currentColor;
          filter: drop-shadow(0 0 8px currentColor);
        }
        /* server 1 */
        .server-light-1 {
          top: 18.4%;
          left: 40.6%;
          animation: lightBlink1 2s ease-in-out infinite;
        }
        /* server 1 */
        .server-light-2 {
          top: 38.85%;
          left: 40.15%;
          animation: lightBlink2 1.8s ease-in-out infinite;
        }
        /* server 2 */
        .server-light-3 {
          top: 16.3%;
          left: 54.3%;
          animation: lightBlink3 2.2s ease-in-out infinite;
        }
        /* server 2 */
        .server-light-4 {
          top: 50.5%;
          left: 53.5%;
          animation: lightBlink4 1.6s ease-in-out infinite;
        }
        /* server 2 */
        .server-light-5 {
          top: 59.6%;
          left: 63.15%;
          animation: lightBlink5 2.4s ease-in-out infinite;
        }
        /* server 3 */
        .server-light-6 {
          top: 62%;
          left: 88.05%;
          animation: lightBlink6 1.9s ease-in-out infinite;
        }
        /* server 2 */
        .server-light-7 {
          top: 12.8%;
          left: 61.3%;
          animation: lightBlink7 2.1s ease-in-out infinite;
        }
        /* server 3 */
        .server-light-8 {
          top: 57.8%;
          left: 82.5%;
          animation: lightBlink8 1.7s ease-in-out infinite;
        }

        @keyframes serverLightsBlink {
          0%, 100% {
            filter: brightness(1) saturate(1) contrast(1);
          }
          5% {
            filter: brightness(1.2) saturate(1.1) contrast(1.05);
          }
          10% {
            filter: brightness(1.4) saturate(1.2) contrast(1.1);
          }
          15% {
            filter: brightness(1.1) saturate(1.05) contrast(1.02);
          }
          20% {
            filter: brightness(1.3) saturate(1.15) contrast(1.08);
          }
          25% {
            filter: brightness(1.5) saturate(1.3) contrast(1.15);
          }
          30% {
            filter: brightness(1.2) saturate(1.1) contrast(1.05);
          }
          35% {
            filter: brightness(1.4) saturate(1.25) contrast(1.12);
          }
          40% {
            filter: brightness(1.6) saturate(1.4) contrast(1.2);
          }
          45% {
            filter: brightness(1.2) saturate(1.2) contrast(1.1);
          }
          50% {
            filter: brightness(1.5) saturate(1.35) contrast(1.18);
          }
          55% {
            filter: brightness(1.1) saturate(1.05) contrast(1.02);
          }
          60% {
            filter: brightness(1.4) saturate(1.3) contrast(1.15);
          }
          65% {
            filter: brightness(1.2) saturate(1.15) contrast(1.08);
          }
          70% {
            filter: brightness(1.6) saturate(1.5) contrast(1.25);
          }
          75% {
            filter: brightness(1.3) saturate(1.25) contrast(1.12);
          }
          80% {
            filter: brightness(1.5) saturate(1.4) contrast(1.2);
          }
          85% {
            filter: brightness(1.1) saturate(1.1) contrast(1.05);
          }
          90% {
            filter: brightness(1.4) saturate(1.3) contrast(1.15);
          }
          95% {
            filter: brightness(1.2) saturate(1.2) contrast(1.1);
          }
        }

        @keyframes serverLightsSecondary {
          0%, 100% {
            filter: brightness(0.9) saturate(0.95) contrast(0.98);
          }
          25% {
            filter: brightness(1.3) saturate(1.15) contrast(1.08);
          }
          50% {
            filter: brightness(1.1) saturate(1.05) contrast(1.02);
          }
          75% {
            filter: brightness(1.4) saturate(1.25) contrast(1.12);
          }
        }

        /* Light blink animations with different colors */
        /* server 1 */
        @keyframes lightBlink1 {
          0%, 100% { background-color:rgb(41, 41, 41); color: rgb(41, 41, 41); }
          50% { background-color: #00ff00; color: #00ff00; }
        }
        /* server 1 */
        @keyframes lightBlink2 {
          0%, 100% { background-color:rgb(41, 41, 41); color: rgb(41, 41, 41); }
          50% { background-color: #ff0000; color: #ff0000; }
        }
        /* server 2 */
        @keyframes lightBlink3 {
          0%, 100% { background-color:rgb(41, 41, 41); color: rgb(41, 41, 41); }
          50% { background-color: #0000ff; color: #0000ff; }
        }
        /* server 2 */
        @keyframes lightBlink4 {
          0%, 100% { background-color:rgb(41, 41, 41); color: rgb(41, 41, 41); }
          50% { background-color: #ffff00; color: #ffff00; }
        }
        /* server 2 */
        @keyframes lightBlink5 {
          0%, 100% { background-color:rgb(41, 41, 41); color: rgb(41, 41, 41); }
          50% { background-color: #ff00ff; color: #ff00ff; }
        }
        /* server 3 */       
        @keyframes lightBlink6 {
          0%, 100% { background-color:rgb(41, 41, 41); color: rgb(41, 41, 41); }
          50% { background-color: #00ffff; color: #00ffff; }
        }
        /* server 2 */
        @keyframes lightBlink7 {
          0%, 100% { background-color:rgb(41, 41, 41); color: rgb(41, 41, 41); }
          50% { background-color: #ff8800; color: #ff8800; }
        }
        /* server 3 */
        @keyframes lightBlink8 {
          0%, 100% { background-color:rgb(41, 41, 41); color: rgb(41, 41, 41); }
          50% { background-color:rgb(255, 102, 0); color: rgb(255, 102, 0); }
        }

        .container-md {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 2rem;
          z-index: 2;
          position: relative;
        }

        .hero-content {
          display: flex;
          flex-direction: row;
          align-items: center;
          justify-content: space-between;
          min-height: 100vh;
          width: 100%;
        }

        .hero-left {
          width: 50%;
          text-align: left;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          justify-content: center;
        }

        .hero-right {
          width: 50%;
          height: 100vh;
        }

        .section-title {
          font-size: 1.1rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.15em;
          color: #a0a0a0;
          margin-bottom: 1rem;
          opacity: 0;
          font-family: "Roboto", "Segoe UI", "Helvetica Neue", Arial, sans-serif;
          animation: sectionTitleAppear 1s ease-out 0.2s forwards;
          text-shadow: 0 0 10px rgba(160, 160, 160, 0.3);
          transition: all 0.3s ease;
        }

        .section-title:hover {
          text-shadow: 0 0 20px rgba(160, 160, 160, 0.5);
          transform: translateY(-1px);
        }

        @keyframes sectionTitleAppear {
          0% {
            opacity: 0;
            transform: translateY(15px);
          }
          100% {
            opacity: 0.8;
            transform: translateY(0);
          }
        }

        .intro h1,
        .outro h1 {
          width: 100%;
          text-align: left;
          line-height: 1.2;
          margin-bottom: 2rem;
          font-size: 4rem;
          font-family: 'Arial Black', 'Helvetica Bold', sans-serif;
        }

        .intro h1 {
          opacity: 0;
          transform: translateY(0);
          animation: introTextAppear 1.2s ease-out 0.5s forwards;
          text-shadow: 0 0 25px rgba(0, 255, 255, 0.6);
          transition: all 0.3s ease;
          color: #00ffff;
        }

        .intro h1:hover {
          text-shadow: 0 0 35px rgba(0, 255, 255, 0.8);
          transform: translateY(-2px);
          color: #00dddd;
        }

        @keyframes introTextAppear {
          0% {
            opacity: 0;
            transform: translateY(0);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .description-block {
          max-width: 100%;
          margin: 0;
        }

        .intro p {
          font-size: 1.1rem;
          line-height: 1.6;
          color: #e0e0e0;
          margin: 0;
          opacity: 0;
          text-align: left;
          animation: introParagraphAppear 1.2s ease-out 1s forwards;
          text-shadow: 0 0 15px rgba(224, 224, 224, 0.2);
          transition: all 0.3s ease;
        }

        .intro p:hover {
          text-shadow: 0 0 25px rgba(224, 224, 224, 0.4);
          transform: translateY(-1px);
        }

        @keyframes introParagraphAppear {
          0% {
            opacity: 0;
            transform: translateY(20px);
          }
          100% {
            opacity: 0.9;
            transform: translateY(0);
          }
        }

        .cards {
          position: relative;
          display: flex;
          flex-direction: column;
          gap: 25svh;
          background-color: #f8fafc;
          overflow-x: hidden;
        }



        .card {
          position: relative;
          width: 100%;
          max-width: 100%;
          height: 100svh;
          padding: 1.5em;
          background-color: #ffffff;
          overflow: hidden;
        }

        .card-wrapper {
          position: relative;
          width: 100%;
          height: 100%;
          will-change: transform;
        }

        .card-img {
          position: absolute;
          width: 100%;
          height: 100%;
          border-radius: 150px;
          overflow: hidden;
        }

        .card-img::after {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(255, 255, 255, 0.1);
          z-index: 1;
        }

        .card-img img {
          transform: scale(2);
        }

        .card-content {
          position: absolute;
          width: 100%;
          height: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          z-index: 2;
        }

        .card-content .card-title {
          width: 100%;
          text-align: center;
          margin-bottom: 2rem;
        }

        .card-content .card-title h1 {
          color: #ffffff;
          font-weight: 700;
          text-shadow: 0 2px 15px rgba(0, 0, 0, 0.5);
          letter-spacing: -0.02em;
        }

        .card-content .card-description {
          text-align: center;
          width: 40%;
          margin-bottom: 2rem;
          transform: translateX(40px);
          opacity: 0;
        }

        .card-content .card-description p {
          color: #ffffff;
          font-weight: 500;
          text-shadow: 0 1px 8px rgba(0, 0, 0, 0.4);
          line-height: 1.7;
        }

        .card-button {
          text-align: center;
          transform: translateX(40px);
          opacity: 0;
          z-index: 10;
          position: relative;
          pointer-events: auto;
        }

        /* Fallback to ensure button is visible */
        .card-content:hover .card-button {
          opacity: 1;
          transform: translateX(0);
        }

        .card-button button {
          background: rgba(30, 58, 138, 0.9);
          border: 2px solid rgba(30, 58, 138, 0.3);
          color: #ffffff;
          padding: 14px 36px;
          font-size: 1.1rem;
          font-weight: 600;
          border-radius: 12px;
          cursor: pointer;
          transition: all 0.3s ease;
          backdrop-filter: blur(15px);
          text-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
          font-family: "Roboto", "Segoe UI", "Helvetica Neue", Arial, sans-serif;
        }

        .card-button button:hover {
          background: rgba(30, 58, 138, 1);
          border-color: rgba(30, 58, 138, 0.5);
          transform: translateY(-3px);
          box-shadow: 0 8px 25px rgba(0, 0, 0, 0.3);
        }

        .card:nth-child(2) {
          margin-top: 50vh;
        }

        .char {
          position: relative;
          overflow: hidden;
          display: inline-block;
        }

        .char span {
          transform: translateX(100%);
          display: inline-block;
          will-change: transform;
        }

        @media (max-width: 900px) {
          h1 {
            font-size: 2rem;
            letter-spacing: 0;
          }

          .intro h1,
          .outro h1 {
            width: 100%;
            font-size: 2.5rem;
            margin-bottom: 2rem;
          }

          .container-md {
            padding: 0 1rem;
          }

          .hero-content {
            flex-direction: column;
          }

          .hero-left {
            width: 100%;
            margin-bottom: 2rem;
          }

          .hero-right {
            width: 100%;
            height: auto;
            min-height: 200px;
          }

          .intro::before {
            top: -10px;
            left: -10px;
            right: -10px;
            bottom: -10px;
          }

          .intro::after {
            top: -10px;
            left: -10px;
            right: -10px;
            bottom: -10px;
          }

          .server-light {
            width: 2px;
            height: 2px;
            /* Keep exact same positioning as desktop - don't change top/left values */
          }

          .section-title {
            font-size: 1rem;
            margin-bottom: 0.8rem;
          }

          .intro p {
            font-size: 1rem;
            padding: 0;
            text-align: left;
            max-width: 100%;
          }

          .card-content .card-description {
            width: 90%;
          }

          .card-content .card-title {
            margin-bottom: 1.5rem;
          }

          .outro h1 {
            font-size: 2rem;
            margin-bottom: 1rem;
          }

          .outro p {
            font-size: 1rem;
            margin-bottom: 1.5rem;
          }

          .outro-content {
            padding: 2rem 1.5rem;
            margin: 0 1rem;
            text-align: center;
          }

          .contact-button {
            padding: 0.875rem 1.5rem;
            font-size: 1rem;
          }
        }
      `}</style>

      <main>

        <section className="intro">
          <div className="container-md">
            <div className="hero-content text-white">
              <div className="hero-left">
                <span className="section-title">Digital Infrastructure Solutions</span>
                <h1><TextFlip /> Connectivity</h1>
                <div className="description-block">
                  <p>
                    25+ years delivering digital infrastructure solutions across fixed line, subsea, data centres, and wireless networks. From 5G to legacy systems, we solve complex challenges in any environment with 24/7 NOC support.
                  </p>
                </div>
              </div>
              <div className="hero-right">
                {/* Empty right column */}
              </div>
            </div>
          </div>

          {/* Custom blinking server lights */}
          <div className="server-light server-light-1"></div>
          <div className="server-light server-light-2"></div>
          <div className="server-light server-light-3"></div>
          <div className="server-light server-light-4"></div>
          <div className="server-light server-light-5"></div>
          <div className="server-light server-light-6"></div>
          <div className="server-light server-light-7"></div>
          <div className="server-light server-light-8"></div>
        </section>

        {/* Breadcrumb Navigation */}
        <section className="breadcrumb-section bg-white py-4">
          <div className="container-md">
            <nav className="breadcrumb-nav">
              <ol className="flex items-center space-x-2 text-lg">
                <li>
                  <a href="/" className="text-[#140079] hover:text-yellow-500 transition-colors duration-300 underline">
                    Home
                  </a>
                </li>
                <li className="text-[#140079]">•</li>
                <li className="text-[#140079]">
                  Digital Infrastructure Solutions
                </li>
              </ol>
            </nav>
          </div>
        </section>

        <section className="cards">
          <div className="card">
            <div className="card-wrapper">
              <div className="card-content">
                <div className="card-title">
                  <h1>Fixed Line</h1>
                </div>
                <div className="card-description">
                  <p>
                    Enabling and maintaining the digital backbone of the country.
                  </p>
                </div>
                <div className="card-button">
                  <Link href="/solutions/fixedline">
                    <button>Explore</button>
                  </Link>
                </div>
              </div>
              <div className="card-img">
                <Image src="/solutions/card-images-1.jpg" alt="Curved Horizon" fill style={{ objectFit: 'cover' }} />
              </div>
            </div>
          </div>

          <div className="card">
            <div className="card-wrapper">
              <div className="card-content">
                <div className="card-title">
                  <h1>Subsea</h1>
                </div>
                <div className="card-description">
                  <p>
                    Systems Operator support for submarine cables
                  </p>
                </div>
                <div className="card-button">
                  <Link href="/solutions/subsea">
                    <button>Explore</button>
                  </Link>
                </div>
              </div>
              <div className="card-img">
                <Image src="/solutions/card-images-2.png" alt="Glass Haven" fill style={{ objectFit: 'cover' }} />
              </div>
            </div>
          </div>

          <div className="card">
            <div className="card-wrapper">
              <div className="card-content">
                <div className="card-title">
                  <h1>Data Centres</h1>
                </div>
                <div className="card-description">
                  <p>
                    From repairs to resilience, keeping operations uninterrupted
                  </p>
                </div>
                <div className="card-button">
                  <Link href="/solutions/data-centres">
                    <button>Explore</button>
                  </Link>
                </div>
              </div>
              <div className="card-img">
                <Image src="/solutions/card-images-3.jpg" alt="Moss Cube" fill style={{ objectFit: 'cover' }} />
              </div>
            </div>
          </div>

          <div className="card">
            <div className="card-wrapper">
              <div className="card-content">
                <div className="card-title">
                  <h1>Wireless</h1>
                </div>
                <div className="card-description">
                  <p>
                    New networks, upgrades, and network sharing solutions
                  </p>
                </div>
                <div className="card-button">
                  <Link href="/solutions/wireless">
                    <button>Explore</button>
                  </Link>
                </div>
              </div>
              <div className="card-img">
                <Image src="/solutions/card-images-4.jpg" alt="Floating Shelter" fill style={{ objectFit: 'cover' }} />
              </div>
            </div>
          </div>

          <div className="card">
            <div className="card-wrapper">
              <div className="card-content">
                <div className="card-title">
                  <h1>NOC Support</h1>
                </div>
                <div className="card-description">
                  <p>
                    Minimize outage times and keep society collaborating 24x7x365
                  </p>
                </div>
                <div className="card-button">
                  <Link href="/solutions/noc">
                    <button>Explore</button>
                  </Link>
                </div>
              </div>
              <div className="card-img">
                <Image src="/solutions/card-images-5.jpg" alt="Floating Shelter" fill style={{ objectFit: 'cover' }} />
              </div>
            </div>
          </div>
          <div className="card">
            <div className="card-wrapper">
              <div className="card-content">
                <div className="card-title">
                  <h1>Network Services</h1>
                </div>
                <div className="card-description">
                  <p>
                    Minimize outage times and keep society collaborating 24x7x365
                  </p>
                </div>
                <div className="card-button">
                  <Link href="/solutions/network">
                    <button>Explore</button>
                  </Link>
                </div>
              </div>
              <div className="card-img">
                <Image src="/solutions/network.png" alt="Floating Shelter" fill style={{ objectFit: 'cover' }} />
              </div>
            </div>
          </div>
        </section>

        <section className="outro">
          <div className="outro-container">
            <div className="outro-content">
              <h1>Want to know more?</h1>
              <p>
                If you want to know more about how we can design, deploy and support your network and infrastructure, get in touch.
              </p>
              <Link href="/get-in-touch">
                <button className="contact-button">
                  Contact us
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M8 1L15 8L8 15M15 8H1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
              </Link>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
