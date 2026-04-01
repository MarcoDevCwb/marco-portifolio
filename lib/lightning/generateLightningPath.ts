export type LightningPoint = {
  x: number
  y: number
}

export type LightningBranch = {
  path: string
  opacity: number
  width: number
}

export type LightningShape = {
  mainPath: string
  branches: LightningBranch[]
}

type GenerateLightningOptions = {
  width: number
  height: number
  energy: number
  sway: number
  branchProbability: number
}

function randomBetween(min: number, max: number) {
  return Math.random() * (max - min) + min
}

function clamp(value: number, min: number, max: number) {
  return Math.max(min, Math.min(max, value))
}

function pointsToPath(points: LightningPoint[]) {
  return points
    .map((point, index) => `${index === 0 ? "M" : "L"} ${point.x} ${point.y}`)
    .join(" ")
}

function generateMainPoints({
  width,
  height,
  energy,
  sway,
}: Omit<GenerateLightningOptions, "branchProbability">): LightningPoint[] {
  const steps = Math.max(12, Math.floor(16 + energy * 18))
  const stepY = height / steps

  let x = width * 0.52
  let y = 0

  const points: LightningPoint[] = [{ x, y }]

  for (let i = 1; i <= steps; i++) {
    y = i * stepY

    const directionalBias = Math.sin(i * 0.65) * sway * 0.12
    const jitter = randomBetween(-sway, sway) * (0.4 + energy * 0.8)

    x = clamp(x + directionalBias + jitter, width * 0.14, width * 0.86)

    points.push({ x, y })
  }

  return points
}

function generateBranchFromPoint(
  start: LightningPoint,
  width: number,
  height: number,
  energy: number
): LightningBranch {
  const points: LightningPoint[] = [start]
  const steps = Math.floor(randomBetween(4, 8 + energy * 4))
  const direction = Math.random() > 0.5 ? 1 : -1

  let x = start.x
  let y = start.y

  for (let i = 1; i <= steps; i++) {
    x = clamp(
      x + direction * randomBetween(10, 26) * (0.7 + energy * 0.7),
      width * 0.08,
      width * 0.92
    )
    y = clamp(
      y + randomBetween(10, 24) * (0.8 + energy * 0.4),
      0,
      height
    )

    points.push({ x, y })
  }

  return {
    path: pointsToPath(points),
    opacity: randomBetween(0.18, 0.45),
    width: randomBetween(0.6, 1.4),
  }
}

export function generateLightningShape(
  options: GenerateLightningOptions
): LightningShape {
  const mainPoints = generateMainPoints(options)
  const branches: LightningBranch[] = []

  for (let i = 2; i < mainPoints.length - 2; i++) {
    const shouldBranch = Math.random() < options.branchProbability * 0.45

    if (!shouldBranch) continue

    branches.push(
      generateBranchFromPoint(
        mainPoints[i],
        options.width,
        options.height,
        options.energy
      )
    )
  }

  return {
    mainPath: pointsToPath(mainPoints),
    branches,
  }
}