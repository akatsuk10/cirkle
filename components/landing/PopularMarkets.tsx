import { ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

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
    <section className="w-full border-l border-r border-border">
      <div className="max-w-[1200px] mx-auto px-4 lg:px-6 py-12 md:py-16">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl md:text-3xl font-semibold text-foreground">Popular Markets Today</h2>
          <Button variant="ghost" size="sm" className="gap-1">
            View All
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {markets.map((market) => {
            const [cityName, state] = market.city.split(', ');
            const gradientClass = market.id === 1 
              ? "bg-gradient-to-br from-orange-400 to-pink-500"
              : market.id === 2
              ? "bg-gradient-to-br from-blue-400 to-cyan-500"
              : "bg-gradient-to-br from-purple-400 to-indigo-500";
            
            return (
              <Card key={market.id} className="w-full overflow-hidden border-0 shadow-none bg-card/50 dark:bg-transparent backdrop-blur">
                <div className="p-4">
                  <div className={`h-48 ${gradientClass} relative rounded-2xl overflow-hidden`}>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                    <div className="absolute bottom-4 left-4 text-white">
                      <h3 className="text-2xl font-bold">{cityName}</h3>
                      <p className="text-sm opacity-90">{state}</p>
                    </div>
                    <Button 
                      size="sm" 
                      className="absolute bottom-4 right-4 rounded-xl bg-white/20 backdrop-blur-md hover:bg-white/30 text-white border-0"
                    >
                      View
                    </Button>
                  </div>
                  
                  <div className="mt-4 space-y-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-xs text-muted-foreground">Price per sqft</p>
                        <p className="text-2xl font-bold text-foreground">{market.price}</p>
                      </div>
                      <Badge className={market.changeType === "negative" ? "bg-red-500/10 text-red-600 hover:bg-red-500/20 border-0" : "bg-green-500/10 text-green-600 hover:bg-green-500/20 border-0"}>
                        {market.change}
                      </Badge>
                    </div>
                    
                    <div className="grid grid-cols-3 gap-2 pt-2 border-t border-border/50">
                      <div>
                        <p className="text-xs text-muted-foreground">Volume</p>
                        <p className="text-sm font-semibold">{market.transactionVolume}</p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">Type</p>
                        <p className="text-sm font-semibold">{market.marketType.split(' ')[0]}</p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">Trend</p>
                        <p className="text-sm font-semibold">{market.changeType === "negative" ? "Down" : "Up"}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
