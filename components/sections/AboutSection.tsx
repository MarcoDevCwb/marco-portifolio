"use client"

import { AboutLightningField } from "@/components/sections/about/AboutLightningField"

export function AboutSection() {
  return (
    <section className="relative h-full w-full overflow-hidden rounded-3xl border border-white/10 bg-[#050505] p-6">
      <div className="pointer-events-none absolute inset-0 z-0 bg-[#050505]" />

      <div className="absolute inset-0 z-[2]">
        <AboutLightningField />
      </div>

      <div className="pointer-events-none absolute inset-0 z-[3] bg-black/10" />

      <div className="pointer-events-none absolute inset-0 z-[10]">
        <div className="relative h-full w-full">
          <div className="absolute left-1/2 top-[86px] -translate-x-1/2">
            <div className="inline-flex h-[28px] items-center justify-center rounded-sm border border-white/10 bg-black/35 px-4 backdrop-blur-xl">
              <span className="text-[10px] uppercase tracking-[0.28em] text-white/58">
                Sobre
              </span>
            </div>
          </div>

          <div className="absolute left-1/2 top-[116px] w-[min(92vw,680px)] -translate-x-1/2">
            <div className="rounded-none border border-white/10 bg-black/20 px-6 py-6 md:px-8 md:py-7">
              <h2 className="text-center text-4xl font-semibold leading-[0.95] text-white md:text-6xl">
                Produto, código e experiência
              </h2>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}