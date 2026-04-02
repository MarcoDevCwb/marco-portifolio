import { DischargeState } from "../discharge/dischargeTypes"

type RenderPoint = {
  x: number
  y: number
}

function drawSmoothBranch(
  ctx: CanvasRenderingContext2D,
  points: RenderPoint[]
) {
  if (points.length < 2) return

  ctx.beginPath()
  ctx.moveTo(points[0].x, points[0].y)

  if (points.length === 2) {
    ctx.lineTo(points[1].x, points[1].y)
    return
  }

  for (let i = 1; i < points.length - 1; i++) {
    const current = points[i]
    const next = points[i + 1]

    const midX = (current.x + next.x) * 0.5
    const midY = (current.y + next.y) * 0.5

    ctx.quadraticCurveTo(current.x, current.y, midX, midY)
  }

  const last = points[points.length - 1]
  ctx.lineTo(last.x, last.y)
}

export function drawDischarge(
  ctx: CanvasRenderingContext2D,
  state: DischargeState
) {
  ctx.lineCap = "round"
  ctx.lineJoin = "round"

  const globalAlpha = 0.4 + state.pulse * 0.6

  for (const branch of state.branches) {
    if (branch.nodeIds.length < 2) continue

    const points = branch.nodeIds
      .map((id) => state.nodes[id])
      .filter(Boolean)
      .map((node) => ({
        x: node.position.x,
        y: node.position.y,
      }))

    if (points.length < 2) continue

    const depthFactor = Math.max(0.42, 1 - branch.depth * 0.22)
    const width = Math.max(0.58, 1.35 - branch.depth * 0.24)
    const alpha = globalAlpha * depthFactor

    drawSmoothBranch(ctx, points)
    ctx.strokeStyle = `rgba(255,255,255,${0.84 * alpha})`
    ctx.lineWidth = width
    ctx.stroke()

    drawSmoothBranch(ctx, points)
    ctx.strokeStyle = `rgba(150,110,255,${0.24 * alpha})`
    ctx.lineWidth = width * 2.2
    ctx.stroke()
  }
}