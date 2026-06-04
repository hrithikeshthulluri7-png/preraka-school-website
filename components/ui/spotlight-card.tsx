"use client";

import React, { ReactNode, useEffect, useRef } from "react";

type GlowCardProps = {
  children: ReactNode;
  className?: string;
  glowColor?: "blue" | "purple" | "green" | "red" | "orange";
  size?: "sm" | "md" | "lg";
  width?: string | number;
  height?: string | number;
  customSize?: boolean;
};

const glowColorMap = {
  blue: { base: 205, spread: 50 },
  purple: { base: 280, spread: 300 },
  green: { base: 130, spread: 80 },
  red: { base: 0, spread: 200 },
  orange: { base: 34, spread: 120 },
};

const sizeMap = {
  sm: "w-48 h-64",
  md: "w-64 h-80",
  lg: "w-80 h-96",
};

type GlowStyle = React.CSSProperties & Record<`--${string}`, string | number>;

export function GlowCard({
  children,
  className = "",
  glowColor = "blue",
  size = "md",
  width,
  height,
  customSize = false,
}: GlowCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const { base, spread } = glowColorMap[glowColor];

  useEffect(() => {
    const syncPointer = (e: PointerEvent) => {
      if (!cardRef.current) return;
      const { clientX, clientY } = e;
      cardRef.current.style.setProperty("--x", clientX.toFixed(2));
      cardRef.current.style.setProperty("--xp", (clientX / window.innerWidth).toFixed(2));
      cardRef.current.style.setProperty("--y", clientY.toFixed(2));
      cardRef.current.style.setProperty("--yp", (clientY / window.innerHeight).toFixed(2));
    };

    document.addEventListener("pointermove", syncPointer);
    return () => document.removeEventListener("pointermove", syncPointer);
  }, []);

  const inlineStyles: GlowStyle = {
    "--base": base,
    "--spread": spread,
    "--radius": "18",
    "--border": "2",
    "--backdrop": "rgba(255,255,255,0.78)",
    "--backup-border": "rgba(4,30,66,0.16)",
    "--size": "230",
    "--outer": "1",
    "--border-size": "calc(var(--border, 2) * 1px)",
    "--spotlight-size": "calc(var(--size, 150) * 1px)",
    "--hue": "calc(var(--base) + (var(--xp, 0) * var(--spread, 0)))",
    backgroundImage: `radial-gradient(
      var(--spotlight-size) var(--spotlight-size) at
      calc(var(--x, 0) * 1px)
      calc(var(--y, 0) * 1px),
      hsl(var(--hue, 205) 100% 68% / 0.16), transparent
    )`,
    backgroundColor: "var(--backdrop)",
    backgroundSize: "calc(100% + (2 * var(--border-size))) calc(100% + (2 * var(--border-size)))",
    backgroundPosition: "50% 50%",
    backgroundAttachment: "fixed",
    border: "var(--border-size) solid var(--backup-border)",
    touchAction: "none",
    width: typeof width === "number" ? `${width}px` : width,
    height: typeof height === "number" ? `${height}px` : height,
  };

  return (
    <>
      <style>{`
        [data-glow]::before,
        [data-glow]::after {
          pointer-events: none;
          content: "";
          position: absolute;
          inset: calc(var(--border-size) * -1);
          border: var(--border-size) solid transparent;
          border-radius: calc(var(--radius) * 1px);
          background-attachment: fixed;
          background-size: calc(100% + (2 * var(--border-size))) calc(100% + (2 * var(--border-size)));
          background-repeat: no-repeat;
          background-position: 50% 50%;
          mask: linear-gradient(transparent, transparent), linear-gradient(white, white);
          mask-clip: padding-box, border-box;
          mask-composite: intersect;
        }
        [data-glow]::before {
          background-image: radial-gradient(
            calc(var(--spotlight-size) * 0.72) calc(var(--spotlight-size) * 0.72) at
            calc(var(--x, 0) * 1px)
            calc(var(--y, 0) * 1px),
            hsl(var(--hue, 205) 100% 55% / 0.95), transparent 100%
          );
          filter: brightness(1.75);
        }
        [data-glow]::after {
          background-image: radial-gradient(
            calc(var(--spotlight-size) * 0.44) calc(var(--spotlight-size) * 0.44) at
            calc(var(--x, 0) * 1px)
            calc(var(--y, 0) * 1px),
            rgba(255,255,255,0.95), transparent 100%
          );
        }
        [data-glow] > [data-glow] {
          position: absolute;
          inset: 0;
          opacity: var(--outer, 1);
          border-radius: calc(var(--radius) * 1px);
          filter: blur(calc(var(--border-size) * 10));
          pointer-events: none;
        }
      `}</style>
      <div
        ref={cardRef}
        data-glow
        style={inlineStyles}
        className={`${customSize ? "" : sizeMap[size]} relative rounded-[18px] p-5 shadow-[0_1.5rem_3rem_-2rem_rgba(4,30,66,0.75)] backdrop-blur-xl ${className}`}
      >
        <div data-glow />
        <div className="relative z-10 h-full">{children}</div>
      </div>
    </>
  );
}
