import { forwardRef } from "react";

const Logo = forwardRef<SVGSVGElement>((props, ref) => {
  return (
    <svg ref={ref} width="160" height="160" viewBox="0 0 100 100" fill="none" >
      {/* Three separate lines forming an equilateral triangle with gaps at corners */}
      {/* Line 1: Top to Right (with gap at right corner) */}
      <line
        x1="76"
        y1="43"
        x2="10"
        y2="5"
        stroke="#FFFF00"
        strokeWidth="10"
        strokeLinecap="round"
      />

      <line
        x1="10"
        y1="20.66"
        x2="10"
        y2="95"
        stroke="#FFFFFF"
        strokeWidth="10"
        strokeLinecap="round"
      />

      <line
        x1="24"
        y1="88"
        x2="90"
        y2="50"
        stroke="#140A8E"
        strokeWidth="10"
        strokeLinecap="round"
      />



    </svg>
  );
});

Logo.displayName = "Logo";

export default Logo;
