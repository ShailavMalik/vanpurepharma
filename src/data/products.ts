export interface Pack {
  strips: number
  days: number
  price: number
  mrp: number
  fullBox?: boolean
}

export interface Ingredient {
  name: string
  dose: string
  /** Percentage of recommended daily allowance, when printed on pack. */
  rda?: number
  pillar: string
}

export interface IngredientGroup {
  id: string
  title: string
  short: string
  items: Ingredient[]
}

export interface Pillar {
  name: string
  source: string
  gradient: string
}

export interface FaqItem {
  question: string
  answer: string
}

export interface GalleryImage {
  src: string
  srcSet: string
  width: number
  height: number
  alt: string
  /** Transparent cut-outs sit on the stage gradient; photos fill the frame. */
  fit: 'contain' | 'cover'
}

export interface Product {
  slug: string
  name: string
  shortName: string
  category: string
  subtitle: string
  description: string
  packs: Pack[]
  softgelsPerStrip: number
  softgelsPerBox: number
  softgelsPerDay: number
  highlights: { label: string; value: string }[]
  trust: { label: string; icon: 'leaf' | 'building' | 'shield' }[]
  gallery: GalleryImage[]
  video: { src: string; poster: string; width: number; height: number; seconds: number }
  stats: { value: string; label: string }[]
  pillars: Pillar[]
  ingredientGroups: IngredientGroup[]
  aboutPoints: { title: string; text: string }[]
  details: { label: string; value: string }[]
  dosageNote: string
  faqs: FaqItem[]
}

const multashva: Product = {
  slug: 'vanpure-multashva',
  name: 'Vanpure Multashva',
  shortName: 'Multashva',
  category: 'Premium Nutraceutical',
  subtitle: 'Complete Vitality & Wellness Formula',
  description:
    'Premium softgels combining herbal adaptogens, vital vitamins, minerals and amino acids to power daily stamina, immune health and an active lifestyle.',
  packs: [
    { strips: 6, days: 30, price: 600, mrp: 720 },
    { strips: 10, days: 50, price: 999, mrp: 1200, fullBox: true },
  ],
  softgelsPerStrip: 10,
  softgelsPerBox: 100,
  softgelsPerDay: 2,
  highlights: [
    { label: 'Ashwagandha', value: '100 mg' },
    { label: 'Vitamin D3', value: '100% RDA' },
    { label: 'Biotin', value: 'hair, skin, nails' },
  ],
  trust: [
    { label: '100% natural ingredients', icon: 'leaf' },
    { label: 'Certified pharma facilities', icon: 'building' },
    { label: 'Purity & potency checked', icon: 'shield' },
  ],
  gallery: [
    {
      src: '/media/product/pack-shot-1600.webp',
      srcSet: '/media/product/pack-shot-400.webp 400w, /media/product/pack-shot-800.webp 800w, /media/product/pack-shot-1600.webp 1600w',
      width: 1600,
      height: 1051,
      alt: 'Vanpure Multashva box: 100 softgel capsules, complete vitality and wellness formula',
      fit: 'contain',
    },
    {
      src: '/media/product/pack-trio-1600.webp',
      srcSet: '/media/product/pack-trio-800.webp 800w, /media/product/pack-trio-1600.webp 1600w',
      width: 1600,
      height: 483,
      alt: 'Three sides of the Vanpure Multashva box showing supplement facts and instructions',
      fit: 'contain',
    },
    {
      src: '/media/product/lifestyle-1200.webp',
      srcSet: '/media/product/lifestyle-600.webp 600w, /media/product/lifestyle-1200.webp 1200w',
      width: 1200,
      height: 692,
      alt: 'Vanpure Multashva box, a 10-softgel strip and a single golden softgel on a marble table',
      fit: 'cover',
    },
  ],
  video: {
    src: '/media/product/product.mp4',
    poster: '/media/product/product-poster.webp',
    width: 848,
    height: 478,
    seconds: 10,
  },
  stats: [
    { value: '15', label: 'actives' },
    { value: '6', label: 'pillars' },
    { value: '2', label: 'a day' },
    { value: '100', label: 'per box' },
  ],
  pillars: [
    { name: 'Immunity', source: 'C · D3 · Folic Acid', gradient: 'linear-gradient(135deg, #CFF3E2, #10825F)' },
    { name: 'Energy', source: 'Ginseng · B-complex', gradient: 'linear-gradient(135deg, #FFE3A6, #D99A2B)' },
    { name: 'Brain & focus', source: 'Choline · L-Tyrosine', gradient: 'linear-gradient(135deg, #D6EAFF, #4F8ED8)' },
    { name: 'Skin, hair & nails', source: 'Biotin · A · B3', gradient: 'linear-gradient(135deg, #FFD6E4, #D9688F)' },
    { name: 'Stress', source: 'Ashwagandha 100 mg', gradient: 'linear-gradient(135deg, #E2DCFF, #6F5BD6)' },
    { name: 'Vitality', source: 'Taurine · L-Leucine', gradient: 'linear-gradient(135deg, #CDEFF2, #1C8F9E)' },
  ],
  ingredientGroups: [
    {
      id: 'herbal',
      title: 'Herbal adaptogens',
      short: 'herbal',
      items: [
        { name: 'Ashwagandha', dose: '100 mg', pillar: 'Stress management' },
        { name: 'Ginseng Extract', dose: '42.5 mg', pillar: 'Energy' },
      ],
    },
    {
      id: 'vitamins',
      title: 'Vitamins & minerals',
      short: 'vitamins & minerals',
      items: [
        { name: 'Vitamin D3', dose: '600 IU', rda: 100, pillar: 'Immunity' },
        { name: 'Folic Acid', dose: '176.4 mcg', rda: 100, pillar: 'Immunity' },
        { name: 'Nicotinamide', dose: '18 mg', rda: 100, pillar: 'Skin, hair & nails' },
        { name: 'Biotin', dose: '30 mcg', rda: 75, pillar: 'Skin, hair & nails' },
        { name: 'Vitamin B6', dose: '1.2 mg', rda: 63, pillar: 'Energy' },
        { name: 'Vitamin C', dose: '40 mg', rda: 50, pillar: 'Immunity' },
        { name: 'Vitamin A', dose: '0.5 mg', rda: 50, pillar: 'Skin, hair & nails' },
        { name: 'Vitamin B12', dose: '1 mcg', rda: 45, pillar: 'Energy' },
        { name: 'Calcium Pantothenate', dose: '0.4 mg', rda: 8, pillar: 'Energy' },
      ],
    },
    {
      id: 'amino',
      title: 'Amino acids',
      short: 'amino acids',
      items: [
        { name: 'Choline', dose: '10 mg', pillar: 'Brain & cognitive' },
        { name: 'L-Tyrosine', dose: '10 mg', pillar: 'Brain & cognitive' },
        { name: 'Taurine', dose: '10 mg', pillar: 'Overall vitality' },
        { name: 'L-Leucine', dose: '10 mg', pillar: 'Overall vitality' },
      ],
    },
  ],
  aboutPoints: [
    { title: '15 active ingredients', text: 'in each softgel: herbal adaptogens, vitamins, minerals and amino acids.' },
    { title: 'Stress management', text: 'with Ashwagandha 100 mg.' },
    { title: 'Immunity support', text: 'with Vitamin C, Vitamin D3 (100% RDA) and Folic Acid.' },
    { title: 'Energy', text: 'from Ginseng extract and B-complex vitamins.' },
    { title: 'Skin, hair and nails', text: 'with Biotin, Vitamin A and Nicotinamide.' },
    { title: 'Brain and focus', text: 'with Choline and L-Tyrosine; vitality with Taurine and L-Leucine.' },
  ],
  details: [
    { label: 'Category', value: 'Premium Nutraceutical' },
    { label: 'Form', value: 'Softgel capsule' },
    { label: 'Pack', value: '10 softgels per strip · 100 per box' },
    { label: 'Dose', value: '2 softgels a day, after a meal, with water' },
    { label: 'Storage', value: 'Below 25 °C, away from light and moisture' },
    { label: 'Suitable for', value: 'Adults' },
  ],
  dosageNote:
    'For adults. Take 2 softgels a day after a meal, with water. Consult a health professional before use if pregnant, nursing, or on medication.',
  faqs: [
    { question: 'How do I take it?', answer: '2 softgels daily after a meal, with water.' },
    {
      question: 'How long does a pack last?',
      answer: '6 strips (60 softgels) last 30 days. 10 strips (100 softgels, one full box) last 50 days.',
    },
    {
      question: 'How do I pay and get it delivered?',
      answer:
        'Tap Order on WhatsApp. Our team confirms availability, delivery and payment with you in the chat. Nothing is charged on this site.',
    },
    { question: 'Do I need an account?', answer: 'No. You only need WhatsApp.' },
    {
      question: 'Who is it for?',
      answer: 'Adults. Consult a health professional before use if you are pregnant, nursing, or on medication.',
    },
  ],
}

export const products: Product[] = [multashva]

export const featuredProduct = multashva

export function getProduct(slug: string | undefined): Product | undefined {
  return products.find((product) => product.slug === slug)
}

export function productPath(product: Product): string {
  return `/products/${product.slug}`
}

export function ingredientsPath(product: Product): string {
  return `${productPath(product)}/ingredients`
}

export function orderPath(product: Product): string {
  return `${productPath(product)}#order`
}

export function lowestPrice(product: Product): number {
  return Math.min(...product.packs.map((pack) => pack.price))
}

export function activeCount(product: Product): number {
  return product.ingredientGroups.reduce((sum, group) => sum + group.items.length, 0)
}
