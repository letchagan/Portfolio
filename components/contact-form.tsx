"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"

export function ContactForm({ className }: { className?: string }) {
  const [formState, setFormState] = useState<"idle" | "sending" | "sent" | "error">("idle")
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) return

    setFormState("sending")

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          message: formData.message,
        }),
      })

      if (response.ok) {
        setFormState("sent")
        setFormData({ name: "", email: "", message: "" })
      } else {
        const data = await response.json()
        console.error("Contact form error:", data.error)
        setFormState("error")
      }
    } catch {
      setFormState("error")
    }
  }

  return (
    <div className={cn("w-full max-w-lg", className)}>
      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Name */}
        <div>
          <label
            htmlFor="contact-name"
            className="block font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground mb-2"
          >
            Name
          </label>
          <input
            id="contact-name"
            name="name"
            type="text"
            required
            value={formData.name}
            onChange={handleChange}
            placeholder="Your name"
            className="w-full bg-transparent border border-border/60 px-4 py-3 font-mono text-xs text-foreground placeholder:text-muted-foreground/40 focus:outline-none focus:border-accent transition-colors duration-200"
          />
        </div>

        {/* Email */}
        <div>
          <label
            htmlFor="contact-email"
            className="block font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground mb-2"
          >
            Email
          </label>
          <input
            id="contact-email"
            name="email"
            type="email"
            required
            value={formData.email}
            onChange={handleChange}
            placeholder="your@email.com"
            className="w-full bg-transparent border border-border/60 px-4 py-3 font-mono text-xs text-foreground placeholder:text-muted-foreground/40 focus:outline-none focus:border-accent transition-colors duration-200"
          />
        </div>

        {/* Message */}
        <div>
          <label
            htmlFor="contact-message"
            className="block font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground mb-2"
          >
            Message
          </label>
          <textarea
            id="contact-message"
            name="message"
            required
            value={formData.message}
            onChange={handleChange}
            placeholder="Tell me about your project..."
            rows={4}
            className="w-full bg-transparent border border-border/60 px-4 py-3 font-mono text-xs text-foreground placeholder:text-muted-foreground/40 focus:outline-none focus:border-accent transition-colors duration-200 resize-none"
          />
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={formState === "sending" || formState === "sent"}
          className={cn(
            "w-full border border-foreground/20 px-6 py-3 font-mono text-[10px] uppercase tracking-widest",
            "transition-all duration-200",
            formState === "sent"
              ? "border-accent text-accent"
              : formState === "error"
                ? "border-destructive text-destructive"
                : "text-foreground hover:border-accent hover:text-accent",
            formState === "sending" && "opacity-50 cursor-not-allowed",
          )}
        >
          {formState === "idle" && "Send Message"}
          {formState === "sending" && "Sending..."}
          {formState === "sent" && "Message Sent ✓"}
          {formState === "error" && "Failed — Try Email Instead"}
        </button>
      </form>

      {/* Fallback note */}
      <p className="mt-4 font-mono text-[9px] text-muted-foreground/60 text-center leading-relaxed">
        Or email me directly at{" "}
        <a href="mailto:letchagan@gmail.com" className="text-accent hover:underline">
          letchagan@gmail.com
        </a>
      </p>
    </div>
  )
}
