"use client"

import { useState, useRef, useEffect } from "react"
import { cn } from "@/lib/utils"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

const projectGradients = [
  "from-cyan-500/20 via-blue-500/10 to-transparent",
  "from-emerald-500/20 via-teal-500/10 to-transparent",
  "from-violet-500/20 via-purple-500/10 to-transparent",
  "from-rose-500/20 via-pink-500/10 to-transparent",
  "from-amber-500/20 via-orange-500/10 to-transparent",
  "from-sky-500/20 via-indigo-500/10 to-transparent",
]

const projects = [
  {
    title: "AI Coding Assistant",
    medium: "Ollama / RAG / LangChain",
    description: "Offline AI coding assistant using Ollama, RAG with vector databases, and LangChain-based prompt orchestration. Fine-tuned models via Unsloth with GGUF quantization.",
    span: "col-span-1 sm:col-span-2 md:col-span-2 row-span-1 sm:row-span-2",
    image: null,
  },
  {
    title: "AI-IDPS on Raspberry Pi",
    medium: "Cybersecurity / Python",
    description: "Low-cost Intrusion Detection and Prevention System using Raspberry Pi, Suricata IDS/IPS, nftables, and Python automation scripts for real-time threat detection.",
    span: "col-span-1 row-span-1",
    image: null,
  },
  {
    title: "E-Commerce Website",
    medium: "MERN Stack",
    description: "Responsive e-commerce platform with React, Node.js, MongoDB. User authentication, product listing, shopping cart, and secure payment gateway integration.",
    span: "col-span-1 sm:col-span-1 md:col-span-1 row-span-1 sm:row-span-2",
    image: null,
  },
  {
    title: "Bug Bounty Research",
    medium: "Web Security / OWASP",
    description: "Web application security testing using OWASP Top 10 methodologies. Identified auth, authorization, and input validation vulnerabilities through Bugcrowd.",
    span: "col-span-1 row-span-1",
    image: null,
  },
  {
    title: "Local LLM Deployment",
    medium: "AI / ML Infrastructure",
    description: "Optimized local inference using GGUF quantization for efficient execution on consumer hardware. Integrated embeddings and vector databases for context-aware responses.",
    span: "col-span-1 sm:col-span-2 md:col-span-2 row-span-1",
    image: null,
  },
  {
    title: "Full Stack Internship",
    medium: "HoloTie India Pvt Ltd",
    description: "Developed full-stack apps with React, Node.js, Express, MongoDB. Designed RESTful APIs, collaborated on feature development, debugging, and deployment.",
    span: "col-span-1 row-span-1",
    image: null,
  },
]

export function WorkSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)
  const gridRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!sectionRef.current || !headerRef.current || !gridRef.current) return

    const ctx = gsap.context(() => {
      // Header slide in from left
      gsap.fromTo(
        headerRef.current,
        { x: -60, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: headerRef.current,
            start: "top 90%",
            toggleActions: "play none none reverse",
          },
        },
      )

      const cards = gridRef.current?.querySelectorAll("article")
      if (cards && cards.length > 0) {
        gsap.set(cards, { y: 60, opacity: 0 })
        gsap.to(cards, {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: gridRef.current,
            start: "top 90%",
            toggleActions: "play none none reverse",
          },
        })
      }
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} id="projects" className="relative py-16 sm:py-24 md:py-32 px-4 sm:px-6 md:pl-28 md:pr-12">
      {/* Section header */}
      <div ref={headerRef} className="mb-12 md:mb-16 flex flex-col md:flex-row items-start md:items-end justify-between gap-4">
        <div>
          <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-accent">02 / Projects</span>
          <h2 className="mt-4 font-[var(--font-bebas)] text-4xl sm:text-5xl md:text-7xl tracking-tight">FEATURED PROJECTS</h2>
        </div>
        <p className="md:max-w-xs font-mono text-xs text-muted-foreground md:text-right leading-relaxed">
          A collection of projects spanning AI/ML, full-stack development, and cybersecurity.
        </p>
      </div>

      {/* Asymmetric grid */}
      <div
        ref={gridRef}
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 md:gap-6 auto-rows-[160px] sm:auto-rows-[180px] md:auto-rows-[200px]"
      >
        {projects.map((project, index) => (
          <WorkCard key={index} project={project} index={index} persistHover={index === 0} />
        ))}
      </div>
    </section>
  )
}

function WorkCard({
  project,
  index,
  persistHover = false,
}: {
  project: {
    title: string
    medium: string
    description: string
    span: string
    image: string | null
  }
  index: number
  persistHover?: boolean
}) {
  const [isHovered, setIsHovered] = useState(false)
  const cardRef = useRef<HTMLElement>(null)
  const [isScrollActive, setIsScrollActive] = useState(false)

  useEffect(() => {
    if (!persistHover || !cardRef.current) return

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: cardRef.current,
        start: "top 80%",
        onEnter: () => setIsScrollActive(true),
      })
    }, cardRef)

    return () => ctx.revert()
  }, [persistHover])

  const isActive = isHovered || isScrollActive

  return (
    <article
      ref={cardRef}
      className={cn(
        "group relative border border-border/40 p-3 sm:p-4 md:p-5 flex flex-col justify-between transition-all duration-500 cursor-pointer overflow-hidden",
        project.span,
        isActive && "border-accent/60",
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Background layer */}
      <div
        className={cn(
          "absolute inset-0 bg-accent/5 transition-opacity duration-500",
          isActive ? "opacity-100" : "opacity-0",
        )}
      />

      {/* Gradient image placeholder */}
      <div
        className={cn(
          "absolute inset-0 bg-gradient-to-br opacity-40 transition-opacity duration-500",
          projectGradients[index % projectGradients.length],
          isActive ? "opacity-60" : "opacity-40",
        )}
      />

      {/* Real image (when available) */}
      {project.image && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={project.image}
          alt={`${project.title} screenshot`}
          className="absolute inset-0 w-full h-full object-cover opacity-30"
        />
      )}

      {/* Content */}
      <div className="relative z-10">
        <span className="font-mono text-[9px] sm:text-[10px] uppercase tracking-widest text-muted-foreground">
          {project.medium}
        </span>
        <h3
          className={cn(
            "mt-2 sm:mt-3 font-[var(--font-bebas)] text-xl sm:text-2xl md:text-4xl tracking-tight transition-colors duration-300 line-clamp-2",
            isActive ? "text-accent" : "text-foreground",
          )}
        >
          {project.title}
        </h3>
      </div>

      {/* Description - reveals on hover */}
      <div className="relative z-10 mt-auto">
        <p
          className={cn(
            "font-mono text-[10px] sm:text-xs text-muted-foreground leading-relaxed transition-all duration-500 max-w-full line-clamp-3 sm:line-clamp-4",
            isActive ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2",
          )}
        >
          {project.description}
        </p>
      </div>

      {/* Index marker */}
      <span
        className={cn(
          "absolute bottom-4 right-4 font-mono text-[10px] transition-colors duration-300",
          isActive ? "text-accent" : "text-muted-foreground/40",
        )}
      >
        {String(index + 1).padStart(2, "0")}
      </span>

      {/* Corner line */}
      <div
        className={cn(
          "absolute top-0 right-0 w-12 h-12 transition-all duration-500",
          isActive ? "opacity-100" : "opacity-0",
        )}
      >
        <div className="absolute top-0 right-0 w-full h-[1px] bg-accent" />
        <div className="absolute top-0 right-0 w-[1px] h-full bg-accent" />
      </div>
    </article>
  )
}
