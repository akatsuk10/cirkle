import { BN, Program } from "@coral-xyz/anchor";
import { CirkleContract } from "@/idl/cirkle_contract";
import {
  PublicKey,
  SystemProgram,
  SYSVAR_RENT_PUBKEY,
  ComputeBudgetProgram,
  Transaction,
  Connection,
  SendTransactionError,
} from "@solana/web3.js";
import {
  getAssociatedTokenAddress,
  TOKEN_PROGRAM_ID,
  ASSOCIATED_TOKEN_PROGRAM_ID,
} from "@solana/spl-token";

const ADMIN_KEY = process.env.NEXT_PUBLIC_ADMIN_PUBLICKEY!;

/**
 * Buy city tokens with increased compute budget
 */
export async function buyToken(
  program: Program<CirkleContract>,
  connection: Connection,
  sendTransaction: any,
  userPubkey: PublicKey,
  cityName: string,
  lamports: number,
  circleRate: number,
  solPriceUsd: number
) {
  try {
    console.log("🚀 Starting buyToken()", {
      cityName,
      lamports,
      circleRate,
      solPriceUsd,
    });

    const adminPubkey = new PublicKey(ADMIN_KEY);

    // --- PDAs ---
    const [vaultPda] = PublicKey.findProgramAddressSync(
      [Buffer.from("protocol_admin"), adminPubkey.toBuffer()],
      program.programId
    );

    const [cityConfigPda] = PublicKey.findProgramAddressSync(
      [Buffer.from("city-config"), Buffer.from(cityName)],
      program.programId
    );

    const [cityMintPda] = PublicKey.findProgramAddressSync(
      [Buffer.from("city-mint"), Buffer.from(cityName)],
      program.programId
    );

    const userAta = await getAssociatedTokenAddress(cityMintPda, userPubkey);

    console.log("📍 PDAs:", {
      vault: vaultPda.toString(),
      cityConfig: cityConfigPda.toString(),
      cityMint: cityMintPda.toString(),
      userAta: userAta.toString(),
    });

    // Get recent blockhash first
    const { blockhash, lastValidBlockHeight } =
      await connection.getLatestBlockhash("confirmed");

    // Create transaction with compute budget
    const transaction = new Transaction({
      feePayer: userPubkey,
      blockhash,
      lastValidBlockHeight,
    });

    // Add compute budget instructions
    transaction.add(
      ComputeBudgetProgram.setComputeUnitLimit({
        units: 400_000,
      })
    );

    transaction.add(
      ComputeBudgetProgram.setComputeUnitPrice({
        microLamports: 1,
      })
    );

    // Create the buy instruction
    const buyIx = await program.methods
      .buy(cityName, new BN(lamports), new BN(circleRate), new BN(solPriceUsd))
      .accountsPartial({
        user: userPubkey,
        admin: adminPubkey,
        vault: vaultPda,
        cityConfig: cityConfigPda,
        cityMint: cityMintPda,
        userAta,
        tokenProgram: TOKEN_PROGRAM_ID,
        associatedTokenProgram: ASSOCIATED_TOKEN_PROGRAM_ID,
        systemProgram: SystemProgram.programId,
        rent: SYSVAR_RENT_PUBKEY,
      })
      .instruction();

    // Add the buy instruction
    transaction.add(buyIx);

    console.log("📦 Transaction created, simulating...");

    // Simulate transaction first to catch errors early
    try {
      const simulation = await connection.simulateTransaction(transaction);
      console.log("🔍 Simulation result:", simulation);

      if (simulation.value.err) {
        console.error("❌ Simulation failed:", simulation.value.err);
        console.error("📋 Logs:", simulation.value.logs);
        throw new Error(
          `Simulation failed: ${JSON.stringify(simulation.value.err)}`
        );
      }

      console.log("✅ Simulation successful");
      console.log("📋 Simulation logs:", simulation.value.logs);
    } catch (simError) {
      console.error("❌ Simulation error:", simError);
      throw simError;
    }

    // Send transaction
    console.log("📤 Sending transaction...");
    const signature = await sendTransaction(transaction, connection, {
      skipPreflight: false,
      preflightCommitment: "confirmed",
    });

    console.log("📝 Transaction sent:", signature);

    // Wait for confirmation
    console.log("⏳ Waiting for confirmation...");
    const confirmation = await connection.confirmTransaction(
      {
        signature,
        blockhash,
        lastValidBlockHeight,
      },
      "confirmed"
    );

    if (confirmation.value.err) {
      throw new Error(
        `Transaction failed: ${JSON.stringify(confirmation.value.err)}`
      );
    }

    console.log("✅ Buy transaction confirmed:", signature);

    // Fetch transaction details
    const txDetails = await connection.getTransaction(signature, {
      commitment: "confirmed",
      maxSupportedTransactionVersion: 0,
    });

    console.log("📜 Transaction logs:", txDetails?.meta?.logMessages);

    return signature;
  } catch (error: any) {
    console.error("❌ Error in buyToken:", error);

    // Extract more detailed error info
    if (error instanceof SendTransactionError) {
      console.error("📋 Transaction logs:", error.logs);
    }

    if (error.logs) {
      console.error("📋 Error logs:", error.logs);
    }

    throw error;
  }
}
