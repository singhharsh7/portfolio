"use client";

import { useEffect, useRef, useState } from "react";
import { getLenis } from "@/lib/lenis-store";

// Ring geometry. The dash offset is driven from the same 0-1 progress the
// masthead rail uses, so the two never disagree about how far down we are.
const R = 15.5;
const CIRCUMFERENCE = 2 * Math.PI * R;

// Below this the button would just be covering the hero for no reason.
const SHOW_AT = 0.06;

/**
 * A scroll dial pinned to the bottom-right: the ring fills as the page is
 * read, the centre counts the percentage, and pressing it returns to the top.
 *
 * The scroll handler follows the rule the masthead set - document height is
 * measured on resize and load, never inside the handler, since reading
 * `scrollHeight` there forces a reflow on every frame of every scroll. The
 * ring and the numerals are written straight to the DOM; React only hears
 * about the crossing of the visibility threshold.
 */
export default function ScrollTop() {
  const [shown, setShown] = useState(false);
  const ringRef = useRef<SVGCircleElement>(null);
  const numRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    let max = 0;
    let last = -1;

    const measure = () => {
      max = document.documentElement.scrollHeight - window.innerHeight;
    };

    const onScroll = () => {
      const p = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0;
      setShown(p > SHOW_AT);

      const pct = Math.round(p * 100);
      if (pct === last) return; // nothing to repaint between whole percent
      last = pct;
      if (ringRef.current) {
        ringRef.current.style.strokeDashoffset = String(
          CIRCUMFERENCE * (1 - p)
        );
      }
      if (numRef.current) numRef.current.textContent = `${pct}`;
    };

    measure();
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", measure);
    window.addEventListener("load", measure);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", measure);
      window.removeEventListener("load", measure);
    };
  }, []);

  const toTop = () => {
    // Lenis owns scrolling when it is running; calling window.scrollTo behind
    // its back would be fought back by the next frame of its loop. Reduced
    // motion never gets an instance, and lands at the top immediately.
    const lenis = getLenis();
    if (lenis) {
      lenis.scrollTo(0);
      return;
    }
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" });
  };

  return (
    <button
      type="button"
      className="scroll-dial"
      data-shown={shown ? "" : undefined}
      // Hidden from the tab order until it does something, so keyboard users
      // don't collect a dead control on every page.
      tabIndex={shown ? 0 : -1}
      aria-hidden={shown ? undefined : true}
      onClick={toTop}
      aria-label="Back to top"
    >
      <svg viewBox="0 0 36 36" aria-hidden="true">
        <circle className="dial-track" cx="18" cy="18" r={R} />
        <circle
          ref={ringRef}
          className="dial-fill"
          cx="18"
          cy="18"
          r={R}
          style={{
            strokeDasharray: CIRCUMFERENCE,
            strokeDashoffset: CIRCUMFERENCE,
          }}
        />
      </svg>
      <span className="dial-pct" aria-hidden="true">
        <span ref={numRef}>0</span>%
      </span>
      <span className="dial-arrow" aria-hidden="true">
        ↑
      </span>
    </button>
  );
}
