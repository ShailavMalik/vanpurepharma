import { useEffect, useState } from 'react'

/** Tracks whether the element with `id` is currently intersecting the viewport. */
export function useElementInView(id: string, rootMargin = '0px'): boolean {
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const element = document.getElementById(id)
    if (!element) {
      setInView(false)
      return
    }
    const observer = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), { rootMargin })
    observer.observe(element)
    return () => observer.disconnect()
  }, [id, rootMargin])

  return inView
}
