# 001 — Fix the scroll-progress rail: stop the per-frame reflow and animate transform

- **Status**: DONE (applied, build-verified; feel checks pending)
- **Commit**: d9aa3fb
- **Severity**: HIGH
- **Category**: Performance
- **Estimated scope**: 2 files, ~30 lines

## Problem

Two defects compound on the site's most constant interaction — scrolling.

**(a) A forced synchronous layout on every scroll event.** `src/components/SiteHeader.tsx:12-25`:

```tsx
// src/components/SiteHeader.tsx:12-25 — current
useEffect(() => {
  const bar = document.getElementById("scroll-progress");
  const onScroll = () => {
    const y = window.scrollY;
    setStuck(y > 12);
    if (bar) {
      const h = document.documentElement.scrollHeight - window.innerHeight;
      bar.style.width = `${h > 0 ? Math.min(100, (y / h) * 100) : 0}%`;
    }
  };
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });
  return () => window.removeEventListener("scroll", onScroll);
}, []);
```

`document.documentElement.scrollHeight` is a layout-dependent read. Reading it inside a scroll handler forces the browser to flush pending style/layout work **on every scroll event** before it can answer. The document height does not change while scrolling, so this recomputation is pure waste — and it runs on every frame that Lenis drives.

**(b) The rail animates `width`, a layout property.** `src/app/globals.css:156-162`:

```css
/* src/app/globals.css:156-162 — current */
.scroll-rail span {
  display: block;
  height: 100%;
  width: 0%;
  background: var(--accent);
  transition: width 0.1s linear;
}
```

`width` triggers layout + paint + composite. Worse, the value is rewritten every frame while a `0.1s` transition is in flight, so the transition constantly retargets and never settles — the rail renders ~100ms behind the actual scroll position, which reads as lag on top of Lenis's own smoothing.

## Target

Cache the scrollable height, recompute it only when it can actually change, and drive the rail with `transform: scaleX()` — a compositor-only property — with no transition at all (the value is already updated every frame).

```css
/* target — src/app/globals.css */
.scroll-rail span {
  display: block;
  height: 100%;
  width: 100%;
  transform: scaleX(0);
  transform-origin: 0 50%;
  background: var(--accent);
  will-change: transform;
}
```

```tsx
/* target — src/components/SiteHeader.tsx */
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
```

## Repo conventions to follow

- The single easing token is `--ease: cubic-bezier(0.2, 0.7, 0.2, 1);` at `src/app/globals.css:49`. This plan adds **no** easing — the rail must not transition.
- The rail markup lives in `src/app/layout.tsx:172-174` and is `aria-hidden`; do not change it.
- Exemplar of correct off-screen/idle discipline in this repo: `src/components/HeroCanvas.tsx:164-172` uses an `IntersectionObserver` to avoid spending frames that aren't needed. Same spirit: don't do work that can't have changed.

## Steps

1. In `src/app/globals.css:156-162`, replace the `.scroll-rail span` rule with the target block above (`width: 100%`, `transform: scaleX(0)`, `transform-origin: 0 50%`, `will-change: transform`, and **remove** `transition: width 0.1s linear`).
2. In `src/components/SiteHeader.tsx:12-25`, replace the entire first `useEffect` with the target block above: add the `max` variable and `measure()` function, switch the write from `bar.style.width` to `bar.style.transform`, and register/unregister the `resize` and `load` listeners alongside `scroll`.
3. Leave the second (`IntersectionObserver` scroll-spy) and third (Escape key) effects untouched.

## Boundaries

- Do NOT touch `src/components/Enhance.tsx` — the Lenis/GSAP wiring there is correct and out of scope.
- Do NOT change the rail's markup in `src/app/layout.tsx`.
- Do NOT change the `stuck` threshold (`y > 12`).
- Do NOT add new dependencies.
- If the code does not match the excerpts above (drift since d9aa3fb), STOP and report.

## Verification

- **Mechanical**: `npx tsc --noEmit` passes; `npm run lint` reports no new errors; `npm run build` succeeds.
- **Feel check**: run `npm run dev`, then:
  - Scroll from top to bottom — the orange rail must reach exactly 100% width at the very bottom of the page and 0 at the top.
  - The rail must track the scroll position with **no perceptible lag** (previously it trailed ~100ms).
  - Open DevTools → Performance, record a scroll from top to bottom. In the flame chart there must be **no "Forced reflow" / "Layout" warnings** attributed to the scroll handler.
  - Resize the window, then scroll to the bottom — the rail must still reach 100% (proves `measure()` re-runs).
- **Done when**: no layout work appears in a scroll performance profile, and the rail is pixel-accurate at both extremes after a resize.
