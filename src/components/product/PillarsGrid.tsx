import { Brain, HeartPulse, Leaf, Shield, Sparkles, Zap } from 'lucide-react'
import type { ComponentType, SVGProps } from 'react'
import { pillars, type PillarIcon } from '../../data/product'
import { GlassCard } from '../ui/GlassCard'
import { RevealGroup, RevealItem } from '../ui/Reveal'
import { SectionHeading } from '../ui/SectionHeading'

const icons: Record<PillarIcon, ComponentType<SVGProps<SVGSVGElement>>> = {
  shield: Shield,
  zap: Zap,
  brain: Brain,
  sparkles: Sparkles,
  leaf: Leaf,
  heart: HeartPulse,
}

export function PillarsGrid() {
  return (
    <section id="benefits" className="section-pad scroll-mt-24">
      <div className="container-site">
        <SectionHeading
          eyebrow="Six pillars of wellness"
          title={
            <>
              One softgel. <span className="text-gradient-brand">Six ways</span> it works for you.
            </>
          }
          description="Every ingredient was chosen for a job. Together they cover the six things that decide how you feel each day."
        />
      </div>

      <RevealGroup className="no-scrollbar mt-12 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-2 sm:px-6 md:container-site md:grid md:grid-cols-2 md:overflow-visible md:px-6 lg:grid-cols-3 lg:px-8">
        {pillars.map((pillar, index) => {
          const Icon = icons[pillar.icon]
          return (
            <RevealItem key={pillar.title} className="w-[82vw] max-w-[360px] shrink-0 snap-center md:w-auto md:max-w-none">
              <GlassCard spotlight className="group h-full p-6 hover:-translate-y-1 md:p-7">
                <span
                  aria-hidden
                  className="pointer-events-none absolute right-5 top-4 font-display text-5xl font-bold text-white/[0.05] tabular"
                >
                  {String(index + 1).padStart(2, '0')}
                </span>
                <span className="relative flex size-12 items-center justify-center rounded-2xl bg-gradient-brand text-white shadow-[0_10px_30px_-10px_rgba(139,92,246,0.9)] transition-shadow duration-300 group-hover:shadow-[0_14px_36px_-8px_rgba(34,197,94,0.8)]">
                  <Icon className="size-6" />
                </span>
                <h3 className="relative mt-6 text-xl font-semibold">{pillar.title}</h3>
                <p className="relative mt-3 text-[15px] leading-relaxed text-muted">{pillar.description}</p>
              </GlassCard>
            </RevealItem>
          )
        })}
      </RevealGroup>
    </section>
  )
}
