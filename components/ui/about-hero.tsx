"use client";
import { useCallback } from "react";
import { CpuArchitecture } from "./cpu-architecture";
import DynamicIslandNav from "./dynamic-island-nav";

export default function AboutHero() {
  const scrollToContent = useCallback(() => {
    document.getElementById("about-content")?.scrollIntoView({ behavior: "smooth" });
  }, []);

  return (
    <section
      className="relative w-full min-h-screen flex flex-col items-center justify-center overflow-hidden cursor-pointer select-none"
      style={{
        background: "linear-gradient(160deg, #020D1F 0%, #041E42 40%, #062B5A 70%, #041E42 100%)",
      }}
      onClick={scrollToContent}
    >
      {/* Dynamic Island inside hero (same as homepage) */}
      <DynamicIslandNav inline />

      {/* Subtle grid overlay */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.04]"
        style={{
          backgroundImage: "linear-gradient(rgba(161,207,239,1) 1px, transparent 1px), linear-gradient(90deg, rgba(161,207,239,1) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      {/* Radial glow at center */}
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse 70% 60% at 50% 50%, rgba(46,126,70,0.12) 0%, transparent 70%)" }}
      />

      {/* ── PRERAKA brand heading ── */}
      <div className="relative z-10 text-center mb-2 pointer-events-none">
        <style>{`
          @keyframes letterFallAbout{from{opacity:0;transform:translateY(-40px) scale(0.7)}to{opacity:1;transform:translateY(0) scale(1)}}
          @keyframes letterGlowAbout{0%,100%{text-shadow:0 0 18px rgba(161,207,239,0.3)}50%{text-shadow:0 0 40px rgba(161,207,239,0.9),0 0 80px rgba(46,126,70,0.3)}}
          .about-letter{animation:letterFallAbout 0.55s cubic-bezier(0.34,1.56,0.64,1) both,letterGlowAbout 2.8s ease-in-out 1s infinite}
        `}</style>
        <div className="flex items-center justify-center" style={{ gap: "0.03em" }}>
          {"PRERAKA".split("").map((l, i) => (
            <span key={i} className="about-letter font-black text-white"
              style={{
                fontSize: "clamp(2.8rem, 7vw, 6rem)",
                fontFamily: "'Arial Black','Helvetica Neue',sans-serif",
                lineHeight: 1,
                animationDelay: `${i * 0.07}s, ${1 + i * 0.08}s`,
                display: "inline-block",
              }}>
              {l}
            </span>
          ))}
        </div>
        <p className="mt-1 text-xs font-light tracking-[0.3em] uppercase"
          style={{ color: "rgba(161,207,239,0.6)" }}>
          The School of Change.
        </p>
      </div>

      {/* ── CPU Architecture SVG — chip says "ABOUT US" ── */}
      <div className="relative w-full max-w-2xl mx-auto px-4 z-10 pointer-events-none">
        {/* CPU animation — lines connect to center chip */}
        <CpuArchitecture
          text="ABOUT"
          width="100%"
          height="260px"
          className="text-sky-400/40"
          animateLines
          animateMarkers
          animateText
        />

        {/* "ABOUT US" overlay — positioned over the chip center (50% x, 50% y of SVG) */}
        <div className="absolute flex flex-col items-center justify-center pointer-events-none"
          style={{ top: "50%", left: "50%", transform: "translate(-50%, -52%)" }}>
          <div className="px-5 py-2 rounded-xl border"
            style={{
              background: "rgba(4,30,66,0.92)",
              borderColor: "rgba(161,207,239,0.35)",
              backdropFilter: "blur(12px)",
            }}>
            <p className="text-white font-black tracking-widest uppercase text-center"
              style={{ fontSize: "clamp(0.9rem, 2.5vw, 1.4rem)", letterSpacing: "0.18em" }}>
              ABOUT&nbsp;US
            </p>
          </div>
        </div>
      </div>

      {/* ── Stats row ── */}
      <div className="relative z-10 flex items-center gap-6 sm:gap-10 mt-2 pointer-events-none">
        {[
          { label: "Location", value: "Turkayamjal" },
          { label: "Grades", value: "Pre-K → VII" },
          { label: "Founded", value: "2024" },
        ].map((s, i) => (
          <div key={i} className="text-center">
            <p className="text-xs font-semibold tracking-widest uppercase" style={{ color: "rgba(161,207,239,0.5)" }}>{s.label}</p>
            <p className="text-sm font-bold text-white mt-0.5">{s.value}</p>
          </div>
        ))}
      </div>

      {/* ── Scroll CTA ── */}
      <div className="relative z-10 mt-8 flex flex-col items-center gap-2 pointer-events-none">
        <p className="text-xs tracking-[0.25em] uppercase" style={{ color: "rgba(161,207,239,0.55)" }}>
          Click anywhere to explore
        </p>
        <div className="flex flex-col items-center gap-1">
          <div className="w-px h-8" style={{ background: "linear-gradient(to bottom, rgba(161,207,239,0) 0%, rgba(161,207,239,0.6) 100%)" }} />
          <div className="w-1.5 h-1.5 rounded-full" style={{ background: "#A1CFEF" }} />
        </div>
      </div>
    </section>
  );
}
