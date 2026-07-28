import Image from "next/image";
import { contactPhoto, site, socials } from "@/lib/data";
import { photoDims } from "@/lib/photo-dims";

export default function Contact() {
  const dims = photoDims[contactPhoto.src];

  return (
    <section
      className="contact-shell"
      id="contact"
      aria-labelledby="contact-title"
    >
      <div className="wrap">
        <div className="contact-grid">
          <div>
            <span className="kicker">
              <span className="num">08</span>
              Get in touch
            </span>
            <h2 id="contact-title">
              Let&apos;s <em>talk</em>.
            </h2>

            <div className="contact-lines">
              <a href={`mailto:${site.email}`} data-reveal>
                <span className="k">Email</span>
                <span className="v">{site.email}</span>
              </a>
              <a href={`tel:${site.phoneHref}`} data-reveal>
                <span className="k">Phone</span>
                <span className="v">{site.phone}</span>
              </a>
              <a
                href="https://www.linkedin.com/in/singhharsh7/"
                target="_blank"
                rel="noopener noreferrer"
                data-reveal
              >
                <span className="k">LinkedIn</span>
                <span className="v">/in/singhharsh7</span>
              </a>
            </div>
          </div>

          <div className="contact-aside">
            {dims ? (
              <div className="contact-photo" data-reveal>
                <Image
                  src={contactPhoto.src}
                  alt={contactPhoto.alt}
                  width={dims.w}
                  height={dims.h}
                  sizes="(max-width: 60rem) 90vw, 26rem"
                />
              </div>
            ) : null}

            <div data-reveal>
              <span className="kicker" style={{ marginBottom: "1.1rem" }}>
                Elsewhere
              </span>
              <div className="socials" style={{ marginTop: "1.1rem" }}>
                {socials.map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {s.label}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
