import { Link } from 'react-router-dom'
import { activeCount, ingredientsPath, type Product } from '../../data/products'
import { CheckIcon, ChevronRightIcon, Icon } from '../ui/Icons'

export function TrustTrio({ product }: { product: Product }) {
  return (
    <div className="grid grid-cols-3 gap-2 lg:gap-2.5">
      {product.trust.map((item) => (
        <div key={item.label} className="tile flex flex-col items-center gap-2 px-2 py-3.5 text-center text-xs leading-[1.35] font-bold lg:gap-2.5 lg:rounded-[22px] lg:px-2.5 lg:py-4 lg:text-[13px]">
          <span className="icon-tile size-10 lg:size-11">
            <Icon name={item.icon} size={20} />
          </span>
          {item.label}
        </div>
      ))}
    </div>
  )
}

export function AboutItem({ product }: { product: Product }) {
  return (
    <section>
      <h2 className="m-0 font-display text-[26px] font-bold tracking-[-0.5px] lg:text-[30px] lg:font-extrabold lg:tracking-[-0.6px]">About this item</h2>
      <p className="m-0 mt-2.5 text-[15px] leading-relaxed text-body lg:text-base">{product.description}</p>
      <ul className="card m-0 mt-3.5 list-none px-4 py-1.5 lg:rounded-3xl lg:px-5">
        {product.aboutPoints.map((point) => (
          <li key={point.title} className="flex gap-3 border-b border-line py-3 text-sm leading-normal text-body last:border-b-0 lg:text-[15px]">
            <span aria-hidden className="icon-tile mt-px size-6 shrink-0 rounded-full lg:size-[26px]">
              <CheckIcon size={13} />
            </span>
            <span>
              <b className="text-ink">{point.title}</b> {point.text}
            </span>
          </li>
        ))}
      </ul>
    </section>
  )
}

export function ProductDetails({ product }: { product: Product }) {
  return (
    <section>
      <h2 className="m-0 font-display text-[26px] font-bold tracking-[-0.5px] lg:text-[30px] lg:font-extrabold lg:tracking-[-0.6px]">Product details</h2>
      <dl className="card m-0 mt-3.5 px-4 py-1 lg:rounded-3xl lg:px-5">
        {product.details.map((row) => (
          <div key={row.label} className="grid grid-cols-[112px_minmax(0,1fr)] gap-2.5 border-b border-line py-3 text-sm last:border-b-0 lg:grid-cols-[150px_minmax(0,1fr)] lg:gap-3 lg:text-[15px]">
            <dt className="text-muted">{row.label}</dt>
            <dd className="m-0 font-semibold">{row.value}</dd>
          </div>
        ))}
      </dl>
      <Link to={ingredientsPath(product)} className="btn-outline mt-3.5 flex min-h-14 w-full text-[15px] lg:mt-4 lg:min-h-[58px] lg:rounded-[20px] lg:text-base">
        See all {activeCount(product)} ingredients <ChevronRightIcon size={18} />
      </Link>
    </section>
  )
}
