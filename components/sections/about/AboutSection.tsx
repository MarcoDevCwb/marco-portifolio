"use client"

import { motion, type Variants } from "framer-motion"
import { Boxes, Code2, Lightbulb, Repeat, Rocket } from "lucide-react"

const STACK_TAGS = ["Fullstack", "Produto", "UI", "Frontend", "Backend"]

const DIFFERENTIATORS = [
  {
    icon: Lightbulb,
    title: "Criatividade",
    description:
      "Gosto de resolver problema difícil com solução simples — e com identidade visual que não passa despercebida.",
  },
  {
    icon: Repeat,
    title: "Aprendizado contínuo",
    description:
      "Não tenho medo de tecnologia nova. Entro, erro, ajusto, e sigo até funcionar.",
  },
  {
    icon: Rocket,
    title: "Execução real",
    description:
      "Do primeiro commit a usuários reais — sei o que é sustentar um produto em produção, não só entregar uma demo.",
  },
]

const PRINCIPLE_TAGS = [
  "Interfaces que encantam",
  "Performance e escalabilidade",
  "Código limpo e sustentável",
]

const containerVariants: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.1, delayChildren: 0.05 },
  },
}

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 16 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
}

function TagPill({
  label,
  width,
}: {
  label: string
  width?: "sm" | "lg"
}) {
  const widthClass =
    width === "sm" ? "w-20 sm:w-24" : width === "lg" ? "w-36 sm:w-48" : ""

  return (
    <span
      className={`inline-flex items-center justify-center rounded-full border border-white/12 bg-white/5 px-2.5 py-1 text-center text-[10px] text-white/70 transition-colors duration-200 hover:border-violet-400/40 hover:text-white ${widthClass}`}
    >
      {label}
    </span>
  )
}

function IconGlow({
  icon: Icon,
  tone,
}: {
  icon: typeof Boxes
  tone: "violet" | "fuchsia"
}) {
  const glow =
    tone === "violet" ? "bg-violet-500/25" : "bg-fuchsia-500/25"
  const text = tone === "violet" ? "text-violet-300" : "text-fuchsia-300"

  return (
    <span className="relative flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-white/12 bg-white/5">
      <span
        className={`motion-ambient-pulse pointer-events-none absolute left-1/2 top-1/2 h-9 w-9 -translate-x-1/2 -translate-y-1/2 rounded-full blur-lg ${glow}`}
      />
      <Icon className={`relative h-5 w-5 ${text}`} />
    </span>
  )
}

export function AboutSection() {
  return (
    <section className="relative h-full w-full overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-4 backdrop-blur-xl sm:p-6">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="grid h-full gap-3 sm:gap-6 lg:grid-cols-[1.05fr_auto_1fr]"
      >
        <motion.div
          variants={itemVariants}
          className="relative flex flex-col justify-center gap-3 sm:gap-6"
        >
          <div
            aria-hidden="true"
            className="motion-ambient-pulse pointer-events-none absolute -left-10 top-10 h-56 w-56 rounded-full bg-violet-500/18 blur-3xl"
          />
          <div
            aria-hidden="true"
            className="motion-ambient-pulse pointer-events-none absolute bottom-0 left-1/3 h-40 w-40 rounded-full bg-fuchsia-500/12 blur-3xl"
            style={{ animationDelay: "1.4s" }}
          />

          <div className="relative">
            <span className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.28em] text-white/58">
              <span className="h-1.5 w-1.5 rounded-full bg-gradient-to-r from-violet-400 to-fuchsia-400" />
              Sobre
            </span>
            <h2 className="mt-2 text-2xl font-semibold leading-[0.95] text-white sm:mt-3 sm:text-4xl md:text-6xl">
              Produto, código e experiência
            </h2>
          </div>

          <p className="relative max-w-lg text-justify text-xs leading-5 text-white/70 sm:text-sm sm:leading-6 md:text-base md:leading-7">
            Sou desenvolvedor fullstack. Diferente da maioria dos
            portfólios, o meu não é só projeto de estudo —{" "}
            <span className="text-fuchsia-400">
              construí e mantenho em produção
            </span>{" "}
            minha própria empresa de tecnologia, do primeiro commit a
            usuários reais.
          </p>

          <p className="relative max-w-lg text-justify text-xs leading-5 text-white/70 sm:text-sm sm:leading-6 md:text-base md:leading-7 [@media(max-height:500px)]:hidden">
            O que me diferencia é{" "}
            <span className="text-violet-300">criatividade</span> e a
            disposição de aprender o que for preciso, por mais difícil que
            seja. Hoje, em busca da próxima oportunidade como
            desenvolvedor.
          </p>
        </motion.div>

        <div
          aria-hidden="true"
          className="relative hidden w-px overflow-hidden bg-white/10 lg:block"
        >
          <span className="motion-led-flow-vertical absolute inset-x-0 top-1/2 h-24 w-full -translate-y-1/2 bg-gradient-to-b from-transparent via-violet-400/80 to-transparent" />
        </div>

        <div className="flex flex-col justify-center gap-2 self-center sm:gap-4">
          <motion.div
            variants={itemVariants}
            className="group relative flex items-center gap-3 overflow-hidden rounded-2xl border border-transparent bg-black/30 p-3 transition-transform duration-300 hover:-translate-y-0.5 sm:gap-4 sm:p-5"
          >
            <span
              aria-hidden="true"
              className="motion-spin-border pointer-events-none absolute inset-0 rounded-2xl opacity-70"
              style={{
                background:
                  "conic-gradient(from var(--spin-angle), rgba(139,92,246,0.9), rgba(217,70,239,0.7), rgba(139,92,246,0.9))",
                padding: "1px",
                WebkitMask:
                  "linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)",
                WebkitMaskComposite: "xor",
                maskComposite: "exclude",
              }}
            />

            <IconGlow icon={Boxes} tone="violet" />

            <div className="relative min-w-0 flex-1">
              <h3 className="text-sm font-semibold text-white">
                Produto real em produção
              </h3>
              <p className="mt-1 hidden text-justify text-xs leading-5 text-white/60 sm:block">
                Não é só código de portfólio — é uma empresa de tecnologia
                que eu construí e mantenho no ar.
              </p>
              <div className="mt-2 flex flex-wrap gap-1.5 sm:mt-3">
                {STACK_TAGS.map((tag) => (
                  <TagPill key={tag} label={tag} width="sm" />
                ))}
              </div>
            </div>
          </motion.div>

          <div className="grid grid-cols-3 gap-2 sm:grid-cols-3 sm:gap-3">
            {DIFFERENTIATORS.map(({ icon: Icon, title, description }) => (
              <motion.div
                key={title}
                variants={itemVariants}
                className="group flex flex-col gap-1.5 rounded-2xl border border-white/10 bg-black/30 p-2.5 transition-all duration-300 hover:-translate-y-0.5 hover:border-fuchsia-400/30 hover:shadow-[0_16px_36px_-20px_rgba(217,70,239,0.45)] sm:gap-2 sm:p-4"
              >
                <span className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/12 bg-white/5 text-fuchsia-300 transition-colors duration-300 group-hover:border-fuchsia-400/40 sm:h-9 sm:w-9">
                  <Icon className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                </span>
                <h3 className="text-[11px] font-semibold leading-tight text-white sm:text-sm">
                  {title}
                </h3>
                <p className="hidden text-justify text-xs leading-5 text-white/60 sm:block">
                  {description}
                </p>
              </motion.div>
            ))}
          </div>

          <motion.div
            variants={itemVariants}
            className="flex items-center gap-3 rounded-2xl border border-white/10 bg-black/30 p-3 transition-transform duration-300 hover:-translate-y-0.5 sm:gap-4 sm:p-5 [@media(max-height:500px)]:hidden"
          >
            <IconGlow icon={Code2} tone="violet" />

            <div className="min-w-0 flex-1">
              <h3 className="text-sm font-semibold text-white">
                Código com propósito
              </h3>
              <div className="mt-1.5 flex flex-wrap gap-1.5 sm:mt-2">
                {PRINCIPLE_TAGS.map((tag) => (
                  <TagPill key={tag} label={tag} width="lg" />
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  )
}
