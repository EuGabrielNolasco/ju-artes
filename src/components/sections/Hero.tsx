import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { WhatsAppIcon } from "@/components/WhatsAppIcon"
import { buildWhatsAppUrl } from "@/lib/whatsapp"
import { getFeaturedProducts, type Product } from "@/data/products"
import { categories } from "@/data/categories"
import { formatBRL } from "@/lib/format"
import { cn } from "@/lib/utils"

const marqueeItems = [
  "Feito à mão",
  "Tecidos selecionados",
  "Envio para todo o Brasil",
  "Peças exclusivas",
  "Costura artesanal",
  "Tiragem limitada",
]

const avatarLetters = ["M", "T", "C", "B"] as const
const avatarColors = ["#B5654A", "#C28C5C", "#DC9173", "#8B9670"] as const

function ProductTeaser({
  product,
  className,
}: {
  product: Product
  className?: string
}) {
  const category = categories.find((c) => c.slug === product.category)
  return (
    <article
      className={cn(
        "w-44 overflow-hidden rounded-2xl border border-cream-200/70 bg-cream-50 shadow-warm-lg",
        "transition-transform duration-300 hover:scale-[1.04] hover:rotate-0",
        className
      )}
    >
      <div
        className={cn(
          "relative flex aspect-[3/4] items-center justify-center bg-gradient-to-br",
          category?.gradient ?? "from-terracotta-300 to-copper-400"
        )}
      >
        <svg
          aria-hidden
          className="absolute inset-0 h-full w-full opacity-10"
        >
          <defs>
            <pattern
              id={`teaser-stitch-${product.id}`}
              x="0"
              y="0"
              width="14"
              height="14"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M7 0 L7 7 M0 7 L7 7"
                stroke="white"
                strokeWidth="0.7"
                fill="none"
              />
            </pattern>
          </defs>
          <rect
            width="100%"
            height="100%"
            fill={`url(#teaser-stitch-${product.id})`}
          />
        </svg>
        <span className="font-serif text-5xl text-cream-50/90 drop-shadow select-none">
          {product.name.charAt(0)}
        </span>
      </div>
      <div className="p-3 space-y-0.5">
        <p className="font-serif text-[0.82rem] leading-snug text-ink line-clamp-2">
          {product.name}
        </p>
        <p className="font-serif text-sm text-terracotta-600">
          {formatBRL(product.price)}
        </p>
      </div>
    </article>
  )
}

export function Hero() {
  const whatsappUrl = buildWhatsAppUrl()
  const featured = getFeaturedProducts().slice(0, 3)

  return (
    <section className="relative overflow-hidden">
      {/* Background blobs */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="blob absolute -top-36 -left-28 h-[560px] w-[560px] bg-terracotta-200" />
        <div className="blob absolute top-8 -right-36 h-[600px] w-[600px] bg-copper-200" />
        <div className="blob absolute -bottom-52 left-[28%] h-[480px] w-[480px] bg-sage-100" />
        <div className="absolute inset-0 bg-gradient-to-b from-sand-50/10 via-transparent to-cream-100/80" />
      </div>

      {/* Decorative large "J" */}
      <div
        aria-hidden
        className="pointer-events-none absolute right-[4%] top-[-2rem] select-none font-serif leading-none text-terracotta-500 hidden xl:block"
        style={{ fontSize: "30rem", opacity: 0.035 }}
      >
        J
      </div>

      <div className="container relative grid items-center gap-10 pt-16 pb-14 sm:pt-24 sm:pb-20 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16 lg:pt-32 lg:pb-28">
        {/* Left: Text content */}
        <div>
          <div className="animate-fade-in flex items-center gap-3">
            <span className="h-px w-10 bg-terracotta-400/70" />
            <p className="text-[0.68rem] uppercase tracking-[0.32em] text-copper-600">
              Costura artesanal · Natal, RN
            </p>
          </div>

          <h1 className="animate-fade-in-up mt-5 font-serif leading-[1.05] text-ink text-balance text-5xl sm:text-6xl lg:text-[3.6rem] xl:text-[4.2rem]">
            Cada ponto{" "}
            <em className="italic text-terracotta-600">carregado</em> de
            cuidado —{" "}
            <span className="not-italic text-copper-500">
              feito para durar com você.
            </span>
          </h1>

          <p
            className="animate-fade-in-up mt-6 max-w-lg text-base leading-relaxed text-ink-soft sm:text-lg"
            style={{ animationDelay: "140ms" }}
          >
            Bolsas, necessaires e peças para a casa costuradas ponto a ponto
            — quando uma peça se vai, ela não volta. Cada criação é única.
          </p>

          <div
            className="animate-fade-in-up mt-9 flex flex-wrap gap-3"
            style={{ animationDelay: "280ms" }}
          >
            <Link
              href="/catalogo"
              className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-terracotta-500 px-8 text-sm font-medium tracking-wide text-cream-50 shadow-warm transition-all hover:-translate-y-0.5 hover:bg-terracotta-600 hover:shadow-warm-lg"
            >
              Ver o Catálogo
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-12 items-center justify-center gap-2 rounded-full border border-terracotta-400/60 bg-cream-50/70 px-8 text-sm font-medium tracking-wide text-terracotta-700 backdrop-blur-sm transition-all hover:border-terracotta-500 hover:bg-cream-100"
            >
              <WhatsAppIcon className="h-4 w-4" />
              Falar com a Ju
            </Link>
          </div>

          {/* Social proof */}
          <div
            className="animate-fade-in-up mt-9 flex items-center gap-3"
            style={{ animationDelay: "420ms" }}
          >
            <div className="flex -space-x-1.5">
              {avatarLetters.map((letter, i) => (
                <span
                  key={letter}
                  className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border-2 border-sand-50 font-serif text-[0.72rem] text-cream-50 shadow-soft"
                  style={{ backgroundColor: avatarColors[i] }}
                >
                  {letter}
                </span>
              ))}
            </div>
            <p className="text-[0.8rem] text-ink-muted">
              <span className="font-medium text-ink">+50 clientes</span>{" "}
              satisfeitas em todo o Brasil
            </p>
          </div>
        </div>

        {/* Right: product collage — visible only on lg+ */}
        <div
          className="animate-fade-in relative hidden h-[460px] lg:block"
          style={{ animationDelay: "180ms" }}
        >
          {/* Dot grid backdrop */}
          <div
            aria-hidden
            className="absolute inset-8 -z-10 rounded-3xl opacity-20"
            style={{
              backgroundImage:
                "radial-gradient(circle, #B5654A 1.5px, transparent 1.5px)",
              backgroundSize: "26px 26px",
            }}
          />

          {featured[0] && (
            <ProductTeaser
              product={featured[0]}
              className="absolute left-4 top-0 z-20 -rotate-3"
            />
          )}
          {featured[1] && (
            <ProductTeaser
              product={featured[1]}
              className="absolute right-0 top-16 z-30 rotate-2"
            />
          )}
          {featured[2] && (
            <ProductTeaser
              product={featured[2]}
              className="absolute bottom-0 left-24 z-10 -rotate-1"
            />
          )}

          {/* "Costurado à mão" chip */}
          <div className="absolute bottom-6 right-0 z-40 flex items-center gap-2 rounded-full bg-cream-50/90 px-4 py-2 shadow-soft backdrop-blur-sm">
            <span className="h-1.5 w-1.5 rounded-full bg-terracotta-500" />
            <span className="text-[0.65rem] uppercase tracking-[0.22em] text-copper-600">
              Costurado à mão
            </span>
          </div>
        </div>
      </div>

      {/* Marquee trust strip */}
      <div className="overflow-hidden border-y border-terracotta-200/50 bg-terracotta-50/60 py-3.5">
        <div className="flex animate-marquee whitespace-nowrap">
          {[0, 1].map((set) => (
            <div key={set} className="flex shrink-0 items-center">
              {marqueeItems.map((item) => (
                <span
                  key={`${set}-${item}`}
                  className="flex items-center gap-6 px-7 text-[0.62rem] uppercase tracking-[0.28em] text-terracotta-700"
                >
                  <span className="h-1 w-1 shrink-0 rounded-full bg-terracotta-400" />
                  {item}
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
