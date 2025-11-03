"use client";

import {
  CartesianGrid,
  ComposedChart,
  Legend,
  Line,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  Bar,
} from "recharts";
import { useCallback, useMemo } from "react";
import {
  convertTemperature,
  formatHour,
  formatTemperature,
  type TemperatureUnit,
} from "@/lib/utils";
import type { ForecastResponse } from "@/lib/zod-schemas";

type ForecastChartProps = {
  forecast: ForecastResponse;
  unit: TemperatureUnit;
};

type ChartDatum = {
  label: string;
  temp: number;
  humidity: number;
  rawTemp: number;
};

type TooltipPayload = {
  value: number;
  dataKey: string;
  payload: ChartDatum;
};

type CustomTooltipProps = {
  active?: boolean;
  payload?: TooltipPayload[];
  label?: string | number;
  unit: TemperatureUnit;
};

function CustomTooltip({ active, payload, label, unit }: CustomTooltipProps) {
  const labelText = label != null ? String(label) : undefined;

  if (!active || !payload?.length || !labelText) {
    return null;
  }

  const [tempPoint, humidityPoint] = payload;
  const temperatureLabel = tempPoint
    ? formatTemperature(tempPoint.payload.rawTemp, unit, {
        maximumFractionDigits: 1,
      })
    : null;

  const humidityLabel = humidityPoint
    ? `${humidityPoint.value.toFixed(0)}%`
    : null;

  return (
    <div className="rounded-2xl border border-slate-200 bg-white px-3 py-2 text-xs font-medium shadow dark:border-slate-700 dark:bg-slate-900">
      <p className="mb-1">{labelText}</p>
      {temperatureLabel ? (
        <p className="text-sky-600 dark:text-sky-300">
          Temperatura: {temperatureLabel}
        </p>
      ) : null}
      {humidityLabel ? (
        <p className="text-emerald-600 dark:text-emerald-300">
          Umidade: {humidityLabel}
        </p>
      ) : null}
    </div>
  );
}

export function ForecastChart({ forecast, unit }: ForecastChartProps) {
  const data: ChartDatum[] = useMemo(
    () =>
      forecast.hourly.slice(0, 24).map((item) => ({
        label: formatHour(item.time),
        temp: convertTemperature(item.temp, unit),
        humidity: item.humidity,
        rawTemp: item.temp,
      })),
    [forecast.hourly, unit],
  );

  const renderTooltip = useCallback(
    (props: Partial<CustomTooltipProps>) => (
      <CustomTooltip {...props} unit={unit} />
    ),
    [unit],
  );

  return (
    <div className="h-80 w-full">
      <ResponsiveContainer>
        <ComposedChart
          data={data}
          margin={{ top: 20, right: 20, bottom: 20, left: 0 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(148, 163, 184, 0.35)" />
          <XAxis
            dataKey="label"
            tick={{ fontSize: 12, fill: "rgb(100 116 139)" }}
          />
          <YAxis
            yAxisId="left"
            orientation="left"
            tick={{ fontSize: 12, fill: "rgb(100 116 139)" }}
            domain={["dataMin - 2", "dataMax + 2"]}
            label={{
              value: unit === "fahrenheit" ? "Temperatura (°F)" : "Temperatura (°C)",
              angle: -90,
              position: "insideLeft",
              fill: "rgb(100 116 139)",
              fontSize: 12,
            }}
          />
          <YAxis
            yAxisId="right"
            orientation="right"
            tick={{ fontSize: 12, fill: "rgb(100 116 139)" }}
            domain={[0, 100]}
            label={{
              value: "Umidade (%)",
              angle: 90,
              position: "insideRight",
              fill: "rgb(100 116 139)",
              fontSize: 12,
            }}
          />
          <Tooltip content={renderTooltip} />
          <Legend />
          <Bar
            yAxisId="right"
            dataKey="humidity"
            fill="rgba(59, 130, 246, 0.4)"
            radius={[6, 6, 0, 0]}
            name="Umidade"
          />
          <Line
            yAxisId="left"
            type="monotone"
            dataKey="temp"
            stroke="#f97316"
            strokeWidth={2}
            dot={{ r: 2 }}
            activeDot={{ r: 4 }}
            name="Temperatura"
          />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
}
