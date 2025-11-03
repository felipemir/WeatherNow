"use client";

import { Alert } from "@/components/ui/alert";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { CityHeader } from "@/components/weather/CityHeader";
import { DailyForecastList } from "@/components/weather/DailyForecastList";
import { ForecastChart } from "@/components/weather/ForecastChart";
import { WeatherCard } from "@/components/weather/WeatherCard";
import { STRINGS } from "@/lib/constants";
import { forecastQueryOptions, weatherQueryOptions } from "@/lib/api";
import { getCityKey, type TemperatureUnit } from "@/lib/utils";
import type { FavoriteCity } from "@/lib/zod-schemas";
import { useFavorites } from "@/hooks/useFavorite";
import { useRecentCities } from "@/hooks/useRecentCities";
import { useTemperatureUnit } from "@/hooks/useTemperatureUnit";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";

type CityContentProps = {
  city: string;
};

export function CityContent({ city }: CityContentProps) {
  const weatherQuery = useQuery(weatherQueryOptions(city));
  const forecastQuery = useQuery(forecastQueryOptions(city));
  const { unit, setUnit } = useTemperatureUnit();
  const { toggleFavorite, isFavorite, isReady: favoritesReady } = useFavorites();
  const { registerCity } = useRecentCities();

  const weather = weatherQuery.data;
  const forecast = forecastQuery.data;

  useEffect(() => {
    if (!weather) {
      return;
    }

    const recentCity: FavoriteCity = {
      id: getCityKey(weather.city, weather.country),
      city: weather.city,
      country: weather.country,
      lat: weather.lat,
      lon: weather.lon,
    };

    registerCity(recentCity);
  }, [weather, registerCity]);

  const favoriteId = weather
    ? getCityKey(weather.city, weather.country)
    : getCityKey(city);

  const handleToggleFavorite = () => {
    if (!weather) {
      return;
    }

    toggleFavorite({
      id: favoriteId,
      city: weather.city,
      country: weather.country,
      lat: weather.lat,
      lon: weather.lon,
    });
  };

  const handleUnitChange = (selected: TemperatureUnit) => {
    setUnit(selected);
  };

  return (
    <div className="space-y-8">
      {weatherQuery.isPending ? (
        <Skeleton className="h-48 rounded-3xl" />
      ) : weatherQuery.error ? (
        <Alert>
          <p>
            {weatherQuery.error instanceof Error &&
            (weatherQuery.error as Error & { status?: number }).status === 404
              ? STRINGS.errors.notFound
              : STRINGS.errors.offline}
          </p>
        </Alert>
      ) : weather ? (
        <CityHeader
          city={weather.city}
          country={weather.country}
          lat={weather.lat}
          lon={weather.lon}
          unit={unit}
          onToggleUnit={handleUnitChange}
          isFavorite={favoritesReady && isFavorite(favoriteId)}
          isFavoriteDisabled={!favoritesReady}
          onToggleFavorite={handleToggleFavorite}
        />
      ) : null}

      {weather ? (
        <WeatherCard weather={weather} unit={unit} />
      ) : weatherQuery.isPending ? (
        <Skeleton className="h-64 rounded-3xl" />
      ) : null}

      <section className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>{STRINGS.city.hourlyTitle}</CardTitle>
          </CardHeader>
          <CardContent>
            {forecastQuery.isPending ? (
              <Skeleton className="h-64 rounded-3xl" />
            ) : forecastQuery.error ? (
              <Alert>{STRINGS.errors.generic}</Alert>
            ) : forecast ? (
              <ForecastChart forecast={forecast} unit={unit} />
            ) : null}
          </CardContent>
        </Card>
      </section>

      {forecast ? (
        <DailyForecastList forecast={forecast} unit={unit} />
      ) : null}
    </div>
  );
}
