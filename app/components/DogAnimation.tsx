'use client';

import { useEffect, useRef, useState } from 'react';

interface PawPrint {
  id: number;
  x: number;
  y: number;
  flipped: boolean;
  opacity: number;
}

interface PathPoint {
  x: number;
  y: number;
}

interface Tree {
  id: number;
  x: number;
  y: number;
  type: 'tree1' | 'tree2';
  size: number;
  zIndex: number;
}

const DogAnimation = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [pathPosition, setPathPosition] = useState(0);
  const [currentPoint, setCurrentPoint] = useState<PathPoint>({ x: 0, y: 0 });
  const [direction, setDirection] = useState(1); // 1 for right, -1 for left
  const [pawPrints, setPawPrints] = useState<PawPrint[]>([]);
  const [trees, setTrees] = useState<Tree[]>([]);
  const animationFrameRef = useRef<number | null>(null);
  const pawPrintIdRef = useRef(0);
  
  // Animation settings
  const speed = 0.15; // Base speed (percentage per frame)
  const pathLength = 100; // Total path length parameter
  const pawPrintFrequency = 30; // frames between paw prints
  const frameCountRef = useRef(0);

  // Generate random trees
  useEffect(() => {
    const numberOfTrees = 60; // Number of trees to add
    const newTrees: Tree[] = [];
    
    for (let i = 0; i < numberOfTrees; i++) {
      // Create trees with random properties
      newTrees.push({
        id: i,
        x: Math.random() * 100, // Random x position (0-100%)
        y: Math.random() * 60 + 10, // Random y position (10-70%)
        type: Math.random() > 0.5 ? 'tree1' : 'tree2', // Randomly select tree type
        size: Math.random() * 0.5 + 0.5, // Random size between 0.5 and 1
        zIndex: Math.floor(Math.random() * 2) // Random z-index for layering
      });
    }
    
    setTrees(newTrees);
  }, []);

  // Path calculation - use full width of the screen
  const getPathPoint = (t: number): PathPoint => {
    const normalizedT = (t % pathLength) / pathLength;
    const x = normalizedT * 98 + 1; // x from 1% to 99% of container width
    const y = Math.sin(normalizedT * Math.PI * 2) * 6 + 40; // centered higher vertically with less oscillation
    return { x, y };
  };

  // Add a paw print at the current position
  const addPawPrint = () => {
    if (!containerRef.current) return;
    
    // Alternate left and right paws
    const isLeftPaw = pawPrintIdRef.current % 2 === 0;
    const yOffset = isLeftPaw ? -2 : 2; // Stagger left and right paws
    
    // Create a new paw print
    const newPawPrint: PawPrint = {
      id: pawPrintIdRef.current++,
      x: currentPoint.x + (direction === 1 ? -2 : 2), // Adjust position based on dog's direction
      y: currentPoint.y + yOffset,
      flipped: direction === -1,
      opacity: 0.7, // Start with higher opacity
    };
    
    setPawPrints(prev => [...prev, newPawPrint]);
    
    // Remove old paw prints if there are too many
    if (pawPrints.length > 20) {
      setPawPrints(prev => prev.slice(1));
    }
  };

  // Fade out paw prints gradually
  useEffect(() => {
    const fadeInterval = setInterval(() => {
      setPawPrints(prev => 
        prev.map(paw => ({
          ...paw,
          opacity: paw.opacity > 0.05 ? paw.opacity * 0.95 : 0
        }))
        .filter(paw => paw.opacity > 0.05)
      );
    }, 500);
    
    return () => clearInterval(fadeInterval);
  }, []);

  // Main animation loop
  useEffect(() => {
    const animate = () => {
      if (!containerRef.current) return;
      
      // Calculate new position
      let newPathPosition = pathPosition + speed * direction;
      
      // Reverse direction at edges
      if (newPathPosition >= pathLength) {
        newPathPosition = pathLength;
        setDirection(-1);
      } else if (newPathPosition <= 0) {
        newPathPosition = 0;
        setDirection(1);
      }
      
      // Update position
      setCurrentPoint(getPathPoint(newPathPosition));
      setPathPosition(newPathPosition);
      
      // Add paw prints periodically
      frameCountRef.current += 1;
      if (frameCountRef.current >= pawPrintFrequency) {
        addPawPrint();
        frameCountRef.current = 0;
      }
      
      animationFrameRef.current = requestAnimationFrame(animate);
    };
    
    // Start animation
    animationFrameRef.current = requestAnimationFrame(animate);
    
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [pathPosition, direction]);
  
  return (
    <div 
      ref={containerRef} 
      className="w-full h-full relative"
      style={{ 
        background: "transparent", 
        pointerEvents: "none", 
        minHeight: "180px",
        width: "100vw",
        maxWidth: "100%",
        margin: "0 auto",
        overflow: "hidden"
      }}
    >
      {/* Trees */}
      {trees.map(tree => (
        <div 
          key={tree.id}
          className="absolute"
          style={{
            left: `${tree.x}%`,
            top: `${tree.y}%`,
            transform: `scale(${tree.size})`,
            zIndex: tree.zIndex
          }}
        >
          <img 
            src={`/${tree.type}.png`}
            alt={`${tree.type}`}
            style={{
              width: 'auto',
              height: tree.type === 'tree1' ? '60px' : '70px',
              objectFit: 'contain'
            }}
          />
        </div>
      ))}

      {/* Paw prints */}
      {pawPrints.map(paw => (
        <div 
          key={paw.id}
          className="absolute"
          style={{
            left: `${paw.x}%`,
            top: `${paw.y}%`,
            opacity: paw.opacity,
            transform: `${paw.flipped ? 'scaleX(-1)' : ''}`,
            zIndex: 5
          }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="rgba(20, 63, 63, 0.7)">
            <path d="M7 13c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0-6c1.1 0 2 .9 2 2s-.9 2-2 2-2-.9-2-2 .9-2 2-2zm10 6c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0-6c1.1 0 2 .9 2 2s-.9 2-2 2-2-.9-2-2 .9-2 2-2zm3 7c-2.8 0-7 1.4-7 4.2v2.8h14v-2.8c0-2.8-4.2-4.2-7-4.2zm-7 2c0-.41 2.34-2.2 7-2.2s7 1.79 7 2.2v.8h-14v-.8zm-3 0c0-.41 2.34-2.2 7-2.2 0 0 .41-.38-2.5-2-1.76-.99-4-1-4-1-2.8 0-7 1.4-7 4.2v2.8h3v-1.8c0-.41.43-.8 1-1.09.57-.3 1.93-.91 2.5-1.11z"/>
          </svg>
        </div>
      ))}
      
      {/* The dog */}
      <div 
        className="absolute"
        style={{
          left: `${currentPoint.x}%`,
          top: `${currentPoint.y}%`, 
          transform: direction === -1 ? 'scaleX(-1)' : '', 
          transition: "transform 0.1s ease",
          zIndex: 10
        }}
      >
        {/* Dog animation GIF */}
        <div style={{ width: '90px', height: '90px' }}>
          <img 
            src="/new-animation.gif" 
            alt="Dog animation" 
            style={{ 
              width: '100%', 
              height: '100%', 
              objectFit: 'contain'
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default DogAnimation; 