import { forwardRef } from "react";

const Logo = forwardRef<SVGSVGElement>((props, ref) => {
  return (
    <svg ref={ref} width="160" height="160" viewBox="0 0 100 100" fill="none">
      {/* Three separate lines forming an equilateral triangle with gaps at corners */}
      {/* Line 1: Top to Right (with gap at right corner) */}
      <line
        x1="50"
        y1="15"
        x2="87"
        y2="82"
        stroke="#140A8E"
        strokeWidth="6"
        strokeLinecap="round"
        transform="rotate(-25 50 50)"
      />
      
      {/* Line 2: Right to Left (with gaps at both corners) */}
      <line
        x1="87"
        y1="82"
        x2="13"
        y2="82"
        stroke="#140A8E"
        strokeWidth="6"
        strokeLinecap="round"
        transform="rotate(-25 50 50)"
      />
      
      {/* Line 3: Left to Top (with gap at left corner) */}
      <line
        x1="13"
        y1="82"
        x2="50"
        y2="15"
        stroke="#140A8E"
        strokeWidth="6"
        strokeLinecap="round"
        transform="rotate(-25 50 50)"
      />
    </svg>
  );
});

Logo.displayName = "Logo";

export default Logo;
