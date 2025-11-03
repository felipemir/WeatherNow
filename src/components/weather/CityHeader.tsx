import { FavoriteButton } from "@/components/weather/FavoriteButton";
import { STRINGS } from "@/lib/constants";
import type { TemperatureUnit } from "@/lib/utils";

type CityHeaderProps = {
  city: string;
  country?: string | null;
  lat?: number | null;
  lon?: number | null;
  unit: TemperatureUnit;
  onToggleUnit: (unit: TemperatureUnit) => void;
  isFavorite: boolean;
  isFavoriteDisabled?: boolean;
  onToggleFavorite: () => void;
};

export function CityHeader({
  city,
  country,
  lat,
  lon,
  unit,
  onToggleUnit,
  isFavorite,
  onToggleFavorite,
  isFavoriteDisabled,
}: CityHeaderProps) {
  return (
    <header className="flex flex-col gap-4 rounded-3xl bg-gradient-to-br from-sky-500/10 via-transparent to-transparent p-6 backdrop-blur-sm md:flex-row md:items-center md:justify-between">
      <div>
        <p className="text-sm uppercase tracking-wide text-slate-500 dark:text-slate-400">
          {STRINGS.city.currentWeather}
        </p>
        <h1 className="text-3xl font-semibold text-slate-900 dark:text-white">
          {city}
          {country ? (
            <span className="ml-2 text-lg font-normal text-slate-500 dark:text-slate-300">
              {country}
            </span>
          ) : null}
        </h1>
        {lat != null && lon != null ? (
          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            lat {lat.toFixed(2)} • lon {lon.toFixed(2)}
          </p>
        ) : null}
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <div
          role="group"
          aria-label={STRINGS.units.toggleLabel}
          className="flex rounded-full border border-slate-300 bg-white p-1 text-sm shadow-sm dark:border-slate-700 dark:bg-slate-900"
        >
          <ToggleButton
            label={STRINGS.units.celsius}
            active={unit === "celsius"}
            onClick={() => onToggleUnit("celsius")}
          />
          <ToggleButton
            label={STRINGS.units.fahrenheit}
            active={unit === "fahrenheit"}
            onClick={() => onToggleUnit("fahrenheit")}
          />
        </div>
        <FavoriteButton
          isActive={isFavorite}
          onClick={onToggleFavorite}
          disabled={isFavoriteDisabled}
        >
          {isFavorite ? "Remover favorito" : "Adicionar aos favoritos"}
        </FavoriteButton>
      </div>
    </header>
  );
}

type ToggleButtonProps = {
  label: string;
  active: boolean;
  onClick: () => void;
};

function ToggleButton({ label, active, onClick }: ToggleButtonProps) {
  return (
    <button
      type="button"
      className={`rounded-full px-3 py-1 font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 ${
        active
          ? "bg-sky-500 text-white shadow"
          : "text-slate-500 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"
      }`}
      aria-pressed={active}
      onClick={onClick}
    >
      {label}
    </button>
  );
}
