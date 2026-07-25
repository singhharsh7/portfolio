# 004 — Stop transitioning `backdrop-filter` on the fixed header

- **Status**: DONE (applied, build-verified; feel checks pending)
- **Commit**: d9aa3fb
- **Severity**: HIGH
- **Category**: Performance
- **Estimated scope**: 1 file, 2 lines

## Problem

`src/app/globals.css:235-249`:

```css
/* src/app/globals.css:235-249 — current */
.site-header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 55;
  transition: background 0.3s var(--ease), border-color 0.3s var(--ease),
    backdrop-filter 0.3s var(--ease);
  border-bottom: 1px solid transparent;
}
.site-header.stuck {
  background: rgba(251, 250, 248, 0.78);
  backdrop-filter: blur(14px) saturate(1.05);
  border-bottom-color: var(--line);
}
```

`backdrop-filter` is among the most expensive properties a browser can compute: it samples everything painted behind the element, applies a 14px gaussian blur plus a saturation matrix, and composites the result. Animating it means recomputing that blur **at a different radius on every frame for 300ms**, across a full-width fixed bar, while the page is scrolling and Lenis, GSAP ScrollTrigger, and the scroll rail are all also doing work. Safari in particular drops frames badly here.

The `.stuck` class is toggled by `src/components/SiteHeader.tsx:16` (`setStuck(y > 12)`), so this fires on essentially every visit within the first few pixels of scroll — and again every time the user returns to the top.

The visual payoff is nil: the blur is already masked by a simultaneous `background` fade from transparent to `rgba(251, 250, 248, 0.78)`. The eye reads the background arriving, not the blur radius ramping.

## Target

Keep the two cheap transitions; let the blur apply instantly under cover of the background fade.

```css
/* target — src/app/globals.css */
.site-header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 55;
  transition: background 0.3s var(--ease), border-color 0.3s var(--ease);
  border-bottom: 1px solid transparent;
}
```

`.site-header.stuck` is unchanged.

## Repo conventions to follow

- `--ease` at `src/app/globals.css:49` is the shared curve; both remaining transitions keep it.
- The same pattern is already correct elsewhere in this file: `src/app/globals.css:1783-1788` sets `backdrop-filter: blur(16px)` on the mobile nav and transitions only `transform` — copy that discipline.

## Steps

1. In `src/app/globals.css:241-242`, delete `, backdrop-filter 0.3s var(--ease)` from the `.site-header` transition list, leaving `transition: background 0.3s var(--ease), border-color 0.3s var(--ease);` on a single line.

## Boundaries

- Do NOT remove the `backdrop-filter` declaration from `.site-header.stuck` — the blur itself stays.
- Do NOT change the `z-index`, positioning, or the `stuck` threshold in `src/components/SiteHeader.tsx`.
- Do NOT touch the mobile nav rules at `src/app/globals.css:1773-1804`.
- Do NOT add new dependencies.
- If the code does not match the excerpt above (drift since d9aa3fb), STOP and report.

## Verification

- **Mechanical**: `npm run build` succeeds.
- **Feel check**: run `npm run dev`, then:
  - Scroll down 20px and back to the top repeatedly. The header must still fade from transparent to frosted paper — the transition should look **unchanged** to the eye.
  - DevTools → Performance, record scrolling past the 12px threshold several times. Compare against a recording made before the change: the long compositing/paint blocks at the moment `.stuck` toggles should be gone.
  - DevTools → Rendering → enable "Paint flashing": the header area should flash once on toggle, not continuously for 300ms.
  - Check in Safari if available — this is where the old behaviour was worst.
- **Done when**: toggling `.stuck` produces a single paint rather than 300ms of repeated backdrop recomputation, with no visible change to the effect.
