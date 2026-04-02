import { SIMULATION_LIMITS } from "../core/constants"
import { clamp } from "../core/math2d"
import { Branch, DischargeState, LeaderNode } from "../discharge/dischargeTypes"
import { tryCreateBranch } from "../discharge/branching"
import { growNode } from "../discharge/leaderGrowth"
import { createFieldGrid, FieldGrid } from "../field/fieldGrid"
import { createDefaultFieldSources, FieldSource } from "../field/fieldSources"
import { populateFieldGrid, sampleFieldVector } from "../field/fieldGradient"

type EngineParams = {
  width: number
  height: number
  emitterX: number
  emitterY: number
}

export class SimulationEngine {
  state: DischargeState
  fieldGrid: FieldGrid
  fieldSources: FieldSource[]

  private width: number
  private height: number
  private emitterX: number
  private emitterY: number
  private frameCount: number

  constructor({ width, height, emitterX, emitterY }: EngineParams) {
    this.width = width
    this.height = height
    this.emitterX = emitterX
    this.emitterY = emitterY
    this.frameCount = 0

    this.fieldSources = createDefaultFieldSources(width, height)
    this.fieldGrid = populateFieldGrid(
      createFieldGrid(width, height, width < 768 ? 22 : 26),
      this.fieldSources
    )

    this.state = this.createInitialState()
  }

  private createRootNode(): LeaderNode {
    return {
      id: crypto.randomUUID(),
      position: { x: this.emitterX, y: this.emitterY },
      direction: { x: 0, y: -1 },
      energy: 1,
      age: 0,
    }
  }

  private createInitialState(): DischargeState {
    const root = this.createRootNode()

    return {
      nodes: {
        [root.id]: root,
      },
      branches: [
        {
          id: crypto.randomUUID(),
          nodeIds: [root.id],
          depth: 0,
          active: true,
        },
      ],
      age: 0,
      pulse: 1,
    }
  }

  reset() {
    this.frameCount = 0
    this.state = this.createInitialState()
  }

  private getTotalNodeCount() {
    return Object.keys(this.state.nodes).length
  }

  private shouldReset() {
    return (
      this.frameCount > SIMULATION_LIMITS.resetAfterFrames ||
      this.getTotalNodeCount() > SIMULATION_LIMITS.maxTotalNodes
    )
  }

  step(energyFactor = 1) {
    this.frameCount += 1
    this.state.age += 1
    this.state.pulse = clamp(
      1 - this.frameCount / SIMULATION_LIMITS.resetAfterFrames,
      0,
      1
    )

    if (this.shouldReset()) {
      this.reset()
      return
    }

    const activeBranches = this.state.branches.filter((branch) => branch.active)
    const maxBranchesReached =
      this.state.branches.length >= SIMULATION_LIMITS.maxBranches

    for (const branch of activeBranches) {
      if (branch.nodeIds.length >= SIMULATION_LIMITS.maxNodesPerBranch) {
        branch.active = false
        continue
      }

      const lastNodeId = branch.nodeIds[branch.nodeIds.length - 1]
      const node = this.state.nodes[lastNodeId]

      if (!node || node.energy <= 0.04) {
        branch.active = false
        continue
      }

      const fieldVector = sampleFieldVector(this.fieldGrid, node.position)

      const next = growNode(node, {
        stepSize: 3.8 + energyFactor * 1.05,
        energy: node.energy * energyFactor,
        chaos: 0.34 + (1 - this.state.pulse) * 0.22 + energyFactor * 0.12,
        damping: 0.92,
        forwardBias: 0.18,
        fieldInfluence: 0.44,
        fieldVector,
      })

      const outOfBounds =
        next.position.x < this.width * 0.12 ||
        next.position.x > this.width * 0.88 ||
        next.position.y < this.height * 0.12 ||
        next.position.y > this.height * 0.9

      if (outOfBounds) {
        branch.active = false
        continue
      }

      const newId = crypto.randomUUID()

      this.state.nodes[newId] = {
        ...next,
        id: newId,
      }

      branch.nodeIds.push(newId)

      if (!maxBranchesReached) {
        tryCreateBranch(this.state, this.state.nodes[newId], {
          probability: 0.05 + energyFactor * 0.03,
          maxDepth: SIMULATION_LIMITS.maxDepth,
          minEnergy: 0.28,
          parentDepth: branch.depth,
        })
      }

      if (this.getTotalNodeCount() >= SIMULATION_LIMITS.maxTotalNodes) {
        break
      }
    }

    const stillActive = this.state.branches.some((branch) => branch.active)

    if (!stillActive) {
      this.reset()
    }
  }

  getRenderableBranches(): Branch[] {
    return this.state.branches
  }
}