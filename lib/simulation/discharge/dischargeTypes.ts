import { Vec2 } from "../core/types"

export type LeaderNode = {
  id: string
  position: Vec2
  direction: Vec2
  energy: number
  age: number
  parentId?: string
}

export type Branch = {
  id: string
  nodeIds: string[]
  depth: number
  active: boolean
}

export type DischargeState = {
  nodes: Record<string, LeaderNode>
  branches: Branch[]
  age: number
  pulse: number
}