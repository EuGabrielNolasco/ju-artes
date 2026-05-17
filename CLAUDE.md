# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
# Requires Node 20+ via nvm
source ~/.nvm/nvm.sh && nvm use 20

npm run dev      # dev server at http://localhost:3000
npm run build    # production build (runs tsc + eslint + static export)
npm run lint     # ESLint only
npm start        # serve the production build
```

Always run `npm run build` after significant changes — it catches TypeScript errors and ESLint violations that the dev server does not surface.

## What this site is

A **vitrine-only** (no e-commerce) catalog for the artisan store "Ju Artes, Costura Criativa". Customers browse products and contact the artisan exclusively via WhatsApp. There is no cart, no checkout, no backend, and no database. All pages are statically exported.

## Architecture

### Pages
- `/` — Home (`src/app/page.tsx`): composes section components from `src/components/sections/`
- `/catalogo` — Catalog (`src/app/catalogo/page.tsx`): **Client Component** wrapped in `<Suspense>` because it uses `useSearchParams` to pre-filter by category from the URL (`?categoria=<slug>`)

### Data layer (static, no API)
- `src/data/products.ts` — `Product[]` array + `getFeaturedProducts()` + `getProductsByCategory(slug)`
- `src/data/categories.ts` — `Category[]` array + `getCategory(slug)`
- `src/config/site.ts` — single source of truth for name, WhatsApp number, Instagram handle, city

### Key utilities
- `src/lib/whatsapp.ts` — `buildWhatsAppUrl({ productName?, price?, customMessage? })`: always use this for WhatsApp links; never hardcode `wa.me` URLs
- `src/lib/format.ts` — `formatBRL(value: number)`: always use for prices; never interpolate `R$ ${price}`
- `src/lib/utils.ts` — `cn(...inputs)` helper (clsx + tailwind-merge)

### Global layout (`src/app/layout.tsx`)
Wraps every page with `Header`, `Footer`, and `WhatsAppFloatingButton`. Loads fonts via `next/font/google` and exposes them as CSS variables:
- `--font-cormorant` → `font-serif` (Cormorant Garamond — titles, pull-quotes, prices)
- `--font-jost` → `font-sans` (body copy, labels, nav)

### UI components (`src/components/ui/`)
Shadcn-style primitives authored manually (no Radix, no shadcn CLI): `Button`, `Badge`, `Card`, `Input`. All use `cva` from `class-variance-authority` for variants.

## Critical conventions

### Never import brand icons from lucide-react
`lucide-react@1.16+` removed Instagram and WhatsApp icons. Use the inline SVG components:
- `src/components/WhatsAppIcon.tsx`
- `src/components/InstagramIcon.tsx`

### TypeScript
Strict mode. `any` and `@ts-ignore` are banned — if the type is hard, the abstraction is wrong.

### All WhatsApp/Instagram links
Must have `target="_blank" rel="noopener noreferrer"`.

### "use client" boundary
Use only when the component needs browser APIs, state, effects, or `useSearchParams`. All section components on the home page are Server Components.

## Design system

Tailwind config (`tailwind.config.ts`) extends with:
- **Palette**: `terracotta` (primary), `copper` (accent), `sage`, `cream`, `sand`, `ink` (each with 50–900 or named scales)
- **Semantic aliases**: `primary`, `secondary`, `accent`, `muted`, `background`, `foreground`, `border`, `ring`
- **Shadows**: `shadow-warm`, `shadow-warm-lg`, `shadow-soft` (brown-toned, never gray)
- **Animations**: `animate-fade-in`, `animate-fade-in-up`, `animate-soft-pulse`, `animate-marquee`
- **Container**: centered, padded, max-width 1320px at 2xl

`globals.css` adds:
- `body::before` SVG noise texture (paper feel, `mix-blend-mode: multiply`)
- `.blob` utility for organic background shapes (`border-radius` + `filter: blur`)
- `::selection` in terracotta

## Updating content

All placeholder values to replace before launch:
| File | Field | Current placeholder |
|------|-------|-------------------|
| `src/config/site.ts` | `whatsappNumber` | `5584999999999` |
| `src/config/site.ts` | `instagram` / `instagramUrl` | `juartes_costuracriativa` |
| `src/app/layout.tsx` | `metadataBase` | `https://juartes.example.com` |
| `/public/og.png` | OG image | does not exist yet (1200×630) |

Product images: add to `/public/products/<product-id>.jpg` and update `ProductCard` to use `next/image` with `src={product.image}` once files exist.
