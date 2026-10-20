import { useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { featuredProduct, lowestPrice, orderPath } from '../../data/products'
import { site } from '../../data/site'
import { useBodyScrollLock } from '../../hooks/useBodyScrollLock'
import { formatInr } from '../../lib/format'
import { generalChatUrl } from '../../lib/whatsapp'
import { Button } from '../ui/Button'
import { ChevronRightIcon, CloseIcon, WhatsAppIcon } from '../ui/Icons'
import { Logo } from '../ui/Logo'
import { navLinks } from './Header'

interface MobileMenuProps {
  open: boolean
  onClose: () => void
}

export function MobileMenu({ open, onClose }: MobileMenuProps) {
  const location = useLocation()
  useBodyScrollLock(open)

  useEffect(() => {
    if (!open) return
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, onClose])

  useEffect(() => {
    onClose()
    // Close when the route changes; `onClose` is stable enough for this purpose.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname, location.hash])

  if (!open) return null

  return (
    <nav
      aria-label="Main menu"
      className="fixed inset-0 z-50 flex flex-col overflow-hidden bg-[linear-gradient(180deg,#d9f2e6_0px,#e4effb_480px,#f6f8f4_100%)] motion-safe:animate-fade-in lg:hidden"
    >
      <div aria-hidden className="blob-green -right-[110px] bottom-[120px] size-[320px]" />
      <div className="relative flex items-center justify-between py-2.5 pl-4 pr-2">
        <Logo />
        <button
          type="button"
          aria-label="Close menu"
          onClick={onClose}
          className="flex size-11 items-center justify-center rounded-full bg-white text-ink shadow-[0_4px_12px_-6px_rgba(15,31,25,0.3)]"
        >
          <CloseIcon />
        </button>
      </div>

      <ul className="relative mx-4 mt-4 flex list-none flex-col rounded-[22px] bg-white/85 px-4 py-1 shadow-[0_16px_32px_-24px_rgba(15,31,25,0.45)]">
        <MenuItem to="/" label="Home" />
        <MenuItem
          to={navLinks[0].href}
          label={featuredProduct.shortName}
          badge={`from ${formatInr(lowestPrice(featuredProduct))}`}
        />
        <MenuItem to="/#how" label="How to order" />
        <MenuItem to="/about" label="About" last />
      </ul>

      <div className="flex-1" />

      <div className="relative px-4 pb-7 pt-4">
        <Button to={orderPath(featuredProduct)} size="lg" icon={<WhatsAppIcon />} className="w-full">
          Order on WhatsApp
        </Button>
        <div className="mt-3.5 flex justify-center gap-[18px] text-[13px] font-bold">
          <a href={site.instagram.url} target="_blank" rel="noopener noreferrer" className="flex min-h-11 items-center text-green">
            @{site.instagram.handle}
          </a>
          <a href={generalChatUrl} target="_blank" rel="noopener noreferrer" className="flex min-h-11 items-center text-green">
            {site.whatsapp.display}
          </a>
        </div>
      </div>
    </nav>
  )
}

function MenuItem({ to, label, badge, last }: { to: string; label: string; badge?: string; last?: boolean }) {
  return (
    <li>
      <Link
        to={to}
        className={`flex min-h-[52px] items-center justify-between text-base font-bold text-ink no-underline ${last ? '' : 'border-b border-ink/[0.07]'}`}
      >
        <span>{label}</span>
        <span className="flex items-center gap-2">
          {badge && <span className="rounded-[10px] bg-mint px-2 py-1 text-[11px] font-extrabold text-green">{badge}</span>}
          <ChevronRightIcon size={16} className="text-[#8fa79b]" />
        </span>
      </Link>
    </li>
  )
}
