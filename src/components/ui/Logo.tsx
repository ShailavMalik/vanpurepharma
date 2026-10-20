import { Link } from 'react-router-dom'
import { site } from '../../data/site'
import { cn } from '../../lib/cn'

export function Logo({ className }: { className?: string }) {
  return (
    <Link to="/" className={cn('flex min-h-11 items-center gap-2.5 text-ink no-underline', className)} aria-label={`${site.name} home`}>
      <span className="flex size-9 items-center justify-center rounded-[11px] bg-white/75 shadow-[0_6px_14px_-10px_rgba(15,31,25,0.5)]">
        <img src="/media/logo/vanpure-mark-96.png" alt="" width={28} height={28} className="size-7" />
      </span>
      <span className="font-display text-lg font-bold tracking-[-0.3px] lg:text-xl lg:font-extrabold">{site.name}</span>
    </Link>
  )
}
