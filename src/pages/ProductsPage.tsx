import { motion } from 'motion/react'
import { HowItWorks } from '../components/home/HowItWorks'
import { ProductsGrid } from '../components/home/ProductsGrid'
import { Seo } from '../components/seo/Seo'
import { products } from '../data/products'
import { site } from '../data/site'
import { easeOutExpo } from '../lib/motion'
import { breadcrumbJsonLd, productListJsonLd } from '../lib/jsonLd'

export function ProductsPage() {
  return (
    <>
      <Seo
        title={`Products | ${site.name}`}
        description={`Browse ${site.name} nutraceuticals: ${products.map((p) => p.name).join(', ')}. Pick a quantity and order on WhatsApp.`}
        path="/products"
        jsonLd={[productListJsonLd, breadcrumbJsonLd([{ name: 'Home', path: '/' }, { name: 'Products', path: '/products' }])]}
      />
      <section className="pt-28 sm:pt-32 lg:pt-36">
        <div className="container-site max-w-3xl text-center">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: easeOutExpo }}
            className="eyebrow text-gradient-brand"
          >
            Products
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: easeOutExpo, delay: 0.08 }}
            className="mt-4 text-[clamp(2.25rem,5vw,4rem)] font-bold leading-[1.05]"
          >
            The Vanpure range
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: easeOutExpo, delay: 0.16 }}
            className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-muted md:text-lg"
          >
            Every product is formulated with evidence, made in certified facilities, and ordered the same simple way: choose a quantity, confirm on WhatsApp.
          </motion.p>
        </div>
      </section>
      <div className="-mt-10">
        <ProductsGrid heading={false} />
      </div>
      <HowItWorks />
    </>
  )
}
