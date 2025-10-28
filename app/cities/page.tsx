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
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        {/* Hero Section */}
        <div className="mb-12 md:mb-16">
          <div className="mb-4 md:mb-6 px-3 border border-gray-300 py-1 w-fit rounded-full bg-white">
            <p className="text-xs md:text-sm text-gray-700 tracking-tight">
              Explore{" "}
              <span className="font-semibold text-black italic">
                real estate markets
              </span>{" "}
              worldwide
            </p>
          </div>

          <h1 className="text-3xl md:text-4xl lg:text-5xl font-semibold text-gray-900 mb-4 md:mb-6 leading-tight tracking-tight w-full lg:w-2/3">
            Available Markets & Deals
          </h1>

          <p className="text-lg text-gray-600 mb-8 w-full lg:w-2/3">
            Browse real estate markets across cities worldwide. Get market
            exposure and track prices in real-time.
          </p>
        </div>

        {/* Loading State */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-16 md:py-24">
            <Loader2 className="w-8 h-8 animate-spin text-[#065F46] mb-4" />
            <p className="text-gray-600">Loading available markets...</p>
          </div>
        ) : error ? (
          <div className="bg-red-50 border border-red-200 rounded-lg p-6 md:p-8 text-center">
            <h3 className="text-lg font-semibold text-red-900 mb-2">
              No Markets Available
            </h3>
            <p className="text-red-700 mb-4">{error}</p>
            <button
              onClick={() => router.push("/")}
              className="inline-flex items-center space-x-2 bg-[#065F46] text-white px-4 py-2 rounded-full hover:bg-[#065F46]/80 transition-colors"
            >
              <span>Back to Home</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        ) : cities.length === 0 ? (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 md:p-8 text-center">
            <h3 className="text-lg font-semibold text-blue-900 mb-2">
              Coming Soon
            </h3>
            <p className="text-blue-700">
              Markets are being added. Check back soon!
            </p>
          </div>
        ) : (
          <>
            {/* Stats */}
            <div className="mb-8 md:mb-12">
              <p className="text-sm font-semibold text-gray-600 uppercase tracking-wide">
                {cities.length} {cities.length === 1 ? "Market" : "Markets"}{" "}
                Available
              </p>
            </div>

            {/* Cities Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {cities.map((city) => (
                <button
                  key={city.cityName}
                  onClick={() => handleClick(city.cityName)}
                  className="group bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg hover:border-gray-300 transition-all duration-300 text-left"
                >
                  {/* Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-xl md:text-2xl font-semibold text-gray-900 group-hover:text-[#065F46] transition-colors">
                        {city.cityName}
                      </h3>
                      <p className="text-sm text-gray-600 mt-1">
                        {city.country}
                      </p>
                    </div>
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                      <ArrowRight className="w-5 h-5 text-[#065F46]" />
                    </div>
                  </div>

                  {/* Details */}
                  <div className="space-y-3 border-t border-gray-200 pt-4">
                    {/* Price */}
                    <div>
                      <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">
                        Market Rate
                      </p>
                      <p className="text-2xl font-bold text-[#065F46]">
                        ${city.rate.toLocaleString()}
                      </p>
                    </div>

                    {/* Area */}
                    <div>
                      <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">
                        Area
                      </p>
                      <p className="text-sm text-gray-700">
                        {(city.area / 1_000_000).toFixed(2)} M sq.ft
                      </p>
                    </div>

                    {/* Last Updated */}
                    <div>
                      <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">
                        Last Updated
                      </p>
                      <p className="text-xs text-gray-600">
                        {new Date(city.timestamp * 1000).toLocaleDateString(
                          "en-US",
                          {
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                          }
                        )}
                      </p>
                    </div>
                  </div>

                  {/* CTA */}
                  <div className="mt-4 pt-4 border-t border-gray-200">
                    <span className="inline-flex items-center space-x-1 text-sm font-semibold text-[#065F46] group-hover:translate-x-1 transition-transform">
                      <span>View Details</span>
                      <ArrowRight className="w-4 h-4" />
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
