'use client';

import { useRef, useEffect, useState } from 'react';

export default function Home() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [activeSection, setActiveSection] = useState(0);

  useEffect(() => {
    const scrollContainer = scrollContainerRef.current;
    if (!scrollContainer) return;

    // Set up observer for content sections to determine active section
    const sections = document.querySelectorAll('.section');
    
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = Array.from(sections).indexOf(entry.target);
            setActiveSection(index);
            
            // Add visible class to content section
            const contentSection = entry.target.querySelector('.content-section');
            if (contentSection) {
              contentSection.classList.add('visible');
            }
          } else {
            // Remove visible class when section is not in view
            const contentSection = entry.target.querySelector('.content-section');
            if (contentSection) {
              contentSection.classList.remove('visible');
            }
          }
        });
      },
      { 
        threshold: 0.6, // Trigger when 60% of the section is visible
        root: scrollContainer
      }
    );
    
    sections.forEach((section) => observer.observe(section));

    // Handle video playback
    if (videoRef.current) {
      const video = videoRef.current;
      
      // Ensure video loads and is ready
      video.load();
      video.muted = true;
      
      // Play video continuously
      video.play().catch(() => {
        console.log('Video playback was prevented');
      });
      
      // Control video playback rate based on scroll
      scrollContainer.addEventListener('scroll', () => {
        // Keep playing the video during scrolling
        if (video.paused) {
          video.play().catch(() => {});
        }
        
        // Calculate scroll progress (0-1)
        const scrollTop = scrollContainer.scrollTop;
        const scrollHeight = scrollContainer.scrollHeight - scrollContainer.clientHeight;
        const scrollProgress = scrollTop / scrollHeight;
        
        // Adjust playback rate based on scroll speed
        video.playbackRate = Math.max(0.5, Math.min(2, 1 + scrollProgress));
      });
    }

    return () => {
      observer.disconnect();
      if (scrollContainerRef.current) {
        scrollContainerRef.current.removeEventListener('scroll', () => {});
      }
    };
  }, []);

  return (
    <div className="main-container">
      {/* Scrollable left side */}
      <div className="scrollable-container" ref={scrollContainerRef}>
        {/* Hero Section */}
        <section className="section">
          <div className="left-side">
            <div className="content-section visible">
              <h1 className="heading">Frito Paws</h1>
              <h2 className="subheading">Professional Dog Walking Service</h2>
              <p className="text">
                We provide top-notch care for your furry friends when you can't be there. 
                Trusted, reliable, and passionate about pets.
              </p>
            </div>
          </div>
        </section>

        {/* What We Do Section */}
        <section className="section">
          <div className="left-side">
            <div className="content-section">
              <h2 className="heading">What We Do?</h2>
              <h3 className="subheading">Professional Dog Walking & Care</h3>
              <p className="text">
                Our services include daily walks, playtime sessions, and personalized care for your pets.
                We tailor our approach to your dog's specific needs, energy level, and personality.
              </p>
              <ul className="text list-disc pl-5 mb-4">
                <li>Individual and group walks</li>
                <li>Puppy care visits</li>
                <li>Daily updates with photos</li>
                <li>Flexible scheduling options</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Who We Are Section */}
        <section className="section">
          <div className="left-side">
            <div className="content-section">
              <h2 className="heading">Who We Are?</h2>
              <h3 className="subheading">Meet Our Team of Dog Lovers</h3>
              <p className="text">
                We're a team of certified pet professionals who are passionate about animals.
                All our staff are insured, bonded, and have extensive experience caring for dogs of all breeds and sizes.
              </p>
              <p className="text">
                Founded in 2020, Frito Paws has quickly become the trusted choice for pet parents in the area
                who want peace of mind knowing their furry family members are receiving the best care possible.
              </p>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section className="section">
          <div className="left-side">
            <div className="content-section">
              <h2 className="heading">Get In Touch</h2>
              <h3 className="subheading">Book Your First Walk Today</h3>
              <p className="text">
                We'd love to meet you and your furry friend! Contact us today to schedule
                a free consultation or book your first walk.
              </p>
              <div className="flex flex-col gap-3">
                <p className="font-semibold">Phone: (555) 123-4567</p>
                <p className="font-semibold">Email: hello@fritopaws.com</p>
                <p className="font-semibold">Service Area: Downtown & Surrounding Neighborhoods</p>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-8 text-center bg-[#f5f5f5] dark:bg-[#111]">
          <p>© 2023 Frito Paws Professional Dog Walking. All rights reserved.</p>
        </footer>
      </div>

      {/* Fixed right side with animation */}
      <div className="fixed-right-side">
        <div className="animation-container">
          <video 
            ref={videoRef}
            className="w-full max-w-md"
            loop
            muted
            playsInline
          >
            <source src="/Animation - 1746133982800.webm" type="video/webm" />
            Your browser does not support the video tag.
          </video>
        </div>
      </div>

      {/* Navigation dots */}
      <div className="fixed right-6 top-1/2 transform -translate-y-1/2 z-10 flex flex-col gap-3">
        {[0, 1, 2, 3].map((index) => (
          <button
            key={index}
            className={`w-3 h-3 rounded-full transition-colors duration-300 ${
              activeSection === index ? 'bg-[var(--primary)]' : 'bg-gray-400'
            }`}
            onClick={() => {
              const sections = document.querySelectorAll('.section');
              sections[index].scrollIntoView({
                behavior: 'smooth'
              });
            }}
            aria-label={`Go to section ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
