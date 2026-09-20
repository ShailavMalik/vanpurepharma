import Autoplay from 'embla-carousel-autoplay'
import useEmblaCarousel from 'embla-carousel-react'
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react'
import { AnimatePresence, motion } from 'motion/react'
import { useCallback, useEffect, useState } from 'react'
import { heroSlides, type HeroSlide } from '../../data/home'
import { cn } from '../../lib/cn'
import { easeOutExpo } from '../../lib/motion'
import { WhatsAppIcon } from '../ui/BrandIcons'
import { Button } from '../ui/Button'
import { Chip, LiveDot } from '../ui/Chip'
import { GlassCard } from '../ui/GlassCard'
import { HeroVisual } from './HeroVisual'

const AUTOPLAY_MS = 7000

/** Top-of-page launch carousel: each slide pairs a message with its own visual. */
export function HeroCarousel() {
  const [emblaRef, embla] = useEmblaCarousel({ loop: true, duration: 28 }, [
    Autoplay({ delay: AUTOPLAY_MS, stopOnInteraction: false, stopOnMouseEnter: true }),
  ])
  const [selected, setSelected] = useState(0)

  useEffect(() => {
    if (!embla) return
    const onSelect = () => setSelected(embla.selectedScrollSnap())
    embla.on('select', onSelect)
    return () => {
      embla.off('select', onSelect)
    }
  }, [embla])

  const scrollTo = useCallback((index: number) => embla?.scrollTo(index), [embla])

  return (
    <section aria-label="Highlights" className="pt-24 sm:pt-28 lg:pt-32">
      <div className="container-site">
        <motion.div
          initial={{ opacity: 0, y: 24, scale: 0.985 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.9, ease: easeOutExpo }}
        >
          <GlassCard border="brand" className="group/hero overflow-hidden rounded-[28px] p-1.5 sm:rounded-[32px] sm:p-2">
            <div className="relative overflow-hidden rounded-[22px] bg-bg-2/60 sm:rounded-[26px]" ref={emblaRef}>
              <div className="flex touch-pan-y">
                {heroSlides.map((slide, index) => (
                  <div key={slide.id} className="min-w-0 flex-[0_0_100%]">
                    <Slide slide={slide} active={index === selected} />
                  </div>
                ))}
              </div>

              <CarouselArrow direction="prev" onClick={() => embla?.scrollPrev()} />
              <CarouselArrow direction="next" onClick={() => embla?.scrollNext()} />

              <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 items-center gap-2 sm:bottom-6">
                {heroSlides.map((slide, index) => (
                  <button
                    key={slide.id}
                    type="button"
                    aria-label={`Show slide ${index + 1}: ${slide.eyebrow}`}
                    aria-current={selected === index}
                    onClick={() => scrollTo(index)}
                    className="relative h-6 px-1"
                  >
                    <span
                      className={cn(
                        'block h-1.5 overflow-hidden rounded-full bg-white/20 transition-all duration-300',
                        selected === index ? 'w-10' : 'w-2',
                      )}
                    >
                      {selected === index && (
                        <motion.span
                          key={`${slide.id}-progress`}
                          initial={{ x: '-100%' }}
                          animate={{ x: 0 }}
                          transition={{ duration: AUTOPLAY_MS / 1000, ease: 'linear' }}
                          className="block h-full w-full bg-gradient-brand motion-reduce:hidden"
                        />
                      )}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </GlassCard>
        </motion.div>
      </div>
    </section>
  )
}

function Slide({ slide, active }: { slide: HeroSlide; active: boolean }) {
  const isGold = slide.accent === 'gold'
  return (
    <div className="grid min-h-[560px] items-center gap-8 px-5 pb-16 pt-8 sm:px-8 sm:pb-20 sm:pt-10 lg:min-h-[600px] lg:grid-cols-[1.05fr_1fr] lg:gap-6 lg:px-12 lg:py-14">
      <AnimatePresence mode="wait">
        {active && (
          <motion.div
            key={slide.id}
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={{ visible: { transition: { staggerChildren: 0.08 } } }}
            className="order-2 lg:order-1"
          >
            <motion.div variants={textVariant}>
              <Chip icon={<LiveDot />} className="text-[13px]">
                {slide.eyebrow}
              </Chip>
            </motion.div>
            <motion.h2
              variants={textVariant}
              className="mt-5 text-[clamp(2.25rem,4.4vw,3.9rem)] font-bold leading-[1.04] tracking-[-0.03em]"
            >
              {slide.title}
              <br />
              <span className={isGold ? 'text-gradient-gold' : 'text-gradient-brand'}>{slide.highlight}</span>
            </motion.h2>
            <motion.p variants={textVariant} className="mt-5 max-w-lg text-base leading-relaxed text-muted md:text-lg">
              {slide.description}
            </motion.p>
            <motion.div variants={textVariant} className="mt-7 flex flex-col gap-3 sm:flex-row">
              <Button to={slide.primary.to} size="lg" icon={<WhatsAppIcon />}>
                {slide.primary.label}
              </Button>
              {slide.secondary &&
                (slide.secondary.external ? (
                  <Button href={slide.secondary.to} size="lg" variant="ghost" iconRight={<ArrowRight />}>
                    {slide.secondary.label}
                  </Button>
                ) : (
                  <Button to={slide.secondary.to} size="lg" variant="ghost" iconRight={<ArrowRight />}>
                    {slide.secondary.label}
                  </Button>
                ))}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      <div className="order-1 lg:order-2">
        <HeroVisual kind={slide.visual} active={active} />
      </div>
    </div>
  )
}

const textVariant = {
  hidden: { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: easeOutExpo } },
}

function CarouselArrow({ direction, onClick }: { direction: 'prev' | 'next'; onClick: () => void }) {
  const Icon = direction === 'prev' ? ChevronLeft : ChevronRight
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={direction === 'prev' ? 'Previous slide' : 'Next slide'}
      className={cn(
        'glass-3 absolute top-1/2 hidden size-11 -translate-y-1/2 items-center justify-center rounded-full text-fg opacity-0 transition-opacity duration-200 group-hover/hero:opacity-100 focus-visible:opacity-100 lg:flex',
        direction === 'prev' ? 'left-4' : 'right-4',
      )}
    >
      <Icon className="size-5" />
    </button>
  )
}
