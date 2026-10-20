import { useEffect, useRef, useState } from 'react'
import { reels } from '../../data/home'
import { featuredProduct } from '../../data/products'
import { cn } from '../../lib/cn'
import { PauseIcon, PlayIcon } from '../ui/Icons'

/** Four portrait clips with real poster frames; only one plays at a time. */
export function WatchReels() {
  const [playing, setPlaying] = useState<string | null>(null)

  return (
    <section aria-label="Videos" className="mt-12 lg:container-site lg:mt-24">
      <h2 className="container-site m-0 font-display text-[30px] leading-[1.02] font-extrabold tracking-[-0.8px] lg:px-0 lg:text-[44px] lg:leading-none lg:tracking-[-1.2px]">
        Watch {featuredProduct.shortName}
      </h2>
      <div className="snap-track mt-4 gap-2.5 px-4 pb-[22px] [scroll-padding-left:16px] lg:mt-7 lg:grid lg:grid-cols-4 lg:gap-4 lg:overflow-visible lg:px-0 lg:pb-0">
        {reels.map((reel) => (
          <ReelCard
            key={reel.id}
            src={reel.src}
            poster={reel.poster}
            title={reel.title}
            active={playing === reel.id}
            onToggle={() => setPlaying((current) => (current === reel.id ? null : reel.id))}
          />
        ))}
      </div>
    </section>
  )
}

interface ReelCardProps {
  src: string
  poster: string
  title: string
  active: boolean
  onToggle: () => void
}

function ReelCard({ src, poster, title, active, onToggle }: ReelCardProps) {
  const ref = useRef<HTMLVideoElement>(null)

  // When another reel starts, this one stops; only one plays at a time.
  useEffect(() => {
    if (!active) ref.current?.pause()
  }, [active])

  function toggle() {
    const video = ref.current
    if (!video) return
    if (active) {
      video.pause()
    } else {
      void video.play().catch(() => undefined)
    }
    onToggle()
  }

  return (
    <div className="lift relative aspect-[9/16] w-[200px] shrink-0 snap-start overflow-hidden rounded-[26px] bg-ink shadow-[0_22px_40px_-24px_rgba(15,31,25,0.65)] lg:w-auto lg:rounded-[30px]">
      <video
        ref={ref}
        src={src}
        poster={poster}
        preload="none"
        playsInline
        loop
        onPause={() => active && onToggle()}
        className="size-full object-cover"
        aria-label={title}
      />
      <button
        type="button"
        onClick={toggle}
        aria-label={`${active ? 'Pause' : 'Play'} ${title}`}
        className={cn('group absolute inset-0 flex items-center justify-center', active && 'opacity-0 hover:opacity-100 focus-visible:opacity-100')}
      >
        <span className="flex size-[60px] items-center justify-center rounded-full bg-white/95 text-ink shadow-[0_0_0_10px_rgba(255,255,255,0.15)] transition-transform group-hover:scale-105 lg:size-[72px] lg:shadow-[0_0_0_12px_rgba(255,255,255,0.15)]">
          {active ? <PauseIcon size={22} /> : <PlayIcon size={22} className="ml-1" />}
        </span>
      </button>
    </div>
  )
}
