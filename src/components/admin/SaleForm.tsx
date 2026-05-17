"use client"

import { useState } from "react"
import { createSale } from "@/lib/actions/sales"
import { formatBRL } from "@/lib/format"

type Product = { slug: string; name: string; price: number }

export function SaleForm({ products }: { products: Product[] }) {
  const now = new Date()
  const [price, setPrice] = useState("")
  const [productName, setProductName] = useState("")

  async function handleSubmit(formData: FormData): Promise<void> {
    await createSale(formData)
  }

  return (
    <form action={handleSubmit} className="space-y-4">
      <input type="hidden" name="productName" value={productName} />

      <div className="space-y-1.5">
        <label className="block text-xs uppercase tracking-[0.18em] text-ink-muted">Produto</label>
        <select
          name="productSlug"
          required
          className="w-full rounded-xl border border-cream-300 bg-white px-4 py-2.5 text-sm text-ink outline-none focus:border-terracotta-400 focus:ring-2 focus:ring-terracotta-200"
          onChange={(e) => {
            const opt = e.target.selectedOptions[0]
            setPrice(opt.dataset.price ?? "")
            setProductName(opt.text.split(" — ")[0] ?? "")
          }}
        >
          <option value="">Selecione…</option>
          {products.map((p) => (
            <option key={p.slug} value={p.slug} data-price={p.price}>
              {p.name} — {formatBRL(p.price)}
            </option>
          ))}
        </select>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <div className="space-y-1.5">
          <label className="block text-xs uppercase tracking-[0.18em] text-ink-muted">Valor (R$)</label>
          <input
            name="price"
            type="number"
            step="0.01"
            min="0"
            required
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="w-full rounded-xl border border-cream-300 bg-white px-4 py-2.5 text-sm text-ink outline-none focus:border-terracotta-400 focus:ring-2 focus:ring-terracotta-200"
          />
        </div>
        <div className="space-y-1.5">
          <label className="block text-xs uppercase tracking-[0.18em] text-ink-muted">Mês</label>
          <input name="month" type="number" min="1" max="12" defaultValue={now.getMonth() + 1} required className="w-full rounded-xl border border-cream-300 bg-white px-4 py-2.5 text-sm text-ink outline-none focus:border-terracotta-400 focus:ring-2 focus:ring-terracotta-200" />
        </div>
        <div className="space-y-1.5">
          <label className="block text-xs uppercase tracking-[0.18em] text-ink-muted">Ano</label>
          <input name="year" type="number" min="2020" defaultValue={now.getFullYear()} required className="w-full rounded-xl border border-cream-300 bg-white px-4 py-2.5 text-sm text-ink outline-none focus:border-terracotta-400 focus:ring-2 focus:ring-terracotta-200" />
        </div>
      </div>

      <button type="submit" className="rounded-full bg-terracotta-500 px-6 py-2.5 text-sm font-medium text-cream-50 shadow-soft hover:bg-terracotta-600 transition-all">
        Registrar venda
      </button>
    </form>
  )
}
