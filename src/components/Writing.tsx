import SectionHead from "./SectionHead";
import PlatformMark from "./PlatformMark";
import { perspectives, writing } from "@/lib/data";
import { plainText, renderInline } from "@/lib/inline-links";

export default function Writing() {
  const latest = perspectives[0];
  const words = plainText((latest?.paragraphs ?? []).join(" ")).split(/\s+/).length;
  const readMinutes = Math.max(1, Math.round(words / 200));
  return (
    <section className="section" id="writing" aria-labelledby="writing-title">
      <div className="wrap">
        <SectionHead
          index="05"
          label="Dispatches"
          title={
            <span id="writing-title">
              Still <em>filing</em>, on Substack &amp; Medium
            </span>
          }
        />
        <div className="two">
          {writing.map((c) => (
            <a
              key={c.name}
              className="column-card"
              href={c.href}
              target="_blank"
              rel="noopener noreferrer"
              data-reveal
              style={{ "--brand": c.brand } as React.CSSProperties}
            >
              <span className="plat">
                <PlatformMark name={c.name} />
                {c.name}
              </span>
              <h3>{c.handle}</h3>
              <p>{c.body}</p>
              <span className="go">
                Read the column <span aria-hidden="true">↗</span>
              </span>
            </a>
          ))}
        </div>
        {latest && (
          <article
            className="perspective"
            id="weekly-perspective"
            aria-labelledby="perspective-title"
            data-reveal
          >
            <div className="perspective-body">
              <div className="perspective-meta">
                <span className="perspective-kicker">The Weekly Perspective</span>
                <span className="perspective-read">{readMinutes} min read</span>
              </div>
              <h3 id="perspective-title">{latest.title}</h3>
              {latest.paragraphs.map((p, i) => (
                <p key={i}>{renderInline(p)}</p>
              ))}
              <p className="perspective-byline">
                By <strong>Harsh V Singh</strong>
              </p>
            </div>
          </article>
        )}
      </div>
    </section>
  );
}
