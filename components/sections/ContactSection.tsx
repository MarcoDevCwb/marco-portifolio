"use client"

import { motion, type Variants } from "framer-motion"
import {
  ArrowUpRight,
  Briefcase,
  Code2,
  Mail,
  MessageCircle,
  Users,
} from "lucide-react"

const REASONS = [
  {
    number: "01",
    icon: Briefcase,
    title: "Oportunidade",
    description:
      "Estou aberto a oportunidades como desenvolvedor, com desafios reais e impacto.",
  },
  {
    number: "02",
    icon: Code2,
    title: "Projeto / parceria",
    description:
      "Tem um projeto ou ideia em mente? Vamos construir algo de verdade juntos.",
  },
  {
    number: "03",
    icon: Users,
    title: "Networking",
    description:
      "Gosto de trocar ideia, aprender e colaborar com gente boa.",
  },
]

const CONTACT_METHODS = [
  {
    kind: "email" as const,
    label: "Email",
    value: "abbeats@gmail.com",
    href: "mailto:abbeats@gmail.com",
  },
  {
    kind: "whatsapp" as const,
    label: "WhatsApp",
    value: "(41) 99663-8082",
    href: "https://wa.me/5541996638082",
  },
  {
    kind: "github" as const,
    label: "GitHub",
    value: "/MarcoDevCwb",
    href: "https://github.com/MarcoDevCwb",
  },
  {
    kind: "linkedin" as const,
    label: "LinkedIn",
    value: "/in/marco-vinicius",
    href: "https://www.linkedin.com/in/marco-vinicius-9637b7a5/",
  },
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

function IconBadge({ children }: { children: React.ReactNode }) {
  return (
    <span className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-white/12 bg-white/5 text-fuchsia-300 transition-colors duration-300 group-hover:border-fuchsia-400/40">
      <span className="motion-ambient-pulse pointer-events-none absolute left-1/2 top-1/2 h-8 w-8 -translate-x-1/2 -translate-y-1/2 rounded-full bg-fuchsia-500/20 blur-lg" />
      <span className="relative">{children}</span>
    </span>
  )
}

export function ContactSection() {
  return (
    <section className="relative h-full w-full overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-4 backdrop-blur-xl sm:p-6">
      <div
        aria-hidden="true"
        className="motion-dot-grid pointer-events-none absolute right-10 top-6 hidden h-24 w-24 lg:block"
        style={{
          backgroundImage:
            "radial-gradient(rgba(255,255,255,0.35) 1px, transparent 1px)",
          backgroundSize: "12px 12px",
        }}
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-10 -right-10 hidden h-52 w-52 lg:block"
      >
        <div className="absolute inset-10 rounded-full bg-gradient-to-br from-violet-500/35 to-fuchsia-500/15 blur-2xl" />
        <div className="motion-orbit-spin absolute inset-0 rounded-full border border-white/12">
          <span className="absolute -top-1 left-1/2 h-2 w-2 -translate-x-1/2 rounded-full bg-violet-300 shadow-[0_0_10px_2px_rgba(139,92,246,0.7)]" />
        </div>
        <div className="absolute inset-6 rounded-full border border-white/8" />
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="grid h-full grid-rows-[auto_auto_auto] gap-3 overflow-hidden sm:gap-6 lg:grid-cols-2 lg:grid-rows-[1fr_auto]"
      >
        <div className="flex flex-col justify-center gap-2.5 sm:gap-5">
          <motion.div variants={itemVariants}>
            <span className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.28em] text-white/58">
              <span className="h-1.5 w-1.5 rounded-full bg-gradient-to-r from-violet-400 to-fuchsia-400" />
              Contato
            </span>
            <h2 className="mt-2 text-2xl font-semibold leading-[0.95] text-white sm:mt-3 sm:text-4xl md:text-6xl">
              Tem algo interessante em mente?
            </h2>
          </motion.div>

          <motion.p
            variants={itemVariants}
            className="max-w-md text-justify text-xs leading-5 text-white/70 sm:text-sm sm:leading-6 md:text-base md:leading-7 [@media(max-height:500px)]:hidden"
          >
            Estou aberto a oportunidades como desenvolvedor, projetos
            ambiciosos e boas conversas. Se fizer sentido, vamos tirar uma
            ideia do papel.
          </motion.p>

          <motion.span
            variants={itemVariants}
            className="inline-flex w-fit items-center gap-2 rounded-full border border-violet-400/30 bg-violet-500/10 px-2.5 py-1 text-[9px] font-medium uppercase tracking-[0.18em] text-violet-200 sm:px-3.5 sm:py-1.5 sm:text-[10px]"
          >
            <span className="motion-ambient-pulse h-1.5 w-1.5 rounded-full bg-violet-300" />
            Disponível para novas oportunidades
          </motion.span>

          <motion.a
            variants={itemVariants}
            href="mailto:abbeats@gmail.com"
            className="group inline-flex w-fit items-center gap-2 text-sm font-semibold uppercase tracking-[0.1em] text-white"
          >
            Vamos conversar
            <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
          </motion.a>
        </div>

        <div className="flex flex-col justify-center gap-2 sm:gap-3 [@media(max-height:500px)]:hidden">
          {REASONS.map(({ number, icon: Icon, title, description }) => (
            <motion.div
              key={number}
              variants={itemVariants}
              className="group flex items-center gap-3 rounded-2xl border border-white/10 bg-black/30 p-2.5 transition-all duration-300 hover:-translate-y-0.5 hover:border-violet-400/30 sm:gap-4 sm:p-4"
            >
              <span className="relative flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-white/12 text-[11px] font-semibold text-white/70 sm:h-10 sm:w-10 sm:text-xs">
                {number}
              </span>

              <div className="min-w-0 flex-1">
                <h3 className="text-xs font-semibold text-white sm:text-sm">
                  {title}
                </h3>
                <p className="mt-0.5 hidden text-justify text-xs leading-5 text-white/60 sm:block">
                  {description}
                </p>
              </div>

              <IconBadge>
                <Icon className="h-4 w-4" />
              </IconBadge>
            </motion.div>
          ))}
        </div>

        <motion.div
          variants={itemVariants}
          className="grid grid-cols-2 gap-2 sm:gap-3 lg:col-span-2"
        >
          {CONTACT_METHODS.map(({ kind, label, value, href }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-2 rounded-2xl border border-white/10 bg-black/30 p-2.5 transition-all duration-300 hover:-translate-y-0.5 hover:border-violet-400/30 sm:gap-3 sm:p-4"
            >
              <IconBadge>
                {kind === "email" && <Mail className="h-4 w-4" />}
                {kind === "whatsapp" && <MessageCircle className="h-4 w-4" />}
                {kind === "github" && (
                  <img
                    src="/icons/github.svg"
                    alt=""
                    className="h-4 w-4 invert opacity-90"
                  />
                )}
                {kind === "linkedin" && (
                  <span className="text-[13px] font-extrabold tracking-[-0.06em]">
                    in
                  </span>
                )}
              </IconBadge>
              <div className="min-w-0 flex-1">
                <span className="block text-[10px] uppercase tracking-[0.18em] text-white/45">
                  {label}
                </span>
                <span className="block truncate text-sm text-white/85">
                  {value}
                </span>
              </div>
              <ArrowUpRight className="h-4 w-4 shrink-0 text-white/40 transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-white" />
            </a>
          ))}
        </motion.div>
      </motion.div>
    </section>
  )
}
