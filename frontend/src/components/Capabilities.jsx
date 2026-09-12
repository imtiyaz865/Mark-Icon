import { useLayoutEffect, useRef, useState } from "react";
import { usePrefersReducedMotion } from "../hooks/usePrefersReducedMotion";
import gsap from "../lib/gsap";
import Section from "./Section";
import brandImage from "../assets/image.png";
import creativeImage from "../assets/image2.png";
import videoImage from "../assets/image3.png";
import socialImage from "../assets/image4.png";
import digitalImage from "../assets/image5.png";

const ITEMS = [
  {
    title: "Brand & Visual Identity",
    description:
      "Distinct identities with the clarity and character to stay recognizable.",
    image: brandImage,
  },
  {
    title: "Creative Direction",
    description:
      "A focused point of view that gives every touchpoint the same pulse.",
    image: creativeImage,
  },
  {
    title: "Video & Motion",
    description:
      "Motion and film that make the idea felt before it is explained.",
    image: videoImage,
  },
  {
    title: "Social Content",
    description: "Sharp, flexible content built to make attention feel earned.",
    image: socialImage,
  },
  {
    title: "Digital Experiences",
    description:
      "Digital worlds that turn a clear idea into something people can use.",
    image: digitalImage,
  },
];

export default function Capabilities() {
  const root = useRef(null);
  const rowRefs = useRef([]);
  const detailRefs = useRef([]);
  const imageRefs = useRef([]);
  const [activeTouch, setActiveTouch] = useState(null);
  const reduced = usePrefersReducedMotion();

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      if (reduced) return;
      gsap.from(".capability", {
        y: 32,
        opacity: 0,
        duration: 0.85,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: root.current,
          start: "top 74%",
        },
      });
    }, root);

    return () => ctx.revert();
  }, [reduced]);

  const animateRow = (index, visible) => {
    const detail = detailRefs.current[index];
    if (!detail) return;

    gsap.to(detail, {
      height: visible ? detail.scrollHeight : 0,
      opacity: visible ? 1 : 0,
      duration: reduced ? 0 : visible ? 0.55 : 0.35,
      ease: "power3.out",
      overwrite: true,
    });
  };

  const getImagePosition = (event, index) => {
    const row = rowRefs.current[index];
    const image = imageRefs.current[index];

    if (!row || !image) {
      return { x: 0, y: 0, rotation: 0 };
    }

    const bounds = row.getBoundingClientRect();

    const imageWidth = image.offsetWidth;
    const imageHeight = image.offsetHeight;

    const cursorX = event.clientX - bounds.left;
    const cursorY = event.clientY - bounds.top;

    // Keep image completely visible inside its row horizontally
    const x = Math.min(
      Math.max(cursorX - imageWidth / 2, -imageWidth * 0.25),
      bounds.width - imageWidth + imageWidth * 0.25,
    );

    // Allow image to overflow the row vertically,
    // so it can sit beautifully between rows.
    const y = cursorY - imageHeight / 2;

    // Rotation only from LEFT ↔ RIGHT cursor movement
    const centerX = bounds.width / 2;

    const normalizedX = Math.max(
      -1,
      Math.min(1, (cursorX - centerX) / centerX),
    );

    const rotation = normalizedX * 4;

    return {
      x,
      y,
      rotation,
    };
  };

  const showImage = (index, x, y, rotation = 0) => {
    const image = imageRefs.current[index];
    if (!image) return;

    gsap.killTweensOf(image);

    gsap.set(image, {
      x,
      y,
      rotation,
      scale: 0.94,
      autoAlpha: 0,
    });

    gsap.to(image, {
      autoAlpha: 1,
      scale: 1,
      duration: reduced ? 0 : 0.4,
      ease: "power3.out",
      overwrite: true,
    });
  };

  const hideImage = (index) => {
    const image = imageRefs.current[index];
    if (!image) return;

    gsap.to(image, {
      autoAlpha: 0,
      scale: 0.94,
      duration: reduced ? 0 : 0.3,
      ease: "power2.out",
      overwrite: true,
    });
  };

  const moveImage = (index, x, y, rotation) => {
    const image = imageRefs.current[index];
    if (!image) return;

    gsap.to(image, {
      x,
      y,
      rotation,
      duration: reduced ? 0 : 0.5,
      ease: "power3.out",
      overwrite: "auto",
    });
  };

  const handleEnter = (event, index) => {
    if (window.matchMedia("(pointer: coarse)").matches) return;

    animateRow(index, true);

    requestAnimationFrame(() => {
      const { x, y, rotation } = getImagePosition(event, index);
      showImage(index, x, y, rotation);
    });
  };

  const handleMove = (event, index) => {
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const { x, y, rotation } = getImagePosition(event, index);

    moveImage(index, x, y, rotation);
  };

  const handleLeave = (index) => {
    if (window.matchMedia("(pointer: coarse)").matches) return;

    animateRow(index, false);
    hideImage(index);
  };

  const handleTouch = (index) => {
    if (!window.matchMedia("(pointer: coarse)").matches) return;

    const next = activeTouch === index ? null : index;

    setActiveTouch(next);

    animateRow(index, next !== null);

    if (activeTouch !== null && activeTouch !== index) {
      animateRow(activeTouch, false);
    }
  };

  return (
    <Section ref={root} className="capabilities" id="services">
      <div className="mx-auto w-[min(100%-(var(--page-pad)*2),var(--max))] overflow-hidden">
        <div className="mb-[clamp(2.5rem,6vw,4.5rem)] flex flex-col items-center gap-6 text-center max-[720px]:gap-[0.7rem]">
          <p className="m-0 font-(--font-mono) text-[0.72rem] uppercase tracking-[0.16em] text-(--text-muted)">
            Our services
          </p>
          <h2 className="m-0 text-[clamp(2rem,4.6vw,3.6rem)] font-medium leading-[1.05] tracking-[-0.045em]">
            What we do
          </h2>
        </div>
        <ol className="relative  m-0 list-none border-t border-(--line) p-0">
          {ITEMS.map((item, index) => (
            <li
              className={`capability group relative cursor-pointer  border-b border-(--line) text-(--text) transition-colors duration-500 ease-out hover:bg-(--accent) hover:text-(--bg) hover: ${activeTouch === index ? "text-(--accent)" : ""}`}
              key={item.title}
              ref={(element) => {
                rowRefs.current[index] = element;
              }}
              onMouseEnter={(event) => handleEnter(event, index)}
              onMouseMove={(event) => handleMove(event, index)}
              onMouseLeave={() => handleLeave(index)}
              onClick={() => handleTouch(index)}
              role="button"
              tabIndex="0"
              aria-expanded={activeTouch === index}
            >
              <div className="grid min-h-[clamp(5rem,9vw,7rem)] grid-cols-[4rem_1fr_auto] items-center gap-4 px-[clamp(0.25rem,1vw,0.75rem)] py-5 max-[900px]:grid-cols-[2.5rem_1fr_auto] max-[520px]:min-h-20 max-[520px]:gap-3 ">
                <span className="relative z-10 font-(--font-mono) text-[0.72rem] tracking-[0.14em] text-(--accent) group-hover:text-(--bg) ">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className="relative z-10 m-0 text-[clamp(1.35rem,2.4vw,1.9rem)] font-medium leading-normal tracking-[-0.04em]">
                  {item.title}
                </h3>
                <span
                  className="relative z-10 text-xl transition-transform duration-320 ease-out group-hover:translate-x-1"
                  aria-hidden="true"
                >
                  ↗
                </span>
              </div>
              <div
                ref={(element) => {
                  detailRefs.current[index] = element;
                }}
                className="h-0 overflow-hidden opacity-0"
              >
                <p className="m-0 max-w-lg pb-6 pl-[calc(clamp(0.25rem,1vw,0.75rem)+4rem+1rem)] pr-16 text-[0.98rem] leading-[1.6] text-(--text-muted) max-[900px]:pl-[calc(clamp(0.25rem,1vw,0.75rem)+2.5rem+0.75rem)] max-[520px]:pb-5 max-[520px]:pl-[calc(clamp(0.25rem,1vw,0.75rem)+2.5rem+0.75rem)] max-[520px]:pr-8">
                  {item.description}
                </p>
              </div>
              <img
                ref={(element) => {
                  imageRefs.current[index] = element;
                }}
                className={`pointer-events-none absolute left-0 top-0 z-99 h-40 w-32 rounded scale-[0.94] opacity-0 object-cover shadow-[0_18px_45px_rgba(0,0,0,0.18)] max-[520px]:h-16 max-[520px]:w-28 ${item.image}`}
                src={item.image}
                alt=""
                aria-hidden="true"
              />
            </li>
          ))}
        </ol>
      </div>
    </Section>
  );
}
