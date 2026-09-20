import type { PointerEvent } from 'react'

/**
 * Feeds the cursor position to the `spotlight` utility via CSS variables.
 * Writes straight to the element's style, so no React re-render per move.
 */
export function useSpotlight() {
  return {
    onPointerMove(event: PointerEvent<HTMLElement>) {
      const target = event.currentTarget
      const rect = target.getBoundingClientRect()
      target.style.setProperty('--mx', `${event.clientX - rect.left}px`)
      target.style.setProperty('--my', `${event.clientY - rect.top}px`)
    },
  }
}
