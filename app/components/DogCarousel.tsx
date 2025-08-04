'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

const DogCarousel = () => {
  const dogs = [
    { name: 'Maya', src: '/our-dogs/maya.png' },
    { name: 'Dobby', src: '/our-dogs/dobby.png' },
    { name: 'Rex', src: '/our-dogs/rex.png' },
    { name: 'Dobby', src: '/our-dogs/dabi.png' },
    { name: 'Belle&Lola', src: '/our-dogs/belle-lola.png' },
    { name: 'Duba', src: '/our-dogs/duba.png' },
    { name: 'Lucy', src: '/our-dogs/lucy.png' },
    { name: 'Nala & Poppy', src: '/our-dogs/nalapoppy.jpg' },
    { name: 'Ida', src: '/our-dogs/ida.jpg' },
    { name: 'Turby', src: '/our-dogs/turbo.png' },
    { name: 'Kiko', src: '/our-dogs/kiko.png' }


  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [isAnimating, setIsAnimating] = useState(false);
  const [animationDirection, setAnimationDirection] = useState<'left' | 'right' | null>(null);

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlaying || isAnimating) return;

    const interval = setInterval(() => {
      goToNext();
    }, 4000); // Change slide every 4 seconds

    return () => clearInterval(interval);
  }, [isAutoPlaying, isAnimating]);

  const goToSlide = (index: number) => {
    if (isAnimating) return;
    
    const direction = index > currentIndex ? 'right' : 'left';
    setAnimationDirection(direction);
    setIsAnimating(true);
    
    setTimeout(() => {
      setCurrentIndex(index);
      setTimeout(() => {
        setIsAnimating(false);
        setAnimationDirection(null);
      }, 300);
    }, 150);
  };

  const goToPrevious = () => {
    if (isAnimating) return;
    
    setAnimationDirection('left');
    setIsAnimating(true);
    
    setTimeout(() => {
      setCurrentIndex((prevIndex) => (prevIndex - 1 + dogs.length) % dogs.length);
      setTimeout(() => {
        setIsAnimating(false);
        setAnimationDirection(null);
      }, 300);
    }, 150);
  };

  const goToNext = () => {
    if (isAnimating) return;
    
    setAnimationDirection('right');
    setIsAnimating(true);
    
    setTimeout(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % dogs.length);
      setTimeout(() => {
        setIsAnimating(false);
        setAnimationDirection(null);
      }, 300);
    }, 150);
  };

  // Helper function to get dog at specific offset
  const getDogAtOffset = (offset: number) => {
    const index = (currentIndex + offset + dogs.length) % dogs.length;
    return dogs[index];
  };

  return (
    <section className="py-16 relative z-10 overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h3 className="text-4xl font-bold mb-4 text-[#143F3F]">Meet Our Furry Friends</h3>
          <p className="text-lg text-[#666666] max-w-2xl mx-auto">
            These are some of the wonderful furry clients we've had the pleasure of caring for throughout Chiswick, W4, and surrounding London areas. From energetic park adventures to peaceful home visits, each pet receives personalized attention.
          </p>
        </div>

        {/* Carousel Container */}
        <div 
          className="relative overflow-visible"
          onMouseEnter={() => setIsAutoPlaying(false)}
          onMouseLeave={() => setIsAutoPlaying(true)}
        >
          {/* Main Carousel Display - Shows 3 dogs */}
          <div className="relative h-[500px] md:h-[600px] flex items-center justify-center">
            <div className="flex items-center justify-center w-full max-w-6xl mx-auto relative">
              
              {/* Previous Dog (Left) */}
              <div className={`flex-shrink-0 w-1/4 h-full flex items-center justify-center opacity-50 hover:opacity-70 cursor-pointer transform scale-75 hover:scale-80 transition-all duration-500 ${
                isAnimating 
                  ? animationDirection === 'right' 
                    ? 'translate-x-8 opacity-30' 
                    : 'translate-x-0 opacity-50'
                  : 'translate-x-0 opacity-50'
              }`}
                   onClick={goToPrevious}>
                <div className="relative w-full h-[300px] md:h-[400px] max-w-[200px] rounded-lg overflow-hidden">
                  <Image
                    src={getDogAtOffset(-1).src}
                    alt={`${getDogAtOffset(-1).name} - Previous dog`}
                    fill
                    className={`object-contain drop-shadow-lg transition-all duration-300 ${
                      isAnimating ? 'blur-[1px]' : 'blur-0'
                    }`}
                    sizes="(max-width: 768px) 200px, 250px"
                  />
                </div>
              </div>

              {/* Current Dog (Center) - Main Focus */}
              <div className={`flex-shrink-0 w-1/2 h-full flex flex-col items-center justify-center z-10 transform transition-all duration-700 ease-out ${
                isAnimating 
                  ? 'scale-105 translate-y-2' 
                  : 'scale-100 translate-y-0'
              }`}>
                <div className={`relative w-full h-[400px] md:h-[500px] max-w-[350px] md:max-w-[400px] transform hover:scale-105 transition-all duration-500 rounded-lg overflow-hidden ${
                  isAnimating 
                    ? 'scale-110 drop-shadow-3xl' 
                    : 'scale-100 drop-shadow-2xl'
                }`}>
                  <Image
                    src={getDogAtOffset(0).src}
                    alt={`${getDogAtOffset(0).name} - A beautiful dog cared for by Frito Paws pet sitting service`}
                    fill
                    className={`object-contain transition-all duration-500 ${
                      isAnimating 
                        ? 'drop-shadow-3xl brightness-110' 
                        : 'drop-shadow-2xl brightness-100'
                    }`}
                    sizes="(max-width: 768px) 350px, 400px"
                    priority
                  />
                </div>
                
                {/* Dog Name - Only show for center dog */}
                <div className={`mt-6 transform transition-all duration-500 relative ${
                  isAnimating 
                    ? 'translate-y-4 scale-105' 
                    : 'translate-y-0 scale-100'
                }`}>
                  {/* Left Arrow - positioned next to name */}
                  <button
                    onClick={goToPrevious}
                    disabled={isAnimating}
                    className={`absolute left-[-60px] top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white backdrop-blur-sm rounded-full p-3 shadow-xl transition-all duration-300 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-[#5BA69E] z-20 ${
                      isAnimating ? 'opacity-50 cursor-not-allowed' : 'opacity-100'
                    }`}
                    aria-label="Previous dog"
                  >
                    <svg className="w-5 h-5 text-[#143F3F]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                  </button>

                  <div className={`relative group transition-all duration-500 ${
                    isAnimating ? 'scale-105' : 'scale-100'
                  }`}>
                    {/* Gradient Background */}
                    <div className={`absolute inset-0 bg-gradient-to-r from-[#5BA69E] via-[#4a8f88] to-[#143F3F] rounded-2xl blur-sm opacity-75 group-hover:opacity-90 transition-all duration-500 ${
                      isAnimating ? 'scale-110 opacity-90 blur-md' : 'scale-100 opacity-75 blur-sm'
                    }`}></div>
                    
                    {/* Main Name Container */}
                    <div className={`relative bg-white/20 backdrop-blur-md px-8 py-4 rounded-2xl shadow-2xl border border-white/30 group-hover:bg-white/30 transition-all duration-500 ${
                      isAnimating ? 'bg-white/30 shadow-3xl' : 'bg-white/20 shadow-2xl'
                    }`}>
                      {/* Inner Glow Effect */}
                      <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent rounded-2xl"></div>
                      
                      <h4 className={`relative text-2xl md:text-3xl font-bold bg-gradient-to-r from-white to-gray-100 bg-clip-text text-transparent text-center tracking-wide drop-shadow-lg transition-all duration-500 ${
                        isAnimating ? 'scale-105 drop-shadow-2xl' : 'scale-100 drop-shadow-lg'
                      }`}>
                        {getDogAtOffset(0).name}
                      </h4>
                    </div>
                  </div>

                  {/* Right Arrow - positioned next to name */}
                  <button
                    onClick={goToNext}
                    disabled={isAnimating}
                    className={`absolute right-[-60px] top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white backdrop-blur-sm rounded-full p-3 shadow-xl transition-all duration-300 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-[#5BA69E] z-20 ${
                      isAnimating ? 'opacity-50 cursor-not-allowed' : 'opacity-100'
                    }`}
                    aria-label="Next dog"
                  >
                    <svg className="w-5 h-5 text-[#143F3F]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>
              </div>

              {/* Next Dog (Right) */}
              <div className={`flex-shrink-0 w-1/4 h-full flex items-center justify-center opacity-50 hover:opacity-70 cursor-pointer transform scale-75 hover:scale-80 transition-all duration-500 ${
                isAnimating 
                  ? animationDirection === 'left' 
                    ? '-translate-x-8 opacity-30' 
                    : 'translate-x-0 opacity-50'
                  : 'translate-x-0 opacity-50'
              }`}
                   onClick={goToNext}>
                <div className="relative w-full h-[300px] md:h-[400px] max-w-[200px] rounded-lg overflow-hidden">
                  <Image
                    src={getDogAtOffset(1).src}
                    alt={`${getDogAtOffset(1).name} - Next dog`}
                    fill
                    className={`object-contain drop-shadow-lg transition-all duration-300 ${
                      isAnimating ? 'blur-[1px]' : 'blur-0'
                    }`}
                    sizes="(max-width: 768px) 200px, 250px"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Thumbnail Navigation (Desktop Only) */}
          <div className="hidden md:flex justify-center mt-12 space-x-4">
            {dogs.map((dog, index) => (
              <button
                key={dog.name}
                onClick={() => goToSlide(index)}
                disabled={isAnimating}
                className={`relative w-16 h-16 rounded-xl overflow-hidden transition-all duration-300 transform focus:outline-none focus:ring-2 focus:ring-[#5BA69E] ${
                  index === currentIndex
                    ? 'ring-4 ring-[#5BA69E] scale-110 shadow-lg'
                    : 'opacity-60 hover:opacity-80 hover:scale-105'
                } ${isAnimating ? 'cursor-not-allowed opacity-40' : ''}`}
              >
                <Image
                  src={dog.src}
                  alt={dog.name}
                  fill
                  className="object-cover"
                  sizes="64px"
                />
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default DogCarousel; 