import Link from "next/link"
import { ArrowLeft, ShieldCheck } from "lucide-react"
import { ForgotPasswordForm } from "@/components/auth/ForgotPasswordForm"

export default function ForgotPasswordPage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[#050505] text-white">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.06),transparent_30%),radial-gradient(circle_at_50%_20%,rgba(139,92,246,0.12),transparent_24%),radial-gradient(circle_at_bottom,rgba(168,85,247,0.10),transparent_22%)]" />
        <div className="absolute left-1/2 top-0 h-64 w-64 -translate-x-1/2 rounded-full bg-violet-500/10 blur-3xl" />
      </div>

      <div className="relative z-10 mx-auto flex min-h-screen w-full max-w-7xl items-center px-4 py-6 sm:px-6 lg:px-8">
        <div className="w-full overflow-hidden rounded-[32px] border border-white/10 bg-black/40 shadow-[0_20px_80px_rgba(0,0,0,0.45)] backdrop-blur-2xl">
          <div className="grid min-h-[680px] lg:grid-cols-[1.02fr_0.98fr]">
            <section className="relative hidden border-r border-white/10 lg:block">
              <div className="relative flex h-full flex-col justify-between p-10 xl:p-12">
                <div className="flex items-center justify-between">
                  <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-[11px] uppercase tracking-[0.24em] text-white/60">
                    <ShieldCheck className="h-4 w-4" />
                    Recuperação
                  </div>

                  <Link
                    href="/login"
                    className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-sm text-white/70 transition hover:bg-white/[0.06] hover:text-white"
                  >
                    <ArrowLeft className="h-4 w-4" />
                    Voltar
                  </Link>
                </div>

                <div className="max-w-[520px]">
                  <h1 className="text-5xl font-semibold leading-[1.02] tracking-[-0.04em] text-white">
                    Recuperação segura de acesso.
                  </h1>

                  <p className="mt-6 max-w-[460px] text-base leading-8 text-white/65">
                    Informe seu email para receber o link de redefinição de
                    senha do painel administrativo.
                  </p>
                </div>

                <div className="rounded-[28px] border border-white/10 bg-black/30 p-5">
                  <p className="text-sm text-white/75">
                    O link enviado leva para uma página segura de atualização de
                    senha dentro do seu próprio projeto.
                  </p>
                </div>
              </div>
            </section>

            <section className="relative flex min-h-[680px] items-center justify-center p-5 sm:p-8 lg:p-10">
              <div className="relative w-full max-w-[480px]">
                <div className="mb-8 lg:hidden">
                  <div className="flex items-center justify-between gap-3">
                    <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-[11px] uppercase tracking-[0.24em] text-white/60">
                      <ShieldCheck className="h-4 w-4" />
                      Recuperação
                    </div>

                    <Link
                      href="/login"
                      className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-sm text-white/70 transition hover:bg-white/[0.06] hover:text-white"
                    >
                      <ArrowLeft className="h-4 w-4" />
                      Voltar
                    </Link>
                  </div>

                  <h1 className="mt-6 text-3xl font-semibold leading-tight tracking-[-0.03em] text-white">
                    Esqueci minha senha
                  </h1>

                  <p className="mt-3 text-sm leading-7 text-white/62">
                    Envie um link de recuperação para seu email.
                  </p>
                </div>

                <ForgotPasswordForm />
              </div>
            </section>
          </div>
        </div>
      </div>
    </main>
  )
}