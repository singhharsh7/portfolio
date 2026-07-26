"use client";

import React, { useEffect, useRef } from "react";
import {
  useAnimate,
  useInView,
  useReducedMotion,
  type AnimationPlaybackControls,
} from "motion/react";

export type TestimonialColumnItem = {
  quote: string;
  name: string;
  title: string;
};

/**
 * A column of quotes that drifts upward forever. The list is rendered twice
 * and the track is translated by exactly -50%, so the second pass arrives
 * where the first began and the seam is never visible.
 *
 * The loop is not free, so it is gated three ways: it does not exist at all
 * under `prefers-reduced-motion`, it pauses while the column is off screen,
 * and it pauses while the reader is hovering (these quotes are long enough
 * that they have to be readable standing still).
 */
export function TestimonialsColumn({
  className,
  testimonials,
  duration = 36,
  paused = false,
}: {
  className?: string;
  testimonials: TestimonialColumnItem[];
  duration?: number;
  paused?: boolean;
}) {
  const [scope, animate] = useAnimate<HTMLDivElement>();
  const inView = useInView(scope);
  const reduced = useReducedMotion();
  const controls = useRef<AnimationPlaybackControls | null>(null);

  useEffect(() => {
    if (reduced) return;
    // Explicit keyframes rather than a bare target: a seamless loop has to
    // restart from 0%, not from wherever the previous animation left off.
    const playback = animate(
      ".tcol-track",
      { y: ["0%", "-50%"] },
      { duration, ease: "linear", repeat: Infinity, repeatType: "loop" }
    );
    controls.current = playback;
    return () => {
      playback.stop();
      controls.current = null;
    };
  }, [animate, duration, reduced]);

  useEffect(() => {
    const playback = controls.current;
    if (!playback) return;
    if (inView && !paused) playback.play();
    else playback.pause();
  }, [inView, paused]);

  // Under reduced motion nothing moves, so a second pass would only be dead
  // weight for assistive tech to wade through.
  const passes = reduced ? 1 : 2;

  return (
    <div ref={scope} className={className ? `tcol ${className}` : "tcol"}>
      <div className="tcol-track">
        {Array.from({ length: passes }, (_, pass) => (
          <React.Fragment key={pass}>
            {testimonials.map((t) => (
              <figure
                className="tcol-card"
                key={`${pass}-${t.name}`}
                // The duplicate pass is scenery; screen readers read each
                // quote once.
                aria-hidden={pass === 1 || undefined}
              >
                <span className="mark" aria-hidden="true">
                  &ldquo;
                </span>
                <blockquote>{t.quote}</blockquote>
                <figcaption className="by">
                  <span className="tcol-avatar" aria-hidden="true">
                    {initials(t.name)}
                  </span>
                  <span className="tcol-who">
                    <span className="n">{t.name}</span>
                    <span className="t">{t.title}</span>
                  </span>
                </figcaption>
              </figure>
            ))}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}

/**
 * A typographic stand-in for a headshot: "Prema Sridevi" -> "PS". These are
 * real, named people and we do not hold photographs of them, so the site
 * sets their initials rather than borrowing a stranger's face.
 */
function initials(name: string) {
  const parts = name
    .trim()
    .split(/\s+/)
    .filter((p) => !/^(dr|mr|mrs|ms|prof)\.?$/i.test(p));
  if (parts.length === 0) return "??";
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

export default TestimonialsColumn;
