'use client';

import { useState, useRef, useEffect } from 'react';
import { ExpandableCard } from './components/ExpandableCard';
import Image from 'next/image';
import DogAnimation from './components/DogAnimation';
import DogCarousel from './components/DogCarousel';
import CommentsCarousel from './components/CommentsCarousel';
import './page-styles.css'; // Import the custom styles
import CircularServiceCard from './components/CircularServiceCard'; // Import new component

// Component for paw icon with position
interface PawIconProps {
  size?: number;
  top?: string;
  left?: string;
  right?: string;
  bottom?: string;
  rotate?: number;
  opacity?: number;
  color?: string;
}

// Header component
const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  
  // Add scroll event listener
  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      if (offset > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  
  return (
    <header 
      className={`fixed top-0 left-0 right-0 py-4 px-6 z-50 transition-all duration-300 ${
        scrolled ? 'bg-[rgba(254,242,228,0.95)] shadow-md' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center">
          <div className="mr-3">
            <Image 
              src="/frito-logo.png" 
              alt="Frito Paws Professional Dog Walking Service Logo - Chiswick London"
              width={48}
              height={48}
              style={{ objectFit: 'contain' }}
              priority
            />
          </div>
          <h1 className="text-3xl" style={{ color: '#143F3F', fontFamily: 'Alfa Slab One, cursive', letterSpacing: '1px' }}>FRITO PAWS</h1>
        </div>
        
        {/* Navigation */}
        <div className="flex items-center space-x-4">
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8 mr-8">
            <a href="#" className="text-[#143F3F] hover:text-[#5BA69E] font-medium">Home</a>
            <a href="#services" className="text-[#143F3F] hover:text-[#5BA69E] font-medium">Services</a>
            <a href="#why-us" className="text-[#143F3F] hover:text-[#5BA69E] font-medium">About Us</a>
            <a href="#furry-friends" className="text-[#143F3F] hover:text-[#5BA69E] font-medium">Our Furry Friends</a>
            <a href="#reviews" className="text-[#143F3F] hover:text-[#5BA69E] font-medium">Reviews</a>
            <a href="#contact" className="text-[#143F3F] hover:text-[#5BA69E] font-medium">Contact</a>
            {/* Social Media Icons */}
            <div className="flex items-center space-x-3 ml-4">
              <a 
                href="https://www.instagram.com/fritopaws.london" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-[#143F3F] hover:text-[#5BA69E] transition-colors"
                aria-label="Follow us on Instagram"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
              <a 
                href="https://www.facebook.com/profile.php?id=61576673940743" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-[#143F3F] hover:text-[#5BA69E] transition-colors"
                aria-label="Follow us on Facebook"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
            </div>
          </nav>
          
          {/* Mobile menu button */}
          <button 
            className="md:hidden ml-4 p-2 text-[#143F3F] focus:outline-none"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-6 w-6" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              {mobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>
      
      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[rgba(254,242,228,0.95)] py-4 px-6 shadow-md">
          <nav className="flex flex-col space-y-4">
            <a 
              href="#" 
              className="text-[#143F3F] hover:text-[#5BA69E] font-medium"
              onClick={() => setMobileMenuOpen(false)}
            >
              Home
            </a>
            <a 
              href="#services" 
              className="text-[#143F3F] hover:text-[#5BA69E] font-medium"
              onClick={() => setMobileMenuOpen(false)}
            >
              Services
            </a>
            <a 
              href="#why-us" 
              className="text-[#143F3F] hover:text-[#5BA69E] font-medium"
              onClick={() => setMobileMenuOpen(false)}
            >
              About Us
            </a>
            <a 
              href="#furry-friends" 
              className="text-[#143F3F] hover:text-[#5BA69E] font-medium"
              onClick={() => setMobileMenuOpen(false)}
            >
              Our Furry Friends
            </a>
            <a 
              href="#reviews" 
              className="text-[#143F3F] hover:text-[#5BA69E] font-medium"
              onClick={() => setMobileMenuOpen(false)}
            >
              Reviews
            </a>
            <a 
              href="#contact" 
              className="text-[#143F3F] hover:text-[#5BA69E] font-medium"
              onClick={() => setMobileMenuOpen(false)}
            >
              Contact
            </a>
            {/* Social Media Icons for Mobile */}
            <div className="flex items-center justify-center space-x-4 mt-6 pt-4 border-t border-gray-200">
              <a 
                href="https://www.instagram.com/fritopaws.london" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-[#143F3F] hover:text-[#5BA69E] transition-colors"
                aria-label="Follow us on Instagram"
                onClick={() => setMobileMenuOpen(false)}
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
              <a 
                href="https://www.facebook.com/profile.php?id=61576673940743" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-[#143F3F] hover:text-[#5BA69E] transition-colors"
                aria-label="Follow us on Facebook"
                onClick={() => setMobileMenuOpen(false)}
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

const PawIcon = ({ 
  size = 30, 
  top, 
  left, 
  right, 
  bottom, 
  rotate = 0,
  opacity = 0.15,
  color = '#143F3F'
}: PawIconProps) => {
  return (
    <div 
      className="paw-icon" 
      style={{ 
        top, 
        left, 
        right, 
        bottom,
        transform: `rotate(${rotate}deg)`,
        opacity,
        width: size,
        height: size
      }}
    >
      <svg xmlns="http://www.w3.org/2000/svg" height={size} viewBox="0 -960 960 960" width={size} fill={color}>
        <path d="M180-475q-42 0-71-29t-29-71q0-42 29-71t71-29q42 0 71 29t29 71q0 42-29 71t-71 29Zm180-160q-42 0-71-29t-29-71q0-42 29-71t71-29q42 0 71 29t29 71q0 42-29 71t-71 29Zm240 0q-42 0-71-29t-29-71q0-42 29-71t71-29q42 0 71 29t29 71q0 42-29 71t-71 29Zm180 160q-42 0-71-29t-29-71q0-42 29-71t71-29q42 0 71 29t29 71q0 42-29 71t-71 29ZM266-75q-45 0-75.5-34.5T160-191q0-52 35.5-91t70.5-77q29-31 50-67.5t50-68.5q22-26 51-43t63-17q34 0 63 16t51 42q28 32 49.5 69t50.5 69q35 38 70.5 77t35.5 91q0 47-30.5 81.5T694-75q-54 0-107-9t-107-9q-54 0-107 9t-107 9Z"/>
      </svg>
    </div>
  );
};

// Service Card component
interface ServiceCardProps {
  title: string;
  description: string;
  detailedContent?: React.ReactNode;
  imageSrc: string;
  index?: number;
}

const ServiceCard = ({ title, description, detailedContent, imageSrc, index = 0 }: ServiceCardProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  
  // Handle outside clicks to close expanded card
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (cardRef.current && !cardRef.current.contains(e.target as Node) && isExpanded) {
        setIsExpanded(false);
      }
    };
    
    if (typeof window !== 'undefined' && isExpanded) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    
    return () => {
      if (typeof window !== 'undefined') {
        document.removeEventListener('mousedown', handleClickOutside);
      }
    };
  }, [isExpanded]);

  return (
    <div 
      ref={cardRef}
      className={`bg-white rounded-xl overflow-hidden shadow-lg transition-all duration-300 flex flex-col h-full cursor-pointer ${
        isExpanded ? "fixed inset-4 z-50 overflow-y-auto" : "relative"
      }`}
      style={{
        transform: isExpanded ? "scale(1)" : "scale(1)",
        maxWidth: isExpanded ? "90%" : "100%",
        maxHeight: isExpanded ? "90%" : "100%",
        margin: isExpanded ? "auto" : "0",
        backgroundColor: "white"
      }}
      onClick={() => !isExpanded && setIsExpanded(true)}
    >
      <div className={`relative ${isExpanded ? "h-64" : "h-48"} w-full overflow-hidden`}>
        <Image 
          src={imageSrc} 
          alt={title}
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          style={{
            objectFit: 'cover',
          }}
          className={`transition-transform duration-500 ${!isExpanded && "hover:scale-105"}`}
        />
      </div>
      <div className="p-6 flex-grow">
        <h3 className="text-xl font-bold text-[#143F3F] mb-3">{title}</h3>
        <p className="text-[#666666]">{description}</p>
        
        {isExpanded && detailedContent && (
          <div className="mt-6 animate-fadeIn">
            {detailedContent}
          </div>
        )}
      </div>
      <div className="px-6 pb-6 flex justify-between items-center">
        {!isExpanded ? (
          <button className="text-[#143F3F] font-medium flex items-center hover:underline">
            Learn more
            <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </button>
        ) : (
          <button 
            onClick={(e) => {
              e.stopPropagation();
              setIsExpanded(false);
            }}
            className="px-4 py-2 bg-[#5BA69E] text-white rounded-md font-semibold hover:bg-[#4a8f88] transition-colors"
          >
            Close
          </button>
        )}
      </div>
    </div>
  );
};

export default function Home() {
  const [contactFormData, setContactFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    message: ''
  });
  const [subscriptionEmail, setSubscriptionEmail] = useState('');

  const handleContactFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setContactFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', contactFormData);
  };

  const handleCircleClick = (section: string) => {
    const element = document.getElementById(section);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };
  
  const handleBookNowClick = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Track Book Now button click with Google Analytics
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'book_now_click', {
        event_category: 'engagement',
        event_label: 'Book Now Button',
        value: 1
      });
    }
    
    // Update the contact form email with the subscription email
    setContactFormData(prev => ({
      ...prev,
      email: subscriptionEmail
    }));
    
    // Scroll to contact section
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="main-container relative">
      {/* Background overlay */}
      <div className="absolute inset-0 bg-[#FEF2E4] opacity-85 z-0" style={{ pointerEvents: "none" }}></div>
      
      {/* Add Header */}
      <Header />
      
      {/* Full-width animation section - Moved to be directly below header */}
      <div className="w-full overflow-hidden relative z-10" style={{
        width: "100vw",
        position: "relative", 
        left: "50%",
        right: "50%",
        marginLeft: "-50vw",
        marginRight: "-50vw",
        maxWidth: "100vw",
        marginTop: "0" // Remove any margin to push it up to navbar
      }}>
        <DogAnimation />
      </div>

      {/* Content wrapper */}
      <div className="content-wrapper relative z-10 mt-0">
        {/* Hero section */}
        <div id="services" className="hero-container">
          {/* Desktop Layout */}
          <div className="hidden md:block">
            {/* Professional services text with Book Now button */}
            <div className="text-center px-8 py-4 rounded-md mx-auto" 
                style={{ zIndex: 20, maxWidth: '800px' }}>
              <h2 className="text-2xl font-bold tracking-wide mb-8" style={{ color: '#143F3F' }}>Professional Dog Walking & Pet Sitting Services in Chiswick, London</h2>
              <p className="text-lg mb-6 text-[#666666] max-w-4xl mx-auto">We offer flexible walking and sitting services throughout Chiswick, W4, and surrounding London areas including Turnham Green, Hammersmith, Acton, Richmond, and Kew Gardens. Your pet gets the attention they need while you're busy.</p>
              
              {/* Email subscription form with Sign up button */}
              <div className="flex items-center justify-center mb-8">
                <form className="w-full max-w-md bg-white flex rounded-full overflow-hidden shadow-md" onSubmit={handleBookNowClick}>
                  <input 
                    type="email" 
                    placeholder="Your email" 
                    className="w-full px-6 py-3 outline-none text-gray-600" 
                    value={subscriptionEmail}
                    onChange={(e) => setSubscriptionEmail(e.target.value)}
                  />
                  <button 
                    type="submit"
                    className="px-6 py-3 bg-[#5BA69E] text-white font-semibold whitespace-nowrap hover:bg-[#4a8f88] transition-colors"
                  >
                    Book Now!
                  </button>
                </form>
              </div>
              
              {/* WhatsApp button */}
              <div className="flex items-center justify-center mb-8">
                <a 
                  href="https://wa.me/447534148093?text=Hi%20there!%20I%27d%20like%20to%20book%20a%20dog%20walking%20service%20with%20Frito%20Paws."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-2 bg-[#25D366] text-white px-6 py-3 rounded-full font-semibold hover:bg-[#1da851] transition-colors shadow-md"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.382"/>
                  </svg>
                  <span>WhatsApp Us</span>
                </a>
              </div>
            </div>
            
            <div className="flex justify-center items-start w-full mt-6">
              {/* Left Image */}
              <div className="mr-12" style={{ zIndex: 10 }}>
                <CircularServiceCard 
                  title="Private Adventures"
                  description="Treat your dog to exclusive one-on-one attention with our dedicated private walking service. These personalized adventures ensure your furry friend receives our undivided focus, allowing us to fully cater to their individual pace, preferences, and training needs."
                  imageSrc="/one-dog-1.png"
                  size={256}
                  className="circle-container"
                  detailedContent={
                    <div>
                      <p>Each solo walk includes photo & video updates and a detailed report of your dog's activities and behavior.</p>
                                            
                      <h4 className="text-lg font-semibold mt-6 mb-3">Personalized Walkings</h4>
                      <p className="mb-4">
                        We tailor each walk based on your dog's unique personality and needs. Whether they prefer energetic play, gentle strolls, or have special health considerations, we'll adapt our approach accordingly. From route selection to walking duration, we ensure your dog gets exactly what they need to stay happy and healthy.
                      </p>
                    </div>
                  }
                />
              </div>
              
              {/* Middle Image */}
              <div className="mx-4" style={{ zIndex: 10 }}>
                <CircularServiceCard 
                  title="Social Pack Walks"
                  description="Give your dog the joy of friendship while ensuring personalized attention. Our exclusive small group walks bring together a maximum of four compatible dogs, creating the perfect balance between socialization and supervision. This thoughtfully limited pack size allows your furry friend to enjoy canine companionship and play while still receiving individualized care and attention from us."
                  imageSrc="/two-dogs.png"
                  size={256}
                  className="circle-container"
                  detailedContent={
                    <div>
                      <h4 className="text-lg font-semibold mb-3">Social Experience</h4>
                      <p className="mb-4">
                        Our group walking service offers your dog the chance to socialise while enjoying their exercise.
                        Benefits include:
                      </p>
                      <ul className="list-disc pl-6 mb-4 space-y-2">
                        <li>Socialisation with other friendly dogs</li>
                        <li>Cost-effective option for regular walking</li>
                      </ul>
                                            
                      <p>Each group walk includes photo & video updates and a detailed report of your dog's activities and behavior.</p>
                      
                      <h4 className="text-lg font-semibold mt-6 mb-3">Personalized Walkings</h4>
                      <p className="mb-4">
                        Even in group settings, we recognize each dog's individuality. We carefully match walking companions based on energy levels and temperament, and ensure that each dog's specific needs are met. Our routes and activities are designed to accommodate the unique requirements of all dogs in the group.
                      </p>
                    </div>
                  }
                />
              </div>
              
              {/* Right Image */}
              <div className="ml-12" style={{ zIndex: 10 }}>
                <CircularServiceCard 
                  title="Cosy Homestays"
                  description="Transform your time away into a worry-free experience for your pet with our attentive in-home care service. When you can't bring your furry family member along, our Cosy Homestays provide them with a loving environment, familiar routines, and plenty of affection."
                  imageSrc="/pet-sitting.png"
                  size={256}
                  className="circle-container"
                  detailedContent={
                    <div>
                      <h4 className="text-lg font-semibold mb-3">In-Home Care</h4>
                      <p className="mb-4">
                        We'll ensure your pet receives consistent feeding, regular exercise, comfort, and companionship in our home—maintaining their happiness while preserving their sense of security. With personalised care plans tailored to your pet's specific needs and preferences, you can enjoy your time away knowing your beloved companion is in caring, experienced hands.
                      </p>
                      
                      <h4 className="text-lg font-semibold mb-3" style={{ color: '#5BA69E' }}>Price to be discussed based on needs, hours, etc.</h4>
                      
                      <ul className="list-disc pl-6 mb-4 space-y-2">
                        <li>Regular feeding, play, and care sessions and lots of love</li>
                      </ul>
                      <p>We provide detailed updates and photos & videos to keep you connected with your pet during your absence.</p>
                    </div>
                  }
                />
              </div>
            </div>
          </div>
          
          {/* Mobile Layout - Reverted to vertical stack */}
          <div className="block md:hidden">
            {/* Text with Book Now button */}
            <div className="services-text px-6 py-4 rounded-md mb-12">
              <h2 className="text-xl font-bold tracking-wide mb-6" style={{ color: '#143F3F' }}>Professional Dog Walking & Pet Sitting Services in Chiswick, London</h2>
              
              {/* WhatsApp button for mobile - moved here */}
              <div className="flex items-center justify-center mb-6">
                <a 
                  href="https://wa.me/447534148093?text=Hi%20there!%20I%27d%20like%20to%20book%20a%20dog%20walking%20service%20with%20Frito%20Paws."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-2 bg-[#25D366] text-white px-5 py-2.5 rounded-full font-semibold hover:bg-[#1da851] transition-colors shadow-md"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.382"/>
                  </svg>
                  <span>WhatsApp Us</span>
                </a>
              </div>
              
              <p className="text-lg mb-6 text-[#666666]">We offer flexible walking and sitting services throughout Chiswick, W4, and surrounding London areas.</p>
              
              {/* Email subscription form with Sign up button for mobile */}
              <div className="flex items-center justify-center mb-6">
                <form className="w-full bg-white flex rounded-full overflow-hidden shadow-md" onSubmit={handleBookNowClick}>
                  <input 
                    type="email" 
                    placeholder="Your email" 
                    className="w-full px-5 py-2.5 outline-none text-gray-600" 
                    value={subscriptionEmail}
                    onChange={(e) => setSubscriptionEmail(e.target.value)}
                  />
                  <button 
                    type="submit"
                    className="px-5 py-2.5 bg-[#5BA69E] text-white font-semibold whitespace-nowrap hover:bg-[#4a8f88] transition-colors"
                  >
                    Book Now!
                  </button>
                </form>
              </div>
            </div>
            
            {/* Left Image - Solo Walking */}
            <div className="image-container mb-16">
              <CircularServiceCard 
                title="Private Adventures - Individual Dog Walking in Chiswick"
                description="Treat your dog to exclusive one-on-one attention with our dedicated private walking service throughout Chiswick and W4. These personalized adventures ensure your furry friend receives our undivided focus, allowing us to fully cater to their individual pace, preferences, and training needs. Perfect for dogs who prefer solo attention or have specific behavioral requirements."
                imageSrc="/one-dog-1.png"
                size={200}
                className="circle-container"
                detailedContent={
                  <div>
                      <p>Each solo walk includes photo & video updates and a detailed report of your dog's activities and behavior.</p>
                                            
                      <h4 className="text-lg font-semibold mt-6 mb-3">Personalized Walkings</h4>
                      <p className="mb-4">
                        We tailor each walk based on your dog's unique personality and needs. Whether they prefer energetic play, gentle strolls, or have special health considerations, we'll adapt our approach accordingly. From route selection to walking duration, we ensure your dog gets exactly what they need to stay happy and healthy.
                      </p>
                  </div>
                }
              />
            </div>
            
            {/* Middle Image - Group Walking */}
            <div className="image-container mb-16">
              <CircularServiceCard 
                title="Social Pack Walks - Group Dog Walking in Chiswick"
                description="Give your dog the joy of friendship while ensuring personalized attention in Chiswick's beautiful parks and green spaces. Our exclusive small group walks bring together a maximum of four compatible dogs, creating the perfect balance between socialization and supervision. This thoughtfully limited pack size allows your furry friend to enjoy canine companionship at locations like Turnham Green, Chiswick Common, and local parks while receiving individualized care."
                imageSrc="/two-dogs.png"
                size={200}
                className="circle-container"
                detailedContent={
                  <div>
                    <h4 className="text-lg font-semibold mb-3">Social Experience</h4>
                      <p className="mb-4">
                        Our group walking service offers your dog the chance to socialise while enjoying their exercise.
                        Benefits include:
                      </p>
                      <ul className="list-disc pl-6 mb-4 space-y-2">
                        <li>Socialisation with other friendly dogs</li>
                        <li>Cost-effective option for regular walking</li>
                      </ul>
                                            
                      <p>Each group walk includes photo & video updates and a detailed report of your dog's activities and behavior.</p>
                      
                      <h4 className="text-lg font-semibold mt-6 mb-3">Personalized Walkings</h4>
                      <p className="mb-4">
                        Even in group settings, we recognize each dog's individuality. We carefully match walking companions based on energy levels and temperament, and ensure that each dog's specific needs are met. Our routes and activities are designed to accommodate the unique requirements of all dogs in the group.
                      </p>
                  </div>
                }
              />
            </div>
            
            {/* Right Image - Pet Sitting */}
            <div className="image-container">
              <CircularServiceCard 
                title="Cosy Homestays - Pet Sitting in Chiswick Homes"
                description="Transform your time away into a worry-free experience for your pet with our attentive in-home care service throughout Chiswick and surrounding London areas. When you can't bring your furry family member along, our Cosy Homestays provide them with a loving environment in your own home or ours, familiar routines, and plenty of affection. Ideal for extended trips or when your pet prefers the comfort of home."
                imageSrc="/pet-sitting.png"
                size={200}
                className="circle-container"
                detailedContent={
                  <div>
                      <h4 className="text-lg font-semibold mb-3">In-Home Care</h4>
                      <p className="mb-4">
                        We'll ensure your pet receives consistent feeding, regular exercise, comfort, and companionship in our home—maintaining their happiness while preserving their sense of security. With personalised care plans tailored to your pet's specific needs and preferences, you can enjoy your time away knowing your beloved companion is in caring, experienced hands.
                      </p>
                      
                      <h4 className="text-lg font-semibold mb-3" style={{ color: '#5BA69E' }}>Price to be discussed based on needs, hours, etc.</h4>
                      
                      <ul className="list-disc pl-6 mb-4 space-y-2">
                        <li>Regular feeding, play, and care sessions and lots of love</li>
                      </ul>
                      <p>We provide detailed updates and photos & videos to keep you connected with your pet during your absence.</p>
                  </div>
                }
              />
            </div>
          </div>
        </div>
      </div>

      {/* Who We Are Banner */}
      <div id="why-us" className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 mb-16 mt-0 relative z-10 why-us-section">
        <div 
          className="rounded-lg overflow-hidden"
          style={{ 
            backgroundColor: "#143F3F", 
            padding: "2.5rem", 
            boxShadow: "0 4px 12px rgba(20, 63, 63, 0.2)",
            position: "relative",
            zIndex: 15
          }}
        >
          <div>
            <div className="flex items-center mb-2">
              <div className="w-16 h-0.5 bg-[#8BAEAE] mr-4"></div>
              <h3 className="text-[#8BAEAE] font-medium uppercase tracking-wider">WHY US</h3>
            </div>
            
            <h2 className="text-5xl font-bold mb-6" style={{ color: "#FEF2E4", position: "relative", zIndex: 20 }}>The Frito Paws difference</h2>
            
            <div className="grid grid-cols-1 gap-8 mt-6">
              <div className="flex items-start">
                <div className="mr-4 bg-[#1a4f4f] p-3 rounded-lg overflow-hidden" style={{ minWidth: '70px', height: '70px', position: 'relative' }}>
                  <Image 
                    src="/why-us.png" 
                    alt="Professional dog walkers and pet sitters team in Chiswick London"
                    fill
                    style={{ 
                      objectFit: 'cover',
                    }}
                  />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2" style={{ color: "#FEF2E4", position: "relative", zIndex: 20 }}>Who We Are</h3>
                  <p className="text-[#e0e0e0]" style={{ position: "relative", zIndex: 20 }}>
                    We're a dog-loving couple in our early 30s ready to care for your furry friends throughout Chiswick, W4, and surrounding London areas including Hammersmith, Acton, Richmond, and Kew Gardens! With professional backgrounds in finance and tech, we understand busy schedules and the importance of reliable pet care when you need it most.
                  </p>
                  <p className="text-[#e0e0e0] mt-3" style={{ position: "relative", zIndex: 20 }}>
                    Our passion for dogs runs deep - we both grew up surrounded by a variety of breeds. This lifelong experience has given us a natural understanding of different dog personalities, needs, and behaviors.
                  </p>
                  <p className="text-[#e0e0e0] mt-3" style={{ position: "relative", zIndex: 20 }}>
                    When we're not working our day jobs, nothing makes us happier than spending time outdoors with canine companions in Chiswick's beautiful parks and green spaces. We offer flexible walking and sitting services throughout the local area whenever your pet needs attention while you're busy, bringing both professional reliability and genuine love to every interaction with your four-legged family members.
                  </p>
                  <p className="text-[#e0e0e0] mt-3" style={{ position: "relative", zIndex: 20 }}>
                    Frito Paws isn't just a service for us - it's a chance to combine our love for animals with our desire to help our neighbors and be more active in our community.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="mr-4 bg-[#1a4f4f] p-3 rounded-lg overflow-hidden" style={{ minWidth: '70px', height: '70px', position: 'relative' }}>
                  <Image 
                    src="/peace-of-mind.png" 
                    alt="GPS tracking and real-time updates for pet safety and owner peace of mind"
                    fill
                    style={{ 
                      objectFit: 'cover',
                    }}
                  />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2" style={{ color: "#FEF2E4", position: "relative", zIndex: 20 }}>Peace of Mind</h3>
                  <p className="text-[#e0e0e0]" style={{ position: "relative", zIndex: 20 }}>
                  While your furry family member is in our care around Chiswick and local areas, we ensure you're never left wondering. Through regular real-time updates, adorable photos of your pet's adventures in local parks and streets, and GPS tracking via WhatsApp live location sharing, you'll always know exactly where your dog is and how they're doing. Our transparent communication approach means you can focus on your day with complete confidence, knowing your beloved pet is safe, happy, and thoroughly enjoying their time exploring the best of Chiswick with us.</p>
                </div>
              </div>
            </div>
            
          </div>
        </div>
      </div>

      {/* Dog Carousel Section */}
      <div id="furry-friends">
        <DogCarousel />
      </div>

      {/* Comments Carousel Section */}
      <div id="reviews">
        <CommentsCarousel />
      </div>

      {/* Service Areas Section */}
      <section className="py-16 bg-gradient-to-br from-[#F2F9F9] to-[#FEF2E4] relative z-10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h3 className="text-4xl font-bold mb-4 text-[#143F3F]">Our Service Areas in West London</h3>
            <p className="text-lg text-[#666666] max-w-3xl mx-auto mb-8">
              Frito Paws proudly serves Chiswick and surrounding areas with professional dog walking and pet sitting services. We know the local parks, safe walking routes, and pet-friendly locations that make each walk an adventure.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-xl shadow-md">
              <h4 className="text-xl font-bold text-[#143F3F] mb-3">Chiswick W4</h4>
              <p className="text-[#666666] mb-4">Our primary service area covering all of Chiswick including Turnham Green, Chiswick High Road, and riverside areas along the Thames Path.</p>
              <ul className="text-sm text-[#666666] space-y-1">
                <li>• Chiswick Common & Rec Ground</li>
                <li>• Thames Path riverside walks</li>
                <li>• Turnham Green area</li>
                <li>• Chiswick High Road vicinity</li>
              </ul>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-md">
              <h4 className="text-xl font-bold text-[#143F3F] mb-3">Hammersmith & Fulham</h4>
              <p className="text-[#666666] mb-4">Extended service to neighboring Hammersmith areas with excellent transport links and beautiful parks perfect for dog walking.</p>
              <ul className="text-sm text-[#666666] space-y-1">
                <li>• Ravenscourt Park</li>
                <li>• Hammersmith Bridge area</li>
                <li>• King Street vicinity</li>
                <li>• Fulham Palace Gardens</li>
              </ul>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-md">
              <h4 className="text-xl font-bold text-[#143F3F] mb-3">Richmond, Kew & Acton</h4>
              <p className="text-[#666666] mb-4">Service extension to Richmond, Kew Gardens area, and Acton providing comprehensive pet care across West London.</p>
              <ul className="text-sm text-[#666666] space-y-1">
                <li>• Richmond Park proximity</li>
                <li>• Kew Gardens vicinity</li>
                <li>• Acton residential areas</li>
                <li>• Transport-accessible locations</li>
              </ul>
            </div>
          </div>
          
          <div className="text-center mt-12">
            <p className="text-[#666666] mb-6">Not sure if we cover your area? Contact us to discuss your location - we're always happy to accommodate nearby areas for regular clients.</p>
            <a 
              href="#contact"
              className="inline-block px-8 py-3 bg-[#5BA69E] text-white font-semibold rounded-full hover:bg-[#4a8f88] transition-colors shadow-md"
            >
              Check Your Area
            </a>
          </div>
        </div>
      </section>

      {/* Contact Us Section */}
      <section id="contact" className="py-16 relative z-10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h3 className="text-4xl font-bold mb-4 text-[#143F3F]">Contact Frito Paws - Your Local Chiswick Pet Care Experts</h3>
            <p className="text-lg text-[#666666] max-w-2xl mx-auto mb-8">
              Ready to book dog walking or pet sitting services in Chiswick, W4, or surrounding London areas? Have questions about our services? We're here to help. Send us a message, and we'll respond within 24 hours to discuss your pet's needs.
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            {/* Contact Dog Image - Moved to left side */}
            <div className="hidden lg:flex justify-center items-center h-full order-2 lg:order-1">
              <div className="relative w-full max-w-md h-[600px]">
                <Image 
                  src="/contact-dog.png" 
                  alt="Friendly dog waiting to meet new pet care clients in Chiswick London"
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  style={{
                    objectFit: 'contain',
                    objectPosition: 'center',
                  }}
                />
              </div>
            </div>
            
            {/* Contact Form - Moved to right side */}
            <div className="bg-white p-8 rounded-lg shadow-md order-1 lg:order-2">
              <form action="https://api.web3forms.com/submit" method="POST" className="relative" onSubmit={(e) => {
                // Track form submission with Google Analytics
                if (typeof window !== 'undefined' && (window as any).gtag) {
                  (window as any).gtag('event', 'contact_form_submit', {
                    event_category: 'engagement',
                    event_label: 'Contact Form',
                    value: 1
                  });
                }
                
                // Allow the form to submit naturally to Web3Forms
                console.log('Form submitted to Web3Forms');
              }}>
                {/* Web3Forms Access Key */}
                <input type="hidden" name="access_key" value="07630ced-bf9b-4a96-be14-d894eaa84be9" />
                
                {/* Honeypot Spam Protection */}
                <input type="checkbox" name="botcheck" className="hidden" style={{ display: 'none' }} />
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label htmlFor="firstName" className="block mb-2 font-medium text-[#143F3F]">First Name</label>
                    <input 
                      type="text" 
                      id="firstName" 
                      name="first_name"
                      placeholder="First name" 
                      className="w-full p-3 border border-gray-300 rounded-md"
                      value={contactFormData.firstName}
                      onChange={(e) => {
                        setContactFormData({
                          ...contactFormData,
                          firstName: e.target.value
                        });
                      }}
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="lastName" className="block mb-2 font-medium text-[#143F3F]">Last Name</label>
                    <input 
                      type="text" 
                      id="lastName"
                      name="last_name" 
                      placeholder="Last name" 
                      className="w-full p-3 border border-gray-300 rounded-md"
                      value={contactFormData.lastName}
                      onChange={(e) => {
                        setContactFormData({
                          ...contactFormData,
                          lastName: e.target.value
                        });
                      }}
                      required
                    />
                  </div>
                </div>

                <div className="mb-6">
                  <label htmlFor="email" className="block mb-2 font-medium text-[#143F3F]">Email Address</label>
                  <input 
                    type="email" 
                    id="email" 
                    name="email"
                    placeholder="Email address" 
                    className="w-full p-3 border border-gray-300 rounded-md"
                    value={contactFormData.email}
                    onChange={(e) => {
                      setContactFormData({
                        ...contactFormData,
                        email: e.target.value
                      });
                    }}
                    required
                  />
                </div>
                
                <div className="mb-6">
                  <label htmlFor="phone" className="block mb-2 font-medium text-[#143F3F]">Phone Number</label>
                  <input 
                    type="tel" 
                    id="phone" 
                    name="phone"
                    placeholder="Phone number (optional)" 
                    className="w-full p-3 border border-gray-300 rounded-md"
                    value={contactFormData.phone}
                    onChange={(e) => {
                      setContactFormData({
                        ...contactFormData,
                        phone: e.target.value
                      });
                    }}
                  />
                </div>

                <div className="mb-6">
                  <label htmlFor="message" className="block mb-2 font-medium text-[#143F3F]">Message</label>
                  <textarea 
                    id="message" 
                    name="message"
                    placeholder="Leave us message" 
                    rows={4} 
                    className="w-full p-3 border border-gray-300 rounded-md"
                    value={contactFormData.message}
                    onChange={(e) => {
                      setContactFormData({
                        ...contactFormData,
                        message: e.target.value
                      });
                    }}
                    required
                  ></textarea>
                </div>

                <div className="mb-6 flex items-center">
                  <input 
                    type="checkbox" 
                    id="privacy"
                    name="privacy_agreed"
                    className="mr-2"
                    required
                  />
                  <label htmlFor="privacy" className="text-sm text-[#143F3F]">
                    I agree to our friendly <span className="underline">privacy policy</span>
                  </label>
                </div>

                {/* Submit button with improved visibility */}
                <div className="flex justify-center mt-8 mb-4">
                  <button 
                    type="submit" 
                    className="w-full px-6 py-4 bg-[#5BA69E] text-white font-bold text-lg rounded-md hover:bg-[#4a8f88] transition-colors shadow-md"
                  >
                    Send Message
                  </button>
                </div>
              </form>
              
              {/* Contact details as list below the form */}
              <div className="mt-8 pt-8 border-t border-gray-200">
                <div className="flex flex-col md:flex-row justify-center gap-8">
                  <div className="flex items-center">
                    <div className="bg-[#F2F9F9] p-3 rounded-full mr-4">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#5BA69E]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-lg font-bold mb-1 text-[#143F3F]">Email</h3>
                      <p className="text-[#5BA69E]">info@fritopaws.com</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center">
                    <div className="bg-[#F2F9F9] p-3 rounded-full mr-4">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#5BA69E]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-lg font-bold mb-1 text-[#143F3F]">Phone</h3>
                      <p className="text-[#5BA69E]">07534148093</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer with background image */}
      <footer className="py-10 text-center relative z-10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center justify-center mb-6">
            <Image 
              src="/frito-logo.png" 
              alt="Frito Paws Dog Walking Service Logo - Professional Pet Care Chiswick London"
              width={120}
              height={120}
              style={{ objectFit: 'contain' }}
            />
            <h3 className="text-2xl mt-1" style={{ color: '#143F3F', fontFamily: 'Alfa Slab One, cursive', letterSpacing: '1px' }}>FRITO PAWS</h3>
            
            {/* Social Media Icons in Footer */}
            <div className="flex items-center justify-center space-x-4 mt-4">
              <a 
                href="https://www.instagram.com/fritopaws.london" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-[#143F3F] hover:text-[#5BA69E] transition-colors"
                aria-label="Follow us on Instagram"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
              <a 
                href="https://www.facebook.com/profile.php?id=61576673940743" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-[#143F3F] hover:text-[#5BA69E] transition-colors"
                aria-label="Follow us on Facebook"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
            </div>
          </div>
          <p className="text-sm text-[#143F3F]">© 2025 Frito Paws Professional Dog Walking & Pet Sitting Services Chiswick, London. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
