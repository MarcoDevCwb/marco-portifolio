import { NextRequest, NextResponse } from "next/server"

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

  try {
    const url =
      "https://api.open-meteo.com/v1/forecast" +
      `?latitude=${lat}` +
      `&longitude=${lon}` +
      "&current=temperature_2m,weather_code,cloud_cover,wind_speed_10m,wind_gusts_10m,precipitation" +
      "&timezone=auto"

    const response = await fetch(url, {
      next: { revalidate: 300 },
    })

    if (!response.ok) {
      return NextResponse.json(
        { error: "Falha ao consultar Open-Meteo." },
        { status: 502 }
      )
    }

    const data = await response.json()
    const current = data?.current

    if (!current) {
      return NextResponse.json(
        { error: "Resposta de clima inválida." },
        { status: 502 }
      )
    }

    return NextResponse.json({
      temperature: Number(current.temperature_2m ?? 0),
      weatherCode: Number(current.weather_code ?? 0),
      cloudCover: Number(current.cloud_cover ?? 0),
      windSpeed: Number(current.wind_speed_10m ?? 0),
      windGusts: Number(current.wind_gusts_10m ?? 0),
      precipitation: Number(current.precipitation ?? 0),
    })
  } catch (error) {
    console.error("weather-lightning route error:", error)

    return NextResponse.json(
      { error: "Erro interno ao buscar dados climáticos." },
      { status: 500 }
    )
  }
}