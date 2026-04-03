"use server"

import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"

type ResetPasswordState = {
  error?: string
}

export async function resetPasswordAction(
  _prevState: ResetPasswordState,
  formData: FormData
): Promise<ResetPasswordState> {
  const password = String(formData.get("password") ?? "")
  const confirmPassword = String(formData.get("confirmPassword") ?? "")

  if (!password || !confirmPassword) {
    return { error: "Preencha os dois campos de senha." }
  }

  if (password.length < 8) {
    return { error: "A nova senha deve ter no mínimo 8 caracteres." }
  }

  if (password !== confirmPassword) {
    return { error: "As senhas não coincidem." }
  }

  const supabase = await createClient()

  const { error } = await supabase.auth.updateUser({
    password,
  })

  if (error) {
    return { error: "Não foi possível atualizar a senha." }
  }

  redirect("/login")
}