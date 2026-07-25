import type Lenis from "lenis";

// Enhance.tsx owns the single Lenis instance; this registry lets other
// components (the lightbox) stop and start it without prop-drilling.
let instance: Lenis | null = null;

export function setLenis(l: Lenis | null) {
  instance = l;
}

export function getLenis(): Lenis | null {
  return instance;
}

/**
 * Halt smooth scrolling and return the matching release. Falls back to an
 * overflow lock when Lenis isn't running - reduced-motion visitors never
 * get an instance, since Enhance only builds one in the motion branch.
 */
export function lockScroll(): () => void {
  const lenis = instance;
  if (lenis) {
    lenis.stop();
    return () => lenis.start();
  }
  const prev = document.documentElement.style.overflow;
  document.documentElement.style.overflow = "hidden";
  return () => {
    document.documentElement.style.overflow = prev;
  };
}
