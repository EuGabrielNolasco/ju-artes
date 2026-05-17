import Link from "next/link"
import { prisma } from "@/lib/db"
import { deleteCategory } from "@/lib/actions/categories"
import { Plus } from "lucide-react"

export default async function CategoriasPage() {
  const categories = await prisma.category.findMany({ orderBy: { name: "asc" } })
  const products = await prisma.product.findMany({ select: { category: true } })
  const countMap: Record<string, number> = {}
  for (const p of products) {
    countMap[p.category] = (countMap[p.category] ?? 0) + 1
  }

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-serif text-3xl text-ink">Categorias</h1>
          <p className="text-sm text-ink-muted">{categories.length} categorias</p>
        </div>
        <Link href="/admin/categorias/nova" className="inline-flex items-center gap-2 rounded-full bg-terracotta-500 px-5 py-2.5 text-sm font-medium text-cream-50 shadow-soft hover:bg-terracotta-600 transition-all">
          <Plus className="h-4 w-4" />
          Nova categoria
        </Link>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {categories.map((c) => (
          <div key={c.id} className="rounded-2xl border border-cream-300 bg-cream-50 p-5 shadow-soft">
            <div className={`mb-4 h-2 rounded-full bg-gradient-to-r ${c.gradient}`} />
            <p className="font-serif text-xl text-ink">{c.name}</p>
            <p className="mt-1 text-sm text-ink-muted">{c.description}</p>
            <div className="mt-3 flex items-center justify-between border-t border-cream-200 pt-3">
              <span className="text-xs text-copper-600">{countMap[c.slug] ?? 0} produtos</span>
              <div className="flex gap-2">
                <Link href={`/admin/categorias/${c.slug}`} className="rounded-lg px-3 py-1.5 text-xs text-terracotta-600 hover:bg-terracotta-50 transition-colors">
                  Editar
                </Link>
                <form action={async () => {
                  "use server"
                  await deleteCategory(c.slug)
                }}>
                  <button type="submit" className="rounded-lg px-3 py-1.5 text-xs text-red-400 hover:bg-red-50 hover:text-red-600 transition-colors">
                    Excluir
                  </button>
                </form>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
