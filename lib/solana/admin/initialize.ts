"use client";

import { PublicKey, SystemProgram } from "@solana/web3.js";
import { useAnchorWallet } from "@solana/wallet-adapter-react";
import { Program } from "@coral-xyz/anchor";
import { CirkleContract } from "@/idl/cirkle_contract";

const adminKey = process.env.NEXT_PUBLIC_ADMIN_PUBLICKEY!;
const adminPubkey = new PublicKey(adminKey);

export const initVault = async (
  program: Program<CirkleContract> | undefined,
  walletPubkey: PublicKey
) => {
  if (!program || !walletPubkey)
    throw new Error("Program or wallet not connected");
  try {
    // Derive PDA
    const [vaultPda] = PublicKey.findProgramAddressSync(
      [Buffer.from("protocol_admin"), adminPubkey.toBuffer()],
      program.programId
    );

    console.log("Vault PDA:", vaultPda.toBase58());

    // Send transaction
    const txSig = await program.methods
      .vaultInitialize()
      .accountsPartial({
        admin: walletPubkey,
        adminVault: vaultPda,
        systemProgram: SystemProgram.programId,
      })
      .rpc();

    console.log("Vault initialized successfully!");
    console.log("Tx Signature:", txSig);
    return txSig;
  } catch (err) {
    console.error("Vault initialization failed:", err);
  }
};
