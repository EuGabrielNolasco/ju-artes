"use client"

import { Suspense, useMemo, useState } from "react"
import { useSearchParams } from "next/navigation"
import { SearchX } from "lucide-react"
import { products } from "@/data/products"
import { categories, getCategory } from "@/data/categories"
import { ProductCard } from "@/components/ProductCard"
import {
  CatalogFilters,
  type SortOption,
} from "@/components/CatalogFilters"

function CatalogContent() {
  const searchParams = useSearchParams()
  const initialCategory = searchParams.get("categoria") ?? "todas"

  const [selectedCategory, setSelectedCategory] = useState<string>(
    getCategory(initialCategory) ? initialCategory : "todas"
  )
  const [sort, setSort] = useState<SortOption>("destaque")
  const [query, setQuery] = useState("")

  const filtered = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase()

    const result = products.filter((product) => {
      const matchesCategory =
        selectedCategory === "todas" || product.category === selectedCategory
      const matchesQuery =
        normalizedQuery.length === 0 ||
        product.name.toLowerCase().includes(normalizedQuery) ||
        product.description.toLowerCase().includes(normalizedQuery)
      return matchesCategory && matchesQuery
    })

    const sorted = [...result]
    switch (sort) {
      case "menor":
        sorted.sort((a, b) => a.price - b.price)
        break
      case "maior":
        sorted.sort((a, b) => b.price - a.price)
        break
      case "az":
        sorted.sort((a, b) => a.name.localeCompare(b.name, "pt-BR"))
        break
      case "destaque":
      default:
        sorted.sort((a, b) => Number(b.featured) - Number(a.featured))
        break
    }
    return sorted
  }, [selectedCategory, sort, query])

  return (
    <div className="container py-16 sm:py-20">
      <header className="max-w-2xl space-y-3 mb-10">
        <span className="text-xs uppercase tracking-[0.28em] text-copper-600">
          Catálogo
        </span>
        <h1 className="font-serif text-4xl text-ink sm:text-5xl text-balance">
          Todas as peças costuradas com calma
        </h1>
        <p className="text-ink-soft">
          Filtre por categoria, ordene como preferir ou busque pelo nome —
          quando achar a peça, é só falar pelo WhatsApp.
        </p>
      </header>

      <CatalogFilters
        categories={categories}
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
        sort={sort}
        onSortChange={setSort}
        query={query}
        onQueryChange={setQuery}
      />

      <p className="mt-8 text-sm text-ink-muted" aria-live="polite">
        {filtered.length === 0
          ? "Nenhuma peça encontrada"
          : `${filtered.length} ${filtered.length === 1 ? "peça encontrada" : "peças encontradas"}`}
      </p>

      {filtered.length === 0 ? (
        <EmptyState onReset={() => {
          setQuery("")
          setSelectedCategory("todas")
        }} />
      ) : (
        <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
          {filtered.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  )
}

function EmptyState({ onReset }: { onReset: () => void }) {
  return (
    <div className="mt-10 flex flex-col items-center justify-center gap-4 rounded-3xl border border-dashed border-cream-300 bg-cream-50/60 py-16 text-center">
      <span className="flex h-16 w-16 items-center justify-center rounded-full bg-cream-200 text-terracotta-700">
        <SearchX className="h-6 w-6" />
      </span>
      <div className="space-y-1">
        <h2 className="font-serif text-2xl text-ink">
          Nada encontrado por aqui
        </h2>
        <p className="text-sm text-ink-muted max-w-sm">
          Tente outra categoria ou simplifique a busca — novas peças entram no
          catálogo com frequência.
        </p>
      </div>
      <button
        type="button"
        onClick={onReset}
        className="inline-flex items-center gap-2 rounded-full border border-terracotta-500/60 px-5 py-2 text-sm text-terracotta-700 transition-colors hover:bg-terracotta-500 hover:text-cream-50"
      >
        Limpar filtros
      </button>
    </div>
  )
}

export default function CatalogPage() {
  return (
    <Suspense
      fallback={
        <div className="container py-20 text-ink-muted">Carregando catálogo…</div>
      }
    >
      <CatalogContent />
    </Suspense>
  )
}
