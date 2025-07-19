import { useState, useCallback } from "react";
import type { PexelsPhoto } from "../types/global";
import { fetchCuratedPhotos } from "../services/pexelsApi";
import type { PexelsApiResponse } from "../services/pexelsApi";

export function usePexelsImages(perPage: number = 15) {
  const [photos, setPhotos] = useState<PexelsPhoto[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchImages = useCallback(async () => {
    if (loading || !hasMore) return;

    setLoading(true);
    setError(null);

    try {
      const response: PexelsApiResponse = await fetchCuratedPhotos(
        currentPage,
        perPage
      );

      setPhotos((existingPhotos) => {
        const allPhotos = [...existingPhotos, ...response.photos];
        const uniquePhotos = Array.from(
          new Map(allPhotos.map((photo) => [photo.id, photo])).values()
        );
        return uniquePhotos;
      });

      setHasMore(!!response.next_page);
      setCurrentPage((page) => page + 1);
    } catch (err: unknown) {
      const errorMessage =
        err instanceof Error ? err.message : "Failed to fetch images";
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  }, [currentPage, perPage, loading, hasMore]);

  return {
    photos,
    loading,
    hasMore,
    error,
    fetchImages,
  };
}
