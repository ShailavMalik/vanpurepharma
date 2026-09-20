import { Sparkles } from 'lucide-react'
import { motion, useReducedMotion } from 'motion/react'
import type { HeroVisual as HeroVisualKind } from '../../data/home'
import { featuredProduct } from '../../data/products'
import { site } from '../../data/site'
import { useTilt } from '../../hooks/useTilt'
import { cn } from '../../lib/cn'
import { discountPercent, formatInr } from '../../lib/format'
import { easeOutExpo } from '../../lib/motion'

interface HeroVisualProps {
  kind: HeroVisualKind
  active: boolean
}

export function HeroVisual({ kind, active }: HeroVisualProps) {
  if (kind === 'price') return <PriceVisual active={active} />
  if (kind === 'range') return <RangeVisual active={active} />
  return <ProductVisual active={active} />
}

const product = featuredProduct
const chipPosition = ['-left-2 top-[6%] lg:-left-4', '-right-2 top-[34%] lg:-right-6', 'left-[12%] -bottom-2']

/** The box, tilting with the pointer, ringed by floating ingredient chips. */
function ProductVisual({ active }: { active: boolean }) {
  const tilt = useTilt()
  const reduceMotion = useReducedMotion()
  const { image } = product.media

  return (
    <div className="flex justify-center">
      <motion.div
        initial={false}
        animate={active ? { opacity: 1, scale: 1, filter: 'blur(0px)' } : { opacity: 0.6, scale: 0.94, filter: 'blur(6px)' }}
        transition={{ duration: 0.9, ease: easeOutExpo }}
        className="relative w-full max-w-[520px]"
        style={{ perspective: 1200 }}
      >
        <div
          aria-hidden
          className="absolute left-1/2 top-1/2 -z-10 h-[70%] w-[80%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold/25 blur-[70px]"
        />
        <motion.div
          onPointerMove={tilt.onPointerMove}
          onPointerLeave={tilt.onPointerLeave}
          style={{ rotateX: tilt.rotateX, rotateY: tilt.rotateY, transformStyle: 'preserve-3d' }}
          className="relative"
        >
          <div className={reduceMotion ? '' : 'motion-safe:animate-float'}>
            <img
              src={image.src}
              srcSet={image.srcSet}
              sizes="(min-width: 1024px) 520px, (min-width: 640px) 480px, 90vw"
              width={image.width}
              height={image.height}
              alt={image.alt}
              fetchPriority="high"
              decoding="async"
              className="w-full drop-shadow-[0_30px_50px_rgba(0,0,0,0.6)]"
            />
          </div>
          {product.highlights.map((label, index) => (
            <span
              key={label}
              style={{ transform: 'translateZ(40px)' }}
              className={cn('glass-2 noise absolute hidden rounded-full px-4 py-2 text-sm font-medium md:block', chipPosition[index])}
            >
              <span className={reduceMotion ? 'block' : 'block motion-safe:animate-float-slow'} style={{ animationDelay: `${index * -2}s` }}>
                {label}
              </span>
            </span>
          ))}
        </motion.div>
      </motion.div>
    </div>
  )
}

/** A big price tag beside a small pack shot. */
function PriceVisual({ active }: { active: boolean }) {
  const discount = discountPercent(product.price.mrpPerStrip, product.price.perStrip)
  return (
    <div className="flex justify-center">
      <motion.div
        initial={false}
        animate={active ? { opacity: 1, y: 0, rotate: -3 } : { opacity: 0.5, y: 16, rotate: 0 }}
        transition={{ duration: 0.8, ease: easeOutExpo }}
        className="relative w-full max-w-[420px]"
      >
        <div
          aria-hidden
          className="absolute left-1/2 top-1/2 -z-10 h-[80%] w-[90%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold/25 blur-[70px]"
        />
        <div className="glass-2 noise gradient-border-gold relative rounded-[28px] p-7 sm:p-9">
          <p className="eyebrow text-gold">Launch price</p>
          <p className="mt-3 font-display leading-none">
            <span className="text-gradient-gold text-[clamp(3.5rem,9vw,5.5rem)] font-bold tabular">{formatInr(product.price.perStrip)}</span>
            <span className="ml-2 text-lg font-medium text-muted">/strip</span>
          </p>
          <div className="mt-4 flex flex-wrap items-center gap-3">
            <span className="text-xl text-muted/70 line-through tabular">MRP {formatInr(product.price.mrpPerStrip)}</span>
            <span className="rounded-full border border-gold/40 bg-gold/10 px-3 py-1 text-sm font-semibold text-gold">Save {discount}%</span>
          </div>
          <div className="mt-6 flex items-center gap-4 border-t border-white/[0.08] pt-6">
            <img src={product.media.thumb} alt="" width={120} height={79} loading="lazy" className="w-[110px] drop-shadow-[0_16px_30px_rgba(0,0,0,0.6)]" />
            <div className="text-sm text-muted">
              <p className="font-semibold text-fg">{product.name}</p>
              <p>
                {product.softgelsPerStrip} softgels per strip · {product.softgelsPerDay} a day
              </p>
              <p>{product.stripsPerBox} strips in a box</p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

/** A fanned stack: the launch product plus two "coming soon" slots. */
function RangeVisual({ active }: { active: boolean }) {
  return (
    <div className="flex justify-center">
      <motion.div
        initial={false}
        animate={active ? { opacity: 1, scale: 1 } : { opacity: 0.5, scale: 0.95 }}
        transition={{ duration: 0.8, ease: easeOutExpo }}
        className="relative h-[300px] w-full max-w-[460px] sm:h-[340px]"
      >
        <div
          aria-hidden
          className="absolute left-1/2 top-1/2 -z-10 h-[70%] w-[80%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-violet/25 blur-[70px]"
        />
        {[2, 1].map((offset) => (
          <motion.div
            key={offset}
            initial={false}
            animate={active ? { x: offset * 44, y: offset * -18, rotate: offset * 4 } : { x: 0, y: 0, rotate: 0 }}
            transition={{ duration: 0.8, ease: easeOutExpo, delay: 0.1 * offset }}
            className="glass-1 noise absolute inset-x-8 bottom-6 top-6 flex flex-col items-center justify-center rounded-[26px] border-dashed border-white/15 text-center sm:inset-x-12"
            style={{ zIndex: 3 - offset }}
          >
            <Sparkles className="size-6 text-violet" />
            <p className="mt-3 text-sm font-semibold text-fg/80">Coming soon</p>
            <p className="mt-1 text-xs text-muted">Formula {offset + 1}</p>
          </motion.div>
        ))}
        <motion.div
          initial={false}
          animate={active ? { x: -24, y: 12, rotate: -4 } : { x: 0, y: 0, rotate: 0 }}
          transition={{ duration: 0.8, ease: easeOutExpo }}
          className="glass-2 noise gradient-border-brand absolute inset-x-8 bottom-6 top-6 z-10 flex flex-col items-center justify-center rounded-[26px] p-6 text-center sm:inset-x-12"
        >
          <img src={product.media.thumb} alt="" width={220} height={144} loading="lazy" className="w-[70%] drop-shadow-[0_20px_40px_rgba(0,0,0,0.6)]" />
          <p className="mt-4 font-display text-lg font-semibold">{product.name}</p>
          <p className="mt-1 text-xs uppercase tracking-wider text-emerald">Launching {site.launchDateDisplay}</p>
        </motion.div>
      </motion.div>
    </div>
  )
}
