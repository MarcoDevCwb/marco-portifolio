import Link from "next/link"
import { ArrowLeft, ShieldCheck, Sparkles } from "lucide-react"
import { LoginForm } from "@/components/auth/LoginForm"

export default function LoginPage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[#050505] text-white">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.06),transparent_30%),radial-gradient(circle_at_50%_20%,rgba(139,92,246,0.12),transparent_24%),radial-gradient(circle_at_bottom,rgba(168,85,247,0.10),transparent_22%)]" />
        <div className="absolute left-1/2 top-0 h-64 w-64 -translate-x-1/2 rounded-full bg-violet-500/10 blur-3xl" />
        <div className="absolute bottom-[-40px] left-[10%] h-56 w-56 rounded-full bg-fuchsia-500/10 blur-3xl" />
        <div className="absolute right-[8%] top-[18%] h-48 w-48 rounded-full bg-white/5 blur-3xl" />
      </div>

      <div className="relative z-10 mx-auto flex min-h-screen w-full max-w-7xl items-center px-4 py-6 sm:px-6 lg:px-8">
        <div className="w-full overflow-hidden rounded-[32px] border border-white/10 bg-black/40 shadow-[0_20px_80px_rgba(0,0,0,0.45)] backdrop-blur-2xl">
          <div className="grid min-h-[720px] lg:grid-cols-[1.08fr_0.92fr]">
            <section className="relative hidden overflow-hidden border-r border-white/10 lg:block">
              <div className="pointer-events-none absolute inset-0">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.08),transparent_26%),radial-gradient(circle_at_bottom,rgba(139,92,246,0.14),transparent_30%)]" />
                <div className="absolute left-[14%] top-[22%] h-40 w-40 rounded-full bg-violet-500/10 blur-3xl" />
                <div className="absolute bottom-[18%] right-[10%] h-40 w-40 rounded-full bg-fuchsia-500/10 blur-3xl" />
              </div>

              <div className="relative flex h-full flex-col justify-between p-10 xl:p-12">
                <div className="flex items-center justify-between">
                  <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-[11px] uppercase tracking-[0.24em] text-white/60">
                    <ShieldCheck className="h-4 w-4" />
                    Área protegida
                  </div>

                  <Link
                    href="/"
                    className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-sm text-white/70 transition hover:bg-white/[0.06] hover:text-white"
                  >
                    <ArrowLeft className="h-4 w-4" />
                    Voltar
                  </Link>
                </div>

                <div className="max-w-[520px]">
                  <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-[11px] uppercase tracking-[0.24em] text-white/55">
                    <Sparkles className="h-4 w-4" />
                    Admin console
                  </span>

                  <h1 className="mt-8 text-5xl font-semibold leading-[1.02] tracking-[-0.04em] text-white">
                    Acesso privado com a mesma identidade premium do projeto.
                  </h1>

                  <p className="mt-6 max-w-[460px] text-base leading-8 text-white/65">
                    Entre no painel administrativo para gerenciar conteúdo,
                    projetos, currículo, configurações e futuras ferramentas do
                    seu ecossistema digital.
                  </p>
                </div>

                <div className="rounded-[28px] border border-white/10 bg-black/30 p-5">
                  <p className="text-sm text-white/75">
                    Estrutura pronta para evoluir para dashboard, edição de
                    conteúdo e módulos administrativos.
                  </p>
                </div>
              </div>
            </section>

            <section className="relative flex min-h-[720px] items-center justify-center p-5 sm:p-8 lg:p-10">
              <div className="relative w-full max-w-[480px]">
                <div className="mb-8 lg:hidden">
                  <div className="flex items-center justify-between gap-3">
                    <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-[11px] uppercase tracking-[0.24em] text-white/60">
                      <ShieldCheck className="h-4 w-4" />
                      Área protegida
                    </div>

                    <Link
                      href="/"
                      className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-sm text-white/70 transition hover:bg-white/[0.06] hover:text-white"
                    >
                      <ArrowLeft className="h-4 w-4" />
                      Voltar
                    </Link>
                  </div>

                  <h1 className="mt-6 text-3xl font-semibold leading-tight tracking-[-0.03em] text-white">
                    Login do painel administrativo
                  </h1>

                  <p className="mt-3 text-sm leading-7 text-white/62">
                    Entre para acessar a área privada do seu portfólio.
                  </p>
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