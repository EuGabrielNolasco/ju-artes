"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { BarChart3, ChevronRight, Grid3x3, LogOut, Package, Scissors, Settings, ShoppingBag } from "lucide-react"
import { logoutAction } from "@/lib/actions/auth"
import { cn } from "@/lib/utils"

const navItems = [
  { href: "/admin/dashboard", label: "Dashboard", icon: BarChart3 },
  { href: "/admin/produtos", label: "Produtos", icon: Package },
  { href: "/admin/categorias", label: "Categorias", icon: Grid3x3 },
  { href: "/admin/vendas", label: "Vendas", icon: ShoppingBag },
  { href: "/admin/configuracoes", label: "Configurações", icon: Settings },
]

export function AdminNav() {
  const pathname = usePathname()

  return (
    <aside className="flex h-screen w-60 shrink-0 flex-col border-r border-cream-300 bg-cream-50">
      {/* Logo */}
      <div className="flex items-center gap-3 border-b border-cream-300 px-5 py-5">
        <span className="flex h-9 w-9 items-center justify-center rounded-full bg-terracotta-500 text-cream-50">
          <Scissors className="h-4 w-4" strokeWidth={1.6} />
        </span>
        <div className="leading-tight">
          <p className="font-serif text-base text-ink">Ju Artes</p>
          <p className="text-[0.6rem] uppercase tracking-[0.2em] text-copper-500">Painel Admin</p>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-0.5 p-3">
        {navItems.map(({ href, label, icon: Icon }) => {
          const active = pathname === href || pathname.startsWith(href + "/")
          return (
            <Link
              key={href}
              href={href}
              className={cn(
                "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition-colors",
                active
                  ? "bg-terracotta-500 text-cream-50 font-medium"
                  : "text-ink-soft hover:bg-cream-200 hover:text-ink"
              )}
            >
              <Icon className="h-4 w-4 shrink-0" strokeWidth={1.6} />
              {label}
              {active && <ChevronRight className="ml-auto h-3.5 w-3.5 opacity-70" />}
            </Link>
          )
        })}
      </nav>

      {/* Logout */}
      <div className="border-t border-cream-300 p-3">
        <form action={logoutAction}>
          <button
            type="submit"
            className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-ink-soft transition-colors hover:bg-red-50 hover:text-red-600"
          >
            <LogOut className="h-4 w-4 shrink-0" strokeWidth={1.6} />
            Sair
          </button>
        </form>
      </div>
    </aside>
  )
}
