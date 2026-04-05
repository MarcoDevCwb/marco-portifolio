"use client"

import Link from "next/link"
import { useActionState, useState } from "react"
import { Eye, EyeOff, LockKeyhole, Mail } from "lucide-react"
import { loginAction } from "@/app/(public)/login/actions"

type LoginState = {
  error?: string
}

const initialState: LoginState = {}

export function LoginForm() {
  const [showPassword, setShowPassword] = useState(false)

  const [state, formAction, pending] = useActionState(
    loginAction,
    initialState
  )

  return (
    <div className="relative w-full overflow-hidden rounded-[26px] border border-white/10 bg-white/[0.03] p-5 shadow-[0_16px_50px_rgba(0,0,0,0.35)] backdrop-blur-xl sm:p-6 lg:p-7">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.05),transparent_32%),radial-gradient(circle_at_bottom,rgba(139,92,246,0.10),transparent_28%)]" />
        <div className="absolute inset-x-5 top-0 h-px bg-gradient-to-r from-transparent via-white/12 to-transparent" />
      </div>

      <form action={formAction} className="relative space-y-3.5 sm:space-y-4">
        <div className="relative">
          <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-white/30">
            <Mail className="h-4 w-4" />
          </span>

          <input
            name="email"
            type="email"
            placeholder="voce@dominio.com"
            autoComplete="email"
            className="h-13 w-full rounded-[20px] border border-white/10 bg-black/40 pl-12 pr-4 text-sm text-white outline-none transition placeholder:text-white/28 focus:border-violet-400/40 focus:bg-black/55 sm:h-14 sm:text-base"
            required
          />
        </div>

        <div className="relative">
          <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-white/30">
            <LockKeyhole className="h-4 w-4" />
          </span>

          <input
            name="password"
            type={showPassword ? "text" : "password"}
            placeholder="••••••••"
            autoComplete="current-password"
            className="h-13 w-full rounded-[20px] border border-white/10 bg-black/40 pl-12 pr-14 text-sm text-white outline-none transition placeholder:text-white/28 focus:border-violet-400/40 focus:bg-black/55 sm:h-14 sm:text-base"
            required
          />

          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            aria-label={showPassword ? "Ocultar senha" : "Mostrar senha"}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-white/40 transition hover:text-white"
          >
            {showPassword ? (
              <EyeOff className="h-4 w-4" />
            ) : (
              <Eye className="h-4 w-4" />
            )}
          </button>
        </div>

        {state?.error ? (
          <div className="rounded-[18px] border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-200">
            {state.error}
          </div>
        ) : null}

        <div className="pt-1.5">
          <button
            type="submit"
            disabled={pending}
            className="
              group relative inline-flex h-13 w-full items-center justify-center overflow-hidden
              rounded-[20px] border border-white/10
              bg-[linear-gradient(180deg,rgba(255,255,255,0.08)_0%,rgba(255,255,255,0.03)_100%)]
              px-4 text-sm font-medium text-white
              shadow-[0_16px_50px_rgba(0,0,0,0.38)]
              backdrop-blur-xl
              transition-all duration-300
              hover:border-fuchsia-400/20 hover:shadow-[0_18px_60px_rgba(168,85,247,0.12)]
              active:scale-[0.985]
              disabled:cursor-not-allowed disabled:opacity-60
              sm:h-14
            "
          >
            <span className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_0%,rgba(255,255,255,0.12),transparent_40%),linear-gradient(90deg,rgba(168,85,247,0.10),rgba(217,70,239,0.06),rgba(59,130,246,0.08))]" />
            <span className="pointer-events-none absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
            <span className="relative z-[1]">
              {pending ? "Entrando..." : "Acessar painel"}
            </span>
          </button>

          <Link
            href="/forgot-password"
            className="mt-4 inline-flex w-full items-center justify-center text-sm text-white/52 transition hover:text-white/75"
          >
            Esqueci minha senha
          </Link>
        </div>
      </form>
    </div>
  )
}