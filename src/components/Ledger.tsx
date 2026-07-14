import { stats } from "@/lib/data";

export default function Ledger() {
  return (
    <section className="ledger" aria-label="By the numbers">
      <div className="wrap">
        <div className="ledger-grid">
          {stats.map((s, i) => (
            <div
              className="stat"
              key={s.label}
              data-reveal
              style={{ "--d": `${i * 0.05}s` } as React.CSSProperties}
            >
              <div className="fig">{s.figure}</div>
              <div className="lab">{s.label}</div>
              <div className="note">{s.note}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
