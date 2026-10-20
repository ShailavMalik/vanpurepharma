import type { Pack, Product } from '../../data/products'
import { cn } from '../../lib/cn'
import { formatInr } from '../../lib/format'
import { buildOrderUrl } from '../../lib/whatsapp'
import { CheckIcon, WhatsAppIcon } from '../ui/Icons'

interface PackChooserProps {
  product: Product
  selected: Pack
  onSelect: (pack: Pack) => void
}

/** The purchase card: two fixed launch packs and the WhatsApp order button with the live total. */
export function PackChooser({ product, selected, onSelect }: PackChooserProps) {
  return (
    <div id="order" className="card-lg scroll-mt-24 rounded-[28px] px-4 py-[18px] lg:rounded-[30px] lg:p-6">
      <h2 className="m-0 font-sans text-[15px] font-extrabold lg:text-base">Choose your pack</h2>
      <div role="group" aria-label="Pack size" className="mt-3 grid grid-cols-2 gap-2.5 lg:mt-3.5 lg:gap-3">
        {product.packs.map((pack) => {
          const on = pack.strips === selected.strips
          return (
            <button
              key={pack.strips}
              type="button"
              aria-pressed={on}
              onClick={() => onSelect(pack)}
              className={cn(
                'pack-option relative flex cursor-pointer flex-col gap-[3px] rounded-[20px] px-3 pt-3.5 pb-3 text-left text-ink transition-shadow lg:gap-1 lg:rounded-[22px] lg:px-4 lg:pt-[18px] lg:pb-4',
                on && 'pack-option-on',
              )}
            >
              <span className="font-display text-2xl font-bold tracking-[-0.4px] lg:text-[30px] lg:font-extrabold lg:tracking-[-0.6px]">{pack.days} days</span>
              <span className="text-xs text-muted lg:text-[13px]">
                {pack.strips} strips · {pack.strips * product.softgelsPerStrip} softgels
              </span>
              <span className="mt-2.5 text-xl font-extrabold lg:mt-3 lg:text-2xl">{formatInr(pack.price)}</span>
              <span className="text-xs text-muted lg:text-[13px]">
                <s>MRP {formatInr(pack.mrp)}</s> · <b className="text-red">save {formatInr(pack.mrp - pack.price)}</b>
              </span>
              {on && (
                <span aria-hidden className="absolute top-3 right-3 flex size-[22px] items-center justify-center rounded-full bg-green text-white lg:top-3.5 lg:right-3.5 lg:size-[26px]">
                  <CheckIcon size={13} />
                </span>
              )}
              {pack.fullBox && (
                <span className="absolute -top-2.5 left-3 rounded-lg bg-[linear-gradient(90deg,#0b6b4f,#1c8f9e)] px-2 py-1 text-[10px] font-extrabold tracking-[0.6px] text-white uppercase lg:-top-[11px] lg:left-3.5 lg:px-[9px] lg:text-[11px]">
                  Full box
                </span>
              )}
            </button>
          )
        })}
      </div>

      <a
        href={buildOrderUrl(product, selected)}
        target="_blank"
        rel="noopener noreferrer"
        data-testid="order-whatsapp"
        className="btn-primary mt-3.5 flex min-h-[58px] justify-between py-2 pr-2 pl-5 text-base lg:mt-4 lg:min-h-[62px] lg:pr-2.5 lg:pl-6 lg:text-[17px]"
      >
        <span className="relative flex items-center gap-2.5">
          <WhatsAppIcon size={22} />
          Order on WhatsApp
        </span>
        <span className="relative rounded-xl bg-white/[0.16] px-3 py-2.5 text-[15px] lg:rounded-[14px] lg:px-3.5 lg:py-[11px] lg:text-base">{formatInr(selected.price)}</span>
      </a>
      <p className="m-0 mt-2.5 text-center text-xs text-muted lg:text-[13px]">Nothing is charged here. We confirm delivery and payment with you in the chat.</p>
    </div>
  )
}
