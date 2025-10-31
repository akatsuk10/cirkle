import Image from "next/image";
import HeroSection from "./HeroSection";

export default function MainContent() {
  return (
    <div className="max-w-[1200px] mx-auto py-16 md:py-16 pt-20 md:pt-28 border-l border-r relative">
      <div className="overflow-hidde py-4 md:py-6 px-4 lg:px-6 relative">
        
        <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
          {/* Hero Content */}
          <div className="flex-1 order-2 lg:order-1">
            <HeroSection />
          </div>
          {/* Hero Image - After buttons on mobile, side by side on desktop */}
          <div className="flex-1 order-1 lg:order-2">
            <div className="border h-64 md:h-80 lg:h-full w-full rounded-xl overflow-hidden">
              {/* <Image 
                src="/property.jpg"
                alt="Real estate property" 
                width={2070} 
                height={1380}
                className="w-full h-full object-cover"
              /> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
