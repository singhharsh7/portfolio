import Hero from "@/components/Hero";
import Ledger from "@/components/Ledger";
import About from "@/components/About";
import Now from "@/components/Now";
import Journey from "@/components/Journey";
import Credentials from "@/components/Credentials";
import Testimonials from "@/components/Testimonials";
import Writing from "@/components/Writing";
import Press from "@/components/Press";
import Currently from "@/components/Currently";
import FieldNotes from "@/components/FieldNotes";
import FAQ from "@/components/FAQ";
import Contact from "@/components/Contact";

export default function Home() {
  return (
    <>
      <Hero />
      <Ledger />
      <About />
      <Now />
      <Journey />
      <Credentials />
      <Testimonials />
      <Writing />
      <Press />
      <Currently />
      <FieldNotes />
      <FAQ />
      <Contact />
    </>
  );
}
