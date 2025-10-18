import { ChevronRight } from "lucide-react";

export default function PopularMarkets() {
  const markets = [
    {
      id: 1,
      city: "Austin, TX",
      transactionVolume: "$7.59M",
      marketType: "Balanced Market",
      price: "$265.47",
      unit: "Sqft",
      change: "-10.98%",
      changeType: "negative",
      image: "/api/placeholder/300/200" // Placeholder for Austin skyline
    },
    {
      id: 2,
      city: "Chicago, IL", 
      transactionVolume: "$2.04M",
      marketType: "Buyer's Market",
      price: "$265.92",
      unit: "Sqft",
      change: "-4.52%",
      changeType: "negative",
      image: "/api/placeholder/300/200" // Placeholder for Chicago skyline
    },
    {
      id: 3,
      city: "Brooklyn, NY",
      transactionVolume: "$1.76M", 
      marketType: "Balanced Market",
      price: "$652.90",
      unit: "Sqft",
      change: "-1.22%",
      changeType: "negative",
      image: "/api/placeholder/300/200" // Placeholder for Brooklyn bridge
    }
  ];

  return (
    <div className="max-w-[1200px] mx-auto py-16 border-l border-r relative">
      <div className="overflow-hidden bg-white border-y py-8 lg:px-3 relative">
        {/* Corner decorations */}
        <div className="absolute -top-3 -left-3 w-6 h-6 bg-white border flex items-center justify-center z-10"></div>
        <div className="absolute -top-3 -right-3 w-6 h-6 bg-white border flex items-center justify-center z-10"></div>
        <div className="absolute -bottom-3 -left-3 w-6 h-6 bg-white border flex items-center justify-center z-10"></div>
        <div className="absolute -bottom-3 -right-3 w-6 h-6 bg-white border flex items-center justify-center z-10"></div>

        <div className="px-4">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-semibold text-gray-900">Popular Markets Today</h2>
            <button className="flex items-center space-x-1 text-sm text-gray-600 hover:text-gray-900 transition-colors">
              <span>View All</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {/* Markets Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
            {markets.map((market) => (
              <div key={market.id} className="">
                {/* Market Image */}
                <div className={`h-52 relative overflow-hidden rounded-lg bg-accent`}>
                  <div className="absolute inset-0 bg-black/20"></div>
                  <div className="absolute top-4 left-4 text-white text-xs font-medium bg-black/20 px-2 py-1 rounded-full">
                    {market.city.split(',')[0]}
                  </div>
                </div>

                {/* Market Info */}
                <div className="py-4">
                  <div className="mb-3">
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">{market.city}</h3>
                    <div className="flex items-center justify-between text-xs text-gray-500 mb-1">
                      <span>Transaction Volume {market.transactionVolume}</span>
                    </div>
                    <div className="flex items-center">
                      <span className="text-xs text-gray-500">{market.marketType}</span>
                      <div className="ml-2 flex-1">
                        <div className="h-1 bg-gray-200 rounded-full overflow-hidden">
                          <div 
                            className={`h-full rounded-full ${
                              market.marketType === "Buyer's Market" 
                                ? "bg-teal-500" 
                                : "bg-gray-400"
                            }`}
                            style={{ width: market.marketType === "Buyer's Market" ? "75%" : "50%" }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Price and Change */}
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-lg font-semibold text-gray-900">{market.price}</span>
                      <span className="text-sm text-gray-500 ml-1">/ {market.unit}</span>
                    </div>
                    <div className={`text-sm font-medium ${
                      market.changeType === "negative" ? "text-red-500" : "text-green-500"
                    }`}>
                      {market.change}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
