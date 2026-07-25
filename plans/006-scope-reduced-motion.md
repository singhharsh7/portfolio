# 006 — Scope the reduced-motion reset so it removes movement, not all feedback

- **Status**: DONE (applied, build-verified; feel checks pending)
- **Commit**: d9aa3fb
- **Severity**: MEDIUM
- **Category**: Accessibility
- **Estimated scope**: 1 file, ~20 lines

## Problem

`src/app/globals.css:1806-1825`:

```css
/* src/app/globals.css:1806-1825 — current */
@media (prefers-reduced-motion: reduce) {
  html {
    scroll-behavior: auto;
  }
  *,
  *::before,
  *::after {
    animation-duration: 0.001ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.001ms !important;
  }
  .js [data-reveal] {
    opacity: 1 !important;
    transform: none !important;
    transition: none !important;
  }
  .ticker .cursor {
    opacity: 1;
  }
}
```

The universal `transition-duration: 0.001ms !important` is the blunt "nuke everything" pattern. Reduced motion means **fewer and gentler animations, not zero** — transitions that aid comprehension should survive; only position/scale changes should go. What this rule currently destroys:

- **The mobile navigation slide** (`src/app/globals.css:1787-1794`, `transform: translateY(-120%)` → `0` over 0.35s). The menu now teleports into existence. That transition is precisely the kind that *aids* comprehension — it explains that the panel came from behind the header.
- **Every colour and background feedback transition** — `.nav a` (line 298), `.btn` (361-362), `.press-row` (1136), `.contact-lines a` (1659), `.socials a` (1691), footer links (1735, 1741). Colour changes involve no motion and are exactly what the guidance says to keep.
- **The skip link** (line 140), which is a keyboard-accessibility affordance.

Note the JS layers are unaffected by this CSS and are already handled correctly — `src/components/Enhance.tsx:34-50` branches to opacity-only crossfades, `src/components/FieldNotes.tsx:53` sets `reducedMotion="user"` on `MotionConfig`, and both `HeroCanvas.tsx:87` and `HalftoneHover.tsx:55` opt out entirely. Do not touch those.

## Target

Replace the universal duration kill with a targeted reset: neutralise *transform* transitions and infinite decorative animations, keep colour/opacity feedback, and keep the mobile nav slide as a fast opacity-and-position change.

```css
/* target — src/app/globals.css */
@media (prefers-reduced-motion: reduce) {
  html {
    scroll-behavior: auto;
  }

  /* Infinite decorative animation stops; comprehension transitions stay. */
  *,
  *::before,
  *::after {
    animation-duration: 0.001ms !important;
    animation-iteration-count: 1 !important;
  }

  /* Drop movement, keep colour and opacity feedback. */
  .btn,
  .btn .arrow,
  .caps .cap,
  .quote,
  .column-card,
  .cur,
  .j-card,
  .j-frame,
  .contact-lines a,
  .portrait .frame img,
  details.folder > summary .sign,
  details.qa > summary .sign {
    transition-property: color, background-color, border-color, box-shadow,
      opacity !important;
  }
  .btn:hover,
  .caps .cap:hover,
  .quote:hover,
  .column-card:hover,
  .cur:hover,
  .j-card:hover,
  .j-photo:hover .j-frame,
  .contact-lines a:hover,
  .portrait:hover .frame img {
    transform: none !important;
  }
  a.press-row:hover {
    padding-left: 0.25rem;
  }

  .js [data-reveal] {
    opacity: 1 !important;
    transform: none !important;
    transition: none !important;
  }
  .ticker .cursor {
    opacity: 1;
  }
}
```

The mobile nav is deliberately **not** listed — its `transform: translateY()` transition stays, at a shortened duration:

```css
/* target — inside the same reduced-motion block */
@media (max-width: 52rem) {
  .nav {
    transition-duration: 0.15s;
  }
}
```

## Repo conventions to follow

- `--ease` at `src/app/globals.css:49` is the only curve; this plan changes durations and properties, never the curve.
- The reduced-motion block sits at the very end of the stylesheet (line 1806) after the mobile-nav media query — keep that position so its specificity/order still wins.
- Exemplar of the "gentler, not zero" principle already in the codebase: `src/components/Enhance.tsx:34-49` keeps a 0.5s opacity crossfade under reduced motion rather than removing the reveal entirely. Mirror that judgement.

## Steps

1. In `src/app/globals.css:1810-1816`, delete the line `transition-duration: 0.001ms !important;` from the universal selector block. Keep `animation-duration` and `animation-iteration-count`.
2. Immediately after that universal block, insert the two new rules from the target: the `transition-property` allow-list selector group, and the `transform: none !important` hover group.
3. After those, add the `a.press-row:hover { padding-left: 0.25rem; }` rule (this neutralises the hover indent by matching the base padding at `src/app/globals.css:1134`).
4. Still inside the `@media (prefers-reduced-motion: reduce)` block, after the `.ticker .cursor` rule, add the nested `@media (max-width: 52rem) { .nav { transition-duration: 0.15s; } }` block.
5. Leave the `.js [data-reveal]` and `.ticker .cursor` rules exactly as they are.

## Boundaries

- Do NOT touch the JS reduced-motion branches in `Enhance.tsx`, `FieldNotes.tsx`, `HeroCanvas.tsx`, or `HalftoneHover.tsx` — all four are already correct.
- Do NOT remove the `animation-duration` / `animation-iteration-count` kills — those stop the infinite `blink` keyframe (`src/app/globals.css:1761-1770`), which is correct.
- Do NOT change any base (non-reduced-motion) rule.
- Do NOT add new dependencies.
- If this plan is applied **after** plan 003, the `.j-frame img` grayscale rules will already be inside their own `@media (prefers-reduced-motion: reduce)` block — that is expected and requires no change here.
- If the code does not match the excerpts above (drift since d9aa3fb), STOP and report.

## Verification

- **Mechanical**: `npm run build` succeeds.
- **Feel check**: run `npm run dev`, open DevTools → Rendering → set `prefers-reduced-motion: reduce`, then:
  - Narrow the viewport below 52rem and open the Menu button: the panel must **slide** down (fast, 150ms), not teleport.
  - Hover a nav link: the colour must still fade to ink, and the orange underline must still appear.
  - Hover a `.quote`, `.cur`, or `.column-card`: the border and shadow may change, but the card must **not lift** (no `translateY`).
  - Hover a press row: the background fills, but the row must not indent.
  - Tab to the very first focusable element: the skip link must still slide into view.
  - Confirm the masthead cursor is solid, not blinking.
  - Switch reduced motion back off and confirm every hover behaves exactly as before this change.
- **Done when**: under reduced motion, no element translates or scales on interaction, while colour, background, shadow and the nav panel slide all still respond.
