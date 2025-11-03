"use client";

import { initMSW } from "@/lib/init-msw";
import {
  FORECAST_STALE_TIME,
  WEATHER_STALE_TIME,
} from "@/lib/constants";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { ThemeProvider } from "next-themes";
import { useEffect, useState, type ReactNode } from "react";

export function Providers({ children }: { children: ReactNode }) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: WEATHER_STALE_TIME,
            gcTime: FORECAST_STALE_TIME * 6,
            refetchOnWindowFocus: false,
          },
        },
      }),
  );

  useEffect(() => {
    void initMSW();
  }, []);

  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <QueryClientProvider client={queryClient}>
        {children}
        {process.env.NODE_ENV === "development" ? (
          <ReactQueryDevtools initialIsOpen={false} />
        ) : null}
      </QueryClientProvider>
    </ThemeProvider>
  );
}
