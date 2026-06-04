import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "Events | Preraka School — Workshops, Open Days \& More",
  description: "Upcoming school events, open house days, and workshops at Preraka School in Turkayamjal, Hyderabad.",
};
import PrerakaTopBar from "@/components/ui/preraka-top-bar";
import EventsPageContent from "@/components/ui/events-page";
import PrerakaFooter from "@/components/ui/preraka-footer";

export default function EventsPage() {
  return (
    <>
      <PrerakaTopBar />
      <EventsPageContent />
      <PrerakaFooter />
    </>
  );
}
