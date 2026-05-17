"use server"

import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"
import { z } from "zod"
import { prisma } from "@/lib/db"

const CategorySchema = z.object({
  slug: z.string().min(1).regex(/^[a-z0-9-]+$/),
  name: z.string().min(1),
  description: z.string().min(1),
  gradient: z.string().min(1),
  iconName: z.enum(["ShoppingBag", "Baby", "Home", "Sparkles"]),
})

export async function createCategory(formData: FormData): Promise<void> {
  const parsed = CategorySchema.safeParse(Object.fromEntries(formData))
  if (!parsed.success) return

  await prisma.category.create({ data: parsed.data })
  revalidatePath("/")
  revalidatePath("/catalogo")
  revalidatePath("/admin/categorias")
  redirect("/admin/categorias")
}

export async function updateCategory(slug: string, formData: FormData): Promise<void> {
  const parsed = CategorySchema.safeParse(Object.fromEntries(formData))
  if (!parsed.success) return

  await prisma.category.update({ where: { slug }, data: parsed.data })
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
