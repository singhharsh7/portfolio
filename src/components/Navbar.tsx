import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="nav">
      <Link href="/" className="wm" style={{ textDecoration: 'none' }}>Harsh <span className="v">V</span> Singh</Link>
      <div className="nav-links">
        <Link href="/writing">Writing &amp; Press</Link>
        <Link href="/about">About</Link>
        <Link href="/field-notes">Field Notes</Link>
        <Link href="/contact">Contact</Link>
      </div>
    </nav>
  );
}
