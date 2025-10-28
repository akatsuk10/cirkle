"use client";

import { useState } from "react";
import { useAnchorWallet } from "@solana/wallet-adapter-react";
import { useRouter } from "next/navigation";
import { AlertCircle, CheckCircle, Loader2 } from "lucide-react";
import { useProgram } from "@/lib/solana/cerkle/cerkle";
import { initVault } from "@/lib/solana/admin/initialize";

export default function AdminPage() {
  const wallet = useAnchorWallet();
  const router = useRouter();
  const { program } = useProgram();

  const ADMIN_KEY = process.env.NEXT_PUBLIC_ADMIN_PUBLICKEY;
  const isAdmin =
    wallet && ADMIN_KEY && wallet.publicKey.toBase58() === ADMIN_KEY;

  const [password, setPassword] = useState("");
  const [isVerified, setIsVerified] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/initialize-vault", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          adminPublicKey: wallet!.publicKey.toBase58(),
          password,
        }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setIsVerified(true);
        setPassword("");
      } else {
        setError(data.error || "Password verification failed");
      }
    } catch (err) {
      setError(`Error: ${err instanceof Error ? err.message : String(err)}`);
    } finally {
      setLoading(false);
    }
  };

  const handleInitializeVault = async () => {
    if (!program || !wallet) {
      setError("Program or wallet not connected");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const tx = await initVault(program, wallet.publicKey);
      setSuccess(`✅ Vault initialized successfully!\nTx: ${tx}`);
      setIsVerified(false);
    } catch (err) {
      setError(
        `Failed to initialize vault: ${
          err instanceof Error ? err.message : String(err)
        }`
      );
    } finally {
      setLoading(false);
    }
  };

  if (!wallet) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-8 text-center">
            <AlertCircle className="w-12 h-12 text-yellow-600 mx-auto mb-4" />
            <h2 className="text-2xl font-semibold text-yellow-900 mb-2">
              Wallet Not Connected
            </h2>
            <p className="text-yellow-700 mb-4">
              Please connect your wallet to access admin features.
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="bg-red-50 border border-red-200 rounded-lg p-8">
            <div className="flex items-start space-x-4">
              <AlertCircle className="w-8 h-8 text-red-600 mt-1 flex-shrink-0" />
              <div className="flex-1">
                <h2 className="text-2xl font-semibold text-red-900 mb-4">
                  Access Denied
                </h2>
                <p className="text-red-700 mb-6">
                  This page is only accessible by the admin wallet.
                </p>

                <div className="bg-white border border-red-200 rounded p-4 mb-6 space-y-3">
                  <div>
                    <p className="text-sm font-semibold text-gray-600 mb-1">
                      Expected Admin Wallet:
                    </p>
                    <p className="font-mono text-sm text-gray-900 break-all">
                      {ADMIN_KEY}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-600 mb-1">
                      Your Connected Wallet:
                    </p>
                    <p className="font-mono text-sm text-gray-900 break-all">
                      {wallet.publicKey.toBase58()}
                    </p>
                  </div>
                </div>

                <p className="text-red-700 mb-6">
                  Please switch to your admin wallet in your wallet provider, or
                  contact your administrator.
                </p>

                <button
                  onClick={() => router.push("/")}
                  className="inline-flex items-center space-x-2 bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 transition"
                >
                  <span>Back to Home</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8 p-6 bg-green-50 border border-green-200 rounded-lg">
          <div className="flex items-center space-x-3">
            <CheckCircle className="w-6 h-6 text-green-600" />
            <div>
              <p className="text-green-900 font-semibold">
                Admin Access Granted
              </p>
              <p className="text-sm text-green-700 font-mono">
                {wallet.publicKey.toBase58().slice(0, 20)}...
              </p>
            </div>
          </div>
        </div>
        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-700 rounded-lg">
            <p>{error}</p>
          </div>
        )}

        {success && (
          <div className="mb-6 p-4 bg-green-50 border border-green-200 text-green-700 rounded-lg">
            <p className="whitespace-pre-wrap">{success}</p>
          </div>
        )}

        {!isVerified ? (
          <div className="p-6 bg-blue-50 border border-blue-200 rounded-lg">
            <h2 className="text-2xl font-bold mb-4 text-blue-900">
              Initialize Vault
            </h2>
            <p className="text-blue-700 mb-6">
              Enter the vault initialization password to proceed with vault
              setup.
            </p>

            <form onSubmit={handlePasswordSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2 text-gray-700">
                  Password
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-2 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter initialization password"
                  required
                  disabled={loading}
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 text-white font-semibold py-2 px-4 rounded-lg transition flex items-center justify-center gap-2"
              >
                {loading && <Loader2 className="w-4 h-4 animate-spin" />}
                {loading ? "Verifying..." : "Verify Password"}
              </button>
            </form>
          </div>
        ) : (
          <div className="p-6 bg-blue-50 border border-blue-200 rounded-lg">
            <h2 className="text-2xl font-bold mb-4 text-blue-900">
              Initialize Vault
            </h2>
            <p className="text-blue-700 mb-2">
              Password verified! Click the button below to initialize the vault.
            </p>
            <p className="text-sm text-blue-600 mb-6">
              This will create the vault PDA on the blockchain.
            </p>

            <button
              onClick={handleInitializeVault}
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 text-white font-semibold py-2 px-4 rounded-lg transition flex items-center justify-center gap-2"
            >
              {loading && <Loader2 className="w-4 h-4 animate-spin" />}
              {loading ? "Initializing..." : "Initialize Vault"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
