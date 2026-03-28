export function HeroSection() {
  return (
    <section
      id="inicio"
      className="flex min-h-[calc(100vh-4rem)] items-center py-16 sm:py-20"
    >
      <div className="grid w-full gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
        <div className="max-w-3xl">
          <span className="mb-5 inline-flex rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs tracking-[0.22em] text-white/65 uppercase">
            Desenvolvedor Fullstack • Produtos Reais • Experiência Premium
          </span>

          <h1 className="text-4xl font-semibold leading-tight sm:text-5xl lg:text-7xl">
            Crio experiências digitais com foco em{" "}
            <span className="bg-gradient-to-r from-fuchsia-400 via-violet-300 to-white bg-clip-text text-transparent">
              performance, identidade e impacto real
            </span>
            .
          </h1>

          <p className="mt-6 max-w-2xl text-base leading-7 text-white/70 sm:text-lg">
            Portfólio one page pensado para apresentar projetos, visão de produto,
            sensibilidade visual e capacidade de construir soluções modernas do
            zero ao deploy.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <a
              href="#projetos"
              className="inline-flex min-w-[160px] items-center justify-center rounded-full bg-white px-6 py-3 text-sm font-semibold text-black transition hover:scale-[1.02]"
            >
              Ver projetos
            </a>

            <a
              href="#sobre"
              className="inline-flex min-w-[160px] items-center justify-center rounded-full border border-white/15 bg-white/5 px-6 py-3 text-sm font-semibold text-white transition hover:border-white/30 hover:bg-white/10"
            >
              Conhecer mais
            </a>
          </div>

          <div className="mt-10 flex flex-wrap gap-3">
            {["Next.js 16", "TypeScript", "Tailwind CSS", "Framer Motion"].map(
              (item) => (
                <span
                  key={item}
                  className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs text-white/70"
                >
                  {item}
                </span>
              )
            )}
          </div>
        </div>

        <div className="relative">
          <div className="absolute inset-0 rounded-[2rem] bg-gradient-to-br from-fuchsia-500/20 via-violet-500/10 to-transparent blur-2xl" />

          <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/5 p-5 shadow-2xl backdrop-blur-xl">
            <div className="mb-4 flex items-center gap-2">
              <span className="h-3 w-3 rounded-full bg-red-400/80" />
              <span className="h-3 w-3 rounded-full bg-yellow-400/80" />
              <span className="h-3 w-3 rounded-full bg-green-400/80" />
            </div>

            <div className="space-y-4">
              <div className="rounded-2xl border border-white/10 bg-black/40 p-4">
                <p className="text-xs tracking-[0.18em] text-white/45 uppercase">
                  Projeto em destaque
                </p>
                <h2 className="mt-2 text-xl font-semibold text-white">
                  Portfólio Dev Estratégico
                </h2>
                <p className="mt-2 text-sm leading-6 text-white/65">
                  One page premium com navegação fluida, identidade forte,
                  animações modernas e espaço para projetos reais.
                </p>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  <p className="text-2xl font-semibold text-white">01</p>
                  <p className="mt-2 text-sm text-white/65">
                    Estrutura premium pensada para branding pessoal.
                  </p>
                </div>

                <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  <p className="text-2xl font-semibold text-white">02</p>
                  <p className="mt-2 text-sm text-white/65">
                    Base pronta para escalar com projetos, áudio e contato.
                  </p>
                </div>
              </div>

              <div className="rounded-2xl border border-fuchsia-500/20 bg-fuchsia-500/10 p-4">
                <p className="text-sm text-white/80">
                  Construído com foco em estética premium, clareza e presença
                  profissional.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}