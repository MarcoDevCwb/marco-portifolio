import { Vec2 } from "../core/types"

export type FieldSource =
  | {
      kind: "attractor"
      position: Vec2
      strength: number
      radius?: number
    }
  | {
      kind: "repulsor"
      position: Vec2
      strength: number
      radius?: number
    }
  | {
      kind: "directional"
      direction: Vec2
      strength: number
    }

export function createDefaultFieldSources(
  width: number,
  height: number
): FieldSource[] {
  const minDimension = Math.min(width, height)

  return [
    {
      kind: "attractor",
      position: { x: width * 0.5, y: height * 0.2 },
      strength: 0.72,
      radius: minDimension * 0.78,
    },
    {
      kind: "attractor",
      position: { x: width * 0.28, y: height * 0.28 },
      strength: 0.66,
      radius: minDimension * 0.62,
    },
    {
      kind: "attractor",
      position: { x: width * 0.72, y: height * 0.28 },
      strength: 0.66,
      radius: minDimension * 0.62,
    },
    {
      kind: "attractor",
      position: { x: width * 0.18, y: height * 0.42 },
      strength: 0.32,
      radius: minDimension * 0.46,
    },
    {
      kind: "attractor",
      position: { x: width * 0.82, y: height * 0.42 },
      strength: 0.32,
      radius: minDimension * 0.46,
    },
    {
      kind: "repulsor",
      position: { x: width * 0.5, y: height * 0.69 },
      strength: 0.24,
      radius: minDimension * 0.2,
    },
    {
      kind: "directional",
      direction: { x: 0, y: -1 },
      strength: 0.12,
    },
  ]
}