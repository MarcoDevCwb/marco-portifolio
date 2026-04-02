import { Vec2 } from "../core/types"

export type FieldCell = {
  x: number
  y: number
  potential: number
  vector: Vec2
}

export type FieldGrid = {
  cols: number
  rows: number
  cellSize: number
  width: number
  height: number
  cells: FieldCell[]
}

export function createFieldGrid(
  width: number,
  height: number,
  cellSize = 24
): FieldGrid {
  const cols = Math.max(1, Math.ceil(width / cellSize))
  const rows = Math.max(1, Math.ceil(height / cellSize))
  const cells: FieldCell[] = []

  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      const x = col * cellSize + cellSize * 0.5
      const y = row * cellSize + cellSize * 0.5

      cells.push({
        x,
        y,
        potential: 0,
        vector: { x: 0, y: -1 },
      })
    }
  }

  return {
    cols,
    rows,
    cellSize,
    width,
    height,
    cells,
  }
}

export function getCellIndex(grid: FieldGrid, col: number, row: number) {
  if (col < 0 || row < 0 || col >= grid.cols || row >= grid.rows) return -1
  return row * grid.cols + col
}

export function getCellAt(grid: FieldGrid, col: number, row: number) {
  const index = getCellIndex(grid, col, row)
  if (index === -1) return null
  return grid.cells[index] ?? null
}