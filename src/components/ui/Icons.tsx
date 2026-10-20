import type { SVGProps } from 'react'

type IconProps = SVGProps<SVGSVGElement> & { size?: number }

function Stroke({ size = 20, children, ...rest }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...rest}
    >
      {children}
    </svg>
  )
}

export const WhatsAppIcon = (p: IconProps) => (
  <Stroke {...p}>
    <path d="M4 20l1.4-4.2A8 8 0 1 1 8.6 19z" />
  </Stroke>
)

export const InstagramIcon = (p: IconProps) => (
  <Stroke {...p}>
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </Stroke>
)

export const ArrowRightIcon = (p: IconProps) => (
  <Stroke strokeWidth="2.6" {...p}>
    <path d="M5 12h14M13 6l6 6-6 6" />
  </Stroke>
)

export const ChevronRightIcon = (p: IconProps) => (
  <Stroke strokeWidth="2.4" {...p}>
    <path d="M9 5l7 7-7 7" />
  </Stroke>
)

export const ChevronLeftIcon = (p: IconProps) => (
  <Stroke strokeWidth="2.2" {...p}>
    <path d="M15 5l-7 7 7 7" />
  </Stroke>
)

export const CloseIcon = (p: IconProps) => (
  <Stroke strokeWidth="2.2" {...p}>
    <path d="M6 6l12 12M18 6L6 18" />
  </Stroke>
)

export const MenuIcon = (p: IconProps) => (
  <Stroke {...p}>
    <path d="M4 8h16M4 16h16" />
  </Stroke>
)

export const CheckIcon = (p: IconProps) => (
  <Stroke strokeWidth="3" {...p}>
    <path d="M5 12l5 5 9-10" />
  </Stroke>
)

export const LeafIcon = (p: IconProps) => (
  <Stroke {...p}>
    <path d="M12 3c5 3 7 7 7 11a7 7 0 0 1-14 0c0-4 2-8 7-11z" />
    <path d="M12 10v11" />
  </Stroke>
)

export const BuildingIcon = (p: IconProps) => (
  <Stroke {...p}>
    <path d="M3 21h18M5 21V9l7-5 7 5v12M9 21v-6h6v6" />
  </Stroke>
)

export const ShieldIcon = (p: IconProps) => (
  <Stroke {...p}>
    <path d="M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6z" />
    <path d="M8.5 12l2.5 2.5 4.5-5" />
  </Stroke>
)

export const FlaskIcon = (p: IconProps) => (
  <Stroke {...p}>
    <path d="M9 3h6M10 3v6l-5 9a2 2 0 0 0 2 3h10a2 2 0 0 0 2-3l-5-9V3" />
  </Stroke>
)

export const SproutIcon = (p: IconProps) => (
  <Stroke {...p}>
    <path d="M5 19c0-8 6-14 15-14 0 9-6 15-14 15" />
    <path d="M5 19l7-7" />
  </Stroke>
)

export const PlayIcon = ({ size = 20, ...rest }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...rest}>
    <path d="M8 5l11 7-11 7z" />
  </svg>
)

export const PauseIcon = ({ size = 20, ...rest }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...rest}>
    <path d="M7 5h4v14H7zM13 5h4v14h-4z" />
  </svg>
)

export const SoundOnIcon = (p: IconProps) => (
  <Stroke {...p}>
    <path d="M11 5L6 9H2v6h4l5 4V5z" />
    <path d="M15.5 8.5a5 5 0 0 1 0 7M19 5a9 9 0 0 1 0 14" />
  </Stroke>
)

export const SoundOffIcon = (p: IconProps) => (
  <Stroke {...p}>
    <path d="M11 5L6 9H2v6h4l5 4V5z" />
    <path d="M22 9l-6 6M16 9l6 6" />
  </Stroke>
)

export const ZoomIcon = (p: IconProps) => (
  <Stroke {...p}>
    <circle cx="11" cy="11" r="7" />
    <path d="M21 21l-4.3-4.3M11 8v6M8 11h6" />
  </Stroke>
)

const named = {
  leaf: LeafIcon,
  building: BuildingIcon,
  shield: ShieldIcon,
  flask: FlaskIcon,
  chat: WhatsAppIcon,
  sprout: SproutIcon,
} as const

export type IconName = keyof typeof named

export function Icon({ name, ...rest }: IconProps & { name: IconName }) {
  const Component = named[name]
  return <Component {...rest} />
}
