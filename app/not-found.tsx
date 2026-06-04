import Link from 'next/link';

export default function NotFound() {
  return (
    <main style={{
      minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
      gap: "1.25rem", textAlign: "center", padding: "2rem",
      background: "linear-gradient(160deg,#020D1F 0%,#041E42 40%,#062B5A 70%,#041E42 100%)",
    }}>
      <div style={{ fontSize: "4rem" }}>🌱</div>
      <h1 style={{ fontSize: "clamp(1.6rem,4vw,2.4rem)", fontWeight: 700, color: "#fff", margin: 0 }}>
        Page Not Found
      </h1>
      <p style={{ color: "rgba(161,207,239,0.65)", maxWidth: 340, lineHeight: 1.6, fontSize: "0.95rem" }}>
        The page you&apos;re looking for doesn&apos;t exist or has been moved.
        Let&apos;s get you back on track.
      </p>
      <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap", justifyContent: "center", marginTop: "0.5rem" }}>
        <Link href="/" style={{
          padding: "0.55rem 1.4rem", background: "#2E7E46", color: "#fff",
          borderRadius: "8px", fontWeight: 600, textDecoration: "none", fontSize: "0.9rem",
        }}>
          Go Home
        </Link>
        <Link href="/contact" style={{
          padding: "0.55rem 1.4rem", background: "rgba(161,207,239,0.12)",
          color: "#A1CFEF", border: "1px solid rgba(161,207,239,0.3)",
          borderRadius: "8px", fontWeight: 600, textDecoration: "none", fontSize: "0.9rem",
        }}>
          Contact Us
        </Link>
      </div>
    </main>
  );
}
