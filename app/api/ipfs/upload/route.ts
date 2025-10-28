import { NextRequest, NextResponse } from "next/server";

const PINATA_JWT = process.env.PINATA_JWT;
const PINATA_GATEWAY = process.env.PINATA_GATEWAY || "gateway.pinata.cloud";

export async function POST(request: NextRequest) {
  try {
    const { imageUrl, cityName } = await request.json();

    if (!imageUrl) {
      return NextResponse.json(
        { error: "Image URL is required" },
        { status: 400 }
      );
    }

    if (!cityName) {
      return NextResponse.json(
        { error: "City name is required" },
        { status: 400 }
      );
    }

    if (!PINATA_JWT) {
      console.error("Pinata JWT not configured");
      return NextResponse.json(
        { error: "IPFS upload not configured" },
        { status: 500 }
      );
    }

    console.log(`[IPFS] Uploading image for ${cityName}`);

    console.log("[IPFS] Downloading image from Unsplash...");
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000);
    const imageResponse = await fetch(imageUrl, {
      signal: controller.signal,
    });
    clearTimeout(timeoutId);

    if (!imageResponse.ok) {
      console.error("[IPFS] Failed to fetch image:", imageResponse.status);
      return NextResponse.json(
        { error: "Failed to fetch image from source" },
        { status: 500 }
      );
    }

    const imageBuffer = await imageResponse.arrayBuffer();
    const imageSizeKB = (imageBuffer.byteLength / 1024).toFixed(2);
    console.log(`[IPFS] Image downloaded: ${imageSizeKB} KB`);

    const formData = new FormData();
    const contentType =
      imageResponse.headers.get("content-type") || "image/jpeg";
    const blob = new Blob([imageBuffer], { type: contentType });

    formData.append("file", blob, `${cityName}-token.jpg`);

    formData.append("network", "public");

    console.log("[IPFS] Uploading to Pinata V3 API...");
    const startTime = Date.now();

    const uploadResponse = await fetch(
      "https://uploads.pinata.cloud/v3/files",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${PINATA_JWT}`,
        },
        body: formData,
      }
    );

    const uploadTime = ((Date.now() - startTime) / 1000).toFixed(2);
    console.log(`[IPFS] Upload request completed in ${uploadTime}s`);

    if (!uploadResponse.ok) {
      const errorText = await uploadResponse.text();
      console.error(
        "[IPFS] Pinata upload failed:",
        uploadResponse.status,
        errorText
      );
      return NextResponse.json(
        { error: "Failed to upload to Pinata" },
        { status: uploadResponse.status }
      );
    }

    const uploadData = await uploadResponse.json();
    console.log("[IPFS] Pinata response:", uploadData);

    const ipfsHash = uploadData.data?.cid || uploadData.IpfsHash;

    if (!ipfsHash) {
      console.error("[IPFS] No IPFS hash returned:", uploadData);
      return NextResponse.json(
        { error: "No IPFS hash in response" },
        { status: 500 }
      );
    }

    const imageUri = `ipfs://${ipfsHash}`;
    const imageGatewayUrl = `https://${PINATA_GATEWAY}/ipfs/${ipfsHash}`;
    console.log(`[IPFS] Image uploaded: ${imageUri}`);
    console.log(`[IPFS] Image gateway URL: ${imageGatewayUrl}`);

    console.log("[IPFS] Creating metadata JSON...");
    const metadata = {
      name: cityName,
      description: `${cityName} City Token - Real Estate Tokenization`,
      image: imageGatewayUrl,
      attributes: [
        {
          trait_type: "City",
          value: cityName,
        },
        {
          trait_type: "Type",
          value: "City Token",
        },
      ],
    };

    const metadataJson = JSON.stringify(metadata);
    console.log("[IPFS] Metadata JSON created:", metadataJson);

    console.log("[IPFS] Uploading metadata JSON...");
    const metadataFormData = new FormData();
    const metadataBlob = new Blob([metadataJson], { type: "application/json" });
    metadataFormData.append("file", metadataBlob, `${cityName}-metadata.json`);
    metadataFormData.append("network", "public");

    const metadataUploadResponse = await fetch(
      "https://uploads.pinata.cloud/v3/files",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${PINATA_JWT}`,
        },
        body: metadataFormData,
      }
    );

    if (!metadataUploadResponse.ok) {
      const errorText = await metadataUploadResponse.text();
      console.error(
        "[IPFS] Metadata upload failed:",
        metadataUploadResponse.status,
        errorText
      );
      return NextResponse.json(
        { error: "Failed to upload metadata to IPFS" },
        { status: metadataUploadResponse.status }
      );
    }

    const metadataUploadData = await metadataUploadResponse.json();
    const metadataHash = metadataUploadData.data?.cid;

    if (!metadataHash) {
      console.error("[IPFS] No metadata hash returned");
      return NextResponse.json(
        { error: "No metadata hash returned" },
        { status: 500 }
      );
    }

    const metadataUri = `https://${PINATA_GATEWAY}/ipfs/${metadataHash}`;

    console.log(`[IPFS] Metadata uploaded successfully: ${metadataUri}`);

    return NextResponse.json({
      metadataUri,
      metadataHash,
      imageUri,
      imageHash: ipfsHash,
      pinataUrl: `https://ipfs.io/ipfs/${metadataHash}`,
    });
  } catch (error) {
    console.error("[IPFS] API error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
