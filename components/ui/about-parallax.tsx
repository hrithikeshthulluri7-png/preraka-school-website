"use client";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";

const NAVY = "#041E42";
const GREEN = "#2E7E46";

interface Section {
  id: number;
  tag: string;
  title: string;
  subtitle: string;
  body: string[];
  image: string;
  accent: string;
  reverse: boolean;
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
      "Our mission is to inspire a lifelong love of learning. Rather than rote memorisation, we empower students to engage both heart and mind, preparing them for success in academics and in life."
    ],
    image: "/assets/about/school-1.jpg",
    accent: "#2E7E46",
    reverse: false,
  },
  {
    id: 2,
    tag: "OUR PHILOSOPHY",
    title: "A Three-Pillar Approach",
    subtitle: "To Holistic Excellence",
    body: [
      "Preraka stands apart from other schools in Hyderabad through our unique blend of time-tested values and modern educational technology.",
      "We weave together AI-powered personalised learning through CoSchool, hands-on STEM exploration that builds real-world problem-solvers, and the ancient wisdom of Gandharya Vidhya — Indian music and sound traditions that nurture emotional balance.",
      "This three-pillar approach ensures every student grows intellectually, creatively, and emotionally — a true education for the whole child."
    ],
    image: "/assets/about/school-2.jpg",
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
      "🌳 The Oak (Grades 6 – 7): An oak spreads deep roots. Our senior students receive guest lectures, lead school initiatives, and begin their journey as student entrepreneurs — ready to shape the future."
    ],
    image: "/assets/about/school-3.jpg",
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
      "🤝 Safe & Inclusive: We offer a secure community where every child is valued, respected, and encouraged to achieve their full potential — regardless of background or learning style."
    ],
    image: "/assets/about/school-4.jpg",
    accent: "#041E42",
    reverse: true,
  },
];

// ── Each section is its own component to legally use hooks ──
function ParallaxSection({ section }: { section: Section }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "center start"] });

  const opacity   = useTransform(scrollYProgress, [0, 0.55], [0, 1]);
  const clipPath  = useTransform(scrollYProgress, [0, 0.55], [
    section.reverse ? "inset(0 0 0 100%)" : "inset(0 100% 0 0)",
    "inset(0 0% 0 0%)",
  ]);
  const textY     = useTransform(scrollYProgress, [0, 1], [-40, 0]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.45], [0, 1]);

  return (
    <div
      ref={ref}
      className={`min-h-screen flex flex-col md:flex-row items-center justify-center gap-10 md:gap-20 px-6 md:px-16 py-20 ${section.reverse ? "md:flex-row-reverse" : ""}`}
    >
      {/* ── Text side — white glass card for contrast on blue bg ── */}
      <motion.div
        style={{ y: textY, opacity: textOpacity }}
        className="flex-1 max-w-xl"
      >
        <div className="rounded-2xl p-8"
          style={{
            background: "rgba(255,255,255,0.75)",
            backdropFilter: "blur(16px)",
            border: "1px solid rgba(4,30,66,0.1)",
            boxShadow: "0 8px 40px rgba(4,30,66,0.10)",
          }}>

          {/* Tag */}
          <p className="text-xs font-bold tracking-[0.25em] uppercase mb-3 flex items-center gap-2"
            style={{ color: section.accent }}>
            <span className="w-6 h-0.5 inline-block rounded-full" style={{ background: section.accent }} />
            {section.tag}
          </p>

          {/* Title */}
          <h2 className="font-bold leading-tight mb-2"
            style={{ color: NAVY, fontFamily: "Georgia, serif", fontSize: "clamp(1.6rem, 3.5vw, 2.6rem)" }}>
            {section.title}
            <br />
            <span style={{ color: section.accent }}>{section.subtitle}</span>
          </h2>

          {/* Divider */}
          <div className="h-0.5 w-14 rounded-full mb-5 mt-3" style={{ background: section.accent }} />

          {/* Body paragraphs — dark navy text for max contrast */}
          <div className="space-y-3">
            {section.body.map((para, i) => (
              <p key={i} className="leading-relaxed font-medium"
                style={{ color: "#1a2e4a", fontSize: "0.92rem" }}>
                {para}
              </p>
            ))}
          </div>

          {/* Pill badge */}
          <div className="mt-6 inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold"
            style={{ background: `${section.accent}22`, border: `1px solid ${section.accent}50`, color: section.accent }}>
            <span>✦</span> Preraka — The School of Change
          </div>
        </div>
      </motion.div>

      {/* ── Image side ── */}
      <motion.div
        style={{ opacity, clipPath }}
        className="flex-1 max-w-sm md:max-w-md relative"
      >
        <div className="relative overflow-hidden rounded-2xl shadow-2xl"
          style={{ border: `2px solid ${section.accent}30` }}>
          {/* Colour accent corner */}
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

          {/* Gradient overlay at bottom */}
          <div className="absolute inset-x-0 bottom-0 h-20 pointer-events-none"
            style={{ background: `linear-gradient(to top, ${section.accent}40 0%, transparent 100%)` }} />
        </div>

        {/* Floating accent dot */}
        <div className="absolute -bottom-3 -right-3 w-16 h-16 rounded-full -z-10 opacity-30"
          style={{ background: section.accent, filter: "blur(20px)" }} />
      </motion.div>
    </div>
  );
}

export default function AboutParallax() {
  return (
    <div
      id="about-content"
      style={{ background: "linear-gradient(180deg, #A3D5FF 0%, #C8E8FF 25%, #A3D5FF 50%, #C8E8FF 75%, #A3D5FF 100%)" }}
    >
      {/* Section intro */}
      <div className="text-center pt-20 pb-4 px-6">
        <p className="text-xs font-bold tracking-[0.3em] uppercase mb-3" style={{ color: GREEN }}>
          About Preraka
        </p>
        <h2 className="font-bold" style={{ color: NAVY, fontFamily: "Georgia, serif", fontSize: "clamp(2rem, 5vw, 3.5rem)" }}>
          The School of Change
        </h2>
        <p className="mt-3 max-w-xl mx-auto text-sm leading-relaxed" style={{ color: "#374151" }}>
          Discover our vision, philosophy, and the journey that shapes every child who walks through our doors.
        </p>
        <div className="mt-6 flex items-center justify-center gap-3">
          <div className="h-px w-16" style={{ background: `${NAVY}25` }} />
          <div className="w-1.5 h-1.5 rounded-full" style={{ background: GREEN }} />
          <div className="h-px w-16" style={{ background: `${NAVY}25` }} />
        </div>
      </div>

      {/* Four parallax sections */}
      {sections.map(s => (
        <ParallaxSection key={s.id} section={s} />
      ))}

      {/* Closing stats bar */}
      <div className="py-16 px-6">
        <div className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { num: "Pre-K–VII", label: "All Grades" },
            { num: "3+", label: "Unique Pillars" },
            { num: "100%", label: "Personalised" },
            { num: "∞", label: "Curiosity" },
          ].map((stat, i) => (
            <div key={i} className="text-center p-5 rounded-2xl"
              style={{ background: "rgba(255,255,255,0.55)", border: "1px solid rgba(4,30,66,0.12)", backdropFilter: "blur(10px)" }}>
              <p className="font-black text-3xl" style={{ color: NAVY, fontFamily: "'Arial Black', sans-serif" }}>{stat.num}</p>
              <p className="text-xs mt-1 font-semibold tracking-widest uppercase" style={{ color: "#6B7280" }}>{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
