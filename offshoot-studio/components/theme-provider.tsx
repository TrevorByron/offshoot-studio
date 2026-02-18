"use client"

import * as React from "react"

type Theme = "light" | "dark" | "system"

interface ThemeContextType {
  theme: Theme
  setTheme: (theme: Theme) => void
  resolvedTheme: "light" | "dark"
}

const ThemeContext = React.createContext<ThemeContextType | undefined>(undefined)

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = React.useState<Theme>("system")
  const [resolvedTheme, setResolvedTheme] = React.useState<"light" | "dark">("light")
  const [mounted, setMounted] = React.useState(false)

  const updateTheme = React.useCallback((newTheme: Theme) => {
    const root = document.documentElement
    
    if (newTheme === "system") {
      const systemPrefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches
      const resolved = systemPrefersDark ? "dark" : "light"
      setResolvedTheme(resolved)
      if (resolved === "dark") {
        root.classList.add("dark")
      } else {
        root.classList.remove("dark")
      }
    } else {
      setResolvedTheme(newTheme)
      if (newTheme === "dark") {
        root.classList.add("dark")
      } else {
        root.classList.remove("dark")
      }
    }
  }, [])

  React.useEffect(() => {
    setMounted(true)
    // Get initial theme from localStorage or system preference
    const stored = localStorage.getItem("theme") as Theme | null
    const initialTheme = stored || "system"
    setThemeState(initialTheme)
    updateTheme(initialTheme)
  }, [updateTheme])

  const setTheme = React.useCallback((newTheme: Theme) => {
    setThemeState(newTheme)
    localStorage.setItem("theme", newTheme)
    updateTheme(newTheme)
  }, [updateTheme])

  // Listen for system theme changes
  React.useEffect(() => {
    if (theme !== "system") return

    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)")
    const handleChange = () => updateTheme("system")
    
    mediaQuery.addEventListener("change", handleChange)
    return () => mediaQuery.removeEventListener("change", handleChange)
  }, [theme, updateTheme])

  // Always provide context, even before mount (prevents errors)
  return (
    <ThemeContext.Provider value={{ theme, setTheme, resolvedTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  const context = React.useContext(ThemeContext)
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider")
  }
  return context
}
