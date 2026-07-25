# 010 — Introduce a duration scale and bring the count-up inside it

- **Status**: DONE (applied, build-verified; feel checks pending)
- **Commit**: d9aa3fb
- **Severity**: LOW
- **Category**: Cohesion & tokens
- **Estimated scope**: 2 files, ~25 lines

## Problem

The stylesheet has exactly one shared motion token — `--ease` at `src/app/globals.css:49` — and it is used consistently, which is good. But every **duration** is hand-typed at the call site. A scan of `src/app/globals.css` finds these distinct values in use: `0.1s`, `0.18s`, `0.2s`, `0.25s`, `0.3s`, `0.35s`, `0.4s`, `0.5s`, `0.6s`, `0.7s`. Ten values for what are conceptually three or four speeds. `0.18s` vs `0.2s` and `0.25s` vs `0.3s` are indistinguishable in use but must each be maintained separately, which is how a stylesheet drifts.

Separately, `src/components/Enhance.tsx:77-95` runs the stat count-ups at 2.2 seconds with a 0.12s per-item stagger:

```tsx
// src/components/Enhance.tsx:84-93 — current
gsap.to(c, {
  v: target,
  duration: 2.2,
  delay: i * 0.12,
  ease: "power2.out",
  onUpdate: () => {
    fig.textContent = `${Math.round(c.v)}${suffix}`;
  },
  scrollTrigger: { trigger, start: "top 82%", once: true },
});
```

With a `top 82%` trigger, a reader scrolling at a normal pace has the Ledger off the top of the viewport before the last figure has finished counting. The animation's whole purpose — letting the number's magnitude register — is defeated by outrunning the reader.

## Target

Add a four-step duration scale next to the existing easing token, and adopt it in the rules where a value is genuinely one of those four. Leave deliberately slow decorative durations (the 0.6s portrait scale, the 0.5s frame lift) alone — they are not UI feedback.

```css
/* target — src/app/globals.css, inside :root, immediately after --ease */
--ease: cubic-bezier(0.2, 0.7, 0.2, 1);
--dur-press: 160ms; /* press feedback */
--dur-fast: 200ms;  /* colour, small state */
--dur-base: 250ms;  /* dropdowns, chevrons, backgrounds */
--dur-slow: 350ms;  /* panels, drawers */
```

Adopt as follows (each is an existing value rounded to the nearest step, a change of at most 20ms and imperceptible):

| Rule | Line | Current | Target |
| --- | --- | --- | --- |
| `.skip-link` | 140 | `0.2s` | `var(--dur-fast)` |
| `.site-header` | 241 | `0.3s` | `var(--dur-base)` |
| `.nav a` | 298 | `0.2s` | `var(--dur-fast)` |
| `.nav a::after` | 308 | `0.25s` | `var(--dur-base)` |
| `.btn` | 361-362 | `0.18s` / `0.2s` | `var(--dur-press)` / `var(--dur-fast)` |
| `.btn .arrow` | 365 | `0.2s` | `var(--dur-fast)` |
| `.caps .cap` | 717-718 | `0.3s` | `var(--dur-base)` |
| `details.folder > summary` | 879 | `0.2s` | `var(--dur-fast)` |
| folder chevron | 896 | `0.25s` | `var(--dur-base)` |
| `.quote` | 1025-1026 | `0.3s` | `var(--dur-base)` |
| `.column-card` | 1087-1088 | `0.3s` | `var(--dur-base)` |
| `.press-row` | 1136 | `0.25s` | `var(--dur-base)` |
| `.cur` | 1226-1227 | `0.3s` | `var(--dur-base)` |
| `.j-card` | 1380-1381 | `0.3s` | `var(--dur-base)` |
| `.lb-btn` | 1518 | `0.2s` | `var(--dur-fast)` |
| `details.qa > summary` | 1562 | `0.2s` | `var(--dur-fast)` |
| qa chevron | 1573 | `0.25s` | `var(--dur-base)` |
| `.contact-lines a` | 1659-1660 | `0.25s` / `0.2s` | `var(--dur-base)` / `var(--dur-fast)` |
| `.socials a` | 1691-1692 | `0.2s` | `var(--dur-fast)` |
| footer links | 1735, 1741 | `0.2s` | `var(--dur-fast)` |
| mobile `.nav` | 1788 | `0.35s` | `var(--dur-slow)` |

And the count-up:

```tsx
/* target — src/components/Enhance.tsx */
gsap.to(c, {
  v: target,
  duration: 1.2,
  delay: i * 0.08,
  ease: "power2.out",
  ...
});
```

## Repo conventions to follow

- Tokens live in the `:root` block at `src/app/globals.css:11-52`, grouped with `/* ---- Name ---- */` comments. Add the durations under the existing `/* ---- Layout ---- */` group where `--ease` already sits, or give them their own `/* ---- Motion ---- */` comment.
- Values are written as `160ms` style in the token and referenced as `var(--dur-press)` at the call site.
- Exemplar of correct token use: every `var(--ease)` reference in the file.

## Steps

1. In `src/app/globals.css`, after line 49 (`--ease: …`), insert the four duration custom properties from the target block.
2. Work down the adoption table, replacing each literal duration with its token. Change **only** the duration values; leave every property list and `var(--ease)` reference untouched.
3. Do not alter any duration not in the table.
4. In `src/components/Enhance.tsx:86`, change `duration: 2.2` → `duration: 1.2`.
5. In `src/components/Enhance.tsx:87`, change `delay: i * 0.12` → `delay: i * 0.08`.

## Boundaries

- Do NOT change these decorative durations — they are intentionally slower than UI feedback: `.portrait .frame img` 0.6s (line 599), `.j-frame` transform/box-shadow (line 1417), `.j-frame img` filter (line 1426), `.hero .hero-contact a` 0.35s background-size (line 560), `.scroll-rail span` (line 161 — removed entirely by plan 001), `.js [data-reveal]` 0.7s (line 1753).
- Do NOT change `gsap.defaults({ duration: 1.15 })` at `src/components/Enhance.tsx:55` or any scroll-reveal duration — those are marketing-length reveals and are within budget.
- Do NOT introduce a second easing token.
- Do NOT add new dependencies.
- If plans 001, 003, 004, 007 or 008 have already been applied, some lines in the table will have shifted or been rewritten. Match on the **selector**, not the line number, and skip any entry whose transition no longer exists.
- If the code does not match the excerpts above (drift since d9aa3fb), STOP and report.

## Verification

- **Mechanical**: `npm run build` succeeds. Grep the stylesheet for `0.18s`, `0.3s` and `0.35s` — outside the "do not change" list there should be no remaining matches.
- **Feel check**: run `npm run dev`, then:
  - Click through the site hovering buttons, nav links, cards and accordion summaries. Nothing should feel different — this is a refactor, and any perceptible change means a wrong value was substituted.
  - Open the mobile nav below 52rem: it must still slide at the same pace.
  - Scroll to the Ledger at a normal reading pace: **every stat must finish counting while the section is still on screen.** Repeat for the "Currently" section.
  - Scroll past the Ledger fast, then scroll back: the numbers must show their final values, not restart.
- **Done when**: all durations in the table read from tokens, the site feels unchanged, and count-ups complete within the section's time on screen.
