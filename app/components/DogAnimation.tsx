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

const DogAnimation = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState(0);
  const [direction, setDirection] = useState(1); // 1 for right, -1 for left
  const [isSniffing, setIsSniffing] = useState(false);
  const [bobAmount, setBobAmount] = useState(0);
  const [pawPrints, setPawPrints] = useState<PawPrint[]>([]);
  const animationFrameRef = useRef<number | null>(null);
  const pawPrintIdRef = useRef(0);
  
  // Animation settings
  const speed = 0.15; // Base speed (percentage per frame) - slower than before
  const containerWidth = 100; // percentage of container width
  const minSniffInterval = 3000; // Minimum ms between sniffing animations
  const maxSniffInterval = 7000; // Maximum ms between sniffing animations
  const sniffDuration = 1500; // ms for sniffing animation
  const pawPrintFrequency = 30; // frames between paw prints
  const frameCountRef = useRef(0);
  
  // Get random interval for natural-looking sniffing behavior
  const getRandomSniffInterval = () => {
    return Math.floor(Math.random() * (maxSniffInterval - minSniffInterval + 1)) + minSniffInterval;
  };

  // Add a paw print at the current position
  const addPawPrint = () => {
    if (!containerRef.current) return;
    
    // Alternate left and right paws
    const isLeftPaw = pawPrintIdRef.current % 2 === 0;
    const yOffset = isLeftPaw ? -3 : 3; // Stagger left and right paws
    
    // Create a new paw print
    const newPawPrint: PawPrint = {
      id: pawPrintIdRef.current++,
      x: position + (direction === 1 ? -2 : 2), // Adjust x position based on dog's direction
      y: yOffset,
      flipped: direction === -1,
      opacity: 0.6, // Start with higher opacity
    };
    
    setPawPrints(prev => [...prev, newPawPrint]);
    
    // Remove old paw prints if there are too many
    if (pawPrints.length > 30) {
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
      let newPosition = position + currentSpeed * direction;
      
      // Reverse direction when reaching edges
      if (newPosition >= containerWidth - 15) {
        newPosition = containerWidth - 15;
        setDirection(-1);
      } else if (newPosition <= 0) {
        newPosition = 0;
        setDirection(1);
      }
      
      // Add paw prints periodically while moving
      frameCountRef.current += 1;
      if (frameCountRef.current >= pawPrintFrequency) {
        addPawPrint();
        frameCountRef.current = 0;
      }
      
      setPosition(newPosition);
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
  }, [position, direction, isSniffing]);
  
  return (
    <div 
      ref={containerRef} 
      className="w-full h-full relative overflow-hidden"
      style={{ background: "linear-gradient(180deg, var(--background) 0%, var(--accent-light) 100%)" }}
    >
      {/* Render paw prints */}
      {pawPrints.map((pawPrint) => (
        <div 
          key={pawPrint.id}
          className="absolute z-0"
          style={{
            left: `${pawPrint.x}%`,
            bottom: `${5 + pawPrint.y}px`,
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

      {/* Dog image */}
      <div 
        className={`absolute transition-transform ${isSniffing ? 'animate-sniff' : ''}`}
        style={{ 
          left: `${position}%`, 
          bottom: `${5 + bobAmount}px`,
          transform: `scaleX(${direction === 1 ? 1 : -1})`,
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