import type { Metadata } from "next";
import FieldNotesComponent from "@/components/FieldNotes";

export const metadata: Metadata = {
  title: "Field Notes & Photography by Harsh V Singh",
  description: "Explore photography and field notes from Harsh V Singh's travels across 135+ cities.",
};

export default function FieldNotes() {
  return (
    <>
      <FieldNotesComponent />
    </>
  );
}
