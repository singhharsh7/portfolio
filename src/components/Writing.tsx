import SectionHead from "./SectionHead";
import { writing } from "@/lib/data";

export default function Writing() {
  return (
    <section className="section" id="writing" aria-labelledby="writing-title">
      <div className="wrap">
        <SectionHead
          index="05"
          label="Dispatches"
          title={
            <span id="writing-title">
              Still <em>filing</em> — on Substack &amp; Medium
            </span>
          }
          lede="Nine years in, the fuel is unchanged: get the facts right, then make people care."
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
            >
              <span className="plat">{c.name}</span>
              <h3>{c.handle}</h3>
              <p>{c.body}</p>
              <span className="go">
                Read the column <span aria-hidden="true">↗</span>
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
