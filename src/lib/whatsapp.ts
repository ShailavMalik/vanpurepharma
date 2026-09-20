import type { Product } from '../data/products'
import { site } from '../data/site'
import { formatInr } from './format'

export function clampStrips(product: Product, value: number): number {
  if (!Number.isFinite(value)) return product.order.minStrips
  return Math.min(product.order.maxStrips, Math.max(product.order.minStrips, Math.round(value)))
}

export function orderSummary(product: Product, strips: number) {
  const softgels = strips * product.softgelsPerStrip
  return {
    strips,
    softgels,
    days: softgels / product.softgelsPerDay,
    total: strips * product.price.perStrip,
    mrpTotal: strips * product.price.mrpPerStrip,
  }
}

export function buildOrderMessage(product: Product, strips: number): string {
  const { softgels, total } = orderSummary(product, strips)
  const unit = strips === 1 ? 'strip' : 'strips'
  return [
    `Hi ${site.name}! I'd like to order ${product.name}.`,
    `Quantity: ${strips} ${unit} (${softgels} softgels)`,
    `Price: ${formatInr(product.price.perStrip)}/strip → Total ${formatInr(total)}`,
    'Please confirm availability and delivery details.',
  ].join('\n')
}

export function buildWhatsAppUrl(message: string): string {
  return `https://wa.me/${site.whatsapp.number}?text=${encodeURIComponent(message)}`
}

export function buildOrderUrl(product: Product, strips: number): string {
  return buildWhatsAppUrl(buildOrderMessage(product, strips))
}

export const generalChatUrl = buildWhatsAppUrl(`Hi ${site.name}! I have a question about your products.`)
