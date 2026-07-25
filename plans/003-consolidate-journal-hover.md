# 003 — Consolidate the journal photo hover: one effect, one duration, correct exit easing

- **Status**: DONE (applied, build-verified; feel checks pending)
- **Commit**: d9aa3fb
- **Severity**: HIGH
- **Category**: Cohesion & tokens / Easing & duration
- **Estimated scope**: 2 files, ~15 lines

## Problem

Hovering a single photo in the Field Notes journal triggers **three independent animation systems at three different durations**, two of which are invisible on the devices where the third runs.

CSS, `src/app/globals.css:1410-1434`:

```css
/* src/app/globals.css:1410-1434 — current */
.j-frame {
  ...
  transition: transform 0.5s var(--ease), box-shadow 0.4s var(--ease);
}
.j-frame img {
  ...
  filter: grayscale(1) contrast(1.03);
  transition: filter 0.5s var(--ease);
}
.j-photo:hover .j-frame {
  transform: translateY(-4px);
  box-shadow: var(--shadow);
}
.j-photo:hover .j-frame img {
  filter: grayscale(0) contrast(1);
}
```

WebGL, `src/components/HalftoneHover.tsx:166-173` and `:194-200`:

```tsx
// src/components/HalftoneHover.tsx:168-173 — current (show)
tween = gsap.to(state.uniforms.uMix, {
  value: 1,
  duration: 0.85,
  ease: "power2.inOut",
  onUpdate: render,
});

// src/components/HalftoneHover.tsx:194-200 — current (hide)
tween = gsap.to(state.uniforms.uMix, {
  value: 0,
  duration: 0.3,
  ease: "power1.in",
  onUpdate: render,
  onComplete: () => canvas.remove(),
});
```

Three defects:

1. **The grayscale fade is painted over.** `HalftoneHover` appends its canvas into `.j-frame` (`HalftoneHover.tsx:165`), and `.ht-canvas` is `position: absolute; inset: 0` with `width/height: 100% !important` (`src/app/globals.css:1366-1374`). On any hover-capable, non-reduced-motion device the canvas fully covers the `<img>`, so the 0.5s `filter: grayscale` transition runs every hover and is never seen. It is real work with zero visual output. (It is *not* dead code — `HalftoneHover` bails on `(hover: none)` and reduced motion at `HalftoneHover.tsx:55-56`, so on touch and reduced-motion it is the only effect. It must be kept as the fallback, not deleted.)
2. **Three durations for one gesture**: 0.4s (shadow), 0.5s (lift + grayscale), 0.85s (halftone). The lift finishes long before the ink resolves; the hover reads as two separate events.
3. **`power1.in` on the exit.** An ease-in exit starts slow — the ink hangs, then snaps away at the end, which is the opposite of responsive. Per the audit rules: entering or exiting → **ease-out**; `ease-in` on UI is always a finding. The 0.85s / 0.3s split is also a very large asymmetry for a hover, which is a reversible, rapidly-repeated gesture.

## Target

Gate the (invisible, redundant) CSS grayscale transition behind the exact same conditions under which the shader does *not* run, so only one effect is ever live. Align the remaining CSS durations. Give the shader an ease-out curve both ways at hover-appropriate durations.

```css
/* target — src/app/globals.css */
.j-frame {
  transition: transform 0.45s var(--ease), box-shadow 0.45s var(--ease);
}
.j-frame img {
  filter: grayscale(1) contrast(1.03);
}
/* The WebGL halftone owns the colour reveal on hover-capable devices
   (see HalftoneHover.tsx). Everywhere else, fall back to a plain fade. */
@media (hover: none) {
  .j-frame img {
    transition: filter 0.45s var(--ease);
  }
  .j-photo:hover .j-frame img {
    filter: grayscale(0) contrast(1);
  }
}
@media (prefers-reduced-motion: reduce) {
  .j-frame img {
    transition: filter 0.45s var(--ease);
  }
  .j-photo:hover .j-frame img {
    filter: grayscale(0) contrast(1);
  }
}
```

```tsx
/* target — src/components/HalftoneHover.tsx */
// show
tween = gsap.to(state.uniforms.uMix, {
  value: 1,
  duration: 0.45,
  ease: "power2.out",
  onUpdate: render,
});

// hide
tween = gsap.to(state.uniforms.uMix, {
  value: 0,
  duration: 0.25,
  ease: "power2.out",
  onUpdate: render,
  onComplete: () => canvas.remove(),
});
```

0.45s in / 0.25s out is still asymmetric — correctly so: the system's response to release should snap faster than the deliberate hover. Both use ease-out.

## Repo conventions to follow

- `--ease: cubic-bezier(0.2, 0.7, 0.2, 1)` at `src/app/globals.css:49` is the only CSS curve in the codebase — use it, do not introduce a second.
- GSAP eases in this repo are named strings (`"power2.out"`, `"power4.out"`, `"power3.inOut"`) — see `src/components/Enhance.tsx:55`. Keep that form.
- Exemplar of the correct media-query gating idiom: `HalftoneHover.tsx:55-56` already checks both `prefers-reduced-motion` and `(hover: none)` in JS. The CSS above mirrors those exact two conditions.

## Steps

1. In `src/app/globals.css:1417`, change `.j-frame`'s transition to `transform 0.45s var(--ease), box-shadow 0.45s var(--ease)`.
2. In `src/app/globals.css:1420-1427`, remove `transition: filter 0.5s var(--ease);` from the base `.j-frame img` rule (keep the `filter: grayscale(1) contrast(1.03);` declaration).
3. In `src/app/globals.css:1432-1434`, remove the top-level `.j-photo:hover .j-frame img { filter: grayscale(0) contrast(1); }` rule.
4. Immediately after the `.j-photo:hover .j-frame` rule, add the two media-query blocks from the target above (`@media (hover: none)` and `@media (prefers-reduced-motion: reduce)`), each re-declaring the transition and the hover filter.
5. In `src/components/HalftoneHover.tsx:170-171`, change `duration: 0.85` → `duration: 0.45` and `ease: "power2.inOut"` → `ease: "power2.out"`.
6. In `src/components/HalftoneHover.tsx:196-197`, change `duration: 0.3` → `duration: 0.25` and `ease: "power1.in"` → `ease: "power2.out"`.

## Boundaries

- Do NOT delete the CSS grayscale effect — it is the touch and reduced-motion fallback.
- Do NOT change the shader source (`FRAG`/`VERT`), the texture cache, or the canvas re-parenting logic.
- Do NOT change `.ht-canvas` positioning at `src/app/globals.css:1366-1374`.
- Do NOT touch `src/components/FieldNotes.tsx` — the lightbox is covered by plans 005 and 009.
- Do NOT add new dependencies.
- If the code does not match the excerpts above (drift since d9aa3fb), STOP and report.

## Verification

- **Mechanical**: `npx tsc --noEmit` passes; `npm run build` succeeds.
- **Feel check**: run `npm run dev`, scroll to Field Notes, then:
  - Hover a photo on a desktop pointer: the frame lifts and the halftone resolves into colour as **one** gesture — the lift and the ink should now finish at visibly the same moment.
  - Move the pointer away: the ink must retreat **fast at the start** and ease out, not linger-then-snap. Compare against the old `power1.in` by temporarily reverting step 6 if unsure.
  - Sweep the pointer rapidly across ten photos in a row: no flicker, no stuck canvas, no stacked tweens.
  - DevTools → Rendering → emulate a touch device (or set `(hover: none)`): the halftone must not appear at all, and the photo must fade grayscale→colour on tap-hover instead.
  - DevTools → Rendering → `prefers-reduced-motion: reduce`: same grayscale fallback, no WebGL canvas.
  - In DevTools Animations panel at 10% speed, confirm only **one** filter transition is running per hover, not two.
- **Done when**: on desktop, a hover produces exactly one visible colour transition, the frame lift and ink resolve land together, and the exit accelerates immediately.
