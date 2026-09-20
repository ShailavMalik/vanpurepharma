import { CompanyFacts } from '../components/about/CompanyFacts'
import { CtaBand } from '../components/about/CtaBand'
import { FounderSection } from '../components/about/FounderSection'
import { MissionHero } from '../components/about/MissionHero'
import { ValuesGrid } from '../components/about/ValuesGrid'
import { Seo } from '../components/seo/Seo'
import { founder } from '../data/about'
import { site } from '../data/site'
import { aboutPageJsonLd } from '../lib/jsonLd'

export function AboutPage() {
  return (
    <>
      <Seo
        title={`About ${site.name} | Founder ${founder.name} & Our Mission`}
        description={`${site.name} builds science-backed nutraceuticals. Meet founder ${founder.name}, hear his message, and see the values behind Vanpure Multashva.`}
        path="/about"
        jsonLd={aboutPageJsonLd}
      />
      <MissionHero />
      <FounderSection />
      <ValuesGrid />
      <CompanyFacts />
      <CtaBand />
    </>
  )
}
