import { getSession } from "@/lib/auth"
import { redirect } from "next/navigation"
import { loginAction } from "@/lib/actions/auth"
import { Scissors } from "lucide-react"

export default async function AdminLoginPage() {
  const session = await getSession()
  if (session.isLoggedIn) redirect("/admin/dashboard")

  return (
    <div className="flex min-h-screen items-center justify-center bg-sand-100 px-4">
      <div className="w-full max-w-sm">
        <div className="mb-8 flex flex-col items-center gap-3 text-center">
          <span className="flex h-14 w-14 items-center justify-center rounded-full bg-terracotta-500 text-cream-50 shadow-warm">
            <Scissors className="h-6 w-6" strokeWidth={1.6} />
          </span>
          <div>
            <h1 className="font-serif text-2xl text-ink">Ju Artes</h1>
            <p className="text-sm text-ink-muted">Área administrativa</p>
          </div>
        </div>

        <div className="rounded-3xl border border-cream-300 bg-cream-50 p-8 shadow-soft">
          <LoginForm />
        </div>
      </div>
    </div>
  )
}

function LoginForm() {
  return (
    <form action={loginAction} className="space-y-5">
      <div className="space-y-1.5">
        <label htmlFor="username" className="block text-xs uppercase tracking-[0.18em] text-ink-muted">
          Usuário
        </label>
        <input
          id="username"
          name="username"
          type="text"
          required
          autoComplete="username"
          className="w-full rounded-xl border border-cream-300 bg-white px-4 py-2.5 text-sm text-ink outline-none focus:border-terracotta-400 focus:ring-2 focus:ring-terracotta-200 transition-all"
        />
      </div>

      <div className="space-y-1.5">
        <label htmlFor="password" className="block text-xs uppercase tracking-[0.18em] text-ink-muted">
          Senha
        </label>
        <input
          id="password"
          name="password"
          type="password"
          required
          autoComplete="current-password"
          className="w-full rounded-xl border border-cream-300 bg-white px-4 py-2.5 text-sm text-ink outline-none focus:border-terracotta-400 focus:ring-2 focus:ring-terracotta-200 transition-all"
        />
      </div>

      <button
        type="submit"
        className="w-full rounded-full bg-terracotta-500 py-2.5 text-sm font-medium text-cream-50 shadow-soft transition-all hover:bg-terracotta-600 hover:shadow-warm"
      >
        Entrar
      </button>
    </form>
  )
}
