import { API_URL } from "@/lib/constants";
import { HttpResponse, http } from "msw";

type WeatherMock = {
  coord: { lat: number; lon: number };
  weather: Array<{ description: string; icon: string }>;
  main: {
    temp: number;
    feels_like: number;
    humidity: number;
    temp_min: number;
    temp_max: number;
  };
  wind: { speed: number };
  sys: { country: string };
  dt: number;
  name: string;
};

type ForecastMock = {
  city: {
    name: string;
    country: string;
  };
  list: Array<{
    dt: number;
    main: {
      temp: number;
      temp_min: number;
      temp_max: number;
      humidity: number;
    };
    weather: Array<{ description: string; icon: string }>;
  }>;
};

function toKey(city: string | null) {
  return city?.trim().toLowerCase() ?? "";
}

function createWeatherMock(options: {
  city: string;
  country: string;
  lat: number;
  lon: number;
  temp: number;
  feelsLike: number;
  humidity: number;
  windKmh: number;
  description: string;
  icon: string;
}): WeatherMock {
  const windMs = options.windKmh / 3.6;
  const now = Date.now();

  return {
    coord: { lat: options.lat, lon: options.lon },
    weather: [
      {
        description: options.description,
        icon: options.icon,
      },
    ],
    main: {
      temp: options.temp,
      feels_like: options.feelsLike,
      humidity: options.humidity,
      temp_min: options.temp - 1.5,
      temp_max: options.temp + 1.5,
    },
    wind: { speed: Number(windMs.toFixed(2)) },
    sys: { country: options.country },
    dt: Math.floor(now / 1000),
    name: options.city,
  };
}

function createForecastMock(options: {
  city: string;
  country: string;
  baseTemp: number;
  humidity: number;
  patterns: Array<{ description: string; icon: string }>;
}): ForecastMock {
  const start = Date.now();
  const totalEntries = 40; // 5 dias * 8 medições (3h)

  return {
    city: {
      name: options.city,
      country: options.country,
    },
    list: Array.from({ length: totalEntries }).map((_, index) => {
      const hoursAhead = index * 3;
      const timestamp = start + hoursAhead * 60 * 60 * 1000;
      const variation = Math.sin(index / 3) * 2;
      const temp = options.baseTemp + variation - Math.floor(index / 8) * 0.4;
      const humidity =
        options.humidity + Math.cos(index / 4) * 6 + Math.floor(index / 8);
      const pattern =
        options.patterns[Math.floor(index / 8) % options.patterns.length];

      return {
        dt: Math.floor(timestamp / 1000),
        main: {
          temp: Number(temp.toFixed(1)),
          temp_min: Number((temp - 1.8).toFixed(1)),
          temp_max: Number((temp + 1.8).toFixed(1)),
          humidity: Math.max(
            40,
            Math.min(100, Math.round(humidity)),
          ),
        },
        weather: [pattern],
      };
    }),
  };
}

const weatherDataset: Record<string, WeatherMock> = {
  manaus: createWeatherMock({
    city: "Manaus",
    country: "BR",
    lat: -3.13,
    lon: -60.02,
    temp: 30.5,
    feelsLike: 33,
    humidity: 78,
    windKmh: 12,
    description: "Parcialmente nublado",
    icon: "02d",
  }),
  "são paulo": createWeatherMock({
    city: "São Paulo",
    country: "BR",
    lat: -23.55,
    lon: -46.63,
    temp: 22.1,
    feelsLike: 22,
    humidity: 65,
    windKmh: 10,
    description: "Chuvas isoladas",
    icon: "10d",
  }),
  lisboa: createWeatherMock({
    city: "Lisboa",
    country: "PT",
    lat: 38.72,
    lon: -9.14,
    temp: 18.4,
    feelsLike: 18,
    humidity: 72,
    windKmh: 8,
    description: "Céu limpo",
    icon: "01d",
  }),
};

const forecastDataset: Record<string, ForecastMock> = {
  manaus: createForecastMock({
    city: "Manaus",
    country: "BR",
    baseTemp: 30,
    humidity: 80,
    patterns: [
      { description: "Pancadas de chuva", icon: "10d" },
      { description: "Nublado", icon: "04d" },
      { description: "Parcialmente nublado", icon: "02d" },
      { description: "Chuva leve", icon: "09d" },
      { description: "céu limpo", icon: "01d" },
    ],
  }),
  "são paulo": createForecastMock({
    city: "São Paulo",
    country: "BR",
    baseTemp: 22,
    humidity: 68,
    patterns: [
      { description: "Chuvas isoladas", icon: "10d" },
      { description: "Nublado", icon: "04d" },
      { description: "Parcialmente nublado", icon: "03d" },
      { description: "Céu limpo", icon: "01d" },
      { description: "Chuvisco", icon: "09d" },
    ],
  }),
  lisboa: createForecastMock({
    city: "Lisboa",
    country: "PT",
    baseTemp: 19,
    humidity: 65,
    patterns: [
      { description: "Céu claro", icon: "01d" },
      { description: "Parcialmente nublado", icon: "02d" },
      { description: "Nuvens dispersas", icon: "03d" },
      { description: "Nublado", icon: "04d" },
      { description: "Chuvas leves", icon: "10d" },
    ],
  }),
};

export const handlers = [
  http.get(`${API_URL}/data/2.5/weather`, ({ request }) => {
    const url = new URL(request.url);
    const queryCity = toKey(url.searchParams.get("q"));
    const payload = weatherDataset[queryCity];

    if (!payload) {
      return HttpResponse.json(
        { message: "Cidade não encontrada" },
        { status: 404 },
      );
    }

    return HttpResponse.json(payload);
  }),
  http.get(`${API_URL}/data/2.5/forecast`, ({ request }) => {
    const url = new URL(request.url);
    const queryCity = toKey(url.searchParams.get("q"));
    const payload = forecastDataset[queryCity];

    if (!payload) {
      return HttpResponse.json(
        { message: "Previsão indisponível" },
        { status: 404 },
      );
    }

    return HttpResponse.json(payload);
  }),
];
