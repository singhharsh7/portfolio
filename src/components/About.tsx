import SectionHead from "./SectionHead";
import { aboutParas, recognition } from "@/lib/data";

// Named by aria-label rather than aria-labelledby: the section runs on its
// kicker alone now, so there is no heading left to point at.
export default function About() {
  return (
    <section className="section" id="about" aria-label="About">
      <div className="wrap">
        <SectionHead index="01" label="About" />
        <div className="about-grid">
          <div className="about-copy">
            {aboutParas.map((p) => (
              <p key={p.slice(0, 24)} data-reveal>
                {p}
              </p>
            ))}
          </div>

          <aside className="recognition" data-reveal aria-label="Recognition">
            <div className="rec-h">Recognition</div>
            {recognition.map((r) => (
              <div className="rec-item" key={r.title}>
                <div className="rec-t">{r.title}</div>
                <div className="rec-c">{r.context}</div>
              </div>
            ))}
          </aside>
        </div>
      </div>
    </section>
  );
}
