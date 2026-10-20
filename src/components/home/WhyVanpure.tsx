import { whyVanpure } from '../../data/home'
import { Icon } from '../ui/Icons'

export function WhyVanpure() {
  return (
    <section className="container-site mt-12 lg:mt-24">
      <div className="eyebrow">Why Vanpure</div>
      <h2 className="m-0 mt-1.5 font-display text-[30px] leading-[1.02] font-extrabold tracking-[-0.8px] lg:mt-2 lg:text-[44px] lg:leading-none lg:tracking-[-1.2px]">Made to be trusted</h2>
      <div className="mt-4 grid grid-cols-2 gap-2 lg:mt-7 lg:grid-cols-4 lg:gap-4">
        {whyVanpure.map((item) => (
          <div
            key={item.n}
            className="lift relative overflow-hidden rounded-3xl px-3.5 py-4 shadow-[0_14px_28px_-20px_rgba(15,31,25,0.5)] lg:rounded-[28px] lg:p-6"
            style={{ background: item.bg }}
          >
            <span
              aria-hidden
              className="absolute -top-6 -right-6 size-20 rounded-full lg:-top-[30px] lg:-right-[30px] lg:size-[120px]"
              style={{ background: `radial-gradient(closest-side, ${item.glow}, transparent)` }}
            />
            <span
              className="relative flex size-[42px] items-center justify-center rounded-[14px] text-white shadow-[0_8px_16px_-8px_rgba(11,107,79,0.7)] lg:size-[50px] lg:rounded-2xl lg:text-lg lg:font-extrabold"
              style={{ background: item.iconBg }}
            >
              <Icon name={item.icon} className="lg:hidden" />
              <span className="hidden lg:inline">{item.n}</span>
            </span>
            <div className="relative mt-3 text-[15px] font-extrabold lg:mt-[18px] lg:text-lg">{item.title}</div>
            <div className="relative mt-1 text-xs leading-[1.45] text-muted lg:mt-1.5 lg:text-sm lg:leading-normal">{item.text}</div>
          </div>
        ))}
      </div>
    </section>
  )
}
