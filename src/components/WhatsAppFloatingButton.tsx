import Link from "next/link"
import { WhatsAppIcon } from "@/components/WhatsAppIcon"
import { buildWhatsAppUrl } from "@/lib/whatsapp"

export function WhatsAppFloatingButton() {
  const url = buildWhatsAppUrl()

  return (
    <Link
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Falar no WhatsApp"
      className="fixed bottom-5 right-5 z-50 inline-flex h-14 w-14 items-center justify-center sm:bottom-7 sm:right-7"
    >
      <span
        aria-hidden="true"
        className="absolute inset-0 rounded-full bg-[#25D366] opacity-70 animate-soft-pulse"
      />
      <span className="relative inline-flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-warm transition-transform hover:scale-105">
        <WhatsAppIcon className="h-7 w-7" />
      </span>
    </Link>
  )
}
