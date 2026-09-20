import { ArrowDown, MessageCircle, ShieldCheck } from 'lucide-react'
import { motion, useReducedMotion } from 'motion/react'
import { product } from '../../data/product'
import { site } from '../../data/site'
import { useTilt } from '../../hooks/useTilt'
import { formatInr } from '../../lib/format'
import { easeOutExpo, lineReveal } from '../../lib/motion'
import { Button } from '../ui/Button'
import { Chip, LiveDot } from '../ui/Chip'

const enter = (delay: number) => ({
  initial: { opacity: 0, y: 18 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.7, ease: easeOutExpo, delay },
})

export function Hero() {
  return (
    <section className="relative overflow-hidden pt-28 sm:pt-32 lg:min-h-[100svh] lg:pt-36">
      <div className="container-site grid items-center gap-12 lg:grid-cols-[1.1fr_1fr] lg:gap-8">
        <div className="order-2 lg:order-1">
          <motion.div {...enter(0)}>
            <Chip icon={<LiveDot />} className="text-[13px]">
              {product.category} · Launched {site.launchDateDisplay}
            </Chip>
          </motion.div>

          <h1 className="mt-6 text-[clamp(2.5rem,6vw,5rem)] font-bold leading-[1.02]">
            <span className="block overflow-hidden pb-1">
              <motion.span
                className="block"
                variants={lineReveal}
                initial="hidden"
                animate="visible"
                transition={{ delay: 0.1, duration: 0.8, ease: easeOutExpo }}
              >
                Complete vitality,
              </motion.span>
            </span>
            <span className="block overflow-hidden pb-2">
              <motion.span
                className="text-gradient-brand block"
                variants={lineReveal}
                initial="hidden"
                animate="visible"
                transition={{ delay: 0.2, duration: 0.8, ease: easeOutExpo }}
              >
                every single day.
              </motion.span>
            </span>
          </h1>

          <motion.p {...enter(0.35)} className="mt-6 max-w-xl text-base leading-relaxed text-muted md:text-lg">
            <strong className="font-semibold text-fg">{product.name}</strong> is a premium softgel that brings together
            herbal adaptogens, essential vitamins, minerals, and amino acids to power your daily stamina, immunity, and
            focus.
          </motion.p>

          <motion.div {...enter(0.45)} className="mt-8 flex flex-wrap items-end gap-x-4 gap-y-2">
            <p className="font-display leading-none">
              <span className="text-gradient-gold text-5xl font-bold tabular sm:text-6xl">{formatInr(product.price.perStrip)}</span>
              <span className="ml-1.5 text-base font-medium text-muted">/strip</span>
            </p>
            <p className="pb-1 text-lg font-medium text-muted/70 line-through tabular">{formatInr(product.price.mrpPerStrip)}</p>
            <Chip tone="gold" className="mb-1">
              Launch offer
            </Chip>
          </motion.div>

          <motion.div {...enter(0.55)} className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button to="/#order" size="lg" icon={<MessageCircle />}>
              Order on WhatsApp
            </Button>
            <Button to="/#ingredients" size="lg" variant="ghost" iconRight={<ArrowDown />}>
              See what&apos;s inside
            </Button>
          </motion.div>

          <motion.ul {...enter(0.7)} className="mt-8 flex flex-wrap gap-x-5 gap-y-2 text-sm text-muted">
            {product.trust.map((item) => (
              <li key={item} className="flex items-center gap-2">
                <ShieldCheck className="size-4 text-emerald" />
                {item}
              </li>
            ))}
          </motion.ul>
        </div>

        <HeroVisual />
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 0.8 }}
        aria-hidden
        className="mt-14 hidden justify-center lg:flex"
      >
        <span className="h-12 w-px overflow-hidden rounded-full bg-white/10">
          <span className="block h-full w-full bg-gradient-brand motion-safe:animate-scroll-cue" />
        </span>
      </motion.div>
    </section>
  )
}

function HeroVisual() {
  const tilt = useTilt()
  const reduceMotion = useReducedMotion()
  const { box } = product.media

  return (
    <div className="order-1 flex justify-center lg:order-2 lg:justify-end">
      <motion.div
        initial={{ opacity: 0, scale: 0.94, filter: 'blur(14px)' }}
        animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
        transition={{ duration: 1, ease: easeOutExpo, delay: 0.2 }}
        className="relative w-full max-w-[560px] lg:max-w-none"
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
              src={box.src}
              srcSet={box.srcSet}
              sizes="(min-width: 1024px) 45vw, (min-width: 640px) 560px, 92vw"
              width={box.width}
              height={box.height}
              alt={box.alt}
              fetchPriority="high"
              decoding="async"
              className="w-full drop-shadow-[0_30px_50px_rgba(0,0,0,0.6)]"
            />
          </div>

          {product.heroChips.map((label, index) => (
            <motion.span
              key={label}
              initial={{ opacity: 0, y: 12, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ delay: 0.9 + index * 0.12, duration: 0.6, ease: easeOutExpo }}
              style={{ transform: 'translateZ(40px)' }}
              className={`glass-2 noise absolute hidden rounded-full px-4 py-2 text-sm font-medium md:block ${chipPosition[index]}`}
            >
              <span className={reduceMotion ? 'block' : 'block motion-safe:animate-float-slow'} style={{ animationDelay: `${index * -2}s` }}>
                {label}
              </span>
            </motion.span>
          ))}
        </motion.div>
      </motion.div>
    </div>
  )
}

const chipPosition = ['-left-2 top-[8%] lg:-left-6', '-right-2 top-[30%] lg:-right-8', 'left-[10%] -bottom-3']
