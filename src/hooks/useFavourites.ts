import { useState, useEffect } from "react";

export const useFavourites = () => {
  const [favourites, setFavourites] = useState<Set<number>>(() => {
    try {
      const storedFavourites = localStorage.getItem("favourites");
      return storedFavourites
        ? new Set(JSON.parse(storedFavourites))
        : new Set();
    } catch (error) {
      console.warn("Failed to load favourites from localStorage:", error);
      return new Set();
    }
  });

  useEffect(() => {
    try {
      const favouritesArray = Array.from(favourites);
      localStorage.setItem("favourites", JSON.stringify(favouritesArray));
    } catch (error) {
      console.warn("Failed to save favourites to localStorage:", error);
    }
  }, [favourites]);

  const toggleFavourite = (itemId: number) => {
    setFavourites((currentFavourites) => {
      const updatedFavourites = new Set(currentFavourites);
      if (updatedFavourites.has(itemId)) {
        updatedFavourites.delete(itemId);
      } else {
        updatedFavourites.add(itemId);
      }
      return updatedFavourites;
    });
  };

  const isFavourited = (itemId: number): boolean => favourites.has(itemId);

  const addFavourite = (itemId: number) => {
    setFavourites(
      (currentFavourites) => new Set([...currentFavourites, itemId])
    );
  };

  const removeFavourite = (itemId: number) => {
    setFavourites((currentFavourites) => {
      const updatedFavourites = new Set(currentFavourites);
      updatedFavourites.delete(itemId);
      return updatedFavourites;
    });
  };

  const clearFavourites = () => {
    setFavourites(new Set());
  };

  const getFavouritesCount = (): number => favourites.size;

  const getFavouritesList = (): number[] => Array.from(favourites);

  return {
    favourites,
    toggleFavourite,
    isFavourited,
    addFavourite,
    removeFavourite,
    clearFavourites,
    getFavouritesCount,
    getFavouritesList,
  };
};
