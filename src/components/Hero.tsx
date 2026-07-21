"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import HeroCanvas from "./HeroCanvas";
import { site, ticker } from "@/lib/data";

function useTicker() {
  const [text, setText] = useState(ticker[0]);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let idx = 0;
    let char = ticker[0].length;
    let deleting = false;
    let timer: ReturnType<typeof setTimeout>;

    const tick = () => {
      const word = ticker[idx];
      char += deleting ? -1 : 1;
      setText(word.slice(0, char));

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
    timer = setTimeout(tick, 1600);
    return () => clearTimeout(timer);
  }, []);

  return text;
}

export default function Hero() {
  const live = useTicker();

  return (
    <section className="hero wrap" aria-label="Introduction">
      <HeroCanvas />
      <div className="hero-grid">
        <div>
          <div className="masthead-rule">
            <span className="vol">Vol. IX · Est. 2017</span>
            <span className="spacer" />
            <span>Now filing —&nbsp;</span>
            <span className="ticker" aria-live="off">
              {live}
              <span className="cursor" aria-hidden="true" />
            </span>
          </div>

          <h1 data-reveal>
            Harsh <span className="v">V</span> Singh
          </h1>

          <p
            className="thesis"
            data-reveal
            style={{ "--d": "0.08s" } as React.CSSProperties}
          >
            {site.tagline}
          </p>

          <p
            className="lead"
            data-reveal
            style={{ "--d": "0.16s" } as React.CSSProperties}
          >
            {site.support}
          </p>

          <div
            className="btn-row"
            data-reveal
            style={{ "--d": "0.24s" } as React.CSSProperties}
          >
            <a className="btn btn-primary" href="#contact">
              Get in touch <span className="arrow">→</span>
            </a>
            <a className="btn btn-ghost" href="#career">
              Read the beat
            </a>
          </div>

          <p
            className="whereami"
            data-reveal
            style={{ "--d": "0.3s" } as React.CSSProperties}
          >
            {site.base}
          </p>
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
            <span className="stamp">On the record</span>
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
