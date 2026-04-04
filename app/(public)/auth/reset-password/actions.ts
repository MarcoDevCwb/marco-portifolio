"use server"

import { createServerClient } from "@supabase/ssr"
import { cookies } from "next/headers"

export async function resetPasswordAction(formData: FormData) {
  const password = formData.get("password") as string

  if (!password) {
    return {
      error: "Senha é obrigatória",
    }
  }

  if (password.length < 6) {
    return {
      error: "A senha deve ter pelo menos 6 caracteres",
    }
  }

  const cookieStore = await cookies()

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll()
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) => {
              cookieStore.set(name, value, options)
            })
          } catch {
            // Em alguns contextos de Server Action isso pode falhar silenciosamente.
          }
        },
      },
    }
  )

  const { error } = await supabase.auth.updateUser({
    password,
  })

  if (error) {
    return {
      error: error.message,
    }
  }

  return {
    success: true,
  }
}