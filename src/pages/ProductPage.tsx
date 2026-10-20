import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { Gallery } from '../components/product/Gallery'
import { PackChooser } from '../components/product/PackChooser'
import { AboutItem, ProductDetails, TrustTrio } from '../components/product/ProductInfo'
import { ProductStickyBar } from '../components/product/ProductStickyBar'
import { Seo } from '../components/seo/Seo'
import { FaqList } from '../components/ui/Accordion'
import { Breadcrumb } from '../components/ui/Breadcrumb'
import { getProduct, lowestPrice, productPath } from '../data/products'
import { site } from '../data/site'
import { breadcrumbJsonLd, faqJsonLd, productJsonLd } from '../lib/jsonLd'
import { NotFoundPage } from './NotFoundPage'

export function ProductPage() {
  const { slug } = useParams()
  const product = getProduct(slug)
  const [pack, setPack] = useState(() => product?.packs.find((p) => p.fullBox) ?? product?.packs[0])
  if (!product || !pack) return <NotFoundPage />

  return (
    <>
      <Seo
        title={`${product.name} | ${product.subtitle} | ${site.name}`}
        description={`${product.description} From ₹${lowestPrice(product)} at launch. Pick a pack and order on WhatsApp.`}
        path={productPath(product)}
        type="product"
        jsonLd={[
          productJsonLd(product),
          faqJsonLd(product.faqs),
          breadcrumbJsonLd([
            { name: 'Home', path: '/' },
            { name: product.shortName, path: productPath(product) },
          ]),
        ]}
      />

      <div className="container-site pb-2.5 lg:pt-5">
        <Breadcrumb items={[{ label: 'Home', to: '/' }, { label: product.shortName }]} />
      </div>

      <div className="container-site lg:mt-5 lg:flex lg:flex-wrap lg:items-start lg:gap-12">
        <div className="-mx-1 lg:mx-0 lg:sticky lg:top-[90px] lg:min-w-0 lg:flex-[1_1_460px]">
          <Gallery product={product} />
        </div>

        <div className="lg:min-w-0 lg:flex-[1_1_460px]">
          <div className="mt-3 lg:mt-0">
            <div className="eyebrow">{product.category}</div>
            <h1 className="m-0 mt-1.5 font-display text-4xl leading-none font-bold tracking-[-1px] lg:mt-2 lg:text-[52px] lg:leading-[0.98] lg:font-extrabold lg:tracking-[-1.6px]">{product.name}</h1>
            <div className="mt-2 text-[15px] font-semibold text-deep lg:mt-2.5 lg:text-lg">{product.subtitle}</div>
          </div>

          <div className="mt-[18px] lg:mt-6">
            <PackChooser product={product} selected={pack} onSelect={setPack} />
          </div>
          <div className="mt-3.5">
            <TrustTrio product={product} />
          </div>
          <div className="mt-10">
            <AboutItem product={product} />
          </div>
          <div className="mt-8 lg:mt-9">
            <ProductDetails product={product} />
          </div>
        </div>
      </div>

      <section className="container-site mt-10 lg:mt-24">
        <h2 className="m-0 font-display text-[26px] font-bold tracking-[-0.5px] lg:text-4xl lg:font-extrabold lg:tracking-[-0.8px]">Questions</h2>
        <FaqList items={product.faqs} className="mt-3 lg:mt-4 lg:px-7" />
      </section>

      <div className="h-5 lg:hidden" />
      <ProductStickyBar product={product} pack={pack} />
    </>
  )
}
