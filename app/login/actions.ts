"use server"

import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"

type LoginResult = {
  error?: string
}

export async function loginAction(
  _prevState: LoginResult,
  formData: FormData
): Promise<LoginResult> {
  const email = String(formData.get("email") ?? "").trim()
  const password = String(formData.get("password") ?? "")

  if (!email || !password) {
    return { error: "Preencha email e senha." }
  }

  const supabase = await createClient()

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })

  if (error) {
    return { error: "Email ou senha inválidos." }
  }

  redirect("/admin")
}