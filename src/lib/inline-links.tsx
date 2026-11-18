import type { ReactNode } from "react";

// Article text in data.ts marks links as [label](https://url). This turns
// one such string into text and external links. No hooks, so it renders in
// both server and client components.
const LINK = /\[([^\]]+)\]\((https?:\/\/[^)\s]+)\)/g;

export function renderInline(text: string): ReactNode[] {
  const out: ReactNode[] = [];
  let last = 0;
  for (const m of text.matchAll(LINK)) {
    const at = m.index ?? 0;
    if (at > last) out.push(text.slice(last, at));
    out.push(
      <a key={at} href={m[2]} target="_blank" rel="noopener noreferrer">
        {m[1]}
      </a>
    );
    last = at + m[0].length;
  }
  if (last < text.length) out.push(text.slice(last));
  return out;
}

/** The same string with link markup reduced to its label (for word counts). */
export function plainText(text: string): string {
  return text.replace(LINK, "$1");
}
