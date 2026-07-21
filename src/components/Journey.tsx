import SectionHead from "./SectionHead";
import { career } from "@/lib/data";

export default function Journey() {
  return (
    <section className="section" id="career" aria-labelledby="career-title">
      <div className="wrap">
        <SectionHead
          index="03"
          label="The beat"
          title={
            <span id="career-title">
              A life in <em>datelines</em>
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
              <div className="d-line">{d.dateline}</div>
              <h3>{d.role}</h3>
              <div className="org">{d.org}</div>
              <p>{d.body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
