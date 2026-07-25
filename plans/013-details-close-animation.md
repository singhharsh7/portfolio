# 013 — Animate `<details>` closing, not just opening

- **Status**: DONE (applied, build-verified; feel checks pending)
- **Commit**: d9aa3fb
- **Severity**: LOW (missed opportunity — additive)
- **Category**: Missed opportunities / Interruptibility
- **Estimated scope**: 1 file, ~45 lines

## Problem

Both accordion groups animate open and snap shut. `src/components/Enhance.tsx:402-419` (FAQ):

```tsx
// src/components/Enhance.tsx:402-419 — current
document.querySelectorAll<HTMLDetailsElement>("details.qa").forEach((d) => {
  const onToggle = () => {
    const ans = d.querySelector<HTMLElement>(".ans");
    if (!d.open || !ans) return;          // <-- closing does nothing
    gsap.from(ans, {
      height: 0,
      autoAlpha: 0,
      duration: 0.6,
      ease: "power2.out",
      clearProps: "height",
      overwrite: "auto",
    });
  };
  d.addEventListener("toggle", onToggle);
  cleanups.push(() => d.removeEventListener("toggle", onToggle));
});
```

And `src/components/Enhance.tsx:280-296` (credential folders) has the same `if (!d.open) return;` guard.

The asymmetry is accidental, not designed: the native `toggle` event fires *after* the browser has already set `open=false` and removed the content from the box, so by the time the handler runs there is nothing left to animate. The result is that every FAQ answer and every credential folder glides open over 600ms and then vanishes instantly — a jarring state change of exactly the kind motion exists to prevent.

Two further issues in the existing open animation:

- `height: 0` animates a **layout** property for 600ms. For a collapsing panel there is no compositor-only alternative that preserves document flow, so this is an accepted cost — but 600ms is long for it, and it should be shortened.
- `duration: 0.6` exceeds the 200–500ms budget for a panel.

## Target

Intercept the summary click, run the close animation first, and only then let the element actually close. Handle open and close symmetrically through one helper, and make it interruptible — spamming the summary must retarget, not restart.

```tsx
/* target — src/components/Enhance.tsx, replacing both forEach blocks */

// <details> animates both ways: the browser removes the content the
// instant `open` flips, so closing has to be intercepted before it does.
const animateDetails = (selector: string, bodySelector: string) => {
  document.querySelectorAll<HTMLDetailsElement>(selector).forEach((d) => {
    const summary = d.querySelector("summary");
    const body = d.querySelector<HTMLElement>(bodySelector);
    if (!summary || !body) return;

    let closing = false;

    const onClick = (e: MouseEvent) => {
      if (!d.open) return; // opening: let the toggle handler take it
      e.preventDefault();
      if (closing) return;
      closing = true;
      gsap.to(body, {
        height: 0,
        autoAlpha: 0,
        duration: 0.35,
        ease: "power2.out",
        overwrite: "auto",
        onComplete: () => {
          d.open = false;
          closing = false;
          gsap.set(body, { clearProps: "height,opacity,visibility" });
        },
      });
    };

    const onToggle = () => {
      if (!d.open) return;
      gsap.from(body, {
        height: 0,
        autoAlpha: 0,
        duration: 0.35,
        ease: "power2.out",
        clearProps: "height",
        overwrite: "auto",
      });
    };

    summary.addEventListener("click", onClick);
    d.addEventListener("toggle", onToggle);
    cleanups.push(() => {
      summary.removeEventListener("click", onClick);
      d.removeEventListener("toggle", onToggle);
    });
  });
};

animateDetails("details.qa", ".ans");
animateDetails("details.folder", ".folder-body");
```

The credential folders additionally stagger their list items on open (`src/components/Enhance.tsx:285-292`). Preserve that by extending the `onToggle` branch for `details.folder` only — see Steps.

## Repo conventions to follow

- All listeners registered inside the `mm.add` callback push their teardown into the `cleanups` array and are drained at `src/components/Enhance.tsx:518`. The helper must follow that pattern.
- GSAP eases are named strings; `power2.out` is already used throughout.
- Section comments in `Enhance.tsx` use the `// ---------- Name ----------` form. Give the helper one.
- `overwrite: "auto"` is already used on both existing toggles — keep it, it is what makes rapid toggling safe.

## Steps

1. In `src/components/Enhance.tsx`, add the `animateDetails` helper (target block above) near the other local helpers, after `countUp` (which ends at line 95).
2. Delete the existing folder-toggle `forEach` block at lines 280-296 and the FAQ-toggle `forEach` block at lines 402-419.
3. Call `animateDetails("details.qa", ".ans")` where the FAQ block used to be, and `animateDetails("details.folder", ".folder-body")` where the folder block used to be, so the section comments stay in place.
4. To preserve the folder list stagger, give `animateDetails` an optional third parameter `staggerSelector?: string`; inside `onToggle`, after the `gsap.from(body, …)` call, add:
   ```tsx
   if (staggerSelector) {
     gsap.from(body.querySelectorAll(staggerSelector), {
       autoAlpha: 0,
       x: -16,
       stagger: 0.06,
       duration: 0.55,
       ease: "power2.out",
       overwrite: "auto",
     });
   }
   ```
   and call it as `animateDetails("details.folder", ".folder-body", "li")`.
5. Verify `.folder-body` is the correct body class by checking `src/components/Credentials.tsx`; the existing code queries `.folder-body li` at line 285, which confirms it. Verify `.ans` likewise from line 406.

## Boundaries

- Do NOT change the reduced-motion branch (`src/components/Enhance.tsx:34-50`) — it returns before any of this runs, so accordions close instantly under reduced motion, which is correct.
- Do NOT change the `<details>`/`<summary>` markup in `src/components/Credentials.tsx` or `src/components/FAQ.tsx`. The native element must keep working without JS.
- Do NOT animate `height` on open **and** close with different durations — symmetry matters here because the user is toggling the same control.
- Do NOT use `overflow: hidden` on the body via JS; if the content visibly spills during the collapse, add `overflow: hidden` to the `.ans` / `.folder-body` rules in `src/app/globals.css` instead.
- Do NOT add new dependencies.
- If the code does not match the excerpts above (drift since d9aa3fb), STOP and report.

## Verification

- **Mechanical**: `npx tsc --noEmit` passes; `npm run build` succeeds.
- **Feel check**: run `npm run dev`, then:
  - Open an FAQ answer, then close it. It must **collapse smoothly**, not vanish. Open and close durations must match.
  - Do the same for a credential folder; on open, the list items must still stagger in from the left.
  - Click a summary rapidly ten times: the panel must retarget mid-animation and end in a consistent state — never stuck half-open, never left with an inline `height` on the body. Inspect the element afterwards and confirm no leftover inline styles.
  - Close a panel and immediately click to reopen before the collapse finishes: it must reverse cleanly.
  - Disable JavaScript entirely and confirm both accordions still open and close natively.
  - Enable `prefers-reduced-motion: reduce`: panels toggle instantly, which is expected.
- **Done when**: both accordions animate symmetrically, survive rapid toggling with no leftover inline styles, and still work with JS disabled.
