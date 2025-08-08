'use client';

import { useEffect, useRef, useState } from 'react';

type HaloBackgroundProps = {
  background?: string;
  particleColor?: string;
  shapeColor?: string;
  lineColor?: string;
};

const HaloBackground: React.FC<HaloBackgroundProps> = ({
  background = '#140079',
  particleColor = 'rgba(255,255,255,0.95)',
  shapeColor = 'rgba(255,255,255,0.25)',
  lineColor = 'rgba(255,255,255,0.1)',
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!canvasRef.current || typeof window === 'undefined') return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d')!;
    let animationId: number;
    let particles: Particle[] = [];
    let geometricShapes: Shape[] = [];

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Particle class
    class Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      opacity: number;
      color: string;

      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.vx = (Math.random() - 0.5) * 0.5;
        this.vy = (Math.random() - 0.5) * 0.5;
        this.size = Math.random() * 2 + 1;
        this.opacity = Math.random() * 0.5 + 0.3;
        this.color = particleColor;
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;

        if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
        if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
      }

      draw() {
        ctx.save();
        ctx.globalAlpha = this.opacity;
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }
    }

    // Geometric shape class
    class Shape {
      x: number;
      y: number;
      size: number;
      rotation: number;
      rotationSpeed: number;
      type: 'triangle' | 'square' | 'hexagon';
      opacity: number;
      color: string;

      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 20 + 10;
        this.rotation = Math.random() * Math.PI * 2;
        this.rotationSpeed = (Math.random() - 0.5) * 0.02;
        this.type = ['triangle', 'square', 'hexagon'][Math.floor(Math.random() * 3)] as any;
        this.opacity = Math.random() * 0.3 + 0.1;
        this.color = shapeColor;
      }

      update() {
        this.rotation += this.rotationSpeed;
      }

      draw() {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.rotation);
        ctx.globalAlpha = this.opacity;
        ctx.strokeStyle = this.color;
        ctx.lineWidth = 1;

        switch (this.type) {
          case 'triangle':
            ctx.beginPath();
            ctx.moveTo(0, -this.size);
            ctx.lineTo(-this.size * 0.866, this.size * 0.5);
            ctx.lineTo(this.size * 0.866, this.size * 0.5);
            ctx.closePath();
            ctx.stroke();
            break;
          case 'square':
            ctx.strokeRect(-this.size, -this.size, this.size * 2, this.size * 2);
            break;
          case 'hexagon':
            ctx.beginPath();
            for (let i = 0; i < 6; i++) {
              const angle = (i * Math.PI) / 3;
              const x = Math.cos(angle) * this.size;
              const y = Math.sin(angle) * this.size;
              if (i === 0) ctx.moveTo(x, y);
              else ctx.lineTo(x, y);
            }
            ctx.closePath();
            ctx.stroke();
            break;
        }
        ctx.restore();
      }
    }

    // Initialize particles and shapes
    const init = () => {
      particles = [];
      geometricShapes = [];
      
      // Create particles
      for (let i = 0; i < 100; i++) {
        particles.push(new Particle());
      }
      
      // Create geometric shapes
      for (let i = 0; i < 15; i++) {
        geometricShapes.push(new Shape());
      }
      
      setIsLoading(false);
    };

    // Animation loop
    const animate = () => {
      // subtle trail effect tinting towards the background color
      ctx.fillStyle = 'rgba(20, 0, 121, 0.08)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Update and draw particles
      particles.forEach(particle => {
        particle.update();
        particle.draw();
      });

      // Update and draw shapes
      geometricShapes.forEach(shape => {
        shape.update();
        shape.draw();
      });

      // Draw connecting lines between nearby particles
      ctx.strokeStyle = lineColor;
      ctx.lineWidth = 0.5;
      
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < 100) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }

      animationId = requestAnimationFrame(animate);
    };

    init();
    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationId);
    };
  }, [background, particleColor, shapeColor, lineColor]);

  return (
    <div className="absolute inset-0 z-0">
      <canvas
        ref={canvasRef}
        className="w-full h-full"
        style={{ background }}
      />
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-16 h-16 border-4 border-white/80 border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}
    </div>
  );
};

export default HaloBackground;
