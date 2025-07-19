# Infinite Scrolling Gallery

A modern, responsive image gallery built with React and TypeScript that features infinite scrolling, image favouriting, and lazy loading. Built with the Pexels API for high-quality curated images.

## Features

- **Infinite Scroll**: Automatically loads more images as you scroll down
- **Image Favouriting**: Click to favourite images with persistent storage
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices
- **Lazy Loading**: Images load only when needed for better performance
- **Responsive Images**: Automatically serves appropriate image sizes based on device
- **Modern UI**: Clean, hover-based interface with smooth animations
- **TypeScript**: Full type safety throughout the application
- **No External Dependencies**: Built with only React and browser APIs
- **Testing**: Comprehensive test suite with Vitest and React Testing Library

## Quick Start

### Prerequisites

- Node.js (v16 or higher)
- npm, yarn, or pnpm
- Pexels API key

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd infinite-scrolling-gallery
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Get a Pexels API Key**
   - Visit [Pexels API](https://www.pexels.com/api/) or use following: QsRN8fX1e5PUIgdjS0Yv603wLz0lQsAYTtVf2m4jlhmFaeq0XBoy0zus
   - Sign up for a free account
   - Copy your API key

4. **Configure Environment Variables**
   Create a `.env` file in the project root:
   ```env
   VITE_PEXELS_API_KEY=your_pexels_api_key_here
   ```

5. **Start the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

6. **Open your browser**
   Navigate to `http://localhost:5173`

## Usage

### Browsing Images
- **Scroll down** to automatically load more images
- **Hover over images** to see details and favourite button
- **Click "FAVORITE"** to add/remove images from your favourites
- **Favourites persist** across browser sessions

### Responsive Behavior
- **Desktop**: 3 images per row
- **Tablet**: 2 images per row  
- **Mobile**: 1 image per column

## Project Structure

```
src/
├── components/          # React components
│   ├── Gallery.tsx     # Main gallery grid
│   ├── Photo.tsx       # Individual photo component
│   ├── Spinner.tsx     # Loading spinner
│   └── __tests__/      # Component tests
├── hooks/              # Custom React hooks
│   ├── useFavourites.ts    # Favourites management
│   ├── usePexelsImages.ts  # Image fetching & pagination
│   └── __tests__/      # Hook tests
├── services/           # API services
│   └── pexelsApi.ts    # Pexels API integration
├── types/              # TypeScript type definitions
│   └── global.ts       # Shared types
├── config/             # Configuration
│   └── constants.ts    # App constants
├── App.tsx             # Main application component
└── main.tsx            # Application entry point
```

## Technical Details

### Built With
- **React 18** - UI framework
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **CSS Grid** - Responsive layout
- **Pexels API** - Image data source
- **Vitest** - Testing framework
- **React Testing Library** - Component testing utilities

### Key Features Implementation

#### Infinite Scroll
- Uses `IntersectionObserver` pattern with scroll events
- Prevents duplicate requests with loading state management
- Configurable scroll threshold (300px from bottom)

#### Image Optimization
- **Lazy Loading**: `loading="lazy"` attribute
- **Responsive Images**: `srcSet` and `sizes` attributes
- **Progressive Loading**: Multiple image sizes for different devices

#### Favourites System
- **localStorage**: Persistent storage across sessions
- **Set-based**: Efficient duplicate prevention
- **Error Handling**: Graceful fallbacks for storage issues

#### Performance Optimizations
- **Debounced Scroll**: Prevents excessive API calls
- **Image Deduplication**: Removes duplicate images from API responses
- **Efficient Re-renders**: Optimized React state management

## Testing

The project includes comprehensive tests using Vitest and React Testing Library:

### Running Tests
```bash
# Run tests in watch mode
npm test

# Run tests once
npm run test:run

# Run tests with UI
npm run test:ui
```

### Test Coverage
- **Component Tests**: Gallery component rendering and interactions
- **Hook Tests**: useFavourites hook with localStorage mocking
- **Unit Tests**: Individual function testing

### Test Structure
```
src/
├── components/__tests__/
│   └── Gallery.test.tsx    # Gallery component tests
├── hooks/__tests__/
│   └── useFavourites.test.ts  # Favourites hook tests
└── setupTests.ts           # Test configuration
```

## Customization

### Changing Images Per Page
Edit `src/config/constants.ts`:
```typescript
export const IMAGES_PER_PAGE = 20; // Change from 15 to desired number
```

### Modifying Scroll Threshold
In `src/App.tsx`, change the scroll threshold:
```typescript
const isNearBottom = fullHeight - (scrollY + viewportHeight) < 500; // Change from 300
```

### Styling
- Main styles: `src/index.css`
- Component-specific styles are inline or in CSS classes
- Responsive breakpoints: 600px (mobile), 900px (tablet)

## Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `VITE_PEXELS_API_KEY` | Your Pexels API key | Yes |

