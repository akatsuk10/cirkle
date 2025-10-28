"use client";

import { useAnchorWallet } from "@solana/wallet-adapter-react";
import LandingPage from "@/components/LandingPage";

export default function Home() {
  return <div className="min-h-screen bg-gray-50">{<LandingPage />}</div>;
}
