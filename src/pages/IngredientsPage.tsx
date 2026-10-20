import { Link, useParams } from 'react-router-dom'
import { Seo } from '../components/seo/Seo'
import { Breadcrumb } from '../components/ui/Breadcrumb'
import { Button } from '../components/ui/Button'
import { ChevronLeftIcon } from '../components/ui/Icons'
import { StickyBar } from '../components/ui/StickyBar'
import { activeCount, getProduct, ingredientsPath, productPath } from '../data/products'
import { site } from '../data/site'
import { breadcrumbJsonLd } from '../lib/jsonLd'
import { NotFoundPage } from './NotFoundPage'

export function IngredientsPage() {
  const { slug } = useParams()
  const product = getProduct(slug)
  if (!product) return <NotFoundPage />
  const total = activeCount(product)

  return (
    <>
      <Seo
        title={`${product.name} ingredients: ${total} actives per softgel | ${site.name}`}
        description={`Every active in ${product.name} with its dose, % of recommended daily allowance where known, and the wellness pillar it supports.`}
        path={ingredientsPath(product)}
        jsonLd={breadcrumbJsonLd([
          { name: 'Home', path: '/' },
          { name: product.shortName, path: productPath(product) },
          { name: 'Ingredients', path: ingredientsPath(product) },
        ])}
      />

      <div className="sticky top-0 z-30 -mt-2 flex items-center gap-2 bg-[rgba(217,242,230,0.92)] py-2.5 pr-4 pl-2 lg:hidden">
        <Link to={productPath(product)} aria-label="Back to product" className="flex size-11 items-center justify-center rounded-full bg-white text-ink shadow-[0_4px_12px_-6px_rgba(15,31,25,0.3)]">
          <ChevronLeftIcon />
        </Link>
        <span className="text-base font-extrabold">Ingredients</span>
      </div>

      <div className="container-site hidden pt-5 lg:block">
        <Breadcrumb items={[{ label: 'Home', to: '/' }, { label: product.shortName, to: productPath(product) }, { label: 'Ingredients' }]} />
      </div>

      <section className="container-site mt-2 lg:mt-6 lg:flex lg:flex-wrap lg:items-end lg:justify-between lg:gap-6">
        <div className="lg:max-w-[640px]">
          <div className="eyebrow">{product.name}</div>
          <h1 className="m-0 mt-1.5 font-display text-[32px] leading-[1.02] font-bold tracking-[-0.8px] lg:mt-2 lg:text-[56px] lg:leading-[0.98] lg:font-extrabold lg:tracking-[-1.6px]">
            {total} actives in every softgel
          </h1>
          <p className="m-0 mt-2.5 text-sm leading-[1.55] text-muted lg:mt-3.5 lg:text-[17px] lg:leading-relaxed">
            Dose, % of recommended daily allowance (RDA) where known, and the pillar each one supports.
          </p>
        </div>
        <div className="mt-4 grid grid-cols-3 gap-2 text-center lg:min-w-[320px] lg:gap-2.5">
          {product.ingredientGroups.map((group) => (
            <div key={group.id} className="rounded-[18px] bg-white/85 px-1.5 py-3 shadow-[0_10px_22px_-16px_rgba(15,31,25,0.4)] lg:rounded-[20px] lg:px-2.5 lg:py-4">
              <div className="font-display text-2xl font-bold lg:text-[30px] lg:font-extrabold">{group.items.length}</div>
              <div className="text-[11px] text-muted lg:text-xs">{group.short}</div>
            </div>
          ))}
        </div>
      </section>

      <div className="container-site mt-2 lg:mt-9 lg:grid lg:grid-cols-3 lg:items-start lg:gap-5">
        {product.ingredientGroups.map((group) => (
          <section key={group.id} className="mt-[26px] lg:mt-0 lg:rounded-[28px] lg:bg-white lg:px-[22px] lg:pt-[22px] lg:pb-2 lg:shadow-[0_24px_48px_-32px_rgba(15,31,25,0.5)]">
            <div className="flex items-baseline justify-between">
              <h2 className="m-0 font-sans text-[13px] font-extrabold tracking-[1px] text-green uppercase">{group.title}</h2>
              <span className="text-xs text-muted">{group.items.length} ingredients</span>
            </div>
            <div className="card mt-2.5 px-4 py-1 lg:mt-0 lg:rounded-none lg:bg-transparent lg:px-0 lg:shadow-none">
              {group.items.map((item) => (
                <div key={item.name} className="border-b border-line py-[13px] last:border-b-0 lg:py-3.5">
                  <div className="flex items-baseline justify-between gap-2">
                    <span>
                      <span className="block text-sm font-extrabold lg:text-[15px]">{item.name}</span>
                      <span className="text-xs text-muted lg:text-[13px]">{item.pillar}</span>
                    </span>
                    <span className="shrink-0 text-right">
                      <span className="block text-sm font-bold lg:text-[15px]">{item.dose}</span>
                      {item.rda !== undefined && <span className="text-xs font-bold text-green">{item.rda}% RDA</span>}
                    </span>
                  </div>
                  {item.rda !== undefined && (
                    <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-[#edf1ec]" aria-hidden>
                      <div className="h-full rounded-full bg-[linear-gradient(90deg,#0b6b4f,#5fb9e0)]" style={{ width: `${item.rda}%` }} />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>
        ))}
      </div>

      <div className="container-site mt-[18px] lg:mt-8">
        <p className="m-0 text-xs leading-relaxed text-muted lg:hidden">{product.dosageNote}</p>
        <div className="dark-card hidden flex-wrap items-center justify-between gap-5 rounded-[28px] px-7 py-6 lg:flex">
          <p className="m-0 max-w-[640px] text-sm leading-relaxed text-fog">{product.dosageNote}</p>
          <Button to={orderLink(productPath(product))} variant="white" className="min-h-[52px] px-[22px]">
            Back to choose your pack
          </Button>
        </div>
      </div>

      <div className="h-8 lg:hidden" />
      <StickyBar>
        <Button to={orderLink(productPath(product))} className="min-h-[54px] w-full text-[15px]">
          Back to choose your pack
        </Button>
      </StickyBar>
    </>
  )
}

function orderLink(path: string) {
  return `${path}#order`
}
