import { Suspense } from "react"
import { prisma } from "@/lib/db"
import { CatalogClient } from "@/components/CatalogClient"

export default async function CatalogPage() {
  const [productRows, categoryRows] = await Promise.all([
    prisma.product.findMany({ orderBy: { createdAt: "desc" } }),
    prisma.category.findMany({ orderBy: { name: "asc" } }),
  ])

  const products = productRows.map((p) => ({
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
  }))

  const categories = categoryRows.map((c) => ({
    slug: c.slug,
    name: c.name,
    description: c.description,
    gradient: c.gradient,
    iconName: c.iconName as "ShoppingBag" | "Baby" | "Home" | "Sparkles",
  }))

  return (
    <Suspense fallback={<div className="container py-20 text-ink-muted">Carregando catálogo…</div>}>
      <CatalogClient products={products} categories={categories} />
    </Suspense>
  )
}
