"use server"

import { revalidatePath } from "next/cache"
import { z } from "zod"
import { prisma } from "@/lib/db"

export type SaleFormState = {
  success?: string
  error?: string
} | null

const SaleSchema = z.object({
  productSlug: z.string().min(1),
  productName: z.string().min(1),
  price: z.coerce.number().positive("Valor deve ser positivo"),
  month: z.coerce.number().min(1).max(12),
  year: z.coerce.number().min(2020),
})

export async function createSale(
  _prevState: SaleFormState,
  formData: FormData
): Promise<SaleFormState> {
  const parsed = SaleSchema.safeParse(Object.fromEntries(formData))
  if (!parsed.success) {
    return { error: "Preencha todos os campos corretamente." }
  }

  try {
    await prisma.saleRecord.create({ data: parsed.data })
  } catch {
    return { error: "Erro ao registrar venda. Tente novamente." }
  }

  revalidatePath("/admin/vendas")
  revalidatePath("/admin/dashboard")
  return { success: "Venda registrada com sucesso!" }
}

export async function deleteSale(id: string) {
  await prisma.saleRecord.delete({ where: { id } })
  revalidatePath("/admin/vendas")
  revalidatePath("/admin/dashboard")
}

export async function getSalesByMonth() {
  const sales = await prisma.saleRecord.findMany({
    orderBy: [{ year: "asc" }, { month: "asc" }],
  })

  const grouped: Record<string, { month: string; total: number; count: number }> = {}
  for (const s of sales) {
    const key = `${s.year}-${String(s.month).padStart(2, "0")}`
    const label = new Date(s.year, s.month - 1).toLocaleString("pt-BR", { month: "short", year: "2-digit" })
    if (!grouped[key]) grouped[key] = { month: label, total: 0, count: 0 }
    grouped[key].total += s.price
    grouped[key].count += 1
  }
  return Object.values(grouped)
}
