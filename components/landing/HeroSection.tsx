import Link from "next/link";

export default function HeroSection() {
  return (
    <div className="">
      <div className="mb-4 md:mb-6 px-3 border py-1 w-fit rounded-full bg-[#F9FAFB]">
        <p className="text-xs md:text-sm text-gray-700 tracking-tight">Over <span className="font-semibold text-black italic">$4.6 Billion</span> in deals closed on Cirkle</p>
      </div>
      
      <h1 className="text-2xl md:text-3xl lg:text-[45px] font-semibold w-full lg:w-[500px] text-gray-900 mb-6 md:mb-8 leading-tight tracking-tight">
        Faster, simpler, smarter, real estate.
      </h1>
      
      {/* Feature List */}
      <div className="space-y-3 md:space-y-2 mb-8 md:mb-12">
        <div className="flex items-start space-x-4">
          <div>
            <p className="text-sm text-gray-700">
              <span className="font-semibold italic text-gray-900">Start with $100</span>, not your entire life savings
            </p>
          </div>
        </div>

        <div className="flex items-start space-x-4">
          <div>
            <p className="text-sm text-gray-700">
              <span className="font-semibold italic text-gray-900">Not</span> fractional ownership
            </p>
          </div>
        </div>

        <div className="flex items-start space-x-4">
          <div>
            <p className="text-sm text-gray-700">
              <span className="font-semibold italic text-gray-900">Market exposure</span> to actual real estate prices
            </p>
          </div>
        </div>

        <div className="flex items-start space-x-4">
          <div>
            <p className="text-sm text-gray-700">
              Buy and sell deals <span className="font-semibold italic text-gray-900">in minutes</span>, not months
            </p>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-4 sm:space-y-0 sm:space-x-4">
        <Link href="/cities">
        <button className="bg-black cursor-pointer text-sm hover:bg-black/80 text-white font-semibold py-3 px-6 rounded-full transition-colors w-full sm:w-auto">
          View Available Deals
        </button>
        </Link>
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-green-500 rounded-full"></div>
          <span className="text-sm font-semibold text-gray-900">20 Available Now!</span>
        </div>
      </div>
    </div>
  );
}
