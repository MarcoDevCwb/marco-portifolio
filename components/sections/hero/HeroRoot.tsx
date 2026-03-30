"use client"

import { useEffect, useState } from "react"
import { HeroSection } from "./HeroSection"
import { HeroMobileLandscape } from "./HeroMobileLandscape"

function shouldUseLandscapeHero() {
  if (typeof window === "undefined") return false

  const width = window.innerWidth
  const height = window.innerHeight

  return width > height && height <= 500
}

export function HeroRoot() {
  const [useLandscapeHero, setUseLandscapeHero] = useState(false)

  useEffect(() => {
    const update = () => {
      setUseLandscapeHero(shouldUseLandscapeHero())
    }

    update()

    window.addEventListener("resize", update)
    window.addEventListener("orientationchange", update)

    return () => {
      window.removeEventListener("resize", update)
      window.removeEventListener("orientationchange", update)
    }
  }, [])

  if (useLandscapeHero) {
    return <HeroMobileLandscape />
  }

  return <HeroSection />
}