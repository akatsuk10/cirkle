import { BN, Program } from "@coral-xyz/anchor";
import { CirkleContract } from "@/idl/cirkle_contract";
import { PublicKey, SystemProgram } from "@solana/web3.js";
import { TOKEN_PROGRAM_ID } from "@solana/spl-token";

const adminKey = process.env.NEXT_PUBLIC_ADMIN_PUBLICKEY!;

export async function sellToken(
  program: Program<CirkleContract>,
  userPubkey: PublicKey,
  cityName: string,
  circleRate: number,
  tokenAmount: number,
  mint: PublicKey | undefined,
  userAta: PublicKey | undefined,
  cityConfig: PublicKey
) {
  if (!mint || !userAta) {
    throw new Error(
      "Cannot sell token: mint or user associated token account is undefined"
    );
  }

  try {
    const adminPubkey = new PublicKey(adminKey);
    const [vaultPda, vaultBump] = PublicKey.findProgramAddressSync(
      [Buffer.from("protocol_admin"), adminPubkey.toBuffer()],
      program.programId
    );

    console.log("Selling tokens:", {
      user: userPubkey.toBase58(),
      vault: vaultPda.toBase58(),
      mint: mint.toBase58(),
      userAta: userAta.toBase58(),
      cityConfig: cityConfig.toBase58(),
      tokenAmount,
      circleRate,
    });

    const tx = await program.methods
      .sell(new BN(circleRate), new BN(tokenAmount))
      .accountsPartial({
        user: userPubkey,
        vault: vaultPda,
        cityConfig,
        mint,
        userAta,
        tokenProgram: TOKEN_PROGRAM_ID,
        systemProgram: SystemProgram.programId,
      })
      .rpc();

    console.log("Sell transaction success:", tx);
    return tx;
  } catch (err) {
    console.error("Failed to sell token:", err);
    throw err;
  }
}
