import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "Privacy Policy | Preraka School",
  description: "How Preraka School collects, uses and protects your personal information under the DPDP Act 2023.",
};
import Link from "next/link";
import PrerakaTopBar from "@/components/ui/preraka-top-bar";
import PrerakaFooter from "@/components/ui/preraka-footer";
import DynamicIslandNav from "@/components/ui/dynamic-island-nav";
import FloatingSchoolElements from "@/components/ui/floating-school-elements";

const sections = [
  {
    title: "Information We Collect",
    body: [
      "Parent or guardian details such as name, phone number, email address, address and relationship to the child.",
      "Student details shared during admissions or school communication, including name, age, class, learning needs and documents required for enrolment.",
      "Visit, event and enquiry details such as preferred grade, visit date, event registration and messages sent to the school.",
      "Website usage information such as browser type, device details, page visits and cookie preferences when cookies are accepted.",
      "Photos, videos or creative work from school activities only where the school has an appropriate basis and, where required, parent or guardian permission.",
    ],
  },
  {
    title: "How We Use Information",
    body: [
      "To respond to enquiries, schedule campus visits and support admissions.",
      "To provide school updates, event information, transport or administration-related communication.",
      "To maintain safe, age-appropriate and personalised learning experiences for students.",
      "To improve the website, understand interest in school programs and protect the security of our services.",
      "To comply with applicable legal, regulatory, safety and record-keeping requirements.",
    ],
  },
  {
    title: "Children's Data",
    body: [
      "Preraka School treats children's personal data with additional care. Information about a child should be provided by a parent, guardian or authorised school representative.",
      "We do not knowingly ask children to submit personal data directly through this website without parent or guardian involvement.",
      "Where a child's photo, video, achievement or creative work may be used for school communication, we seek permission through the school's admission or consent process wherever required.",
    ],
  },
  {
    title: "Cookies",
    body: [
      "The website shows a cookie choice with Accept and Decline options. If Decline is selected, the site will not set optional analytics or marketing cookies.",
      "If Accept is selected, the site may store a consent cookie and use limited cookies to understand website performance and improve family experience.",
      "Essential browser storage may still be used to remember your cookie choice and keep the website working properly.",
    ],
  },
  {
    title: "Sharing and Service Providers",
    body: [
      "We do not sell student or parent information.",
      "We may share limited information with trusted service providers that help operate the website, manage events, support school communication, or provide learning and administration tools.",
      "Service providers are expected to use information only for the purpose requested by the school and to protect it appropriately.",
    ],
  },
  {
    title: "Retention and Security",
    body: [
      "We keep information only as long as needed for admissions, school administration, safety, communication, legal compliance or legitimate school records.",
      "We use reasonable technical and organisational measures to protect personal data from unauthorised access, disclosure, alteration or loss.",
      "No website or digital service can guarantee absolute security, so families should avoid sending highly sensitive information unless requested through an official school channel.",
    ],
  },
  {
    title: "Your Rights and Choices",
    body: [
      "Parents and guardians may request access, correction, update or deletion of personal information, subject to legal and school record requirements.",
      "You may withdraw optional communication or cookie consent where applicable.",
      "For privacy requests, contact the school using the details on this website. We may need to verify the request before acting on it.",
    ],
  },
];

export default function PrivacyPolicyPage() {
  return (
    <>
      <PrerakaTopBar />
      <main className="overflow-hidden bg-[#F6FBFF]">
        <section className="relative min-h-[520px] overflow-hidden bg-[#041E42] px-6 pt-24 text-white">
          <DynamicIslandNav inline />
          <FloatingSchoolElements intensity="light" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_22%,rgba(163,213,255,0.24),transparent_42%),linear-gradient(180deg,rgba(4,30,66,0)_0%,#041E42_90%)]" />
          <div className="relative z-10 mx-auto flex max-w-5xl flex-col items-center pb-20 pt-32 text-center">
            <p className="mb-5 rounded-full border border-[#A3D5FF]/35 bg-white/10 px-5 py-2 text-xs font-bold uppercase tracking-[0.28em] text-[#A3D5FF] backdrop-blur">
              Privacy Policy
            </p>
            <h1 className="font-black leading-none tracking-normal" style={{ fontSize: "clamp(3.5rem, 10vw, 8rem)" }}>
              Family Data,
              <span className="block text-[#FFEE00]">Handled Carefully</span>
            </h1>
            <p className="mt-7 max-w-2xl text-base leading-7 text-white/76 md:text-lg">
              This policy explains how Preraka School collects, uses and protects information shared by families, students and website visitors.
            </p>
            <p className="mt-4 text-sm font-semibold text-[#A3D5FF]">Effective date: 4 June 2026</p>
          </div>
        </section>

        <section className="px-6 py-16 md:py-24">
          <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[0.82fr_1.18fr]">
            <aside className="h-fit rounded-[22px] border border-[#041E42]/10 bg-white p-6 shadow-[0_20px_70px_-55px_rgba(4,30,66,0.8)] lg:sticky lg:top-8">
              <p className="text-xs font-bold uppercase tracking-[0.28em] text-[#2E7E46]">At a glance</p>
              <h2 className="mt-3 text-3xl font-black leading-tight text-[#041E42]">Built for a school community.</h2>
              <p className="mt-4 text-sm font-medium leading-6 text-[#1A2E4A]/70">
                The policy is written for Indian school website use cases and is designed with reference to the Digital Personal Data Protection Act, 2023 and related MeitY materials.
              </p>
              <div className="mt-6 grid gap-3">
                <Link href="/contact" className="rounded-full bg-[#041E42] px-5 py-3 text-center text-sm font-black uppercase tracking-widest text-white transition hover:scale-105">
                  Contact School
                </Link>
                <Link href="/" className="rounded-full border border-[#041E42]/15 px-5 py-3 text-center text-sm font-black uppercase tracking-widest text-[#041E42] transition hover:bg-[#A3D5FF]/30">
                  Back Home
                </Link>
              </div>
            </aside>

            <div className="space-y-5">
              <div className="rounded-[22px] border border-[#041E42]/10 bg-white p-6 shadow-[0_20px_70px_-55px_rgba(4,30,66,0.8)] md:p-8">
                <h2 className="text-2xl font-black text-[#041E42]">Who This Applies To</h2>
                <p className="mt-3 text-sm font-medium leading-7 text-[#1A2E4A]/72">
                  This policy applies to personal information collected through the Preraka School website, contact forms, event links, visit enquiries and school communication connected to this website. It does not replace detailed admission forms, school handbooks or specific consent forms that may be provided separately.
                </p>
              </div>

              {sections.map((section) => (
                <section key={section.title} className="rounded-[22px] border border-[#041E42]/10 bg-white p-6 shadow-[0_20px_70px_-55px_rgba(4,30,66,0.8)] md:p-8">
                  <h2 className="text-2xl font-black text-[#041E42]">{section.title}</h2>
                  <ul className="mt-4 space-y-3">
                    {section.body.map((item) => (
                      <li key={item} className="flex gap-3 text-sm font-medium leading-7 text-[#1A2E4A]/72">
                        <span className="mt-2 size-2 shrink-0 rounded-full bg-[#2E7E46]" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </section>
              ))}

              <section className="rounded-[22px] border border-[#041E42]/10 bg-[#A3D5FF]/35 p-6 md:p-8">
                <h2 className="text-2xl font-black text-[#041E42]">Legal References</h2>
                <p className="mt-3 text-sm font-medium leading-7 text-[#1A2E4A]/72">
                  This page has been prepared with reference to Indian privacy requirements, including the Digital Personal Data Protection Act, 2023 and the Digital Personal Data Protection Rules, 2025 as published through official Government of India and MeitY resources. The school may update this page as legal requirements, school practices or digital services change.
                </p>
                <div className="mt-5 flex flex-wrap gap-3">
                  <a
                    href="https://www.indiacode.nic.in/bitstream/123456789/22037/2/a2023-22.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-full border border-[#041E42]/15 bg-white/70 px-4 py-2 text-xs font-black uppercase tracking-widest text-[#041E42] hover:bg-white"
                  >
                    DPDP Act 2023
                  </a>
                  <a
                    href="https://www.meity.gov.in/static/uploads/2025/11/53450e6e5dc0bfa85ebd78686cadad39.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-full border border-[#041E42]/15 bg-white/70 px-4 py-2 text-xs font-black uppercase tracking-widest text-[#041E42] hover:bg-white"
                  >
                    DPDP Rules 2025
                  </a>
                </div>
              </section>
            </div>
          </div>
        </section>
      </main>
      <PrerakaFooter />
    </>
  );
}
