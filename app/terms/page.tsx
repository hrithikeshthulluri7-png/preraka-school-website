import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "Terms of Use | Preraka School",
  description: "Terms and conditions governing the use of the Preraka School website.",
};
import Link from "next/link";
import PrerakaTopBar from "@/components/ui/preraka-top-bar";
import DynamicIslandNav from "@/components/ui/dynamic-island-nav";
import PrerakaFooter from "@/components/ui/preraka-footer";

const EFFECTIVE = "4 June 2026";

export default function TermsPage() {
  return (
    <>
      <PrerakaTopBar />
      <DynamicIslandNav />
      <main id="main-content" style={{ background: "linear-gradient(160deg,#020D1F 0%,#041E42 100%)", minHeight: "100vh", padding: "6rem 1.5rem 4rem" }}>
        <div style={{ maxWidth: 720, margin: "0 auto", color: "rgba(255,255,255,0.85)", fontFamily: "Georgia, serif" }}>
          <p style={{ color: "#2E7E46", fontSize: "0.7rem", letterSpacing: "0.3em", textTransform: "uppercase", marginBottom: "0.75rem" }}>Legal</p>
          <h1 style={{ fontSize: "clamp(1.8rem,4vw,2.8rem)", fontWeight: 700, color: "#fff", marginBottom: "0.5rem" }}>Terms of Use</h1>
          <p style={{ color: "rgba(161,207,239,0.55)", fontSize: "0.85rem", marginBottom: "2.5rem" }}>Effective: {EFFECTIVE}</p>

          {[
            {
              heading: "1. Acceptance",
              body: "By accessing or using the Preraka School website (the \"Site\"), you agree to these Terms of Use. If you do not agree, please stop using the Site.",
            },
            {
              heading: "2. Permitted Use",
              body: "The Site is provided for general information about Preraka School — an educational institution in Turkayamjal, Hyderabad, India. You may browse, print, and share pages for personal, non-commercial purposes. You may not scrape, reproduce, or redistribute Site content for commercial purposes without prior written consent.",
            },
            {
              heading: "3. Intellectual Property",
              body: "All content on this Site — including text, photographs, logos, graphics, and the Preraka brand identity — is the property of Preraka School or its licensors. Nothing on the Site grants you any licence or right to use any content without express written permission.",
            },
            {
              heading: "4. Third-Party Services",
              body: "The Site contains links to third-party platforms including Luma (event registration) and WhatsApp (enquiries operated by Meta). These services have their own privacy policies and terms. Preraka School is not responsible for their content or practices.",
            },
            {
              heading: "5. No Professional Advice",
              body: "Information on the Site is provided for general guidance only and does not constitute legal, financial, medical, or professional advice. For official admission decisions, please contact the school directly.",
            },
            {
              heading: "6. Limitation of Liability",
              body: "To the fullest extent permitted by applicable law, Preraka School shall not be liable for any indirect, incidental, or consequential damages arising from your use of the Site. The Site is provided \"as is\" without warranties of any kind.",
            },
            {
              heading: "7. Changes to These Terms",
              body: "We may update these Terms at any time. Continued use of the Site after changes are posted constitutes acceptance of the revised Terms.",
            },
            {
              heading: "8. Governing Law",
              body: "These Terms are governed by the laws of India, and any disputes shall be subject to the exclusive jurisdiction of the courts of Telangana.",
            },
            {
              heading: "9. Contact",
              body: "For questions about these Terms, please contact us at prerakastaff@gmail.com or visit our contact page.",
            },
          ].map(({ heading, body }) => (
            <section key={heading} style={{ marginBottom: "2rem" }}>
              <h2 style={{ fontSize: "1.1rem", fontWeight: 700, color: "#A1CFEF", marginBottom: "0.4rem" }}>{heading}</h2>
              <p style={{ fontSize: "0.92rem", lineHeight: 1.75, color: "rgba(255,255,255,0.75)" }}>{body}</p>
            </section>
          ))}

          <div style={{ marginTop: "3rem", display: "flex", gap: "1rem", flexWrap: "wrap" }}>
            <Link href="/privacy-policy" style={{ color: "#A1CFEF", fontSize: "0.85rem" }}>Privacy Policy →</Link>
            <Link href="/contact" style={{ color: "#A1CFEF", fontSize: "0.85rem" }}>Contact Us →</Link>
            <Link href="/" style={{ color: "#A1CFEF", fontSize: "0.85rem" }}>Home →</Link>
          </div>
        </div>
      </main>
      <PrerakaFooter />
    </>
  );
}
