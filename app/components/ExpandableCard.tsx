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
          "absolute inset-4 z-40 p-8" : 
          "p-6 z-30",
        className
      )}
      style={{ 
        background: isExpanded ? '#fff' : getGradient(index),
        transformOrigin: "center",
        transform: isExpanded ? "scale(1.05)" : "scale(1)",
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
        className="absolute top-0 right-0 w-16 h-16 overflow-hidden"
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
        <div className="text-xl font-bold mb-3 text-primary">
          {title}
        </div>
        
        <div className="text-sm text-muted-foreground font-medium">
          {subtitle}
        </div>

        {isExpanded && (
          <div
            className="pt-6 animate-fadeIn"
          >
            {content}
            <button
              onClick={(e) => {
                e.stopPropagation();
                setIsExpanded(false);
              }}
              className="mt-6 px-4 py-2 bg-primary text-white rounded-lg text-sm font-bold transition-all hover:bg-primary-hover hover:-translate-y-1 hover:shadow-md"
            >
              Close
            </button>
          </div>
        )}
      </div>
    </div>
  );
}; 