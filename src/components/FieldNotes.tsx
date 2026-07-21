import SectionHead from "./SectionHead";
import { journal } from "@/lib/data";
import { photoDims } from "@/lib/photo-dims";

export default function FieldNotes() {
  return (
    <section className="section" id="field-notes" aria-labelledby="fn-title">
      <div className="wrap">
        <SectionHead
          index="-"
          label="Field notes"
          title={
            <span id="fn-title">
              The photo <em>journal</em>
            </span>
          }
          lede="Encounters from nine years of chasing the story: Supreme Court justices, chief ministers, authors, cricketers, each filed with the story behind it, not as a name list."
        />

        <div className="journal">
          {journal.map((e) => (
            <figure className="j-photo" key={e.name}>
              {e.src ? (
                <div className="j-frame">
                  {/* Natural aspect ratio, frames are never cropped. Intrinsic
                      width/height reserve the space before the lazy load lands. */}
                  <img
                    src={e.src}
                    alt={e.name}
                    loading="lazy"
                    width={photoDims[e.src]?.w}
                    height={photoDims[e.src]?.h}
                  />
                </div>
              ) : null}
              <figcaption>
                <span className="j-meta">{e.meta}</span>
                <b>{e.name}</b>
                {e.story ? <p>{e.story}</p> : null}
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
