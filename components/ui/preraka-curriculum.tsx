"use client";
import { useRef, useState } from "react";
import { motion } from "framer-motion";

const NAVY = "#041E42";
const GREEN = "#2E7E46";
const CREAM = "#F5F0E8";

const FLOAT_ICONS = [
  { emoji: "🎵", x: "1%",  y: "10%", dur: 4.2, delay: 0.2  },
  { emoji: "⚙️", x: "96%", y: "14%", dur: 3.8, delay: 0.9  },
  { emoji: "📜", x: "2%",  y: "55%", dur: 4.6, delay: 1.4  },
  { emoji: "🌱", x: "95%", y: "52%", dur: 4.0, delay: 0.6  },
  { emoji: "🖌️", x: "3%",  y: "78%", dur: 5.0, delay: 1.1  },
  { emoji: "🔬", x: "93%", y: "74%", dur: 3.6, delay: 0.4  },
  { emoji: "📐", x: "1%",  y: "34%", dur: 4.4, delay: 1.8  },
  { emoji: "🧩", x: "94%", y: "36%", dur: 3.9, delay: 0.7  },
  { emoji: "🎯", x: "48%", y: "2%",  dur: 4.7, delay: 0.3  },
  { emoji: "🧬", x: "50%", y: "96%", dur: 4.1, delay: 1.5  },
  { emoji: "🖥️", x: "24%", y: "3%",  dur: 3.7, delay: 1.0  },
  { emoji: "🪁", x: "74%", y: "3%",  dur: 4.3, delay: 0.5  },
];

interface CardData {
  id: number;
  label: string;
  description: string;
  icon: string;
  color: string;
  tag: string;
  accent: string;
  pattern: React.ReactNode;
}

function CircuitLines({ color }: { color: string }) {
  return (
    <svg className="absolute inset-0 w-full h-full" viewBox="0 0 400 140" preserveAspectRatio="xMidYMid slice" aria-hidden>
      {[30, 80, 130, 180, 230, 280, 330, 380].map((x, i) => (
        <g key={i} opacity="0.25">
          <circle cx={x} cy={40 + (i % 3) * 22} r="5" stroke={color} strokeWidth="1.5" fill="none" />
          <line x1={x} y1={45 + (i % 3) * 22} x2={x} y2={100} stroke={color} strokeWidth="1" />
          <line x1={x} y1={100} x2={x + 24} y2={100} stroke={color} strokeWidth="1" />
        </g>
      ))}
      <rect x="0" y="120" width="400" height="1" fill={color} opacity="0.15" />
    </svg>
  );
}

function HexGrid({ color }: { color: string }) {
  const pts = (cx: number, cy: number) =>
    Array.from({ length: 6 }, (_, k) => {
      const a = (k * 60 - 30) * Math.PI / 180;
      return `${(cx + 20 * Math.cos(a)).toFixed(1)},${(cy + 20 * Math.sin(a)).toFixed(1)}`;
    }).join(" ");
  const hexes: [number, number][] = [
    [50,50],[110,50],[170,50],[230,50],[290,50],[350,50],
    [80,90],[140,90],[200,90],[260,90],[320,90],
  ];
  return (
    <svg className="absolute inset-0 w-full h-full" viewBox="0 0 400 140" preserveAspectRatio="xMidYMid slice" aria-hidden>
      {hexes.map(([cx, cy], i) => (
        <polygon key={i} points={pts(cx, cy)} stroke={color} strokeWidth="1.2" fill="none" opacity="0.22" />
      ))}
    </svg>
  );
}

function WaveLines({ color }: { color: string }) {
  return (
    <svg className="absolute inset-0 w-full h-full" viewBox="0 0 400 140" preserveAspectRatio="xMidYMid slice" aria-hidden>
      {[25, 50, 75, 100, 125].map((y, i) => (
        <path key={i} d={`M0 ${y} Q100 ${y - 16} 200 ${y} Q300 ${y + 16} 400 ${y}`}
          stroke={color} strokeWidth="1.4" fill="none" opacity={0.18 + i * 0.04} />
      ))}
      {[70, 130, 190, 250, 310].map(x => (
        <text key={x} x={x} y={60} fontSize="20" fill={color} opacity="0.3">♪</text>
      ))}
    </svg>
  );
}

function ToolGrid({ color }: { color: string }) {
  return (
    <svg className="absolute inset-0 w-full h-full" viewBox="0 0 400 140" preserveAspectRatio="xMidYMid slice" aria-hidden>
      {[40, 100, 160, 220, 280, 340].map((x, i) => (
        <g key={i} transform={`translate(${x},${35 + (i % 2) * 22})`} opacity="0.22">
          <rect x="-5" y="-18" width="10" height="36" rx="2" stroke={color} strokeWidth="1.4" fill="none" />
          <rect x="-9" y="-22" width="18" height="7" rx="1.5" stroke={color} strokeWidth="1.4" fill="none" />
        </g>
      ))}
      {[60, 180, 300].map(x => (
        <circle key={x} cx={x} cy={110} r="12" stroke={color} strokeWidth="1.2" fill="none" opacity="0.2" />
      ))}
    </svg>
  );
}

const cards: CardData[] = [
  {
    id: 1, label: "The Power Of AI", icon: "🤖", color: NAVY, tag: "AI Learning", accent: "#A1CFEF",
    description: "Personalized, adaptive learning through the CoSchool AI platform — giving every student a custom path to mastery.",
    pattern: <CircuitLines color="white" />,
  },
  {
    id: 2, label: "The Logic Of STEM", icon: "⚙️", color: "#2E7E46", tag: "STEM", accent: "#8ECDA8",
    description: "Practical, real-world application of Science, Technology, Engineering, and Mathematics — building tomorrow's problem-solvers.",
    pattern: <HexGrid color="white" />,
  },
  {
    id: 3, label: "The Soul Of Gandharya Vidhya", icon: "🎵", color: "#B8860B", tag: "Ancient Wisdom", accent: "#FFB81C",
    description: "Integrating ancient Indian traditions of music and sound — promoting emotional well-being and holistic development.",
    pattern: <WaveLines color="white" />,
  },
  {
    id: 4, label: "DIY: Create, Don't Just Consume", icon: "🔧", color: "#C0704A", tag: "Hands-On", accent: "#F99D84",
    description: "We turn curiosity into confidence. Students build, solve, and innovate with their own hands — not just follow instructions.",
    pattern: <ToolGrid color="white" />,
  },
];

function TiltCard({ card, index }: { card: CardData; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [hovered, setHovered] = useState(false);

  const onMove = (e: React.MouseEvent) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    const rx = ((e.clientY - rect.top) / rect.height - 0.5) * -16;
    const ry = ((e.clientX - rect.left) / rect.width - 0.5) * 16;
    setTilt({ x: rx, y: ry });
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 48 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.65, delay: index * 0.12, ease: [0.22, 1, 0.36, 1] }}
      viewport={{ once: true, margin: "-80px" }}
      onMouseMove={onMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => { setTilt({ x: 0, y: 0 }); setHovered(false); }}
      className="relative rounded-2xl overflow-hidden cursor-pointer mb-6 last:mb-0 border"
      style={{
        transform: `perspective(900px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) translateZ(${hovered ? 16 : 0}px)`,
        transition: hovered ? "transform 0.05s linear" : "transform 0.55s cubic-bezier(0.22,1,0.36,1)",
        transformStyle: "preserve-3d",
        borderColor: `${card.color}20`,
        boxShadow: hovered ? `0 24px 60px ${card.color}25, 0 0 0 1px ${card.color}30` : "0 4px 24px rgba(0,0,0,0.06)",
      }}
    >
      {/* Header band */}
      <div className="relative overflow-hidden flex items-end justify-between px-6 pb-5"
        style={{ height: 130, background: `linear-gradient(135deg, ${card.color} 0%, ${card.color}cc 100%)` }}>
        {card.pattern}

        {/* Concentric ring accents */}
        {[1, 2, 3].map(n => (
          <div key={n} className="absolute rounded-full pointer-events-none" style={{
            width: 36 + n * 40, height: 36 + n * 40,
            right: -18 + n * 2, bottom: -18 + n * 2,
            border: "1px solid rgba(255,255,255,0.15)",
          }} />
        ))}

        {/* Icon badge */}
        <div className="w-12 h-12 rounded-2xl flex items-center justify-center text-2xl z-10 flex-shrink-0"
          style={{ background: "rgba(255,255,255,0.22)", border: "1px solid rgba(255,255,255,0.4)", backdropFilter: "blur(8px)" }}>
          {card.icon}
        </div>

        {/* Tag label */}
        <span className="z-10 text-xs font-bold tracking-widest uppercase pb-1"
          style={{ color: "rgba(255,255,255,0.72)", letterSpacing: "0.15em" }}>
          {card.tag}
        </span>

        {/* 3D depth layer — visible on hover tilt */}
        <div className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity duration-300"
          style={{ background: "linear-gradient(180deg, rgba(255,255,255,0.05) 0%, transparent 100%)" }} />
      </div>

      {/* Content */}
      <div className="px-6 py-5 bg-white">
        <h3 className="font-bold text-lg leading-tight mb-2" style={{ color: NAVY }}>
          {card.label}
        </h3>
        <p className="text-sm text-gray-500 leading-relaxed">{card.description}</p>
        <div className="mt-4 flex items-center gap-2">
          <div className="w-5 h-px flex-1" style={{ background: `${card.color}30` }} />
          <span className="text-xs font-semibold" style={{ color: card.color }}>Preraka</span>
          <div className="w-5 h-px flex-1" style={{ background: `${card.color}30` }} />
        </div>
      </div>
    </motion.div>
  );
}

export default function PrerakaCurriculum() {
  return (
    <section
      className="relative w-full overflow-hidden py-24"
      style={{ background: "linear-gradient(180deg, #A3D5FF 0%, #C8E8FF 48%, #A3D5FF 100%)" }}
    >
      {/* Floating background icons */}
      {FLOAT_ICONS.map((fi, i) => (
        <motion.div
          key={i}
          className="absolute pointer-events-none select-none text-2xl"
          style={{ left: fi.x, top: fi.y, zIndex: 0 }}
          animate={{ y: [0, -20, 0], rotate: [0, 5, -4, 0] }}
          transition={{ duration: fi.dur, repeat: Infinity, ease: "easeInOut", delay: fi.delay }}
        >
          {fi.emoji}
        </motion.div>
      ))}

      {/* Section-level PRERAKA brand heading */}
      <motion.div
        className="text-center mb-12 z-10 relative"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <motion.h2
          className="font-black uppercase"
          style={{
            color: NAVY,
            fontFamily: "'Arial Black', 'Helvetica Neue', sans-serif",
            fontSize: "clamp(2.5rem, 6vw, 5rem)",
            letterSpacing: "0.1em",
          }}
          animate={{
            textShadow: [
              "0 0 20px rgba(4,30,66,0.2)",
              "0 0 40px rgba(4,30,66,0.6), 0 0 80px rgba(4,30,66,0.3)",
              "0 0 20px rgba(4,30,66,0.2)",
            ],
          }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        >
          PRERAKA
        </motion.h2>
        <p className="mt-1 text-sm font-semibold tracking-[0.22em] uppercase" style={{ color: NAVY, opacity: 0.6 }}>
          The School of Change.
        </p>
        <p className="mt-2 text-sm" style={{ color: NAVY, opacity: 0.55 }}>
          🌱&nbsp; Equality &nbsp;•&nbsp; Motivate &nbsp;•&nbsp; Inspirational &nbsp;•&nbsp; Independent
        </p>
        <div className="mt-6 flex items-center justify-center gap-4">
          <div className="h-px flex-1 max-w-24" style={{ background: `${NAVY}25` }} />
          <p className="text-xs font-bold tracking-widest uppercase" style={{ color: GREEN }}>
            Integrated Curriculum
          </p>
          <div className="h-px flex-1 max-w-24" style={{ background: `${NAVY}25` }} />
        </div>
      </motion.div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-start">
          {/* Left — sticky heading */}
          <div className="md:sticky md:top-24">
            <motion.div
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              viewport={{ once: true, margin: "-80px" }}
            >
              <p className="text-sm font-semibold tracking-widest uppercase mb-4 flex items-center gap-2" style={{ color: GREEN }}>
                <span>✦</span> Integrated Curriculum
              </p>
              <h2 className="text-4xl md:text-5xl font-bold leading-tight mb-6" style={{ color: NAVY, fontFamily: "Georgia, serif" }}>
                A Holistic Blend Of Tradition And Innovation
              </h2>
              <p className="text-gray-500 leading-relaxed">
                Our future-ready school is deeply rooted in core values. Preraka's curriculum stands out as a unique blend of excellence:
              </p>
            </motion.div>

            {/* Summary list */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.25, ease: "easeOut" }}
              viewport={{ once: true, margin: "-80px" }}
              className="mt-10 space-y-4"
            >
              {cards.map((c, i) => (
                <motion.div
                  key={c.id}
                  initial={{ opacity: 0, x: -16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.45, delay: 0.35 + i * 0.1 }}
                  viewport={{ once: true }}
                  className="flex items-center gap-3 p-3 rounded-xl"
                  style={{ background: `${c.color}08`, border: `1px solid ${c.color}18` }}
                >
                  <div className="w-9 h-9 rounded-xl flex items-center justify-center text-base flex-shrink-0"
                    style={{ background: `${c.color}18`, border: `1px solid ${c.color}30` }}>
                    {c.icon}
                  </div>
                  <p className="text-sm font-semibold" style={{ color: NAVY }}>{c.label}</p>
                </motion.div>
              ))}
            </motion.div>

            {/* Decorative quote */}
            <motion.blockquote
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              viewport={{ once: true }}
              className="mt-10 pl-4 border-l-4"
              style={{ borderColor: GREEN }}
            >
              <p className="text-sm italic text-gray-500 leading-relaxed">
                "Equality · Motivate · Inspirational · Independent"
              </p>
              <p className="text-xs mt-2 font-semibold" style={{ color: GREEN }}>— Preraka School of Change</p>
            </motion.blockquote>
          </div>

          {/* Right — 3D tilt cards */}
          <div className="pt-4">
            {cards.map((card, i) => (
              <TiltCard key={card.id} card={card} index={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
