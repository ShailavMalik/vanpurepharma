import { launchedLabel } from '../../data/home'
import { featuredProduct, lowestPrice, productPath } from '../../data/products'
import { formatInr } from '../../lib/format'
import { askUrl } from '../../lib/whatsapp'
import { Button } from '../ui/Button'
import { ArrowRightIcon, WhatsAppIcon } from '../ui/Icons'
import { Showcase } from './Showcase'
import { StatsStrip } from './StatsStrip'

export function HeroSection() {
  const from = formatInr(lowestPrice(featuredProduct))

  return (
    <section className="container-site pt-[22px] lg:grid lg:grid-cols-2 lg:items-center lg:gap-12 lg:pt-[72px]">
      <div>
        <span className="hidden items-center gap-2 rounded-full bg-white/80 px-3.5 py-2 text-[13px] font-extrabold text-green shadow-[0_8px_18px_-12px_rgba(11,107,79,0.5)] motion-safe:animate-rise lg:inline-flex">
          <span aria-hidden className="size-2 rounded-full bg-green-light motion-safe:animate-pulse-ring" />
          {launchedLabel}
        </span>
        <h1 className="m-0 font-display text-[42px] leading-[0.98] font-extrabold tracking-[-1.5px] motion-safe:animate-rise lg:mt-5 lg:text-[clamp(44px,5vw,72px)] lg:leading-[0.96] lg:tracking-[-2px]">
          A small daily habit for <span className="text-gradient">everyday health.</span>
        </h1>
        <p className="m-0 mt-3.5 text-[15px] leading-relaxed text-body motion-safe:animate-rise-2 lg:mt-5 lg:max-w-[520px] lg:text-lg">
          Science-backed supplements, made in certified pharmaceutical facilities. Meet {featuredProduct.shortName}: 15 actives in one softgel.
        </p>

        <div className="hidden flex-wrap gap-3 motion-safe:animate-rise-3 lg:mt-7 lg:flex">
          <Button to={productPath(featuredProduct)} size="lg" sheen className="px-[26px]">
            Choose your pack · from {from}
          </Button>
          <Button href={askUrl} variant="soft" size="lg" icon={<WhatsAppIcon />} className="bg-white/80 shadow-[0_10px_22px_-16px_rgba(15,31,25,0.4)]">
            Ask us on WhatsApp
          </Button>
        </div>
        <StatsStrip className="hidden lg:mt-9 lg:grid lg:max-w-[520px]" />
      </div>

      <Showcase className="mt-[22px] motion-safe:animate-rise-3 lg:mt-0" />

      <div className="mt-4 flex flex-col gap-2 lg:hidden">
        <Button to={productPath(featuredProduct)} size="lg" sheen iconRight={<ArrowRightIcon />} className="rounded-[20px]">
          Choose your pack · from {from}
        </Button>
        <Button href={askUrl} variant="soft" icon={<WhatsAppIcon />} className="text-sm">
          Have a question? Ask us on WhatsApp
        </Button>
      </div>
      <StatsStrip className="mt-[26px] lg:hidden" />
    </section>
  )
}
