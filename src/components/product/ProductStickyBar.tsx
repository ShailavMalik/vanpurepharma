import type { Pack, Product } from '../../data/products'
import { formatInr } from '../../lib/format'
import { buildOrderUrl } from '../../lib/whatsapp'
import { StickyBar } from '../ui/StickyBar'

export function ProductStickyBar({ product, pack }: { product: Product; pack: Pack }) {
  return (
    <StickyBar>
      <div className="flex items-center gap-3 rounded-[22px] bg-white py-2 pr-2 pl-4 shadow-[0_1px_2px_rgba(15,31,25,0.08),0_16px_32px_-12px_rgba(15,31,25,0.32)]">
        <div className="flex-1">
          <div className="text-[11px] text-muted">{pack.days}-day pack</div>
          <div className="text-lg font-extrabold">
            {formatInr(pack.price)} <s className="text-xs font-medium text-muted">{formatInr(pack.mrp)}</s>
          </div>
        </div>
        <a
          href={buildOrderUrl(product, pack)}
          target="_blank"
          rel="noopener noreferrer"
          className="flex min-h-12 items-center rounded-2xl bg-[linear-gradient(180deg,#10825f,#08583f)] px-[18px] text-sm font-extrabold text-white no-underline shadow-[inset_0_1px_0_rgba(255,255,255,0.25)]"
        >
          Order on WhatsApp
        </a>
      </div>
    </StickyBar>
  )
}
