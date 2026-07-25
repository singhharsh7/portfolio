# 011 — Contain the grain overlay's blend cost

- **Status**: DONE (applied, build-verified; feel checks pending)
- **Commit**: d9aa3fb
- **Severity**: LOW
- **Category**: Performance
- **Estimated scope**: 1 file, 3 lines

## Problem

`src/app/globals.css:95-103`:

```css
/* src/app/globals.css:95-103 — current */
.grain {
  position: fixed;
  inset: 0;
  z-index: 1;
  pointer-events: none;
  opacity: 0.028;
  mix-blend-mode: multiply;
  background-image: url("data:image/svg+xml,…feTurbulence…");
}
```

Rendered once in `src/app/layout.tsx:170`, this is a viewport-sized fixed layer with `mix-blend-mode: multiply`. A blend mode forces the element to blend against its **backdrop** — everything painted beneath it in the stacking context. Because the element is `position: fixed` and covers the viewport, and because no ancestor establishes an isolated stacking context, the browser must re-composite the blend for the full viewport whenever anything underneath changes. On this site something is essentially always changing underneath: Lenis scrolls the document every frame, GSAP scrubs the portrait parallax and the timeline rail, and a WebGL canvas animates in the hero.

The grain is a deliberate and good design decision — the paper texture is central to the "printed on bright paper" concept. This plan does not remove it; it just stops the blend from being recomputed against a moving backdrop more than necessary.

## Target

Promote the layer to its own compositor layer and isolate the blend so it resolves against a stable backdrop.

```css
/* target — src/app/globals.css */
.grain {
  position: fixed;
  inset: 0;
  z-index: 1;
  pointer-events: none;
  opacity: 0.028;
  mix-blend-mode: multiply;
  background-image: url("data:image/svg+xml,…feTurbulence…");
  will-change: opacity;
  contain: strict;
}
```

- `will-change: opacity` promotes the layer without implying a transform.
- `contain: strict` tells the browser the element's rendering is fully self-contained — nothing inside it affects layout, style, paint or size outside it — so it can skip re-evaluating the subtree.

Keep the `background-image` data URI byte-for-byte identical.

## Repo conventions to follow

- The `.grain` rule sits in the base/reset region near the top of `src/app/globals.css` (lines 95-103), before `img` and `a`. Leave it there.
- The codebase does not currently use `will-change` anywhere; plan 001 introduces the first instance on `.scroll-rail span`. Use the same minimal form — name the specific property, never `will-change: transform, opacity, filter`.

## Steps

1. In `src/app/globals.css:95-103`, add `will-change: opacity;` and `contain: strict;` as the last two declarations of the `.grain` rule.

## Boundaries

- Do NOT remove the grain, change its `opacity`, its `mix-blend-mode`, or the noise data URI — the texture is a core part of the visual identity.
- Do NOT change its `z-index` (1) — the `.wrap` containers sit at `z-index: 2` (line 171) and must stay above it.
- Do NOT add `will-change: transform` — that would create a needless GPU texture the size of the viewport.
- Do NOT add new dependencies.
- If the code does not match the excerpt above (drift since d9aa3fb), STOP and report.

## Verification

- **Mechanical**: `npm run build` succeeds.
- **Feel check**: run `npm run dev`, then:
  - Compare against the current site side by side: the paper texture must look **identical**. If the grain disappears or the page brightens, `contain: strict` has clipped something unexpected — revert that one declaration and keep only `will-change`.
  - Scroll the full page top to bottom and confirm the grain still covers the viewport at every scroll position (it is `fixed`, so it must not scroll with content).
  - DevTools → Rendering → enable "Layer borders": `.grain` should now show as its own composited layer.
  - DevTools → Performance: record a full-page scroll before and after. Compare the "Composite Layers" totals — the after should be equal or lower, never higher.
- **Done when**: the texture is visually unchanged and `.grain` is a discrete composited layer.

## Note

If the profile comparison shows no improvement, revert this plan. `contain: strict` on a full-viewport fixed layer is a reasonable bet, not a certainty, and an unhelpful hint is worse than none. This is the lowest-value plan in the set — treat it as optional.
