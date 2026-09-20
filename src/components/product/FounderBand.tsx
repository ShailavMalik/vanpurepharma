import { ArrowRight, Quote } from 'lucide-react'
import { Link } from 'react-router-dom'
import { founder } from '../../data/about'
import { GlassCard } from '../ui/GlassCard'
import { Reveal } from '../ui/Reveal'

export function FounderBand() {
  return (
    <section className="container-site">
      <Reveal>
        <GlassCard tier={1} className="overflow-hidden px-6 py-10 md:px-12 md:py-14">
          <Quote aria-hidden className="absolute -left-2 -top-2 size-28 text-white/[0.04]" />
          <div className="relative flex flex-col items-center gap-8 text-center md:flex-row md:items-start md:gap-10 md:text-left">
            <img
              src={founder.avatar}
              alt={founder.name}
              width={96}
              height={96}
              loading="lazy"
              className="size-20 shrink-0 rounded-full object-cover ring-2 ring-offset-4 ring-offset-bg ring-violet/70 md:size-24"
            />
            <div>
              <blockquote className="font-display text-lg font-medium leading-relaxed text-fg/95 md:text-2xl">
                “{founder.quote}”
              </blockquote>
              <p className="mt-5 text-sm text-muted">
                <span className="font-semibold text-fg">{founder.name}</span> · {founder.role}
              </p>
              <Link
                to="/about#founder"
                className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-emerald transition-colors hover:text-fg"
              >
                Meet the founder <ArrowRight className="size-4" />
              </Link>
            </div>
          </div>
        </GlassCard>
      </Reveal>
    </section>
  )
}
