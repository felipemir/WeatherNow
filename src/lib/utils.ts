import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export type TemperatureUnit = "celsius" | "fahrenheit";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function convertTemperature(
  value: number,
  unit: TemperatureUnit,
): number {
  if (Number.isNaN(value)) {
    return value;
  }

  if (unit === "fahrenheit") {
    return (value * 9) / 5 + 32;
  }

  return value;
}

export function formatTemperature(
  value: number,
  unit: TemperatureUnit,
  options: Intl.NumberFormatOptions = { maximumFractionDigits: 0 },
): string {
  const converted = convertTemperature(value, unit);
  const formatted = new Intl.NumberFormat("pt-BR", options).format(converted);
  return unit === "fahrenheit" ? `${formatted} °F` : `${formatted} °C`;
}

export function formatDateTime(value: string | Date) {
  const date = typeof value === "string" ? new Date(value) : value;
  if (Number.isNaN(date.getTime())) {
    return "-";
  }

  return new Intl.DateTimeFormat("pt-BR", {
    day: "2-digit",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
  }).format(date);
}

export function formatShortDate(value: string | Date) {
  const date = typeof value === "string" ? new Date(value) : value;
  if (Number.isNaN(date.getTime())) {
    return "-";
  }

  return new Intl.DateTimeFormat("pt-BR", {
    weekday: "short",
    day: "2-digit",
    month: "short",
  }).format(date);
}

export function formatHour(value: string | Date) {
  const date = typeof value === "string" ? new Date(value) : value;
  if (Number.isNaN(date.getTime())) {
    return "-";
  }

  return new Intl.DateTimeFormat("pt-BR", {
    hour: "2-digit",
    minute: "2-digit",
  }).format(date);
}

export function getCityKey(city: string, country?: string | null) {
  return [city, country?.toUpperCase()]
    .filter(Boolean)
    .join(",")
    .toLowerCase();
}

export function titleCase(value: string) {
  return value
    .toLowerCase()
    .split(" ")
    .map((token) => token.charAt(0).toUpperCase() + token.slice(1))
    .join(" ");
}
