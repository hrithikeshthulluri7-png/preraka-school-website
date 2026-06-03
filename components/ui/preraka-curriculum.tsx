"use client";
import { motion } from "framer-motion";
import { CardTransformed, CardsContainer, ContainerScroll } from "./animated-cards-stack";

const NAVY = "#041E42";
const GREEN = "#2E7E46";

const FLOAT_CSS = `
@keyframes floatD{0%,100%{transform:translateY(0) rotate(-2deg)}50%{transform:translateY(-14px) rotate(3deg)}}
@keyframes floatE{0%,100%{transform:translateY(0)}50%{transform:translateY(-18px) rotate(-4deg)}}
@keyframes floatF{0%,100%{transform:translate(0,0)}40%{transform:translate(12px,-10px)}80%{transform:translate(-6px,-16px)}}
`;

const FLOAT_ICONS = [
  { emoji: "🎵", left: "1%",  top: "18%", anim: "floatD", delay: "0.2s",  size: "2rem"   },
  { emoji: "⚙️", left: "96%", top: "22%", anim: "floatE", delay: "0.9s",  size: "1.9rem" },
  { emoji: "📜", left: "2%",  top: "68%", anim: "floatF", delay: "1.4s",  size: "1.7rem" },
  { emoji: "🌱", left: "95%", top: "64%", anim: "floatD", delay: "0.6s",  size: "1.6rem" },
  { emoji: "🖌️", left: "4%",  top: "44%", anim: "floatE", delay: "1.1s",  size: "1.6rem" },
  { emoji: "🔬", left: "93%", top: "44%", anim: "floatF", delay: "0.4s",  size: "1.5rem" },
  { emoji: "📐", left: "1%",  top: "86%", anim: "floatD", delay: "1.8s",  size: "1.4rem" },
  { emoji: "🧩", left: "94%", top: "84%", anim: "floatE", delay: "0.7s",  size: "1.4rem" },
];

interface CardData {
  id: number;
  label: string;
  description: string;
  icon: string;
  color: string;
  tag: string;
  bgPattern: React.ReactNode;
}

function CircuitPattern({ color }: { color: string }) {
  return (
    <svg className="absolute inset-0 w-full h-full opacity-20" viewBox="0 0 360 120" preserveAspectRatio="xMidYMid slice">
      {[20,60,100,140,180,220,260,300,340].map(x => (
        <g key={x}>
          <circle cx={x} cy={40 + (x % 40)} r="4" stroke={color} strokeWidth="1.5" fill="none" />
          <line x1={x} y1={44 + (x % 40)} x2={x} y2={80} stroke={color} strokeWidth="1" opacity="0.6" />
          <line x1={x} y1={80} x2={x + 20} y2={80} stroke={color} strokeWidth="1" opacity="0.6" />
        </g>
      ))}
    </svg>
  );
}

function HexPattern({ color }: { color: string }) {
  return (
    <svg className="absolute inset-0 w-full h-full opacity-15" viewBox="0 0 360 120" preserveAspectRatio="xMidYMid slice">
      {[0,1,2,3,4,5,6].map(i =>
        [0,1].map(j => {
          const cx = i * 60 + (j % 2) * 30;
          const cy = j * 55 + 20;
          const pts = Array.from({length:6},(_, k)=>`${cx+22*Math.cos(k*60*Math.PI/180)},${cy+22*Math.sin(k*60*Math.PI/180)}`).join(" ");
          return <polygon key={`${i}-${j}`} points={pts} stroke={color} strokeWidth="1.5" fill="none" />;
        })
      )}
    </svg>
  );
}

function WavePattern({ color }: { color: string }) {
  return (
    <svg className="absolute inset-0 w-full h-full opacity-20" viewBox="0 0 360 120" preserveAspectRatio="xMidYMid slice">
      {[20,40,60,80,100].map((y, i) => (
        <path key={i} d={`M0 ${y} Q90 ${y-18} 180 ${y} Q270 ${y+18} 360 ${y}`} stroke={color} strokeWidth="1.5" fill="none" />
      ))}
      {[80,120,160,200,240,280].map(x => (
        <text key={x} x={x} y={55} fontSize="18" fill={color} opacity="0.4">♪</text>
      ))}
    </svg>
  );
}

function ToolsPattern({ color }: { color: string }) {
  return (
    <svg className="absolute inset-0 w-full h-full opacity-15" viewBox="0 0 360 120" preserveAspectRatio="xMidYMid slice">
      {[30,90,150,210,270,330].map((x, i) => (
        <g key={i} transform={`translate(${x},${40 + (i%2)*20})`}>
          <rect x="-6" y="-20" width="12" height="40" rx="2" stroke={color} strokeWidth="1.5" fill="none" />
          <rect x="-10" y="-24" width="20" height="8" rx="2" stroke={color} strokeWidth="1.5" fill="none" />
        </g>
      ))}
    </svg>
  );
}

const cards: CardData[] = [
  {
    id: 1,
    label: "The Power Of AI",
    description: "Personalized, adaptive learning through the CoSchool platform.",
    icon: "🤖",
    color: "#041E42",
    tag: "AI Learning",
    bgPattern: <CircuitPattern color="white" />,
  },
  {
    id: 2,
    label: "The Logic Of STEM",
    description: "Practical, real-world application of Science, Technology, Engineering, and Mathematics.",
    icon: "⚙️",
    color: "#2E7E46",
    tag: "STEM",
    bgPattern: <HexPattern color="white" />,
  },
  {
    id: 3,
    label: "The Soul Of Gandharya Vidhya",
    description: "Integrating ancient Indian traditions of music and sound to promote emotional well-being and holistic development.",
    icon: "🎵",
    color: "#FFB81C",
    tag: "Ancient Wisdom",
    bgPattern: <WavePattern color="white" />,
  },
  {
    id: 4,
    label: "DIY: Create, Don't Just Consume",
    description: "Master real-world skills through hands-on making. We turn curiosity into confidence by letting students build, solve, and innovate with their own hands.",
    icon: "🔧",
    color: "#F99D84",
    tag: "Hands-On",
    bgPattern: <ToolsPattern color="white" />,
  },
];

export default function PrerakaCurriculum() {
  return (
    <section className="relative w-full bg-white overflow-hidden">
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
            animation: `${fi.anim} ${4.5 + (i % 3) * 0.8}s ease-in-out ${fi.delay} infinite`,
            opacity: 0.45,
            zIndex: 0,
          }}
        >
          {fi.emoji}
        </div>
      ))}

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 items-start pt-20 md:pt-32">
          {/* Left — sticky text with scroll reveal */}
          <div className="md:sticky md:top-24 pb-16">
            <motion.div
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: "easeOut" }}
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

            {/* Summary bullets */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
              viewport={{ once: true, margin: "-80px" }}
              className="mt-8 space-y-3"
            >
              {cards.map((c) => (
                <div key={c.id} className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-xl flex items-center justify-center text-base flex-shrink-0"
                    style={{ background: `${c.color}15`, border: `1px solid ${c.color}30` }}>
                    {c.icon}
                  </div>
                  <p className="text-sm font-medium" style={{ color: NAVY }}>{c.label}</p>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right — scroll-driven card stack */}
          <ContainerScroll className="h-[280vh]">
            <div className="sticky top-0 h-screen flex items-center justify-center py-12">
              <CardsContainer className="relative h-[480px] w-[360px]">
                {cards.map((card, i) => (
                  <CardTransformed
                    key={card.id}
                    arrayLength={cards.length}
                    index={i + 1}
                    variant="light"
                    className="!items-start !justify-start gap-0 !p-0 !overflow-hidden"
                  >
                    {/* Visual header band */}
                    <div
                      className="w-full relative overflow-hidden flex items-end justify-between px-5 pb-4"
                      style={{
                        height: 130,
                        background: `linear-gradient(135deg, ${card.color} 0%, ${card.color}bb 100%)`,
                        borderRadius: "1rem 1rem 0 0",
                      }}
                    >
                      {card.bgPattern}
                      {/* Large bg emoji */}
                      <span className="absolute right-3 top-3 text-7xl opacity-15 select-none">{card.icon}</span>
                      {/* Concentric ring accents */}
                      {[1,2,3].map(n => (
                        <div key={n} className="absolute rounded-full" style={{
                          width: 40 + n * 36, height: 40 + n * 36,
                          right: -20 + n * 4, bottom: -20 + n * 4,
                          border: "1px solid rgba(255,255,255,0.18)",
                        }} />
                      ))}
                      {/* Icon badge */}
                      <div className="w-12 h-12 rounded-2xl flex items-center justify-center text-2xl z-10 flex-shrink-0"
                        style={{ background: "rgba(255,255,255,0.22)", border: "1px solid rgba(255,255,255,0.38)" }}>
                        {card.icon}
                      </div>
                      <span className="text-xs font-bold tracking-widest uppercase z-10 pb-1"
                        style={{ color: "rgba(255,255,255,0.75)", letterSpacing: "0.14em" }}>
                        {card.tag}
                      </span>
                    </div>

                    {/* Content */}
                    <div className="px-6 pt-5 pb-4 flex flex-col gap-2">
                      <h3 className="font-bold text-lg leading-tight" style={{ color: NAVY }}>
                        {card.label}
                      </h3>
                      <p className="text-sm text-gray-500 leading-relaxed">{card.description}</p>
                    </div>
                  </CardTransformed>
                ))}
              </CardsContainer>
            </div>
          </ContainerScroll>
        </div>
      </div>
    </section>
  );
}
