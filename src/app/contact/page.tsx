import type { Metadata } from "next";
import Social from "@/components/Social";

export const metadata: Metadata = {
  title: "Contact Harsh V Singh | Reach Out & Social Links",
  description: "Get in touch with Harsh V Singh for brand strategy, consulting, or project delivery.",
};

export default function Contact() {
  return (
    <section className="blk" style={{ textAlign: 'center', padding: '100px 40px' }}>
      <h1 className="headline">Let's Work Together</h1>
      <p className="body-txt" style={{ marginBottom: '40px' }}>
        I'm always open to discussing new projects, creative ideas or opportunities to be part of your visions.
      </p>
      <div className="btn-row" style={{ marginBottom: '60px' }}>
        <a href="mailto:contact@example.com" className="btn p">Send an Email</a>
      </div>
      <Social />
    </section>
  );
}
