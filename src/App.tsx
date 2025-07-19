import { useCallback, useEffect } from "react";

import { useFavourites } from "./hooks/useFavourites";
import { usePexelsImages } from "./hooks/usePexelsImages";

import Gallery from "./components/Gallery";
import Spinner from "./components/Spinner";

function App() {
  const { favourites, toggleFavourite } = useFavourites();
  const { photos, loading, hasMore, fetchImages } = usePexelsImages();

  const handleInfiniteScroll = useCallback(() => {
    if (loading || !hasMore) return;
    const scrollY = window.scrollY;
    const viewportHeight = window.innerHeight;
    const fullHeight = document.body.offsetHeight;
    const isNearBottom = fullHeight - (scrollY + viewportHeight) < 300;
    if (isNearBottom) {
      fetchImages();
    }
  }, [loading, hasMore, fetchImages]);

  useEffect(() => {
    fetchImages();
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleInfiniteScroll);
    return () => window.removeEventListener("scroll", handleInfiniteScroll);
  }, [handleInfiniteScroll]);

  return (
    <div className="gallery-container">
      <Gallery
        photos={photos}
        favourites={favourites}
        toggleFavourite={toggleFavourite}
      />
      {loading && <Spinner />}
      {!hasMore && <div className="end">No more images.</div>}
    </div>
  );
}

export default App;
