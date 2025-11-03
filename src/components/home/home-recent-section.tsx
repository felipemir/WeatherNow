"use client";

import { Button } from "@/components/ui/button";
import { STRINGS } from "@/lib/constants";
import { useTemperatureUnit } from "@/hooks/useTemperatureUnit";
import { RecentSearches } from "@/components/home/recent-searches";

export function HomeRecentSection() {
  const { unit, toggleUnit } = useTemperatureUnit();

  return (
    <section className="space-y-4">
      <div className="flex items-center justify-between gap-3">
        <div>
          <h2 className="text-xl font-semibold text-slate-900 dark:text-slate-100">
            {STRINGS.home.recentTitle}
          </h2>
        </div>
        <Button
          type="button"
          variant="ghost"
          onClick={toggleUnit}
          aria-label={STRINGS.units.toggleLabel}
          className="px-3 py-2 text-sm"
        >
          {unit === "celsius"
            ? `${STRINGS.units.celsius} • ${STRINGS.units.fahrenheit}`
            : `${STRINGS.units.fahrenheit} • ${STRINGS.units.celsius}`}
        </Button>
      </div>
      <RecentSearches temperatureUnit={unit} />
    </section>
  );
}
