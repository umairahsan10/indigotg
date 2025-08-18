import React, { useEffect, useState, useRef } from "react";

// Confetti type
type ConfettiOptions = {
  particleCount?: number;
  spread?: number;
  startVelocity?: number;
  decay?: number;
  gravity?: number;
  drift?: number;
  ticks?: number;
  origin?: {
    x?: number;
    y?: number;
  };
  colors?: string[];
  shapes?: string[];
  scalar?: number;
  zIndex?: number;
  disableForReducedMotion?: boolean;
};

// Global declaration
declare global {
  interface Window {
    confetti?: (options?: ConfettiOptions) => void;
  }
}

interface ConfettiButtonProps {
  className?: string;
  children?: React.ReactNode;
  confettiOptions?: ConfettiOptions;
  autoConfetti?: boolean;
  triggerOnHover?: boolean;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
}

const ConfettiButton: React.FC<ConfettiButtonProps> = ({
  className = "",
  children,
  confettiOptions = {
    particleCount: 100,
    spread: 70,
  },
  autoConfetti = false,
  triggerOnHover = false,
  onClick,
  disabled = false,
}) => {
  const [scriptLoaded, setScriptLoaded] = useState(false);
  const buttonRef = useRef<HTMLButtonElement | null>(null);

  // Load confetti script dynamically
  useEffect(() => {
    if (!window.confetti) {
      const script = document.createElement("script");
      script.src =
        "https://cdn.jsdelivr.net/npm/canvas-confetti@1.4.0/dist/confetti.browser.min.js";
      script.async = true;
      script.onload = () => setScriptLoaded(true);
      document.body.appendChild(script);

      return () => {
        if (script.parentNode) {
          script.parentNode.removeChild(script);
        }
      };
    } else {
      setScriptLoaded(true);
    }
  }, []);

  // Auto confetti on mount if needed
  useEffect(() => {
    if (scriptLoaded && autoConfetti && window.confetti && buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      const x = (rect.left + rect.width / 2) / window.innerWidth;
      const y = (rect.top + rect.height / 2) / window.innerHeight;

      window.confetti({
        ...confettiOptions,
        origin: { x, y },
      });
    }
  }, [scriptLoaded, autoConfetti, confettiOptions]);

  const triggerConfetti = () => {
    if (scriptLoaded && window.confetti && buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      const x = (rect.left + rect.width / 2) / window.innerWidth;
      const y = (rect.top + rect.height / 2) / window.innerHeight;

      window.confetti({
        ...confettiOptions,
        origin: { x, y },
      });
    }
  };

  return (
    <button
      ref={buttonRef}
      className={`inline-flex items-center justify-center gap-2 font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ${className}`}
      onClick={(e) => {
        if (scriptLoaded) {
          triggerConfetti();
        }
        onClick?.(e);
      }}
      onMouseEnter={triggerOnHover ? () => triggerConfetti() : undefined}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default ConfettiButton;
