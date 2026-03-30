import Image from "next/image"

export function HeroMobileLandscape() {
  return (
    <section
      className="
        relative w-full overflow-hidden
        rounded-[28px] border border-white/10 bg-white/5
        backdrop-blur-xl
        h-[172px]
        min-h-[172px]
        max-h-[172px]

        max-[820px]:h-[160px]
        max-[820px]:min-h-[160px]
        max-[820px]:max-h-[160px]

        max-[740px]:h-[148px]
        max-[740px]:min-h-[148px]
        max-[740px]:max-h-[148px]

        max-[640px]:h-[138px]
        max-[640px]:min-h-[138px]
        max-[640px]:max-h-[138px]

        max-[560px]:h-[132px]
        max-[560px]:min-h-[132px]
        max-[560px]:max-h-[132px]
      "
    >
      <div
        className="
          absolute inset-0 z-0
          bg-[radial-gradient(circle_at_72%_42%,rgba(168,85,247,0.12),transparent_18%),
              linear-gradient(90deg,rgba(0,0,0,0.96)_0%,rgba(0,0,0,0.88)_28%,rgba(0,0,0,0.42)_58%,rgba(0,0,0,0.08)_100%)]
        "
      />

      <div
        className="
          relative z-10 grid h-full min-h-0
          grid-cols-[minmax(0,1fr)_220px]

          max-[820px]:grid-cols-[minmax(0,1fr)_205px]
          max-[740px]:grid-cols-[minmax(0,1fr)_190px]
          max-[640px]:grid-cols-[minmax(0,1fr)_168px]
          max-[560px]:grid-cols-[minmax(0,1fr)_150px]
        "
      >
        <div
          className="
            flex min-w-0 items-center
            px-6 py-4

            max-[740px]:px-5
            max-[640px]:px-4
            max-[560px]:px-3.5
          "
        >
          <div
            className="
              w-full max-w-[340px]

              max-[740px]:max-w-[290px]
              max-[640px]:max-w-[230px]
              max-[560px]:max-w-[205px]
            "
          >
            <span
              className="
                mb-2 block uppercase text-white/50
                text-[10px] tracking-[0.30em]

                max-[640px]:mb-1.5
                max-[640px]:text-[8px]
                max-[640px]:tracking-[0.24em]
              "
            >
              Desenvolvedor Fullstack
            </span>

            <h1
              className="
                font-medium text-white tracking-[-0.03em]
                text-[1.1rem] leading-[1.18]

                max-[740px]:text-[1rem]
                max-[640px]:text-[0.92rem]
                max-[640px]:leading-[1.1]
                max-[560px]:text-[0.86rem]
              "
            >
              Crio experiências digitais com foco em{" "}
              <span className="text-fuchsia-400">performance,</span> identidade e
              impacto real.
            </h1>

            <p
              className="
                mt-2 text-white/60
                text-[11px] leading-[1.2rem]

                max-[640px]:mt-1.5
                max-[640px]:text-[9px]
                max-[640px]:leading-[0.95rem]

                max-[560px]:hidden
              "
            >
              Produtos digitais com estética, clareza e visão de negócio.
            </p>
          </div>
        </div>

        <div className="relative z-10 h-full min-h-0">
          <Image
            src="/images/eu.png"
            alt="Marco Lima"
            fill
            priority
            sizes="40vw"
            className="
              object-contain object-right-bottom opacity-[0.92]
              scale-100

              max-[640px]:object-[100%_100%]
              max-[560px]:object-[102%_100%]
            "
          />
        </div>
      </div>
    </section>
  )
}