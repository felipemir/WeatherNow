# WeatherNow — Frontend

Projeto autoral desenvolvido por **Felipe Miranda** como vitrine de front-end moderno para a plataforma WeatherNow. A aplicação utiliza Next.js (App Router) para acompanhar clima atual, previsão estendida, gráficos de temperatura/umidade e gerenciamento de cidades favoritas. O foco está em acessibilidade, desempenho e arquitetura limpa, resultando em uma base pronta para deploy na Vercel.

## ✨ Principais funcionalidades
- Busca de cidades com histórico local e navegação rápida.
- Página detalhada com clima atual, previsão diária de 5 dias e gráfico combinado (temperatura x umidade) das próximas horas.
- Favoritos persistidos em `localStorage`, com possibilidade de simular backend via MSW.
- Suporte a °C/°F com preferência armazenada localmente.
- Tema claro/escuro sensível ao `prefers-color-scheme` com toggle manual.

## 🛠️ Stack
- Next.js 16 (App Router) + TypeScript + React Server Components.
- Tailwind CSS 4 + tokens utilitários.
- TanStack Query para data fetching e cache com hidratação SSR.
- Zod para validar contratos das rotas `/weather/:city` e `/forecast/:city`.
- Recharts para visualização de temperatura/umidade.
- next-themes para gerenciamento do tema.
- MSW 2 (opcional) para mockar a API durante o desenvolvimento.

## 📁 Estrutura principal
```
src/
  app/
    page.tsx                # Home (busca + destaques)
    city/[slug]/page.tsx    # Detalhes da cidade + gráfico + favoritos
    favorites/page.tsx     # Lista de favoritos
    auth/login|register     # Formulários opcionais
  components/
    layout/…               # Header fixo, toggle de tema
    weather/…              # Cards climáticos, gráfico, favoritos
    ui/…                   # Botão, Input, Card, Alert, Skeleton
  hooks/                   # localStorage (favoritos, recentes, unidade)
  lib/                     # API client, Zod schemas, constantes, utils
  mocks/                   # Handlers MSW (quando BACKEND indisponível)
  styles/globals.css
```

## ⚙️ Pré-requisitos
- Node.js 18.18+ ou 20+
- npm (ou pnpm/yarn, se preferir)

## 🚀 Como rodar
1. Instale as dependências:
   ```bash
   npm install
   ```
2. Copie o arquivo de variáveis de ambiente e ajuste se necessário:
   ```bash
   cp .env.local.example .env.local
   ```
   - `NEXT_PUBLIC_API_URL`: base da API (padrão: `https://api.openweathermap.org`).
   - `NEXT_PUBLIC_APP_NAME`: nome exibido na UI (default: WeatherNow).
   - `NEXT_PUBLIC_OPENWEATHER_KEY`: sua chave da OpenWeather (obrigatória para dados reais).
   - `NEXT_PUBLIC_API_MOCKING=enabled`: ative para iniciar o MSW automaticamente.
3. Inicie o servidor de desenvolvimento:
   ```bash
   npm run dev
   ```
   Acesse [http://localhost:3000](http://localhost:3000).

### Mockando a API com MSW
Se o backend ainda não estiver disponível, o MSW intercepta as rotas definidas em `src/mocks/handlers.ts` (Manaus, São Paulo e Lisboa por padrão). Para habilitar:
- Defina `NEXT_PUBLIC_API_MOCKING=enabled` no `.env.local`.

## 📦 Scripts
- `npm run dev` — ambiente de desenvolvimento com hot reload.
- `npm run build` — build de produção.
- `npm run start` — executa o build gerado.
- `npm run lint` — validação ESLint (zero warnings permitidos).
- `npm run typecheck` — verificação de tipos com TypeScript.
- `npm run format` — formata com Prettier.

## 🧩 Decisões de arquitetura
- **TanStack Query + SSR**: páginas/sections recebem dados já pré-carregados quando possível (`prefetchQuery` + `HydrationBoundary`).
- **Validação com Zod**: toda resposta da API é verificada antes de chegar à UI, evitando estados inconsistentes.
- **Persistência local**: favoritos, buscas recentes e unidade de temperatura vivem em hooks leves que utilizam `localStorage`.
- **Componentização**: UI reutilizável (botões, cards), weather-specific (card, gráfico, header) e layout (header fixo, tema).
- **Acessibilidade**: semântica HTML adequada, `aria-labels`, foco visível e mensagens de erro amigáveis.

## 📊 Observabilidade de desempenho
- Cache de 5–10 minutos configurado nas queries (`staleTime`).
- Pré-carregamento de rotas Next e uso de `next/image` para ícones meteo.
- Evitamos contextos globais complexos, privilegiando hooks locais e memoização onde necessário.

## 🛂 Deploy
A aplicação está pronta para deploy na [Vercel](https://vercel.com/):
1. Configure as variáveis de ambiente no dashboard (`NEXT_PUBLIC_API_URL`, etc.).
2. Execute `npm run build` localmente para validar.
3. Suba o repositório e conecte na Vercel (ou use `vercel deploy`).

## 👨‍💻 Autor
- **Felipe Miranda** — Desenvolvimento completo do frontend (arquitetura, UI/UX, integração com OpenWeather, mocks e documentação).
- LinkedIn/GitHub (adicione aqui seus links preferidos para contato).

## 🖼️ Screenshots
Inclua capturas da Home, página da cidade e favoritos (por exemplo, pastas `public/screenshots`).

---
Feito com ☀️ por WeatherNow.
