export function verifyAuthToken(token: string): {
  valid: boolean;
  adminPublicKey?: string;
} {
  try {
    const decoded = Buffer.from(token, "base64").toString("utf-8");
    const [adminPublicKey, timestamp, secret] = decoded.split(":");

    const currentSecret = process.env.VAULT_INIT_SECRET || "vault-init-secret";
    const tokenAge = Date.now() - parseInt(timestamp);
    const maxAge = 5 * 60 * 1000;

    if (secret === currentSecret && tokenAge < maxAge) {
      return { valid: true, adminPublicKey };
    }

    return { valid: false };
  } catch {
    return { valid: false };
  }
}
