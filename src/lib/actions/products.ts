"use server"

import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"
import { z } from "zod"
import { prisma } from "@/lib/db"
import { put, del } from "@vercel/blob"

export type ProductFormState = {
  error?: string
  fieldErrors?: Record<string, string[] | undefined>
} | null

const ProductSchema = z.object({
  slug: z.string().min(1).regex(/^[a-z0-9-]+$/),
  name: z.string().min(1, "Nome obrigatório"),
  description: z.string().min(1, "Descrição obrigatória"),
  price: z.coerce.number().positive("Preço deve ser positivo"),
  category: z.string().min(1, "Categoria obrigatória"),
  image: z.string(),
  featured: z.coerce.boolean().optional().default(false),
  available: z.coerce.boolean().optional().default(true),
  materials: z.string().optional().default("[]"),
})

async function uploadImage(imageFile: File, slug: string): Promise<string> {
  const ext = imageFile.name.split(".").pop() ?? "jpg"
  const blob = await put(`products/${slug}.${ext}`, imageFile, {
    access: "public",
    allowOverwrite: true,
  })
  return blob.url
}

export async function createProduct(
  _prevState: ProductFormState,
  formData: FormData
): Promise<ProductFormState> {
  const imageFile = formData.get("imageFile") as File | null
  const slug = formData.get("slug") as string
  let imagePath = (formData.get("image") as string) ?? ""

  if (imageFile && imageFile.size > 0) {
    try {
      imagePath = await uploadImage(imageFile, slug)
    } catch {
      return { error: "Falha no upload da imagem. Tente novamente." }
    }
  }

  const parsed = ProductSchema.safeParse({
    ...Object.fromEntries(formData),
    image: imagePath,
    featured: formData.get("featured") === "on",
    available: formData.get("available") === "on",
  })

  if (!parsed.success) {
    return { fieldErrors: parsed.error.flatten().fieldErrors }
  }

  try {
    await prisma.product.create({ data: parsed.data })
  } catch {
    return { error: "Erro ao salvar produto. Verifique se o slug já existe." }
  }

  revalidatePath("/")
  revalidatePath("/catalogo")
  revalidatePath("/admin/produtos")
  redirect("/admin/produtos")
}

export async function updateProduct(
  slug: string,
  _prevState: ProductFormState,
  formData: FormData
): Promise<ProductFormState> {
  const imageFile = formData.get("imageFile") as File | null
  let imagePath = (formData.get("image") as string) ?? ""

  if (imageFile && imageFile.size > 0) {
    try {
      imagePath = await uploadImage(imageFile, slug)
    } catch {
      return { error: "Falha no upload da imagem. Tente novamente." }
    }
  }

  const parsed = ProductSchema.safeParse({
    ...Object.fromEntries(formData),
    image: imagePath,
    featured: formData.get("featured") === "on",
    available: formData.get("available") === "on",
  })

  if (!parsed.success) {
    return { fieldErrors: parsed.error.flatten().fieldErrors }
  }

  try {
    await prisma.product.update({ where: { slug }, data: parsed.data })
  } catch {
    return { error: "Erro ao atualizar produto." }
  }

  revalidatePath("/")
  revalidatePath("/catalogo")
  revalidatePath("/admin/produtos")
  redirect("/admin/produtos")
}

export async function toggleProductAvailability(slug: string, available: boolean) {
  await prisma.product.update({ where: { slug }, data: { available } })
  revalidatePath("/")
  revalidatePath("/catalogo")
  revalidatePath("/admin/produtos")
}

export async function deleteProduct(slug: string) {
  const product = await prisma.product.findUnique({ where: { slug } })
  if (product?.image?.startsWith("https://")) {
    try { await del(product.image) } catch { /* ignore */ }
  }
  await prisma.product.delete({ where: { slug } })
  revalidatePath("/")
  revalidatePath("/catalogo")
  revalidatePath("/admin/produtos")
}
