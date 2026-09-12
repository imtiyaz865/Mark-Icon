import { useLayoutEffect, useRef } from "react";
import { usePrefersReducedMotion } from "../hooks/usePrefersReducedMotion";
import gsap from "../lib/gsap";
import Button from "./Button";
import GridBackground from "./GridBackground";

export default function Hero() {
  const root = useRef(null);
  const reduced = usePrefersReducedMotion();

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      if (reduced) return;

      gsap.set(".hero__eyebrow, .hero__lede, .hero__actions", {
        opacity: 0,
        y: 12,
      });
      gsap.set(".hero__line-inner", { y: "110%", opacity: 0 });
      gsap.set(".hero__rule", { scaleX: 0 });

      gsap
        .timeline({ defaults: { ease: "power3.out" } })
        .to(".hero__eyebrow", { opacity: 1, y: 0, duration: 0.7, delay: 0.12 })
        .to(
          ".hero__line-inner",
          {
            y: "0%",
            opacity: 1,
            duration: 1.05,
            stagger: 0.12,
            ease: "expo.out",
          },
          "-=0.25",
        )
        .to(
          ".hero__rule",
          { scaleX: 1, duration: 0.7, ease: "power2.out" },
          "-=0.55",
        )
        .to(".hero__lede", { opacity: 1, y: 0, duration: 0.7 }, "-=0.35")
        .to(".hero__actions", { opacity: 1, y: 0, duration: 0.65 }, "-=0.45");
    }, root);

    return () => ctx.revert();
  }, [reduced]);

  return (
    <section
      ref={root}
      className="relative z-1 flex min-h-svh overflow-hidden py-[calc(var(--nav-h)+clamp(2.5rem,8vw,6rem))] pb-[clamp(3rem,8vw,5rem)] max-[820px]:min-h-0 max-[820px]:pt-[calc(var(--nav-h)+3.5rem)]"
      id="top"
      aria-label="Introduction"
    >
      <GridBackground />
      <div className="relative z-10 mx-auto grid w-[min(100%-(var(--page-pad)*2),1320px)] content-center justify-items-center gap-[clamp(1.75rem,4.5vw,3.5rem)] text-center">
        <div className="w-full max-w-[min(100%,72rem)]">
          <p className="hero__eyebrow m-0 mb-[1.4rem] font-(--font-mono) text-[0.72rem] uppercase tracking-[0.16em] text-(--text-muted) flex justify-center items-center gap-2">
            <p className="h-2 w-2 bg-green-500 rounded-full"></p>
            MARK ICON — A CREATIVE AGENCY
          </p>
          <h1 className="mx-auto m-0 w-full max-w-[12em] text-[clamp(3.1rem,10.4vw,8.4rem)] font-medium leading-[0.92] tracking-[-0.065em] text-balance">
            <span className="block overflow-hidden py-[0.08em] my-[-0.08em]">
              <span className="hero__line-inner block">We turn ideas</span>
            </span>
            <span className="block overflow-hidden py-[0.08em] my-[-0.08em]">
              <span className="hero__line-inner block">into icons.</span>
            </span>
          </h1>
        </div>

        <div
          className="hero__rule h-px w-12 origin-center bg-(--accent)"
          aria-hidden="true"
        />

        <div className="grid justify-items-center gap-8">
          <p className="hero__lede m-0 max-w-xl text-[clamp(1.05rem,2vw,1.22rem)] leading-[1.55] text-(--text-muted)">
            We build distinct brands, digital experiences, and content people
            remember.
          </p>
          <div className="hero__actions flex flex-row flex-nowrap justify-center gap-2 max-[820px]:w-full max-[820px]:max-w-[22rem] [&_.btn]:min-w-0 [&_.btn]:flex-1 [&_.btn]:justify-center">
            <Button href="#work">View our work</Button>
            <Button href="#contact" variant="ghost">
              Let's talk
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
