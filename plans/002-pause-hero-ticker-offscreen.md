# 002 — Pause the hero typewriter when the hero is off screen

- **Status**: DONE (applied, build-verified; feel checks pending)
- **Commit**: d9aa3fb
- **Severity**: HIGH
- **Category**: Purpose & frequency / Performance
- **Estimated scope**: 1 file, ~25 lines

## Problem

`src/components/Hero.tsx:8-40` runs a `setTimeout` recursion that calls `setState` every 34–62ms, forever:

```tsx
// src/components/Hero.tsx:8-40 — current
function useTicker() {
  const [text, setText] = useState(ticker[0]);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let idx = 0;
    let char = ticker[0].length;
    let deleting = false;
    let timer: ReturnType<typeof setTimeout>;

    const tick = () => {
      const word = ticker[idx];
      char += deleting ? -1 : 1;
      setText(word.slice(0, char));

      let delay = deleting ? 34 : 62;
      if (!deleting && char === word.length) {
        delay = 1600;
        deleting = true;
      } else if (deleting && char === 0) {
        deleting = false;
        idx = (idx + 1) % ticker.length;
        delay = 260;
      }
      timer = setTimeout(tick, delay);
    };
    timer = setTimeout(tick, 1600);
    return () => clearTimeout(timer);
  }, []);

  return text;
}
```

Each `setText` re-renders the entire `Hero` subtree — including `<HeroCanvas />` and the `next/image` portrait — at roughly 25 reconciliations per second. This continues for the entire session, including when the user has scrolled to the bottom of a very long page and the hero has not been visible for minutes.

The reduced-motion guard is correct and must be kept. What's missing is the off-screen pause that the sibling component already implements: `src/components/HeroCanvas.tsx:163-172` explicitly refuses to spend frames while the hero is out of view. The ticker should follow the same rule.

## Target

Gate the timer loop on an `IntersectionObserver`, and write the text through a ref instead of React state so the animation costs a single text-node mutation rather than a subtree reconciliation.

```tsx
/* target — src/components/Hero.tsx */
function useTicker(ref: React.RefObject<HTMLSpanElement | null>) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.textContent = ticker[0];
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let idx = 0;
    let char = ticker[0].length;
    let deleting = false;
    let timer: ReturnType<typeof setTimeout> | null = null;
    let running = false;

    const tick = () => {
      const word = ticker[idx];
      char += deleting ? -1 : 1;
      el.textContent = word.slice(0, char);

      let delay = deleting ? 34 : 62;
      if (!deleting && char === word.length) {
        delay = 1600;
        deleting = true;
      } else if (deleting && char === 0) {
        deleting = false;
        idx = (idx + 1) % ticker.length;
        delay = 260;
      }
      timer = setTimeout(tick, delay);
    };

    // Only file copy while the masthead is on screen.
    const io = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !running) {
        running = true;
        timer = setTimeout(tick, 1600);
      } else if (!entry.isIntersecting && running) {
        running = false;
        if (timer) clearTimeout(timer);
        timer = null;
      }
    });
    io.observe(el);

    return () => {
      io.disconnect();
      if (timer) clearTimeout(timer);
    };
  }, [ref]);
}
```

The markup at `src/components/Hero.tsx:54-57` gains an inner span to receive the text. The existing `<span className="cursor">` must stay a child of `.ticker` (its selector is `.ticker .cursor` at `src/app/globals.css:486`), so the ref goes on a **new inner span** rather than on `.ticker` itself — otherwise `textContent` writes would delete the cursor element on the first tick.

```tsx
/* target */
<span className="ticker" aria-live="off">
  <span ref={tickerRef} />
  <span className="cursor" aria-hidden="true" />
</span>
```

This keeps `src/app/globals.css` completely untouched.

## Repo conventions to follow

- Reduced-motion is checked imperatively with `window.matchMedia("(prefers-reduced-motion: reduce)").matches` — see `src/components/HeroCanvas.tsx:87` and `src/components/HalftoneHover.tsx:55`. Keep that idiom.
- Exemplar to imitate for the observer: `src/components/HeroCanvas.tsx:163-172`.
- `aria-live="off"` on the ticker at `src/components/Hero.tsx:54` is deliberate (it stops screen readers announcing every keystroke) — keep it.

## Steps

1. In `src/components/Hero.tsx`, change `useTicker()` to accept a ref parameter and drop its `useState`, per the target block above.
2. In the `Hero` component, replace `const live = useTicker();` with:
   ```tsx
   const tickerRef = useRef<HTMLSpanElement>(null);
   useTicker(tickerRef);
   ```
   and add `useRef` to the existing `react` import on line 3.
3. Replace the markup at `src/components/Hero.tsx:54-57` with the target block above — an inner `<span ref={tickerRef} />` for the text, with the existing cursor span left as its sibling **inside** `.ticker`.
4. Observe the inner span (`io.observe(el)` where `el = ref.current`). It is inside the hero, so its visibility tracks the masthead's.
5. Make no changes to `src/app/globals.css` — `.ticker` (line 480) and `.ticker .cursor` (line 486) keep working as-is.

## Boundaries

- Do NOT change the typing delays (34 / 62 / 1600 / 260) — the cadence is deliberate.
- Do NOT remove the `prefers-reduced-motion` early return.
- Do NOT touch `src/components/HeroCanvas.tsx`.
- Do NOT add new dependencies.
- If the code does not match the excerpts above (drift since d9aa3fb), STOP and report.

## Verification

- **Mechanical**: `npx tsc --noEmit` passes; `npm run build` succeeds.
- **Feel check**: run `npm run dev`, then:
  - The masthead still types and deletes "Now filing: …" at the same speed, with the blinking cursor beside it.
  - Open React DevTools → Profiler, record while the hero is on screen: `Hero` should now render **once**, not ~25×/sec.
  - Scroll to the bottom of the page, wait 10s, open DevTools → Performance and record 3s: there must be **no timer callbacks** from the ticker.
  - Scroll back up — typing resumes.
  - Enable `prefers-reduced-motion: reduce` (DevTools → Rendering): the ticker shows static text and the cursor is solid, not blinking.
- **Done when**: zero ticker timer activity in a profile taken with the hero off screen, and `Hero` no longer re-renders on a cadence.
