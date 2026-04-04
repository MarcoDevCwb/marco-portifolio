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
    <main className="main-viewport">
      <div className="main-viewport__inner">
        <div className="main-viewport__content">
          <div className="app-panel-frame relative shadow-[0_20px_80px_rgba(0,0,0,0.45)]">
            <div className="pointer-events-none absolute inset-0">
              <div className="absolute inset-0 bg-[#050505]" />
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.06),transparent_30%),radial-gradient(circle_at_20%_20%,rgba(168,85,247,0.12),transparent_24%),radial-gradient(circle_at_80%_30%,rgba(217,70,239,0.08),transparent_20%),linear-gradient(180deg,rgba(255,255,255,0.02)_0%,rgba(0,0,0,0)_24%,rgba(0,0,0,0.2)_100%)]" />
              <div className="absolute left-1/2 top-[-120px] h-[320px] w-[320px] -translate-x-1/2 rounded-full bg-violet-500/10 blur-3xl" />
              <div className="absolute bottom-[-140px] right-[-40px] h-[280px] w-[280px] rounded-full bg-fuchsia-500/10 blur-3xl" />
              <div className="absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-white/12 to-transparent" />
              <div className="absolute inset-y-6 left-0 w-px bg-gradient-to-b from-transparent via-white/8 to-transparent" />
              <div className="absolute inset-y-6 right-0 w-px bg-gradient-to-b from-transparent via-white/8 to-transparent" />
              <div className="absolute left-1/2 top-0 h-px w-44 -translate-x-1/2 overflow-hidden">
                <div className="motion-led-flow h-full w-full bg-gradient-to-r from-transparent via-fuchsia-400/80 to-transparent" />
              </div>
            </div>

            <div className="relative grid h-full min-h-0 lg:grid-cols-[1.08fr_0.92fr]">
              <section className="relative hidden border-r border-white/10 lg:block">
                <div className="flex h-full flex-col justify-between p-10 xl:p-12">
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

                  <div className="max-w-[540px]">
                    <span className="mb-3 block text-xs uppercase tracking-[0.32em] text-white/45">
                      Login administrativo
                    </span>

                    <h1 className="text-[3.4rem] font-medium leading-[0.98] tracking-[-0.05em] text-white">
                      Acesso ao seu
                      <br />
                      ambiente privado.
                    </h1>

                    <p className="mt-6 max-w-[470px] text-base leading-8 text-white/62">
                      Entre no painel para administrar conteúdo, projetos e as
                      próximas ferramentas do seu ecossistema digital.
                    </p>
                  </div>

                  <div className="grid gap-3">
                    {highlights.map((item) => {
                      const Icon = item.icon

                      return (
                        <div
                          key={item.title}
                          className="relative overflow-hidden rounded-[24px] border border-white/10 bg-white/[0.03] p-4"
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

              <section className="relative flex h-full min-h-0 items-center justify-center p-5 sm:p-6 lg:p-10">
                <div className="w-full max-w-[480px]">
                  <div className="relative">
                    <div className="mb-6 lg:hidden">
                      <div className="flex items-center justify-between gap-3">
                        <span className="inline-flex rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5 text-[10px] uppercase tracking-[0.24em] text-white/55">
                          Login
                        </span>

                        <Link
                          href="/"
                          className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3 py-2 text-xs text-white/70 transition hover:bg-white/[0.06] hover:text-white"
                        >
                          <ArrowLeft className="h-3.5 w-3.5" />
                          Voltar
                        </Link>
                      </div>

                      <div className="mt-5">
                        <h1 className="text-[2rem] font-medium tracking-[-0.04em] text-white">
                          Acesso privado
                        </h1>
                        <p className="mt-3 max-w-[30ch] text-sm leading-7 text-white/58">
                          Entre para continuar no painel.
                        </p>
                      </div>
                    </div>

                    <LoginForm />
                  </div>
                </div>
              </section>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}