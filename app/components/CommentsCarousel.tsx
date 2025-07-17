'use client';

import { useState } from 'react';

interface Review {
  id: number;
  name: string;
  verified: boolean;
  date: string;
  service: string;
  review: string;
  rating: number;
}

const CommentsCarousel = () => {
  const reviews: Review[] = [
    {
      id: 1,
      name: 'Carla Harrison',
      verified: true,
      date: '16 July 2025',
      service: 'Dog Walking',
      review: 'Our 2 goldens Ravi and Mitra loved getting walked by Imge and Alper. They would wait by our garden gate every morning for them to arrive. Alper and Imge would send us updates and pictures during the walk. They are highly reliable and even assisted us with morning and evening walks whilst we were on holiday. Would highly recommend!',
      rating: 5
    },
    {
      id: 2,
      name: 'Gill',
      verified: true,
      date: '14 July 2025',
      service: 'Dog Walking',
      review: 'I needed someone for my 2 JR\'s and I am so happy I went with Frito Paws I was so nervous having someone for Belle and Lola but they love their walks with Imge and Alper especially Belle cos she waits by door when they leave. It makes it easier for me when they return as they are nice and relaxed. I am so happy and lucky I found them and would highly recommend them if you need someone for your pets',
      rating: 5
    },
    {
      id: 3,
      name: 'Carla Harrison',
      verified: true,
      date: '16 July 2025',
      service: 'Dog Walking',
      review: 'Our 2 goldens Ravi and Mitra loved getting walked by Imge and Alper. They would wait by our garden gate every morning for them to arrive. Alper and Imge would send us updates and pictures during the walk. They are highly reliable and even assisted us with morning and evening walks whilst we were on holiday. Would highly recommend!',
      rating: 5
    },
    {
      id: 4,
      name: 'Gill',
      verified: true,
      date: '14 July 2025',
      service: 'Dog Walking',
      review: 'I needed someone for my 2 JR\'s and I am so happy I went with Frito Paws I was so nervous having someone for Belle and Lola but they love their walks with Imge and Alper especially Belle cos she waits by door when they leave. It makes it easier for me when they return as they are nice and relaxed. I am so happy and lucky I found them and would highly recommend them if you need someone for your pets',
      rating: 5
    }
  ];

  const [isPaused, setIsPaused] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);

  const goToNext = () => {
    if (isAnimating) return;
    
    setIsAnimating(true);
    
    setTimeout(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % reviews.length);
      setTimeout(() => {
        setIsAnimating(false);
      }, 300);
    }, 150);
  };

  const goToPrevious = () => {
    if (isAnimating) return;
    
    setIsAnimating(true);
    
    setTimeout(() => {
      setCurrentIndex((prevIndex) => (prevIndex - 1 + reviews.length) % reviews.length);
      setTimeout(() => {
        setIsAnimating(false);
      }, 300);
    }, 150);
  };

  // Swipe functionality
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe) {
      goToNext();
    } else if (isRightSwipe) {
      goToPrevious();
    }
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <svg
        key={i}
        className={`w-4 h-4 ${i < rating ? 'text-yellow-400' : 'text-gray-300'}`}
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
      </svg>
    ));
  };

  const ReviewCard = ({ review }: { review: Review }) => (
    <div className="flex-shrink-0 w-[320px] md:w-[600px] sm:w-[360px] mx-4">
      <div className="bg-white rounded-xl shadow-lg p-6 md:p-8 h-full border border-gray-100 hover:shadow-xl transition-shadow duration-300">
        {/* Review Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
          <div className="flex items-center space-x-3 sm:space-x-4 mb-4 sm:mb-0">
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-[#5BA69E] to-[#143F3F] rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-lg sm:text-xl">
                {review.name.charAt(0)}
              </span>
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h4 className="text-lg sm:text-xl font-bold text-[#143F3F]">{review.name}</h4>
                {review.verified && (
                  <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full font-medium">
                    verified
                  </span>
                )}
              </div>
              <div className="flex items-center space-x-2 mt-1">
                <span className="text-xs sm:text-sm text-[#666666]">{review.date}</span>
                <span className="text-[#666666]">•</span>
                <span className="text-xs sm:text-sm text-[#5BA69E] font-medium">{review.service}</span>
              </div>
            </div>
          </div>
          
          {/* Star Rating */}
          <div className="flex items-center space-x-1 self-start sm:self-center">
            {renderStars(review.rating)}
          </div>
        </div>

        {/* Review Content */}
        <div className="mb-4 sm:mb-6">
          <p className="text-[#333333] text-base sm:text-lg leading-relaxed italic">
            "{review.review}"
          </p>
        </div>
      </div>
    </div>
  );

  return (
    <section className="py-16 relative z-10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h3 className="text-4xl font-bold mb-4 text-[#143F3F]">What Our Clients Say</h3>
          <p className="text-lg text-[#666666] max-w-2xl mx-auto">
            Real reviews from happy pet parents who trust us with their furry family members
          </p>
        </div>

        {/* Carousel Container */}
        <div className="relative overflow-hidden">
          {/* Desktop: Continuous Scrolling Container */}
          <div 
            className="hidden md:flex"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            {/* First set of cards */}
            <div className={`flex animate-scroll ${isPaused ? 'paused' : ''}`}>
              {reviews.map((review) => (
                <ReviewCard key={`first-${review.id}`} review={review} />
              ))}
            </div>
            
            {/* Second set of cards for seamless loop */}
            <div className={`flex animate-scroll ${isPaused ? 'paused' : ''}`}>
              {reviews.map((review) => (
                <ReviewCard key={`second-${review.id}`} review={review} />
              ))}
            </div>
          </div>
          
          {/* Mobile: Single Card with Arrows */}
          <div className="md:hidden">
            <div className="relative px-16">
              {/* Single Review Card with Swipe */}
              <div 
                className="mx-auto"
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
              >
                <ReviewCard review={reviews[currentIndex]} />
              </div>

              {/* Left Arrow - Positioned absolutely */}
              <button
                onClick={goToPrevious}
                disabled={isAnimating}
                className={`absolute left-2 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white backdrop-blur-sm rounded-full p-2 shadow-lg transition-all duration-300 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-[#5BA69E] z-10 ${
                  isAnimating ? 'opacity-50 cursor-not-allowed' : 'opacity-100'
                }`}
                aria-label="Previous review"
              >
                <svg className="w-4 h-4 text-[#143F3F]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>

              {/* Right Arrow - Positioned absolutely */}
              <button
                onClick={goToNext}
                disabled={isAnimating}
                className={`absolute right-2 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white backdrop-blur-sm rounded-full p-2 shadow-lg transition-all duration-300 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-[#5BA69E] z-10 ${
                  isAnimating ? 'opacity-50 cursor-not-allowed' : 'opacity-100'
                }`}
                aria-label="Next review"
              >
                <svg className="w-4 h-4 text-[#143F3F]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>

            {/* Dots Indicator for Mobile */}
            <div className="flex justify-center mt-6 space-x-2">
              {reviews.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  disabled={isAnimating}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentIndex
                      ? 'bg-[#5BA69E] scale-125'
                      : 'bg-gray-300 hover:bg-gray-400'
                  } ${isAnimating ? 'cursor-not-allowed' : ''}`}
                  aria-label={`Go to review ${index + 1}`}
                />
              ))}
            </div>
          </div>
          
          {/* Left gradient fade overlay - Desktop only */}
          <div className="hidden md:block absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-[#FEF2E4] to-transparent pointer-events-none z-10"></div>
          
          {/* Right gradient fade overlay - Desktop only */}
          <div className="hidden md:block absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-[#FEF2E4] to-transparent pointer-events-none z-10"></div>
        </div>

        {/* Bark.com Link */}
        <div className="text-center mt-8">
          <a
            href="https://www.bark.com/en/gb/b/frito-paws/6g3Y76/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center space-x-2 text-[#5BA69E] hover:text-[#143F3F] font-medium transition-colors duration-300"
          >
            <span>View all our reviews on Bark.com</span>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </a>
        </div>
      </div>

      {/* CSS for continuous scrolling animation */}
      <style jsx>{`
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-100%);
          }
        }
        
        .animate-scroll {
          animation: scroll 60s linear infinite;
        }
        
        .animate-scroll.paused {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  );
};

export default CommentsCarousel;