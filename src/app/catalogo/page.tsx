import { Suspense } from "react"
import { prisma } from "@/lib/db"
import { buildCatMap, toProductCardData } from "@/lib/mapProduct"
import { CatalogClient } from "@/components/CatalogClient"
import type { CategoryData } from "@/lib/types"

export default async function CatalogPage() {
  const [productRows, categoryRows] = await Promise.all([
    prisma.product.findMany({ orderBy: { createdAt: "desc" } }),
    prisma.category.findMany({ orderBy: { name: "asc" } }),
  ])

  const catMap = buildCatMap(categoryRows)
  const products = productRows.map((p) => toProductCardData(p, catMap))

  const categories: CategoryData[] = categoryRows.map((c) => ({
    slug: c.slug,
    name: c.name,
    description: c.description,
    gradient: c.gradient,
    iconName: c.iconName,
  }))

  return (
    <Suspense fallback={<div className="container py-20 text-ink-muted">Carregando catálogo…</div>}>
      <CatalogClient products={products} categories={categories} />
    </Suspense>
  )
}
