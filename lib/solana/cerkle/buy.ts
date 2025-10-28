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
import { getCityImage } from "@/lib/unsplash";
import { uploadCityMetadataToIPFS } from "@/lib/ipfs";

const ADMIN_KEY = process.env.NEXT_PUBLIC_ADMIN_PUBLICKEY!;

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
    console.log("Starting buyToken()", {
      cityName,
      lamports,
      circleRate,
      solPriceUsd,
    });

    const adminPubkey = new PublicKey(ADMIN_KEY);

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

    console.log("PDAs:", {
      vault: vaultPda.toString(),
      cityConfig: cityConfigPda.toString(),
      cityMint: cityMintPda.toString(),
      userAta: userAta.toString(),
    });

    const { blockhash, lastValidBlockHeight } =
      await connection.getLatestBlockhash("confirmed");

    const transaction = new Transaction({
      feePayer: userPubkey,
      blockhash,
      lastValidBlockHeight,
    });

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

    console.log("Checking if city config already exists...");
    let finalImageUrl = "";

    try {
      const existingCityConfig = await program.account.cityConfig.fetch(
        cityConfigPda
      );
      if (existingCityConfig && existingCityConfig.metadataUri) {
        finalImageUrl = existingCityConfig.metadataUri;
        console.log(
          "City already has image on-chain, reusing:",
          finalImageUrl
        );
      }
    } catch (err) {
      console.log(
        "City config doesn't exist yet, will create it"
      );
    }

    if (!finalImageUrl) {
      console.log("Fetching city image for:", cityName);
      const unsplashImageUrl = await getCityImage(cityName);

      if (unsplashImageUrl) {
        try {
          console.log("Uploading city metadata to IPFS via Pinata V3...");
          const startTime = Date.now();

          const metadataPromise = uploadCityMetadataToIPFS(
            unsplashImageUrl,
            cityName
          );
          const timeoutPromise = new Promise<null>((resolve) =>
            setTimeout(() => resolve(null), 30000)
          );

          const metadataUri = await Promise.race([
            metadataPromise,
            timeoutPromise,
          ]);
          const uploadTime = ((Date.now() - startTime) / 1000).toFixed(2);

          if (metadataUri) {
            finalImageUrl = metadataUri;
            console.log(
              `Metadata upload successful in ${uploadTime}s:`,
              finalImageUrl
            );
          } else {
            finalImageUrl = unsplashImageUrl;
            console.log(
              `Metadata upload timeout/failed (${uploadTime}s), using Unsplash URL:`,
              finalImageUrl
            );
          }
        } catch (ipfsError) {
          console.error("Metadata upload error:", ipfsError);
          finalImageUrl = unsplashImageUrl;
          console.log("Using fallback Unsplash URL:", finalImageUrl);
        }
      }
    }

    console.log("Final image URL for contract:", finalImageUrl);
    console.log(
      `Image URL length: ${finalImageUrl.length} characters (max: 128)`
    );

    if (finalImageUrl.length > 128) {
      console.error(`Image URL too long: ${finalImageUrl.length} > 128`);
      throw new Error(
        `Image URL exceeds 128 character limit (${finalImageUrl.length} chars)`
      );
    }

    console.log("Creating buy instruction with params:", {
      cityName,
      lamports,
      circleRate,
      solPriceUsd,
      imageUrlLength: finalImageUrl.length,
    });

    let buyIx;
    try {
      buyIx = await program.methods
        .buy(
          cityName,
          new BN(lamports),
          new BN(circleRate),
          new BN(solPriceUsd),
          finalImageUrl
        )
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
      console.log("Buy instruction created");
    } catch (ixError) {
      console.error("Failed to create buy instruction:", ixError);
      throw ixError;
    }

    transaction.add(buyIx);

    console.log("Transaction created, simulating...");

    try {
      const simulation = await connection.simulateTransaction(transaction);
      console.log("Simulation result:", simulation);

      if (simulation.value.err) {
        const errorMsg = JSON.stringify(simulation.value.err);
        console.error("Simulation failed:", simulation.value.err);
        console.error("Logs:", simulation.value.logs);

        if (errorMsg.includes("already been processed")) {
          console.log("Transaction already processed successfully!");
          return "Success";
        }

        throw new Error(`Simulation failed: ${errorMsg}`);
      }

      console.log("Simulation successful");
      console.log("Simulation logs:", simulation.value.logs);
    } catch (simError) {
      console.error("Simulation error:", simError);
      throw simError;
    }

    console.log("Sending transaction to wallet for signing...");

    let signature: string;
    try {
      signature = await sendTransaction(transaction, connection, {
        skipPreflight: false,
        preflightCommitment: "confirmed",
      });
      console.log("Transaction sent:", signature);
    } catch (sendError: any) {
      console.error("Send transaction failed:", sendError);
      console.error("Error message:", sendError.message);
      console.error("Error logs:", sendError.logs);
      throw sendError;
    }

    console.log("Waiting for confirmation...");
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

    console.log("Buy transaction confirmed:", signature);

    const txDetails = await connection.getTransaction(signature, {
      commitment: "confirmed",
      maxSupportedTransactionVersion: 0,
    });

    console.log("Transaction logs:", txDetails?.meta?.logMessages);

    return signature;
  } catch (error: any) {
    console.error("Error in buyToken:", error);
    console.error("Error type:", error.constructor.name);
    console.error("Error message:", error.message);

    if (error instanceof SendTransactionError) {
      console.error("Transaction logs:", error.logs);
    }

    if (error.logs) {
      console.error("Error logs:", error.logs);
    }

    if (error.code) {
      console.error("Error code:", error.code);
    }

    throw error;
  }
}
