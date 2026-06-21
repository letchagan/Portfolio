"use client"

import { useState, useEffect } from "react"
import { cn } from "@/lib/utils"
import { Menu, X } from "lucide-react"
import { useSmoothScroll } from "@/components/smooth-scroll"
import { ThemeToggle } from "@/components/theme-toggle"

const navItems = [
  { id: "hero", label: "Intro" },
  { id: "skills", label: "Skills" },
  { id: "projects", label: "Projects" },
  { id: "about", label: "About" },
  { id: "contact", label: "Contact" },
]

export function SideNav() {
  const [activeSection, setActiveSection] = useState("hero")
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const { scrollTo, scrollProgress } = useSmoothScroll()

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id)
          }
        })
      },
      { threshold: 0.3 },
    )

    navItems.forEach(({ id }) => {
      const element = document.getElementById(id)
      if (element) observer.observe(element)
    })

    return () => observer.disconnect()
  }, [])

  const scrollToSection = (id: string) => {
    scrollTo(id)
    setMobileMenuOpen(false)
  }

  const activeIndex = navItems.findIndex((item) => item.id === activeSection)

  return (
    <>
      {/* Desktop Side Nav */}
      <nav className="fixed left-0 top-0 z-50 h-screen w-16 md:w-20 hidden md:flex flex-col border-r border-border/30 bg-background/80 backdrop-blur-sm">
        {/* Progress bar track */}
        <div className="absolute left-0 top-0 bottom-0 w-px bg-border/50">
          <div
            className="w-full bg-accent transition-all duration-150 ease-out"
            style={{ height: `${scrollProgress * 100}%` }}
          />
        </div>

        {/* Nav items */}
        <div className="flex-1 flex flex-col justify-center px-4">
          <div className="flex flex-col gap-6">
            {navItems.map(({ id, label }, index) => (
              <button key={id} onClick={() => scrollToSection(id)} className="group relative flex items-center gap-3">
                {/* Dot indicator */}
                <span
                  className={cn(
                    "h-1.5 w-1.5 rounded-full transition-all duration-300",
                    activeSection === id
                      ? "bg-accent scale-125"
                      : "bg-muted-foreground/40 group-hover:bg-foreground/60",
                  )}
                />
                {/* Active section number */}
                <span
                  className={cn(
                    "absolute left-6 font-mono text-[10px] uppercase tracking-widest opacity-0 transition-all duration-200 group-hover:opacity-100 group-hover:left-8 whitespace-nowrap",
                    activeSection === id ? "text-accent" : "text-muted-foreground",
                  )}
                >
                  {String(index + 1).padStart(2, "0")} — {label}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Theme toggle at bottom */}
        <div className="px-4 pb-6">
          <ThemeToggle />
        </div>
      </nav>

      {/* Mobile Menu Button */}
      <button
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        className="md:hidden fixed top-4 right-4 z-50 p-2 border border-border bg-background/80 backdrop-blur-sm hover:border-accent transition-colors"
        aria-label="Toggle menu"
      >
        {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
      </button>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-0 z-40 bg-background/95 backdrop-blur-md">
          <nav className="flex flex-col items-center justify-center h-full gap-8">
            {navItems.map(({ id, label }) => (
              <button
                key={id}
                onClick={() => scrollToSection(id)}
                className={cn(
                  "font-mono text-xl uppercase tracking-widest transition-colors",
                  activeSection === id ? "text-accent" : "text-muted-foreground hover:text-foreground",
                )}
              >
                {label}
              </button>
            ))}
            {/* Mobile theme toggle */}
            <div className="mt-8 pt-8 border-t border-border/30">
              <ThemeToggle className="text-sm" />
            </div>
          </nav>
        </div>
      )}
    </>
  )
}
