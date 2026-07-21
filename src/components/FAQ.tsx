import SectionHead from "./SectionHead";
import { faqs } from "@/lib/data";

export default function FAQ() {
  return (
    <section className="section" id="faq" aria-labelledby="faq-title">
      <div className="wrap">
        <SectionHead
          index="-"
          label="Frequently asked"
          title={<span id="faq-title">Straight answers</span>}
        />
        <div className="faq">
          {faqs.map((f) => (
            <details className="qa" key={f.q} data-reveal>
              <summary>
                {f.q}
                <span className="sign" aria-hidden="true">
                  +
                </span>
              </summary>
              <p className="ans">{f.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
