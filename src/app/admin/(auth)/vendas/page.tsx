import { prisma } from "@/lib/db"
import { deleteSale } from "@/lib/actions/sales"
import { formatBRL } from "@/lib/format"
import { SaleForm } from "@/components/admin/SaleForm"

export default async function VendasPage() {
  const [sales, products] = await Promise.all([
    prisma.saleRecord.findMany({ orderBy: { createdAt: "desc" } }),
    prisma.product.findMany({ where: { available: true }, orderBy: { name: "asc" }, select: { slug: true, name: true, price: true } }),
  ])

  const totalRevenue = sales.reduce((acc, s) => acc + s.price, 0)
  const now = new Date()

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-serif text-3xl text-ink">Vendas</h1>
        <p className="text-sm text-ink-muted">Registre manualmente cada venda confirmada pelo WhatsApp</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <div className="rounded-2xl border border-cream-300 bg-cream-50 p-5 shadow-soft">
          <p className="font-serif text-2xl text-terracotta-700">{formatBRL(totalRevenue)}</p>
          <p className="text-xs text-ink-muted mt-0.5">Receita total registrada</p>
        </div>
        <div className="rounded-2xl border border-cream-300 bg-cream-50 p-5 shadow-soft">
          <p className="font-serif text-2xl text-ink">{sales.length}</p>
          <p className="text-xs text-ink-muted mt-0.5">Vendas registradas</p>
        </div>
        <div className="rounded-2xl border border-cream-300 bg-cream-50 p-5 shadow-soft">
          <p className="font-serif text-2xl text-ink">
            {formatBRL(sales.filter(s => s.month === now.getMonth() + 1 && s.year === now.getFullYear()).reduce((a, s) => a + s.price, 0))}
          </p>
          <p className="text-xs text-ink-muted mt-0.5">Este mês</p>
        </div>
      </div>

      {/* New sale form */}
      <div className="rounded-2xl border border-cream-300 bg-cream-50 p-6 shadow-soft max-w-lg">
        <h2 className="mb-4 font-serif text-lg text-ink">Registrar venda</h2>
        <SaleForm products={products.map(p => ({ slug: p.slug, name: p.name, price: p.price }))} />
      </div>

      {/* Sales list */}
      <div className="rounded-2xl border border-cream-300 bg-cream-50 shadow-soft overflow-hidden">
        <div className="border-b border-cream-300 px-6 py-4">
          <h2 className="font-serif text-lg text-ink">Histórico</h2>
        </div>
        {sales.length === 0 ? (
          <p className="px-6 py-8 text-sm text-ink-muted">Nenhuma venda registrada.</p>
        ) : (
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-cream-200 text-left">
                <th className="px-6 py-3 text-xs uppercase tracking-[0.15em] text-ink-muted font-medium">Produto</th>
                <th className="px-6 py-3 text-xs uppercase tracking-[0.15em] text-ink-muted font-medium">Valor</th>
                <th className="px-6 py-3 text-xs uppercase tracking-[0.15em] text-ink-muted font-medium hidden sm:table-cell">Mês</th>
                <th className="px-6 py-3 text-xs uppercase tracking-[0.15em] text-ink-muted font-medium"></th>
              </tr>
            </thead>
            <tbody>
              {sales.map((s) => (
                <tr key={s.id} className="border-b border-cream-100 last:border-0 hover:bg-terracotta-50/30">
                  <td className="px-6 py-3 text-ink">{s.productName}</td>
                  <td className="px-6 py-3 font-serif text-terracotta-700">{formatBRL(s.price)}</td>
                  <td className="px-6 py-3 text-ink-muted hidden sm:table-cell">
                    {new Date(s.year, s.month - 1).toLocaleString("pt-BR", { month: "long", year: "numeric" })}
                  </td>
                  <td className="px-6 py-3">
                    <form action={async () => {
                      "use server"
                      await deleteSale(s.id)
                    }}>
                      <button type="submit" className="text-xs text-red-400 hover:text-red-600 transition-colors">Excluir</button>
                    </form>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  )
}

