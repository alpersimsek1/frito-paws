'use client';

import { useState } from 'react';
import Image from 'next/image';
import ImagePopup from './ImagePopup';
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
  const [popupState, setPopupState] = useState({
    isOpen: false,
    imageSrc: '',
    title: '',
    description: ''
  });

  const handleImageClick = () => {
    // Set the popup content based on the section
    const popupContent = getPopupContentForSection(section);
    setPopupState(popupContent);
    
    // Note: Navigation has been removed as requested
  };

  return (
    <>
      {/* Image Popup */}
      <ImagePopup 
        isOpen={popupState.isOpen}
        onClose={() => setPopupState({...popupState, isOpen: false})}
        imageSrc={popupState.imageSrc}
        title={popupState.title}
        description={popupState.description}
      />
      
      {/* Circular Image */}
      <div className={`circular-image-container ${className}`} style={{ marginBottom: '30px' }}>
        <div 
          onClick={handleImageClick}
          style={{ 
            width: size, 
            height: size, 
            borderRadius: '50%',
            overflow: 'hidden',
            position: 'relative',
            margin: '0 auto',
            boxShadow: '0 4px 8px rgba(0,0,0,0.1)'
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
              height: '100%',
              transition: 'transform 0.3s ease'
            }}
            className="hover:scale-110"
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
    </>
  );
};

export default CircularImage; 