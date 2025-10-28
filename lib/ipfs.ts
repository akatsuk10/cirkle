export async function uploadCityMetadataToIPFS(
  imageUrl: string,
  cityName: string
): Promise<string | null> {
  try {
    console.log(`[Client] Starting metadata upload for ${cityName}`);
    const startTime = Date.now();

    const response = await fetch("/api/ipfs/upload", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ imageUrl, cityName }),
    });

    const elapsed = ((Date.now() - startTime) / 1000).toFixed(2);

    if (!response.ok) {
      const error = await response.text();
      console.error(`[Client] IPFS upload failed (${elapsed}s):`, response.status, error);
      return null;
    }

    const data = await response.json();

    if (data.metadataUri) {
      console.log(`[Client] Metadata upload successful (${elapsed}s):`, data.metadataUri);
      return data.metadataUri;
    }

    console.error("[Client] No metadata URI in response:", data);
    return null;
  } catch (error) {
    console.error("[Client] IPFS upload error:", error);
    return null;
  }
}

export function getIPFSGatewayUrl(ipfsHash: string): string {
  if (ipfsHash.startsWith("ipfs://")) {
    const hash = ipfsHash.replace("ipfs://", "");
    return `https://gateway.pinata.cloud/ipfs/${hash}`;
  }

  if (ipfsHash.startsWith("Qm")) {
    return `https://gateway.pinata.cloud/ipfs/${ipfsHash}`;
  }

  return ipfsHash;
}
