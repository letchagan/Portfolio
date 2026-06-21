"use client"

import type React from "react"
import { ThemeProvider } from "next-themes"
import { SmoothScroll } from "@/components/smooth-scroll"

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false} disableTransitionOnChange>
      <SmoothScroll>{children}</SmoothScroll>
    </ThemeProvider>
  )
}
