"use client"

import { useState } from "react"
import { Menu } from "lucide-react"
import { AdminNav } from "@/components/admin/AdminNav"

type Props = {
  children: React.ReactNode
  username: string
}

export function AdminShell({ children, username }: Props) {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="flex h-screen overflow-hidden bg-sand-100">
      <AdminNav open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className="flex flex-1 flex-col overflow-hidden lg:ml-0">
        {/* Top bar */}
        <header className="flex h-14 shrink-0 items-center justify-between border-b border-cream-300 bg-cream-50 px-4 sm:px-6">
          <div className="flex items-center gap-3">
            {/* Hambúrguer — visível só em mobile */}
            <button
              type="button"
              onClick={() => setSidebarOpen(true)}
              aria-label="Abrir menu"
              className="lg:hidden inline-flex h-9 w-9 items-center justify-center rounded-xl text-ink-soft hover:bg-cream-200"
            >
              <Menu className="h-5 w-5" strokeWidth={1.6} />
            </button>
            <span className="text-sm text-ink-muted">
              Olá, <span className="font-medium text-ink">{username}</span>
            </span>
          </div>
          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-terracotta-600 hover:underline"
          >
            Ver site →
          </a>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6">{children}</main>
      </div>
    </div>
  )
}
