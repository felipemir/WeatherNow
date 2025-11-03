"use client";

import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { STRINGS } from "@/lib/constants";
import { formatTemperature, type TemperatureUnit } from "@/lib/utils";
import type { WeatherResponse } from "@/lib/zod-schemas";
import { useRecentCities } from "@/hooks/useRecentCities";
import { weatherQueryOptions } from "@/lib/api";
import { useQueries } from "@tanstack/react-query";
import Link from "next/link";

type RecentSearchesProps = {
  temperatureUnit: TemperatureUnit;
};

export function RecentSearches({ temperatureUnit }: RecentSearchesProps) {
  const { recent, isReady } = useRecentCities();

  const queries = useQueries({
    queries: isReady
      ? recent.map((item) => ({
          ...weatherQueryOptions(item.city),
          enabled: !!item.city,
          select: (data: WeatherResponse) => ({ data, item }),
        }))
      : [],
  });

  if (!isReady) {
    return (
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 3 }).map((_, index) => (
          <Skeleton key={index} className="h-32 rounded-3xl" />
        ))}
      </div>
    );
  }

  if (!recent.length) {
    return (
      <p className="text-sm text-slate-500 dark:text-slate-400">
        {STRINGS.home.emptyRecent}
      </p>
    );
  }

  return (
    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
      {queries.map((query, index) => {
        const fallback = recent[index];

        if (query.isPending) {
          return <Skeleton key={fallback.id} className="h-32 rounded-3xl" />;
        }

        if (query.error) {
          return (
            <Card
              key={fallback.id}
              className="flex h-32 flex-col justify-between px-5 py-4"
            >
              <div>
                <p className="text-sm font-semibold">{fallback.city}</p>
                {fallback.country ? (
                  <span className="text-xs text-slate-500">
                    {fallback.country}
                  </span>
                ) : null}
              </div>
              <p className="text-xs text-red-500">
                {STRINGS.errors.generic}
              </p>
            </Card>
          );
        }

        const payload = query.data;
        if (!payload) {
          return null;
        }

        return (
          <Link
            key={payload.item.id}
            href={`/city/${encodeURIComponent(payload.data.city)}`}
            className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 focus-visible:ring-offset-2"
          >
            <Card className="flex h-32 flex-col justify-between px-5 py-4 transition hover:border-sky-200 hover:shadow-md">
              <div>
                <p className="text-sm font-semibold text-slate-900 dark:text-white">
                  {payload.data.city}
                </p>
                <p className="text-xs text-slate-500 dark:text-slate-300">
                  {payload.data.country}
                </p>
              </div>
              <p className="text-lg font-bold text-sky-500 dark:text-sky-300">
                {formatTemperature(payload.data.temp, temperatureUnit, {
                  maximumFractionDigits: 0,
                })}
              </p>
            </Card>
          </Link>
        );
      })}
    </div>
  );
}
