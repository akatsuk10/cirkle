"use client";

import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useEffect, useState, useRef } from "react";
import {
  useAnchorWallet,
  useConnection,
  useWallet,
} from "@solana/wallet-adapter-react";
import { Loader2, ArrowLeft, TrendingUp, TrendingDown } from "lucide-react";
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
  const [transactionError, setTransactionError] = useState<string | null>(null);
  const { oracleProgram } = useOracleProgram();
  const { program } = useProgram();
  const { publicKey, sendTransaction } = useWallet();
  const hasFetched = useRef(false);
  const [txLoading, setTxLoading] = useState(false);
  const [solAmount, setSolAmount] = useState<string>("1");
  const [sellAmount, setSellAmount] = useState<string>("1");
  const [userTokenBalance, setUserTokenBalance] = useState<number>(0);

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

    // Derive mint PDA from city name
    const [cityMintPda] = PublicKey.findProgramAddressSync(
      [Buffer.from("city-mint"), Buffer.from(city.cityName)],
      program.programId
    );

    // Derive city config PDA
    const [cityConfigPda] = PublicKey.findProgramAddressSync(
      [Buffer.from("city-config"), Buffer.from(city.cityName)],
      program.programId
    );

    // Get user's ATA for this mint
    const userAta = await getAssociatedTokenAddress(cityMintPda, publicKey);

    return { mint: cityMintPda, cityConfigPda, userAta };
  };

  const fetchTokenBalance = async () => {
    try {
      if (!publicKey || !program || !city || !connection) {
        setUserTokenBalance(0);
        return;
      }

      // Derive mint PDA from city name
      const [cityMintPda] = PublicKey.findProgramAddressSync(
        [Buffer.from("city-mint"), Buffer.from(city.cityName)],
        program.programId
      );

      // Get user's ATA for this mint
      const userAta = await getAssociatedTokenAddress(cityMintPda, publicKey);

      // Fetch token balance
      const tokenAccount = await connection.getTokenAccountBalance(userAta);
      const balance = tokenAccount.value.uiAmount || 0;
      setUserTokenBalance(balance);
    } catch (err) {
      // Account might not exist yet if no tokens purchased
      setUserTokenBalance(0);
    }
  };

  useEffect(() => {
    if (city && publicKey && program) {
      fetchTokenBalance();
      const interval = setInterval(fetchTokenBalance, 5000);
      return () => clearInterval(interval);
    }
  }, [city, publicKey, program, connection]);

  const handleBuy = async () => {
    if (!city || !program || !publicKey || !solAmount || !sendTransaction)
      return;
    setTxLoading(true);
    setTransactionError(null);

    try {
      const solPriceUsd = 200;
      const amount = parseFloat(solAmount);

      if (isNaN(amount) || amount <= 0) {
        setTransactionError("Please enter a valid SOL amount");
        return;
      }

      console.log("🚀 Starting buy transaction:", {
        cityName: city.cityName,
        solAmount: amount,
        lamports: amount * LAMPORTS_PER_SOL,
        circleRate: city.rate,
        solPriceUsd: solPriceUsd,
      });

      const tx = await buyToken(
        program,
        connection,
        sendTransaction,
        publicKey,
        city.cityName,
        amount * LAMPORTS_PER_SOL,
        city.rate,
        solPriceUsd
      );

      console.log("✅ Buy success:", tx);
      setTransactionError(null);
      setSolAmount("1");
      alert(
        `Successfully bought tokens!\n\nTransaction: ${tx}\n\nView on Explorer: https://explorer.solana.com/tx/${tx}?cluster=devnet`
      );

      setTimeout(() => window.location.reload(), 2000);
    } catch (err: any) {
      console.error("❌ Buy failed:", err);
      let errorMessage = "Unknown error";
      if (err.message) {
        errorMessage = err.message;
      }
      if (err.logs) {
        console.log("📋 Full error logs:", err.logs);
      }
      setTransactionError(errorMessage);
    } finally {
      setTxLoading(false);
    }
  };

  const handleSell = async () => {
    if (!city || !program || !publicKey || !sellAmount) return;
    setTxLoading(true);
    setTransactionError(null);
    try {
      const solPriceUsd = 200;
      const amount = parseFloat(sellAmount);

      if (isNaN(amount) || amount <= 0) {
        setTransactionError("Please enter a valid token amount");
        return;
      }

      const result = await getMintAndCityConfig();
      if (!result) {
        setTransactionError("Unable to fetch city configuration");
        return;
      }

      const { mint, cityConfigPda, userAta } = result;

      const tx = await sellToken(
        program,
        publicKey,
        city.cityName,
        city.rate,
        amount,
        mint,
        userAta,
        cityConfigPda,
        solPriceUsd
      );

      console.log("✅ Sell success:", tx);
      setTransactionError(null);
      setSellAmount("1");
      alert(
        `Successfully sold tokens!\n\nTransaction: ${tx}\n\nView on Explorer: https://explorer.solana.com/tx/${tx}?cluster=devnet`
      );

      setTimeout(() => window.location.reload(), 2000);
    } catch (err) {
      console.error("❌ Sell failed:", err);
      let errorMessage = "Unknown error";
      if (err instanceof Error) {
        errorMessage = err.message;
      }
      setTransactionError(errorMessage);
    } finally {
      setTxLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="flex flex-col items-center justify-center min-h-[calc(100vh-100px)]">
          <Loader2 className="w-8 h-8 animate-spin text-[#065F46] mb-4" />
          <p className="text-gray-600">Loading {name}...</p>
        </div>
      </div>
    );
  }

  if (error || !city) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <button
            onClick={() => router.back()}
            className="inline-flex items-center space-x-2 text-[#065F46] hover:opacity-70 transition mb-8"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back</span>
          </button>

          <div className="bg-red-50 border border-red-200 rounded-lg p-8 text-center">
            <h2 className="text-2xl font-semibold text-red-900 mb-4">
              Unable to Load City
            </h2>
            <p className="text-red-700 mb-6">
              {error || `City "${name}" not found`}
            </p>
            <button
              onClick={() => router.push("/cities")}
              className="inline-flex items-center space-x-2 bg-[#065F46] text-white px-6 py-2 rounded-full hover:bg-[#065F46]/80 transition"
            >
              <span>Browse All Cities</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Back Button */}
        <button
          onClick={() => router.back()}
          className="inline-flex items-center space-x-2 text-[#065F46] hover:opacity-70 transition mb-8"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Back to Markets</span>
        </button>

        {/* Header Section */}
        <div className="mb-8">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h1 className="text-4xl md:text-5xl font-semibold text-gray-900 mb-2">
                {city.cityName}
              </h1>
              <p className="text-lg text-gray-600">{city.country}</p>
            </div>
          </div>
        </div>

        {/* Info Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {/* Market Rate Card */}
          <div className="bg-white border border-gray-200 rounded-xl p-6">
            <div className="flex items-center space-x-2 mb-2">
              <TrendingUp className="w-5 h-5 text-[#065F46]" />
              <p className="text-xs font-semibold text-gray-600 uppercase tracking-wide">
                Market Rate
              </p>
            </div>
            <p className="text-3xl md:text-4xl font-bold text-[#065F46]">
              ${city.rate.toLocaleString()}
            </p>
            <p className="text-xs text-gray-500 mt-2">per sq.ft</p>
          </div>

          {/* Area Card */}
          <div className="bg-white border border-gray-200 rounded-xl p-6">
            <p className="text-xs font-semibold text-gray-600 uppercase tracking-wide mb-2">
              Total Area
            </p>
            <p className="text-3xl md:text-4xl font-bold text-gray-900">
              {(city.area / 1_000_000).toFixed(2)}M
            </p>
            <p className="text-xs text-gray-500 mt-2">square feet</p>
          </div>
        </div>

        {/* Market Details */}
        <div className="bg-white border border-gray-200 rounded-xl p-6 mb-12">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Market Details
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            <div>
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">
                Country
              </p>
              <p className="text-sm text-gray-900">{city.country}</p>
            </div>
            <div>
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">
                Area
              </p>
              <p className="text-sm text-gray-900">
                {(city.area / 1_000_000).toFixed(2)}M sq.ft
              </p>
            </div>
            <div>
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">
                Last Updated
              </p>
              <p className="text-sm text-gray-900">
                {new Date(city.timestamp * 1000).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                })}
              </p>
            </div>
          </div>
        </div>

        {/* Trading Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Buy Section */}
          <div className="bg-white border border-gray-200 rounded-xl p-6">
            <div className="flex items-center space-x-2 mb-4">
              <TrendingUp className="w-5 h-5 text-green-600" />
              <h3 className="text-lg font-semibold text-gray-900">
                Buy Tokens
              </h3>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  SOL Amount
                </label>
                <input
                  type="number"
                  min="0"
                  step="0.1"
                  value={solAmount}
                  onChange={(e) => setSolAmount(e.target.value)}
                  placeholder="1.0"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Rate: ${city.rate.toLocaleString()} per token
                </p>
              </div>

              <button
                onClick={handleBuy}
                disabled={txLoading || !solAmount}
                className="w-full bg-green-600 hover:bg-green-700 disabled:bg-gray-300 text-white font-semibold py-2 px-4 rounded-lg transition flex items-center justify-center space-x-2"
              >
                {txLoading && <Loader2 className="w-4 h-4 animate-spin" />}
                <span>{txLoading ? "Processing..." : "Buy Tokens"}</span>
              </button>

              {transactionError && (
                <div className="bg-red-50 border border-red-200 text-red-700 text-xs p-3 rounded">
                  {transactionError}
                </div>
              )}
            </div>
          </div>

          {/* Sell Section */}
          <div className="bg-white border border-gray-200 rounded-xl p-6">
            <div className="flex items-center space-x-2 mb-4">
              <TrendingDown className="w-5 h-5 text-red-600" />
              <h3 className="text-lg font-semibold text-gray-900">
                Sell Tokens
              </h3>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Token Amount
                </label>
                <input
                  type="number"
                  min="0"
                  step="1"
                  value={sellAmount}
                  onChange={(e) => setSellAmount(e.target.value)}
                  placeholder="1"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                />
                <p className="text-xs text-gray-500 mt-1">You own: {userTokenBalance.toFixed(6)} tokens</p>
              </div>

              <button
                onClick={handleSell}
                disabled={txLoading || !sellAmount}
                className="w-full bg-red-600 hover:bg-red-700 disabled:bg-gray-300 text-white font-semibold py-2 px-4 rounded-lg transition flex items-center justify-center space-x-2"
              >
                {txLoading && <Loader2 className="w-4 h-4 animate-spin" />}
                <span>{txLoading ? "Processing..." : "Sell Tokens"}</span>
              </button>

              {transactionError && (
                <div className="bg-red-50 border border-red-200 text-red-700 text-xs p-3 rounded">
                  {transactionError}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
