import Autoplay from 'embla-carousel-autoplay'
import useEmblaCarousel from 'embla-carousel-react'
import { ChevronLeft, ChevronRight, Play, Volume2, VolumeX, ZoomIn } from 'lucide-react'
import { lazy, Suspense, useCallback, useEffect, useRef, useState } from 'react'
import type { Product } from '../../data/products'
import { cn } from '../../lib/cn'
import { GlassCard } from '../ui/GlassCard'

const ProductLightbox = lazy(() => import('./ProductLightbox'))

/** Product media: swipeable image + video with thumbnails and a zoomable lightbox. */
export function Gallery({ product }: { product: Product }) {
  const { image, video } = product.media
  const slides = [{ kind: 'image' as const, label: 'Pack shot' }, ...(video ? [{ kind: 'video' as const, label: 'Product video' }] : [])]
  const [emblaRef, embla] = useEmblaCarousel({ loop: slides.length > 1 }, [
    Autoplay({ delay: 6000, stopOnInteraction: false, stopOnMouseEnter: true, playOnInit: slides.length > 1 }),
  ])
  const [selected, setSelected] = useState(0)
  const [lightboxOpen, setLightboxOpen] = useState(false)

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
    <div id="gallery" className="scroll-mt-28">
      <GlassCard border="brand" className="overflow-hidden p-2 sm:p-3">
        <div className="group relative overflow-hidden rounded-[18px]" ref={emblaRef}>
          <div className="flex touch-pan-y">
            <div className="min-w-0 flex-[0_0_100%]">
              <button
                type="button"
                onClick={() => setLightboxOpen(true)}
                className="relative flex aspect-[4/3] w-full cursor-zoom-in items-center justify-center bg-bg-2 sm:aspect-video lg:aspect-[4/3]"
                aria-label="Tap to zoom in on the product photo"
              >
                <span
                  aria-hidden
                  className="absolute left-1/2 top-1/2 h-[60%] w-[70%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold/15 blur-[60px]"
                />
                <img
                  src={image.src}
                  srcSet={image.srcSet}
                  sizes="(min-width: 1024px) 640px, 96vw"
                  width={image.width}
                  height={image.height}
                  alt={image.alt}
                  fetchPriority="high"
                  decoding="async"
                  className="relative h-auto w-[88%] object-contain drop-shadow-[0_30px_50px_rgba(0,0,0,0.6)]"
                />
                <span className="glass-3 pointer-events-none absolute right-3 top-3 flex items-center gap-2 rounded-full px-3.5 py-2 text-xs font-medium text-fg sm:right-4 sm:top-4">
                  <ZoomIn className="size-4" /> Tap to zoom
                </span>
              </button>
            </div>
            {video && (
              <div className="min-w-0 flex-[0_0_100%]">
                <VideoSlide video={video} name={product.name} active={selected === 1} />
              </div>
            )}
          </div>

          {slides.length > 1 && (
            <>
              <CarouselArrow direction="prev" onClick={() => embla?.scrollPrev()} />
              <CarouselArrow direction="next" onClick={() => embla?.scrollNext()} />
              <div className="pointer-events-none absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-1.5">
                {slides.map((slide, index) => (
                  <span
                    key={slide.label}
                    className={cn('h-1.5 rounded-full transition-all duration-300', selected === index ? 'w-6 bg-gradient-brand' : 'w-1.5 bg-white/30')}
                  />
                ))}
              </div>
            </>
          )}
        </div>

        {slides.length > 1 && (
          <div className="no-scrollbar mt-2 flex gap-2 overflow-x-auto p-1 sm:mt-3">
            {slides.map((slide, index) => (
              <button
                key={slide.label}
                type="button"
                onClick={() => scrollTo(index)}
                aria-label={`Show ${slide.label}`}
                aria-current={selected === index}
                className={cn(
                  'relative aspect-video w-24 shrink-0 overflow-hidden rounded-xl border bg-bg-2 transition-all duration-300 sm:w-28',
                  selected === index ? 'border-emerald/70 opacity-100' : 'border-white/10 opacity-60 hover:opacity-100',
                )}
              >
                <img
                  src={slide.kind === 'image' ? product.media.thumb : video?.poster}
                  alt=""
                  width={112}
                  height={63}
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
        )}
      </GlassCard>

      {lightboxOpen && (
        <Suspense fallback={null}>
          <ProductLightbox image={image} open={lightboxOpen} onClose={() => setLightboxOpen(false)} />
        </Suspense>
      )}
    </div>
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

interface VideoSlideProps {
  video: NonNullable<Product['media']['video']>
  name: string
  active: boolean
}

/** Plays only while its slide is selected and on screen, muted by default. */
function VideoSlide({ video, name, active }: VideoSlideProps) {
  const ref = useRef<HTMLVideoElement>(null)
  const [muted, setMuted] = useState(true)

  useEffect(() => {
    const element = ref.current
    if (!element) return
    if (!active) {
      element.pause()
      return
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) void element.play().catch(() => undefined)
        else element.pause()
      },
      { threshold: 0.4 },
    )
    observer.observe(element)
    return () => observer.disconnect()
  }, [active])

  return (
    <div className="relative aspect-[4/3] w-full bg-bg-2 sm:aspect-video lg:aspect-[4/3]">
      <video
        ref={ref}
        src={video.src}
        poster={video.poster}
        width={video.width}
        height={video.height}
        muted={muted}
        loop
        playsInline
        preload="metadata"
        aria-label={`${name} product video`}
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
