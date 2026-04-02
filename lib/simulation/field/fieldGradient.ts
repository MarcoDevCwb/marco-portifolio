import { normalize } from "../core/math2d"
import { Vec2 } from "../core/types"
import { FieldGrid } from "./fieldGrid"
import { FieldSource } from "./fieldSources"

function clamp(value: number, min: number, max: number) {
  return Math.max(min, Math.min(max, value))
}

function length(x: number, y: number) {
  return Math.sqrt(x * x + y * y)
}

function normalizeSafe(x: number, y: number): Vec2 {
  const len = length(x, y) || 1
  return { x: x / len, y: y / len }
}

export function computeFieldVectorAtPoint(
  point: Vec2,
  sources: FieldSource[]
): Vec2 {
  let sumX = 0
  let sumY = 0

  for (const source of sources) {
    if (source.kind === "directional") {
      const dir = normalize(source.direction)
      sumX += dir.x * source.strength
      sumY += dir.y * source.strength
      continue
    }

    const dx = source.position.x - point.x
    const dy = source.position.y - point.y
    const dist = Math.sqrt(dx * dx + dy * dy) || 1

    const dir = normalizeSafe(dx, dy)
    const radius = source.radius ?? 300
    const falloff = clamp(1 - dist / radius, 0, 1)
    const force = source.strength * (0.18 + falloff * 0.82)

    if (source.kind === "attractor") {
      sumX += dir.x * force
      sumY += dir.y * force
    }

    if (source.kind === "repulsor") {
      sumX -= dir.x * force
      sumY -= dir.y * force
    }
  }

  return normalizeSafe(sumX, sumY)
}

export function populateFieldGrid(grid: FieldGrid, sources: FieldSource[]) {
  for (const cell of grid.cells) {
    const vector = computeFieldVectorAtPoint({ x: cell.x, y: cell.y }, sources)
    cell.vector = vector
    cell.potential = Math.sqrt(vector.x * vector.x + vector.y * vector.y)
  }

  return grid
}

export function sampleFieldVector(grid: FieldGrid, point: Vec2): Vec2 {
  const col = clamp(Math.floor(point.x / grid.cellSize), 0, grid.cols - 1)
  const row = clamp(Math.floor(point.y / grid.cellSize), 0, grid.rows - 1)

  const index = row * grid.cols + col
  const cell = grid.cells[index]

  if (!cell) return { x: 0, y: -1 }

  return cell.vector
}