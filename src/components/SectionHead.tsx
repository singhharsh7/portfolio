import type { ReactNode } from "react";

export default function SectionHead({
  index,
  label,
  title,
  lede,
}: {
  index: string;
  label: string;
  title: ReactNode;
  lede?: string;
}) {
  return (
    <div className="section-head" data-reveal>
      <span className="kicker">
        <span className="num">{index}</span>
        {label}
      </span>
      <h2 className="section-title">{title}</h2>
      {lede ? <p className="section-lede">{lede}</p> : null}
    </div>
  );
}
