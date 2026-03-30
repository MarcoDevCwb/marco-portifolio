"use client"

import { AnimatePresence, motion } from "framer-motion"
import type { SectionKey } from "@/lib/types/navigation"
import { SectionNavigator } from "./SectionNavigator"

type MainViewportProps = {
  activeSection: SectionKey
}

export function MainViewport({ activeSection }: MainViewportProps) {
  return (
    <main className="main-viewport">
      <div className="main-viewport__inner">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeSection}
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -18 }}
            transition={{ duration: 0.28, ease: "easeInOut" }}
            className="main-viewport__content"
          >
            <SectionNavigator activeSection={activeSection} />
          </motion.div>
        </AnimatePresence>
      </div>
    </main>
  )
}