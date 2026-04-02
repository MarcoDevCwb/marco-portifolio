import { normalize, perpendicular } from "../core/math2d"
import { randomBetween } from "../core/random"
import { Branch, DischargeState, LeaderNode } from "./dischargeTypes"

type BranchOptions = {
  probability: number
  maxDepth: number
  minEnergy: number
  parentDepth: number
}

export function tryCreateBranch(
  state: DischargeState,
  node: LeaderNode,
  options: BranchOptions
) {
  const { probability, maxDepth, minEnergy, parentDepth } = options

  if (parentDepth >= maxDepth) return
  if (node.energy < minEnergy) return
  if (Math.random() > probability) return

  const baseDir = node.direction
  const normal = perpendicular(baseDir)

  const branchDir = normalize({
    x: baseDir.x * 0.8 + normal.x * randomBetween(-0.95, 0.95),
    y: baseDir.y * 0.8 + normal.y * randomBetween(-0.95, 0.95),
  })

  const newNodeId = crypto.randomUUID()

  state.nodes[newNodeId] = {
    ...node,
    id: newNodeId,
    direction: branchDir,
    energy: node.energy * 0.62,
    age: 0,
    parentId: node.id,
  }

  const branch: Branch = {
    id: crypto.randomUUID(),
    nodeIds: [node.id, newNodeId],
    depth: parentDepth + 1,
    active: true,
  }

  state.branches.push(branch)
}