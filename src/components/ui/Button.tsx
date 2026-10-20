import type { ComponentPropsWithoutRef, ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { cn } from '../../lib/cn'

type Variant = 'primary' | 'dark' | 'white' | 'soft' | 'outline'
type Size = 'sm' | 'md' | 'lg'

interface BaseProps {
  variant?: Variant
  size?: Size
  icon?: ReactNode
  iconRight?: ReactNode
  /** Adds the slow light sweep used on the main call to action. */
  sheen?: boolean
  className?: string
  children: ReactNode
}

type AnchorProps = BaseProps & { href: string; to?: never } & Omit<ComponentPropsWithoutRef<'a'>, 'className' | 'children'>
type LinkProps = BaseProps & { to: string; href?: never } & Omit<ComponentPropsWithoutRef<typeof Link>, 'className' | 'children' | 'to'>
type NativeProps = BaseProps & { href?: never; to?: never } & Omit<ComponentPropsWithoutRef<'button'>, 'className' | 'children'>

export type ButtonProps = AnchorProps | LinkProps | NativeProps

const variantClass: Record<Variant, string> = {
  primary: 'btn-primary',
  dark: 'btn-dark',
  white: 'btn-white',
  soft: 'btn-soft',
  outline: 'btn-outline',
}

const sizeClass: Record<Size, string> = {
  sm: 'min-h-11 px-4 text-sm',
  md: 'min-h-13 px-5 text-[15px]',
  lg: 'min-h-14 px-6 text-base',
}

export function Button(props: ButtonProps) {
  const { variant = 'primary', size = 'md', icon, iconRight, sheen, className, children, ...rest } = props
  const classes = cn(variantClass[variant], sizeClass[size], className)
  const content = (
    <>
      {sheen && (
        <span
          aria-hidden
          className="pointer-events-none absolute inset-y-0 left-0 w-[60px] bg-[linear-gradient(90deg,rgba(255,255,255,0),rgba(255,255,255,0.35),rgba(255,255,255,0))] motion-safe:animate-sheen"
        />
      )}
      {icon && <span className="relative shrink-0 [&>svg]:size-[1.15em]">{icon}</span>}
      <span className="relative">{children}</span>
      {iconRight && <span className="relative shrink-0 [&>svg]:size-[1.05em]">{iconRight}</span>}
    </>
  )

  if ('href' in rest && rest.href) {
    const { href, ...anchorRest } = rest as AnchorProps
    const external = /^https?:\/\//.test(href)
    return (
      <a href={href} className={classes} {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})} {...anchorRest}>
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
