'use client';

import { useState, useRef, useEffect } from 'react';
import { ExpandableCard } from './components/ExpandableCard';
import Image from 'next/image';
import DogAnimation from './components/DogAnimation';
import './page-styles.css'; // Import the custom styles

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
    console.log('Form submitted:', contactFormData);
  };

  const handleCircleClick = (section: string) => {
    const element = document.getElementById(section);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="main-container">
      {/* Hero section */}
      <div className="hero-container my-8" style={{ boxShadow: 'none' }}>
        {/* Animation area at the top */}
        <div className="animation-area">
          <DogAnimation />
        </div>
        
        {/* Title on the top left */}
        <div className="absolute left-8 top-8" style={{ zIndex: 20 }}>
          <h1 className="text-4xl font-bold" style={{ color: '#143F3F' }}>FRITO PAWS</h1>
        </div>
        
        {/* Professional services text above button */}
        <div className="absolute left-1/2 top-[28%] transform -translate-x-1/2 text-center" style={{ zIndex: 20 }}>
          <h2 className="text-2xl font-bold mb-6 tracking-wide" style={{ color: '#143F3F', maxWidth: '500px' }}>Professional Dog Walking & Care Services</h2>
        </div>
        
        {/* Book Now button in the middle below title */}
        <div className="absolute left-1/2 top-[35%] transform -translate-x-1/2" style={{ zIndex: 20 }}>
          <a 
            href="#contact" 
            className="book-button"
          >
            Book NOW
          </a>
        </div>
        
        {/* Image on the right aligned with button */}
        <div className="absolute right-[10%] top-[35%] transform translate-y-8" style={{ zIndex: 10 }}>
          <div 
            className="circular-image cursor-pointer w-72 h-72"
            onClick={() => handleCircleClick('what-we-do')}
          >
            <Image 
              src="/ourservices.png" 
              alt="What we do"
              width={320}
              height={320}
              style={{ objectFit: 'cover', width: '100%', height: '100%' }}
              priority
            />
          </div>
        </div>
        
        {/* Image on the left below button */}
        <div className="absolute left-[10%] top-[50%]" style={{ zIndex: 10 }}>
          <div 
            className="circular-image cursor-pointer w-72 h-72"
            onClick={() => handleCircleClick('who-we-are')}
          >
            <Image 
              src="/one-dog.png" 
              alt="Who we are"
              width={320}
              height={320}
              style={{ objectFit: 'cover', width: '100%', height: '100%' }}
              priority
            />
          </div>
        </div>
        
        {/* Logo in the middle at the bottom */}
        <div className="absolute left-1/2 bottom-8 transform -translate-x-1/2" style={{ zIndex: 10 }}>
          <Image 
            src="/frito-logo.png" 
            alt="Frito Paws Logo"
            width={160}
            height={160}
            style={{ objectFit: 'contain' }}
            priority
          />
        </div>
        
        {/* Decorative paw prints */}
        <PawIcon size={40} top="15%" left="15%" rotate={25} opacity={0.2} />
        <PawIcon size={30} top="25%" right="20%" rotate={-15} opacity={0.2} />
        <PawIcon size={35} bottom="30%" left="25%" rotate={45} opacity={0.2} />
        <PawIcon size={25} bottom="20%" right="30%" rotate={-30} opacity={0.2} />
      </div>

      {/* Services Section with card images */}
      <section className="py-16" style={{ backgroundColor: "#FEF2E4" }}>
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

      {/* Who We Are Section */}
      <section id="who-we-are" className="py-16" style={{ backgroundColor: "#FCE9D1" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-primary mb-2">Who We Are</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Meet the team behind Frito Paws and our passion for caring for your pets
            </p>
            <div className="w-24 h-1 bg-primary mx-auto rounded-full mt-4"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="bg-white rounded-lg p-8 shadow-md">
              <h3 className="text-xl font-bold text-primary mb-4">Our Story</h3>
              <p className="text-gray-600 mb-4">
                Frito Paws was founded with a simple mission: to provide the highest quality care for your 
                furry companions. Our team consists of dedicated animal lovers who understand that pets 
                are family members.
              </p>
              <p className="text-gray-600">
                With years of experience and a passion for animal welfare, we've built a service that 
                puts your pet's happiness and safety first.
              </p>
            </div>
            <div className="bg-white rounded-lg p-8 shadow-md">
              <h3 className="text-xl font-bold text-primary mb-4">Our Values</h3>
              <ul className="text-gray-600 space-y-3">
                <li className="flex items-start">
                  <span className="text-primary mr-2">•</span>
                  <span>Trust and reliability in all our services</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary mr-2">•</span>
                  <span>Personalized care tailored to your pet's unique needs</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary mr-2">•</span>
                  <span>Regular communication and updates about your pet</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary mr-2">•</span>
                  <span>Continuous training and education for our team</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary mr-2">•</span>
                  <span>Creating joyful experiences for pets in our care</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* What We Do Section */}
      <section id="what-we-do" className="py-16" style={{ backgroundColor: "#FEF2E4" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-primary mb-2">What We Do</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Comprehensive pet care services tailored to your pet's needs
            </p>
            <div className="w-24 h-1 bg-primary mx-auto rounded-full mt-4"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-lg p-6 shadow-md border border-gray-100">
              <div className="w-12 h-12 bg-primary-light rounded-full flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-primary mb-2">Dog Walking</h3>
              <p className="text-gray-600">
                Regular walks tailored to your dog's energy level, with flexible scheduling options from 30-60 minute sessions.
              </p>
            </div>
            
            <div className="bg-white rounded-lg p-6 shadow-md border border-gray-100">
              <div className="w-12 h-12 bg-primary-light rounded-full flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-primary mb-2">Pet Sitting</h3>
              <p className="text-gray-600">
                In-home pet sitting services with feeding, playtime, and personalized care while you're away.
              </p>
            </div>
            
            <div className="bg-white rounded-lg p-6 shadow-md border border-gray-100">
              <div className="w-12 h-12 bg-primary-light rounded-full flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-primary mb-2">Playtime & Training</h3>
              <p className="text-gray-600">
                Interactive play sessions and basic training reinforcement to keep your pet mentally stimulated and well-behaved.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Us Section */}
      <section id="contact" className="py-16" style={{ backgroundColor: "#FEF2E4" }}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-2xl font-bold text-primary mb-2">Get in Touch</h2>
            <h3 className="text-4xl font-bold mb-4">Let's Chat, Reach Out to Us</h3>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
              Have questions or feedback? We're here to help. Send us a message, and we'll respond within 24 hours
            </p>
          </div>
          
          <div className="bg-white p-8 rounded-lg shadow-md">
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

              <div className="flex justify-center">
                <button type="submit" className="px-6 py-3 bg-primary text-white font-bold rounded-md hover:bg-primary-hover transition-colors">
                  Send Message
                </button>
              </div>
            </form>
            
            {/* Contact details as list below the form */}
            <div className="mt-8 pt-8 border-t border-gray-200">
              <div className="flex flex-col md:flex-row justify-center gap-8">
                <div className="flex items-center">
                  <div className="bg-gray-100 p-3 rounded-full mr-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold mb-1">Email</h3>
                    <p>hello@fritopaws.com</p>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <div className="bg-gray-100 p-3 rounded-full mr-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold mb-1">Phone</h3>
                    <p>(555) 123-4567</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer with background image */}
      <footer className="relative" style={{ 
        backgroundImage: "url('/background.png')", 
        backgroundSize: "cover",
        backgroundPosition: "bottom",
        backgroundRepeat: "no-repeat",
        paddingTop: "100px",
        minHeight: "350px",
        backgroundColor: "#FEF2E4"
      }}>
        <div className="pb-20 text-center">
          <p className="text-sm text-shadow">© 2023 Frito Paws Professional Dog Walking. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
