"use server"

import { revalidatePath } from "next/cache"
import { z } from "zod"
import { prisma } from "@/lib/db"

const SettingsSchema = z.object({
  whatsappNumber: z.string().min(1),
  whatsappMessage: z.string().min(1),
  instagram: z.string().min(1),
  instagramUrl: z.string().url(),
  email: z.string().email().or(z.literal("")),
  artisanName: z.string().min(1),
  city: z.string().min(1),
})

export async function getSettings() {
  const settings = await prisma.siteSettings.findUnique({ where: { id: "main" } })
  return settings
}

export async function updateSettings(formData: FormData) {
  const parsed = SettingsSchema.safeParse(Object.fromEntries(formData))
  if (!parsed.success) return { error: parsed.error.flatten().fieldErrors }

  await prisma.siteSettings.upsert({
    where: { id: "main" },
    update: parsed.data,
    create: { id: "main", ...parsed.data },
  })

  revalidatePath("/")
  revalidatePath("/admin/configuracoes")
  return { success: true }
}
