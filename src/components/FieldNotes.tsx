import SectionHead from "./SectionHead";
import { fieldNotes } from "@/lib/data";

export default function FieldNotes() {
  return (
    <section className="section" id="field-notes" aria-labelledby="fn-title">
      <div className="wrap">
        <SectionHead
          index="—"
          label="Field notes"
          title={
            <span id="fn-title">
              A photograph, with <em>context</em>
            </span>
          }
          lede="Frames from nine years of chasing the story — from the assembly floor to the brand studio. Hover to bring them to colour."
        />
        <div className="plates">
          {fieldNotes.map((p) => (
            <figure className="plate" key={p.no} data-reveal>
              <div
                className="plate-frame"
                style={{ backgroundImage: `url(${p.src})` }}
              >
                <span className="plate-no">Plate {p.no}</span>
              </div>
              <figcaption>{p.caption}</figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
