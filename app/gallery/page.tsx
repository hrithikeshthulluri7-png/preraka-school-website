// Pure server component — imports client wrapper which handles ssr:false for Three.js
import PrerakaTopBar from "@/components/ui/preraka-top-bar";
import GalleryClientWrapper from "@/components/ui/gallery-client-wrapper";
import PrerakaFooter from "@/components/ui/preraka-footer";

export default function GalleryPage() {
  return (
    <>
      <PrerakaTopBar />
      <GalleryClientWrapper />
      <PrerakaFooter />
    </>
  );
}
