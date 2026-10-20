import { Seo } from '../components/seo/Seo'
import { Button } from '../components/ui/Button'
import { site } from '../data/site'

export function NotFoundPage() {
  return (
    <section className="container-site flex min-h-[70svh] flex-col items-center justify-center pb-20 text-center lg:min-h-[640px] lg:pb-[120px]">
      <Seo title={`Page not found | ${site.name}`} description="That page does not exist." path="/404" />
      <meta name="robots" content="noindex" />
      <div aria-hidden className="relative h-[120px] w-[200px] lg:h-[170px] lg:w-[320px]">
        <span className="capsule absolute top-10 left-2.5 h-11 w-24 motion-safe:animate-bob [--bob-angle:-18deg] lg:top-[60px] lg:h-[66px] lg:w-[150px]" />
        <span className="capsule absolute top-6 right-1.5 h-11 w-24 motion-safe:animate-bob-2 [--bob-angle:22deg] lg:top-[30px] lg:h-[66px] lg:w-[150px]" />
      </div>
      <div className="mt-[22px] text-[13px] font-extrabold tracking-[1.4px] text-green lg:mt-7 lg:text-sm lg:tracking-[1.6px]">ERROR 404</div>
      <h1 className="m-0 mt-2 font-display text-[34px] leading-[1.05] font-bold tracking-[-0.8px] lg:mt-2.5 lg:text-[56px] lg:leading-none lg:font-extrabold lg:tracking-[-1.4px]">This page rolled away</h1>
      <p className="m-0 mt-3 max-w-[460px] text-[15px] leading-relaxed text-body lg:mt-3.5 lg:text-lg">The link may be old or mistyped. Everything you need is one tap away.</p>
      <Button to="/" size="lg" className="mt-[26px] w-full lg:mt-[30px] lg:w-auto lg:px-8">
        Go to home
      </Button>
    </section>
  )
}
