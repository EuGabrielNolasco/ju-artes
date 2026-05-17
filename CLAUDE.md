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
npm run db:migrate # npx prisma migrate dev — cria nova migration
npm run db:seed    # popula o banco com 12 produtos, 4 categorias, settings e vendas de exemplo
npm run db:studio  # Prisma Studio GUI em http://localhost:5555
```

**Configuração inicial (primeira vez):**
```bash
npm install
# Copiar .env.local com as credenciais do Neon (obter via: vercel env pull .env.local)
npm run db:seed
npm run dev
```

## O que é este projeto

Site-vitrine para a loja artesanal **Ju Artes, Costura Criativa**. Clientes navegam no catálogo e entram em contato pelo WhatsApp — sem carrinho nem checkout. O projeto tem duas camadas:

1. **Site público** (`/`, `/catalogo`) — vitrine artesanal, todos os dados vêm do banco PostgreSQL (Neon)
2. **Painel admin** (`/admin/*`) — área de gestão protegida por login (produtos, categorias, configurações de contato, registro de vendas)

**Deploy:** Vercel (projeto `ju-artes` em `gabriel-nolasco-s-projects`) conectado ao repositório GitHub. O banco é Neon Postgres provisionado via integração nativa da Vercel. Cada push para `main` trigga um novo deploy automaticamente.

## Arquitetura

### Páginas
| Rota | Tipo | Descrição |
|------|------|-----------|
| `/` | Server Component | Home — Hero, FeaturedProducts, Categories, About, Testimonials, HowToBuy |
| `/catalogo` | Server → Client | Server busca dados do banco, passa como props para `CatalogClient` |
| `/admin` | Server Component | Login — **fora** do layout de auth (evita redirect loop) |
| `/admin/(auth)/dashboard` | Server Component | Gráficos e totais |
| `/admin/(auth)/produtos` | Server Component | Listagem com toggle de disponibilidade inline |
| `/admin/(auth)/produtos/novo` | Server Component | Usa `ProductForm` (Client Component) |
| `/admin/(auth)/produtos/[slug]` | Server Component | Usa `ProductForm` pré-preenchido |
| `/admin/(auth)/categorias` | Server Component | Listagem de categorias |
| `/admin/(auth)/categorias/nova` | Server Component | Usa `CategoryForm` (Client Component) |
| `/admin/(auth)/categorias/[slug]` | Server Component | Usa `CategoryForm` pré-preenchido |
| `/admin/(auth)/configuracoes` | Server Component | Usa `SettingsForm` (Client Component) |
| `/admin/(auth)/vendas` | Server Component | Registro manual de vendas; usa `SaleForm` (Client Component) |

### Route group `(auth)`
Todas as páginas autenticadas ficam em `src/app/admin/(auth)/`. O layout em `src/app/admin/(auth)/layout.tsx` chama `requireAuth()`, que redireciona para `/admin` se a sessão for inválida. A página de login (`src/app/admin/page.tsx`) fica **fora** desse grupo intencionalmente — colocá-la dentro causaria loop infinito de redirecionamento.

### Admin mobile
`AdminShell` (`src/components/admin/AdminShell.tsx`) é um Client Component que controla o estado `open` do sidebar. Em mobile (`< lg`): sidebar escondida com `-translate-x-full`, botão hambúrguer no top bar abre com `translate-x-0`. Em desktop: sidebar sempre visível via `lg:relative lg:translate-x-0`.

### Banco de dados (PostgreSQL + Prisma 5)
- **Produção:** Neon Postgres (provisionado via Vercel Marketplace)
- **Local:** banco Neon remoto acessado via credenciais em `.env.local`
- Schema: `prisma/schema.prisma`
- Seed: `prisma/seed.ts`
- Cliente singleton: `src/lib/db.ts` — padrão `globalThis` para evitar connection leaks em hot-reload

**Models:**
- `Product` — slug (unique), name, description, price, category (slug ref), image, featured, available, materials (JSON string)
- `Category` — slug (unique), name, description, gradient (Tailwind classes), iconName
- `SiteSettings` — linha única (`id: "main"`), toda configuração de contato/marca
- `SaleRecord` — registros manuais de vendas; alimenta o gráfico de linha no dashboard

**Campo `materials`:** armazenado como JSON string. Sempre `JSON.parse()` ao ler, `JSON.stringify()` ao salvar.

### Fluxo de dados — site público

Todos os dados vêm do banco. Não existe `src/data/*.ts` com dados mockados.

```
layout.tsx (async)
  └─ getSettings()          → WhatsApp URL para Header
  └─ Header (Client)        → recebe whatsappUrl como prop
  └─ Footer (async)         → getSettings() + prisma.category.findMany()
  └─ WhatsAppFloatingButton → getSettings()

page.tsx (/)
  └─ Hero (async)           → prisma.product + prisma.category + getSettings()
  └─ FeaturedProducts       → prisma.product (featured) + buildCatMap()
  └─ Categories             → prisma.category + contagem de produtos disponíveis
  └─ HowToBuy               → getSettings()

page.tsx (/catalogo) (async)
  └─ prisma.product + prisma.category → toProductCardData() → CatalogClient (Client)
```

`src/lib/getSettings.ts` — função com `React.cache()` que busca `SiteSettings` uma vez por request, compartilhada por todos os Server Components.

### Tipos compartilhados (`src/lib/types.ts`)
```ts
ProductCardData  // shape passado para ProductCard (inclui gradient e categoryName do banco)
CategoryData     // shape passado para CatalogClient e CatalogFilters
```

### Utilitários de mapeamento (`src/lib/mapProduct.ts`)
- `buildCatMap(categories)` — cria `Record<slug, { name, gradient }>` para lookup O(1)
- `toProductCardData(prismaProduct, catMap)` — converte linha do Prisma em `ProductCardData`

Usar sempre esses helpers ao mapear produtos do banco para o ProductCard — evita lógica duplicada.

### Autenticação (iron-session)
- `src/lib/auth.ts` — `getSession()` e `requireAuth()`
- `middleware.ts` — protege `/admin/:path+` no edge; deixa `/admin` (login) passar sem verificação
- Credenciais via env vars (`ADMIN_USERNAME`, `ADMIN_PASSWORD`)
- Cookie: `ju-artes-admin`, criptografado com `SESSION_SECRET`

### Server Actions (`src/lib/actions/`)
| Arquivo | Exports | Tipo de retorno |
|---------|---------|-----------------|
| `auth.ts` | `loginAction`, `logoutAction` | `Promise<void>` |
| `products.ts` | `createProduct`, `updateProduct`, `deleteProduct`, `toggleProductAvailability` | `Promise<ProductFormState>` |
| `categories.ts` | `createCategory`, `updateCategory`, `deleteCategory` | `Promise<CategoryFormState>` |
| `settings.ts` | `getSettings`, `updateSettings` | `Promise<SettingsFormState>` |
| `sales.ts` | `createSale`, `deleteSale`, `getSalesByMonth` | `Promise<SaleFormState>` |

Actions usadas com `useFormState` têm assinatura `(prevState: State, formData: FormData) => Promise<State>`. Actions que redirecionam em caso de sucesso retornam o estado de erro e nunca chegam ao `return` após o `redirect()`.

### Feedback nos formulários admin
Todos os formulários usam `useFormState` do `react-dom` e exibem o componente `FormAlert` (`src/components/admin/FormAlert.tsx`) para mensagens de sucesso (verde) e erro (vermelho). Formulários que redirecionam em sucesso (produto, categoria) só exibem erro quando algo falha.

### Upload de imagens (Vercel Blob)
`createProduct` / `updateProduct` fazem upload via `@vercel/blob` (`put()`), que retorna uma URL pública permanente armazenada no campo `image` do banco. O `deleteProduct` remove o arquivo do Blob automaticamente (`del()`).

- **Produção:** funciona nativamente (filesystem do Vercel é read-only, o Blob resolve isso)
- **Local:** requer `BLOB_READ_WRITE_TOKEN` em `.env.local` (obtido via `vercel env pull`)
- **Store:** `ju-artes-images` (store_A0aRRe4oKcZvfd1b), região `iad1`, acesso público

**Exibição de imagens no `ProductCard`:**
- `product.image` começa com `https://` → renderiza com `next/image` (lazy, WebP automático)
- Outros valores → exibe gradiente da categoria + padrão SVG de costura + monograma

`next.config.mjs` permite o domínio `*.public.blob.vercel-storage.com` no `next/image`.

### Utilitários principais
- `src/lib/whatsapp.ts` — `buildWhatsAppUrl({ productName?, price?, customMessage?, settings? })`: sempre usar para links WhatsApp; nunca hardcodar `wa.me`. Passar `settings` de `getSettings()`.
- `src/lib/format.ts` — `formatBRL(value: number)`: sempre usar para preços; nunca interpolar `R$ ${price}`
- `src/lib/utils.ts` — `cn(...inputs)` (clsx + tailwind-merge)
- `src/lib/getSettings.ts` — `getSettings()` com `React.cache()`: busca `SiteSettings` do banco
- `src/lib/mapProduct.ts` — `toProductCardData()` + `buildCatMap()`

### Layout global (`src/app/layout.tsx`)
Async Server Component — busca settings e constrói `whatsappUrl`, passando para `Header`. `Footer` e `WhatsAppFloatingButton` buscam settings diretamente via `getSettings()`. As rotas admin têm seu próprio layout em `(auth)/layout.tsx` que usa `AdminShell`.

## Convenções críticas

### Nunca importar brand icons do lucide-react
`lucide-react@1.16+` removeu Instagram e WhatsApp. Usar:
- `src/components/WhatsAppIcon.tsx`
- `src/components/InstagramIcon.tsx`

### TypeScript
Strict mode. `any` e `@ts-ignore` proibidos.

### Todos os links WhatsApp/Instagram
Devem ter `target="_blank" rel="noopener noreferrer"`.

### Boundary `"use client"`
Usar apenas quando o componente precisa de estado, efeitos, APIs de browser ou `useSearchParams`. Todas as seções da home são Server Components. Formulários do admin (`ProductForm`, `CategoryForm`, `SettingsForm`, `SaleForm`) são Client Components por precisarem de `useFormState` e estado local.

### Header é Client Component
`Header` tem scroll detection e drawer state. Por isso aceita `whatsappUrl: string` como prop — o layout async faz `getSettings()` e passa a URL. Nunca chamar `buildWhatsAppUrl()` diretamente dentro do `Header`.

### Regex em atributos `pattern` de inputs HTML
Usar `[-a-z0-9]+` (hífem no início da classe) em vez de `[a-z0-9-]+`. Browsers modernos usam o modo Unicode `v` que trata `[a-z0-9-]` como ambíguo.

## Design system

`tailwind.config.ts` estende com:
- **Paleta**: `terracotta` (primária `#B5654A`), `copper` (acento), `sage`, `cream`, `sand`, `ink` — escalas 50–900 ou named scales
- **Aliases semânticos**: `primary`, `secondary`, `accent`, `muted`, `background`, `foreground`, `border`, `ring`
- **Sombras**: `shadow-warm`, `shadow-warm-lg`, `shadow-soft` (tons marrons — nunca cinza)
- **Animações**: `animate-fade-in`, `animate-fade-in-up`, `animate-soft-pulse`, `animate-marquee`
- **Container**: centralizado, paddado, max-width 1320px em 2xl

`globals.css`: textura SVG noise no `body::before`, utility `.blob`, `::selection` em terracota.

Admin reutiliza a mesma paleta: `cream-50` de fundo, `terracotta-500` em botões primários, `shadow-soft` em cards.

## Variáveis de ambiente

| Variável | Arquivo | Finalidade |
|----------|---------|------------|
| `DATABASE_URL` | `.env` + Vercel | Neon Postgres (pooled) |
| `DATABASE_URL_UNPOOLED` | `.env.local` + Vercel | Neon Postgres (direto, para migrations) |
| `BLOB_READ_WRITE_TOKEN` | `.env.local` + Vercel | Token do Vercel Blob para upload de imagens |
| `ADMIN_USERNAME` | `.env.local` + Vercel | Login do admin |
| `ADMIN_PASSWORD` | `.env.local` + Vercel | Senha do admin |
| `SESSION_SECRET` | `.env.local` + Vercel | Chave de criptografia do cookie (mín. 32 chars) |

`.env` está commitado mas contém apenas placeholders. `.env.local` é gitignored (credenciais reais). Para sincronizar localmente: `vercel env pull .env.local`.

## Antes de ir para produção

| Local | Campo | Ação |
|-------|-------|------|
| Admin → Configurações | WhatsApp número | Trocar `5584999999999` pelo número real |
| Admin → Configurações | Instagram | Trocar pelo handle real |
| Admin → Configurações | Email | Adicionar email de contato |
| `src/app/layout.tsx` | `metadataBase` | Trocar `https://juartes.example.com` pelo domínio real |
| `/public/og.png` | OG image | Criar imagem 1200×630 |
| Vercel → Settings | `ADMIN_PASSWORD` | Trocar `juartes2024` por senha forte |
| Vercel → Settings | `SESSION_SECRET` | Gerar 32+ chars aleatórios |

Qualquer mudança em contato ou catálogo feita no admin reflete imediatamente no site sem deploy.
