"use client"

import { useRef, useEffect } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { ContactForm } from "@/components/contact-form"

gsap.registerPlugin(ScrollTrigger)

export function ColophonSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)
  const gridRef = useRef<HTMLDivElement>(null)
  const footerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!sectionRef.current) return

    const ctx = gsap.context(() => {
      // Header slide in
      if (headerRef.current) {
        gsap.from(headerRef.current, {
          x: -60,
          opacity: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: headerRef.current,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        })
      }

      // Grid columns fade up with stagger
      if (gridRef.current) {
        const columns = gridRef.current.querySelectorAll(":scope > div")
        gsap.from(columns, {
          y: 40,
          opacity: 0,
          duration: 0.8,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: gridRef.current,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        })
      }

      // Footer fade in
      if (footerRef.current) {
        gsap.from(footerRef.current, {
          y: 20,
          opacity: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: footerRef.current,
            start: "top 95%",
            toggleActions: "play none none reverse",
          },
        })
      }
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="relative py-16 sm:py-24 md:py-32 px-4 sm:px-6 md:pl-28 md:pr-12 border-t border-border/30"
    >
      {/* Section header */}
      <div ref={headerRef} className="mb-12 md:mb-16">
        <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-accent">04 / Contact</span>
        <h2 className="mt-4 font-[var(--font-bebas)] text-4xl sm:text-5xl md:text-7xl tracking-tight">GET IN TOUCH</h2>
      </div>

      {/* Contact form */}
      <div className="mb-16 md:mb-24">
        <div className="flex flex-col md:flex-row md:items-start gap-8 md:gap-16">
          <div className="md:w-1/3">
            <h4 className="font-mono text-[9px] uppercase tracking-[0.3em] text-muted-foreground mb-4">Send a Message</h4>
            <p className="font-mono text-xs text-muted-foreground/70 leading-relaxed">
              Have a project in mind or just want to say hi? Fill out the form and I&apos;ll get back to you.
            </p>
          </div>
          <div className="md:w-2/3">
            <ContactForm />
          </div>
        </div>
      </div>

      {/* Multi-column layout */}
      <div ref={gridRef} className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 md:gap-12">
        {/* Connect */}
        <div className="col-span-1">
          <h4 className="font-mono text-[9px] uppercase tracking-[0.3em] text-muted-foreground mb-4">Connect</h4>
          <ul className="space-y-4">
            <li>
              <a
                href="mailto:letchagan@gmail.com"
                className="font-mono text-xs text-foreground/80 hover:text-accent transition-colors duration-200 block"
              >
                letchagan@gmail.com
              </a>
            </li>
            <li className="font-mono text-xs text-foreground/80">+91 94445 17796</li>
            <li className="flex gap-4">
              <a
                href="https://www.linkedin.com/in/letchagan-a-dev/"
                className="font-mono text-xs text-foreground/80 hover:text-accent transition-colors duration-200"
              >
                LinkedIn
              </a>
              <a
                href="https://github.com/letchagan"
                className="font-mono text-xs text-foreground/80 hover:text-accent transition-colors duration-200"
              >
                GitHub
              </a>
              <a
                href="https://x.com/letchagan_cyber"
                className="font-mono text-xs text-foreground/80 hover:text-accent transition-colors duration-200"
              >
                Twitter
              </a>
            </li>
            <li>
              <a
                href="/resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono text-xs text-accent hover:text-accent/80 transition-colors duration-200 flex items-center gap-2"
              >
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                  <polyline points="7 10 12 15 17 10" />
                  <line x1="12" y1="15" x2="12" y2="3" />
                </svg>
                Download Resume
              </a>
            </li>
          </ul>
        </div>

        {/* Services */}
        <div className="col-span-1">
          <h4 className="font-mono text-[9px] uppercase tracking-[0.3em] text-muted-foreground mb-4">Services</h4>
          <ul className="space-y-2">
            <li className="font-mono text-xs text-foreground/80">MERN Stack Development</li>
            <li className="font-mono text-xs text-foreground/80">AI / LLM Integration</li>
            <li className="font-mono text-xs text-foreground/80">Web Security Testing</li>
            <li className="font-mono text-xs text-foreground/80">REST API Design</li>
          </ul>
        </div>

        {/* Location */}
        <div className="col-span-1">
          <h4 className="font-mono text-[9px] uppercase tracking-[0.3em] text-muted-foreground mb-4">Status</h4>
          <ul className="space-y-2">
            <li className="flex items-center gap-2 font-mono text-xs text-foreground/80">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
              </span>
              Open to Opportunities
            </li>
            <li className="font-mono text-xs text-foreground/80">Remote / Worldwide</li>
          </ul>
        </div>

        {/* Stack */}
        <div className="col-span-1">
          <h4 className="font-mono text-[9px] uppercase tracking-[0.3em] text-muted-foreground mb-4">Built With</h4>
          <ul className="space-y-2">
            <li className="font-mono text-xs text-foreground/80">React / Next.js</li>
            <li className="font-mono text-xs text-foreground/80">Node.js / Express</li>
            <li className="font-mono text-xs text-foreground/80">MongoDB / SQL</li>
            <li className="font-mono text-xs text-foreground/80">Python / LangChain</li>
          </ul>
        </div>
      </div>

      {/* Bottom copyright */}
      <div
        ref={footerRef}
        className="mt-24 pt-8 border-t border-border/20 flex flex-col md:flex-row md:items-center md:justify-between gap-4"
      >
        <p className="font-mono text-[10px] text-muted-foreground uppercase tracking-widest">
          © 2026 Letchagan. All rights reserved.
        </p>
        <p className="font-mono text-[10px] text-muted-foreground">Crafted with passion and precision.</p>
      </div>
    </section>
  )
}
