import type { Metadata, Viewport } from "next"
import "./globals.css"
import { SpeedInsights } from "@vercel/speed-insights/next"

export const metadata: Metadata = {
  title: "Marco Lima | Portfolio",
  description: "Portfolio premium em Next.js",
  applicationName: "Marco Dev",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "Marco Dev",
  },
}

export const viewport: Viewport = {
  themeColor: "#000000",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR">
      <body>
        {children}
        <SpeedInsights />
      </body>
    </html>
  )
}