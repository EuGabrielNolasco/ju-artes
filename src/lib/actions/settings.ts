"use server"

import { revalidatePath } from "next/cache"
import { z } from "zod"
import { prisma } from "@/lib/db"

export type SettingsFormState = {
  success?: string
  error?: string
} | null

const SettingsSchema = z.object({
  whatsappNumber: z.string().min(1, "Número obrigatório"),
  whatsappMessage: z.string().min(1, "Mensagem obrigatória"),
  instagram: z.string().min(1, "Instagram obrigatório"),
  instagramUrl: z.string().url("URL inválida"),
  email: z.string().email("Email inválido").or(z.literal("")),
  artisanName: z.string().min(1, "Nome obrigatório"),
  city: z.string().min(1, "Cidade obrigatória"),
})

export async function getSettings() {
  return prisma.siteSettings.findUnique({ where: { id: "main" } })
}

export async function updateSettings(
  _prevState: SettingsFormState,
  formData: FormData
): Promise<SettingsFormState> {
  const parsed = SettingsSchema.safeParse(Object.fromEntries(formData))
  if (!parsed.success) {
    const first = Object.values(parsed.error.flatten().fieldErrors).flat()[0]
    return { error: first ?? "Verifique os campos obrigatórios." }
  }

  try {
    await prisma.siteSettings.upsert({
      where: { id: "main" },
      update: parsed.data,
      create: { id: "main", ...parsed.data },
    })
  } catch {
    return { error: "Erro ao salvar configurações. Tente novamente." }
  }

  revalidatePath("/")
  revalidatePath("/admin/configuracoes")
  return { success: "Configurações salvas com sucesso!" }
}
