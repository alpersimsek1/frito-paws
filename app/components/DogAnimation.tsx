'use client';

import { useRef } from 'react';

const DogAnimation = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  return (
    <div 
      ref={containerRef} 
      style={{ 
        background: "transparent", 
        pointerEvents: "none", 
        width: "100%",
        maxWidth: "100%",
        margin: "0",
        padding: "0",
        paddingTop: "73px", // Add padding top to account for fixed header
        overflow: "hidden",
        // Increase height by decreasing the aspect ratio denominator (was 4.8/1)
        aspectRatio: "4.8/1.5",
        height: "auto",
        minHeight: "380px", // Add minimum height to ensure it's taller
        backgroundImage: "url('/animation-back.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center top", // Position the background image at the top
        position: "relative",
      }}
    />
  );
};

export default DogAnimation; 