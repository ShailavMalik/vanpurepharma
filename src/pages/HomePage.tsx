import { FounderQuote } from '../components/home/FounderQuote'
import { HeroSection } from '../components/home/HeroSection'
import { HomeStickyBar } from '../components/home/HomeStickyBar'
import { HowToOrder } from '../components/home/HowToOrder'
import { OfferCarousel } from '../components/home/OfferCarousel'
import { PillarsMarquee } from '../components/home/PillarsMarquee'
import { ProductSpotlight } from '../components/home/ProductSpotlight'
import { WatchReels } from '../components/home/WatchReels'
import { WhyVanpure } from '../components/home/WhyVanpure'
import { Seo } from '../components/seo/Seo'
import { FaqList } from '../components/ui/Accordion'
import { homeFaqs } from '../data/home'
import { featuredProduct, lowestPrice } from '../data/products'
import { site } from '../data/site'
import { homeFaqJsonLd, organizationJsonLd, websiteJsonLd } from '../lib/jsonLd'

export function HomePage() {
  return (
    <>
      <Seo
        title={`${site.name} | ${featuredProduct.name}: 15 actives in one softgel`}
        description={`Science-backed supplements made in certified pharmaceutical facilities. ${featuredProduct.name} from ₹${lowestPrice(featuredProduct)}. Pick a pack and order in a WhatsApp chat, no account needed.`}
        path="/"
        jsonLd={[organizationJsonLd, websiteJsonLd, homeFaqJsonLd]}
      />
      <OfferCarousel />
      <HeroSection />
      <PillarsMarquee />
      <ProductSpotlight />
      <WhyVanpure />
      <WatchReels />
      <HowToOrder />

      <section className="container-site mt-12 lg:mt-24 lg:grid lg:grid-cols-2 lg:items-start lg:gap-8">
        <FounderQuote />
        <div className="mt-11 lg:mt-0">
          <h2 className="m-0 font-display text-[28px] font-extrabold tracking-[-0.6px] lg:text-4xl lg:tracking-[-0.8px]">Questions</h2>
          <FaqList items={homeFaqs} className="mt-3 lg:mt-4" />
        </div>
      </section>

      <div className="h-5 lg:hidden" />
      <HomeStickyBar />
    </>
  )
}
