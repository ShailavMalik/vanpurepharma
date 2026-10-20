import { Link } from 'react-router-dom'
import { featuredProduct, lowestPrice, productPath } from '../../data/products'
import { formatInr } from '../../lib/format'
import { Button } from '../ui/Button'
import { ArrowRightIcon } from '../ui/Icons'

/** "Our product" card: a compact link on phones, a full feature card on desktop. */
export function ProductSpotlight() {
  const product = featuredProduct
  const [image] = product.gallery

  return (
    <section className="container-site mt-6 lg:mt-12">
      <div className="eyebrow lg:hidden">Our product</div>

      <Link
        to={productPath(product)}
        className="mt-3 block rounded-[30px] bg-[linear-gradient(140deg,#10825f,#4fa8d8_55%,#f0d894)] p-1.5 text-ink no-underline shadow-[0_26px_50px_-28px_rgba(11,107,79,0.6)] lg:hidden"
      >
        <span className="flex items-center gap-3.5 rounded-[25px] bg-white p-3.5">
          <span aria-hidden className="stage flex h-32 w-[104px] shrink-0 items-center justify-center rounded-[20px] p-2">
            <img src="/media/product/pack-shot-400.webp" alt="" width={88} height={58} className="w-[88px] drop-shadow-[0_12px_16px_rgba(0,0,0,0.4)]" loading="lazy" />
          </span>
          <span className="flex flex-1 flex-col gap-1">
            <span className="text-[11px] font-extrabold text-green uppercase">{product.category}</span>
            <span className="font-display text-[21px] font-extrabold tracking-[-0.4px]">{product.name}</span>
            <span className="text-[13px] text-muted">{product.subtitle}</span>
            <span className="mt-1.5 flex items-center justify-between">
              <span className="text-[15px] font-extrabold">From {formatInr(lowestPrice(product))}</span>
              <span aria-hidden className="flex size-[34px] items-center justify-center rounded-full bg-ink text-white">
                <ArrowRightIcon size={16} />
              </span>
            </span>
          </span>
        </span>
      </Link>

      <div className="hidden rounded-[40px] bg-[linear-gradient(140deg,#10825f,#4fa8d8_55%,#f0d894)] p-1.5 shadow-[0_40px_80px_-40px_rgba(11,107,79,0.6)] lg:block">
        <div className="grid items-center gap-9 rounded-[35px] bg-white p-8 lg:grid-cols-2">
          <div aria-hidden className="stage flex h-[360px] items-center justify-center rounded-[28px]">
            <img src={image.src} srcSet={image.srcSet} sizes="420px" alt="" width={image.width} height={image.height} loading="lazy" className="w-[420px] drop-shadow-[0_24px_32px_rgba(0,0,0,0.4)]" />
          </div>
          <div>
            <div className="eyebrow">Our product · {product.category}</div>
            <h2 className="m-0 mt-2.5 font-display text-[44px] leading-none font-extrabold tracking-[-1.2px]">{product.name}</h2>
            <div className="mt-2.5 text-lg font-semibold text-deep">{product.subtitle}</div>
            <p className="m-0 mt-3.5 text-base leading-relaxed text-muted">{product.description}</p>
            <div className="mt-5 grid grid-cols-2 gap-2.5">
              {product.packs.map((pack) => (
                <div key={pack.strips} className="rounded-[18px] bg-[linear-gradient(160deg,#f1faf5,#eef4fd)] px-4 py-3.5">
                  <div className="text-[13px] text-muted">
                    {pack.days} days · {pack.strips} strips
                  </div>
                  <div className="mt-0.5 text-[22px] font-extrabold">
                    {formatInr(pack.price)} <s className="text-[13px] font-medium text-muted">{formatInr(pack.mrp)}</s>
                  </div>
                </div>
              ))}
            </div>
            <Button to={productPath(product)} variant="dark" size="md" iconRight={<ArrowRightIcon />} className="mt-5 min-h-[54px] px-6">
              View product
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
