import { orderSteps } from '../../data/home'
import { featuredProduct, productPath } from '../../data/products'
import { buildOrderMessage } from '../../lib/whatsapp'
import { Button } from '../ui/Button'
import { WhatsAppIcon } from '../ui/Icons'

export function HowToOrder() {
  const fullBox = featuredProduct.packs[featuredProduct.packs.length - 1]
  const preview = `${buildOrderMessage(featuredProduct, fullBox).slice(0, 70)}…`

  return (
    <section id="how" className="container-site mt-7 scroll-mt-20 lg:mt-24">
      <div className="dark-card relative overflow-hidden rounded-[32px] px-[18px] py-[26px] lg:rounded-[40px] lg:p-12">
        <div aria-hidden className="absolute -right-[60px] -bottom-[60px] size-[220px] lg:-right-20 lg:-bottom-20 lg:size-[360px]">
          <div className="halo-blue size-full rounded-full motion-safe:animate-spin-slow" />
        </div>

        <div className="relative lg:flex lg:flex-wrap lg:items-end lg:justify-between lg:gap-6">
          <div>
            <div className="eyebrow text-leaf">How to order</div>
            <h2 className="m-0 mt-1.5 font-display text-[30px] leading-[1.02] font-extrabold tracking-[-0.8px] lg:mt-2 lg:text-[44px] lg:leading-none lg:tracking-[-1.2px]">
              Three steps.
              <br className="lg:hidden" /> No sign-up.
            </h2>
          </div>
          <Button to={productPath(featuredProduct)} variant="white" className="hidden min-h-[52px] px-[22px] lg:inline-flex">
            Start with step 1
          </Button>
        </div>

        <ol className="relative m-0 mt-5 list-none p-0 lg:mt-9 lg:grid lg:grid-cols-3 lg:gap-4">
          {orderSteps.map((step, index) => {
            const last = index === orderSteps.length - 1
            return (
              <li
                key={step.title}
                className="relative flex gap-3.5 pb-5 lg:block lg:rounded-3xl lg:bg-white/[0.07] lg:p-[22px] lg:pb-[22px] lg:shadow-[inset_0_0_0_1px_rgba(255,255,255,0.12)]"
              >
                {!last && <span aria-hidden className="absolute top-9 bottom-0 left-[17px] w-0.5 bg-[linear-gradient(180deg,#3fbf8e,rgba(79,168,216,0.3))] lg:hidden" />}
                <span className="relative flex size-9 shrink-0 items-center justify-center rounded-full bg-[linear-gradient(135deg,#3fbf8e,#4fa8d8)] font-extrabold shadow-[0_0_0_6px_rgba(63,191,142,0.15)] lg:size-11 lg:text-lg lg:shadow-[0_0_0_8px_rgba(63,191,142,0.15)]">
                  {index + 1}
                </span>
                <span className="lg:block">
                  <b className="block text-base lg:mt-[18px] lg:text-[19px]">{step.title}</b>
                  <span className="text-[13px] text-fog lg:mt-1 lg:block lg:text-sm">{step.text}</span>
                  {index === 1 && (
                    <span className="mt-3.5 hidden rounded-[14px_14px_14px_4px] bg-[#d9f5cf] px-3 py-[9px] text-xs leading-[1.45] text-[#1a2a16] lg:block">{preview}</span>
                  )}
                </span>
              </li>
            )
          })}
        </ol>

        <div className="relative mt-5 flex items-start gap-2.5 rounded-[18px] bg-white/[0.08] px-3.5 py-3 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.12)] lg:hidden">
          <span aria-hidden className="flex size-[30px] shrink-0 items-center justify-center rounded-full bg-white text-green">
            <WhatsAppIcon size={16} />
          </span>
          <span className="flex-1 rounded-[12px_12px_12px_4px] bg-[#d9f5cf] px-2.5 py-2 text-xs leading-[1.45] text-[#1a2a16]">{preview}</span>
        </div>

        <Button to={productPath(featuredProduct)} variant="white" className="relative mt-[18px] w-full lg:hidden">
          Start with step 1
        </Button>
      </div>
    </section>
  )
}
