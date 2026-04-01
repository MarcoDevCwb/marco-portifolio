"use client"

import { useCallback, useEffect, useMemo, useRef, useState } from "react"

type TeslaIntensityKnobProps = {
  value: number
  min?: number
  max?: number
  onChange: (value: number) => void
  className?: string
}

function clamp(value: number, min: number, max: number) {
  return Math.max(min, Math.min(max, value))
}

function valueToRotation(value: number, min: number, max: number) {
  const normalized = (value - min) / (max - min)
  return -135 + normalized * 270
}

function angleToValue(angle: number, min: number, max: number) {
  const normalized = (angle + 135) / 270
  return min + normalized * (max - min)
}

export function TeslaIntensityKnob({
  value,
  min = 0.2,
  max = 1.4,
  onChange,
  className = "",
}: TeslaIntensityKnobProps) {
  const knobRef = useRef<HTMLButtonElement | null>(null)
  const [dragging, setDragging] = useState(false)

  const safeValue = clamp(value, min, max)

  const normalized = useMemo(() => {
    return (safeValue - min) / (max - min)
  }, [safeValue, min, max])

  const rotation = useMemo(() => {
    return valueToRotation(safeValue, min, max)
  }, [safeValue, min, max])

  const percentage = Math.round(normalized * 100)

  const updateFromPoint = useCallback(
    (clientX: number, clientY: number) => {
      const el = knobRef.current
      if (!el) return

      const rect = el.getBoundingClientRect()
      const centerX = rect.left + rect.width / 2
      const centerY = rect.top + rect.height / 2

      const dx = clientX - centerX
      const dy = clientY - centerY

      let angle = Math.atan2(dy, dx) * (180 / Math.PI)

      if (angle < -135) angle = -135
      if (angle > 135) angle = 135

      const nextValue = clamp(angleToValue(angle, min, max), min, max)
      onChange(Number(nextValue.toFixed(2)))
    },
    [min, max, onChange]
  )

  const handlePointerDown = useCallback(
    (event: React.PointerEvent<HTMLButtonElement>) => {
      event.preventDefault()
      setDragging(true)
      event.currentTarget.setPointerCapture(event.pointerId)
      updateFromPoint(event.clientX, event.clientY)
    },
    [updateFromPoint]
  )

  const handlePointerMove = useCallback(
    (event: React.PointerEvent<HTMLButtonElement>) => {
      if (!dragging) return
      updateFromPoint(event.clientX, event.clientY)
    },
    [dragging, updateFromPoint]
  )

  const handlePointerUp = useCallback(
    (event: React.PointerEvent<HTMLButtonElement>) => {
      setDragging(false)
      if (event.currentTarget.hasPointerCapture(event.pointerId)) {
        event.currentTarget.releasePointerCapture(event.pointerId)
      }
    },
    []
  )

  useEffect(() => {
    const stopDragging = () => setDragging(false)

    window.addEventListener("pointerup", stopDragging)
    window.addEventListener("pointercancel", stopDragging)

    return () => {
      window.removeEventListener("pointerup", stopDragging)
      window.removeEventListener("pointercancel", stopDragging)
    }
  }, [])

  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLButtonElement>) => {
      const step = 0.01
      const bigStep = 0.05

      if (event.key === "ArrowRight" || event.key === "ArrowUp") {
        event.preventDefault()
        onChange(clamp(Number((safeValue + step).toFixed(2)), min, max))
      }

      if (event.key === "ArrowLeft" || event.key === "ArrowDown") {
        event.preventDefault()
        onChange(clamp(Number((safeValue - step).toFixed(2)), min, max))
      }

      if (event.key === "Home") {
        event.preventDefault()
        onChange(min)
      }

      if (event.key === "End") {
        event.preventDefault()
        onChange(max)
      }

      if (event.key === "PageUp") {
        event.preventDefault()
        onChange(clamp(Number((safeValue + bigStep).toFixed(2)), min, max))
      }

      if (event.key === "PageDown") {
        event.preventDefault()
        onChange(clamp(Number((safeValue - bigStep).toFixed(2)), min, max))
      }
    },
    [safeValue, min, max, onChange]
  )

  return (
    <div
      className={`pointer-events-auto relative z-40 inline-flex items-center gap-3 rounded-full border border-white/10 bg-black/40 px-3 py-3 backdrop-blur-xl ${className}`}
    >
      <button
        ref={knobRef}
        type="button"
        role="slider"
        aria-label="Intensidade da bobina"
        aria-valuemin={min}
        aria-valuemax={max}
        aria-valuenow={Number(safeValue.toFixed(2))}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
        onKeyDown={handleKeyDown}
        className={`relative flex h-14 w-14 shrink-0 select-none items-center justify-center rounded-full border border-white/10 bg-white/[0.03] outline-none ${
          dragging ? "cursor-grabbing" : "cursor-grab"
        }`}
        style={{ touchAction: "none" }}
      >
        <div className="pointer-events-none absolute inset-[4px] rounded-full border border-white/10" />
        <div className="pointer-events-none absolute inset-[11px] rounded-full border border-white/10" />
        <div className="pointer-events-none absolute inset-[18px] rounded-full border border-white/10" />

        <div
          className="pointer-events-none absolute left-1/2 top-1/2 h-[2px] w-[16px] origin-left rounded-full bg-gradient-to-r from-fuchsia-400 via-violet-300 to-cyan-300 shadow-[0_0_12px_rgba(139,92,246,0.55)]"
          style={{
            transform: `translateY(-50%) rotate(${rotation}deg)`,
          }}
        />

        <div className="pointer-events-none absolute left-1/2 top-1/2 h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white shadow-[0_0_18px_rgba(255,255,255,0.55)]" />
      </button>

      <div className="pr-1 text-[10px] uppercase tracking-[0.22em] text-white/55">
        Bobina
        <div className="mt-1 text-xs tracking-[0.12em] text-white/82">
          {percentage}%
        </div>
      </div>
    </div>
  )
}