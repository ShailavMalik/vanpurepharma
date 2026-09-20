import type { FaqItem } from '../../data/products'
import { AccordionItem } from '../ui/Accordion'
import { RevealGroup, RevealItem } from '../ui/Reveal'
import { SectionHeading } from '../ui/SectionHeading'

interface FaqProps {
  items: FaqItem[]
  eyebrow?: string
  title: string
}

export function Faq({ items, eyebrow = 'Questions', title }: FaqProps) {
  return (
    <section id="faq" className="section-pad scroll-mt-24">
      <div className="container-site">
        <SectionHeading eyebrow={eyebrow} title={title} />
        <RevealGroup className="mx-auto mt-10 flex max-w-[760px] flex-col gap-3">
          {items.map((faq, index) => (
            <RevealItem key={faq.question}>
              <AccordionItem question={faq.question} answer={faq.answer} defaultOpen={index === 0} />
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  )
}
