import { PublicKey } from "@solana/web3.js";
import type { Program } from "@coral-xyz/anchor";
import type { Contract } from "@/idl/oracle";

export interface CityInfo {
  cityName: string;
  rate: number;
  timestamp: number;
  country: string;
  area: number;
}

export async function getCityList(
  program: Program<Contract>
): Promise<CityInfo[] | null> {
  if (!program) return null;

  try {
    const oraclePda = PublicKey.findProgramAddressSync(
      [Buffer.from("oracle-state")],
      program.programId
    )[0];

    const cities = await program.methods
      .getCityList()
      .accounts({
        oracleState: oraclePda,
      })
      .view();

    return cities.map((c: any) => ({
      cityName: c.cityName,
      rate: Number(c.rate),
      timestamp: Number(c.timestamp),
      country: c.country,
      area: Number(c.area),
    }));
  } catch (err) {
    console.error("❌ Failed to get city list:", err);
    return null;
  }
}
