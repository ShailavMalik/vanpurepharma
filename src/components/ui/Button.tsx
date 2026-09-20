import type { ComponentPropsWithoutRef, ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { cn } from '../../lib/cn'

type Variant = 'gold' | 'ghost' | 'wa' | 'subtle'
type Size = 'sm' | 'md' | 'lg'

interface BaseProps {
  variant?: Variant
  size?: Size
  icon?: ReactNode
  iconRight?: ReactNode
  className?: string
  children: ReactNode
}

type AnchorProps = BaseProps & { href: string; to?: never } & Omit<ComponentPropsWithoutRef<'a'>, 'className' | 'children'>
type LinkProps = BaseProps & { to: string; href?: never } & Omit<ComponentPropsWithoutRef<typeof Link>, 'className' | 'children' | 'to'>
type NativeProps = BaseProps & { href?: never; to?: never } & Omit<ComponentPropsWithoutRef<'button'>, 'className' | 'children'>

export type ButtonProps = AnchorProps | LinkProps | NativeProps

const variantClass: Record<Variant, string> = {
  gold: 'group/btn relative overflow-hidden bg-gradient-gold text-bg font-semibold shadow-[0_12px_32px_-10px_rgba(229,199,107,0.65)] hover:brightness-110 hover:shadow-[0_16px_40px_-10px_rgba(229,199,107,0.8)]',
  ghost: 'glass-2 text-fg font-medium hover:bg-white/10',
  wa: 'bg-wa text-[#052e16] font-semibold shadow-[0_12px_32px_-10px_rgba(37,211,102,0.7)] hover:brightness-110',
  subtle: 'text-muted font-medium hover:text-fg',
}

const sizeClass: Record<Size, string> = {
  sm: 'h-10 px-4 text-sm gap-2',
  md: 'h-12 px-6 text-[15px] gap-2.5',
  lg: 'h-14 px-8 text-base gap-3',
}

const baseClass =
  'inline-flex items-center justify-center rounded-full whitespace-nowrap transition-[transform,filter,box-shadow,background-color,color] duration-200 ease-out active:scale-[0.98] select-none'

function Sheen() {
  return (
    <span
      aria-hidden
      className="pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-white/40 opacity-0 blur-md group-hover/btn:animate-sheen group-hover/btn:opacity-100"
    />
  )
}

export function Button(props: ButtonProps) {
  const { variant = 'gold', size = 'md', icon, iconRight, className, children, ...rest } = props
  const classes = cn(baseClass, variantClass[variant], sizeClass[size], className)
  const content = (
    <>
      {variant === 'gold' && <Sheen />}
      {icon && <span className="relative shrink-0 [&>svg]:size-[1.15em]">{icon}</span>}
      <span className="relative">{children}</span>
      {iconRight && <span className="relative shrink-0 [&>svg]:size-[1.15em]">{iconRight}</span>}
    </>
  )

  if ('href' in rest && rest.href) {
    const { href, ...anchorRest } = rest as AnchorProps
    const external = /^https?:\/\//.test(href)
    return (
      <a
        href={href}
        className={classes}
        {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
        {...anchorRest}
      >
        {content}
      </a>
    )
  }

  if ('to' in rest && rest.to) {
    const { to, ...linkRest } = rest as LinkProps
    return (
      <Link to={to} className={classes} {...linkRest}>
        {content}
      </Link>
    )
  }

  const nativeRest = rest as NativeProps
  return (
    <button type="button" className={classes} {...nativeRest}>
      {content}
    </button>
  )
}
