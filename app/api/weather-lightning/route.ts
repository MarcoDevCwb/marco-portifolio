import { NextRequest, NextResponse } from "next/server"

export const revalidate = 300

type OpenMeteoCurrentResponse = {
  current?: {
    temperature_2m?: number
    weather_code?: number
    cloud_cover?: number
    wind_speed_10m?: number
    wind_gusts_10m?: number
    precipitation?: number
  }
}

type ErrorWithCause = Error & {
  cause?: {
    code?: string
  }
}

async function fetchWithTimeout(url: string, timeoutMs = 8000) {
  const controller = new AbortController()
  const timer = setTimeout(() => controller.abort(), timeoutMs)

  try {
    return await fetch(url, {
      signal: controller.signal,
      cache: "no-store",
    })
  } finally {
    clearTimeout(timer)
  }
}

function buildWeatherUrl(lat: string, lon: string) {
  return (
    "https://api.open-meteo.com/v1/forecast" +
    `?latitude=${encodeURIComponent(lat)}` +
    `&longitude=${encodeURIComponent(lon)}` +
    "&current=temperature_2m,weather_code,cloud_cover,wind_speed_10m,wind_gusts_10m,precipitation" +
    "&timezone=auto"
  )
}

function parseNumber(value: unknown) {
  const parsed = Number(value)
  return Number.isFinite(parsed) ? parsed : 0
}

function isTimeoutError(error: unknown) {
  if (!(error instanceof Error)) return false

  if (error.name === "AbortError") return true

  const errorWithCause = error as ErrorWithCause
  return errorWithCause.cause?.code === "ETIMEDOUT"
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)

  const lat = searchParams.get("lat")
  const lon = searchParams.get("lon")

  if (!lat || !lon) {
    return NextResponse.json(
      { error: "Latitude e longitude são obrigatórias." },
      { status: 400 }
    )
  }

  const latitude = Number(lat)
  const longitude = Number(lon)

  if (!Number.isFinite(latitude) || !Number.isFinite(longitude)) {
    return NextResponse.json(
      { error: "Latitude ou longitude inválida." },
      { status: 400 }
    )
  }

  const url = buildWeatherUrl(lat, lon)

  for (let attempt = 1; attempt <= 2; attempt++) {
    try {
      const response = await fetchWithTimeout(url, 8000)

      if (!response.ok) {
        console.error("weather-lightning upstream error:", {
          attempt,
          status: response.status,
          statusText: response.statusText,
        })

        return NextResponse.json(
          {
            error: "Falha ao consultar Open-Meteo.",
            status: response.status,
          },
          { status: 502 }
        )
      }

      const data = (await response.json()) as OpenMeteoCurrentResponse
      const current = data.current

      if (!current) {
        console.error("weather-lightning invalid payload:", data)

        return NextResponse.json(
          { error: "Resposta de clima inválida." },
          { status: 502 }
        )
      }

      return NextResponse.json({
        temperature: parseNumber(current.temperature_2m),
        weatherCode: parseNumber(current.weather_code),
        cloudCover: parseNumber(current.cloud_cover),
        windSpeed: parseNumber(current.wind_speed_10m),
        windGusts: parseNumber(current.wind_gusts_10m),
        precipitation: parseNumber(current.precipitation),
      })
    } catch (error) {
      const timeout = isTimeoutError(error)

      if (attempt === 1) {
        console.warn(`weather-lightning retrying after ${timeout ? "timeout" : "fetch error"}:`, error)
        continue
      }

      console.error("weather-lightning final error:", {
        type: timeout ? "timeout" : "unknown",
        error,
      })

      return NextResponse.json(
        {
          error: timeout
            ? "Tempo excedido ao buscar dados climáticos."
            : "Erro temporário ao buscar dados climáticos.",
        },
        { status: 500 }
      )
    }
  }

  return NextResponse.json(
    { error: "Erro inesperado ao buscar dados climáticos." },
    { status: 500 }
  )
}