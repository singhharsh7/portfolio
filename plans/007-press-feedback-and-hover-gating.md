# 007 — Add press feedback, and gate every hover transform behind a real pointer

- **Status**: DONE (applied, build-verified; feel checks pending)
- **Commit**: d9aa3fb
- **Severity**: MEDIUM
- **Category**: Physicality & origin / Accessibility
- **Estimated scope**: 1 file, ~50 lines

## Problem

Two gaps, both verified by exhaustive search of `src/app/globals.css` (1826 lines):

**(a) There is not a single `:active` rule in the stylesheet.** Zero matches for `:active`. Every button, link, card and accordion summary on the site responds to hover and to focus, but nothing acknowledges a *press*. The gap between mousedown and the resulting navigation or state change is unacknowledged, which is the single cheapest piece of physicality a UI can have.

Affected pressables include `.btn` (`src/app/globals.css:355-383`), `.menu-btn`, `.j-open` (the journal photo buttons), `details.folder > summary` (line 879), `details.qa > summary` (line 1562), `.contact-lines a` (1659), `.socials a` (1691), and `a.press-row` (1130).

**(b) There is not a single `@media (hover: hover)` guard.** Zero matches for `hover: hover` and zero for `pointer: fine`. Every hover rule in the file applies on touch devices, where a tap fires a synthetic hover that **sticks until the user taps elsewhere**. On this site that means, after a tap, an element is left permanently lifted and shadowed:

```css
/* src/app/globals.css:720 — current, applies on touch */
.caps .cap:hover { transform: translateY(-3px); ... }
/* src/app/globals.css:1028 */
.quote:hover { transform: translateY(-2px); ... }
/* src/app/globals.css:1090 */
.column-card:hover { ... }
/* src/app/globals.css:1229 */
.cur:hover { ... }
/* src/app/globals.css:1383 */
.j-card:hover { ... }
/* src/app/globals.css:1428 */
.j-photo:hover .j-frame { transform: translateY(-4px); box-shadow: var(--shadow); }
/* src/app/globals.css:1178 */
a.press-row:hover { background: var(--wash); padding-left: 0.9rem; }
```

The journal alone renders ~40 `.j-photo` frames and the press list ~15 rows; on a phone, tapping through them leaves a trail of stuck states.

## Target

**(a) One shared press-feedback rule**, using the audit's values — `scale(0.97)`, `160ms`, ease-out:

```css
/* target — src/app/globals.css */
/* ---------- Press feedback ----------
   Every pressable acknowledges the press itself, not just the result. */
.btn,
.menu-btn,
.j-open,
.lb-btn,
.socials a,
.contact-lines a,
details.folder > summary,
details.qa > summary {
  transition: transform 160ms var(--ease);
}
.btn:active,
.menu-btn:active,
.j-open:active,
.lb-btn:active,
.socials a:active,
.contact-lines a:active,
details.folder > summary:active,
details.qa > summary:active {
  transform: scale(0.97);
}
a.press-row:active {
  background: var(--wash);
}
```

Because several of these selectors already declare a `transition`, the shared rule must be **merged into the existing declaration** rather than added as a competing one — see Steps.

**(b) Wrap every hover rule that *moves* something** in `@media (hover: hover) and (pointer: fine)`. Hover rules that only change colour, background or border may stay ungated — a stuck colour change is harmless and often desirable as tap feedback.

The rules that must be gated (they set `transform`, `box-shadow`, `padding`, or `filter`):

| Selector | Line |
| --- | --- |
| `.caps .cap:hover` | 720 |
| `.caps .cap:last-child:hover` | 758 |
| `.quote:hover` | 1028 |
| `.column-card:hover` | 1090 |
| `a.press-row:hover` (the `padding-left`) | 1178 |
| `a.press-row:hover .clip` | 1175 |
| `.cur:hover` | 1229 |
| `.j-card:hover` | 1383 |
| `.j-photo:hover .j-frame` | 1428 |
| `.portrait:hover .frame img` | 601 |
| `.contact-lines a:hover` | 1662 |

## Repo conventions to follow

- `--ease: cubic-bezier(0.2, 0.7, 0.2, 1)` at `src/app/globals.css:49` — use it for the press transition; do not introduce a new curve.
- Section banners in this file use the `/* ========== NAME ========== */` form (e.g. line 1747). Give the new press-feedback block one.
- Place the press-feedback block near the end of the file, immediately **before** the `REVEAL + MOTION` banner at line 1747, so it comes after the component rules it augments.

## Steps

1. For each selector in the press-feedback list that **already** has a `transition`, append `, transform 160ms var(--ease)` to its existing declaration instead of writing a second rule — specifically `.btn` (line 361-362), `.socials a` (1691-1692), `.contact-lines a` (1659-1660), `details.folder > summary` (879), `details.qa > summary` (1562), `.lb-btn` (1518). Note `.btn` and `.contact-lines a` already transition `transform`; for those, change the existing `transform` duration to `160ms` rather than adding a duplicate entry.
2. Add the `:active` selector group with `transform: scale(0.97);` as a new block before the `REVEAL + MOTION` banner, with a section comment.
3. Add `a.press-row:active { background: var(--wash); }` in the same block (a row is a wide target; scaling it would look wrong, so it gets a background flash instead).
4. For each of the eleven hover rules in the table, wrap it in `@media (hover: hover) and (pointer: fine) { … }`. Where a hover rule sets *both* movement and colour (e.g. `a.press-row:hover` sets `background` **and** `padding-left`), split it: leave the colour/background declaration ungated and move only the movement declaration inside the media query.
5. `a.press-row:hover .headline { color: var(--accent); }` (line 1197) is colour-only — leave it ungated.

## Boundaries

- Do NOT gate colour-only hover rules (`.nav a:hover`, `.site-footer .credit:hover`, `.hero .hero-contact a:hover`, `details.folder > summary:hover`, `details.qa > summary:hover`, `.lb-btn:hover`) — a persistent colour change on tap is acceptable and reads as feedback.
- Do NOT change any hover rule's values; only wrap them.
- Do NOT add `:active` styling to non-interactive elements (`.stat`, `.dispatch`, `.rec-item`).
- Do NOT touch `src/components/FieldNotes.tsx` — the Motion `whileTap` values are plan 009.
- Do NOT add new dependencies.
- If this plan is applied after plan 006, note that the reduced-motion block already neutralises hover transforms; that is complementary, not conflicting — `:active` scaling should also be added to plan 006's `transform: none !important` group. Do that as a final step here.
- If the code does not match the excerpts above (drift since d9aa3fb), STOP and report.

## Verification

- **Mechanical**: `npm run build` succeeds. Search the file for `:active` and confirm the new group exists; search for `hover: hover` and confirm eleven wrapped rules.
- **Feel check**: run `npm run dev`, then:
  - Press and hold any `.btn`, a journal photo, and an FAQ summary: each must visibly shrink slightly and spring back on release. The shrink must feel immediate — hold the mouse down and confirm it does not creep.
  - In DevTools Animations panel at 10% speed, confirm the press transition is 160ms and eases out (fast at the start).
  - DevTools → Toggle device toolbar → iPhone: tap a `.quote`, a `.cur` card, and three journal photos in a row, then scroll. **No card may remain lifted or shadowed.** This is the primary check.
  - On the same emulated device, tap a press row — the background may flash but the row must not indent.
  - Back on desktop pointer, confirm every hover still lifts exactly as it did before.
- **Done when**: every pressable acknowledges press with a 0.97 scale, and no touch tap leaves an element in a moved state.
