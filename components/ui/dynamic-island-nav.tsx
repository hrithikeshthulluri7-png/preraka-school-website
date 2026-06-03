"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { label: "Home",      href: "/" },
  { label: "About",     href: "/about" },
  { label: "Blog",      href: "/blog" },
  { label: "Gallery",   href: "/gallery" },
  { label: "Events",    href: "/events" },
  { label: "Contact",   href: "/contact" },
];

export default function DynamicIslandNav() {
  const [expanded, setExpanded] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 500);
    return () => clearTimeout(t);
  }, []);

  return (
    <div
      className="fixed z-50 flex justify-center pointer-events-none"
      style={{ top: 70, left: 0, right: 0 }}
    >
      <motion.div
        className="relative overflow-hidden cursor-pointer pointer-events-auto"
        style={{ borderRadius: 50, background: "rgba(0,0,0,0.85)", backdropFilter: "blur(20px)" }}
        initial={{ scaleX: 0.6, scaleY: 0.5, opacity: 0 }}
        animate={mounted ? { scaleX: 1, scaleY: 1, opacity: 1 } : {}}
        transition={{ type: "spring", stiffness: 380, damping: 28, delay: 0.1 }}
        onHoverStart={() => setExpanded(true)}
        onHoverEnd={() => setExpanded(false)}
        onClick={() => setExpanded(v => !v)}
      >
        <motion.div
          animate={{
            width: expanded ? 520 : 130,
            height: expanded ? 52 : 38,
          }}
          transition={{ type: "spring", stiffness: 420, damping: 32 }}
        >
          {/* Collapsed pill */}
          <AnimatePresence>
            {!expanded && (
              <motion.div
                key="collapsed"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.12 }}
                className="absolute inset-0 flex items-center justify-center gap-2"
              >
                <motion.div
                  className="w-2 h-2 rounded-full"
                  style={{ background: "#2E7E46" }}
                  animate={{ scale: [1, 1.4, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
                <span className="text-white text-xs font-bold tracking-[0.14em] uppercase">
                  Preraka
                </span>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Expanded nav */}
          <AnimatePresence>
            {expanded && (
              <motion.div
                key="expanded"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.14, delay: 0.08 }}
                className="absolute inset-0 flex items-center justify-center gap-1 px-5"
              >
                {navLinks.map((link, i) => (
                  <motion.a
                    key={link.label}
                    href={link.href}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.04 }}
                    className="text-white text-xs font-semibold px-3 py-1 rounded-full whitespace-nowrap transition-all duration-150"
                    style={{ letterSpacing: "0.04em" }}
                    onMouseEnter={e => {
                      (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.15)";
                      (e.currentTarget as HTMLElement).style.color = "#A1CFEF";
                    }}
                    onMouseLeave={e => {
                      (e.currentTarget as HTMLElement).style.background = "transparent";
                      (e.currentTarget as HTMLElement).style.color = "white";
                    }}
                    onClick={e => e.stopPropagation()}
                  >
                    {link.label}
                  </motion.a>
                ))}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Inner gloss */}
          <div className="absolute inset-x-0 top-0 h-px" style={{ background: "rgba(255,255,255,0.18)" }} />
        </motion.div>
      </motion.div>
    </div>
  );
}
