import { WhatsAppIcon } from '../ui/BrandIcons'
import { AnimatePresence, motion } from 'motion/react'
import { useLocation } from 'react-router-dom'
import { product } from '../../data/product'
import { useElementInView } from '../../hooks/useElementInView'
import { useScrolled } from '../../hooks/useScrolled'
import { formatInr } from '../../lib/format'
import { easeOutExpo } from '../../lib/motion'
import { Button } from '../ui/Button'

/** Sticky bottom CTA for phones. Hidden while the order card itself is on screen. */
export function MobileOrderBar() {
  const scrolled = useScrolled(500)
  const { pathname } = useLocation()
  const orderInView = useElementInView('order', '-10% 0px -10% 0px')
  const visible = scrolled && !(pathname === '/' && orderInView)

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="mobile-order-bar"
          initial={{ y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 80, opacity: 0 }}
          transition={{ duration: 0.4, ease: easeOutExpo }}
          className="fixed inset-x-0 bottom-0 z-40 px-3 md:hidden safe-bottom"
        >
          <div className="glass-3 flex items-center justify-between gap-3 rounded-2xl px-4 py-3">
            <div className="leading-tight">
              <p className="text-[11px] uppercase tracking-wider text-muted">Launch price</p>
              <p className="font-display text-lg font-bold tabular">
                <span className="text-gradient-gold">{formatInr(product.price.perStrip)}</span>
                <span className="ml-1 text-sm font-medium text-muted">/strip</span>
                <span className="ml-2 text-sm font-medium text-muted/70 line-through">{formatInr(product.price.mrpPerStrip)}</span>
              </p>
            </div>
            <Button to="/#order" size="sm" icon={<WhatsAppIcon />}>
              Order
            </Button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
