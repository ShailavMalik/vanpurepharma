import { Hash, PackageSearch } from 'lucide-react'
import { howItWorks } from '../../data/home'
import { featuredProduct, orderPath } from '../../data/products'
import { WhatsAppIcon } from '../ui/BrandIcons'
import { Button } from '../ui/Button'
import { GlassCard } from '../ui/GlassCard'
import { Reveal, RevealGroup, RevealItem } from '../ui/Reveal'
import { SectionHeading } from '../ui/SectionHeading'

const icons = [PackageSearch, Hash, WhatsAppIcon]

export function HowItWorks() {
  return (
    <section id="how-it-works" className="section-pad scroll-mt-24">
      <div className="container-site">
        <SectionHeading
          eyebrow="How to order"
          title="Three taps. No account, no cart."
          description="Ordering happens in a WhatsApp chat with our team, so you always talk to a person before anything is confirmed."
        />

        <RevealGroup className="relative mt-12 grid gap-4 md:grid-cols-3 md:gap-6">
          <span
            aria-hidden
            className="absolute left-11 top-8 bottom-8 w-px border-l border-dashed border-emerald/40 md:left-[16.6%] md:right-[16.6%] md:top-11 md:bottom-auto md:h-px md:w-auto md:border-l-0 md:border-t"
          />
          {howItWorks.map((step, index) => {
            const Icon = icons[index]
            return (
              <RevealItem key={step.title}>
                <GlassCard tier={1} className="relative flex gap-4 p-5 md:flex-col md:items-center md:p-7 md:text-center">
                  <span className="relative flex size-12 shrink-0 items-center justify-center rounded-full bg-bg ring-1 ring-emerald/40">
                    <span className="absolute inset-0 rounded-full bg-gradient-brand opacity-90" />
                    <Icon className="relative size-5 text-white" />
                  </span>
                  <div>
                    <p className="eyebrow text-muted/70">Step {index + 1}</p>
                    <h3 className="mt-1 text-lg font-semibold">{step.title}</h3>
                    <p className="mt-1.5 text-sm text-muted">{step.description}</p>
                  </div>
                </GlassCard>
              </RevealItem>
            )
          })}
        </RevealGroup>

        <Reveal className="mt-8 flex justify-center">
          <Button to={orderPath(featuredProduct)} size="lg" icon={<WhatsAppIcon />}>
            Order {featuredProduct.name}
          </Button>
        </Reveal>
      </div>
    </section>
  )
}
