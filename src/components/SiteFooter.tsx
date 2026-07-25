import { site } from "@/lib/data";

export default function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="wrap row">
        <span className="mono-mark">{site.monogram}</span>
        <span>© Harsh V Singh · {site.role}</span>
        <span>
          Designed by{" "}
          <a
            className="credit"
            href="https://www.rangdigitech.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Rang Digitech
          </a>
        </span>
        <a className="to-top" href="#top">
          Back to top ↑
        </a>
      </div>
    </footer>
  );
}
