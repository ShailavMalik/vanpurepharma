import { featuredProduct } from './products'
import { site } from './site'

export const founder = {
  name: 'Vansh Choudhary',
  role: 'Founder & Owner, Vanpure Pharma',
  quote: 'Our core commitment is to design science-backed health solutions that keep you vibrant, energised and healthy every day.',
  photo: {
    src: '/media/founder/vansh-choudhary.webp',
    width: 800,
    height: 1100,
    alt: 'Vansh Choudhary, Founder and Owner of Vanpure Pharma',
  },
  avatar: '/media/founder/vansh-choudhary-avatar.webp',
  video: {
    src: '/media/founder/founder-message.mp4',
    poster: '/media/founder/founder-poster.webp',
    title: 'A message from Vansh',
    duration: '0:29',
  },
} as const

export const mission = {
  headline: 'Science-backed supplements, so a small daily habit improves everyday health.',
  paragraphs: [
    'Vanpure Pharma is a new Indian nutraceutical company making dietary supplements for adults. Every formula is evidence-led and made in certified pharmaceutical facilities.',
    `We started with one product, ${featuredProduct.shortName}, launched on ${site.launchDateDisplay}. You order in a WhatsApp chat with our team, so there is always a real person to answer your questions.`,
  ],
} as const

export const values = [
  {
    title: 'Quality you can trust',
    text: 'Made in certified pharmaceutical facilities, with strict purity and potency checks.',
    icon: 'shield',
    bg: 'linear-gradient(150deg, #FFFFFF, #E2F5EB)',
    iconBg: 'linear-gradient(135deg, #10825F, #1C8F9E)',
  },
  {
    title: 'Evidence-based formulations',
    text: 'Actives and doses chosen on evidence, and every one listed openly.',
    icon: 'flask',
    bg: 'linear-gradient(150deg, #FFFFFF, #E3EEFC)',
    iconBg: 'linear-gradient(135deg, #1C8F9E, #4F8ED8)',
  },
  {
    title: 'Eco-friendly practices',
    text: 'Responsible sourcing, minimal packaging and less waste at every step.',
    icon: 'leaf',
    bg: 'linear-gradient(150deg, #FFFFFF, #E2F5EB)',
    iconBg: 'linear-gradient(135deg, #10825F, #3FBF8E)',
  },
] as const
