import { CityContent } from "@/app/city/[slug]/city-content";
import { forecastQueryOptions, weatherQueryOptions } from "@/lib/api";
import { STRINGS } from "@/lib/constants";
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

export const dynamic = "force-dynamic";

type CityPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function CityPage({ params }: CityPageProps) {
  const { slug } = await params;

  if (!slug) {
    notFound();
  }

  const city = decodeURIComponent(slug);
  const queryClient = new QueryClient();

  await Promise.allSettled([
    queryClient.prefetchQuery(weatherQueryOptions(city)),
    queryClient.prefetchQuery(forecastQueryOptions(city)),
  ]);

  const dehydratedState = dehydrate(queryClient);

  return (
    <div className="space-y-8">
      <HydrationBoundary state={dehydratedState}>
        <CityContent city={city} />
      </HydrationBoundary>
    </div>
  );
}

export async function generateMetadata({
  params,
}: CityPageProps): Promise<Metadata> {
  const { slug } = await params;

  const city = decodeURIComponent(slug);
  return {
    title: `${city} • ${STRINGS.nav.title}`,
  };
}
