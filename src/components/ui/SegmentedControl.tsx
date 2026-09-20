import { motion } from 'motion/react'
import { cn } from '../../lib/cn'

export interface SegmentOption<T extends string> {
  value: T
  label: string
  shortLabel?: string
  count?: number
}

interface SegmentedControlProps<T extends string> {
  id: string
  options: SegmentOption<T>[]
  value: T
  onChange: (value: T) => void
  className?: string
}

export function SegmentedControl<T extends string>({ id, options, value, onChange, className }: SegmentedControlProps<T>) {
  return (
    <div
      role="tablist"
      aria-label="Ingredient groups"
      className={cn('glass-2 flex w-full gap-1 rounded-full p-1.5 sm:inline-flex sm:w-auto', className)}
    >
      {options.map((option) => {
        const active = option.value === value
        return (
          <button
            key={option.value}
            role="tab"
            type="button"
            aria-selected={active}
            onClick={() => onChange(option.value)}
            className={cn(
              'relative h-10 min-w-0 flex-1 rounded-full px-2 text-sm font-medium transition-colors duration-200 sm:flex-none sm:px-5',
              active ? 'text-white' : 'text-muted hover:text-fg',
            )}
          >
            {active && (
              <motion.span
                layoutId={`${id}-indicator`}
                className="absolute inset-0 rounded-full bg-gradient-brand shadow-[0_8px_24px_-8px_rgba(139,92,246,0.8)]"
                transition={{ type: 'spring', stiffness: 400, damping: 32 }}
              />
            )}
            <span className="relative flex items-center justify-center gap-2">
              <span className="sm:hidden">{option.shortLabel ?? option.label}</span>
              <span className="hidden sm:inline">{option.label}</span>
              {option.count !== undefined && (
                <span
                  className={cn(
                    'hidden rounded-full px-1.5 py-0.5 text-[11px] leading-none tabular sm:inline',
                    active ? 'bg-white/20 text-white' : 'bg-white/5 text-muted',
                  )}
                >
                  {option.count}
                </span>
              )}
            </span>
          </button>
        )
      })}
    </div>
  )
}
