"use server"

import { redirect } from "next/navigation"
import { getSession } from "@/lib/auth"

export async function loginAction(formData: FormData): Promise<void> {
  const username = formData.get("username") as string
  const password = formData.get("password") as string

  const validUsername = process.env.ADMIN_USERNAME ?? "admin"
  const validPassword = process.env.ADMIN_PASSWORD ?? "juartes2024"

  if (username !== validUsername || password !== validPassword) {
    return
  }

  const session = await getSession()
  session.isLoggedIn = true
  session.username = username
  await session.save()
  redirect("/admin/dashboard")
}

export async function logoutAction() {
  const session = await getSession()
  session.destroy()
  redirect("/admin")
}
