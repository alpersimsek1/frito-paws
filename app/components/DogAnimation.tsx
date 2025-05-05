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
        overflow: "hidden",
        // Aspect ratio based on provided dimensions (1527:317 ≈ 4.8:1)
        aspectRatio: "4.8/1",
        backgroundImage: "url('/animation-back.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        position: "relative",
      }}
    />
  );
};

export default DogAnimation; 