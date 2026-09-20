import type { ReactNode } from 'react'
import { cn } from '../../lib/cn'
import { Reveal } from './Reveal'

interface SectionHeadingProps {
  eyebrow?: string
  title: ReactNode
  description?: ReactNode
  align?: 'left' | 'center'
  className?: string
}

export function SectionHeading({ eyebrow, title, description, align = 'center', className }: SectionHeadingProps) {
  return (
    <Reveal className={cn('max-w-2xl', align === 'center' ? 'mx-auto text-center' : 'text-left', className)}>
      {eyebrow && <p className="eyebrow text-gradient-brand mb-4">{eyebrow}</p>}
      <h2 className="text-[clamp(2rem,4vw,3.25rem)] font-bold leading-[1.08]">{title}</h2>
      {description && <p className="mt-5 text-base leading-relaxed text-muted md:text-lg">{description}</p>}
    </Reveal>
  )
}
