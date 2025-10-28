export async function getCityImage(cityName: string): Promise<string | null> {
  try {
    const response = await fetch("/api/unsplash/image", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ cityName }),
    });

    if (!response.ok) {
      console.error("Failed to fetch image from server:", response.status);
      return null;
    }

    const data = await response.json();

    if (data.imageUrl) {
      return data.imageUrl;
    }

    return null;
  } catch (error) {
    console.error("Error fetching city image:", error);
    return null;
  }
}
