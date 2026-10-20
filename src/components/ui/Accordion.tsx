import { useId, useState } from 'react'
import type { FaqItem } from '../../data/products'
import { cn } from '../../lib/cn'

interface FaqListProps {
  items: FaqItem[]
  className?: string
  /** Index of the item open on load; -1 opens none. */
  defaultOpen?: number
}

/** White card of expandable questions; one open at a time, like the design. */
export function FaqList({ items, className, defaultOpen = 0 }: FaqListProps) {
  const [open, setOpen] = useState(defaultOpen)
  const baseId = useId()

  return (
    <div className={cn('card px-4 lg:px-6', className)}>
      {items.map((item, index) => {
        const isOpen = open === index
        const panelId = `${baseId}-${index}`
        return (
          <div key={item.question} className="border-b border-line last:border-b-0">
            <h3 className="m-0">
              <button
                type="button"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpen(isOpen ? -1 : index)}
                className="flex min-h-14 w-full cursor-pointer items-center justify-between gap-3 py-3.5 text-left font-sans text-[15px] font-bold text-ink lg:min-h-16 lg:py-4 lg:text-[17px]"
              >
                <span>{item.question}</span>
                <span
                  aria-hidden
                  className={cn(
                    'flex size-7 shrink-0 items-center justify-center rounded-full text-lg transition-colors duration-200 lg:size-8 lg:text-xl',
                    isOpen ? 'bg-green text-white' : 'bg-mint text-green',
                  )}
                >
                  {isOpen ? '−' : '+'}
                </span>
              </button>
            </h3>
            <div id={panelId} className={cn('collapse-grid', isOpen && 'collapse-open')}>
              <div>
                <p className="m-0 pb-4 pr-10 text-sm leading-relaxed text-muted lg:pb-[18px] lg:pr-12 lg:text-[15px]">{item.answer}</p>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}
