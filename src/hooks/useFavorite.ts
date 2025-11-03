"use client";

import { STORAGE_KEYS } from "@/lib/constants";
import { getCityKey } from "@/lib/utils";
import type { FavoriteCity } from "@/lib/zod-schemas";
import { useLocalStorage } from "@/hooks/useLocalStorage";

export function useFavorites() {
  const [favorites, setFavorites, isReady] = useLocalStorage<FavoriteCity[]>(
    STORAGE_KEYS.favorites,
    [],
  );

  const addFavorite = (city: FavoriteCity) => {
    const id = city.id || getCityKey(city.city, city.country);
    setFavorites((prev) => {
      const exists = prev.find((item) => item.id === id);
      if (exists) {
        return prev;
      }
      return [...prev, { ...city, id }];
    });
  };

  const removeFavorite = (id: string) => {
    setFavorites((prev) => prev.filter((item) => item.id !== id));
  };

  const toggleFavorite = (city: FavoriteCity) => {
    const id = city.id || getCityKey(city.city, city.country);
    setFavorites((prev) => {
      const exists = prev.some((item) => item.id === id);
      if (exists) {
        return prev.filter((item) => item.id !== id);
      }
      return [...prev, { ...city, id }];
    });
  };

  const isFavorite = (id: string) =>
    favorites.some((item) => item.id === id);

  return {
    favorites,
    addFavorite,
    removeFavorite,
    toggleFavorite,
    isFavorite,
    isReady,
  };
}
