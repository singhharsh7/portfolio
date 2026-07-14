import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Credentials from "@/components/Credentials";
import About from "@/components/About";
import Testimonials from "@/components/Testimonials";
import Writing from "@/components/Writing";
import FieldNotes from "@/components/FieldNotes";
import Press from "@/components/Press";
import ReadingWatching from "@/components/ReadingWatching";
import Social from "@/components/Social";
import FAQ from "@/components/FAQ";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="site">
      <Navbar />
      <Hero />
      <Credentials />
      <About />
      <Testimonials />
      <Writing />
      <FieldNotes />
      <Press />
      <ReadingWatching />
      <Social />
      <FAQ />
      <Footer />
    </div>
  );
}
