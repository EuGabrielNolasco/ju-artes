import { getIronSession } from "iron-session"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"

export type SessionData = {
  isLoggedIn: boolean
  username: string
}

const sessionOptions = {
  password: process.env.SESSION_SECRET ?? "fallback-secret-must-be-32-chars!!",
  cookieName: "ju-artes-admin",
  cookieOptions: {
    secure: process.env.NODE_ENV === "production",
    httpOnly: true,
    sameSite: "lax" as const,
  },
}

export async function getSession() {
  return getIronSession<SessionData>(await cookies(), sessionOptions)
}

export async function requireAuth() {
  const session = await getSession()
  if (!session.isLoggedIn) {
    redirect("/admin")
  }
  return session
}
