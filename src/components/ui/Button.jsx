import { Link } from 'react-router'

const VARIANT_CLASS = {
  dark: 'button--dark',
  ghost: 'button--ghost',
}

export default function Button({
  children,
  variant = 'dark',
  to,
  href,
  type = 'button',
  className = '',
  ...props
}) {
  const classNames = ['button', VARIANT_CLASS[variant] || VARIANT_CLASS.dark, className]
    .filter(Boolean)
    .join(' ')

  if (to) {
    return (
      <Link className={classNames} to={to} {...props}>
        {children}
      </Link>
    )
  }

  if (href) {
    return (
      <a className={classNames} href={href} {...props}>
        {children}
      </a>
    )
  }

  return (
    <button className={classNames} type={type} {...props}>
      {children}
    </button>
  )
}
