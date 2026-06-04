"use client";

import React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import {
  CalendarDays,
  Check,
  Copy,
  Globe,
  GraduationCap,
  LucideIcon,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import DynamicIslandNav from "@/components/ui/dynamic-island-nav";
import FloatingSchoolElements from "@/components/ui/floating-school-elements";

const APP_EMAIL = "prerakastaff@gmail.com";
const APP_PHONE = "+91 9100272854";
const APP_ADDRESS = "Radhavendra Nagar, Turkayamjal, Hyderabad - 501510";
const LUMA_LINK = "https://luma.com/calendar/cal-1e62DDZqPeudPjH?period=past";
const WHATSAPP_PHONE = APP_PHONE.replace(/\D/g, "");
const WHATSAPP_MESSAGE = encodeURIComponent("Hello Preraka School, I would like to enquire about admissions and book a school visit.");
const WHATSAPP_LINK = `https://wa.me/${WHATSAPP_PHONE}?text=${WHATSAPP_MESSAGE}`;

const onlineLinks = [
  { icon: Globe, href: "https://prerakaschool.com", label: "Website" },
  { icon: CalendarDays, href: LUMA_LINK, label: "Events" },
  { icon: MessageCircle, href: WHATSAPP_LINK, label: "WhatsApp" },
  { icon: Mail, href: `mailto:${APP_EMAIL}`, label: "Email" },
  { icon: Phone, href: `tel:${APP_PHONE.replace(/\s/g, "")}`, label: "Call" },
];

export default function ContactPageContent() {
  return (
    <main className="overflow-hidden bg-[#F6FBFF]">
      <section className="relative min-h-[620px] overflow-hidden bg-[#041E42] px-6 pt-24 text-white">
        <DynamicIslandNav inline />
        <FloatingSchoolElements />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_28%,rgba(163,213,255,0.25),transparent_42%),linear-gradient(180deg,rgba(4,30,66,0)_0%,#041E42_90%)]" />
        <div className="relative z-10 mx-auto flex max-w-5xl flex-col items-center pb-20 pt-32 text-center">
          <p className="mb-5 rounded-full border border-[#A3D5FF]/35 bg-white/10 px-5 py-2 text-xs font-bold uppercase tracking-[0.28em] text-[#A3D5FF] backdrop-blur">
            Contact Us
          </p>
          <h1 className="font-black leading-none tracking-normal" style={{ fontSize: "clamp(4rem, 13vw, 10rem)" }}>
            Let&apos;s Talk
          </h1>
          <p className="mt-7 max-w-2xl text-base leading-7 text-white/76 md:text-lg">
            Have a question about admissions, visits, classes or Preraka&apos;s AI-powered learning approach? We&apos;ll point your family in the right direction.
          </p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <a
              href={WHATSAPP_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-[#FFB81C] px-7 py-3 text-sm font-black uppercase tracking-widest text-[#041E42] transition hover:scale-105"
            >
              Book a Visit <MessageCircle className="size-4" />
            </a>
            <a
              href={`tel:${APP_PHONE.replace(/\s/g, "")}`}
              className="inline-flex items-center justify-center rounded-full border border-[#A3D5FF]/35 px-7 py-3 text-sm font-bold uppercase tracking-widest text-[#A3D5FF] transition hover:bg-white/10"
            >
              Call Admissions
            </a>
          </div>
        </div>
      </section>

      <section className="relative px-6 py-16 md:py-24">
        <div className="mx-auto max-w-6xl overflow-hidden rounded-[24px] border border-[#041E42]/12 bg-white shadow-[0_24px_80px_-60px_rgba(4,30,66,0.95)]">
          <div className="grid md:grid-cols-3">
            <ContactBox icon={Mail} title="Email" description="We respond to school enquiries as soon as the admissions team is available.">
              <a href={`mailto:${APP_EMAIL}`} className="break-all font-mono text-sm font-bold tracking-wide text-[#041E42] hover:underline md:text-base">
                {APP_EMAIL}
              </a>
              <CopyButton className="size-8" text={APP_EMAIL} />
            </ContactBox>
            <ContactBox icon={MapPin} title="Campus" description="Drop by after booking a visit so the team can guide you properly.">
              <span className="font-mono text-sm font-bold leading-6 tracking-wide text-[#041E42] md:text-base">
                {APP_ADDRESS}
              </span>
            </ContactBox>
            <ContactBox icon={Phone} title="Phone" description="Available for admissions, visits and general school questions." className="md:border-r-0">
              <div className="flex items-center gap-2">
                <a href={`tel:${APP_PHONE.replace(/\s/g, "")}`} className="font-mono text-sm font-bold tracking-wide text-[#041E42] hover:underline md:text-base">
                  {APP_PHONE}
                </a>
                <CopyButton className="size-8" text={APP_PHONE} />
              </div>
            </ContactBox>
          </div>

          <div className="border-t border-[#041E42]/10 bg-[#A3D5FF]/28 p-6 md:p-10">
            <div className="grid gap-8 lg:grid-cols-[1fr_0.9fr] lg:items-center">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.28em] text-[#2E7E46]">Admissions Open</p>
                <h2 className="mt-3 text-3xl font-black leading-tight text-[#041E42] md:text-5xl">Find the right grade path for your child.</h2>
                <p className="mt-4 max-w-2xl text-sm font-medium leading-6 text-[#1A2E4A]/75">
                  Preraka currently welcomes families for Nursery through Grade VII, with learning experiences across AI, STEM, Gandharya Vidhya, creativity and values.
                </p>
                <div className="mt-6 flex flex-wrap gap-2">
                  {["NUR", "LKG", "UKG", "Class 1", "Class 2", "Class 3", "Class 4", "Class 5", "Class 6", "Class 7"].map((grade) => (
                    <span key={grade} className="rounded-full border border-[#041E42]/12 bg-white/80 px-3 py-1 text-xs font-bold text-[#041E42]">
                      {grade}
                    </span>
                  ))}
                </div>
              </div>
              <div className="rounded-[20px] border border-[#041E42]/10 bg-white/[0.82] p-6 backdrop-blur">
                <div className="flex items-center gap-3">
                  <div className="flex size-12 items-center justify-center rounded-2xl bg-[#041E42] text-[#A3D5FF]">
                    <GraduationCap className="size-6" />
                  </div>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-widest text-[#1A2E4A]/55">Quick enquiry</p>
                    <h3 className="text-xl font-black text-[#041E42]">Start with a school visit</h3>
                  </div>
                </div>
                <div className="mt-6 grid gap-3">
                  <a
                    href={WHATSAPP_LINK}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 rounded-full bg-[#041E42] px-5 py-3 text-sm font-black uppercase tracking-widest text-white transition hover:scale-105"
                  >
                    Send Enquiry <MessageCircle className="size-4" />
                  </a>
                  <Link href="/events" className="inline-flex items-center justify-center gap-2 rounded-full border border-[#041E42]/15 px-5 py-3 text-sm font-black uppercase tracking-widest text-[#041E42] transition hover:bg-[#A3D5FF]/30">
                    View Events <Sparkles className="size-4" />
                  </Link>
                </div>
              </div>
            </div>
          </div>

          <div className="relative flex min-h-[260px] items-center justify-center px-6 py-16">
            <div
              className={cn(
                "absolute inset-0",
                "bg-[radial-gradient(rgba(4,30,66,0.20)_1px,transparent_1px)]",
                "bg-[size:32px_32px]",
                "[mask-image:radial-gradient(ellipse_at_center,#000_30%,transparent_75%)]",
              )}
              aria-hidden
            />
            <div className="relative z-10 space-y-6 text-center">
              <h2 className="text-3xl font-black text-[#041E42] md:text-4xl">Find us online</h2>
              <div className="flex flex-wrap items-center justify-center gap-4">
                {onlineLinks.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    target={link.href.startsWith("http") ? "_blank" : undefined}
                    rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
                    className="flex items-center gap-2 rounded-full border border-[#041E42]/12 bg-white/80 px-4 py-2 text-[#041E42] transition hover:bg-[#A3D5FF]/45"
                  >
                    <link.icon className="size-4" />
                    <span className="font-mono text-sm font-bold tracking-wide">{link.label}</span>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

type ContactBoxProps = React.ComponentProps<"div"> & {
  icon: LucideIcon;
  title: string;
  description: string;
};

function ContactBox({ icon: Icon, title, description, className, children }: ContactBoxProps) {
  return (
    <div className={cn("flex min-h-72 flex-col justify-between border-b border-[#041E42]/10 md:border-b-0 md:border-r", className)}>
      <div className="flex items-center gap-3 border-b border-[#041E42]/10 bg-[#A3D5FF]/20 p-4">
        <Icon className="size-5 text-[#2E7E46]" strokeWidth={1.5} />
        <h2 className="text-lg font-black tracking-wide text-[#041E42]">{title}</h2>
      </div>
      <div className="flex flex-1 items-center gap-2 p-5 py-10">{children}</div>
      <div className="border-t border-[#041E42]/10 p-4">
        <p className="text-sm leading-6 text-[#1A2E4A]/65">{description}</p>
      </div>
    </div>
  );
}

function CopyButton({ className, text }: { className?: string; text: string }) {
  const [copied, setCopied] = React.useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch (error) {
      console.error("Failed to copy text:", error);
    }
  };

  return (
    <Button
      variant="ghost"
      size="icon"
      className={cn("relative text-[#041E42] disabled:opacity-100", className)}
      onClick={handleCopy}
      aria-label={copied ? "Copied" : "Copy to clipboard"}
      disabled={copied}
    >
      <Check className={cn("absolute size-3.5 stroke-[#2E7E46] transition-all", copied ? "scale-100 opacity-100" : "scale-0 opacity-0")} aria-hidden />
      <Copy className={cn("absolute size-3.5 transition-all", copied ? "scale-0 opacity-0" : "scale-100 opacity-100")} aria-hidden />
    </Button>
  );
}
