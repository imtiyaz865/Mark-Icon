import { useEffect, useLayoutEffect, useState } from 'react'
import gsap from '../lib/gsap'
import { scrollToId } from '../lib/scroll'
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion'
import ThemeToggle from './ThemeToggle'

const LINKS = [
  { id: 'services', label: 'Services' },
  { id: 'work', label: 'Work' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState('')
  const reduced = usePrefersReducedMotion()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const sections = LINKS.map((link) => document.getElementById(link.id)).filter(Boolean)

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id)
        })
      },
      { rootMargin: '-40% 0px -50% 0px', threshold: 0 },
    )

    sections.forEach((section) => observer.observe(section))
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  useLayoutEffect(() => {
    if (reduced) return undefined
    const tween = gsap.fromTo(
      '.nav',
      { y: -18, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' },
    )
    return () => tween.kill()
  }, [reduced])

  const goTo = (id) => {
    setOpen(false)
    scrollToId(id)
  }

  return (
    <>
      <header className={`nav fixed left-0 right-0 top-0 z-40 border-b transition-[background-color,border-color,backdrop-filter,height] duration-360 ease-out ${scrolled ? 'h-[3.65rem] border-(--line) bg-(--nav-bg) backdrop-blur-2xl' : 'h-(--nav-h) border-transparent bg-transparent backdrop-blur-none'}`}>
        <div className="mx-auto grid h-full w-[min(100%-(var(--page-pad)*2),1320px)] grid-cols-[1fr_auto_1fr] items-center max-[860px]:grid-cols-[1fr_auto]">
          <a className="justify-self-start font-medium tracking-[-0.04em]" href="#top" onClick={(event) => {
            event.preventDefault()
            goTo('top')
          }}>
            MARK ICON
          </a>

          <nav className="flex items-center gap-7 max-[860px]:hidden" aria-label="Primary">
            {LINKS.map((link) => (
              <a
                key={link.id}
                className="group relative py-[0.35rem] text-[0.9rem] tracking-[-0.02em] text-(--text-muted) transition-colors duration-200 hover:text-(--text)"
                href={`#${link.id}`}
                onClick={(event) => {
                  event.preventDefault()
                  goTo(link.id)
                }}
              >
                {link.label}<span className={`absolute bottom-[0.12rem] left-0 h-px w-full origin-left bg-(--accent) transition-transform duration-280 ease-out ${active === link.id ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'}`} aria-hidden="true" />
              </a>
            ))}
          </nav>

          <div className="flex items-center justify-self-end gap-5">
            <ThemeToggle />
            <a
              className="group text-[0.88rem] text-(--text) max-[860px]:hidden"
              href="#contact"
              onClick={(event) => {
                event.preventDefault()
                goTo('contact')
              }}
            >
              Let's talk <span aria-hidden="true">→</span>
            </a>
            <button
              type="button"
              className="hidden min-h-11 items-center font-(--font-mono) text-[0.68rem] uppercase tracking-[0.14em] text-(--text) max-[860px]:inline-flex"
              aria-expanded={open}
              aria-controls="mobile-menu"
              onClick={() => setOpen((value) => !value)}
            >
              {open ? 'Close' : 'Menu'}
            </button>
          </div>
        </div>
      </header>

      <div
        id="mobile-menu"
        className={`hidden fixed inset-0 z-39 flex-col justify-end bg-[color-mix(in_srgb,var(--bg)_94%,transparent)] px-(--page-pad) pb-10 pt-[calc(var(--nav-h)+1.5rem)] backdrop-blur-[18px] transition-[opacity,visibility] duration-280 ease-out max-[860px]:flex ${open ? 'pointer-events-auto visible opacity-100' : 'pointer-events-none invisible opacity-0'}`}
        aria-hidden={!open}
      >
        {LINKS.map((link) => (
          <a
            key={link.id}
            className="block border-b border-(--line) py-[0.85rem] text-[clamp(2rem,10vw,3.4rem)] font-medium leading-[1.1] tracking-tighter"
            href={`#${link.id}`}
            tabIndex={open ? 0 : -1}
            onClick={(event) => {
              event.preventDefault()
              goTo(link.id)
            }}
          >
            {link.label}
          </a>
        ))}
        <a
          className="block border-b border-(--line) py-[0.85rem] text-[clamp(2rem,10vw,3.4rem)] font-medium leading-[1.1] tracking-tighter"
          href="#contact"
          tabIndex={open ? 0 : -1}
          onClick={(event) => {
            event.preventDefault()
            goTo('contact')
          }}
        >
          Let's talk
        </a>
      </div>
    </>
  )
}
