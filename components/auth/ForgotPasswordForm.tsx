"use client"

import { useActionState } from "react"
import { Mail } from "lucide-react"
import { forgotPasswordAction } from "@/app/forgot-password/actions"

type ForgotPasswordState = {
  error?: string
  success?: string
}

const initialState: ForgotPasswordState = {}

export function ForgotPasswordForm() {
  const [state, formAction, pending] = useActionState(
    forgotPasswordAction,
    initialState
  )

  return (
    <div className="rounded-[32px] border border-white/10 bg-white/[0.03] p-6 shadow-[0_16px_50px_rgba(0,0,0,0.35)] backdrop-blur-xl sm:p-8">
      <div className="mb-8">
        <span className="inline-flex rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-[11px] uppercase tracking-[0.24em] text-white/50">
          Reset access
        </span>

        <h2 className="mt-5 text-3xl font-semibold tracking-[-0.03em] text-white">
          Recuperar acesso
        </h2>

        <p className="mt-3 text-sm leading-7 text-white/58">
          Digite seu email para receber o link de redefinição.
        </p>
      </div>

      <form action={formAction} className="space-y-4">
        <div>
          <label className="mb-2 block text-sm text-white/70">Email</label>
          <div className="relative">
            <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-white/35">
              <Mail className="h-4 w-4" />
            </span>

            <input
              name="email"
              type="email"
              placeholder="voce@dominio.com"
              autoComplete="email"
              className="h-14 w-full rounded-2xl border border-white/10 bg-black/40 pl-12 pr-4 text-white outline-none placeholder:text-white/28 focus:border-violet-400/40"
              required
            />
          </div>
        </div>

        {state?.error ? (
          <div className="rounded-2xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-200">
            {state.error}
          </div>
        ) : null}

        {state?.success ? (
          <div className="rounded-2xl border border-emerald-500/20 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-200">
            {state.success}
          </div>
        ) : null}

        <button
          type="submit"
          disabled={pending}
          className="inline-flex h-14 w-full items-center justify-center rounded-2xl border border-white/10 bg-white text-sm font-medium text-black transition hover:opacity-92 disabled:cursor-not-allowed disabled:opacity-70"
        >
          {pending ? "Enviando..." : "Enviar link de recuperação"}
        </button>
      </form>
    </div>
  )
}