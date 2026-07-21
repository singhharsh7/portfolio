import SectionHead from "./SectionHead";
import { capabilities } from "@/lib/data";

export default function Now() {
  return (
    <section className="section" id="desk" aria-labelledby="desk-title">
      <div className="wrap">
        <SectionHead
          index="02"
          label="On the desk"
          title={
            <span id="desk-title">
              What he does <em>now</em>
            </span>
          }
          lede="Associate Director of Project Delivery at Rang Digitech — sitting at the intersection of storytelling, SEO and applied AI to build campaigns that move real numbers."
        />
        <div className="caps">
          {capabilities.map((c, i) => (
            <div
              className="cap"
              key={c.title}
              data-reveal
              style={{ "--d": `${(i % 2) * 0.08}s` } as React.CSSProperties}
            >
              <span className="cap-i">{String(i + 1).padStart(2, "0")}</span>
              <h3>{c.title}</h3>
              <p>{c.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
