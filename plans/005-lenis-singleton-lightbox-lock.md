# 005 — Expose Lenis and let the lightbox stop it instead of fighting it

- **Status**: DONE (applied, build-verified; feel checks pending)
- **Commit**: d9aa3fb
- **Severity**: MEDIUM
- **Category**: Interruptibility / Cohesion
- **Estimated scope**: 3 files, ~35 lines

## Problem

The Lenis instance is created inside a `useEffect` closure in `src/components/Enhance.tsx:61-74` and never escapes it:

```tsx
// src/components/Enhance.tsx:61-74 — current
const lenis = new Lenis({
  autoRaf: false,
  lerp: 0.09,
  anchors: { offset: -80 },
});
lenis.on("scroll", ScrollTrigger.update);
const raf = (time: number) => lenis.raf(time * 1000);
gsap.ticker.add(raf);
gsap.ticker.lagSmoothing(0);
```

Because nothing else can reach it, the lightbox invents its own scroll lock at `src/components/FieldNotes.tsx:40-41`:

```tsx
// src/components/FieldNotes.tsx:40-41 — current
const prev = document.documentElement.style.overflow;
document.documentElement.style.overflow = "hidden";
```

This produces three inconsistencies:

1. **The library's own lock path is dead code.** `src/app/globals.css:443-445` defines `.lenis-stopped { overflow: hidden; }` — the class Lenis adds when `lenis.stop()` is called. Nothing in the codebase ever calls `stop()`, so that rule never matches.
2. **Contradictory intent.** The lightbox root carries `data-lenis-prevent` (`src/components/FieldNotes.tsx:110`), which only does anything *while Lenis is running* — it tells Lenis to leave that subtree's native scrolling alone. But the manual `overflow: hidden` is written as though Lenis were stopped. The component asserts both at once.
3. **Lenis keeps running with nothing to do.** With `overflow: hidden` on `<html>`, Lenis's rAF loop continues ticking, reading scroll and calling `ScrollTrigger.update()` for the entire time the lightbox is open, over a document that cannot scroll.

`gsap.ticker.lagSmoothing(0)` and `lenis.on("scroll", ScrollTrigger.update)` are the correct documented Lenis+GSAP recipe and must be preserved exactly.

## Target

A tiny module-level registry that `Enhance` populates and any component can read, plus a `useLenisLock` hook the lightbox uses.

New file, `src/lib/lenis-store.ts`:

```ts
import type Lenis from "lenis";

// Enhance.tsx owns the single Lenis instance; this registry lets other
// components (the lightbox) stop and start it without prop-drilling.
let instance: Lenis | null = null;

export function setLenis(l: Lenis | null) {
  instance = l;
}

export function getLenis(): Lenis | null {
  return instance;
}

/** Halt smooth scrolling. Falls back to an overflow lock when Lenis
 *  isn't running (reduced-motion users never get an instance). */
export function lockScroll(): () => void {
  const lenis = instance;
  if (lenis) {
    lenis.stop();
    return () => lenis.start();
  }
  const prev = document.documentElement.style.overflow;
  document.documentElement.style.overflow = "hidden";
  return () => {
    document.documentElement.style.overflow = prev;
  };
}
```

In `src/components/Enhance.tsx`, register and clear alongside the existing cleanup:

```tsx
/* target — after the existing `gsap.ticker.lagSmoothing(0);` */
setLenis(lenis);
cleanups.push(() => {
  gsap.ticker.remove(raf);
  lenis.destroy();
  setLenis(null);
  gsap.ticker.lagSmoothing(500, 33);
});
```

In `src/components/FieldNotes.tsx`, the effect at lines 32-46 uses the helper:

```tsx
/* target */
useEffect(() => {
  if (active === null) return;
  const onKey = (e: KeyboardEvent) => {
    if (e.key === "Escape") close();
    if (e.key === "ArrowRight") step(1);
    if (e.key === "ArrowLeft") step(-1);
  };
  window.addEventListener("keydown", onKey);
  const unlock = lockScroll();
  return () => {
    window.removeEventListener("keydown", onKey);
    unlock();
  };
}, [active, close, step]);
```

## Repo conventions to follow

- Shared non-component modules live in `src/lib/` — see `src/lib/utils.ts` and `src/lib/photo-dims.ts`. Put the new file there.
- Imports use the `@/` alias (`tsconfig.json` maps `@/*` → `src/*`); see `src/components/FieldNotes.tsx:7`.
- The existing cleanup pattern in `Enhance.tsx` is a `cleanups: Array<() => void>` array pushed to and drained at `src/components/Enhance.tsx:518`. Extend it, don't add a parallel mechanism.

## Steps

1. Create `src/lib/lenis-store.ts` with the exact contents of the target block above.
2. In `src/components/Enhance.tsx`, add `import { setLenis } from "@/lib/lenis-store";` to the imports (after the `Lenis` import on line 7).
3. In `src/components/Enhance.tsx:69`, immediately after `gsap.ticker.lagSmoothing(0);`, add `setLenis(lenis);`.
4. In `src/components/Enhance.tsx:70-74`, add `setLenis(null);` inside the existing `cleanups.push(...)` callback, between `lenis.destroy();` and `gsap.ticker.lagSmoothing(500, 33);`.
5. In `src/components/FieldNotes.tsx`, add `import { lockScroll } from "@/lib/lenis-store";` to the imports.
6. In `src/components/FieldNotes.tsx:40-45`, replace the two `document.documentElement.style.overflow` lines and the corresponding restore in the cleanup with `const unlock = lockScroll();` and `unlock();` per the target block.

## Boundaries

- Do NOT remove `data-lenis-prevent` from the lightbox (`src/components/FieldNotes.tsx:110`) — with Lenis stopped it is inert, and it is correct again the moment the lock strategy changes.
- Do NOT change the Lenis options (`autoRaf`, `lerp: 0.09`, `anchors: { offset: -80 }`).
- Do NOT change `lenis.on("scroll", ScrollTrigger.update)` or `gsap.ticker.lagSmoothing(0)` — these are the required GSAP integration.
- Do NOT introduce React Context for this; a module singleton matches the fact that there is exactly one Lenis per document.
- Do NOT add new dependencies.
- If the code does not match the excerpts above (drift since d9aa3fb), STOP and report.

## Verification

- **Mechanical**: `npx tsc --noEmit` passes (the `import type Lenis from "lenis"` must resolve); `npm run build` succeeds.
- **Feel check**: run `npm run dev`, scroll to Field Notes, then:
  - Open a photo. The page behind must not scroll on wheel, trackpad, or arrow keys.
  - Close it. Smooth scrolling must resume **immediately and smoothly** — no jump, no dead scroll, no loss of inertia.
  - Open and close ten times rapidly, then scroll: Lenis must still be alive and smooth (proves `start()` is balanced against `stop()`).
  - While the lightbox is open, confirm in DevTools that `<html>` has the `lenis-stopped` class rather than an inline `overflow: hidden` style.
  - Enable `prefers-reduced-motion: reduce` and repeat: Lenis never initialises in that branch, so the fallback `overflow` lock must engage instead — the page still must not scroll behind the lightbox, and must scroll normally after closing.
- **Done when**: the lightbox locks scrolling through Lenis on the default path and through the overflow fallback under reduced motion, with scrolling fully restored after close in both.
