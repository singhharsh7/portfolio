import { stats } from "@/lib/data";

/** Bind each separator to the word before it. These notes wrap inside columns
 *  barely wider than the text, and an ordinary space lets "IBT · NewsX" break
 *  so the dot opens the next line. */
const bindSeparators = (s: string) => s.split(" · ").join(" · ");

/**
 * The numbers strip. A description list rather than six loose divs, so a
 * screen reader hears "Years - 9.5+, newsroom to associate director" as one
 * pairing instead of three unrelated fragments. The term has to lead in the
 * DOM; subgrid puts the figure back on top visually.
 */
export default function Ledger() {
  return (
    // id is the hero scroll cue's landing point - the first thing below the
    // fold, so "read on" delivers exactly what it promises.
    <section className="ledger" id="ledger" aria-label="By the numbers">
      <div className="wrap">
        <dl className="ledger-grid">
          {stats.map((s, i) => (
            <div
              className="stat"
              key={s.label}
              data-reveal
              style={{ "--d": `${i * 0.05}s` } as React.CSSProperties}
            >
              <dt className="lab">{s.label}</dt>
              <dd className="fig">
                <span className="num">{s.figure}</span>
                {s.suffix ? <span className="suf">{s.suffix}</span> : null}
              </dd>
              <dd className="note">{bindSeparators(s.note)}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
