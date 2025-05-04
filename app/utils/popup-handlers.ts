'use client';

// Helper functions for the image popups

interface PopupState {
  isOpen: boolean;
  imageSrc: string;
  title: string;
  description: string;
}

export const defaultPopupState: PopupState = {
  isOpen: false,
  imageSrc: '',
  title: '',
  description: ''
};

export const getPopupContentForSection = (section: string) => {
  switch (section) {
    case 'who-we-are':
      return {
        isOpen: true,
        imageSrc: '/one-dog-1.png',
        title: 'Solo Walking',
        description: 'Our solo walking service provides personalized attention for your dog. Perfect for dogs that need one-on-one time or have specific exercise requirements.'
      };
    case 'what-we-do':
      return {
        isOpen: true,
        imageSrc: '/two-dogs.png',
        title: 'Group Walkings',
        description: 'Our group walks allow your dog to socialize with other furry friends while getting exercise. Small groups ensure each dog gets attention and proper supervision.'
      };
    default:
      return {
        isOpen: false,
        imageSrc: '',
        title: '',
        description: ''
      };
  }
};

export const handleSectionNavigation = (section: string) => {
  // Short delay before scrolling to allow the user to see the popup first
  setTimeout(() => {
    const element = document.getElementById(section);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }, 1500); // 1.5 seconds delay before scrolling
}; 