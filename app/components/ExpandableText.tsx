'use client';

import { useState } from 'react';

interface ExpandableTextProps {
  children: React.ReactNode;
  maxHeight?: string;
  className?: string;
}

const ExpandableText = ({ 
  children, 
  maxHeight = "150px", 
  className = "" 
}: ExpandableTextProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className={`relative ${className}`}>
      <div 
        className={`transition-all duration-300 ease-in-out overflow-hidden ${
          isExpanded ? 'max-h-none' : ''
        }`}
        style={{ maxHeight: isExpanded ? 'none' : maxHeight }}
      >
        {children}
      </div>
      
      {!isExpanded && (
        <>
          <div 
            className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-[#143F3F] to-transparent pointer-events-none"
            style={{ height: '60px' }}
          />
          <div className="mt-4 text-center">
            <button
              onClick={() => setIsExpanded(true)}
              className="text-[#FEF2E4] hover:text-[#8BAEAE] font-medium text-sm underline transition-colors"
            >
              ... load more
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default ExpandableText;