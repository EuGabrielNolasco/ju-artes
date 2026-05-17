import { createCategory } from "@/lib/actions/categories"
import { CategoryForm } from "@/components/admin/CategoryForm"

export default function NovaCategoriaPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-serif text-3xl text-ink">Nova Categoria</h1>
        <p className="text-sm text-ink-muted">Adicione uma nova categoria ao catálogo</p>
      </div>
      <div className="rounded-2xl border border-cream-300 bg-cream-50 p-6 shadow-soft">
        <CategoryForm action={createCategory} />
      </div>
    </div>
  )
}
