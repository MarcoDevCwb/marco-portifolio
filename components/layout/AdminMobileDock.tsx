"use client"

import Link from "next/link"
import {
  BadgeDollarSign,
  ChartNoAxesColumn,
  CreditCard,
  LayoutGrid,
  Wallet,
} from "lucide-react"

type AdminMobileDockProps = {
  activeHref?: string
  isHidden?: boolean
}

const dockItems = [
  { href: "/admin", label: "Dashboard", icon: LayoutGrid },
  { href: "/financeiro", label: "Financeiro", icon: Wallet },
  { href: "/dividas", label: "Dívidas", icon: CreditCard },
  { href: "/receita", label: "Receita", icon: BadgeDollarSign },
  {
    href: "/planejamento",
    label: "Planejamento",
    icon: ChartNoAxesColumn,
  },
]

export function AdminMobileDock({
  activeHref = "/admin",
  isHidden = false,
}: AdminMobileDockProps) {
  return (
    <footer
      className={[
        "fixed bottom-0 left-0 z-[70] w-full px-3 pb-[max(12px,env(safe-area-inset-bottom))] sm:px-4 sm:pb-4 md:hidden",
        "transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]",
        isHidden
          ? "pointer-events-none translate-y-6 opacity-0 blur-[2px]"
          : "translate-y-0 opacity-100 blur-0",
      ].join(" ")}
    >
      <div className="mx-auto max-w-6xl">
        <div
          className={[
            "relative overflow-hidden rounded-full",
            "border border-white/10 bg-black/75 backdrop-blur-2xl",
            "px-3 py-2.5 sm:px-4 sm:py-3",
            "shadow-[0_10px_40px_rgba(0,0,0,0.35)]",
          ].join(" ")}
        >
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.05),transparent_50%),radial-gradient(circle_at_bottom,rgba(139,92,246,0.12),transparent_30%)]" />

            <div className="absolute left-1/2 top-1/2 h-20 w-44 -translate-x-1/2 -translate-y-1/2 rounded-full bg-violet-500/15 blur-3xl motion-ambient-pulse" />

            <div className="absolute left-1/2 top-0 h-px w-36 -translate-x-1/2 overflow-hidden">
              <div className="h-full w-full bg-gradient-to-r from-transparent via-fuchsia-400/80 to-transparent motion-led-flow" />
            </div>

            <div className="absolute bottom-0 left-1/2 h-px w-44 -translate-x-1/2 overflow-hidden">
              <div className="h-full w-full bg-gradient-to-r from-transparent via-violet-400/60 to-transparent motion-led-flow" />
            </div>

            <div className="absolute inset-y-0 left-[-20%] w-24 bg-white/10 opacity-0 blur-xl motion-glass-sweep" />
          </div>

          <div className="relative flex items-center justify-between gap-2">
            {dockItems.map((item) => {
              const Icon = item.icon
              const isActive = activeHref === item.href

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-label={item.label}
                  title={item.label}
                  className={[
                    "group relative inline-flex h-11 w-11 items-center justify-center overflow-hidden rounded-full",
                    "border transition-all duration-300 ease-out",
                    isActive
                      ? "border-white/20 bg-white/10 text-white"
                      : "border-white/10 bg-white/5 text-white/80 hover:-translate-y-0.5 hover:border-white/20 hover:bg-white/10 hover:text-white",
                    "active:scale-95",
                  ].join(" ")}
                >
                  <span className="pointer-events-none absolute inset-x-2 top-0 h-px overflow-hidden opacity-0 transition duration-300 group-hover:opacity-100">
                    <span className="block h-full w-full bg-gradient-to-r from-transparent via-fuchsia-400/90 to-transparent motion-led-flow" />
                  </span>

                  <span
                    className={[
                      "pointer-events-none absolute inset-0 rounded-full transition duration-300",
                      isActive
                        ? "bg-[radial-gradient(circle,rgba(139,92,246,0.18),transparent_70%)] opacity-100"
                        : "bg-[radial-gradient(circle,rgba(139,92,246,0.12),transparent_70%)] opacity-0 group-hover:opacity-100",
                    ].join(" ")}
                  />

                  <Icon
                    className={[
                      "relative h-5 w-5 transition duration-300",
                      isActive ? "text-white" : "text-white/80 group-hover:text-white",
                    ].join(" ")}
                  />
                </Link>
              )
            })}
          </div>
        </div>
      </div>
    </footer>
  )
}