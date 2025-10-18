"use client";

import { useAnchorWallet } from "@solana/wallet-adapter-react";
import LandingPage from "@/components/LandingPage";
import HomePage from "@/components/HomePage";

export default function Home() {
  const wallet = useAnchorWallet();

  return (
    <div className="min-h-screen bg-gray-50">
      {wallet ? <HomePage /> : <LandingPage />}
    </div>
  );
}
