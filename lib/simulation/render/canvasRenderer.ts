import { SimulationEngine } from "../systems/simulationEngine"
import { drawDischarge } from "./arcPainter"

export function startSimulation(
  canvas: HTMLCanvasElement,
  engine: SimulationEngine
) {
  const ctx = canvas.getContext("2d")!
  let raf = 0

  function loop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    engine.step()
    drawDischarge(ctx, engine.state)

    raf = requestAnimationFrame(loop)
  }

  loop()

  return () => cancelAnimationFrame(raf)
}