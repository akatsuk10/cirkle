import { NextRequest, NextResponse } from "next/server";

interface InitializeRequest {
  adminPublicKey: string;
  password: string;
}

/**
 * POST /api/initialize-vault
 *
 * Validates initialization request
 * Returns authorization token if credentials are valid
 */
export async function POST(request: NextRequest) {
  try {
    const body: InitializeRequest = await request.json();

    const { adminPublicKey, password } = body;

    // Validate inputs
    if (!adminPublicKey || !password) {
      return NextResponse.json(
        { error: "Missing adminPublicKey or password" },
        { status: 400 }
      );
    }

    // Validate admin public key format
    if (!isValidPublicKey(adminPublicKey)) {
      return NextResponse.json(
        { error: "Invalid admin public key format" },
        { status: 400 }
      );
    }

    // Verify admin public key matches environment
    const envAdminKey = process.env.NEXT_PUBLIC_ADMIN_PUBLICKEY;
    if (adminPublicKey !== envAdminKey) {
      return NextResponse.json(
        { error: "Unauthorized: Invalid admin public key" },
        { status: 403 }
      );
    }

    // Verify password
    const correctPassword = process.env.INIT_PASSWORD || "Cirkle123!";
    if (password !== correctPassword) {
      return NextResponse.json(
        { error: "Unauthorized: Invalid password" },
        { status: 403 }
      );
    }

    // Generate a one-time authorization token
    const token = generateAuthToken(adminPublicKey);

    return NextResponse.json(
      {
        success: true,
        message: "Authorization successful",
        token,
        expiresIn: 300, // 5 minutes
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Initialize vault API error:", error);

    return NextResponse.json(
      {
        error: "Internal server error",
        message: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}

/**
 * Validate Solana public key format (Base58)
 */
function isValidPublicKey(publicKey: string): boolean {
  if (publicKey.length < 32 || publicKey.length > 44) {
    return false;
  }

  const base58Chars =
    "123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz";
  for (const char of publicKey) {
    if (!base58Chars.includes(char)) {
      return false;
    }
  }

  return true;
}

/**
 * Generate a simple authorization token
 * In production, use JWT or similar secure tokens
 */
function generateAuthToken(adminPublicKey: string): string {
  const timestamp = Date.now();
  const secret = process.env.VAULT_INIT_SECRET || "vault-init-secret";

  // Simple token format: base64(adminKey:timestamp:hash)
  const tokenData = `${adminPublicKey}:${timestamp}:${secret}`;
  const token = Buffer.from(tokenData).toString("base64");

  return token;
}

/**
 * Verify authorization token (optional, for extra security)
 */
export function verifyAuthToken(token: string): {
  valid: boolean;
  adminPublicKey?: string;
} {
  try {
    const decoded = Buffer.from(token, "base64").toString("utf-8");
    const [adminPublicKey, timestamp, secret] = decoded.split(":");

    const currentSecret = process.env.VAULT_INIT_SECRET || "vault-init-secret";
    const tokenAge = Date.now() - parseInt(timestamp);
    const maxAge = 5 * 60 * 1000; // 5 minutes

    // Verify secret and expiration
    if (secret === currentSecret && tokenAge < maxAge) {
      return { valid: true, adminPublicKey };
    }

    return { valid: false };
  } catch {
    return { valid: false };
  }
}
