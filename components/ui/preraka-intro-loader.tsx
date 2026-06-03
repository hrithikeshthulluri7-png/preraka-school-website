"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";

const NAVY = "#041E42";
const GREEN = "#2E7E46";
const YELLOW = "#FFB81C";
const PEACH = "#F99D84";
const SKY = "#A1CFEF";
const CREAM = "#F5F0E8";

function Spirograph({ id, rings, size }: { id: string; rings: number; size: number }) {
  const center = size / 2;
  const paths = Array.from({ length: rings }, (_, i) => {
    const r = (center - 14) * (0.28 + i * 0.18);
    const pts = 200;
    const amp = 5 + i * 3.5;
    const freq = 6 + i;
    let d = "";
    for (let p = 0; p <= pts; p++) {
      const a = (p / pts) * Math.PI * 2;
      const wave = amp * Math.sin(a * freq + i * 0.9);
      const x = center + (r + wave) * Math.cos(a);
      const y = center + (r + wave) * Math.sin(a);
      d += p === 0 ? `M ${x.toFixed(2)} ${y.toFixed(2)}` : ` L ${x.toFixed(2)} ${y.toFixed(2)}`;
    }
    return d + " Z";
  });

  return (
    <svg
      id={id}
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
      style={{ opacity: 0 }}
    >
      {paths.map((d, i) => (
        <path key={i} d={d} stroke={NAVY} strokeWidth={0.7 + i * 0.15} fill="none" opacity={0.6 - i * 0.05} />
      ))}
    </svg>
  );
}

const ICONS = {
  PaperPlane: () => (
    <svg width="44" height="32" viewBox="0 0 44 32" fill="none">
      <polygon points="2,16 42,5 28,27" stroke="#888" strokeWidth="1.4" fill="white" />
      <line x1="28" y1="27" x2="16" y2="16" stroke="#888" strokeWidth="1.1" />
    </svg>
  ),
  Brush: () => (
    <svg width="18" height="58" viewBox="0 0 18 58" fill="none">
      <rect x="6" y="0" width="6" height="32" rx="3" fill={YELLOW} />
      <rect x="5" y="31" width="8" height="6" fill="#888" />
      <ellipse cx="9" cy="46" rx="6" ry="8" fill={NAVY} />
      <ellipse cx="9" cy="54" rx="4" ry="4" fill={GREEN} />
    </svg>
  ),
  Palette: () => (
    <svg width="50" height="44" viewBox="0 0 50 44" fill="none">
      <path d="M5 22Q5 5 25 2Q45 0 47 20Q49 34 36 40Q28 44 22 39Q16 43 10 38Q2 31 5 22Z" fill={CREAM} stroke="#ccc" strokeWidth="1" />
      <circle cx="13" cy="13" r="3.5" fill={PEACH} />
      <circle cx="25" cy="8" r="3.5" fill={YELLOW} />
      <circle cx="37" cy="13" r="3.5" fill={GREEN} />
      <circle cx="40" cy="25" r="3.5" fill={NAVY} />
      <circle cx="22" cy="32" r="5" fill="white" stroke="#ccc" strokeWidth="0.8" />
    </svg>
  ),
  Camera: () => (
    <svg width="46" height="36" viewBox="0 0 46 36" fill="none">
      <rect x="2" y="8" width="42" height="26" rx="5" fill="white" stroke="#aaa" strokeWidth="1.3" />
      <circle cx="23" cy="21" r="8" stroke="#aaa" strokeWidth="1.3" fill="none" />
      <circle cx="23" cy="21" r="4.5" fill="#ddd" />
      <path d="M15 8L18 2L28 2L31 8" stroke="#aaa" strokeWidth="1.3" fill="none" />
      <circle cx="37" cy="14" r="2.5" fill={PEACH} />
    </svg>
  ),
  Origami: () => (
    <svg width="40" height="36" viewBox="0 0 40 36" fill="none">
      <polygon points="20,2 38,30 20,24 2,30" fill={YELLOW} stroke="#c8960a" strokeWidth="0.9" />
      <polygon points="20,24 2,30 10,36" fill="#e8a800" stroke="#c8960a" strokeWidth="0.9" />
      <polygon points="20,24 38,30 30,36" fill="#e8a800" stroke="#c8960a" strokeWidth="0.9" />
    </svg>
  ),
  FacePaint: () => (
    <svg width="42" height="52" viewBox="0 0 42 52" fill="none">
      <circle cx="21" cy="18" r="15" fill="#FFE4D4" stroke="#ccc" strokeWidth="1" />
      <circle cx="15" cy="15" r="2.2" fill="#555" />
      <circle cx="27" cy="15" r="2.2" fill="#555" />
      <path d="M14 22 Q21 29 28 22" stroke="#555" strokeWidth="1.6" fill="none" />
      <path d="M32 12 Q40 7 42 14" stroke={PEACH} strokeWidth="2.2" fill="none" />
      <circle cx="42" cy="14" r="2.5" fill={PEACH} />
      <text x="4" y="48" fontSize="7" fill="#aaa" fontFamily="system-ui">FACE PAINT</text>
    </svg>
  ),
  BeadChain: ({ vertical = false }: { vertical?: boolean }) => (
    <svg width={vertical ? 20 : 80} height={vertical ? 80 : 20} viewBox={vertical ? "0 0 20 80" : "0 0 80 20"} fill="none">
      {[0, 15, 30, 45, 60].map((pos, i) => (
        <g key={i}>
          {vertical ? (
            <>
              <circle cx="10" cy={pos + 5} r="5" fill="none" stroke={GREEN} strokeWidth="1.5" />
              {i < 4 && <line x1="10" y1={pos + 10} x2="10" y2={pos + 15} stroke={GREEN} strokeWidth="1.5" />}
            </>
          ) : (
            <>
              <circle cx={pos + 5} cy="10" r="5" fill="none" stroke={GREEN} strokeWidth="1.5" />
              {i < 4 && <line x1={pos + 10} y1="10" x2={pos + 15} y2="10" stroke={GREEN} strokeWidth="1.5" />}
            </>
          )}
        </g>
      ))}
    </svg>
  ),
};

interface DecorItem {
  id: string;
  el: React.ReactNode;
  x: string;
  y: string;
  initialX: number;
  initialY: number;
}

export default function PrerakaIntroLoader({ onComplete }: { onComplete: () => void }) {
  const loaderRef = useRef<HTMLDivElement>(null);
  const seedRef = useRef<HTMLDivElement>(null);
  const medallionRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const brandRef = useRef<HTMLDivElement>(null);
  const spiroSmRef = useRef<HTMLDivElement>(null);
  const spiroLgRef = useRef<HTMLDivElement>(null);
  const decorRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const tl = gsap.timeline({ onComplete });

    // Phase 1: 0–1s — seed appears
    tl.fromTo(seedRef.current, { scale: 0, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.6, ease: "back.out(2)" }, 0.2);

    // Phase 2: 1–2.6s — medallion forms, video starts, brand fades in
    tl.to(seedRef.current, { scale: 0, opacity: 0, duration: 0.3 }, 0.9);
    tl.fromTo(medallionRef.current, { scale: 0.3, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.8, ease: "power3.out" }, 1.0);
    tl.fromTo("#spiro-sm", { opacity: 0, rotate: 0 }, { opacity: 0.35, rotate: 15, duration: 1.2, ease: "power1.out" }, 1.2);
    tl.fromTo(brandRef.current, { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, ease: "power2.out" }, 1.4);

    // Animate decorators out from center
    decorRefs.current.forEach((el, i) => {
      tl.fromTo(el, { opacity: 0.1, scale: 0.6 }, { opacity: 1, scale: 1, duration: 0.6, ease: "power2.out" }, 1.0 + i * 0.08);
    });

    // Phase 3: 2.6–5.2s — full tree blooms, spirograph expands
    tl.to("#spiro-sm", { opacity: 0, duration: 0.3 }, 2.5);
    tl.fromTo("#spiro-lg", { opacity: 0, scale: 0.4, rotate: 0 }, { opacity: 0.55, scale: 1, rotate: 20, duration: 1.8, ease: "power2.out" }, 2.6);
    tl.to(brandRef.current, { opacity: 1, duration: 0.3 }, 2.8);

    // Phase 4: 5.2–6.4s — spirograph expands off-screen as mask
    tl.to("#spiro-lg", { scale: 3.5, opacity: 0, duration: 0.9, ease: "power3.in" }, 5.2);
    const vw = typeof window !== "undefined" ? window.innerWidth : 1440;
    const vh = typeof window !== "undefined" ? window.innerHeight : 900;
    tl.to(medallionRef.current, { scale: 0.1, x: -vw * 0.38, y: -vh * 0.44, duration: 0.8, ease: "power3.in" }, 5.2);
    tl.to(brandRef.current, { opacity: 0, y: -20, duration: 0.5 }, 5.3);
    tl.to(decorRefs.current, { opacity: 0, duration: 0.4, stagger: 0.04 }, 5.2);
    tl.to(loaderRef.current, { opacity: 0, duration: 0.4 }, 5.9);

    return () => { tl.kill(); };
  }, [onComplete]);

  const decorItems: DecorItem[] = [
    { id: "d1", el: <ICONS.PaperPlane />, x: "8%", y: "12%", initialX: 0, initialY: 0 },
    { id: "d2", el: <ICONS.Brush />, x: "88%", y: "8%", initialX: 0, initialY: 0 },
    { id: "d3", el: <ICONS.Palette />, x: "85%", y: "15%", initialX: 0, initialY: 0 },
    { id: "d4", el: <ICONS.Camera />, x: "5%", y: "72%", initialX: 0, initialY: 0 },
    { id: "d5", el: <ICONS.Origami />, x: "46%", y: "82%", initialX: 0, initialY: 0 },
    { id: "d6", el: <ICONS.FacePaint />, x: "86%", y: "68%", initialX: 0, initialY: 0 },
    { id: "d7", el: <ICONS.BeadChain vertical />, x: "3%", y: "28%", initialX: 0, initialY: 0 },
    { id: "d8", el: <ICONS.BeadChain vertical />, x: "94%", y: "32%", initialX: 0, initialY: 0 },
  ];

  return (
    <div
      ref={loaderRef}
      className="fixed inset-0 z-50 overflow-hidden"
      style={{ background: CREAM }}
    >
      {/* Corner blobs */}
      <div className="absolute -top-12 -left-12 w-36 h-36 rounded-full opacity-70" style={{ background: SKY }} />
      <div className="absolute -top-12 -right-12 w-36 h-36 rounded-full opacity-70" style={{ background: YELLOW }} />
      <div className="absolute -bottom-12 -left-12 w-36 h-36 rounded-full opacity-70" style={{ background: PEACH }} />
      <div className="absolute -bottom-12 -right-12 w-36 h-36 rounded-full opacity-70" style={{ background: "#8ECDA8" }} />

      {/* Dotted path top */}
      <svg className="absolute top-10 left-20 opacity-40" width="130" height="30">
        {Array.from({ length: 10 }).map((_, i) => (
          <circle key={i} cx={i * 13 + 6} cy={15 + Math.sin(i * 0.9) * 5} r="2.8" fill={NAVY} />
        ))}
      </svg>
      {/* Triangle */}
      <svg className="absolute top-8 left-1/2 -translate-x-1/2 opacity-45" width="32" height="36" viewBox="0 0 32 36" fill="none">
        <polygon points="16,2 30,34 2,34" stroke={NAVY} strokeWidth="2.2" />
      </svg>

      {/* Decorative icons */}
      {decorItems.map((item, i) => (
        <div
          key={item.id}
          ref={(el) => { decorRefs.current[i] = el; }}
          className="absolute"
          style={{ left: item.x, top: item.y, opacity: 0 }}
        >
          {item.el}
        </div>
      ))}

      {/* Spirographs */}
      <div ref={spiroSmRef} className="absolute inset-0 pointer-events-none">
        <Spirograph id="spiro-sm" rings={3} size={280} />
      </div>
      <div ref={spiroLgRef} className="absolute inset-0 pointer-events-none">
        <Spirograph id="spiro-lg" rings={7} size={1800} />
      </div>

      {/* Seed */}
      <div
        ref={seedRef}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1"
        style={{ marginTop: "-80px", opacity: 0 }}
      >
        <div className="w-5 h-5 rounded-full" style={{ background: GREEN, boxShadow: `0 0 14px ${GREEN}90` }} />
        <div className="w-px h-4" style={{ background: GREEN, opacity: 0.7 }} />
        <svg width="32" height="7">
          <path d="M0 3.5 Q16 0 32 3.5" stroke={GREEN} strokeWidth="1.3" fill="none" opacity="0.7" />
        </svg>
      </div>

      {/* Oval medallion + video */}
      <div
        ref={medallionRef}
        className="absolute top-1/2 left-1/2 flex items-center justify-center rounded-full overflow-hidden"
        style={{
          width: 340, height: 430,
          marginLeft: -170, marginTop: -270,
          background: NAVY,
          border: "5px solid rgba(255,255,255,0.92)",
          boxShadow: `0 0 0 10px rgba(255,255,255,0.18), 0 0 60px rgba(255,255,255,0.22), 0 8px 60px ${NAVY}80`,
          opacity: 0,
        }}
      >
        <video
          ref={videoRef}
          autoPlay
          muted
          playsInline
          loop={false}
          className="w-full h-full object-cover"
          style={{ filter: "brightness(1.15) contrast(1.1) saturate(0.85)" }}
        >
          <source src="/assets/tree-growth.mp4" type="video/mp4" />
          {/* Fallback: SVG tree */}
          <div className="flex items-center justify-center w-full h-full">
            <svg viewBox="0 0 80 104" width="130" fill="none">
              <rect x="36" y="55" width="8" height="30" rx="4" fill="white" />
              <circle cx="40" cy="32" r="24" fill="white" />
              <circle cx="24" cy="38" r="14" fill="white" />
              <circle cx="56" cy="38" r="14" fill="white" />
            </svg>
          </div>
        </video>
      </div>

      {/* Brand lockup */}
      <div
        ref={brandRef}
        className="absolute left-1/2 -translate-x-1/2 text-center"
        style={{ top: "calc(50% + 195px)", opacity: 0 }}
      >
        <div className="flex items-center justify-center gap-3">
          <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ background: NAVY }}>
            <svg viewBox="0 0 80 104" width="24" fill="none">
              <rect x="36" y="55" width="8" height="30" rx="4" fill="white" />
              <circle cx="40" cy="32" r="22" fill="white" />
              <circle cx="24" cy="38" r="13" fill="white" />
              <circle cx="56" cy="38" r="13" fill="white" />
            </svg>
          </div>
          <div className="text-left">
            <div className="text-2xl font-bold" style={{ fontFamily: "Georgia, serif", color: NAVY, letterSpacing: 1 }}>
              Preraka
            </div>
            <div className="text-xs" style={{ color: "#777", letterSpacing: 0.4 }}>The School of Change.</div>
          </div>
        </div>
        <div className="mt-2 text-xs tracking-widest" style={{ color: "#999" }}>
          •Equality &nbsp;•Motivate &nbsp;•Inspirational &nbsp;•Independent
        </div>
      </div>
    </div>
  );
}
