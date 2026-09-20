import { Faq } from '../components/product/Faq'
import { FounderBand } from '../components/product/FounderBand'
import { Hero } from '../components/product/Hero'
import { HowToTake } from '../components/product/HowToTake'
import { IngredientsPanel } from '../components/product/IngredientsPanel'
import { MediaStage } from '../components/product/MediaStage'
import { OrderCard } from '../components/product/OrderCard'
import { PillarsGrid } from '../components/product/PillarsGrid'
import { StatsStrip } from '../components/product/StatsStrip'
import { Seo } from '../components/seo/Seo'
import { product } from '../data/product'
import { site } from '../data/site'
import { faqJsonLd, organizationJsonLd, productJsonLd, websiteJsonLd } from '../lib/jsonLd'

export function HomePage() {
  return (
    <>
      <Seo
        title={`${product.name} | Complete Vitality & Wellness Softgels | ${site.name}`}
        description={`${product.name}: premium softgels with Ashwagandha, Ginseng, Biotin, Vitamin D3 and 15 active nutrients for immunity, energy, focus and stress. Launch price ₹${product.price.perStrip}/strip. Order on WhatsApp.`}
        path="/"
        type="product"
        jsonLd={[organizationJsonLd, websiteJsonLd, productJsonLd, faqJsonLd]}
      />
      <Hero />
      <MediaStage />
      <StatsStrip />
      <PillarsGrid />
      <IngredientsPanel />
      <HowToTake />
      <OrderCard />
      <FounderBand />
      <Faq />
    </>
  )
}
