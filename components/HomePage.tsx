"use client";

import { useEffect, useState, useRef } from "react";
import { useAnchorWallet } from "@solana/wallet-adapter-react";
import { Loader2 } from "lucide-react";
import { getCityList } from "@/utils/solana/oracle/getCityList";
import { useOracleProgram } from "@/utils/oracle";
import Header from "./landing/Header";

interface CityInfo {
    cityName: string;
    rate: number;
    timestamp: number;
    country: string;
    area: number;
}

export default function HomePage() {
    const [cities, setCities] = useState<CityInfo[]>([]);
    const [loading, setLoading] = useState(false);
    const { oracleProgram } = useOracleProgram();

    const wallet = useAnchorWallet();
    const hasFetched = useRef(false); 

    useEffect(() => {
        const fetchData = async () => {
            if (!oracleProgram || !wallet || hasFetched.current) return;

            setLoading(true);
            try {
                const data = await getCityList(oracleProgram);
                if (data) setCities(data);
                hasFetched.current = true;
            } catch (err) {
                console.error("❌ Failed to load city list:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [wallet, oracleProgram]);

    return (
        <div className="min-h-screen bg-neutral-950 text-white flex flex-col items-center py-10 px-4">
            <Header/>
            <h1 className="text-3xl font-bold mb-8 text-center">🏙 Circle Rate Dashboard</h1>

            {loading ? (
                <div className="flex justify-center items-center mt-10">
                    <Loader2 className="animate-spin w-6 h-6 mr-2" />
                    <span>Loading city data...</span>
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 w-full max-w-6xl">
                    {cities.map((city) => (
                        <div
                            key={city.cityName}
                            className="bg-neutral-900 border border-neutral-800 rounded-lg p-4 hover:border-neutral-600 transition"
                        >
                            <h2 className="text-xl font-semibold mb-2">{city.cityName}</h2>
                            <p className="text-sm text-gray-400 mb-1">Country: {city.country}</p>
                            <p className="text-sm text-gray-400 mb-1">Area: {city.area} sq.ft</p>
                            <p className="text-lg font-bold text-green-400">$ {city.rate.toLocaleString()}</p>
                            <p className="text-xs text-gray-500 mt-2">
                                Last Updated: {new Date(city.timestamp * 1000).toLocaleString()}
                            </p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
