import { siteConfig } from "@/config/site"
import { formatBRL } from "@/lib/format"

type BuildArgs = {
  productName?: string
  price?: number
  customMessage?: string
}

export function buildWhatsAppUrl(args: BuildArgs = {}): string {
  const { productName, price, customMessage } = args
  const base = `https://wa.me/${siteConfig.whatsappNumber}`

  let text: string
  if (customMessage) {
    text = customMessage
  } else if (productName) {
    const priceLabel = typeof price === "number" ? ` - ${formatBRL(price)}` : ""
    text = `${siteConfig.whatsappMessage} ${productName}${priceLabel}`
  } else {
    text = `${siteConfig.whatsappMessage} `
  }

  return `${base}?text=${encodeURIComponent(text)}`
}
