import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "Gallery | Preraka School — Campus Life in 3D",
  description: "Explore Preraka School's interactive 3D photo gallery — STEM labs, creative studios, and campus life in Turkayamjal.",
};
// Pure server component — imports client wrapper which handles ssr:false for Three.js
import PrerakaTopBar from "@/components/ui/preraka-top-bar";
import DynamicIslandNav from "@/components/ui/dynamic-island-nav";
import GalleryClientWrapper from "@/components/ui/gallery-client-wrapper";
import PrerakaFooter from "@/components/ui/preraka-footer";

export default function GalleryPage() {
  return (
    <>
      <PrerakaTopBar />
      {/* Fixed Dynamic Island — hover/tap to navigate to any page */}
      <DynamicIslandNav />
      <GalleryClientWrapper />
      <PrerakaFooter />
    </>
  );
}
