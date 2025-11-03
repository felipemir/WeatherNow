export const APP_NAME = process.env.NEXT_PUBLIC_APP_NAME ?? "WeatherNow";

export const APP_DESCRIPTION =
  "Plataforma meteorológica WeatherNow com clima atual, previsão estendida e favoritos.";

export const API_URL =
  process.env.NEXT_PUBLIC_API_URL ?? "https://api.openweathermap.org";

export const OPENWEATHER_API_KEY = process.env.NEXT_PUBLIC_OPENWEATHER_KEY ?? "";
export const OPENWEATHER_LANG = "pt_br";

export const WEATHER_STALE_TIME = 1000 * 60 * 5; // 5 minutos
export const FORECAST_STALE_TIME = 1000 * 60 * 10; // 10 minutos

export const STORAGE_KEYS = {
  favorites: "weathernow:favorites",
  recentCities: "weathernow:recent-cities",
  temperatureUnit: "weathernow:temperature-unit",
};

export const MAX_RECENT_CITIES = 5;

export const STRINGS = {
  nav: {
    title: APP_NAME,
    favorites: "Favoritos",
  },
  search: {
    placeholder: "Buscar cidade (ex.: Manaus, AM)",
    submit: "Buscar",
    label: "Buscar cidade",
  },
  home: {
    headline: "Mantenha-se à frente das mudanças de clima",
    description:
      "Pesquise cidades, visualize detalhes do clima em tempo real e acompanhe previsões confiáveis.",
    recentTitle: "Buscas recentes",
    emptyRecent: "Faça uma busca para ver seu histórico aqui.",
  },
  city: {
    currentWeather: "Clima atual",
    forecastTitle: "Previsão diária",
    hourlyTitle: "Temperatura x Umidade",
    humidity: "Umidade",
    wind: "Vento",
    feelsLike: "Sensação térmica",
    updatedAt: "Atualizado em",
    empty: "Busque uma cidade para ver os detalhes do clima.",
  },
  favorites: {
    title: "Favoritos",
    empty: "Salve cidades favoritas para acessá-las rapidamente.",
  },
  errors: {
    generic: "Não foi possível carregar os dados. Tente novamente.",
    notFound: "Cidade não encontrada. Verifique o nome informado.",
    offline:
      "A API parece estar offline. Ative os mocks ou tente novamente mais tarde.",
  },
  units: {
    celsius: "°C",
    fahrenheit: "°F",
    toggleLabel: "Alternar entre Celsius e Fahrenheit",
  },
} as const;
