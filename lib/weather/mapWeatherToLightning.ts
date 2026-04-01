export type WeatherLightningInput = {
  temperature: number
  weatherCode: number
  cloudCover: number
  windSpeed: number
  windGusts: number
  precipitation: number
}

export type LightningVisualState = {
  active: boolean
  mode: "calm" | "unstable" | "storm"
  energy: number
  glow: number
  flashRate: number
  sway: number
  branchProbability: number
  thickness: number
  opacity: number
}

function clamp01(value: number) {
  return Math.max(0, Math.min(1, value))
}

function normalize(value: number, max: number) {
  return clamp01(value / max)
}

export function mapWeatherToLightning(
  input: WeatherLightningInput
): LightningVisualState {
  const isThunderstorm =
    input.weatherCode === 95 ||
    input.weatherCode === 96 ||
    input.weatherCode === 99

  const cloudFactor = normalize(input.cloudCover, 100)
  const rainFactor = normalize(input.precipitation, 8)
  const windFactor = normalize(input.windSpeed, 45)
  const gustFactor = normalize(input.windGusts, 70)

  const baseEnergy =
    (isThunderstorm ? 0.68 : 0) +
    cloudFactor * 0.22 +
    rainFactor * 0.22 +
    windFactor * 0.12 +
    gustFactor * 0.18

  const energy = clamp01(baseEnergy)

  const mode: LightningVisualState["mode"] =
    isThunderstorm || energy > 0.78
      ? "storm"
      : energy > 0.34
      ? "unstable"
      : "calm"

  const active = isThunderstorm || energy > 0.18

  const glow =
    mode === "storm"
      ? 0.85 + energy * 0.15
      : mode === "unstable"
      ? 0.35 + energy * 0.35
      : 0.12 + energy * 0.12

  const flashRate =
    mode === "storm"
      ? 1.6 + energy * 2.4
      : mode === "unstable"
      ? 0.5 + energy * 1.2
      : 0.15 + energy * 0.4

  const sway =
    mode === "storm"
      ? 28 + windFactor * 24 + gustFactor * 28
      : mode === "unstable"
      ? 14 + windFactor * 18 + gustFactor * 18
      : 7 + windFactor * 8

  const branchProbability =
    mode === "storm"
      ? 0.32 + energy * 0.48
      : mode === "unstable"
      ? 0.12 + energy * 0.24
      : 0.02 + energy * 0.06

  const thickness =
    mode === "storm"
      ? 2.2 + energy * 1.8
      : mode === "unstable"
      ? 1.4 + energy * 0.9
      : 0.9 + energy * 0.3

  const opacity =
    mode === "storm"
      ? 0.85
      : mode === "unstable"
      ? 0.55
      : 0.18

  return {
    active,
    mode,
    energy,
    glow,
    flashRate,
    sway,
    branchProbability,
    thickness,
    opacity,
  }
}