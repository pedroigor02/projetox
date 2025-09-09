import type React from "react"
import type { Metadata } from "next"
import { Inter, Poppins } from "next/font/google"
import "./globals.css"

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
})

const poppins = Poppins({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-poppins",
  weight: ["400", "500", "600", "700"],
})

export const metadata: Metadata = {
  title: "Do leite à Colher - +100 Receitas Nutritivas para Bebês",
  description:
    "Transforme a alimentação do seu bebê com mais de 100 receitas nutritivas e emocionantes. Guia completo de introdução alimentar.",
  keywords: "receitas bebê, introdução alimentar, papinha bebê, BLW, alimentação infantil",
  authors: [{ name: "Instituto Primeira Colher" }],
  creator: "Instituto Primeira Colher",
  publisher: "Instituto Primeira Colher",
  robots: "index, follow",
  openGraph: {
    title: "Do leite à Colher - +100 Receitas Nutritivas para Bebês",
    description: "Transforme a alimentação do seu bebê com mais de 100 receitas nutritivas e emocionantes",
    type: "website",
    locale: "pt_BR",
  },
    generator: 'v0.app'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR" className={`${inter.variable} ${poppins.variable} antialiased`}>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className="font-sans">{children}</body>
    </html>
  )
}
