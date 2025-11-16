"use client";

import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { Loader2, ArrowRight } from "lucide-react";
import { getCityList } from "@/lib/solana/oracle/getCityList";
import { useOracleProgram } from "@/lib/solana/oracle/oracle";
import Header from "@/components/landing/Header";
import { useAnchorWallet } from "@solana/wallet-adapter-react";

interface CityInfo {
  cityName: string;
  rate: number;
  timestamp: number;
  country: string;
  area: number;
}

export default function CitiesPage() {
  const [cities, setCities] = useState<CityInfo[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { oracleProgram } = useOracleProgram();
  const wallet = useAnchorWallet();
  const router = useRouter();
  const hasFetched = useRef(false);

  useEffect(() => {
    const fetchData = async () => {
      if (!oracleProgram || hasFetched.current) return;

      setLoading(true);
      setError(null);
      try {
        const data = await getCityList(oracleProgram);
        if (data && data.length > 0) {
          setCities(data);
        } else {
          setError(
            "No cities available. Please add cities from the admin panel."
          );
        }
        hasFetched.current = true;
      } catch (err) {
        console.error("Failed to load city list:", err);
        setError("Failed to load cities. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [oracleProgram]);

  const handleClick = (cityName: string) => {
    const slug = cityName.replace(/\s+/g, "-");
    router.push(`/city/${slug}`);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="max-w-[1200px] mx-auto px-4 lg:px-6 py-12 md:py-16 pt-24 md:pt-32">
        {/* Hero Section */}
        <div className="mb-12 md:mb-16">
          <div className="mb-4 md:mb-6 px-3 border border-border py-1 w-fit rounded-full bg-card">
            <p className="text-xs md:text-sm text-muted-foreground tracking-tight">
              Explore{" "}
              <span className="font-semibold text-foreground italic">
                real estate markets
              </span>{" "}
              worldwide
            </p>
          </div>

          <h1 className="text-3xl md:text-4xl lg:text-5xl font-semibold text-foreground mb-4 md:mb-6 leading-tight tracking-tight w-full lg:w-2/3">
            Available Markets & Deals
          </h1>

          <p className="text-lg text-muted-foreground mb-8 w-full lg:w-2/3">
            Browse real estate markets across cities worldwide. Get market
            exposure and track prices in real-time.
          </p>
        </div>

        {/* Loading State */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-16 md:py-24">
            <Loader2 className="w-8 h-8 animate-spin text-primary mb-4" />
            <p className="text-muted-foreground">Loading available markets...</p>
          </div>
        ) : error ? (
          <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-6 md:p-8 text-center">
            <h3 className="text-lg font-semibold text-foreground mb-2">
              No Markets Available
            </h3>
            <p className="text-muted-foreground mb-4">{error}</p>
            <button
              onClick={() => router.push("/")}
              className="inline-flex items-center space-x-2 bg-black dark:bg-white text-white dark:text-black px-6 py-2 rounded-full hover:bg-black/80 dark:hover:bg-white/80 transition-colors"
            >
              <span>Back to Home</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        ) : cities.length === 0 ? (
          <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-6 md:p-8 text-center">
            <h3 className="text-lg font-semibold text-foreground mb-2">
              Coming Soon
            </h3>
            <p className="text-muted-foreground">
              Markets are being added. Check back soon!
            </p>
          </div>
        ) : (
          <>
            {/* Stats */}
            <div className="mb-8 md:mb-12">
              <p className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
                {cities.length} {cities.length === 1 ? "Market" : "Markets"}{" "}
                Available
              </p>
            </div>

            {/* Cities Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {cities.map((city, index) => {
                const gradientClass = index % 6 === 0 
                  ? "bg-gradient-to-br from-orange-400 to-pink-500"
                  : index % 6 === 1
                  ? "bg-gradient-to-br from-blue-400 to-cyan-500"
                  : index % 6 === 2
                  ? "bg-gradient-to-br from-purple-400 to-indigo-500"
                  : index % 6 === 3
                  ? "bg-gradient-to-br from-teal-400 to-emerald-500"
                  : index % 6 === 4
                  ? "bg-gradient-to-br from-green-400 to-lime-500"
                  : "bg-gradient-to-br from-yellow-400 to-orange-500";
                
                return (
                  <button
                    key={city.cityName}
                    onClick={() => handleClick(city.cityName)}
                    className="group w-full overflow-hidden border-0 shadow-none bg-card/50 dark:bg-transparent backdrop-blur rounded-xl text-left transition-all duration-300 hover:scale-[1.02]"
                  >
                    <div className="p-4">
                      <div className={`h-48 ${gradientClass} relative rounded-2xl overflow-hidden mb-4`}>
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                        <div className="absolute bottom-4 left-4 text-white">
                          <h3 className="text-2xl font-bold">{city.cityName}</h3>
                          <p className="text-sm opacity-90">{city.country}</p>
                        </div>
                        <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                          <div className="rounded-xl bg-white/20 backdrop-blur-md p-2">
                            <ArrowRight className="w-5 h-5 text-white" />
                          </div>
                        </div>
                      </div>
                      
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-xs text-muted-foreground">Market Rate</p>
                            <p className="text-2xl font-bold text-foreground">
                              ${(city.rate / 100).toLocaleString()}
                            </p>
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-2 pt-2 border-t border-border/50">
                          <div>
                            <p className="text-xs text-muted-foreground">Population</p>
                            <p className="text-sm font-semibold">{city.area.toLocaleString()}</p>
                          </div>
                          <div>
                            <p className="text-xs text-muted-foreground">Updated</p>
                            <p className="text-sm font-semibold">
                              {new Date(city.timestamp * 1000).toLocaleDateString("en-US", {
                                month: "short",
                                day: "numeric",
                              })}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
