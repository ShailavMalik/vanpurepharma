import { FlaskConical, Leaf, MessageSquareText, ShieldCheck } from 'lucide-react'
import { whyVanpure } from '../../data/home'
import { GlassCard } from '../ui/GlassCard'
import { RevealGroup, RevealItem } from '../ui/Reveal'
import { SectionHeading } from '../ui/SectionHeading'

const icons = [FlaskConical, ShieldCheck, Leaf, MessageSquareText]

export function WhyVanpure() {
  return (
    <section id="why" className="section-pad scroll-mt-24">
      <div className="container-site">
        <SectionHeading
          eyebrow="Why Vanpure"
          title={
            <>
              Serious formulas. <span className="text-gradient-brand">Simple ordering.</span>
            </>
          }
        />
        <RevealGroup className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {whyVanpure.map((item, index) => {
            const Icon = icons[index]
            return (
              <RevealItem key={item.title}>
                <GlassCard spotlight className="group h-full p-6 hover:-translate-y-1">
                  <span className="relative flex size-12 items-center justify-center rounded-2xl bg-gradient-brand text-white shadow-[0_10px_30px_-10px_rgba(139,92,246,0.9)]">
                    <Icon className="size-6" />
                  </span>
                  <h3 className="relative mt-5 text-lg font-semibold">{item.title}</h3>
                  <p className="relative mt-2 text-sm leading-relaxed text-muted">{item.description}</p>
                </GlassCard>
              </RevealItem>
            )
          })}
        </RevealGroup>
      </div>
    </section>
  )
}
