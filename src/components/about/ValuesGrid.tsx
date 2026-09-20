import { FlaskConical, Leaf, ShieldCheck } from 'lucide-react'
import { values } from '../../data/about'
import { GlassCard } from '../ui/GlassCard'
import { RevealGroup, RevealItem } from '../ui/Reveal'
import { SectionHeading } from '../ui/SectionHeading'

const icons = [ShieldCheck, FlaskConical, Leaf]

export function ValuesGrid() {
  return (
    <section className="section-pad">
      <div className="container-site">
        <SectionHeading eyebrow="What we stand for" title="Three promises behind every product." />
        <RevealGroup className="mt-12 grid gap-4 md:grid-cols-3 md:gap-6">
          {values.map((value, index) => {
            const Icon = icons[index]
            return (
              <RevealItem key={value.title}>
                <GlassCard spotlight className="group h-full p-6 hover:-translate-y-1 md:p-7">
                  <span className="relative flex size-12 items-center justify-center rounded-2xl bg-gradient-brand text-white shadow-[0_10px_30px_-10px_rgba(139,92,246,0.9)]">
                    <Icon className="size-6" />
                  </span>
                  <h3 className="relative mt-6 text-xl font-semibold">{value.title}</h3>
                  <p className="relative mt-3 text-[15px] leading-relaxed text-muted">{value.description}</p>
                </GlassCard>
              </RevealItem>
            )
          })}
        </RevealGroup>
      </div>
    </section>
  )
}
