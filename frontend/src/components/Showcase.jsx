import { useLayoutEffect, useRef } from 'react'
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion'
import gsap from '../lib/gsap'
import Section from './Section'
import heroImage from '../assets/hero.png'

export default function Showcase() {
  const root = useRef(null)
  const reduced = usePrefersReducedMotion()

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      if (reduced) return
      gsap.from('.project', {
        opacity: 0,
        y: 24,
        duration: 0.9,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: root.current,
          start: 'top 76%',
        },
      })
    }, root)

    return () => ctx.revert()
  }, [reduced])

  return (
    <Section ref={root} className="showcase" id="work">
      <div className="mx-auto w-[min(100%-(var(--page-pad)*2),var(--max))]">
        <div className="mb-[clamp(2.5rem,6vw,4.5rem)] flex flex-col items-center gap-6 text-center max-[720px]:gap-[0.7rem]">
          <p className="m-0 font-(--font-mono) text-[0.72rem] uppercase tracking-[0.16em] text-(--text-muted)">Selected work</p>
          <h2 className="m-0 text-[clamp(2rem,4.6vw,3.6rem)] font-medium leading-[1.05] tracking-[-0.045em]">Recent work</h2>
        </div>
        <div className="grid grid-cols-2 gap-x-6 gap-y-[clamp(2.5rem,6vw,5.5rem)] max-[720px]:grid-cols-1 max-[720px]:gap-y-11">
          <article className="project group col-span-full mx-auto w-full max-w-215">
            <div className="project__image grid aspect-16/10 place-items-center overflow-hidden border border-(--line) bg-[#d7d6d1]"><img className="h-[78%] w-[58%] object-contain grayscale contrast-[1.15] transition-[transform,filter] duration-700 ease-out group-hover:scale-[1.06] group-hover:grayscale-[0.3] group-hover:contrast-[1.08]" src={heroImage} alt="Abstract layered identity system" /></div>
            <div className="grid grid-cols-[1fr_auto] items-baseline gap-4 pt-[0.9rem]"><h3 className="m-0 text-base font-medium">Axis / Identity System</h3><p className="col-start-1 m-0 text-[0.82rem] text-(--text-muted)">Brand identity · 2026</p><span className="col-start-2 row-span-2 row-start-1 -translate-x-2 translate-y-2 text-(--accent) opacity-0 transition-[opacity,transform] duration-260 ease-out group-hover:translate-x-0 group-hover:translate-y-0 group-hover:opacity-100" aria-hidden="true">↗</span></div>
          </article>
          <article className="project group max-[720px]:col-span-1">
            <div className="project__image grid aspect-16/10 place-items-center overflow-hidden border border-(--line) bg-[#c8d2d4]"><img className="h-[78%] w-[58%] object-contain grayscale contrast-[1.15] transition-[transform,filter] duration-700 ease-out group-hover:scale-[1.06] group-hover:grayscale-[0.3] group-hover:contrast-[1.08]" src={heroImage} alt="Abstract digital experience composition" /></div>
            <div className="grid grid-cols-[1fr_auto] items-baseline gap-4 pt-[0.9rem]"><h3 className="m-0 text-base font-medium">Northstar / Digital</h3><p className="col-start-1 m-0 text-[0.82rem] text-(--text-muted)">Digital experience · 2025</p><span className="col-start-2 row-span-2 row-start-1 -translate-x-2 translate-y-2 text-(--accent) opacity-0 transition-[opacity,transform] duration-260 ease-out group-hover:translate-x-0 group-hover:translate-y-0 group-hover:opacity-100" aria-hidden="true">↗</span></div>
          </article>
          <article className="project group max-[720px]:col-span-1">
            <div className="project__image grid aspect-16/10 place-items-center overflow-hidden border border-(--line) bg-[#d3cbbd]"><img className="h-[78%] w-[58%] object-contain grayscale contrast-[1.15] transition-[transform,filter] duration-700 ease-out group-hover:scale-[1.06] group-hover:grayscale-[0.3] group-hover:contrast-[1.08]" src={heroImage} alt="Abstract motion and content composition" /></div>
            <div className="grid grid-cols-[1fr_auto] items-baseline gap-4 pt-[0.9rem]"><h3 className="m-0 text-base font-medium">Object / Campaign</h3><p className="col-start-1 m-0 text-[0.82rem] text-(--text-muted)">Content direction · 2025</p><span className="col-start-2 row-span-2 row-start-1 -translate-x-2 translate-y-2 text-(--accent) opacity-0 transition-[opacity,transform] duration-260 ease-out group-hover:translate-x-0 group-hover:translate-y-0 group-hover:opacity-100" aria-hidden="true">↗</span></div>
          </article>
        </div>
      </div>
    </Section>
  )
}
