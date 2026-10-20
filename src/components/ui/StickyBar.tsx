import type { ReactNode } from 'react'
import { cn } from '../../lib/cn'

/** Bottom-of-screen action strip for phones; fades the page out behind it. */
export function StickyBar({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div className={cn('sticky bottom-0 z-30 bg-[linear-gradient(180deg,rgba(246,248,244,0),#f6f8f4_40%)] px-3 pt-2.5 safe-bottom lg:hidden', className)}>
      {children}
    </div>
  )
}
