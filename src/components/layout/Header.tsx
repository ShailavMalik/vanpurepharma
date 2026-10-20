import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { featuredProduct, orderPath, productPath } from '../../data/products'
import { cn } from '../../lib/cn'
import { Button } from '../ui/Button'
import { MenuIcon, WhatsAppIcon } from '../ui/Icons'
import { Logo } from '../ui/Logo'
import { MobileMenu } from './MobileMenu'

export const navLinks = [
  { label: featuredProduct.shortName, href: productPath(featuredProduct) },
  { label: 'How to order', href: '/#how' },
  { label: 'About', href: '/about' },
]

function isCurrent(href: string, pathname: string) {
  if (href.startsWith('/#')) return false
  return pathname === href || pathname.startsWith(`${href}/`)
}

/** Plain bar on phones (the sticky bottom bar carries the call to action); sticky translucent bar on desktop. */
export function Header() {
  const [menuOpen, setMenuOpen] = useState(false)
  const { pathname } = useLocation()

  return (
    <>
      <header className="relative z-40 lg:sticky lg:top-0 lg:border-b lg:border-ink/[0.06] lg:bg-[rgba(217,242,230,0.82)] lg:backdrop-blur-md">
        <div className="container-site flex items-center justify-between gap-4 py-2.5 pr-2 lg:py-3 lg:pr-6">
          <Logo />

          <nav aria-label="Main" className="hidden items-center gap-7 text-[15px] font-bold lg:flex">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                aria-current={isCurrent(link.href, pathname) ? 'page' : undefined}
                className={cn('no-underline transition-colors hover:text-green', isCurrent(link.href, pathname) ? 'text-green' : 'text-ink')}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <Button to={orderPath(featuredProduct)} size="sm" icon={<WhatsAppIcon />} className="hidden rounded-[14px] lg:inline-flex">
            Order on WhatsApp
          </Button>

          <button
            type="button"
            aria-label="Open menu"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen(true)}
            className="flex size-11 items-center justify-center rounded-full bg-white/70 text-ink lg:hidden"
          >
            <MenuIcon />
          </button>
        </div>
      </header>
      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  )
}
