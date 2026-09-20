import { ArrowLeft } from 'lucide-react'
import { Seo } from '../components/seo/Seo'
import { Button } from '../components/ui/Button'
import { GlassCard } from '../components/ui/GlassCard'
import { site } from '../data/site'

export function NotFoundPage() {
  return (
    <section className="flex min-h-[100svh] items-center pt-24">
      <Seo title={`Page not found | ${site.name}`} description="That page does not exist." path="/404" />
      <meta name="robots" content="noindex" />
      <div className="container-site flex justify-center">
        <GlassCard border="brand" className="max-w-md p-10 text-center">
          <p className="text-gradient-brand font-display text-7xl font-bold">404</p>
          <h1 className="mt-4 text-2xl font-semibold">This page went off-script.</h1>
          <p className="mt-3 text-muted">The link may be old or mistyped. The product and ordering are one tap away.</p>
          <div className="mt-8 flex justify-center">
            <Button to="/" icon={<ArrowLeft />}>
              Back to home
            </Button>
          </div>
        </GlassCard>
      </div>
    </section>
  )
}
