import { notFound } from "next/navigation"
import { prisma } from "@/lib/db"
import { updateCategory } from "@/lib/actions/categories"
import { CategoryForm } from "@/components/admin/CategoryForm"

export default async function EditarCategoriaPage({ params }: { params: { slug: string } }) {
  const category = await prisma.category.findUnique({ where: { slug: params.slug } })
  if (!category) notFound()

  const action = updateCategory.bind(null, params.slug)

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-serif text-3xl text-ink">Editar Categoria</h1>
        <p className="text-sm text-ink-muted">{category.name}</p>
      </div>
      <div className="rounded-2xl border border-cream-300 bg-cream-50 p-6 shadow-soft">
        <CategoryForm action={action} category={category} />
      </div>
    </div>
  )
}
