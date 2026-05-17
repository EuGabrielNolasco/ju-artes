import { prisma } from "@/lib/db"
import { getSalesByMonth } from "@/lib/actions/sales"
import { formatBRL } from "@/lib/format"
import { CategoryBarChart } from "@/components/admin/charts/CategoryBarChart"
import { StockDonutChart } from "@/components/admin/charts/StockDonutChart"
import { SalesLineChart } from "@/components/admin/charts/SalesLineChart"
import { Package, Tag, TrendingUp } from "lucide-react"

export default async function DashboardPage() {
  const [products, categories, recentSales, salesByMonth] = await Promise.all([
    prisma.product.findMany(),
    prisma.category.findMany(),
    prisma.saleRecord.findMany({ orderBy: { createdAt: "desc" }, take: 5 }),
    getSalesByMonth(),
  ])

  const available = products.filter((p) => p.available).length
  const unavailable = products.filter((p) => !p.available).length
  const totalRevenue = await prisma.saleRecord.aggregate({ _sum: { price: true } })

  const categoryCounts = categories.map((c) => ({
    name: c.name,
    total: products.filter((p) => p.category === c.slug).length,
  }))

  const stats = [
    { label: "Total de produtos", value: products.length, icon: Package, color: "bg-terracotta-50 text-terracotta-600" },
    { label: "Disponíveis", value: available, icon: Tag, color: "bg-sage-50 text-sage-500" },
    { label: "Categorias", value: categories.length, icon: Tag, color: "bg-copper-50 text-copper-600" },
    { label: "Receita total", value: formatBRL(totalRevenue._sum.price ?? 0), icon: TrendingUp, color: "bg-cream-200 text-ink" },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-serif text-3xl text-ink">Dashboard</h1>
        <p className="text-sm text-ink-muted">Visão geral do catálogo e vendas</p>
      </div>

      {/* Summary cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((s) => (
          <div key={s.label} className="rounded-2xl border border-cream-300 bg-cream-50 p-5 shadow-soft">
            <div className={`mb-3 inline-flex h-10 w-10 items-center justify-center rounded-xl ${s.color}`}>
              <s.icon className="h-5 w-5" strokeWidth={1.6} />
            </div>
            <p className="font-serif text-2xl text-ink">{s.value}</p>
            <p className="mt-0.5 text-xs text-ink-muted">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Charts row */}
      <div className="grid gap-5 lg:grid-cols-3">
        <div className="rounded-2xl border border-cream-300 bg-cream-50 p-5 shadow-soft">
          <h2 className="mb-4 font-serif text-lg text-ink">Produtos por categoria</h2>
          <CategoryBarChart data={categoryCounts} />
        </div>
        <div className="rounded-2xl border border-cream-300 bg-cream-50 p-5 shadow-soft">
          <h2 className="mb-1 font-serif text-lg text-ink">Estoque</h2>
          <p className="mb-2 text-xs text-ink-muted">Disponíveis × Indisponíveis</p>
          <StockDonutChart available={available} unavailable={unavailable} />
        </div>
        <div className="rounded-2xl border border-cream-300 bg-cream-50 p-5 shadow-soft">
          <h2 className="mb-4 font-serif text-lg text-ink">Vendas por mês</h2>
          {salesByMonth.length > 0 ? (
            <SalesLineChart data={salesByMonth} />
          ) : (
            <p className="py-16 text-center text-sm text-ink-muted">Nenhuma venda registrada</p>
          )}
        </div>
      </div>

      {/* Recent sales */}
      <div className="rounded-2xl border border-cream-300 bg-cream-50 shadow-soft">
        <div className="border-b border-cream-300 px-6 py-4">
          <h2 className="font-serif text-lg text-ink">Últimas vendas registradas</h2>
        </div>
        {recentSales.length === 0 ? (
          <p className="px-6 py-8 text-sm text-ink-muted">Nenhuma venda registrada ainda.</p>
        ) : (
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-cream-200 text-left">
                <th className="px-6 py-3 text-xs uppercase tracking-[0.15em] text-ink-muted font-medium">Produto</th>
                <th className="px-6 py-3 text-xs uppercase tracking-[0.15em] text-ink-muted font-medium">Valor</th>
                <th className="px-6 py-3 text-xs uppercase tracking-[0.15em] text-ink-muted font-medium">Mês/Ano</th>
              </tr>
            </thead>
            <tbody>
              {recentSales.map((s) => (
                <tr key={s.id} className="border-b border-cream-100 last:border-0 hover:bg-terracotta-50/40">
                  <td className="px-6 py-3 text-ink">{s.productName}</td>
                  <td className="px-6 py-3 font-medium text-terracotta-700">{formatBRL(s.price)}</td>
                  <td className="px-6 py-3 text-ink-muted">
                    {new Date(s.year, s.month - 1).toLocaleString("pt-BR", { month: "long", year: "numeric" })}
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
