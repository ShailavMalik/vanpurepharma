import { faqs } from '../../data/faq'
import { AccordionItem } from '../ui/Accordion'
import { RevealGroup, RevealItem } from '../ui/Reveal'
import { SectionHeading } from '../ui/SectionHeading'

export function Faq() {
  return (
    <section id="faq" className="section-pad scroll-mt-24">
      <div className="container-site">
        <SectionHeading eyebrow="Questions" title="Good to know before you order." />
        <RevealGroup className="mx-auto mt-10 flex max-w-[760px] flex-col gap-3">
          {faqs.map((faq, index) => (
            <RevealItem key={faq.question}>
              <AccordionItem question={faq.question} answer={faq.answer} defaultOpen={index === 0} />
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  )
}
