"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import HeroCanvas from "./HeroCanvas";
import { PORTRAIT_INTERVAL, portraits, site, ticker } from "@/lib/data";

/**
 * The masthead types itself. Writes straight to the text node rather than
 * through state - at 34-62ms a tick, setState would reconcile the whole hero
 * ~25x a second - and only files copy while the masthead is on screen.
 */
function useTicker(ref: React.RefObject<HTMLSpanElement | null>) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.textContent = ticker[0];
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let idx = 0;
    let char = ticker[0].length;
    let deleting = false;
    let timer: ReturnType<typeof setTimeout> | null = null;
    let running = false;

    const tick = () => {
      const word = ticker[idx];
      char += deleting ? -1 : 1;
      el.textContent = word.slice(0, char);

      let delay = deleting ? 34 : 62;
      if (!deleting && char === word.length) {
        delay = 1600;
        deleting = true;
      } else if (deleting && char === 0) {
        deleting = false;
        idx = (idx + 1) % ticker.length;
        delay = 260;
      }
      timer = setTimeout(tick, delay);
    };

    const io = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !running) {
        running = true;
        timer = setTimeout(tick, 1600);
      } else if (!entry.isIntersecting && running) {
        running = false;
        if (timer) clearTimeout(timer);
        timer = null;
      }
    });
    io.observe(el);

    return () => {
      io.disconnect();
      if (timer) clearTimeout(timer);
    };
  }, [ref]);
}

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

const ROMAN = [
  "", "I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X",
  "XI", "XII", "XIII", "XIV", "XV", "XVI", "XVII", "XVIII", "XIX", "XX",
];

/**
 * Masthead volume, counted the way a masthead counts: Vol. I runs through
 * the founding year, so the volume is the number of years the title has
 * been publishing. Derived rather than typed in, because the page is
 * statically prerendered and a literal goes quietly stale each January.
 */
function volume() {
  const n = new Date().getFullYear() - site.established + 1;
  return ROMAN[n] ?? String(n);
}

export default function Hero() {
  const tickerRef = useRef<HTMLSpanElement>(null);
  useTicker(tickerRef);

  const portraitRef = useRef<HTMLDivElement>(null);
  const frame = usePortraitCycle(portraitRef, portraits.length);

  return (
    <section className="hero wrap" aria-label="Introduction">
      <HeroCanvas />
      <div className="hero-grid">
        <div>
          <div className="masthead-rule">
            {/* The build stamps its own year into the static HTML; on a
                reader arriving after the turn of the year, the client's
                clock wins and the numeral corrects itself. */}
            <span className="vol" suppressHydrationWarning>
              Vol. {volume()} · Est. {site.established}
            </span>
            <span className="spacer" />
            <span>Now filing:&nbsp;</span>
            <span className="ticker" aria-live="off">
              <span ref={tickerRef} />
              <span className="cursor" aria-hidden="true" />
            </span>
          </div>

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
            <div className="frame-stack">
              {portraits.map((p, i) => (
                <Image
                  key={p.src}
                  src={p.src}
                  alt={p.alt}
                  fill
                  sizes="(max-width: 62rem) 80vw, 27rem"
                  // Only the first frame is the LCP candidate; the others
                  // still load eagerly so the first swap never shows a gap.
                  priority={i === 0}
                  loading={i === 0 ? undefined : "eager"}
                  className={i === frame ? "is-current" : undefined}
                />
              ))}
            </div>
          </div>
          <div className="cap">
            <span>Harsh V Singh</span>
            <span>Assoc. Director</span>
          </div>
        </div>
      </div>
    </section>
  );
}
