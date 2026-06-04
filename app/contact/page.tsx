import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "Contact \& Admissions | Preraka School",
  description: "Book a school visit, enquire about admissions, or get in touch with Preraka School in Turkayamjal, Hyderabad.",
};
import PrerakaTopBar from "@/components/ui/preraka-top-bar";
import ContactPageContent from "@/components/ui/contact-page";
import PrerakaFooter from "@/components/ui/preraka-footer";

export default function ContactPage() {
  return (
    <>
      <PrerakaTopBar />
      <ContactPageContent />
      <PrerakaFooter />
    </>
  );
}
