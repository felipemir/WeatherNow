"use client";

import { useCallback, useEffect, useState } from "react";

export function useLocalStorage<T>(
  key: string,
  initialValue: T,
): [T, (value: T | ((prev: T) => T)) => void, boolean] {
  const [value, setValue] = useState<T>(initialValue);
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    try {
      const item = window.localStorage.getItem(key);
      if (item !== null) {
        setValue(JSON.parse(item) as T);
      }
    } catch {
      setValue(initialValue);
    } finally {
      setIsHydrated(true);
    }
  }, [key, initialValue]);

  const persistValue = useCallback(
    (next: T | ((prev: T) => T)) => {
      setValue((current) => {
        const newValue =
          typeof next === "function" ? (next as (prev: T) => T)(current) : next;

        try {
          if (typeof window !== "undefined") {
            window.localStorage.setItem(key, JSON.stringify(newValue));
          }
        } catch {
          // ignore write errors (ex.: storage desabilitado)
        }

        return newValue;
      });
    },
    [key],
  );

  return [value, persistValue, isHydrated];
}
