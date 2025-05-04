'use client';

import CircularImage from './components/CircularImage';

export default function ImageDemo() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-[#FEF2E4]">
      <h1 className="text-3xl font-bold mb-8 text-primary">Image Popup Demo</h1>
      
      <div className="flex flex-wrap justify-center gap-12">
        <div>
          <CircularImage 
            section="who-we-are"
            imageSrc="/one-dog-1.png"
            altText="Solo Walking"
            caption="Solo Walking"
            size={240}
          />
        </div>
        
        <div>
          <CircularImage 
            section="what-we-do"
            imageSrc="/two-dogs.png"
            altText="Group Walkings"
            caption="Group Walkings"
            size={240}
          />
        </div>
      </div>
      
      <div className="mt-12 text-center max-w-md">
        <p className="text-gray-700">
          Click on any image to see a popup with more information.
          The popup will close when you click outside of it.
        </p>
      </div>
    </div>
  );
} 