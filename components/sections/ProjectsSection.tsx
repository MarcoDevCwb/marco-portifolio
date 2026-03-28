export function ProjectsSection() {
  return (
    <section className="h-full w-full rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
      <div className="flex h-full flex-col justify-center">
        <span className="mb-3 text-sm uppercase tracking-[0.24em] text-white/50">
          Projetos
        </span>

        <h2 className="text-3xl font-semibold text-white md:text-5xl">
          Produtos e sistemas reais
        </h2>

        <p className="mt-4 max-w-3xl text-sm leading-7 text-white/70 md:text-base">
          Aqui vamos destacar projetos com mais cara de produto, focando em
          valor real, interface premium e contexto estratégico.
        </p>
      </div>
    </section>
  )
}