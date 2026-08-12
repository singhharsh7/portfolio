"use client";

import { useEffect, useState } from "react";
import Monogram from "@/components/Monogram";
import { nav } from "@/lib/data";

export default function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [stuck, setStuck] = useState(false);
  const [active, setActive] = useState<string>("");

  // Sticky background + scroll-progress rail. The document height can't
  // change while scrolling, so it's measured on resize/load instead of on
  // every scroll event - reading scrollHeight there forces a reflow per frame.
  useEffect(() => {
    const bar = document.getElementById("scroll-progress");
    let max = 0;

    const measure = () => {
      max = document.documentElement.scrollHeight - window.innerHeight;
    };

    const onScroll = () => {
      const y = window.scrollY;
      setStuck(y > 12);
      if (bar) {
        const p = max > 0 ? Math.min(1, Math.max(0, y / max)) : 0;
        bar.style.transform = `scaleX(${p})`;
      }
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

  // Scroll-spy: which section is in the reading band
  useEffect(() => {
    const ids = nav.map((n) => n.id);
    const els = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => !!el);
    if (!els.length) return;

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: "-42% 0px -52% 0px", threshold: 0 }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  // Close menu on Escape
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <header className={`site-header${stuck ? " stuck" : ""}`}>
      <div className="wrap bar">
        <a className="brand" href="#top" aria-label="Harsh V Singh, home">
          <Monogram className="brand-mark" />
          <span className="full">
            Harsh <em>V</em> Singh
          </span>
        </a>

        <nav
          id="primary-nav"
          className={`nav${open ? " open" : ""}`}
          aria-label="Primary"
        >
          {nav.map((n) => (
            <a
              key={n.id}
              href={`#${n.id}`}
              aria-current={active === n.id ? "true" : undefined}
              onClick={() => setOpen(false)}
            >
              {n.label}
            </a>
          ))}
        </nav>

        <button
          className="menu-btn"
          aria-expanded={open}
          aria-controls="primary-nav"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? "Close" : "Menu"}
        </button>
      </div>
    </header>
  );
}
