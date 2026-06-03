"use client";
import { useState, useEffect } from "react";

const TreeLogo = () => (
  <svg viewBox="0 0 80 104" width="22" height="28" fill="none">
    <rect x="36" y="55" width="8" height="30" rx="4" fill="white" />
    <circle cx="40" cy="32" r="22" fill="white" />
    <circle cx="24" cy="38" r="13" fill="white" />
    <circle cx="56" cy="38" r="13" fill="white" />
    <ellipse cx="40" cy="78" rx="12" ry="3.5" fill="white" opacity="0.4" />
    <line x1="28" y1="80" x2="18" y2="94" stroke="white" strokeWidth="1.5" opacity="0.6" />
    <line x1="40" y1="82" x2="40" y2="96" stroke="white" strokeWidth="1.5" opacity="0.6" />
    <line x1="52" y1="80" x2="62" y2="94" stroke="white" strokeWidth="1.5" opacity="0.6" />
  </svg>
);

export default function PrerakaTopBar() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 120);
    return () => clearTimeout(t);
  }, []);

  return (
    <div
      className="w-full z-50"
      style={{
        background: "#041E42",
        transform: mounted ? "translateY(0)" : "translateY(-100%)",
        opacity: mounted ? 1 : 0,
        transition: "transform 0.6s cubic-bezier(0.22,1,0.36,1), opacity 0.5s ease",
        borderBottom: "1px solid rgba(161,207,239,0.15)",
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-2.5 flex flex-col sm:flex-row items-center justify-between gap-2">
        {/* Brand */}
        <div className="flex items-center gap-2.5 flex-shrink-0">
          <div
            className="w-8 h-8 rounded-full flex items-center justify-center"
            style={{ background: "#2E7E46" }}
          >
            <TreeLogo />
          </div>
          <div className="leading-tight">
            <p className="text-white font-bold text-sm leading-none" style={{ fontFamily: "Georgia, serif" }}>
              Preraka
            </p>
            <p className="text-xs leading-none mt-0.5" style={{ color: "#A1CFEF", opacity: 0.8 }}>
              The School of Change.
            </p>
          </div>
        </div>

        {/* Contact strip */}
        <div className="flex items-center gap-4 sm:gap-6">
          <div className="flex items-center gap-2">
            <div
              className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0"
              style={{ background: "rgba(161,207,239,0.12)" }}
            >
              <svg width="12" height="12" fill="none" viewBox="0 0 24 24">
                <rect x="2" y="4" width="20" height="16" rx="2" stroke="#A1CFEF" strokeWidth="2" />
                <path d="M2 7l10 7 10-7" stroke="#A1CFEF" strokeWidth="2" />
              </svg>
            </div>
            <div className="hidden sm:block">
              <p className="text-xs leading-none" style={{ color: "#A1CFEF", opacity: 0.6 }}>Email Us Anytime</p>
              <p className="text-xs font-semibold text-white leading-tight mt-0.5">prerakastaff@gmail.com</p>
            </div>
            <p className="text-xs font-medium text-white sm:hidden">prerakastaff@gmail.com</p>
          </div>

          <div className="hidden sm:block w-px h-7" style={{ background: "rgba(255,255,255,0.15)" }} />

          <div className="flex items-center gap-2">
            <div
              className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0"
              style={{ background: "rgba(161,207,239,0.12)" }}
            >
              <svg width="12" height="12" fill="none" viewBox="0 0 24 24">
                <path d="M6.62 10.79a15.05 15.05 0 006.59 6.59l2.2-2.2a1 1 0 011.11-.21 11.36 11.36 0 003.88.76 1 1 0 011 1V20a1 1 0 01-1 1C7.61 21 3 16.39 3 10a1 1 0 011-1h3.5a1 1 0 011 1c0 1.35.27 2.67.76 3.88a1 1 0 01-.21 1.11L6.62 10.79z" stroke="#A1CFEF" strokeWidth="2" />
              </svg>
            </div>
            <div className="hidden sm:block">
              <p className="text-xs leading-none" style={{ color: "#A1CFEF", opacity: 0.6 }}>Call Us Anytime</p>
              <p className="text-xs font-semibold text-white leading-tight mt-0.5">+91 9100272854</p>
            </div>
            <p className="text-xs font-medium text-white sm:hidden">+91 9100272854</p>
          </div>
        </div>

        {/* CTA */}
        <a
          href="#contact"
          className="flex-shrink-0 px-5 py-1.5 rounded-full text-xs font-bold tracking-wide transition-all duration-200 hover:scale-105 hover:brightness-110"
          style={{ background: "#FFB81C", color: "#041E42" }}
        >
          APPLY NOW →
        </a>
      </div>
    </div>
  );
}
