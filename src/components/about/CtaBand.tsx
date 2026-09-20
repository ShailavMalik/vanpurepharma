import { WhatsAppIcon } from '../ui/BrandIcons'
import { product } from '../../data/product'
import { formatInr } from '../../lib/format'
import { Button } from '../ui/Button'
import { GlassCard } from '../ui/GlassCard'
import { Reveal } from '../ui/Reveal'

export function CtaBand() {
  return (
    <section className="section-pad">
      <div className="container-site">
        <Reveal>
          <GlassCard border="gold" className="relative overflow-hidden px-6 py-12 text-center md:px-12 md:py-16">
            <div
              aria-hidden
              className="absolute left-1/2 top-0 -z-10 h-64 w-[70%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold/20 blur-[80px]"
            />
            <p className="eyebrow text-gradient-gold">Launch offer</p>
            <h2 className="mt-4 text-[clamp(1.9rem,4vw,3rem)] font-bold leading-tight">Ready to feel the difference?</h2>
            <p className="mx-auto mt-4 max-w-lg text-muted">
              {product.name} at {formatInr(product.price.perStrip)} per strip instead of {formatInr(product.price.mrpPerStrip)}.
              Order in two taps on WhatsApp.
            </p>
            <div className="mt-8 flex justify-center">
              <Button to="/#order" size="lg" icon={<WhatsAppIcon />}>
                Order on WhatsApp
              </Button>
            </div>
          </GlassCard>
        </Reveal>
      </div>
    </section>
  )
}
