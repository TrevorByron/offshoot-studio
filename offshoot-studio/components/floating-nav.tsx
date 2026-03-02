"use client"

import * as React from "react"
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion, useReducedMotion } from "framer-motion"
import { useCTAModal } from "@/components/cta-modal-provider"
import { buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"

const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "Selected Work", href: "/selected-work" },
  { label: "About", href: "/about" },
] as const

export function FloatingNav() {
  const pathname = usePathname()
  const { openCTAModal } = useCTAModal()
  const [menuOpen, setMenuOpen] = React.useState(false)
  const [hasScrolledHalfway, setHasScrolledHalfway] = React.useState(false)
  const menuRef = React.useRef<HTMLDivElement>(null)
  const prefersReducedMotion = useReducedMotion()

  React.useEffect(() => {
    const checkScroll = () => {
      setHasScrolledHalfway(window.scrollY >= window.innerHeight / 2)
    }
    checkScroll()
    window.addEventListener("scroll", checkScroll, { passive: true })
    return () => window.removeEventListener("scroll", checkScroll)
  }, [])

  const handleLogoClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (pathname === "/") {
      e.preventDefault()
      window.scrollTo({ top: 0, behavior: "instant" })
    }
  }

  const handleBookACallClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()
    if (pathname === "/") {
      const el = document.getElementById("cta")
      el?.scrollIntoView({ behavior: "smooth", block: "start" })
    } else {
      openCTAModal()
    }
  }

  React.useEffect(() => {
    if (!menuOpen) return
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false)
      }
    }
    document.addEventListener("click", handleClickOutside)
    return () => document.removeEventListener("click", handleClickOutside)
  }, [menuOpen])

  return (
    <motion.nav
      className="fixed bottom-6 left-1/2 z-50 -translate-x-1/2 px-4"
      aria-label="Floating navigation"
      initial={false}
      animate={{
        y: hasScrolledHalfway ? 0 : 80,
        opacity: hasScrolledHalfway ? 1 : 0,
        pointerEvents: hasScrolledHalfway ? "auto" : "none",
      }}
      transition={{
        type: prefersReducedMotion ? "tween" : "spring",
        stiffness: 300,
        damping: 30,
        opacity: { duration: prefersReducedMotion ? 0.2 : 0.25 },
      }}
    >
      <div
        className={cn(
          "flex items-center justify-between gap-6 rounded-2xl border border-border/50 bg-background/80 px-5 py-3 shadow-lg backdrop-blur-xl",
          "min-w-[280px] sm:min-w-[320px]"
        )}
      >
        {/* Logo — go to top of home when on home, else navigate to home */}
        <Link
          href="/"
          onClick={handleLogoClick}
          className="flex shrink-0 items-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-md"
          aria-label="Home"
        >
          <Image
            src="/tt.png"
            alt=""
            width={32}
            height={32}
            className="h-8 w-auto object-contain"
          />
        </Link>

        {/* Book a call — scroll to #cta on home, or go to /#cta from other pages */}
        <Link
          href="/#cta"
          onClick={handleBookACallClick}
          className={cn(
            buttonVariants({ variant: "default", size: "default" }),
            "shrink-0 rounded-lg bg-foreground text-background hover:bg-foreground/90"
          )}
        >
          Book a call
        </Link>

        {/* Hamburger + menu */}
        <div className="relative shrink-0" ref={menuRef}>
          <button
            type="button"
            onClick={() => setMenuOpen((o) => !o)}
            className="flex h-9 w-9 flex-col items-center justify-center gap-1 rounded-md hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            aria-expanded={menuOpen}
            aria-haspopup="true"
            aria-label="Open menu"
          >
            <span className="h-0.5 w-4 rounded-full bg-foreground" />
            <span className="h-0.5 w-4 rounded-full bg-foreground" />
          </button>

          {menuOpen && (
            <div
              className="absolute bottom-full right-0 mb-2 min-w-[160px] rounded-xl border border-border/50 bg-background/95 py-2 shadow-lg backdrop-blur-xl"
              role="menu"
            >
              {NAV_LINKS.map(({ label, href }) => (
                <Link
                  key={href}
                  href={href}
                  role="menuitem"
                  className="block px-4 py-3 text-base font-medium font-mono text-foreground hover:bg-muted focus-visible:bg-muted focus-visible:outline-none"
                  onClick={() => setMenuOpen(false)}
                >
                  {label}
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </motion.nav>
  )
}
