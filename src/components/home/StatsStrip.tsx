import { featuredProduct } from '../../data/products'
import { cn } from '../../lib/cn'

export function StatsStrip({ className }: { className?: string }) {
  return (
    <dl className={cn('tile m-0 grid grid-cols-4 rounded-3xl px-2 py-4 text-center shadow-[0_14px_30px_-22px_rgba(15,31,25,0.45)] lg:rounded-[22px] lg:py-[18px]', className)}>
      {featuredProduct.stats.map((stat, index) => (
        <div key={stat.label} className={cn(index > 0 && 'border-l border-[#e6eae4]')}>
          <dt className="order-2 mt-1 text-[11px] text-muted lg:text-xs">{stat.label}</dt>
          <dd className="num-gradient m-0 font-display text-[26px] leading-none font-extrabold lg:text-[30px]">{stat.value}</dd>
        </div>
      ))}
    </dl>
  )
}
