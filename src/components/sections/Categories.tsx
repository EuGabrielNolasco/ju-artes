import Link from "next/link"
import { ArrowUpRight, Baby, Home as HomeIcon, ShoppingBag, Sparkles } from "lucide-react"
import { categories, type Category } from "@/data/categories"
import { products } from "@/data/products"
import { cn } from "@/lib/utils"

const iconMap = {
  ShoppingBag,
  Baby,
  Home: HomeIcon,
  Sparkles,
} as const

function CategoryCard({ category }: { category: Category }) {
  const Icon = iconMap[category.iconName]
  const count = products.filter(
    (p) => p.category === category.slug && p.available
  ).length

  return (
    <Link
      href={`/catalogo?categoria=${category.slug}`}
      className={cn(
        "group relative flex flex-col gap-6 overflow-hidden rounded-3xl p-7 shadow-soft",
        "ring-1 ring-inset ring-cream-50/15",
        "bg-gradient-to-br text-cream-50 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-warm-lg",
        category.gradient
      )}
    >
      {/* Arrow — top right */}
      <div className="absolute right-5 top-5 flex h-9 w-9 items-center justify-center rounded-full bg-cream-50/15 backdrop-blur-sm transition-all duration-300 group-hover:bg-cream-50/28 group-hover:rotate-12">
        <ArrowUpRight className="h-4 w-4" />
      </div>

      {/* Icon */}
      <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-cream-50/20 backdrop-blur-sm transition-transform duration-300 group-hover:scale-110">
        <Icon className="h-6 w-6" strokeWidth={1.6} />
      </div>

      {/* Text */}
      <div className="space-y-2">
        <h3 className="font-serif text-2xl">{category.name}</h3>
        <p className="text-[0.84rem] leading-relaxed text-cream-50/85">
          {category.description}
        </p>
      </div>

      {/* Count */}
      <div className="flex items-center gap-2">
        <span className="h-px flex-1 bg-cream-50/20" />
        <span className="text-[0.6rem] uppercase tracking-[0.22em] text-cream-50/75">
          {count} {count === 1 ? "peça disponível" : "peças disponíveis"}
        </span>
      </div>
    </Link>
  )
}

export function Categories() {
  return (
    <section id="categorias" className="bg-cream-100/60 py-20 sm:py-28">
      <div className="container">
        <div className="mb-12 max-w-xl space-y-3">
          <div className="flex items-center gap-3">
            <span className="h-px w-8 bg-copper-400/70" />
            <span className="text-[0.68rem] uppercase tracking-[0.3em] text-copper-600">
              Por categoria
            </span>
          </div>
          <h2 className="font-serif text-4xl text-ink text-balance sm:text-5xl">
            Cada peça tem{" "}
            <em className="italic text-terracotta-600">o seu momento</em>
          </h2>
          <p className="text-ink-soft">
            Sair de casa, receber em casa, crescer em casa — escolha pela
            ocasião e encontre algo feito especialmente para aquele momento.
          </p>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {categories.map((category) => (
            <CategoryCard key={category.slug} category={category} />
          ))}
        </div>
      </div>
    </section>
  )
}
