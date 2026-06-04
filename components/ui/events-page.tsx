"use client";

import Link from "next/link";
import { ReactNode } from "react";
import { motion } from "framer-motion";
import {
  ArrowRight,
  BrainCircuit,
  CalendarDays,
  Clock,
  MapPin,
  Sparkles,
  Users,
  Zap,
} from "lucide-react";
import DynamicIslandNav from "@/components/ui/dynamic-island-nav";
import FloatingSchoolElements from "@/components/ui/floating-school-elements";
import { GlowCard } from "@/components/ui/spotlight-card";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

const LUMA_LINK = "https://luma.com/calendar/cal-1e62DDZqPeudPjH?period=past";

const featureCards = [
  {
    icon: BrainCircuit,
    title: "AI-Led Discovery",
    text: "Events connect children with adaptive learning, robotics, experiments and digital confidence.",
    color: "#A3D5FF",
  },
  {
    icon: Zap,
    title: "Create, Don't Just Consume",
    text: "Hands-on workshops help students build, question, present and solve like young innovators.",
    color: "#FFB81C",
  },
  {
    icon: Sparkles,
    title: "Whole-Child Growth",
    text: "Every gathering blends academics, creativity, values, family connection and joyful participation.",
    color: "#8ECDA8",
  },
];

const events = [
  {
    day: "20",
    month: "August, 2024",
    mode: "List",
    title: "Business English Programs",
    location: "Preraka School, Radhavendra Nagar, Turkayamjal",
    time: "10:36 - 05:30 PM",
    description:
      "A communication-focused session where children practise confident speaking, vocabulary, presentation habits and real-world expression.",
    accent: "#A3D5FF",
  },
  {
    day: "20",
    month: "August, 2024",
    mode: "List",
    title: "Exactly Technology Can Make Reading",
    location: "Preraka School, Radhavendra Nagar, Turkayamjal",
    time: "10:36 - 05:30 PM",
    description:
      "A tech-enabled reading event inspired by Preraka's AI-powered approach, helping learners understand text with curiosity and confidence.",
    accent: "#FFB81C",
  },
  {
    day: "20",
    month: "August, 2024",
    mode: "List",
    title: "Begin Teaching Online Full Time",
    location: "Preraka School, Radhavendra Nagar, Turkayamjal",
    time: "10:36 - 05:30 PM",
    description:
      "A future-learning showcase for parents and mentors, exploring digital classrooms, guided practice and personalised learning pathways.",
    accent: "#8ECDA8",
  },
  {
    day: "20",
    month: "August, 2024",
    mode: "List",
    title: "English Can Make Reading",
    location: "Preraka School, Radhavendra Nagar, Turkayamjal",
    time: "10:36 - 05:30 PM",
    description:
      "A language and storytelling experience designed to make reading active, expressive and memorable for young learners.",
    accent: "#F99D84",
  },
];

function CardDecorator({ children, color }: { children: ReactNode; color: string }) {
  return (
    <div className="relative mx-auto size-32 [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)]" aria-hidden>
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage:
            "linear-gradient(to right, #041E42 1px, transparent 1px), linear-gradient(to bottom, #041E42 1px, transparent 1px)",
          backgroundSize: "22px 22px",
        }}
      />
      <div
        className="absolute inset-0 m-auto flex size-14 items-center justify-center border-l border-t bg-white"
        style={{ color, borderColor: "rgba(4,30,66,0.24)", boxShadow: `0 0 30px ${color}66` }}
      >
        {children}
      </div>
    </div>
  );
}

export default function EventsPageContent() {
  return (
    <main className="overflow-hidden bg-[#F6FBFF]">
      <section className="relative min-h-[760px] overflow-hidden bg-[#041E42] px-6 pt-24 text-white">
        <DynamicIslandNav inline />
        <FloatingSchoolElements />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_20%,rgba(163,213,255,0.22),transparent_38%),linear-gradient(180deg,rgba(4,30,66,0)_0%,#041E42_88%)]" />
        <motion.div
          className="relative z-10 mx-auto flex max-w-6xl flex-col items-center justify-center pb-24 pt-32 text-center"
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="mb-5 rounded-full border border-[#A3D5FF]/35 bg-white/10 px-5 py-2 text-xs font-bold uppercase tracking-[0.28em] text-[#A3D5FF] backdrop-blur">
            Events
          </p>
          <h1 className="max-w-5xl font-black leading-[0.92] tracking-normal" style={{ fontSize: "clamp(4rem, 13vw, 11rem)" }}>
            Upcoming
            <span className="block text-[#FFEE00]">Events</span>
          </h1>
          <p className="mt-8 max-w-2xl text-base leading-7 text-white/75 md:text-lg">
            Explore Preraka&apos;s family events, learning showcases and creative workshops where children discover, create and grow.
          </p>
          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <a
              href={LUMA_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-[#FFB81C] px-7 py-3 text-sm font-black uppercase tracking-widest text-[#041E42] transition hover:scale-105"
            >
              View Calendar <ArrowRight className="size-4" />
            </a>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center rounded-full border border-[#A3D5FF]/35 px-7 py-3 text-sm font-bold uppercase tracking-widest text-[#A3D5FF] transition hover:bg-white/10"
            >
              Ask Admissions
            </Link>
          </div>
        </motion.div>
      </section>

      <section className="relative px-6 py-16 md:py-24">
        <div className="mx-auto max-w-5xl">
          <div className="text-center">
            <p className="text-xs font-bold uppercase tracking-[0.28em] text-[#2E7E46]">What Events Cover</p>
            <h2 className="mt-3 text-balance text-4xl font-bold text-[#041E42] md:text-5xl">Built Around Your Child&apos;s Growth</h2>
          </div>
          <div className="mx-auto mt-10 grid max-w-sm gap-6 md:mt-14 md:max-w-full md:grid-cols-3">
            {featureCards.map(({ icon: Icon, title, text, color }) => (
              <Card key={title} className="border-[#041E42]/10 bg-white/80 text-center shadow-[0_20px_60px_-40px_rgba(4,30,66,0.65)] backdrop-blur">
                <CardHeader className="pb-2">
                  <CardDecorator color={color}>
                    <Icon className="size-6" aria-hidden />
                  </CardDecorator>
                  <h3 className="mt-5 text-lg font-bold text-[#041E42]">{title}</h3>
                </CardHeader>
                <CardContent>
                  <p className="text-sm leading-6 text-[#1A2E4A]/75">{text}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="relative bg-[#A3D5FF] px-6 py-16 md:py-24">
        <FloatingSchoolElements intensity="light" />
        <div className="relative z-10 mx-auto max-w-6xl">
          <div className="mb-10 flex flex-col justify-between gap-4 md:flex-row md:items-end">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.28em] text-[#2E7E46]">Upcoming Events</p>
              <h2 className="mt-3 text-4xl font-black text-[#041E42] md:text-6xl">Join the next Preraka moment</h2>
            </div>
            <p className="max-w-md text-sm font-medium leading-6 text-[#1A2E4A]/75">
              Click Join Now on any event to view the Luma calendar and register interest.
            </p>
          </div>

          <div className="grid gap-6 lg:grid-cols-2">
            {events.map((event, index) => (
              <motion.div
                key={event.title}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.55, delay: index * 0.08 }}
              >
                <GlowCard customSize glowColor={index % 2 === 0 ? "blue" : "green"} className="min-h-[330px] w-full">
                  <div className="flex h-full flex-col gap-6 md:flex-row">
                    <div
                      className="flex min-w-28 flex-col items-center justify-center rounded-2xl px-5 py-6 text-center"
                      style={{ background: "#041E42", color: event.accent }}
                    >
                      <span className="text-5xl font-black leading-none">{event.day}</span>
                      <span className="mt-2 text-xs font-bold uppercase tracking-widest text-white/72">{event.month}</span>
                      <span className="mt-4 rounded-full bg-white/10 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-white">{event.mode}</span>
                    </div>
                    <div className="flex flex-1 flex-col justify-between">
                      <div>
                        <h3 className="text-2xl font-black leading-tight text-[#041E42] md:text-3xl">{event.title}</h3>
                        <div className="mt-5 space-y-3 text-sm font-semibold text-[#1A2E4A]/78">
                          <p className="flex gap-2"><MapPin className="mt-0.5 size-4 shrink-0 text-[#2E7E46]" />{event.location}</p>
                          <p className="flex gap-2"><Clock className="mt-0.5 size-4 shrink-0 text-[#2E7E46]" />{event.time}</p>
                        </div>
                        <p className="mt-5 text-sm leading-6 text-[#1A2E4A]/72">{event.description}</p>
                      </div>
                      <a
                        href={LUMA_LINK}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-6 inline-flex w-fit items-center gap-2 rounded-full bg-[#041E42] px-5 py-3 text-sm font-black uppercase tracking-widest text-white transition hover:scale-105"
                      >
                        Join Now <ArrowRight className="size-4" />
                      </a>
                    </div>
                  </div>
                </GlowCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#F6FBFF] px-6 py-16">
        <div className="mx-auto grid max-w-5xl gap-4 rounded-[20px] border border-[#041E42]/10 bg-white p-6 text-[#041E42] shadow-[0_20px_70px_-55px_rgba(4,30,66,0.8)] md:grid-cols-3">
          {[
            { icon: CalendarDays, label: "School showcases", value: "Family-friendly" },
            { icon: Users, label: "Grades", value: "Nursery to VII" },
            { icon: Sparkles, label: "Focus", value: "AI, STEM & creativity" },
          ].map(({ icon: Icon, label, value }) => (
            <div key={label} className="flex items-center gap-4 rounded-2xl bg-[#A3D5FF]/30 p-4">
              <Icon className="size-7 text-[#2E7E46]" />
              <div>
                <p className="text-xs font-bold uppercase tracking-widest text-[#1A2E4A]/55">{label}</p>
                <p className="font-black">{value}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
