"use client"

import { useRef } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"

const PREVIEWS = [
  "/lab/menus/liquid-nav/index.html",
  "/lab/logins/aurora-login/index.html",
  "/lab/buttons/magnetic-button/index.html",
  "/lab/webgl/particle-hero/index.html",
  "/lab/video/scroll-scrub/index.html",
]

export function ProjectsSection() {
  const trackRef = useRef<HTMLDivElement>(null)

  function scrollByCard(direction: 1 | -1) {
    const track = trackRef.current
    if (!track) return
    const card = track.querySelector<HTMLElement>("[data-card]")
    const step = card ? card.offsetWidth + 16 : track.clientWidth * 0.8
    track.scrollBy({ left: direction * step, behavior: "smooth" })
  }

  return (
    <section className="h-full w-full overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-4 backdrop-blur-xl sm:p-6">
      <div className="flex h-full flex-col">
        <div className="flex flex-wrap items-end justify-between gap-3 sm:gap-4">
          <div>
            <span className="mb-1.5 block text-sm uppercase tracking-[0.24em] text-white/50 sm:mb-3">
              Projetos
            </span>
            <h2 className="text-2xl font-semibold text-white sm:text-3xl md:text-5xl">
              Produtos e sistemas reais
            </h2>
            <p className="mt-2 hidden max-w-3xl text-justify text-sm leading-7 text-white/70 sm:block md:text-base">
              Peças com cara de produto, focando em valor real, interface
              premium e contexto estratégico.
            </p>
          </div>

          <div className="flex shrink-0 gap-2">
            <button
              type="button"
              onClick={() => scrollByCard(-1)}
              aria-label="Projeto anterior"
              className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/12 bg-white/3 text-white/80 transition-all duration-300 hover:border-white/20 hover:bg-white/7 hover:text-white sm:h-11 sm:w-11"
            >
              <ChevronLeft className="h-4 w-4 sm:h-[18px] sm:w-[18px]" />
            </button>
            <button
              type="button"
              onClick={() => scrollByCard(1)}
              aria-label="Próximo projeto"
              className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/12 bg-white/3 text-white/80 transition-all duration-300 hover:border-white/20 hover:bg-white/7 hover:text-white sm:h-11 sm:w-11"
            >
              <ChevronRight className="h-4 w-4 sm:h-[18px] sm:w-[18px]" />
            </button>
          </div>
        </div>

        <div
          ref={trackRef}
          className="mt-3 flex flex-1 gap-4 overflow-x-auto pb-2 [scrollbar-width:none] sm:mt-6 [&::-webkit-scrollbar]:hidden"
          style={{ scrollSnapType: "x mandatory", scrollBehavior: "smooth" }}
        >
          <a
            data-card
            href="/lab"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative flex basis-full shrink-0 flex-col overflow-hidden rounded-2xl border border-white/10 bg-black/40 transition-colors duration-300 hover:border-white/20 sm:basis-[calc((100%-2rem)/3)]"
            style={{ scrollSnapAlign: "start" }}
          >
            <div className="relative aspect-[21/9] overflow-hidden bg-black sm:aspect-[16/10]">
              {PREVIEWS.map((src) => (
                <iframe
                  key={src}
                  src={src}
                  title="Preview da biblioteca de UI"
                  tabIndex={-1}
                  aria-hidden="true"
                  loading="lazy"
                  scrolling="no"
                  className="motion-preview-slide pointer-events-none absolute left-0 top-0 h-[250%] w-[250%] origin-top-left scale-[0.4] overflow-hidden"
                />
              ))}
              <div className="motion-ambient-pulse pointer-events-none absolute left-1/2 top-0 h-16 w-32 -translate-x-1/2 rounded-full bg-violet-500/20 blur-3xl" />
            </div>

            <div className="flex flex-1 flex-col gap-1.5 p-3 sm:gap-2 sm:p-5">
              <span className="text-[9px] uppercase tracking-[0.28em] text-fuchsia-300/80 sm:text-[10px]">
                Estúdio de design · marca registrada
              </span>

              <h3 className="text-sm font-semibold text-white sm:text-lg">
                Biblioteca de UI &amp; Animação
              </h3>

              <p className="hidden text-justify text-xs leading-5 text-white/60 sm:block">
                Menus, logins, botões, partículas em WebGL e vídeo por
                scroll — HTML, CSS e JS puros, prontos pra copiar.
              </p>

              <div className="mt-auto flex flex-wrap gap-1.5 pt-1.5 sm:pt-3">
                {["GSAP", "WebGL", "CSS nativo"].map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-white/12 bg-white/5 px-2.5 py-1 text-[10px] text-white/70"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <span className="mt-1.5 inline-flex items-center gap-2 text-sm font-medium text-white transition-transform duration-300 group-hover:translate-x-1 sm:mt-3">
                Explorar
                <span aria-hidden="true">→</span>
              </span>
            </div>
          </a>

          {["Segundo projeto", "Terceiro projeto"].map((label) => (
            <div
              key={label}
              data-card
              className="flex basis-full shrink-0 flex-col items-center justify-center gap-2 rounded-2xl border border-dashed border-white/12 bg-white/[0.02] p-4 text-center sm:basis-[calc((100%-2rem)/3)] sm:p-6"
              style={{ scrollSnapAlign: "start" }}
            >
              <span className="text-2xl text-white/20" aria-hidden="true">
                +
              </span>
              <span className="text-[10px] uppercase tracking-[0.22em] text-white/30">
                Novo projeto em breve
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
