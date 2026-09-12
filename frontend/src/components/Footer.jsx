import { scrollToId } from '../lib/scroll'

export default function Footer() {
  const onHash = (event, id) => {
    event.preventDefault()
    scrollToId(id)
  }

  return (
    <footer className="relative z-1 border-t border-(--line) px-0 pb-8 pt-6">
      <div className="mx-auto flex w-[min(100%-(var(--page-pad)*2),1320px)] flex-wrap items-center justify-between gap-x-6 gap-y-[0.85rem] font-(--font-mono) text-[0.72rem] uppercase tracking-[0.08em] text-(--text-muted)">
        <span>© 2026 Mark Icon</span>
        <div className="flex gap-5 [&_a]:transition-colors [&_a]:duration-200 [&_a:hover]:text-(--text)">
          <a href="#services" onClick={(event) => onHash(event, 'services')}>
            Services
          </a>
          <a href="#work" onClick={(event) => onHash(event, 'work')}>
            Work
          </a>
          <a href="mailto:hello@markicon.studio">Contact</a>
        </div>
      </div>
    </footer>
  )
}
