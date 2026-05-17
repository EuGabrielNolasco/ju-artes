import { notFound } from "next/navigation"
import { prisma } from "@/lib/db"
import { updateProduct } from "@/lib/actions/products"
import { ProductForm } from "@/components/admin/ProductForm"

export default async function EditarProdutoPage({ params }: { params: { slug: string } }) {
  const [product, categories] = await Promise.all([
    prisma.product.findUnique({ where: { slug: params.slug } }),
    prisma.category.findMany({ orderBy: { name: "asc" } }),
  ])

  if (!product) notFound()

  const action = updateProduct.bind(null, params.slug)

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-serif text-3xl text-ink">Editar Produto</h1>
        <p className="text-sm text-ink-muted">{product.name}</p>
      </div>
      <div className="rounded-2xl border border-cream-300 bg-cream-50 p-6 shadow-soft">
        <ProductForm action={action} categories={categories} product={product} />
      </div>
    </div>
  )
}
