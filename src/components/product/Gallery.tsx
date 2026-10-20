import { lazy, Suspense, useEffect, useRef, useState } from 'react'
import type { Product } from '../../data/products'
import { useSnapCarousel } from '../../hooks/useSnapCarousel'
import { cn } from '../../lib/cn'
import { ChevronLeftIcon, ChevronRightIcon, PlayIcon, SoundOffIcon, SoundOnIcon, ZoomIcon } from '../ui/Icons'

const ProductViewer = lazy(() => import('./ProductViewer'))

/** Product media: three photos then the product film, swipeable, with a full-screen viewer. */
export function Gallery({ product }: { product: Product }) {
  const slideCount = product.gallery.length + 1
  const carousel = useSnapCarousel({ count: slideCount })
  const [viewer, setViewer] = useState<number | null>(null)
  const videoIndex = product.gallery.length

  return (
    <section aria-label="Product images" className="relative">
      <div className="relative overflow-hidden rounded-[30px] bg-white/75 shadow-[inset_0_1px_0_rgba(255,255,255,0.9),0_2px_4px_rgba(15,31,25,0.05),0_30px_60px_-24px_rgba(11,107,79,0.35)] lg:rounded-[36px] lg:bg-white">
        <div ref={carousel.trackRef} onScroll={carousel.onScroll} className="snap-track aspect-[366/390] lg:aspect-square">
          {product.gallery.map((image, index) => (
            <button
              key={image.src}
              type="button"
              onClick={() => setViewer(index)}
              aria-label={`Open image ${index + 1} of ${slideCount} full screen`}
              className={cn('relative flex size-full shrink-0 snap-start cursor-zoom-in items-center justify-center overflow-hidden', image.fit === 'contain' && 'stage-slide')}
            >
              {image.fit === 'contain' && (
                <span aria-hidden className="absolute bottom-[14%] h-6 w-[55%] rounded-full bg-[radial-gradient(closest-side,rgba(15,31,25,0.28),rgba(15,31,25,0))]" />
              )}
              <img
                src={image.src}
                srcSet={image.srcSet}
                sizes="(min-width: 1024px) 600px, 92vw"
                width={image.width}
                height={image.height}
                alt={image.alt}
                fetchPriority={index === 0 ? 'high' : 'auto'}
                loading={index === 0 ? 'eager' : 'lazy'}
                decoding="async"
                className={cn(image.fit === 'contain' ? 'relative w-[84%] drop-shadow-[0_26px_30px_rgba(15,31,25,0.35)]' : 'size-full object-cover')}
              />
              <span className="absolute top-3 right-3 flex items-center gap-1.5 rounded-full bg-white/90 px-3 py-1.5 text-xs font-bold text-ink shadow-[0_6px_14px_-8px_rgba(15,31,25,0.4)] lg:top-4 lg:right-4">
                <ZoomIcon size={14} /> Tap to zoom
              </span>
            </button>
          ))}
          <VideoSlide product={product} active={carousel.index === videoIndex} />
        </div>

        <CarouselArrow direction="prev" onClick={carousel.prev} />
        <CarouselArrow direction="next" onClick={carousel.next} />
      </div>

      <div className="flex justify-center pt-1.5 lg:pt-2.5">
        {Array.from({ length: slideCount }, (_, index) => {
          const active = carousel.index === index
          return (
            <button
              key={index}
              type="button"
              aria-label={index === videoIndex ? 'Show product video' : `Show image ${index + 1} of ${slideCount}`}
              aria-current={active}
              onClick={() => carousel.go(index)}
              className="flex h-8 w-7 items-center justify-center lg:w-[30px]"
            >
              <span
                className={cn('block h-2 rounded-full transition-[width] duration-200', active ? 'w-6 bg-[linear-gradient(90deg,#0b6b4f,#4fa8d8)] lg:w-[26px]' : 'w-2 bg-ink/20')}
              />
            </button>
          )
        })}
      </div>

      {viewer !== null && (
        <Suspense fallback={null}>
          <ProductViewer product={product} index={viewer} onClose={() => setViewer(null)} />
        </Suspense>
      )}
    </section>
  )
}

function VideoSlide({ product, active }: { product: Product; active: boolean }) {
  const ref = useRef<HTMLVideoElement>(null)
  const [playing, setPlaying] = useState(false)
  const [muted, setMuted] = useState(true)

  useEffect(() => {
    if (!active) ref.current?.pause()
  }, [active])

  function play() {
    void ref.current?.play().catch(() => undefined)
  }

  function pause() {
    ref.current?.pause()
  }

  return (
    <div className="relative flex size-full shrink-0 snap-start items-center justify-center bg-[radial-gradient(90%_70%_at_30%_20%,#1e5a47_0%,#0f1f19_75%)]">
      <video
        ref={ref}
        src={product.video.src}
        poster={product.video.poster}
        width={product.video.width}
        height={product.video.height}
        preload="metadata"
        playsInline
        loop
        muted={muted}
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        aria-label={`${product.name} product video`}
        className="size-full object-cover"
      />
      {!playing && (
        <button type="button" onClick={play} aria-label="Play product video" className="absolute inset-0 flex flex-col items-center justify-center gap-3.5 text-white">
          <span className="flex size-[70px] items-center justify-center rounded-full bg-white text-ink shadow-[0_0_0_10px_rgba(255,255,255,0.12)] lg:size-[88px] lg:shadow-[0_0_0_14px_rgba(255,255,255,0.12)]">
            <PlayIcon size={26} className="ml-1" />
          </span>
          <span className="text-xs text-[#b7c9c0] lg:text-[13px]">{product.video.seconds} s product video</span>
        </button>
      )}
      {playing && (
        <button
          type="button"
          onClick={pause}
          aria-label="Pause product video"
          className="absolute inset-0 cursor-default"
        />
      )}
      <button
        type="button"
        onClick={() => setMuted((m) => !m)}
        aria-label={muted ? 'Unmute video' : 'Mute video'}
        className="absolute right-4 bottom-4 flex size-10 items-center justify-center rounded-full bg-white/90 text-ink"
      >
        {muted ? <SoundOffIcon size={16} /> : <SoundOnIcon size={16} />}
      </button>
    </div>
  )
}

function CarouselArrow({ direction, onClick }: { direction: 'prev' | 'next'; onClick: () => void }) {
  return (
    <button
      type="button"
      aria-label={direction === 'prev' ? 'Previous image' : 'Next image'}
      onClick={onClick}
      className={cn(
        'absolute top-1/2 hidden size-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/[0.92] text-ink shadow-[0_8px_18px_-8px_rgba(15,31,25,0.4)] hover:bg-white lg:flex',
        direction === 'prev' ? 'left-4' : 'right-4',
      )}
    >
      {direction === 'prev' ? <ChevronLeftIcon /> : <ChevronRightIcon strokeWidth="2.2" />}
    </button>
  )
}
