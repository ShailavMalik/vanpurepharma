import { Link } from 'react-router-dom'
import { cn } from '../../lib/cn'
import { site } from '../../data/site'

interface LogoProps {
  className?: string
  /** Hide the wordmark image below this breakpoint. */
  wordmark?: 'always' | 'sm' | 'never'
}

export function Logo({ className, wordmark = 'sm' }: LogoProps) {
  return (
    <Link to="/" className={cn('flex items-center gap-2.5', className)} aria-label={`${site.name} home`}>
      <img src="/media/logo/vanpure-mark.png" alt="" width={40} height={40} className="size-10 shrink-0" />
      {wordmark !== 'never' && (
        <span
          className={cn(
            'font-display text-lg font-bold leading-none tracking-tight',
            wordmark === 'sm' && 'hidden sm:inline',
          )}
        >
          <span className="text-gradient-brand">Vanpure</span>{' '}
          <span className="font-medium text-fg/85">Pharma</span>
        </span>
      )}
    </Link>
  )
}
