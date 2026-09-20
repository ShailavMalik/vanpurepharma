import type { ReactNode } from 'react'
import { cn } from '../../lib/cn'

interface ChipProps {
  children: ReactNode
  icon?: ReactNode
  tone?: 'glass' | 'gold' | 'brand'
  className?: string
}

const toneClass = {
  glass: 'glass-1 text-fg/90',
  gold: 'border border-gold/40 bg-gold/10 text-gold',
  brand: 'border border-emerald/30 bg-emerald/10 text-emerald',
} as const

export function Chip({ children, icon, tone = 'glass', className }: ChipProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-sm font-medium leading-none',
        toneClass[tone],
        className,
      )}
    >
      {icon && <span className="[&>svg]:size-4">{icon}</span>}
      {children}
    </span>
  )
}

/** Small pulsing dot used for "live" style labels. */
export function LiveDot({ className }: { className?: string }) {
  return (
    <span className={cn('relative inline-flex size-2', className)} aria-hidden>
      <span className="absolute inline-flex size-full rounded-full bg-emerald opacity-75 motion-safe:animate-ping" />
      <span className="relative inline-flex size-2 rounded-full bg-emerald" />
    </span>
  )
}
