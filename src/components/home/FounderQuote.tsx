import { Link } from 'react-router-dom'
import { founderQuote } from '../../data/home'
import { ChevronRightIcon } from '../ui/Icons'

export function FounderQuote() {
  return (
    <div className="relative rounded-[30px] bg-white p-[18px] shadow-[0_20px_40px_-26px_rgba(15,31,25,0.45)] lg:rounded-[34px] lg:p-8">
      <span aria-hidden className="quote-mark absolute top-1.5 right-[18px] font-display text-[88px] leading-none font-extrabold lg:top-1 lg:right-7 lg:text-[140px]">
        “
      </span>
      <div className="flex items-center gap-3.5 lg:gap-4">
        <span aria-hidden className="size-[72px] shrink-0 rounded-full bg-[linear-gradient(135deg,#10825f,#4fa8d8)] p-[3px] lg:size-24 lg:p-1">
          <img src={founderQuote.avatar} alt="" width={96} height={96} loading="lazy" className="size-full rounded-full object-cover" />
        </span>
        <span className="text-sm leading-[1.4] lg:text-[15px] lg:leading-[1.45]">
          <b className="lg:text-[17px]">{founderQuote.name}</b>
          <br />
          <span className="text-muted">{founderQuote.role}</span>
        </span>
      </div>
      <blockquote className="relative m-0 mt-3.5 font-display text-[21px] leading-[1.25] font-bold tracking-[-0.3px] lg:mt-[22px] lg:text-[28px] lg:leading-[1.2] lg:tracking-[-0.4px]">
        {founderQuote.quote}
      </blockquote>
      <Link to="/about" className="mt-3 inline-flex min-h-11 items-center gap-1.5 text-sm font-extrabold text-green no-underline lg:mt-4 lg:text-[15px]">
        Our story <ChevronRightIcon size={16} />
      </Link>
    </div>
  )
}
