import Image from "next/image";
import { site } from "@/lib/data";

export default function SiteFooter() {
  // Stamped at build rather than typed in - the same trap the masthead
  // volume fell into. This is a server component, so it refreshes on deploy.
  const year = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <div className="wrap row">
        <div className="side">
          <span className="mono-mark">{site.monogram}</span>
          <span>
            © {year} {site.name}
          </span>
        </div>

        <div className="side">
          <span className="by">Designed by</span>
          <a
            className="credit"
            href="https://www.rangdigitech.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            {/* Decorative: the wordmark beside it already names the studio,
                so a described logo would read the name out twice. */}
            <Image
              className="credit-logo"
              src="/Rangdigitech_fevicon.webp"
              alt=""
              width={20}
              height={20}
            />
            <span>Rang Digitech</span>
          </a>
        </div>
      </div>
    </footer>
  );
}
