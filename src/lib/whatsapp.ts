import { askUrlText } from '../data/home'
import type { Pack, Product } from '../data/products'
import { site } from '../data/site'
import { formatInr } from './format'

export function buildWhatsAppUrl(message: string): string {
  return `https://wa.me/${site.whatsapp.number}?text=${encodeURIComponent(message)}`
}

export function buildOrderMessage(product: Product, pack: Pack): string {
  const softgels = pack.strips * product.softgelsPerStrip
  return `Hi Vanpure, I would like to order ${product.name}, ${pack.days}-day pack: ${pack.strips} strips (${softgels} softgels) at the launch price of ${formatInr(pack.price)} (MRP ${formatInr(pack.mrp)}). Please confirm availability and delivery.`
}

export function buildOrderUrl(product: Product, pack: Pack): string {
  return buildWhatsAppUrl(buildOrderMessage(product, pack))
}

export const askUrl = buildWhatsAppUrl(askUrlText)

export const generalChatUrl = buildWhatsAppUrl('Hi Vanpure, I have a question.')
