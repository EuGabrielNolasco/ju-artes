import Link from "next/link"
import { prisma } from "@/lib/db"
import { toggleProductAvailability, deleteProduct } from "@/lib/actions/products"
import { formatBRL } from "@/lib/format"
import { Plus } from "lucide-react"

export default async function ProdutosPage() {
  const [products, categories] = await Promise.all([
    prisma.product.findMany({ orderBy: { createdAt: "desc" } }),
    prisma.category.findMany(),
  ])

  const catMap = Object.fromEntries(categories.map((c) => [c.slug, c.name]))

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-serif text-3xl text-ink">Produtos</h1>
          <p className="text-sm text-ink-muted">{products.length} produtos cadastrados</p>
        </div>
        <Link href="/admin/produtos/novo" className="inline-flex items-center gap-2 rounded-full bg-terracotta-500 px-5 py-2.5 text-sm font-medium text-cream-50 shadow-soft hover:bg-terracotta-600 transition-all">
          <Plus className="h-4 w-4" />
          Novo produto
        </Link>
      </div>

      <div className="rounded-2xl border border-cream-300 bg-cream-50 shadow-soft overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-cream-300 text-left">
              <th className="px-5 py-3 text-xs uppercase tracking-[0.15em] text-ink-muted font-medium">Nome</th>
              <th className="px-5 py-3 text-xs uppercase tracking-[0.15em] text-ink-muted font-medium hidden md:table-cell">Categoria</th>
              <th className="px-5 py-3 text-xs uppercase tracking-[0.15em] text-ink-muted font-medium">Preço</th>
              <th className="px-5 py-3 text-xs uppercase tracking-[0.15em] text-ink-muted font-medium">Status</th>
              <th className="px-5 py-3 text-xs uppercase tracking-[0.15em] text-ink-muted font-medium">Ações</th>
            </tr>
          </thead>
          <tbody>
            {products.map((p) => (
              <tr key={p.id} className="border-b border-cream-100 last:border-0 hover:bg-terracotta-50/30">
                <td className="px-5 py-3">
                  <div>
                    <p className="font-medium text-ink">{p.name}</p>
                    <p className="text-xs text-ink-muted">{p.slug}</p>
                  </div>
                </td>
                <td className="px-5 py-3 text-ink-muted hidden md:table-cell">{catMap[p.category] ?? p.category}</td>
                <td className="px-5 py-3 font-serif text-terracotta-700">{formatBRL(p.price)}</td>
                <td className="px-5 py-3">
                  <form action={async () => {
                    "use server"
                    await toggleProductAvailability(p.slug, !p.available)
                  }}>
                    <button
                      type="submit"
                      className={`rounded-full px-3 py-1 text-xs font-medium transition-colors ${p.available ? "bg-sage-50 text-sage-500 hover:bg-red-50 hover:text-red-500" : "bg-red-50 text-red-400 hover:bg-sage-50 hover:text-sage-500"}`}
                    >
                      {p.available ? "Disponível" : "Indisponível"}
                    </button>
                  </form>
                </td>
                <td className="px-5 py-3">
                  <div className="flex items-center gap-2">
                    <Link href={`/admin/produtos/${p.slug}`} className="rounded-lg px-3 py-1.5 text-xs text-terracotta-600 hover:bg-terracotta-50 transition-colors">
                      Editar
                    </Link>
                    <form action={async () => {
                      "use server"
                      await deleteProduct(p.slug)
                    }}>
                      <button type="submit" className="rounded-lg px-3 py-1.5 text-xs text-red-400 hover:bg-red-50 hover:text-red-600 transition-colors">
                        Excluir
                      </button>
                    </form>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
