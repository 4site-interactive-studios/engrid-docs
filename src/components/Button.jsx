import Link from 'next/link'
import clsx from 'clsx'
import { isValidElement } from 'react'

const variantStyles = {
  primary:
    'rounded-full bg-sky-300 text-sm font-semibold text-slate-900 hover:bg-sky-200 focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-300/50 active:bg-sky-500',
  secondary:
    'rounded-full bg-slate-800 text-sm font-medium text-white hover:bg-slate-700 focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white/50 active:text-slate-400',
  tertiary:
    'rounded-full ring-1 ring-slate-300 text-sm text-slate-900 hover:bg-slate-100 focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-300/50',
}

const sizeStyles = {
  sm: 'py-1.5 px-3 text-xs',
  md: 'py-2 px-4 text-sm',
  lg: 'py-3 px-6 text-base',
}

export function Button({
  href,
  variant = 'primary',
  size = 'md',
  target = '_self',
  rel,
  className,
  children,
  ...props
}) {
  const classes = clsx(
    'not-prose',
    variantStyles[variant] || variantStyles.primary,
    sizeStyles[size] || sizeStyles.md,
    className
  )

  // Ensure security best-practice for new tabs
  const computedRel = target === '_blank' ? rel ?? 'noopener noreferrer' : rel

  // Unwrap a single paragraph Markdoc may inject around slotted content
  let content = children
  if (Array.isArray(content) && content.length === 1) {
    content = content[0]
  }
  if (isValidElement(content) && content.type === 'p') {
    content = content.props.children
  }

  return href ? (
    <Link
      href={href}
      className={classes}
      target={target}
      rel={computedRel}
      {...props}
    >
      {content}
    </Link>
  ) : (
    <button className={classes} {...props}>
      {content}
    </button>
  )
}
