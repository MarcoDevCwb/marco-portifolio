"use client"

import { useEffect, useMemo, useRef, useState } from "react"
import { mapWeatherToLightning } from "@/lib/weather/mapWeatherToLightning"
import { SimulationEngine } from "@/lib/simulation/systems/simulationEngine"
import { drawDischarge } from "@/lib/simulation/render/arcPainter"

type WeatherPayload = {
  weatherCode: number
  cloudCover: number
  precipitation: number
  windSpeed: number
  windGusts: number
  temperature: number
}

type VisualState = ReturnType<typeof mapWeatherToLightning>

type Emitter = {
  x: number
  y: number
  radius: number
}

type SafeZones = {
  hudBox: {
    top: number
    height: number
    width: number
  }
  contentBox: {
    left: number
    top: number
    width: number
    height: number
  }
  emitter: Emitter
}

type AboutLightningFieldProps = {
  intensity: number
}

function clamp(value: number, min: number, max: number) {
  return Math.max(min, Math.min(max, value))
}

function formatCuritibaTime(now: Date) {
  return new Intl.DateTimeFormat("pt-BR", {
    hour: "2-digit",
    minute: "2-digit",
    timeZone: "America/Sao_Paulo",
  }).format(now)
}

function getFallbackVisual(): VisualState {
  return mapWeatherToLightning({
    weatherCode: 0,
    cloudCover: 20,
    precipitation: 0,
    windSpeed: 8,
    windGusts: 14,
    temperature: 14,
  })
}

function computeSafeZones(width: number, height: number): SafeZones {
  const isMobile = width < 768

  const hudTop = isMobile ? 24 : 22
  const hudHeight = isMobile ? 40 : 38
  const hudWidth = isMobile ? Math.min(width - 120, 420) : 360

  const contentTop = isMobile ? 118 : 132
  const contentWidth = isMobile
    ? Math.min(width - 28, 680)
    : Math.min(width - 120, 1120)

  const contentHeight = isMobile ? 220 : 230
  const contentLeft = (width - contentWidth) / 2

  const emitterRadius = Math.min(width, height) * (isMobile ? 0.036 : 0.05)

  const centerX = width / 2
  const visualCenterY = isMobile ? height * 0.585 : height * 0.66

  const minY = contentTop + contentHeight + 18
  const maxY = height - (isMobile ? 94 : 88)

  const emitterX = centerX
  const emitterY = clamp(visualCenterY, minY, maxY)

  return {
    hudBox: {
      top: hudTop,
      height: hudHeight,
      width: hudWidth,
    },
    contentBox: {
      left: contentLeft,
      top: contentTop,
      width: contentWidth,
      height: contentHeight,
    },
    emitter: {
      x: emitterX,
      y: emitterY,
      radius: emitterRadius,
    },
  }
}

export function AboutLightningField({ intensity }: AboutLightningFieldProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const engineRef = useRef<SimulationEngine | null>(null)
  const visualRef = useRef<VisualState | null>(null)
  const safeZonesRef = useRef<SafeZones | null>(null)
  const rafRef = useRef<number | null>(null)

  const [temperature, setTemperature] = useState<number | null>(null)
  const [clock, setClock] = useState(() => formatCuritibaTime(new Date()))

  useEffect(() => {
    const timer = window.setInterval(() => {
      setClock(formatCuritibaTime(new Date()))
    }, 1000)

    return () => window.clearInterval(timer)
  }, [])

  useEffect(() => {
    let mounted = true

    async function loadWeather() {
      try {
        const latitude = -25.4295963
        const longitude = -49.2712724

        const response = await fetch(
          `/api/weather-lightning?lat=${latitude}&lon=${longitude}`,
          { cache: "no-store" }
        )

        if (!response.ok) {
          throw new Error("weather request failed")
        }

        const data: WeatherPayload = await response.json()

        const visual = mapWeatherToLightning({
          weatherCode: data.weatherCode,
          cloudCover: data.cloudCover,
          precipitation: data.precipitation,
          windSpeed: data.windSpeed,
          windGusts: data.windGusts,
          temperature: data.temperature,
        })

        if (!mounted) return

        visualRef.current = visual
        setTemperature(data.temperature)
      } catch {
        if (!mounted) return

        visualRef.current = getFallbackVisual()
        setTemperature(14)
      }
    }

    loadWeather()
    const interval = window.setInterval(loadWeather, 1000 * 60 * 5)

    return () => {
      mounted = false
      window.clearInterval(interval)
    }
  }, [])

  const energyPercent = useMemo(() => {
    const base = visualRef.current ?? getFallbackVisual()
    return Math.round(clamp(base.energy * intensity, 0, 1) * 100)
  }, [intensity])

  useEffect(() => {
    if (!canvasRef.current) return

    const canvasElement: HTMLCanvasElement = canvasRef.current
    const context = canvasElement.getContext("2d")
    if (!context) return

    const ctx: CanvasRenderingContext2D = context

    function getVisual(): VisualState {
      const base = visualRef.current ?? getFallbackVisual()
      const adjustedEnergy = clamp(base.energy * intensity, 0, 1)

      return {
        ...base,
        energy: adjustedEnergy,
        branchProbability: clamp(
          base.branchProbability * (0.76 + intensity * 0.88),
          0,
          1
        ),
        sway: base.sway * (0.84 + intensity * 0.72),
        glow:
          typeof base.glow === "number"
            ? base.glow * (0.94 + intensity * 0.36)
            : 1,
        flashRate:
          typeof base.flashRate === "number"
            ? base.flashRate * (0.88 + intensity * 0.54)
            : 1,
      }
    }

    function resizeCanvas() {
      const ratio = Math.min(window.devicePixelRatio || 1, 2)
      const width = canvasElement.offsetWidth
      const height = canvasElement.offsetHeight

      if (width === 0 || height === 0) return

      canvasElement.width = Math.floor(width * ratio)
      canvasElement.height = Math.floor(height * ratio)
      canvasElement.style.width = `${width}px`
      canvasElement.style.height = `${height}px`

      ctx.setTransform(ratio, 0, 0, ratio, 0, 0)

      const zones = computeSafeZones(width, height)
      safeZonesRef.current = zones

      engineRef.current = new SimulationEngine({
        width,
        height,
        emitterX: zones.emitter.x,
        emitterY: zones.emitter.y,
      })
    }

    function drawAmbientFog(visual: VisualState) {
      const zones = safeZonesRef.current
      if (!zones) return

      const width = canvasElement.offsetWidth
      const height = canvasElement.offsetHeight
      const { emitter } = zones

      const radius = Math.min(width, height) * (0.18 + visual.energy * 0.12)

      const gradient = ctx.createRadialGradient(
        emitter.x,
        emitter.y,
        0,
        emitter.x,
        emitter.y,
        radius
      )

      gradient.addColorStop(
        0,
        `rgba(120, 70, 255, ${0.045 + visual.energy * 0.08})`
      )
      gradient.addColorStop(
        0.38,
        `rgba(45, 110, 255, ${0.03 + visual.energy * 0.05})`
      )
      gradient.addColorStop(1, "rgba(0,0,0,0)")

      ctx.beginPath()
      ctx.fillStyle = gradient
      ctx.arc(emitter.x, emitter.y, radius, 0, Math.PI * 2)
      ctx.fill()
    }

    function drawEmitterPulse(time: number, visual: VisualState) {
      const zones = safeZonesRef.current
      if (!zones) return

      const { emitter } = zones
      const pulse = 0.5 + Math.sin(time * 0.0022) * 0.5

      const outerRadius =
        emitter.radius * (1.5 + pulse * 0.34 + visual.energy * 0.44)
      const middleRadius = emitter.radius * (1 + pulse * 0.16)
      const innerRadius = emitter.radius * 0.44

      const outerGradient = ctx.createRadialGradient(
        emitter.x,
        emitter.y,
        0,
        emitter.x,
        emitter.y,
        outerRadius
      )
      outerGradient.addColorStop(
        0,
        `rgba(165,110,255,${0.06 + visual.energy * 0.09})`
      )
      outerGradient.addColorStop(
        0.45,
        `rgba(55,150,255,${0.04 + visual.energy * 0.06})`
      )
      outerGradient.addColorStop(1, "rgba(0,0,0,0)")

      ctx.beginPath()
      ctx.fillStyle = outerGradient
      ctx.arc(emitter.x, emitter.y, outerRadius, 0, Math.PI * 2)
      ctx.fill()

      const middleGradient = ctx.createRadialGradient(
        emitter.x,
        emitter.y,
        0,
        emitter.x,
        emitter.y,
        middleRadius
      )
      middleGradient.addColorStop(
        0,
        `rgba(255,255,255,${0.2 + visual.energy * 0.12})`
      )
      middleGradient.addColorStop(
        0.38,
        `rgba(140,90,255,${0.16 + visual.energy * 0.12})`
      )
      middleGradient.addColorStop(1, "rgba(0,0,0,0)")

      ctx.beginPath()
      ctx.fillStyle = middleGradient
      ctx.arc(emitter.x, emitter.y, middleRadius, 0, Math.PI * 2)
      ctx.fill()

      ctx.beginPath()
      ctx.fillStyle = `rgba(255,255,255,${0.28 + visual.energy * 0.14})`
      ctx.arc(emitter.x, emitter.y, innerRadius, 0, Math.PI * 2)
      ctx.fill()
    }

    function drawMicroDischarges(time: number, visual: VisualState) {
      const zones = safeZonesRef.current
      if (!zones) return

      const { emitter } = zones
      const microCount = 3 + Math.floor(visual.energy * 4)

      ctx.save()
      ctx.lineCap = "round"
      ctx.lineJoin = "round"

      for (let i = 0; i < microCount; i++) {
        const angle = time * 0.0018 + i * 1.7
        const wobble = Math.sin(angle * 1.4) * 0.8
        const length = emitter.radius * (0.55 + visual.energy * 0.6)

        const startX = emitter.x + Math.cos(wobble) * emitter.radius * 0.16
        const startY = emitter.y + Math.sin(wobble) * emitter.radius * 0.16
        const endX = emitter.x + Math.cos(wobble) * length
        const endY = emitter.y + Math.sin(wobble) * length

        ctx.beginPath()
        ctx.moveTo(startX, startY)
        ctx.lineTo(endX, endY)
        ctx.strokeStyle = `rgba(180,150,255,${0.1 + visual.energy * 0.1})`
        ctx.lineWidth = 0.75
        ctx.stroke()
      }

      ctx.restore()
    }

    function loop(time: number) {
      const visual = getVisual()
      const engine = engineRef.current

      ctx.clearRect(
        0,
        0,
        canvasElement.offsetWidth,
        canvasElement.offsetHeight
      )

      drawAmbientFog(visual)
      drawMicroDischarges(time, visual)
      drawEmitterPulse(time, visual)

      if (engine) {
        const steps =
          visual.mode === "storm"
            ? 2 + Math.floor(visual.energy * 2)
            : visual.mode === "unstable"
              ? 2
              : 1

        for (let i = 0; i < steps; i++) {
          engine.step(0.7 + visual.energy * 0.6)
        }

        ctx.save()
        ctx.shadowBlur = 18 + visual.energy * 14
        ctx.shadowColor = `rgba(145,95,255,${0.18 + visual.energy * 0.18})`
        drawDischarge(ctx, engine.state)
        ctx.restore()
      }

      rafRef.current = requestAnimationFrame(loop)
    }

    resizeCanvas()
    window.addEventListener("resize", resizeCanvas)

    rafRef.current = requestAnimationFrame(loop)

    return () => {
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current)
      }
      window.removeEventListener("resize", resizeCanvas)
    }
  }, [intensity])

  return (
    <>
      <canvas
        ref={canvasRef}
        className="absolute inset-0 h-full w-full opacity-[0.96]"
      />

      <div className="pointer-events-none absolute inset-x-0 top-6 z-20 flex justify-center">
        <div className="flex items-center gap-4 rounded-full border border-white/10 bg-black/30 px-4 py-2 text-[10px] uppercase tracking-[0.24em] text-white/60 backdrop-blur-xl sm:px-6 sm:text-[11px]">
          <span>{clock}</span>
          <span>•</span>
          <span>
            Curitiba {temperature !== null ? `${Math.round(temperature)}°C` : "--°C"}
          </span>
          <span>•</span>
          <span>energia {energyPercent}%</span>
        </div>
      </div>
    </>
  )
}