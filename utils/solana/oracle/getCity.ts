import { PublicKey } from "@solana/web3.js";
import type { Program } from "@coral-xyz/anchor";
import { Contract } from "@/idl/oracle";

export async function getCity(
  program: Program<Contract>,
  cityName: string
): Promise<number | null> {
  if (!program || !cityName) return null;

  try {
    const oraclePda = PublicKey.findProgramAddressSync(
      [Buffer.from("oracle-state")],
      program.programId
    )[0];

    const tx = await program.methods
      .getCircleRate(cityName)
      .accounts({
        oracleState: oraclePda,
      })
      .view();

    return tx;
  } catch (err) {
    console.error("❌ Failed to get city rate:", err);
    return null;
  }
}
