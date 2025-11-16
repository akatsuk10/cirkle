"use client";

import { motion } from "framer-motion";
import { Globe } from "lucide-react";
import WorldMap from "@/components/ui/world-map";
import { useTheme } from "next-themes";

export default function TrustedBy() {
  const { theme } = useTheme();
  const stats = [
    { number: "150+", label: "Countries" },
    { number: "50K+", label: "Investors" },
    { number: "$4.6B", label: "Total Volume" },
  ];

  // Define connection points between major cities
  const dots = [
    {
      start: { lat: 40.7128, lng: -74.006 }, // New York
      end: { lat: 51.5074, lng: -0.1278 }, // London
    },
    {
      start: { lat: 51.5074, lng: -0.1278 }, // London
      end: { lat: 35.6762, lng: 139.6503 }, // Tokyo
    },
    {
      start: { lat: 35.6762, lng: 139.6503 }, // Tokyo
      end: { lat: -33.8688, lng: 151.2093 }, // Sydney
    },
    {
      start: { lat: -33.8688, lng: 151.2093 }, // Sydney
      end: { lat: 1.3521, lng: 103.8198 }, // Singapore
    },
    {
      start: { lat: 1.3521, lng: 103.8198 }, // Singapore
      end: { lat: 25.2048, lng: 55.2708 }, // Dubai
    },
    {
      start: { lat: 25.2048, lng: 55.2708 }, // Dubai
      end: { lat: 40.7128, lng: -74.006 }, // New York
    },
  ];

  return (
    <section className="w-full border-l border-r border-border relative overflow-hidden">
      <div className="max-w-[1200px] mx-auto px-4 lg:px-6 py-16 md:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.5fr] gap-12 items-center">
          {/* Left Side - Text Content */}
          <div className="space-y-8">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <div className="inline-flex items-center gap-2 mb-4">
                <Globe className="w-5 h-5 text-primary" />
                <span className="text-sm font-medium text-muted-foreground">
                  Global Reach
                </span>
              </div>

              <h2 className="text-2xl md:text-3xl lg:text-4xl font-semibold text-foreground mb-3 leading-tight">
                Investors from Around the World
              </h2>

              <p className="text-base text-muted-foreground leading-relaxed">
                Join thousands of investors across 150+ countries who are
                building wealth through tokenized real estate on Solana
              </p>
            </motion.div>

            {/* Stats Grid */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              className="grid grid-cols-3 gap-6"
            >
              {stats.map((stat) => (
                <div key={stat.label} className="text-left">
                  <div className="text-2xl md:text-3xl font-bold text-foreground mb-1 leading-none">
                    {stat.number}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {stat.label}
                  </div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right Side - World Map */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="relative"
          >
            <WorldMap dots={dots} lineColor={theme === "dark" ? "#FFFFFF" : "#000000"} />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
