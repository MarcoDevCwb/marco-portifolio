import { add, clamp, normalize, perpendicular, scale } from "../core/math2d"
import { randomBetween, randomSigned } from "../core/random"
import { Vec2 } from "../core/types"
import { LeaderNode } from "./dischargeTypes"

type GrowthParams = {
  stepSize: number
  energy: number
  chaos: number
  fieldVector: Vec2
  damping?: number
  forwardBias?: number
  fieldInfluence?: number
}

export function growNode(
  node: LeaderNode,
  params: GrowthParams
): LeaderNode {
  const {
    stepSize,
    energy,
    chaos,
    fieldVector,
    damping = 0.92,
    forwardBias = 0.18,
    fieldInfluence = 0.44,
  } = params

  const inertia = scale(node.direction, damping)
  const forward = scale(node.direction, forwardBias)
  const field = scale(normalize(fieldVector), fieldInfluence)

  const randomVector = normalize({
    x: randomSigned(),
    y: randomSigned(),
  })

  const noise = scale(randomVector, chaos * (0.24 + energy * 0.5))

  const lateral = scale(
    perpendicular(node.direction),
    randomBetween(-1, 1) * chaos * 0.22
  )

  const nextDirection = normalize(
    add(inertia, add(forward, add(field, add(noise, lateral))))
  )

  const ageFactor = node.age < 3 ? 0.45 : node.age < 6 ? 0.72 : 1

  const nextPosition = add(
    node.position,
    scale(nextDirection, stepSize * ageFactor)
  )

  return {
    ...node,
    position: nextPosition,
    direction: nextDirection,
    energy: clamp(node.energy - (0.01 + (1 - energy) * 0.008), 0, 1),
    age: node.age + 1,
  }
}