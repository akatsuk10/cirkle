import { NextRequest, NextResponse } from "next/server";
import { verifyAuthToken } from "@/lib/auth";

interface InitializeRequest {
  adminPublicKey: string;
  password: string;
}

export async function POST(request: NextRequest) {
  try {
    const body: InitializeRequest = await request.json();
    const { adminPublicKey, password } = body;

    if (!adminPublicKey || !password) {
      return NextResponse.json(
        { error: "Missing adminPublicKey or password" },
        { status: 400 }
      );
    }

    if (!isValidPublicKey(adminPublicKey)) {
      return NextResponse.json(
        { error: "Invalid admin public key format" },
        { status: 400 }
      );
    }

    const envAdminKey = process.env.NEXT_PUBLIC_ADMIN_PUBLICKEY;
    if (adminPublicKey !== envAdminKey) {
      return NextResponse.json(
        { error: "Unauthorized: Invalid admin public key" },
        { status: 403 }
      );
    }

    const correctPassword = process.env.INIT_PASSWORD || "Cirkle123!";
    if (password !== correctPassword) {
      return NextResponse.json(
        { error: "Unauthorized: Invalid password" },
        { status: 403 }
      );
    }

    const token = generateAuthToken(adminPublicKey);

    return NextResponse.json(
      {
        success: true,
        message: "Authorization successful",
        token,
        expiresIn: 300,
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

function isValidPublicKey(publicKey: string): boolean {
  if (publicKey.length < 32 || publicKey.length > 44) return false;
  const base58Chars =
    "123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz";
  return [...publicKey].every((c) => base58Chars.includes(c));
}

function generateAuthToken(adminPublicKey: string): string {
  const timestamp = Date.now();
  const secret = process.env.VAULT_INIT_SECRET || "vault-init-secret";
  const tokenData = `${adminPublicKey}:${timestamp}:${secret}`;
  return Buffer.from(tokenData).toString("base64");
}
