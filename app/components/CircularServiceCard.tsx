'use client';

import { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import Image from 'next/image';

interface CircularServiceCardProps {
  title: string;
  description: string;
  imageSrc: string;
  detailedContent?: React.ReactNode;
  className?: string;
  size?: number;
}

// Portal component for modal
const ModalPortal = ({ children }: { children: React.ReactNode }) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  return mounted
    ? createPortal(
        children,
        document.body
      )
    : null;
};

const CircularServiceCard = ({ 
  title, 
  description, 
  imageSrc, 
  detailedContent,
  className = '',
  size = 280
}: CircularServiceCardProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  
  // Lock scrolling and manage escape key
  useEffect(() => {
    const originalStyle = window.getComputedStyle(document.body).overflow;
    
    // Handle escape key to close modal
    const handleEscapeKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isExpanded) {
        setIsExpanded(false);
      }
    };
    
    if (isExpanded) {
      // Prevent scrolling
      document.body.style.overflow = 'hidden';
      // Add escape key listener
      document.addEventListener('keydown', handleEscapeKey);
    }
    
    return () => {
      // Restore scrolling
      document.body.style.overflow = originalStyle;
      // Remove escape key listener
      document.removeEventListener('keydown', handleEscapeKey);
    };
  }, [isExpanded]);

  return (
    <div className={`relative ${className}`}>
      {/* Render popup in portal to avoid stacking context issues */}
      {isExpanded && (
        <ModalPortal>
          <div 
            className="fixed inset-0 flex items-center justify-center" 
            style={{ 
              backgroundColor: 'rgba(0, 0, 0, 0.5)',
              zIndex: 99999
            }}
            onClick={() => setIsExpanded(false)}
          >
            <div 
              ref={cardRef}
              className="bg-white rounded-xl overflow-hidden shadow-lg max-w-md w-[90%] max-h-[90vh] m-auto animate-fadeIn"
              onClick={(e) => e.stopPropagation()}
              style={{ 
                zIndex: 100000,
                position: 'relative'
              }}
            >
              <div className="relative h-64 w-full overflow-hidden">
                <Image 
                  src={imageSrc} 
                  alt={title}
                  fill
                  sizes="(max-width: 768px) 100vw, 600px"
                  style={{
                    objectFit: 'cover',
                  }}
                />
              </div>
              <div className="p-6 overflow-y-auto" style={{ maxHeight: 'calc(90vh - 16rem)' }}>
                <h3 className="text-xl font-bold mb-3" style={{ color: '#143F3F' }}>{title}</h3>
                <p className="text-muted-foreground mb-4">{description}</p>
                
                {detailedContent && (
                  <div className="mt-4">
                    {detailedContent}
                  </div>
                )}
                
                <button 
                  onClick={() => setIsExpanded(false)}
                  className="mt-6 px-4 py-2 bg-primary text-black rounded-md font-semibold hover:bg-primary-hover transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </ModalPortal>
      )}
      
      {/* Circular Image */}
      <div className="flex flex-col items-center">
        <div 
          onClick={() => setIsExpanded(true)}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          style={{ 
            width: size, 
            height: size, 
            borderRadius: '50%',
            overflow: 'hidden',
            position: 'relative',
            margin: '0 auto',
            boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
            cursor: 'pointer',
            transition: 'transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
            transform: isHovered ? 'scale(1.05)' : 'scale(1)'
          }}
        >
          <Image 
            src={imageSrc} 
            alt={title}
            width={size}
            height={size}
            style={{ 
              objectFit: 'cover', 
              width: '100%', 
              height: '100%'
            }}
            priority
          />
        </div>
        <div className="text-center mt-4 font-bold" style={{ color: '#143F3F' }}>
          {title}
        </div>
      </div>
    </div>
  );
};

export default CircularServiceCard; 