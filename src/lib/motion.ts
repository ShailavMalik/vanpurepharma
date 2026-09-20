import type { Transition, Variants } from 'motion/react'

export const easeOutExpo = [0.22, 1, 0.36, 1] as const

export const revealTransition: Transition = { duration: 0.6, ease: easeOutExpo }

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: revealTransition },
}

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: revealTransition },
}

export const stagger = (delayChildren = 0, staggerChildren = 0.07): Variants => ({
  hidden: {},
  visible: { transition: { delayChildren, staggerChildren } },
})

/** Per-line headline reveal: text slides up from behind an overflow-hidden mask. */
export const lineReveal: Variants = {
  hidden: { y: '110%' },
  visible: { y: 0, transition: { duration: 0.8, ease: easeOutExpo } },
}

export const viewportOnce = { once: true, amount: 0.2 } as const
