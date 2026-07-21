import SectionHead from "./SectionHead";
import { credentials, education } from "@/lib/data";

export default function Credentials() {
  return (
    <section className="section" id="credentials" aria-labelledby="cred-title">
      <div className="wrap">
        <SectionHead
          index="04"
          label="The file"
          title={
            <span id="cred-title">
              125+ <em>certifications</em>, and the schooling behind them
            </span>
          }
          lede="Journalism, brand, SEO, generative AI, leadership and DEI — through Reuters, Semrush, HubSpot, Google and LinkedIn Learning."
        />

        <div className="file-grid">
          <div>
            {credentials.map((g) => (
              <details className="folder" key={g.title} data-reveal>
                <summary>
                  <span>{g.title}</span>
                  <span className="count">{g.items.length}</span>
                  <span className="sign" aria-hidden="true">
                    +
                  </span>
                </summary>
                <ul className="folder-body">
                  {g.items.map((it) => (
                    <li key={it}>{it}</li>
                  ))}
                </ul>
              </details>
            ))}
          </div>

          <aside className="edu" data-reveal aria-label="Education">
            <div className="edu-h">Schooling</div>
            {education.map((e) => (
              <div className="edu-item" key={e.credential}>
                <div className="cred">{e.credential}</div>
                <div className="place">{e.place}</div>
                {e.note ? <span className="award">{e.note}</span> : null}
              </div>
            ))}
          </aside>
        </div>
      </div>
    </section>
  );
}
