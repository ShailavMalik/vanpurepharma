import { useEffect, useRef } from 'react'
import { useLocation } from 'react-router-dom'

const HASH_RETRY_MS = 1200
const HASH_RETRY_STEP_MS = 50

/**
 * Scrolls to the top on route change, or to the hash target once it exists.
 * The retry loop covers the page-transition delay before the new route mounts.
 */
export function ScrollManager() {
  const { pathname, hash, key } = useLocation()
  const lastPathname = useRef(pathname)

  useEffect(() => {
    if (!hash) {
      if (lastPathname.current !== pathname) window.scrollTo({ top: 0, behavior: 'instant' })
      lastPathname.current = pathname
      return
    }
    lastPathname.current = pathname

    const id = decodeURIComponent(hash.slice(1))
    const deadline = Date.now() + HASH_RETRY_MS
    let timer = 0
    const attempt = () => {
      const target = document.getElementById(id)
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' })
        return
      }
      if (Date.now() < deadline) timer = window.setTimeout(attempt, HASH_RETRY_STEP_MS)
    }
    attempt()
    return () => window.clearTimeout(timer)
  }, [pathname, hash, key])

  return null
}
