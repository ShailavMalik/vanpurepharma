import { Link } from 'react-router-dom'
import { offers, type Offer } from '../../data/home'
import { useSnapCarousel } from '../../hooks/useSnapCarousel'
import { cn } from '../../lib/cn'
import { ArrowRightIcon, ChevronLeftIcon, ChevronRightIcon, PauseIcon, PlayIcon } from '../ui/Icons'

const AUTOPLAY_MS = 5000

/** Two launch offers that rotate on their own; each is one link to the product. */
export function OfferCarousel() {
  const carousel = useSnapCarousel({ count: offers.length, autoplayMs: AUTOPLAY_MS })

  return (
    <section aria-roledescription="carousel" aria-label="Launch offers" className="container-site relative pt-1.5 lg:pt-6">
      <div className="relative">
        <div
          ref={carousel.trackRef}
          onScroll={carousel.onScroll}
          onPointerDown={carousel.hold}
          onPointerUp={carousel.release}
          onPointerCancel={carousel.release}
          onMouseEnter={carousel.hold}
          onMouseLeave={carousel.release}
          className="snap-track rounded-[28px] shadow-[0_2px_4px_rgba(15,31,25,0.05),0_26px_50px_-26px_rgba(11,107,79,0.55)] lg:rounded-[34px] lg:shadow-[0_34px_70px_-36px_rgba(11,107,79,0.6)]"
        >
          {offers.map((offer, index) => (
            <OfferSlide key={offer.id} offer={offer} priority={index === 0} />
          ))}
        </div>

        <CarouselArrow direction="prev" onClick={carousel.prev} />
        <CarouselArrow direction="next" onClick={carousel.next} />
      </div>

      <div className="flex items-center justify-center gap-1 pt-2 lg:gap-1.5 lg:pt-3">
        {offers.map((offer, index) => {
          const active = carousel.index === index
          return (
            <button
              key={offer.id}
              type="button"
              aria-label={`Show offer ${index + 1} of ${offers.length}`}
              aria-current={active}
              onClick={() => carousel.go(index)}
              className="flex h-[30px] w-11 items-center justify-center lg:w-14"
            >
              <span className="block h-1 w-8 overflow-hidden rounded-full bg-ink/15 lg:w-11">
                {active && (
                  <span
                    key={carousel.cycle}
                    style={{ '--bar-duration': `${AUTOPLAY_MS}ms` } as React.CSSProperties}
                    className={cn('block h-1 w-full rounded-full bg-[linear-gradient(90deg,#0b6b4f,#4fa8d8)] bar-origin', carousel.running && 'motion-safe:animate-bar')}
                  />
                )}
              </span>
            </button>
          )
        })}
        <button
          type="button"
          aria-label={carousel.autoplay ? 'Pause offers' : 'Play offers'}
          onClick={carousel.togglePaused}
          className="flex h-[30px] w-9 items-center justify-center text-muted lg:w-10"
        >
          {carousel.autoplay ? <PauseIcon size={14} /> : <PlayIcon size={14} />}
        </button>
      </div>
    </section>
  )
}

function OfferSlide({ offer, priority }: { offer: Offer; priority: boolean }) {
  const dark = offer.tone === 'dark'
  const image = offer.image === 'pack' ? '/media/product/pack-shot-800.webp' : '/media/product/pack-trio-800.webp'
  const imageSet =
    offer.image === 'pack'
      ? '/media/product/pack-shot-400.webp 400w, /media/product/pack-shot-800.webp 800w'
      : '/media/product/pack-trio-800.webp 800w, /media/product/pack-trio-1600.webp 1600w'
  const [line1, line2] = offer.title.split('\n')

  return (
    <Link
      to={offer.to}
      aria-roledescription="slide"
      className={cn(
        'relative flex h-[244px] w-full shrink-0 snap-start flex-col justify-center overflow-hidden px-5 no-underline lg:aspect-[3/1] lg:h-auto lg:px-14',
        dark
          ? 'bg-[linear-gradient(110deg,#0f1f19_0%,#164a3b_55%,#1c6a80_100%)] text-white'
          : 'bg-[linear-gradient(110deg,#bfebd6_0%,#e3f6ec_45%,#d7e9ff_100%)] text-ink',
      )}
    >
      <img
        src={image}
        srcSet={imageSet}
        sizes="(min-width: 1024px) 560px, 55vw"
        alt=""
        width={800}
        height={offer.image === 'pack' ? 525 : 280}
        fetchPriority={priority ? 'high' : 'auto'}
        decoding="async"
        className={cn(
          'pointer-events-none absolute top-1/2 right-[-4%] w-[50%] max-w-none -translate-y-1/2 drop-shadow-[0_24px_30px_rgba(0,0,0,0.35)] sm:w-[46%] lg:right-[4%] lg:w-[44%]',
          offer.image === 'trio' && 'top-[58%] right-[-2%] w-[54%] sm:w-[50%] lg:top-1/2 lg:w-[50%]',
        )}
      />
      <span
        className={cn(
          'relative inline-block self-start rounded-lg px-2.5 py-1 text-[11px] font-extrabold tracking-[1px] uppercase lg:rounded-[9px] lg:text-xs',
          dark ? 'bg-[linear-gradient(90deg,#f0d894,#c9a44c)] text-ink' : 'bg-green text-white',
        )}
      >
        {offer.badge}
      </span>
      <span className="relative mt-3.5 block max-w-[55%] font-display text-[34px] leading-none font-extrabold tracking-[-0.8px] lg:mt-4 lg:max-w-none lg:text-[52px] lg:tracking-[-1.4px]">
        {line1}
        <br />
        {line2}
      </span>
      <span className={cn('relative mt-2 block max-w-[55%] text-[13px] lg:mt-3 lg:max-w-none lg:text-base', dark ? 'text-[#d2e4dc]' : 'text-deep')}>
        {offer.subline} · <s>₹{offer.id === 'starter' ? '720' : '1,200'}</s> ·{' '}
        <b className={dark ? 'text-[#ffc9b8]' : 'text-red'}>{offer.saving}</b>
      </span>
      <span className={cn('relative mt-3 inline-flex items-center gap-1.5 text-[13px] font-extrabold lg:mt-[18px] lg:gap-2 lg:text-[15px]', dark ? 'text-gold' : 'text-green')}>
        Shop now <ArrowRightIcon size={14} />
      </span>
    </Link>
  )
}

function CarouselArrow({ direction, onClick }: { direction: 'prev' | 'next'; onClick: () => void }) {
  return (
    <button
      type="button"
      aria-label={direction === 'prev' ? 'Previous offer' : 'Next offer'}
      onClick={onClick}
      className={cn(
        'absolute top-1/2 hidden size-12 -translate-y-1/2 items-center justify-center rounded-full bg-white text-ink shadow-[0_10px_22px_-10px_rgba(15,31,25,0.45)] transition hover:scale-105 lg:flex',
        direction === 'prev' ? '-left-[22px]' : '-right-[22px]',
      )}
    >
      {direction === 'prev' ? <ChevronLeftIcon /> : <ChevronRightIcon strokeWidth="2.2" />}
    </button>
  )
}
