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
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={activeSection}
            initial={{ opacity: 1 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 1 }}
            transition={{ duration: 0 }}
            className="main-viewport__content"
          >
            <SectionNavigator activeSection={activeSection} />
          </motion.div>
        </AnimatePresence>
      </div>
    </main>
  )
}