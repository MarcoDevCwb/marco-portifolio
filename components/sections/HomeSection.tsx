export function HomeSection() {
  return (
    <section className="h-full w-full rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
      <div className="flex h-full flex-col justify-center">
        <span className="mb-3 text-sm uppercase tracking-[0.24em] text-white/50">
          Início
        </span>

        <h1 className="max-w-3xl text-4xl font-semibold leading-tight text-white md:text-6xl">
          Marco Lima
        </h1>

        <p className="mt-4 max-w-2xl text-sm leading-7 text-white/70 md:text-base">
          Desenvolvedor fullstack, criador de produto e profissional com visão
          de UX, software e experiências digitais com identidade premium.
        </p>
      </div>
    </section>
  )
}