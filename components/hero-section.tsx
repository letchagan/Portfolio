"use client"

import { useEffect, useRef } from "react"
import { ScrambleTextOnHover } from "@/components/scramble-text"
import { SplitFlapText, SplitFlapMuteToggle, SplitFlapAudioProvider } from "@/components/split-flap-text"
import { AnimatedNoise } from "@/components/animated-noise"
import { BitmapChevron } from "@/components/bitmap-chevron"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

export function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!sectionRef.current || !contentRef.current) return

    const ctx = gsap.context(() => {
      gsap.to(contentRef.current, {
        y: -100,
        opacity: 0,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1,
        },
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} id="hero" className="relative min-h-screen flex items-center px-4 sm:px-6 md:pl-28 md:pr-12">
      <AnimatedNoise opacity={0.03} />

      {/* Left vertical labels */}
      <div className="hidden md:block absolute left-4 md:left-6 top-1/2 -translate-y-1/2">
        <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground -rotate-90 origin-left block whitespace-nowrap">
          LETCHAGAN
        </span>
      </div>

      {/* Main content */}
      <div ref={contentRef} className="flex-1 w-full max-w-full overflow-hidden">
        <SplitFlapAudioProvider>
          <div className="relative overflow-hidden">
            <SplitFlapText text="FULL STACK" speed={80} />
            <div className="mt-4">
              <SplitFlapMuteToggle />
            </div>
          </div>
        </SplitFlapAudioProvider>

        <h2 className="font-[var(--font-bebas)] text-muted-foreground/60 text-[clamp(1.2rem,4vw,2rem)] mt-4 tracking-wide">
          <span className="block md:inline">Letchagan -</span> <span className="block md:inline">MERN Stack & AI / Cybersecurity</span>
        </h2>

        <p className="mt-8 md:mt-12 max-w-md font-mono text-xs sm:text-sm text-muted-foreground leading-relaxed">
          Computer Science Engineering graduate with hands-on experience in MERN Stack development, AI-powered applications
          with local LLMs, and cybersecurity projects. Seeking a Software Engineer or Full Stack Developer role.
        </p>

        <div className="mt-12 md:mt-16 flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-8">
          <a
            href="#projects"
            className="group inline-flex items-center gap-3 border border-foreground/20 px-4 sm:px-6 py-2 sm:py-3 font-mono text-[10px] sm:text-xs uppercase tracking-widest text-foreground hover:border-accent hover:text-accent transition-all duration-200"
          >
            <ScrambleTextOnHover text="View Projects" as="span" duration={0.6} />
            <BitmapChevron className="transition-transform duration-[400ms] ease-in-out group-hover:rotate-45" />
          </a>
          <a
            href="#skills"
            className="font-mono text-[10px] sm:text-xs uppercase tracking-widest text-muted-foreground hover:text-foreground transition-colors duration-200"
          >
            My Skills
          </a>
        </div>
      </div>

      {/* Avatar / Initials */}
      <div className="hidden lg:block absolute right-12 md:right-16 top-1/2 -translate-y-1/2">
        <div className="relative w-40 h-40 xl:w-52 xl:h-52">
          {/* Outer ring */}
          <div className="absolute inset-0 rounded-full border border-accent/30" style={{ animation: "spin-slow 20s linear infinite" }} />
          <div className="absolute inset-[6px] rounded-full border border-accent/10" style={{ animation: "spin-slow-reverse 30s linear infinite" }} />

          {/* Inner circle — gradient bg + initials as fallback */}
          <div className="absolute inset-[12px] rounded-full bg-gradient-to-br from-accent/20 via-accent/10 to-transparent flex items-center justify-center overflow-hidden">
            {/* Initials shown behind image (visible if image fails) */}
            {/* Your photo — place avatar.jpg in public/ folder */}
            <img
              src="/avatar3.jpg"
              alt="Letchagan"
              className="w-full h-full object-cover opacity-90 hover:opacity-100 transition-opacity duration-500"
              onError={(e) => {
                (e.target as HTMLImageElement).style.display = "none"
              }}
            />
          </div>

          {/* Corner dots */}
          <div className="absolute top-2 left-2 w-1.5 h-1.5 rounded-full bg-accent/40" />
          <div className="absolute top-2 right-2 w-1.5 h-1.5 rounded-full bg-accent/40" />
          <div className="absolute bottom-2 left-2 w-1.5 h-1.5 rounded-full bg-accent/40" />
          <div className="absolute bottom-2 right-2 w-1.5 h-1.5 rounded-full bg-accent/40" />
        </div>
      </div>

      {/* Floating info tag */}
      <div className="absolute bottom-4 right-4 sm:bottom-8 sm:right-8 md:bottom-12 md:right-12">
        <div className="border border-border px-3 py-1.5 sm:px-4 sm:py-2 font-mono text-[8px] sm:text-[10px] uppercase tracking-widest text-muted-foreground">
          Letchagan © 2026
        </div>
      </div>
    </section>
  )
}
