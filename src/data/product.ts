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

export const product = {
  name: 'Vanpure Multashva',
  slug: 'vanpure-multashva',
  category: 'Premium Nutraceutical',
  subtitle: 'Complete Vitality & Wellness Formula',
  description:
    'Scientifically formulated premium softgel capsules combining herbal adaptogens, vital vitamins, minerals, and amino acids to power your daily stamina, immune health, and active lifestyle.',
  softgelsPerBox: 100,
  softgelsPerStrip: 10,
  stripsPerBox: 10,
  softgelsPerDay: 2,
  price: {
    currency: 'INR',
    mrpPerStrip: 120,
    perStrip: 75,
  },
  order: {
    minStrips: 1,
    maxStrips: 20,
    presets: [1, 3, 5, 10],
  },
  media: {
    box: {
      src: '/media/product/multashva-box-1600.webp',
      srcSet: '/media/product/multashva-box-800.webp 800w, /media/product/multashva-box-1600.webp 1600w',
      width: 1600,
      height: 1050,
      alt: 'Vanpure Multashva box: 100 softgel capsules, complete vitality and wellness formula',
    },
    video: {
      src: '/media/product/product.mp4',
      poster: '/media/product/product-poster.webp',
      width: 848,
      height: 478,
    },
  },
  trust: ['100% natural ingredients', 'Certified pharma facilities', '100 softgels per box'],
  heroChips: ['Ashwagandha 100 mg', 'Vitamin D3 · 100% RDA', 'Biotin for hair, skin & nails'],
} as const

export const stats = [
  { value: 15, label: 'active ingredients' },
  { value: 6, label: 'pillars of wellness' },
  { value: 100, label: 'softgels per box' },
  { value: 2, label: 'softgels a day' },
] as const

export const pillars: Pillar[] = [
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
]

export const ingredientGroups: IngredientGroup[] = [
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
]

export const dosageSteps = [
  { title: 'Take 2 softgels', description: 'One daily serving is two softgel capsules.' },
  { title: 'After a meal', description: 'Swallow with a glass of water after eating.' },
  { title: 'Every day', description: 'Consistency is what builds lasting vitality.' },
] as const

export const usageNotes = [
  'Or as directed by a health professional.',
  'Store in a cool, dry place below 25°C, protected from light and moisture.',
  'Formulated for adult dietary supplementation.',
] as const

export const qualityPoints = [
  { title: 'Premium natural ingredients', description: 'Bioavailable nutrients your body can actually use.' },
  { title: 'Certified pharmaceutical facilities', description: 'Manufactured in state-of-the-art certified plants.' },
  { title: 'Strict quality standards', description: 'Every batch checked for purity and optimal potency.' },
] as const
