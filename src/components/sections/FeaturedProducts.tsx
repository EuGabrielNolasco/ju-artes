import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { prisma } from "@/lib/db"
import { ProductCard } from "@/components/ProductCard"
import type { Product } from "@prisma/client"

function toCardProduct(p: Product) {
  return {
    id: p.slug,
    slug: p.slug,
    name: p.name,
    description: p.description,
    price: p.price,
    category: p.category,
    image: p.image,
    featured: p.featured,
    available: p.available,
    materials: JSON.parse(p.materials ?? "[]") as string[],
  }
}

export async function FeaturedProducts() {
  const rows = await prisma.product.findMany({ where: { featured: true }, orderBy: { createdAt: "desc" } })
  const featured = rows.map(toCardProduct)

  return (
    <section className="py-20 sm:py-28">
      <div className="container">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-lg space-y-3">
            <div className="flex items-center gap-3">
              <span className="h-px w-8 bg-copper-400/70" />
              <span className="text-[0.68rem] uppercase tracking-[0.3em] text-copper-600">Seleção da estação</span>
            </div>
            <h2 className="font-serif text-4xl text-ink text-balance sm:text-5xl">
              As peças que <em className="italic text-terracotta-600">a Ju</em> escolheria pra você
            </h2>
            <p className="text-ink-soft">Itens favoritos pelo toque, pela estampa e pela história bordada ponto a ponto em cada costura.</p>
          </div>
          <Link href="/catalogo" className="self-start inline-flex shrink-0 items-center gap-2 rounded-full border border-terracotta-400/50 px-5 py-2.5 text-sm text-terracotta-700 transition-all hover:border-terracotta-500 hover:bg-terracotta-500 hover:text-cream-50">
            Ver catálogo completo
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
          {featured.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
        <p className="mt-8 text-center text-[0.65rem] uppercase tracking-[0.22em] text-ink-muted">
          Peças feitas à mão · tiragem limitada · quando esgota, não repõe
        </p>
      </div>
    </section>
  )
}
