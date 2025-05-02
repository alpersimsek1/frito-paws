'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';

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

const DogAnimation = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [pathPosition, setPathPosition] = useState(0);
  const [currentPoint, setCurrentPoint] = useState<PathPoint>({ x: 0, y: 0 });
  const [direction, setDirection] = useState(1); // 1 for right, -1 for left
  const [isSniffing, setIsSniffing] = useState(false);
  const [bobAmount, setBobAmount] = useState(0);
  const [pawPrints, setPawPrints] = useState<PawPrint[]>([]);
  const animationFrameRef = useRef<number | null>(null);
  const pawPrintIdRef = useRef(0);
  const prevPointRef = useRef<PathPoint>({ x: 0, y: 0 });
  
  // Animation settings
  const speed = 0.1; // Base speed (percentage per frame) - slower for curved path
  const pathLength = 100; // Total path length parameter
  const minSniffInterval = 3000; // Minimum ms between sniffing animations
  const maxSniffInterval = 7000; // Maximum ms between sniffing animations
  const sniffDuration = 1500; // ms for sniffing animation
  const pawPrintFrequency = 35; // frames between paw prints
  const frameCountRef = useRef(0);
  
  // Get random interval for natural-looking sniffing behavior
  const getRandomSniffInterval = () => {
    return Math.floor(Math.random() * (maxSniffInterval - minSniffInterval + 1)) + minSniffInterval;
  };

  // Calculate point along S-shaped path
  const getPathPoint = (t: number): PathPoint => {
    // Normalize t to 0-1 range for full path traversal
    const normalizedT = (t % pathLength) / pathLength;
    
    // Calculate position along S-curve
    // This creates an S-shaped path that fits within the container
    const x = normalizedT * 100; // x from 0% to 100% of container width
    
    // y varies with a sine wave (2 periods) to create the S shape
    // Adjusted amplitude to 20% of container height for a more pronounced curve
    const y = Math.sin(normalizedT * Math.PI * 2) * 20;
    
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
      x: currentPoint.x + (direction === 1 ? -2 : 2), // Adjust x position based on dog's direction
      y: currentPoint.y + yOffset,
      flipped: direction === -1,
      opacity: 0.6, // Start with higher opacity
    };
    
    setPawPrints(prev => [...prev, newPawPrint]);
    
    // Remove old paw prints if there are too many
    if (pawPrints.length > 40) {
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

  useEffect(() => {
    const animate = () => {
      if (!containerRef.current) return;
      
      // Update walking bob effect (slight up and down motion)
      setBobAmount(prev => (Math.sin(Date.now() * 0.003) * 2));
      
      // Calculate new position with variable speed (slower when sniffing)
      const currentSpeed = isSniffing ? speed * 0.3 : speed;
      let newPathPosition = pathPosition + currentSpeed * direction;
      
      // Reverse direction when reaching path ends
      if (newPathPosition >= pathLength) {
        newPathPosition = pathLength;
        setDirection(-1);
      } else if (newPathPosition <= 0) {
        newPathPosition = 0;
        setDirection(1);
      }
      
      // Calculate new point on path
      const newPoint = getPathPoint(newPathPosition);
      
      // Store current point for direction calculation
      prevPointRef.current = currentPoint;
      
      // Update current position
      setCurrentPoint(newPoint);
      setPathPosition(newPathPosition);
      
      // Add paw prints periodically while moving
      frameCountRef.current += 1;
      if (frameCountRef.current >= pawPrintFrequency) {
        addPawPrint();
        frameCountRef.current = 0;
      }
      
      animationFrameRef.current = requestAnimationFrame(animate);
    };
    
    // Start animation
    animationFrameRef.current = requestAnimationFrame(animate);
    
    // Initial sniffing with variable timing
    const triggerSniff = () => {
      setIsSniffing(true);
      
      setTimeout(() => {
        setIsSniffing(false);
        
        // Schedule next sniff with random interval
        setTimeout(triggerSniff, getRandomSniffInterval());
      }, sniffDuration);
    };
    
    // Start the first sniffing animation after a random delay
    const initialSniffTimeout = setTimeout(triggerSniff, getRandomSniffInterval());
    
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      clearTimeout(initialSniffTimeout);
    };
  }, [pathPosition, direction, isSniffing, currentPoint]);
  
  return (
    <div 
      ref={containerRef} 
      className="w-full h-full relative overflow-hidden"
      style={{ background: "linear-gradient(180deg, var(--background) 0%, var(--accent-light) 100%)" }}
    >
      {/* Background trees */}
      <div className="absolute top-5 left-[15%] opacity-80 z-0" style={{ transform: 'scale(0.85)' }}>
        <Image 
          src="/tree1.png" 
          alt="Tree" 
          width={150} 
          height={180} 
          className="object-contain"
        />
      </div>
      
      <div className="absolute top-0 right-[20%] opacity-80 z-0" style={{ transform: 'scale(0.7)' }}>
        <Image 
          src="/tree2.png" 
          alt="Tree" 
          width={130} 
          height={160} 
          className="object-contain"
        />
      </div>
      
      <div className="absolute bottom-10 left-[75%] opacity-80 z-0" style={{ transform: 'scale(0.8)' }}>
        <Image 
          src="/tree1.png" 
          alt="Tree" 
          width={120} 
          height={150} 
          className="object-contain"
        />
      </div>
      
      <div className="absolute bottom-8 left-[5%] opacity-80 z-0" style={{ transform: 'scale(0.75)' }}>
        <Image 
          src="/tree2.png" 
          alt="Tree" 
          width={110} 
          height={140} 
          className="object-contain"
        />
      </div>
      
      {/* Additional trees in various sizes */}
      <div className="absolute top-2 left-[35%] opacity-70 z-0" style={{ transform: 'scale(0.5)' }}>
        <Image 
          src="/tree1.png" 
          alt="Tree" 
          width={100} 
          height={120} 
          className="object-contain"
        />
      </div>
      
      <div className="absolute top-15 right-[35%] opacity-75 z-0" style={{ transform: 'scale(0.6)' }}>
        <Image 
          src="/tree2.png" 
          alt="Tree" 
          width={110} 
          height={130} 
          className="object-contain"
        />
      </div>
      
      <div className="absolute bottom-5 left-[45%] opacity-85 z-0" style={{ transform: 'scale(0.9)' }}>
        <Image 
          src="/tree1.png" 
          alt="Tree" 
          width={140} 
          height={170} 
          className="object-contain"
        />
      </div>
      
      <div className="absolute bottom-12 right-[10%] opacity-65 z-0" style={{ transform: 'scale(0.55)' }}>
        <Image 
          src="/tree2.png" 
          alt="Tree" 
          width={90} 
          height={110} 
          className="object-contain"
        />
      </div>
      
      <div className="absolute top-10 left-[60%] opacity-75 z-0" style={{ transform: 'scale(0.65)' }}>
        <Image 
          src="/tree1.png" 
          alt="Tree" 
          width={100} 
          height={120} 
          className="object-contain"
        />
      </div>
      
      <div className="absolute bottom-15 right-[50%] opacity-80 z-0" style={{ transform: 'scale(0.45)' }}>
        <Image 
          src="/tree2.png" 
          alt="Tree" 
          width={85} 
          height={105} 
          className="object-contain"
        />
      </div>
      
      <div className="absolute top-20 right-[5%] opacity-90 z-0" style={{ transform: 'scale(1.0)' }}>
        <Image 
          src="/tree1.png" 
          alt="Tree" 
          width={160} 
          height={190} 
          className="object-contain"
        />
      </div>
      
      <div className="absolute bottom-20 left-[25%] opacity-70 z-0" style={{ transform: 'scale(0.4)' }}>
        <Image 
          src="/tree2.png" 
          alt="Tree" 
          width={80} 
          height={100} 
          className="object-contain"
        />
      </div>

      {/* Render paw prints */}
      {pawPrints.map((pawPrint) => (
        <div 
          key={pawPrint.id}
          className="absolute z-0"
          style={{
            left: `${pawPrint.x}%`,
            top: `${50 + pawPrint.y}%`, // Center path vertically and apply offset
            opacity: pawPrint.opacity,
            transform: pawPrint.flipped ? 'scaleX(-1)' : 'none'
          }}
        >
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            width="16" 
            height="16" 
            viewBox="0 -960 960 960" 
            fill="#143F3F"
            opacity="0.4"
          >
            <path d="M180-475q-42 0-71-29t-29-71q0-42 29-71t71-29q42 0 71 29t29 71q0 42-29 71t-71 29Zm180-160q-42 0-71-29t-29-71q0-42 29-71t71-29q42 0 71 29t29 71q0 42-29 71t-71 29Zm240 0q-42 0-71-29t-29-71q0-42 29-71t71-29q42 0 71 29t29 71q0 42-29 71t-71 29Zm180 160q-42 0-71-29t-29-71q0-42 29-71t71-29q42 0 71 29t29 71q0 42-29 71t-71 29ZM266-75q-45 0-75.5-34.5T160-191q0-52 35.5-91t70.5-77q29-31 50-67.5t50-68.5q22-26 51-43t63-17q34 0 63 16t51 42q28 32 49.5 69t50.5 69q35 38 70.5 77t35.5 91q0 47-30.5 81.5T694-75q-54 0-107-9t-107-9q-54 0-107 9t-107 9Z"/>
          </svg>
        </div>
      ))}

      {/* S-curve path line (visual guide, can be removed later) */}
      <svg className="absolute top-0 left-0 w-full h-full z-0 opacity-10" viewBox="0 0 100 100" preserveAspectRatio="none">
        <path 
          d="M0,50 C25,25 75,75 100,50" 
          stroke="#143F3F" 
          strokeWidth="0.5" 
          fill="none" 
        />
      </svg>

      {/* Dog image */}
      <div 
        className={`absolute transition-transform ${isSniffing ? 'animate-sniff' : ''}`}
        style={{ 
          left: `${currentPoint.x}%`, 
          top: `${50 + currentPoint.y}%`, // Center path vertically and apply calculated Y
          transform: `translate(-50%, -50%) scaleX(${direction === 1 ? 1 : -1})`,
          zIndex: 10
        }}
      >
        <Image 
          src="/maya.png" 
          alt="Maya the dog" 
          width={160} 
          height={130} 
          className="object-contain"
          priority
        />
      </div>
      
      {/* Ground line */}
      <div className="absolute bottom-0 w-full h-2 bg-[#143F3F]/20"></div>
    </div>
  );
};

export default DogAnimation; 