import Autoplay from 'embla-carousel-autoplay'
import useEmblaCarousel from 'embla-carousel-react'
import { ChevronLeft, ChevronRight, Play, Volume2, VolumeX, ZoomIn } from 'lucide-react'
import { lazy, Suspense, useCallback, useEffect, useRef, useState } from 'react'
import { product } from '../../data/product'
import { cn } from '../../lib/cn'
import { GlassCard } from '../ui/GlassCard'
import { Reveal } from '../ui/Reveal'
import { SectionHeading } from '../ui/SectionHeading'

const ProductLightbox = lazy(() => import('./ProductLightbox'))

const slides = [
  { kind: 'image', label: 'Box front' },
  { kind: 'video', label: 'Product video' },
] as const

export function MediaStage() {
  const [emblaRef, embla] = useEmblaCarousel({ loop: true, align: 'center' }, [
    Autoplay({ delay: 6000, stopOnInteraction: false, stopOnMouseEnter: true }),
  ])
  const [selected, setSelected] = useState(0)
  const [lightboxOpen, setLightboxOpen] = useState(false)

  useEffect(() => {
    if (!embla) return
    const onSelect = () => setSelected(embla.selectedScrollSnap())
    onSelect()
    embla.on('select', onSelect)
    return () => {
      embla.off('select', onSelect)
    }
  }, [embla])

  const scrollTo = useCallback((index: number) => embla?.scrollTo(index), [embla])

  return (
    <section id="product" className="section-pad scroll-mt-24">
      <div className="container-site">
        <SectionHeading
          eyebrow="The product"
          title="Take a closer look."
          description="Swipe through the pack and the product film. Tap the photo to zoom in on every detail."
        />

        <Reveal className="mt-12">
          <GlassCard border="brand" className="overflow-hidden p-2 sm:p-3">
            <div className="group relative overflow-hidden rounded-[18px]" ref={emblaRef}>
              <div className="flex touch-pan-y">
                <div className="min-w-0 flex-[0_0_100%]">
                  <button
                    type="button"
                    onClick={() => setLightboxOpen(true)}
                    className="relative flex aspect-video w-full cursor-zoom-in items-center justify-center bg-bg-2"
                    aria-label="Open product photo in zoomable view"
                  >
                    <img
                      src={product.media.box.src}
                      srcSet={product.media.box.srcSet}
                      sizes="(min-width: 1280px) 1200px, 96vw"
                      width={product.media.box.width}
                      height={product.media.box.height}
                      alt={product.media.box.alt}
                      loading="lazy"
                      decoding="async"
                      className="h-[86%] w-auto max-w-[92%] object-contain drop-shadow-[0_30px_50px_rgba(0,0,0,0.6)]"
                    />
                    <span className="glass-3 pointer-events-none absolute bottom-4 right-4 flex items-center gap-2 rounded-full px-3.5 py-2 text-xs font-medium text-fg">
                      <ZoomIn className="size-4" /> Tap to zoom
                    </span>
                  </button>
                </div>
                <div className="min-w-0 flex-[0_0_100%]">
                  <VideoSlide active={selected === 1} />
                </div>
              </div>

              <CarouselArrow direction="prev" onClick={() => embla?.scrollPrev()} />
              <CarouselArrow direction="next" onClick={() => embla?.scrollNext()} />

              <div className="pointer-events-none absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-1.5">
                {slides.map((slide, index) => (
                  <span
                    key={slide.label}
                    className={cn(
                      'h-1.5 rounded-full transition-all duration-300',
                      selected === index ? 'w-6 bg-gradient-brand' : 'w-1.5 bg-white/30',
                    )}
                  />
                ))}
              </div>
            </div>

            <div className="no-scrollbar mt-2 flex gap-2 overflow-x-auto p-1 sm:mt-3">
              {slides.map((slide, index) => (
                <button
                  key={slide.label}
                  type="button"
                  onClick={() => scrollTo(index)}
                  aria-label={`Show ${slide.label}`}
                  aria-current={selected === index}
                  className={cn(
                    'relative aspect-video w-24 shrink-0 overflow-hidden rounded-xl border bg-bg-2 transition-all duration-300 sm:w-32',
                    selected === index ? 'border-emerald/70 opacity-100' : 'border-white/10 opacity-60 hover:opacity-100',
                  )}
                >
                  <img
                    src={slide.kind === 'image' ? '/media/product/multashva-box-800.webp' : product.media.video.poster}
                    alt=""
                    width={128}
                    height={72}
                    loading="lazy"
                    className={cn('h-full w-full', slide.kind === 'image' ? 'object-contain p-1.5' : 'object-cover')}
                  />
                  {slide.kind === 'video' && (
                    <span className="absolute inset-0 flex items-center justify-center">
                      <span className="flex size-7 items-center justify-center rounded-full bg-white/90 text-bg">
                        <Play className="ml-0.5 size-3.5 fill-current" />
                      </span>
                    </span>
                  )}
                </button>
              ))}
            </div>
          </GlassCard>
        </Reveal>
      </div>

      {lightboxOpen && (
        <Suspense fallback={null}>
          <ProductLightbox open={lightboxOpen} onClose={() => setLightboxOpen(false)} />
        </Suspense>
      )}
    </section>
  )
}

function CarouselArrow({ direction, onClick }: { direction: 'prev' | 'next'; onClick: () => void }) {
  const Icon = direction === 'prev' ? ChevronLeft : ChevronRight
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={direction === 'prev' ? 'Previous slide' : 'Next slide'}
      className={cn(
        'glass-3 absolute top-1/2 hidden size-11 -translate-y-1/2 items-center justify-center rounded-full text-fg opacity-0 transition-opacity duration-200 group-hover:opacity-100 focus-visible:opacity-100 md:flex',
        direction === 'prev' ? 'left-4' : 'right-4',
      )}
    >
      <Icon className="size-5" />
    </button>
  )
}

/** Plays only while its slide is selected and on screen, muted by default. */
function VideoSlide({ active }: { active: boolean }) {
  const ref = useRef<HTMLVideoElement>(null)
  const [muted, setMuted] = useState(true)

  useEffect(() => {
    const video = ref.current
    if (!video) return
    if (!active) {
      video.pause()
      return
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) void video.play().catch(() => undefined)
        else video.pause()
      },
      { threshold: 0.4 },
    )
    observer.observe(video)
    return () => observer.disconnect()
  }, [active])

  return (
    <div className="relative aspect-video w-full bg-bg-2">
      <video
        ref={ref}
        src={product.media.video.src}
        poster={product.media.video.poster}
        width={product.media.video.width}
        height={product.media.video.height}
        muted={muted}
        loop
        playsInline
        preload="metadata"
        aria-label="Vanpure Multashva product video"
        className="h-full w-full object-cover"
      />
      <button
        type="button"
        onClick={() => setMuted((m) => !m)}
        aria-label={muted ? 'Unmute video' : 'Mute video'}
        className="glass-3 absolute bottom-4 right-4 flex size-10 items-center justify-center rounded-full text-fg"
      >
        {muted ? <VolumeX className="size-4" /> : <Volume2 className="size-4" />}
      </button>
    </div>
  )
}
