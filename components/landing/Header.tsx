"use client";

import { ChevronDown } from "lucide-react";
import { useEffect, useState } from "react";
import { useWalletModal } from "@solana/wallet-adapter-react-ui";
import { useWallet } from "@solana/wallet-adapter-react";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { setVisible } = useWalletModal();
  const { connected, publicKey, disconnect } = useWallet();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleConnectWallet = () => {
    if (!connected) {
      setVisible(true);
    } else {
      setMenuOpen((prev) => !prev);
    }
  };

  const handleDisconnect = async () => {
    await disconnect();
    setMenuOpen(false);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 px-6 py-6 transition-all duration-300">
      <div
        className={`max-w-6xl mx-auto transition-all duration-300 ${
          isScrolled
            ? "bg-white/90 backdrop-blur-md border rounded-2xl px-6 py-3"
            : "px-6 py-3 rounded-2xl"
        }`}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-8">
            <div className="text-2xl font-semibold tracking-tight text-gray-900">
              Cirkle
            </div>
            <div className="hidden md:flex items-center space-x-6">
              {["Solutions", "Enterprise", "Developer", "Resources", "Pricing"].map((item) => (
                <div
                  key={item}
                  className="flex items-center space-x-1 text-gray-600 hover:text-gray-900 cursor-pointer transition-colors"
                >
                  <span className="text-sm font-medium">{item}</span>
                  {["Solutions", "Developer", "Resources"].includes(item) && (
                    <ChevronDown className="w-4 h-4" />
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="relative">
            <button
              onClick={handleConnectWallet}
              className="bg-[#065F46] text-white cursor-pointer text-sm font-medium px-4 py-2 rounded-full hover:bg-[#065F46]/80 transition-colors"
            >
              {connected
                ? `${publicKey?.toBase58().slice(0, 4)}...${publicKey
                    ?.toBase58()
                    .slice(-4)}`
                : "Get Started"}
            </button>

            {connected && menuOpen && (
              <div className="absolute right-0 mt-2 bg-white shadow-lg rounded-xl border py-2 w-44">
                <button
                  onClick={handleDisconnect}
                  className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  Disconnect
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
