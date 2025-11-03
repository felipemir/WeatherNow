"use client";

import { Alert } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { STRINGS } from "@/lib/constants";
import { weatherQueryOptions } from "@/lib/api";
import { formatTemperature } from "@/lib/utils";
import type { WeatherResponse } from "@/lib/zod-schemas";
import { useFavorites } from "@/hooks/useFavorite";
import { useTemperatureUnit } from "@/hooks/useTemperatureUnit";
import { useQueries } from "@tanstack/react-query";
import Link from "next/link";

export function FavoritesContent() {
  const { favorites, removeFavorite, isReady } = useFavorites();
  const { unit } = useTemperatureUnit();

  const queries = useQueries({
    queries: isReady
      ? favorites.map((favorite) => ({
          ...weatherQueryOptions(favorite.city),
          enabled: !!favorite.city,
          select: (data: WeatherResponse) => ({ data, favorite }),
        }))
      : [],
  });

  if (!isReady) {
    return (
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 3 }).map((_, index) => (
          <Skeleton key={index} className="h-36 rounded-3xl" />
        ))}
      </div>
    );
  }

  if (!favorites.length) {
    return (
      <Alert className="flex flex-col gap-3 text-center sm:text-left">
        <p>{STRINGS.favorites.empty}</p>
        <Button asChild variant="primary" className="self-center sm:self-start">
          <Link href="/">Buscar cidades</Link>
        </Button>
      </Alert>
    );
  }

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {queries.map((query, index) => {
        const fallback = favorites[index];

        if (query.isPending) {
          return <Skeleton key={fallback.id} className="h-36 rounded-3xl" />;
        }

        if (query.error) {
          return (
            <Card key={fallback.id} className="flex h-36 flex-col justify-between px-5 py-4">
              <div>
                <p className="text-sm font-semibold text-slate-900 dark:text-white">
                  {fallback.city}
                </p>
                <p className="text-xs text-slate-500 dark:text-slate-300">
                  {fallback.country}
                </p>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-red-500">{STRINGS.errors.generic}</span>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => removeFavorite(fallback.id)}
                >
                  Remover
                </Button>
              </div>
            </Card>
          );
        }

        const payload = query.data;
        if (!payload) {
          return null;
        }

        return (
          <Card
            key={payload.favorite.id}
            className="flex h-36 flex-col justify-between px-5 py-4"
          >
            <div>
              <p className="text-sm font-semibold text-slate-900 dark:text-white">
                {payload.data.city}
              </p>
              <p className="text-xs text-slate-500 dark:text-slate-300">
                {payload.data.country}
              </p>
            </div>
            <div className="flex items-center justify-between">
              <p className="text-lg font-bold text-sky-500 dark:text-sky-300">
                {formatTemperature(payload.data.temp, unit, { maximumFractionDigits: 0 })}
              </p>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => removeFavorite(payload.favorite.id)}
              >
                Remover
              </Button>
            </div>
          </Card>
        );
      })}
    </div>
  );
}
