import { AnimatePresence, motion } from 'motion/react'
import { matchPath, useLocation } from 'react-router-dom'
import { featuredProduct, getProduct, orderPath } from '../../data/products'
import { useElementInView } from '../../hooks/useElementInView'
import { useScrolled } from '../../hooks/useScrolled'
import { formatInr } from '../../lib/format'
import { easeOutExpo } from '../../lib/motion'
import { WhatsAppIcon } from '../ui/BrandIcons'
import { Button } from '../ui/Button'

/** Sticky bottom CTA for phones. Follows the product being viewed; hidden while its buy box is on screen. */
export function MobileOrderBar() {
  const scrolled = useScrolled(500)
  const { pathname } = useLocation()
  const match = matchPath('/products/:slug', pathname)
  const viewed = getProduct(match?.params.slug)
  const product = viewed ?? featuredProduct
  const orderInView = useElementInView('order', '-10% 0px -10% 0px')
  const visible = scrolled && !(viewed && orderInView)

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
            <div className="min-w-0 leading-tight">
              <p className="truncate text-[11px] uppercase tracking-wider text-muted">{product.name}</p>
              <p className="font-display text-lg font-bold tabular">
                <span className="text-gradient-gold">{formatInr(product.price.perStrip)}</span>
                <span className="ml-1 text-sm font-medium text-muted">/strip</span>
                <span className="ml-2 text-sm font-medium text-muted/70 line-through">{formatInr(product.price.mrpPerStrip)}</span>
              </p>
            </div>
            <Button to={orderPath(product)} size="sm" icon={<WhatsAppIcon />}>
              Order
            </Button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
