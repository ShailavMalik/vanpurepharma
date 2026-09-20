import { ArrowRight, Sparkles } from 'lucide-react'
import { site } from '../../data/site'
import { Button } from '../ui/Button'
import { GlassCard } from '../ui/GlassCard'
import { Reveal } from '../ui/Reveal'

/** Signals a growing catalogue at the end of a product page. */
export function MoreProducts() {
  return (
    <section className="container-site">
      <Reveal>
        <GlassCard tier={1} className="flex flex-col items-center gap-6 border-dashed border-white/15 px-6 py-10 text-center md:flex-row md:justify-between md:text-left">
          <div className="flex flex-col items-center gap-4 md:flex-row md:items-center">
            <span className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-white/5 text-violet">
              <Sparkles className="size-6" />
            </span>
            <div>
              <h2 className="text-xl font-semibold">More from Vanpure is on the way</h2>
              <p className="mt-1 text-sm text-muted">
                New formulas are in development. Follow @{site.instagram.handle} to hear about them first.
              </p>
            </div>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Button to="/products" variant="ghost" iconRight={<ArrowRight />}>
              All products
            </Button>
            <Button href={site.instagram.url} variant="ghost">
              Follow on Instagram
            </Button>
          </div>
        </GlassCard>
      </Reveal>
    </section>
  )
}
