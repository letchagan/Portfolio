"use client"

import type React from "react"

import { useEffect, useRef, useState, createContext, useContext, useCallback } from "react"
import Lenis from "lenis"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { usePageTitle } from "@/hooks/use-page-title"

gsap.registerPlugin(ScrollTrigger)

interface SmoothScrollContextType {
  scrollTo: (target: string | HTMLElement, options?: { offset?: number; immediate?: boolean }) => void
  scrollProgress: number
}

const SmoothScrollContext = createContext<SmoothScrollContextType | null>(null)

export function useSmoothScroll() {
  const ctx = useContext(SmoothScrollContext)
  if (!ctx) throw new Error("useSmoothScroll must be used within SmoothScrollProvider")
  return ctx
}

export function SmoothScroll({ children }: { children: React.ReactNode }) {
  usePageTitle()
  const lenisRef = useRef<Lenis | null>(null)
  const [scrollProgress, setScrollProgress] = useState(0)

  const scrollTo = useCallback(
    (target: string | HTMLElement, options?: { offset?: number; immediate?: boolean }) => {
      if (!lenisRef.current) return

      let targetEl: HTMLElement | null = null
      if (typeof target === "string") {
        targetEl = document.getElementById(target)
      } else {
        targetEl = target
      }

      if (targetEl) {
        lenisRef.current.scrollTo(targetEl, {
          offset: options?.offset ?? 0,
          immediate: options?.immediate ?? false,
          duration: 1.4,
          easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        })
      }
    },
    [],
  )

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      smoothWheel: true,
    })

    lenisRef.current = lenis

    // Connect Lenis to GSAP ScrollTrigger
    lenis.on("scroll", ScrollTrigger.update)

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000)
    })

    gsap.ticker.lagSmoothing(0)

    return () => {
      lenis.destroy()
      gsap.ticker.remove(lenis.raf)
    }
  }, [])

  // Track scroll progress
  useEffect(() => {
    const lenis = lenisRef.current
    if (!lenis) return

    const onScroll = (e: Lenis) => {
      const progress = e.progress
      setScrollProgress(Math.min(1, Math.max(0, progress)))
    }

    lenis.on("scroll", onScroll)
    return () => {
      lenis.off("scroll", onScroll)
    }
  }, [])

  return (
    <SmoothScrollContext.Provider value={{ scrollTo, scrollProgress }}>{children}</SmoothScrollContext.Provider>
  )
}
