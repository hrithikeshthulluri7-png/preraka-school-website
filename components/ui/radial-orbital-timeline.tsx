"use client";
import { useState, useEffect, useRef } from "react";
import { X } from "lucide-react";

const NAVY = "#041E42";
const GREEN = "#2E7E46";
const SKY = "#A1CFEF";
const YELLOW = "#FFB81C";
const CREAM = "#F5F0E8";

const FLOAT_CSS = `
@keyframes floatA{0%,100%{transform:translateY(0) rotate(0deg)}50%{transform:translateY(-16px) rotate(4deg)}}
@keyframes floatB{0%,100%{transform:translateY(0) rotate(0deg)}50%{transform:translateY(-10px) rotate(-5deg)}}
@keyframes floatC{0%,100%{transform:translate(0,0)}33%{transform:translate(10px,-14px)}66%{transform:translate(-8px,-6px)}}
@keyframes cardSlideUp{from{opacity:0;transform:translateX(-50%) translateY(20px)}to{opacity:1;transform:translateX(-50%) translateY(0)}}
`;

const FLOAT_ICONS = [
  { emoji: "🏺", left: "3%",  top: "14%", anim: "floatA", delay: "0s",    size: "2rem"   },
  { emoji: "🎨", left: "93%", top: "11%", anim: "floatB", delay: "0.6s",  size: "1.9rem" },
  { emoji: "📷", left: "91%", top: "60%", anim: "floatC", delay: "1.1s",  size: "1.8rem" },
  { emoji: "🤖", left: "2%",  top: "57%", anim: "floatA", delay: "1.5s",  size: "1.9rem" },
  { emoji: "🌿", left: "11%", top: "86%", anim: "floatB", delay: "0.8s",  size: "1.6rem" },
  { emoji: "💡", left: "85%", top: "83%", anim: "floatC", delay: "0.3s",  size: "1.7rem" },
  { emoji: "✏️", left: "6%",  top: "36%", anim: "floatA", delay: "1.3s",  size: "1.5rem" },
  { emoji: "🔧", left: "90%", top: "36%", anim: "floatB", delay: "0.9s",  size: "1.5rem" },
  { emoji: "🎵", left: "21%", top: "7%",  anim: "floatC", delay: "1.7s",  size: "1.5rem" },
  { emoji: "⚗️", left: "72%", top: "7%",  anim: "floatA", delay: "0.2s",  size: "1.5rem" },
  { emoji: "🌟", left: "48%", top: "5%",  anim: "floatB", delay: "0.4s",  size: "1.4rem" },
];

interface ProgramNode {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  icon: React.ReactNode;
  color: string;
}

const TreeCenter = () => (
  <svg viewBox="0 0 80 104" width="44" fill="none">
    <rect x="36" y="55" width="8" height="30" rx="4" fill="white" />
    <circle cx="40" cy="32" r="22" fill="white" />
    <circle cx="24" cy="38" r="13" fill="white" />
    <circle cx="56" cy="38" r="13" fill="white" />
    <ellipse cx="40" cy="78" rx="12" ry="3.5" fill="white" opacity="0.4" />
    <line x1="28" y1="80" x2="18" y2="94" stroke="white" strokeWidth="1.5" opacity="0.6" />
    <line x1="40" y1="82" x2="40" y2="96" stroke="white" strokeWidth="1.5" opacity="0.6" />
    <line x1="52" y1="80" x2="62" y2="94" stroke="white" strokeWidth="1.5" opacity="0.6" />
  </svg>
);

const programs: ProgramNode[] = [
  {
    id: 1,
    title: "Indian Culture",
    subtitle: "Gandharya Vidhya",
    description: "An ancient Indian tradition using music and sound as a powerful tool for harmony, emotional balance, and inner growth.",
    icon: <span className="text-2xl">🎵</span>,
    color: "#FFB81C",
  },
  {
    id: 2,
    title: "DIY",
    subtitle: "Do It Yourself",
    description: "A modern global practice that promotes creativity and self-reliance through hands-on making, building, and problem-solving using one's own skills.",
    icon: <span className="text-2xl">🔧</span>,
    color: "#F99D84",
  },
  {
    id: 3,
    title: "STEM",
    subtitle: "Science, Technology, Engineering & Mathematics",
    description: "A modern global approach to learning that builds problem-solving, innovation, and logical thinking by integrating STEM in practical, real-world applications.",
    icon: <span className="text-2xl">⚙️</span>,
    color: "#2E7E46",
  },
  {
    id: 4,
    title: "SchoolAI",
    subtitle: "By CoSchool",
    description: "An AI-powered learning platform that personalizes learning paths, automates academic insights, and supports teachers with smart analytics.",
    icon: <span className="text-2xl">🤖</span>,
    color: "#041E42",
  },
  {
    id: 5,
    title: "Seedling",
    subtitle: "Grades PP–PP2",
    description: "We believe that as a Seedling should adapt to the soil around it to GROW. Our students should make friends around them to grow while learning.",
    icon: <span className="text-2xl">🌱</span>,
    color: "#8ECDA8",
  },
  {
    id: 6,
    title: "Sapling",
    subtitle: "Grades 1st–5th",
    description: "We believe that as a Sapling should use the minerals around it to grow bigger and STRONGER. Our students need to absorb different skill sets at this age.",
    icon: <span className="text-2xl">🌿</span>,
    color: "#A1CFEF",
  },
  {
    id: 7,
    title: "Oaks",
    subtitle: "Grades 6th–7th",
    description: "We believe in having a strong grip of the soil. An oak should have roots spread into the soil. Our students will be getting guest lectures and adapting to student-led start-ups.",
    icon: <span className="text-2xl">🌳</span>,
    color: "#041E42",
  },
];

export default function RadialOrbitalTimeline() {
  const [rotation, setRotation] = useState(0);
  const [autoRotate, setAutoRotate] = useState(true);
  const [activeId, setActiveId] = useState<number | null>(null);
  const [centerActive, setCenterActive] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (!autoRotate) return;
    timerRef.current = setInterval(() => {
      setRotation((r) => (r + 0.4) % 360);
    }, 50);
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [autoRotate]);

  const handleNodeClick = (id: number) => {
    setActiveId((prev) => (prev === id ? null : id));
    setAutoRotate(false);
    setCenterActive(false);
  };

  const handleCenterClick = () => {
    setCenterActive((prev) => !prev);
    setActiveId(null);
    setAutoRotate(false);
  };

  const handleClose = () => {
    setActiveId(null);
    setCenterActive(false);
    setAutoRotate(true);
  };

  const getPos = (index: number) => {
    const angle = ((index / programs.length) * 360 + rotation) * (Math.PI / 180);
    const radius = 200;
    return {
      x: radius * Math.cos(angle),
      y: radius * Math.sin(angle),
      opacity: Math.max(0.45, 0.45 + 0.55 * ((1 + Math.sin(angle)) / 2)),
    };
  };

  const activeProgram = programs.find((p) => p.id === activeId);

  return (
    <section
      className="relative w-full min-h-screen flex flex-col items-center justify-center overflow-hidden py-16"
      style={{ background: `linear-gradient(135deg, ${SKY}30 0%, ${CREAM} 60%, ${SKY}20 100%)` }}
    >
      <style>{FLOAT_CSS}</style>

      {/* Floating decorative icons */}
      {FLOAT_ICONS.map((fi, i) => (
        <div
          key={i}
          className="absolute pointer-events-none select-none"
          style={{
            left: fi.left,
            top: fi.top,
            fontSize: fi.size,
            animation: `${fi.anim} ${4 + (i % 3)}s ease-in-out ${fi.delay} infinite`,
            opacity: 0.55,
          }}
        >
          {fi.emoji}
        </div>
      ))}

      <div className="text-center mb-8 z-10">
        <p className="text-sm font-semibold tracking-widest uppercase mb-2" style={{ color: GREEN }}>
          Our Programs
        </p>
        <h2 className="text-4xl md:text-5xl font-bold" style={{ fontFamily: "Georgia, serif", color: NAVY }}>
          What Makes Preraka Different
        </h2>
        <p className="mt-3 text-gray-500 text-sm">
          Click any node to explore · Click the center to learn about us
        </p>
      </div>

      {/* Orbital canvas */}
      <div className="relative flex items-center justify-center z-10" style={{ width: 520, height: 520 }}>
        {/* Orbit ring */}
        <div
          className="absolute rounded-full border"
          style={{ width: 420, height: 420, borderColor: `${NAVY}25` }}
        />

        {/* Center — Preraka school logo */}
        <button
          onClick={handleCenterClick}
          className="absolute z-20 flex items-center justify-center rounded-full transition-all duration-300 hover:scale-110"
          style={{
            width: 80, height: 80,
            background: centerActive ? "#2E7E46" : NAVY,
            boxShadow: `0 0 0 ${centerActive ? "12px" : "6px"} ${NAVY}25`,
          }}
        >
          <TreeCenter />
          {centerActive && (
            <div
              className="absolute w-24 h-24 rounded-full border-2 animate-ping"
              style={{ borderColor: `${NAVY}40` }}
            />
          )}
        </button>

        {/* Program nodes — NO transition on wrapper to prevent twitching */}
        {programs.map((prog, i) => {
          const pos = getPos(i);
          const isActive = activeId === prog.id;
          return (
            <div
              key={prog.id}
              className="absolute cursor-pointer"
              style={{
                transform: `translate(${pos.x}px, ${pos.y}px)`,
                opacity: isActive ? 1 : pos.opacity,
                zIndex: isActive ? 30 : 10,
              }}
              onClick={() => handleNodeClick(prog.id)}
            >
              {/* Glow */}
              <div
                className="absolute inset-0 rounded-full -z-10"
                style={{
                  width: 64, height: 64,
                  left: -8, top: -8,
                  background: `radial-gradient(circle, ${prog.color}40 0%, transparent 70%)`,
                  transform: isActive ? "scale(1.8)" : "scale(1)",
                  transition: "transform 0.3s ease",
                }}
              />

              {/* Node circle — transition only here */}
              <div
                className="w-12 h-12 rounded-full flex items-center justify-center border-2"
                style={{
                  background: isActive ? prog.color : "white",
                  borderColor: isActive ? prog.color : `${prog.color}80`,
                  transform: isActive ? "scale(1.35)" : "scale(1)",
                  boxShadow: isActive ? `0 4px 20px ${prog.color}60` : "none",
                  transition: "all 0.3s ease",
                }}
              >
                {prog.icon}
              </div>

              {/* Label */}
              <div
                className="absolute top-14 left-1/2 -translate-x-1/2 whitespace-nowrap text-xs font-semibold text-center"
                style={{ color: isActive ? NAVY : "#666" }}
              >
                {prog.title}
              </div>
            </div>
          );
        })}
      </div>

      {/* Info popup — dark card */}
      {(activeProgram || centerActive) && (
        <div
          className="absolute z-40 max-w-sm w-full mx-4 rounded-2xl shadow-2xl p-5"
          style={{
            background: "linear-gradient(145deg, #062B4F 0%, #041E42 100%)",
            border: `1px solid ${activeProgram ? activeProgram.color : SKY}55`,
            bottom: "4%",
            left: "50%",
            animation: "cardSlideUp 0.32s cubic-bezier(0.34,1.56,0.64,1) forwards",
          }}
        >
          <button
            onClick={handleClose}
            className="absolute top-3 right-3 w-7 h-7 rounded-full flex items-center justify-center transition-colors"
            style={{ background: "rgba(255,255,255,0.1)" }}
          >
            <X size={14} color="white" />
          </button>

          {centerActive ? (
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-11 h-11 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: GREEN }}>
                  <TreeCenter />
                </div>
                <div>
                  <span className="inline-block text-xs px-2 py-0.5 rounded-full mb-1" style={{ background: `${SKY}25`, color: SKY, border: `1px solid ${SKY}35` }}>
                    School
                  </span>
                  <h3 className="font-bold text-base text-white" style={{ fontFamily: "Georgia, serif" }}>Preraka</h3>
                  <p className="text-xs" style={{ color: "rgba(161,207,239,0.65)" }}>The School of Change</p>
                </div>
              </div>
              <p className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.78)" }}>
                Preraka inspires change. Our STEM-driven environment encourages students to explore, question, and create. With mentors who guide rather than lecture, we nurture thinkers, innovators, and problem-solvers — preparing every child to face the world with confidence and curiosity.
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                {["•Equality", "•Motivate", "•Inspirational", "•Independent"].map((tag) => (
                  <span key={tag} className="text-xs px-3 py-1 rounded-full" style={{ background: `${SKY}18`, color: SKY, border: `1px solid ${SKY}28` }}>
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ) : activeProgram ? (
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div
                  className="w-12 h-12 rounded-2xl flex items-center justify-center text-2xl flex-shrink-0"
                  style={{ background: `${activeProgram.color}28`, border: `1px solid ${activeProgram.color}55` }}
                >
                  {activeProgram.icon}
                </div>
                <div>
                  <span className="inline-block text-xs px-2 py-0.5 rounded-full mb-1" style={{ background: `${activeProgram.color}28`, color: activeProgram.color, border: `1px solid ${activeProgram.color}45` }}>
                    Program
                  </span>
                  <h3 className="font-bold text-base text-white leading-tight">{activeProgram.title}</h3>
                  <p className="text-xs mt-0.5" style={{ color: "rgba(161,207,239,0.65)" }}>{activeProgram.subtitle}</p>
                </div>
              </div>
              <p className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.78)" }}>
                {activeProgram.description}
              </p>
              <div className="mt-4 pt-3" style={{ borderTop: `1px solid ${activeProgram.color}35` }}>
                <p className="text-xs font-semibold" style={{ color: activeProgram.color }}>Preraka School of Change</p>
              </div>
            </div>
          ) : null}
        </div>
      )}
    </section>
  );
}
