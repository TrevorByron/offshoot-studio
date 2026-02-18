"use client"

import * as React from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { useTheme } from "@/components/theme-provider"
import { Sun, Moon, Monitor, Menu, X } from "lucide-react"

const navLinks = [
  { label: "Services & How We Work", href: "/#services" },
  { label: "Case Studies", href: "/#case-studies" },
  { label: "FAQ", href: "/#faq" },
  { label: "About", href: "/about" },
]

export function Header() {
  const [isScrolled, setIsScrolled] = React.useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false)
  const { theme, setTheme } = useTheme()
  const [showThemeMenu, setShowThemeMenu] = React.useState(false)

  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  React.useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (showThemeMenu && !(e.target as Element).closest(".theme-menu")) {
        setShowThemeMenu(false)
      }
    }
    document.addEventListener("click", handleClickOutside)
    return () => document.removeEventListener("click", handleClickOutside)
  }, [showThemeMenu])

  const themeOptions = [
    { value: "light" as const, icon: Sun, label: "Light" },
    { value: "dark" as const, icon: Moon, label: "Dark" },
    { value: "system" as const, icon: Monitor, label: "System" },
  ]

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 transition-all",
        isScrolled && "shadow-sm"
      )}
    >
      <div className="mx-auto max-w-7xl px-4">
        <div className="flex h-16 items-center justify-between">
          <a
            href="/"
            className="text-lg font-semibold hover:text-primary transition-colors"
          >
            Offshoot Studio
          </a>
          <nav className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                {link.label}
              </Link>
            ))}
            <div className="relative theme-menu">
              <button
                onClick={() => setShowThemeMenu(!showThemeMenu)}
                className="p-2 rounded-md hover:bg-muted transition-colors"
                aria-label="Toggle theme"
              >
                {theme === "light" && <Sun className="h-4 w-4" />}
                {theme === "dark" && <Moon className="h-4 w-4" />}
                {theme === "system" && <Monitor className="h-4 w-4" />}
              </button>
              {showThemeMenu && (
                <div className="absolute right-0 mt-2 w-32 bg-popover border border-border rounded-md shadow-lg py-1 z-50">
                  {themeOptions.map((option) => {
                    const Icon = option.icon
                    return (
                      <button
                        key={option.value}
                        onClick={() => {
                          setTheme(option.value)
                          setShowThemeMenu(false)
                        }}
                        className={cn(
                          "w-full px-3 py-2 text-sm flex items-center gap-2 hover:bg-muted transition-colors",
                          theme === option.value && "bg-muted"
                        )}
                      >
                        <Icon className="h-4 w-4" />
                        {option.label}
                      </button>
                    )
                  })}
                </div>
              )}
            </div>
            <Link href="/#cta">
              <Button size="sm" className="ml-4">
                Book a Call
              </Button>
            </Link>
          </nav>
          <div className="md:hidden flex items-center gap-2">
            <div className="relative theme-menu">
              <button
                onClick={() => setShowThemeMenu(!showThemeMenu)}
                className="p-2 rounded-md hover:bg-muted transition-colors"
                aria-label="Toggle theme"
              >
                {theme === "light" && <Sun className="h-4 w-4" />}
                {theme === "dark" && <Moon className="h-4 w-4" />}
                {theme === "system" && <Monitor className="h-4 w-4" />}
              </button>
              {showThemeMenu && (
                <div className="absolute right-0 mt-2 w-32 bg-popover border border-border rounded-md shadow-lg py-1 z-50">
                  {themeOptions.map((option) => {
                    const Icon = option.icon
                    return (
                      <button
                        key={option.value}
                        onClick={() => {
                          setTheme(option.value)
                          setShowThemeMenu(false)
                        }}
                        className={cn(
                          "w-full px-3 py-2 text-sm flex items-center gap-2 hover:bg-muted transition-colors",
                          theme === option.value && "bg-muted"
                        )}
                      >
                        <Icon className="h-4 w-4" />
                        {option.label}
                      </button>
                    )
                  })}
                </div>
              )}
            </div>
            <Link href="/#cta">
              <Button size="sm">
                Book a Call
              </Button>
            </Link>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-md hover:bg-muted transition-colors"
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
        {/* Mobile menu panel */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-border bg-background">
            <nav className="py-4 flex flex-col gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-4 py-3 text-sm text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors rounded-md"
                >
                  {link.label}
                </Link>
              ))}
              <div className="mt-2 px-4">
                <Link href="/#cta" onClick={() => setMobileMenuOpen(false)}>
                  <Button size="sm" className="w-full">
                    Book a Call
                  </Button>
                </Link>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}
