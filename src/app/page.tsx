import { HomeRecentSection } from "@/components/home/home-recent-section";
import { Button } from "@/components/ui/button";
import { STRINGS } from "@/lib/constants";
import Link from "next/link";

export default function Home() {
  return (
    <div className="space-y-12">
      <section className="rounded-3xl bg-gradient-to-br from-sky-500/10 via-sky-500/5 to-transparent px-8 py-10 shadow-sm">
        <div className="max-w-3xl space-y-6">
          <h1 className="text-3xl font-semibold leading-tight text-slate-900 dark:text-white md:text-4xl">
            {STRINGS.home.headline}
          </h1>
          <p className="text-lg text-slate-600 dark:text-slate-300">
            {STRINGS.home.description}
          </p>
          <div className="flex flex-wrap items-center gap-3 text-sm text-slate-600 dark:text-slate-300">
            <FeaturePill label="Informações em tempo real" />
            <FeaturePill label="Previsão estendida de 5 dias" />
            <FeaturePill label="Gráficos dinâmicos de temperatura e umidade" />
            <FeaturePill label="Favoritos e histórico local" />
          </div>
          <div className="flex flex-wrap gap-3">
            <Button asChild>
              <Link href="/city/Manaus">Ver clima em Manaus</Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/favorites">{STRINGS.nav.favorites}</Link>
            </Button>
          </div>
        </div>
      </section>

      <HomeRecentSection />
    </div>
  );
}

function FeaturePill({ label }: { label: string }) {
  return (
    <span className="rounded-full bg-white/60 px-3 py-1 text-xs font-medium uppercase tracking-wide text-slate-600 backdrop-blur dark:bg-slate-900/60 dark:text-slate-300">
      {label}
    </span>
  );
}
