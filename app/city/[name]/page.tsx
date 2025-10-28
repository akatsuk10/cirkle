"use client";

import { useParams } from "next/navigation";
import { useEffect, useState, useRef } from "react";
import { useAnchorWallet, useConnection, useWallet } from "@solana/wallet-adapter-react";
import { Loader2 } from "lucide-react";
import { getCity } from "@/utils/solana/oracle/getCity";
import { useOracleProgram } from "@/utils/oracle";
import { buyToken } from "@/utils/solana/cerkle/buy";
import { sellToken } from "@/utils/solana/cerkle/sell";
import { useProgram } from "@/utils/cerkle";
import { getAssociatedTokenAddress } from "@solana/spl-token";
import { LAMPORTS_PER_SOL, PublicKey } from "@solana/web3.js";
import { initVault } from "@/initialize";

export default function CityPage() {
    const { name: nameParam } = useParams();
    const { connection } = useConnection();
    const name = Array.isArray(nameParam)
        ? nameParam[0].replace(/-/g, " ")
        : nameParam?.replace(/-/g, " ");
    const [city, setCity] = useState<any>(null);
    const [loading, setLoading] = useState(false);
    const { oracleProgram } = useOracleProgram();
    const { program } = useProgram();
    const { wallet, publicKey, sendTransaction } = useWallet()
    const hasFetched = useRef(false);
    const [txLoading, setTxLoading] = useState(false);
    const [solAmount, setSolAmount] = useState<number>(1);
    const [sellAmount, setSellAmount] = useState<number>(1);

    useEffect(() => {
        const fetchCity = async () => {
            if (!oracleProgram || !wallet || !name || hasFetched.current) return;

            setLoading(true);
            try {
                const data = await getCity(oracleProgram, name);
                setCity(data);
                hasFetched.current = true;
            } catch (err) {
                console.error("Failed to load city:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchCity();
    }, [oracleProgram, wallet, name]);


    const getMintAndCityConfig = async () => {
        if (!publicKey || !program || !city) return;

        const [cityConfigPda] = PublicKey.findProgramAddressSync(
            [Buffer.from("city-mint"), Buffer.from(city.cityName)],
            program.programId
        );

        const cityConfig = await program.account.cityConfig.fetchNullable(cityConfigPda);

        let mint: PublicKey | undefined;
        if (!cityConfig || cityConfig.mint.equals(PublicKey.default)) {
            mint = undefined;
        } else {
            mint = cityConfig.mint;
        }

        let userAta: PublicKey | undefined;
        if (mint) {
            userAta = await getAssociatedTokenAddress(mint, publicKey);
        }

        return { mint, cityConfigPda, userAta };
    };


    const handleBuy = async () => {
        if (!wallet || !city || !program || !publicKey || !solAmount) return;
        setTxLoading(true);

        try {
            const solPriceUsd = 150;

            console.log("🚀 Starting buy transaction:", {
                cityName: city.cityName,
                solAmount: solAmount,
                lamports: solAmount * LAMPORTS_PER_SOL,
                circleRate: city.rate,
                solPriceUsd: solPriceUsd,
                // Calculate expected tokens to verify math
                expectedTokenAmount: ((solAmount * solPriceUsd) / city.rate),
                expectedTokenWithDecimals: ((solAmount * solPriceUsd) / city.rate) * 1_000_000,
            });

            const tx = await buyToken(
                program,
                connection,
                sendTransaction,
                publicKey,
                city.cityName,
                solAmount * LAMPORTS_PER_SOL,
                city.rate*1000,
                solPriceUsd
            );

            console.log("✅ Buy success:", tx);
            alert(`Successfully bought tokens!\n\nTransaction: ${tx}\n\nView on Explorer: https://explorer.solana.com/tx/${tx}?cluster=devnet`);

            // Refresh the page to show new balance
            setTimeout(() => window.location.reload(), 2000);

        } catch (err: any) {
            console.error("❌ Buy failed:", err);

            let errorMessage = "Unknown error";
            if (err.message) {
                errorMessage = err.message;
            }
            if (err.logs) {
                console.log("📋 Full error logs:", err.logs);
                errorMessage += `\n\nCheck console for full logs`;
            }

            alert(`Buy failed: ${errorMessage}`);
        } finally {
            setTxLoading(false);
        }
    };

    const handleSell = async () => {
        if (!wallet || !city || !program || !sellAmount) return;
        setTxLoading(true);
        try {
            const result = await getMintAndCityConfig();
            if (!result) return;

            const { mint, cityConfigPda, userAta } = result;

            const tx = await sellToken(
                program,
                publicKey!,
                city.cityName,
                city.rate,
                sellAmount,
                mint,
                userAta,
                cityConfigPda
            );

            console.log("Sell success:", tx);
        } catch (err) {
            console.error("Sell failed:", err);
        } finally {
            setTxLoading(false);
        }
    };

    if (loading || !city) {
        return (
            <div className="flex justify-center items-center min-h-screen text-white bg-neutral-900">
                <Loader2 className="animate-spin w-8 h-8 mr-2" />
                Loading city...
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-neutral-900 text-white flex flex-col items-center py-12 px-6 font-mono">
            <div className="w-full max-w-md bg-neutral-800 rounded-xl shadow-xl p-6 space-y-6 border border-neutral-700">
                <h1 className="text-3xl font-bold text-green-400">{city.cityName} 🏙</h1>
                <div className="space-y-1 text-gray-300 text-sm">
                    <p>Country: {city.country ?? "-"}</p>
                    <p>Area: {city.area ?? "-"} sq.ft</p>
                    <p>Rate: <span className="text-green-400">${city.rate?.toLocaleString() ?? "N/A"}</span></p>
                    <p>Last Updated: {city.timestamp ? new Date(city.timestamp * 1000).toLocaleString() : "N/A"}</p>
                </div>

                <div className="space-y-4">
                    {/* Buy Section */}
                    <div className="flex flex-col space-y-1">
                        <label className="text-gray-400 text-xs">SOL Amount</label>
                        <input
                            type="number"
                            min={0}
                            value={solAmount}
                            onChange={(e) => setSolAmount(Number(e.target.value))}
                            className="w-full px-3 py-2 rounded bg-neutral-700 text-white border border-neutral-600 focus:outline-none focus:ring-2 focus:ring-green-400"
                        />
                        <button
                            disabled={txLoading}
                            onClick={handleBuy}
                            className="w-full mt-2 bg-green-600 hover:bg-green-500 px-4 py-2 rounded transition disabled:opacity-50"
                        >
                            {txLoading ? "Processing..." : "Buy"}
                        </button>
                    </div>

                    {/* Sell Section */}
                    <div className="flex flex-col space-y-1">
                        <label className="text-gray-400 text-xs">Token Amount</label>
                        <input
                            type="number"
                            min={0}
                            value={sellAmount}
                            onChange={(e) => setSellAmount(Number(e.target.value))}
                            className="w-full px-3 py-2 rounded bg-neutral-700 text-white border border-neutral-600 focus:outline-none focus:ring-2 focus:ring-red-400"
                        />
                        <button
                            disabled={txLoading}
                            onClick={handleSell}
                            className="w-full mt-2 bg-red-600 hover:bg-red-500 px-4 py-2 rounded transition disabled:opacity-50"
                        >
                            {txLoading ? "Processing..." : "Sell"}
                        </button>
                    </div>
                </div>
                <div className="flex flex-col items-center mb-4">
                </div>
            </div>
        </div>
    );
}
