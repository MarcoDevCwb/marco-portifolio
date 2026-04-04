"use server"

import { createClient } from "@/lib/supabase/server"

type ForgotPasswordState = {
  error?: string
  success?: string
}

export async function forgotPasswordAction(
  _prevState: ForgotPasswordState,
  formData: FormData
): Promise<ForgotPasswordState> {
  const email = String(formData.get("email") ?? "").trim()

  if (!email) {
    return { error: "Informe seu email." }
  }

  const supabase = await createClient()
  const origin = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3001"

  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${origin}/auth/callback?next=/auth/update-password`,
  })

  if (error) {
    return { error: "Não foi possível enviar o link de recuperação." }
  }

  return {
    success:
      "Se o email existir, enviamos um link de recuperação para sua caixa de entrada.",
  }
}