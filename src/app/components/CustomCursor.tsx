"use client";

export default function CustomCursor() {
  return (
    <style jsx global>{`
      * {
        cursor: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><defs><linearGradient id="cursorGrad" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" style="stop-color:%23ffffff;stop-opacity:1" /><stop offset="40%" style="stop-color:%23e879f9;stop-opacity:1" /><stop offset="70%" style="stop-color:%23c084fc;stop-opacity:1" /><stop offset="100%" style="stop-color:%2360a5fa;stop-opacity:1" /></linearGradient></defs><path d="M4 4 L4 16 L9 11 L15 11 L4 4 Z" fill="url(%23cursorGrad)" stroke="%23ffffff" stroke-width="1.2"/></svg>') 4 4, auto !important;
      }
    `}</style>
  );
}
