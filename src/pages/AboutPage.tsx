import { useRef, useState } from 'react'
import { Seo } from '../components/seo/Seo'
import { Button } from '../components/ui/Button'
import { Icon, PauseIcon, PlayIcon } from '../components/ui/Icons'
import { founder, mission, values } from '../data/about'
import { featuredProduct, orderPath } from '../data/products'
import { site } from '../data/site'
import { formatInr } from '../lib/format'
import { aboutPageJsonLd } from '../lib/jsonLd'
import { generalChatUrl } from '../lib/whatsapp'

export function AboutPage() {
  const [starter, fullBox] = featuredProduct.packs

  return (
    <>
      <Seo
        title={`About ${site.name} | Founder ${founder.name} and our mission`}
        description={`${site.name} makes science-backed supplements for adults in certified pharmaceutical facilities. Meet founder ${founder.name} and the values behind ${featuredProduct.name}.`}
        path="/about"
        jsonLd={aboutPageJsonLd}
      />

      <section className="container-site pt-[18px] lg:grid lg:grid-cols-2 lg:items-end lg:gap-12 lg:pt-[72px]">
        <div>
          <div className="eyebrow">Our mission</div>
          <h1 className="m-0 mt-2.5 font-display text-4xl leading-[1.02] font-bold tracking-[-1.1px] lg:mt-3.5 lg:text-[clamp(40px,4.6vw,64px)] lg:leading-[0.98] lg:font-extrabold lg:tracking-[-1.8px]">
            {mission.headline}
          </h1>
        </div>
        <div className="text-[15px] leading-[1.65] text-body lg:text-[17px] lg:leading-[1.7]">
          {mission.paragraphs.map((paragraph, index) => (
            <p key={paragraph.slice(0, 20)} className={index === 0 ? 'm-0 mt-4 lg:mt-0' : 'm-0 mt-3 lg:mt-3.5'}>
              {paragraph}
            </p>
          ))}
        </div>
      </section>

      <section className="container-site mt-9 lg:mt-[72px]">
        <div className="card-lg grid gap-2.5 p-[18px] lg:grid-cols-3 lg:items-center lg:gap-7 lg:rounded-[40px] lg:p-8">
          <div className="grid grid-cols-2 gap-2.5 lg:contents">
            <img
              src={founder.photo.src}
              alt={founder.photo.alt}
              width={founder.photo.width}
              height={founder.photo.height}
              loading="lazy"
              decoding="async"
              className="h-56 w-full rounded-[20px] object-cover object-top lg:aspect-[717/986] lg:h-auto lg:rounded-[28px]"
            />
            <FounderVideo />
          </div>
          <div className="relative lg:pl-2">
            <span aria-hidden className="quote-mark absolute -top-8 -left-1.5 hidden font-display text-[130px] leading-none font-extrabold lg:block">
              “
            </span>
            <blockquote className="relative m-0 mt-1.5 font-display text-[22px] leading-[1.2] font-bold tracking-[-0.3px] lg:mt-0 lg:text-[30px] lg:tracking-[-0.5px]">
              “{founder.quote}”
            </blockquote>
            <div className="mt-3 flex items-center gap-2.5 lg:mt-5 lg:gap-3">
              <span aria-hidden className="h-9 w-1 rounded-full bg-[linear-gradient(180deg,#10825f,#4fa8d8)] lg:h-11" />
              <span className="text-sm leading-[1.4] lg:text-base">
                <b>{founder.name}</b>
                <br />
                <span className="text-muted">{founder.role}</span>
              </span>
            </div>
          </div>
        </div>
      </section>

      <section className="container-site mt-12 lg:mt-24">
        <div className="eyebrow">What we stand for</div>
        <h2 className="m-0 mt-1.5 font-display text-[28px] font-bold tracking-[-0.6px] lg:mt-2 lg:text-[44px] lg:font-extrabold lg:tracking-[-1.2px]">Our values</h2>
        <div className="mt-3.5 flex flex-col gap-2.5 lg:mt-7 lg:grid lg:grid-cols-3 lg:gap-4">
          {values.map((value) => (
            <div key={value.title} className="flex gap-3.5 rounded-[22px] p-4 shadow-[0_12px_26px_-20px_rgba(15,31,25,0.45)] lg:block lg:rounded-[28px] lg:p-[26px]" style={{ background: value.bg }}>
              <span
                className="flex size-11 shrink-0 items-center justify-center rounded-[15px] bg-white text-green shadow-[0_6px_14px_-8px_rgba(11,107,79,0.5)] lg:size-[52px] lg:rounded-[17px] lg:text-white lg:shadow-[0_10px_20px_-10px_rgba(11,107,79,0.7)]"
                style={{ ['--icon-bg' as string]: value.iconBg }}
              >
                <span className="contents lg:hidden">
                  <Icon name={value.icon === 'leaf' ? 'sprout' : value.icon} size={22} />
                </span>
                <span className="hidden size-full items-center justify-center rounded-[17px] lg:flex" style={{ background: value.iconBg }}>
                  <Icon name={value.icon === 'leaf' ? 'sprout' : value.icon} size={24} />
                </span>
              </span>
              <span>
                <b className="block text-base lg:mt-[18px] lg:text-xl">{value.title}</b>
                <span className="text-[13px] leading-normal text-muted lg:mt-1.5 lg:block lg:text-[15px] lg:leading-[1.55]">{value.text}</span>
              </span>
            </div>
          ))}
        </div>
      </section>

      <section className="container-site mt-12 lg:mt-24 lg:grid lg:grid-cols-2 lg:items-stretch lg:gap-6">
        <div>
          <h2 className="m-0 font-display text-[28px] font-bold tracking-[-0.6px] lg:text-[40px] lg:font-extrabold lg:tracking-[-1px]">Contact us</h2>
          <div className="card mt-3.5 px-4 py-1 lg:mt-[18px] lg:rounded-[28px] lg:px-6 lg:py-1.5">
            <ContactRow label="WhatsApp" value={site.whatsapp.display} href={generalChatUrl} />
            <ContactRow label="Instagram" value={`@${site.instagram.handle}`} href={site.instagram.url} />
            <ContactRow label="Website" value={site.url.replace('https://', '')} />
            {site.email && <ContactRow label="Email" value={site.email} href={`mailto:${site.email}`} />}
            {site.address && <ContactRow label="Address" value={site.address} />}
          </div>
        </div>

        <div className="dark-card relative mt-12 flex flex-col justify-center overflow-hidden rounded-[30px] px-5 py-[26px] lg:mt-0 lg:rounded-[34px] lg:p-9">
          <div aria-hidden className="flex gap-2">
            <span className="capsule h-[26px] w-14 lg:h-8 lg:w-[70px]" />
            <span className="capsule h-[26px] w-14 lg:h-8 lg:w-[70px]" />
          </div>
          <h2 className="m-0 mt-3.5 font-display text-[28px] leading-[1.05] font-bold tracking-[-0.6px] lg:mt-[18px] lg:text-[40px] lg:leading-none lg:font-extrabold lg:tracking-[-1px]">Start your daily habit</h2>
          <p className="m-0 mt-2 text-sm text-fog lg:mt-2.5 lg:text-base">
            {featuredProduct.shortName} · {starter.days} days for {formatInr(starter.price)} or {fullBox.days} days for {formatInr(fullBox.price)} at launch.
          </p>
          <Button to={orderPath(featuredProduct)} variant="white" className="mt-[18px] min-h-[54px] w-full lg:mt-[22px] lg:w-auto lg:self-start lg:px-6">
            Choose your pack
          </Button>
        </div>
      </section>
    </>
  )
}

function ContactRow({ label, value, href }: { label: string; value: string; href?: string }) {
  const content = (
    <>
      <span className="text-[13px] text-muted lg:text-sm">{label}</span>
      <b className={`text-sm lg:text-base ${href ? 'text-green' : ''}`}>{value}</b>
    </>
  )
  const className = 'flex min-h-14 items-center justify-between border-b border-line text-ink no-underline last:border-b-0 lg:min-h-16'
  return href ? (
    <a href={href} target="_blank" rel="noopener noreferrer" className={className}>
      {content}
    </a>
  ) : (
    <div className={className}>{content}</div>
  )
}

/** Portrait founder message; shows a poster frame and native controls once playing. */
function FounderVideo() {
  const ref = useRef<HTMLVideoElement>(null)
  const [playing, setPlaying] = useState(false)

  return (
    <div className="relative h-56 overflow-hidden rounded-[20px] bg-[radial-gradient(90%_70%_at_30%_20%,#1e5a47,#0f1f19_75%)] lg:aspect-[9/16] lg:h-auto lg:max-h-[460px] lg:w-full lg:max-w-[260px] lg:justify-self-center lg:rounded-[28px]">
      <video
        ref={ref}
        src={founder.video.src}
        poster={founder.video.poster}
        preload="metadata"
        playsInline
        controls={playing}
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        aria-label={founder.video.title}
        className="size-full object-cover"
      />
      {!playing && (
        <button
          type="button"
          onClick={() => void ref.current?.play().catch(() => undefined)}
          aria-label="Play founder video"
          className="absolute inset-0 flex flex-col items-center justify-center gap-2.5 bg-[linear-gradient(180deg,rgba(15,31,25,0)_40%,rgba(15,31,25,0.75))] text-white lg:gap-3"
        >
          <span className="flex size-[54px] items-center justify-center rounded-full bg-white text-ink shadow-[0_0_0_8px_rgba(255,255,255,0.12)] lg:size-[68px] lg:shadow-[0_0_0_10px_rgba(255,255,255,0.12)]">
            <PlayIcon size={22} className="ml-0.5" />
          </span>
          <span className="text-[13px] font-bold lg:text-[15px]">{founder.video.title}</span>
          <span className="text-[11px] text-[#b7c9c0] lg:text-xs">{founder.video.duration}</span>
        </button>
      )}
      {playing && <PauseIcon className="sr-only" />}
    </div>
  )
}
