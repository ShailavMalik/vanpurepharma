import { askUrl } from '../../lib/whatsapp'
import { WhatsAppIcon } from '../ui/Icons'

/** Desktop floating chat button; phones use each page's sticky bar instead. */
export function WhatsAppFab() {
  return (
    <a
      href={askUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with us on WhatsApp"
      className="fixed right-7 bottom-7 z-40 hidden size-15 items-center justify-center rounded-full bg-[linear-gradient(180deg,#10825f,#08583f)] text-white shadow-[0_18px_32px_-12px_rgba(11,107,79,0.7)] transition-transform hover:scale-105 motion-safe:animate-pulse-ring lg:flex"
    >
      <WhatsAppIcon size={26} />
    </a>
  )
}
