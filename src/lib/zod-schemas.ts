import { z } from "zod";

export const weatherSchema = z.object({
  city: z.string(),
  country: z.string(),
  lat: z.number(),
  lon: z.number(),
  temp: z.number(),
  feelsLike: z.number(),
  humidity: z.number(),
  wind: z.number(),
  description: z.string(),
  icon: z.string(),
  updatedAt: z.string().datetime({ offset: true }),
});

export type WeatherResponse = z.infer<typeof weatherSchema>;

export const forecastSchema = z.object({
  city: z.string(),
  daily: z
    .array(
      z.object({
        date: z.string(),
        min: z.number(),
        max: z.number(),
        humidity: z.number(),
        icon: z.string(),
      }),
    )
    .min(1),
  hourly: z
    .array(
      z.object({
        time: z.string().datetime({ offset: true }),
        temp: z.number(),
        humidity: z.number(),
      }),
    )
    .min(1),
});

export type ForecastResponse = z.infer<typeof forecastSchema>;

export const favoriteCitySchema = z.object({
  id: z.string(),
  city: z.string(),
  country: z.string().optional().nullable(),
  lat: z.number().optional().nullable(),
  lon: z.number().optional().nullable(),
});

export type FavoriteCity = z.infer<typeof favoriteCitySchema>;

export const recentCitySchema = favoriteCitySchema.extend({
  viewedAt: z.string().datetime({ offset: true }),
});

export type RecentCity = z.infer<typeof recentCitySchema>;
