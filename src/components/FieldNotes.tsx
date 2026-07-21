"use client";

import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, MotionConfig, motion } from "motion/react";
import SectionHead from "./SectionHead";
import HalftoneHover from "./HalftoneHover";
import { journal } from "@/lib/data";
import { photoDims } from "@/lib/photo-dims";

export default function FieldNotes() {
  const [active, setActive] = useState<number | null>(null);
  // The frame the lightbox opened from: only that pairing shares a
  // layoutId, so the print morphs out on open and back on close, while
  // stepping between photos crossfades.
  const [openedFrom, setOpenedFrom] = useState<number | null>(null);

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
    const prev = document.documentElement.style.overflow;
    document.documentElement.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.documentElement.style.overflow = prev;
    };
  }, [active, close, step]);

  const entry = active === null ? null : journal[active];
  const dims = entry?.src ? photoDims[entry.src] : undefined;

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
              <motion.button
                type="button"
                className="lb-btn lb-prev"
                onClick={() => step(-1)}
                aria-label="Previous photo"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.92 }}
              >
                ←
              </motion.button>
              <motion.button
                type="button"
                className="lb-btn lb-next"
                onClick={() => step(1)}
                aria-label="Next photo"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.92 }}
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
