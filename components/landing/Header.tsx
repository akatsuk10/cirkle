"use client";

import { ChevronDown } from "lucide-react";
import { useEffect, useState } from "react";
import { useWalletModal } from "@solana/wallet-adapter-react-ui";
import { useWallet } from "@solana/wallet-adapter-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ThemeToggle } from "@/components/theme-toggle";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
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
    }
  };

  const handleDisconnect = async () => {
    await disconnect();
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 px-4 md:px-6 py-4 md:py-6 transition-all duration-300">
      <div
        className={`max-w-6xl mx-auto transition-all duration-300 ${
          isScrolled
            ? "bg-background/90 backdrop-blur-md border-border border rounded-2xl px-4 md:px-6 py-3"
            : "px-4 md:px-6 py-3 rounded-2xl"
        }`}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-8">
            <div className="text-2xl font-semibold tracking-tight text-foreground">
              Cirkle<span className="text-red-500">.</span>
            </div>
            <div className="hidden md:flex items-center space-x-6">
              {["Solutions", "Enterprise", "Developer", "Resources", "Pricing"].map((item) => (
                <div
                  key={item}
                  className="flex items-center space-x-1 text-muted-foreground hover:text-foreground cursor-pointer transition-colors"
                >
                  <span className="text-sm font-medium">{item}</span>
                  {["Solutions", "Developer", "Resources"].includes(item) && (
                    <ChevronDown className="w-4 h-4" />
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-2">
            <ThemeToggle />
            {!connected ? (
              <Button
                variant="default"
                size="default"
                onClick={handleConnectWallet}
                className="rounded-full"
              >
                Get Started
              </Button>
            ) : (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="default"
                    size="default"
                    className="rounded-full"
                  >
                    {`${publicKey?.toBase58().slice(0, 4)}...${publicKey
                      ?.toBase58()
                      .slice(-4)}`}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={handleDisconnect}>
                    Disconnect
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
