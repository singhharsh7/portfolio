import type { Metadata } from "next";
import WritingComponent from "@/components/Writing";
import Press from "@/components/Press";

export const metadata: Metadata = {
  title: "Writing & Press Mentions | Harsh V Singh",
  description: "Read the latest articles by Harsh V Singh on Substack and Medium, along with press mentions in major publications.",
};

export default function Writing() {
  return (
    <>
      <WritingComponent />
      <Press />
    </>
  );
}
