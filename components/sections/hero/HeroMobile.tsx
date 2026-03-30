import Image from "next/image"

export function HeroMobile() {
  return (
    <section
      id="inicio"
      className="
        relative h-full w-full overflow-hidden
        rounded-3xl border border-white/10 bg-white/5
        backdrop-blur-xl
      "
    >
      <div className="absolute inset-0">
        <Image
          src="/images/eu.png"
          alt="Retrato de Marco Lima"
          fill
          priority
          sizes="100vw"
          className="
            object-cover object-[25%_18%]
            opacity-[0.92]
            scale-[1.2]
            translate-x-[10%]
            -translate-y-[10%]
          "
        />
      </div>

      <div
        className="
          pointer-events-none absolute inset-0
          bg-[radial-gradient(circle_at_74%_42%,rgba(168,85,247,0.16),transparent_20%),
              linear-gradient(90deg,rgba(0,0,0,0.94)_0%,rgba(0,0,0,0.84)_22%,rgba(0,0,0,0.34)_46%,rgba(0,0,0,0.12)_68%,rgba(0,0,0,0.08)_100%)]
        "
      />

      <div className="relative z-[1] h-full px-6 py-6">
        <div className="absolute bottom-[1%] left-6 right-6 max-w-[320px]">
          <span className="mb-3 block text-[10px] uppercase tracking-[0.32em] text-white/50">
            Desenvolvedor Fullstack
          </span>

          <h1 className="text-[1.15rem] font-medium leading-[1.18] tracking-[-0.03em] text-white">
            Crio experiências digitais com foco em{" "}
            <span className="text-fuchsia-400">performance,</span> identidade e
            impacto real.
          </h1>

          <p className="mt-4 max-w-[30ch] text-[11px] leading-5 text-white/60">
            Produtos digitais com estética, clareza e visão de negócio.
          </p>
        </div>
      </div>
    </section>
  )
}