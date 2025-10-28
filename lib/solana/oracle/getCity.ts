import { PublicKey } from "@solana/web3.js";
import type { Program } from "@coral-xyz/anchor";
import type { Contract } from "@/idl/oracle";

export interface CircleInfo {
  cityName: string;
  rate: number;
  timestamp: number;
  country: string;
  area: number;
}

export async function getCity(
  program: Program<Contract>,
  cityName: string
): Promise<CircleInfo | null> {
  if (!program || !cityName) return null;

  try {
    const [oraclePda] = PublicKey.findProgramAddressSync(
      [Buffer.from("oracle-state")],
      program.programId
    );

    const oracleState = await program.account.oracleState.fetch(oraclePda);

    const city = oracleState.circleRates.find(
      (c: any) => c.cityName === cityName
    );

    if (!city) return null;

    return {
      cityName: city.cityName,
      rate: Number(city.rate.toString()),
      timestamp: Number(city.timestamp.toString()),
      country: city.country,
      area: Number(city.area.toString()),
    };
  } catch (err) {
    console.error("Failed to get city info:", err);
    return null;
  }
}
