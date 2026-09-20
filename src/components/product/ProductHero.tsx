import { ChevronRight } from 'lucide-react'
import { motion } from 'motion/react'
import { Link } from 'react-router-dom'
import type { Product } from '../../data/products'
import { easeOutExpo } from '../../lib/motion'
import { BuyBox } from './BuyBox'
import { Gallery } from './Gallery'

/** Product page top: breadcrumb, then gallery beside the buy box, like a shop's product page. */
export function ProductHero({ product }: { product: Product }) {
  return (
    <section className="pt-24 sm:pt-28 lg:pt-32">
      <div className="container-site">
        <motion.nav
          aria-label="Breadcrumb"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: easeOutExpo }}
          className="mb-6 flex items-center gap-1.5 text-sm text-muted"
        >
          <Link to="/" className="transition-colors hover:text-fg">
            Home
          </Link>
          <ChevronRight className="size-4 opacity-60" />
          <Link to="/products" className="transition-colors hover:text-fg">
            Products
          </Link>
          <ChevronRight className="size-4 opacity-60" />
          <span className="truncate text-fg">{product.name}</span>
        </motion.nav>

        <div className="grid items-start gap-6 lg:grid-cols-[1.1fr_0.9fr] lg:gap-10">
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.8, ease: easeOutExpo }}
            className="lg:sticky lg:top-28"
          >
            <Gallery product={product} />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: easeOutExpo, delay: 0.1 }}
          >
            <BuyBox product={product} />
          </motion.div>
        </div>
      </div>
    </section>
  )
}
