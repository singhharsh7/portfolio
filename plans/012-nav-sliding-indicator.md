# 012 — Make the nav indicator travel between links instead of dissolving

- **Status**: DONE (applied, build-verified; feel checks pending)
- **Commit**: d9aa3fb
- **Severity**: LOW (missed opportunity — additive)
- **Category**: Missed opportunities / Physicality
- **Estimated scope**: 1 file, ~10 lines

## Problem

`src/app/globals.css:300-317`:

```css
/* src/app/globals.css:300-317 — current */
.nav a::after {
  content: "";
  position: absolute;
  left: 0;
  bottom: -1px;
  height: 2px;
  width: 0;
  background: var(--accent);
  transition: width 0.25s var(--ease);
}
.nav a:hover,
.nav a[aria-current="true"] {
  color: var(--ink);
}
.nav a:hover::after,
.nav a[aria-current="true"]::after {
  width: 100%;
}
```

Every link owns a private underline that animates its own `width` from 0 to 100%. When the scroll-spy in `src/components/SiteHeader.tsx:35-43` moves `aria-current` from one link to the next, the outgoing underline shrinks toward its own left edge while the incoming one grows from *its* left edge. The two are unrelated, so the indicator appears to dissolve in one place and re-form in another.

Nothing communicates that this is **one** indicator moving through a list of eight sections. That relationship is the entire point of a scroll-spy: it tells the reader where they are in a sequence. The current treatment throws that information away.

Secondarily, `width` is a layout property. On a 2px pseudo-element the cost is negligible, but `transform: scaleX()` is both cheaper and — critically — the thing that makes a travelling indicator possible at all.

## Target

Keep it pure CSS (no new state, no measurement code) by making the underline a full-width bar that scales from the side it is entering from. A link becoming active grows its bar from the left; a link losing active state collapses its bar to the right — so as the reader scrolls down the page, the accent appears to hand off in the direction of travel.

```css
/* target — src/app/globals.css */
.nav a::after {
  content: "";
  position: absolute;
  left: 0;
  bottom: -1px;
  height: 2px;
  width: 100%;
  background: var(--accent);
  transform: scaleX(0);
  transform-origin: 100% 50%;
  transition: transform 0.25s var(--ease);
}
.nav a:hover::after,
.nav a[aria-current="true"]::after {
  transform: scaleX(1);
  transform-origin: 0 50%;
}
```

The origin flip is what creates the handoff: while active, the bar is anchored left (`transform-origin: 0 50%`), so it *grew* from the left. The moment `aria-current` is removed, the base rule's `transform-origin: 100% 50%` applies and the bar collapses toward the right — reading as the accent continuing rightward to the next item rather than retreating.

This is a well-known CSS idiom for exactly this problem and needs no JavaScript.

## Repo conventions to follow

- `--ease` at `src/app/globals.css:49`; if plan 010 has been applied, use `var(--dur-base)` for the duration instead of the literal `0.25s`.
- `aria-current` is set by `src/components/SiteHeader.tsx:73` — the CSS keys off it and no component change is needed.
- The mobile breakpoint already hides this underline entirely (`src/app/globals.css:1801-1803`, `.nav a::after { display: none; }`) — that stays correct.

## Steps

1. In `src/app/globals.css:300-309`, replace the `.nav a::after` rule with the target version: `width: 100%`, add `transform: scaleX(0)` and `transform-origin: 100% 50%`, and change the transition from `width` to `transform`.
2. In `src/app/globals.css:314-317`, replace `width: 100%;` with `transform: scaleX(1);` and `transform-origin: 0 50%;`.
3. Leave the `.nav a:hover, .nav a[aria-current="true"] { color: var(--ink); }` colour rule at lines 310-313 unchanged.

## Boundaries

- Do NOT add JavaScript, refs, or measurement to `src/components/SiteHeader.tsx`. A genuinely sliding single indicator would need per-link `getBoundingClientRect()` on every spy change plus a resize observer — that is a layout read on a hot path, and this CSS approach delivers the directional read for zero cost.
- Do NOT change the scroll-spy `rootMargin` (`-42% 0px -52% 0px`) at `src/components/SiteHeader.tsx:41`.
- Do NOT change the indicator's colour, height, or position.
- Do NOT add new dependencies.
- If the code does not match the excerpts above (drift since d9aa3fb), STOP and report.

## Verification

- **Mechanical**: `npm run build` succeeds.
- **Feel check**: run `npm run dev` at a viewport wider than 52rem, then:
  - Scroll slowly from the top of the page to the bottom, watching the nav. The accent bar must appear to **hand off rightward** down the list — the leaving bar collapses to the right as the arriving bar grows from the left.
  - Scroll back up: the same handoff runs, still collapsing rightward. (A fully directional indicator would reverse; that would require JS and is explicitly out of scope. Confirm the upward case still looks deliberate rather than broken — if it does not, this plan is not worth keeping.)
  - Hover a link that is not active: its bar must grow from the left, then collapse to the right on unhover.
  - In DevTools Animations panel at 10% speed, confirm the bar scales rather than resizes — its edges must stay crisp (a scaled 2px bar does not blur; a resized one would show sub-pixel edges).
  - Narrow below 52rem: the underline must not appear at all.
- **Done when**: moving between sections reads as one accent handing off along the nav, at zero JS cost.
