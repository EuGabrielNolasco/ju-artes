import { prisma } from "@/lib/db"
import { createProduct } from "@/lib/actions/products"
import { ProductForm } from "@/components/admin/ProductForm"

export default async function NovoProdutoPage() {
  const categories = await prisma.category.findMany({ orderBy: { name: "asc" } })
  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-serif text-3xl text-ink">Novo Produto</h1>
        <p className="text-sm text-ink-muted">Preencha os campos para adicionar uma nova peça ao catálogo</p>
      </div>
      <div className="rounded-2xl border border-cream-300 bg-cream-50 p-6 shadow-soft">
        <ProductForm action={createProduct} categories={categories} />
      </div>
    </div>
  )
}
