import { useCallback, useEffect, useRef, useState, type UIEvent } from 'react'

interface Options {
  count: number
  /** Milliseconds between automatic advances; 0 disables autoplay. */
  autoplayMs?: number
}

/**
 * Drives a native scroll-snap track: tracks the visible slide, exposes go/prev/next,
 * and optionally auto-advances. Autoplay is off for reduced-motion users and while held.
 */
export function useSnapCarousel({ count, autoplayMs = 0 }: Options) {
  const trackRef = useRef<HTMLDivElement>(null)
  const [index, setIndex] = useState(0)
  const [paused, setPaused] = useState(false)
  const [held, setHeld] = useState(false)
  const [reduceMotion, setReduceMotion] = useState(false)
  const [cycle, setCycle] = useState(0)

  useEffect(() => {
    const query = window.matchMedia('(prefers-reduced-motion: reduce)')
    const update = () => setReduceMotion(query.matches)
    update()
    query.addEventListener('change', update)
    return () => query.removeEventListener('change', update)
  }, [])

  const go = useCallback(
    (next: number) => {
      const target = ((next % count) + count) % count
      const track = trackRef.current
      if (track) track.scrollTo({ left: target * track.clientWidth })
      setIndex(target)
      setCycle((c) => c + 1)
    },
    [count],
  )

  const onScroll = useCallback((event: UIEvent<HTMLDivElement>) => {
    const track = event.currentTarget
    if (!track.clientWidth) return
    const visible = Math.round(track.scrollLeft / track.clientWidth)
    setIndex((current) => {
      if (visible === current) return current
      setCycle((c) => c + 1)
      return visible
    })
  }, [])

  const autoplay = autoplayMs > 0 && !paused && !reduceMotion

  useEffect(() => {
    if (!autoplay || held) return
    const timer = window.setInterval(() => go(index + 1), autoplayMs)
    return () => window.clearInterval(timer)
  }, [autoplay, held, autoplayMs, index, go, cycle])

  return {
    trackRef,
    index,
    cycle,
    go,
    prev: () => go(index - 1),
    next: () => go(index + 1),
    onScroll,
    autoplay,
    running: autoplay && !held,
    togglePaused: () => setPaused((p) => !p),
    hold: () => setHeld(true),
    release: () => setHeld(false),
  }
}
