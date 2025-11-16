import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";
import Marquee from "@/components/ui/marquee";

const properties = [
  {
    id: 1,
    city: "Austin",
    state: "TX",
    price: "$265.47",
    change: "+12.5%",
    image: "bg-gradient-to-br from-orange-400 to-pink-500",
  },
  {
    id: 2,
    city: "Chicago",
    state: "IL",
    price: "$265.92",
    change: "+8.3%",
    image: "bg-gradient-to-br from-blue-400 to-cyan-500",
  },
  {
    id: 3,
    city: "Brooklyn",
    state: "NY",
    price: "$652.90",
    change: "+15.7%",
    image: "bg-gradient-to-br from-purple-400 to-indigo-500",
  },
  {
    id: 4,
    city: "Miami",
    state: "FL",
    price: "$425.30",
    change: "+10.2%",
    image: "bg-gradient-to-br from-teal-400 to-emerald-500",
  },
  {
    id: 5,
    city: "Seattle",
    state: "WA",
    price: "$380.15",
    change: "+9.8%",
    image: "bg-gradient-to-br from-green-400 to-lime-500",
  },
  {
    id: 6,
    city: "Denver",
    state: "CO",
    price: "$310.45",
    change: "+11.4%",
    image: "bg-gradient-to-br from-yellow-400 to-orange-500",
  },
];

export default function MainContent() {
  return (
    <section className="w-full border-l border-r border-border overflow-hidden">
      <div className="max-w-[1200px] mx-auto px-4 lg:px-6 py-16 md:py-10 pt-24 md:pt-32">
        <div className="flex flex-col items-center text-center space-y-4 max-w-4xl mx-auto mb-12">
          <Badge variant="outline" className="px-3 py-1 rounded-full text-xs md:text-sm">
            Tokenizing <span className="font-semibold italic mx-1">Real World Assets</span> on Solana
          </Badge>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold text-foreground leading-none tracking-tight mt-3">
            Invest in Real Estate with Blockchain Technology
          </h1>
          
          <p className="text-lg text-muted-foreground max-w-2xl">
            Buy and sell fractional ownership in premium real estate markets. Start with as little as $100 and trade in minutes, not months.
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-4 pt-4">
            <Link href="/cities">
              <Button size="lg" className="rounded-full px-8">
                Explore Markets
              </Button>
            </Link>
            <Link href="/about">
              <Button size="lg" variant="outline" className="rounded-full px-8">
                Learn More
              </Button>
            </Link>
          </div>
        </div>

        {/* Marquee Section */}
        <div className="relative w-full">
          <Marquee pauseOnHover className="[--duration:30s]">
            {properties.map((property) => (
              <Card key={property.id} className="w-[320px] shrink-0 overflow-hidden border-0 shadow-none bg-card/50 dark:bg-transparent backdrop-blur">
                <div className="p-4">
                  <div className={`h-48 ${property.image} relative rounded-2xl overflow-hidden`}>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                    <div className="absolute bottom-4 left-4 text-white">
                      <h3 className="text-2xl font-bold">{property.city}</h3>
                      <p className="text-sm opacity-90">{property.state}</p>
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
                        <p className="text-2xl font-bold text-foreground">{property.price}</p>
                      </div>
                      <Badge className="bg-green-500/10 text-green-600 hover:bg-green-500/20 border-0">
                        {property.change}
                      </Badge>
                    </div>
                    
                    <div className="grid grid-cols-3 gap-2 pt-2 border-t border-border/50">
                      <div>
                        <p className="text-xs text-muted-foreground">Investors</p>
                        <p className="text-sm font-semibold">1.2k</p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">Yield</p>
                        <p className="text-sm font-semibold">8.5%</p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">Min</p>
                        <p className="text-sm font-semibold">$100</p>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </Marquee>
          
          {/* Fade shadows */}
          <div className="pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r from-background to-transparent dark:from-background" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-1/4 bg-gradient-to-l from-background to-transparent dark:from-background" />
        </div>
      </div>
    </section>
  );
}
