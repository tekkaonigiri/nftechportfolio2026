import "./globals.css";
import { Fraunces, Space_Mono, DM_Sans } from "next/font/google";
import CandyNav from "@/components/CandyNav";
import ClientLayout from "@/components/ClientLayout";

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
  weight: ["100", "300", "400", "700", "900"],
});

const spaceMono = Space_Mono({
  subsets: ["latin"],
  variable: "--font-mono-custom",
  display: "swap",
  weight: ["400", "700"],
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
  weight: ["300", "400", "500", "700"],
});

const SITE_URL = "https://nicolefong.tech";

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Nicole Fong | AI/ML Engineer & Full Stack Developer",
    template: "%s | Nicole Fong",
  },
  description:
    "Nicole Fong is a first-year AI student at UC San Diego building multimodal AI systems, computer vision tools, and full-stack software. Break Through Tech Fellow, ACM AI Events Director, DiamondHacks 2026 winner.",
  keywords: [
    "Nicole Fong",
    "Nicole Fong UCSD",
    "Nicole Fong portfolio",
    "Nicole Fong AI engineer",
    "AI ML engineer portfolio",
    "UC San Diego AI student",
    "full stack developer",
    "machine learning",
    "computer vision",
    "Break Through Tech",
  ],
  authors: [{ name: "Nicole Fong", url: SITE_URL }],
  creator: "Nicole Fong",
  openGraph: {
    type: "website",
    url: SITE_URL,
    siteName: "Nicole Fong",
    title: "Nicole Fong | AI/ML Engineer & Full Stack Developer",
    description:
      "Nicole Fong is a first-year AI student at UC San Diego building multimodal AI systems, computer vision tools, and full-stack software. Break Through Tech Fellow, ACM AI Events Director, DiamondHacks 2026 winner.",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Nicole Fong | AI/ML Engineer & Full Stack Developer",
    description:
      "First-year AI student at UC San Diego. Break Through Tech Fellow. DiamondHacks 2026 winner. Building multimodal AI and full-stack software.",
    creator: "@nicolefong",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-image-preview": "large",
      "max-video-preview": -1,
    },
  },
  alternates: {
    canonical: SITE_URL,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Nicole Fong",
  url: SITE_URL,
  jobTitle: "AI/ML Engineer & Full Stack Developer",
  description:
    "First-year Artificial Intelligence student at UC San Diego. Break Through Tech Fellow. ACM AI Events Director. DiamondHacks 2026 winner.",
  alumniOf: {
    "@type": "CollegeOrUniversity",
    name: "UC San Diego",
  },
  knowsAbout: [
    "Artificial Intelligence",
    "Machine Learning",
    "Computer Vision",
    "Full Stack Development",
    "Reinforcement Learning from Human Feedback",
  ],
  sameAs: [
    "https://github.com/nicolefongjw",
    "https://linkedin.com/in/nicolefong",
  ],
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${fraunces.variable} ${spaceMono.variable} ${dmSans.variable}`}>
      <body className="bg-charcoal text-white min-h-screen">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <CandyNav />
        <ClientLayout>
          <main>{children}</main>
        </ClientLayout>
      </body>
    </html>
  );
}
