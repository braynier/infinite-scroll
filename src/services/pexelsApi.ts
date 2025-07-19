import type { PexelsPhoto } from "../types/global";

export interface PexelsApiResponse {
  page: number;
  per_page: number;
  photos: PexelsPhoto[];
  total_results: number;
  next_page?: string;
}

export async function fetchCuratedPhotos(page: number, perPage: number = 15): Promise<PexelsApiResponse> {
  const res = await fetch(
    `https://api.pexels.com/v1/curated?page=${page}&per_page=${perPage}`,
    {
      headers: {
        Authorization: import.meta.env.VITE_PEXELS_API_KEY,
      },
    }
  );
  if (!res.ok) throw new Error("Failed to fetch Pexels images");
  return res.json();
} 