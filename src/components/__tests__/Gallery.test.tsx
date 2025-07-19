import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import Gallery from '../Gallery';

const mockPhotos = [
  {
    id: 1,
    width: 100,
    height: 100,
    url: 'https://example.com',
    photographer: 'Test Photographer',
    photographer_url: 'https://example.com',
    photographer_id: 1,
    avg_color: '#fff',
    src: {
      original: '',
      large2x: '',
      large: '',
      medium: '',
      small: '',
      portrait: '',
      landscape: '',
      tiny: '',
    },
    liked: false,
    alt: 'Test Photo',
  },
];

describe('Gallery', () => {
  it('renders gallery with photos', () => {
    render(
      <Gallery
        photos={mockPhotos}
        favourites={new Set()}
        toggleFavourite={() => {}}
      />
    );
    expect(screen.getByAltText('Test Photo')).toBeInTheDocument();
  });

  it('renders empty gallery when no photos', () => {
    render(
      <Gallery
        photos={[]}
        favourites={new Set()}
        toggleFavourite={() => {}}
      />
    );
    expect(screen.getByRole('grid')).toBeInTheDocument();
  });
}); 