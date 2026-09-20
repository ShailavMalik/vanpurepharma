import { animate, useInView, useReducedMotion } from 'motion/react'
import { useEffect, useRef, useState } from 'react'

interface CountUpProps {
  value: number
  format?: (value: number) => string
  duration?: number
  className?: string
}

/** Animates from the previously shown number to `value`; the first run waits until visible. */
export function CountUp({ value, format = (n) => String(n), duration = 0.8, className }: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: '0px 0px -10% 0px' })
  const reduceMotion = useReducedMotion()
  const [shown, setShown] = useState(0)
  const shownRef = useRef(0)

  useEffect(() => {
    if (!inView) return
    if (reduceMotion) {
      shownRef.current = value
      setShown(value)
      return
    }
    const controls = animate(shownRef.current, value, {
      duration,
      ease: [0.22, 1, 0.36, 1],
      onUpdate(latest) {
        shownRef.current = latest
        setShown(latest)
      },
    })
    return () => controls.stop()
  }, [inView, value, duration, reduceMotion])

  return (
    <span ref={ref} className={className}>
      {format(Math.round(shown))}
    </span>
  )
}
