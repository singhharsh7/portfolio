import { site } from "@/lib/data";

export default function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="wrap row">
        <span className="mono-mark">{site.monogram}</span>
        <span>© Harsh V Singh · {site.role}</span>
        <span>Set in Bricolage Grotesque, Hanken Grotesk &amp; IBM Plex Mono</span>
        <a className="to-top" href="#top">
          Back to top ↑
        </a>
      </div>
    </footer>
  );
}
