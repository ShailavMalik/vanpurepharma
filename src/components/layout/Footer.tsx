import { InstagramIcon, WhatsAppIcon } from '../ui/BrandIcons'
import { Link } from 'react-router-dom'
import { featuredProduct, orderPath, productPath } from '../../data/products'
import { site } from '../../data/site'
import { generalChatUrl } from '../../lib/whatsapp'

const productLinks = [
  { label: 'All products', to: '/products' },
  { label: featuredProduct.name, to: productPath(featuredProduct) },
  { label: 'Ingredients', to: `${productPath(featuredProduct)}#ingredients` },
  { label: 'Order on WhatsApp', to: orderPath(featuredProduct) },
]

const companyLinks = [
  { label: 'About us', to: '/about' },
  { label: 'Founder', to: '/about#founder' },
  { label: 'How to order', to: '/#how-it-works' },
  { label: 'FAQ', to: '/#faq' },
]

export function Footer() {
  return (
    <footer className="relative mt-16 border-t border-white/[0.06] pb-28 md:pb-10">
      <div className="container-site pt-14">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <p className="font-display text-[clamp(2rem,5vw,3rem)] font-bold leading-none tracking-tight">
              <span className="text-gradient-brand">Vanpure</span>
              <span className="ml-2 font-medium text-fg/80">Pharma</span>
            </p>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted">{site.tagline}.</p>
            <div className="mt-6 flex flex-wrap gap-2">
              <a
                href={generalChatUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="glass-1 inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm text-fg/90 transition-colors hover:bg-white/10"
              >
                <WhatsAppIcon className="size-4 text-wa" /> WhatsApp
              </a>
              <a
                href={site.instagram.url}
                target="_blank"
                rel="noopener noreferrer"
                className="glass-1 inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm text-fg/90 transition-colors hover:bg-white/10"
              >
                <InstagramIcon className="size-4" /> @{site.instagram.handle}
              </a>
            </div>
          </div>

          <FooterColumn title="Product" links={productLinks} />
          <FooterColumn title="Company" links={companyLinks} />

          <div>
            <p className="eyebrow mb-4 text-fg/70">Contact</p>
            <ul className="space-y-2 text-sm text-muted">
              <li>
                <a href={generalChatUrl} target="_blank" rel="noopener noreferrer" className="hover:text-fg">
                  {site.whatsapp.display}
                </a>
              </li>
              {site.email && (
                <li>
                  <a href={`mailto:${site.email}`} className="hover:text-fg">
                    {site.email}
                  </a>
                </li>
              )}
              {site.address && <li className="leading-relaxed">{site.address}</li>}
              {site.fssaiLicence && <li>FSSAI Lic. No. {site.fssaiLicence}</li>}
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-white/[0.06] pt-6 text-xs text-muted/80 md:flex-row md:items-center md:justify-between">
          <p>© {new Date().getFullYear()} {site.name}. All rights reserved.</p>
          <p className="max-w-xl leading-relaxed">
            Nutraceutical for adults. Not intended to diagnose, treat, cure or prevent any disease. Consult a health
            professional before use if pregnant, nursing, or on medication.
          </p>
        </div>
      </div>
    </footer>
  )
}

function FooterColumn({ title, links }: { title: string; links: { label: string; to: string }[] }) {
  return (
    <div>
      <p className="eyebrow mb-4 text-fg/70">{title}</p>
      <ul className="space-y-2">
        {links.map((link) => (
          <li key={link.to}>
            <Link to={link.to} className="text-sm text-muted transition-colors hover:text-fg">
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
