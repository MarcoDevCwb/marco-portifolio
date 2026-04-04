"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Eye, EyeOff, LockKeyhole } from "lucide-react"
import { createClient } from "@/lib/supabase/client"

export function UpdatePasswordForm() {
  const router = useRouter()
  const supabase = createClient()

  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setError("")
    setSuccess("")

    if (password.length < 8) {
      setError("A nova senha deve ter no mínimo 8 caracteres.")
      return
    }

    if (password !== confirmPassword) {
      setError("As senhas não coincidem.")
      return
    }

    setLoading(true)

    const { error } = await supabase.auth.updateUser({
      password,
    })

    if (error) {
      setError("Não foi possível atualizar a senha.")
      setLoading(false)
      return
    }

    setSuccess("Senha atualizada com sucesso.")
    setLoading(false)

    setTimeout(() => {
      router.push("/login")
      router.refresh()
    }, 1200)
  }

  return (
    <div className="rounded-[32px] border border-white/10 bg-white/[0.03] p-6 shadow-[0_16px_50px_rgba(0,0,0,0.35)] backdrop-blur-xl sm:p-8">
      <div className="mb-8">
        <span className="inline-flex rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-[11px] uppercase tracking-[0.24em] text-white/50">
          Update password
        </span>

        <h2 className="mt-5 text-3xl font-semibold tracking-[-0.03em] text-white">
          Nova senha
        </h2>

        <p className="mt-3 text-sm leading-7 text-white/58">
          Defina sua nova senha para continuar usando o painel.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="mb-2 block text-sm text-white/70">
            Nova senha
          </label>
          <div className="relative">
            <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-white/35">
              <LockKeyhole className="h-4 w-4" />
            </span>

            <input
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              type={showPassword ? "text" : "password"}
              placeholder="••••••••"
              className="h-14 w-full rounded-2xl border border-white/10 bg-black/40 pl-12 pr-14 text-white outline-none placeholder:text-white/28 focus:border-violet-400/40"
              required
            />

            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-white/45 transition hover:text-white"
            >
              {showPassword ? (
                <EyeOff className="h-4 w-4" />
              ) : (
                <Eye className="h-4 w-4" />
              )}
            </button>
          </div>
        </div>

        <div>
          <label className="mb-2 block text-sm text-white/70">
            Confirmar senha
          </label>
          <div className="relative">
            <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-white/35">
              <LockKeyhole className="h-4 w-4" />
            </span>

            <input
              value={confirmPassword}
              onChange={(event) => setConfirmPassword(event.target.value)}
              type={showConfirmPassword ? "text" : "password"}
              placeholder="••••••••"
              className="h-14 w-full rounded-2xl border border-white/10 bg-black/40 pl-12 pr-14 text-white outline-none placeholder:text-white/28 focus:border-violet-400/40"
              required
            />

            <button
              type="button"
              onClick={() => setShowConfirmPassword((prev) => !prev)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-white/45 transition hover:text-white"
            >
              {showConfirmPassword ? (
                <EyeOff className="h-4 w-4" />
              ) : (
                <Eye className="h-4 w-4" />
              )}
            </button>
          </div>
        </div>

        {error ? (
          <div className="rounded-2xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-200">
            {error}
          </div>
        ) : null}

        {success ? (
          <div className="rounded-2xl border border-emerald-500/20 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-200">
            {success}
          </div>
        ) : null}

        <button
          type="submit"
          disabled={loading}
          className="inline-flex h-14 w-full items-center justify-center rounded-2xl border border-white/10 bg-white text-sm font-medium text-black transition hover:opacity-92 disabled:cursor-not-allowed disabled:opacity-70"
        >
          {loading ? "Salvando..." : "Atualizar senha"}
        </button>
      </form>
    </div>
  )
}