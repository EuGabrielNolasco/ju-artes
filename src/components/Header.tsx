"use client"

import * as React from "react"
import Link from "next/link"
import { Menu, Scissors, X } from "lucide-react"
import { siteConfig } from "@/config/site"
import { cn } from "@/lib/utils"

const navItems = [
  { href: "/", label: "Início" },
  { href: "/catalogo", label: "Catálogo" },
  { href: "/#sobre", label: "Sobre" },
  { href: "/#contato", label: "Contato" },
]

type HeaderProps = { whatsappUrl: string }

export function Header({ whatsappUrl }: HeaderProps) {
  const [open, setOpen] = React.useState(false)
  const [scrolled, setScrolled] = React.useState(false)

  React.useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 24)
    handler()
    window.addEventListener("scroll", handler, { passive: true })
    return () => window.removeEventListener("scroll", handler)
  }, [])

  React.useEffect(() => {
    document.body.style.overflow = open ? "hidden" : ""
    return () => {
      document.body.style.overflow = ""
    }
  }, [open])

  return (
    <>
      <header
        className={cn(
          "sticky top-0 z-40 w-full transition-all duration-300",
          scrolled
            ? "bg-cream-50/90 backdrop-blur-md shadow-soft"
            : "bg-cream-50/50 backdrop-blur-sm"
        )}
      >
        <div className="container flex h-20 items-center justify-between gap-4">
          <Link
            href="/"
            className="flex items-center gap-3 group"
            aria-label={`${siteConfig.name} — Página inicial`}
          >
            <span className="flex h-11 w-11 items-center justify-center rounded-full bg-terracotta-500 text-cream-50 shadow-soft transition-transform group-hover:rotate-[-8deg]">
              <Scissors className="h-5 w-5" strokeWidth={1.6} />
            </span>
            <span className="flex flex-col leading-tight">
              <span className="font-serif text-xl text-ink">{siteConfig.name}</span>
              <span className="text-[11px] uppercase tracking-[0.22em] text-copper-500">
                {siteConfig.tagline}
              </span>
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-full px-4 py-2 text-sm text-ink-soft transition-colors hover:bg-cream-200 hover:text-ink"
              >
                {item.label}
              </Link>
            ))}
            <Link
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="ml-2 inline-flex h-10 items-center gap-2 rounded-full bg-terracotta-500 px-5 text-sm font-medium text-cream-50 shadow-soft transition-all hover:bg-terracotta-600 hover:shadow-warm"
            >
              Fale comigo
            </Link>
          </nav>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? "Fechar menu" : "Abrir menu"}
            className="md:hidden inline-flex h-11 w-11 items-center justify-center rounded-full bg-cream-100 text-ink shadow-soft transition-colors hover:bg-cream-200"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </header>

      {/*
        Drawer fora do <header> para evitar problemas de stacking context
        em iOS Safari com sticky + fixed aninhados.
      */}
      <div
        id="mobile-nav"
        role="dialog"
        aria-modal="true"
        aria-label="Menu de navegação"
        className={cn(
          "md:hidden fixed inset-0 z-50 transition-all duration-300",
          open ? "pointer-events-auto" : "pointer-events-none"
        )}
        aria-hidden={!open}
      >
        {/* Backdrop escuro */}
        <div
          className={cn(
            "absolute inset-0 bg-ink/50 backdrop-blur-sm transition-opacity duration-300",
            open ? "opacity-100" : "opacity-0"
          )}
          onClick={() => setOpen(false)}
        />

        {/* Painel lateral com fundo sólido */}
        <aside
          className={cn(
            "absolute right-0 top-0 h-full w-[85%] max-w-xs",
            "flex flex-col bg-cream-50 shadow-warm-lg",
            "transition-transform duration-300 ease-in-out",
            open ? "translate-x-0" : "translate-x-full"
          )}
        >
          {/* Cabeçalho do drawer */}
          <div className="flex items-center justify-between border-b border-cream-300 px-6 py-5">
            <div className="flex items-center gap-3">
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-terracotta-500 text-cream-50">
                <Scissors className="h-4 w-4" strokeWidth={1.6} />
              </span>
              <span className="font-serif text-lg text-ink">{siteConfig.name}</span>
            </div>
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Fechar menu"
              className="inline-flex h-10 w-10 items-center justify-center rounded-full text-ink-muted hover:bg-cream-200"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Links de navegação */}
          <nav className="flex flex-col gap-1 p-4 pt-5">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="rounded-2xl px-4 py-3.5 text-base font-medium text-ink transition-colors hover:bg-cream-100 hover:text-terracotta-700 active:bg-cream-200"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* CTA WhatsApp no rodapé do drawer */}
          <div className="mt-auto border-t border-cream-300 p-5">
            <Link
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setOpen(false)}
              className="flex h-12 w-full items-center justify-center gap-2 rounded-full bg-terracotta-500 px-6 text-sm font-medium text-cream-50 shadow-soft hover:bg-terracotta-600"
            >
              Falar no WhatsApp
            </Link>
          </div>
        </aside>
      </div>
    </>
  )
}
