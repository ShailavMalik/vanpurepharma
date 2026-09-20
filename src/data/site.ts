export const site = {
  name: 'Vanpure Pharma',
  tagline: 'Science-backed nutraceuticals for everyday vitality',
  url: 'https://vanpurepharma.com',
  whatsapp: {
    /** International format without "+", as required by wa.me links. */
    number: '917900556609',
    display: '+91 79005 56609',
  },
  instagram: {
    handle: 'vanpurepharma',
    url: 'https://instagram.com/vanpurepharma',
  },
  /** Fill these in when available; the UI hides empty values. */
  email: '',
  address: '',
  fssaiLicence: '',
  launchDate: '2026-09-22',
  launchDateDisplay: '22 Sep 2026',
} as const

export const navLinks = [
  { label: 'Product', href: '/#product' },
  { label: 'Benefits', href: '/#benefits' },
  { label: 'Ingredients', href: '/#ingredients' },
  { label: 'About', href: '/about' },
] as const
