"use client";
import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { X } from "lucide-react";

const NAVY = "#041E42";
const GREEN = "#2E7E46";
const SKY = "#A1CFEF";
const YELLOW = "#FFB81C";
const CREAM = "#F5F0E8";

const FLOAT_ICONS = [
  { emoji: "🏺", x: "4%",  y: "14%", dur: 4.2, delay: 0   },
  { emoji: "🎨", x: "93%", y: "11%", dur: 3.8, delay: 0.6 },
  { emoji: "📷", x: "91%", y: "60%", dur: 4.6, delay: 1.1 },
  { emoji: "🤖", x: "2%",  y: "57%", dur: 4.0, delay: 1.5 },
  { emoji: "🌿", x: "11%", y: "86%", dur: 3.6, delay: 0.8 },
  { emoji: "💡", x: "85%", y: "83%", dur: 4.4, delay: 0.3 },
  { emoji: "✏️", x: "6%",  y: "36%", dur: 5.0, delay: 1.3 },
  { emoji: "🔧", x: "90%", y: "36%", dur: 3.9, delay: 0.9 },
  { emoji: "🎵", x: "21%", y: "7%",  dur: 4.7, delay: 1.7 },
  { emoji: "⚗️", x: "72%", y: "7%",  dur: 4.1, delay: 0.2 },
  { emoji: "🌟", x: "48%", y: "4%",  dur: 3.7, delay: 0.4 },
  { emoji: "🧲", x: "18%", y: "92%", dur: 4.3, delay: 1.0 },
  { emoji: "🪄", x: "78%", y: "91%", dur: 3.5, delay: 1.9 },
  { emoji: "🔬", x: "50%", y: "93%", dur: 4.8, delay: 0.7 },
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
  { id: 1, title: "Indian Culture", subtitle: "Gandharya Vidhya", description: "An ancient Indian tradition using music and sound as a powerful tool for harmony, emotional balance, and inner growth.", icon: <span className="text-2xl">🎵</span>, color: "#FFB81C" },
  { id: 2, title: "DIY", subtitle: "Do It Yourself", description: "A modern global practice that promotes creativity and self-reliance through hands-on making, building, and problem-solving.", icon: <span className="text-2xl">🔧</span>, color: "#F99D84" },
  { id: 3, title: "STEM", subtitle: "Science, Technology, Engineering & Mathematics", description: "Builds problem-solving, innovation, and logical thinking by integrating STEM in practical, real-world applications.", icon: <span className="text-2xl">⚙️</span>, color: "#2E7E46" },
  { id: 4, title: "SchoolAI", subtitle: "By CoSchool", description: "An AI-powered learning platform that personalizes learning paths, automates academic insights, and supports teachers with smart analytics.", icon: <span className="text-2xl">🤖</span>, color: "#041E42" },
  { id: 5, title: "Seedling", subtitle: "Grades PP–PP2", description: "As a Seedling adapts to the soil around it to GROW, our students make friends around them to grow while learning.", icon: <span className="text-2xl">🌱</span>, color: "#8ECDA8" },
  { id: 6, title: "Sapling", subtitle: "Grades 1st–5th", description: "As a Sapling uses minerals around it to grow bigger and STRONGER, our students absorb different skill sets at this age.", icon: <span className="text-2xl">🌿</span>, color: "#A1CFEF" },
  { id: 7, title: "Oaks", subtitle: "Grades 6th–7th", description: "An oak with roots spread into the soil. Our students get guest lectures and adapt to student-led start-ups.", icon: <span className="text-2xl">🌳</span>, color: "#041E42" },
];

export default function RadialOrbitalTimeline() {
  const [rotation, setRotation] = useState(0);
  const [autoRotate, setAutoRotate] = useState(true);
  const [activeId, setActiveId] = useState<number | null>(null);
  const [activePos, setActivePos] = useState({ x: 0, y: 0 });
  const [centerActive, setCenterActive] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Rotation: 1° per 33ms = ~30fps, full revolution in 12 seconds
  useEffect(() => {
    if (!autoRotate) {
      if (timerRef.current) clearInterval(timerRef.current);
      return;
    }
    timerRef.current = setInterval(() => {
      setRotation(r => (r + 1) % 360);
    }, 33);
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [autoRotate]);

  const handleNodeClick = (id: number, x: number, y: number) => {
    const wasActive = activeId === id;
    setActiveId(wasActive ? null : id);
    setActivePos({ x, y });
    setAutoRotate(false);
    setCenterActive(false);
    if (wasActive) setAutoRotate(true);
  };

  const handleCenterClick = () => {
    const wasActive = centerActive;
    setCenterActive(!wasActive);
    setActiveId(null);
    setAutoRotate(false);
    if (wasActive) setAutoRotate(true);
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
      opacity: Math.max(0.5, 0.5 + 0.5 * ((1 + Math.sin(angle)) / 2)),
    };
  };

  const activeProgram = programs.find(p => p.id === activeId);

  // Popup positioned between center and clicked node (65% of the way from center to node)
  const CANVAS = 520;
  const CENTER = CANVAS / 2; // 260
  const popupCX = CENTER + activePos.x * 0.62;
  const popupCY = CENTER + activePos.y * 0.62;

  return (
    <section
      className="relative w-full min-h-screen flex flex-col items-center justify-center overflow-hidden py-16"
      style={{ background: `linear-gradient(135deg, ${SKY}30 0%, ${CREAM} 60%, ${SKY}20 100%)` }}
    >
      {/* Floating background icons */}
      {FLOAT_ICONS.map((fi, i) => (
        <motion.div
          key={i}
          className="absolute pointer-events-none select-none text-2xl"
          style={{ left: fi.x, top: fi.y }}
          animate={{ y: [0, -18, 0], rotate: [0, 6, -4, 0] }}
          transition={{ duration: fi.dur, repeat: Infinity, ease: "easeInOut", delay: fi.delay }}
        >
          {fi.emoji}
        </motion.div>
      ))}

      {/* Section heading */}
      <motion.div
        className="text-center mb-8 z-10"
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        viewport={{ once: true }}
      >
        <p className="text-sm font-semibold tracking-widest uppercase mb-2" style={{ color: GREEN }}>
          Our Programs
        </p>
        <h2 className="text-4xl md:text-5xl font-bold" style={{ fontFamily: "Georgia, serif", color: NAVY }}>
          What Makes Preraka Different
        </h2>
        <p className="mt-3 text-gray-400 text-sm">
          Click any node to explore · Click the tree to learn about us
        </p>
      </motion.div>

      {/* Orbital canvas — with perspective for 3D depth */}
      <div
        className="relative flex items-center justify-center z-10"
        style={{ width: CANVAS, height: CANVAS, perspective: "800px" }}
      >
        {/* Outer glow ring */}
        <div className="absolute rounded-full" style={{
          width: 440, height: 440,
          background: `radial-gradient(circle, transparent 195px, ${NAVY}10 196px, ${NAVY}05 220px, transparent 221px)`,
        }} />

        {/* Orbit ring */}
        <div className="absolute rounded-full border" style={{
          width: 420, height: 420,
          borderColor: `${NAVY}20`,
          boxShadow: `0 0 40px ${SKY}15 inset`,
        }} />

        {/* SVG — connection line to active node */}
        {activeProgram && (
          <svg className="absolute inset-0 pointer-events-none" width={CANVAS} height={CANVAS} style={{ zIndex: 15 }}>
            <line
              x1={CENTER} y1={CENTER}
              x2={CENTER + activePos.x} y2={CENTER + activePos.y}
              stroke={activeProgram.color}
              strokeWidth="1.5"
              strokeDasharray="6 4"
              opacity="0.6"
            />
            <circle cx={CENTER} cy={CENTER} r="6" fill={activeProgram.color} opacity="0.5" />
          </svg>
        )}

        {/* Center — Preraka tree */}
        <button
          onClick={handleCenterClick}
          className="absolute z-20 flex items-center justify-center rounded-full"
          style={{
            width: 80, height: 80,
            background: centerActive ? GREEN : NAVY,
            boxShadow: centerActive
              ? `0 0 0 10px ${GREEN}30, 0 0 30px ${GREEN}40`
              : `0 0 0 6px ${NAVY}25`,
            transition: "all 0.4s ease",
          }}
        >
          <TreeCenter />
          {centerActive && (
            <div className="absolute w-24 h-24 rounded-full border-2 animate-ping"
              style={{ borderColor: `${GREEN}50` }} />
          )}
        </button>

        {/* Program nodes */}
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
                zIndex: isActive ? 25 : 10,
              }}
              onClick={() => handleNodeClick(prog.id, pos.x, pos.y)}
            >
              {/* Glow halo */}
              <div className="absolute rounded-full -z-10" style={{
                width: 64, height: 64, left: -8, top: -8,
                background: `radial-gradient(circle, ${prog.color}50 0%, transparent 70%)`,
                transform: isActive ? "scale(2.2)" : "scale(1)",
                transition: "transform 0.4s ease",
              }} />

              {/* Node circle */}
              <div className="w-12 h-12 rounded-full flex items-center justify-center border-2" style={{
                background: isActive ? prog.color : "white",
                borderColor: isActive ? prog.color : `${prog.color}70`,
                transform: isActive ? "scale(1.4)" : "scale(1)",
                boxShadow: isActive ? `0 0 24px ${prog.color}80` : "none",
                transition: "all 0.35s cubic-bezier(0.34,1.56,0.64,1)",
              }}>
                {prog.icon}
              </div>

              {/* Label */}
              <div className="absolute top-14 left-1/2 -translate-x-1/2 whitespace-nowrap text-xs font-semibold"
                style={{ color: isActive ? NAVY : "#777" }}>
                {prog.title}
              </div>
            </div>
          );
        })}

        {/* Popup — appears between center and clicked node */}
        {activeProgram && (
          <motion.div
            key={activeId}
            initial={{ opacity: 0, scale: 0.7 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.7 }}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
            className="absolute z-40 rounded-2xl shadow-2xl p-4"
            style={{
              left: `${popupCX}px`,
              top: `${popupCY}px`,
              transform: "translate(-50%, -50%)",
              width: 220,
              background: "linear-gradient(145deg, #062B4F 0%, #041E42 100%)",
              border: `1.5px solid ${activeProgram.color}70`,
              pointerEvents: "auto",
            }}
          >
            <button
              onClick={e => { e.stopPropagation(); handleClose(); }}
              className="absolute -top-2 -right-2 w-6 h-6 rounded-full flex items-center justify-center"
              style={{ background: activeProgram.color, zIndex: 10 }}
            >
              <X size={12} color="white" />
            </button>

            <div className="flex items-center gap-2 mb-2">
              <div className="w-9 h-9 rounded-xl flex items-center justify-center text-xl flex-shrink-0"
                style={{ background: `${activeProgram.color}30`, border: `1px solid ${activeProgram.color}50` }}>
                {activeProgram.icon}
              </div>
              <div>
                <p className="text-xs font-bold text-white leading-tight">{activeProgram.title}</p>
                <p className="text-xs mt-0.5" style={{ color: "rgba(161,207,239,0.65)" }}>{activeProgram.subtitle}</p>
              </div>
            </div>
            <p className="text-xs leading-relaxed" style={{ color: "rgba(255,255,255,0.72)" }}>
              {activeProgram.description.slice(0, 110)}…
            </p>
            <div className="mt-2 pt-2" style={{ borderTop: `1px solid ${activeProgram.color}35` }}>
              <p className="text-xs font-semibold" style={{ color: activeProgram.color }}>Preraka School</p>
            </div>
          </motion.div>
        )}

        {/* Center popup */}
        {centerActive && (
          <motion.div
            key="center"
            initial={{ opacity: 0, scale: 0.7 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
            className="absolute z-40 rounded-2xl shadow-2xl p-4"
            style={{
              left: `${CENTER + 60}px`,
              top: `${CENTER - 80}px`,
              width: 220,
              background: "linear-gradient(145deg, #062B4F 0%, #041E42 100%)",
              border: `1.5px solid ${SKY}50`,
            }}
          >
            <button
              onClick={handleClose}
              className="absolute -top-2 -right-2 w-6 h-6 rounded-full flex items-center justify-center"
              style={{ background: GREEN }}
            >
              <X size={12} color="white" />
            </button>
            <div className="flex items-center gap-2 mb-2">
              <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: GREEN }}>
                <TreeCenter />
              </div>
              <div>
                <p className="text-xs font-bold text-white" style={{ fontFamily: "Georgia, serif" }}>Preraka</p>
                <p className="text-xs" style={{ color: "rgba(161,207,239,0.65)" }}>The School of Change</p>
              </div>
            </div>
            <p className="text-xs leading-relaxed" style={{ color: "rgba(255,255,255,0.72)" }}>
              Preraka inspires change. We nurture thinkers, innovators, and problem-solvers — preparing every child with confidence and curiosity.
            </p>
            <div className="mt-2 flex flex-wrap gap-1">
              {["Equality", "Motivate", "Inspire"].map(t => (
                <span key={t} className="text-xs px-2 py-0.5 rounded-full" style={{ background: `${SKY}18`, color: SKY, border: `1px solid ${SKY}28` }}>
                  {t}
                </span>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
}
