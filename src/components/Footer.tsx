import Link from "next/link"
import { Scissors } from "lucide-react"
import { siteConfig } from "@/config/site"
import { getSettings } from "@/lib/getSettings"
import { buildWhatsAppUrl } from "@/lib/whatsapp"
import { prisma } from "@/lib/db"
import { WhatsAppIcon } from "@/components/WhatsAppIcon"
import { InstagramIcon } from "@/components/InstagramIcon"

const storeLinks = [
  { href: "/", label: "Início" },
  { href: "/catalogo", label: "Catálogo" },
  { href: "/#sobre", label: "Sobre" },
]

export async function Footer() {
  const [settings, categories] = await Promise.all([
    getSettings(),
    prisma.category.findMany({ orderBy: { name: "asc" }, select: { slug: true, name: true } }),
  ])

  const year = new Date().getFullYear()
  const whatsappUrl = buildWhatsAppUrl({ settings })

  return (
    <footer id="contato" className="relative mt-20 border-t border-cream-300 bg-cream-100">
      <div className="container py-14 grid gap-12 md:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
        {/* Brand */}
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <span className="flex h-11 w-11 items-center justify-center rounded-full bg-terracotta-500 text-cream-50 shadow-soft">
              <Scissors className="h-5 w-5" strokeWidth={1.6} />
            </span>
            <div className="flex flex-col leading-tight">
              <span className="font-serif text-xl text-ink">{siteConfig.name}</span>
              <span className="text-[11px] uppercase tracking-[0.22em] text-copper-500">{siteConfig.tagline}</span>
            </div>
          </div>
          <p className="font-serif text-lg italic text-ink-soft max-w-sm">
            &ldquo;Cada peça nasce de um afeto e ganha o mundo costurada à mão.&rdquo;
          </p>
          <p className="text-sm text-ink-muted">{settings.city}</p>
        </div>

        {/* Loja */}
        <div className="space-y-3">
          <h4 className="font-serif text-base text-ink">Loja</h4>
          <ul className="space-y-2">
            {storeLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="text-sm text-ink-muted transition-colors hover:text-terracotta-600">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Categorias — vêm do banco */}
        <div className="space-y-3">
          <h4 className="font-serif text-base text-ink">Categorias</h4>
          <ul className="space-y-2">
            {categories.map((cat) => (
              <li key={cat.slug}>
                <Link href={`/catalogo?categoria=${cat.slug}`} className="text-sm text-ink-muted transition-colors hover:text-terracotta-600">
                  {cat.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contato — vem do banco */}
        <div className="space-y-4">
          <h4 className="font-serif text-base text-ink">Vamos conversar</h4>
          <p className="text-sm text-ink-muted">
            Combine seu pedido pelo WhatsApp ou veja novidades no Instagram.
          </p>
          <div className="flex items-center gap-3">
            <Link
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Falar no WhatsApp"
              className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-[#25D366] text-white shadow-soft transition-transform hover:scale-105"
            >
              <WhatsAppIcon className="h-5 w-5" />
            </Link>
            <Link
              href={settings.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Abrir Instagram"
              className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-terracotta-500 text-cream-50 shadow-soft transition-transform hover:scale-105"
            >
              <InstagramIcon className="h-5 w-5" />
            </Link>
          </div>
          <p className="text-xs text-ink-muted">@{settings.instagram}</p>
          {settings.email && (
            <a href={`mailto:${settings.email}`} className="block text-xs text-ink-muted hover:text-terracotta-600 transition-colors">
              {settings.email}
            </a>
          )}
        </div>
      </div>

      <div className="border-t border-cream-300/80">
        <div className="container py-5 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between text-xs text-ink-muted">
          <span>© {year} {siteConfig.name}. Todos os direitos reservados.</span>
          <span className="inline-flex items-center gap-1.5">
            Feito com <span className="text-terracotta-500">♥</span> e linha por linha.
          </span>
        </div>
      </div>
    </footer>
  )
}
