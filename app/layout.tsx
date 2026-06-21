import type React from "react"
import type { Metadata } from "next"
import { IBM_Plex_Sans, IBM_Plex_Mono, Bebas_Neue } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { Providers } from "@/components/providers"
import { LoadingScreen } from "@/components/loading-screen"
import "./globals.css"

const ibmPlexSans = IBM_Plex_Sans({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-ibm-plex-sans",
})
const ibmPlexMono = IBM_Plex_Mono({
  weight: ["400", "500"],
  subsets: ["latin"],
  variable: "--font-ibm-plex-mono",
})
const bebasNeue = Bebas_Neue({ weight: "400", subsets: ["latin"], variable: "--font-bebas" })

export const metadata: Metadata = {
  title: {
    default: "Letchagan | Full Stack Developer & Cybersecurity Enthusiast",
    template: "%s | Letchagan",
  },
  description:
    "Computer Science Engineering graduate specializing in MERN Stack, AI-powered applications, and cybersecurity. Building full-stack solutions with React, Node.js, Python, and local LLM deployment.",
  keywords: [
    "full stack developer",
    "MERN stack",
    "React",
    "Node.js",
    "cybersecurity",
    "AI",
    "LLM",
    "portfolio",
    "Letchagan",
  ],
  authors: [{ name: "Letchagan" }],
  metadataBase: new URL("https://letchagan.dev"),
  openGraph: {
    title: "Letchagan | Full Stack Developer & Cybersecurity Enthusiast",
    description:
      "Computer Science Engineering graduate specializing in MERN Stack, AI-powered applications, and cybersecurity.",
    url: "https://letchagan.dev",
    siteName: "Letchagan Portfolio",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Letchagan | Full Stack Developer & Cybersecurity Enthusiast",
    description:
      "Computer Science Engineering graduate specializing in MERN Stack, AI-powered applications, and cybersecurity.",
  },
  icons: {
    icon: [
      {
        url: "/icon-light-32x32.png",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/icon-dark-32x32.png",
        media: "(prefers-color-scheme: dark)",
      },
      {
        url: "/icon.svg",
        type: "image/svg+xml",
      },
    ],
    apple: "/apple-icon.png",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${ibmPlexSans.variable} ${bebasNeue.variable} ${ibmPlexMono.variable} font-sans antialiased overflow-x-hidden`}
      >
        {/* Skip to content link for keyboard users */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[9999] focus:px-4 focus:py-2 focus:bg-accent focus:text-accent-foreground focus:font-mono focus:text-xs focus:uppercase focus:tracking-widest"
        >
          Skip to content
        </a>

        <LoadingScreen />
        <div className="noise-overlay" aria-hidden="true" />
        <Providers>{children}</Providers>
        <Analytics />
      </body>
    </html>
  )
}
