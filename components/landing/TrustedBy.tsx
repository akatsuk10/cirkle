export default function TrustedBy() {
  return (
    <div className="max-w-[1200px] mx-auto py-6 border-l border-r relative">
      <div className="overflow-hidden bg-white border-y py-8 lg:px-6 relative">
        {/* Corner decorations matching MainContent */}
        <div className="absolute -top-3 -left-3 w-6 h-6 bg-white border flex items-center justify-center z-10">

        </div>
        
        <div className="absolute -top-3 -right-3 w-6 h-6 bg-white border flex items-center justify-center z-10">

        </div>
        
        <div className="absolute -bottom-3 -left-3 w-6 h-6 bg-white border flex items-center justify-center z-10">

        </div>
        
        <div className="absolute -bottom-3 -right-3 w-6 h-6 bg-white border flex items-center justify-center z-10">

        </div>

        <div className="max-w-2xl">
          <h2 className="text-3xl lg:text-3xl font-semibold text-gray-900 mb-4 leading-tight">
            Cirkle vs. San Francisco Property: Which 1-Year Investment Performs Better?
          </h2>
          <p className="text-sm text-gray-600 mb-8 leading-relaxed">
            In this example, we'll show how buying a deal on Cirkle outperforms a rental property investment in an extremely expensive market.
          </p>
          
          <button className="inline-flex text-sm items-center space-x-2 border px-3 cursor-pointer bg-white py-1 rounded-full transition-colors">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
            </svg>
            <span className="text-sm font-medium">How does this work?</span>
          </button>
        </div>
      </div>
    </div>
  );
}
