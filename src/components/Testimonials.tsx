"use client";

import { useRef, useEffect, useState } from "react";
import SectionHead from "./SectionHead";
import { testimonials } from "@/lib/data";

function initials(name: string) {
  const parts = name.split(" ");
  return parts[0][0] + (parts.length > 1 ? parts[parts.length - 1][0] : "");
}

export default function Testimonials() {
  const feature = testimonials.find((t) => t.feature);
  const rest = testimonials.filter((t) => !t.feature);

  const sliderRef = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = useState(false);

  const scrollLeft = () => {
    if (sliderRef.current) {
      const cardWidth = sliderRef.current.firstElementChild?.clientWidth || 300;
      sliderRef.current.scrollBy({ left: -(cardWidth + 24), behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (sliderRef.current) {
      const el = sliderRef.current;
      const cardWidth = el.firstElementChild?.clientWidth || 300;
      
      // If we are at the end, scroll back to the start
      if (el.scrollLeft + el.clientWidth >= el.scrollWidth - 10) {
        el.scrollTo({ left: 0, behavior: "smooth" });
      } else {
        el.scrollBy({ left: cardWidth + 24, behavior: "smooth" });
      }
    }
  };

  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      scrollRight();
    }, 4500); // Auto-slide every 4.5 seconds

    return () => clearInterval(interval);
  }, [isPaused]);

  return (
    <section className="section" id="voices" aria-labelledby="voices-title">
      <div className="wrap">
        <SectionHead
          index="04"
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
          className="t-slider-wrap" 
          data-reveal
          onPointerEnter={(e) => {
            if (e.pointerType === "mouse") setIsPaused(true);
          }}
          onPointerLeave={(e) => {
            if (e.pointerType === "mouse") setIsPaused(false);
          }}
        >
          <div className="t-nav">
            <button onClick={scrollLeft} aria-label="Previous testimonials" type="button">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
            </button>
            <button onClick={scrollRight} aria-label="Next testimonials" type="button">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
            </button>
          </div>
          
          <div className="t-slider" ref={sliderRef}>
            {rest.map((t) => (
              <figure className="t-card" key={t.name}>
                <span className="mark" aria-hidden="true">&ldquo;</span>
                <blockquote>{t.quote}</blockquote>
                <figcaption className="by">
                  <span className="t-avatar" aria-hidden="true">{initials(t.name)}</span>
                  <span className="t-who">
                    <span className="n">{t.name}</span>
                    <span className="t">{t.title}</span>
                  </span>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
