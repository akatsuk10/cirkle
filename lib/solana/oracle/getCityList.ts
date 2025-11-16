import { PublicKey } from "@solana/web3.js";
import type { Program } from "@coral-xyz/anchor";
import type { Contract } from "@/idl/oracle";

export async function getCityList(
  program: Program<Contract>
) {
  if (!program) return null;

  try {
    const oraclePda = PublicKey.findProgramAddressSync(
      [Buffer.from("oracle-state")],
      program.programId
    )[0];

    const acc = await program.account.oracleState.fetch(oraclePda);

    return acc.circleRates.map((c: any) => ({
      cityName: c.cityName,
      rate: Number(c.rate),
      timestamp: Number(c.timestamp),
      country: c.country,
      area: Number(c.area),
    }));
  } catch (err) {
    console.error("Failed to get city list:", err);
    return null;
  }
}
