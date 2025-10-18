import Image from "next/image";
import HeroSection from "./HeroSection";

export default function MainContent() {
  return (
    <div className="max-w-[1200px] mx-auto py-16 pt-28 border-l border-r relative">
      <div className="bg-white overflow-hidden border-y py-6 lg:px-6 relative">
        {/* Corner Plus with Dot Pattern */}
        <div className="absolute -top-3 -left-3 w-6 h-6 bg-white border flex items-center justify-center z-10">
          <div className="w-4 h-4 relative">

          </div>
        </div>
        
        {/* Additional corner decorations */}
        <div className="absolute -top-3 -right-3 w-6 h-6 bg-white border flex items-center justify-center z-10">

        </div>
        
        <div className="absolute -bottom-3 -left-3 w-6 h-6 bg-white border flex items-center justify-center z-10">

        </div>
        
        <div className="absolute -bottom-3 -right-3 w-6 h-6 bg-white border flex items-center justify-center z-10">

        </div>
        
        <div className="grid lg:grid-cols-2 gap-0">
          {/* Left Side - Hero Content */}
          <HeroSection />
          {/* Right Side - Booking Interface Mockup */}
          <div className="border h-full w-full rounded-xl overflow-hidden">
            <Image 
              src="/property.jpg"
              alt="Real estate property" 
              width={2070} 
              height={1380}
              className="w-full h-full object-cover"
            />
          </div>
          {/* <BookingInterface /> */}
        </div>
      </div>
    </div>
  );
}
