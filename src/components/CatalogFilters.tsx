"use client"

import { Search } from "lucide-react"
import type { Category } from "@/data/categories"
import { cn } from "@/lib/utils"
import { Input } from "@/components/ui/input"

export type SortOption = "destaque" | "menor" | "maior" | "az"

type Props = {
  categories: Category[]
  selectedCategory: string
  onCategoryChange: (slug: string) => void
  sort: SortOption
  onSortChange: (sort: SortOption) => void
  query: string
  onQueryChange: (value: string) => void
}

const sortLabels: Record<SortOption, string> = {
  destaque: "Em destaque",
  menor: "Menor preço",
  maior: "Maior preço",
  az: "Ordem alfabética",
}

export function CatalogFilters({
  categories,
  selectedCategory,
  onCategoryChange,
  sort,
  onSortChange,
  query,
  onQueryChange,
}: Props) {
  return (
    <div className="space-y-5">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <Search
            className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-muted"
            aria-hidden="true"
          />
          <Input
            type="search"
            placeholder="Buscar pelo nome da peça..."
            value={query}
            onChange={(e) => onQueryChange(e.target.value)}
            aria-label="Buscar produtos"
            className="pl-11"
          />
        </div>

        <div className="relative">
          <label htmlFor="sort" className="sr-only">
            Ordenar por
          </label>
          <select
            id="sort"
            value={sort}
            onChange={(e) => onSortChange(e.target.value as SortOption)}
            className="h-11 w-full rounded-full border border-cream-300 bg-cream-50/80 px-4 pr-9 text-sm text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring sm:w-56 appearance-none"
          >
            {(Object.keys(sortLabels) as SortOption[]).map((key) => (
              <option key={key} value={key}>
                {sortLabels[key]}
              </option>
            ))}
          </select>
          <span
            aria-hidden="true"
            className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-ink-muted text-xs"
          >
            ▾
          </span>
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        <CategoryPill
          active={selectedCategory === "todas"}
          onClick={() => onCategoryChange("todas")}
        >
          Todas
        </CategoryPill>
        {categories.map((category) => (
          <CategoryPill
            key={category.slug}
            active={selectedCategory === category.slug}
            onClick={() => onCategoryChange(category.slug)}
          >
            {category.name}
          </CategoryPill>
        ))}
      </div>
    </div>
  )
}

function CategoryPill({
  active,
  onClick,
  children,
}: {
  active: boolean
  onClick: () => void
  children: React.ReactNode
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={cn(
        "inline-flex items-center rounded-full px-4 py-2 text-sm font-medium transition-all border",
        active
          ? "bg-terracotta-500 text-cream-50 border-terracotta-500 shadow-soft"
          : "bg-cream-50/80 text-ink-soft border-cream-300 hover:bg-cream-200 hover:text-ink"
      )}
    >
      {children}
    </button>
  )
}
