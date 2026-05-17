import Image from "next/image"
import Link from "next/link"
import { Star } from "lucide-react"
import type { ProductCardData } from "@/lib/types"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { formatBRL } from "@/lib/format"
import { buildWhatsAppUrl } from "@/lib/whatsapp"
import { cn } from "@/lib/utils"

function hasRealImage(image: string): boolean {
  return image.startsWith("https://") || image.startsWith("http://")
}

type Props = { product: ProductCardData }

export function ProductCard({ product }: Props) {
  const whatsappUrl = buildWhatsAppUrl({
    productName: product.name,
    price: product.price,
  })
  const initial = product.name.charAt(0).toUpperCase()

  return (
    <article
      className={cn(
        "group relative flex flex-col overflow-hidden rounded-3xl border border-cream-300/60 bg-cream-50/95 shadow-soft",
        "transition-all duration-300 hover:-translate-y-1.5 hover:shadow-warm-lg hover:border-terracotta-200/50",
        !product.available && "opacity-90"
      )}
    >
      {/* Image area */}
      <div className="relative aspect-[4/5] overflow-hidden">
        {/* Gradiente sempre presente — fundo enquanto a foto carrega ou placeholder sem foto */}
        <div
          className={cn(
            "absolute inset-0 bg-gradient-to-br transition-transform duration-500 group-hover:scale-[1.04]",
            product.gradient || "from-terracotta-300 to-copper-400"
          )}
          aria-hidden
        />

        {hasRealImage(product.image) ? (
          /* Foto real (Vercel Blob) */
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          />
        ) : (
          /* Placeholder: padrão de costura + monograma */
          <>
            <svg aria-hidden className="absolute inset-0 h-full w-full" style={{ opacity: 0.09 }}>
              <defs>
                <pattern id={`stitch-${product.slug}`} x="0" y="0" width="18" height="18" patternUnits="userSpaceOnUse">
                  <path d="M9 0 L9 9 M0 9 L9 9" stroke="white" strokeWidth="0.8" fill="none" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill={`url(#stitch-${product.slug})`} />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="font-serif text-8xl font-light text-cream-50/80 drop-shadow select-none transition-transform duration-500 group-hover:scale-110">
                {initial}
              </span>
            </div>
          </>
        )}

        {/* Category badge */}
        {product.categoryName && (
          <Badge variant="soft" className="absolute left-4 top-4 bg-cream-50/95 text-ink-soft shadow-soft">
            {product.categoryName}
          </Badge>
        )}

        {/* Featured star */}
        {product.featured && product.available && (
          <span className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full bg-cream-50/90 shadow-soft" aria-label="Destaque da estação">
            <Star className="h-3.5 w-3.5 fill-copper-400 text-copper-400" />
          </span>
        )}

        {/* Unavailable overlay */}
        {!product.available && (
          <>
            <div className="absolute inset-0 bg-ink/50" aria-hidden />
            <Badge variant="unavailable" className="absolute right-4 top-4 uppercase tracking-widest">
              Indisponível
            </Badge>
          </>
        )}

        {/* Materials bar */}
        {product.available && product.materials.length > 0 && (
          <div className="absolute inset-x-0 bottom-0 flex items-center gap-1.5 bg-gradient-to-t from-black/40 px-4 pb-4 pt-8">
            {product.materials.slice(0, 2).map((m) => (
              <span key={m} className="rounded-full bg-cream-50/20 px-2.5 py-0.5 text-[0.58rem] uppercase tracking-[0.18em] text-cream-50/95 backdrop-blur-sm">
                {m}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Card body */}
      <div className="flex flex-1 flex-col gap-2 p-5">
        <h3 className="font-serif text-xl leading-snug text-ink">{product.name}</h3>
        <p className="text-sm leading-relaxed text-ink-muted line-clamp-2">{product.description}</p>

        <div className="mt-auto flex items-end justify-between gap-2 border-t border-cream-200/60 pt-3">
          <div>
            <span className="font-serif text-2xl leading-none text-terracotta-700">{formatBRL(product.price)}</span>
            <span className="ml-1.5 text-[0.6rem] uppercase tracking-[0.15em] text-ink-muted">à vista</span>
          </div>

          {product.available ? (
            <Link
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Tenho interesse em ${product.name}`}
              className="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-terracotta-500 px-4 py-2 text-[0.78rem] font-medium text-cream-50 shadow-soft transition-all hover:-translate-y-px hover:bg-terracotta-600 hover:shadow-warm"
            >
              Tenho interesse
            </Link>
          ) : (
            <Button variant="soft" size="sm" disabled aria-disabled="true">Em breve</Button>
          )}
        </div>
      </div>
    </article>
  )
}
