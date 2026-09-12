import { scrollToId } from '../lib/scroll'

export default function Button({
  as = 'a',
  href,
  type = 'button',
  variant = 'primary',
  children,
  onClick,
  className = '',
}) {
  const Tag = as
  const extra = Tag === 'a' ? { href } : { type }
  const variantClasses = variant === 'primary'
    ? 'bg-[var(--accent)] text-[var(--accent-text)] hover:bg-[var(--text)] hover:text-[var(--bg)]'
    : 'border-[var(--line-strong)] bg-transparent text-[var(--text)] hover:border-[var(--accent)] hover:bg-[var(--accent)] hover:text-[var(--accent-text)]'

  const handleClick = (event) => {
    if (href?.startsWith('#') && href.length > 1) {
      event.preventDefault()
      scrollToId(href.slice(1))
    }
    onClick?.(event)
  }

  return (
    <Tag
      className={`relative inline-flex min-h-12 items-center gap-[0.7rem] rounded-(--radius) border px-[1.2rem] py-3 text-[0.94rem] font-medium tracking-[-0.02em] transition-[background-color,color,border-color] duration-220 ease-out pointer-coarse:min-h-[3.15rem] pointer-coarse:px-[1.15rem] ${variant === 'primary' ? 'border-transparent' : ''} ${variantClasses} ${className}`.trim()}
      onClick={handleClick}
      {...extra}
    >
      <span className="inline-flex">{children}</span>
      <span className="inline-flex text-[1.05em] leading-none" aria-hidden="true">
        →
      </span>
    </Tag>
  )
}
