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
          style={{ filter: "contrast(2.4) brightness(1.2) saturate(0.45)" }}
        >
          <source src="/assets/preraka-tree.mp4" type="video/mp4" />
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

      {/* Brand lockup — real logo, larger, black text */}
      <div
        ref={brandRef}
        className="absolute left-1/2 -translate-x-1/2 text-center"
        style={{ top: "calc(50% + 190px)", opacity: 0, minWidth: 280 }}
      >
        {/* Real Preraka logo on white card */}
        <div className="flex items-center justify-center gap-4">
          <div className="bg-white rounded-2xl px-4 py-3 shadow-lg flex items-center justify-center">
            <svg viewBox="0 0 163 211" width="56" height="72" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M72.9056 -0.588561C134.468 -6.90426 165.354 60.8223 162.867 111.041C160.504 158.548 127.149 218.835 69.3905 208.925C18.1145 200.139 -2.61107 137.205 0.260546 93.246C2.748 55.2589 29.3128 3.88815 72.9056 -0.588561ZM82.2504 90.8404C94.265 92.6516 106.232 82.1285 107.019 70.7045C108.172 54.1072 92.6996 45.4417 83.3068 34.1106C76.776 42.2189 65.6065 49.4448 62.1203 59.4106C58.0673 71.0203 62.6293 82.0356 73.5491 87.9705C75.1241 88.825 79.3115 91.537 80.3199 89.3172C83.7486 81.7477 81.8182 71.2804 78.0054 64.1845C79.6284 65.4476 80.7713 68.0482 81.6549 69.8686C82.356 71.2989 82.8938 72.8314 82.9515 74.4382L84.4401 73.4909L85.7654 68.2897C85.5926 70.3609 86.0824 72.7385 85.7366 74.7447C85.4293 76.528 84.0751 77.3081 83.691 78.9149C82.8842 82.2492 82.9803 87.2925 82.2407 90.8404H82.2504ZM55.0421 148.276C43.6421 148.871 31.224 148.276 19.6992 148.276C17.1637 148.276 20.4867 158.121 22.5131 158.316C28.9479 155.149 35.2385 157.304 41.6348 157.202C52.2761 157.044 51.9976 152.028 59.8537 148.146C62.5428 146.818 65.789 145.592 68.8239 145.546C62.3604 150.997 54.9076 155.595 50.1344 162.672C46.36 168.282 44.2855 175.564 40.1174 181.071C39.0417 183.3 47.9159 190.025 49.3949 190.647C50.5282 191.121 50.3457 190.266 50.5954 189.793C52.3721 186.365 53.5726 182.223 55.5319 178.824C59.6424 171.672 66.25 164.929 70.2549 157.508L69.8899 156.477C64.3484 159.403 56.0409 160.601 53.2653 166.722C51.8823 166.861 52.8331 165.459 53.1116 164.864C55.9352 158.855 66.1828 156.171 71.8876 152.939C74.1253 151.675 76.776 147.097 78.62 151.898C68.0556 162.245 75.9981 166.109 78.8313 175.852C80.6465 182.121 79.5132 188.548 81.5493 194.752L78.7353 192.709L75.9117 197.492C79.2923 190.991 78.5816 183.105 76.2382 176.316C74.7688 172.071 71.0328 168.477 70.2453 163.991C63.8778 169.991 66.3172 177.235 68.1228 184.499C67.1144 184.173 66.0579 181.982 65.6545 181.081C65.0303 179.669 63.6377 172.313 61.7745 173.567C60.2571 177.672 52.4874 187.861 52.5162 191.697C52.5162 192.876 56.5691 194.399 57.7504 194.882C80.5889 204.216 107.413 200 125.373 183.477C115.836 177.737 118.995 161.521 107.048 159.514C102.563 158.762 97.8569 159.542 93.5927 157.155C96.1666 164.818 107.25 164.075 109.852 171.161L104.926 167.725L96.4259 163.991C99.2015 172.183 95.2158 180.486 104.196 185.864C100.2 185.325 97.7609 182.251 96.0706 179.037L92.8916 189.282C90.433 183.523 95.2158 177.375 94.9469 171.96C94.8509 169.926 93.7752 166.861 93.0069 164.892C91.6623 161.437 86.4569 155.196 85.9479 153.245C85.7078 152.316 86.0344 151.211 86.8987 150.997C88.3201 150.645 95.2542 155.985 97.8377 156.802C100.421 157.62 105.972 158.363 108.786 158.53C112.081 158.725 107.595 154.573 107.029 154.072C103.975 151.388 99.1631 149.27 95.7152 146.892C95.6 145.546 97.0214 146.437 97.6264 146.753C99.893 147.914 104.013 150.227 105.963 151.685C108.028 153.236 115.893 161.325 117.238 163.341C120.964 168.941 119.322 178.359 127.072 181.721C128.897 180.3 136.292 173.167 135.908 171.263C128.744 166.341 120.916 161.855 116.21 154.425C119.764 155.697 123.346 156.821 127.178 157.146C132.412 157.583 137.867 156.171 142.727 159.041L148 149.289C147.337 148.304 146.636 148.341 145.579 148.23C138.511 147.487 127.495 148.063 120.071 148.23C117.709 148.285 115.634 149.363 113.07 148.917C111.504 148.638 108.191 146.27 105.992 145.499C102.832 144.394 93.3911 143.289 91.7776 142.155C88.2625 139.694 86.0344 127.156 88.032 123.394C89.1365 121.304 93.4871 119.679 92.9205 117.877C89.5686 114.887 89.7223 117.125 86.5338 118.174C85.4485 110.001 85.8615 101.846 86.4281 93.6546L80.4832 92.3636L79.5804 93.3296L77.3235 117.487L71.926 113.484L52.593 103.119C52.4682 101.763 53.8704 102.729 54.5042 102.98C56.3482 103.713 59.1142 104.884 60.8429 105.747C62.5716 106.611 70.9848 112.184 71.9548 111.979C74.4711 111.431 73.9621 102.85 73.6259 100.908C72.4158 93.989 63.2919 86.0851 56.1273 85.3606C56.6748 83.0666 58.2978 82.4814 58.3074 79.5651C58.3459 69.7386 50.2592 65.9677 42.3839 62.1319C39.2242 66.5064 37.3898 74.7726 39.7044 79.723C40.4823 81.3948 42.7105 82.0542 42.6913 84.0046C35.1521 84.2275 27.9778 86.9396 20.8036 88.825C20.5635 89.7538 20.9669 90.5154 21.3318 91.3327C23.1662 95.5029 29.4953 104.809 32.5014 108.562C41.3947 119.651 56.1177 128.149 69.3425 117.58H70.4662C78.0918 123.468 79.4748 128.187 75.9405 137.019C73.1169 144.087 67.9787 143.567 61.2847 146.084C58.3363 147.199 58.8357 148.072 55.0613 148.267L55.0421 148.276ZM113.348 82.6393C128.561 85.1006 131.077 74.0203 125.68 62.8285C118.448 67.1566 107.595 72.0512 110.525 81.9613L114.75 77.1688L113.339 82.6393H113.348ZM92.2482 113.493C90.4138 116.577 100.671 121.49 103.427 121.982C123.087 125.493 134.967 103.815 142.324 89.8095C129.886 85.2213 116.806 81.9613 103.917 87.5154C94.2842 91.6671 87.475 100.843 90.7499 111.348C97.175 108.701 102.438 104.103 109.276 102.264C109.948 102.088 111.399 101.131 111.235 102.45C107.624 103.927 103.696 105.98 100.421 108.06C99.2783 108.784 92.5075 113.075 92.2578 113.493H92.2482ZM46.8978 159.904C39.1282 162.366 30.2636 157.963 22.8877 161.604C25.2983 165.264 27.6321 169.406 30.35 172.833C31.3105 174.04 37.1497 181.304 38.4078 180.412L46.8978 159.904ZM139.154 160.582C136.158 160.192 131.769 160.582 128.551 160.582C128.225 160.582 126.679 158.669 126.794 160.917C132.758 166.647 139.164 174.161 141.613 161.298C140.672 161.53 139.721 160.657 139.164 160.582H139.154Z"
                fill="#041E42"
              />
            </svg>
          </div>
          <div className="text-left">
            <div className="text-3xl font-bold" style={{ fontFamily: "Georgia, serif", color: NAVY, letterSpacing: 1.5 }}>
              Preraka
            </div>
            <div className="text-sm font-semibold mt-0.5" style={{ color: "black" }}>
              The School of Change.
            </div>
          </div>
        </div>
        <div className="mt-3 text-sm font-medium tracking-wider" style={{ color: "black" }}>
          Equality &nbsp;•&nbsp; Motivate &nbsp;•&nbsp; Inspirational &nbsp;•&nbsp; Independent
        </div>
      </div>
    </div>
  );
}
