"use server"

import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"
import { z } from "zod"
import { prisma } from "@/lib/db"

export type CategoryFormState = {
  error?: string
} | null

const CategorySchema = z.object({
  slug: z.string().min(1).regex(/^[a-z0-9-]+$/),
  name: z.string().min(1, "Nome obrigatório"),
  description: z.string().min(1, "Descrição obrigatória"),
  gradient: z.string().min(1),
  iconName: z.enum(["ShoppingBag", "Baby", "Home", "Sparkles"]),
})

export async function createCategory(
  _prevState: CategoryFormState,
  formData: FormData
): Promise<CategoryFormState> {
  const parsed = CategorySchema.safeParse(Object.fromEntries(formData))
  if (!parsed.success) {
    return { error: "Preencha todos os campos corretamente." }
  }

  try {
    await prisma.category.create({ data: parsed.data })
  } catch {
    return { error: "Erro ao criar categoria. Verifique se o slug já existe." }
  }

  revalidatePath("/")
  revalidatePath("/catalogo")
  revalidatePath("/admin/categorias")
  redirect("/admin/categorias")
}

export async function updateCategory(
  slug: string,
  _prevState: CategoryFormState,
  formData: FormData
): Promise<CategoryFormState> {
  const parsed = CategorySchema.safeParse(Object.fromEntries(formData))
  if (!parsed.success) {
    return { error: "Preencha todos os campos corretamente." }
  }

  try {
    await prisma.category.update({ where: { slug }, data: parsed.data })
  } catch {
    return { error: "Erro ao atualizar categoria." }
  }

  revalidatePath("/")
  revalidatePath("/catalogo")
  revalidatePath("/admin/categorias")
  redirect("/admin/categorias")
}

export async function deleteCategory(slug: string) {
  await prisma.category.delete({ where: { slug } })
  revalidatePath("/")
  revalidatePath("/catalogo")
  revalidatePath("/admin/categorias")
}
