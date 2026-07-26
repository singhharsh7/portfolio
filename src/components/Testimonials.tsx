"use client";

import { useEffect, useState } from "react";
import SectionHead from "./SectionHead";
import { TestimonialsColumn } from "@/components/ui/testimonials-columns-1";
import { testimonials } from "@/lib/data";

// Slow, and deliberately coprime-ish so the three columns never fall into
// step with one another.
const DURATIONS = [38, 46, 42];

export default function Testimonials() {
  const feature = testimonials.find((t) => t.feature);
  const rest = testimonials.filter((t) => !t.feature);

  const count = useColumnCount();
  const columns = intoColumns(rest, count);
  const [paused, setPaused] = useState(false);

  return (
    <section className="section" id="voices" aria-labelledby="voices-title">
      <div className="wrap">
        <SectionHead
          index="05"
          label="On the record"
          title={
            <span id="voices-title">
              What editors, deans &amp; <em>clients</em> say
            </span>
          }
          lede="Attributions from newsrooms, agencies and lecture halls, not one of them anonymous."
        />

        {feature ? (
          <figure className="feature-quote" data-reveal>
            <blockquote>&ldquo;{feature.quote}&rdquo;</blockquote>
            <figcaption className="by">
              <b>{feature.name}</b>, {feature.title}
            </figcaption>
          </figure>
        ) : null}

        <div
          className="tcols"
          data-reveal
          // Hover is a mouse affordance; a tap must not leave the wall frozen.
          onPointerEnter={(e) => {
            if (e.pointerType === "mouse") setPaused(true);
          }}
          onPointerLeave={(e) => {
            if (e.pointerType === "mouse") setPaused(false);
          }}
        >
          {columns.map((column, i) => (
            <TestimonialsColumn
              key={i}
              testimonials={column}
              duration={DURATIONS[i % DURATIONS.length]}
              paused={paused}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

/**
 * Three columns on desktop, two on tablet, one on a phone -- matching the
 * breakpoints the rest of the stylesheet uses.
 *
 * It starts at three to match the server pass, then corrects on mount. No
 * flash: the section is the fifth on the page and its GSAP reveal keeps it
 * at `autoAlpha: 0` until it is scrolled to, long after this has settled.
 */
function useColumnCount() {
  const [count, setCount] = useState(3);

  useEffect(() => {
    const md = window.matchMedia("(min-width: 48rem)");
    const lg = window.matchMedia("(min-width: 72rem)");
    const sync = () => setCount(lg.matches ? 3 : md.matches ? 2 : 1);
    sync();
    md.addEventListener("change", sync);
    lg.addEventListener("change", sync);
    return () => {
      md.removeEventListener("change", sync);
      lg.removeEventListener("change", sync);
    };
  }, []);

  return count;
}

/**
 * Round-robin rather than slice: every column carries a spread of the roster
 * instead of one column getting the leftovers, and the columns come out close
 * to the same height, so a single duration reads as the same speed in each.
 */
function intoColumns<T>(items: T[], count: number): T[][] {
  const columns: T[][] = Array.from({ length: count }, () => []);
  items.forEach((item, i) => columns[i % count].push(item));
  return columns;
}
