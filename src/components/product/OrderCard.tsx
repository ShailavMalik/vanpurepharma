import { Check, Minus, Plus } from 'lucide-react'
import { WhatsAppIcon } from '../ui/BrandIcons'
import { AnimatePresence, motion } from 'motion/react'
import { useEffect, useState } from 'react'
import { product } from '../../data/product'
import { cn } from '../../lib/cn'
import { discountPercent, formatInr } from '../../lib/format'
import { easeOutExpo } from '../../lib/motion'
import { buildOrderUrl, clampStrips, orderSummary } from '../../lib/whatsapp'
import { Button } from '../ui/Button'
import { CountUp } from '../ui/CountUp'
import { GlassCard } from '../ui/GlassCard'
import { Reveal } from '../ui/Reveal'
import { SectionHeading } from '../ui/SectionHeading'

const { minStrips, maxStrips, presets } = product.order
const discount = discountPercent(product.price.mrpPerStrip, product.price.perStrip)

export function OrderCard() {
  const [strips, setStrips] = useState(1)
  const [draft, setDraft] = useState('1')
  const [toast, setToast] = useState(false)
  const summary = orderSummary(strips)

  function commit(next: number) {
    const clamped = clampStrips(next)
    setStrips(clamped)
    setDraft(String(clamped))
  }

  useEffect(() => {
    if (!toast) return
    const timer = window.setTimeout(() => setToast(false), 2800)
    return () => window.clearTimeout(timer)
  }, [toast])

  return (
    <section id="order" className="section-pad scroll-mt-24">
      <div className="container-site">
        <SectionHeading
          eyebrow="Order on WhatsApp"
          title={
            <>
              Pick your strips. <span className="text-gradient-gold">We handle the rest.</span>
            </>
          }
          description="Choose a quantity and we open WhatsApp with your order written out. Our team confirms delivery and payment in the chat."
        />

        <Reveal className="relative mx-auto mt-12 max-w-[640px]">
          <div
            aria-hidden
            className="absolute left-1/2 top-1/2 -z-10 h-[80%] w-[90%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold/20 blur-[80px]"
          />
          <GlassCard border="gold" className="p-5 sm:p-8">
            <div className="flex items-center gap-4">
              <div className="flex h-16 w-24 shrink-0 items-center justify-center rounded-2xl bg-bg-2 p-1.5">
                <img src="/media/product/multashva-box-800.webp" alt="" width={96} height={64} className="h-full w-auto object-contain" loading="lazy" />
              </div>
              <div className="min-w-0">
                <h3 className="text-lg font-semibold leading-tight">{product.name}</h3>
                <p className="mt-1 text-sm text-muted">
                  {product.softgelsPerStrip} softgels per strip · {product.stripsPerBox} strips per box
                </p>
              </div>
            </div>

            <div className="mt-6 flex flex-wrap items-end gap-x-3 gap-y-1 border-t border-white/[0.06] pt-6">
              <p className="font-display leading-none">
                <span className="text-gradient-gold text-4xl font-bold tabular">{formatInr(product.price.perStrip)}</span>
                <span className="ml-1 text-sm font-medium text-muted">/strip</span>
              </p>
              <p className="pb-0.5 text-base text-muted/70 line-through tabular">{formatInr(product.price.mrpPerStrip)}</p>
              <span className="mb-0.5 rounded-full border border-gold/40 bg-gold/10 px-2.5 py-1 text-xs font-semibold text-gold">
                Save {discount}% · launch offer
              </span>
            </div>

            <div className="mt-7">
              <div className="flex items-center justify-between">
                <label htmlFor="strip-qty" className="text-sm font-medium">
                  How many strips?
                </label>
                <span className="text-xs text-muted">
                  {minStrips}–{maxStrips} strips
                </span>
              </div>

              <div className="mt-3 flex items-center gap-3">
                <StepperButton
                  label="Fewer strips"
                  disabled={strips <= minStrips}
                  onClick={() => commit(strips - 1)}
                  icon={<Minus className="size-5" />}
                />
                <input
                  id="strip-qty"
                  type="number"
                  inputMode="numeric"
                  min={minStrips}
                  max={maxStrips}
                  value={draft}
                  onChange={(e) => {
                    setDraft(e.target.value)
                    const parsed = Number(e.target.value)
                    if (e.target.value !== '' && parsed >= minStrips && parsed <= maxStrips) setStrips(Math.round(parsed))
                  }}
                  onBlur={() => commit(Number(draft))}
                  className="no-spinner h-14 w-full min-w-0 flex-1 rounded-2xl border border-white/10 bg-white/5 text-center font-display text-3xl font-bold tabular outline-none transition-colors focus:border-emerald/60"
                />
                <StepperButton
                  label="More strips"
                  disabled={strips >= maxStrips}
                  onClick={() => commit(strips + 1)}
                  icon={<Plus className="size-5" />}
                />
              </div>

              <div className="mt-3 flex flex-wrap gap-2">
                {presets.map((preset) => (
                  <button
                    key={preset}
                    type="button"
                    onClick={() => commit(preset)}
                    aria-pressed={strips === preset}
                    className={cn(
                      'h-10 rounded-full border px-4 text-sm font-medium transition-colors',
                      strips === preset
                        ? 'border-gold/60 bg-gold/15 text-gold'
                        : 'border-white/10 bg-white/5 text-muted hover:border-white/20 hover:text-fg',
                    )}
                  >
                    {preset} {preset === 1 ? 'strip' : 'strips'}
                    {preset === product.stripsPerBox && <span className="ml-1 text-xs opacity-80">(1 box)</span>}
                  </button>
                ))}
              </div>
            </div>

            <dl className="mt-7 grid grid-cols-3 gap-2 rounded-2xl border border-white/[0.06] bg-white/[0.03] p-4 text-center">
              <SummaryStat label="strips" value={summary.strips} />
              <SummaryStat label="softgels" value={summary.softgels} />
              <SummaryStat label="day supply" value={summary.days} />
            </dl>

            <div className="mt-6 flex items-end justify-between gap-4">
              <div>
                <p className="text-sm text-muted">Total</p>
                <p className="font-display text-3xl font-bold leading-none tabular sm:text-4xl">
                  <CountUp value={summary.total} format={formatInr} duration={0.5} className="text-gradient-gold" />
                </p>
              </div>
              <p className="text-right text-xs text-muted">
                MRP {formatInr(summary.mrpTotal)}
                <br />
                <span className="text-emerald">You save {formatInr(summary.mrpTotal - summary.total)}</span>
              </p>
            </div>

            <Button
              href={buildOrderUrl(strips)}
              size="lg"
              icon={<WhatsAppIcon />}
              className="mt-6 w-full"
              onClick={() => setToast(true)}
              data-testid="order-whatsapp"
            >
              Order {strips} {strips === 1 ? 'strip' : 'strips'} on WhatsApp
            </Button>
            <p className="mt-4 text-center text-xs leading-relaxed text-muted/80">
              Opens WhatsApp with your order prefilled. Our team confirms delivery and payment there. Nothing is charged
              on this site.
            </p>
          </GlassCard>
        </Reveal>
      </div>

      <AnimatePresence>
        {toast && (
          <motion.div
            key="toast"
            role="status"
            initial={{ opacity: 0, y: 16, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.98 }}
            transition={{ duration: 0.35, ease: easeOutExpo }}
            className="glass-3 fixed bottom-24 left-1/2 z-50 flex -translate-x-1/2 items-center gap-2.5 rounded-full px-4 py-2.5 text-sm md:bottom-8"
          >
            <span className="flex size-6 items-center justify-center rounded-full bg-wa text-[#052e16]">
              <Check className="size-3.5" />
            </span>
            Opening WhatsApp with your order…
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}

function StepperButton({ label, disabled, onClick, icon }: { label: string; disabled: boolean; onClick: () => void; icon: React.ReactNode }) {
  return (
    <button
      type="button"
      aria-label={label}
      disabled={disabled}
      onClick={onClick}
      className="glass-2 flex size-14 shrink-0 items-center justify-center rounded-2xl text-fg transition-[background-color,transform] hover:bg-white/10 active:scale-95 disabled:cursor-not-allowed disabled:opacity-40"
    >
      {icon}
    </button>
  )
}

function SummaryStat({ label, value }: { label: string; value: number }) {
  return (
    <div>
      <dt className="text-xs text-muted">{label}</dt>
      <dd className="mt-0.5 font-display text-xl font-bold tabular">
        <CountUp value={value} duration={0.4} />
      </dd>
    </div>
  )
}
