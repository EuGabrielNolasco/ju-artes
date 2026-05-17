"use server"

import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"
import { z } from "zod"
import { prisma } from "@/lib/db"
import { writeFile, unlink } from "fs/promises"
import path from "path"

const ProductSchema = z.object({
  slug: z.string().min(1).regex(/^[a-z0-9-]+$/),
  name: z.string().min(1),
  description: z.string().min(1),
  price: z.coerce.number().positive(),
  category: z.string().min(1),
  image: z.string(),
  featured: z.coerce.boolean().optional().default(false),
  available: z.coerce.boolean().optional().default(true),
  materials: z.string().optional().default("[]"),
})

export async function createProduct(formData: FormData): Promise<void> {
  const imageFile = formData.get("imageFile") as File | null
  let imagePath = (formData.get("image") as string) ?? ""

  if (imageFile && imageFile.size > 0) {
    const ext = imageFile.name.split(".").pop() ?? "jpg"
    const slug = formData.get("slug") as string
    const filename = `${slug}.${ext}`
    const bytes = await imageFile.arrayBuffer()
    const dest = path.join(process.cwd(), "public", "products", filename)
    await writeFile(dest, Buffer.from(bytes))
    imagePath = `/products/${filename}`
  }

  const parsed = ProductSchema.safeParse({
    ...Object.fromEntries(formData),
    image: imagePath,
    featured: formData.get("featured") === "on",
    available: formData.get("available") === "on",
  })

  if (!parsed.success) return

  await prisma.product.create({ data: parsed.data })
  revalidatePath("/")
  revalidatePath("/catalogo")
  revalidatePath("/admin/produtos")
  redirect("/admin/produtos")
}

export async function updateProduct(slug: string, formData: FormData): Promise<void> {
  const imageFile = formData.get("imageFile") as File | null
  let imagePath = (formData.get("image") as string) ?? ""

  if (imageFile && imageFile.size > 0) {
    const ext = imageFile.name.split(".").pop() ?? "jpg"
    const filename = `${slug}.${ext}`
    const bytes = await imageFile.arrayBuffer()
    const dest = path.join(process.cwd(), "public", "products", filename)
    await writeFile(dest, Buffer.from(bytes))
    imagePath = `/products/${filename}`
  }

  const parsed = ProductSchema.safeParse({
    ...Object.fromEntries(formData),
    image: imagePath,
    featured: formData.get("featured") === "on",
    available: formData.get("available") === "on",
  })

  if (!parsed.success) return

  await prisma.product.update({ where: { slug }, data: parsed.data })
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
  if (product?.image.startsWith("/products/")) {
    try {
      await unlink(path.join(process.cwd(), "public", product.image))
    } catch {
      // image may not exist on disk — ignore
    }
  }
  await prisma.product.delete({ where: { slug } })
  revalidatePath("/")
  revalidatePath("/catalogo")
  revalidatePath("/admin/produtos")
}
