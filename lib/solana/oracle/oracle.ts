import { useAnchorWallet, useConnection } from "@solana/wallet-adapter-react";
import { AnchorProvider, Program } from "@coral-xyz/anchor";
import { Contract } from "@/idl/oracle";
import idl from "@/idl/oracle.json";


export function useOracleProgram(): {
  oracleProgram: Program<Contract> | null;
  oracleProvider: AnchorProvider | null;
} {
  const wallet = useAnchorWallet();
  const { connection } = useConnection();

  if (!wallet) return { oracleProgram: null, oracleProvider: null };

  const oracleProvider = new AnchorProvider(connection, wallet, {
    commitment: "confirmed",
  });

  const oracleProgram = new Program<Contract>(idl as Contract, oracleProvider);

  return { oracleProgram, oracleProvider };
}