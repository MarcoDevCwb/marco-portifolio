import type { Metadata } from "next"
import "./globals.css"

export const metadata: Metadata = {
  title: "Marco Lima | Portfolio",
  description: "Portfolio premium em Next.js",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  )
}