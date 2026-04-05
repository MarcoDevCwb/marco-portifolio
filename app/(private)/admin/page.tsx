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
  Wallet,
} from "lucide-react"

import { AdminMobileDock } from "@/components/admin/AdminMobileDock"
import { AdminDashboardViewport } from "@/components/admin/AdminDashboardViewport"
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

export default async function AdminPage() {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/login")
  }

  return (
    <main className="min-h-screen overflow-hidden bg-[#050505] text-white">
      <div className="relative min-h-screen">
        <aside className="fixed left-0 top-0 z-40 hidden h-screen w-[92px] border-r border-white/8 bg-black/45 backdrop-blur-2xl md:flex md:flex-col md:items-center md:justify-start md:px-4 md:py-5">
          <nav className="flex flex-col items-center gap-3">
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
        </aside>

        <div className="md:ml-[92px]">
          <section className="px-3 pb-28 pt-3 sm:px-4 sm:pb-32 sm:pt-4 lg:px-6 lg:pb-6 lg:pt-6">
            <div className="mx-auto max-w-6xl">
              <AdminDashboardViewport userEmail={user.email ?? "Sem email"} />
            </div>
          </section>
        </div>

        <AdminMobileDock activeHref="/admin" />
      </div>
    </main>
  )
}