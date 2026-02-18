"use client"

import * as React from "react"
import { Collapsible } from "@base-ui/react/collapsible"
import { cn } from "@/lib/utils"
import { ChevronDown } from "lucide-react"

interface AccordionContextValue {
  value: string | undefined
  onValueChange: (value: string | undefined) => void
  type: "single" | "multiple"
}

const AccordionContext = React.createContext<AccordionContextValue | undefined>(
  undefined
)

interface AccordionProps {
  type?: "single" | "multiple"
  collapsible?: boolean
  value?: string
  defaultValue?: string
  onValueChange?: (value: string | undefined) => void
  children: React.ReactNode
  className?: string
}

function Accordion({
  type = "single",
  collapsible = true,
  value: controlledValue,
  defaultValue,
  onValueChange,
  children,
  className,
}: AccordionProps) {
  const [uncontrolledValue, setUncontrolledValue] = React.useState<string | undefined>(
    defaultValue
  )
  const value = controlledValue ?? uncontrolledValue

  const handleValueChange = React.useCallback(
    (newValue: string | undefined) => {
      if (type === "single") {
        const finalValue = value === newValue && collapsible ? undefined : newValue
        if (controlledValue === undefined) {
          setUncontrolledValue(finalValue)
        }
        onValueChange?.(finalValue)
      }
    },
    [value, type, collapsible, controlledValue, onValueChange]
  )

  return (
    <AccordionContext.Provider value={{ value, onValueChange: handleValueChange, type }}>
      <div className={cn("w-full", className)}>{children}</div>
    </AccordionContext.Provider>
  )
}

const AccordionItemContext = React.createContext<{ isOpen: boolean }>({ isOpen: false })

function AccordionItem({
  value,
  className,
  children,
  ...props
}: React.ComponentProps<"div"> & { value: string }) {
  const context = React.useContext(AccordionContext)
  if (!context) throw new Error("AccordionItem must be used within Accordion")

  const isOpen = context.value === value

  return (
    <Collapsible.Root
      open={isOpen}
      onOpenChange={(open) => {
        if (open) {
          context.onValueChange(value)
        } else {
          context.onValueChange(undefined)
        }
      }}
      data-slot="accordion-item"
      data-state={isOpen ? "open" : "closed"}
      className={cn("border-b border-border", className)}
      {...props}
    >
      <AccordionItemContext.Provider value={{ isOpen }}>
        {children}
      </AccordionItemContext.Provider>
    </Collapsible.Root>
  )
}

function AccordionTrigger({
  className,
  children,
  ...props
}: Collapsible.Trigger.Props) {
  return (
    <Collapsible.Trigger
      data-slot="accordion-trigger"
      className={cn(
        "flex w-full items-center justify-between py-4 text-left font-medium transition-all hover:underline [&[data-state=open]>svg]:rotate-180",
        className
      )}
      {...props}
    >
      {children}
      <ChevronDown className="h-4 w-4 shrink-0 transition-transform duration-200" />
    </Collapsible.Trigger>
  )
}

function AccordionContent({
  className,
  children,
  ...props
}: React.ComponentProps<"div">) {
  const { isOpen } = React.useContext(AccordionItemContext)

  if (!isOpen) return null

  return (
    <div
      data-slot="accordion-content"
      className={cn(
        "overflow-hidden text-sm transition-all animate-accordion-down",
        className
      )}
      {...props}
    >
      <div className="pb-4 pt-0">{children}</div>
    </div>
  )
}

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent }
