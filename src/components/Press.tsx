import SectionHead from "./SectionHead";
import { press } from "@/lib/data";

function RowInner({ p }: { p: (typeof press)[number] }) {
  return (
    <>
      <span
        className={`clip${p.img ? "" : " empty"}`}
        aria-hidden={p.img ? undefined : true}
      >
        {p.img ? (
          <img
            src={p.img}
            alt={`${p.outlet} clipping: ${p.title}`}
            loading="lazy"
          />
        ) : null}
      </span>
      <span className="outlet">{p.outlet}</span>
      <span className="headline">{p.title}</span>
      <span className="meta">
        {p.meta}
        {p.href ? " ↗" : ""}
      </span>
    </>
  );
}

export default function Press() {
  return (
    <section className="section" id="press" aria-labelledby="press-title">
      <div className="wrap">
        <SectionHead
          index="07"
          label="In the press"
          title={
            <span id="press-title">
              Bylines &amp; <em>bureaus</em>
            </span>
          }
          lede="Reporting that took him from hospital wards in Hyderabad to the floor of the Karnataka Vidhan Soudha."
        />
        <div className="press-list">
          {press.map((p) =>
            p.href ? (
              <a
                key={p.title}
                className="press-row"
                href={p.href}
                target="_blank"
                rel="noopener noreferrer"
                data-reveal
              >
                <RowInner p={p} />
              </a>
            ) : (
              <div className="press-row" key={p.title} data-reveal>
                <RowInner p={p} />
              </div>
            )
          )}
        </div>
      </div>
    </section>
  );
}
