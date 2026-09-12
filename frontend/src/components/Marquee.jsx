import { useLayoutEffect, useRef } from 'react'
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion'
import gsap from '../lib/gsap'

const ITEMS = [
  'STRATEGY',
  'DESIGN',
  'MOTION',
  'CONTENT',
  'DIGITAL EXPERIENCES',
  'BRANDING',
]

function Group({ hidden = false }) {
  return (
    <div className="flex shrink-0 items-center gap-[clamp(1.5rem,3vw,3.5rem)]" aria-hidden={hidden}>
      {ITEMS.map((item, index) => (
        <span className="flex shrink-0 items-center gap-[clamp(1.5rem,3vw,3.5rem)]" key={`${item}-${index}`}>
          <span className="whitespace-nowrap text-[clamp(1.35rem,3.2vw,3.5rem)] font-medium leading-none tracking-[-0.045em] text-(--text)">
            {item}
          </span>
          <span className="text-[clamp(0.8rem,1.5vw,1.3rem)] text-(--accent)" aria-hidden="true">
            ✦
          </span>
        </span>
      ))}
    </div>
  )
}

export default function Marquee() {
  const track = useRef(null)
  const reduced = usePrefersReducedMotion()

  useLayoutEffect(() => {
    const element = track.current
    if (!element || reduced) return undefined

    const tween = gsap.to(element, {
      xPercent: -50,
      duration: 34,
      ease: 'none',
      repeat: -1,
    })

    return () => tween.kill()
  }, [reduced])

  return (
    <section className="relative z-1 overflow-hidden border-y border-(--line) py-[clamp(1.5rem,3vw,2.5rem)]" aria-label="Capabilities marquee">
      <div ref={track} className="flex w-max items-center will-change-transform">
        <Group />
        <Group hidden />
      </div>
    </section>
  )
}
