import SectionHead from "./SectionHead";
import { currently } from "@/lib/data";

export default function Currently() {
  return (
    <section className="section" id="currently" aria-labelledby="cur-title">
      <div className="wrap">
        <SectionHead
          index="-"
          label="Currently"
          title={
            <span id="cur-title">
              Reading &amp; <em>watching</em>
            </span>
          }
          lede="The habit behind the range, a well-read desk makes for a sharper brief."
        />
        <div className="currently">
          {currently.map((c) => (
            <a
              key={c.label}
              className="cur"
              href={c.href}
              target="_blank"
              rel="noopener noreferrer"
              data-reveal
            >
              <span className="fig">{c.figure}</span>
              <span className="lab">{c.label}</span>
              <span className="src">{c.handle} ↗</span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
