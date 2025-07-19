import { renderHook, act } from "@testing-library/react";
import { describe, it, expect, beforeEach, vi } from "vitest";
import { useFavourites } from "../useFavourites";

const localStorageMock = {
  getItem: vi.fn(),
  setItem: vi.fn(),
  removeItem: vi.fn(),
  clear: vi.fn(),
};
Object.defineProperty(window, "localStorage", {
  value: localStorageMock,
});

describe("useFavourites", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    localStorageMock.getItem.mockReturnValue(null);
  });

  it("initializes with empty favourites", () => {
    const { result } = renderHook(() => useFavourites());

    expect(result.current.favourites.size).toBe(0);
    expect(result.current.getFavouritesCount()).toBe(0);
  });

  it("loads favourites from localStorage on init", () => {
    const storedFavourites = [1, 2, 3];
    localStorageMock.getItem.mockReturnValue(JSON.stringify(storedFavourites));

    const { result } = renderHook(() => useFavourites());

    expect(result.current.favourites.size).toBe(3);
    expect(result.current.isFavourited(1)).toBe(true);
    expect(result.current.isFavourited(4)).toBe(false);
  });

  it("toggles favourite status", () => {
    const { result } = renderHook(() => useFavourites());

    act(() => {
      result.current.toggleFavourite(1);
    });

    expect(result.current.isFavourited(1)).toBe(true);
    expect(result.current.getFavouritesCount()).toBe(1);

    act(() => {
      result.current.toggleFavourite(1);
    });

    expect(result.current.isFavourited(1)).toBe(false);
    expect(result.current.getFavouritesCount()).toBe(0);
  });

  it("adds and removes favourites", () => {
    const { result } = renderHook(() => useFavourites());

    act(() => {
      result.current.addFavourite(1);
      result.current.addFavourite(2);
    });

    expect(result.current.getFavouritesCount()).toBe(2);
    expect(result.current.getFavouritesList()).toEqual([1, 2]);

    act(() => {
      result.current.removeFavourite(1);
    });

    expect(result.current.getFavouritesCount()).toBe(1);
    expect(result.current.getFavouritesList()).toEqual([2]);
  });

  it("clears all favourites", () => {
    const { result } = renderHook(() => useFavourites());

    act(() => {
      result.current.addFavourite(1);
      result.current.addFavourite(2);
      result.current.clearFavourites();
    });

    expect(result.current.getFavouritesCount()).toBe(0);
    expect(result.current.getFavouritesList()).toEqual([]);
  });

  it("saves to localStorage when favourites change", () => {
    const { result } = renderHook(() => useFavourites());

    act(() => {
      result.current.addFavourite(1);
    });

    expect(localStorageMock.setItem).toHaveBeenCalledWith(
      "favourites",
      JSON.stringify([1])
    );
  });
});
