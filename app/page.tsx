"use client";
import { useState } from "react";
import PrerakaIntroLoader from "@/components/ui/preraka-intro-loader";
import PrerakaTopBar from "@/components/ui/preraka-top-bar";
import AnimatedShaderHero from "@/components/ui/animated-shader-hero";
import RadialOrbitalTimeline from "@/components/ui/radial-orbital-timeline";
import PrerakaCurriculum from "@/components/ui/preraka-curriculum";
import PrerakaFooter from "@/components/ui/preraka-footer";

export default function Home() {
  const [introComplete, setIntroComplete] = useState(false);

  return (
    <>
      {!introComplete && (
        <PrerakaIntroLoader onComplete={() => setIntroComplete(true)} />
      )}

      <main className={`transition-opacity duration-700 ${introComplete ? "opacity-100" : "opacity-0 pointer-events-none"}`}>
        {/* Sticky top bar */}
        <PrerakaTopBar />

        {/* Section 1 — Hero */}
        <AnimatedShaderHero
          trustBadge={{
            text: "Equality • Motivate • Inspirational • Independent",
            icons: ["🌱"],
          }}
          headline={{
            line1: "We Strengthen",
            line2: "Your Child's Roots.",
          }}
          subtitle="Not by making your child learn by heart — but to keep the learning life time. A future-ready school deeply rooted in values."
          buttons={{
            primary: { text: "Explore Programs" },
            secondary: { text: "Book a Visit" },
          }}
        />

        {/* Section 3 — Programs Orbital */}
        <RadialOrbitalTimeline />

        {/* Section 4 — Integrated Curriculum */}
        <PrerakaCurriculum />

        {/* Section 5 — Footer */}
        <PrerakaFooter />
      </main>
    </>
  );
}
