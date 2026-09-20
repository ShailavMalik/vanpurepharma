import { ArrowRight, Bell } from 'lucide-react'
import { Link } from 'react-router-dom'
import { orderPath, productPath, products, type Product } from '../../data/products'
import { site } from '../../data/site'
import { formatInr } from '../../lib/format'
import { WhatsAppIcon } from '../ui/BrandIcons'
import { Button } from '../ui/Button'
import { GlassCard } from '../ui/GlassCard'
import { RevealGroup, RevealItem } from '../ui/Reveal'
import { SectionHeading } from '../ui/SectionHeading'

interface ProductsGridProps {
  /** Hide the heading when the parent page supplies its own. */
  heading?: boolean
}

export function ProductsGrid({ heading = true }: ProductsGridProps) {
  return (
    <section id="products" className="section-pad scroll-mt-24">
      <div className="container-site">
        {heading && (
          <SectionHeading
            eyebrow="Products"
            title={
              <>
                Made to be taken <span className="text-gradient-brand">every day.</span>
              </>
            }
            description="Our range starts with one complete formula. Each product is ordered the same way: pick a quantity, confirm on WhatsApp."
          />
        )}
        <RevealGroup className={heading ? 'mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3' : 'grid gap-5 md:grid-cols-2 lg:grid-cols-3'}>
          {products.map((product) => (
            <RevealItem key={product.slug} className="lg:col-span-2">
              <ProductCard product={product} />
            </RevealItem>
          ))}
          <RevealItem>
            <ComingSoonCard />
          </RevealItem>
        </RevealGroup>
      </div>
    </section>
  )
}

function ProductCard({ product }: { product: Product }) {
  return (
    <GlassCard spotlight border="brand" className="group flex h-full flex-col overflow-hidden lg:flex-row">
      <Link
        to={productPath(product)}
        className="relative flex min-h-[240px] items-center justify-center overflow-hidden bg-bg-2/70 p-8 lg:w-[46%] lg:shrink-0"
      >
        <span
          aria-hidden
          className="absolute left-1/2 top-1/2 h-[70%] w-[80%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold/20 blur-[60px] transition-opacity duration-500 group-hover:opacity-100 lg:opacity-70"
        />
        <img
          src={product.media.image.src}
          srcSet={product.media.image.srcSet}
          sizes="(min-width: 1024px) 380px, (min-width: 768px) 45vw, 90vw"
          width={product.media.image.width}
          height={product.media.image.height}
          alt={product.media.image.alt}
          loading="lazy"
          decoding="async"
          className="relative w-full max-w-[360px] drop-shadow-[0_24px_40px_rgba(0,0,0,0.6)] transition-transform duration-500 ease-out group-hover:scale-[1.04]"
        />
        <span className="sr-only">View {product.name}</span>
        <span className="absolute left-4 top-4 flex flex-wrap gap-2">
          {product.badges.map((badge) => (
            <span
              key={badge}
              className="rounded-full border border-gold/40 bg-bg/70 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wider text-gold"
            >
              {badge}
            </span>
          ))}
        </span>
      </Link>

      <div className="relative flex flex-1 flex-col p-6 sm:p-7">
        <p className="eyebrow text-gradient-brand">{product.category}</p>
        <h3 className="mt-2 text-2xl font-bold leading-tight">
          <Link to={productPath(product)} className="transition-colors hover:text-emerald">
            {product.name}
          </Link>
        </h3>
        <p className="mt-1 text-sm font-medium text-fg/80">{product.subtitle}</p>
        <p className="mt-3 text-[15px] leading-relaxed text-muted">{product.shortDescription}</p>

        <ul className="mt-4 flex flex-wrap gap-2">
          {product.highlights.map((item) => (
            <li key={item} className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-fg/85">
              {item}
            </li>
          ))}
        </ul>

        <div className="mt-6 flex flex-wrap items-end justify-between gap-4 border-t border-white/[0.08] pt-5">
          <p className="font-display leading-none">
            <span className="text-gradient-gold text-3xl font-bold tabular">{formatInr(product.price.perStrip)}</span>
            <span className="ml-1 text-sm font-medium text-muted">/strip</span>
            <span className="ml-2 text-sm text-muted/70 line-through tabular">{formatInr(product.price.mrpPerStrip)}</span>
          </p>
          <p className="text-xs text-muted">
            {product.softgelsPerStrip} softgels per strip · {product.softgelsPerBox} per box
          </p>
        </div>

        <div className="mt-5 flex flex-col gap-3 sm:flex-row">
          <Button to={orderPath(product)} icon={<WhatsAppIcon />} className="sm:flex-1">
            Order on WhatsApp
          </Button>
          <Button to={productPath(product)} variant="ghost" iconRight={<ArrowRight />} className="sm:flex-1">
            View details
          </Button>
        </div>
      </div>
    </GlassCard>
  )
}

function ComingSoonCard() {
  return (
    <GlassCard tier={1} className="flex h-full min-h-[320px] flex-col items-center justify-center border-dashed border-white/15 p-8 text-center">
      <span className="flex size-14 items-center justify-center rounded-2xl bg-white/5 text-violet">
        <Bell className="size-6" />
      </span>
      <h3 className="mt-5 text-xl font-semibold">More formulas coming soon</h3>
      <p className="mt-2 max-w-xs text-sm leading-relaxed text-muted">
        The Vanpure range is growing. Follow us on Instagram to hear about new products the moment they launch.
      </p>
      <a
        href={site.instagram.url}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-emerald transition-colors hover:text-fg"
      >
        Follow @{site.instagram.handle} <ArrowRight className="size-4" />
      </a>
    </GlassCard>
  )
}
