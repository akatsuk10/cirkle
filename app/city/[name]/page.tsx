"use client";

import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useEffect, useState, useRef, useCallback } from "react";
import {
  useAnchorWallet,
  useConnection,
  useWallet,
} from "@solana/wallet-adapter-react";
import { getIPFSGatewayUrl } from "@/lib/ipfs";
import { Loader2, ArrowLeft, TrendingUp, TrendingDown } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { getCity } from "@/lib/solana/oracle/getCity";
import { useOracleProgram } from "@/lib/solana/oracle/oracle";
import { buyToken } from "@/lib/solana/cerkle/buy";
import { sellToken } from "@/lib/solana/cerkle/sell";
import { useProgram } from "@/lib/solana/cerkle/cerkle";
import { getAssociatedTokenAddress } from "@solana/spl-token";
import { LAMPORTS_PER_SOL, PublicKey } from "@solana/web3.js";

export default function CityPage() {
  const { name: nameParam } = useParams();
  const router = useRouter();
  const { connection } = useConnection();
  const name = Array.isArray(nameParam)
    ? nameParam[0].replace(/-/g, " ")
    : nameParam?.replace(/-/g, " ");
  const [city, setCity] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { oracleProgram } = useOracleProgram();
  const { program } = useProgram();
  const { publicKey, sendTransaction } = useWallet();
  const hasFetched = useRef(false);
  const lastAttemptedCityRef = useRef<string | null>(null);
  const lastFetchedBalancesCityRef = useRef<string | null>(null);
  const [buyLoading, setBuyLoading] = useState(false);
  const [sellLoading, setSellLoading] = useState(false);
  const [solAmount, setSolAmount] = useState<string>("1");
  const [sellAmount, setSellAmount] = useState<string>("1");
  const [userTokenBalance, setUserTokenBalance] = useState<number>(0);
  const [userSolBalance, setUserSolBalance] = useState<number>(0);
  const [tokenImage, setTokenImage] = useState<string | null>(null);
  const [tokenImageLoading, setTokenImageLoading] = useState(false);

  useEffect(() => {
    const fetchCity = async () => {
      if (!oracleProgram || !name || hasFetched.current) return;

      setLoading(true);
      setError(null);
      try {
        const data = await getCity(oracleProgram, name);
        if (!data) {
          setError(
            `City "${name}" not found. Make sure it exists on the oracle.`
          );
          setCity(null);
        } else {
          setCity(data);
        }
        hasFetched.current = true;
      } catch (err) {
        console.error("Failed to load city:", err);
        setError(
          `Failed to load city: ${
            err instanceof Error ? err.message : String(err)
          }`
        );
        setCity(null);
      } finally {
        setLoading(false);
      }
    };

    fetchCity();
  }, [oracleProgram, name]);

  const getMintAndCityConfig = async () => {
    if (!publicKey || !program || !city) return;

    const [cityMintPda] = PublicKey.findProgramAddressSync(
      [Buffer.from("city-mint"), Buffer.from(city.cityName)],
      program.programId
    );

    const [cityConfigPda] = PublicKey.findProgramAddressSync(
      [Buffer.from("city-config"), Buffer.from(city.cityName)],
      program.programId
    );

    const userAta = await getAssociatedTokenAddress(cityMintPda, publicKey);

    return { mint: cityMintPda, cityConfigPda, userAta };
  };

  const fetchTokenBalance = useCallback(async () => {
    try {
      if (!publicKey || !program || !city || !connection) {
        setUserTokenBalance(0);
        return;
      }

      const [cityMintPda] = PublicKey.findProgramAddressSync(
        [Buffer.from("city-mint"), Buffer.from(city.cityName)],
        program.programId
      );

      const userAta = await getAssociatedTokenAddress(cityMintPda, publicKey);

      const tokenAccount = await connection.getTokenAccountBalance(userAta);
      const balance = tokenAccount.value.uiAmount || 0;
      setUserTokenBalance(balance);
    } catch (err) {
      setUserTokenBalance(0);
    }
  }, [publicKey, program, city, connection]);

  const fetchSolBalance = useCallback(async () => {
    try {
      if (!publicKey || !connection) {
        setUserSolBalance(0);
        return;
      }

      const balanceLamports = await connection.getBalance(publicKey);
      const balanceSol = balanceLamports / LAMPORTS_PER_SOL;
      setUserSolBalance(balanceSol);
    } catch (err) {
      setUserSolBalance(0);
    }
  }, [publicKey, connection]);

  const fetchTokenImage = useCallback(async () => {
    try {
      if (!program || !city) {
        setTokenImage(null);
        return;
      }

      setTokenImageLoading(true);

      const [cityConfigPda] = PublicKey.findProgramAddressSync(
        [Buffer.from("city-config"), Buffer.from(city.cityName)],
        program.programId
      );

      const cityConfig = await program.account.cityConfig.fetch(cityConfigPda);

      if (cityConfig && cityConfig.metadataUri) {
        const metadataUri = cityConfig.metadataUri;
        console.log("Fetching metadata from:", metadataUri);

        try {
          const metadataResponse = await fetch(metadataUri);
          if (metadataResponse.ok) {
            const metadata = await metadataResponse.json();
            if (metadata.image) {
              console.log("Got image from metadata:", metadata.image);
              const displayUrl = getIPFSGatewayUrl(metadata.image);
              setTokenImage(displayUrl);
              return;
            }
          }
        } catch (metadataError) {
          console.log("Failed to fetch metadata, using URI directly:", metadataError);
        }

        setTokenImage(metadataUri);
      }
    } catch (err) {
      console.log("Token image not yet available:", err);
      setTokenImage(null);
    } finally {
      setTokenImageLoading(false);
    }
  }, [program, city]);

  useEffect(() => {
    if (!city || !program) return;

    if (lastAttemptedCityRef.current !== city.cityName) {
      lastAttemptedCityRef.current = city.cityName;
      fetchTokenImage();
    }
  }, [city]);

  useEffect(() => {
    if (!publicKey || !connection || !program || !city) return;

    if (lastFetchedBalancesCityRef.current !== city.cityName) {
      lastFetchedBalancesCityRef.current = city.cityName;
      fetchSolBalance();
      fetchTokenBalance();
    }
  }, [publicKey, connection, program, city, fetchSolBalance, fetchTokenBalance]);

  const refreshBalances = useCallback(() => {
    fetchSolBalance();
    fetchTokenBalance();
  }, [fetchSolBalance, fetchTokenBalance]);

  const handleBuy = async () => {
    if (!city || !program || !publicKey || !solAmount || !sendTransaction)
      return;

    const amount = parseFloat(solAmount);

    if (isNaN(amount) || amount <= 0) {
      toast.error("Invalid amount", { description: "Please enter a valid SOL amount" });
      return;
    }

    const TX_FEE_BUFFER = 0.001;
    const availableBalance = userSolBalance - TX_FEE_BUFFER;

    if (amount > availableBalance) {
      toast.error("Insufficient balance", {
        description: `You have ${userSolBalance.toFixed(4)} SOL. Need ${TX_FEE_BUFFER} SOL for fees. Available: ${availableBalance.toFixed(4)} SOL`
      });
      return;
    }

    setBuyLoading(true);

    try {
      const solPriceUsd = 200;

      console.log("Starting buy transaction:", {
        cityName: city.cityName,
        solAmount: amount,
        lamports: amount * LAMPORTS_PER_SOL,
        circleRate: city.rate/100,
        solPriceUsd: solPriceUsd,
      });

      const tx = await buyToken(
        program,
        connection,
        sendTransaction,
        publicKey,
        city.cityName,
        amount * LAMPORTS_PER_SOL,
        city.rate/100,
        solPriceUsd
      );

      console.log("Buy success:", tx);
      setSolAmount("1");
      toast.success("Successfully bought tokens!", {
        description: `View on Explorer: https://explorer.solana.com/tx/${tx}?cluster=devnet`,
        duration: 5000,
      });

      setTimeout(() => refreshBalances(), 2000);
    } catch (err: any) {
      console.error("Buy failed:", err);
      let errorMessage = "Unknown error";
      if (err.message) {
        errorMessage = err.message;
      }
      if (err.logs) {
        console.log("Full error logs:", err.logs);
      }
      toast.error("Buy failed", { description: errorMessage });
    } finally {
      setBuyLoading(false);
    }
  };

  const handleSell = async () => {
    if (!city || !program || !publicKey || !sellAmount) return;

    const amount = parseFloat(sellAmount);

    if (isNaN(amount) || amount <= 0) {
      toast.error("Invalid amount", { description: "Please enter a valid token amount" });
      return;
    }

    if (amount > userTokenBalance) {
      toast.error("Insufficient token balance", {
        description: `You have ${userTokenBalance.toFixed(6)} tokens but trying to sell ${amount} tokens`
      });
      return;
    }

    setSellLoading(true);

    try {
      const solPriceUsd = 200;

      const result = await getMintAndCityConfig();
      if (!result) {
        toast.error("Configuration error", { description: "Unable to fetch city configuration" });
        setSellLoading(false);
        return;
      }

      const { mint, cityConfigPda, userAta } = result;

      const tx = await sellToken(
        program,
        publicKey,
        city.cityName,
        city.rate/100,
        amount,
        mint,
        userAta,
        cityConfigPda,
        solPriceUsd
      );

      console.log("Sell success:", tx);
      setSellAmount("1");

      if (tx === "Success") {
        toast.success("Successfully sold tokens!", {
          description: "Transaction was already processed on-chain.",
          duration: 5000,
        });
      } else {
        toast.success("Successfully sold tokens!", {
          description: `View on Explorer: https://explorer.solana.com/tx/${tx}?cluster=devnet`,
          duration: 5000,
        });
      }

      setTimeout(() => refreshBalances(), 2000);
    } catch (err) {
      console.error("Sell failed:", err);
      let errorMessage = "Unknown error";
      if (err instanceof Error) {
        errorMessage = err.message;
      }
      toast.error("Sell failed", { description: errorMessage });
    } finally {
      setSellLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <div className="flex flex-col items-center justify-center min-h-[calc(100vh-100px)]">
          <Loader2 className="w-8 h-8 animate-spin text-primary mb-4" />
          <p className="text-muted-foreground">Loading {name}...</p>
        </div>
      </div>
    );
  }

  if (error || !city) {
    return (
      <div className="min-h-screen bg-background">
        <div className="max-w-[1200px] mx-auto px-4 lg:px-6 py-12">
          <Button
            onClick={() => router.back()}
            variant="ghost"
            className="mb-8"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back
          </Button>

          <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-8 text-center">
            <h2 className="text-2xl font-semibold text-foreground mb-4">
              Unable to Load City
            </h2>
            <p className="text-muted-foreground mb-6">
              {error || `City "${name}" not found`}
            </p>
            <Button
              onClick={() => router.push("/cities")}
              className="bg-black dark:bg-white text-white dark:text-black hover:bg-black/80 dark:hover:bg-white/80 rounded-full"
            >
              Browse All Cities
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-[1200px] mx-auto px-4 lg:px-6 py-12">
        <Button
          onClick={() => router.back()}
          variant="ghost"
          className="mb-8"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back to Markets
        </Button>

        <div className="mb-8">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h1 className="text-4xl md:text-5xl font-semibold text-foreground mb-2">
                {city.cityName}
              </h1>
              <p className="text-lg text-muted-foreground">{city.country}</p>
            </div>
          </div>
        </div>

        {tokenImage && (
          <div className="mb-12 bg-card border border-border rounded-2xl overflow-hidden">
            <div className="relative h-80 w-full overflow-hidden">
              <img
                src={tokenImage}
                alt={`${city.cityName} Token`}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-6">
              <h2 className="text-2xl font-semibold text-foreground mb-2">
                {city.cityName} Token
              </h2>
              <p className="text-muted-foreground text-sm">
                City-based real estate tokenization
              </p>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          <div className="bg-card border border-border rounded-2xl p-6">
            <div className="flex items-center space-x-2 mb-2">
              <TrendingUp className="w-5 h-5 text-green-600" />
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                Market Rate
              </p>
            </div>
            <p className="text-3xl md:text-4xl font-bold text-foreground">
              ${(city.rate/100).toLocaleString()}
            </p>
            <p className="text-xs text-muted-foreground mt-2">per sq.ft</p>
          </div>

          <div className="bg-card border border-border rounded-2xl p-6">
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2">
              Total Population
            </p>
            <p className="text-3xl md:text-4xl font-bold text-foreground">
              {(city.area).toLocaleString()}
            </p>
            <p className="text-xs text-muted-foreground mt-2">square feet</p>
          </div>
        </div>

        <div className="bg-card border border-border rounded-2xl p-6 mb-12">
          <h2 className="text-lg font-semibold text-foreground mb-4">
            Market Details
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            <div>
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-1">
                Country
              </p>
              <p className="text-sm text-foreground">{city.country}</p>
            </div>
            <div>
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-1">
                Area
              </p>
              <p className="text-sm text-foreground">
                {(city.area).toLocaleString()}
              </p>
            </div>
            <div>
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-1">
                Last Updated
              </p>
              <p className="text-sm text-foreground">
                {new Date(city.timestamp * 1000).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                })}
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-card border border-border rounded-2xl p-6">
            <div className="flex items-center space-x-2 mb-4">
              <TrendingUp className="w-5 h-5 text-green-600" />
              <h3 className="text-lg font-semibold text-foreground">
                Buy Tokens
              </h3>
            </div>

            <div className="space-y-4">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="block text-sm font-semibold text-foreground">
                    SOL Amount
                  </label>
                  <div className="flex gap-2">
                    <Button
                      onClick={() => setSolAmount((userSolBalance / 2).toFixed(4))}
                      variant="ghost"
                      size="sm"
                      className="h-7 px-2 text-xs bg-green-500/10 text-green-600 hover:bg-green-500/20"
                    >
                      50%
                    </Button>
                    <Button
                      onClick={() => setSolAmount(userSolBalance.toFixed(4))}
                      variant="ghost"
                      size="sm"
                      className="h-7 px-2 text-xs bg-green-500/10 text-green-600 hover:bg-green-500/20"
                    >
                      Max
                    </Button>
                  </div>
                </div>
                <input
                  type="number"
                  min="0"
                  step="0.1"
                  value={solAmount}
                  onChange={(e) => setSolAmount(e.target.value)}
                  placeholder="1.0"
                  className="w-full px-4 py-2 border border-border bg-background text-foreground rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                />
                <div className="flex justify-between text-xs text-muted-foreground mt-1">
                  <span>Rate: ${(city.rate/100).toLocaleString()} per token</span>
                  <span>Balance: {userSolBalance.toFixed(4)} SOL</span>
                </div>
              </div>

              <Button
                onClick={handleBuy}
                disabled={buyLoading || sellLoading || !solAmount}
                className="w-full bg-black hover:bg-black/80 text-white dark:bg-white dark:hover:bg-white/80 dark:text-black"
              >
                {buyLoading && <Loader2 className="w-4 h-4 animate-spin mr-2" />}
                {buyLoading ? "Processing..." : "Buy Tokens"}
              </Button>
            </div>
          </div>

          <div className="bg-card border border-border rounded-2xl p-6">
            <div className="flex items-center space-x-2 mb-4">
              <TrendingDown className="w-5 h-5 text-red-600" />
              <h3 className="text-lg font-semibold text-foreground">
                Sell Tokens
              </h3>
            </div>

            <div className="space-y-4">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="block text-sm font-semibold text-foreground">
                    Token Amount
                  </label>
                  <div className="flex gap-2">
                    <Button
                      onClick={() => setSellAmount((userTokenBalance / 2).toFixed(6))}
                      variant="ghost"
                      size="sm"
                      className="h-7 px-2 text-xs bg-red-500/10 text-red-600 hover:bg-red-500/20"
                    >
                      50%
                    </Button>
                    <Button
                      onClick={() => setSellAmount(userTokenBalance.toFixed(6))}
                      variant="ghost"
                      size="sm"
                      className="h-7 px-2 text-xs bg-red-500/10 text-red-600 hover:bg-red-500/20"
                    >
                      Max
                    </Button>
                  </div>
                </div>
                <input
                  type="number"
                  min="0"
                  step="1"
                  value={sellAmount}
                  onChange={(e) => setSellAmount(e.target.value)}
                  placeholder="1"
                  className="w-full px-4 py-2 border border-border bg-background text-foreground rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                />
                <p className="text-xs text-muted-foreground mt-1">You own: {userTokenBalance.toFixed(6)} tokens</p>
              </div>

              <Button
                onClick={handleSell}
                disabled={sellLoading || buyLoading || !sellAmount}
                className="w-full bg-black hover:bg-black/80 text-white dark:bg-white dark:hover:bg-white/80 dark:text-black"
              >
                {sellLoading && <Loader2 className="w-4 h-4 animate-spin mr-2" />}
                {sellLoading ? "Processing..." : "Sell Tokens"}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
