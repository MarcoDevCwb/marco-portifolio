"use client"

import Image from "next/image"
import { useEffect, useRef, useState } from "react"
import { NAV_ITEMS } from "@/lib/constants/navigation"
import type { SectionKey } from "@/lib/types/navigation"

type NavbarProps = {
  activeSection: SectionKey
  onChangeSection: (section: SectionKey) => void
}

const MOBILE_CLOSE_NAV_DELAY = 260

export function Navbar({
  activeSection,
  onChangeSection,
}: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [pendingSection, setPendingSection] = useState<SectionKey | null>(null)
  const closeTimeoutRef = useRef<number | null>(null)

  useEffect(() => {
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = isOpen ? "hidden" : previousOverflow || ""

    return () => {
      document.body.style.overflow = previousOverflow
    }
  }, [isOpen])

  useEffect(() => {
    const mediaQuery = window.matchMedia("(min-width: 768px)")

    function handleDesktopChange(event: MediaQueryListEvent | MediaQueryList) {
      if (event.matches) {
        setIsOpen(false)
        setPendingSection(null)

        if (closeTimeoutRef.current) {
          window.clearTimeout(closeTimeoutRef.current)
          closeTimeoutRef.current = null
        }
      }
    }

    handleDesktopChange(mediaQuery)

    const listener = (event: MediaQueryListEvent) => handleDesktopChange(event)

    if (typeof mediaQuery.addEventListener === "function") {
      mediaQuery.addEventListener("change", listener)
      return () => mediaQuery.removeEventListener("change", listener)
    }

    mediaQuery.addListener(listener)
    return () => mediaQuery.removeListener(listener)
  }, [])

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setIsOpen(false)
        setPendingSection(null)
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [])

  useEffect(() => {
    if (isOpen || !pendingSection) return

    closeTimeoutRef.current = window.setTimeout(() => {
      onChangeSection(pendingSection)
      setPendingSection(null)
      closeTimeoutRef.current = null
    }, MOBILE_CLOSE_NAV_DELAY)

    return () => {
      if (closeTimeoutRef.current) {
        window.clearTimeout(closeTimeoutRef.current)
        closeTimeoutRef.current = null
      }
    }
  }, [isOpen, pendingSection, onChangeSection])

  function handleLogoClick() {
    if (isOpen) {
      setPendingSection("home")
      setIsOpen(false)
      return
    }

    onChangeSection("home")
  }

  function handleDesktopSelect(section: SectionKey) {
    onChangeSection(section)
  }

  function handleMobileSelect(section: SectionKey) {
    if (section === activeSection) {
      setPendingSection(null)
      setIsOpen(false)
      return
    }

    setPendingSection(section)
    setIsOpen(false)
  }

  return (
    <header className="fixed left-0 top-0 z-[80] w-full px-3 pt-3 sm:px-4 sm:pt-4">
      <div className="mx-auto max-w-6xl">
        <div
          className={[
            "relative overflow-hidden rounded-[34px]",
            "border border-white/10 bg-black/70 backdrop-blur-2xl",
            "shadow-[0_10px_40px_rgba(0,0,0,0.35)]",
            "transition-[height,transform] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]",
            isOpen ? "h-[calc(100svh-24px)]" : "h-[72px]",
            "md:h-[72px]",
          ].join(" ")}
        >
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.08),transparent_38%),radial-gradient(circle_at_bottom,rgba(139,92,246,0.13),transparent_28%)]" />

            <div className="motion-ambient-pulse absolute left-1/2 top-0 h-16 w-44 -translate-x-1/2 rounded-full bg-violet-500/12 blur-3xl" />

            <div className="absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-white/12 to-transparent" />
            <div className="absolute inset-y-3 left-0 w-px bg-gradient-to-b from-transparent via-white/8 to-transparent" />
            <div className="absolute inset-y-3 right-0 w-px bg-gradient-to-b from-transparent via-white/8 to-transparent" />

            <div className="absolute left-1/2 top-0 h-px w-44 -translate-x-1/2 overflow-hidden">
              <div className="motion-led-flow h-full w-full bg-gradient-to-r from-transparent via-fuchsia-400/80 to-transparent" />
            </div>

            <div className="motion-glass-sweep absolute inset-y-0 left-[-14%] w-20 bg-white/10 opacity-0 blur-xl" />
          </div>

          <div className="relative flex h-full flex-col">
            <div className="flex min-h-[72px] shrink-0 items-center justify-between px-4 py-3">
              <button
                type="button"
                onClick={handleLogoClick}
                aria-label="Ir para início"
                className="group relative shrink-0 transition duration-300 hover:opacity-90"
              >
                <span className="pointer-events-none absolute inset-0 rounded-full bg-white/0 blur-xl transition duration-300 group-hover:bg-white/[0.04]" />

                <Image
                  src="/logo.svg"
                  alt="Marco Dev"
                  width={72}
                  height={24}
                  sizes="72px"
                  loading="eager"
                  className="relative h-5 w-[60px] sm:h-6 sm:w-[72px]"
                />
              </button>

              <nav
                className="hidden items-center gap-2 md:flex"
                aria-label="Navegação principal"
              >
                {NAV_ITEMS.map((item) => {
                  const isActive = item.key === activeSection

                  return (
                    <button
                      key={item.key}
                      type="button"
                      onClick={() => handleDesktopSelect(item.key)}
                      className={[
                        "group relative overflow-hidden rounded-full px-4 py-2 text-sm font-medium",
                        "transition-all duration-300 ease-out",
                        isActive
                          ? "bg-white text-black shadow-[0_0_0_1px_rgba(255,255,255,0.08),0_8px_24px_rgba(255,255,255,0.08)]"
                          : "text-white/65 hover:bg-white/8 hover:text-white",
                      ].join(" ")}
                    >
                      {!isActive && (
                        <span className="pointer-events-none absolute inset-x-3 bottom-0 h-px overflow-hidden opacity-0 transition duration-300 group-hover:opacity-100">
                          <span className="motion-led-flow block h-full w-full bg-gradient-to-r from-transparent via-violet-400/75 to-transparent" />
                        </span>
                      )}

                      <span className="relative z-[1]">{item.label}</span>
                    </button>
                  )
                })}
              </nav>

              <a
                href="/cv.pdf"
                download="Marco-Lima-CV.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className={[
                  "group relative hidden overflow-hidden rounded-full md:inline-flex",
                  "border border-white/12 bg-white/[0.03] px-4 py-2 text-sm text-white/85",
                  "transition-all duration-300 ease-out hover:border-white/20 hover:bg-white/[0.07] hover:text-white",
                ].join(" ")}
              >
                <span className="pointer-events-none absolute inset-x-4 top-0 h-px overflow-hidden opacity-80">
                  <span className="motion-led-flow block h-full w-full bg-gradient-to-r from-transparent via-fuchsia-400/65 to-transparent" />
                </span>
                <span className="relative z-[1]">Download CV</span>
              </a>

              <button
                type="button"
                onClick={() => {
                  setPendingSection(null)
                  setIsOpen((prev) => !prev)
                }}
                aria-label={isOpen ? "Fechar menu" : "Abrir menu"}
                aria-expanded={isOpen}
                aria-controls="mobile-menu"
                className={[
                  "relative inline-flex h-11 w-11 items-center justify-center rounded-full md:hidden",
                  "border border-white/10 bg-white/5 text-white",
                  "transition-all duration-300 ease-out hover:bg-white/10 active:scale-95",
                ].join(" ")}
              >
                <span className="pointer-events-none absolute inset-0 rounded-full bg-[radial-gradient(circle,rgba(139,92,246,0.12),transparent_70%)] opacity-70" />

                <span
                  className={[
                    "absolute h-0.5 w-5 rounded-full bg-white transition duration-300",
                    isOpen ? "rotate-45" : "-translate-y-1.5",
                  ].join(" ")}
                />
                <span
                  className={[
                    "absolute h-0.5 w-5 rounded-full bg-white transition duration-300",
                    isOpen ? "opacity-0" : "opacity-100",
                  ].join(" ")}
                />
                <span
                  className={[
                    "absolute h-0.5 w-5 rounded-full bg-white transition duration-300",
                    isOpen ? "-rotate-45" : "translate-y-1.5",
                  ].join(" ")}
                />
              </button>
            </div>

            <div
              id="mobile-menu"
              className={[
                "md:hidden overflow-hidden",
                "transition-[max-height] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]",
                isOpen ? "max-h-[calc(100svh-96px)]" : "max-h-0",
              ].join(" ")}
            >
              <div
                className={[
                  "h-full overflow-y-auto overscroll-contain px-5 pt-1 pb-[max(24px,env(safe-area-inset-bottom))]",
                  "transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]",
                  isOpen ? "translate-y-0" : "-translate-y-2",
                ].join(" ")}
              >
                <div className="flex flex-col gap-5">
                  <nav
                    className="flex flex-col gap-1"
                    aria-label="Navegação mobile"
                  >
                    {NAV_ITEMS.map((item) => {
                      const isActive = item.key === activeSection
                      const isPending = pendingSection === item.key

                      return (
                        <button
                          key={item.key}
                          type="button"
                          onClick={() => handleMobileSelect(item.key)}
                          aria-current={isActive ? "page" : undefined}
                          className={[
                            "group relative overflow-hidden rounded-2xl px-2 py-2 text-left font-semibold leading-[0.95] tracking-[-0.03em]",
                            "text-[clamp(1.45rem,5.6vw,2.05rem)] transition-all duration-300 ease-out",
                            isActive || isPending
                              ? "bg-white/[0.04] text-white"
                              : "text-white/45 hover:bg-white/[0.03] hover:text-white",
                          ].join(" ")}
                        >
                          <span
                            className={[
                              "pointer-events-none absolute inset-y-2 left-0 w-px bg-gradient-to-b from-transparent via-violet-400/70 to-transparent transition duration-300",
                              isActive || isPending
                                ? "opacity-100"
                                : "opacity-0 group-hover:opacity-100",
                            ].join(" ")}
                          />
                          {item.label}
                        </button>
                      )
                    })}
                  </nav>

                  <div className="relative overflow-hidden rounded-[24px] border border-white/10 bg-black/40 p-3 backdrop-blur-xl shadow-[0_10px_30px_rgba(0,0,0,0.28)]">
                    <div className="pointer-events-none absolute inset-0">
                      <div className="absolute left-1/2 top-0 h-px w-36 -translate-x-1/2 overflow-hidden">
                        <div className="motion-led-flow h-full w-full bg-gradient-to-r from-transparent via-violet-400/65 to-transparent" />
                      </div>
                    </div>

                    <div className="relative grid grid-cols-2 gap-2">
                      <a
                        href="https://github.com/MarcoDevCwb"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex min-h-11 items-center justify-center rounded-full border border-white/12 bg-white/10 px-3 py-2 text-[10px] uppercase tracking-[0.22em] text-white/85 transition-colors duration-200 hover:border-white/20 hover:text-white active:bg-white/10 focus:outline-none focus-visible:outline-none"
                      >
                        GitHub
                      </a>

                      <a
                        href="https://www.linkedin.com/in/marco-vinicius-9637b7a5/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex min-h-11 items-center justify-center rounded-full border border-white/12 bg-white/10 px-3 py-2 text-[10px] uppercase tracking-[0.22em] text-white/85 transition-colors duration-200 hover:border-white/20 hover:text-white active:bg-white/10 focus:outline-none focus-visible:outline-none"
                      >
                        LinkedIn
                      </a>
                    </div>

                    <a
                      href="/cv.pdf"
                      download="Marco-Lima-CV.pdf"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="relative mt-2 inline-flex min-h-11 w-full items-center justify-center overflow-hidden rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm text-white/90 transition-colors duration-200 hover:border-white/20 hover:text-white active:bg-white/10 focus:outline-none focus-visible:outline-none"
                    >
                      <span className="pointer-events-none absolute inset-x-5 top-0 h-px overflow-hidden opacity-70">
                        <span className="motion-led-flow block h-full w-full bg-gradient-to-r from-transparent via-fuchsia-400/60 to-transparent" />
                      </span>
                      <span className="relative z-[1]">Download CV</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {isOpen && (
            <>
              <div className="pointer-events-none absolute inset-x-0 top-[72px] h-8 bg-gradient-to-b from-black/20 to-transparent md:hidden" />
              <div className="pointer-events-none absolute inset-x-0 bottom-0 h-10 bg-gradient-to-t from-black/35 to-transparent md:hidden" />
            </>
          )}
        </div>
      </div>
    </header>
  )
}