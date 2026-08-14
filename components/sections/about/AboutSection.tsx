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

      <div className="pointer-events-none absolute inset-0 z-[10] flex justify-center overflow-y-auto">
        <div className="mt-[86px] flex w-[min(92vw,640px)] flex-col items-center px-4 text-center">
          <span className="text-[10px] uppercase tracking-[0.28em] text-white/58">
            Sobre
          </span>

          <h2 className="mt-4 text-4xl font-semibold leading-[0.95] text-white md:text-6xl">
            Produto, código e experiência
          </h2>

          <p className="mt-6 max-w-lg text-sm leading-6 text-white/70 md:text-base md:leading-7">
            Sou desenvolvedor fullstack. Diferente da maioria dos
            portfólios, o meu não é só projeto de estudo — construí e
            mantenho em produção minha própria empresa de tecnologia, do
            primeiro commit a usuários reais.
          </p>

          <p className="mt-3 max-w-lg text-sm leading-6 text-white/70 md:text-base md:leading-7">
            O que me diferencia é criatividade e a disposição de aprender
            o que for preciso, por mais difícil que seja. Hoje, em busca
            da próxima oportunidade como desenvolvedor.
          </p>
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