"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

type HoverColor = "green" | "blue" | "purple" | "red"

const hoverColors: HoverColor[] = ["green", "blue", "purple", "red"]

// Deterministic color assignment based on string content
function getColorForText(text: string): HoverColor {
  let hash = 0
  for (let i = 0; i < text.length; i++) {
    hash = text.charCodeAt(i) + ((hash << 5) - hash)
  }
  return hoverColors[Math.abs(hash) % hoverColors.length]
}

interface HoverTextProps extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode
  color?: HoverColor
  as?: keyof JSX.IntrinsicElements
  splitWords?: boolean
}

/**
 * Component that applies smooth color transitions on hover.
 * If splitWords is true, each word gets a deterministic color.
 * Otherwise, the entire text gets one color.
 */
export function HoverText({
  children,
  color,
  as: Component = "span",
  splitWords = false,
  className,
  ...props
}: HoverTextProps) {
  // Convert children to string for processing
  const textContent = typeof children === "string" 
    ? children 
    : React.Children.toArray(children).join("")

  // If splitWords is true, split text into words and wrap each
  if (splitWords && textContent) {
    // Split by whitespace but preserve the spaces in the array
    const parts = textContent.split(/(\s+)/)
    const result: React.ReactNode[] = []
    
    parts.forEach((part, index) => {
      // If it's whitespace, render it as a span to preserve it
      if (part.trim() === "") {
        result.push(<span key={`space-${index}`}>{part}</span>)
      } else {
        // It's a word - wrap it with hover effect
        const wordColor = color || getColorForText(part)
        // Don't pass splitWords or as props to nested HoverText
        const { splitWords: _, as: __, ...restProps } = props
        result.push(
          <HoverText key={`word-${index}`} color={wordColor} className={className} {...restProps}>
            {part}
          </HoverText>
        )
      }
    })
    
    // Wrap in the Component (h1, h2, etc.) to preserve the semantic structure
    return (
      <Component className={className} {...props}>
        {result}
      </Component>
    )
  }

  // If color is explicitly provided, use it; otherwise assign deterministically
  const selectedColor = color || getColorForText(textContent)

  return (
    <Component
      className={cn(`hover-text-${selectedColor}`, className)}
      {...props}
    >
      {children}
    </Component>
  )
}
