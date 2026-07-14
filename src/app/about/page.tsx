import type { Metadata } from "next";
import AboutComponent from "@/components/About";
import FAQ from "@/components/FAQ";
import ReadingWatching from "@/components/ReadingWatching";

export const metadata: Metadata = {
  title: "About Harsh V Singh | Ex-Journalist & Project Delivery",
  description: "Learn more about Harsh V Singh's professional background, frequently asked questions, and current reading list.",
};

export default function About() {
  return (
    <>
      <AboutComponent />
      <FAQ />
      <ReadingWatching />
    </>
  );
}
