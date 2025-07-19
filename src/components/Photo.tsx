import React from "react";
import type { PexelsPhoto } from "../types/global";

interface PhotoProps {
  photo: PexelsPhoto;
  isFavourited: boolean;
  onToggleFavourite: (id: number) => void;
}

const Photo: React.FC<PhotoProps> = ({
  photo,
  isFavourited,
  onToggleFavourite,
}) => (
  <div className="gallery-item photo-item">
    <div>
      <img
        src={photo.src.large}
        srcSet={
          `${photo.src.medium} 400w, ` +
          `${photo.src.large} 800w, ` +
          `${photo.src.large2x} 1200w, ` +
          `${photo.src.original} 2000w`
        }
        sizes="(max-width: 600px) 100vw, (max-width: 900px) 50vw, 33vw"
        alt={photo.alt}
        loading="lazy"
        className="photo-img"
      />
      <div className="photo-overlay">
        <div className="photo-meta">
          <div className="photo-title">
            {photo.alt ? photo.alt : `#${photo.id}`}
          </div>
          <div className="photo-divider"></div>
          <div className="photo-author">{photo.photographer}</div>
        </div>
        <button
          className={`favourite-btn-2${isFavourited ? " favourited" : ""}`}
          onClick={(e) => {
            e.preventDefault();
            onToggleFavourite(photo.id);
            e.currentTarget.blur();
          }}
          aria-label={
            isFavourited ? "Remove from favourites" : "Add to favourites"
          }
        >
          {isFavourited ? "FAVORITED" : "FAVORITE"}
        </button>
      </div>
    </div>
  </div>
);

export default Photo;
