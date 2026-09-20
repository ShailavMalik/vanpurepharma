import { animate, useInView, useReducedMotion } from 'motion/react'
import { useEffect, useRef, useState } from 'react'

interface CountUpProps {
  value: number
  /** Number to count from on the first animation. Defaults to `value`, so only later changes animate. */
  from?: number
  format?: (value: number) => string
  duration?: number
  className?: string
}

/** Renders `value`, animating between numbers. The first animation waits until the element is visible. */
export function CountUp({ value, from = value, format = (n) => String(n), duration = 0.8, className }: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: '0px 0px -10% 0px' })
  const reduceMotion = useReducedMotion()
  const [shown, setShown] = useState(value)
  const currentRef = useRef(from)

  useEffect(() => {
    if (!inView || reduceMotion) return
    const controls = animate(currentRef.current, value, {
      duration,
      ease: [0.22, 1, 0.36, 1],
      onUpdate(latest) {
        currentRef.current = latest
        setShown(latest)
      },
    })
    return () => controls.stop()
  }, [inView, value, duration, reduceMotion])

  const display = reduceMotion || !inView ? value : shown

  return (
    <span ref={ref} className={className}>
      {format(Math.round(display))}
    </span>
  )
}
