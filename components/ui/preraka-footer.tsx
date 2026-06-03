"use client";
import { Share2, Users, Play, Briefcase } from "lucide-react";

const YELLOW = "#FFEE00";

const waveCount = 18;

function AnimatedWaves() {
  return (
    <svg
      className="absolute inset-0 w-full h-full pointer-events-none"
      preserveAspectRatio="none"
      viewBox="0 0 1440 760"
      aria-hidden
    >
      {Array.from({ length: waveCount }).map((_, i) => {
        const y = (i / waveCount) * 760;
        const amp = 12 + (i % 5) * 6;
        const freq = 0.003 + (i % 4) * 0.002;
        const phase = i * 40;
        const points = Array.from({ length: 145 }, (_, j) => {
          const x = j * 10;
          const dy = amp * Math.sin(freq * x + phase * 0.05);
          return `${x},${(y + dy).toFixed(2)}`;
        }).join(" ");
        return (
          <polyline
            key={i}
            points={points}
            fill="none"
            stroke={i % 3 === 0 ? "#2E7E46" : "#A1CFEF"}
            strokeWidth="0.55"
            opacity={0.18 + (i % 4) * 0.06}
          >
            <animateTransform
              attributeName="transform"
              type="translate"
              from={`${-i * 8} 0`}
              to={`${1440 - i * 8} 0`}
              dur={`${18 + i * 2.5}s`}
              repeatCount="indefinite"
            />
          </polyline>
        );
      })}
    </svg>
  );
}

const footerCols = [
  {
    title: "Admissions",
    subtitle: "PRE-K TO GRADE 5",
    lines: ["Admissions Open 2026-27", "Book a guided school visit"],
    highlight: "+91 9100272854",
  },
  {
    title: "Learning",
    subtitle: "DISCOVER. CREATE. GROW.",
    lines: ["AI-powered learning", "STEM, robotics and creative labs"],
    highlight: "Gandharya Vidhya",
  },
  {
    title: "Campus",
    subtitle: "TURKAYAMJAL",
    lines: ["Radhavendra Nagar", "Turkayamjal, Hyderabad - 501510"],
    highlight: "Prerakastaff@gmail.com",
  },
  {
    title: "Connect",
    subtitle: "FAMILIES ARE INVITED",
    lines: ["Events, gallery and updates", "Contact the admissions team"],
    highlight: "Visit prerakaschool.com",
  },
];

const navLinks = ["HOME", "ABOUT", "ADMISSIONS", "GALLERY", "EVENTS", "CONTACT"];

export default function PrerakaFooter() {
  return (
    <footer>
      {/* ── Top CTA section ── */}
      <div className="relative overflow-hidden flex flex-col items-center justify-center"
        style={{ background: "#062B4F", minHeight: "720px" }}>
        <AnimatedWaves />

        <div className="relative z-10 text-center px-6 flex flex-col items-center">
          <p className="text-white text-sm tracking-[0.35em] uppercase mb-8 font-light opacity-80">
            IT&apos;S TIME TO
          </p>

          <h2
            className="font-black uppercase leading-none text-center select-none"
            style={{
              color: YELLOW,
              fontSize: "clamp(5rem, 16vw, 14rem)",
              lineHeight: 0.9,
              letterSpacing: "-0.02em",
              fontFamily: "'Arial Black', 'Helvetica Neue', sans-serif",
            }}
          >
            START<br />YOUR<br />JOURNEY
          </h2>

          <div className="mt-16 flex flex-col items-center gap-0">
            <a
              href="#contact"
              className="text-white text-lg tracking-widest hover:opacity-70 transition-opacity duration-200"
              style={{ letterSpacing: "0.18em" }}
            >
              Book a School Visit
            </a>
            <div className="w-48 mt-1" style={{ borderBottom: "1px solid rgba(255,255,255,0.5)" }} />
          </div>
        </div>

        {/* Yellow vertical connector line */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-px h-16 z-10"
          style={{ background: YELLOW }} />
      </div>

      {/* ── Bottom footer ── */}
      <div style={{ background: "#F6F7F3" }}>
        {/* Brand */}
        <div className="text-center pt-16 pb-10">
          <p className="text-5xl font-bold" style={{ fontFamily: "Georgia, serif", color: "#062B4F", letterSpacing: -1 }}>
            Preraka
          </p>
          <p className="text-base mt-1" style={{ color: "#062B4F", opacity: 0.7 }}>The School of Change.</p>
          <p className="mt-3 text-sm tracking-widest" style={{ color: "#062B4F", opacity: 0.5 }}>
            Equality &nbsp;•&nbsp; Motivate &nbsp;•&nbsp; Inspirational &nbsp;•&nbsp; Independent
          </p>
        </div>

        {/* 4-column grid */}
        <div className="max-w-5xl mx-auto px-6 border-t border-b" style={{ borderColor: "rgba(6,43,79,0.15)" }}>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4">
            {footerCols.map((col, i) => (
              <div key={col.title}
                className={`py-10 px-6 ${i < footerCols.length - 1 ? "md:border-r" : ""}`}
                style={{ borderColor: "rgba(6,43,79,0.15)" }}>
                <h4 className="font-bold text-base mb-1 underline underline-offset-4" style={{ color: "#062B4F" }}>
                  {col.title}
                </h4>
                <p className="text-xs font-bold tracking-widest uppercase mb-4 opacity-60" style={{ color: "#062B4F" }}>
                  {col.subtitle}
                </p>
                {col.lines.map((line) => (
                  <p key={line} className="text-sm mb-1 opacity-70" style={{ color: "#062B4F" }}>{line}</p>
                ))}
                <p className="text-sm mt-2 font-semibold" style={{ color: "#062B4F" }}>{col.highlight}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Nav + socials */}
        <div className="max-w-5xl mx-auto px-6 py-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <nav className="flex flex-wrap justify-center gap-6">
            {navLinks.map((link) => (
              <a key={link} href="#"
                className="text-xs font-medium tracking-widest hover:opacity-60 transition-opacity"
                style={{ color: "#062B4F" }}>
                {link}
              </a>
            ))}
          </nav>
          <div className="flex items-center gap-3">
            {[
              { Icon: Share2, label: "Instagram" },
              { Icon: Users, label: "Facebook" },
              { Icon: Play, label: "YouTube" },
              { Icon: Briefcase, label: "LinkedIn" },
            ].map(({ Icon, label }) => (
              <a key={label} href="#" aria-label={label}
                className="w-9 h-9 rounded-full border flex items-center justify-center hover:opacity-60 transition-opacity"
                style={{ borderColor: "rgba(6,43,79,0.3)", color: "#062B4F" }}>
                <Icon size={15} />
              </a>
            ))}
          </div>
        </div>

        {/* Legal */}
        <div className="border-t py-8 px-6 text-center" style={{ borderColor: "rgba(6,43,79,0.1)" }}>
          <p className="text-xs leading-relaxed max-w-2xl mx-auto opacity-50" style={{ color: "#062B4F" }}>
            Preraka School welcomes every family and nurtures children through learning experiences that encourage equality,
            motivation, independence and inspiration. Programs, visits and admissions information are available through the school office.
          </p>
          <p className="mt-4 text-xs font-semibold tracking-widest uppercase opacity-40" style={{ color: "#062B4F" }}>
            PRERAKA SCHOOL &nbsp;|&nbsp; THE SCHOOL OF CHANGE
          </p>
        </div>
      </div>
    </footer>
  );
}
