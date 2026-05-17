import { cache } from "react"
import { prisma } from "@/lib/db"
import { siteConfig } from "@/config/site"

export const getSettings = cache(async () => {
  try {
    const settings = await prisma.siteSettings.findUnique({ where: { id: "main" } })
    if (settings) return settings
  } catch {
    // DB not available — fall back to static config
  }
  return {
    id: "main",
    whatsappNumber: siteConfig.whatsappNumber,
    whatsappMessage: siteConfig.whatsappMessage,
    instagram: siteConfig.instagram,
    instagramUrl: siteConfig.instagramUrl,
    email: "",
    artisanName: siteConfig.artisanName,
    city: siteConfig.city,
  }
})
