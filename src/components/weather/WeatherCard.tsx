import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { STRINGS } from "@/lib/constants";
import {
  formatDateTime,
  formatTemperature,
  titleCase,
  type TemperatureUnit,
} from "@/lib/utils";
import type { WeatherResponse } from "@/lib/zod-schemas";
import Image from "next/image";

type WeatherCardProps = {
  weather: WeatherResponse;
  unit: TemperatureUnit;
};

export function WeatherCard({ weather, unit }: WeatherCardProps) {
  return (
    <Card className="grid gap-6 md:grid-cols-[auto,1fr] md:items-center">
      <CardHeader className="md:col-span-1">
        <Badge aria-label={titleCase(weather.description)}>
          {titleCase(weather.description)}
        </Badge>
        <div className="mt-4 flex items-center gap-4">
          <Image
            src={`https://openweathermap.org/img/wn/${weather.icon}@2x.png`}
            alt={weather.description}
            width={96}
            height={96}
            priority
            className="drop-shadow-md"
          />
          <div>
            <CardTitle className="text-4xl font-bold">
              {formatTemperature(weather.temp, unit, { maximumFractionDigits: 1 })}
            </CardTitle>
            <CardDescription className="mt-2 text-base">
              {weather.city}, {weather.country}
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="md:col-span-1">
        <dl className="grid gap-3 text-sm sm:grid-cols-2">
          <div>
            <dt className="text-slate-500 dark:text-slate-400">
              {STRINGS.city.feelsLike}
            </dt>
            <dd className="text-base font-medium">
              {formatTemperature(weather.feelsLike, unit, {
                maximumFractionDigits: 1,
              })}
            </dd>
          </div>
          <div>
            <dt className="text-slate-500 dark:text-slate-400">
              {STRINGS.city.humidity}
            </dt>
            <dd className="text-base font-medium">{weather.humidity}%</dd>
          </div>
          <div>
            <dt className="text-slate-500 dark:text-slate-400">
              {STRINGS.city.wind}
            </dt>
            <dd className="text-base font-medium">
              {new Intl.NumberFormat("pt-BR", {
                maximumFractionDigits: 0,
              }).format(weather.wind)}{" "}
              km/h
            </dd>
          </div>
          <div>
            <dt className="text-slate-500 dark:text-slate-400">
              {STRINGS.city.updatedAt}
            </dt>
            <dd className="text-base font-medium">
              {formatDateTime(weather.updatedAt)}
            </dd>
          </div>
        </dl>
      </CardContent>
    </Card>
  );
}
