import { featuredProduct, orderPath, productPath } from './products'
import { site } from './site'

export type HeroVisual = 'product' | 'price' | 'range'

export interface HeroSlide {
  id: string
  eyebrow: string
  title: string
  highlight: string
  description: string
  primary: { label: string; to: string }
  secondary?: { label: string; to: string; external?: boolean }
  visual: HeroVisual
  accent: 'gold' | 'brand'
}

export const heroSlides: HeroSlide[] = [
  {
    id: 'launch',
    eyebrow: `Launching ${site.launchDateDisplay}`,
    title: 'Complete vitality,',
    highlight: 'every single day.',
    description: `${featuredProduct.name} brings herbal adaptogens, essential vitamins, minerals and amino acids into one daily softgel.`,
    primary: { label: 'Order on WhatsApp', to: orderPath(featuredProduct) },
    secondary: { label: 'View product', to: productPath(featuredProduct) },
    visual: 'product',
    accent: 'brand',
  },
  {
    id: 'offer',
    eyebrow: 'Special release pricing',
    title: 'Launch offer:',
    highlight: '₹75 a strip, not ₹120.',
    description: 'Ten softgels per strip, a five-day supply. Order as few as one strip or a full box of ten, straight on WhatsApp.',
    primary: { label: 'Claim launch price', to: orderPath(featuredProduct) },
    secondary: { label: 'See what is inside', to: `${productPath(featuredProduct)}#ingredients` },
    visual: 'price',
    accent: 'gold',
  },
  {
    id: 'range',
    eyebrow: 'The Vanpure range',
    title: 'One launch.',
    highlight: 'A growing range.',
    description: 'Multashva is the first of our science-backed formulas. Follow along to hear about the next ones first.',
    primary: { label: 'Browse products', to: '/products' },
    secondary: { label: `Follow @${site.instagram.handle}`, to: site.instagram.url, external: true },
    visual: 'range',
    accent: 'brand',
  },
]

export const whyVanpure = [
  {
    title: 'Science-backed formulas',
    description: 'Every ingredient earns its place with evidence, at a dose that does its job.',
  },
  {
    title: 'Certified manufacturing',
    description: 'Made in certified pharmaceutical facilities under strict purity and potency checks.',
  },
  {
    title: 'Natural, bioavailable actives',
    description: 'Herbal extracts and nutrient forms your body can actually absorb and use.',
  },
  {
    title: 'Order in a chat',
    description: 'No accounts, no carts. Pick a quantity and confirm with a real person on WhatsApp.',
  },
] as const

export const howItWorks = [
  {
    title: 'Pick a product',
    description: 'Browse the range and open the product you want to know more about.',
  },
  {
    title: 'Choose your quantity',
    description: 'Select how many strips you need. The total updates as you go.',
  },
  {
    title: 'Confirm on WhatsApp',
    description: 'Your order opens prefilled in WhatsApp. Our team confirms delivery and payment there.',
  },
] as const

export const homeFaqs = [
  {
    question: 'How do I order from Vanpure Pharma?',
    answer:
      'Open a product, choose how many strips you want and tap "Order on WhatsApp". It opens a WhatsApp chat with us with your order already written out. Our team confirms availability, delivery, and payment right there in the chat. Nothing is charged on this website.',
  },
  {
    question: 'Do I need an account?',
    answer: 'No. Ordering happens over WhatsApp, so there is nothing to sign up for and no password to remember.',
  },
  {
    question: 'How are delivery and payment handled?',
    answer:
      'Once your order arrives in our WhatsApp chat, our team confirms availability, shares delivery details for your location and agrees payment with you directly.',
  },
  {
    question: 'Which products are available right now?',
    answer: `${featuredProduct.name} is our first product, launching ${site.launchDateDisplay} at a special release price. More formulas are in development; follow @${site.instagram.handle} to hear about them first.`,
  },
]
