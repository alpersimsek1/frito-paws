'use client';

import { useState, useRef } from 'react';
import Image from 'next/image';
import { ExpandableCard } from './ExpandableCard';
import { getPopupContentForSection } from '../utils/popup-handlers';

interface CircularImageProps {
  section: string;
  imageSrc: string;
  altText: string;
  caption: string;
  size?: number;
  className?: string;
}

const CircularImage = ({ 
  section, 
  imageSrc, 
  altText, 
  caption, 
  size = 280,
  className = ''
}: CircularImageProps) => {
  const [popupContent, setPopupContent] = useState({
    title: '',
    subtitle: '',
    description: '',
    image: ''
  });
  const [isHovered, setIsHovered] = useState(false);
  const [isCardExpanded, setIsCardExpanded] = useState(false);

  const handleImageClick = () => {
    // Set the popup content based on the section
    const content = getPopupContentForSection(section);
    setPopupContent({
      title: content.title,
      subtitle: content.title,
      description: content.description,
      image: content.imageSrc
    });
    // Show the expandable card
    setIsCardExpanded(true);
  };

  return (
    <div className={`circular-image-container ${className}`} style={{ marginBottom: '30px', position: 'relative' }}>
      {/* Expandable Card Content - Only render when expanded */}
      {isCardExpanded && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[1000]">
          <ExpandableCard
            title={popupContent.title}
            subtitle={popupContent.subtitle}
            content={
              <div className="space-y-4">
                <div className="relative h-48 w-full rounded-lg overflow-hidden">
                  <Image
                    src={popupContent.image || imageSrc}
                    alt={popupContent.title || caption}
                    fill
                    className="object-cover"
                  />
                </div>
                <p className="text-gray-700 text-sm">{popupContent.description}</p>
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsCardExpanded(false);
                  }}
                  className="px-4 py-2 bg-primary text-white rounded-md font-semibold hover:bg-opacity-90 transition-colors"
                >
                  Close
                </button>
              </div>
            }
            className="relative z-[1001] max-w-md w-[90%]"
            index={0}
          />
        </div>
      )}
      
      {/* Circular Image */}
      <div 
        onClick={handleImageClick}
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
          alt={altText}
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
      <div 
        className="image-caption text-center mt-4 font-medium text-primary"
        style={{ 
          paddingBottom: '10px',
          position: 'relative',
          zIndex: 5
        }}
      >
        {caption}
      </div>
    </div>
  );
};

export default CircularImage; 