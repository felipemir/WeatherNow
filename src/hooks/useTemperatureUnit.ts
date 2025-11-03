"use client";

import { STORAGE_KEYS } from "@/lib/constants";
import type { TemperatureUnit } from "@/lib/utils";
import { useLocalStorage } from "@/hooks/useLocalStorage";

const DEFAULT_UNIT: TemperatureUnit = "celsius";

export function useTemperatureUnit() {
  const [unit, setUnit, isReady] = useLocalStorage<TemperatureUnit>(
    STORAGE_KEYS.temperatureUnit,
    DEFAULT_UNIT,
  );

  const toggleUnit = () => {
    setUnit((current) => (current === "celsius" ? "fahrenheit" : "celsius"));
  };

  return {
    unit,
    setUnit,
    toggleUnit,
    isReady,
  };
}
