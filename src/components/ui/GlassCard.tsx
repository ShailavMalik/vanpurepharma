import type { ComponentPropsWithoutRef, ElementType } from 'react'
import { useSpotlight } from '../../hooks/useSpotlight'
import { cn } from '../../lib/cn'

type Tier = 1 | 2 | 3
type Border = 'none' | 'brand' | 'gold'

type GlassCardProps<T extends ElementType> = {
  as?: T
  tier?: Tier
  border?: Border
  spotlight?: boolean
  className?: string
} & Omit<ComponentPropsWithoutRef<T>, 'as' | 'className'>

const tierClass: Record<Tier, string> = {
  1: 'glass-1',
  2: 'glass-2',
  3: 'glass-3',
}

const borderClass: Record<Border, string> = {
  none: '',
  brand: 'gradient-border-brand',
  gold: 'gradient-border-gold',
}

export function GlassCard<T extends ElementType = 'div'>({
  as,
  tier = 2,
  border = 'none',
  spotlight = false,
  className,
  ...rest
}: GlassCardProps<T>) {
  const Component = (as ?? 'div') as ElementType
  const spotlightHandlers = useSpotlight()

  return (
    <Component
      className={cn(
        'rounded-card noise',
        tierClass[tier],
        borderClass[border],
        spotlight && 'spotlight transition-transform duration-300 ease-out',
        className,
      )}
      {...(spotlight ? spotlightHandlers : {})}
      {...rest}
    />
  )
}
