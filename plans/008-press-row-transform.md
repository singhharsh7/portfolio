# 008 — Replace the press-row `padding-left` hover with a transform

- **Status**: DONE (applied, build-verified; feel checks pending)
- **Commit**: d9aa3fb
- **Severity**: MEDIUM
- **Category**: Performance
- **Estimated scope**: 1 file, ~10 lines

## Problem

`src/app/globals.css:1130-1137` and `:1178-1181`:

```css
/* src/app/globals.css:1130-1137 — current */
.press-row {
  display: grid;
  grid-template-columns: 1fr;
  gap: 0.55rem;
  padding: 1.4rem 0.25rem;
  border-bottom: 1px solid var(--line);
  transition: background 0.25s var(--ease), padding-left 0.25s var(--ease);
}

/* src/app/globals.css:1178-1181 — current */
a.press-row:hover {
  background: var(--wash);
  padding-left: 0.9rem;
}
```

`padding-left` is a layout property. Animating it forces layout → paint → composite on every frame of the 250ms transition. Because `.press-row` is a CSS grid with `grid-template-columns: 6.5rem 13rem 1fr auto` above 52rem (line 1140), changing the padding also **reflows all four grid tracks** — the headline column is `1fr`, so its width recomputes 60 times during the hover, and the text inside re-wraps if it happens to sit near a break.

The press list renders one row per entry from `src/lib/data.ts` (~15 rows), and the effect fires on every pointer pass down the list.

## Target

Translate the row's content instead. `transform` is compositor-only: no layout, no reflow of the grid tracks, no text re-wrap.

```css
/* target — src/app/globals.css */
.press-row {
  display: grid;
  grid-template-columns: 1fr;
  gap: 0.55rem;
  padding: 1.4rem 0.25rem;
  border-bottom: 1px solid var(--line);
  transition: background 0.25s var(--ease);
}
.press-row > * {
  transition: transform 0.25s var(--ease);
}
a.press-row:hover {
  background: var(--wash);
}
@media (hover: hover) and (pointer: fine) {
  a.press-row:hover > * {
    transform: translateX(0.65rem);
  }
}
```

`0.65rem` rather than `0.9rem`: the old rule added padding *inside* the row, which shifted content by the full 0.9rem while the background box stayed put. A transform on the children produces the same read at a slightly smaller offset because nothing else moves. Verify by eye in the feel check and adjust between `0.6rem` and `0.75rem` if the shift looks different from the original.

## Repo conventions to follow

- `--ease` at `src/app/globals.css:49`.
- The transform-instead-of-layout pattern already exists correctly in this file at `src/app/globals.css:1787-1793`, where the mobile nav slides with `transform: translateY()` rather than animating `top`. Imitate it.
- If plan 007 has already been applied, the `@media (hover: hover) and (pointer: fine)` wrapper around `a.press-row:hover` will already exist — merge into it rather than adding a second identical media query.

## Steps

1. In `src/app/globals.css:1136`, remove `, padding-left 0.25s var(--ease)` from the `.press-row` transition, leaving `transition: background 0.25s var(--ease);`.
2. Immediately after the `.press-row` rule, add `.press-row > * { transition: transform 0.25s var(--ease); }`.
3. In `src/app/globals.css:1178-1181`, remove `padding-left: 0.9rem;` from `a.press-row:hover`, leaving only `background: var(--wash);`.
4. Add the gated rule `@media (hover: hover) and (pointer: fine) { a.press-row:hover > * { transform: translateX(0.65rem); } }` after it.

## Boundaries

- Do NOT change `.press-row`'s `padding`, `gap`, or `grid-template-columns`.
- Do NOT touch `a.press-row:hover .clip` (line 1175) or `a.press-row:hover .headline` (line 1197) — the grayscale and colour changes stay as they are.
- Do NOT change `src/components/Press.tsx` — the markup already gives every child its own element (`.clip`, `.outlet`, `.headline`, `.meta`), which is what `> *` targets.
- Do NOT add new dependencies.
- If the code does not match the excerpts above (drift since d9aa3fb), STOP and report.

## Verification

- **Mechanical**: `npm run build` succeeds.
- **Feel check**: run `npm run dev`, scroll to "In the press", then:
  - Hover a row: the four columns must slide right together as one unit, and the background must fill — visually indistinguishable from the previous behaviour.
  - Watch a row whose headline nearly fills its column: the text must **not** re-wrap during the hover (it did before).
  - DevTools → Rendering → enable "Paint flashing", then sweep the pointer down the whole list: previously every row repainted its full width; now the repaint should be limited to the background.
  - DevTools → Performance: record a sweep down the list. There must be no `Layout` entries attributed to the hover.
  - On an emulated touch device, tap rows: background may flash, but nothing slides.
- **Done when**: the hover reads identically to the original, with zero layout work in a performance profile.
