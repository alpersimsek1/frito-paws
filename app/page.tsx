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

export default function Home() {
  return (
    <div className="main-container">
      {/* Header Section with Animation and Title */}
      <header className="header relative overflow-hidden">
        {/* Decorative paw icons */}
        <PawIcon top="15%" left="10%" size={40} rotate={-15} opacity={0.1} />
        <PawIcon top="25%" right="12%" size={24} rotate={20} opacity={0.1} />
        <PawIcon bottom="30%" left="15%" size={32} rotate={45} opacity={0.08} />
        <PawIcon bottom="10%" right="18%" size={36} rotate={-30} opacity={0.1} />
        
        <div className="animation-container mb-4 relative">
          <DogAnimation />
        </div>
        
        <h1 className="hero-title">Frito Paws</h1>
        <p className="text-lg text-muted-foreground max-w-md mx-auto mt-2 mb-4">
          Professional Dog Walking & Care Services
        </p>
        <a href="#contact" className="book-now-btn">Book Now</a>
      </header>

      {/* Section Title */}
      <div className="text-center py-5 relative">
        <PawIcon position="absolute" top="50%" left="20%" size={28} rotate={-10} opacity={0.12} />
        <PawIcon position="absolute" top="30%" right="22%" size={24} rotate={15} opacity={0.12} />
        
        <h2 className="text-2xl font-bold mb-2">Our Services</h2>
        <div className="w-24 h-1 bg-primary mx-auto rounded-full"></div>
      </div>

      {/* Cards Container */}
      <main className="cards-container relative">
        {/* Background paw icons */}
        <PawIcon position="absolute" top="5%" left="5%" size={36} rotate={-25} opacity={0.08} />
        <PawIcon position="absolute" top="20%" right="8%" size={30} rotate={15} opacity={0.08} />
        <PawIcon position="absolute" bottom="15%" left="10%" size={24} rotate={30} opacity={0.08} />
        <PawIcon position="absolute" bottom="30%" right="5%" size={32} rotate={-10} opacity={0.08} />
        
        {/* What We Do Card */}
        <ExpandableCard 
          title="What We Do"
          subtitle="Professional Dog Walking & Care"
          content={
            <div>
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
            </div>
          }
          className="card"
          index={0}
        />

        {/* Who We Are Card */}
        <ExpandableCard 
          title="Who We Are"
          subtitle="Meet Our Team of Dog Lovers"
          content={
            <div>
              <p className="mb-5 text-[15px] leading-relaxed">
                We're a team of certified pet professionals who are passionate about animals.
                All our staff are insured, bonded, and have extensive experience caring for dogs of all breeds and sizes.
              </p>
              <p className="text-[15px] leading-relaxed">
                Founded in 2020, Frito Paws has quickly become the trusted choice for pet parents in the area
                who want peace of mind knowing their furry family members are receiving the best care possible.
              </p>
            </div>
          }
          className="card"
          index={1}
        />

        {/* Our Services Card */}
        <ExpandableCard 
          title="Our Services"
          subtitle="Tailored Dog Care Solutions"
          content={
            <div>
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
          className="card"
          index={2}
        />
      </main>

      {/* Contact Section */}
      <footer id="contact" className="contact-section relative">
        {/* Decorative paw icons */}
        <PawIcon position="absolute" top="10%" left="8%" size={40} rotate={-20} opacity={0.1} color="#143F3F" />
        <PawIcon position="absolute" top="20%" right="12%" size={28} rotate={15} opacity={0.1} color="#143F3F" />
        <PawIcon position="absolute" bottom="20%" left="15%" size={32} rotate={40} opacity={0.1} color="#143F3F" />
        <PawIcon position="absolute" bottom="15%" right="10%" size={36} rotate={-10} opacity={0.1} color="#143F3F" />
        
        <div className="contact-container">
          <h2 className="text-3xl font-bold mb-6">Contact Us</h2>
          <div className="flex flex-col md:flex-row justify-center gap-12">
            <div className="bg-card p-6 rounded-lg shadow-md">
              <h3 className="font-bold text-lg mb-3 text-primary">Phone</h3>
              <p className="text-lg">(555) 123-4567</p>
            </div>
            <div className="bg-card p-6 rounded-lg shadow-md">
              <h3 className="font-bold text-lg mb-3 text-primary">Email</h3>
              <p className="text-lg">hello@fritopaws.com</p>
            </div>
            <div className="bg-card p-6 rounded-lg shadow-md">
              <h3 className="font-bold text-lg mb-3 text-primary">Service Area</h3>
              <p className="text-lg">Downtown & Surrounding Neighborhoods</p>
            </div>
          </div>
          <p className="mt-12 text-sm">© 2023 Frito Paws Professional Dog Walking. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
