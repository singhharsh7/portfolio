"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import HeroCanvas from "./HeroCanvas";
import { site, ticker } from "@/lib/data";

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

export default function Hero() {
  const tickerRef = useRef<HTMLSpanElement>(null);
  useTicker(tickerRef);

  return (
    <section className="hero wrap" aria-label="Introduction">
      <HeroCanvas />
      <div className="hero-grid">
        <div>
          <div className="masthead-rule">
            <span className="vol">Vol. IX · Est. 2017</span>
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
          data-reveal
          style={{ "--d": "0.18s" } as React.CSSProperties}
        >
          <div className="frame">
            <Image
              src="/avatar.jpg"
              alt="Portrait of Harsh V Singh"
              fill
              sizes="(max-width: 62rem) 80vw, 27rem"
              priority
            />
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
