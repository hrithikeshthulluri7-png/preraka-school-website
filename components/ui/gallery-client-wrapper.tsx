"use client";
import dynamic from "next/dynamic";

/* Three.js/WebGL are browser-only. This wrapper is a client component
   so next/dynamic with ssr:false works correctly under both Webpack and
   Turbopack build pipelines. */
const PrerakaGallery3D = dynamic(
  () => import("./3d-image-gallery"),
  {
    ssr: false,
    loading: () => (
      <div
        style={{
          minHeight: "calc(100vh - 64px)",
          background: "linear-gradient(160deg,#020D1F 0%,#041E42 40%,#062B5A 70%,#041E42 100%)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: "1rem",
        }}
      >
        <div
          style={{
            width: 40,
            height: 40,
            borderRadius: "50%",
            border: "2px solid rgba(161,207,239,0.6)",
            borderTopColor: "transparent",
            animation: "spin 0.9s linear infinite",
          }}
        />
        <p style={{ color: "rgba(161,207,239,0.6)", fontSize: "0.7rem", letterSpacing: "0.3em", textTransform: "uppercase" }}>
          Loading Gallery…
        </p>
        <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
      </div>
    ),
  }
);

export default function GalleryClientWrapper() {
  return <PrerakaGallery3D />;
}
