import { Fragment } from 'react'
import { Link } from 'react-router-dom'

export function Breadcrumb({ items }: { items: { label: string; to?: string }[] }) {
  return (
    <nav aria-label="Breadcrumb" className="flex gap-1.5 text-xs text-muted lg:gap-2 lg:text-[13px]">
      {items.map((item, index) => (
        <Fragment key={item.label}>
          {index > 0 && <span aria-hidden>/</span>}
          {item.to ? (
            <Link to={item.to} className="text-muted no-underline hover:text-green">
              {item.label}
            </Link>
          ) : (
            <span className="font-bold text-ink">{item.label}</span>
          )}
        </Fragment>
      ))}
    </nav>
  )
}
