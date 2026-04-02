export function randomBetween(min: number, max: number) {
  return Math.random() * (max - min) + min
}

export function randomSigned() {
  return Math.random() * 2 - 1
}