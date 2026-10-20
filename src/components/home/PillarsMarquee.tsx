import { featuredProduct } from '../../data/products'

/** Endless ribbon of the six pillars. Four copies keep the -50% loop seamless on wide screens. */
export function PillarsMarquee() {
  const loop = [...featuredProduct.pillars, ...featuredProduct.pillars, ...featuredProduct.pillars, ...featuredProduct.pillars]

  return (
    <section aria-label="Six pillars of wellness" className="relative mt-10 lg:mt-20">
      <div className="container-site eyebrow">Six pillars of wellness</div>
      <div className="mt-3 overflow-hidden lg:mt-4">
        <div className="flex w-max gap-2 py-1.5 pb-[18px] motion-safe:animate-marquee lg:gap-3 lg:pb-6">
          {loop.map((pillar, index) => (
            <span
              key={`${pillar.name}-${index}`}
              aria-hidden={index >= featuredProduct.pillars.length}
              className="flex shrink-0 items-center gap-2.5 rounded-[22px] bg-white py-2.5 pr-4 pl-2.5 shadow-[0_10px_20px_-14px_rgba(15,31,25,0.45)] lg:gap-3 lg:rounded-[26px] lg:py-3 lg:pr-[22px] lg:pl-3"
            >
              <span aria-hidden className="size-7 rounded-full lg:size-9" style={{ background: pillar.gradient }} />
              <span>
                <span className="block text-sm font-extrabold lg:text-base">{pillar.name}</span>
                <span className="text-[11px] text-muted lg:text-xs">{pillar.source}</span>
              </span>
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
