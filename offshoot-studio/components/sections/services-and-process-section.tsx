"use client"

import * as React from "react"
import { motion } from "framer-motion"

import { SectionWrapper } from "./section-wrapper"
import { useTheme } from "@/components/theme-provider"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Check, Zap, Code, Sparkles, Users } from "lucide-react"
import { cn } from "@/lib/utils"

type ServiceStep = {
  week: string
  title: string
  description: string
}

type ServiceWithProcess = {
  id: string
  tabLabel: string
  icon: React.ComponentType<{ className?: string }>
  title: string
  timeline: string
  pricing: string
  description: string
  perfectFor: string[]
  whatYouGet: string[]
  cta: string
  image: string
  imageAlt: string
  steps: ServiceStep[]
}

const servicesWithProcess: ServiceWithProcess[] = [
  {
    id: "rapid-prototyping",
    tabLabel: "Rapid Prototyping",
    icon: Zap,
    title: "AI-Powered Rapid Prototyping",
    timeline: "3-6 weeks",
    pricing: "$8k-$15k",
    description:
      "Working coded prototypes to validate ideas—with strategic thinking AI can't provide.",
    perfectFor: [
      "Testing features or new product directions with real users",
      "Investor-ready demos that close funding rounds",
      "Adjacent products outside your core roadmap",
      "De-risking bets before allocating engineering teams",
    ],
    whatYouGet: [
      "Strategy session: what are we testing? what validates success?",
      "User-testable prototype with realistic interactions",
      "AI-accelerated build (Cursor, Claude, v0) + iteration cycles",
      "Clean handoff and recommendation: build, kill, or pivot",
    ],
    cta: "Book a call",
    image: "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=800&h=600&fit=crop",
    imageAlt: "Rapid prototyping workspace",
    steps: [
      {
        week: "Week 1",
        title: "Discovery & Strategy",
        description: "Strategy session. Shape the idea into a testable hypothesis.",
      },
      {
        week: "Weeks 2-4",
        title: "Build & Deliver",
        description: "AI-augmented build 3-5x faster. Strategic thinking and craft AI can't match.",
      },
      {
        week: "Weeks 4-6",
        title: "Test & Refine",
        description: "You test. We iterate.",
      },
      {
        week: "Handoff",
        title: "Handoff",
        description: "Documentation and recommendation: build, kill, or pivot.",
      },
    ],
  },
  {
    id: "team-expansion",
    tabLabel: "Team Expansion",
    icon: Users,
    title: "Team Expansion",
    timeline: "3 to 6 month contracts",
    pricing: "monthly retainer",
    description:
      "Senior design-eng capacity without W2 overhead or hiring delays.",
    perfectFor: [
      "Critical feature builds: design + engineering in one",
      "Temporary capacity without hiring delays",
      "Product launches, redesigns, sprints",
      "Senior hybrid talent (design + code) fast",
    ],
    whatYouGet: [
      "Senior design engineer embedded (20-30 hrs/week)",
      "Feature design through production implementation",
      "Daily collaboration via Slack/Linear/GitHub",
      "No hiring overhead, no employment commitment. Month-to-month.",
    ],
    cta: "Book a call",
    image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&h=600&fit=crop",
    imageAlt: "Team expansion collaboration",
    steps: [
      {
        week: "Week 1",
        title: "Integration",
        description: "Plug into your workflow. Align on scope.",
      },
      {
        week: "Ongoing",
        title: "Build & Ship",
        description: "Daily collaboration. We work like a senior member of your team.",
      },
      {
        week: "Final Week",
        title: "Handoff",
        description: "Documentation and knowledge transfer.",
      },
    ],
  },
  {
    id: "design-refinement",
    tabLabel: "Design Refinement",
    icon: Sparkles,
    title: "0-to-MVP Design Refinement",
    timeline: "3-8 weeks",
    pricing: "$10k-$15k",
    description:
      "MVP to professional product. Closes deals, raises capital.",
    perfectFor: [
      "Traction but \"founder-built\" UI holding you back",
      "Investor-ready credibility for fundraising",
      "Upmarket: enterprise polish",
      "Scrappy MVP that works but looks amateur",
    ],
    whatYouGet: [
      "UX audit: where users drop off, what signals unprofessional",
      "Redesigned core flows, design system, clean React",
      "Polish and handoff with documentation",
    ],
    cta: "Book a call",
    image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&h=600&fit=crop",
    imageAlt: "Design refinement workspace",
    steps: [
      {
        week: "Week 1",
        title: "Audit & Strategy",
        description: "Deep dive. What's working, what's not, where users drop off.",
      },
      {
        week: "Weeks 2-5",
        title: "Design & Rebuild",
        description: "Redesign core flows. Design system. Modern React.",
      },
      {
        week: "Weeks 6-8",
        title: "Polish & Handoff",
        description: "Polish, edge cases, handoff, documentation.",
      },
    ],
  },
]

export function ServicesAndProcessSection() {
  const { resolvedTheme } = useTheme()
  const isInverse = resolvedTheme === "light" // Dark card in light mode, light card in dark mode
  
  // Parse hash to get initial service ID
  const getInitialServiceId = () => {
    if (typeof window !== "undefined") {
      const hash = window.location.hash
      // Parse hash format: #services-tab-rapid-prototyping
      const servicesTabMatch = hash.match(/services-tab-([^&]+)/)
      if (servicesTabMatch) {
        const tabId = servicesTabMatch[1]
        if (servicesWithProcess.some((s) => s.id === tabId)) {
          return tabId
        }
      }
    }
    return servicesWithProcess[0]?.id ?? "rapid-prototyping"
  }

  const [activeServiceId, setActiveServiceId] = React.useState<string>(getInitialServiceId)
  const [, forceUpdate] = React.useReducer((x) => x + 1, 0)
  const buttonRefs = React.useRef<Map<string, HTMLButtonElement>>(new Map())

  // Handle URL hash changes (e.g., from navigation links)
  React.useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash
      // Parse hash format: #services-tab-rapid-prototyping
      const servicesTabMatch = hash.match(/services-tab-([^&]+)/)
      
      if (servicesTabMatch) {
        const tabId = servicesTabMatch[1]
        if (servicesWithProcess.some((s) => s.id === tabId)) {
          setActiveServiceId(tabId)
          // Scroll to tab control area, positioning it just below header
          setTimeout(() => {
            const tabsElement = document.getElementById("services-tabs")
            if (tabsElement) {
              // Get header height (typically around 64px for top-16)
              const headerOffset = 64
              const elementPosition = tabsElement.getBoundingClientRect().top
              const offsetPosition = elementPosition + window.pageYOffset - headerOffset
              
              window.scrollTo({
                top: offsetPosition,
                behavior: "smooth"
              })
            }
          }, 100)
        }
      }
    }

    // Check on mount
    handleHashChange()
    
    // Listen for hash changes
    window.addEventListener("hashchange", handleHashChange)

    return () => window.removeEventListener("hashchange", handleHashChange)
  }, [])

  // Re-measure tab positions on resize so sliding indicator stays aligned
  React.useEffect(() => {
    const onResize = () => forceUpdate()
    window.addEventListener("resize", onResize)
    return () => window.removeEventListener("resize", onResize)
  }, [])

  const activeService =
    servicesWithProcess.find((service) => service.id === activeServiceId) ?? servicesWithProcess[0]

  const setButtonRef = React.useCallback(
    (id: string, element: HTMLButtonElement | null) => {
      if (element) {
        const wasSet = buttonRefs.current.has(id)
        buttonRefs.current.set(id, element)
        // Force re-render when active button ref is set for the first time
        if (!wasSet && id === activeServiceId) {
          forceUpdate()
        }
      }
    },
    [activeServiceId]
  )

  const activeButton = buttonRefs.current.get(activeServiceId)

  return (
    <SectionWrapper id="services">
      <div className="mx-auto max-w-7xl">
        <div className="text-left md:text-center mb-8 md:mb-12">
          <h2 className="text-section-title mb-4">Services</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            We offer three types of services: rapid prototyping to validate ideas, team expansion for embedded design-eng capacity, and design refinement to take your MVP to production-ready.
          </p>
        </div>

        <div id="services-tabs" className="sticky top-16 z-20 flex justify-center mb-8 py-3 -mx-4 px-4 md:-mx-8 md:px-8 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
          <div className="relative inline-flex gap-1 rounded-none border bg-muted/50 p-1">
            {/* Sliding indicator */}
            {activeButton && (
              <motion.div
                className="absolute rounded-none bg-foreground shadow-sm"
                initial={false}
                animate={{
                  left: activeButton.offsetLeft,
                  top: 4,
                  width: activeButton.offsetWidth,
                  height: activeButton.offsetHeight,
                }}
                transition={{
                  type: "spring",
                  stiffness: 300,
                  damping: 30,
                }}
              />
            )}
            {servicesWithProcess.map((service) => {
              const Icon = service.icon
              const isActive = activeServiceId === service.id
              return (
                <button
                  key={service.id}
                  ref={(el) => setButtonRef(service.id, el)}
                  type="button"
                  onClick={() => setActiveServiceId(service.id)}
                  className={cn(
                    "relative px-3 py-1.5 text-xs font-medium rounded-none border transition-colors flex items-center gap-2 z-10 border-transparent",
                    isActive
                      ? "text-background"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                  )}
                >
                  <Icon className="hidden sm:block h-4 w-4 shrink-0" />
                  {service.tabLabel}
                </button>
              )
            })}
          </div>
        </div>

        <div className="relative z-0 rounded-2xl overflow-hidden min-h-[480px] mt-4">
          {/* CSS background keeps image centered (x and y) so it doesn't jump when container resizes */}
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: "url(/contact-bg-landscape.png)" }}
            aria-hidden
          />
          <div className="absolute inset-0 bg-black/25 z-[1]" aria-hidden />
          {/* Content in flow — outer container resizes for even spacing; image re-crops from center so it doesn't move */}
          <div className="relative z-10 p-2 md:p-10 flex items-start justify-center">
            <Card className={cn(
              "w-full flex flex-col rounded-xl shadow-2xl backdrop-blur-sm p-4 md:px-8 md:pt-8 md:pb-8 gap-6 ring-0 overflow-visible",
              isInverse 
                ? "border border-white/10 bg-zinc-900/95" 
                : "border border-zinc-200 bg-white"
            )}>
              <CardHeader className="px-0 pt-0 pb-2">
                <div className="flex items-start justify-between gap-4 mb-3">
                  <CardTitle className={cn(
                    "text-lg flex items-center gap-2",
                    isInverse ? "text-zinc-50" : "text-zinc-900"
                  )}>
                    {React.createElement(activeService.icon, { 
                      className: cn("h-5 w-5", isInverse ? "text-zinc-400" : "text-zinc-600")
                    })}
                    {activeService.title}
                  </CardTitle>
                </div>
                <div className={cn(
                  "flex gap-2 flex-wrap pb-4 border-b",
                  isInverse ? "border-white/10" : "border-zinc-200"
                )}>
                  <Badge variant="outline" className={cn(
                    isInverse ? "border-zinc-600 text-zinc-300" : "border-zinc-300 text-zinc-700"
                  )}>
                    {activeService.timeline}
                  </Badge>
                  <Badge variant="outline" className={cn(
                    isInverse ? "border-zinc-600 text-zinc-300" : "border-zinc-300 text-zinc-700"
                  )}>
                    {activeService.pricing}
                  </Badge>
                </div>
                <CardDescription className={cn(
                  "mt-4 text-sm leading-relaxed font-semibold",
                  isInverse ? "text-zinc-400" : "text-zinc-600"
                )}>
                  {activeService.description}
                </CardDescription>
              </CardHeader>

              <CardContent className="flex-1 space-y-8 px-0">
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="space-y-6">
                    <div>
                      <h4 className={cn(
                        "font-semibold text-sm mb-3",
                        isInverse ? "text-zinc-200" : "text-zinc-900"
                      )}>
                        Perfect for:
                      </h4>
                      <ul className="space-y-3">
                        {activeService.perfectFor.map((item, idx) => (
                          <li key={idx} className={cn(
                            "flex gap-3 text-sm",
                            isInverse ? "text-zinc-400" : "text-zinc-700"
                          )}>
                            <Check className={cn(
                              "h-4 w-4 shrink-0 mt-0.5",
                              isInverse ? "text-white" : "text-zinc-900"
                            )} />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h4 className={cn(
                        "font-semibold text-sm mb-3",
                        isInverse ? "text-zinc-200" : "text-zinc-900"
                      )}>
                        What you get:
                      </h4>
                      <ul className="space-y-3">
                        {activeService.whatYouGet.map((item, idx) => (
                          <li key={idx} className={cn(
                            "flex gap-3 text-sm",
                            isInverse ? "text-zinc-400" : "text-zinc-700"
                          )}>
                            <Check className={cn(
                              "h-4 w-4 shrink-0 mt-0.5",
                              isInverse ? "text-white" : "text-zinc-900"
                            )} />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="space-y-5 overflow-visible">
                    <h4 className={cn(
                      "font-semibold text-sm",
                      isInverse ? "text-zinc-200" : "text-zinc-900"
                    )}>
                      How we work:
                    </h4>
                    <div className="space-y-5 overflow-visible">
                      {activeService.steps.map((step, idx) => (
                        <div key={idx} className="relative pl-8 overflow-visible">
                          <div className={cn(
                            "absolute left-0 top-0 h-full w-0.5 z-[1]",
                            isInverse ? "bg-zinc-600" : "bg-zinc-300"
                          )} />
                          <div className={cn(
                            "absolute left-0 top-0 h-4 w-4 rounded-full -translate-x-1.5 z-[2]",
                            isInverse ? "bg-zinc-300" : "bg-zinc-600"
                          )} />
                          <Badge variant="outline" className={cn(
                            "mb-2",
                            isInverse ? "border-zinc-600 text-zinc-400" : "border-zinc-300 text-zinc-700"
                          )}>
                            {step.week}
                          </Badge>
                          <h5 className={cn(
                            "font-semibold mb-1",
                            isInverse ? "text-zinc-100" : "text-zinc-900"
                          )}>
                            {step.title}
                          </h5>
                          <p className={cn(
                            "text-sm",
                            isInverse ? "text-zinc-400" : "text-zinc-600"
                          )}>{step.description}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>

              <CardFooter className={cn(
                "px-0 pt-6 pb-6 border-t flex flex-col gap-4",
                isInverse ? "border-zinc-700/50" : "border-zinc-200"
              )}>
                <a href="#cta" className="w-full">
                  <Button className={cn(
                    "w-full transition-colors",
                    isInverse 
                      ? "bg-white text-zinc-900 hover:bg-zinc-100" 
                      : "bg-zinc-900 text-white hover:bg-zinc-800"
                  )} size="lg">
                    Book a call
                  </Button>
                </a>
                <p className={cn(
                  "text-sm text-center",
                  isInverse ? "text-zinc-400" : "text-zinc-600"
                )}>
                  Not sure which fit? Book a call and we'll scope it.
                </p>
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
    </SectionWrapper>
  )
}

