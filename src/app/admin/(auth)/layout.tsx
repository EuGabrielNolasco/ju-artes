import { requireAuth } from "@/lib/auth"
import { AdminShell } from "@/components/admin/AdminShell"

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await requireAuth()

  return (
    <AdminShell username={session.username}>
      {children}
    </AdminShell>
  )
}
