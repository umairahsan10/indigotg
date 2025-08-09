// src/hooks/useTilt.ts
import { useRef, useEffect, MutableRefObject } from "react";

export default function useTilt<T extends HTMLElement>(): MutableRefObject<T | null> {
  const ref = useRef<T | null>(null);

  useEffect(() => {
    function handleMove(e: MouseEvent) {
      const el = ref.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const px = (e.clientX - rect.left) / rect.width;
      const py = (e.clientY - rect.top) / rect.height;

      const rotateY = (px - 0.5) * 10; // -5 -> 5 deg
      const rotateX = (0.5 - py) * 10; // -5 -> 5 deg

      el.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(8px)`;
    }

    function handleLeave() {
      const el = ref.current;
      if (el) el.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0px)`;
    }

    const node = ref.current;
    if (!node) return;
    node.addEventListener("mousemove", handleMove);
    node.addEventListener("mouseleave", handleLeave);

    return () => {
      node.removeEventListener("mousemove", handleMove);
      node.removeEventListener("mouseleave", handleLeave);
    };
  }, []);

  return ref;
}
