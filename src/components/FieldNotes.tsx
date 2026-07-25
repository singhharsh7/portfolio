"use client";

import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, MotionConfig, motion } from "motion/react";
import SectionHead from "./SectionHead";
import HalftoneHover from "./HalftoneHover";
import { journal } from "@/lib/data";
import { lockScroll } from "@/lib/lenis-store";
import { photoDims } from "@/lib/photo-dims";

// Dismiss or step on a decisive flick, or on a drag that has clearly
// committed. Velocity alone must be able to trigger it - a fast short
// flick is an intent, a slow long drag is not.
const SWIPE_VELOCITY = 500; // px/s
const SWIPE_DISTANCE = 90; // px

export default function FieldNotes() {
  const [active, setActive] = useState<number | null>(null);
  // The frame the lightbox opened from: only that pairing shares a
  // layoutId, so the print morphs out on open and back on close, while
  // stepping between photos crossfades.
  const [openedFrom, setOpenedFrom] = useState<number | null>(null);
  // Touch fires a synthetic hover that sticks; only real pointers get one.
  const [finePointer, setFinePointer] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(hover: hover) and (pointer: fine)");
    const apply = () => setFinePointer(mq.matches);
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, []);

  const open = (i: number) => {
    setActive(i);
    setOpenedFrom(i);
  };
  const close = useCallback(() => {
    setActive(null);
    setOpenedFrom(null);
  }, []);
  const step = useCallback((dir: number) => {
    setActive((cur) =>
      cur === null ? cur : (cur + dir + journal.length) % journal.length
    );
  }, []);

  // Keyboard navigation + scroll lock while open.
  useEffect(() => {
    if (active === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    window.addEventListener("keydown", onKey);
    const unlock = lockScroll();
    return () => {
      window.removeEventListener("keydown", onKey);
      unlock();
    };
  }, [active, close, step]);

  const entry = active === null ? null : journal[active];
  const dims = entry?.src ? photoDims[entry.src] : undefined;

  // Full transform strings so these composite; the shorthands would run on
  // the main thread alongside the layout morph and the photo decode.
  const btnMotion = {
    whileHover: finePointer ? { transform: "scale(1.08)" } : undefined,
    whileTap: { transform: "scale(0.97)" },
    transition: { duration: 0.16, ease: [0.23, 1, 0.32, 1] as const },
  };

  return (
    <MotionConfig
      reducedMotion="user"
      transition={{ layout: { type: "spring", stiffness: 260, damping: 30 } }}
    >
      <section className="section" id="field-notes" aria-labelledby="fn-title">
        <div className="wrap">
          <SectionHead
            index="-"
            label="Field notes"
            title={
              <span id="fn-title">
                The photo <em>journal</em>
              </span>
            }
            lede="Encounters from nine years of chasing the story: Supreme Court justices, chief ministers, authors, cricketers, each filed with the story behind it, not as a name list. Click any frame to view it large."
          />

          <div className="journal">
            {journal.map((e, i) => (
              <figure className="j-photo" key={e.name}>
                {e.src ? (
                  <button
                    type="button"
                    className="j-open"
                    onClick={() => open(i)}
                    aria-label={`View large: ${e.name}`}
                  >
                    <span className="j-frame">
                      <motion.img
                        layoutId={`jp-${i}`}
                        src={e.src}
                        alt={`${e.name}, ${e.meta}`}
                        loading="lazy"
                        width={photoDims[e.src]?.w}
                        height={photoDims[e.src]?.h}
                      />
                    </span>
                  </button>
                ) : null}
                <figcaption>
                  <span className="j-meta">{e.meta}</span>
                  <b>{e.name}</b>
                  {e.story ? <p>{e.story}</p> : null}
                </figcaption>
              </figure>
            ))}
          </div>
        </div>

        <HalftoneHover />

        <AnimatePresence>
          {entry ? (
            <motion.div
              className="lightbox"
              role="dialog"
              aria-modal="true"
              aria-label={entry.name}
              data-lenis-prevent
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.28 }}
              onClick={(e) => {
                if (e.target === e.currentTarget) close();
              }}
            >
              <motion.div
                className="lb-drag"
                drag
                dragElastic={0.35}
                dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
                dragMomentum={false}
                onDragEnd={(_, info) => {
                  const { offset, velocity } = info;
                  // Vertical wins only when it clearly dominates, so a
                  // diagonal drag can never both step and dismiss.
                  if (
                    Math.abs(offset.y) > Math.abs(offset.x) &&
                    (Math.abs(velocity.y) > SWIPE_VELOCITY ||
                      Math.abs(offset.y) > SWIPE_DISTANCE * 1.6)
                  ) {
                    close();
                    return;
                  }
                  if (
                    velocity.x < -SWIPE_VELOCITY ||
                    offset.x < -SWIPE_DISTANCE
                  ) {
                    step(1);
                  } else if (
                    velocity.x > SWIPE_VELOCITY ||
                    offset.x > SWIPE_DISTANCE
                  ) {
                    step(-1);
                  }
                }}
                transition={{ type: "spring", duration: 0.5, bounce: 0.2 }}
              >
                <figure className="lb-figure">
                <AnimatePresence mode="popLayout" initial={false}>
                  <motion.img
                    key={active}
                    layoutId={
                      active === openedFrom ? `jp-${openedFrom}` : undefined
                    }
                    src={entry.src}
                    alt={`${entry.name}, ${entry.meta}`}
                    width={dims?.w}
                    height={dims?.h}
                    initial={
                      active === openedFrom
                        ? undefined
                        : { opacity: 0, scale: 0.985 }
                    }
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.985 }}
                    transition={{ duration: 0.3 }}
                  />
                </AnimatePresence>
                <motion.figcaption
                  key={`cap-${active}`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.35, delay: 0.12 }}
                >
                  <span className="j-meta">{entry.meta}</span>
                  <b>{entry.name}</b>
                  {entry.story ? <p>{entry.story}</p> : null}
                </motion.figcaption>
                </figure>
              </motion.div>

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
              <motion.button
                type="button"
                className="lb-btn lb-prev"
                onClick={() => step(-1)}
                aria-label="Previous photo"
                {...btnMotion}
              >
                ←
              </motion.button>
              <motion.button
                type="button"
                className="lb-btn lb-next"
                onClick={() => step(1)}
                aria-label="Next photo"
                {...btnMotion}
              >
                →
              </motion.button>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </section>
    </MotionConfig>
  );
}
