"use client"

import { useState } from "react"
import { AboutLightningField } from "@/components/sections/about/AboutLightningField"
import { TeslaIntensityKnob } from "@/components/ui/TeslaIntensityKnob"

export function AboutSection() {
  const [intensity, setIntensity] = useState(0.65)

  return (
    <section className="relative h-full w-full overflow-hidden rounded-3xl border border-white/10 bg-[#050505] p-6">
      <div className="pointer-events-none absolute inset-0 z-0 bg-[#050505]" />

      <div className="absolute inset-0 z-[2]">
        <AboutLightningField intensity={intensity}/>
      </div>

      <div className="pointer-events-none absolute inset-0 z-[3] bg-black/10" />

      <div className="pointer-events-none absolute inset-0 z-[10]">
        <div className="relative h-full w-full">
          <div className="absolute left-1/2 top-[86px] -translate-x-1/2">
            <span className="text-[10px] uppercase tracking-[0.28em] text-white/58">
                Sobre
            </span>
          </div>

          <div className="absolute left-1/2 top-[116px] w-[min(92vw,680px)] -translate-x-1/2">
            <h2 className="text-center text-4xl font-semibold leading-[0.95] text-white md:text-6xl">
                Produto, código e experiência
            </h2>
          </div>
        </div>
      </div>

      <div className="absolute bottom-5 right-5 z-[20] md:bottom-8 md:right-8 lg:bottom-10 lg:right-10">
        <TeslaIntensityKnob
          value={intensity}
          onChange={setIntensity}
        />
      </div>
    </section>
  )
}