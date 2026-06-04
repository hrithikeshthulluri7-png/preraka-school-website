"use client";
import React, { useCallback } from "react";
import { CpuArchitecture } from "./cpu-architecture";
import DynamicIslandNav from "./dynamic-island-nav";

function SpiroDecor({ size, rings, style }: { size: number; rings: number; style?: React.CSSProperties }) {
  const center = size / 2;
  const paths = Array.from({ length: rings }, (_, i) => {
    const r = (center - 10) * (0.25 + i * 0.22);
    const pts = 160, amp = 4 + i * 2.5, freq = 5 + i;
    let d = "";
    for (let p = 0; p <= pts; p++) {
      const a = (p / pts) * Math.PI * 2;
      const wave = amp * Math.sin(a * freq + i * 0.8);
      const x = center + (r + wave) * Math.cos(a);
      const y = center + (r + wave) * Math.sin(a);
      d += p === 0 ? `M${x.toFixed(1)} ${y.toFixed(1)}` : ` L${x.toFixed(1)} ${y.toFixed(1)}`;
    }
    return d + " Z";
  });
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}
      className="absolute pointer-events-none" style={style}>
      {paths.map((d, i) => (
        <path key={i} d={d} stroke="#A1CFEF" strokeWidth={0.7} fill="none" opacity={0.45 - i * 0.08} />
      ))}
    </svg>
  );
}

function RocketSVG() {
  return (
    <svg width="28" height="48" viewBox="0 0 28 48" fill="none">
      <path d="M14 2C14 2 22 10 22 26L14 36L6 26C6 10 14 2 14 2Z" fill="rgba(161,207,239,0.25)" stroke="rgba(161,207,239,0.7)" strokeWidth="1.2"/>
      <circle cx="14" cy="20" r="4.5" fill="rgba(46,126,70,0.7)" stroke="rgba(161,207,239,0.8)" strokeWidth="1"/>
      <path d="M6 26L1 33L7 31Z" fill="rgba(161,207,239,0.5)"/>
      <path d="M22 26L27 33L21 31Z" fill="rgba(161,207,239,0.5)"/>
      <path d="M11 36L9 44L14 40L19 44L17 36" fill="rgba(255,160,50,0.8)"/>
      <path d="M12 38L10.5 46L14 42L17.5 46L16 38" fill="rgba(255,210,80,0.6)"/>
    </svg>
  );
}

function PaperPlaneSVG() {
  return (
    <svg width="44" height="32" viewBox="0 0 44 32" fill="none">
      <polygon points="2,16 42,5 28,27" stroke="rgba(161,207,239,0.75)" strokeWidth="1.3" fill="rgba(161,207,239,0.15)"/>
      <line x1="28" y1="27" x2="16" y2="16" stroke="rgba(161,207,239,0.45)" strokeWidth="1"/>
    </svg>
  );
}

const STAR_DOTS = [
  { x:"11%",y:"7%",s:2.5,d:0 },  { x:"27%",y:"4%",s:2,d:0.5 },  { x:"44%",y:"6%",s:3,d:1 },
  { x:"61%",y:"3%",s:2,d:0.3 },  { x:"77%",y:"8%",s:2.5,d:0.8 }, { x:"88%",y:"14%",s:2,d:1.2 },
  { x:"5%",y:"24%",s:3,d:0.4 },  { x:"17%",y:"37%",s:2,d:1.5 }, { x:"91%",y:"31%",s:2.5,d:0.7 },
  { x:"96%",y:"47%",s:2,d:1.1 }, { x:"6%",y:"59%",s:3,d:0.6 },  { x:"13%",y:"71%",s:2,d:1.3 },
  { x:"83%",y:"64%",s:2.5,d:0.2 },{ x:"93%",y:"77%",s:2,d:0.9 },{ x:"21%",y:"84%",s:3,d:1.4 },
  { x:"47%",y:"91%",s:2,d:0.1 }, { x:"67%",y:"87%",s:2.5,d:0.7 },{ x:"34%",y:"14%",s:2,d:1.6 },
  { x:"54%",y:"19%",s:3,d:0.3 }, { x:"72%",y:"17%",s:2,d:0.8 }, { x:"37%",y:"77%",s:2.5,d:1.2 },
  { x:"57%",y:"74%",s:2,d:0.4 }, { x:"2%",y:"44%",s:2,d:1.8 },  { x:"98%",y:"61%",s:2.5,d:0.5 },
];

const FLOAT_EMOJIS = [
  { emoji:"🚀", x:"4%",  y:"22%", dur:4.5, delay:0   },
  { emoji:"🤖", x:"92%", y:"19%", dur:3.8, delay:0.6 },
  { emoji:"🔬", x:"3%",  y:"63%", dur:4.2, delay:1.1 },
  { emoji:"💡", x:"91%", y:"60%", dur:4.8, delay:0.3 },
  { emoji:"⚡",  x:"8%",  y:"41%", dur:3.6, delay:1.4 },
  { emoji:"🌟", x:"87%", y:"39%", dur:4.0, delay:0.8 },
  { emoji:"🛸", x:"14%", y:"11%", dur:5.2, delay:1.7 },
  { emoji:"⚗️", x:"79%", y:"7%",  dur:4.4, delay:0.2 },
  { emoji:"🎯", x:"19%", y:"86%", dur:3.9, delay:1.0 },
  { emoji:"🧬", x:"71%", y:"89%", dur:4.6, delay:0.5 },
  { emoji:"✨", x:"45%", y:"4%",  dur:3.7, delay:1.3 },
  { emoji:"🔭", x:"49%", y:"93%", dur:4.1, delay:0.9 },
  { emoji:"🧩", x:"25%", y:"6%",  dur:4.3, delay:0.7 },
  { emoji:"🌐", x:"68%", y:"5%",  dur:3.5, delay:1.5 },
];

const ORBIT_RINGS = [
  { size:380, opacity:0.07, dur:22, delay:0, rev:false },
  { size:500, opacity:0.05, dur:30, delay:3, rev:true  },
  { size:640, opacity:0.035, dur:40, delay:1, rev:false },
];

export default function AboutHero() {
  const scrollToContent = useCallback(() => {
    const target = document.getElementById("about-content");
    if (!target) return;
    const targetY = target.getBoundingClientRect().top + window.scrollY;
    const startY = window.scrollY;
    const distance = targetY - startY;
    const duration = 1400;
    let startTime: number | null = null;
    const ease = (t: number) => t < 0.5 ? 4*t*t*t : 1 - Math.pow(-2*t+2,3)/2;
    const step = (ts: number) => {
      if (!startTime) startTime = ts;
      const progress = Math.min((ts - startTime) / duration, 1);
      window.scrollTo(0, startY + distance * ease(progress));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, []);

  return (
    <section
      className="relative w-full min-h-screen flex flex-col items-center justify-center overflow-hidden select-none cursor-pointer"
      style={{ background: "linear-gradient(160deg,#020D1F 0%,#041E42 40%,#062B5A 70%,#041E42 100%)" }}
      onClick={scrollToContent}
    >
      <style>{`
        @keyframes spinSlow{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}
        @keyframes spinSlowRev{from{transform:rotate(0deg)}to{transform:rotate(-360deg)}}
        @keyframes twinkle{0%,100%{opacity:0.15;transform:scale(0.8)}50%{opacity:1;transform:scale(1.3)}}
        @keyframes floatGentle{0%,100%{transform:translateY(0)}50%{transform:translateY(-18px)}}
        @keyframes rocketFloat{0%,100%{transform:translateY(0) rotate(-14deg)}50%{transform:translateY(-38px) rotate(-9deg)}}
        @keyframes planeDrift{0%,100%{transform:translateY(0) rotate(-8deg)}50%{transform:translateY(-22px) rotate(-3deg)}}
        @keyframes orbitSpin{from{transform:translate(-50%,-50%) rotate(0deg)}to{transform:translate(-50%,-50%) rotate(360deg)}}
        @keyframes orbitSpinRev{from{transform:translate(-50%,-50%) rotate(0deg)}to{transform:translate(-50%,-50%) rotate(-360deg)}}
        @keyframes dotPulse{0%,100%{opacity:0.4;transform:scale(1)}50%{opacity:1;transform:scale(1.6)}}
        @keyframes fadeSlideUp{from{opacity:0;transform:translateY(24px)}to{opacity:1;transform:translateY(0)}}
        .about-fade-1{animation:fadeSlideUp 0.7s ease-out 0.2s both}
        .about-fade-2{animation:fadeSlideUp 0.7s ease-out 0.45s both}
        .about-fade-3{animation:fadeSlideUp 0.7s ease-out 0.65s both}
        .about-fade-4{animation:fadeSlideUp 0.7s ease-out 0.85s both}
      `}</style>

      {/* Subtle grid overlay */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.04]"
        style={{ backgroundImage:"linear-gradient(rgba(161,207,239,1) 1px,transparent 1px),linear-gradient(90deg,rgba(161,207,239,1) 1px,transparent 1px)", backgroundSize:"60px 60px" }} />

      {/* Radial glow */}
      <div className="absolute inset-0 pointer-events-none"
        style={{ background:"radial-gradient(ellipse 70% 60% at 50% 50%,rgba(46,126,70,0.12) 0%,transparent 70%)" }} />

      {/* Spirograph corners */}
      <SpiroDecor size={200} rings={4} style={{ top:0, left:0, transform:"translate(-30%,-30%)", animation:"spinSlow 28s linear infinite", opacity:0.35 }} />
      <SpiroDecor size={170} rings={3} style={{ top:0, right:0, transform:"translate(30%,-30%)", animation:"spinSlowRev 22s linear infinite", opacity:0.3 }} />
      <SpiroDecor size={150} rings={3} style={{ bottom:0, left:0, transform:"translate(-25%,25%)", animation:"spinSlow 32s linear infinite", opacity:0.28 }} />
      <SpiroDecor size={130} rings={2} style={{ bottom:0, right:0, transform:"translate(25%,25%)", animation:"spinSlowRev 25s linear infinite", opacity:0.25 }} />

      {/* Orbit rings */}
      {ORBIT_RINGS.map((r, i) => (
        <div key={i} className="absolute pointer-events-none rounded-full"
          style={{
            width:r.size, height:r.size,
            border:`1px solid rgba(161,207,239,${r.opacity})`,
            top:"50%", left:"50%",
            animation:`${r.rev?"orbitSpinRev":"orbitSpin"} ${r.dur}s linear ${r.delay}s infinite`,
          }}>
          <div className="absolute w-2 h-2 rounded-full"
            style={{ top:-4, left:"50%", marginLeft:-4, background:"#A1CFEF", boxShadow:"0 0 8px #A1CFEF", opacity:0.7 }} />
        </div>
      ))}

      {/* Rocket */}
      <div className="absolute left-6 md:left-14 pointer-events-none"
        style={{ top:"38%", animation:"rocketFloat 5s ease-in-out infinite" }}>
        <RocketSVG />
      </div>

      {/* Paper plane */}
      <div className="absolute right-6 md:right-16 pointer-events-none"
        style={{ top:"28%", animation:"planeDrift 6s ease-in-out 0.8s infinite" }}>
        <PaperPlaneSVG />
      </div>

      {/* Star dots */}
      {STAR_DOTS.map((s, i) => (
        <div key={i} className="absolute rounded-full pointer-events-none"
          style={{
            left:s.x, top:s.y, width:s.s, height:s.s,
            background:"#A1CFEF", boxShadow:`0 0 ${s.s*3}px #A1CFEF`,
            animation:`twinkle ${2.5+(i%4)*0.5}s ease-in-out ${s.d}s infinite`,
          }} />
      ))}

      {/* Floating emojis */}
      {FLOAT_EMOJIS.map((fi, i) => (
        <div key={i} className="absolute pointer-events-none"
          style={{
            left:fi.x, top:fi.y, fontSize:"1.6rem", lineHeight:1,
            animation:`floatGentle ${fi.dur}s ease-in-out ${fi.delay}s infinite`,
            filter:"drop-shadow(0 0 6px rgba(161,207,239,0.5))",
          }}>
          {fi.emoji}
        </div>
      ))}

      {/* Circuit line decorations */}
      <svg className="absolute right-0 top-24 pointer-events-none opacity-20" width="160" height="120">
        <line x1="0" y1="25" x2="70" y2="25" stroke="#A1CFEF" strokeWidth="1"/>
        <line x1="70" y1="25" x2="70" y2="80" stroke="#A1CFEF" strokeWidth="1"/>
        <line x1="70" y1="80" x2="140" y2="80" stroke="#A1CFEF" strokeWidth="1"/>
        <line x1="30" y1="25" x2="30" y2="55" stroke="#A1CFEF" strokeWidth="1"/>
        <circle cx="70" cy="25" r="3.5" fill="#2E7E46"/>
        <circle cx="70" cy="80" r="3" fill="#A1CFEF"/>
        <circle cx="140" cy="80" r="3" fill="#A1CFEF" opacity="0.5"/>
        <circle cx="30" cy="55" r="2.5" fill="#2E7E46" opacity="0.7"/>
      </svg>
      <svg className="absolute left-0 bottom-28 pointer-events-none opacity-20" width="140" height="100">
        <line x1="140" y1="20" x2="70" y2="20" stroke="#A1CFEF" strokeWidth="1"/>
        <line x1="70" y1="20" x2="70" y2="65" stroke="#A1CFEF" strokeWidth="1"/>
        <line x1="70" y1="65" x2="20" y2="65" stroke="#A1CFEF" strokeWidth="1"/>
        <circle cx="70" cy="20" r="3" fill="#A1CFEF"/>
        <circle cx="70" cy="65" r="3" fill="#2E7E46"/>
        <circle cx="20" cy="65" r="2.5" fill="#A1CFEF" opacity="0.5"/>
      </svg>

      {/* Dotted paths */}
      <svg className="absolute top-16 left-24 pointer-events-none opacity-30" width="160" height="36">
        {Array.from({ length: 11 }).map((_, i) => (
          <circle key={i} cx={i*15+7} cy={18+Math.sin(i*0.9)*5} r="2.4" fill="#A1CFEF"/>
        ))}
      </svg>
      <svg className="absolute bottom-24 right-24 pointer-events-none opacity-30" width="160" height="36">
        {Array.from({ length: 11 }).map((_, i) => (
          <circle key={i} cx={i*15+7} cy={18+Math.sin(i*0.9+1.2)*5} r="2.4" fill="#A1CFEF"/>
        ))}
      </svg>

      {/* Dynamic Island nav — hover to expand, Home link visible */}
      <DynamicIslandNav inline />

      {/* ── MAIN CONTENT ── */}

      {/* "ABOUT US" tag */}
      <div className="relative z-10 text-center mb-1 pointer-events-none about-fade-1">
        <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full border"
          style={{ background:"rgba(46,126,70,0.18)", borderColor:"rgba(46,126,70,0.5)", backdropFilter:"blur(8px)" }}>
          <span className="w-1.5 h-1.5 rounded-full" style={{ background:"#2E7E46", boxShadow:"0 0 6px #2E7E46" }} />
          <span className="text-xs font-bold tracking-[0.3em] uppercase" style={{ color:"#8ECDA8" }}>About Us</span>
          <span className="w-1.5 h-1.5 rounded-full" style={{ background:"#2E7E46", boxShadow:"0 0 6px #2E7E46" }} />
        </div>
      </div>

      {/* CPU Architecture with ABOUT US chip */}
      <div className="relative w-full max-w-2xl mx-auto px-4 z-10 pointer-events-none about-fade-2">
        <CpuArchitecture text="ABOUT" width="100%" height="260px"
          className="text-sky-400/40" animateLines animateMarkers animateText />
        <div className="absolute flex flex-col items-center justify-center pointer-events-none"
          style={{ top:"50%", left:"50%", transform:"translate(-50%,-52%)" }}>
          <div className="px-5 py-2 rounded-xl border"
            style={{ background:"rgba(4,30,66,0.92)", borderColor:"rgba(161,207,239,0.35)", backdropFilter:"blur(12px)" }}>
            <p className="text-white font-black tracking-widest uppercase text-center"
              style={{ fontSize:"clamp(0.9rem,2.5vw,1.4rem)", letterSpacing:"0.18em" }}>
              ABOUT&nbsp;US
            </p>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="relative z-10 flex items-center gap-6 sm:gap-10 mt-2 pointer-events-none about-fade-3">
        {[
          { label:"Location", value:"Turkayamjal" },
          { label:"Grades",   value:"Pre-K → VII" },
          { label:"Founded",  value:"2024"         },
        ].map((s, i) => (
          <div key={i} className="text-center">
            <p className="text-xs font-semibold tracking-widest uppercase" style={{ color:"rgba(161,207,239,0.5)" }}>{s.label}</p>
            <p className="text-sm font-bold text-white mt-0.5">{s.value}</p>
          </div>
        ))}
      </div>

      {/* Scroll CTA */}
      <div className="relative z-10 mt-8 flex flex-col items-center gap-2 pointer-events-none about-fade-4">
        <p className="text-xs tracking-[0.25em] uppercase" style={{ color:"rgba(161,207,239,0.55)" }}>
          Click anywhere to explore
        </p>
        <div className="flex flex-col items-center gap-1">
          <div className="w-px h-8" style={{ background:"linear-gradient(to bottom,rgba(161,207,239,0) 0%,rgba(161,207,239,0.6) 100%)" }} />
          <div className="w-1.5 h-1.5 rounded-full" style={{ background:"#A1CFEF" }} />
        </div>
      </div>
    </section>
  );
}
