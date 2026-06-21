"use client"

import { useEffect, useState, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"

const GLYPHS = "!@#$%^&*()_+-=<>?/\\[]{}"

export function LoadingScreen() {
  const [isLoading, setIsLoading] = useState(true)
  const [scrambleText, setScrambleText] = useState("")
  const [showSecondLine, setShowSecondLine] = useState(false)
  const [ready, setReady] = useState(false)

  const targetText = "SYSTEM READY"
  const SECOND_LINE = "FULL STACK + AI"

  // Run scramble animation for the tagline
  const runScramble = useCallback(() => {
    let progress = 0
    const totalSteps = targetText.length + 8

    const interval = setInterval(() => {
      progress++
      const lockedCount = Math.min(progress, targetText.length)
      const display = targetText
        .split("")
        .map((char, i) => {
          if (i < lockedCount - 1) return char
          if (i === lockedCount - 1 && progress <= targetText.length) return char
          return GLYPHS[Math.floor(Math.random() * GLYPHS.length)]
        })
        .join("")
      setScrambleText(display)

      if (progress >= totalSteps) {
        clearInterval(interval)
        setScrambleText(targetText)
        setShowSecondLine(true)
      }
    }, 50)

    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    // Check session storage
    const hasVisited = sessionStorage.getItem("portfolio-loaded")
    if (hasVisited) {
      setIsLoading(false)
      return
    }

    // Start animations after mount
    const mountTimer = setTimeout(() => {
      setReady(true)
      const cleanup = runScramble()
      return cleanup
    }, 400)

    // Auto-dismiss
    const dismissTimer = setTimeout(() => {
      setIsLoading(false)
      sessionStorage.setItem("portfolio-loaded", "true")
    }, 2800)

    return () => {
      clearTimeout(mountTimer)
      clearTimeout(dismissTimer)
    }
  }, [runScramble])

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 0.61, 0.36, 1] }}
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-background"
        >
          <div className="text-center">
            {/* Main name */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="font-[var(--font-bebas)] text-[clamp(4rem,15vw,12rem)] tracking-tight text-foreground leading-none"
            >
              LETCHAGAN
            </motion.h1>

            {/* Scramble tagline */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: ready ? 1 : 0 }}
              transition={{ duration: 0.4 }}
              className="mt-4 h-6"
            >
              <span className="font-mono text-xs sm:text-sm tracking-[0.3em] text-accent">
                {scrambleText || "\u00A0"}
              </span>
            </motion.div>

            {/* Second line */}
            <AnimatePresence>
              {showSecondLine && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                  className="mt-2 h-5"
                >
                  <span className="font-mono text-[10px] tracking-[0.2em] text-muted-foreground/60">
                    {SECOND_LINE}
                  </span>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Loading bar */}
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 2.2, ease: "easeInOut" }}
              className="mt-8 h-px bg-accent/60 w-48 mx-auto origin-left"
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
