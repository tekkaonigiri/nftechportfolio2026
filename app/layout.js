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

export const metadata = {
  title: "Nicole Fong — Developer Portfolio",
  description: "Full-stack developer. Dark mode candy aesthetic.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${fraunces.variable} ${spaceMono.variable} ${dmSans.variable}`}>
      <body className="bg-charcoal text-white min-h-screen">
        <CandyNav />
        <ClientLayout>
          <main>{children}</main>
        </ClientLayout>
      </body>
    </html>
  );
}
