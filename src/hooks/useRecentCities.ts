"use client";

import { MAX_RECENT_CITIES, STORAGE_KEYS } from "@/lib/constants";
import { getCityKey } from "@/lib/utils";
import type { FavoriteCity, RecentCity } from "@/lib/zod-schemas";
import { useLocalStorage } from "@/hooks/useLocalStorage";

export function useRecentCities() {
  const [recent, setRecent, isReady] = useLocalStorage<RecentCity[]>(
    STORAGE_KEYS.recentCities,
    [],
  );

  const registerCity = (city: FavoriteCity) => {
    const id = getCityKey(city.city, city.country);
    setRecent((prev) => {
      const filtered = prev.filter((item) => item.id !== id);
      const next: RecentCity = {
        id,
        city: city.city,
        country: city.country,
        lat: city.lat,
        lon: city.lon,
        viewedAt: new Date().toISOString(),
      };
      return [next, ...filtered].slice(0, MAX_RECENT_CITIES);
    });
  };

  const clearRecent = () => setRecent([]);

  return {
    recent,
    registerCity,
    clearRecent,
    isReady,
  };
}
