import React, { useState, useEffect } from 'react';

interface LineProps {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  stroke: string;
  strokeWidth: number;
  opacity?: number;
  isActive: boolean;
}

interface IndigoAnimationProps {
  filter?: 'all' | 'design' | 'deploy' | 'support';
}

const Line: React.FC<LineProps> = ({ x1, y1, x2, y2, stroke, strokeWidth, opacity = 1, isActive }) => (
  <>
    {!isActive && (
      <>
        {/* Outer white line for the outline */}
        <line
          x1={x1}
          y1={y1}
          x2={x2}
          y2={y2}
          stroke="white"
          fill="none"
          strokeWidth={40}
          strokeLinecap="round"
          opacity={1}
          style={{
            transition: 'all 0.8s ease-in-out'
          }}
        />
        {/* Inner line to create the hollow effect - using background color */}
        <line
          x1={x1}
          y1={y1}
          x2={x2}
          y2={y2}
          stroke="#04048b"
          fill="none"
          strokeWidth={36}
          strokeLinecap="round"
          opacity={1}
          style={{
            transition: 'all 0.8s ease-in-out'
          }}
        />
      </>
    )}
    {isActive && (
      <line
        x1={x1}
        y1={y1}
        x2={x2}
        y2={y2}
        stroke={stroke}
        fill="none"
        strokeWidth={40}
        strokeLinecap="round"
        opacity={1}
        style={{
          transition: 'all 0.8s ease-in-out'
        }}
      />
    )}
  </>
  );

const IndigoAnimation1: React.FC<IndigoAnimationProps> = ({ filter = 'all' }) => {
  // Get animation state based on filter instead of auto-cycling
  const getAnimationState = (filterType: string) => {
    switch (filterType) {
              case 'all':
        // All lines are different colors - "All Services"
        return {
          vertical: { 
            x1: 300, y1: 80, 
            x2: 300, y2: 350, 
            stroke: '#ffffff', isActive: true
          },
          diagonal1: { 
            x1: 350, y1: 100, 
            x2: 600, y2: 250, 
            stroke: '#FFD700', isActive: true 
          },
          diagonal2: { 
            x1: 300, y1: 400, 
            x2: 570, y2: 280, 
            stroke: '#0029de', isActive: true 
          },
          text: "All Services",
          textPosition: { x: 400, y: 250 }
        };
      case 'design':
        // Top diagonal line is yellow/filled - "Design"
        return {
          vertical: { 
            x1: 300, y1: 80, 
            x2: 300, y2: 350, 
            stroke: '#ffffff', isActive: false 
          },
          diagonal1: { 
            x1: 350, y1: 100, 
            x2: 600, y2: 250, 
            stroke: '#FFD700', isActive: true 
          },
          diagonal2: { 
            x1: 300, y1: 400, 
            x2: 570, y2: 280, 
            stroke: '#ffffff', isActive: false 
          },
          text: "Design",
          textPosition: { x: 520, y: 120 }
        };
      case 'deploy':
        // Bottom diagonal line is blue/filled - "Deploy"
        return {
          vertical: { 
            x1: 300, y1: 80, 
            x2: 300, y2: 350, 
            stroke: '#ffffff', isActive: false 
          },
          diagonal1: { 
            x1: 350, y1: 100, 
            x2: 600, y2: 250, 
            stroke: '#ffffff', isActive: false 
          },
          diagonal2: { 
            x1: 300, y1: 400, 
            x2: 570, y2: 280, 
            stroke: '#0029de', isActive: true 
          },
          text: "Deploy",
          textPosition: { x: 500, y: 400 }
        };
      case 'support':
        // Vertical line is white/filled - "Support"
        return {
          vertical: { 
            x1: 300, y1: 80, 
            x2: 300, y2: 350, 
            stroke: '#ffffff', isActive: true 
          },
          diagonal1: { 
            x1: 350, y1: 100, 
            x2: 600, y2: 250, 
            stroke: '#ffffff', isActive: false 
          },
          diagonal2: { 
            x1: 300, y1: 400, 
            x2: 570, y2: 280, 
            stroke: '#ffffff', isActive: false 
          },
          text: "Support",
          textPosition: { x: 200, y: 220 }
        };
      default:
        return {
          vertical: { 
            x1: 300, y1: 80, 
            x2: 300, y2: 350, 
            stroke: '#ffffff', isActive: false 
          },
          diagonal1: { 
            x1: 350, y1: 100, 
            x2: 600, y2: 250, 
            stroke: '#ffffff', isActive: false 
          },
          diagonal2: { 
            x1: 300, y1: 400, 
            x2: 570, y2: 280, 
            stroke: '#ffffff', isActive: false 
          },
          text: "All Services",
          textPosition: { x: 400, y: 300 }
        };
    }
  };

  const animationState = getAnimationState(filter);

  return (
    <div className="flex items-center justify-center h-full w-full">
      <div className="relative">
        
        <div className="relative">
                                                          <svg
           width="480"
           height="480"
           viewBox="-100 -200 800 500"
           className=""
              style={{ backgroundColor: 'transparent' }}
            >
                         {/* Vertical Line (Left side of triangle) */}
             <Line
               x1={animationState.vertical.x1}
               y1={animationState.vertical.y1}
               x2={animationState.vertical.x2}
               y2={animationState.vertical.y2}
               stroke={animationState.vertical.stroke}
               strokeWidth={40}
               opacity={1}
               isActive={animationState.vertical.isActive}
             />
             
             {/* Top Diagonal Line */}
             <Line
               x1={animationState.diagonal1.x1}
               y1={animationState.diagonal1.y1}
               x2={animationState.diagonal1.x2}
               y2={animationState.diagonal1.y2}
               stroke={animationState.diagonal1.stroke}
               strokeWidth={40}
               opacity={1}
               isActive={animationState.diagonal1.isActive}
             />
             
             {/* Bottom Diagonal Line */}
             <Line
               x1={animationState.diagonal2.x1}
               y1={animationState.diagonal2.y1}
               x2={animationState.diagonal2.x2}
               y2={animationState.diagonal2.y2}
               stroke={animationState.diagonal2.stroke}
               strokeWidth={40}
               opacity={1}
               isActive={animationState.diagonal2.isActive}
             />
             
             {/* Text Label */}
             <text
               x={animationState.textPosition.x}
               y={animationState.textPosition.y}
               fill="white"
               fontSize="20"
               fontFamily="sans-serif"
               fontWeight="500"
               textAnchor="middle"
               style={{
                 transition: 'all 0.8s ease-in-out'
               }}
             >
               {animationState.text}
             </text>
          </svg>
        </div>


      </div>
    </div>
  );
};

export default IndigoAnimation1;