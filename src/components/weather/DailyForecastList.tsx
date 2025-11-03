import { Card } from "@/components/ui/card";
import { STRINGS } from "@/lib/constants";
import { formatShortDate, type TemperatureUnit, formatTemperature } from "@/lib/utils";
import type { ForecastResponse } from "@/lib/zod-schemas";
import Image from "next/image";

type DailyForecastListProps = {
  forecast: ForecastResponse;
  unit: TemperatureUnit;
};

export function DailyForecastList({ forecast, unit }: DailyForecastListProps) {
  return (
    <section aria-label={STRINGS.city.forecastTitle} className="space-y-4">
      <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
        {STRINGS.city.forecastTitle}
      </h2>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
        {forecast.daily.map((day) => (
          <Card
            key={day.date}
            className="flex flex-col items-center gap-2 bg-white/70 px-4 py-5 text-center dark:bg-slate-900/70"
          >
            <p className="text-sm font-medium text-slate-500 dark:text-slate-300">
              {formatShortDate(day.date)}
            </p>
            <Image
              src={`https://openweathermap.org/img/wn/${day.icon}@2x.png`}
              alt={`Ícone meteorológico para ${day.date}`}
              width={64}
              height={64}
            />
            <div className="flex items-center gap-2 text-sm">
              <span className="font-semibold text-slate-900 dark:text-white">
                {formatTemperature(day.max, unit, { maximumFractionDigits: 0 })}
              </span>
              <span className="text-slate-500 dark:text-slate-300">
                {formatTemperature(day.min, unit, { maximumFractionDigits: 0 })}
              </span>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              {STRINGS.city.humidity}: {day.humidity}%
            </p>
          </Card>
        ))}
      </div>
    </section>
  );
}
