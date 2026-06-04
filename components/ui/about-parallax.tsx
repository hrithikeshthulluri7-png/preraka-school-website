"use client";
import { useRef, useEffect, useCallback, useState } from "react";
import { motion, useScroll, useTransform, useMotionValue, useSpring } from "framer-motion";

const NAVY = "#041E42";
const GREEN = "#2E7E46";
const BRAND_COLORS = ["#FFB81C", "#2E7E46", "#A1CFEF", "#F99D84", "#8ECDA8"];

// Rich floating icon set — rockets, space, learning, nature
const ALL_FLOAT_ICONS = [
  // Corners & edges — rockets and space
  { emoji: "🚀", x: "2%",  y: "3%",  dur: 4.5, delay: 0,    size: "2.2rem" },
  { emoji: "🌟", x: "95%", y: "3%",  dur: 3.8, delay: 0.5,  size: "2rem"   },
  { emoji: "🪐", x: "1%",  y: "18%", dur: 5.2, delay: 1.1,  size: "2rem"   },
  { emoji: "⭐", x: "96%", y: "15%", dur: 4.1, delay: 0.3,  size: "1.6rem" },
  { emoji: "🛸", x: "48%", y: "1%",  dur: 4.8, delay: 1.4,  size: "2rem"   },
  { emoji: "✨", x: "22%", y: "1%",  dur: 3.5, delay: 0.7,  size: "1.6rem" },
  { emoji: "💫", x: "74%", y: "1%",  dur: 4.2, delay: 1.8,  size: "1.7rem" },

  // Left column
  { emoji: "🌱", x: "1%",  y: "32%", dur: 4.0, delay: 0.9,  size: "1.9rem" },
  { emoji: "🎨", x: "2%",  y: "47%", dur: 3.9, delay: 0.4,  size: "1.8rem" },
  { emoji: "🏺", x: "1%",  y: "62%", dur: 4.6, delay: 1.3,  size: "1.8rem" },
  { emoji: "✏️", x: "3%",  y: "76%", dur: 5.0, delay: 0.6,  size: "1.7rem" },
  { emoji: "🌿", x: "2%",  y: "89%", dur: 3.7, delay: 1.6,  size: "1.9rem" },

  // Right column
  { emoji: "🤖", x: "94%", y: "28%", dur: 4.3, delay: 0.2,  size: "2rem"   },
  { emoji: "💡", x: "95%", y: "42%", dur: 4.1, delay: 1.0,  size: "1.8rem" },
  { emoji: "🔬", x: "94%", y: "56%", dur: 3.6, delay: 0.8,  size: "1.8rem" },
  { emoji: "🧬", x: "95%", y: "70%", dur: 4.7, delay: 1.5,  size: "1.7rem" },
  { emoji: "🎯", x: "93%", y: "84%", dur: 4.0, delay: 0.4,  size: "1.9rem" },

  // Bottom band
  { emoji: "🔭", x: "15%", y: "97%", dur: 4.4, delay: 1.2,  size: "1.8rem" },
  { emoji: "🎵", x: "35%", y: "98%", dur: 3.9, delay: 0.1,  size: "1.7rem" },
  { emoji: "⚗️", x: "55%", y: "97%", dur: 4.6, delay: 1.7,  size: "1.8rem" },
  { emoji: "🧩", x: "75%", y: "98%", dur: 4.2, delay: 0.6,  size: "1.7rem" },
  { emoji: "🪄", x: "88%", y: "96%", dur: 3.8, delay: 1.0,  size: "1.9rem" },

  // Mid-field sprinkles
  { emoji: "📐", x: "8%",  y: "43%", dur: 4.3, delay: 0.5,  size: "1.6rem" },
  { emoji: "🎭", x: "90%", y: "48%", dur: 3.7, delay: 1.1,  size: "1.6rem" },
  { emoji: "🌙", x: "5%",  y: "10%", dur: 5.1, delay: 0.8,  size: "1.8rem" },
  { emoji: "🛰️", x: "92%", y: "8%",  dur: 4.5, delay: 0.2,  size: "1.8rem" },
];

interface MagIconProps {
  emoji: string; x: string; y: string; dur: number; delay: number; size: string;
  mouseX: ReturnType<typeof useMotionValue<number>>;
  mouseY: ReturnType<typeof useMotionValue<number>>;
  sW: number; sH: number;
}
function FloatingIcon({ emoji, x, y, dur, delay, size, mouseX, mouseY, sW, sH }: MagIconProps) {
  const baseX = (parseFloat(x) / 100) * sW;
  const baseY = (parseFloat(y) / 100) * sH;
  const dispX = useMotionValue(0);
  const dispY = useMotionValue(0);
  const springX = useSpring(dispX, { stiffness: 160, damping: 20 });
  const springY = useSpring(dispY, { stiffness: 160, damping: 20 });

  useEffect(() => {
    const R = 180, F = 90;
    const update = () => {
      const mx = mouseX.get(), my = mouseY.get();
      const dx = mx - baseX, dy = my - baseY;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < R && dist > 0) {
        dispX.set(-(dx / dist) * (1 - dist / R) * F);
        dispY.set(-(dy / dist) * (1 - dist / R) * F);
      } else { dispX.set(0); dispY.set(0); }
    };
    const u1 = mouseX.on("change", update);
    const u2 = mouseY.on("change", update);
    return () => { u1(); u2(); };
  }, [mouseX, mouseY, baseX, baseY, dispX, dispY]);

  return (
    <motion.div className="absolute pointer-events-none select-none" style={{ left: x, top: y, x: springX, y: springY }}>
      <motion.span
        className="block"
        style={{ fontSize: size }}
        animate={{ y: [0, -20, 0], rotate: [0, 8, -5, 0], scale: [1, 1.08, 1] }}
        transition={{ duration: dur, repeat: Infinity, ease: "easeInOut", delay }}
      >
        {emoji}
      </motion.span>
    </motion.div>
  );
}

// Orbiting mini-stars around section images
function OrbitRing({ radius, speed, color, count = 4 }: { radius: number; speed: number; color: string; count?: number }) {
  return (
    <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
      {Array.from({ length: count }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{ width: 8, height: 8, background: color, boxShadow: `0 0 8px ${color}` }}
          animate={{
            x: [Math.cos((i / count) * Math.PI * 2) * radius, Math.cos(((i / count) + 1) * Math.PI * 2) * radius],
            y: [Math.sin((i / count) * Math.PI * 2) * radius, Math.sin(((i / count) + 1) * Math.PI * 2) * radius],
          }}
          transition={{ duration: speed, repeat: Infinity, ease: "linear", delay: (i / count) * speed }}
        />
      ))}
    </div>
  );
}

// Shooting star that crosses periodically
function ShootingStar({ top, delay }: { top: string; delay: number }) {
  return (
    <motion.div
      className="absolute pointer-events-none"
      style={{ top, left: "-60px", width: 60, height: 2, background: "linear-gradient(90deg, transparent, #A1CFEF, white)", borderRadius: 2 }}
      animate={{ x: ["0vw", "110vw"], opacity: [0, 1, 0] }}
      transition={{ duration: 1.8, repeat: Infinity, repeatDelay: delay, ease: "easeIn" }}
    />
  );
}

interface Section {
  id: number; tag: string; title: string; subtitle: string;
  body: string[]; image: string; accent: string; reverse: boolean;
}

const sections: Section[] = [
  {
    id: 1,
    tag: "OUR VISION",
    title: "Strengthening Roots,",
    subtitle: "Branching Into The Future",
    body: [
      "At Preraka, we believe that true education sparks curiosity and ignites lifelong learning. As a leading school in Turkayamjal, Hyderabad, we are committed to providing holistic development from Nursery to Grade VII.",
      "Our foundation is rooted in Equality, Motivation, and Independence — ensuring every child receives personalised attention and a nurturing environment where they feel truly valued.",
      "Our mission is to inspire a lifelong love of learning. Rather than rote memorisation, we empower students to engage both heart and mind, preparing them for success in academics and in life.",
    ],
    image: "/assets/about/gen-vision.jpg",
    accent: "#2E7E46",
    reverse: false,
  },
  {
    id: 2,
    tag: "OUR PHILOSOPHY",
    title: "A Three-Pillar Approach",
    subtitle: "To Holistic Excellence",
    body: [
      "Preraka stands apart through our unique blend of time-tested values and modern educational technology.",
      "We weave together AI-powered personalised learning through CoSchool, hands-on STEM exploration that builds real-world problem-solvers, and the ancient wisdom of Gandharya Vidhya — Indian music and sound traditions that nurture emotional balance.",
      "This three-pillar approach ensures every student grows intellectually, creatively, and emotionally — a true education for the whole child.",
    ],
    image: "/assets/about/gen-pillar.jpg",
    accent: "#FFB81C",
    reverse: true,
  },
  {
    id: 3,
    tag: "JOURNEY OF GROWTH",
    title: "From Seedling to Oak",
    subtitle: "Three Stages of Becoming",
    body: [
      "🌱 The Seedling (Nursery – PP2): Just as a seedling adapts to the soil around it to grow, our youngest students make friends, explore freely, and lay the roots of lifelong curiosity.",
      "🌿 The Sapling (Grades 1 – 5): A sapling absorbs minerals to grow stronger. Our students at this stage absorb diverse skill sets — STEM, arts, technology — building a robust, multi-dimensional foundation.",
      "🌳 The Oak (Grades 6 – 7): An oak spreads deep roots. Our senior students receive guest lectures, lead school initiatives, and begin their journey as student entrepreneurs — ready to shape the future.",
    ],
    image: "/assets/about/gen-growth.jpg",
    accent: "#2E7E46",
    reverse: false,
  },
  {
    id: 4,
    tag: "WHY PRERAKA",
    title: "What Sets Us Apart",
    subtitle: "Excellence in Every Aspect",
    body: [
      "🏫 Expert Mentors: Our experienced teachers guide, inspire, and support students at every step — fostering a positive learning environment where curiosity is celebrated and questions are never wrong.",
      "🖥️ World-Class Facilities: Modern AC classrooms, state-of-the-art digital boards, dedicated STEM and AI labs, and reliable transportation ensure comfort and safety for every child.",
      "🤝 Safe & Inclusive: We offer a secure community where every child is valued, respected, and encouraged to achieve their full potential — regardless of background or learning style.",
    ],
    image: "/assets/about/gen-apart.jpg",
    accent: "#041E42",
    reverse: true,
  },
];

function ParallaxSection({ section }: { section: Section }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "center start"] });

  const opacity   = useTransform(scrollYProgress, [0, 0.55], [0, 1]);
  const clipPath  = useTransform(scrollYProgress, [0, 0.55], [
    section.reverse ? "inset(0 0 0 100%)" : "inset(0 100% 0 0)",
    "inset(0 0% 0 0%)",
  ]);
  const textY       = useTransform(scrollYProgress, [0, 1], [-40, 0]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.45], [0, 1]);

  return (
    <div
      ref={ref}
      className={`min-h-screen flex flex-col md:flex-row items-center justify-center gap-10 md:gap-20 px-6 md:px-16 py-20 ${section.reverse ? "md:flex-row-reverse" : ""}`}
    >
      {/* Text card */}
      <motion.div style={{ y: textY, opacity: textOpacity }} className="flex-1 max-w-xl">
        <div className="rounded-2xl p-8"
          style={{
            background: "rgba(255,255,255,0.78)",
            backdropFilter: "blur(18px)",
            border: "1px solid rgba(4,30,66,0.1)",
            boxShadow: "0 8px 48px rgba(4,30,66,0.12)",
          }}>
          <p className="text-xs font-bold tracking-[0.25em] uppercase mb-3 flex items-center gap-2"
            style={{ color: section.accent }}>
            <span className="w-6 h-0.5 inline-block rounded-full" style={{ background: section.accent }} />
            {section.tag}
          </p>
          <h2 className="font-bold leading-tight mb-2"
            style={{ color: NAVY, fontFamily: "Georgia, serif", fontSize: "clamp(1.6rem, 3.5vw, 2.6rem)" }}>
            {section.title}
            <br />
            <span style={{ color: section.accent }}>{section.subtitle}</span>
          </h2>
          <div className="h-0.5 w-14 rounded-full mb-5 mt-3" style={{ background: section.accent }} />
          <div className="space-y-3">
            {section.body.map((para, i) => (
              <p key={i} className="leading-relaxed font-medium" style={{ color: "#1a2e4a", fontSize: "0.92rem" }}>
                {para}
              </p>
            ))}
          </div>
          <div className="mt-6 inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold"
            style={{ background: `${section.accent}22`, border: `1px solid ${section.accent}50`, color: section.accent }}>
            <span>✦</span> Preraka — The School of Change
          </div>
        </div>
      </motion.div>

      {/* Image with orbiting decoration */}
      <motion.div style={{ opacity, clipPath }} className="flex-1 max-w-sm md:max-w-md relative">
        <div className="relative overflow-hidden rounded-2xl shadow-2xl"
          style={{ border: `2px solid ${section.accent}30` }}>
          <div className="absolute top-0 left-0 w-12 h-12 z-10"
            style={{ background: `linear-gradient(135deg, ${section.accent}60, transparent)`, borderRadius: "1rem 0 1rem 0" }} />
          <div className="absolute bottom-0 right-0 w-12 h-12 z-10"
            style={{ background: `linear-gradient(315deg, ${section.accent}60, transparent)`, borderRadius: "0 1rem 0 1rem" }} />
          <img
            src={section.image}
            alt={section.tag}
            className="w-full object-cover"
            style={{ aspectRatio: "4/5", display: "block" }}
          />
          <div className="absolute inset-x-0 bottom-0 h-20 pointer-events-none"
            style={{ background: `linear-gradient(to top, ${section.accent}40 0%, transparent 100%)` }} />
        </div>
        {/* Orbiting dots */}
        <div className="absolute inset-0 pointer-events-none" style={{ overflow: "visible" }}>
          <OrbitRing radius={160} speed={8} color={section.accent} count={3} />
          <OrbitRing radius={185} speed={14} color="#A1CFEF" count={2} />
        </div>
        {/* Glow blob */}
        <div className="absolute -bottom-4 -right-4 w-20 h-20 rounded-full -z-10 opacity-40"
          style={{ background: section.accent, filter: "blur(24px)" }} />
      </motion.div>
    </div>
  );
}

interface Ripple { id: number; x: number; y: number; color: string; }

export default function AboutParallax() {
  const sectionRef  = useRef<HTMLDivElement>(null);
  const canvasRef   = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Array<{ x: number; y: number; vx: number; vy: number; life: number; color: string }>>([]);
  const lastParticleTime = useRef(0);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const [sW, setSW] = useState(1200);
  const [sH, setSH] = useState(4000);
  const [ripples, setRipples] = useState<Ripple[]>([]);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const ro = new ResizeObserver(() => { setSW(el.offsetWidth); setSH(el.offsetHeight); });
    ro.observe(el);
    setSW(el.offsetWidth); setSH(el.offsetHeight);
    return () => ro.disconnect();
  }, []);

  // Particle RAF
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
        p.x += p.vx; p.y += p.vy; p.vy += 0.07; p.vx *= 0.98; p.life -= 0.018;
        const a = Math.max(0, Math.floor(p.life * 255)).toString(16).padStart(2, "0");
        ctx.beginPath(); ctx.arc(p.x, p.y, Math.max(0.5, 5 * p.life), 0, Math.PI * 2);
        ctx.fillStyle = p.color + a; ctx.fill();
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
    mouseX.set(x); mouseY.set(y);
    const now = performance.now();
    if (now - lastParticleTime.current > 20 && particlesRef.current.length < 60) {
      lastParticleTime.current = now;
      for (let i = 0; i < 2; i++) {
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
    const x = e.clientX - rect.left, y = e.clientY - rect.top;
    const color = BRAND_COLORS[Math.floor(Math.random() * BRAND_COLORS.length)];
    setRipples(prev => [...prev, { id: Date.now() + Math.random(), x, y, color }]);
    for (let i = 0; i < 22; i++) {
      const angle = (i / 22) * Math.PI * 2, speed = 3 + Math.random() * 6;
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
    <div
      ref={sectionRef}
      id="about-content"
      className="relative overflow-hidden"
      style={{ background: "linear-gradient(180deg, #A3D5FF 0%, #C8E8FF 25%, #A3D5FF 50%, #C8E8FF 75%, #A3D5FF 100%)" }}
      onMouseMove={onMouseMove}
      onClick={onClick}
    >
      {/* Particle canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none"
        style={{ width: "100%", height: "100%", zIndex: 25 }} width={sW} height={sH} />

      {/* Shooting stars */}
      <ShootingStar top="8%" delay={5} />
      <ShootingStar top="22%" delay={9} />
      <ShootingStar top="55%" delay={13} />
      <ShootingStar top="78%" delay={7} />

      {/* Subtle animated grid */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{ opacity: 0.035 }}
        animate={{ backgroundPosition: ["0px 0px", "60px 60px"] }}
        transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
      >
        <div className="w-full h-full" style={{
          backgroundImage: "linear-gradient(rgba(4,30,66,1) 1px, transparent 1px), linear-gradient(90deg, rgba(4,30,66,1) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }} />
      </motion.div>

      {/* Radial glows that pulse */}
      <motion.div className="absolute pointer-events-none"
        style={{ top: "15%", left: "50%", transform: "translateX(-50%)", width: 600, height: 600,
          background: "radial-gradient(circle, rgba(46,126,70,0.10) 0%, transparent 70%)", borderRadius: "50%" }}
        animate={{ scale: [1, 1.15, 1], opacity: [0.6, 1, 0.6] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div className="absolute pointer-events-none"
        style={{ top: "50%", right: "-10%", width: 500, height: 500,
          background: "radial-gradient(circle, rgba(161,207,239,0.15) 0%, transparent 70%)", borderRadius: "50%" }}
        animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.9, 0.5] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 2 }}
      />

      {/* Click ripples */}
      {ripples.map(r => (
        <motion.div key={r.id} className="absolute pointer-events-none rounded-full"
          style={{ left: r.x, top: r.y, border: `2px solid ${r.color}`, translateX: "-50%", translateY: "-50%", zIndex: 28 }}
          initial={{ width: 0, height: 0, opacity: 1 }}
          animate={{ width: 260, height: 260, opacity: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          onAnimationComplete={() => setRipples(p => p.filter(x => x.id !== r.id))} />
      ))}

      {/* All floating icons — magnetic, no cursor */}
      {ALL_FLOAT_ICONS.map((fi, i) => (
        <FloatingIcon key={i} {...fi} mouseX={mouseX} mouseY={mouseY} sW={sW} sH={sH} />
      ))}

      {/* Section intro header */}
      <div className="relative z-10 text-center pt-20 pb-4 px-6">
        <motion.p
          className="text-xs font-bold tracking-[0.3em] uppercase mb-3"
          style={{ color: GREEN }}
          initial={{ opacity: 0, y: -10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          About Preraka
        </motion.p>
        <motion.h2
          className="font-bold"
          style={{ color: NAVY, fontFamily: "Georgia, serif", fontSize: "clamp(2rem, 5vw, 3.5rem)" }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.15 }}
        >
          The School of Change
        </motion.h2>
        <motion.p
          className="mt-3 max-w-xl mx-auto text-sm leading-relaxed"
          style={{ color: "#374151" }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.3 }}
        >
          Discover our vision, philosophy, and the journey that shapes every child who walks through our doors.
        </motion.p>
        <div className="mt-6 flex items-center justify-center gap-3">
          <div className="h-px w-16" style={{ background: `${NAVY}25` }} />
          <motion.div
            className="w-2 h-2 rounded-full"
            style={{ background: GREEN }}
            animate={{ scale: [1, 1.6, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
          <div className="h-px w-16" style={{ background: `${NAVY}25` }} />
        </div>
      </div>

      {/* Four parallax sections */}
      {sections.map(s => <ParallaxSection key={s.id} section={s} />)}

      {/* Closing stats */}
      <div className="relative z-10 py-16 px-6">
        <div className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { num: "Pre-K–VII", label: "All Grades" },
            { num: "3+",        label: "Unique Pillars" },
            { num: "100%",      label: "Personalised" },
            { num: "∞",         label: "Curiosity" },
          ].map((stat, i) => (
            <motion.div
              key={i}
              className="text-center p-5 rounded-2xl"
              style={{ background: "rgba(255,255,255,0.58)", border: "1px solid rgba(4,30,66,0.12)", backdropFilter: "blur(12px)" }}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.12 }}
              whileHover={{ scale: 1.04 }}
            >
              <p className="font-black text-3xl" style={{ color: NAVY, fontFamily: "'Arial Black', sans-serif" }}>{stat.num}</p>
              <p className="text-xs mt-1 font-semibold tracking-widest uppercase" style={{ color: "#6B7280" }}>{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
