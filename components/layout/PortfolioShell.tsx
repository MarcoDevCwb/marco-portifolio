"use client"

import { useState } from "react"
import { FooterDock } from "./FooterDock"
import { MainViewport } from "./MainViewport"
import { Navbar } from "./Navbar"
import type { SectionKey } from "@/lib/types/navigation"

export function PortfolioShell() {
  const [activeSection, setActiveSection] = useState<SectionKey>("home")

  return (
    <div className="relative min-h-[100svh] w-full overflow-hidden bg-black text-white supports-[height:100dvh]:min-h-[100dvh]">
      <Navbar
        activeSection={activeSection}
        onChangeSection={setActiveSection}
      />

      <MainViewport activeSection={activeSection} />

      <FooterDock />
    </div>
  )
}