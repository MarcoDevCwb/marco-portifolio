"use client"

import { useEffect, useMemo, useRef, useState } from "react"
import { mapWeatherToLightning } from "@/lib/weather/mapWeatherToLightning"
import { TeslaIntensityKnob } from "@/components/ui/TeslaIntensityKnob"

type WeatherPayload = {
  weatherCode: number
  cloudCover: number
  precipitation: number
  windSpeed: number
  windGusts: number
  temperature: number
}

type VisualState = ReturnType<typeof mapWeatherToLightning>

type Point = {
  x: number
  y: number
}

type Arc = {
  id: string
  bornAt: number
  lifeMs: number
  thickness: number
  intensity: number
  points: Point[]
  branches: Point[][]
}

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
  knobBox: {
    left: number
    top: number
    width: number
    height: number
  }
  badgeBox: {
    left: number
    top: number
    width: number
    height: number
  }
  emitter: Emitter
}

function randomBetween(min: number, max: number) {
  return Math.random() * (max - min) + min
}

function clamp(value: number, min: number, max: number) {
  return Math.max(min, Math.min(max, value))
}

function distance(a: Point, b: Point) {
  const dx = b.x - a.x
  const dy = b.y - a.y
  return Math.sqrt(dx * dx + dy * dy)
}

function normalize(dx: number, dy: number) {
  const len = Math.sqrt(dx * dx + dy * dy) || 1
  return { x: dx / len, y: dy / len }
}

function pointsToSegmentsPath(
  ctx: CanvasRenderingContext2D,
  points: Point[]
) {
  if (points.length === 0) return

  ctx.beginPath()
  ctx.moveTo(points[0].x, points[0].y)

  for (let i = 1; i < points.length; i++) {
    const prev = points[i - 1]
    const curr = points[i]
    const midX = (prev.x + curr.x) / 2
    const midY = (prev.y + curr.y) / 2
    ctx.quadraticCurveTo(prev.x, prev.y, midX, midY)
  }

  const last = points[points.length - 1]
  ctx.lineTo(last.x, last.y)
}

function createBranchFromPoint(
  origin: Point,
  direction: Point,
  chaos: number,
  energy: number,
  maxLength: number
) {
  const points: Point[] = [origin]
  let current = { ...origin }

  const steps = Math.floor(randomBetween(4, 8 + energy * 5))
  const stepLength = maxLength / steps

  for (let i = 0; i < steps; i++) {
    const lateral = {
      x: -direction.y,
      y: direction.x,
    }

    const jitterForward = randomBetween(0.78, 1.16)
    const jitterSide = randomBetween(-chaos, chaos) * (0.35 + energy * 0.55)

    current = {
      x:
        current.x +
        direction.x * stepLength * jitterForward +
        lateral.x * jitterSide,
      y:
        current.y +
        direction.y * stepLength * jitterForward +
        lateral.y * jitterSide,
    }

    points.push(current)
  }

  return points
}

function generateTeslaArc(
  emitter: Emitter,
  width: number,
  height: number,
  energy: number,
  sway: number,
  branchProbability: number
): Arc {
  const angle = randomBetween(-Math.PI, Math.PI)
  const arcLength = randomBetween(
    Math.min(width, height) * 0.06,
    Math.min(width, height) * (0.1 + energy * 0.16)
  )

  const direction = {
    x: Math.cos(angle),
    y: Math.sin(angle),
  }

  const start: Point = {
    x: emitter.x + direction.x * emitter.radius * 0.82,
    y: emitter.y + direction.y * emitter.radius * 0.82,
  }

  const end: Point = {
    x: clamp(start.x + direction.x * arcLength, width * 0.08, width * 0.92),
    y: clamp(start.y + direction.y * arcLength, height * 0.12, height * 0.9),
  }

  const mainDistance = distance(start, end)
  const steps = Math.max(8, Math.floor(mainDistance / 14))
  const mainDirection = normalize(end.x - start.x, end.y - start.y)
  const lateral = {
    x: -mainDirection.y,
    y: mainDirection.x,
  }

  const points: Point[] = [start]
  const branches: Point[][] = []

  let current = { ...start }

  for (let i = 1; i < steps; i++) {
    const t = i / steps
    const baseX = start.x + (end.x - start.x) * t
    const baseY = start.y + (end.y - start.y) * t

    const noise =
      randomBetween(-sway, sway) * (0.18 + energy * 0.38) +
      Math.sin(t * Math.PI * randomBetween(1.2, 3.2)) * sway * 0.18

    current = {
      x: baseX + lateral.x * noise,
      y: baseY + lateral.y * noise,
    }

    points.push(current)

    if (Math.random() < branchProbability * (0.2 + energy * 0.42)) {
      const branchAngle = angle + randomBetween(-1.1, 1.1)
      const branchDirection = {
        x: Math.cos(branchAngle),
        y: Math.sin(branchAngle),
      }

      branches.push(
        createBranchFromPoint(
          current,
          branchDirection,
          sway * 0.7,
          energy,
          arcLength * randomBetween(0.1, 0.24)
        )
      )
    }
  }

  points.push(end)

  return {
    id: `${performance.now()}-${Math.random().toString(36).slice(2, 8)}`,
    bornAt: performance.now(),
    lifeMs: randomBetween(70, 120 + energy * 220),
    thickness: randomBetween(1, 1.2 + energy * 1.5),
    intensity: randomBetween(0.78, 1),
    points,
    branches,
  }
}

function formatCuritibaTime(now: Date) {
  return new Intl.DateTimeFormat("pt-BR", {
    hour: "2-digit",
    minute: "2-digit",
    timeZone: "America/Sao_Paulo",
  }).format(now)
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

  const knobWidth = 166
  const knobHeight = 82
  const knobLeft = 18
  const knobTop = 18

  const badgeWidth = isMobile ? Math.min(width - 36, 360) : 420
  const badgeHeight = 34
  const badgeLeft = 24
  const badgeTop = height - badgeHeight - 24

  const emitterRadius = Math.min(width, height) * (isMobile ? 0.044 : 0.054)

  const centerX = width / 2
  const visualCenterY = height * (isMobile ? 0.56 : 0.56)

  const minY = contentTop + contentHeight + 36
  const maxY = height - 120

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
    knobBox: {
      left: knobLeft,
      top: knobTop,
      width: knobWidth,
      height: knobHeight,
    },
    badgeBox: {
      left: badgeLeft,
      top: badgeTop,
      width: badgeWidth,
      height: badgeHeight,
    },
    emitter: {
      x: emitterX,
      y: emitterY,
      radius: emitterRadius,
    },
  }
}

export function AboutLightningField() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const arcsRef = useRef<Arc[]>([])
  const visualRef = useRef<VisualState | null>(null)
  const safeZonesRef = useRef<SafeZones | null>(null)
  const spawnTimerRef = useRef(0)
  const rafRef = useRef(0)

  const [temperature, setTemperature] = useState<number | null>(null)
  const [clock, setClock] = useState(() => formatCuritibaTime(new Date()))
  const [intensity, setIntensity] = useState(0.65)

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
        const fallback = mapWeatherToLightning({
          weatherCode: 0,
          cloudCover: 20,
          precipitation: 0,
          windSpeed: 8,
          windGusts: 14,
          temperature: 14,
        })

        if (!mounted) return

        visualRef.current = fallback
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
    const base =
      visualRef.current ??
      mapWeatherToLightning({
        weatherCode: 0,
        cloudCover: 20,
        precipitation: 0,
        windSpeed: 8,
        windGusts: 14,
        temperature: 14,
      })

    return Math.round(clamp(base.energy * intensity, 0, 1) * 100)
  }, [intensity, temperature])

  useEffect(() => {
    const canvasElement = canvasRef.current
    if (!canvasElement) return

    const canvas = canvasElement
    const context = canvas.getContext("2d")
    if (!context) return

    const ctx = context

    function getVisual(): VisualState {
      const base =
        visualRef.current ??
        mapWeatherToLightning({
          weatherCode: 0,
          cloudCover: 20,
          precipitation: 0,
          windSpeed: 8,
          windGusts: 14,
          temperature: 14,
        })

      const adjustedEnergy = clamp(base.energy * intensity, 0, 1)

      return {
        ...base,
        energy: adjustedEnergy,
        branchProbability: clamp(
          base.branchProbability * (0.74 + intensity * 0.92),
          0,
          1
        ),
        sway: base.sway * (0.82 + intensity * 0.76),
        glow:
          typeof base.glow === "number"
            ? base.glow * (0.92 + intensity * 0.42)
            : 1,
        flashRate:
          typeof base.flashRate === "number"
            ? base.flashRate * (0.84 + intensity * 0.62)
            : 1,
      }
    }

    function resize() {
      const ratio = Math.min(window.devicePixelRatio || 1, 2)
      const width = canvas.offsetWidth
      const height = canvas.offsetHeight

      canvas.width = Math.floor(width * ratio)
      canvas.height = Math.floor(height * ratio)
      canvas.style.width = `${width}px`
      canvas.style.height = `${height}px`

      ctx.setTransform(ratio, 0, 0, ratio, 0, 0)
      safeZonesRef.current = computeSafeZones(width, height)
    }

    function drawAmbientFog(visual: VisualState) {
      const zones = safeZonesRef.current
      if (!zones) return

      const width = canvas.offsetWidth
      const height = canvas.offsetHeight
      const { emitter } = zones

      const radius = Math.min(width, height) * (0.24 + visual.energy * 0.14)

      const gradient = ctx.createRadialGradient(
        emitter.x,
        emitter.y,
        0,
        emitter.x,
        emitter.y,
        radius
      )

      gradient.addColorStop(0, `rgba(120, 70, 255, ${0.06 + visual.energy * 0.1})`)
      gradient.addColorStop(0.38, `rgba(45, 110, 255, ${0.05 + visual.energy * 0.08})`)
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
      const pulse = 0.5 + Math.sin(time * 0.0026) * 0.5

      const outerRadius =
        emitter.radius * (1.55 + pulse * 0.42 + visual.energy * 0.72)
      const middleRadius = emitter.radius * (1.04 + pulse * 0.18)
      const innerRadius = emitter.radius * 0.48

      const outerGradient = ctx.createRadialGradient(
        emitter.x,
        emitter.y,
        0,
        emitter.x,
        emitter.y,
        outerRadius
      )
      outerGradient.addColorStop(0, `rgba(165,110,255,${0.08 + visual.energy * 0.14})`)
      outerGradient.addColorStop(0.45, `rgba(55,150,255,${0.07 + visual.energy * 0.1})`)
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
      middleGradient.addColorStop(0, `rgba(255,255,255,${0.22 + visual.energy * 0.18})`)
      middleGradient.addColorStop(0.38, `rgba(140,90,255,${0.22 + visual.energy * 0.22})`)
      middleGradient.addColorStop(1, "rgba(0,0,0,0)")

      ctx.beginPath()
      ctx.fillStyle = middleGradient
      ctx.arc(emitter.x, emitter.y, middleRadius, 0, Math.PI * 2)
      ctx.fill()

      ctx.beginPath()
      ctx.fillStyle = `rgba(255,255,255,${0.34 + visual.energy * 0.2})`
      ctx.arc(emitter.x, emitter.y, innerRadius, 0, Math.PI * 2)
      ctx.fill()
    }

    function drawArcPath(
      points: Point[],
      lifeRatio: number,
      thickness: number,
      intensityValue: number
    ) {
      pointsToSegmentsPath(ctx, points)
      ctx.strokeStyle = `rgba(255,255,255,${0.34 + lifeRatio * 0.84 * intensityValue})`
      ctx.lineWidth = thickness
      ctx.lineCap = "round"
      ctx.lineJoin = "round"
      ctx.stroke()

      pointsToSegmentsPath(ctx, points)
      ctx.shadowBlur = 24 + thickness * 14
      ctx.shadowColor = `rgba(145,95,255,${0.24 + lifeRatio * 0.64 * intensityValue})`
      ctx.strokeStyle = `rgba(145,95,255,${0.22 + lifeRatio * 0.54 * intensityValue})`
      ctx.lineWidth = thickness * 2.1
      ctx.stroke()

      pointsToSegmentsPath(ctx, points)
      ctx.shadowBlur = 34 + thickness * 18
      ctx.shadowColor = `rgba(65,170,255,${0.14 + lifeRatio * 0.34 * intensityValue})`
      ctx.strokeStyle = `rgba(65,170,255,${0.12 + lifeRatio * 0.28 * intensityValue})`
      ctx.lineWidth = thickness * 2.9
      ctx.stroke()

      ctx.shadowBlur = 0
      ctx.shadowColor = "transparent"
    }

    function drawArc(time: number, arc: Arc) {
      const age = time - arc.bornAt
      const progress = clamp(age / arc.lifeMs, 0, 1)
      const flicker = 0.68 + Math.random() * 0.32
      const lifeRatio = (1 - progress) * flicker

      drawArcPath(arc.points, lifeRatio, arc.thickness, arc.intensity)

      for (const branch of arc.branches) {
        drawArcPath(
          branch,
          lifeRatio * 0.82,
          arc.thickness * 0.6,
          arc.intensity * 0.76
        )
      }
    }

    function spawnArcCluster(time: number, visual: VisualState) {
      const zones = safeZonesRef.current
      if (!zones) return

      const width = canvas.offsetWidth
      const height = canvas.offsetHeight

      const baseCount =
        visual.mode === "storm"
          ? 2 + Math.floor(visual.energy * 7)
          : visual.mode === "unstable"
          ? 1 + Math.floor(visual.energy * 4)
          : Math.random() < 0.5
          ? 1
          : 0

      for (let i = 0; i < baseCount; i++) {
        arcsRef.current.push(
          generateTeslaArc(
            zones.emitter,
            width,
            height,
            visual.energy,
            visual.sway,
            visual.branchProbability
          )
        )
      }

      const minDelay =
        visual.mode === "storm" ? 44 : visual.mode === "unstable" ? 84 : 140
      const maxDelay =
        visual.mode === "storm" ? 110 : visual.mode === "unstable" ? 210 : 360

      spawnTimerRef.current = time + randomBetween(minDelay, maxDelay)
    }

    function loop(time: number) {
      const visual = getVisual()

      ctx.clearRect(0, 0, canvas.offsetWidth, canvas.offsetHeight)

      drawAmbientFog(visual)
      drawEmitterPulse(time, visual)

      if (time >= spawnTimerRef.current) {
        spawnArcCluster(time, visual)
      }

      const nextArcs: Arc[] = []

      for (const arc of arcsRef.current) {
        if (time - arc.bornAt <= arc.lifeMs) {
          drawArc(time, arc)
          nextArcs.push(arc)
        }
      }

      arcsRef.current = nextArcs
      rafRef.current = requestAnimationFrame(loop)
    }

    resize()
    window.addEventListener("resize", resize)

    spawnTimerRef.current = performance.now() + 120
    rafRef.current = requestAnimationFrame(loop)

    return () => {
      cancelAnimationFrame(rafRef.current)
      window.removeEventListener("resize", resize)
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

      <TeslaIntensityKnob
        value={intensity}
        onChange={setIntensity}
        className="absolute bottom-5 right-5 md:bottom-6 md:right-6"
      />

      
    </>
  )
}