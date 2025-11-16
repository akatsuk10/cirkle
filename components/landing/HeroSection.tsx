import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function HeroSection() {
  return (
    <div className="space-y-6 md:space-y-8">
      <Badge variant="secondary" className="px-3 py-1 rounded-full text-xs md:text-sm">
        Over <span className="font-semibold italic mx-1">$4.6 Billion</span> in deals closed on Cirkle
      </Badge>
      
      <h1 className="text-3xl md:text-4xl lg:text-5xl font-semibold max-w-lg text-foreground leading-tight tracking-tight">
        Faster, simpler, smarter, real estate.
      </h1>
      
      <div className="space-y-2 md:space-y-3">
        <p className="text-sm md:text-base text-muted-foreground">
          <span className="font-semibold italic text-foreground">Start with $100</span>, not your entire life savings
        </p>
        <p className="text-sm md:text-base text-muted-foreground">
          <span className="font-semibold italic text-foreground">Not</span> fractional ownership
        </p>
        <p className="text-sm md:text-base text-muted-foreground">
          <span className="font-semibold italic text-foreground">Market exposure</span> to actual real estate prices
        </p>
        <p className="text-sm md:text-base text-muted-foreground">
          Buy and sell deals <span className="font-semibold italic text-foreground">in minutes</span>, not months
        </p>
      </div>

      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
        <Link href="/cities">
          <Button size="lg" className="rounded-full w-full sm:w-auto">
            View Available Deals
          </Button>
        </Link>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
          <span className="text-sm font-semibold text-foreground">20 Available Now!</span>
        </div>
      </div>
    </div>
  );
}
