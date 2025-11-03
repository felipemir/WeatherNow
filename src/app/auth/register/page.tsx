import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { STRINGS } from "@/lib/constants";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: `Criar conta • ${STRINGS.nav.title}`,
};

export default function RegisterPage() {
  return (
    <div className="mx-auto flex max-w-md flex-col gap-6">
      <Card>
        <CardHeader>
          <CardTitle>Criar conta</CardTitle>
        </CardHeader>
        <CardContent>
          <form className="space-y-4" aria-label="Formulário de cadastro">
            <div className="space-y-2">
              <label htmlFor="name" className="text-sm font-medium text-slate-700 dark:text-slate-300">
                Nome completo
              </label>
              <Input id="name" name="name" placeholder="João Silva" required />
            </div>
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium text-slate-700 dark:text-slate-300">
                E-mail
              </label>
              <Input id="email" type="email" name="email" placeholder="seu@email.com" required />
            </div>
            <div className="space-y-2">
              <label htmlFor="password" className="text-sm font-medium text-slate-700 dark:text-slate-300">
                Senha
              </label>
              <Input id="password" type="password" name="password" required />
            </div>
            <Button type="submit" className="w-full">
              Criar conta
            </Button>
          </form>
          <p className="mt-4 text-center text-sm text-slate-500 dark:text-slate-400">
            Já possui login? {" "}
            <Link href="/auth/login" className="font-medium text-sky-600 hover:underline dark:text-sky-300">
              Entrar
            </Link>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
