'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';

interface ImagePopupProps {
  isOpen: boolean;
  onClose: () => void;
  imageSrc: string;
  title: string;
  description: string;
}

const ImagePopup = ({ isOpen, onClose, imageSrc, title, description }: ImagePopupProps) => {
  const popupRef = useRef<HTMLDivElement>(null);
  
  // Handle outside clicks to close popup
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (popupRef.current && !popupRef.current.contains(e.target as Node)) {
        onClose();
      }
    };
    
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose]);
  
  if (!isOpen) return null;
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 image-popup-overlay" style={{ zIndex: 1000 }}>
      <div 
        ref={popupRef}
        className="bg-white rounded-xl overflow-hidden shadow-xl max-w-md w-full animate-fadeIn"
      >
        <div className="relative h-48 w-full">
          <Image
            src={imageSrc}
            alt={title}
            fill
            className="object-cover"
          />
        </div>
        <div className="p-4">
          <h3 className="font-bold text-xl mb-2 text-primary">{title}</h3>
          <p className="text-gray-700 text-sm">{description}</p>
          <button 
            onClick={onClose}
            className="mt-4 px-4 py-2 bg-primary text-white rounded-md text-sm font-semibold hover:bg-opacity-90 transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default ImagePopup; 