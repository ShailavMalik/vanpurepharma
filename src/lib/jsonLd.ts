import { founder } from '../data/about'
import { homeFaqs } from '../data/home'
import { productPath, type FaqItem, type Product } from '../data/products'
import { site } from '../data/site'

export const organizationJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: site.name,
  url: site.url,
  logo: `${site.url}/media/logo/vanpure-logo.png`,
  sameAs: [site.instagram.url],
  founder: { '@type': 'Person', name: founder.name },
  contactPoint: {
    '@type': 'ContactPoint',
    telephone: `+${site.whatsapp.number}`,
    contactType: 'sales',
    availableLanguage: ['en', 'hi'],
  },
}

export const websiteJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: site.name,
  url: site.url,
}

export function faqJsonLd(faqs: FaqItem[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: { '@type': 'Answer', text: faq.answer },
    })),
  }
}

export const homeFaqJsonLd = faqJsonLd(homeFaqs)

export function productJsonLd(product: Product) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    description: product.description,
    image: product.gallery.map((image) => `${site.url}${image.src}`),
    brand: { '@type': 'Brand', name: site.name },
    category: 'Dietary Supplement',
    url: `${site.url}${productPath(product)}`,
    offers: product.packs.map((pack) => ({
      '@type': 'Offer',
      name: `${pack.days}-day pack (${pack.strips} strips)`,
      url: `${site.url}${productPath(product)}#order`,
      priceCurrency: 'INR',
      price: pack.price,
      priceValidFrom: site.launchDate,
      availability: 'https://schema.org/InStock',
      itemCondition: 'https://schema.org/NewCondition',
      seller: { '@type': 'Organization', name: site.name },
    })),
  }
}

export function breadcrumbJsonLd(items: { name: string; path: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: `${site.url}${item.path}`,
    })),
  }
}

export const aboutPageJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'AboutPage',
  name: `About ${site.name}`,
  url: `${site.url}/about`,
  mainEntity: {
    '@type': 'Organization',
    name: site.name,
    url: site.url,
    founder: {
      '@type': 'Person',
      name: founder.name,
      jobTitle: 'Founder & Owner',
      image: `${site.url}${founder.photo.src}`,
      worksFor: { '@type': 'Organization', name: site.name },
    },
  },
}
