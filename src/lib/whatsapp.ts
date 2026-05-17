import { siteConfig } from "@/config/site"
import { formatBRL } from "@/lib/format"

type Settings = { whatsappNumber: string; whatsappMessage: string }

type BuildArgs = {
  productName?: string
  price?: number
  customMessage?: string
  settings?: Settings
}

export function buildWhatsAppUrl(args: BuildArgs = {}): string {
  const { productName, price, customMessage, settings } = args
  const number = settings?.whatsappNumber ?? siteConfig.whatsappNumber
  const message = settings?.whatsappMessage ?? siteConfig.whatsappMessage
  const base = `https://wa.me/${number}`

  let text: string
  if (customMessage) {
    text = customMessage
  } else if (productName) {
    const priceLabel = typeof price === "number" ? ` - ${formatBRL(price)}` : ""
    text = `${message} ${productName}${priceLabel}`
  } else {
    text = `${message} `
  }

  return `${base}?text=${encodeURIComponent(text)}`
}
