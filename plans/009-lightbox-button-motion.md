# 009 — Fix the lightbox button motion: hardware-accelerated, pointer-gated, subtler press

- **Status**: DONE (applied, build-verified; feel checks pending)
- **Commit**: d9aa3fb
- **Severity**: MEDIUM
- **Category**: Performance / Accessibility / Physicality
- **Estimated scope**: 1 file, ~12 lines

## Problem

`src/components/FieldNotes.tsx:152-182` — all three lightbox controls share the same three defects:

```tsx
// src/components/FieldNotes.tsx:152-162 — current (close; prev/next identical)
<motion.button
  type="button"
  className="lb-btn lb-close"
  onClick={close}
  aria-label="Close"
  autoFocus
  whileHover={{ scale: 1.1 }}
  whileTap={{ scale: 0.92 }}
>
  ×
</motion.button>
```

1. **`scale` as a Motion shorthand is not hardware-accelerated.** Motion's independent-transform shorthands (`x`, `y`, `scale`) are driven from the main thread on every frame rather than handed to the compositor. Here they run while a `layoutId` morph, an `AnimatePresence` crossfade and a large photo decode are all in flight — precisely when main-thread time is scarcest.
2. **`whileHover` is not gated for pointer type.** On touch, a tap fires a synthetic hover, so the button scales to 1.1 and **stays there** for as long as the lightbox is open. On a phone — where this photo journal is most likely to be browsed — the close button is left visibly enlarged after every tap.
3. **`whileTap={{ scale: 0.92 }}` is too deep.** The audit band for press feedback is 0.95–0.98; 0.92 reads as a lurch rather than a press, and it compounds with the 1.1 hover to produce a 0.82 total swing.

## Target

Use a `useMediaQuery`-style pointer check to drop `whileHover` on touch, express the transforms as full transform strings so they are composited, and bring the press into the subtle band.

```tsx
/* target — src/components/FieldNotes.tsx */

// near the other hooks, inside the component:
const [finePointer, setFinePointer] = useState(false);
useEffect(() => {
  const mq = window.matchMedia("(hover: hover) and (pointer: fine)");
  const apply = () => setFinePointer(mq.matches);
  apply();
  mq.addEventListener("change", apply);
  return () => mq.removeEventListener("change", apply);
}, []);

// and a shared prop object, defined above the return:
const btnMotion = {
  whileHover: finePointer ? { transform: "scale(1.08)" } : undefined,
  whileTap: { transform: "scale(0.97)" },
  transition: { duration: 0.16, ease: [0.23, 1, 0.32, 1] as const },
};
```

Each of the three buttons then spreads it:

```tsx
/* target */
<motion.button
  type="button"
  className="lb-btn lb-close"
  onClick={close}
  aria-label="Close"
  autoFocus
  {...btnMotion}
>
  ×
</motion.button>
```

`[0.23, 1, 0.32, 1]` is the strong ease-out curve from the audit catalogue, and `0.16s` matches the 100–160ms button-press budget.

## Repo conventions to follow

- The file already imports `useCallback, useEffect, useState` from `react` (`src/components/FieldNotes.tsx:3`) — no new import needed for the hook.
- Reduced motion is already handled one level up by `<MotionConfig reducedMotion="user">` at `src/components/FieldNotes.tsx:52-55`; Motion will strip these transforms automatically. Do **not** add a second reduced-motion check here.
- The imperative `window.matchMedia(...)` idiom matches `src/components/HalftoneHover.tsx:55-56`; the difference is that this one must be reactive (a `change` listener) because the component stays mounted across device-mode toggles.

## Steps

1. In `src/components/FieldNotes.tsx`, add the `finePointer` state and its `useEffect` after the existing `openedFrom` state declaration (line 15).
2. Define the `btnMotion` object immediately before the `return` statement (after the `dims` const on line 49).
3. Replace `whileHover={{ scale: 1.1 }}` and `whileTap={{ scale: 0.92 }}` on all three buttons (`lb-close` at lines 158-159, `lb-prev` at 168-169, `lb-next` at 178-179) with `{...btnMotion}`.
4. Leave `autoFocus` on the close button and all three `aria-label`s untouched.

## Boundaries

- Do NOT change the `layoutId` logic, the `AnimatePresence` configuration, or the image/figcaption transitions — those are correct.
- Do NOT remove `<MotionConfig reducedMotion="user">`.
- Do NOT change the keyboard handlers.
- Do NOT convert these to CSS `:hover`/`:active` — plan 007 covers `.lb-btn` press feedback in CSS for the non-Motion path, and duplicating it here would double-apply the scale. If plan 007 has already been applied, **remove `.lb-btn` from its `:active` selector group** so only Motion drives these three buttons.
- Do NOT add new dependencies.
- If the code does not match the excerpts above (drift since d9aa3fb), STOP and report.

## Verification

- **Mechanical**: `npx tsc --noEmit` passes (the `as const` on the ease tuple is required for Motion's easing types); `npm run build` succeeds.
- **Feel check**: run `npm run dev`, open a journal photo, then:
  - Hover the ×, ← and → buttons on a desktop pointer: each grows slightly and returns. Press one and hold: it must shrink subtly, not lurch.
  - DevTools → Toggle device toolbar → iPhone. Tap the → button several times. **The button must never remain enlarged** — this is the primary check.
  - Still in device mode, confirm the press feedback still fires on tap.
  - DevTools → Performance: record while stepping quickly through five photos. The button transforms should no longer appear as main-thread scripting work between the layout animations.
  - Enable `prefers-reduced-motion: reduce` and confirm `MotionConfig` strips the scaling while the buttons remain fully clickable.
- **Done when**: buttons are composited, never stick enlarged after a tap, and press feedback sits in the 0.95–0.98 band.
