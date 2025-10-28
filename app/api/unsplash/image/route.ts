import { NextRequest, NextResponse } from "next/server";

const UNSPLASH_ACCESS_KEY = process.env.UNSPLASH_ACCESS_KEY;

export async function POST(request: NextRequest) {
  try {
    const { cityName } = await request.json();

    if (!cityName) {
      return NextResponse.json(
        { error: "City name is required" },
        { status: 400 }
      );
    }

    if (!UNSPLASH_ACCESS_KEY) {
      console.error("Unsplash API key not configured");
      return NextResponse.json(
        { error: "Unsplash API not configured" },
        { status: 500 }
      );
    }

    const response = await fetch(
      `https://api.unsplash.com/search/photos?query=${encodeURIComponent(
        cityName
      )}&per_page=1&orientation=landscape`,
      {
        headers: {
          Authorization: `Client-ID ${UNSPLASH_ACCESS_KEY}`,
        },
      }
    );

    if (!response.ok) {
      console.error("Unsplash API error:", response.status);
      return NextResponse.json(
        { error: "Failed to fetch from Unsplash" },
        { status: response.status }
      );
    }

    const data = await response.json();

    if (data.results && data.results.length > 0) {
      const imageUrl = `${data.results[0].urls.regular}?w=800&q=80&auto=format`;
      return NextResponse.json({ imageUrl });
    }

    const defaultImage =
      "https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?w=800&q=80&auto=format";
    return NextResponse.json({ imageUrl: defaultImage });
  } catch (error) {
    console.error("API error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
