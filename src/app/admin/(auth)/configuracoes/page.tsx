import { prisma } from "@/lib/db"
import { siteConfig } from "@/config/site"
import { SettingsForm } from "@/components/admin/SettingsForm"

export default async function ConfiguracoesPage() {
  const settings = await prisma.siteSettings.findUnique({ where: { id: "main" } })
  const s = {
    whatsappNumber: settings?.whatsappNumber ?? siteConfig.whatsappNumber,
    whatsappMessage: settings?.whatsappMessage ?? siteConfig.whatsappMessage,
    instagram: settings?.instagram ?? siteConfig.instagram,
    instagramUrl: settings?.instagramUrl ?? siteConfig.instagramUrl,
    email: settings?.email ?? "",
    artisanName: settings?.artisanName ?? siteConfig.artisanName,
    city: settings?.city ?? siteConfig.city,
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-serif text-3xl text-ink">Configurações</h1>
        <p className="text-sm text-ink-muted">Contato, redes sociais e informações do site</p>
      </div>

      <div className="rounded-2xl border border-cream-300 bg-cream-50 p-6 shadow-soft max-w-2xl">
        <SettingsForm settings={s} />
      </div>

      <div className="rounded-2xl border border-cream-300 bg-cream-50 p-6 shadow-soft max-w-2xl">
        <p className="mb-3 text-xs uppercase tracking-[0.18em] text-copper-600">Preview do link WhatsApp</p>
        <code className="block break-all rounded-xl bg-cream-100 px-4 py-3 text-xs text-ink-muted">
          {`https://wa.me/${s.whatsappNumber}?text=${encodeURIComponent(s.whatsappMessage + " ")}`}
        </code>
      </div>
    </div>
  )
}
