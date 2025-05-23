'use client';

import React, { useState, useRef } from "react";
import * as M from "motion";
import { cn } from "../utils";
import { useOutsideClick } from "../hooks/use-outside-click";

interface ExpandableCardProps {
  title: string;
  subtitle: string;
  content: React.ReactNode;
  className?: string;
  index?: number;
}

export const ExpandableCard = ({ 
  title, 
  subtitle, 
  content, 
  className,
  index = 0 
}: ExpandableCardProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  
  const handleOutsideClick = React.useCallback(() => {
    if (isExpanded) {
      setIsExpanded(false);
    }
  }, [isExpanded]);

  useOutsideClick(cardRef as React.RefObject<HTMLDivElement>, handleOutsideClick);

  // Generate a unique gradient based on the index
  const getGradient = (idx: number) => {
    const gradients = [
      'linear-gradient(135deg, #fff 0%, #f8f0e3 100%)', 
      'linear-gradient(135deg, #fff 0%, #e8d2ac 100%)',
      'linear-gradient(135deg, #fff 0%, #f4e2c6 100%)'
    ];
    
    return gradients[idx % gradients.length];
  };

  // Generate a unique hover gradient based on the index
  const getHoverGradient = (idx: number) => {
    const gradients = [
      'linear-gradient(135deg, #fff 0%, #e8d2ac 100%)',
      'linear-gradient(135deg, #fff 0%, #f4e2c6 100%)',
      'linear-gradient(135deg, #fff 0%, #f8f0e3 100%)'
    ];
    
    return gradients[idx % gradients.length];
  };

  return (
    <div
      ref={cardRef}
      className={cn(
        "relative overflow-hidden border border-border rounded-lg",
        "transition-all duration-400 cursor-pointer",
        isExpanded ? 
          "fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-40 p-5 max-w-md w-[90%]" : 
          "p-4 z-30",
        className
      )}
      style={{ 
        background: isExpanded ? '#fff' : getGradient(index),
        transformOrigin: "center",
        transform: isExpanded ? "scale(1)" : "scale(1)",
        transitionTimingFunction: "cubic-bezier(0.175, 0.885, 0.32, 1.275)",
        boxShadow: isExpanded ? 'var(--shadow-lg)' : 'var(--shadow-md)'
      }}
      onMouseEnter={(e) => {
        if (!isExpanded) {
          e.currentTarget.style.background = getHoverGradient(index);
        }
      }}
      onMouseLeave={(e) => {
        if (!isExpanded) {
          e.currentTarget.style.background = getGradient(index);
        }
      }}
      onClick={() => !isExpanded && setIsExpanded(true)}
    >
      {/* Decorative corner element */}
      <div 
        className="absolute top-0 right-0 w-12 h-12 overflow-hidden"
        style={{
          opacity: isExpanded ? 0 : 0.15,
          transition: 'opacity 0.3s ease'
        }}
      >
        <div 
          className="absolute transform rotate-45 bg-primary" 
          style={{
            width: '200%',
            height: '200%',
            top: '-150%',
            right: '-150%',
          }}
        />
      </div>

      <div className="relative z-20">
        <div className="text-lg font-bold mb-2 text-primary">
          {title}
        </div>
        
        <div className="text-xs font-medium" style={{ color: '#666666' }}>
          {subtitle}
        </div>

        {isExpanded && (
          <div
            className="pt-4 animate-fadeIn text-sm"
          >
            {content}
            <button
              onClick={(e) => {
                e.stopPropagation();
                setIsExpanded(false);
              }}
              className="mt-4 px-3 py-1.5 bg-primary text-white rounded-lg text-xs font-bold transition-all hover:bg-primary-hover hover:-translate-y-1 hover:shadow-md"
            >
              Close
            </button>
          </div>
        )}
      </div>
    </div>
  );
}; 