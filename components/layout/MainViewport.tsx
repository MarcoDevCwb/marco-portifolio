"use client"

import { AnimatePresence, motion } from "framer-motion"
import type { SectionKey } from "@/lib/types/navigation"
import { SectionNavigator } from "./SectionNavigator"

type MainViewportProps = {
  activeSection: SectionKey
}

export function MainViewport({ activeSection }: MainViewportProps) {
  return (
    <main className="absolute inset-0 px-3 pt-[110px] pb-[92px] sm:px-4 sm:pt-[96px] sm:pb-[100px] md:px-4 md:pt-[104px] md:pb-[108px]">
      <div className="mx-auto h-full w-full max-w-6xl">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeSection}
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -18 }}
            transition={{ duration: 0.28, ease: "easeInOut" }}
            className="h-full min-h-0"
          >
            <SectionNavigator activeSection={activeSection} />
          </motion.div>
        </AnimatePresence>
      </div>
    </main>
  )
}