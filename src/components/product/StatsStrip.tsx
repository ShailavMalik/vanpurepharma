import { stats } from '../../data/product'
import { CountUp } from '../ui/CountUp'
import { GlassCard } from '../ui/GlassCard'
import { RevealGroup, RevealItem } from '../ui/Reveal'

export function StatsStrip() {
  return (
    <section aria-label="Product at a glance" className="container-site">
      <RevealGroup className="grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">
        {stats.map((stat) => (
          <RevealItem key={stat.label}>
            <GlassCard tier={1} className="px-5 py-6 text-center">
              <p className="font-display text-4xl font-bold tabular md:text-5xl">
                <CountUp value={stat.value} className="text-gradient-brand" />
              </p>
              <p className="mt-2 text-sm text-muted">{stat.label}</p>
            </GlassCard>
          </RevealItem>
        ))}
      </RevealGroup>
    </section>
  )
}
