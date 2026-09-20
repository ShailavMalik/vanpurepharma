import { ChevronDown } from 'lucide-react'
import { AnimatePresence, motion } from 'motion/react'
import { useId, useState } from 'react'
import { cn } from '../../lib/cn'
import { easeOutExpo } from '../../lib/motion'
import { GlassCard } from './GlassCard'

interface AccordionItemProps {
  question: string
  answer: string
  defaultOpen?: boolean
}

export function AccordionItem({ question, answer, defaultOpen = false }: AccordionItemProps) {
  const [open, setOpen] = useState(defaultOpen)
  const panelId = useId()

  return (
    <GlassCard tier={1} className={cn('overflow-hidden transition-colors duration-300', open && 'bg-white/[0.06]')}>
      <h3>
        <button
          type="button"
          aria-expanded={open}
          aria-controls={panelId}
          onClick={() => setOpen((v) => !v)}
          className="flex w-full items-center justify-between gap-4 px-5 py-5 text-left font-display text-base font-semibold sm:px-6 md:text-lg"
        >
          <span>{question}</span>
          <span
            className={cn(
              'flex size-8 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/5 transition-transform duration-300',
              open && 'rotate-180 bg-gradient-brand text-white',
            )}
          >
            <ChevronDown className="size-4" />
          </span>
        </button>
      </h3>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            id={panelId}
            key="panel"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: easeOutExpo }}
            className="overflow-hidden"
          >
            <p className="px-5 pb-6 text-[15px] leading-relaxed text-muted sm:px-6 md:text-base">{answer}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </GlassCard>
  )
}
