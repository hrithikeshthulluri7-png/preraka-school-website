"use client";
import { useState, useEffect, useRef, useCallback } from "react";
import { motion } from "framer-motion";
import { X } from "lucide-react";

const NAVY = "#041E42";
const GREEN = "#2E7E46";
const SKY = "#A1CFEF";

// Returns dark or white text for readability on a given hex background
function adaptiveText(hex: string): string {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return (0.299 * r + 0.587 * g + 0.114 * b) / 255 > 0.55 ? "#041E42" : "white";
}

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

// Real Preraka logo
const PrerakaLogo = ({ size = 44, color = "white" }: { size?: number; color?: string }) => (
  <svg viewBox="0 0 163 211" width={size * 0.75} height={size} fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M72.9056 -0.588561C134.468 -6.90426 165.354 60.8223 162.867 111.041C160.504 158.548 127.149 218.835 69.3905 208.925C18.1145 200.139 -2.61107 137.205 0.260546 93.246C2.748 55.2589 29.3128 3.88815 72.9056 -0.588561ZM82.2504 90.8404C94.265 92.6516 106.232 82.1285 107.019 70.7045C108.172 54.1072 92.6996 45.4417 83.3068 34.1106C76.776 42.2189 65.6065 49.4448 62.1203 59.4106C58.0673 71.0203 62.6293 82.0356 73.5491 87.9705C75.1241 88.825 79.3115 91.537 80.3199 89.3172C83.7486 81.7477 81.8182 71.2804 78.0054 64.1845C79.6284 65.4476 80.7713 68.0482 81.6549 69.8686C82.356 71.2989 82.8938 72.8314 82.9515 74.4382L84.4401 73.4909L85.7654 68.2897C85.5926 70.3609 86.0824 72.7385 85.7366 74.7447C85.4293 76.528 84.0751 77.3081 83.691 78.9149C82.8842 82.2492 82.9803 87.2925 82.2407 90.8404H82.2504ZM55.0421 148.276C43.6421 148.871 31.224 148.276 19.6992 148.276C17.1637 148.276 20.4867 158.121 22.5131 158.316C28.9479 155.149 35.2385 157.304 41.6348 157.202C52.2761 157.044 51.9976 152.028 59.8537 148.146C62.5428 146.818 65.789 145.592 68.8239 145.546C62.3604 150.997 54.9076 155.595 50.1344 162.672C46.36 168.282 44.2855 175.564 40.1174 181.071C39.0417 183.3 47.9159 190.025 49.3949 190.647C50.5282 191.121 50.3457 190.266 50.5954 189.793C52.3721 186.365 53.5726 182.223 55.5319 178.824C59.6424 171.672 66.25 164.929 70.2549 157.508L69.8899 156.477C64.3484 159.403 56.0409 160.601 53.2653 166.722C51.8823 166.861 52.8331 165.459 53.1116 164.864C55.9352 158.855 66.1828 156.171 71.8876 152.939C74.1253 151.675 76.776 147.097 78.62 151.898C68.0556 162.245 75.9981 166.109 78.8313 175.852C80.6465 182.121 79.5132 188.548 81.5493 194.752L78.7353 192.709L75.9117 197.492C79.2923 190.991 78.5816 183.105 76.2382 176.316C74.7688 172.071 71.0328 168.477 70.2453 163.991C63.8778 169.991 66.3172 177.235 68.1228 184.499C67.1144 184.173 66.0579 181.982 65.6545 181.081C65.0303 179.669 63.6377 172.313 61.7745 173.567C60.2571 177.672 52.4874 187.861 52.5162 191.697C52.5162 192.876 56.5691 194.399 57.7504 194.882C80.5889 204.216 107.413 200 125.373 183.477C115.836 177.737 118.995 161.521 107.048 159.514C102.563 158.762 97.8569 159.542 93.5927 157.155C96.1666 164.818 107.25 164.075 109.852 171.161L104.926 167.725L96.4259 163.991C99.2015 172.183 95.2158 180.486 104.196 185.864C100.2 185.325 97.7609 182.251 96.0706 179.037L92.8916 189.282C90.433 183.523 95.2158 177.375 94.9469 171.96C94.8509 169.926 93.7752 166.861 93.0069 164.892C91.6623 161.437 86.4569 155.196 85.9479 153.245C85.7078 152.316 86.0344 151.211 86.8987 150.997C88.3201 150.645 95.2542 155.985 97.8377 156.802C100.421 157.62 105.972 158.363 108.786 158.53C112.081 158.725 107.595 154.573 107.029 154.072C103.975 151.388 99.1631 149.27 95.7152 146.892C95.6 145.546 97.0214 146.437 97.6264 146.753C99.893 147.914 104.013 150.227 105.963 151.685C108.028 153.236 115.893 161.325 117.238 163.341C120.964 168.941 119.322 178.359 127.072 181.721C128.897 180.3 136.292 173.167 135.908 171.263C128.744 166.341 120.916 161.855 116.21 154.425C119.764 155.697 123.346 156.821 127.178 157.146C132.412 157.583 137.867 156.171 142.727 159.041L148 149.289C147.337 148.304 146.636 148.341 145.579 148.23C138.511 147.487 127.495 148.063 120.071 148.23C117.709 148.285 115.634 149.363 113.07 148.917C111.504 148.638 108.191 146.27 105.992 145.499C102.832 144.394 93.3911 143.289 91.7776 142.155C88.2625 139.694 86.0344 127.156 88.032 123.394C89.1365 121.304 93.4871 119.679 92.9205 117.877C89.5686 114.887 89.7223 117.125 86.5338 118.174C85.4485 110.001 85.8615 101.846 86.4281 93.6546L80.4832 92.3636L79.5804 93.3296L77.3235 117.487L71.926 113.484L52.593 103.119C52.4682 101.763 53.8704 102.729 54.5042 102.98C56.3482 103.713 59.1142 104.884 60.8429 105.747C62.5716 106.611 70.9848 112.184 71.9548 111.979C74.4711 111.431 73.9621 102.85 73.6259 100.908C72.4158 93.989 63.2919 86.0851 56.1273 85.3606C56.6748 83.0666 58.2978 82.4814 58.3074 79.5651C58.3459 69.7386 50.2592 65.9677 42.3839 62.1319C39.2242 66.5064 37.3898 74.7726 39.7044 79.723C40.4823 81.3948 42.7105 82.0542 42.6913 84.0046C35.1521 84.2275 27.9778 86.9396 20.8036 88.825C20.5635 89.7538 20.9669 90.5154 21.3318 91.3327C23.1662 95.5029 29.4953 104.809 32.5014 108.562C41.3947 119.651 56.1177 128.149 69.3425 117.58H70.4662C78.0918 123.468 79.4748 128.187 75.9405 137.019C73.1169 144.087 67.9787 143.567 61.2847 146.084C58.3363 147.199 58.8357 148.072 55.0613 148.267L55.0421 148.276ZM113.348 82.6393C128.561 85.1006 131.077 74.0203 125.68 62.8285C118.448 67.1566 107.595 72.0512 110.525 81.9613L114.75 77.1688L113.339 82.6393H113.348ZM92.2482 113.493C90.4138 116.577 100.671 121.49 103.427 121.982C123.087 125.493 134.967 103.815 142.324 89.8095C129.886 85.2213 116.806 81.9613 103.917 87.5154C94.2842 91.6671 87.475 100.843 90.7499 111.348C97.175 108.701 102.438 104.103 109.276 102.264C109.948 102.088 111.399 101.131 111.235 102.45C107.624 103.927 103.696 105.98 100.421 108.06C99.2783 108.784 92.5075 113.075 92.2578 113.493H92.2482ZM46.8978 159.904C39.1282 162.366 30.2636 157.963 22.8877 161.604C25.2983 165.264 27.6321 169.406 30.35 172.833C31.3105 174.04 37.1497 181.304 38.4078 180.412L46.8978 159.904ZM139.154 160.582C136.158 160.192 131.769 160.582 128.551 160.582C128.225 160.582 126.679 158.669 126.794 160.917C132.758 166.647 139.164 174.161 141.613 161.298C140.672 161.53 139.721 160.657 139.164 160.582H139.154Z" fill={color} />
  </svg>
);

interface ProgramNode {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  icon: string;
  color: string;
}

const programs: ProgramNode[] = [
  { id: 1, title: "Indian Culture", subtitle: "Gandharya Vidhya", description: "An ancient Indian tradition using music and sound as a powerful tool for harmony, emotional balance, and inner growth.", icon: "🎵", color: "#FFB81C" },
  { id: 2, title: "DIY", subtitle: "Do It Yourself", description: "A modern global practice that promotes creativity and self-reliance through hands-on making, building, and problem-solving.", icon: "🔧", color: "#F99D84" },
  { id: 3, title: "STEM", subtitle: "Science, Technology, Engineering & Mathematics", description: "Builds problem-solving, innovation, and logical thinking by integrating STEM in practical, real-world applications.", icon: "⚙️", color: "#2E7E46" },
  { id: 4, title: "SchoolAI", subtitle: "By CoSchool", description: "An AI-powered learning platform that personalizes learning paths and supports teachers with smart analytics.", icon: "🤖", color: "#041E42" },
  { id: 5, title: "Seedling", subtitle: "Grades PP–PP2", description: "As a Seedling adapts to the soil to GROW, our students make friends around them to grow while learning.", icon: "🌱", color: "#2E7E46" },
  { id: 6, title: "Sapling", subtitle: "Grades 1st–5th", description: "As a Sapling uses minerals to grow STRONGER, our students absorb different skill sets at this age.", icon: "🌿", color: "#A1CFEF" },
  { id: 7, title: "Oaks", subtitle: "Grades 6th–7th", description: "An oak with roots spread into the soil. Our students get guest lectures and adapt to student-led start-ups.", icon: "🌳", color: "#041E42" },
];

const CANVAS = 520;
const CENTER = CANVAS / 2;
const RADIUS = 200;

export default function RadialOrbitalTimeline() {
  // Only React state that triggers re-renders: popup data
  const [activeId, setActiveId] = useState<number | null>(null);
  const [activePos, setActivePos] = useState({ x: 0, y: 0 });
  const [centerActive, setCenterActive] = useState(false);

  // Refs for RAF-driven rotation (no re-renders)
  const nodeRefs = useRef<(HTMLDivElement | null)[]>([]);
  const rotRef = useRef(0);
  const rafRef = useRef<number>(0);
  const pausedRef = useRef(false);
  const activeIdRef = useRef<number | null>(null);

  // Keep activeIdRef in sync for opacity calculation inside RAF
  useEffect(() => { activeIdRef.current = activeId; }, [activeId]);

  // RAF loop — updates DOM directly, no React re-renders during spin
  useEffect(() => {
    const step = () => {
      if (!pausedRef.current) {
        rotRef.current = (rotRef.current + 0.4) % 360;
      }
      programs.forEach((prog, i) => {
        const el = nodeRefs.current[i];
        if (!el) return;
        const angle = ((i / programs.length) * 360 + rotRef.current) * Math.PI / 180;
        const x = RADIUS * Math.cos(angle);
        const y = RADIUS * Math.sin(angle);
        const isActive = activeIdRef.current === prog.id;
        const depth = (1 + Math.sin(angle)) / 2; // 0–1, front-to-back
        el.style.transform = `translate(${x}px, ${y}px)`;
        el.style.opacity = isActive ? "1" : String(0.65 + 0.35 * depth);
        el.style.zIndex = isActive ? "25" : String(Math.round(10 + depth * 10));
      });
      rafRef.current = requestAnimationFrame(step);
    };
    rafRef.current = requestAnimationFrame(step);
    return () => cancelAnimationFrame(rafRef.current);
  }, []); // runs once

  const handleNodeClick = useCallback((id: number, index: number) => {
    if (activeIdRef.current === id) {
      // Toggle off
      setActiveId(null);
      activeIdRef.current = null;
      pausedRef.current = false;
      return;
    }
    // Snapshot current position from rotRef
    const angle = ((index / programs.length) * 360 + rotRef.current) * Math.PI / 180;
    const x = RADIUS * Math.cos(angle);
    const y = RADIUS * Math.sin(angle);
    setActiveId(id);
    setActivePos({ x, y });
    activeIdRef.current = id;
    pausedRef.current = true;
    setCenterActive(false);
  }, []);

  const handleCenterClick = useCallback(() => {
    if (centerActive) {
      setCenterActive(false);
      pausedRef.current = false;
    } else {
      setCenterActive(true);
      setActiveId(null);
      activeIdRef.current = null;
      pausedRef.current = true;
    }
  }, [centerActive]);

  const handleClose = useCallback(() => {
    setActiveId(null);
    activeIdRef.current = null;
    setCenterActive(false);
    pausedRef.current = false;
  }, []);

  const activeProgram = programs.find(p => p.id === activeId);

  // Popup at 62% radius between center and clicked node
  const popupCX = CENTER + activePos.x * 0.62;
  const popupCY = CENTER + activePos.y * 0.62;

  return (
    <section
      className="relative w-full min-h-screen flex flex-col items-center justify-center overflow-hidden py-16"
      style={{ background: "linear-gradient(180deg, #A3D5FF 0%, #C8E8FF 45%, #A3D5FF 100%)" }}
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

      {/* School name — bold animated glow */}
      <motion.div
        className="text-center mb-6 z-10"
        initial={{ opacity: 0, y: 32 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <motion.h1
          className="font-black uppercase tracking-widest"
          style={{
            color: NAVY,
            fontFamily: "'Arial Black', 'Helvetica Neue', sans-serif",
            fontSize: "clamp(3rem, 8vw, 6rem)",
            lineHeight: 1,
            letterSpacing: "0.08em",
          }}
          animate={{
            textShadow: [
              "0 0 20px rgba(4,30,66,0.25), 0 0 40px rgba(4,30,66,0.1)",
              "0 0 35px rgba(4,30,66,0.65), 0 0 70px rgba(4,30,66,0.35), 0 0 100px rgba(4,30,66,0.15)",
              "0 0 20px rgba(4,30,66,0.25), 0 0 40px rgba(4,30,66,0.1)",
            ],
          }}
          transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut" }}
        >
          PRERAKA
        </motion.h1>

        <motion.p
          className="mt-1 font-semibold"
          style={{ color: NAVY, opacity: 0.7, fontSize: "1rem", letterSpacing: "0.06em" }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 0.7 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          viewport={{ once: true }}
        >
          The School of Change.
        </motion.p>

        <motion.p
          className="mt-3 text-sm font-medium"
          style={{ color: NAVY, opacity: 0.65 }}
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 0.65, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          viewport={{ once: true }}
        >
          🌱&nbsp; Equality &nbsp;•&nbsp; Motivate &nbsp;•&nbsp; Inspirational &nbsp;•&nbsp; Independent
        </motion.p>

        <div className="mt-5 mb-1 flex items-center justify-center gap-3">
          <div className="h-px w-16" style={{ background: `${NAVY}30` }} />
          <p className="text-xs font-semibold tracking-widest uppercase" style={{ color: GREEN }}>
            Our Programs
          </p>
          <div className="h-px w-16" style={{ background: `${NAVY}30` }} />
        </div>

        <h2 className="text-3xl md:text-4xl font-bold" style={{ fontFamily: "Georgia, serif", color: NAVY }}>
          What Makes Preraka Different
        </h2>
        <p className="mt-2 text-xs" style={{ color: NAVY, opacity: 0.5 }}>
          Click any node to explore · Click the tree to learn about us
        </p>
      </motion.div>

      {/* Orbital canvas */}
      <div
        className="relative flex items-center justify-center z-10"
        style={{ width: CANVAS, height: CANVAS }}
      >
        {/* Subtle ring glow */}
        <div className="absolute rounded-full pointer-events-none" style={{
          width: 440, height: 440,
          background: `radial-gradient(circle, transparent 198px, ${NAVY}12 199px, ${NAVY}06 225px, transparent 226px)`,
        }} />

        {/* Orbit ring */}
        <div className="absolute rounded-full border pointer-events-none" style={{
          width: 420, height: 420,
          borderColor: `${NAVY}22`,
        }} />

        {/* SVG connection line to active node */}
        {activeProgram && (
          <svg
            className="absolute inset-0 pointer-events-none"
            width={CANVAS} height={CANVAS}
            style={{ zIndex: 15 }}
          >
            <line
              x1={CENTER} y1={CENTER}
              x2={CENTER + activePos.x} y2={CENTER + activePos.y}
              stroke={activeProgram.color}
              strokeWidth="1.5"
              strokeDasharray="5 4"
              opacity="0.65"
            />
            <circle cx={CENTER} cy={CENTER} r="5" fill={activeProgram.color} opacity="0.5" />
          </svg>
        )}

        {/* Center button */}
        <button
          onClick={handleCenterClick}
          className="absolute z-20 flex items-center justify-center rounded-full"
          style={{
            width: 86, height: 86,
            background: centerActive ? GREEN : NAVY,
            boxShadow: centerActive
              ? `0 0 0 10px ${GREEN}35, 0 0 35px ${GREEN}50`
              : `0 0 0 6px ${NAVY}30, 0 0 20px ${NAVY}20`,
            transition: "all 0.4s ease",
          }}
        >
          <PrerakaLogo size={44} />
          {centerActive && (
            <div className="absolute w-28 h-28 rounded-full border-2 animate-ping"
              style={{ borderColor: `${GREEN}45` }} />
          )}
        </button>

        {/* Program nodes — positioned via RAF, no React re-renders */}
        {programs.map((prog, i) => (
          <div
            key={prog.id}
            ref={el => { nodeRefs.current[i] = el; }}
            className="absolute cursor-pointer"
            style={{ zIndex: 10 }}
            onClick={() => handleNodeClick(prog.id, i)}
          >
            {/* Glow halo */}
            <div className="absolute rounded-full -z-10" style={{
              width: 68, height: 68,
              left: -10, top: -10,
              background: `radial-gradient(circle, ${prog.color}55 0%, transparent 70%)`,
              transition: "transform 0.4s ease",
            }} />

            {/* Node circle — always visible, high contrast */}
            <div
              className="w-12 h-12 rounded-full flex items-center justify-center border-2"
              style={{
                background: `${prog.color}28`,       // colored tint always
                borderColor: prog.color,              // solid color always
                boxShadow: `0 2px 12px ${prog.color}50`,
                fontSize: "1.35rem",
                transition: "all 0.35s cubic-bezier(0.34,1.56,0.64,1)",
              }}
            >
              {prog.icon}
            </div>

            {/* Label */}
            <div
              className="absolute top-14 left-1/2 -translate-x-1/2 whitespace-nowrap text-xs font-bold text-center px-1 py-0.5 rounded"
              style={{
                color: NAVY,
                background: "rgba(245,240,232,0.85)",
                fontSize: "0.65rem",
                letterSpacing: "0.03em",
              }}
            >
              {prog.title}
            </div>
          </div>
        ))}

        {/* Popup — uses node's own color, adaptive text for readability */}
        {activeProgram && (() => {
          const popBg = activeProgram.color;
          const textCol = adaptiveText(popBg);
          const subCol = textCol === "white" ? "rgba(255,255,255,0.65)" : "rgba(4,30,66,0.55)";
          const borderCol = textCol === "white" ? "rgba(255,255,255,0.25)" : "rgba(4,30,66,0.2)";
          const iconBg = textCol === "white" ? "rgba(255,255,255,0.2)" : "rgba(4,30,66,0.1)";

          return (
            <motion.div
              key={activeId}
              initial={{ opacity: 0, scale: 0.65 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ type: "spring", stiffness: 420, damping: 26 }}
              className="absolute z-40 rounded-2xl shadow-2xl p-4"
              style={{
                left: `${popupCX}px`,
                top: `${popupCY}px`,
                transform: "translate(-50%, -50%)",
                width: 224,
                background: `linear-gradient(135deg, ${popBg} 0%, ${popBg}dd 100%)`,
                border: `1.5px solid ${borderCol}`,
              }}
            >
              <button
                onClick={e => { e.stopPropagation(); handleClose(); }}
                className="absolute -top-2.5 -right-2.5 w-6 h-6 rounded-full flex items-center justify-center"
                style={{ background: textCol === "white" ? "rgba(255,255,255,0.25)" : "rgba(4,30,66,0.2)", border: `1px solid ${borderCol}` }}
              >
                <X size={11} color={textCol} />
              </button>

              <div className="flex items-center gap-2.5 mb-2.5">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 text-xl"
                  style={{ background: iconBg, border: `1px solid ${borderCol}` }}>
                  {activeProgram.icon}
                </div>
                <div>
                  <span className="inline-block text-xs px-2 py-0.5 rounded-full mb-0.5 font-semibold"
                    style={{ background: iconBg, color: textCol, border: `1px solid ${borderCol}` }}>
                    Program
                  </span>
                  <p className="text-xs font-bold leading-tight" style={{ color: textCol }}>{activeProgram.title}</p>
                  <p className="text-xs mt-0.5" style={{ color: subCol }}>{activeProgram.subtitle}</p>
                </div>
              </div>
              <p className="text-xs leading-relaxed" style={{ color: subCol }}>
                {activeProgram.description.length > 115
                  ? activeProgram.description.slice(0, 112) + "…"
                  : activeProgram.description}
              </p>
              <div className="mt-2.5 pt-2" style={{ borderTop: `1px solid ${borderCol}` }}>
                <p className="text-xs font-semibold" style={{ color: textCol }}>Preraka School of Change</p>
              </div>
            </motion.div>
          );
        })()}

        {/* Center popup */}
        {centerActive && (
          <motion.div
            key="center"
            initial={{ opacity: 0, scale: 0.65 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: "spring", stiffness: 420, damping: 26 }}
            className="absolute z-40 rounded-2xl shadow-2xl p-4"
            style={{
              left: `${CENTER + 52}px`,
              top: `${CENTER - 90}px`,
              width: 224,
              background: "linear-gradient(145deg, #062B4F 0%, #041E42 100%)",
              border: `1.5px solid ${SKY}55`,
            }}
          >
            <button
              onClick={handleClose}
              className="absolute -top-2.5 -right-2.5 w-6 h-6 rounded-full flex items-center justify-center"
              style={{ background: GREEN }}
            >
              <X size={11} color="white" />
            </button>
            <div className="flex items-center gap-2.5 mb-2.5">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                style={{ background: GREEN }}>
                <PrerakaLogo size={28} />
              </div>
              <div>
                <p className="text-sm font-bold text-white" style={{ fontFamily: "Georgia, serif" }}>Preraka</p>
                <p className="text-xs" style={{ color: "rgba(161,207,239,0.65)" }}>The School of Change</p>
              </div>
            </div>
            <p className="text-xs leading-relaxed" style={{ color: "rgba(255,255,255,0.73)" }}>
              Preraka inspires change. We nurture thinkers, innovators, and problem-solvers — preparing every child with confidence and curiosity.
            </p>
            <div className="mt-2.5 flex flex-wrap gap-1.5">
              {["Equality", "Motivate", "Inspire", "Independent"].map(t => (
                <span key={t} className="text-xs px-2 py-0.5 rounded-full"
                  style={{ background: `${SKY}18`, color: SKY, border: `1px solid ${SKY}28` }}>
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
