import { Globe, Instagram, MapPin, MessageCircle } from 'lucide-react'
import { site } from '../../data/site'
import { generalChatUrl } from '../../lib/whatsapp'
import { GlassCard } from '../ui/GlassCard'
import { Reveal } from '../ui/Reveal'

export function CompanyFacts() {
  const facts = [
    { icon: MessageCircle, label: 'WhatsApp', value: site.whatsapp.display, href: generalChatUrl },
    { icon: Instagram, label: 'Instagram', value: `@${site.instagram.handle}`, href: site.instagram.url },
    { icon: Globe, label: 'Website', value: site.url.replace('https://', ''), href: site.url },
    ...(site.address ? [{ icon: MapPin, label: 'Address', value: site.address, href: undefined }] : []),
  ]

  return (
    <section className="container-site">
      <Reveal>
        <GlassCard tier={1} className="grid gap-6 p-6 sm:grid-cols-2 md:grid-cols-3 md:p-8">
          {facts.map((fact) => {
            const Icon = fact.icon
            const content = (
              <>
                <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-white/5 text-emerald">
                  <Icon className="size-5" />
                </span>
                <span>
                  <span className="block text-xs uppercase tracking-wider text-muted">{fact.label}</span>
                  <span className="mt-0.5 block font-medium text-fg">{fact.value}</span>
                </span>
              </>
            )
            return fact.href ? (
              <a
                key={fact.label}
                href={fact.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 rounded-xl transition-colors hover:text-emerald"
              >
                {content}
              </a>
            ) : (
              <div key={fact.label} className="flex items-center gap-3">
                {content}
              </div>
            )
          })}
        </GlassCard>
      </Reveal>
    </section>
  )
}
