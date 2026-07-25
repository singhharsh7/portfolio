# 014 — Add swipe-to-step and drag-to-dismiss to the photo lightbox

- **Status**: DONE (applied, build-verified; feel checks pending)
- **Commit**: d9aa3fb
- **Severity**: LOW (missed opportunity — additive)
- **Category**: Missed opportunities / Interruptibility
- **Estimated scope**: 1 file, ~50 lines

## Problem

The Field Notes lightbox in `src/components/FieldNotes.tsx` can be navigated three ways — arrow keys, Escape, and the three on-screen buttons (`src/components/FieldNotes.tsx:32-46`, `:152-182`). All three are pointer- or keyboard-oriented.

There is no touch gesture at all. A photo journal of ~40 images is overwhelmingly a phone experience, and on a phone the expected interactions are swipe-left/right to step and swipe-down to dismiss. Their absence means a mobile reader must repeatedly hit small `.lb-btn` targets pinned to the screen edges.

Motion is already a dependency and already wired into this component (`MotionConfig`, `AnimatePresence`, `layoutId` at lines 52-55 and 80-138), so the spring machinery for this is present and unused.

The audit's interruptibility rule applies here: gesture-driven motion must use springs so it carries velocity when interrupted, and dismissal should be decided by **velocity**, not distance alone — a fast short flick is a dismissal, a slow long drag is not.

## Target

Make the lightbox figure draggable in both axes with elastic constraints, stepping on horizontal release and dismissing on vertical release, both gated on velocity.

```tsx
/* target — src/components/FieldNotes.tsx */

// Dismiss/step on a decisive flick, or on a drag that has clearly committed.
const SWIPE_VELOCITY = 500; // px/s
const SWIPE_DISTANCE = 90;  // px

// inside the lightbox <motion.div>, wrapping the <figure>:
<motion.div
  className="lb-drag"
  drag
  dragElastic={0.35}
  dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
  dragMomentum={false}
  onDragEnd={(_, info) => {
    const { offset, velocity } = info;
    // vertical wins only if it clearly dominates
    if (
      Math.abs(offset.y) > Math.abs(offset.x) &&
      (Math.abs(velocity.y) > SWIPE_VELOCITY || Math.abs(offset.y) > SWIPE_DISTANCE * 1.6)
    ) {
      close();
      return;
    }
    if (velocity.x < -SWIPE_VELOCITY || offset.x < -SWIPE_DISTANCE) {
      step(1);
    } else if (velocity.x > SWIPE_VELOCITY || offset.x > SWIPE_DISTANCE) {
      step(-1);
    }
  }}
  transition={{ type: "spring", duration: 0.5, bounce: 0.2 }}
>
  <figure className="lb-figure"> … </figure>
</motion.div>
```

Supporting CSS, added next to the existing `.lb-figure` rules in `src/app/globals.css`:

```css
.lb-drag {
  touch-action: none;
  cursor: grab;
  display: contents;
}
.lb-drag:active {
  cursor: grabbing;
}
```

`display: contents` keeps the existing `.lightbox` → `.lb-figure` layout intact so no positioning has to be reworked. If `display: contents` breaks dragging (a `contents` box has no layout box to transform), drop it and instead give `.lb-drag` the layout properties currently on `.lb-figure` — see Steps.

The spring `{ type: "spring", duration: 0.5, bounce: 0.2 }` is the audit's recommended Apple-style config: enough life to feel physical, not enough to look toy-like.

## Repo conventions to follow

- `MotionConfig reducedMotion="user"` at `src/components/FieldNotes.tsx:52` already covers reduced motion for everything inside it. Do **not** add a separate check — Motion will strip the spring automatically.
- `step()` and `close()` are already defined and memoised at `src/components/FieldNotes.tsx:21-29`. Reuse them; do not duplicate the modulo logic.
- `data-lenis-prevent` on the lightbox root (line 110) must stay so Lenis leaves the gesture alone.

## Steps

1. In `src/components/FieldNotes.tsx`, add the `SWIPE_VELOCITY` and `SWIPE_DISTANCE` constants at module scope, above the component.
2. Wrap the existing `<figure className="lb-figure">` (lines 119-150) in the `<motion.div className="lb-drag">` from the target block. Do not change anything inside the figure.
3. In `src/app/globals.css`, add the `.lb-drag` rules next to the existing `.lb-figure` rule.
4. Test dragging. If `display: contents` prevents the drag from working, remove that declaration and instead move the layout-affecting properties from `.lb-figure` onto `.lb-drag`, leaving `.lb-figure` as a plain content wrapper.
5. Confirm the buttons still work — they sit outside the dragged element (lines 152-182) and must **not** be moved inside it, or dragging from a button would fight the click.

## Boundaries

- Do NOT remove the keyboard handlers or the on-screen buttons — the gesture is additive, and keyboard access is required.
- Do NOT change the `layoutId` morph logic at lines 121-138. If the drag transform conflicts with the shared-layout animation, wrap **outside** the element carrying `layoutId`, never inside it.
- Do NOT use a distance-only threshold. Velocity must be able to trigger the action on its own — that is what makes a flick work.
- Do NOT add `dragMomentum` (it is explicitly `false`) — the photo should spring back to centre, not coast.
- Do NOT add a new gesture library; Motion's `drag` is already available.
- Do NOT apply this before plan 009 — both edit the same region of `FieldNotes.tsx`.
- If the code does not match the excerpts above (drift since d9aa3fb), STOP and report.

## Verification

- **Mechanical**: `npx tsc --noEmit` passes (`onDragEnd`'s `info` is typed `PanInfo`); `npm run build` succeeds.
- **Feel check**: run `npm run dev` and open a photo. Test with a **real touch device or DevTools device mode with touch emulation** — a mouse drag does not exercise the same path:
  - Flick left quickly and release: advances one photo. Flick right: goes back one.
  - Drag slowly 40px left and release: springs back to centre, does **not** advance. This is the velocity gate working.
  - Drag down and release with a flick: the lightbox closes.
  - Drag diagonally: the dominant axis must win cleanly; there must be no case where a photo both steps and closes.
  - Start a drag, then reverse direction mid-drag without releasing: the photo must follow the pointer continuously with no snap or restart.
  - At the first and last photo, flicking must wrap around (the existing `step()` uses a modulo — confirm it still does).
  - Enable `prefers-reduced-motion: reduce`: dragging must still work, but the spring should be stripped to an instant settle.
  - On desktop, confirm the ← → buttons and arrow keys are unaffected.
- **Done when**: a flick steps, a slow drag springs back, a downward flick dismisses, and the keyboard and buttons still work.

## Note

This is the largest of the additive plans and the only one that changes how the component is used rather than how it looks. Ship plans 001–011 first; treat this as a deliberate feature addition, not a fix.
