export type PillarIcon = 'shield' | 'zap' | 'brain' | 'sparkles' | 'leaf' | 'heart'

export interface Pillar {
  icon: PillarIcon
  title: string
  description: string
}

export interface Ingredient {
  name: string
  strength: string
  /** Percentage of recommended daily allowance, when printed on pack. */
  rda?: number
  benefit: string
}

export interface IngredientGroup {
  id: string
  label: string
  shortLabel: string
  items: Ingredient[]
}

export interface FaqItem {
  question: string
  answer: string
}

export interface ProductImage {
  src: string
  srcSet: string
  width: number
  height: number
  alt: string
}

export interface Product {
  slug: string
  name: string
  category: string
  subtitle: string
  shortDescription: string
  description: string
  badges: string[]
  highlights: string[]
  trust: string[]
  softgelsPerBox: number
  softgelsPerStrip: number
  stripsPerBox: number
  softgelsPerDay: number
  price: { currency: 'INR'; mrpPerStrip: number; perStrip: number }
  order: { minStrips: number; maxStrips: number; presets: number[] }
  media: {
    image: ProductImage
    /** Small variant for cards, thumbnails and the buy box. */
    thumb: string
    video?: { src: string; poster: string; width: number; height: number }
  }
  stats: { value: number; label: string }[]
  pillars: Pillar[]
  ingredientGroups: IngredientGroup[]
  dosageSteps: { title: string; description: string }[]
  usageNotes: string[]
  qualityPoints: { title: string; description: string }[]
  faqs: FaqItem[]
}

const multashva: Product = {
  slug: 'vanpure-multashva',
  name: 'Vanpure Multashva',
  category: 'Premium Nutraceutical',
  subtitle: 'Complete Vitality & Wellness Formula',
  shortDescription:
    'Daily softgel with Ashwagandha, Ginseng, Biotin, Vitamin D3 and 15 active nutrients for immunity, energy, focus and calm.',
  description:
    'Scientifically formulated premium softgel capsules combining herbal adaptogens, vital vitamins, minerals, and amino acids to power your daily stamina, immune health, and active lifestyle.',
  badges: ['Launch offer', 'New'],
  highlights: ['Ashwagandha 100 mg', 'Vitamin D3 · 100% RDA', 'Biotin for hair, skin & nails'],
  trust: ['100% natural ingredients', 'Certified pharma facilities', '100 softgels per box'],
  softgelsPerBox: 100,
  softgelsPerStrip: 10,
  stripsPerBox: 10,
  softgelsPerDay: 2,
  price: { currency: 'INR', mrpPerStrip: 120, perStrip: 75 },
  order: { minStrips: 1, maxStrips: 20, presets: [1, 3, 5, 10] },
  media: {
    image: {
      src: '/media/product/multashva-box-1600.webp',
      srcSet:
        '/media/product/multashva-box-400.webp 400w, /media/product/multashva-box-800.webp 800w, /media/product/multashva-box-1600.webp 1600w',
      width: 1600,
      height: 1050,
      alt: 'Vanpure Multashva box: 100 softgel capsules, complete vitality and wellness formula',
    },
    thumb: '/media/product/multashva-box-400.webp',
    video: {
      src: '/media/product/product.mp4',
      poster: '/media/product/product-poster.webp',
      width: 848,
      height: 478,
    },
  },
  stats: [
    { value: 15, label: 'active ingredients' },
    { value: 6, label: 'pillars of wellness' },
    { value: 100, label: 'softgels per box' },
    { value: 2, label: 'softgels a day' },
  ],
  pillars: [
    {
      icon: 'shield',
      title: 'Immunity Support',
      description:
        'Vitamin C, Vitamin D3, and Folic Acid work together to strengthen immune defence and guard against environmental pathogens.',
    },
    {
      icon: 'zap',
      title: 'Energy Booster',
      description:
        'Ginseng Extract and B-Complex vitamins enhance cellular ATP energy output, easing physical tiredness and endurance loss.',
    },
    {
      icon: 'brain',
      title: 'Brain & Cognitive',
      description:
        'Choline and L-Tyrosine support neurotransmitter synthesis, sharpening mental clarity, focus, and memory recall.',
    },
    {
      icon: 'sparkles',
      title: 'Skin, Hair & Nails',
      description:
        'High-potency Biotin with Vitamin A and Nicotinamide nourishes hair roots, promotes radiant skin, and repairs brittle nails.',
    },
    {
      icon: 'leaf',
      title: 'Stress Management',
      description:
        'Pure Ashwagandha (100 mg) helps lower cortisol, promoting emotional stability, calm focus, and stress adaptation.',
    },
    {
      icon: 'heart',
      title: 'Overall Vitality',
      description:
        'Taurine and essential amino acids (L-Leucine) accelerate muscle recovery, support metabolic rate, and improve heart function.',
    },
  ],
  ingredientGroups: [
    {
      id: 'herbal',
      label: 'Herbal Adaptogens',
      shortLabel: 'Herbal',
      items: [
        {
          name: 'Ashwagandha',
          strength: '100 mg',
          benefit: 'Reduces stress and cortisol, restores vitality, boosts physical endurance and mental vigour.',
        },
        {
          name: 'Ginseng Extract',
          strength: '42.5 mg',
          benefit: 'Enhances energy levels, combats chronic fatigue, and improves blood circulation and stamina.',
        },
      ],
    },
    {
      id: 'vitamins',
      label: 'Vitamins & Minerals',
      shortLabel: 'Vitamins',
      items: [
        {
          name: 'Biotin (Vitamin B7)',
          strength: '30 mcg',
          rda: 75,
          benefit: 'Stimulates keratin synthesis for healthy hair growth, glowing skin, and strong nails.',
        },
        {
          name: 'Vitamin D3 (Cholecalciferol)',
          strength: '600 IU',
          rda: 100,
          benefit: 'Facilitates calcium absorption, maintains bone density, and reinforces immune defence.',
        },
        {
          name: 'Vitamin C (Ascorbic Acid)',
          strength: '40 mg',
          rda: 50,
          benefit: 'Provides powerful antioxidant protection, boosts immunity, and aids tissue repair.',
        },
        {
          name: 'Nicotinamide (Vitamin B3)',
          strength: '18 mg',
          rda: 100,
          benefit: 'Supports cellular energy conversion, maintains a healthy skin barrier, and lowers fatigue.',
        },
        {
          name: 'Pyridoxine HCl (Vitamin B6)',
          strength: '1.2 mg',
          rda: 63,
          benefit: 'Essential for neurotransmitter production, nervous system health, and protein metabolism.',
        },
        {
          name: 'Folic Acid (Vitamin B9)',
          strength: '176.4 mcg',
          rda: 100,
          benefit: 'Promotes red blood cell formation, supports cellular regeneration, and reduces exhaustion.',
        },
        {
          name: 'Cyanocobalamin (Vitamin B12)',
          strength: '1 mcg',
          rda: 45,
          benefit: 'Crucial for nerve health, DNA synthesis, and preventing deficiency-related fatigue.',
        },
        {
          name: 'Vitamin A (Retinyl Palmitate)',
          strength: '0.5 mg',
          rda: 50,
          benefit: 'Supports clear vision, mucosal immunity, and cellular growth.',
        },
        {
          name: 'Calcium Pantothenate',
          strength: '0.4 mg',
          rda: 8,
          benefit: 'Aids hormone synthesis and the conversion of fatty acids into usable cellular energy.',
        },
      ],
    },
    {
      id: 'amino',
      label: 'Amino Acids & Brain Boosters',
      shortLabel: 'Amino acids',
      items: [
        {
          name: 'Choline',
          strength: '10 mg',
          benefit: 'Supports cognitive performance, brain cell structure, and healthy lipid metabolism.',
        },
        {
          name: 'L-Tyrosine',
          strength: '10 mg',
          benefit: 'Supports neurotransmitter production for focus and mental performance under pressure.',
        },
        {
          name: 'Taurine',
          strength: '10 mg',
          benefit: 'Enhances muscle stamina, cardiovascular efficiency, and metabolic endurance.',
        },
        {
          name: 'L-Leucine',
          strength: '10 mg',
          benefit: 'Protects muscle tissue, improves mental resilience during stress, and supports alertness.',
        },
      ],
    },
  ],
  dosageSteps: [
    { title: 'Take 2 softgels', description: 'One daily serving is two softgel capsules.' },
    { title: 'After a meal', description: 'Swallow with a glass of water after eating.' },
    { title: 'Every day', description: 'Consistency is what builds lasting vitality.' },
  ],
  usageNotes: [
    'Or as directed by a health professional.',
    'Store in a cool, dry place below 25°C, protected from light and moisture.',
    'Formulated for adult dietary supplementation.',
  ],
  qualityPoints: [
    { title: 'Premium natural ingredients', description: 'Bioavailable nutrients your body can actually use.' },
    { title: 'Certified pharmaceutical facilities', description: 'Manufactured in state-of-the-art certified plants.' },
    { title: 'Strict quality standards', description: 'Every batch checked for purity and optimal potency.' },
  ],
  faqs: [
    {
      question: 'How many softgels are in a strip?',
      answer:
        'Each strip has 10 softgel capsules. A full box contains 10 strips, which is 100 softgels. At two softgels a day, one strip lasts five days and a box lasts fifty.',
    },
    {
      question: 'How should I take Vanpure Multashva?',
      answer:
        'Take two softgel capsules daily after a meal with a glass of water, or as directed by a health professional. Store the pack in a cool, dry place below 25°C, away from light and moisture.',
    },
    {
      question: 'Who is it for?',
      answer:
        'It is a nutraceutical formulated for adult dietary supplementation. If you are pregnant, nursing, on medication, or managing a medical condition, please consult a health professional before use.',
    },
    {
      question: 'What is the launch price?',
      answer:
        'The special release price is ₹75 per strip against an MRP of ₹120 per strip. The launch offer applies to orders placed through WhatsApp.',
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

export function orderPath(product: Product): string {
  return `${productPath(product)}#order`
}
