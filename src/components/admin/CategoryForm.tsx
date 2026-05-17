"use client"

import type { Category } from "@prisma/client"

const GRADIENTS = [
  { label: "Terracota → Cobre", value: "from-terracotta-400 to-copper-500" },
  { label: "Cobre → Creme", value: "from-copper-300 to-cream-400" },
  { label: "Sage → Creme", value: "from-sage-400 to-cream-300" },
  { label: "Cobre → Terracota", value: "from-copper-400 to-terracotta-300" },
  { label: "Terracota → Sage", value: "from-terracotta-300 to-sage-400" },
]

const ICONS = ["ShoppingBag", "Baby", "Home", "Sparkles"] as const

type Props = {
  action: (formData: FormData) => Promise<void>
  categories?: Category[]
  category?: Category
}

export function CategoryForm({ action, category }: Props) {
  return (
    <form action={action} className="space-y-5 max-w-lg">
      <Field label="Slug" name="slug" defaultValue={category?.slug} required pattern="[a-z0-9-]+" title="Apenas letras minúsculas, números e hífens" />
      <Field label="Nome" name="name" defaultValue={category?.name} required />
      <Field label="Descrição" name="description" as="textarea" defaultValue={category?.description} required />

      <div className="space-y-1.5">
        <label className="block text-xs uppercase tracking-[0.18em] text-ink-muted">Gradiente</label>
        <select name="gradient" defaultValue={category?.gradient ?? GRADIENTS[0].value} required className="w-full rounded-xl border border-cream-300 bg-white px-4 py-2.5 text-sm text-ink outline-none focus:border-terracotta-400 focus:ring-2 focus:ring-terracotta-200">
          {GRADIENTS.map((g) => (
            <option key={g.value} value={g.value}>{g.label}</option>
          ))}
        </select>
      </div>

      <div className="space-y-1.5">
        <label className="block text-xs uppercase tracking-[0.18em] text-ink-muted">Ícone</label>
        <select name="iconName" defaultValue={category?.iconName ?? "ShoppingBag"} required className="w-full rounded-xl border border-cream-300 bg-white px-4 py-2.5 text-sm text-ink outline-none focus:border-terracotta-400 focus:ring-2 focus:ring-terracotta-200">
          {ICONS.map((i) => <option key={i} value={i}>{i}</option>)}
        </select>
      </div>

      <button type="submit" className="rounded-full bg-terracotta-500 px-8 py-2.5 text-sm font-medium text-cream-50 shadow-soft hover:bg-terracotta-600 transition-all">
        {category ? "Salvar alterações" : "Criar categoria"}
      </button>
    </form>
  )
}

function Field({ label, name, as, ...props }: { label: string; name: string; as?: "textarea"; [k: string]: unknown }) {
  const cls = "w-full rounded-xl border border-cream-300 bg-white px-4 py-2.5 text-sm text-ink outline-none focus:border-terracotta-400 focus:ring-2 focus:ring-terracotta-200 transition-all"
  return (
    <div className="space-y-1.5">
      <label className="block text-xs uppercase tracking-[0.18em] text-ink-muted">{label}</label>
      {as === "textarea"
        ? <textarea name={name} rows={2} className={cls} {...props as React.TextareaHTMLAttributes<HTMLTextAreaElement>} />
        : <input name={name} type="text" className={cls} {...props as React.InputHTMLAttributes<HTMLInputElement>} />
      }
    </div>
  )
}
