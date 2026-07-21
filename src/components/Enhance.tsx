"use client";

import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(ScrollTrigger, SplitText);

/**
 * Motion conductor. Content is fully present without JS; GSAP only
 * choreographs how it arrives. Reduced-motion users get everything
 * visible immediately, no animation, no WebGL.
 */
export default function Enhance() {
  useEffect(() => {
    const mm = gsap.matchMedia();

    mm.add(
      {
        motion: "(prefers-reduced-motion: no-preference)",
        reduce: "(prefers-reduced-motion: reduce)",
      },
      (ctx) => {
        const { reduce } = ctx.conditions as {
          motion: boolean;
          reduce: boolean;
        };

        const reveals = gsap.utils.toArray<HTMLElement>("[data-reveal]");

        if (reduce) {
          // Reduced motion ≠ no feedback: gentle opacity-only crossfades,
          // zero movement, no parallax, no WebGL, no counters.
          document.documentElement.classList.add("gsap");
          reveals.forEach((el) => el.classList.add("in"));
          gsap.set(reveals, { autoAlpha: 0 });
          ScrollTrigger.batch(reveals, {
            start: "top 92%",
            once: true,
            onEnter: (batch) =>
              gsap.to(batch, {
                autoAlpha: 1,
                duration: 0.5,
                stagger: 0.05,
                overwrite: true,
              }),
          });
          return;
        }

        // GSAP owns the reveals now, disable the CSS fallback transition.
        document.documentElement.classList.add("gsap");
        reveals.forEach((el) => el.classList.add("in"));
        gsap.defaults({ ease: "power3.out", duration: 0.9 });

        const hero = document.querySelector<HTMLElement>(".hero");
        const heads = reveals.filter(
          (el) => el.classList.contains("section-head") && !hero?.contains(el)
        );
        const rest = reveals.filter(
          (el) => !hero?.contains(el) && !el.classList.contains("section-head")
        );

        // ---- Hero: one orchestrated arrival ----
        if (hero) {
          const tl = gsap.timeline();
          tl.from(".masthead-rule", { autoAlpha: 0, y: -14, duration: 0.7 }, 0);

          const h1 = hero.querySelector("h1");
          if (h1) {
            const split = new SplitText(h1, {
              type: "lines,chars",
              linesClass: "split-line",
            });
            tl.from(
              split.chars,
              {
                yPercent: 118,
                duration: 1.05,
                ease: "power4.out",
                stagger: 0.026,
                onComplete: () => split.revert(),
              },
              0.15
            );
          }

          tl.from(".hero .thesis", { autoAlpha: 0, y: 26 }, 0.7)
            .from(".hero .lead", { autoAlpha: 0, y: 22 }, 0.82)
            .from(".hero .btn-row", { autoAlpha: 0, y: 18 }, 0.94)
            .from(".hero .whereami", { autoAlpha: 0, y: 14 }, 1.04)
            .from(
              ".portrait",
              { autoAlpha: 0, y: 34, scale: 0.97, duration: 1.1 },
              0.5
            );

          // The portrait drifts up slightly as the page scrolls away.
          gsap.to(".portrait", {
            y: -42,
            ease: "none",
            scrollTrigger: {
              trigger: ".hero",
              start: "top top",
              end: "bottom top",
              scrub: true,
            },
          });
        }

        // ---- Ledger: the numbers count themselves up ----
        gsap.utils.toArray<HTMLElement>(".stat .fig").forEach((fig, i) => {
          const m = (fig.textContent ?? "").match(/^(\d+)(.*)$/);
          if (!m) return;
          const target = parseInt(m[1], 10);
          const suffix = m[2] ?? "";
          const counter = { v: 0 };
          gsap.to(counter, {
            v: target,
            duration: 1.4,
            delay: i * 0.08,
            ease: "power2.out",
            onUpdate: () => {
              fig.textContent = `${Math.round(counter.v)}${suffix}`;
            },
            scrollTrigger: { trigger: ".ledger", start: "top 85%", once: true },
          });
        });

        // ---- Section heads: kicker slides, title rises ----
        heads.forEach((head) => {
          const kicker = head.querySelector(".kicker");
          const title = head.querySelector(".section-title");
          const lede = head.querySelector(".section-lede");
          const tl = gsap.timeline({
            scrollTrigger: { trigger: head, start: "top 82%", once: true },
          });
          if (kicker) tl.from(kicker, { autoAlpha: 0, x: -18, duration: 0.6 }, 0);
          if (title) tl.from(title, { autoAlpha: 0, y: 30 }, 0.12);
          if (lede) tl.from(lede, { autoAlpha: 0, y: 18, duration: 0.7 }, 0.3);
        });

        // ---- Everything else: batched, staggered arrivals ----
        gsap.set(rest, { autoAlpha: 0, y: 28 });
        ScrollTrigger.batch(rest, {
          start: "top 88%",
          once: true,
          interval: 0.12,
          onEnter: (batch) =>
            gsap.to(batch, {
              autoAlpha: 1,
              y: 0,
              stagger: 0.07,
              duration: 0.85,
              overwrite: true,
            }),
        });

        // Layout settles after images load, keep trigger positions honest.
        const onLoad = () => ScrollTrigger.refresh();
        window.addEventListener("load", onLoad);
        return () => window.removeEventListener("load", onLoad);
      }
    );

    return () => mm.revert();
  }, []);

  return null;
}
