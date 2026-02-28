/**
 * Shared scroll-reveal animation config (Halaska-style).
 * Used by SectionWrapper and ScrollReveal for consistent, refined reveal-on-scroll.
 * Slower duration + ease for a more immersive feel.
 */

export const REVEAL_Y_OFFSET = 36
export const REVEAL_DURATION = 0.95
export const REVEAL_EASE = [0.22, 0.55, 0.38, 0.98] as const

export const revealInitial = {
  opacity: 0,
  y: REVEAL_Y_OFFSET,
}

export const revealAnimate = {
  opacity: 1,
  y: 0,
}

export const revealTransition = {
  duration: REVEAL_DURATION,
  ease: REVEAL_EASE,
}

export const revealViewport = {
  once: true,
  amount: 0.2,
} as const

/** For reduced motion: opacity-only, no translate */
export const revealInitialReduced = {
  opacity: 0,
}

export const revealAnimateReduced = {
  opacity: 1,
}
