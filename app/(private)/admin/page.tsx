import Link from "next/link"
import { redirect } from "next/navigation"
import {
  BadgeDollarSign,
  BriefcaseBusiness,
  ChartNoAxesColumn,
  CreditCard,
  LayoutGrid,
  PiggyBank,
  Receipt,
  Shield,
  Wallet,
} from "lucide-react"

import { AdminMobileDock } from "@/components/layout/AdminMobileDock"
import { createClient } from "@/lib/supabase/server"

const navItems = [
  { href: "/admin", label: "Dashboard", icon: LayoutGrid },
  { href: "/financeiro", label: "Financeiro", icon: Wallet },
  { href: "/dividas", label: "Dívidas", icon: CreditCard },
  { href: "/receita", label: "Receita", icon: BadgeDollarSign },
  { href: "/planejamento", label: "Planejamento", icon: ChartNoAxesColumn },
  { href: "/patrimonio", label: "Patrimônio", icon: PiggyBank },
  { href: "/caixa", label: "Caixa", icon: Receipt },
  { href: "/loja", label: "Loja", icon: BriefcaseBusiness },
]

const quickActions = [
  { href: "/financeiro", label: "Financeiro", meta: "Fluxo", icon: Wallet },
  { href: "/dividas", label: "Dívidas", meta: "Prioridade", icon: CreditCard },
  { href: "/receita", label: "Receita", meta: "Entradas", icon: BadgeDollarSign },
  {
    href: "/planejamento",
    label: "Planejamento",
    meta: "Simular",
    icon: ChartNoAxesColumn,
  },
]

export default async function AdminPage() {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/login")
  }

  const initial = user.email?.[0]?.toUpperCase() ?? "U"

  return (
    <main className="min-h-screen bg-[#050505] text-white">
      <div className="relative min-h-screen">
        <aside className="fixed left-0 top-0 z-40 hidden h-screen w-[92px] border-r border-white/8 bg-black/45 backdrop-blur-2xl md:flex md:flex-col md:items-center md:justify-between md:px-4 md:py-5">
          <div className="flex flex-col items-center gap-4">
            <Link
              href="/admin"
              aria-label="Dashboard"
              title="Dashboard"
              className="group flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.03] transition-all duration-300 hover:border-white/20 hover:bg-white/[0.06]"
            >
              <Shield className="h-5 w-5 text-white/80 transition-colors group-hover:text-white" />
            </Link>

            <nav className="mt-3 flex flex-col items-center gap-3">
              {navItems.map((item) => {
                const Icon = item.icon
                const isActive = item.href === "/admin"

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    aria-label={item.label}
                    title={item.label}
                    className={[
                      "group flex h-12 w-12 items-center justify-center rounded-2xl border transition-all duration-300",
                      isActive
                        ? "border-white/18 bg-white/[0.08]"
                        : "border-white/8 bg-white/[0.02] hover:-translate-y-[1px] hover:border-white/20 hover:bg-white/[0.06]",
                    ].join(" ")}
                  >
                    <Icon
                      className={[
                        "h-5 w-5 transition-colors",
                        isActive
                          ? "text-white"
                          : "text-white/55 group-hover:text-white/90",
                      ].join(" ")}
                    />
                  </Link>
                )
              })}
            </nav>
          </div>

          <div
            title={user.email ?? "Usuário"}
            className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.04] text-sm font-medium text-white/80"
          >
            {initial}
          </div>
        </aside>

        <div className="md:ml-[92px]">
          <section className="px-3 pb-28 pt-3 sm:px-4 sm:pb-32 sm:pt-4 lg:px-6 lg:pb-6 lg:pt-6">
            <div className="mx-auto max-w-6xl">
              <div className="overflow-hidden rounded-[32px] border border-white/10 bg-white/[0.03] shadow-[0_18px_60px_rgba(0,0,0,0.38)] backdrop-blur-xl">
                <div className="pointer-events-none absolute inset-0" />

                <div className="relative">
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.04),transparent_36%),radial-gradient(circle_at_center,rgba(96,57,188,0.16),transparent_26%),linear-gradient(90deg,rgba(0,0,0,0.32),transparent_42%,rgba(0,0,0,0.22))]" />

                  <div className="grid min-h-[calc(100svh-132px)] grid-cols-1 lg:grid-cols-[0.94fr_1.06fr]">
                    <div className="relative flex flex-col justify-between border-b border-white/8 p-6 sm:p-8 lg:border-b-0 lg:border-r lg:p-10">
                      <div>
                        <div className="flex items-start justify-between gap-4">
                          <span className="inline-flex rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-[11px] uppercase tracking-[0.24em] text-white/50">
                            Dashboard
                          </span>

                          <div className="rounded-2xl border border-white/10 bg-black/25 px-4 py-3 text-right">
                            <p className="text-[10px] uppercase tracking-[0.22em] text-white/35">
                              Sessão
                            </p>
                            <p className="mt-1 max-w-[180px] truncate text-sm text-white/70">
                              {user.email}
                            </p>
                          </div>
                        </div>

                        <div className="mt-12 max-w-[520px]">
                          <p className="text-[11px] uppercase tracking-[0.26em] text-white/40">
                            Central operacional
                          </p>

                          <h1 className="mt-4 text-3xl font-semibold tracking-[-0.05em] text-white sm:text-4xl lg:text-[3.25rem] lg:leading-[1.02]">
                            Organize receita, pressão e direção da sua vida
                            digital.
                          </h1>

                          <p className="mt-5 max-w-[470px] text-sm leading-7 text-white/60 sm:text-base">
                            Um único núcleo para enxergar o que entra, o que
                            pesa, o que precisa ser pago primeiro e qual o
                            próximo movimento.
                          </p>
                        </div>

                        <div className="mt-10 grid grid-cols-1 gap-3 sm:grid-cols-2">
                          <div className="rounded-[24px] border border-white/10 bg-black/18 p-5">
                            <p className="text-[11px] uppercase tracking-[0.22em] text-white/38">
                              Missão atual
                            </p>
                            <p className="mt-3 text-xl font-semibold tracking-[-0.03em] text-white">
                              Converter esforço em quitação real
                            </p>
                            <p className="mt-2 text-sm leading-6 text-white/55">
                              Organize suas entradas para atacar o que realmente
                              importa.
                            </p>
                          </div>

                          <div className="rounded-[24px] border border-white/10 bg-black/18 p-5">
                            <p className="text-[11px] uppercase tracking-[0.22em] text-white/38">
                              Estado do sistema
                            </p>
                            <p className="mt-3 text-xl font-semibold tracking-[-0.03em] text-white">
                              Base pronta para crescer
                            </p>
                            <p className="mt-2 text-sm leading-6 text-white/55">
                              Estrutura principal alinhada com a linguagem do
                              seu produto.
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="mt-8 grid grid-cols-2 gap-3 xl:grid-cols-4">
                        {quickActions.map((item) => {
                          const Icon = item.icon

                          return (
                            <Link
                              key={item.href}
                              href={item.href}
                              className="group rounded-[22px] border border-white/10 bg-white/[0.03] p-4 transition-all duration-300 hover:-translate-y-[1px] hover:border-white/20 hover:bg-white/[0.05]"
                            >
                              <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.04] transition-colors group-hover:border-white/20 group-hover:bg-white/[0.07]">
                                <Icon className="h-5 w-5 text-white/78 transition-colors group-hover:text-white" />
                              </div>

                              <p className="mt-5 text-sm font-medium text-white/88">
                                {item.label}
                              </p>
                              <p className="mt-1 text-xs uppercase tracking-[0.2em] text-white/35">
                                {item.meta}
                              </p>
                            </Link>
                          )
                        })}
                      </div>
                    </div>

                    <div className="relative flex flex-col justify-between p-6 sm:p-8 lg:p-10">
                      <div>
                        <p className="text-[11px] uppercase tracking-[0.22em] text-white/38">
                          Leitura central
                        </p>

                        <div className="mt-6 rounded-[28px] border border-white/10 bg-[radial-gradient(circle_at_top,rgba(128,90,213,0.18),transparent_52%),rgba(255,255,255,0.03)] p-5 sm:p-6">
                          <div className="flex items-center justify-between gap-4">
                            <div>
                              <p className="text-[11px] uppercase tracking-[0.22em] text-white/35">
                                Pressão financeira
                              </p>
                              <p className="mt-3 text-3xl font-semibold tracking-[-0.04em] text-white sm:text-4xl">
                                Em construção
                              </p>
                            </div>

                            <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-white/10 bg-black/20">
                              <ChartNoAxesColumn className="h-6 w-6 text-white/80" />
                            </div>
                          </div>

                          <p className="mt-4 max-w-md text-sm leading-6 text-white/58">
                            Aqui entra sua leitura principal: quanto falta,
                            quanto precisa gerar e qual a velocidade para sair
                            dessa fase.
                          </p>
                        </div>

                        <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
                          <div className="rounded-[24px] border border-white/10 bg-black/18 p-5">
                            <p className="text-[11px] uppercase tracking-[0.22em] text-white/35">
                              Caixa do dia
                            </p>
                            <p className="mt-3 text-2xl font-semibold tracking-[-0.03em] text-white">
                              --
                            </p>
                            <p className="mt-2 text-sm text-white/55">
                              Entradas e saídas rápidas.
                            </p>
                          </div>

                          <div className="rounded-[24px] border border-white/10 bg-black/18 p-5">
                            <p className="text-[11px] uppercase tracking-[0.22em] text-white/35">
                              Dívida crítica
                            </p>
                            <p className="mt-3 text-2xl font-semibold tracking-[-0.03em] text-white">
                              --
                            </p>
                            <p className="mt-2 text-sm text-white/55">
                              Próxima prioridade real.
                            </p>
                          </div>

                          <div className="rounded-[24px] border border-white/10 bg-black/18 p-5">
                            <p className="text-[11px] uppercase tracking-[0.22em] text-white/35">
                              Receita ativa
                            </p>
                            <p className="mt-3 text-2xl font-semibold tracking-[-0.03em] text-white">
                              --
                            </p>
                            <p className="mt-2 text-sm text-white/55">
                              Uber, particular e loja.
                            </p>
                          </div>

                          <div className="rounded-[24px] border border-white/10 bg-black/18 p-5">
                            <p className="text-[11px] uppercase tracking-[0.22em] text-white/35">
                              Patrimônio
                            </p>
                            <p className="mt-3 text-2xl font-semibold tracking-[-0.03em] text-white">
                              --
                            </p>
                            <p className="mt-2 text-sm text-white/55">
                              Evolução da sua base.
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="mt-6 rounded-[26px] border border-white/10 bg-white/[0.02] p-4">
                        <div className="flex flex-wrap items-center justify-between gap-4">
                          <div>
                            <p className="text-[11px] uppercase tracking-[0.22em] text-white/35">
                              Próximo passo
                            </p>
                            <p className="mt-2 text-sm text-white/62">
                              Conectar os módulos reais e transformar esse card
                              no centro vivo do sistema.
                            </p>
                          </div>

                          <Link
                            href="/financeiro"
                            className="inline-flex items-center justify-center rounded-2xl border border-white/12 bg-white/[0.05] px-4 py-2.5 text-sm font-medium text-white/88 transition-all duration-300 hover:border-white/20 hover:bg-white/[0.08]"
                          >
                            Abrir módulo
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>

        <AdminMobileDock activeHref="/admin" />
      </div>
    </main>
  )
}