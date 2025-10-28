import { useAnchorWallet, useConnection } from "@solana/wallet-adapter-react";
import { AnchorProvider, Program } from "@coral-xyz/anchor";
import { CirkleContract } from "@/idl/cirkle_contract";
import idl from "@/idl/cirkle_contract.json";

export function useProgram(): {
  program: Program<CirkleContract> | null;
  provider: AnchorProvider | null;
} {
  const wallet = useAnchorWallet();
  const { connection } = useConnection();

  if (!wallet) return { program: null, provider: null };

  const provider = new AnchorProvider(connection, wallet, {
    commitment: "confirmed",
  });

  const program = new Program<CirkleContract>(idl as CirkleContract, provider);

  return { program, provider };
}
