import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { getIronSession } from "iron-session"
import type { SessionData } from "@/lib/auth"

const sessionOptions = {
  password: process.env.SESSION_SECRET ?? "fallback-secret-must-be-32-chars!!",
  cookieName: "ju-artes-admin",
  cookieOptions: {
    secure: process.env.NODE_ENV === "production",
    httpOnly: true,
    sameSite: "lax" as const,
  },
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  if (!pathname.startsWith("/admin")) return NextResponse.next()
  if (pathname === "/admin" || pathname === "/admin/") return NextResponse.next()

  const response = NextResponse.next()
  const session = await getIronSession<SessionData>(request, response, sessionOptions)

  if (!session.isLoggedIn) {
    return NextResponse.redirect(new URL("/admin", request.url))
  }
  return response
}

export const config = {
  matcher: ["/admin/:path+"],
}
