"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import HeroCanvas from "./HeroCanvas";
import { PORTRAIT_INTERVAL, portraits, site } from "@/lib/data";

/**
 * The portrait cross-fades between frames on a timer. Same two rules the
 * masthead ticker follows: nothing runs while the hero is off screen, and
 * nothing runs at all under reduced motion - a photograph that swaps itself
 * every few seconds is precisely the unrequested movement that setting is
 * asking us to stop.
 */
function usePortraitCycle(
  ref: React.RefObject<HTMLElement | null>,
  count: number
) {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el || count < 2) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let timer: ReturnType<typeof setInterval> | null = null;
    const stop = () => {
      if (timer) clearInterval(timer);
      timer = null;
    };

    const io = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !timer) {
        timer = setInterval(
          () => setActive((i) => (i + 1) % count),
          PORTRAIT_INTERVAL
        );
      } else if (!entry.isIntersecting) {
        stop();
      }
    });
    io.observe(el);

    return () => {
      io.disconnect();
      stop();
    };
  }, [ref, count]);

  return active;
}

export default function Hero() {

  const portraitRef = useRef<HTMLDivElement>(null);
  const frame = usePortraitCycle(portraitRef, portraits.length);

  return (
    <section className="hero wrap" aria-label="Introduction">
      <HeroCanvas />
      <div className="hero-grid">
        <div>

          <h1 data-reveal>
            Harsh <span className="v">V</span> Singh
          </h1>

          <h2
            className="hero-about-title"
            data-reveal
            style={{ "--d": "0.08s" } as React.CSSProperties}
          >
            About {site.name}
          </h2>

          <p
            className="hero-bio"
            data-reveal
            style={{ "--d": "0.16s" } as React.CSSProperties}
          >
            {site.heroBio.map((part, i) => (
              <span key={part}>
                {i > 0 ? (
                  <span className="sep" aria-hidden="true">
                    |
                  </span>
                ) : null}
                {part}
              </span>
            ))}
          </p>

          <div
            className="hero-contact"
            data-reveal
            style={{ "--d": "0.24s" } as React.CSSProperties}
          >
            <a href={`tel:${site.phoneHref}`}>{site.phone}</a>
            <a href={`mailto:${site.email}`}>{site.email}</a>
          </div>
        </div>

        <div
          className="portrait"
          ref={portraitRef}
          data-reveal
          style={{ "--d": "0.18s" } as React.CSSProperties}
        >
          <div className="frame">
            {/* The stack carries the multiply blend, not the frames
                themselves: two multiplied portraits overlapping mid-fade
                would darken each other into a double exposure. Blending the
                composite once keeps the dissolve clean. */}
            <div 
              className="frame-stack"
              style={{
                display: "flex",
                width: `${portraits.length * 100}%`,
                transform: `translateX(-${(frame * 100) / portraits.length}%)`,
                transition: "transform 0.8s cubic-bezier(0.4, 0, 0.2, 1)"
              }}
            >
              {portraits.map((p, i) => (
                <div key={p.src} style={{ width: `${100 / portraits.length}%`, position: "relative", height: "100%" }}>
                  <Image
                    src={p.src}
                    alt={p.alt}
                    fill
                    sizes="(max-width: 62rem) 80vw, 27rem"
                    // Only the first frame is the LCP candidate; the others
                    // still load eagerly so the first swap never shows a gap.
                    priority={i === 0}
                    loading={i === 0 ? undefined : "eager"}
                  />
                </div>
              ))}
            </div>
          </div>
          <div className="cap">
            <span>Harsh V Singh</span>
            <span>Associate Director</span>
          </div>
        </div>
      </div>

      {/* The fold's one instruction. A plain anchor on purpose: Lenis is
          configured with `anchors`, so it inherits the same eased travel and
          header offset every nav link gets, and it still works - as a jump -
          before the JS lands or if it never does. No data-reveal either; the
          hero timeline animates it by class, which leaves it plainly visible
          rather than stuck at opacity 0 should GSAP fail to load. */}
      <a className="scroll-cue" href="#ledger" aria-label="Scroll to the next section">
        <span className="cue-ring" aria-hidden="true">
          <span className="cue-arrow">↓</span>
        </span>
        <span className="cue-label" aria-hidden="true">
          Read on
        </span>
      </a>
    </section>
  );
}
