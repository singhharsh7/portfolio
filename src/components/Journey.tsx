import SectionHead from "./SectionHead";
import { career } from "@/lib/data";

export default function Journey() {
  return (
    <section className="section" id="career" aria-labelledby="career-title">
      <div className="wrap">
        <SectionHead
          index="02"
          label="The beat"
          title={
            <span id="career-title">
              The Career <em>Timeline</em>
            </span>
          }
          lede="From the floor of the Vidhan Soudha to global project delivery, read newest dispatch first."
        />
        <div className="beat">
          {career.map((d) => (
            <article
              className={`dispatch${d.era === "news" ? " news" : ""}`}
              key={d.role}
              data-reveal
            >
              <div className="d-when">
                {d.from ? (
                  <span className="d-year">
                    {d.from}
                    {d.to ? <span className="to">&ndash; {d.to}</span> : null}
                  </span>
                ) : null}
                <span className="d-line">
                  {d.place} · {d.desk}
                </span>
              </div>
              <div className="d-what">
                <h3>{d.role}</h3>
                <div className="org">{d.org}</div>
                <p>{d.body}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
