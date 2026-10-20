import { Link } from 'react-router-dom'
import { featuredProduct, productPath } from '../../data/products'
import { site } from '../../data/site'
import { generalChatUrl } from '../../lib/whatsapp'

export function Footer() {
  return (
    <footer className="relative mt-12 bg-[linear-gradient(180deg,rgba(255,255,255,0),rgba(217,242,230,0.75))] lg:mt-28">
      <div className="container-site pb-6 pt-7 lg:pb-9 lg:pt-12">
        <div className="grid gap-5 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr] lg:gap-8">
          <div>
            <div className="font-display text-xl font-extrabold lg:text-2xl">{site.name}</div>
            <div className="mt-1 text-[13px] text-muted lg:mt-1.5 lg:text-sm">{site.tagline}.</div>
          </div>
          <div className="grid grid-cols-2 gap-4 lg:contents">
            <FooterColumn
              title="Shop"
              links={[
                { label: featuredProduct.shortName, to: productPath(featuredProduct) },
                { label: 'How to order', to: '/#how' },
              ]}
            />
            <FooterColumn
              title="Company"
              links={[
                { label: 'About', to: '/about' },
                { label: 'Instagram', to: site.instagram.url, external: true },
              ]}
            />
          </div>
          <div>
            <div className="hidden text-xs font-extrabold tracking-[1px] text-muted uppercase lg:block">Contact</div>
            <div className="mt-3 text-[13px] leading-[1.9] text-body lg:mt-1 lg:text-[15px] lg:leading-[2.6]">
              WhatsApp{' '}
              <a href={generalChatUrl} target="_blank" rel="noopener noreferrer" className="font-bold text-green">
                {site.whatsapp.display}
              </a>
              <br />
              Instagram{' '}
              <a href={site.instagram.url} target="_blank" rel="noopener noreferrer" className="font-bold text-green">
                @{site.instagram.handle}
              </a>
              <br />
              {site.url.replace('https://', '')}
              {site.email && (
                <>
                  <br />
                  <a href={`mailto:${site.email}`} className="font-bold text-green">
                    {site.email}
                  </a>
                </>
              )}
            </div>
          </div>
        </div>

        <div className="mt-5 flex flex-col gap-2.5 text-[11px] leading-relaxed text-muted lg:mt-8 lg:flex-row lg:items-center lg:justify-between lg:gap-4 lg:border-t lg:border-ink/10 lg:pt-5 lg:text-xs">
          <p className="m-0 max-w-[760px]">{site.disclaimer}</p>
          <p className="m-0">© 2026 {site.name}</p>
        </div>
      </div>
    </footer>
  )
}

function FooterColumn({ title, links }: { title: string; links: { label: string; to: string; external?: boolean }[] }) {
  return (
    <div>
      <div className="text-[11px] font-extrabold tracking-[1px] text-muted uppercase lg:text-xs">{title}</div>
      <ul className="m-0 mt-1 list-none p-0">
        {links.map((link) => (
          <li key={link.label}>
            {link.external ? (
              <a href={link.to} target="_blank" rel="noopener noreferrer" className="flex min-h-10 items-center text-sm font-semibold text-green lg:text-[15px]">
                {link.label}
              </a>
            ) : (
              <Link to={link.to} className="flex min-h-10 items-center text-sm font-semibold text-green no-underline lg:text-[15px]">
                {link.label}
              </Link>
            )}
          </li>
        ))}
      </ul>
    </div>
  )
}
