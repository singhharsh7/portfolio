"use client";

import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import Lenis from "lenis";

gsap.registerPlugin(ScrollTrigger, SplitText);

/**
 * Motion conductor. Content is fully present without JS; GSAP only
 * choreographs how it arrives, one signature move per section, carried
 * on Lenis smooth scrolling. Reduced-motion users get gentle opacity
 * crossfades and native scrolling.
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
          // Reduced motion: opacity-only crossfades, zero movement.
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

        document.documentElement.classList.add("gsap");
        reveals.forEach((el) => el.classList.add("in"));
        gsap.defaults({ ease: "power2.out", duration: 1.15 });

        const cleanups: Array<() => void> = [];
        const hero = document.querySelector<HTMLElement>(".hero");

        // ---------- Lenis: inertial smooth scrolling ----------
        const lenis = new Lenis({
          autoRaf: false,
          lerp: 0.09,
          anchors: { offset: -80 },
        });
        lenis.on("scroll", ScrollTrigger.update);
        const raf = (time: number) => lenis.raf(time * 1000);
        gsap.ticker.add(raf);
        gsap.ticker.lagSmoothing(0);
        cleanups.push(() => {
          gsap.ticker.remove(raf);
          lenis.destroy();
          gsap.ticker.lagSmoothing(500, 33);
        });

        // Numbers that count themselves up when their section arrives.
        const countUp = (selector: string, trigger: string) => {
          gsap.utils.toArray<HTMLElement>(selector).forEach((fig, i) => {
            const m = (fig.textContent ?? "").match(/^(\d+)(.*)$/);
            if (!m) return;
            const target = parseInt(m[1], 10);
            const suffix = m[2] ?? "";
            const c = { v: 0 };
            gsap.to(c, {
              v: target,
              duration: 2.2,
              delay: i * 0.12,
              ease: "power2.out",
              onUpdate: () => {
                fig.textContent = `${Math.round(c.v)}${suffix}`;
              },
              scrollTrigger: { trigger, start: "top 82%", once: true },
            });
          });
        };

        // ---------- Header: the masthead bar drops in ----------
        gsap.from(".site-header .bar", { y: -18, autoAlpha: 0, duration: 1 });

        // ---------- Hero: one unhurried arrival ----------
        if (hero) {
          const tl = gsap.timeline();
          tl.from(".masthead-rule", { autoAlpha: 0, y: -16, duration: 1 }, 0);

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
                duration: 1.4,
                ease: "power4.out",
                stagger: 0.045,
                onComplete: () => split.revert(),
              },
              0.2
            );
          }

          tl.from(".hero .thesis", { autoAlpha: 0, y: 30 }, 1.0)
            .from(".hero .lead", { autoAlpha: 0, y: 26 }, 1.18)
            .from(".hero .btn-row", { autoAlpha: 0, y: 22 }, 1.36)
            .from(".hero .whereami", { autoAlpha: 0, y: 16 }, 1.52)
            .from(
              ".portrait",
              { autoAlpha: 0, y: 40, scale: 0.965, duration: 1.5 },
              0.7
            );

          gsap.to(".portrait", {
            y: -46,
            ease: "none",
            scrollTrigger: {
              trigger: ".hero",
              start: "top top",
              end: "bottom top",
              scrub: true,
            },
          });
        }

        // ---------- Ledger: cells cascade, numbers count up ----------
        gsap.from(".stat", {
          y: 28,
          autoAlpha: 0,
          stagger: 0.12,
          scrollTrigger: { trigger: ".ledger", start: "top 82%", once: true },
        });
        countUp(".stat .fig", ".ledger");

        // ---------- Section heads: kicker slides, words rise ----------
        reveals
          .filter(
            (el) =>
              el.classList.contains("section-head") && !hero?.contains(el)
          )
          .forEach((head) => {
            const tl = gsap.timeline({
              scrollTrigger: { trigger: head, start: "top 80%", once: true },
            });
            const kicker = head.querySelector(".kicker");
            const title = head.querySelector<HTMLElement>(".section-title");
            const lede = head.querySelector(".section-lede");
            if (kicker)
              tl.from(kicker, { autoAlpha: 0, x: -22, duration: 0.9 }, 0);
            if (title) {
              const split = new SplitText(title, {
                type: "lines,words",
                linesClass: "split-line",
              });
              tl.from(
                split.words,
                {
                  yPercent: 112,
                  duration: 1.2,
                  ease: "power4.out",
                  stagger: 0.06,
                  onComplete: () => split.revert(),
                },
                0.15
              );
            }
            if (lede) tl.from(lede, { autoAlpha: 0, y: 20, duration: 1 }, 0.45);
          });

        // ---------- About: copy rises, recognition stamps in ----------
        gsap.from(".about-copy p", {
          y: 32,
          autoAlpha: 0,
          stagger: 0.2,
          duration: 1.2,
          scrollTrigger: {
            trigger: ".about-grid",
            start: "top 78%",
            once: true,
          },
        });
        gsap
          .timeline({
            scrollTrigger: {
              trigger: ".recognition",
              start: "top 82%",
              once: true,
            },
          })
          .from(".recognition", { y: 34, autoAlpha: 0, duration: 1.1 })
          .from(
            ".rec-item",
            {
              autoAlpha: 0,
              scale: 1.07,
              y: 10,
              stagger: 0.15,
              duration: 0.7,
              ease: "power2.out",
            },
            0.35
          );

        // ---------- On the desk: cards dealt onto the desk ----------
        gsap.from(".caps .cap", {
          rotationX: 9,
          y: 40,
          autoAlpha: 0,
          transformOrigin: "center top",
          stagger: 0.18,
          duration: 1.2,
          scrollTrigger: { trigger: ".caps", start: "top 80%", once: true },
        });

        // ---------- The beat: a blue line draws down the timeline ----------
        const beat = document.querySelector<HTMLElement>(".beat");
        if (beat) {
          gsap.set(beat, { "--beat-p": 0 });
          gsap.to(beat, {
            "--beat-p": 1,
            ease: "none",
            scrollTrigger: {
              trigger: beat,
              start: "top 65%",
              end: "bottom 60%",
              scrub: true,
            },
          });
          gsap.utils.toArray<HTMLElement>(".dispatch").forEach((row) => {
            gsap.from(row, {
              y: 28,
              autoAlpha: 0,
              duration: 1.1,
              scrollTrigger: { trigger: row, start: "top 87%", once: true },
            });
            ScrollTrigger.create({
              trigger: row,
              start: "top 65%",
              once: true,
              onEnter: () => row.classList.add("lit"),
            });
          });
        }

        // ---------- The file: folders cascade, lists pour out ----------
        gsap.from("details.folder", {
          x: -26,
          autoAlpha: 0,
          stagger: 0.12,
          scrollTrigger: {
            trigger: ".file-grid",
            start: "top 78%",
            once: true,
          },
        });
        gsap.from(".edu", {
          y: 36,
          autoAlpha: 0,
          scrollTrigger: { trigger: ".edu", start: "top 82%", once: true },
        });
        document
          .querySelectorAll<HTMLDetailsElement>("details.folder")
          .forEach((d) => {
            const onToggle = () => {
              if (!d.open) return;
              gsap.from(d.querySelectorAll(".folder-body li"), {
                autoAlpha: 0,
                x: -16,
                stagger: 0.06,
                duration: 0.55,
                ease: "power2.out",
                overwrite: "auto",
              });
            };
            d.addEventListener("toggle", onToggle);
            cleanups.push(() => d.removeEventListener("toggle", onToggle));
          });

        // ---------- On the record: feature wipes in, quotes shuffle ----------
        gsap.from(".feature-quote", {
          clipPath: "inset(0 100% 0 0 round 20px)",
          duration: 1.5,
          ease: "power3.inOut",
          scrollTrigger: {
            trigger: ".feature-quote",
            start: "top 76%",
            once: true,
          },
        });
        const quotes = gsap.utils.toArray<HTMLElement>(".quote");
        if (quotes.length) {
          quotes.forEach((q) =>
            gsap.set(q, {
              autoAlpha: 0,
              y: 30,
              rotation: gsap.utils.random(-2.5, 2.5),
            })
          );
          ScrollTrigger.batch(quotes, {
            start: "top 87%",
            once: true,
            onEnter: (batch) =>
              gsap.to(batch, {
                autoAlpha: 1,
                y: 0,
                rotation: 0,
                duration: 1.1,
                stagger: { each: 0.12, from: "random" },
                overwrite: true,
              }),
          });
        }

        // ---------- Dispatches: the two columns meet in the middle ----------
        gsap.from(".two .column-card:nth-child(odd)", {
          x: -40,
          autoAlpha: 0,
          duration: 1.2,
          scrollTrigger: { trigger: ".two", start: "top 80%", once: true },
        });
        gsap.from(".two .column-card:nth-child(even)", {
          x: 40,
          autoAlpha: 0,
          duration: 1.2,
          scrollTrigger: { trigger: ".two", start: "top 80%", once: true },
        });

        // ---------- In the press: the index files in ----------
        gsap.from(".press-row", {
          x: -30,
          autoAlpha: 0,
          stagger: 0.1,
          duration: 1.1,
          scrollTrigger: {
            trigger: ".press-list",
            start: "top 80%",
            once: true,
          },
        });

        // ---------- Photo journal: prints settle, images drift ----------
        const shots = gsap.utils.toArray<HTMLElement>(".j-photo");
        if (shots.length) {
          gsap.set(shots, { autoAlpha: 0, y: 36, scale: 0.97 });
          ScrollTrigger.batch(shots, {
            start: "top 90%",
            once: true,
            interval: 0.12,
            onEnter: (batch) =>
              gsap.to(batch, {
                autoAlpha: 1,
                y: 0,
                scale: 1,
                duration: 1.2,
                stagger: 0.09,
                overwrite: true,
              }),
          });
          // (Framer Motion owns the lightbox morph and the halftone shader
          //  owns hover, so the frames themselves stay still.)
        }

        // ---------- Currently: cards cascade, numbers count up ----------
        gsap.from(".cur", {
          y: 30,
          autoAlpha: 0,
          stagger: 0.15,
          scrollTrigger: {
            trigger: ".currently",
            start: "top 82%",
            once: true,
          },
        });
        countUp(".cur .fig", ".currently");

        // ---------- FAQ: questions cascade, answers glide open ----------
        gsap.from("details.qa", {
          y: 22,
          autoAlpha: 0,
          stagger: 0.08,
          scrollTrigger: { trigger: ".faq", start: "top 80%", once: true },
        });
        document
          .querySelectorAll<HTMLDetailsElement>("details.qa")
          .forEach((d) => {
            const onToggle = () => {
              const ans = d.querySelector<HTMLElement>(".ans");
              if (!d.open || !ans) return;
              gsap.from(ans, {
                height: 0,
                autoAlpha: 0,
                duration: 0.6,
                ease: "power2.out",
                clearProps: "height",
                overwrite: "auto",
              });
            };
            d.addEventListener("toggle", onToggle);
            cleanups.push(() => d.removeEventListener("toggle", onToggle));
          });

        // ---------- Contact: words rise, pills file in, chips pop ----------
        const shell = document.querySelector<HTMLElement>(".contact-shell");
        if (shell) {
          const ctl = gsap.timeline({
            scrollTrigger: { trigger: shell, start: "top 70%", once: true },
          });
          ctl.from(
            shell.querySelectorAll(".kicker"),
            { autoAlpha: 0, x: -22, duration: 0.9, stagger: 0.15 },
            0
          );
          const h2 = shell.querySelector("h2");
          if (h2) {
            const split = new SplitText(h2, {
              type: "lines,words",
              linesClass: "split-line",
            });
            ctl.from(
              split.words,
              {
                yPercent: 112,
                duration: 1.2,
                ease: "power4.out",
                stagger: 0.055,
                onComplete: () => split.revert(),
              },
              0.15
            );
          }
          ctl
            .from(
              ".contact-lines a",
              { x: -32, autoAlpha: 0, stagger: 0.12, duration: 1 },
              0.6
            )
            .from(
              ".socials a",
              {
                scale: 0.6,
                autoAlpha: 0,
                stagger: 0.07,
                duration: 0.7,
                ease: "back.out(1.7)",
              },
              0.8
            );

          // the blue glow leans toward the cursor
          const onMove = (e: PointerEvent) => {
            const r = shell.getBoundingClientRect();
            const gx = ((e.clientX - r.left) / r.width) * 100;
            const gy = ((e.clientY - r.top) / r.height) * 100;
            gsap.to(shell, {
              "--gx": `${gx}%`,
              "--gy": `${gy}%`,
              duration: 1,
              ease: "power3.out",
              overwrite: "auto",
            });
          };
          shell.addEventListener("pointermove", onMove, { passive: true });
          cleanups.push(() => shell.removeEventListener("pointermove", onMove));
        }

        // ---------- Catch-all for anything not choreographed above ----------
        const dedicated = new Set<Element>(
          document.querySelectorAll(
            ".stat, .caps .cap, .dispatch, details.folder, .edu, .feature-quote, .quote, .column-card, .press-row, .cur, .about-copy p, .recognition, details.qa, .contact-shell [data-reveal]"
          )
        );
        const rest = reveals.filter(
          (el) =>
            !hero?.contains(el) &&
            !el.classList.contains("section-head") &&
            !dedicated.has(el)
        );
        if (rest.length) {
          gsap.set(rest, { autoAlpha: 0, y: 30 });
          ScrollTrigger.batch(rest, {
            start: "top 87%",
            once: true,
            onEnter: (batch) =>
              gsap.to(batch, {
                autoAlpha: 1,
                y: 0,
                stagger: 0.1,
                duration: 1.1,
                overwrite: true,
              }),
          });
        }

        // Layout settles after images load; keep trigger positions honest.
        const onLoad = () => ScrollTrigger.refresh();
        window.addEventListener("load", onLoad);
        cleanups.push(() => window.removeEventListener("load", onLoad));

        return () => cleanups.forEach((fn) => fn());
      }
    );

    return () => mm.revert();
  }, []);

  return null;
}
