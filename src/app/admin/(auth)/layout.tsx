import { requireAuth } from "@/lib/auth"
import { AdminNav } from "@/components/admin/AdminNav"

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await requireAuth()

  return (
    <div className="flex h-screen bg-sand-100 overflow-hidden">
      <AdminNav />
      <div className="flex flex-1 flex-col overflow-hidden">
        <header className="flex h-14 shrink-0 items-center justify-between border-b border-cream-300 bg-cream-50 px-6">
          <span className="text-sm text-ink-muted">
            Olá, <span className="font-medium text-ink">{session.username}</span>
          </span>
          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-terracotta-600 hover:underline"
          >
            Ver site →
          </a>
        </header>
        <main className="flex-1 overflow-y-auto p-6">{children}</main>
      </div>
    </div>
  )
}
