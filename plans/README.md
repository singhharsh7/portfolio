# Animation plans

Produced by an `improve-animations` audit of the site's motion at commit `d9aa3fb`.

The site was already heavily choreographed — a GSAP ScrollTrigger conductor, Lenis smooth scroll, a Motion `layoutId` lightbox and two WebGL layers. The findings are not "add more animation"; they concentrate on **two hand-rolled loops that run on every frame**, **places where two or three systems animate the same element without knowing about each other**, and **the motion that was missing rather than wrong**.

## Plans

| # | Title | Severity | Category | Status |
| --- | --- | --- | --- | --- |
| [001](001-scroll-rail-and-header-listener.md) | Fix the scroll-progress rail: stop the per-frame reflow, animate transform | HIGH | Performance | DONE |
| [002](002-pause-hero-ticker-offscreen.md) | Pause the hero typewriter when the hero is off screen | HIGH | Purpose / Performance | DONE |
| [003](003-consolidate-journal-hover.md) | Consolidate the journal photo hover: one effect, one duration, correct exit easing | HIGH | Cohesion / Easing | DONE |
| [004](004-header-backdrop-filter.md) | Stop transitioning `backdrop-filter` on the fixed header | HIGH | Performance | DONE |
| [005](005-lenis-singleton-lightbox-lock.md) | Expose Lenis and let the lightbox stop it instead of fighting it | MEDIUM | Interruptibility | DONE |
| [006](006-scope-reduced-motion.md) | Scope the reduced-motion reset so it removes movement, not all feedback | MEDIUM | Accessibility | DONE |
| [007](007-press-feedback-and-hover-gating.md) | Add press feedback, gate every hover transform behind a real pointer | MEDIUM | Physicality / A11y | DONE |
| [008](008-press-row-transform.md) | Replace the press-row `padding-left` hover with a transform | MEDIUM | Performance | DONE |
| [009](009-lightbox-button-motion.md) | Fix the lightbox button motion: composited, pointer-gated, subtler press | MEDIUM | Performance / A11y | DONE |
| [010](010-duration-token-scale.md) | Introduce a duration scale and bring the count-up inside it | LOW | Cohesion / Tokens | DONE |
| [011](011-grain-compositing.md) | Contain the grain overlay's blend cost | LOW | Performance | DONE |
| [012](012-nav-sliding-indicator.md) | Make the nav indicator travel between links instead of dissolving | LOW (additive) | Missed opportunity | DONE |
| [013](013-details-close-animation.md) | Animate `<details>` closing, not just opening | LOW (additive) | Missed opportunity | DONE |
| [014](014-lightbox-drag-gestures.md) | Add swipe-to-step and drag-to-dismiss to the photo lightbox | LOW (additive) | Missed opportunity | DONE |

All fourteen were applied on top of `d9aa3fb` and pass `tsc --noEmit`, `next lint` and `next build`. **The feel checks in each plan have not been run** — they need a browser, a touch device and a performance profile. Work through them before treating any plan as fully closed; the two most important are the touch pass (plans 007/009: nothing may stay hovered after a tap) and the scroll profile (plans 001/004: no forced reflow, no repeated backdrop composites).

## Recommended execution order

Run in numeric order. It is already sequenced so that plans which touch the same file land in a safe sequence, and so the highest-leverage work ships first.

**Batch 1 — the always-on cost (001, 002, 003, 004).** These four are the only findings that run on *every frame of every visit*. 001 and 002 remove per-frame layout reads and a permanent timer; 004 removes a 300ms backdrop-blur recomputation from the most common scroll event on the site; 003 stops three systems animating one hover. Ship these even if nothing else is done.

**Batch 2 — correctness and touch (005, 006, 007, 008, 009).** 005 resolves the lightbox's contradictory scroll lock. 006–009 are the accessibility and physicality gaps: no press feedback anywhere, no pointer gating anywhere, a layout-animating list hover, and lightbox buttons that stick enlarged after a tap.

**Batch 3 — consolidation (010, 011).** Refactors. 010 should be applied *after* 001/003/004/007/008 so it tokenises the final values rather than ones about to change. 011 is optional and self-reverting if it doesn't profile better.

**Batch 4 — additive (012, 013, 014).** New motion where there was none. These change behaviour rather than fix it; ship them deliberately.

## Dependencies and ordering constraints

- **007 before 008** — 008 merges into the `@media (hover: hover) and (pointer: fine)` wrapper that 007 introduces around `a.press-row:hover`.
- **009 before 014** — both edit the lightbox button/figure region of `FieldNotes.tsx`.
- **009 amends 007** — if 007 is applied first, remove `.lb-btn` from its `:active` selector group so Motion is the only thing scaling those three buttons.
- **006 and 007 interact** — 006's reduced-motion `transform: none !important` group should be extended to cover the `:active` scaling that 007 adds. 007's final step does this.
- **010 last among CSS plans** — it rewrites duration literals across the stylesheet and must run after 001, 003, 004, 007, 008 have settled their values. It matches on selector, not line number, for this reason.
- **003 and 006 both add** `@media (prefers-reduced-motion: reduce)` blocks for `.j-frame img`. That is expected; they do not conflict.
- 002, 005, 011, 012, 013 are independent and can be applied in any order.

## Verifying the batch

Every plan carries its own feel check. Two profiles are worth taking across the whole set:

1. **Before/after scroll profile.** DevTools → Performance, record a full top-to-bottom scroll. Batch 1 should remove all forced-reflow warnings and the repeated backdrop-filter composites.
2. **Before/after touch pass.** DevTools device mode, tap through the press list, the journal grid, and the lightbox. After batch 2, no element should be left in a hovered or enlarged state.

Mechanical gate for every plan: `npx tsc --noEmit`, `npm run lint`, `npm run build`.
