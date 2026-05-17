---
name: frontend-design
description: Cria interfaces frontend distintas, com nível de produção e alto padrão de design para o site Ju Artes — Costura Criativa. Use esta skill sempre que o usuário pedir para construir componentes, páginas, seções ou ajustar a identidade visual. Gera código React/Next.js + Tailwind polido, evitando estética genérica de "AI slop" e respeitando a identidade artesanal/aconchegante já estabelecida.
license: Based on Anthropic's official frontend-design skill (anthropics/claude-code), adapted for the Ju Artes project.
---

Esta skill guia a criação de interfaces frontend distintas, com nível de produção, para o catálogo-vitrine **Ju Artes — Costura Criativa**. O foco é implementar código real e funcional com atenção meticulosa aos detalhes estéticos, sempre coerente com a identidade artesanal-sofisticada já consolidada no projeto.

O usuário descreve o que precisa: um componente, uma seção, uma página, um ajuste visual. Pode incluir contexto sobre a peça, o público (clientes que compram artesanato) ou restrições técnicas.

## Identidade do projeto (não improvisar — herdar)

Antes de qualquer decisão visual, lembre-se: o Ju Artes já tem uma direção estética definida. Esta skill **não inventa do zero** — refina dentro do sistema existente.

- **Stack obrigatória**: Next.js 14 (App Router) + TypeScript estrito (proibido `any`) + Tailwind CSS + Lucide React. Componentes Shadcn-style em `src/components/ui/`.
- **Tipografia**: Cormorant Garamond (display, serifado, expõe peso editorial) + Jost (sans, corpo). Já configuradas via `next/font/google` em `src/app/layout.tsx` e expostas como `var(--font-cormorant)` / `var(--font-jost)`. **Não trocar fontes** sem pedido explícito do usuário.
- **Paleta** (definida em `tailwind.config.ts`): `terracotta` (principal `#B5654A`), `copper` (acento), `sage` (verde-mate), `cream` (fundos quentes), `sand` (base), `ink` (texto). Use as escalas 50–900 e aliases semânticos (`primary`, `muted`, `background`, `foreground`, `border`, `ring`).
- **Forma**: cantos arredondados generosos (`rounded-2xl`, `rounded-3xl`, `rounded-full` em botões). Sombras quentes (`shadow-warm`, `shadow-warm-lg`, `shadow-soft`) — nunca sombras cinzas neutras.
- **Texturas**: ruído SVG sutil no `body` (já aplicado em `globals.css`). Formas orgânicas via `.blob` utility para fundos. Divisores em onda (`WaveDivider`).
- **Animações**: keyframes existentes `fade-in`, `fade-in-up`, `soft-pulse`. Use `animation-delay` em sequência para reveals escalonados — não animar elementos isolados.
- **Voz**: pt-BR aconchegante, primeira pessoa quando faz sentido ("a Ju costura…"). Nada de marketing-speak. Frases curtas, com afeto.

## Pensar antes de codar

Para cada pedido, antes de escrever JSX:

- **Propósito**: o que esta interface resolve? É para um cliente decidir comprar uma bolsa, ou para reforçar a história da artesã?
- **Tom dentro do tom**: o Ju Artes já é "artesanal-sofisticado". A peça que você está construindo puxa mais para qual extremo? Editorial-revista? Brutalista-orgânico? Pastel-onírico? Industrial-utilitário? Escolha um vetor dentro do guarda-chuva da marca e comprometa-se.
- **Restrições**: o site é estático (sem backend, sem e-commerce). Toda interação termina no WhatsApp via `buildWhatsAppUrl`. Não inventar fluxos de carrinho.
- **Diferenciação**: qual é a coisa que a pessoa lembra depois de fechar a aba? Um detalhe ornamental? Um ritmo de tipografia? Um movimento na hero?

**CRÍTICO**: escolha uma direção conceitual clara e execute com precisão. Maximalismo orgânico e minimalismo refinado funcionam ambos — o que não funciona é meio-termo morno.

Depois implemente código funcional (React Server Components por padrão, `"use client"` só quando há estado/efeito/`useSearchParams`) que seja:

- Production-grade e funcional
- Visualmente marcante e memorável
- Coerente com o sistema visual do Ju Artes
- Refinado em cada espaçamento, cada peso de fonte, cada hover

## Diretrizes estéticas — específicas para o Ju Artes

### Tipografia
- **Display (Cormorant Garamond)** em títulos h1–h3, em itens ornamentais (numerais "01", "02"), em frases italicizadas curtas. Pesos 400/500. Permita `italic` em pedaços de frase para criar contraponto editorial.
- **Body (Jost)** em parágrafos, labels, navegação. Pesos 300/400/500. Letterspacing aberto (`tracking-[0.22em]` / `tracking-[0.28em]`) em labels uppercase pequenos — é uma assinatura do projeto.
- **Hierarquia**: misture tamanhos grandes (5xl–7xl no hero) com micro-tipografia. Não tenha medo de white space.
- **Nunca** introduza Inter, Roboto, Arial, Space Grotesk, ou qualquer fonte "tech".

### Cor e tema
- **Dominância terracota**, contrabalanceada por creme (fundo) e ink (texto). Use `copper` como acento sutil, `sage` como pausa visual ocasional.
- Botões primários: `bg-terracotta-500 text-cream-50`. Outline: borda terracota, fundo creme translúcido.
- **Não use** gradientes roxos, fundos brancos puros (use `cream-50` ou `sand`), nem cinza neutro para texto (use `ink`, `ink-soft`, `ink-muted`).
- Aproveite gradientes quentes terracota→copper em backdrops decorativos. Combine com a textura de papel já no body.

### Movimento
- **Page-load coreografado**: um hero com 3–4 elementos revelando em cascata (`animation-delay: 120ms, 240ms, 360ms`) gera mais impacto do que micro-interações espalhadas.
- **Hover sutil**: `hover:-translate-y-1`, `hover:shadow-warm-lg`, transições `transition-all` com duração natural (sem `duration-1000` exagerado).
- **Blobs e ondas** podem ter movimento suave (`animate-soft-pulse` no botão flutuante já é exemplo).
- **Não anime tudo**. Escolha 1–2 momentos altos por seção.

### Composição espacial
- **Assimetria intencional**: o hero usa `max-w-3xl` deslocado à esquerda, com blobs orgânicos quebrando a borda.
- **Sobreposição**: numerais `-top-5 left-8 absolute` saindo de cards (ver `HowToBuy`).
- **Generosa respiração**: `py-24` em seções, `gap-6`/`gap-12` em grids. Nunca aperte.
- **Container** custom (`max-w-screen-2xl: 1320px`) já configurado — use sempre `<div className="container">`.
- Quebre o grid quando fizer sentido: um elemento decorativo fora do container, um título italicizado em segunda linha, etc.

### Fundos e detalhes visuais
- **Atmosfera, não cor chapada**: combine `bg-cream-100/70` com blobs absolutos, gradientes radiais sutis, ou divisores em onda (`<WaveDivider />`).
- **Texturas**: a textura de papel global já vive em `body::before`. Para reforçar em uma seção, use opacidade muito baixa.
- **Ornamentos**: pontinhos `h-1.5 w-1.5 rounded-full bg-terracotta-500` em labels, numerais grandes em serifada, aspas decorativas em depoimentos, separadores `·` entre tags.
- **Sombras**: sempre quentes. Para um card flutuante: `shadow-soft`. Em hover: `shadow-warm-lg`.

## Regras do projeto que **não se negociam**

- **WhatsApp**: todo CTA de compra/contato usa `buildWhatsAppUrl(productName?, price?)` de `src/lib/whatsapp.ts` e abre em `target="_blank" rel="noopener noreferrer"`. Nunca harcodear `wa.me`.
- **Site config**: nome, número, instagram saem de `siteConfig` em `src/config/site.ts`. Nunca duplicar literais.
- **Preços**: sempre via `formatBRL(value)` de `src/lib/format.ts`. Nunca interpolar `R$ ${price}`.
- **Imagens**: até existirem fotos reais em `/public/products/`, usar placeholder com gradiente da categoria + inicial da peça (padrão de `ProductCard`).
- **Acessibilidade**: `aria-label` em botões só-ícone, `alt` em toda imagem, foco visível via `focus-visible:ring-2 focus-visible:ring-ring`.
- **Lucide brand icons removidos**: para WhatsApp e Instagram, use os SVGs em `src/components/WhatsAppIcon.tsx` e `src/components/InstagramIcon.tsx`. **Não importar** `Instagram`/`Whatsapp` de `lucide-react`.
- **Sem `any`** e sem `// @ts-ignore`. Se o tipo está difícil, é porque a abstração está errada.

## O que **nunca** fazer

- Trocar a paleta para roxo/azul/cinza neutro "porque está na moda".
- Trocar Cormorant/Jost por Inter, Space Grotesk, Geist, ou qualquer fonte default de starter Next.js.
- Adicionar carrinho, checkout, formulário de pagamento — o site é vitrine, fim.
- Colocar emoji em texto da UI (a menos que o usuário peça).
- Criar arquivos de documentação (`.md`) ou README sem pedido explícito.
- Adicionar comentários explicando o que o código faz (nomes já fazem isso).
- Importar bibliotecas pesadas (Framer Motion, GSAP, Material UI) para resolver o que CSS/Tailwind + keyframes já resolvem.

## Lembrete final

Interprete cada pedido como uma oportunidade de criar algo memorável dentro da linguagem visual já estabelecida. Não convergir para escolhas óbvias. Cada seção do Ju Artes deve respirar o mesmo afeto que uma peça costurada à mão respira — calma, intencional, sem pressa de impressionar.

Quando estiver em dúvida entre duas opções de design, pergunte: *"qual delas a Ju mostraria com mais orgulho para uma cliente?"*. Essa é a resposta.
