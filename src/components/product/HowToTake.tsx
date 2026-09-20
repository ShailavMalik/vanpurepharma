import { BadgeCheck, CalendarCheck, GlassWater, Pill, Thermometer } from 'lucide-react'
import { dosageSteps, qualityPoints, usageNotes } from '../../data/product'
import { GlassCard } from '../ui/GlassCard'
import { Reveal, RevealGroup, RevealItem } from '../ui/Reveal'
import { SectionHeading } from '../ui/SectionHeading'

const stepIcons = [Pill, GlassWater, CalendarCheck]

export function HowToTake() {
  return (
    <section id="how-to-take" className="section-pad scroll-mt-24">
      <div className="container-site">
        <SectionHeading eyebrow="Simple routine" title="Two softgels. Once a day. That's it." />

        <RevealGroup className="relative mt-12 grid gap-4 md:grid-cols-3 md:gap-6">
          <span
            aria-hidden
            className="absolute left-11 top-8 bottom-8 w-px border-l border-dashed border-emerald/40 md:left-[16.6%] md:right-[16.6%] md:top-11 md:bottom-auto md:h-px md:w-auto md:border-l-0 md:border-t"
          />
          {dosageSteps.map((step, index) => {
            const Icon = stepIcons[index]
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

        <div className="mt-6 grid gap-4 md:grid-cols-2 md:gap-6">
          <Reveal>
            <GlassCard tier={1} className="h-full p-6 md:p-7">
              <h3 className="flex items-center gap-2 text-lg font-semibold">
                <Thermometer className="size-5 text-gold" /> Good to know
              </h3>
              <ul className="mt-4 space-y-2.5 text-sm leading-relaxed text-muted">
                {usageNotes.map((note) => (
                  <li key={note} className="flex gap-2.5">
                    <span className="mt-2 size-1.5 shrink-0 rounded-full bg-gold" />
                    {note}
                  </li>
                ))}
              </ul>
            </GlassCard>
          </Reveal>
          <Reveal delay={0.1}>
            <GlassCard tier={1} className="h-full p-6 md:p-7">
              <h3 className="flex items-center gap-2 text-lg font-semibold">
                <BadgeCheck className="size-5 text-emerald" /> Quality you can trust
              </h3>
              <ul className="mt-4 space-y-3">
                {qualityPoints.map((point) => (
                  <li key={point.title} className="flex gap-3">
                    <span className="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full bg-emerald/15 text-emerald">
                      <BadgeCheck className="size-3.5" />
                    </span>
                    <div>
                      <p className="text-sm font-semibold">{point.title}</p>
                      <p className="text-sm text-muted">{point.description}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </GlassCard>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
