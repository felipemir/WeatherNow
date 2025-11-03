import {
  FORECAST_STALE_TIME,
  API_URL,
  OPENWEATHER_API_KEY,
  OPENWEATHER_LANG,
  WEATHER_STALE_TIME,
} from "@/lib/constants";
import {
  forecastSchema,
  type ForecastResponse,
  weatherSchema,
  type WeatherResponse,
} from "@/lib/zod-schemas";
import { queryOptions } from "@tanstack/react-query";

type OpenWeatherWeatherResponse = {
  coord: { lat: number; lon: number };
  weather: Array<{ description: string; icon: string }>;
  main: {
    temp: number;
    feels_like: number;
    humidity: number;
    temp_min?: number;
    temp_max?: number;
  };
  wind: { speed: number };
  sys: { country: string };
  dt: number;
  name: string;
};

type OpenWeatherForecastEntry = {
  dt: number;
  main: {
    temp: number;
    temp_min: number;
    temp_max: number;
    humidity: number;
  };
  weather: Array<{ description: string; icon: string }>;
};

type OpenWeatherForecastResponse = {
  city: {
    name: string;
    country: string;
  };
  list: OpenWeatherForecastEntry[];
};

function assertApiKey() {
  if (!OPENWEATHER_API_KEY) {
    throw new Error("NEXT_PUBLIC_OPENWEATHER_KEY não configurada.");
  }
}

function createOpenWeatherUrl(path: string, city: string) {
  assertApiKey();
  const url = new URL(path, API_URL);
  url.searchParams.set("q", city);
  url.searchParams.set("appid", OPENWEATHER_API_KEY);
  url.searchParams.set("units", "metric");
  url.searchParams.set("lang", OPENWEATHER_LANG);
  return url;
}

async function fetchJson<T>(input: RequestInfo | URL, init?: RequestInit) {
  const response = await fetch(input, init);

  if (!response.ok) {
    const error = new Error(response.statusText);
    (error as Error & { status?: number }).status = response.status;
    throw error;
  }

  return (await response.json()) as T;
}

export async function getWeather(city: string) {
  const url = createOpenWeatherUrl("/data/2.5/weather", city);
  const data = await fetchJson<OpenWeatherWeatherResponse>(url, {
    next: { revalidate: WEATHER_STALE_TIME / 1000 },
  });

  const firstWeather = data.weather?.[0];

  const payload: WeatherResponse = weatherSchema.parse({
    city: data.name,
    country: data.sys.country,
    lat: data.coord.lat,
    lon: data.coord.lon,
    temp: data.main.temp,
    feelsLike: data.main.feels_like,
    humidity: data.main.humidity,
    wind: data.wind.speed * 3.6, // m/s -> km/h
    description: firstWeather?.description ?? "n/d",
    icon: firstWeather?.icon ?? "01d",
    updatedAt: new Date(data.dt * 1000).toISOString(),
  });

  return payload;
}

function aggregateDailyForecast(
  entries: OpenWeatherForecastEntry[],
): ForecastResponse["daily"] {
  const byDate = new Map<
    string,
    {
      min: number;
      max: number;
      humiditySum: number;
      count: number;
      icons: Record<string, number>;
    }
  >();

  entries.forEach((item) => {
    const date = new Date(item.dt * 1000).toISOString().split("T")[0];
    const existing =
      byDate.get(date) ?? {
        min: Number.POSITIVE_INFINITY,
        max: Number.NEGATIVE_INFINITY,
        humiditySum: 0,
        count: 0,
        icons: {},
      };

    existing.min = Math.min(existing.min, item.main.temp_min ?? item.main.temp);
    existing.max = Math.max(existing.max, item.main.temp_max ?? item.main.temp);
    existing.humiditySum += item.main.humidity;
    existing.count += 1;

    const icon = item.weather?.[0]?.icon ?? "01d";
    existing.icons[icon] = (existing.icons[icon] ?? 0) + 1;

    byDate.set(date, existing);
  });

  return Array.from(byDate.entries())
    .sort(([a], [b]) => (a < b ? -1 : 1))
    .slice(0, 5)
    .map(([date, stats]) => {
      const icon =
        Object.entries(stats.icons).sort((a, b) => b[1] - a[1])[0]?.[0] ??
        "01d";

      return {
        date,
        min: Number(stats.min.toFixed(1)),
        max: Number(stats.max.toFixed(1)),
        humidity: Math.round(stats.humiditySum / stats.count),
        icon,
      };
    });
}

export async function getForecast(city: string) {
  const url = createOpenWeatherUrl("/data/2.5/forecast", city);
  const data = await fetchJson<OpenWeatherForecastResponse>(url, {
    next: { revalidate: FORECAST_STALE_TIME / 1000 },
  });

  const daily = aggregateDailyForecast(data.list);
  const hourly = data.list.slice(0, 16).map((item) => ({
    time: new Date(item.dt * 1000).toISOString(),
    temp: item.main.temp,
    humidity: item.main.humidity,
  }));

  return forecastSchema.parse({
    city: data.city.name,
    daily,
    hourly,
  });
}

export const weatherQueryOptions = (city: string) =>
  queryOptions({
    queryKey: ["weather", city],
    queryFn: () => getWeather(city),
    staleTime: WEATHER_STALE_TIME,
    gcTime: WEATHER_STALE_TIME * 4,
    retry: 1,
  });

export const forecastQueryOptions = (city: string) =>
  queryOptions({
    queryKey: ["forecast", city],
    queryFn: () => getForecast(city),
    staleTime: FORECAST_STALE_TIME,
    gcTime: FORECAST_STALE_TIME * 4,
    retry: 1,
  });

export type { ForecastResponse, WeatherResponse };
