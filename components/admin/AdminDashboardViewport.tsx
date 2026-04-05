"use client"

import Link from "next/link"
import { AnimatePresence, motion } from "framer-motion"
import {
  ArrowRight,
  CreditCard,
  LayoutGrid,
  Sparkles,
  Target,
  Wallet,
  type LucideIcon,
} from "lucide-react"
import { useMemo, useState } from "react"

type AdminDashboardViewportProps = {
  userEmail: string
}

type ViewKey = "overview" | "pressure" | "action" | "direction"

type ViewItem = {
  key: ViewKey
  label: string
  eyebrow: string
  title: string
  description: string
  highlightTitle: string
  highlightValue: string
  highlightDescription: string
  primaryHref: string
  primaryLabel: string
  secondaryHref: string
  secondaryLabel: string
  icon: LucideIcon
  stats: Array<{
    label: string
    value: string
    helper: string
  }>
}

const views: ViewItem[] = [
  {
    key: "overview",
    label: "Visão geral",
    eyebrow: "Dashboard",
    title:
      "Seu painel precisa parecer uma central de decisão, não uma página longa.",
    description:
      "Aqui o foco é reduzir ruído visual e deixar o admin com comportamento de app: uma área principal, objetiva, clara e sem depender de scroll para entregar contexto.",
    highlightTitle: "Estado atual",
    highlightValue: "Base pronta",
    highlightDescription:
      "A estrutura já comporta uma navegação por viewport one-card com troca local de sessão.",
    primaryHref: "/financeiro",
    primaryLabel: "Abrir financeiro",
    secondaryHref: "/planejamento",
    secondaryLabel: "Abrir planejamento",
    icon: LayoutGrid,
    stats: [
      {
        label: "Núcleo",
        value: "One card",
        helper: "Um card principal por rota",
      },
      {
        label: "Navegação",
        value: "Sem scroll",
        helper: "Troca por estado e rota",
      },
      {
        label: "Experiência",
        value: "App-like",
        helper: "Mais fluida e objetiva",
      },
    ],
  },
  {
    key: "pressure",
    label: "Pressão",
    eyebrow: "Leitura central",
    title:
      "A pressão precisa aparecer como leitura principal, e não perdida em vários blocos.",
    description:
      "Quando você abrir o admin, a primeira informação precisa ser a que orienta a próxima decisão. O resto entra como apoio, não como concorrência visual.",
    highlightTitle: "Pressão financeira",
    highlightValue: "Em construção",
    highlightDescription:
      "Esse bloco pode virar sua leitura principal: urgência, velocidade de quitação e meta mínima de geração.",
    primaryHref: "/dividas",
    primaryLabel: "Abrir dívidas",
    secondaryHref: "/receita",
    secondaryLabel: "Abrir receita",
    icon: CreditCard,
    stats: [
      {
        label: "Dívida crítica",
        value: "--",
        helper: "Próxima prioridade real",
      },
      {
        label: "Caixa do dia",
        value: "--",
        helper: "Entradas e saídas rápidas",
      },
      {
        label: "Receita ativa",
        value: "--",
        helper: "Uber, particular e loja",
      },
    ],
  },
  {
    key: "action",
    label: "Ação",
    eyebrow: "Movimento",
    title: "O painel precisa orientar ação imediata com poucos pontos de toque.",
    description:
      "Ao invés de vários cards competindo entre si, o melhor caminho é destacar o próximo passo e deixar os atalhos ao redor como suporte secundário.",
    highlightTitle: "Próximo passo",
    highlightValue: "Conectar módulos",
    highlightDescription:
      "O admin vira o centro vivo do sistema quando cada módulo entrega leitura real, não apenas layout.",
    primaryHref: "/financeiro",
    primaryLabel: "Ir para fluxo",
    secondaryHref: "/caixa",
    secondaryLabel: "Abrir caixa",
    icon: Wallet,
    stats: [
      {
        label: "Financeiro",
        value: "Fluxo",
        helper: "Entradas, saídas e leitura",
      },
      {
        label: "Receita",
        value: "Meta",
        helper: "O que gerar agora",
      },
      {
        label: "Caixa",
        value: "Ritmo",
        helper: "Leitura operacional rápida",
      },
    ],
  },
  {
    key: "direction",
    label: "Direção",
    eyebrow: "Estratégia",
    title: "O admin também pode orientar direção, não só mostrar números.",
    description:
      "Quando a interface deixa claro o que importa agora, o painel passa a servir como bússola operacional. Isso muda a sensação do produto.",
    highlightTitle: "Direção atual",
    highlightValue: "Organizar e crescer",
    highlightDescription:
      "Estruturar o agora, reduzir pressão e construir uma base que evolui sem perder clareza.",
    primaryHref: "/planejamento",
    primaryLabel: "Abrir planejamento",
    secondaryHref: "/receita",
    secondaryLabel: "Abrir receita",
    icon: Target,
    stats: [
      {
        label: "Planejamento",
        value: "Simular",
        helper: "Próximos movimentos",
      },
      {
        label: "Patrimônio",
        value: "--",
        helper: "Evolução da base",
      },
      {
        label: "Foco",
        value: "Direção",
        helper: "Menos ruído, mais decisão",
      },
    ],
  },
]

export function AdminDashboardViewport({
  userEmail,
}: AdminDashboardViewportProps) {
  const [activeView, setActiveView] = useState<ViewKey>("overview")

  const currentView = useMemo(
    () => views.find((item) => item.key === activeView) ?? views[0],
    [activeView]
  )

  const CurrentIcon = currentView.icon

  return (
    <div className="relative overflow-hidden rounded-[32px] border border-white/10 bg-white/[0.03] shadow-[0_18px_60px_rgba(0,0,0,0.38)] backdrop-blur-xl">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.04),transparent_34%),radial-gradient(circle_at_center,rgba(96,57,188,0.16),transparent_24%),linear-gradient(90deg,rgba(0,0,0,0.30),transparent_42%,rgba(0,0,0,0.20))]" />

      <div className="relative flex min-h-[calc(100svh-132px)] flex-col p-4 sm:p-6 lg:p-8">
        <div className="flex flex-col gap-4 border-b border-white/8 pb-4 sm:pb-5">
          <div className="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-[11px] uppercase tracking-[0.24em] text-white/50">
                Admin
              </span>

              <span className="inline-flex rounded-full border border-white/10 bg-black/25 px-4 py-2 text-[11px] uppercase tracking-[0.22em] text-white/35">
                One card viewport
              </span>
            </div>

            <div className="rounded-2xl border border-white/10 bg-black/25 px-4 py-3">
              <p className="text-[10px] uppercase tracking-[0.22em] text-white/35">
                Sessão
              </p>
              <p className="mt-1 max-w-[220px] truncate text-sm text-white/70">
                {userEmail}
              </p>
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            {views.map((item) => {
              const isActive = item.key === activeView
              const Icon = item.icon

              return (
                <button
                  key={item.key}
                  type="button"
                  onClick={() => setActiveView(item.key)}
                  className={[
                    "group inline-flex items-center gap-2 rounded-full border px-4 py-2.5 text-sm transition-all duration-300",
                    isActive
                      ? "border-white/18 bg-white/[0.1] text-white"
                      : "border-white/10 bg-white/[0.03] text-white/65 hover:border-white/20 hover:bg-white/[0.06] hover:text-white",
                  ].join(" ")}
                >
                  <Icon
                    className={[
                      "h-4 w-4 transition-colors",
                      isActive
                        ? "text-white"
                        : "text-white/55 group-hover:text-white",
                    ].join(" ")}
                  />
                  <span>{item.label}</span>
                </button>
              )
            })}
          </div>
        </div>

        <div className="relative flex flex-1 py-4 sm:py-5 lg:py-6">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={currentView.key}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="flex w-full flex-1 flex-col justify-between"
            >
              <div className="grid flex-1 gap-4 lg:grid-cols-[1.08fr_0.92fr]">
                <div className="flex flex-col justify-between rounded-[28px] border border-white/10 bg-black/18 p-5 sm:p-6 lg:p-7">
                  <div>
                    <p className="text-[11px] uppercase tracking-[0.26em] text-white/38">
                      {currentView.eyebrow}
                    </p>

                    <h1 className="mt-4 max-w-[760px] text-2xl font-semibold tracking-[-0.05em] text-white sm:text-3xl lg:text-[3rem] lg:leading-[1.02]">
                      {currentView.title}
                    </h1>

                    <p className="mt-5 max-w-[640px] text-sm leading-7 text-white/60 sm:text-base">
                      {currentView.description}
                    </p>
                  </div>

                  <div className="mt-6 flex flex-wrap gap-3">
                    <Link
                      href={currentView.primaryHref}
                      className="inline-flex items-center justify-center gap-2 rounded-2xl border border-white/12 bg-white/[0.07] px-4 py-3 text-sm font-medium text-white transition-all duration-300 hover:border-white/20 hover:bg-white/[0.1]"
                    >
                      {currentView.primaryLabel}
                      <ArrowRight className="h-4 w-4" />
                    </Link>

                    <Link
                      href={currentView.secondaryHref}
                      className="inline-flex items-center justify-center rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm font-medium text-white/82 transition-all duration-300 hover:border-white/20 hover:bg-white/[0.06] hover:text-white"
                    >
                      {currentView.secondaryLabel}
                    </Link>
                  </div>
                </div>

                <div className="flex flex-col gap-4">
                  <div className="rounded-[28px] border border-white/10 bg-[radial-gradient(circle_at_top,rgba(128,90,213,0.18),transparent_52%),rgba(255,255,255,0.03)] p-5 sm:p-6">
                    <div className="flex items-center justify-between gap-4">
                      <div>
                        <p className="text-[11px] uppercase tracking-[0.22em] text-white/35">
                          {currentView.highlightTitle}
                        </p>
                        <p className="mt-3 text-3xl font-semibold tracking-[-0.04em] text-white sm:text-4xl">
                          {currentView.highlightValue}
                        </p>
                      </div>

                      <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-white/10 bg-black/20">
                        <CurrentIcon className="h-6 w-6 text-white/80" />
                      </div>
                    </div>

                    <p className="mt-4 text-sm leading-6 text-white/58">
                      {currentView.highlightDescription}
                    </p>
                  </div>

                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 lg:grid-cols-1">
                    {currentView.stats.map((stat) => (
                      <div
                        key={stat.label}
                        className="rounded-[24px] border border-white/10 bg-black/18 p-5"
                      >
                        <p className="text-[11px] uppercase tracking-[0.22em] text-white/35">
                          {stat.label}
                        </p>
                        <p className="mt-3 text-2xl font-semibold tracking-[-0.03em] text-white">
                          {stat.value}
                        </p>
                        <p className="mt-2 text-sm text-white/55">
                          {stat.helper}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-4 rounded-[24px] border border-white/10 bg-white/[0.02] p-4">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex items-start gap-3">
                    <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.04]">
                      <Sparkles className="h-5 w-5 text-white/80" />
                    </div>

                    <div>
                      <p className="text-[11px] uppercase tracking-[0.22em] text-white/35">
                        Direção de UX
                      </p>
                      <p className="mt-1 text-sm text-white/62">
                        A navegação global continua fora, e o conteúdo interno
                        vira uma experiência focada, rápida e sem ruído.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <Link
                      href="/receita"
                      className="inline-flex items-center justify-center rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-2.5 text-sm font-medium text-white/82 transition-all duration-300 hover:border-white/20 hover:bg-white/[0.06] hover:text-white"
                    >
                      Receita
                    </Link>

                    <Link
                      href="/financeiro"
                      className="inline-flex items-center justify-center rounded-2xl border border-white/12 bg-white/[0.06] px-4 py-2.5 text-sm font-medium text-white transition-all duration-300 hover:border-white/20 hover:bg-white/[0.08]"
                    >
                      Financeiro
                    </Link>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}