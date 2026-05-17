import type { Product, Category } from "@prisma/client"
import type { ProductCardData } from "@/lib/types"

export function toProductCardData(
  p: Product,
  catMap: Record<string, { name: string; gradient: string }>
): ProductCardData {
  return {
    id: p.slug,
    slug: p.slug,
    name: p.name,
    description: p.description,
    price: p.price,
    category: p.category,
    categoryName: catMap[p.category]?.name ?? "",
    gradient: catMap[p.category]?.gradient ?? "from-terracotta-300 to-copper-400",
    image: p.image,
    featured: p.featured,
    available: p.available,
    materials: JSON.parse(p.materials ?? "[]") as string[],
  }
}

export function buildCatMap(
  categories: Pick<Category, "slug" | "name" | "gradient">[]
): Record<string, { name: string; gradient: string }> {
  return Object.fromEntries(categories.map((c) => [c.slug, { name: c.name, gradient: c.gradient }]))
}
