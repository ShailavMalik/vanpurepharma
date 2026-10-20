import { featuredProduct } from '../../data/products'
import { cn } from '../../lib/cn'

const chipPositions = ['top-9 left-3.5 lg:top-[60px] lg:left-9', 'top-[150px] right-3 lg:top-[210px] lg:right-[30px]', 'bottom-[78px] left-4 lg:bottom-[110px] lg:left-10']
const chipFloat = ['motion-safe:animate-float', 'motion-safe:animate-float-3', 'motion-safe:animate-float-2']

/** The floating pack shot inside a glowing stage, ringed by ingredient callouts. */
export function Showcase({ className }: { className?: string }) {
  const [image] = featuredProduct.gallery

  return (
    <section
      aria-label={featuredProduct.shortName}
      className={cn(
        'stage relative h-[380px] overflow-hidden rounded-[34px] shadow-[inset_0_1px_0_#fff,0_34px_64px_-28px_rgba(11,107,79,0.45)] lg:h-[540px] lg:rounded-[40px]',
        className,
      )}
    >
      <div aria-hidden className="absolute top-1/2 left-1/2 size-[300px] -translate-x-1/2 -translate-y-[57%] lg:size-[440px]">
        <div className="halo size-full rounded-full motion-safe:animate-spin-slow" />
      </div>
      <div aria-hidden className="absolute top-1/2 left-1/2 size-[230px] -translate-x-1/2 -translate-y-[59%] rounded-full bg-[radial-gradient(closest-side,#fff_60%,rgba(255,255,255,0))] lg:size-[340px]" />
      <span aria-hidden className="absolute bottom-[58px] left-1/2 h-[22px] w-[200px] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(15,31,25,0.3),rgba(15,31,25,0))] lg:bottom-[84px] lg:h-7 lg:w-[260px]" />

      <div className="absolute top-[70px] left-1/2 w-[236px] -translate-x-1/2 lg:top-[96px] lg:w-[340px]">
        <img
          src={image.src}
          srcSet={image.srcSet}
          sizes="(min-width: 1024px) 340px, 236px"
          width={image.width}
          height={image.height}
          alt={image.alt}
          fetchPriority="high"
          decoding="async"
          className="w-full drop-shadow-[0_26px_30px_rgba(15,31,25,0.35)] motion-safe:animate-float-2"
        />
      </div>

      {featuredProduct.highlights.map((chip, index) => (
        <div key={chip.label} className={cn('absolute', chipPositions[index])}>
          <span
            className={cn(
              'block rounded-[14px] bg-white/[0.92] px-[11px] py-2 text-xs font-extrabold shadow-[0_12px_24px_-12px_rgba(15,31,25,0.4)] lg:rounded-2xl lg:px-3.5 lg:py-2.5 lg:text-sm',
              chipFloat[index],
            )}
          >
            {chip.label}
            <br />
            <span className="text-green">{chip.value}</span>
          </span>
        </div>
      ))}

      <div aria-hidden className="absolute right-7 bottom-[26px] flex gap-1 lg:right-11 lg:bottom-9 lg:gap-1.5">
        <span className="capsule h-[22px] w-12 motion-safe:animate-bob lg:h-7 lg:w-16" />
        <span className="capsule h-[22px] w-12 motion-safe:animate-bob-2 lg:h-7 lg:w-16" />
      </div>

      <span className="absolute top-3.5 right-3.5 inline-flex items-center gap-1.5 rounded-[14px] bg-white/90 px-2.5 py-1.5 text-[11px] font-extrabold text-green lg:hidden">
        <span aria-hidden className="size-2 rounded-full bg-green-light motion-safe:animate-pulse-ring" />
        Just launched
      </span>
    </section>
  )
}
