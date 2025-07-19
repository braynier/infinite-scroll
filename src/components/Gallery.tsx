import React from "react";
import type { PexelsPhoto } from "../types/global";
import Photo from "./Photo";

interface GalleryProps {
  photos: PexelsPhoto[];
  favourites: Set<number>;
  toggleFavourite: (id: number) => void;
}

const Gallery: React.FC<GalleryProps> = ({
  photos,
  favourites,
  toggleFavourite,
}) => {
  return (
    <div className="gallery-grid">
      {photos.map((photo) => (
        <Photo
          key={photo.id}
          photo={photo}
          isFavourited={favourites.has(photo.id)}
          onToggleFavourite={toggleFavourite}
        />
      ))}
    </div>
  );
};

export default Gallery;
