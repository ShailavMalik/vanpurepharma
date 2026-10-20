import { featuredProduct, productPath } from './products'
import { site } from './site'

export interface Offer {
  id: string
  badge: string
  title: string
  subline: string
  saving: string
  tone: 'light' | 'dark'
  image: 'pack' | 'trio'
  to: string
}

const [starter, fullBox] = featuredProduct.packs

export const offers: Offer[] = [
  {
    id: 'starter',
    badge: 'Launch offer',
    title: `${starter.days} days\nfor ₹${starter.price}`,
    subline: `${starter.strips} strips`,
    saving: `save ₹${starter.mrp - starter.price}`,
    tone: 'light',
    image: 'pack',
    to: productPath(featuredProduct),
  },
  {
    id: 'full-box',
    badge: 'Full box',
    title: `${fullBox.days} days\nfor ₹${fullBox.price}`,
    subline: `${fullBox.strips} strips`,
    saving: `save ₹${fullBox.mrp - fullBox.price}`,
    tone: 'dark',
    image: 'trio',
    to: productPath(featuredProduct),
  },
]

export const whyVanpure = [
  {
    n: '01',
    title: 'Science-backed formulas',
    text: 'Evidence-led choice of actives and doses.',
    icon: 'flask',
    bg: 'linear-gradient(150deg, #FFFFFF, #E2F5EB)',
    glow: 'rgba(110,214,170,0.5)',
    iconBg: 'linear-gradient(135deg, #10825F, #1C8F9E)',
  },
  {
    n: '02',
    title: 'Certified manufacturing',
    text: 'Made in certified pharmaceutical facilities.',
    icon: 'building',
    bg: 'linear-gradient(150deg, #FFFFFF, #E3EEFC)',
    glow: 'rgba(140,190,255,0.5)',
    iconBg: 'linear-gradient(135deg, #1C8F9E, #4F8ED8)',
  },
  {
    n: '03',
    title: 'Natural, bioavailable actives',
    text: '100% natural ingredients in a softgel.',
    icon: 'leaf',
    bg: 'linear-gradient(150deg, #FFFFFF, #FBF1DA)',
    glow: 'rgba(240,216,148,0.6)',
    iconBg: 'linear-gradient(135deg, #C9A44C, #B97A14)',
  },
  {
    n: '04',
    title: 'A real person to talk to',
    text: 'You order in a WhatsApp chat with our team.',
    icon: 'chat',
    bg: 'linear-gradient(150deg, #FFFFFF, #E2F5EB)',
    glow: 'rgba(110,214,170,0.5)',
    iconBg: 'linear-gradient(135deg, #10825F, #3FBF8E)',
  },
] as const

export const orderSteps = [
  { title: 'Pick your pack', text: `${starter.days} days or ${fullBox.days} days.` },
  { title: 'Tap Order on WhatsApp', text: 'Your order is typed in for you. Just send it.' },
  { title: 'Confirm in the chat', text: 'We confirm delivery and payment with you. Nothing is charged on this site.' },
] as const

export const reels = [1, 2, 3, 4].map((n) => ({
  id: `reel-${n}`,
  src: `/media/videos/reel-${n}.mp4`,
  poster: `/media/videos/reel-${n}-poster.webp`,
  title: `Multashva video ${n}`,
}))

export const homeFaqs = [
  {
    question: 'How do I order?',
    answer: `Open ${featuredProduct.shortName}, pick ${starter.strips} or ${fullBox.strips} strips and tap Order on WhatsApp. Your order is typed into the chat for you.`,
  },
  { question: 'Do I need an account?', answer: 'No. There is no sign-up or login. You only need WhatsApp.' },
  {
    question: 'How do delivery and payment work?',
    answer:
      'Our team confirms availability, delivery and payment with you in the WhatsApp chat. Nothing is charged on this site.',
  },
  {
    question: 'What can I buy right now?',
    answer: `${featuredProduct.name}, in a ${starter.days}-day pack (${starter.strips} strips) or a ${fullBox.days}-day pack (${fullBox.strips} strips, one full box).`,
  },
]

export const founderQuote = {
  name: 'Vansh Choudhary',
  role: 'Founder & Owner',
  quote: 'Our core commitment is to design science-backed health solutions that keep you vibrant, energised and healthy every day.',
  avatar: '/media/founder/vansh-choudhary-avatar.webp',
}

export const launchedLabel = `Just launched: ${featuredProduct.shortName}`

export const askUrlText = `Hi ${site.name.split(' ')[0]}, I have a question about ${featuredProduct.shortName}.`
