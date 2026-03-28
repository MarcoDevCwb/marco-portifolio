"use client"

import { useEffect, useState } from "react"
import { NAV_ITEMS } from "@/lib/constants/navigation"
import type { SectionKey } from "@/lib/types/navigation"

type NavbarProps = {
  activeSection: SectionKey
  onChangeSection: (section: SectionKey) => void
}

export function Navbar({
  activeSection,
  onChangeSection,
}: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : ""
    return () => {
      document.body.style.overflow = ""
    }
  }, [isOpen])

  useEffect(() => {
    const mediaQuery = window.matchMedia("(min-width: 768px)")

    function handleDesktopChange(event: MediaQueryListEvent | MediaQueryList) {
      if (event.matches) {
        setIsOpen(false)
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

  function handleSelect(section: SectionKey) {
    onChangeSection(section)
    setIsOpen(false)
  }

  return (
    <header className="fixed left-0 top-0 z-[80] w-full px-3 pt-3 sm:px-4 sm:pt-4">
      <div className="mx-auto max-w-6xl">
        <div
          className={[
            "relative overflow-hidden rounded-[34px] border border-white/10 bg-black/75 backdrop-blur-2xl",
            "transition-[height] duration-300 ease-out",
            isOpen ? "h-[calc(100svh-24px)]" : "h-[72px]",
            "md:h-[72px]",
          ].join(" ")}
        >
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.08),transparent_42%),radial-gradient(circle_at_bottom,rgba(139,92,246,0.10),transparent_26%)]" />

          <div className="relative flex h-full flex-col">
            <div className="flex shrink-0 items-center justify-between px-4 py-3">
              <span className="shrink-0 text-sm font-semibold tracking-[0.24em] text-white/85">
                ML
              </span>

              <nav className="hidden items-center gap-2 md:flex">
                {NAV_ITEMS.map((item) => {
                  const isActive = item.key === activeSection

                  return (
                    <button
                      key={item.key}
                      type="button"
                      onClick={() => onChangeSection(item.key)}
                      className={[
                        "rounded-full px-4 py-2 text-sm transition",
                        isActive
                          ? "bg-white text-black"
                          : "text-white/65 hover:bg-white/10 hover:text-white",
                      ].join(" ")}
                    >
                      {item.label}
                    </button>
                  )
                })}
              </nav>

              <button
                type="button"
                className="hidden rounded-full border border-white/15 px-4 py-2 text-sm text-white/85 transition hover:bg-white/10 md:block"
              >
                Download CV
              </button>

              <button
                type="button"
                onClick={() => setIsOpen((prev) => !prev)}
                aria-label={isOpen ? "Fechar menu" : "Abrir menu"}
                aria-expanded={isOpen}
                className="relative inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white transition hover:bg-white/10 md:hidden"
              >
                <span
                  className={[
                    "absolute h-[2px] w-5 rounded-full bg-white transition duration-300",
                    isOpen ? "rotate-45" : "-translate-y-[6px]",
                  ].join(" ")}
                />
                <span
                  className={[
                    "absolute h-[2px] w-5 rounded-full bg-white transition duration-300",
                    isOpen ? "opacity-0" : "opacity-100",
                  ].join(" ")}
                />
                <span
                  className={[
                    "absolute h-[2px] w-5 rounded-full bg-white transition duration-300",
                    isOpen ? "-rotate-45" : "translate-y-[6px]",
                  ].join(" ")}
                />
              </button>
            </div>

            <div
              className={[
                "md:hidden",
                isOpen ? "flex flex-1 opacity-100" : "hidden opacity-0",
              ].join(" ")}
            >
              <div className="flex h-full w-full flex-col px-5 pb-[max(16px,env(safe-area-inset-bottom))] pt-1">
                <div className="flex flex-1 flex-col justify-between gap-4">
                  <nav className="flex flex-col gap-1">
                    {NAV_ITEMS.map((item) => {
                      const isActive = item.key === activeSection

                      return (
                        <button
                          key={item.key}
                          type="button"
                          onClick={() => handleSelect(item.key)}
                          className={[
                            "rounded-2xl px-1 py-1.5 text-left font-semibold leading-[0.95] tracking-[-0.03em] transition",
                            "text-[clamp(1.45rem,5.6vw,2.05rem)]",
                            isActive
                              ? "text-white"
                              : "text-white/45 hover:text-white",
                          ].join(" ")}
                        >
                          {item.label}
                        </button>
                      )
                    })}
                  </nav>

                  <div>
                    <div className="rounded-[24px] border border-white/10 bg-white/[0.03] p-3 backdrop-blur-xl">
                      <div className="grid grid-cols-2 gap-2">
                        <a
                          href="https://github.com/MarcoDevCwb"
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex min-h-11 items-center justify-center rounded-full border border-white/10 bg-white/5 px-3 py-2 text-[10px] uppercase tracking-[0.22em] text-white/75 transition hover:bg-white/10 hover:text-white"
                        >
                          GitHub
                        </a>

                        <a
                          href="#"
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex min-h-11 items-center justify-center rounded-full border border-white/10 bg-white/5 px-3 py-2 text-[10px] uppercase tracking-[0.22em] text-white/75 transition hover:bg-white/10 hover:text-white"
                        >
                          LinkedIn
                        </a>
                      </div>

                      <button
                        type="button"
                        className="mt-2 inline-flex min-h-11 w-full items-center justify-center rounded-full border border-white/15 px-4 py-2 text-sm text-white/85 transition hover:bg-white/10"
                      >
                        Dowload CV
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}