import { MessageCircle } from 'lucide-react'
import { generalChatUrl } from '../../lib/whatsapp'

/** Desktop floating chat button; phones get the sticky order bar instead. */
export function WhatsAppFab() {
  return (
    <a
      href={generalChatUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with us on WhatsApp"
      className="group fixed bottom-6 right-6 z-40 hidden md:flex"
    >
      <span className="absolute inset-0 rounded-full bg-wa/50 motion-safe:animate-pulse-ring" aria-hidden />
      <span className="relative flex size-14 items-center justify-center rounded-full bg-wa text-[#052e16] shadow-[0_12px_32px_-8px_rgba(37,211,102,0.8)] transition-transform duration-200 group-hover:scale-105">
        <MessageCircle className="size-7" />
      </span>
      <span className="glass-3 pointer-events-none absolute right-full top-1/2 mr-3 -translate-y-1/2 whitespace-nowrap rounded-full px-3 py-1.5 text-sm text-fg opacity-0 transition-opacity duration-200 group-hover:opacity-100">
        Chat with us
      </span>
    </a>
  )
}
