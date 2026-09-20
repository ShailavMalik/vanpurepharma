import { Menu, X } from 'lucide-react'
import { WhatsAppIcon } from '../ui/BrandIcons'
import { AnimatePresence, motion } from 'motion/react'
import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { featuredProduct, orderPath } from '../../data/products'
import { navLinks, site } from '../../data/site'
import { useBodyScrollLock } from '../../hooks/useBodyScrollLock'
import { useScrolled } from '../../hooks/useScrolled'
import { cn } from '../../lib/cn'
import { easeOutExpo } from '../../lib/motion'
import { Button } from '../ui/Button'
import { Logo } from '../ui/Logo'

function isActive(href: string, pathname: string, hash: string) {
  if (href.startsWith('/#')) return pathname === '/' && hash === href.slice(1)
  return pathname === href || pathname.startsWith(`${href}/`)
}

const orderHref = orderPath(featuredProduct)

export function Navbar() {
  const scrolled = useScrolled(40)
  const [open, setOpen] = useState(false)
  const location = useLocation()
  useBodyScrollLock(open)
  const close = () => setOpen(false)

  return (
    <header className="fixed inset-x-0 top-0 z-50 flex justify-center px-3 pt-3 sm:px-4 sm:pt-4">
      <nav
        aria-label="Primary"
        className={cn(
          'glass-3 flex w-full max-w-[1200px] items-center justify-between rounded-full transition-[padding,background-color] duration-300 ease-out',
          scrolled ? 'px-3 py-1.5 sm:px-4' : 'px-3 py-2 sm:px-5 sm:py-2.5',
        )}
      >
        <Logo />

        <ul className="hidden items-center gap-1 lg:flex">
          {navLinks.map((link) => {
            const active = isActive(link.href, location.pathname, location.hash)
            return (
              <li key={link.href}>
                <Link
                  to={link.href}
                  className={cn(
                    'relative rounded-full px-4 py-2 text-sm font-medium transition-colors duration-200',
                    active ? 'text-fg' : 'text-muted hover:text-fg',
                  )}
                >
                  {link.label}
                  {active && (
                    <motion.span
                      layoutId="nav-active-dot"
                      className="absolute -bottom-0.5 left-1/2 size-1 -translate-x-1/2 rounded-full bg-gradient-brand"
                    />
                  )}
                </Link>
              </li>
            )
          })}
        </ul>

        <div className="flex items-center gap-2">
          <Button to={orderHref} size="sm" className="max-sm:px-3" icon={<WhatsAppIcon />} aria-label="Order on WhatsApp" onClick={close}>
            <span className="hidden sm:inline">Order on WhatsApp</span>
          </Button>
          <button
            type="button"
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="flex size-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-fg transition-colors hover:bg-white/10 lg:hidden"
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="glass-3 fixed inset-0 z-[-1] flex flex-col px-6 pb-8 pt-28 lg:hidden"
          >
            <motion.ul
              initial="hidden"
              animate="visible"
              exit="hidden"
              variants={{ visible: { transition: { staggerChildren: 0.06, delayChildren: 0.05 } } }}
              className="flex flex-col gap-2"
            >
              {navLinks.map((link) => (
                <motion.li
                  key={link.href}
                  variants={{
                    hidden: { opacity: 0, y: 16 },
                    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: easeOutExpo } },
                  }}
                >
                  <Link
                    to={link.href}
                    onClick={close}
                    className="block rounded-2xl px-4 py-4 font-display text-3xl font-semibold tracking-tight text-fg transition-colors hover:bg-white/5"
                  >
                    {link.label}
                  </Link>
                </motion.li>
              ))}
            </motion.ul>
            <div className="mt-auto flex flex-col gap-3">
              <Button to={orderHref} size="lg" icon={<WhatsAppIcon />} onClick={close}>
                Order on WhatsApp
              </Button>
              <a
                href={site.instagram.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-center text-sm text-muted hover:text-fg"
              >
                Instagram @{site.instagram.handle}
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
