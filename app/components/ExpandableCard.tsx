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

  return (
    <div
      ref={cardRef}
      className={cn(
        "relative bg-card overflow-hidden border border-border rounded-lg",
        "transition-all duration-400 cursor-pointer",
        isExpanded ? 
          "absolute inset-4 z-40 p-8" : 
          "p-6 z-30 hover:bg-accent-light",
        isExpanded ? 
          "bg-background shadow-xl" : 
          "",
        className
      )}
      style={{ 
        transformOrigin: "center",
        transform: isExpanded ? "scale(1.05)" : "scale(1)",
        transitionTimingFunction: "cubic-bezier(0.175, 0.885, 0.32, 1.275)"
      }}
      onClick={() => !isExpanded && setIsExpanded(true)}
    >
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