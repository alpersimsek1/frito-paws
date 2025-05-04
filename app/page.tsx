'use client';

import { useState, useRef } from 'react';
import { ExpandableCard } from './components/ExpandableCard';
import Image from 'next/image';
import DogAnimation from './components/DogAnimation';

// Component for paw icon with random rotation and position
interface PawIconProps {
  size?: number;
  position?: string;
  top?: string;
  left?: string;
  right?: string;
  bottom?: string;
  rotate?: number;
  opacity?: number;
  color?: string;
}

const PawIcon = ({ 
  size = 30, 
  position = 'absolute', 
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
      className={`${position} z-0`} 
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

// Service Card component that uses images and is expandable
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
  
  // Close card when clicking outside
  const handleClickOutside = (e: MouseEvent) => {
    if (cardRef.current && !cardRef.current.contains(e.target as Node) && isExpanded) {
      setIsExpanded(false);
    }
  };

  // Add and remove event listener for outside clicks
  useState(() => {
    if (isExpanded) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  });

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
        margin: isExpanded ? "auto" : "0"
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
        <h3 className="text-xl font-bold text-primary mb-3">{title}</h3>
        <p className="text-muted-foreground">{description}</p>
        
        {isExpanded && detailedContent && (
          <div className="mt-6 animate-fadeIn">
            {detailedContent}
          </div>
        )}
      </div>
      <div className="px-6 pb-6 flex justify-between items-center">
        {!isExpanded ? (
          <button className="text-primary font-medium flex items-center hover:underline">
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
            className="px-4 py-2 bg-primary text-white rounded-md font-semibold hover:bg-primary-hover transition-colors"
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
    message: ''
  });

  const handleContactFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setContactFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log('Form submitted:', contactFormData);
    // Reset form or show success message
  };

  return (
    <div className="main-container bg-white">
      {/* Animation at the top */}
      <div className="animation-container mt-4 mb-0 relative mx-auto">
        <DogAnimation />
      </div>

      {/* Header Section - removed background image */}
      <header className="header relative overflow-hidden bg-white">
        {/* Decorative paw icons */}
        <PawIcon top="15%" left="10%" size={40} rotate={-15} opacity={0.1} />
        <PawIcon top="25%" right="12%" size={24} rotate={20} opacity={0.1} />
        <PawIcon bottom="30%" left="15%" size={32} rotate={45} opacity={0.08} />
        <PawIcon bottom="10%" right="18%" size={36} rotate={-30} opacity={0.1} />
        
        {/* Center content */}
        <div className="flex flex-col items-center justify-center py-8">
          <h1 className="hero-title">Frito Paws</h1>
          <p className="text-lg text-muted-foreground max-w-md mx-auto mt-2 mb-6">
            Professional Dog Walking & Care Services
          </p>
          <a href="#contact" className="book-now-btn hover:scale-105 transition-transform">Book Now</a>
        </div>
      </header>

      {/* Services Section with card images - Moved here right after title */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-primary mb-2">Our Services</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              We provide professional and caring services for your furry friends
            </p>
            <div className="w-24 h-1 bg-primary mx-auto rounded-full mt-4"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <ServiceCard 
              title="What We Do" 
              description="Professional dog walking, playtime sessions, and personalized care tailored to your pet's needs, energy level, and personality."
              imageSrc="/whatwedo.png"
              detailedContent={
                <div>
                  <h4 className="text-lg font-semibold mb-3">Our Approach</h4>
                  <p className="mb-5 text-[15px] leading-relaxed">
                    Our services include daily walks, playtime sessions, and personalized care for your pets.
                    We tailor our approach to your dog's specific needs, energy level, and personality.
                  </p>
                  <ul className="list-disc pl-6 mb-5 space-y-2 text-[15px]">
                    <li>Individual and group walks</li>
                    <li>Puppy care visits</li>
                    <li>Daily updates with photos</li>
                    <li>Flexible scheduling options</li>
                  </ul>
                  <p className="text-[15px] leading-relaxed">
                    Every dog is unique, and we take the time to understand your pet's preferences, routines, and special requirements to provide the best possible care experience.
                  </p>
                </div>
              }
              index={0}
            />
            <ServiceCard 
              title="Who We Are" 
              description="A team of certified pet professionals who are passionate about animals, ensuring your furry family members receive the best care possible."
              imageSrc="/whoweare.png"
              detailedContent={
                <div>
                  <h4 className="text-lg font-semibold mb-3">Our Team</h4>
                  <p className="mb-5 text-[15px] leading-relaxed">
                    We're a team of certified pet professionals who are passionate about animals.
                    All our staff are insured, bonded, and have extensive experience caring for dogs of all breeds and sizes.
                  </p>
                  <p className="mb-5 text-[15px] leading-relaxed">
                    Founded in 2020, Frito Paws has quickly become the trusted choice for pet parents in the area
                    who want peace of mind knowing their furry family members are receiving the best care possible.
                  </p>
                  <p className="text-[15px] leading-relaxed">
                    Our team undergoes rigorous training in dog behavior, first aid, and emergency response to ensure your pet's safety and well-being at all times.
                  </p>
                </div>
              }
              index={1}
            />
            <ServiceCard 
              title="Our Services" 
              description="Daily walks, check-in visits, adventure hikes, and overnight care - all with detailed reports, photos, and GPS tracking."
              imageSrc="/ourservices.png"
              detailedContent={
                <div>
                  <h4 className="text-lg font-semibold mb-3">Service Options</h4>
                  <p className="mb-5 text-[15px] leading-relaxed">
                    We offer a variety of services to meet your pet care needs:
                  </p>
                  <ul className="list-disc pl-6 mb-5 space-y-2 text-[15px]">
                    <li className="font-medium">
                      <span className="text-primary font-bold">Daily Walks:</span> 30 or 60-minute walks
                    </li>
                    <li className="font-medium">
                      <span className="text-primary font-bold">Check-in Visits:</span> Quick visits for bathroom breaks and feeding
                    </li>
                    <li className="font-medium">
                      <span className="text-primary font-bold">Adventure Hikes:</span> Longer outdoor adventures for active dogs
                    </li>
                    <li className="font-medium">
                      <span className="text-primary font-bold">Overnight Care:</span> In-home overnight stays for extended coverage
                    </li>
                  </ul>
                  <p className="text-[15px] leading-relaxed">All services include detailed reports, photos, and GPS tracking of walks.</p>
                </div>
              }
              index={2}
            />
          </div>
        </div>
      </section>

      {/* Contact Us Section */}
      <section id="contact" className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            {/* Left Side - Contact Form */}
            <div className="bg-white p-8 rounded-lg shadow-md">
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-primary mb-2">Get in Touch</h2>
                <h3 className="text-4xl font-bold mb-4">Let's Chat, Reach Out to Us</h3>
                <p className="text-lg text-muted-foreground mb-8">
                  Have questions or feedback? We're here to help. Send us a message, and we'll respond within 24 hours
                </p>
              </div>
              
              <form onSubmit={handleContactSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label htmlFor="firstName" className="block mb-2 font-medium">First Name</label>
                    <input 
                      type="text" 
                      id="firstName" 
                      name="firstName"
                      placeholder="First name" 
                      className="w-full p-3 border border-gray-300 rounded-md"
                      value={contactFormData.firstName}
                      onChange={handleContactFormChange}
                    />
                  </div>
                  <div>
                    <label htmlFor="lastName" className="block mb-2 font-medium">Last Name</label>
                    <input 
                      type="text" 
                      id="lastName"
                      name="lastName" 
                      placeholder="Last name" 
                      className="w-full p-3 border border-gray-300 rounded-md"
                      value={contactFormData.lastName}
                      onChange={handleContactFormChange}
                    />
                  </div>
                </div>

                <div className="mb-6">
                  <label htmlFor="email" className="block mb-2 font-medium">Email Address</label>
                  <input 
                    type="email" 
                    id="email" 
                    name="email"
                    placeholder="Email address" 
                    className="w-full p-3 border border-gray-300 rounded-md"
                    value={contactFormData.email}
                    onChange={handleContactFormChange}
                  />
                </div>

                <div className="mb-6">
                  <label htmlFor="message" className="block mb-2 font-medium">Message</label>
                  <textarea 
                    id="message" 
                    name="message"
                    placeholder="Leave us message" 
                    rows={4} 
                    className="w-full p-3 border border-gray-300 rounded-md"
                    value={contactFormData.message}
                    onChange={handleContactFormChange}
                  ></textarea>
                </div>

                <div className="mb-6 flex items-center">
                  <input 
                    type="checkbox" 
                    id="privacy" 
                    className="mr-2"
                  />
                  <label htmlFor="privacy" className="text-sm">
                    I agree to our friendly <span className="underline">privacy policy</span>
                  </label>
                </div>

                <button type="submit" className="px-6 py-3 bg-primary text-white font-bold rounded-md hover:bg-primary-hover transition-colors">
                  Send Message
                </button>
              </form>
            </div>

            {/* Right Side - Image and Contact Info */}
            <div className="rounded-xl overflow-hidden relative bg-blue-100">
              <div className="relative w-full h-full">
                {/* Background with circles pattern */}
                <div className="absolute inset-0 bg-blue-100 opacity-50">
                  <div className="absolute inset-0" style={{ 
                    backgroundImage: 'radial-gradient(circle, #b4d4fc 20%, transparent 20%), radial-gradient(circle, #b4d4fc 20%, transparent 20%)',
                    backgroundSize: '60px 60px',
                    backgroundPosition: '0 0, 30px 30px',
                    opacity: 0.3
                  }}></div>
                </div>
                
                <Image 
                  src="/frito-logo.png" 
                  alt="Frito Paws Logo" 
                  width={200} 
                  height={200} 
                  className="mx-auto mt-8 mb-12"
                />
                
                {/* Contact details */}
                <div className="p-8 relative z-10">
                  <div className="mb-8 flex items-center">
                    <div className="bg-white p-3 rounded-full mr-4">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold mb-1">Email</h3>
                      <p>hello@fritopaws.com</p>
                    </div>
                  </div>
                  
                  <div className="mb-8 flex items-center">
                    <div className="bg-white p-3 rounded-full mr-4">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold mb-1">Phone</h3>
                      <p>(555) 123-4567</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer with background image kept intact */}
      <footer className="relative bg-white" style={{ 
        backgroundImage: "url('/background.png')", 
        backgroundSize: "cover",
        backgroundPosition: "bottom",
        backgroundRepeat: "no-repeat",
        paddingTop: "100px",
        minHeight: "350px",
      }}>
        <div className="pb-20 text-center">
          <p className="text-sm text-shadow">© 2023 Frito Paws Professional Dog Walking. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
