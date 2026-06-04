"use client";
import { useRef, useState, useEffect, useCallback } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useMotionTemplate,
  AnimatePresence,
} from "framer-motion";

const NAVY = "#041E42";
const GREEN = "#2E7E46";

const BRAND_COLORS = ["#FFB81C", "#2E7E46", "#A1CFEF", "#F99D84", "#8ECDA8"];

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
  { emoji: "🔭", x: "14%", y: "92%", dur: 3.5, delay: 1.6  },
  { emoji: "🎭", x: "82%", y: "90%", dur: 4.5, delay: 0.8  },
];

// ── SVG card patterns ──
function CircuitLines({ color }: { color: string }) {
  return (
    <svg className="absolute inset-0 w-full h-full" viewBox="0 0 400 140" preserveAspectRatio="xMidYMid slice" aria-hidden>
      {[30,80,130,180,230,280,330,380].map((x, i) => (
        <g key={i} opacity="0.25">
          <circle cx={x} cy={40 + (i%3)*22} r="5" stroke={color} strokeWidth="1.5" fill="none" />
          <line x1={x} y1={45+(i%3)*22} x2={x} y2={100} stroke={color} strokeWidth="1" />
          <line x1={x} y1={100} x2={x+24} y2={100} stroke={color} strokeWidth="1" />
        </g>
      ))}
    </svg>
  );
}

function HexGrid({ color }: { color: string }) {
  const pts = (cx: number, cy: number) =>
    Array.from({length:6},(_,k)=>{const a=(k*60-30)*Math.PI/180;return `${(cx+20*Math.cos(a)).toFixed(1)},${(cy+20*Math.sin(a)).toFixed(1)}`;}).join(" ");
  const hexes: [number,number][] = [[50,50],[110,50],[170,50],[230,50],[290,50],[350,50],[80,90],[140,90],[200,90],[260,90],[320,90]];
  return (
    <svg className="absolute inset-0 w-full h-full" viewBox="0 0 400 140" preserveAspectRatio="xMidYMid slice" aria-hidden>
      {hexes.map(([cx,cy],i)=><polygon key={i} points={pts(cx,cy)} stroke={color} strokeWidth="1.2" fill="none" opacity="0.22"/>)}
    </svg>
  );
}

function WaveLines({ color }: { color: string }) {
  return (
    <svg className="absolute inset-0 w-full h-full" viewBox="0 0 400 140" preserveAspectRatio="xMidYMid slice" aria-hidden>
      {[25,50,75,100,125].map((y,i)=>(
        <path key={i} d={`M0 ${y} Q100 ${y-16} 200 ${y} Q300 ${y+16} 400 ${y}`} stroke={color} strokeWidth="1.4" fill="none" opacity={0.18+i*0.04}/>
      ))}
      {[70,130,190,250,310].map(x=><text key={x} x={x} y={60} fontSize="20" fill={color} opacity="0.3">♪</text>)}
    </svg>
  );
}

function ToolGrid({ color }: { color: string }) {
  return (
    <svg className="absolute inset-0 w-full h-full" viewBox="0 0 400 140" preserveAspectRatio="xMidYMid slice" aria-hidden>
      {[40,100,160,220,280,340].map((x,i)=>(
        <g key={i} transform={`translate(${x},${35+(i%2)*22})`} opacity="0.22">
          <rect x="-5" y="-18" width="10" height="36" rx="2" stroke={color} strokeWidth="1.4" fill="none"/>
          <rect x="-9" y="-22" width="18" height="7" rx="1.5" stroke={color} strokeWidth="1.4" fill="none"/>
        </g>
      ))}
    </svg>
  );
}

interface CardData {
  id: number; label: string; description: string;
  icon: string; color: string; tag: string;
  pattern: React.ReactNode;
}

const cards: CardData[] = [
  { id:1, label:"The Power Of AI",  icon:"🤖", color:NAVY,     tag:"AI Learning",  description:"Personalized, adaptive learning through the CoSchool AI platform — giving every student a custom path to mastery.", pattern:<CircuitLines color="white"/> },
  { id:2, label:"The Logic Of STEM", icon:"⚙️", color:"#2E7E46", tag:"STEM",         description:"Practical, real-world application of Science, Technology, Engineering, and Mathematics — building tomorrow's problem-solvers.", pattern:<HexGrid color="white"/> },
  { id:3, label:"The Soul Of Gandharya Vidhya", icon:"🎵", color:"#B8860B", tag:"Ancient Wisdom", description:"Integrating ancient Indian traditions of music and sound — promoting emotional well-being and holistic development.", pattern:<WaveLines color="white"/> },
  { id:4, label:"DIY: Create, Don't Just Consume", icon:"🔧", color:"#C0704A", tag:"Hands-On", description:"We turn curiosity into confidence. Students build, solve, and innovate with their own hands — not just follow instructions.", pattern:<ToolGrid color="white"/> },
];

// ── Floating icon with magnetic repulsion ──
interface MagIconProps {
  emoji: string; x: string; y: string; dur: number; delay: number;
  mouseX: ReturnType<typeof useMotionValue<number>>;
  mouseY: ReturnType<typeof useMotionValue<number>>;
  sW: number; sH: number;
}

function MagneticIcon({ emoji, x, y, dur, delay, mouseX, mouseY, sW, sH }: MagIconProps) {
  const baseX = (parseFloat(x) / 100) * sW;
  const baseY = (parseFloat(y) / 100) * sH;
  const dispX = useMotionValue(0);
  const dispY = useMotionValue(0);
  const springX = useSpring(dispX, { stiffness: 180, damping: 22 });
  const springY = useSpring(dispY, { stiffness: 180, damping: 22 });

  useEffect(() => {
    const REPEL_R = 170;
    const FORCE   = 90;
    const update = () => {
      const mx = mouseX.get();
      const my = mouseY.get();
      const ddx = mx - baseX;
      const ddy = my - baseY;
      const dist = Math.sqrt(ddx * ddx + ddy * ddy);
      if (dist < REPEL_R && dist > 0) {
        const mag = (1 - dist / REPEL_R) * FORCE;
        dispX.set(-(ddx / dist) * mag);
        dispY.set(-(ddy / dist) * mag);
      } else {
        dispX.set(0);
        dispY.set(0);
      }
    };
    const u1 = mouseX.on("change", update);
    const u2 = mouseY.on("change", update);
    return () => { u1(); u2(); };
  }, [mouseX, mouseY, baseX, baseY, dispX, dispY]);

  return (
    <motion.div
      className="absolute pointer-events-none"
      style={{ left: x, top: y, x: springX, y: springY }}
    >
      <motion.span
        className="block select-none"
        style={{ fontSize: "1.9rem" }}
        animate={{ y: [0, -18, 0], rotate: [0, 6, -4, 0] }}
        transition={{ duration: dur, repeat: Infinity, ease: "easeInOut", delay }}
      >
        {emoji}
      </motion.span>
    </motion.div>
  );
}

// ── 3D card with inner spotlight + glow bloom ──
function GlowCard({ card, index }: { card: CardData; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [localPos, setLocalPos] = useState({ x: 50, y: 50 });
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [hovered, setHovered] = useState(false);

  const onMove = (e: React.MouseEvent) => {
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;
    const px = ((e.clientX - rect.left) / rect.width) * 100;
    const py = ((e.clientY - rect.top) / rect.height) * 100;
    setLocalPos({ x: px, y: py });
    setTilt({ x: (py / 100 - 0.5) * -34, y: (px / 100 - 0.5) * 34 });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 56 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.65, delay: index * 0.13, ease: [0.22, 1, 0.36, 1] }}
      viewport={{ once: true, margin: "-60px" }}
      className="relative mb-6 last:mb-0"
    >
      {/* Glow bloom behind card */}
      <div style={{
        position: "absolute", inset: -8, borderRadius: "1.5rem", zIndex: -1,
        background: `radial-gradient(circle at ${localPos.x}% ${localPos.y}%, ${card.color}70 0%, transparent 65%)`,
        filter: "blur(16px)",
        opacity: hovered ? 1 : 0,
        transition: "opacity 0.35s ease",
      }} />

      <div
        ref={cardRef}
        onMouseMove={onMove}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => { setTilt({ x:0, y:0 }); setHovered(false); }}
        className="relative rounded-2xl overflow-hidden border"
        style={{
          transform: `perspective(850px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) translateZ(${hovered ? 32 : 0}px)`,
          transition: hovered ? "transform 0.04s linear" : "transform 0.55s cubic-bezier(0.22,1,0.36,1)",
          transformStyle: "preserve-3d",
          borderColor: `${card.color}28`,
          boxShadow: hovered
            ? `0 35px 80px ${card.color}30, 0 0 0 1.5px ${card.color}40`
            : "0 4px 28px rgba(0,0,0,0.07)",
        }}
      >
        {/* Inner spotlight that tracks cursor within card */}
        <div style={{
          position: "absolute", inset: 0, zIndex: 2, pointerEvents: "none",
          background: `radial-gradient(circle at ${localPos.x}% ${localPos.y}%, rgba(255,255,255,0.30) 0%, transparent 52%)`,
          opacity: hovered ? 1 : 0,
          transition: hovered ? "none" : "opacity 0.35s ease",
        }} />

        {/* Header band with SVG pattern */}
        <div
          className="relative overflow-hidden flex items-end justify-between px-6 pb-5"
          style={{ height: 130, background: `linear-gradient(135deg, ${card.color} 0%, ${card.color}cc 100%)`, borderRadius: "1rem 1rem 0 0" }}
        >
          {card.pattern}
          <span className="absolute right-3 top-3 text-7xl opacity-15 select-none">{card.icon}</span>
          {[1,2,3].map(n => (
            <div key={n} className="absolute rounded-full" style={{
              width: 36+n*40, height: 36+n*40,
              right: -18+n*2, bottom: -18+n*2,
              border: "1px solid rgba(255,255,255,0.15)",
            }}/>
          ))}
          <div className="w-12 h-12 rounded-2xl flex items-center justify-center text-2xl z-10 flex-shrink-0"
            style={{ background:"rgba(255,255,255,0.22)", border:"1px solid rgba(255,255,255,0.4)", backdropFilter:"blur(8px)" }}>
            {card.icon}
          </div>
          <span className="z-10 text-xs font-bold tracking-widest uppercase pb-1"
            style={{ color:"rgba(255,255,255,0.72)", letterSpacing:"0.15em" }}>
            {card.tag}
          </span>
        </div>

        {/* Content */}
        <div className="px-6 py-5 bg-white relative z-10">
          <h3 className="font-bold text-lg leading-tight mb-2" style={{ color:NAVY }}>{card.label}</h3>
          <p className="text-sm text-gray-500 leading-relaxed">{card.description}</p>
          <div className="mt-4 flex items-center gap-2">
            <div className="h-px flex-1" style={{ background:`${card.color}30` }}/>
            <span className="text-xs font-semibold" style={{ color:card.color }}>Preraka</span>
            <div className="h-px flex-1" style={{ background:`${card.color}30` }}/>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// ── Ripple on click ──
interface Ripple { id: number; x: number; y: number; color: string; }

// ── Main section ──
export default function PrerakaCurriculum() {
  const sectionRef  = useRef<HTMLDivElement>(null);
  const canvasRef   = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Array<{ x:number; y:number; vx:number; vy:number; life:number; color:string; }>>([]);
  const lastParticleTime = useRef(0);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Dual cursor ring springs
  const dotX  = useSpring(mouseX, { stiffness: 700, damping: 32 });
  const dotY  = useSpring(mouseY, { stiffness: 700, damping: 32 });
  const ringX = useSpring(mouseX, { stiffness: 90,  damping: 20 });
  const ringY = useSpring(mouseY, { stiffness: 90,  damping: 20 });

  // Third larger ring — even slower
  const outerRingX = useSpring(mouseX, { stiffness: 40, damping: 18 });
  const outerRingY = useSpring(mouseY, { stiffness: 40, damping: 18 });

  const [isActive, setIsActive] = useState(false);
  const [sW, setSW]   = useState(1200);
  const [sH, setSH]   = useState(1200);
  const [ripples, setRipples] = useState<Ripple[]>([]);

  // Section background spotlight via MotionTemplate
  const bgSpotlight = useMotionTemplate`radial-gradient(550px circle at ${mouseX}px ${mouseY}px, rgba(255,255,255,0.38) 0%, transparent 65%)`;

  // Measure section dimensions
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const ro = new ResizeObserver(() => {
      setSW(el.offsetWidth);
      setSH(el.offsetHeight);
    });
    ro.observe(el);
    setSW(el.offsetWidth);
    setSH(el.offsetHeight);
    return () => ro.disconnect();
  }, []);

  // Canvas particle trail animation loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    let rafId: number;

    const loop = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particlesRef.current = particlesRef.current.filter(p => p.life > 0.015);
      for (const p of particlesRef.current) {
        p.x  += p.vx;
        p.y  += p.vy;
        p.vy += 0.07; // gravity
        p.vx *= 0.98; // drag
        p.life -= 0.02;
        const alpha = Math.max(0, Math.floor(p.life * 255)).toString(16).padStart(2, "0");
        ctx.beginPath();
        ctx.arc(p.x, p.y, Math.max(0.5, 5 * p.life), 0, Math.PI * 2);
        ctx.fillStyle = p.color + alpha;
        ctx.fill();
      }
      rafId = requestAnimationFrame(loop);
    };
    rafId = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(rafId);
  }, []);

  const onMouseMove = useCallback((e: React.MouseEvent) => {
    const rect = sectionRef.current?.getBoundingClientRect();
    if (!rect) return;
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    mouseX.set(x);
    mouseY.set(y);

    // Throttle particles to ~60fps
    const now = performance.now();
    if (now - lastParticleTime.current > 16 && particlesRef.current.length < 50) {
      lastParticleTime.current = now;
      for (let i = 0; i < 3; i++) {
        particlesRef.current.push({
          x, y,
          vx: (Math.random() - 0.5) * 5,
          vy: (Math.random() - 0.5) * 5 - 1.5,
          life: 0.85 + Math.random() * 0.15,
          color: BRAND_COLORS[Math.floor(Math.random() * BRAND_COLORS.length)],
        });
      }
    }
  }, [mouseX, mouseY]);

  const onClick = useCallback((e: React.MouseEvent) => {
    const rect = sectionRef.current?.getBoundingClientRect();
    if (!rect) return;
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const color = BRAND_COLORS[Math.floor(Math.random() * BRAND_COLORS.length)];
    setRipples(prev => [...prev, { id: Date.now() + Math.random(), x, y, color }]);

    // Burst of particles on click
    for (let i = 0; i < 20; i++) {
      const angle = (i / 20) * Math.PI * 2;
      const speed = 3 + Math.random() * 6;
      particlesRef.current.push({
        x, y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed - 2,
        life: 1,
        color: BRAND_COLORS[Math.floor(Math.random() * BRAND_COLORS.length)],
      });
    }
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full overflow-hidden py-24 cursor-none"
      style={{ background: "linear-gradient(180deg, #A3D5FF 0%, #C8E8FF 48%, #A3D5FF 100%)" }}
      onMouseMove={onMouseMove}
      onMouseEnter={() => setIsActive(true)}
      onMouseLeave={() => { setIsActive(false); }}
      onClick={onClick}
    >
      {/* Canvas particle trail */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 pointer-events-none"
        style={{ width: "100%", height: "100%", zIndex: 25 }}
        width={sW}
        height={sH}
      />

      {/* Background spotlight gradient */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{ background: bgSpotlight, zIndex: 1 }}
      />

      {/* ── Three cursor rings with different spring speeds ── */}
      {/* Outermost — slowest trailing ring */}
      <motion.div
        className="absolute pointer-events-none rounded-full"
        style={{
          width: 80, height: 80,
          x: outerRingX, y: outerRingY,
          translateX: "-50%", translateY: "-50%",
          border: `1.5px solid rgba(46,126,70,0.35)`,
          zIndex: 30,
          opacity: isActive ? 1 : 0,
          transition: "opacity 0.3s ease",
        }}
      />
      {/* Middle ring */}
      <motion.div
        className="absolute pointer-events-none rounded-full"
        style={{
          width: 48, height: 48,
          x: ringX, y: ringY,
          translateX: "-50%", translateY: "-50%",
          border: `2px solid rgba(46,126,70,0.65)`,
          boxShadow: `0 0 18px rgba(46,126,70,0.35)`,
          zIndex: 30,
          opacity: isActive ? 1 : 0,
          transition: "opacity 0.3s ease",
        }}
      />
      {/* Inner dot */}
      <motion.div
        className="absolute pointer-events-none rounded-full"
        style={{
          width: 10, height: 10,
          x: dotX, y: dotY,
          translateX: "-50%", translateY: "-50%",
          background: GREEN,
          boxShadow: `0 0 14px ${GREEN}, 0 0 6px ${GREEN}`,
          zIndex: 30,
          opacity: isActive ? 1 : 0,
          transition: "opacity 0.3s ease",
        }}
      />

      {/* Click ripples */}
      <AnimatePresence>
        {ripples.map(r => (
          <motion.div
            key={r.id}
            className="absolute pointer-events-none rounded-full"
            style={{
              left: r.x, top: r.y,
              border: `2px solid ${r.color}`,
              translateX: "-50%", translateY: "-50%",
              zIndex: 28,
            }}
            initial={{ width: 0, height: 0, opacity: 1 }}
            animate={{ width: 220, height: 220, opacity: 0 }}
            exit={{}}
            transition={{ duration: 0.65, ease: "easeOut" }}
            onAnimationComplete={() => setRipples(prev => prev.filter(p => p.id !== r.id))}
          />
        ))}
      </AnimatePresence>

      {/* Floating magnetic icons */}
      {FLOAT_ICONS.map((fi, i) => (
        <MagneticIcon key={i} {...fi} mouseX={mouseX} mouseY={mouseY} sW={sW} sH={sH} />
      ))}

      {/* ── PRERAKA section heading ── */}
      <motion.div
        className="text-center mb-12 relative"
        style={{ zIndex: 10 }}
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <motion.h2
          className="font-black uppercase"
          style={{
            color: NAVY,
            fontFamily: "'Arial Black','Helvetica Neue',sans-serif",
            fontSize: "clamp(2.5rem, 6vw, 5rem)",
            letterSpacing: "0.1em",
          }}
          animate={{
            textShadow: [
              "0 0 20px rgba(4,30,66,0.2)",
              "0 0 40px rgba(4,30,66,0.65), 0 0 80px rgba(4,30,66,0.3)",
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

      {/* ── Two-column layout ── */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative" style={{ zIndex: 10 }}>
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
              <p className="text-gray-600 leading-relaxed">
                Our future-ready school is deeply rooted in core values. Preraka&apos;s curriculum stands out as a unique blend of excellence:
              </p>
            </motion.div>

            {/* Staggered bullet list */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.25 }}
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
                  style={{ background: `${c.color}0A`, border: `1px solid ${c.color}20` }}
                >
                  <div className="w-9 h-9 rounded-xl flex items-center justify-center text-base flex-shrink-0"
                    style={{ background: `${c.color}20`, border: `1px solid ${c.color}35` }}>
                    {c.icon}
                  </div>
                  <p className="text-sm font-semibold" style={{ color: NAVY }}>{c.label}</p>
                </motion.div>
              ))}
            </motion.div>

            <motion.blockquote
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              viewport={{ once: true }}
              className="mt-10 pl-4 border-l-4"
              style={{ borderColor: GREEN }}
            >
              <p className="text-sm italic text-gray-500 leading-relaxed">
                &ldquo;Equality · Motivate · Inspirational · Independent&rdquo;
              </p>
              <p className="text-xs mt-2 font-semibold" style={{ color: GREEN }}>— Preraka School of Change</p>
            </motion.blockquote>
          </div>

          {/* Right — 3D glow cards */}
          <div className="pt-4">
            {cards.map((card, i) => (
              <GlowCard key={card.id} card={card} index={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
