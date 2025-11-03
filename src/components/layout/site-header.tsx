"use client";

import { ThemeToggle } from "@/components/layout/theme-toggle";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { STRINGS } from "@/lib/constants";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

export function SiteHeader() {
  const router = useRouter();
  const pathname = usePathname();
  const [search, setSearch] = useState("");

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const trimmed = search.trim();
    if (!trimmed) {
      return;
    }

    router.push(`/city/${encodeURIComponent(trimmed)}`);
    setSearch("");
  };

  return (
    <header className="sticky top-0 z-30 border-b border-slate-200/60 bg-white/70 backdrop-blur dark:border-slate-800/60 dark:bg-slate-900/70">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-4">
        <Link
          href="/"
          className="flex items-center gap-2 text-lg font-semibold text-slate-900 dark:text-white"
          aria-label={STRINGS.nav.title}
        >
          <LogoIcon />
          <span>{STRINGS.nav.title}</span>
        </Link>
        <form
          onSubmit={handleSubmit}
          className="flex w-full max-w-xl items-center gap-2"
        >
          <label htmlFor="city-search" className="sr-only">
            {STRINGS.search.label}
          </label>
          <Input
            id="city-search"
            name="city"
            placeholder={STRINGS.search.placeholder}
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            autoComplete="off"
          />
          <Button type="submit">{STRINGS.search.submit}</Button>
        </form>
        <nav className="flex items-center gap-2">
          <Link
            href="/favorites"
            className={cn(
              "rounded-full px-3 py-2 text-sm font-medium text-slate-600 transition hover:bg-slate-200/70 hover:text-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 dark:text-slate-300 dark:hover:bg-slate-800/70 dark:hover:text-white",
              pathname === "/favorites" &&
                "bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900",
            )}
          >
            {STRINGS.nav.favorites}
          </Link>
          <ThemeToggle />
        </nav>
      </div>
    </header>
  );
}

function LogoIcon() {
  return (
    <span
      aria-hidden="true"
      className="flex h-9 w-9 items-center justify-center rounded-2xl bg-gradient-to-br from-sky-500 to-indigo-500 text-white shadow-md"
    >
      ☀️
    </span>
  );
}
