import { founder } from '../data/about'
import { homeFaqs } from '../data/home'
import { productPath, products, type FaqItem, type Product } from '../data/products'
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
    image: [`${site.url}${product.media.image.src}`],
    brand: { '@type': 'Brand', name: site.name },
    category: 'Dietary Supplement',
    url: `${site.url}${productPath(product)}`,
    offers: {
      '@type': 'Offer',
      url: `${site.url}${productPath(product)}#order`,
      priceCurrency: product.price.currency,
      price: product.price.perStrip,
      priceValidFrom: site.launchDate,
      availability: 'https://schema.org/InStock',
      itemCondition: 'https://schema.org/NewCondition',
      seller: { '@type': 'Organization', name: site.name },
      eligibleQuantity: {
        '@type': 'QuantitativeValue',
        unitText: `strip of ${product.softgelsPerStrip} softgels`,
        minValue: product.order.minStrips,
        maxValue: product.order.maxStrips,
      },
    },
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

export const productListJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  name: `${site.name} products`,
  itemListElement: products.map((product, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    url: `${site.url}${productPath(product)}`,
    name: product.name,
  })),
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
