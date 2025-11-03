import { FavoritesContent } from "@/app/favorites/favorites-content";
import { STRINGS } from "@/lib/constants";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: `${STRINGS.favorites.title} • ${STRINGS.nav.title}`,
};

export default function FavoritesPage() {
  return (
    <div className="space-y-6">
      <header className="space-y-2">
        <h1 className="text-3xl font-semibold text-slate-900 dark:text-white">
          {STRINGS.favorites.title}
        </h1>
        <p className="text-sm text-slate-600 dark:text-slate-300">
          Acompanhe rapidamente o clima das cidades que você mais acessa.
        </p>
      </header>
      <FavoritesContent />
    </div>
  );
}
