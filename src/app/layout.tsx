import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "@/styles/globals.css";
import { SiteHeader } from "@/components/layout/site-header";
import { Providers } from "@/components/providers/providers";
import { APP_DESCRIPTION, APP_NAME } from "@/lib/constants";
import { cn } from "@/lib/utils";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: APP_NAME,
  description: APP_DESCRIPTION,
  applicationName: APP_NAME,
  metadataBase: new URL("https://weathernow.example.com"),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body
        className={cn(
          geistSans.variable,
          geistMono.variable,
          "min-h-screen bg-slate-50 font-sans text-slate-900 antialiased dark:bg-slate-950 dark:text-slate-100",
        )}
      >
        <Providers>
          <div className="flex min-h-screen flex-col">
            <SiteHeader />
            <main className="flex-1">
              <div className="mx-auto w-full max-w-6xl px-4 py-8 md:py-10">
                {children}
              </div>
            </main>
            <footer className="border-t border-slate-200/70 bg-white/70 py-4 text-center text-xs text-slate-500 backdrop-blur dark:border-slate-800/70 dark:bg-slate-900/70 dark:text-slate-400">
              &copy; {new Date().getFullYear()} {APP_NAME}
            </footer>
          </div>
        </Providers>
      </body>
    </html>
  );
}
