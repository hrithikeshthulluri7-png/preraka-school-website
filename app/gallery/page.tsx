"use client";
import dynamic from "next/dynamic";
import PrerakaTopBar from "@/components/ui/preraka-top-bar";
import PrerakaFooter from "@/components/ui/preraka-footer";

// Three.js / WebGL requires browser APIs — must not run on the server
const PrerakaGallery3D = dynamic(
  () => import("@/components/ui/3d-image-gallery"),
  {
    ssr: false,
    loading: () => (
      <div
        className="w-full flex items-center justify-center"
        style={{
          minHeight: "calc(100vh - 64px)",
          background: "linear-gradient(160deg,#020D1F 0%,#041E42 40%,#062B5A 70%,#041E42 100%)",
        }}
      >
        <div className="flex flex-col items-center gap-4">
          <div
            className="w-10 h-10 rounded-full border-2 border-t-transparent animate-spin"
            style={{ borderColor: "rgba(161,207,239,0.6)", borderTopColor: "transparent" }}
          />
          <p
            className="text-xs font-semibold tracking-[0.3em] uppercase"
            style={{ color: "rgba(161,207,239,0.6)" }}
          >
            Loading Gallery…
          </p>
        </div>
      </div>
    ),
  }
);

export default function GalleryPage() {
  return (
    <>
      <PrerakaTopBar />
      <PrerakaGallery3D />
      <PrerakaFooter />
    </>
  );
}
