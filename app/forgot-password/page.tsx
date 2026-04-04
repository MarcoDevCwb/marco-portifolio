import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { ForgotPasswordForm } from "@/components/auth/ForgotPasswordForm"

export default function ForgotPasswordPage() {
  return (
    <main className="min-h-screen bg-[#050505] px-4 py-6 text-white sm:px-6 lg:px-8">
      <div className="mx-auto flex min-h-screen max-w-7xl items-center">
        <div className="grid min-h-[680px] w-full overflow-hidden rounded-[32px] border border-white/10 bg-black/40 shadow-[0_20px_80px_rgba(0,0,0,0.45)] backdrop-blur-2xl lg:grid-cols-[1.02fr_0.98fr]">
          <section className="hidden border-r border-white/10 lg:block">
            <div className="flex h-full flex-col justify-between p-10 xl:p-12">
              <div className="flex items-center justify-between">
                <span className="inline-flex rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-[11px] uppercase tracking-[0.24em] text-white/60">
                  Recuperação
                </span>

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
                  Informe seu email para receber o link de redefinição de senha.
                </p>
              </div>

              <div className="rounded-[28px] border border-white/10 bg-black/30 p-5">
                <p className="text-sm text-white/75">
                  O link leva para uma página segura dentro do seu projeto.
                </p>
              </div>
            </div>
          </section>

          <section className="flex min-h-[680px] items-center justify-center p-5 sm:p-8 lg:p-10">
            <div className="w-full max-w-[480px]">
              <ForgotPasswordForm />
            </div>
          </section>
        </div>
      </div>
    </main>
  )
}