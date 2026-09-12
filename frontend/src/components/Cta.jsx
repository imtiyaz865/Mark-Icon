import { useLayoutEffect, useRef } from "react";
import { usePrefersReducedMotion } from "../hooks/usePrefersReducedMotion";
import gsap from "../lib/gsap";
import Button from "./Button";
import Section from "./Section";
import GridBackground from "../components/GridBackground";

export default function Cta() {
  const root = useRef(null);
  const reduced = usePrefersReducedMotion();

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      if (reduced) return;
      gsap.from(".cta__title, .cta__text, .cta .btn", {
        y: 24,
        opacity: 0,
        duration: 0.85,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: root.current,
          start: "top 78%",
        },
      });
    }, root);

    return () => ctx.revert();
  }, [reduced]);

  return (
    <Section
      ref={root}
      className="text-center pb-[clamp(4rem,10vw,7rem)]"
      id="contact"
    >
      <GridBackground />
      <div className="mx-auto w-[min(100%-(var(--page-pad)*2),var(--max))]">
        <h2 className="cta__title mx-auto mb-6 max-w-[15ch] text-[clamp(2.8rem,8vw,6.4rem)] font-medium leading-[0.95] tracking-[-0.06em]">
          Have an idea worth making iconic?
        </h2>
        <p className="cta__text mx-auto mb-9 max-w-[32rem] text-[1.08rem] leading-[1.6] text-[var(--text-muted)]">
          Let’s build something people remember.
        </p>
        <Button href="mailto:hello@markicon.studio">Start a project</Button>
      </div>
    </Section>
  );
}
