import { featuredProduct, lowestPrice, productPath } from '../../data/products'
import { formatInr } from '../../lib/format'
import { askUrl } from '../../lib/whatsapp'
import { Button } from '../ui/Button'
import { WhatsAppIcon } from '../ui/Icons'
import { StickyBar } from '../ui/StickyBar'

export function HomeStickyBar() {
  return (
    <StickyBar className="flex gap-2">
      <Button to={productPath(featuredProduct)} className="min-h-[52px] flex-1 text-[15px]">
        Order {featuredProduct.shortName} · from {formatInr(lowestPrice(featuredProduct))}
      </Button>
      <a
        href={askUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with us on WhatsApp"
        className="flex size-[52px] shrink-0 items-center justify-center rounded-[18px] bg-white text-green motion-safe:animate-pulse-ring"
      >
        <WhatsAppIcon size={22} />
      </a>
    </StickyBar>
  )
}
