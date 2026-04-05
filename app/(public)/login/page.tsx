import Link from "next/link"
import { ArrowLeft, LockKeyhole, ShieldCheck, Sparkles } from "lucide-react"
import { LoginForm } from "@/components/auth/LoginForm"

const highlights = [
  {
    icon: ShieldCheck,
    title: "Acesso protegido",
    description: "Entrada reservada para gerenciamento e operações internas.",
  },
  {
    icon: Sparkles,
    title: "Mesmo ecossistema visual",
    description: "A interface segue o mesmo padrão premium do portfólio.",
  },
  {
    icon: LockKeyhole,
    title: "Fluxo objetivo",
    description: "Login direto, limpo e pensado para uso rápido em qualquer tela.",
  },
]

export default function LoginPage() {
  return (
    <main className="relative min-h-screen overflow-x-hidden bg-black text-white">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[#050505]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.05),transparent_28%),radial-gradient(circle_at_20%_20%,rgba(168,85,247,0.10),transparent_24%),radial-gradient(circle_at_80%_30%,rgba(217,70,239,0.08),transparent_20%),linear-gradient(180deg,rgba(255,255,255,0.015)_0%,rgba(0,0,0,0)_24%,rgba(0,0,0,0.22)_100%)]" />
        <div className="absolute left-1/2 top-[-140px] h-[340px] w-[340px] -translate-x-1/2 rounded-full bg-violet-500/10 blur-3xl" />
        <div className="absolute bottom-[-160px] right-[-60px] h-[320px] w-[320px] rounded-full bg-fuchsia-500/10 blur-3xl" />
      </div>

      <div className="relative mx-auto flex min-h-screen w-full max-w-[1400px] items-start justify-center px-4 py-8 sm:px-6 sm:py-10 lg:px-8 xl:items-center xl:py-12">
        <div className="relative w-full overflow-hidden rounded-[28px] border border-white/10 bg-white/[0.02] shadow-[0_20px_80px_rgba(0,0,0,0.45)]">
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-white/12 to-transparent" />
            <div className="absolute inset-y-6 left-0 w-px bg-gradient-to-b from-transparent via-white/8 to-transparent" />
            <div className="absolute inset-y-6 right-0 w-px bg-gradient-to-b from-transparent via-white/8 to-transparent" />
            <div className="absolute left-1/2 top-0 h-px w-44 -translate-x-1/2 overflow-hidden">
              <div className="motion-led-flow h-full w-full bg-gradient-to-r from-transparent via-fuchsia-400/80 to-transparent" />
            </div>
          </div>

          <div className="grid grid-cols-1 2xl:grid-cols-[1.02fr_0.98fr]">
            <section className="relative hidden border-r border-white/10 2xl:block">
              <div className="flex min-h-[760px] flex-col justify-between p-10">
                <div className="flex items-center justify-between gap-4">
                  <span className="inline-flex rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-[11px] uppercase tracking-[0.24em] text-white/60">
                    Área protegida
                  </span>

                  <Link
                    href="/"
                    className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-sm text-white/70 transition hover:bg-white/[0.06] hover:text-white"
                  >
                    <ArrowLeft className="h-4 w-4" />
                    Voltar
                  </Link>
                </div>
                
                <div className="grid gap-3">
                  {highlights.map((item) => {
                    const Icon = item.icon

                    return (
                      <div
                        key={item.title}
                        className="relative overflow-hidden rounded-[22px] border border-white/10 bg-white/[0.03] p-4"
                      >
                        <div className="pointer-events-none absolute inset-x-4 top-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

                        <div className="flex items-start gap-4">
                          <div className="relative mt-0.5 inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.04] text-white/80">
                            <span className="pointer-events-none absolute inset-0 rounded-2xl bg-[radial-gradient(circle,rgba(139,92,246,0.14),transparent_70%)] opacity-70" />
                            <Icon className="relative z-[1] h-5 w-5" />
                          </div>

                          <div>
                            <h2 className="text-sm font-medium text-white">
                              {item.title}
                            </h2>
                            <p className="mt-1 text-sm leading-6 text-white/55">
                              {item.description}
                            </p>
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            </section>

            <section className="relative flex justify-center px-5 py-8 sm:px-6 sm:py-10 md:px-8 lg:px-10 xl:px-12 2xl:min-h-[760px] 2xl:items-center 2xl:px-10">
              <div className="w-full max-w-[480px]">
                <div className="mb-8 2xl:hidden">
                  <div className="flex items-center justify-between gap-3">
                    <span className="inline-flex rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5 text-[10px] uppercase tracking-[0.24em] text-white/55">
                      Área protegida
                    </span>

                    <Link
                      href="/"
                      className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3 py-2 text-xs text-white/70 transition hover:bg-white/[0.06] hover:text-white"
                    >
                      <ArrowLeft className="h-3.5 w-3.5" />
                      Voltar
                    </Link>
                  </div>

                  
                </div>

                <LoginForm />
              </div>
            </section>
          </div>
        </div>
      </div>
    </main>
  )
}