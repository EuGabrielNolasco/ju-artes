# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
# Requires Node 20+ via nvm
source ~/.nvm/nvm.sh && nvm use 20

npm run dev        # dev server at http://localhost:3000
npm run build      # production build — always run after changes (catches TS + ESLint)
npm run lint       # ESLint only
npm start          # serve the production build

# Database
npm run db:migrate # npx prisma migrate dev — apply schema changes
npm run db:seed    # populate DB with 12 products, 4 categories, settings, sample sales
npm run db:studio  # Prisma Studio GUI at http://localhost:5555
```

**First-time setup:**
```bash
npm install
npm run db:seed    # creates prisma/dev.db and populates it
npm run dev
```

## What this project is

A catalog website ("vitrine") for the artisan store **Ju Artes, Costura Criativa**. Customers browse products and contact the artisan via WhatsApp — no cart, no checkout. The site has two distinct layers:

1. **Public site** (`/`, `/catalogo`) — artisan-aesthetic storefront, reads all data from SQLite
2. **Admin panel** (`/admin/*`) — password-protected management area for products, categories, settings, and sales tracking

## Architecture

### Pages
| Route | Type | Description |
|-------|------|-------------|
| `/` | Server Component | Home — Hero, FeaturedProducts, Categories, About, Testimonials, HowToBuy |
| `/catalogo` | Server → Client | Server fetches products+categories from DB, passes as props to `CatalogClient` |
| `/admin` | Server Component | Login page — **outside** the auth layout, no session check here |
| `/admin/(auth)/dashboard` | Server Component | Charts + stats |
| `/admin/(auth)/produtos` | Server Component | Product list with inline toggle actions |
| `/admin/(auth)/produtos/novo` | Server Component | Uses `ProductForm` (Client Component) |
| `/admin/(auth)/produtos/[slug]` | Server Component | Uses `ProductForm` pre-filled |
| `/admin/(auth)/categorias` | Server Component | Category list |
| `/admin/(auth)/categorias/nova` | Server Component | Uses `CategoryForm` (Client Component) |
| `/admin/(auth)/categorias/[slug]` | Server Component | Uses `CategoryForm` pre-filled |
| `/admin/(auth)/configuracoes` | Server Component | Site settings form |
| `/admin/(auth)/vendas` | Server Component | Sales log — uses `SaleForm` (Client Component) |

### Route group `(auth)`
All admin pages that require authentication live under `src/app/admin/(auth)/`. The layout at `src/app/admin/(auth)/layout.tsx` calls `requireAuth()`, which redirects to `/admin` if the session cookie is invalid. The login page at `src/app/admin/page.tsx` is intentionally **outside** this group — putting it inside would cause an infinite redirect loop.

### Database (SQLite + Prisma 5)
- File: `prisma/dev.db` (ignored by git)
- Schema: `prisma/schema.prisma`
- Seed: `prisma/seed.ts` (run via `npm run db:seed`)
- Client singleton: `src/lib/db.ts` — uses `globalThis` pattern to avoid hot-reload connection leaks

**Models:**
- `Product` — slug (unique), name, description, price, category (slug ref), image, featured, available, materials (JSON string)
- `Category` — slug (unique), name, description, gradient (Tailwind classes), iconName
- `SiteSettings` — single row (`id: "main"`), all contact/brand config
- `SaleRecord` — manual sale entries logged by admin; drives the line chart on dashboard

**`materials` field:** stored as JSON string (`"[\"Linho natural\",\"Alças reforçadas\"]"`). Always `JSON.parse()` before use, `JSON.stringify()` before save.

### Authentication (iron-session)
- `src/lib/auth.ts` — `getSession()` and `requireAuth()` helpers
- `middleware.ts` — protects `/admin/:path+` at the edge; passes `/admin` (login) through untouched
- Credentials read from env vars (`ADMIN_USERNAME`, `ADMIN_PASSWORD`)
- Session cookie: `ju-artes-admin`, encrypted with `SESSION_SECRET`

### Server Actions (`src/lib/actions/`)
| File | Exports |
|------|---------|
| `auth.ts` | `loginAction`, `logoutAction` |
| `products.ts` | `createProduct`, `updateProduct`, `deleteProduct`, `toggleProductAvailability` |
| `categories.ts` | `createCategory`, `updateCategory`, `deleteCategory` |
| `settings.ts` | `getSettings`, `updateSettings` |
| `sales.ts` | `createSale`, `deleteSale`, `getSalesByMonth` |

All actions used directly in `<form action>` must return `Promise<void>`. When wrapping an action that returns data, create a void wrapper in the page file with `"use server"`.

### Data flow — public site
Home sections (`FeaturedProducts`, `Categories`, `Hero`) are `async` Server Components that query Prisma directly. The catalog page (`src/app/catalogo/page.tsx`) queries the DB server-side and passes serialised data as props to `CatalogClient` (a Client Component that handles filtering/sorting with `useState`/`useMemo`).

`src/lib/getSettings.ts` exports a `React.cache`-wrapped function that fetches `SiteSettings` once per request, shared across all Server Components that need it.

### Key utilities
- `src/lib/whatsapp.ts` — `buildWhatsAppUrl({ productName?, price?, customMessage?, settings? })`: always use this for WhatsApp links; never hardcode `wa.me` URLs. Pass `settings` from `getSettings()` to use DB values.
- `src/lib/format.ts` — `formatBRL(value: number)`: always use for prices; never interpolate `R$ ${price}`
- `src/lib/utils.ts` — `cn(...inputs)` (clsx + tailwind-merge)

### Global layout (`src/app/layout.tsx`)
Wraps the public site with `Header`, `Footer`, and `WhatsAppFloatingButton`. Admin routes get their own layout from `(auth)/layout.tsx` — the root layout renders around that too (fonts, body background), but the Header/Footer are not shown.

## Critical conventions

### Never import brand icons from lucide-react
`lucide-react@1.16+` removed Instagram and WhatsApp icons. Use:
- `src/components/WhatsAppIcon.tsx`
- `src/components/InstagramIcon.tsx`

### TypeScript
Strict mode. `any` and `@ts-ignore` are banned.

### All WhatsApp/Instagram links
Must have `target="_blank" rel="noopener noreferrer"`.

### `"use client"` boundary
Use only for components that need state, effects, browser APIs, or `useSearchParams`. All home sections are Server Components. Admin forms (`ProductForm`, `CategoryForm`, `SaleForm`) are Client Components because they need local state for image preview and controlled inputs.

### Image uploads
`createProduct` / `updateProduct` write uploaded files to `public/products/<slug>.<ext>` via `fs.writeFile`. The stored `image` field is the public path `/products/<slug>.<ext>`. `ProductCard` renders a gradient placeholder when the file doesn't exist — swap to `next/image` once real photos are available.

## Design system

Tailwind config (`tailwind.config.ts`) extends with:
- **Palette**: `terracotta` (primary `#B5654A`), `copper` (accent), `sage`, `cream`, `sand`, `ink` — each with 50–900 or named scales
- **Semantic aliases**: `primary`, `secondary`, `accent`, `muted`, `background`, `foreground`, `border`, `ring`
- **Shadows**: `shadow-warm`, `shadow-warm-lg`, `shadow-soft` (brown-toned — never use gray shadows)
- **Animations**: `animate-fade-in`, `animate-fade-in-up`, `animate-soft-pulse`, `animate-marquee`
- **Container**: centered, padded, max-width 1320px at 2xl

`globals.css`: `body::before` SVG noise texture, `.blob` utility, terracotta `::selection`.

Admin UI reuses the same palette: `cream-50` backgrounds, `terracotta-500` primary buttons, `ink` text, `shadow-soft` cards.

## Environment variables

| Variable | Where | Purpose |
|----------|-------|---------|
| `DATABASE_URL` | `.env` | SQLite path — `file:./dev.db` (relative to schema) |
| `ADMIN_USERNAME` | `.env.local` | Admin login username |
| `ADMIN_PASSWORD` | `.env.local` | Admin login password |
| `SESSION_SECRET` | `.env.local` | iron-session encryption key (min 32 chars) |

`.env` is committed (contains only `DATABASE_URL`, no secrets). `.env.local` is gitignored.

## Placeholders to replace before launch

| Location | Field | Current value |
|----------|-------|---------------|
| Admin → Configurações | WhatsApp número | `5584999999999` |
| Admin → Configurações | Instagram | `juartes_costuracriativa` |
| `src/app/layout.tsx` | `metadataBase` | `https://juartes.example.com` |
| `/public/og.png` | OG image | missing (create 1200×630) |
| `.env.local` | `ADMIN_PASSWORD` | `juartes2024` — change before deploy |
| `.env.local` | `SESSION_SECRET` | replace with 32+ random chars |

After changing WhatsApp/Instagram in Admin → Configurações, values update live on the public site without any code change.
