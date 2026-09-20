import { founder } from '../data/about'
import { faqs } from '../data/faq'
import { product } from '../data/product'
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

export const productJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Product',
  name: product.name,
  description: product.description,
  image: [`${site.url}${product.media.box.src}`],
  brand: { '@type': 'Brand', name: site.name },
  category: 'Dietary Supplement',
  offers: {
    '@type': 'Offer',
    url: `${site.url}/#order`,
    priceCurrency: product.price.currency,
    price: product.price.perStrip,
    priceValidFrom: site.launchDate,
    availability: 'https://schema.org/InStock',
    itemCondition: 'https://schema.org/NewCondition',
    seller: { '@type': 'Organization', name: site.name },
    eligibleQuantity: {
      '@type': 'QuantitativeValue',
      unitText: 'strip of 10 softgels',
      minValue: product.order.minStrips,
      maxValue: product.order.maxStrips,
    },
  },
}

export const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map((faq) => ({
    '@type': 'Question',
    name: faq.question,
    acceptedAnswer: { '@type': 'Answer', text: faq.answer },
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
