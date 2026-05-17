"use client"

import { useRef, useState } from "react"
import { useFormState } from "react-dom"
import Image from "next/image"
import type { Category, Product } from "@prisma/client"
import type { ProductFormState } from "@/lib/actions/products"
import { FormAlert } from "@/components/admin/FormAlert"

type Props = {
  action: (prevState: ProductFormState, formData: FormData) => Promise<ProductFormState>
  categories: Category[]
  product?: Product
}

export function ProductForm({ action, categories, product }: Props) {
  const [state, formAction] = useFormState(action, null)
  const [preview, setPreview] = useState<string>(product?.image ?? "")
  const [materials, setMaterials] = useState<string[]>(
    product?.materials ? (JSON.parse(product.materials) as string[]) : []
  )
  const [tagInput, setTagInput] = useState("")
  const formRef = useRef<HTMLFormElement>(null)

  function addTag() {
    const v = tagInput.trim()
    if (v && !materials.includes(v)) setMaterials((m) => [...m, v])
    setTagInput("")
  }

  return (
    <form ref={formRef} action={formAction} className="space-y-5 max-w-2xl">
      <input type="hidden" name="materials" value={JSON.stringify(materials)} />

      <FormAlert
        success={undefined}
        error={state?.error ?? (state?.fieldErrors ? "Corrija os erros abaixo." : undefined)}
      />

      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Nome" name="name" defaultValue={product?.name} required error={state?.fieldErrors?.name?.[0]} />
        <Field label="Slug" name="slug" defaultValue={product?.slug} required pattern="[-a-z0-9]+" title="Apenas letras minúsculas, números e hífens" error={state?.fieldErrors?.slug?.[0]} />
      </div>

      <Field label="Descrição" name="description" as="textarea" defaultValue={product?.description} required error={state?.fieldErrors?.description?.[0]} />

      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Preço (R$)" name="price" type="number" step="0.01" min="0" defaultValue={product?.price} required error={state?.fieldErrors?.price?.[0]} />
        <div className="space-y-1.5">
          <label className="block text-xs uppercase tracking-[0.18em] text-ink-muted">Categoria</label>
          <select
            name="category"
            defaultValue={product?.category ?? ""}
            required
            className="w-full rounded-xl border border-cream-300 bg-white px-4 py-2.5 text-sm text-ink outline-none focus:border-terracotta-400 focus:ring-2 focus:ring-terracotta-200"
          >
            <option value="">Selecione…</option>
            {categories.map((c) => (
              <option key={c.slug} value={c.slug}>{c.name}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Image upload */}
      <div className="space-y-2">
        <label className="block text-xs uppercase tracking-[0.18em] text-ink-muted">Imagem</label>
        <input type="hidden" name="image" value={preview} />
        <input
          type="file"
          name="imageFile"
          accept="image/*"
          className="w-full rounded-xl border border-cream-300 bg-white px-4 py-2.5 text-sm text-ink file:mr-3 file:rounded-full file:border-0 file:bg-terracotta-500 file:px-3 file:py-1 file:text-xs file:text-cream-50 hover:file:bg-terracotta-600"
          onChange={(e) => {
            const file = e.target.files?.[0]
            if (file) setPreview(URL.createObjectURL(file))
          }}
        />
        {preview && (
          <div className="relative h-32 w-32 overflow-hidden rounded-2xl border border-cream-300">
            <Image src={preview} alt="preview" fill className="object-cover" unoptimized />
          </div>
        )}
      </div>

      {/* Materials */}
      <div className="space-y-2">
        <label className="block text-xs uppercase tracking-[0.18em] text-ink-muted">Materiais</label>
        <div className="flex gap-2">
          <input
            value={tagInput}
            onChange={(e) => setTagInput(e.target.value)}
            onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); addTag() } }}
            placeholder="ex: Linho natural"
            className="flex-1 rounded-xl border border-cream-300 bg-white px-4 py-2 text-sm text-ink outline-none focus:border-terracotta-400 focus:ring-2 focus:ring-terracotta-200"
          />
          <button type="button" onClick={addTag} className="rounded-xl bg-terracotta-500 px-4 py-2 text-sm text-cream-50 hover:bg-terracotta-600">
            Adicionar
          </button>
        </div>
        <div className="flex flex-wrap gap-2">
          {materials.map((m) => (
            <span key={m} className="flex items-center gap-1.5 rounded-full bg-cream-200 px-3 py-1 text-xs text-ink">
              {m}
              <button type="button" onClick={() => setMaterials((ms) => ms.filter((x) => x !== m))} className="text-ink-muted hover:text-red-500">×</button>
            </span>
          ))}
        </div>
      </div>

      {/* Checkboxes */}
      <div className="flex gap-6">
        <label className="flex items-center gap-2 text-sm text-ink">
          <input type="checkbox" name="featured" defaultChecked={product?.featured} className="h-4 w-4 rounded border-cream-300 accent-terracotta-500" />
          Destaque
        </label>
        <label className="flex items-center gap-2 text-sm text-ink">
          <input type="checkbox" name="available" defaultChecked={product?.available ?? true} className="h-4 w-4 rounded border-cream-300 accent-terracotta-500" />
          Disponível
        </label>
      </div>

      <button type="submit" className="rounded-full bg-terracotta-500 px-8 py-2.5 text-sm font-medium text-cream-50 shadow-soft hover:bg-terracotta-600 hover:shadow-warm transition-all">
        {product ? "Salvar alterações" : "Criar produto"}
      </button>
    </form>
  )
}

function Field({ label, name, as, type = "text", error, ...props }: {
  label: string
  name: string
  as?: "textarea"
  type?: string
  error?: string
  [key: string]: unknown
}) {
  const cls = "w-full rounded-xl border bg-white px-4 py-2.5 text-sm text-ink outline-none focus:ring-2 focus:ring-terracotta-200 transition-all " +
    (error ? "border-red-300 focus:border-red-400" : "border-cream-300 focus:border-terracotta-400")
  return (
    <div className="space-y-1.5">
      <label className="block text-xs uppercase tracking-[0.18em] text-ink-muted">{label}</label>
      {as === "textarea"
        ? <textarea name={name} rows={3} className={cls} {...props as React.TextareaHTMLAttributes<HTMLTextAreaElement>} />
        : <input name={name} type={type} className={cls} {...props as React.InputHTMLAttributes<HTMLInputElement>} />
      }
      {error && <p className="text-xs text-red-500">{error}</p>}
    </div>
  )
}
