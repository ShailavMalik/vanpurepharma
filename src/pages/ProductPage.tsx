import { useParams } from 'react-router-dom'
import { Faq } from '../components/product/Faq'
import { FounderBand } from '../components/product/FounderBand'
import { HowToTake } from '../components/product/HowToTake'
import { IngredientsPanel } from '../components/product/IngredientsPanel'
import { MoreProducts } from '../components/product/MoreProducts'
import { PillarsGrid } from '../components/product/PillarsGrid'
import { ProductHero } from '../components/product/ProductHero'
import { StatsStrip } from '../components/product/StatsStrip'
import { Seo } from '../components/seo/Seo'
import { getProduct, productPath } from '../data/products'
import { site } from '../data/site'
import { breadcrumbJsonLd, faqJsonLd, productJsonLd } from '../lib/jsonLd'
import { NotFoundPage } from './NotFoundPage'

export function ProductPage() {
  const { slug } = useParams()
  const product = getProduct(slug)
  if (!product) return <NotFoundPage />

  return (
    <>
      <Seo
        title={`${product.name} | ${product.subtitle} | ${site.name}`}
        description={`${product.shortDescription} Launch price ₹${product.price.perStrip}/strip (MRP ₹${product.price.mrpPerStrip}). Order on WhatsApp.`}
        path={productPath(product)}
        type="product"
        jsonLd={[
          productJsonLd(product),
          faqJsonLd(product.faqs),
          breadcrumbJsonLd([
            { name: 'Home', path: '/' },
            { name: 'Products', path: '/products' },
            { name: product.name, path: productPath(product) },
          ]),
        ]}
      />
      <ProductHero product={product} />
      <div className="mt-16 md:mt-24">
        <StatsStrip product={product} />
      </div>
      <PillarsGrid product={product} />
      <IngredientsPanel product={product} />
      <HowToTake product={product} />
      <FounderBand />
      <Faq items={product.faqs} title={`Questions about ${product.name}.`} />
      <MoreProducts />
    </>
  )
}
