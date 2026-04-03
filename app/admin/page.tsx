import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"

export default async function AdminPage() {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/login")
  }

  return (
    <main className="min-h-screen bg-[#050505] p-8 text-white">
      <div className="mx-auto max-w-6xl rounded-[32px] border border-white/10 bg-white/[0.03] p-8 backdrop-blur-xl">
        <span className="inline-flex rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-[11px] uppercase tracking-[0.24em] text-white/50">
          Admin
        </span>

        <h1 className="mt-5 text-4xl font-semibold tracking-[-0.03em]">
          Painel administrativo
        </h1>

        <p className="mt-4 text-white/65">Ambiente protegido com Supabase.</p>

        <div className="mt-8 rounded-3xl border border-white/10 bg-black/30 p-6">
          <p className="text-white/75">Logado como: {user.email}</p>
        </div>
      </div>
    </main>
  )
}