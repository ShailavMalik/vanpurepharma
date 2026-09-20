import { Play, Quote } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { founder } from '../../data/about'
import { cn } from '../../lib/cn'
import { GlassCard } from '../ui/GlassCard'
import { Reveal } from '../ui/Reveal'
import { SectionHeading } from '../ui/SectionHeading'

export function FounderSection() {
  return (
    <section id="founder" className="section-pad scroll-mt-24">
      <div className="container-site">
        <SectionHeading eyebrow="The founder" title="A message from the person behind the formula." />

        <div className="mt-12 grid items-start gap-10 md:grid-cols-[minmax(0,440px)_minmax(0,360px)] md:justify-center md:gap-12 lg:gap-20">
          <Reveal className="flex flex-col items-center md:items-start">
            <div className="relative w-full max-w-[380px]">
              <div
                aria-hidden
                className="absolute left-1/2 top-1/2 -z-10 h-[80%] w-[90%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold/20 blur-[70px]"
              />
              <GlassCard border="brand" className="overflow-hidden p-2 md:-rotate-2 md:transition-transform md:duration-500 md:hover:rotate-0">
                <img
                  src={founder.photo.src}
                  alt={founder.photo.alt}
                  width={founder.photo.width}
                  height={founder.photo.height}
                  loading="lazy"
                  decoding="async"
                  className="aspect-[4/5] w-full rounded-[18px] object-cover object-top"
                />
              </GlassCard>
            </div>
            <div className="mt-8 max-w-[440px] text-center md:text-left">
              <h3 className="font-display text-2xl font-bold">{founder.name}</h3>
              <p className="mt-1 text-sm text-muted">{founder.role}</p>
              <blockquote className="relative mt-5 text-base leading-relaxed text-fg/90 md:text-lg">
                <Quote aria-hidden className="absolute -left-6 -top-2 hidden size-5 text-violet/60 md:block" />“{founder.quote}”
              </blockquote>
            </div>
          </Reveal>

          <Reveal delay={0.1} className="flex justify-center md:justify-end">
            <FounderVideo />
          </Reveal>
        </div>
      </div>
    </section>
  )
}

/** Portrait video in a phone-shaped frame. Click to play with controls; pauses when scrolled away. */
function FounderVideo() {
  const ref = useRef<HTMLVideoElement>(null)
  const [playing, setPlaying] = useState(false)

  useEffect(() => {
    const video = ref.current
    if (!video) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting && !video.paused) video.pause()
      },
      { threshold: 0.3 },
    )
    observer.observe(video)
    return () => observer.disconnect()
  }, [])

  function start() {
    const video = ref.current
    if (!video) return
    void video.play().catch(() => undefined)
  }

  return (
    <div className="relative w-full max-w-[320px] lg:max-w-[360px]">
      <div
        aria-hidden
        className="absolute left-1/2 top-1/2 -z-10 h-[85%] w-[85%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-violet/25 blur-[70px]"
      />
      <GlassCard border="brand" className="overflow-hidden p-2">
        <div className="relative aspect-[9/16] overflow-hidden rounded-[20px] bg-bg-2">
          <video
            ref={ref}
            src={founder.video.src}
            poster={founder.video.poster}
            playsInline
            preload="metadata"
            controls={playing}
            onPlay={() => setPlaying(true)}
            onEnded={() => setPlaying(false)}
            aria-label={founder.video.title}
            className="h-full w-full object-cover"
          />
          {!playing && (
            <button
              type="button"
              onClick={start}
              aria-label={`Play: ${founder.video.title}`}
              className="group absolute inset-0 flex items-center justify-center bg-gradient-to-t from-bg/70 via-transparent to-transparent"
            >
              <span className="absolute inset-0 flex items-center justify-center">
                <span className="size-20 rounded-full bg-white/20 motion-safe:animate-pulse-ring" />
              </span>
              <span className="relative flex size-20 items-center justify-center rounded-full bg-white text-bg shadow-[0_16px_40px_-10px_rgba(255,255,255,0.6)] transition-transform duration-200 group-hover:scale-105">
                <Play className="ml-1 size-8 fill-current" />
              </span>
              <span className={cn('absolute bottom-5 left-0 right-0 px-4 text-center text-sm font-medium text-fg')}>
                {founder.video.title}
              </span>
            </button>
          )}
        </div>
      </GlassCard>
    </div>
  )
}
