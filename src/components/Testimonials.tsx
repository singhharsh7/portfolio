import SectionHead from "./SectionHead";
import { testimonials } from "@/lib/data";

export default function Testimonials() {
  const feature = testimonials.find((t) => t.feature);
  const rest = testimonials.filter((t) => !t.feature);

  return (
    <section className="section" id="voices" aria-labelledby="voices-title">
      <div className="wrap">
        <SectionHead
          index="05"
          label="On the record"
          title={
            <span id="voices-title">
              What editors, deans &amp; <em>clients</em> say
            </span>
          }
          lede="Attributions from newsrooms, agencies and lecture halls — not one of them anonymous."
        />

        {feature ? (
          <figure className="feature-quote" data-reveal>
            <blockquote>“{feature.quote}”</blockquote>
            <figcaption className="by">
              <b>{feature.name}</b> — {feature.title}
            </figcaption>
          </figure>
        ) : null}

        <div className="quotes">
          {rest.map((t) => (
            <figure className="quote" key={t.name} data-reveal>
              <span className="mark" aria-hidden="true">
                “
              </span>
              <p>{t.quote}</p>
              <figcaption className="by">
                <div className="n">{t.name}</div>
                <div className="t">{t.title}</div>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
