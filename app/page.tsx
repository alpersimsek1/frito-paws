'use client';

import { useState, useRef } from 'react';
import { ExpandableCard } from './components/ExpandableCard';

export default function Home() {
  return (
    <div className="main-container">
      {/* Header Section with Animation and Title */}
      <header className="header">
        <div className="animation-container mb-6">
          <video 
            className="w-full mx-auto"
            autoPlay
            loop
            muted
            playsInline
          >
            <source src="/Animation - 1746133982800.webm" type="video/webm" />
            Your browser does not support the video tag.
          </video>
        </div>
        
        <h1 className="hero-title">Frito Paws</h1>
        <p className="text-lg text-muted-foreground max-w-md mx-auto mt-3 mb-5">
          Professional Dog Walking & Care Services
        </p>
        <a href="#contact" className="book-now-btn">Book Now</a>
      </header>

      {/* Section Title */}
      <div className="text-center py-6">
        <h2 className="text-2xl font-bold mb-2">Our Services</h2>
        <div className="w-24 h-1 bg-primary mx-auto rounded-full"></div>
      </div>

      {/* Cards Container */}
      <main className="cards-container">
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
      <footer id="contact" className="contact-section">
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
