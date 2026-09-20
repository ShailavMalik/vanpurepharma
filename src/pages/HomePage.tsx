import { HeroCarousel } from '../components/home/HeroCarousel'
import { HowItWorks } from '../components/home/HowItWorks'
import { ProductsGrid } from '../components/home/ProductsGrid'
import { WhyVanpure } from '../components/home/WhyVanpure'
import { Faq } from '../components/product/Faq'
import { FounderBand } from '../components/product/FounderBand'
import { Seo } from '../components/seo/Seo'
import { homeFaqs } from '../data/home'
import { featuredProduct } from '../data/products'
import { site } from '../data/site'
import { homeFaqJsonLd, organizationJsonLd, websiteJsonLd } from '../lib/jsonLd'

export function HomePage() {
  return (
    <>
      <Seo
        title={`${site.name} | Science-Backed Nutraceuticals, Ordered on WhatsApp`}
        description={`${site.name} makes science-backed nutraceuticals. ${featuredProduct.name} launches ${site.launchDateDisplay} at ₹${featuredProduct.price.perStrip}/strip. Browse the range and order in a WhatsApp chat.`}
        path="/"
        jsonLd={[organizationJsonLd, websiteJsonLd, homeFaqJsonLd]}
      />
      <h1 className="sr-only">
        {site.name}: {site.tagline}
      </h1>
      <HeroCarousel />
      <ProductsGrid />
      <WhyVanpure />
      <HowItWorks />
      <FounderBand />
      <Faq items={homeFaqs} title="Good to know before you order." />
    </>
  )
}
