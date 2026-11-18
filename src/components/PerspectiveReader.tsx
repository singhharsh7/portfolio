"use client";

import { useCallback, useEffect, useRef } from "react";
import Image from "next/image";
import type { Perspective } from "@/lib/data";
import { lockScroll } from "@/lib/lenis-store";
import { renderInline } from "@/lib/inline-links";

/**
 * "Continue reading" opens the full piece in a native modal <dialog>.
 * showModal() gives the top layer, a focus trap and Esc-to-close for free;
 * the article ships in the server HTML either way, so it stays indexable.
 */
export default function PerspectiveReader({
  piece,
  readMinutes,
}: {
  piece: Perspective;
  readMinutes: number;
}) {
  const ref = useRef<HTMLDialogElement>(null);
  const unlockRef = useRef<(() => void) | null>(null);

  const open = () => {
    const d = ref.current;
    if (!d || d.open) return;
    d.showModal();
    unlockRef.current = lockScroll();
    d.querySelector<HTMLElement>(".reader-scroll")?.scrollTo(0, 0);
  };
  const close = useCallback(() => ref.current?.close(), []);

  // Every way out (button, Esc, backdrop) ends in the dialog's close event,
  // so the scroll lock is released in exactly one place.
  useEffect(() => {
    const d = ref.current;
    if (!d) return;
    const onClose = () => {
      unlockRef.current?.();
      unlockRef.current = null;
    };
    d.addEventListener("close", onClose);
    return () => {
      d.removeEventListener("close", onClose);
      onClose();
    };
  }, []);

  return (
    <>
      <button type="button" className="perspective-open" onClick={open}>
        Continue reading <span aria-hidden="true">→</span>
      </button>

      <dialog
        ref={ref}
        className="reader"
        aria-labelledby="reader-title"
        // A click that lands on the dialog itself, not its panel, is a
        // click on the backdrop.
        onClick={(e) => {
          if (e.target === e.currentTarget) close();
        }}
      >
        <div className="reader-panel">
          <button
            type="button"
            className="reader-close"
            onClick={close}
            aria-label="Close article"
          >
            <span aria-hidden="true" />
          </button>
          <div className="reader-scroll" data-lenis-prevent>
            <article>
              <div className="reader-cover">
                <Image
                  src={piece.image}
                  alt={piece.imageAlt}
                  width={1448}
                  height={1086}
                  sizes="(max-width: 46rem) 100vw, (max-width: 60rem) 46rem, 36rem"
                />
                {/* Wide screens set the quote under the held cover; narrower
                    ones close the piece with it instead (see .reader-quote). */}
                {piece.pullQuote && (
                  <blockquote className="reader-quote reader-quote--aside" aria-hidden="true">
                    <p>{piece.pullQuote}</p>
                  </blockquote>
                )}
              </div>
              <div className="reader-body">
                <div className="perspective-meta">
                  <span className="perspective-kicker">The Weekly Perspective</span>
                  <span className="perspective-read">{readMinutes} min read</span>
                </div>
                <h2 id="reader-title">{piece.title}</h2>
                <p className="reader-byline">
                  By <strong>Harsh V Singh</strong>
                </p>
                {piece.paragraphs.map((p, i) => (
                  <p key={i}>{renderInline(p)}</p>
                ))}
                {piece.pullQuote && (
                  <blockquote className="reader-quote reader-quote--end">
                    <p>{piece.pullQuote}</p>
                  </blockquote>
                )}
                <div className="reader-foot">
                  <button type="button" className="perspective-open" onClick={close}>
                    <span aria-hidden="true">←</span> Back to the page
                  </button>
                </div>
              </div>
            </article>
          </div>
        </div>
      </dialog>
    </>
  );
}
