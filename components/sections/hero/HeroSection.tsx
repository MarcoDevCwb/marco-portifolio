import Image from "next/image"

export function HeroSection() {
  return (
    <section
      id="inicio"
      className="
        hero-section
        relative w-full overflow-hidden
        rounded-3xl border border-white/10 bg-white/5
        backdrop-blur-xl
        min-h-[calc(100dvh-var(--navbar-offset)-var(--footer-offset)-24px)]
        max-h-full

        max-[900px]:min-h-[calc(100dvh-var(--navbar-offset)-var(--footer-offset)-20px)]
        max-[640px]:min-h-[calc(100dvh-var(--navbar-offset)-var(--footer-offset)-18px)]

        max-[900px]:rounded-[28px]

        max-[640px]:min-h-0
        max-[640px]:h-full

        max-[640px]:max-h-full

        max-[640px]:[@media(max-height:500px)]:min-h-0
        max-[640px]:[@media(max-height:500px)]:h-full
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
            hero-image
            object-contain object-right-bottom
            opacity-[0.92]
            will-change-transform

            max-md:object-cover
            max-md:object-[25%_18%]
            max-md:scale-[1.2]
            max-md:translate-x-[10%]
            max-md:-translate-y-[10%]

            md:object-contain
            md:object-right-bottom

            [@media(max-height:500px)]:scale-[1.02]
            [@media(max-height:500px)]:translate-x-[4%]
            [@media(max-height:500px)]:translate-y-0

            max-md:[@media(max-height:500px)]:object-right
            max-md:[@media(max-height:500px)]:object-[82%_32%]
            max-md:[@media(max-height:500px)]:scale-[1.05]
            max-md:[@media(max-height:500px)]:translate-x-[2%]
            max-md:[@media(max-height:500px)]:-translate-y-[2%]
          "
        />
      </div>

      <div
        className="
          hero-overlay
          pointer-events-none absolute inset-0
          bg-[radial-gradient(circle_at_74%_42%,rgba(168,85,247,0.16),transparent_20%),
              linear-gradient(90deg,rgba(0,0,0,0.94)_0%,rgba(0,0,0,0.84)_22%,rgba(0,0,0,0.34)_46%,rgba(0,0,0,0.12)_68%,rgba(0,0,0,0.08)_100%)]

          max-md:[@media(max-height:500px)]:bg-[radial-gradient(circle_at_74%_42%,rgba(168,85,247,0.13),transparent_18%),
              linear-gradient(90deg,rgba(0,0,0,0.95)_0%,rgba(0,0,0,0.88)_28%,rgba(0,0,0,0.42)_52%,rgba(0,0,0,0.16)_74%,rgba(0,0,0,0.08)_100%)]
        "
      />

      <div
        className="
          relative z-[1] h-full px-6 py-6
          sm:px-8 sm:py-8

          [@media(max-height:500px)]:px-5
          [@media(max-height:500px)]:py-5
        "
      >
        <div
          className="
            hero-copy

            max-md:absolute
            max-md:bottom-[4%]
            max-md:left-6
            max-md:right-6
            max-md:max-w-[320px]

            md:absolute
            md:left-8
            md:top-1/2
            md:w-full
            md:max-w-[430px]
            md:-translate-y-1/2

            lg:left-14
            lg:max-w-[440px]

            [@media(max-height:500px)]:max-w-[360px]
            [@media(max-height:500px)]:left-5
            [@media(max-height:500px)]:right-5

            max-md:[@media(max-height:500px)]:bottom-[6%]
            max-md:[@media(max-height:500px)]:max-w-[240px]

            md:[@media(max-height:500px)]:top-auto
            md:[@media(max-height:500px)]:bottom-6
            md:[@media(max-height:500px)]:translate-y-0
            md:[@media(max-height:500px)]:max-w-[320px]
          "
        >
          <span
            className="
              hero-eyebrow mb-3 block text-[10px] uppercase tracking-[0.32em] text-white/50
              sm:text-[11px]
              md:text-xs

              [@media(max-height:500px)]:mb-2
              [@media(max-height:500px)]:text-[9px]
              [@media(max-height:500px)]:tracking-[0.26em]
            "
          >
            Desenvolvedor Fullstack
          </span>

          <h1
            className="
              hero-title text-white font-medium leading-[1.18] tracking-[-0.03em]
              text-[1.15rem]
              sm:text-[1.2rem]
              md:text-[1.8rem]

              [@media(max-height:500px)]:text-[1rem]
              md:[@media(max-height:500px)]:text-[1.35rem]
              [@media(max-height:500px)]:leading-[1.12]
            "
          >
            Crio experiências digitais com foco em{" "}
            <span className="text-fuchsia-400">performance,</span> identidade e
            impacto real.
          </h1>

          <p
            className="
              hero-description mt-4 text-white/60 text-[11px] leading-5
              sm:text-xs sm:leading-6
              md:text-sm md:leading-7

              [@media(max-height:500px)]:mt-2.5
              [@media(max-height:500px)]:text-[10px]
              [@media(max-height:500px)]:leading-4
              md:[@media(max-height:500px)]:text-[12px]
              md:[@media(max-height:500px)]:leading-5
            "
          >
            Produtos digitais com estética, clareza e visão de negócio.
          </p>
        </div>
      </div>
    </section>
  )
}