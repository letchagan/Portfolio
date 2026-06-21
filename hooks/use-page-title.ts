"use client"

import { useEffect, useRef } from "react"

const DEFAULT_TITLE = "Letchagan | Full Stack Developer & Cybersecurity Enthusiast"

export function usePageTitle() {
  const defaultTitle = useRef(DEFAULT_TITLE)

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden) {
        document.title = "Come back — Letchagan"
      } else {
        document.title = defaultTitle.current
      }
    }

    document.addEventListener("visibilitychange", handleVisibilityChange)

    // Handle page blur/focus for desktop browsers
    const handleBlur = () => {
      document.title = "Come back — Letchagan"
    }
    const handleFocus = () => {
      document.title = defaultTitle.current
    }

    window.addEventListener("blur", handleBlur)
    window.addEventListener("focus", handleFocus)

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange)
      window.removeEventListener("blur", handleBlur)
      window.removeEventListener("focus", handleFocus)
    }
  }, [])
}
