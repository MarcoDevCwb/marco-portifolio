"use client"

import { useActionState, useState } from "react"
import { Eye, EyeOff, LockKeyhole } from "lucide-react"
import { resetPasswordAction } from "@/app/(public)/auth/update-password/actions"

type ResetPasswordState = {
  error?: string
}

const initialState: ResetPasswordState = {}

export function ResetPasswordForm() {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const [state, formAction, pending] = useActionState(
    resetPasswordAction,
    initialState
  )

  return (
    <div className="relative overflow-hidden rounded-[32px] border border-white/10 bg-white/[0.03] shadow-[0_16px_50px_rgba(0,0,0,0.35)] backdrop-blur-xl">
      <div className="relative p-6 sm:p-8">
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

        <form action={formAction} className="space-y-4">
          <div>
            <label className="mb-2 block text-sm text-white/70">
              Nova senha
            </label>
            <div className="relative">
              <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-white/35">
                <LockKeyhole className="h-4 w-4" />
              </span>

              <input
                name="password"
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                className="h-14 w-full rounded-2xl border border-white/10 bg-black/40 pl-12 pr-14 text-white outline-none transition placeholder:text-white/28 focus:border-violet-400/40 focus:bg-black/55"
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
                name="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                placeholder="••••••••"
                className="h-14 w-full rounded-2xl border border-white/10 bg-black/40 pl-12 pr-14 text-white outline-none transition placeholder:text-white/28 focus:border-violet-400/40 focus:bg-black/55"
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

          {state?.error ? (
            <div className="rounded-2xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-200">
              {state.error}
            </div>
          ) : null}

          <button
            type="submit"
            disabled={pending}
            className="inline-flex h-14 w-full items-center justify-center rounded-2xl border border-white/10 bg-white text-sm font-medium text-black transition hover:opacity-92 disabled:cursor-not-allowed disabled:opacity-70"
          >
            {pending ? "Salvando..." : "Atualizar senha"}
          </button>
        </form>
      </div>
    </div>
  )
}