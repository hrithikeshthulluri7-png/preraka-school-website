import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "About Us | Preraka School — The School of Change",
  description: "Learn about Preraka's vision, three-pillar philosophy, and journey from seedling to oak in Turkayamjal, Hyderabad.",
};
import PrerakaTopBar from "@/components/ui/preraka-top-bar";
import AboutHero from "@/components/ui/about-hero";
import AboutParallax from "@/components/ui/about-parallax";
import PrerakaFooter from "@/components/ui/preraka-footer";

export default function AboutPage() {
  return (
    <>
      <PrerakaTopBar />
      <AboutHero />
      <AboutParallax />
      <PrerakaFooter />
    </>
  );
}
