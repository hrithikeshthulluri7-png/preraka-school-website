"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

const CONSENT_KEY = "preraka_cookie_consent";

export default function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const stored = window.localStorage.getItem(CONSENT_KEY);
    if (!stored) {
      const timer = window.setTimeout(() => setVisible(true), 650);
      return () => window.clearTimeout(timer);
    }
  }, []);

  const accept = () => {
    window.localStorage.setItem(CONSENT_KEY, "accepted");
    document.cookie = `${CONSENT_KEY}=accepted; Max-Age=31536000; Path=/; SameSite=Lax`;
    setVisible(false);
  };

  const decline = () => {
    window.localStorage.setItem(CONSENT_KEY, "declined");
    document.cookie = `${CONSENT_KEY}=; Max-Age=0; Path=/; SameSite=Lax`;
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="fixed bottom-5 right-5 z-[60] w-[calc(100vw-2.5rem)] max-w-sm rounded-[20px] border border-[#A3D5FF]/30 bg-[#041E42]/95 p-5 text-white shadow-[0_20px_70px_-30px_rgba(4,30,66,0.9)] backdrop-blur-xl">
      <p className="text-sm font-black uppercase tracking-[0.18em] text-[#A3D5FF]">Cookies</p>
      <p className="mt-2 text-sm leading-6 text-white/78">
        We use optional cookies only if you accept them, mainly to understand website performance and improve school enquiries.
      </p>
      <Link href="/privacy-policy" className="mt-2 inline-block text-xs font-bold uppercase tracking-widest text-[#FFB81C] hover:underline">
        Privacy Policy
      </Link>
      <div className="mt-5 grid grid-cols-2 gap-3">
        <button
          type="button"
          onClick={decline}
          className="rounded-full border border-white/18 px-4 py-2 text-xs font-black uppercase tracking-widest text-white transition hover:bg-white/10"
        >
          Decline
        </button>
        <button
          type="button"
          onClick={accept}
          className="rounded-full bg-[#FFB81C] px-4 py-2 text-xs font-black uppercase tracking-widest text-[#041E42] transition hover:scale-105"
        >
          Accept
        </button>
      </div>
    </div>
  );
}
